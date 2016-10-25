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
        //NOTE: I'm not a fan about the use of IDs here... maybe consider re-working it later. -Sean
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

    var listLinks = document.getElementsByClassName("viewListLink");
    for (var i = 0; i < listLinks.length; i++) {
        var listLink = listLinks[i];
        listLink.addEventListener("click", showListModal, false);
    }

    var isAdmin = true;

    if(isAdmin) {
        var adminValues = document.getElementsByClassName("edit");
        for (var i = 0; i < adminValues.length; i++) {
            var editImage = document.createElement("img");
            editImage.setAttribute("src", "../images/edit.png");
            adminValues[i].appendChild(editImage);
            editImage.addEventListener("click", function (e) {
                showEditModal(e);
            }, false);
        }
    }

    function showListModal() {
        var modal = document.getElementById('listModal');
        var span = document.getElementsByClassName("closeList")[0];
        modal.style.display = "block";
        span.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    function showEditModal(editImage) {
        var modal = document.getElementById('editModal');
        var span = document.getElementsByClassName("closeEdit")[0];

        var title = editImage.srcElement.parentElement.innerHTML.split(" - ");
        var name = title[0];
        var price = title[1].split("<")[0];
        var description = editImage.srcElement.parentElement.parentElement.querySelectorAll(":nth-child(6)")[0].innerHTML;

        // console.log(editImage.srcElement.parentElement.parentElement.querySelectorAll(":nth-child(6)")[0].innerHTML);

        document.getElementById("name").innerHTML = "Event name: " + name; 
        document.getElementById("price").innerHTML = "Price: " + price;
        document.getElementById("description").innerHTML = "Description: ";      

        modal.style.display = "block";
        span.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

})();