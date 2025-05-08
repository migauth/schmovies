from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models.movie import Movie
from .serializers import MovieSerializer
import os
import requests
import logging

logger = logging.getLogger(__name__)

# API key from TMDB
TMDB_API_KEY = os.environ.get('TMDB_API_KEY')

class MovieListAPIView(APIView):
    def get(self, request):
        try:
            logger.info("MovieListAPIView.get called")
            
            # First try to get movies from the database
            movies_from_db = Movie.objects.all()
            
            # If we have movies in the database, return them
            if movies_from_db.exists():
                logger.info(f"Returning {movies_from_db.count()} movies from database")
                serializer = MovieSerializer(movies_from_db, many=True)
                response = Response(serializer.data, status=status.HTTP_200_OK)
                
                # Add CORS headers
                response["Access-Control-Allow-Origin"] = "*"
                response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
                response["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
                
                return response
                
            # If no movies in database, fetch from TMDB API
            if not TMDB_API_KEY:
                logger.error("TMDB_API_KEY not found")
                return Response({"error": "API key not configured"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
            # Fetch genre names from TMDB API
            logger.info("Fetching genres from TMDB API")
            genres_response = requests.get(f'https://api.themoviedb.org/3/genre/movie/list?api_key={TMDB_API_KEY}&language=en-US')
            if genres_response.status_code == 200:
                genres_data = genres_response.json()
                genre_mapping = {genre['id']: genre['name'] for genre in genres_data['genres']}
                logger.info(f"Successfully fetched {len(genre_mapping)} genres")
            else:
                logger.error(f"Failed to fetch genre data: {genres_response.status_code}")
                return Response({"error": "Failed to fetch genre data"}, status=status.HTTP_400_BAD_REQUEST)
            
            # Fetch movies from TMDB API
            logger.info("Fetching movies from TMDB API")
            movies_response = requests.get(f'https://api.themoviedb.org/3/movie/popular?api_key={TMDB_API_KEY}')
            if movies_response.status_code == 200:
                movies_data = movies_response.json()['results']
                logger.info(f"Successfully fetched {len(movies_data)} movies")
                
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
                            'release_year': movie['release_date'][:4] if movie.get('release_date') else 'Unknown',
                            'poster_url': f"https://image.tmdb.org/t/p/w500{movie['poster_path']}" if movie.get('poster_path') else ""
                        }
                    )
                
                # Fetch movies from the database and serialize
                movies_from_db = Movie.objects.all()
                serializer = MovieSerializer(movies_from_db, many=True)
                response = Response(serializer.data, status=status.HTTP_200_OK)
                
                # Add CORS headers
                response["Access-Control-Allow-Origin"] = "*"
                response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
                response["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
                
                return response
            else:
                logger.error(f"Failed to fetch movie data: {movies_response.status_code}")
                return Response({"error": "Failed to fetch movie data"}, status=status.HTTP_400_BAD_REQUEST)
                
        except Exception as e:
            logger.exception(f"Error in MovieListAPIView.get: {str(e)}")
            response = Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            # Add CORS headers even on error
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
            response["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
            
            return response
            
    def options(self, request, *args, **kwargs):
        """Handle preflight OPTIONS requests"""
        response = Response({}, status=status.HTTP_200_OK)
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        return response

        
# genres = f'https://api.themoviedb.org/3/genre/movie/list?api_key={TMDB_API_KEY}&language=en-US'

