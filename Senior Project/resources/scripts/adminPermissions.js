var officerMap = new Object();
var editName;

(function () {
    var officerId;
    var apiURL = "http://rha-website-1.csse.rose-hulman.edu:3000/";

    var xhr = getEvents();
    xhr.send();
    setTimeout(function () { actuallyDoShit(xhr.responseText) }, 300);

    function actuallyDoShit(officer) {
        officer = JSON.parse(officer);

        for (var i = 0; i < officer.length; i++) {
            if (officer[i].memberType != "") {
                var html = "<div class='officer'>";
                html += "<h3 class='edit'>" + officer[i].firstname + " " + officer[i].lastname + " - " + officer[i].membertype + "</h3>";
                html += "<img src='../images/officers/" + removeSpaces(officer[i].membertype.toLowerCase()) + ".jpg' alt='" + officer[i].membertype + "'height='294' width='195'>";
                html += "<p>Email: <a href='mailto:'" + officer[i].email + ">" + officer[i].email + "</a></p>";
                html += "<p> Phone Number: " + officer[i].phone_number + "</p>";
                html += "<p> Room: " + officer[i].room_number + "</p>";
                html += "<p>Box #: " + officer[i].cm + "</p>";

                officerMap[officer[i].firstname + " " + officer[i].lastname] = officer[i].user_id;

                var officers = document.getElementById("officers");
                officers.innerHTML += html;


            }
        }
        
        
        var isAdmin = true;
        if (isAdmin) {
            displayEditingPens();
        }
    }

    function displayEditingPens() {
        var adminValues = document.getElementsByClassName("edit");
        for (var i = 0; i < adminValues.length; i++) {
            var editImage = document.createElement("img");
            editImage.setAttribute("src", "../images/edit.png");
            adminValues[i].appendChild(editImage);
            editImage.addEventListener("click", function (e) {
                console.log("actually adding the event listener");
                showModal(e);
            }, false);
        }
    }



    function getEvents() {
        var url = 'http://rha-website-1.csse.rose-hulman.edu:3000/api/v1/officers';
        console.log(url);
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
            console.log("Response text: " + responseText);
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

(function () {
    var isAdmin = true;


    if (isAdmin) {
        var adminValues = document.getElementsByClassName("edit");
        for (var i = 0; i < adminValues.length; i++) {
            var editImage = document.createElement("img");
            editImage.setAttribute("src", "../images/edit.png");
            adminValues[i].appendChild(editImage);
            editImage.addEventListener("click", function (e) {
                showModal(i);
            }, false);
        }
    }
})();

function showEmptyModal() {
    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName("close")[0];
    var name = "Name: ";
    var title = "Title: ";
    var email = "Email: ";
    var phoneNumber = "Phone number: ";
    var room = "Room number: ";
    var cm = "CM: ";

    var titleInput = document.createElement("textarea");
    titleInput.setAttribute("rows", "1");
    titleInput.setAttribute("cols", "30");

    var nameInput = document.createElement("textarea");
    nameInput.setAttribute("rows", "1");
    nameInput.setAttribute("cols", "30");


    var emailInput = document.createElement("textarea");
    emailInput.setAttribute("rows", "1");
    emailInput.setAttribute("cols", "30");

    var phnNumInput = document.createElement("textarea");
    phnNumInput.setAttribute("rows", "1");
    phnNumInput.setAttribute("cols", "30");

    var CMInput = document.createElement("textarea");
    CMInput.setAttribute("rows", "1");
    CMInput.setAttribute("cols", "30");


    var nameNode = document.getElementById("nameInput");
    var emailNode = document.getElementById("emailInput");
    var phnNode = document.getElementById("phnNumInput");
    var CMNode = document.getElementById("CMInput");
    var titleNode = document.getElementById("titleInput");


    titleNode.appendChild(titleInput);
    document.getElementById("title").innerHTML = title;
    nameNode.appendChild(nameInput);
    document.getElementById("name").innerHTML = name;
    emailNode.appendChild(emailInput);
    document.getElementById("email").innerHTML = email;
    phnNode.appendChild(phnNumInput);
    document.getElementById("phnNum").innerHTML = phoneNumber;
    if (CMInput) {
        CMNode.appendChild(CMInput);
    }
    if (document.getElementById("CM")) {
        document.getElementById("CM").innerHTML = cm;
    }

    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
        nameNode.removeChild(nameNode.firstChild);
        emailNode.removeChild(emailNode.firstChild);
        phnNode.removeChild(phnNode.firstChild);
        titleNode.removeChild(titleNode.firstChild);
        if (CMNode.firstChild) {
            CMNode.removeChild(CMNode.firstChild);
        }
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            nameNode.removeChild(nameNode.firstChild);
            emailNode.removeChild(emailNode.firstChild);
            phnNode.removeChild(phnNode.firstChild);
            titleNode.removeChild(titleNode.firstChild);
            if (CMNode.firstChild) {
                CMNode.removeChild(CMNode.firstChild);
            }
            }
    }
}
function saveOfficer() {
    var fullname = document.getElementById("fullname").value;
    console.log(editName);
    console.log(officerMap[editName]);
    console.log(officerMap);
    var officerID = officerMap[editName];
    var url = 'http://rha-website-1.csse.rose-hulman.edu:3000/api/v1/member/' + officerID;  
    function createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        console.log("xhr is: ");
        console.log(xhr);
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        return xhr;
    }
    var xhr = createCORSRequest('PUT', url);
    if (!xhr) {
        throw new Error('CORS not supported');
    }

    xhr.onload = function () {
        var responseText = xhr.responseText;
        console.log("Response text: " + responseText);
        // return responseText;
    }

    xhr.onerror = function () {
        console.log("There was an error");
    }
    var titleText = document.getElementById("title-input-field").value;
    var phoneText = document.getElementById("phone-text").value;
    var cmText = document.getElementById("cm-text").value;
    //var titleText = "Sean";
    console.log(titleText);

    var firstName = fullname.split(" ")[0];
    var lastName = fullname.split(" ")[1];
    xhr.send(JSON.stringify({ membertype: titleText, firstname: firstName, lastname: lastName, phone_number: phoneText, cm: cmText}));
    return xhr;
}
function showModal(editImage) {
    console.log("in here");
    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName("close")[0];
    var nameAndTitle = editImage.srcElement.parentElement.innerHTML;

    var parent = editImage.srcElement.parentElement.parentElement;

    nameAndTitle = nameAndTitle.split(" - ");
    editName = nameAndTitle[0];
    // var name = "Name: " + nameAndTitle[0];
    var name = "Name: ";
    var title = "Title: ";
    var email = "Email: ";
    var phoneNumber = "Phone number: ";
    var room = "Room number: " + parent.querySelectorAll(":nth-child(5)")[0].textContent.split(": ")[1];
    var cm = null;

    var titleInput = document.createElement("textarea");
    titleInput.setAttribute("rows", "1");
    titleInput.setAttribute("cols", "30");
    titleInput.setAttribute("id", "title-input-field");
    titleInput.innerHTML = nameAndTitle[1].split("<")[0];

    var nameInput = document.createElement("textarea");
    nameInput.setAttribute("rows", "1");
    nameInput.setAttribute("cols", "30");
    nameInput.setAttribute("id", "fullname");
    nameInput.innerHTML = nameAndTitle[0];

    //This is how to get the image
    //console.log(parent.firstChild.nextElementSibling.querySelectorAll(":nth-child(1)")[0].currentSrc);


    var emailInput = document.createElement("textarea");
    emailInput.setAttribute("rows", "1");
    emailInput.setAttribute("cols", "30");
    emailInput.innerHTML = parent.querySelectorAll(":nth-child(3)")[0].textContent.split(": ")[1];
    console.log(parent.querySelectorAll(":nth-child(3)")[0].textContent);

    var phnNumInput = document.createElement("textarea");
    phnNumInput.setAttribute("rows", "1");
    phnNumInput.setAttribute("cols", "30");
    phnNumInput.setAttribute("id", "phone-text");
    phnNumInput.innerHTML = parent.querySelectorAll(":nth-child(4)")[0].textContent.split(": ")[1];

    var CMInput = null;
    if (parent.querySelectorAll(":nth-child(6)")[0]) {
        cm = "CM: ";
        CMInput = document.createElement("textarea");
        CMInput.setAttribute("rows", "1");
        CMInput.setAttribute("cols", "30");
        CMInput.setAttribute("id", "cm-text");
        CMInput.innerHTML = parent.querySelectorAll(":nth-child(6)")[0].textContent.split(": ")[1];
    }


    var nameNode = document.getElementById("nameInput");
    var emailNode = document.getElementById("emailInput");
    var phnNode = document.getElementById("phnNumInput");
    var CMNode = document.getElementById("CMInput");
    var titleNode = document.getElementById("titleInput");


    titleNode.appendChild(titleInput);
    document.getElementById("title").innerHTML = title;
    nameNode.appendChild(nameInput);
    document.getElementById("name").innerHTML = name;
    emailNode.appendChild(emailInput);
    document.getElementById("email").innerHTML = email;
    phnNode.appendChild(phnNumInput);
    document.getElementById("phnNum").innerHTML = phoneNumber;
    if (CMInput) {
        CMNode.appendChild(CMInput);
    }
    if (document.getElementById("CM")) {
        document.getElementById("CM").innerHTML = cm;
    }

    var modalContent = document.getElementsByClassName("modal-content")[0];

    var submitButton = document.createElement("button");
    submitButton.setAttribute("id", "submit");
    submitButton.setAttribute("class", "modalButton");
    submitButton.innerHTML = "Submit";
    submitButton.addEventListener("click", function () {saveOfficer()}, false);

    modalContent.appendChild(submitButton);

    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
        nameNode.removeChild(nameNode.firstChild);
        emailNode.removeChild(emailNode.firstChild);
        phnNode.removeChild(phnNode.firstChild);
        titleNode.removeChild(titleNode.firstChild);
        if (CMNode.firstChild) {
            CMNode.removeChild(CMNode.firstChild);
        }
        modalContent.removeChild(submitButton);

    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            nameNode.removeChild(nameNode.firstChild);
            emailNode.removeChild(emailNode.firstChild);
            phnNode.removeChild(phnNode.firstChild);
            titleNode.removeChild(titleNode.firstChild);
            if (CMNode.firstChild) {
                CMNode.removeChild(CMNode.firstChild);
            }
        modalContent.removeChild(submitButton);
        }
    }
}
