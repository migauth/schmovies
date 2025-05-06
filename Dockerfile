FROM node:18 as frontend-builder

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

FROM python:3.10-slim

# Install dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    gcc \
    python3-dev \
    libpq-dev \
    nginx \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy backend code
COPY src/ /app/
COPY .env.production /app/.env

# Install Python dependencies
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# Copy built frontend from first stage
COPY --from=frontend-builder /app/frontend/build /app/static/

# Copy nginx config
COPY nginx/default.conf /etc/nginx/sites-available/default

# Setup environment
ENV PYTHONUNBUFFERED=1
ENV PATH=/root/.local/bin:$PATH

# Expose ports
EXPOSE 80

# Start services
CMD ["sh", "-c", "python manage.py migrate && python manage.py collectstatic --noinput && gunicorn schmovies.wsgi:application --bind 0.0.0.0:8000 & nginx -g 'daemon off;'"]