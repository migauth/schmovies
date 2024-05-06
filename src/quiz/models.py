from django.db import models
from django.contrib.auth.models import User

class UserPreferences(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    preferences = models.TextField()  # Store user preferences as JSON

class MovieCategory(models.Model):
    category = models.CharField(max_length=100)
    # Add more??

class QuizResult(models.Model):
    category = models.CharField(max_length=100)
    # Add more?