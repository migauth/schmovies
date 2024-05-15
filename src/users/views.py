
from django.contrib.auth.forms import UserCreationForm
from django.http import JsonResponse
import logging
from rest_framework.views import APIView
from rest_framework import serializers, status
from rest_framework.response import Response

logger = logging.getLogger(__name__)

from django.contrib.auth.models import User

class RegisterView(APIView):
    class InputSerializer(serializers.Serializer):
        email = serializers.EmailField(required=True)
        username = serializers.CharField(required=True)
        password1 = serializers.CharField(required=True)
        password2 = serializers.CharField(required=True)
        
    def post(self, request):
        serializer = self.InputSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            validated_data = serializer.validated_data
            username = validated_data['username']
            email = validated_data['email']
            password1 = validated_data['password1']
            password2 = validated_data['password2']
            
            if password1 != password2:
                return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Create and save the user
            user = User.objects.create_user(username=username, email=email, password=password1)
            user.save()
            
            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import AuthenticationForm

class LoginView(APIView):
    def post(self, request):
        form = AuthenticationForm(data=request.data)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                # Include additional user data in the response
                return JsonResponse({'message': 'Login successful', 'user': {'username': user.username}}, status=status.HTTP_200_OK)
            else:
                return JsonResponse({'error': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return JsonResponse(form.errors, status=status.HTTP_400_BAD_REQUEST)

