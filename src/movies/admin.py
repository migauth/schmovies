from django.contrib import admin

# Register your models here.

from .models.movie import Movie

admin.site.register(Movie)