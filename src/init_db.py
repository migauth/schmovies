#\!/usr/bin/env python
"""
Database initialization script for Schmovies.
This script will check if the movies table is empty and if so, fetch movies from TMDB.
"""

import os
import sys
import django
import logging
import requests

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] - %(message)s',
    handlers=[logging.StreamHandler()]
)
logger = logging.getLogger(__name__)

# Set up Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "schmovies.railway_settings")
django.setup()

from movies.models.movie import Movie
from django.conf import settings

def main():
    logger.info("Starting database initialization script")
    
    # Check if we have movies already
    movie_count = Movie.objects.count()
    logger.info(f"Current movie count: {movie_count}")
    
    if movie_count > 0:
        logger.info("Database already has movies, skipping initialization")
        return
    
    # Check for API key
    if not settings.TMDB_API_KEY:
        logger.error("TMDB_API_KEY not set. Cannot fetch movies.")
        return
    
    logger.info("Fetching movies from TMDB API")
    
    try:
        # Fetch genre data
        genres_url = f'https://api.themoviedb.org/3/genre/movie/list?api_key={settings.TMDB_API_KEY}&language=en-US'
        genres_response = requests.get(genres_url)
        
        if genres_response.status_code \!= 200:
            logger.error(f"Failed to fetch genres: {genres_response.status_code}")
            return
            
        genres_data = genres_response.json()
        genre_mapping = {genre['id']: genre['name'] for genre in genres_data['genres']}
        logger.info(f"Successfully fetched {len(genre_mapping)} genres")
        
        # Fetch popular movies
        pages_to_fetch = 5  # Fetch 5 pages (100 movies)
        for page in range(1, pages_to_fetch + 1):
            movies_url = f'https://api.themoviedb.org/3/movie/popular?api_key={settings.TMDB_API_KEY}&page={page}'
            movies_response = requests.get(movies_url)
            
            if movies_response.status_code \!= 200:
                logger.error(f"Failed to fetch movies page {page}: {movies_response.status_code}")
                continue
                
            movies_data = movies_response.json()['results']
            logger.info(f"Fetched {len(movies_data)} movies from page {page}")
            
            # Process movies
            for movie in movies_data:
                # Convert genre IDs to names
                genre_names = [genre_mapping.get(genre_id, '') for genre_id in movie.get('genre_ids', [])]
                genres_str = ', '.join(filter(None, genre_names))
                
                # Create movie in database
                Movie.objects.update_or_create(
                    id=movie['id'],
                    defaults={
                        'title': movie['title'],
                        'description': movie['overview'],
                        'genre': genres_str,
                        'release_year': movie['release_date'][:4] if movie.get('release_date') else 'Unknown',
                        'poster_url': f"https://image.tmdb.org/t/p/w500{movie['poster_path']}" if movie.get('poster_path') else ""
                    }
                )
            
            logger.info(f"Processed {len(movies_data)} movies from page {page}")
        
        # Check final count
        final_count = Movie.objects.count()
        logger.info(f"Database initialization complete. Final movie count: {final_count}")
        
    except Exception as e:
        logger.exception(f"Error during database initialization: {str(e)}")
        
if __name__ == "__main__":
    main()
