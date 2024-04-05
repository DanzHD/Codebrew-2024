from django.urls import path
from . import views

urlpatterns = [
    path('helloworld', views.HelloWorld),
    path('test', views.Test),
    path('data', views.get_data)
]