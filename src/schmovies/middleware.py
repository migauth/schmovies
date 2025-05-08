class CorsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Handle preflight OPTIONS requests
        if request.method == 'OPTIONS':
            response = HttpResponse()
            response.status_code = 200
            response["Access-Control-Allow-Origin"] = "*"
            response["Access-Control-Allow-Headers"] = "Accept, Accept-Encoding, Authorization, Content-Type, Origin, User-Agent, X-Requested-With"
            response["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
            response["Access-Control-Max-Age"] = "86400"  # 24 hours
            return response
        
        # Process the regular request
        response = self.get_response(request)
        
        # Add CORS headers to all responses
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Headers"] = "Accept, Accept-Encoding, Authorization, Content-Type, Origin, User-Agent, X-Requested-With"
        response["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        
        return response

from django.http import HttpResponse

class SimpleMoviesMiddleware:
    """Special middleware to handle the /api/movies/movies/ endpoint specifically"""
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Special handling for the movie API endpoint - handle with and without trailing slash
        if request.path == '/api/movies/movies/' or request.path == '/api/movies/movies' or request.path == '/movies.json':
            if request.method == 'OPTIONS':
                response = HttpResponse()
                response.status_code = 200
                response["Access-Control-Allow-Origin"] = "*"
                response["Access-Control-Allow-Headers"] = "Accept, Accept-Encoding, Authorization, Content-Type, Origin, User-Agent, X-Requested-With"
                response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
                response["Access-Control-Max-Age"] = "86400"  # 24 hours
                return response
            
            if request.method == 'GET':
                from movies.models.movie import Movie
                from django.http import JsonResponse
                import logging
                
                logger = logging.getLogger(__name__)
                logger.info(f"SimpleMoviesMiddleware handling request for path: {request.path}")
                
                try:
                    # Get all movies from the database
                    all_movies = list(Movie.objects.values())
                    logger.info(f"Successfully retrieved {len(all_movies)} movies from database")
                    
                    # Create the response
                    response = JsonResponse(all_movies, safe=False)
                    response["Access-Control-Allow-Origin"] = "*"
                    response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
                    response["Access-Control-Allow-Headers"] = "Content-Type, Origin"
                    
                    return response
                except Exception as e:
                    # Log the error but continue with normal request processing
                    logger.error(f"Error in SimpleMoviesMiddleware: {str(e)}")
                    
                    # Return a friendly error response instead of passing to normal flow
                    response = JsonResponse({"error": f"Failed to retrieve movies: {str(e)}"}, status=500)
                    response["Access-Control-Allow-Origin"] = "*"
                    response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
                    response["Access-Control-Allow-Headers"] = "Content-Type, Origin"
                    return response
        
        # Normal request handling for other paths
        return self.get_response(request)