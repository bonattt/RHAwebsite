var officers;

function setAdmin(officers) {
    if (userIsOfficer(officers)) {
        var uploadButton = document.getElementById("addPhoto");
        uploadButton.setAttribute("class", "");
        var deleteButton = document.getElementById("deletePhoto");
        deleteButton.setAttribute("class", "");
        populateDeletePhotoModal();

        var textButton = document.getElementById("editText");
        textButton.setAttribute("class", "");

        //        var editButtons = insertEditButtonsBefore(showModal, {"style": "float: right;"});
        //        alert(editButtons.length)
    }
}

function populateDeletePhotoModal() {
    var carouselInner = document.getElementById("carousel-inner");
    deletePhotoForm = document.getElementById("deletePhotoForm");
    for (var i = 1; i <= carouselInner.children.length; i++) {
        deletePhotoForm.innerHTML += '<label><input type="radio" name="usernames" value="' + i + '" /> ' + i + '</label>';
    }
    var radios = document.getElementsByTagName('input');
    var deleteConfirm = document.getElementById('confirm-delete');
    deleteConfirm.addEventListener('click', function () {
        figureOutSelectedRadioButton(radios);
    });
}

function figureOutSelectedRadioButton(radios) {
    var carouselInner = document.getElementById("carousel-inner");
    console.log("figuring out the selected radio button :)");
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            deleteFunction("/images" + carouselInner.childNodes[i].firstChild.src.split("/images")[1]);
            location.reload();
        }
    }
}

function deleteFunction(filePath) {
    var photoDeleteApi = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/api/v1/photo';
    var formData = new FormData();
    var photoxhr = new XMLHttpRequest();
    var dbObject = {};
    dbObject["imagePath"] = 'resources' + filePath;

    photoxhr.open('DELETE', photoDeleteApi, true);
    photoxhr.setRequestHeader('Content-Type', 'application/json');

    photoxhr.send(JSON.stringify(dbObject));
}

function setup() {
    var xhr = getOfficers();
    xhr.onload = function () {
        setAdmin(xhr.responseText);
    };
    xhr.send();

    var galleryURL = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/api/v1/carouselPhoto';
    var xhr2 = new XMLHttpRequest();
    xhr2.open('GET', galleryURL, true);
    xhr2.onreadystatechange = function (e) {
        if (xhr2.readyState == 4 && xhr2.status == 200) {
            var indicatorOl = document.getElementById("carousel-indicators");
            var carouselInnerDiv = document.getElementById("carousel-inner");
            var dbApiUrl = 'http://rha-website-1.csse.rose-hulman.edu:3000/API/v1/infoText/1';
            var xhr3 = new XMLHttpRequest();
            xhr3.open('GET', dbApiUrl, true);
            xhr3.onreadystatechange = function (e) {
                if (xhr3.readyState == 4 && xhr3.status == 200) {
                    document.getElementById("shownDescription").innerHTML = JSON.parse(xhr3.responseText).body;
                    document.getElementById("textToUpdate").value = JSON.parse(xhr3.responseText).body;
                }
            }
            xhr3.send();
            var counter = 1;
            JSON.parse(xhr2.responseText).forEach(fileName => {

                var div = document.createElement('div');
                div.setAttribute('class', 'item');
                var filePath = "./images/carousel/" + fileName;

                div.innerHTML = "<img class='carousel-img' src=" + filePath + ">";
                var liToAdd = document.createElement('li');
                if (counter == 1) {
                    div.setAttribute('class', 'item active');
                    liToAdd.setAttribute('class', 'active');
                }
                liToAdd.setAttribute('data-target', '#myCarousel');
                liToAdd.setAttribute('data-slide-to', counter);
                carouselInnerDiv.appendChild(div);
                indicatorOl.appendChild(liToAdd);
                counter++;
            });
        }
    };
    xhr2.onerror = function (err) {
        console.log('there was en error');
        console.log(err);
    }
    xhr2.send();

    var title = document.getElementById("title");
    if (JSON.parse(sessionStorage.getItem('userData'))) {
        title.innerHTML = "Welcome, " + JSON.parse(sessionStorage.getItem('userData')).name.split(" ")[0] + "!";
    } else {
        title.innerHTML = "Welcome!"
    }
}

function showModal(editImage) {
    var eventSrc = (editImage.srcElement || editImage.target);
    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName("close")[0];
    var img = eventSrc.innerHTML;
    var div = eventSrc.parentElement;

    //var newStuff = "Header: ";
    var newStuffDesc = "Description: ";

    // var newStuffInput = document.createElement("textarea");
    // newStuffInput.setAttribute("rows", "1");
    // newStuffInput.setAttribute("cols", "20");
    // // newStuffInput.setAttribute("name", "");
    // newStuffInput.innerHTML = div.querySelectorAll(":nth-child(2)")[0].innerHTML;
    // // whatsnew["title"] = newStuffInput.innerHTML;

    var descInput = document.createElement("textarea");
    descInput.setAttribute("rows", "4");
    descInput.setAttribute("cols", "20");
    descInput.innerHTML = div.querySelectorAll(":nth-child(3)")[0].innerHTML;
    // whatsnew["shownDescription"] = descInput.innerHTML;

    //var whatsnewNode = document.getElementById("whatsnewInput");
    var descNode = document.getElementById("descInput");

    //document.getElementById("whatsnew").innerHTML = newStuff;
    //whatsnewNode.appendChild(newStuffInput);
    document.getElementById("description").innerHTML = newStuffDesc;
    descNode.appendChild(descInput);

    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
        //whatsnewNode.removeChild(whatsnewNode.firstChild);
        descNode.removeChild(descNode.firstChild);

    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            //whatsnewNode.removeChild(whatsnewNode.firstChild);
            descNode.removeChild(descNode.firstChild);

        }
    }

    var submit = document.getElementById("submit");
    new_submit = submit.cloneNode(true);
    new_submit.addEventListener("click", function () {
        submitChanges(descInput)
    }, false);
    submit.parentNode.replaceChild(new_submit, submit);



    function submitChanges(description) {

        div.querySelectorAll(":nth-child(3)")[0].innerHTML = description.value;

        modal.style.display = "none";
        //whatsnewNode.removeChild(whatsnewNode.firstChild);
        descNode.removeChild(descNode.firstChild);
    }

}

function uploadCarouselPhoto() {
    console.log("uploading a carousel photo");
    var photoUploadApi = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/api/v1/carouselPhoto';
    var photoxhr = new XMLHttpRequest();
    var files = document.getElementById("imageFile").files;

    var formData = new FormData();
    formData.append("imageFile", files[0]);
    photoxhr.open('POST', photoUploadApi, true);

    photoxhr.onreadystatechange = function (e) {
        if (photoxhr.readyState == 4 && photoxhr.status == 200) {
            location.reload();
        }
    };

    photoxhr.send(formData);
}

function updateFrontPageText() {
    var dbApiUrl = 'http://rha-website-1.csse.rose-hulman.edu:3000/API/v1/infoText/1';
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', dbApiUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            location.reload();
        }
    };

    var changedText = document.getElementById("textToUpdate").value;
    var objectToUpdate = {
        "body": changedText
    };

    xhr.send(JSON.stringify(objectToUpdate));
}

$(document).ready(function () {
    setup();
});