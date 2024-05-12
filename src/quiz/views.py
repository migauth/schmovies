import os
import json
import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import UserPreferences
import openai
from openai import OpenAI
import logging

logger = logging.getLogger(__name__)


OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
TMDB_API_KEY = os.environ.get('TMDB_API_KEY')

client = OpenAI(
    # This is the default and can be omitted
    api_key=OPENAI_API_KEY,
)

@csrf_exempt
def submit_quiz(request):
    logger.info("submit_quiz function")

    if request.method == 'POST':
        
        # Extract user's preferences from the request
        data = json.loads(request.body)

        # keywords = data.get('keywords')
        answers = data.get('answers')

        # (naming conventions) submitted_answers = json.loads(request.body) this is probably a better name for the data variable

        # Call the function to get movie suggestions based on user's preference
        recommendations = get_movie_suggestions(answers)

        # Return movie recommendations as a JSON response
        return JsonResponse({'recommendations': recommendations})
    
        # # Store user preferences in the database
        # user_preferences = UserPreferences(user=request.user, preferences=submitted_answers)
        # user_preferences.save()

    # If the request method is not POST, return an error
    return JsonResponse({'error': 'Method not allowed'}, status=405)


def get_movie_suggestions(answers):
    
    # Open ai stuff below
    
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

    print("result from open ai:", keyword)
    
    # Make request to TMDb API to fetch movie suggestions based on genre
    url = f'https://api.themoviedb.org/3/search/movie?api_key={TMDB_API_KEY}&query={keyword}'
    
    # (stretch) go into the db and comb through all the decscriptions with the keyword, then return the title of the movie - match the title to the movie in in the db (or api call?) and display it

    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        # Extract movie suggestions from API response
        movies = data.get('results', [])
        return movies
    else:
        # If API request fails, return an empty list
        return []
