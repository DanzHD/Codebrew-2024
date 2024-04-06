from rest_framework.response import Response
from rest_framework.decorators import api_view
import os
from django.http import HttpResponse
import uuid
import json

import google.generativeai as genai
from google.cloud import texttospeech


client = texttospeech.TextToSpeechClient()


GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel('gemini-pro')


tests = dict()

@api_view(['POST'])
def createAudio(request):
    language = request.data['language']
    if (language == "English"):
        language_code = "en-US"
    elif language == "Japanese":
        language_code = "ja-JP"
    elif language == "French":
        language_code = "fr-CA"
    elif language == "Chinese":
        language_code = "cmn-CN"


    synthesis_input = texttospeech.SynthesisInput(text=request.data["text"])

    voice = texttospeech.VoiceSelectionParams(
        language_code=language_code, ssml_gender=texttospeech.SsmlVoiceGender.MALE
    )

    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3
    )

    response = client.synthesize_speech(
        input=synthesis_input, voice=voice, audio_config=audio_config
    )


    return HttpResponse(response.audio_content, content_type='audio/mpeg')

@api_view(['POST'])
def mark_solutions(request):
    prompt = "Here are the answers to the previous quesions\n"

    for i in range(5):
        prompt += f"Answer to question {i + 1}: {request.data[str(i)]}\n"

    chatId = request.data['id']
    chat = tests[chatId]
    prompt += "Are they correct? return your answer in an array json format with the key 'answer'. There should be no backticks"
    response = chat.send_message(prompt)
    print(response.text)
    jsonObject = json.loads(response.text)
    return Response(jsonObject)



@api_view(['GET'])
def generate_text(request):
    language = request.GET.get('language', '')

    chat = model.start_chat(history=[])
    chatId = str(uuid.uuid4())
    tests[chatId] = chat
    prompt = f"""Generate a text in {language} about a random topic. 
        It should be less than 150 words. Create 5 questions based on the text.
        return response in JSON format. Use the key 'questions' and 'text'
        Do not put backticks or the word JSON. 
        """

    response = chat.send_message(prompt)
    print(response.text)

    jsonObject = json.loads(response.text)

    return Response({
        "id": str(chatId),
        "text": jsonObject['text'],
        "questions": jsonObject["questions"]
    })




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




