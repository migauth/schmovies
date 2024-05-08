from django.shortcuts import render

# Create your views here.

from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Movie
from .serializers import MovieSerializer
from rest_framework import status
import os
import requests


TMDB_API_KEY = os.environ.get('TMDB_API_KEY')


class MovieListAPIView(APIView):
    def get(self, request):
        # Fetch genre names from TMDB API
        genres_response = requests.get(f'https://api.themoviedb.org/3/genre/movie/list?api_key={TMDB_API_KEY}&language=en-US')
        if genres_response.status_code == 200:
            genres_data = genres_response.json()
            genre_mapping = {genre['id']: genre['name'] for genre in genres_data['genres']}
        else:
            return Response({"error": "Failed to fetch genre data"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Fetch movies from TMDB API
        movies_response = requests.get(f'https://api.themoviedb.org/3/movie/popular?api_key={TMDB_API_KEY}')
        if movies_response.status_code == 200:
            movies_data = movies_response.json()['results']
            # Iterate through movies and replace genre IDs with genre names
            for movie in movies_data:
                movie['genres'] = ', '.join([genre_mapping.get(genre_id, '') for genre_id in movie.get('genre_ids', [])])
                # Update or create movie object in database
                Movie.objects.update_or_create(
                    id=movie['id'],
                    defaults={
                        'title': movie['title'],
                        'description': movie['overview'],
                        'genre': movie['genres'],
                        'release_year': movie['release_date'][:4],
                        'poster_url': f"https://image.tmdb.org/t/p/w500{movie['poster_path']}"
                    }
                )
            # Fetch movies from the database and serialize
            movies_from_db = Movie.objects.all()
            serializer = MovieSerializer(movies_from_db, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Failed to fetch movie data"}, status=status.HTTP_400_BAD_REQUEST)

        
# genres = f'https://api.themoviedb.org/3/genre/movie/list?api_key={TMDB_API_KEY}&language=en-US'

