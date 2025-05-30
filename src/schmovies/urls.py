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
from django.shortcuts import redirect


def redirect_to_movies(request):
    return redirect('/api/movies/')

urlpatterns = [
    path('', redirect_to_movies),
    path('admin/', admin.site.urls),
    path('api/movies/', include('movies.urls')),
    path('quiz/', include('quiz.urls')),
    path('users/', include('users.urls')),  # Include app-specific URL

]

