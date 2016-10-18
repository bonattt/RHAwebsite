function signUp() {
    var signUpSnackbar = document.getElementById("snackbar");
    signUpSnackbar.className = "show";
    setTimeout(function () { signUpSnackbar.className = signUpSnackbar.className.replace("show", ""); }, 3000);
}

function moreInformationFunction(triggeringElement) {
    var linkClicked = triggeringElement.id;
    var events = document.getElementsByClassName("moreInformation");
    var moreInfoLinks = document.getElementsByClassName("moreInfoLink");
    for (var i = 0; i < events.length; i++) {
        var moreInfo = document.getElementById(events[i].id);
        var moreInfoLink = document.getElementById(moreInfoLinks[i].id);
        if (moreInfoLink.id == linkClicked && moreInfoLink.textContent == "Show Details") {
            moreInfo.style.display = "block";
            moreInfoLink.textContent = "Hide Details";
        }
        else {
            moreInfo.style.display = "none";
            moreInfoLink.textContent = "Show Details";
        }
    }
}

(function () {
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    console.log(span);

    // When the user clicks on the button, open the modal 
    btn.onclick = function () {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
})();