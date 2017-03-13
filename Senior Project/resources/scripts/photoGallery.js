var isAdmin = false;

function setup() {
    var officersxhr = getOfficers(); // from adminPErmission.js
    officersxhr.onload = function () {
        var modalDelete = document.getElementById('modal-delete');
        if (userIsOfficer(officersxhr.responseText)) {
            modalDelete.style.display = "block";
        } else {
            modalDelete.addEventListener('click', noPermission);
        }
    }
    officersxhr.send();

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

function setUpModal(filePath) {
    console.log("setting up modal");
    var modalImage = document.getElementById('modalPhoto');
    modalImage.setAttribute('class', 'modalPhoto');
    modalImage.setAttribute('src', filePath);
    var modalDelete = document.getElementById('modal-delete')
    modalDelete.addEventListener("click", function () { deleteFunction(filePath) });
}

function noPermission() {
    alert("You do not have permission to delete photos.  Please contact a member of RHA exec to delete the photo for you.");
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
