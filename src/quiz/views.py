import os
import json
import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import UserPreferences

AI_MODEL_ENDPOINT = '' #API Model endpoint url should go here
TMDB_API_KEY = os.environ.get('TMDB_API_KEY')

@csrf_exempt
def submit_quiz(request):
    if request.method == 'POST':
        # Extract user's preferences from the request
        data = json.loads(request.body)
        genre = data.get('searchText')
        # submitted_answers = json.loads(request.body) this is probably a better name for the data variable

        # Call the function to get movie suggestions based on user's preference
        recommendations = get_movie_suggestions(genre)

        # Return movie recommendations as a JSON response
        return JsonResponse({'recommendations': recommendations})
    
        # # Store user preferences in the database
        # user_preferences = UserPreferences(user=request.user, preferences=submitted_answers)
        # user_preferences.save()

    # If the request method is not POST, return an error
    return JsonResponse({'error': 'Method not allowed'}, status=405)

def get_movie_suggestions(genre):
    # Make request to TMDb API to fetch movie suggestions based on genre
    api_key = TMDB_API_KEY
    url = f'https://api.themoviedb.org/3/discover/movie?api_key={api_key}&language=en-US&sort_by=popularity.desc&with_genres={genre}'
    
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        # Extract movie suggestions from API response
        movies = data.get('results', [])
        return movies
    else:
        # If API request fails, return an empty list
        return []

# def get_movie_recommendations(user_responses):
#     # Send user responses to AI model for movie recommendations
#     response = requests.post(AI_MODEL_ENDPOINT, json=user_responses)
#     recommendations = response.json().get('recommendations', [])
#     return recommendations