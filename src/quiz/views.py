import os
import json
import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import UserPreferences
import openai
from openai import OpenAI

OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
TMDB_API_KEY = os.environ.get('TMDB_API_KEY')

client = OpenAI(
    # This is the default and can be omitted
    api_key=OPENAI_API_KEY,
)

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

def get_movie_suggestions(genre,keywords):
    
    chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": f'reduce this down to one word that sums the whole thing up: {keywords}',
        }
    ],
    model="gpt-3.5-turbo",
)
    keyword = chat_completion.choices[0].message.content

    print(keyword)
    
    # Make request to TMDb API to fetch movie suggestions based on genre
    api_key = TMDB_API_KEY
    url2 = f'https://api.themoviedb.org/3/discover/movie?api_key=e010f27028932aac6c5b0fcdfcfc359f&language=en-US&sort_by=popularity.desc&with_genres=28&query={keyword}'
    
    url = f'https://api.themoviedb.org/3/discover/movie?api_key={TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres={genre}&query={keyword}'

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