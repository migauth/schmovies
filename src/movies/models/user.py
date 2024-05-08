from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


class User(models.Model):
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username

    def set_password(self, raw_password):
        # Django's built-in method for hashing passwords
        self.password = make_password(raw_password)
        self.save()

    def check_password(self, raw_password):
        # Django's built-in method for checking passwords
        return check_password(raw_password, self.password)

