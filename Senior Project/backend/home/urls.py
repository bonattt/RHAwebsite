from django.conf.urls import include, url
from django.contrib import admin
from . import views

urlpatterns = [
	url(r'^home/', views.homePage),
	url(r'^admin/', admin.site.urls),
	url(r'^about/', include('about.urls')),
	url(r'^events/', include('events.urls')),
	url(r'^forms/', include('forms.urls')),
	url(r'^halls/', include('halls.urls')),
	url(r'^services/', include('services.urls')),
];