
port = 8000;

http = require('http');
fs = require('fs');
url = require('url');
express = require('express');
app = express();

app.use(express.static('resources'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/html/RHAhome.html');
});

app.get('/proposals', function (req, res) {
	res.sendFile(__dirname + '/html/proposals.html');
});

app.get('/sign-ups', function (req, res) {
	res.sendFile(__dirname + '/html/sign-ups.html');
});

app.get('/pastEvents', function (req, res) {
	res.sendFile(__dirname + '/html/pastEvents.html');
});

app.get('/subwayCam', function (req, res) {
	res.sendFile(__dirname + '/html/subwayCam.html');
});

app.get('/floorMoney', function (req, res) {
	res.sendFile(__dirname + '/html/floorMoney.html');
});

app.get('/officers', function (req, res) {
	res.sendFile(__dirname + '/html/officers.html');
});

app.get('/committees', function (req, res) {
	res.sendFile(__dirname + '/html/committees.html');
});

var server = app.listen(port, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log("Example app listening at http://%s:%s", host, port)
});


var address = 'http://127.0.0.1:' + port + '/';
console.log('Server running at ' + address);