from django.http import HttpResponse


def signUps(request):
	file = open('../../html/sign-ups.html');
	return HttpResponse(file.read());
	
	
def proposals(request):
	file = open('../../html/proposals.html');
	return HttpResponse(file.read());
	
	
def pastEvents(request):
	file = open('../../html/pastEvents.html');
	return HttpResponse(file.read());
	