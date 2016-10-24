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
    var modal = document.getElementById('myModal');
    var btn = document.getElementById("myBtn");
    var span = document.getElementsByClassName("close")[0];
    console.log(span);
    btn.onclick = function () {
        modal.style.display = "block";
    }
    span.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
})();