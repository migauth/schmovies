from django.db import models

class Movie(models.Model):
    title = models.CharField(max_length=255, default="Unknown Title")
    description = models.TextField(default="No description available.")
    genre = models.CharField(max_length=100, default="Unknown Genre")
    release_year = models.CharField(max_length=4, default='none')
    poster_url = models.URLField(default="https://example.com/default_poster.jpg")

    def __str__(self):
        return self.title

