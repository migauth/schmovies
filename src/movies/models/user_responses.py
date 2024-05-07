from django.db import models
from django.contrib.auth.models import User

class UserResponse(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='responses')
    genre = models.CharField(max_length=100)
    rating = models.IntegerField()
    mood = models.CharField(max_length=100)
    tags = models.CharField(max_length=255)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.genre}"

