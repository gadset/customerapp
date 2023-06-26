from django.shortcuts import render
from django.http import HttpResponse
from sms import send_sms

def message(request):
    return HttpResponse("Hello world!")
# Create your views here.

def sendmessage(request):
    send_sms(
    'Here is the message',
    '+12065550100',
    ['+918688749458'],
    fail_silently=False
    )
    return HttpResponse("sent successful")
