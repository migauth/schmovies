# accounts/views.py
from django.contrib.auth.forms import UserCreationForm
from django.http import JsonResponse
import logging
from rest_framework.views import APIView
from rest_framework import serializers, status
from rest_framework.response import Response

logger = logging.getLogger(__name__)

class RegisterView(APIView):
    class InputSerializer(serializers.Serializer):
        email = serializers.CharField(required=True)
        username = serializers.CharField(required=True)
        password1 = serializers.CharField(required=True)
        password2 = serializers.CharField(required=True)
        
    def post(self, request):
        print(request)
        serializer = self.InputSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            return Response(status=status.HTTP_200_OK)
        return Response(data=serializer, status=status.HTTP_400_BAD_REQUEST)
    # if request.method == 'POST':
        # logger.debug('Registration request received.')
        # form = UserCreationForm(request.POST)
        # if form.is_valid():
        #     form.save()
        #     logger.info('User registered successfully.')
        #     return JsonResponse({'message': 'User registered successfully'})
        # else:
        #     logger.error('Invalid registration data: %s', form.errors)
        #     return JsonResponse(form.errors, status=400)
