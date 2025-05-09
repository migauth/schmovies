"""
URL configuration for schmovies project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, reverse_lazy
from django.contrib.auth import views as auth_views
from django.http import HttpResponse
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

# Simple health check view
def health_check(request):
    return HttpResponse("OK")

# Debug view to help diagnose API issues
def debug_info(request):
    import json
    from django.conf import settings
    from django.db import connection
    from movies.models.movie import Movie
    
    try:
        # Check database connection
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            db_connected = cursor.fetchone() is not None
    except Exception as e:
        db_connected = False
        db_error = str(e)
    
    # Count movies
    try:
        movie_count = Movie.objects.count()
        sample_movies = list(Movie.objects.values('id', 'title', 'release_year')[:5])
    except Exception as e:
        movie_count = 0
        sample_movies = []
        movie_error = str(e)
    
    # Gather environment info
    debug_data = {
        "app_status": "running",
        "database": {
            "connected": db_connected,
            "error": db_error if not db_connected else None,
        },
        "movies": {
            "count": movie_count,
            "sample": sample_movies,
            "error": movie_error if movie_count == 0 and 'movie_error' in locals() else None,
        },
        "api_keys": {
            "tmdb_available": bool(settings.TMDB_API_KEY),
            "openai_available": bool(settings.OPENAI_API_KEY),
        },
        "cors": {
            "allowed_origins": settings.CORS_ALLOWED_ORIGINS,
            "allow_all": settings.CORS_ALLOW_ALL_ORIGINS,
        },
        "environment": {
            "debug": settings.DEBUG,
            "allowed_hosts": settings.ALLOWED_HOSTS,
        }
    }
    
    return JsonResponse(debug_data)

def movies_json(request):
    """Direct JSON endpoint for movies that bypasses DRF"""
    from django.http import JsonResponse
    from movies.models.movie import Movie
    import logging
    
    logger = logging.getLogger(__name__)
    logger.info(f"movies_json view called for path: {request.path}")
    
    try:
        # Get all movies from the database
        movies = list(Movie.objects.values())
        logger.info(f"Successfully retrieved {len(movies)} movies from database")
        
        # Add CORS headers directly
        response = JsonResponse(movies, safe=False)
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        return response
    except Exception as e:
        logger.error(f"Error retrieving movies: {str(e)}")
        # Return error with CORS headers
        response = JsonResponse({"error": f"Failed to retrieve movies: {str(e)}"}, status=500)
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        return response

def movies_options(request):
    """Handle OPTIONS requests for movies endpoint"""
    from django.http import HttpResponse
    response = HttpResponse()
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/movies/', include('movies.urls')),
    # Add direct movies endpoint without relying on the movies app URL inclusion
    path('api/movies/movies/', movies_json, name='movies_direct'),
    path('api/movies/movies', movies_json, name='movies_direct_no_slash'),
    path('quiz/', include('quiz.urls')),
    path('users/', include('users.urls')),
    path('health/', health_check, name='health_check'),
    path('debug/', debug_info, name='debug_info'),
    path('movies.json', movies_json, name='movies_json'),
    path('movies.json/options', movies_options, name='movies_options'),
]

# Serve static files in development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Serve frontend in production
if not settings.DEBUG:
    urlpatterns.append(path('', TemplateView.as_view(template_name='index.html')))

