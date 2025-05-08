from django.urls import path
from .views import MovieListAPIView

urlpatterns = [
    # Include both with and without trailing slash to ensure both work
    path('movies/', MovieListAPIView.as_view(), name='movie-list'),
    path('movies', MovieListAPIView.as_view(), name='movie-list-no-slash'),
]