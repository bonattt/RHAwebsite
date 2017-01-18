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

$(document).ready(function () {
    setup();
});
