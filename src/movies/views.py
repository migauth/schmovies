from django.shortcuts import render

# Create your views here.

from rest_framework import generics
from rest_framework.response import Response
from .models import Movie
from .serializers import MovieSerializer
from rest_framework import status


# class MovieListCreateView(generics.ListCreateAPIView):
#     queryset = Movie.objects.all()
#     serializer_class = MovieSerializer

# http://127.0.0.1:8000/api/movies/?format=api for looking at the Django REST framework

class MovieListCreateView(generics.ListCreateAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    lookup_field = 'id'  # Set the lookup field to 'id'

    def delete(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response({"message": "Movie deleted successfully"}, status=status.HTTP_200_OK)
        except Movie.DoesNotExist:
            return Response({"error": "Movie not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
    def perform_destroy(self, instance):
        instance.delete()