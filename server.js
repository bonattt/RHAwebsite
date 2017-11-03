
port = 80;

http = require('http');
fs = require('fs');
url = require('url');
express = require('express');
multer = require('multer');
app = express();


var upload = multer({ dest: 'resources/images/' });
var path = require('path');
var type = upload.single('imageFile');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false});
var cookieParser = require('cookie-parser');

app.use(express.static('resources'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Max-Age', '86400');
  res.header("Access-Control-Allow-Headers", "Origin, X-HTTP-Method-Override, X-Requested-With, Content-Type, Accept");
  next();
});

var RosefireTokenVerifier = require('rosefire-node');
var SECRET = "Kc3fbaStbkdAa6tiX446";
var rosefire = new RosefireTokenVerifier(SECRET);
console.log("hey there");

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/html/RHAhome.html');
});

app.get('/crash', function (req, res) {
  console.log("brb crashing...");
  process.exit(1);
  console.log("failed to crash");
});

app.get('/proposals', function (req, res) {
  res.sendFile(__dirname + '/html/proposals.html');
});

app.get('/listAllProposals', function (req, res) {
  res.sendFile(__dirname + '/html/listAllProposals.html');
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

app.get('/budgetManagement', function (req, res) {
  res.sendFile(__dirname + '/html/budgetManagement.html');
});

app.get('/officers', function (req, res) {
  res.sendFile(__dirname + '/html/officers.html');
});

app.get('/committees', function (req, res) {
  res.sendFile(__dirname + '/html/committees.html');
});

app.post('/api/v1/eventPhoto', type, function (req, res) {  //we will need to make this more secure (only let those that have admin permissions make this call)
  var fileType = req.file.mimetype.split('/')[1];
  var tmp_path = req.file.path;
  var target_path = 'resources/images/events/' + req.file.filename + '.' + fileType;
  var pathToSend = '../images/events/' + req.file.filename + '.' + fileType;
  fs.readFile(tmp_path, function (err, data) {
    fs.writeFile(target_path, data);
    fs.unlink(tmp_path);
    res.filePath = target_path;
    res.status(200).json({ filepath: pathToSend }).send();
    return;
  });
});

app.post('/api/v1/galleryPhoto', type, function (req, res) {  //we will need to make this more secure (I don't think everyone should upload junk to here)
  var fileType = req.file.mimetype.split('/')[1];
  var tmp_path = req.file.path;
  var target_path = 'resources/images/gallery/' + req.file.filename + '.' + fileType;
  var pathToSend = '../images/gallery/' + req.file.filename + '.' + fileType;
  fs.readFile(tmp_path, function (err, data) {
    fs.writeFile(target_path, data);
    fs.unlink(tmp_path);
    res.filePath = target_path;
    console.log(res);
    res.status(200).json({ filepath: pathToSend }).send();
    return;
  });
});

app.get('/api/v1/galleryPhoto', type, function (req, res) {
  var target_path = 'resources/images/gallery/';
  var fileList = new Array();
  fs.readdir(target_path, (err, files) => {
    files.forEach(file => {
      fileList.push(file);
    });
    res.status(200).send(fileList);
    return;
  });
});

app.delete('/api/v1/photo', urlencodedParser, function(req, res, next) {  //we will need to make this more secure (I don't think everyone should upload junk to here)
  var target_path = req.body.imagePath + "";
  if (fs.existsSync(target_path)) {
    fs.unlink(target_path);
    res.status(200).json({ status: 'The file ' + target_path + ' was deleted.' }).send();
  } else {
    res.status(404).json({ status: 'The file ' + target_path + ' does not exist.' }).send();
  }
  return;
});

app.post('/api/v1/carouselPhoto', type, function (req, res) {  //we will need to make this more secure (only let those that have admin permissions make this call)
  var fileType = req.file.mimetype.split('/')[1];
  var tmp_path = req.file.path;
  var target_path = 'resources/images/carousel/' + req.file.filename + '.' + fileType;
  var pathToSend = '../images/carousel/' + req.file.filename + '.' + fileType;
  fs.readFile(tmp_path, function (err, data) {
    fs.writeFile(target_path, data);
    fs.unlink(tmp_path);
    res.filePath = target_path;
    console.log(res);
    res.status(200).json({ filepath: pathToSend }).send();
    return;
  });
});

app.get('/api/v1/carouselPhoto', type, function (req, res) {
  var target_path = 'resources/images/carousel/';
  var fileList = new Array();
  fs.readdir(target_path, (err, files) => {
    files.forEach(file => {
      fileList.push(file);
    });
    res.status(200).send(fileList);
    return;
  });
});

app.post('/api/v1/committeePhoto', type, function (req, res) {  //we will need to make this more secure (only let those that have admin permissions make this call)
  var fileType = req.file.mimetype.split('/')[1];
  var tmp_path = req.file.path;
  var target_path = 'resources/images/committees/' + req.file.filename + '.' + fileType;
  var pathToSend = '../images/committees/' + req.file.filename + '.' + fileType;
  fs.readFile(tmp_path, function (err, data) {
    fs.writeFile(target_path, data);
    fs.unlink(tmp_path);
    res.filePath = target_path;
    res.status(200).json({ filepath: pathToSend }).send();
    return;
  });
});

app.delete('/api/v1/committeePhoto', function (req, res) {  //we will need to make this more secure (I don't think everyone should upload junk to here)
  var toDeleteAbsolute = 'resources/' + req.body.toBaleet.substring(2);
  if (fs.existsSync(toDeleteAbsolute)) {
      fs.unlink(toDeleteAbsolute);
      console.log(res);
      res.status(200).json({ status: 'The file ' + toDeleteAbsolute + ' was deleted.' }).send();
  } else {
      res.status(404).json({ status: 'The file ' + toDeleteAbsolute + ' does not exist.' }).send();      
  }
  return;
});

app.post('/api/v1/officerPhoto', type, function (req, res) {  //we will need to make this more secure (only let those that have admin permissions make this call)
  var fileType = req.file.mimetype.split('/')[1];
  var tmp_path = req.file.path;
  var target_path = 'resources/images/officers/' + req.file.filename + '.' + fileType;
  var pathToSend = '../images/officers/' + req.file.filename + '.' + fileType;
  fs.readFile(tmp_path, function (err, data) {
    fs.writeFile(target_path, data);
    fs.unlink(tmp_path);
    res.filePath = target_path;
    res.status(200).json({ filepath: pathToSend }).send();
    return;
  });
});

app.delete('/api/v1/officerPhoto', function (req, res) {  //we will need to make this more secure (I don't think everyone should upload junk to here)
  var toDeleteAbsolute = 'resources/' + req.body.toBaleet.substring(2);
  if (toDeleteAbsolute) {
      fs.unlink(toDeleteAbsolute);
      console.log(res);
      res.status(200).json({ status: 'The file ' + toDeleteAbsolute + ' was deleted.' }).send();
  } else {
      res.status(404).json({ status: 'The file ' + toDeleteAbsolute + ' does not exist.' }).send();      
  }
  return;
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
  rosefire.verify(token, function (err, authData) {
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

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port)
});


var address = 'http://127.0.0.1:' + port + '/';
console.log('Server running at ' + address);
