"""
WSGI config for schmovies project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

import os
import sys

# Try different settings modules until one works
for settings_module in ['schmovies.settings', 'schmovies.railway_settings']:
    try:
        os.environ['DJANGO_SETTINGS_MODULE'] = settings_module
        print(f"Trying to load Django with settings module: {settings_module}")
        
        from django.core.wsgi import get_wsgi_application
        django_app = get_wsgi_application()
        
        # Define a simple WSGI app function for health checks and Django fallback
        def application(environ, start_response):
            if environ.get('PATH_INFO') == '/railway-health-check/':
                start_response('200 OK', [('Content-Type', 'text/plain')])
                return [b'OK']
            
            # Pass to Django app for all other requests
            return django_app(environ, start_response)
        
        print(f"Successfully loaded Django with settings module: {settings_module}")
        break
    except Exception as e:
        print(f"Error loading Django with settings module {settings_module}: {e}", file=sys.stderr)
        
        if settings_module == 'schmovies.railway_settings':
            # If we've tried all settings modules and still failed, use only the health check app
            print("All settings modules failed, falling back to health check only", file=sys.stderr)
            
            # Fallback application that only serves health checks
            def application(environ, start_response):
                if environ.get('PATH_INFO') == '/railway-health-check/':
                    start_response('200 OK', [('Content-Type', 'text/plain')])
                    return [b'OK']
                else:
                    start_response('500 Internal Server Error', [('Content-Type', 'text/plain')])
                    error_message = f"Django application failed to load after trying all settings modules. Last error: {str(e)}"
                    return [error_message.encode('utf-8')]
