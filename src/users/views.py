# accounts/views.py
from django.contrib.auth.forms import UserCreationForm
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import logging

logger = logging.getLogger(__name__)

@csrf_exempt
def register(request):
    if request.method == 'POST':
        logger.debug('Registration request received.')
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            logger.info('User registered successfully.')
            return JsonResponse({'message': 'User registered successfully'})
        else:
            logger.error('Invalid registration data: %s', form.errors)
            return JsonResponse(form.errors, status=400)
