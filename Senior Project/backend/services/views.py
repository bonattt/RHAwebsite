from django.http import HttpResponse


def subwayCam(request):
	file = open('../../html/subwayCam.html');
	return HttpResponse(file.read());