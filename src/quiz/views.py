import json
import os
from openai import OpenAI

from django.http import JsonResponse
from .models import UserPreferences

# Load OpenAI API key from environment variable
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
print("OPENAI_API_KEY:", OPENAI_API_KEY)  # Print the value of the API key
client = OpenAI(api_key=OPENAI_API_KEY)

def submit_quiz(request):
    if request.method == 'POST':
        try:
            # Get the submitted answers from the request
            submitted_answers = json.loads(request.body)

            # Generate movie recommendations using GPT-3
            recommendations = generate_movie_recommendations(submitted_answers)

            # # Print recommendations to console
            print("Movie recommendations:", recommendations)

            # Store user preferences in the database
            user_preferences = UserPreferences(user=request.user, preferences=submitted_answers)
            user_preferences.save()

            return JsonResponse({'recommendations': recommendations})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)

def generate_movie_recommendations(user_responses):
    try:
        # Define the prompt for GPT-3
        prompt = "User preferences: " + json.dumps(user_responses) + "\nGenerate movie recommendations:"

        # Generate movie recommendations using GPT-3
        response = client.completions.create(engine="davinci",
        prompt=prompt,
        max_tokens=100,
        temperature=0.7,
        n=5,
        stop="\n")

        # Extract recommendations from GPT-3 response
        recommendations = [choice['text'].strip() for choice in response.choices]

        return recommendations
    except Exception as e:
        raise Exception("Failed to generate movie recommendations: " + str(e))
