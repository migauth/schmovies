
        
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Movie
from .serializers import MovieSerializer
from rest_framework import status
import os
import requests

TMDB_API_KEY = os.environ.get('TMDB_API_KEY')

class MovieListCreateView(APIView):
    def create(self, request):
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
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response({"error": response.text}, status=status.HTTP_400_BAD_REQUEST)

class GetMoviesView(APIView):
    def get(self, request):
        movies = Movie.objects.all()
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
