import os
import json
import requests
import random
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import logging

logger = logging.getLogger(__name__)

# Get API keys from environment
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
TMDB_API_KEY = os.environ.get('TMDB_API_KEY')

# Initialize OpenAI client only if API key is available
client = None
if OPENAI_API_KEY:
    try:
        from openai import OpenAI
        client = OpenAI(api_key=OPENAI_API_KEY)
        logger.info("OpenAI client initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize OpenAI client: {str(e)}")
else:
    logger.warning("OPENAI_API_KEY not provided, OpenAI features will be disabled")

@csrf_exempt
def submit_quiz(request):
    logger.info("submit_quiz function")

    if request.method == 'POST':
        
        # Extract user's preferences from the request
        data = json.loads(request.body)

        # keywords = data.get('keywords')
        answers = data.get('answers')
        print('asnwers here: ', answers)
        
        # Extract only the selectedAnswer values
        selected_answers = [answer['selectedAnswer'] for answer in answers]
        print('selected answers: ', selected_answers)
        
        
        # Call the function to get movie suggestions based on user's preference
        recommendations = get_movie_suggestions(selected_answers)

        # Return movie recommendations as a JSON response
        return JsonResponse({'recommendations': recommendations})

    # If the request method is not POST, return an error
    return JsonResponse({'error': 'Method not allowed'}, status=405)


def get_movie_suggestions(answers):
    # A fallback list of keywords to use if OpenAI is not available
    fallback_keywords = [
        "action", "adventure", "comedy", "drama", "thriller", 
        "romance", "horror", "fantasy", "sci-fi", "animation",
        "mystery", "western", "musical", "documentary", "crime"
    ]
    
    # Define predefined mappings for common quiz answers
    common_mappings = {
        "highbrow": "classic",
        "decent": "drama",
        "average": "comedy",
        "silly": "family",
        "cheesy": "romantic comedy",
        "happy": "comedy",
        "sad": "drama",
        "thrilling": "thriller",
        "nostalgic": "classic",
        "inspiring": "documentary",
        "aliens": "sci-fi",
        "superheroes": "superhero",
        "animals": "family",
        "historical": "history",
        "everyday people": "drama"
    }
    
    try:
        # Try to use OpenAI if available
        if client:
            try:
                chat_completion = client.chat.completions.create(
                    messages=[
                        {
                            "role": "user",
                            "content": f'reduce these words describing a type of movie: ({answers}) down to one word',
                        }
                    ],
                    model="gpt-3.5-turbo",
                )
                keyword = chat_completion.choices[0].message.content
                logger.info(f"OpenAI generated keyword: {keyword}")
            except Exception as openai_error:
                logger.error(f"OpenAI request failed: {str(openai_error)}")
                # Use fallback approach
                keyword = use_fallback_approach(answers, common_mappings, fallback_keywords)
        else:
            # Use fallback approach if OpenAI client is not available
            keyword = use_fallback_approach(answers, common_mappings, fallback_keywords)
    except Exception as e:
        logger.error(f"Error in get_movie_suggestions: {str(e)}")
        keyword = random.choice(fallback_keywords)
        logger.info(f"Using random fallback keyword due to error: {keyword}")
    
    # Try to get movies from database first (much faster than API call)
    try:
        from movies.models.movie import Movie
        
        # Filter movies that match the keyword in title or genre
        db_movies = list(Movie.objects.filter(
            genre__icontains=keyword
        ).values())[:10]  # Limit to 10 movies
        
        # If we found movies in the database, return them
        if db_movies:
            logger.info(f"Found {len(db_movies)} movies in database matching keyword: {keyword}")
            return db_movies
        
        # If no genre match, try title
        db_movies = list(Movie.objects.filter(
            title__icontains=keyword
        ).values())[:10]
        
        if db_movies:
            logger.info(f"Found {len(db_movies)} movies in database with title matching keyword: {keyword}")
            return db_movies
            
        # If nothing found by genre or title, return random movies
        all_movies = list(Movie.objects.all().values())
        if all_movies:
            random_selection = random.sample(all_movies, min(10, len(all_movies)))
            logger.info(f"Returning {len(random_selection)} random movies from database")
            return random_selection
    except Exception as db_error:
        logger.error(f"Error fetching movies from database: {str(db_error)}")
    
    # If no movies in database or error occurred, try TMDB API
    return fetch_from_tmdb_api(keyword)

def use_fallback_approach(answers, common_mappings, fallback_keywords):
    """Helper function to get a keyword without OpenAI"""
    # Try to use the mapping for known answers
    for answer in answers:
        if answer in common_mappings:
            keyword = common_mappings[answer]
            logger.info(f"Using mapped keyword for '{answer}': {keyword}")
            return keyword
    
    # If no mapping found, use a combination of answers or a fallback
    if len(answers) > 0:
        # Use the first non-empty answer as keyword
        for answer in answers:
            if answer and len(answer) > 0:
                logger.info(f"Using answer as keyword: {answer}")
                return answer
    
    # If all else fails, use a random fallback keyword
    keyword = random.choice(fallback_keywords)
    logger.info(f"Using random fallback keyword: {keyword}")
    return keyword

def fetch_from_tmdb_api(keyword):
    """Helper function to fetch movies from TMDB API"""
    # Skip API call if TMDB key not available
    if not TMDB_API_KEY:
        logger.error("TMDB_API_KEY not provided, cannot fetch movies from API")
        return []
        
    try:
        url = f'https://api.themoviedb.org/3/search/movie?api_key={TMDB_API_KEY}&query={keyword}&include_adult=false'
        logger.info(f"Making TMDB API request with keyword: {keyword}")
        
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            # Extract movie suggestions from API response
            movies = data.get('results', [])
            logger.info(f"TMDB API returned {len(movies)} movies")
            return movies
        else:
            logger.error(f"TMDB API request failed with status code: {response.status_code}")
            # Try a popular movies fallback if search fails
            fallback_url = f'https://api.themoviedb.org/3/movie/popular?api_key={TMDB_API_KEY}&include_adult=false'
            fallback_response = requests.get(fallback_url)
            
            if fallback_response.status_code == 200:
                fallback_data = fallback_response.json()
                fallback_movies = fallback_data.get('results', [])
                logger.info(f"Fallback to popular movies returned {len(fallback_movies)} movies")
                return fallback_movies
            else:
                logger.error(f"TMDB fallback API request also failed with status code: {fallback_response.status_code}")
                return []
    except Exception as e:
        logger.error(f"Error making TMDB API request: {str(e)}")
        return []
