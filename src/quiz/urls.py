from django.urls import path
from . import views

urlpatterns = [
    path('submit-quiz/', views.submit_quiz, name='submit_quiz'),
]

# urlpatterns = [
#     path('', views.quiz_view, name='quiz'), * I don't think we want this one
#     path('submit/', views.submit_quiz, name='submit_quiz'),
#     path('result/', views.result_view, name='quiz_result'),
# ]