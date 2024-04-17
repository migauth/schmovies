from django.db import models

# Create your models here.

class Movie(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    genre = models.CharField(max_length=100)
    release_year = models.IntegerField()
    poster_url = models.URLField()

    def __str__(self):
        return self.title
