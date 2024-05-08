from django.urls import path
from . import views

# urlpatterns = [
#     path('', views.quiz_view, name='quiz'),
#     path('submit/', views.submit_quiz, name='submit_quiz'),
#     path('result/', views.result_view, name='quiz_result'),
# ]

urlpatterns = [
    path('submit-quiz/', views.submit_quiz, name='submit_quiz'),
]