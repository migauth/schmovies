import requests
from django.http import JsonResponse
import json
from .models import UserPreferences
import os

AI_MODEL_ENDPOINT = '' #API Model endpoint url should go here
TMDB_API_KEY = os.environ.get('TMDB_API_KEY')



def submit_quiz(request):
    if request.method == 'POST':
        # Get the submitted answers from the form
        submitted_answers = json.loads(request.body)

        # Send user responses to AI model for movie recommendations
        recommendations = get_movie_recommendations(submitted_answers)

        # Store user preferences in the database
        user_preferences = UserPreferences(user=request.user, preferences=submitted_answers)
        user_preferences.save()

        return JsonResponse({'recommendations': recommendations})

def get_movie_recommendations(user_responses):
    # Send user responses to AI model for movie recommendations
    response = requests.post(AI_MODEL_ENDPOINT, json=user_responses)
    recommendations = response.json().get('recommendations', [])
    return recommendations