from django.http import HttpResponse


def homePage(request):
	file = open('html/RHAhome.html');
	return HttpResponse(file.read());

