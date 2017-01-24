//Get all pictures by classname and loop through them, adding an on click to each of them
//That on click should be a function that takes the image path
//Have a modal pop up that has that image on it

function setup() {
    var images = document.getElementsByClassName("photoGalleryImage");
    console.log("in setup");
    for (var i = 0; i < images.length; i++) {
        images[i].addEventListener('click', function () { showPictureModal("../images/events/tri-hop.png"); });
        console.log("in for loop");
    }
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
    var photoUploadApi = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port: '') + '/api/v1/galleryPhoto';
    var photoxhr = new XMLHttpRequest();
    var files = document.getElementById("imageFile").files;

    var formData = new FormData();
    formData.append("imageFile", files[0]);
    photoxhr.open('POST', photoUploadApi, true);

    photoxhr.onreadystatechange = function (e) {
        if(photoxhr.readyState == 4 && photoxhr.status == 200) {
            $('#uploadModal').modal('hide');
        }
    };

    photoxhr.send(formData);
}

$(document).ready(function () {
    setup();
});
