var officers;

function setAdmin(officers) {
    if (userIsOfficer(officers)) {
        var uploadButton = document.getElementById("addPhoto");
        uploadButton.setAttribute("class", "");

//        var editButtons = insertEditButtonsBefore(showModal, {"style": "float: right;"});
//        alert(editButtons.length)
    }
}

function setup() {
    var xhr = getOfficers();
    xhr.onload = function () {
        setAdmin(xhr.responseText);
    };
    xhr.send();

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
        console.log("lol");
        //div.querySelectorAll(":nth-child(2)")[0].innerHTML = header.value;
        div.querySelectorAll(":nth-child(3)")[0].innerHTML = description.value;

        modal.style.display = "none";
        //whatsnewNode.removeChild(whatsnewNode.firstChild);
        descNode.removeChild(descNode.firstChild);
    }

}

function uploadCarouselPhoto() {
    var photoUploadApi = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port: '') + '/api/v1/carouselPhoto';
    var photoxhr = new XMLHttpRequest();
    var files = document.getElementById("imageFile").files;

    var formData = new FormData();
    formData.append("imageFile", files[0]);
    photoxhr.open('POST', photoUploadApi, true);

    photoxhr.onreadystatechange = function (e) {
        if(photoxhr.readyState == 4 && photoxhr.status == 200) {
            $('#carouselUploadModal').modal('hide');
        }
    };

    photoxhr.send(formData);
}

$(document).ready(function () {
    setup();
});