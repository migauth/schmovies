#!/bin/bash

set -e

echo "Starting entrypoint.sh script"

# Print environment variables (without secrets)
echo "Environment:"
echo "DB_HOST: $DB_HOST"
echo "DB_NAME: $DB_NAME"
echo "DB_PORT: $DB_PORT"
echo "PORT: $PORT"
echo "DEBUG: $DEBUG"
echo "ALLOWED_HOSTS: $ALLOWED_HOSTS"
echo "TMDB_API_KEY set: $(if [ -n "$TMDB_API_KEY" ]; then echo 'Yes'; else echo 'No'; fi)"
echo "OPENAI_API_KEY set: $(if [ -n "$OPENAI_API_KEY" ]; then echo 'Yes'; else echo 'No'; fi)"

# Function to check if PostgreSQL is ready
function postgres_ready() {
  python << END
import sys
import psycopg2
import os

try:
    print("Attempting to connect to database...")
    print(f"DB_HOST: {os.environ.get('DB_HOST', 'not set')}")
    print(f"DB_NAME: {os.environ.get('DB_NAME', 'not set')}")
    print(f"DB_PORT: {os.environ.get('DB_PORT', 'not set')}")
    
    dbname = os.environ.get("DB_NAME", "postgres")
    user = os.environ.get("DB_USER", "postgres")
    password = os.environ.get("DB_PASSWORD", "postgres")
    host = os.environ.get("DB_HOST", "localhost")
    port = os.environ.get("DB_PORT", "5432")
    
    print(f"Connecting to: postgresql://{user}:****@{host}:{port}/{dbname}")
    
    conn = psycopg2.connect(
        dbname=dbname,
        user=user,
        password=password,
        host=host,
        port=port
    )
    print("Connection successful!")
    conn.close()
except psycopg2.OperationalError as e:
    print(f"Connection failed: {e}")
    sys.exit(1)
sys.exit(0)
END
}

# Try to connect to PostgreSQL with retries
max_retries=15
retries=0
until postgres_ready || [ $retries -eq $max_retries ]; do
  echo "PostgreSQL is unavailable - waiting (retry $retries/$max_retries in 2 seconds)..."
  retries=$((retries+1))
  sleep 2
done

if [ $retries -eq $max_retries ]; then
  echo "Failed to connect to PostgreSQL after $max_retries retries"
  # Continue anyway - Railway might inject the database details later
else
  echo "PostgreSQL is up - continuing..."
fi

# Try to run migrations, but continue if they fail
echo "Running migrations..."
python manage.py migrate --noinput || echo "Migrations failed, but continuing..."

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput || echo "Static file collection failed, but continuing..."

# Try to run the fetch_movies command to check movie count
echo "Checking for existing movies..."
python manage.py fetch_movies --count || echo "Command failed, proceeding anyway"

# Run the database initialization script, which will only populate if needed
echo "Running database initialization script..."
python init_db.py || echo "Init script failed, proceeding anyway"

# Check movie count again to confirm
echo "Verifying movie count..."
python manage.py fetch_movies --count || echo "Command failed, proceeding anyway"

# Create a superuser if it doesn't exist
echo "Creating admin user if needed..."
python -c "
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'schmovies.settings')
django.setup()
from django.contrib.auth.models import User
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'admin')
    print('Admin user created')
else:
    print('Admin user already exists')
" || echo "Failed to create admin user, continuing anyway..."

# Start gunicorn with correct settings
echo "Starting Gunicorn on port ${PORT:-8000}..."
export DJANGO_SETTINGS_MODULE=schmovies.railway_settings
exec gunicorn --bind 0.0.0.0:${PORT:-8000} --log-level debug --timeout 120 schmovies.wsgi:application