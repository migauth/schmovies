import os
import json
import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
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
        print(answers)
        
        # Call the function to get movie suggestions based on user's preference
        recommendations = get_movie_suggestions(answers)

        # Return movie recommendations as a JSON response
        return JsonResponse({'recommendations': recommendations})

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
    url = f'https://api.themoviedb.org/3/search/movie?api_key={TMDB_API_KEY}&query={keyword}&include_adult=false'
    
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        # Extract movie suggestions from API response
        movies = data.get('results', [])
        return movies
    else:
        # If API request fails, return an empty list
        return []
