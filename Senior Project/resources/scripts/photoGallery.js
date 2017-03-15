var isAdmin = false;

function setup() {
    var officersxhr = getOfficers(); // from adminPErmission.js
    var galleryURL = 'http://rha-website-1.csse.rose-hulman.edu:3000/api/v1/photoGallery';
    officersxhr.onload = function () {
        var modalDelete = document.getElementById('modal-delete');
        var modalApprove = document.getElementById('modal-approve');
        var modalUnapprove = document.getElementById('modal-unapprove');
        if (userIsOfficer(officersxhr.responseText)) {
            galleryURL += 'All';
            modalDelete.style.display = "inline-block";
            modalApprove.style.display = "inline-block";
            modalUnapprove.style.display = "inline-block";
        } else {
            galleryURL += 'Restricted';
        }
    }
    officersxhr.send();

    setTimeout(function () { displayImages(galleryURL) }, 300);
}

function displayImages(galleryURL) {
    var xhr = new XMLHttpRequest();
    console.log(galleryURL);
    xhr.open('GET', galleryURL, true);
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            JSON.parse(xhr.responseText).forEach(row => {
                var photosDiv = document.getElementById("photos");
                var image = document.createElement('image');
                console.log(row.path_to_photo);
                image.innerHTML = "<img class='photoGalleryImage' src=" + row.path_to_photo + " data-toggle='modal' data-target='#photoModal'>";
                image.addEventListener("click", function () { setUpModal(row.path_to_photo, row.photo_gallery_id) });
                photosDiv.appendChild(image);
            });
        }
    };
    xhr.onerror = function (err) {
        console.log('there was en error');
        console.log(err);
    }
    xhr.send();
}

function setUpModal(filePath, photoID) {
    console.log("setting up modal");
    var modalImage = document.getElementById('modalPhoto');
    modalImage.setAttribute('class', 'modalPhoto');
    modalImage.setAttribute('src', filePath);
    var modalDelete = document.getElementById('modal-delete')
    var modalApprove = document.getElementById('modal-approve');
    var modalUnapprove = document.getElementById('modal-unapprove');
    modalDelete.addEventListener("click", function () { deleteFunction(filePath) });
    modalApprove.addEventListener("click", function () { approveImage(photoID) });
    modalUnapprove.addEventListener("click", function () { unapproveImage(photoID) });

}

function approveImage(imageID) {
    var url = 'http://rha-website-1.csse.rose-hulman.edu:3000/api/v1/photoGallery';
    var xhr = new XMLHttpRequest();
    var json_data = {"approved": "approved"};
    xhr.open('PUT', url + '/' + imageID, true);
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log("It worked, I guess?");
            location.reload();
        } else {
            console.log("something went wrong");
            console.log("readyState: " + xhr.readyState + " --- status: " + xhr.status);
        }
    }
    xhr.send(JSON.stringify(json_data));
}

function unapproveImage(imageID) {
    var url = 'http://rha-website-1.csse.rose-hulman.edu:3000/api/v1/photoGallery';
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', url + '/' + imageID, true);
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log("It worked, I guess?");
            location.reload();
        } else {
            console.log("something went wrong");
        }
    }
    xhr.send();
}

function deleteFunction(filePath) {
    console.log("deleting the function");
    var photoDeleteApi = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/api/v1/galleryPhoto';
    var formData = new FormData();
    console.log("file is:");
    var photoxhr = new XMLHttpRequest();
    var dbObject = {};
    dbObject["imagePath"] = 'resources' + filePath.replace('.', "");
    console.log(dbObject);

    photoxhr.open('DELETE', photoDeleteApi, true);
    photoxhr.setRequestHeader('Content-Type', 'application/json');

    photoxhr.onreadystatechange = function (e) {
        if (photoxhr.readyState == 4 && photoxhr.status == 200) {
            location.reload();
        }
    };
    console.log(formData);
    photoxhr.send(JSON.stringify(dbObject));
}

function showPictureModal(source) {
    console.log("inside empty modal");
    var modal = document.getElementById('photoModal');
    var photo = document.getElementById('photo');
    var cancelButton = document.getElementById("photoGalleryClose");
    photo.setAttribute('src', source);
    photo.src = source;

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
            location.reload();
        }
    };

    photoxhr.send(formData);
}

$(document).ready(function () {
    setup();
});
