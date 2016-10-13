from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^reimbursement', views.reimbursement),
	url(r'^payment', views.payment),	
];