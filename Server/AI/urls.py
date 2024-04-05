from django.urls import path
from . import views

urlpatterns = [
    path('transcription', views.createAudio),
    path('data', views.get_data),
    path('text', views.generate_text),
    path('solutions', views.mark_solutions),
]