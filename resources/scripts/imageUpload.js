

function PhotoPostXhr(apiCall) {
    this.xhr = new XMLHttpRequest();
    this.xhr.open('POST', getPhotoApiUrl(apiCall));
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
//        alert(JSON.stringify(json_data));
        xhr.send(JSON.stringify(json_data));
    }
}

PhotoPostXhr.prototype.callback = function(callback) {
    this.xhr.onload = callback;
}

// function PhotoDeleteXhr(apiCall) {
//     this.xhr = new XMLHttpRequest();
//     this.xhr.open('DELETE', getPhotoApiUrl(apiCall));
// }

// PhotoDeleteXhr.prototype = PhotoPostXhr.prototype

function getPhotoApiUrl(backendFilepath) {
    return location.protocol + '//' + location.hostname +
                (location.port ? ':' + location.port: '') +
                '/api/v1/' + backendFilepath;
}


//function getPhotoUploadXhr(pagePhotoUrl) {
//
//    var photoAPIURL =
//
//    var formData = new FormData();
//    formData.append("imageFile", files[0]);
//    photoXhr.open('POST', photoAPIURL, true);
//
//    photoXhr.onreadystatechange = function (e) {
//        if(photoXhr.readyState == 4 && photoXhr.status == 200) {
//            var image_path = JSON.parse(photoXhr.responseText).filepath;
//            var xhr = xhrPostRequest(urlExtension);
//
//            xhr.onreadystatechange = function (e) {
//                if(xhr.readyState == 4 && xhr.status == 200) {
//                    location.reload();
//                }
//            };
//
//
//            xhr.send(JSON.stringify({ committeeName: committeeName.value, description: committeeDesc.value, image: image_path }));
//            clearSubmitHandlers(submitBtn);
//            return xhr;
//        }
//    };
//    return photoXhr;
//}