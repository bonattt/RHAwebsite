from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^aboutHalls/', views.aboutHalls),
	url(r'^floorMoney/', views.floorMoney),
	
];