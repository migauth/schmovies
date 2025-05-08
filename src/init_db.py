#!/usr/bin/env python
"""
Database initialization script for Railway deployment.
This script can be run to manually populate the database with movies.
"""

import os
import sys
import django
import requests
import time
import logging

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'schmovies.settings')
try:
    django.setup()
except Exception as e:
    logger.error(f"Failed to setup Django with schmovies.settings: {e}")
    # Try alternative settings
    os.environ['DJANGO_SETTINGS_MODULE'] = 'schmovies.railway_settings'
    try:
        django.setup()
    except Exception as e:
        logger.error(f"Failed to setup Django with schmovies.railway_settings: {e}")
        sys.exit(1)

# Import models after Django setup
from movies.models.movie import Movie

def fetch_genres(api_key):
    """Fetch movie genres from TMDB API"""
    logger.info("Fetching movie genres...")
    genres_url = f'https://api.themoviedb.org/3/genre/movie/list?api_key={api_key}&language=en-US'
    genres_response = requests.get(genres_url)
    
    if genres_response.status_code != 200:
        logger.error(f"Failed to fetch genres: {genres_response.status_code}")
        logger.error(genres_response.text)
        return {}
    
    genres_data = genres_response.json()
    genre_mapping = {genre['id']: genre['name'] for genre in genres_data['genres']}
    logger.info(f"Successfully fetched {len(genre_mapping)} genres")
    return genre_mapping

def fetch_movies_by_page(api_key, genre_mapping, category="popular", page=1):
    """Fetch a page of movies from TMDB API"""
    logger.info(f"Fetching {category} movies, page {page}...")
    movies_url = f'https://api.themoviedb.org/3/movie/{category}?api_key={api_key}&page={page}'
    movies_response = requests.get(movies_url)
    
    if movies_response.status_code != 200:
        logger.error(f"Failed to fetch {category} movies page {page}: {movies_response.status_code}")
        logger.error(movies_response.text)
        return [], 0
    
    response_data = movies_response.json()
    movies_data = response_data.get('results', [])
    total_pages = response_data.get('total_pages', 1)
    
    logger.info(f"Successfully fetched {len(movies_data)} movies from {category}, page {page}/{total_pages}")
    
    # Process and save each movie
    saved_count = 0
    for movie in movies_data:
        if save_movie_to_db(movie, genre_mapping):
            saved_count += 1
    
    return movies_data, total_pages

def save_movie_to_db(movie, genre_mapping):
    """Process movie data and save to database"""
    try:
        # Convert genre IDs to genre names
        genre_names = [genre_mapping.get(genre_id, '') for genre_id in movie.get('genre_ids', [])]
        genres = ', '.join(filter(None, genre_names))
        
        # Extract release year from release date
        release_year = movie.get('release_date', '')[:4] if movie.get('release_date') else 'Unknown'
        
        # Build poster URL
        poster_path = movie.get('poster_path', '')
        poster_url = f"https://image.tmdb.org/t/p/w500{poster_path}" if poster_path else "https://via.placeholder.com/500x750?text=No+Poster"
        
        # Save movie to database
        Movie.objects.update_or_create(
            id=movie['id'],
            defaults={
                'title': movie.get('title', 'Unknown Title'),
                'description': movie.get('overview', 'No description available.'),
                'genre': genres,
                'release_year': release_year,
                'poster_url': poster_url
            }
        )
        logger.info(f"Saved/updated movie: {movie.get('title')}")
        return True
    except Exception as e:
        logger.error(f"Error saving movie {movie.get('title', 'Unknown')}: {str(e)}")
        return False

def main():
    """Main function to initialize the database"""
    # Get TMDB API key
    TMDB_API_KEY = os.environ.get('TMDB_API_KEY')
    if not TMDB_API_KEY:
        logger.error("TMDB_API_KEY not found in environment variables")
        sys.exit(1)
    
    # Check if there are already movies in the database
    existing_count = Movie.objects.count()
    logger.info(f"Found {existing_count} existing movies in the database")
    
    # If there are enough movies, we can skip fetching new ones
    if existing_count >= 50:
        logger.info("Database already has movies, skipping fetch")
        return
    
    # Fetch genres
    genre_mapping = fetch_genres(TMDB_API_KEY)
    if not genre_mapping:
        logger.error("Failed to fetch genres, exiting")
        sys.exit(1)
    
    # Fetch popular movies (multiple pages)
    categories = ["popular", "top_rated", "now_playing"]
    total_saved = 0
    
    for category in categories:
        page = 1
        max_pages = 3  # Limit to 3 pages per category to avoid rate limiting
        
        # Fetch first page
        _, total_pages = fetch_movies_by_page(TMDB_API_KEY, genre_mapping, category, page)
        
        # Fetch additional pages if available
        for page in range(2, min(max_pages + 1, total_pages + 1)):
            fetch_movies_by_page(TMDB_API_KEY, genre_mapping, category, page)
            time.sleep(1)  # Sleep to avoid API rate limiting
    
    # Print final count
    final_count = Movie.objects.count()
    logger.info(f"Database now has {final_count} movies")

if __name__ == "__main__":
    main()