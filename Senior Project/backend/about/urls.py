from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^officers/', views.officers),
	url(r'^constitution/', views.constitution),
	url(r'^procDoc/', views.procDoc),
	url(r'^committees/', views.committees),
	url(r'^contact/', views.contact),
];