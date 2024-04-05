from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
import os


# from .api import 

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
def get_text(request):
    # Parse the JSON request
    data = JSONParser().parse(request)

    # Retrieve the user's input from the data. 
    # Replace 'user_input' with the actual key name in the JSON request
    user_input = data.get('user_input', '')

    # Append "!" to the end of the user's input
    modified_input = user_input + "!"

    # Return the modified string in a JSON response
    return JsonResponse({"modified_input": modified_input})