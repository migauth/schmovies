#!/usr/bin/env python
"""
Database management script for Railway deployment.
This script helps initialize the database with movies from TMDB API.
"""
import os
import django
import sys
import time

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'schmovies.settings')
django.setup()

from movies.services import fetch_and_save_all_movies

if __name__ == "__main__":
    print("Starting database initialization...")
    
    # Wait for a bit to ensure database is ready
    time.sleep(5)
    
    # Fetch movies
    print("Fetching movies from TMDB API...")
    fetch_and_save_all_movies()
    
    print("Database initialization completed!")