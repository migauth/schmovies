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

def add_hardcoded_movies():
    """Add hardcoded movies if API is not available"""
    logger.info("Adding hardcoded movies as fallback")
    
    # Hardcoded 2024 movies for testing
    hardcoded_movies = [
        {
            "id": 101,
            "title": "Dune: Part Two",
            "description": "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
            "genre": "Science Fiction, Adventure",
            "release_year": "2024",
            "poster_url": "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg"
        },
        {
            "id": 102,
            "title": "Kingdom of the Planet of the Apes",
            "description": "Many years after the reign of Caesar, a young ape goes on a journey that will lead him to question everything he's been taught about the past.",
            "genre": "Science Fiction, Adventure",
            "release_year": "2024",
            "poster_url": "https://image.tmdb.org/t/p/w500/gVCqOhD8vUJoXoJb05jYJLVA2cd.jpg"
        },
        {
            "id": 103,
            "title": "The Fall Guy",
            "description": "A stuntman is hired to work on a film directed by his ex-girlfriend and the star he was a stunt double for in the past. Things take a turn when the star goes missing.",
            "genre": "Action, Comedy",
            "release_year": "2024",
            "poster_url": "https://image.tmdb.org/t/p/w500/xXBg6NXV1OJpjnUOw41RjnpP526.jpg"
        },
        {
            "id": 104,
            "title": "Inside Out 2",
            "description": "Joy, Sadness, Anger, Fear and Disgust are joined by new emotions as Riley enters adolescence.",
            "genre": "Animation, Comedy, Family",
            "release_year": "2024",
            "poster_url": "https://image.tmdb.org/t/p/w500/4KHchupuz4euygJ9MnjlZmRyStM.jpg"
        },
        {
            "id": 105,
            "title": "Godzilla x Kong: The New Empire",
            "description": "Godzilla and the mighty Kong face a colossal threat hidden deep within the planet, challenging their very existence and the survival of the human race.",
            "genre": "Action, Science Fiction",
            "release_year": "2024",
            "poster_url": "https://image.tmdb.org/t/p/w500/bQ2ygkiKhDuynJFrfGJ8G01nNG2.jpg"
        },
        # Classic movies
        {
            "id": 1,
            "title": "The Shawshank Redemption",
            "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
            "genre": "Drama",
            "release_year": "1994",
            "poster_url": "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg"
        },
        {
            "id": 2,
            "title": "The Godfather",
            "description": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
            "genre": "Crime, Drama",
            "release_year": "1972",
            "poster_url": "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg"
        },
        {
            "id": 3,
            "title": "The Dark Knight",
            "description": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            "genre": "Action, Crime, Drama",
            "release_year": "2008",
            "poster_url": "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
        }
    ]
    
    # Save hardcoded movies to database
    saved_count = 0
    for movie in hardcoded_movies:
        try:
            Movie.objects.update_or_create(
                id=movie["id"],
                defaults={
                    "title": movie["title"],
                    "description": movie["description"],
                    "genre": movie["genre"],
                    "release_year": movie["release_year"],
                    "poster_url": movie["poster_url"]
                }
            )
            saved_count += 1
            logger.info(f"Saved hardcoded movie: {movie['title']}")
        except Exception as e:
            logger.error(f"Error saving hardcoded movie {movie['title']}: {str(e)}")
    
    logger.info(f"Saved {saved_count} hardcoded movies")
    return saved_count

def main():
    """Main function to initialize the database"""
    # Get TMDB API key
    TMDB_API_KEY = os.environ.get('TMDB_API_KEY')
    
    # Check if there are already movies in the database
    existing_count = Movie.objects.count()
    logger.info(f"Found {existing_count} existing movies in the database")
    
    # If there are enough movies, we can skip fetching new ones
    if existing_count >= 20:
        logger.info("Database already has movies, skipping fetch")
        return
    
    # Try to fetch from TMDB API if key is available
    if TMDB_API_KEY:
        try:
            # Fetch genres
            genre_mapping = fetch_genres(TMDB_API_KEY)
            if not genre_mapping:
                logger.error("Failed to fetch genres, falling back to hardcoded movies")
                add_hardcoded_movies()
                return
            
            # Fetch popular movies (multiple pages)
            categories = ["popular", "top_rated", "now_playing", "upcoming"]
            total_saved = 0
            
            for category in categories:
                page = 1
                max_pages = 2  # Limit to 2 pages per category to avoid rate limiting
                
                # Fetch first page and get total pages
                _, total_pages = fetch_movies_by_page(TMDB_API_KEY, genre_mapping, category, page)
                
                # Fetch additional pages if available
                for page in range(2, min(max_pages + 1, total_pages + 1)):
                    fetch_movies_by_page(TMDB_API_KEY, genre_mapping, category, page)
                    time.sleep(1)  # Sleep to avoid API rate limiting
            
            # Print current count
            current_count = Movie.objects.count()
            logger.info(f"Database now has {current_count} movies from TMDB API")
            
            # If we still don't have enough movies, add hardcoded ones
            if current_count < 10:
                logger.info("Not enough movies from API, adding hardcoded ones")
                add_hardcoded_movies()
        
        except Exception as e:
            logger.exception(f"Error fetching movies from TMDB API: {str(e)}")
            logger.info("Falling back to hardcoded movies")
            add_hardcoded_movies()
    else:
        logger.warning("TMDB_API_KEY not found, using hardcoded movies instead")
        add_hardcoded_movies()
    
    # Print final count
    final_count = Movie.objects.count()
    logger.info(f"Database now has {final_count} movies")

if __name__ == "__main__":
    main()