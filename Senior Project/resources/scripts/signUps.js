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

    if (isAdmin) {
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
        var name = "Event name: ";
        var price = "Price: ";
        var image = "Image: ";
        var description = "Description: ";
        var signUpCloseDate = "Sign-up close date: ";

        var nameInput = document.createElement("textarea");
        nameInput.setAttribute("rows", "1");
        nameInput.setAttribute("cols", "30");
        nameInput.innerHTML = title[0];

        var priceInput = document.createElement("textarea");
        priceInput.setAttribute("rows", "1");
        priceInput.setAttribute("cols", "30");
        priceInput.innerHTML = title[1].split("<")[0];

        var descriptionInput = document.createElement("textarea");
        descriptionInput.setAttribute("rows", "4");
        descriptionInput.setAttribute("cols", "30");
        descriptionInput.innerHTML = editImage.srcElement.parentElement.parentElement.querySelectorAll(":nth-child(6)")[0].innerHTML.split(" Sign-ups for this event will close on ")[0];

        var signUpCloseDateInput = document.createElement("textarea");
        signUpCloseDateInput.setAttribute("rows", "1");
        signUpCloseDateInput.setAttribute("cols", "30");
        signUpCloseDateInput.innerHTML = editImage.srcElement.parentElement.parentElement.querySelectorAll(":nth-child(6)")[0].innerHTML.split(" Sign-ups for this event will close on ")[1].split(".")[0];
        console.log(editImage.srcElement.parentElement.parentElement.querySelectorAll(":nth-child(2)")[0].currentSrc.split("images/")[1]);

        var imageInput = document.createElement("textarea");
        imageInput.setAttribute("rows", "1");
        imageInput.setAttribute("cols", "30");
        imageInput.innerHTML = editImage.srcElement.parentElement.parentElement.querySelectorAll(":nth-child(2)")[0].currentSrc.split("images/")[1];

        var nameNode = document.getElementById("nameInput");
        var priceNode = document.getElementById("priceInput");
        var imageNode = document.getElementById("imageInput");
        var descriptionNode = document.getElementById("descriptionInput");
        var signUpCloseDateNode = document.getElementById("signUpCloseDateInput");


        document.getElementById("name").innerHTML = name;
        nameNode.appendChild(nameInput);
        document.getElementById("price").innerHTML = price;
        priceNode.appendChild(priceInput);
        document.getElementById("image").innerHTML = image;
        imageNode.appendChild(imageInput);
        document.getElementById("description").innerHTML = description;
        descriptionNode.appendChild(descriptionInput);
        document.getElementById("signUpCloseDate").innerHTML = signUpCloseDate;
        signUpCloseDateNode.appendChild(signUpCloseDateInput);


        modal.style.display = "block";
        span.onclick = function () {
            modal.style.display = "none";
            nameNode.removeChild(nameNode.firstChild);
            priceNode.removeChild(priceNode.firstChild);
            imageNode.removeChild(imageNode.firstChild);
            descriptionNode.removeChild(descriptionNode.firstChild);
            signUpCloseDateNode.removeChild(signUpCloseDateNode.firstChild);

        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
                nameNode.removeChild(nameNode.firstChild);
                priceNode.removeChild(priceNode.firstChild);
            imageNode.removeChild(imageNode.firstChild);
                descriptionNode.removeChild(descriptionNode.firstChild);
                signUpCloseDateNode.removeChild(signUpCloseDateNode.firstChild);
            }
        }
    }

})();