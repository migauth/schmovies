from django.shortcuts import redirect
from django.contrib.auth import logout
from django.contrib.auth.views import LoginView

def user_logout(request):
    logout(request)
    return redirect('home')  # Redirect to the home page or any other page