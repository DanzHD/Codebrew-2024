from django.urls import path
from . import views

urlpatterns = [
    path('Helloworld', views.Helloworld)
]