from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
import os


from .api import reply

# Create your views here.
# GEMINI_API_KEY = os.environ.get()

@api_view(['GET'])
def Helloworld(request):

    return Response("Helloworld")

from django.http import HttpResponse

@api_view(['GET'])
def my_view(request):
    # Getting individual parameters
    name = request.GET.get('name', '')  # Returns '' if name doesn't exist
    age = request.GET.get('age', '')

    return HttpResponse(f"Name: {name}, Age: {age}")


@api_view(['POST'])
def get_data(request):

    response = reply(request.data['language'])

    return Response(response)