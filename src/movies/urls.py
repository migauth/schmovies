from django.urls import path
from .views import MovieListAPIView

urlpatterns = [
    path('fetch-movies/', MovieListAPIView.as_view(), name='fetch-movies'),
]
