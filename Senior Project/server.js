
port = 8000;

http = require('http');
fs = require('fs');
url = require('url');
express = require('express');
multer = require('multer');
app = express();
/*var eventPhotoStorage =  multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './resources/images/events');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var carouselPhotoStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './resources/images/carousel');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
}); */

var upload = multer({dest: 'resources/images/events/'});
var type = upload.single('imageFile');

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

app.get('/uploadTest', function(req, res) {
  res.sendFile(__dirname + '/html/uploadTest.html')
});

/*app.post('/api/v1/carouselPhoto', function(req, res) { //we will need to make this more secure (only let those that have admin permissions make this call)
  console.log("before calling upload:" + req.files);
  uploadCarouselPhoto(req, res, function(err) {
    if(err) {
      console.log("inside upload:" + req.files);
      console.log(err);
      return res.end("Error uploading file.");
    }
    res.end("File is uploaded");
  });
}); */

app.post('/api/v1/eventPhoto', type, function(req, res) {  //we will need to make this more secure (only let those that have admin permissions make this call)
    var tmp_path = req.file.path;
    var target_path = 'resources/images/events/' + req.file.filename + '_' + req.file.originalname;
    var pathToSend = '../images/events/' + req.file.filename + '_' + req.file.originalname;
    fs.readFile(tmp_path, function(err, data) {
      fs.writeFile(target_path, data);
      fs.unlink(tmp_path);
      res.filePath = target_path;
      console.log(res);
      res.status(200).json({filepath: pathToSend}).send();
      return;
    });
  });

app.post('/api/v1/galleryPhoto', type, function(req, res) {  //we will need to make this more secure (I don't think everyone should upload junk to here)
    var tmp_path = req.file.path;
    var target_path = 'resources/images/gallery/' + req.file.filename + '_' + req.file.originalname;
    var pathToSend = '../images/gallery/' + req.file.filename + '_' + req.file.originalname;
    fs.readFile(tmp_path, function(err, data) {
      fs.writeFile(target_path, data);
      fs.unlink(tmp_path);
      res.filePath = target_path;
      console.log(res);
      res.status(200).json({filepath: pathToSend}).send();
      return;
    });
  });

app.post('/api/v1/carouselPhoto', type, function(req, res) {  //we will need to make this more secure (only let those that have admin permissions make this call)
    var tmp_path = req.file.path;
    var target_path = 'resources/images/carousel/' + req.file.filename + '_' + req.file.originalname;
    var pathToSend = '../images/carousel/' + req.file.filename + '_' + req.file.originalname;
    fs.readFile(tmp_path, function(err, data) {
      fs.writeFile(target_path, data);
      fs.unlink(tmp_path);
      res.filePath = target_path;
      console.log(res);
      res.status(200).json({filepath: pathToSend}).send();
      return;
    });
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