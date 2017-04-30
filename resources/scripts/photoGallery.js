function setup() {
    var officersxhr = getOfficers(); // from adminPErmission.js
    var galleryURL = 'http://rha-website-1.csse.rose-hulman.edu:3000/api/v1/photoGallery';
    officersxhr.onload = function () {
        var modalDelete = document.getElementById('modal-delete');
        if (userIsOfficer(officersxhr.responseText)) {
            galleryURL += 'All';
            modalDelete.style.display = "inline-block";
        } else {
            galleryURL += 'Restricted';
            var photoGallerySections = document.getElementsByClassName("photo-gallery-sections");
            for (var i = 0; i < photoGallerySections.length; i++) {
                photoGallerySections[i].style.display = "none";
            }
        }
    }
    officersxhr.send();

    setTimeout(function () { displayImages(galleryURL) }, 300);
}

function displayImages(galleryURL) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', galleryURL, true);
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            JSON.parse(xhr.responseText).forEach(row => {
                var photosDiv = document.getElementById("photos");
                var photosPendingDiv = document.getElementById("photosPending");
                var image = document.createElement('image');
                var img = document.createElement('img');
                img.setAttribute("class", "photoGalleryImage");
                img.setAttribute("src", row.path_to_photo);
                img.setAttribute("data-toggle", "modal");
                img.setAttribute("data-target", "#photoModal");
                image.appendChild(img);
                image.addEventListener("click", function () { setUpModal(row.path_to_photo, row.photo_gallery_id, row.approved) });
                if (row.approved == "pending") {
                    photosPendingDiv.appendChild(image);
                } else {
                    photosDiv.appendChild(image);
                }
            });
        }
    };
    xhr.onerror = function (err) {
        console.log('there was en error');
        console.log(err);
    }
    xhr.send();
}

function setUpModal(filePath, photoID, approved) {
    var modalApprove = document.getElementById('modal-approve');

    if (approved == "pending") {
        modalApprove.style.display = "inline-block";
    } else {
        modalApprove.style.display = "none";
        // buttons better not show up
    }
    var modalImage = document.getElementById('modalPhoto');
    modalImage.setAttribute('class', 'modalPhoto');
    modalImage.setAttribute('src', filePath);
    var modalApprove = document.getElementById('modal-approve');
    modalApprove.addEventListener("click", function () { approveImage(photoID) });
    var deleteConfirm = document.getElementById('confirm-delete');
    deleteConfirm.addEventListener('click', function () {
        deleteFunction(filePath, photoID);
    });
}

function approveImage(imageID) {
    var url = 'http://rha-website-1.csse.rose-hulman.edu:3000/api/v1/photoGallery';
    var xhr = new XMLHttpRequest();
    var json_data = { "approved": "approved", "photo_gallery_id": imageID };
    xhr.open('PUT', url + '/' + imageID, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            location.reload();
        }
    }
    xhr.send(JSON.stringify(json_data));
}

function deletePhotoDB(imageID) {
    var url = 'http://rha-website-1.csse.rose-hulman.edu:3000/api/v1/photoGallery/' + imageID;
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            location.reload();
        } else {
        }
    }
    xhr.send();

}

function deleteFunction(filePath, imageID) {
    filePath = filePath.substring(1, filePath.length);
    var photoDeleteApi = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/api/v1/photo';
    var photoxhr = new XMLHttpRequest();
    var dbObject = {};
    dbObject["imagePath"] = 'resources' + filePath.replace('.', "");

    photoxhr.open('DELETE', photoDeleteApi, true);
    photoxhr.setRequestHeader('Content-Type', 'application/json');

    photoxhr.onreadystatechange = function (e) {
        if (photoxhr.readyState == 4 && photoxhr.status == 200) {
            deletePhotoDB(imageID);
        }
    };
    photoxhr.send(JSON.stringify(dbObject));

}

function showPictureModal(source) {
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
    var url = "http://rha-website-1.csse.rose-hulman.edu:3000/api/v1/photoGallery";
    var photoUploadApi = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/api/v1/galleryPhoto';
    var photoxhr = new XMLHttpRequest();
    var files = document.getElementById("imageFile").files;
    var formData = new FormData();
    formData.append("imageFile", files[0]);
    photoxhr.open('POST', photoUploadApi, true);

    photoxhr.onreadystatechange = function (e) {
        if (photoxhr.readyState == 4 && photoxhr.status == 200) {
            $('#uploadModal').modal('hide');
            var xhr = new XMLHttpRequest();
            var json_data = { "path_to_photo": JSON.parse(photoxhr.response).filepath, "approved": "pending" };
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function (e) {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    //shit worked bois
                    // location.reload();
                } else {
                    //shit might not have worked bois
                }
            }
            xhr.send(JSON.stringify(json_data));
            location.reload();
        }
    };

    photoxhr.send(formData);


}

$(document).ready(function () {
    setup();
});
