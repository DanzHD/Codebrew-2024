from rest_framework.response import Response
from rest_framework.decorators import api_view
import os
from django.http import JsonResponse


import google.generativeai as genai
from google.cloud import texttospeech

client = texttospeech.TextToSpeechClient()


GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel('gemini-pro')


@api_view(['GET'])
def HelloWorld(request):

    return Response("Hello World")

@api_view(['GET'])
def Test(request):

    

    synthesis_input = texttospeech.SynthesisInput(text="Hello World!")

    voice = texttospeech.VoiceSelectionParams(
        language_code="en-US", ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL
    )

    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3
    )

    response = client.synthesize_speech(
        input=synthesis_input, voice=voice, audio_config=audio_config
    )

    with open("output.mp3", "wb") as out:
        out.write(response.audio_content)
        print("Audio content written to file output.mp3")
    
    with open("output.mp3", "rb") as f:
        audio_data = f.read()
        print("Audio data stored")


    return Response(audio_data, status=200, content_type="audio/mpeg")

@api_view(['POST', 'GET'])
def get_data(request):
    language = 'FRENCH'
    if (request.method == 'POST'):
        language = request.data['language']
        print(language)
    
    if (request.method == 'GET'):
        language = request.GET.get('language', '')
        print(language)

    return Response(language)
