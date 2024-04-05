from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
import os
from .api import 

# Create your views here.
# GEMINI_API_KEY = os.environ.get()

@api_view(['GET'])
def Helloworld(request):

    return Response("Helloworld")