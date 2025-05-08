#!/bin/bash

set -e

# Function to check if PostgreSQL is ready
function postgres_ready() {
  python << END
import sys
import psycopg2
import os

try:
    dbname = os.environ.get("DB_NAME", "postgres")
    user = os.environ.get("DB_USER", "postgres")
    password = os.environ.get("DB_PASSWORD", "postgres")
    host = os.environ.get("DB_HOST", "localhost")
    port = os.environ.get("DB_PORT", "5432")
    
    conn = psycopg2.connect(
        dbname=dbname,
        user=user,
        password=password,
        host=host,
        port=port
    )
except psycopg2.OperationalError:
    sys.exit(1)
sys.exit(0)
END
}

# Try to connect to PostgreSQL with retries
until postgres_ready; do
  echo "PostgreSQL is unavailable - waiting (retrying in 2 seconds)..."
  sleep 2
done

echo "PostgreSQL is up - continuing..."

# Run migrations
python manage.py migrate --noinput

# Collect static files
python manage.py collectstatic --noinput

# Try to run the fetch_movies command to check movie count
echo "Checking for existing movies..."
python manage.py fetch_movies --count || echo "Command failed, proceeding anyway"

# Run the database initialization script, which will only populate if needed
echo "Running database initialization script..."
python init_db.py || echo "Init script failed, proceeding anyway"

# Check movie count again to confirm
echo "Verifying movie count..."
python manage.py fetch_movies --count || echo "Command failed, proceeding anyway"

# Start gunicorn
exec gunicorn schmovies.wsgi:application --bind 0.0.0.0:${PORT:-8000}