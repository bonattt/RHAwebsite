//Get all pictures by classname and loop through them, adding an on click to each of them
//That on click should be a function that takes the image path
//Have a modal pop up that has that image on it

function setup() {
    var galleryURL = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/api/v1/galleryPhoto';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', galleryURL, true);
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            JSON.parse(xhr.responseText).forEach(fileName => {
                console.log(fileName);
                var photosDiv = document.getElementById("photos");
                var image = document.createElement('image');
                var filePath = "./images/gallery/" + fileName;
                image.innerHTML = "<img class='photoGalleryImage' src=" + filePath + " data-toggle='modal' data-target='#photoModal'>";
                image.addEventListener("click", function () { setUpModal(filePath) });
                photosDiv.appendChild(image);
            });
        }
    };
    xhr.onerror = function (err) {
        console.log('there was en error');
        console.log(err);
    }
    xhr.send();
    // setTimeout(function () { createHTMLFromResponseText(xhr.responseText) }, 300);
    // document.getElementById("fileNames").innerHTML = "<img class='photoGalleryImage' src='../images/gallery/31da25d45be0dbb169ee52557995c2e6_PRAISE-HELIX.png'>";
}

function setUpModal(filePath){
    console.log("setting up modal");
    var modalImage = document.getElementById('modalPhoto');
    modalImage.setAttribute('class', 'modalPhoto');
    modalImage.setAttribute('src', filePath);
}

function showPictureModal(source) {
    console.log("inside empty modal");
    var modal = document.getElementById('photoModal');
    var photo = document.getElementById('photo');
    var cancelButton = document.getElementById("photoGalleryClose");
    console.log(photo);
    console.log(source);
    photo.setAttribute('src', source);
    photo.src = source;
    console.log(modal);

    modal.style.display = "block";
    window.onclick = function (event) {
        if (event.target == modal || event.target == cancelButton) {
            modal.style.display = "none";
        }
    }
}

function uploadPhoto() {
    var photoUploadApi = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/api/v1/galleryPhoto';
    var photoxhr = new XMLHttpRequest();
    var files = document.getElementById("imageFile").files;

    var formData = new FormData();
    formData.append("imageFile", files[0]);
    photoxhr.open('POST', photoUploadApi, true);

    photoxhr.onreadystatechange = function (e) {
        if (photoxhr.readyState == 4 && photoxhr.status == 200) {
            $('#uploadModal').modal('hide');
        }
    };

    photoxhr.send(formData);
}

$(document).ready(function () {
    setup();
});
