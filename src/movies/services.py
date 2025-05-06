import os
import requests
import time
from .models.movie import Movie

def fetch_genres(api_key):
    """Fetch movie genres from TMDB API"""
    print("Fetching movie genres...")
    genres_url = f'https://api.themoviedb.org/3/genre/movie/list?api_key={api_key}&language=en-US'
    genres_response = requests.get(genres_url)
    
    if genres_response.status_code != 200:
        print(f"Failed to fetch genres: {genres_response.status_code}")
        print(genres_response.text)
        return {}
    
    genres_data = genres_response.json()
    genre_mapping = {genre['id']: genre['name'] for genre in genres_data['genres']}
    print(f"Successfully fetched {len(genre_mapping)} genres")
    return genre_mapping

def fetch_movies_by_category(api_key, category, genre_mapping):
    """Fetch movies from a specific TMDB category"""
    category_id, category_name = category
    print(f"\nFetching {category_name}...")
    movies_url = f'https://api.themoviedb.org/3/movie/{category_id}?api_key={api_key}'
    movies_response = requests.get(movies_url)
    
    if movies_response.status_code != 200:
        print(f"Failed to fetch {category_name}: {movies_response.status_code}")
        print(movies_response.text)
        return []
    
    movies_data = movies_response.json()['results']
    print(f"Successfully fetched {len(movies_data)} movies from {category_name}")
    return movies_data

def save_movie_to_db(movie, genre_mapping):
    """Process movie data and save to database"""
    # Convert genre IDs to genre names
    genre_names = [genre_mapping.get(genre_id, '') for genre_id in movie.get('genre_ids', [])]
    genres = ', '.join(filter(None, genre_names))
    
    # Extract release year from release date
    release_year = movie.get('release_date', '')[:4] if movie.get('release_date') else 'Unknown'
    
    # Build poster URL
    poster_path = movie.get('poster_path', '')
    poster_url = f"https://image.tmdb.org/t/p/w500{poster_path}" if poster_path else "https://example.com/default_poster.jpg"
    
    # Save movie to database
    try:
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
        return True
    except Exception as e:
        print(f"Error saving movie {movie.get('title', 'Unknown')}: {str(e)}")
        return False

def fetch_and_save_all_movies():
    """Main function to fetch movies from TMDB and save to database"""
    # Get API key from environment variable
    TMDB_API_KEY = os.environ.get('TMDB_API_KEY')
    if not TMDB_API_KEY:
        print("Error: TMDB_API_KEY not found in environment variables")
        return 0
    
    print(f"Using TMDB API Key: {TMDB_API_KEY}")
    
    # Fetch genres mapping
    genre_mapping = fetch_genres(TMDB_API_KEY)
    if not genre_mapping:
        return 0
    
    # Categories to fetch
    categories = [
        ("popular", "Popular Movies"),
        ("top_rated", "Top Rated Movies"),
        ("now_playing", "Now Playing")
    ]
    
    total_saved = 0
    
    # Fetch and save movies from each category
    for category in categories:
        movies_data = fetch_movies_by_category(TMDB_API_KEY, category, genre_mapping)
        
        for movie in movies_data:
            if save_movie_to_db(movie, genre_mapping):
                total_saved += 1
                print(f"Saved/updated movie: {movie.get('title')}")
        
        # Sleep to avoid API rate limiting
        time.sleep(1)
    
    # Count total movies in database
    total_movies = Movie.objects.count()
    print(f"\nTotal movies in database: {total_movies}")
    print(f"Total movies saved/updated in this run: {total_saved}")
    
    return total_saved

def clear_all_movies():
    """Delete all movies from database"""
    count = Movie.objects.count()
    Movie.objects.all().delete()
    print(f"Deleted {count} movies from database")
    return count