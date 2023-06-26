from django.urls import path
from . import views

urlpatterns = [
    path('message/', views.message, name='message'),
    path('sendmessage/', views.sendmessage, name="sendmessage")
]
