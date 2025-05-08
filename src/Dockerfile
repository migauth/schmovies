FROM python:3.10-slim

# Install dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    gcc \
    python3-dev \
    libpq-dev \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Set env vars with defaults
ENV DEBUG=False
ENV ALLOWED_HOSTS=*
ENV SECRET_KEY="django-default-secret-key-for-railway-deployment"
ENV DB_NAME=postgres
ENV DB_USER=postgres
ENV DB_PASSWORD=postgres
ENV DB_HOST=localhost
ENV DB_PORT=5432

COPY . .

# Create a non-root user
RUN useradd -m appuser && chown -R appuser:appuser /app
USER appuser

# Railway uses PORT environment variable
ENV PORT=${PORT:-8000}

# Set default fallback values for Railway's database vars if not provided
ENV PGHOST=${PGHOST:-localhost}
ENV PGDATABASE=${PGDATABASE:-postgres}
ENV PGUSER=${PGUSER:-postgres} 
ENV PGPASSWORD=${PGPASSWORD:-postgres}
ENV PGPORT=${PGPORT:-5432}

# Map Railway's database environment variables to our app's expected variables
ENV DB_HOST=${PGHOST}
ENV DB_NAME=${PGDATABASE}
ENV DB_USER=${PGUSER}
ENV DB_PASSWORD=${PGPASSWORD}
ENV DB_PORT=${PGPORT}

# Set debug to false for production
ENV DEBUG=False
ENV ALLOWED_HOSTS="*"

EXPOSE ${PORT}

COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Switch back to root to fix permissions
USER root
RUN chmod +x /app/entrypoint.sh
USER appuser

CMD ["/app/entrypoint.sh"]