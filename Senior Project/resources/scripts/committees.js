function getOfficers() {
    var url = 'http://rha-website-1.csse.rose-hulman.edu:3000/api/v1/officers';
    function createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            xhr.open(method, url, true);

        } else if (typeof XDomainRequest != "undefined") {
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            xhr = null;
        }
        return xhr;
    }
    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
        throw new Error('CORS not supported');
    }
    xhr.onload = function () {
    }
    xhr.onerror = function () {
        console.log("There was an error");
    }
    return xhr;
}

function setAdmin(officers) {
    officer = JSON.parse(officers);
    var tempUser = JSON.parse(sessionStorage.getItem("userData"));
    for (var i = 0; i < officer.length; i++) {
        if (officer[i].username === tempUser.username) {
            var adminValues = document.getElementsByClassName("edit");
            for (var i = 0; i < adminValues.length; i++) {
                var editImage = document.createElement("img");
                editImage.setAttribute("src", "../images/edit.png");
                adminValues[i].appendChild(editImage);
                editImage.addEventListener("click", function (e) {
                    showModal(e);
                }, false);
            }
            var addCommitteeButton = document.getElementById("addCommittee");
            addCommitteeButton.addEventListener("click", showEmptyModal);
            addCommitteeButton.style.display = "block";
            return;
        }
    }
}

(function () {
    var xhr = getCommittees();
    xhr.send();
    setTimeout(function () { actuallyDoShit(xhr.responseText) }, 300);

    function actuallyDoShit(committee) {
        committee = JSON.parse(committee);
        for (var i = 0; i < committee.length; i++) {
            if (i % 2 == 0) {
                var html = "<div class='committeeWrapperRight' id='committeeWrapperRight'>";
                html += "<div class='committees'><h3 class='edit'>" + committee[i].committeename + "</h3>";
                html += "<p>" + committee[i].description + "</p></div>";
                html += "<image class='committeePhoto' src=" + committee[i].image + " alt=" + committee[i].committeename + "></div>";
            } else {
                var html = "<div class='committeeWrapperLeft' id='committeeWrapperLeft'>";
                html += "<image class='committeePhoto' src=" + committee[i].image + " alt=" + committee[i].committeename + ">";
                html += "<div class='committees'><h3 class='edit'>" + committee[i].committeename + "</h3>";
                html += "<p>" + committee[i].description + "</p></div></div>";
            }

            var committees = document.getElementById("committees");
            committees.innerHTML += html;
        }

        var officersxhr = getOfficers();
        officersxhr.send();
        setTimeout(function () { setAdmin(officersxhr.responseText) }, 300);
    }

    function getCommittees() {
        var url = 'http://rha-website-1.csse.rose-hulman.edu:3000/api/v1/committees';
        function createCORSRequest(method, url) {
            var xhr = new XMLHttpRequest();
            if ("withCredentials" in xhr) {

                // Check if the XMLHttpRequest object has a "withCredentials" property.
                // "withCredentials" only exists on XMLHTTPRequest2 objects.
                xhr.open(method, url, true);

            } else if (typeof XDomainRequest != "undefined") {

                // Otherwise, check if XDomainRequest.
                // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
                xhr = new XDomainRequest();
                xhr.open(method, url);

            } else {

                // Otherwise, CORS is not supported by the browser.
                xhr = null;

            }
            return xhr;
        }

        var xhr = createCORSRequest('GET', url);
        // console.log(xhr);
        if (!xhr) {
            throw new Error('CORS not supported');
        }

        xhr.onload = function () {
            var responseText = xhr.responseText;
            // console.log("Response text: " + responseText);
            // return responseText;
        }

        xhr.onerror = function () {
            console.log("There was an error");
        }
        // xhr.send();
        // console.log(xhr);
        return xhr;

    }

})();

function removeSpaces(thingToRemoveSpacesFrom) {
    return thingToRemoveSpacesFrom.replace(" ", "");
}




function showEmptyModal() {
    console.log("that one");
    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName("close")[0];

    var committee = "Committee: ";
    var description = "Description: ";
    var image = "Image: ";

    var committeeInput = document.createElement("textarea");
    committeeInput.setAttribute("rows", "1");
    committeeInput.setAttribute("cols", "30");

    var descInput = document.createElement("textarea");
    descInput.setAttribute("rows", "4");
    descInput.setAttribute("cols", "30");

    var imageInput = document.createElement("textarea");
    imageInput.setAttribute("rows", "1");
    imageInput.setAttribute("cols", "30");

    var committeeNode = document.getElementById("committeeInput");
    var descNode = document.getElementById("descInput");
    var imageNode = document.getElementById("imageInput");


    document.getElementById("committeeName").innerHTML = committee;
    committeeNode.appendChild(committeeInput);
    document.getElementById("description").innerHTML = description;
    descNode.appendChild(descInput);
    document.getElementById("image").innerHTML = image;
    imageNode.appendChild(imageInput);


    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
        committeeNode.removeChild(committeeNode.firstChild);
        descNode.removeChild(descNode.firstChild);
        imageNode.removeChild(imageNode.firstChild);

    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            committeeNode.removeChild(committeeNode.firstChild);
            descNode.removeChild(descNode.firstChild);
            imageNode.removeChild(imageNode.firstChild);

        }
    }
}

function showModal(editImage) {
    console.log("this one");
    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName("close")[0];

    var parent = editImage.srcElement.parentElement.parentElement;
    var committee = "Committee: ";
    var description = "Description: ";
    var image = "Image: ";

    var committeeInput = document.createElement("textarea");
    committeeInput.setAttribute("rows", "1");
    committeeInput.setAttribute("cols", "30");

    var descInput = document.createElement("textarea");
    descInput.setAttribute("rows", "4");
    descInput.setAttribute("cols", "30");

    var imageInput = document.createElement("textarea");
    imageInput.setAttribute("rows", "1");
    imageInput.setAttribute("cols", "30");

    var committeeNode = document.getElementById("committeeInput");
    var descNode = document.getElementById("descInput");
    var imageNode = document.getElementById("imageInput");

    if (parent.parentElement.id == "committeeWrapperRight") {
        committeeInput.innerHTML = parent.querySelectorAll(":nth-child(1)")[0].textContent;
        descInput.innerHTML = parent.querySelectorAll(":nth-child(2)")[0].textContent;
        imageInput.innerHTML = parent.nextSibling.currentSrc.split("images/committees/")[1];
    } else {
        committeeInput.innerHTML = parent.querySelectorAll(":nth-child(1)")[0].textContent;
        descInput.innerHTML = parent.querySelectorAll(":nth-child(2)")[0].textContent;
        imageInput.innerHTML = parent.previousSibling.currentSrc.split("images/committees/")[1];
    }


    document.getElementById("committeeName").innerHTML = committee;
    committeeNode.appendChild(committeeInput);
    document.getElementById("description").innerHTML = description;
    descNode.appendChild(descInput);
    document.getElementById("image").innerHTML = image;
    imageNode.appendChild(imageInput);


    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
        committeeNode.removeChild(committeeNode.firstChild);
        descNode.removeChild(descNode.firstChild);
        imageNode.removeChild(imageNode.firstChild);

    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            committeeNode.removeChild(committeeNode.firstChild);
            descNode.removeChild(descNode.firstChild);
            imageNode.removeChild(imageNode.firstChild);

        }
    }
}