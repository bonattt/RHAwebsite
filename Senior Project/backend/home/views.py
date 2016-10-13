from django.http import HttpResponse


def homePage(request):
	return HttpResponse('<h1> TODO return actual HTML here!! </h1>');

