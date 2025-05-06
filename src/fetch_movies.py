import os
import django
import requests
import time

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'schmovies.settings')
django.setup()

# Import models after Django setup
from movies.models.movie import Movie

def fetch_and_populate_movies():
    # Get API key from environment variable
    TMDB_API_KEY = os.environ.get('TMDB_API_KEY')
    if not TMDB_API_KEY:
        print("Error: TMDB_API_KEY not found in environment variables")
        return
    
    print(f"Using TMDB API Key: {TMDB_API_KEY}")
    
    # Fetch genre names from TMDB API
    genres_url = f'https://api.themoviedb.org/3/genre/movie/list?api_key={TMDB_API_KEY}&language=en-US'
    genres_response = requests.get(genres_url)
    
    if genres_response.status_code != 200:
        print(f"Failed to fetch genres: {genres_response.status_code}")
        print(genres_response.text)
        return
    
    genres_data = genres_response.json()
    genre_mapping = {genre['id']: genre['name'] for genre in genres_data['genres']}
    
    print(f"Fetched {len(genre_mapping)} genres")
    
    # Fetch movies from different categories
    categories = [
        ("popular", "Popular Movies"),
        ("top_rated", "Top Rated Movies"),
        ("now_playing", "Now Playing")
    ]
    
    for category_id, category_name in categories:
        print(f"\nFetching {category_name}...")
        movies_url = f'https://api.themoviedb.org/3/movie/{category_id}?api_key={TMDB_API_KEY}'
        movies_response = requests.get(movies_url)
        
        if movies_response.status_code != 200:
            print(f"Failed to fetch {category_name}: {movies_response.status_code}")
            print(movies_response.text)
            continue
        
        movies_data = movies_response.json()['results']
        print(f"Fetched {len(movies_data)} movies from {category_name}")
        
        # Process and save movies
        for movie in movies_data:
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
                print(f"Saved/updated movie: {movie.get('title')}")
            except Exception as e:
                print(f"Error saving movie {movie.get('title', 'Unknown')}: {str(e)}")
        
        # Sleep to avoid API rate limiting
        time.sleep(1)
    
    # Count total movies in database
    total_movies = Movie.objects.count()
    print(f"\nTotal movies in database: {total_movies}")

if __name__ == "__main__":
    print("Starting movie fetch process...")
    fetch_and_populate_movies()
    print("Movie fetch process completed!")