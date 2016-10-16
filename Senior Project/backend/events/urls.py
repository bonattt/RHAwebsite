from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^signUps/', views.signUps),
	url(r'^proposals/', views.proposals),
	url(r'^pastEvents/', views.pastEvents),
];