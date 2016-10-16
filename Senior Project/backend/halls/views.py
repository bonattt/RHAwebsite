from django.http import HttpResponse


def aboutHalls(request):
	file = open('html/redirect_aboutHalls.html');
	return HttpResponse(file.read());
	

def floorMoney(request):
	file = open('html/floorMoney.html');
	return HttpResponse(file.read());