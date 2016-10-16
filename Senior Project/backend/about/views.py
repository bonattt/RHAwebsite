from django.http import HttpResponse

def officers(request):
	file = open('html/officers.html');
	return HttpResponse(file.read());

	
def constitution(request):
	file = open('html/redirect_constitution.html');
	return HttpResponse(file);
	
	
def procDoc(request):
	file = open('html/redirect_procDoc.py');
	return HttpResponse(file);
	
	
def committees(request):
	file = open('html/committees');
	return HttpResponse(file.read());
	
	
def contact(request):
	file = open('html/');
	return HttpResponse('<h1> TODO: make the email open email something? </h1>');