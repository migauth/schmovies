from django.shortcuts import render

# Create your views here.

# from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Movie
from .serializers import MovieSerializer
from rest_framework import status
import os
import requests

TMDB_API_KEY = os.environ.get('TMDB_API_KEY')



# http://127.0.0.1:8000/api/movies/?format=api for looking at the Django REST framework


# view to fetch movies from tmdb api and save to db
class MovieListAPIView(APIView):
    def get(self, request):
        response = requests.get(f'https://api.themoviedb.org/3/movie/popular?api_key={TMDB_API_KEY}')
        if response.status_code == 200:
            movies = response.json()['results']
            for movie in movies:
                Movie.objects.update_or_create(
                    id=movie['id'],
                    defaults={
                        'title': movie['title'],
                        'description': movie['overview'],
                        'genre': ', '.join(map(str, movie['genre_ids'])),
                        'release_year': movie['release_date'][:4],
                        'poster_url': f"https://image.tmdb.org/t/p/w500{movie['poster_path']}"
                    }
                )
            return Response({"message": "Movies fetched successfully"}, status=200)
        else:
            return Response({"error": response.text}, status=400)
