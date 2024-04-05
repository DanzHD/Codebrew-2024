from django.urls import path
from . import views

urlpatterns = [
    path('Helloworld', views.Helloworld),
    path('get_data', views.get_data)
]