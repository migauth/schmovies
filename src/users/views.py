from django.shortcuts import render, redirect
from django.contrib.auth import logout
from django.contrib.auth.views import LoginView
from django.contrib.auth.forms import UserCreationForm
from django.middleware.csrf import get_token
from django.http import JsonResponse

def csrf_token(request):
    """
    A view that returns the CSRF token for AJAX requests.
    """
    return JsonResponse({'csrfToken': get_token(request)})

def custom_register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            # Redirect to login page after successful registration
            return redirect('login')
    else:
        form = UserCreationForm()
    return render(request, 'registration/register.html', {'form': form})

def user_logout(request):
    logout(request)
    return redirect('home')  # Redirect to the home page or any other page


# from rest_framework.permissions import AllowAny
# from rest_framework.decorators import api_view, permission_classes

# from django.shortcuts import render, redirect
# from django.contrib.auth import logout
# from django.contrib.auth.views import LoginView
# from django.contrib.auth.forms import UserCreationForm


# @api_view(['POST'])
# @permission_classes([AllowAny])
# def custom_register(request):
#     if request.method == 'POST':
#         form = UserCreationForm(request.POST)
#         if form.is_valid():
#             form.save()
#             # Redirect to login page after successful registration
#             return redirect('login')
#     else:
#         form = UserCreationForm()
#     return render(request, 'registration/register.html', {'form': form})

# def user_logout(request):
#     logout(request)
#     return redirect('home')  # Redirect to the home page or any other page