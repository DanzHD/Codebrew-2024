from django.urls import path
from . import views

urlpatterns = [
    path('Helloworld', views.Helloworld),
    path('get_text', views.get_data)
]