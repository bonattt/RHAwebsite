from django.http import HttpResponse


def aboutHalls(request):
	return HttpResponse('<h1> TODO redirect to webpage! </h1>');
	

def floorMoney(request):
	file = open('../../html/floorMoney.html');
	return HttpResponse(file.read());