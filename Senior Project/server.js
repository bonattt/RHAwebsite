
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
var RosefireTokenVerifier = require('rosefire-node');
var SECRET = "hwiN2rg1Eu8wX350a9y5";
var rosefire = new RosefireTokenVerifier(SECRET);
console.log("hey there");

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

app.get('/photoGallery', function (req, res) {
	res.sendFile(__dirname + '/html/photoGallery.html');
});

app.get('/reserveEquipment', function (req, res) {
	res.sendFile(__dirname + '/html/reserveEquipment.html');
});

app.get('/activeMembersList', function (req, res) {
	res.sendFile(__dirname + '/html/activeMembersList.html');
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

app.post('/foobar', function (req, res) {
  var token = req.body.token;
  if (!token) {
    res.status(401).json({
      error: 'Not authorized!1' + req.body.token
    });
    return;
  }
  // token = token.split(' ')[1];
  rosefire.verify(token, function(err, authData) {
    if (err) {
      res.status(401).json({
        error: 'Not authorized!2'
      });
    } else {
      console.log(authData.username); // rockwotj
      console.log(authData.issued_at); // <Date Object of issued time> 
      console.log(authData.group); // STUDENT (Only there if options asked)
      console.log(authData.expires) // <Date Object> (Only there if options asked)
      res.json(authData);
      //res.send(authData);
    }
  });
});

var server = app.listen(port, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log("Example app listening at http://%s:%s", host, port)
});


var address = 'http://127.0.0.1:' + port + '/';
console.log('Server running at ' + address);