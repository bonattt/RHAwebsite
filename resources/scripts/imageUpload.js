function PhotoPostXhr(apiCall) {
    this.xhr = new XMLHttpRequest();
    this.xhr.open('POST', getPhotoApiUri(apiCall));
}

PhotoPostXhr.prototype.send = function(formData) {
    this.xhr.send(formData);
}

PhotoPostXhr.prototype.imageCallback = function(xhr, json_data, field_name) {
    var theXhr = this.xhr;
    theXhr.onload = function (e) {
        if (typeof field_name == 'undefined') {
            field_name = 'image';
        }
        var image_path = JSON.parse(theXhr.responseText).filepath;
        json_data[field_name] = image_path;
        xhr.send(JSON.stringify(json_data));
    }
}

PhotoPostXhr.prototype.callback = function(callback) {
    this.xhr.onload = callback;
}

// function PhotoDeleteXhr(apiCall) {
//     this.xhr = new XMLHttpRequest();
//     this.xhr.open('DELETE', getPhotoApiUri(apiCall));
// }

// PhotoDeleteXhr.prototype = PhotoPostXhr.prototype

function getPhotoApiUri(backendFilepath) {
    return location.protocol + '//' + location.hostname +
                (location.port ? ':' + location.port: '') +
                '/api/v1/' + backendFilepath;
}


function PhotoReplaceXhr(apiCall) {
    this.xhr = new XMLHttpRequest();
    this.xhr.open('POST', getPhotoApiUri(apiCall));
}

PhotoReplaceXhr.prototype.send = function(file) {
    var formData = new FormData();
    formData.append("imageFile", file);
    this.xhr.send(formData);
}

PhotoReplaceXhr.prototype.imageCallback = function(xhr, json_data, field_name) {
    var thisXhr = this.xhr; // need to reference this in callback.
    var image_to_delete = json_data[field_name].replace('..', '.');
    thisXhr.open('POST', getPhotoApiUri('committeePhoto/'), true);
    thisXhr.onreadystatechange = function (e) {
        if (thisXhr.readyState == 4 && thisXhr.status == 200) {
            imageDeleteFunction(json_data[field_name].substring(2));
            json_data[field_name] = JSON.parse(thisXhr.response).filepath;
            xhr.onreadystatechange = function (e) {
                if(xhr.readyState == 4 && xhr.status == 200) {
//                    location.reload();
                }
            };
            xhr.send(JSON.stringify(json_data));
        }
    }
}

function buildDeleteUri(uri) {
    return location.protocol + '//'
        + location.hostname
        + (location.port ? ':' + location.port : '')
        + '/api/v1' + uri;
}

function imageDeleteFunction(filePath) {
    var photoDeleteApi = buildDeleteUri('/photo');
    var formData = new FormData();
    var photoxhr = new XMLHttpRequest();
    var dbObject = {};
    dbObject["imagePath"] = 'resources' + filePath;

    photoxhr.open('DELETE', photoDeleteApi, true);
    photoxhr.setRequestHeader('Content-Type', 'application/json');

    photoxhr.send(JSON.stringify(dbObject));
}