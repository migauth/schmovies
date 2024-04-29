from django.urls import path
from .views import MovieListAPIView

urlpatterns = [
    path('', MovieListAPIView.as_view(), name='movie-list'),
    # path('fetch-movies/', MovieListAPIView.as_view(), name='fetch-movies'),
]
