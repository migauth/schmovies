from django.urls import path
from .views import MovieListCreateView, GetMoviesView

urlpatterns = [
    path('fetch-movies/', MovieListCreateView.as_view(), name='fetch-movies'),
    path('movies/', GetMoviesView.as_view(), name='movie-list'),
]
