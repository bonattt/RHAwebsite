var officers;
function displayUpcomingEvents() {

    var xhr = getEvents();
    xhr.send();
    setTimeout(function () { actuallyDoShit(xhr.responseText) }, 300);
    // var apiURL = "http://rha-website-1.csse.rose-hulman.edu:3000/";

    function actuallyDoShit(proposal) {
        proposal = JSON.parse(proposal);

        for (var i = 0; i < proposal.length; i++) {
            var html = "<div class='event'><a href='sign-ups'>";
            html += "<img src=" + proposal[i].image_path + " alt='Event' class='eventImage'>";
            html += "<div class='eventText'><h2>" + proposal[i].proposal_name + "</h2>";
            html += "<p>" + proposal[i].event_date + "</p></div></a></div>";

            var sidebar = document.getElementById("sidebarEvents");
            sidebar.innerHTML += html;
            // console.log(sidebar);
        }

    }

    function getEvents() {
        var url = 'http://rha-website-1.csse.rose-hulman.edu:3000/api/v1/events';
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
}

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
            editImage.style.cssText = "float: right;";
            adminValues[i].insertBefore(editImage, adminValues[i].firstChild);
            editImage.addEventListener("click", function (e) {
                showModal(e);
            }, false);
        }
            return;
        }
    }
}

(function () {
    var xhr = getOfficers();
    xhr.send();
    setTimeout(function () { setAdmin(xhr.responseText) }, 300);
    var hasListener = false;
    var whatsnew = {};

    var title = document.getElementById("title");
    if (JSON.parse(sessionStorage.getItem('userData'))) {
        title.innerHTML = "Hi, " + JSON.parse(sessionStorage.getItem('userData')).name.split(" ")[0] + "!";
    } else {
        title.innerHTML = "Hi!"
    }
    var logoutButton = document.getElementById("logout-button");
    logoutButton.addEventListener("click", logout);

    function getFrontPageNews() {

    }

    function inputHandler(property, value) {
        console.log(value);
        whatsnew[property] = value;
        $('#title').text(whatsnew.title);
        $('#shownDescription').text(whatsnew.shownDescription);
    }



    $(document).ready(function () {
        displayUpcomingEvents();

    });

})();

function logout() {
    sessionStorage.clear();
    location.reload();
}

    function showModal(editImage) {
        var modal = document.getElementById('myModal');
        var span = document.getElementsByClassName("close")[0];
        var img = editImage.srcElement.innerHTML;
        var div = editImage.srcElement.parentElement;

        var newStuff = "Header: ";
        var newStuffDesc = "Description: ";

        var newStuffInput = document.createElement("textarea");
        newStuffInput.setAttribute("rows", "1");
        newStuffInput.setAttribute("cols", "20");
        // newStuffInput.setAttribute("name", "");
        newStuffInput.innerHTML = div.querySelectorAll(":nth-child(2)")[0].innerHTML;
        // whatsnew["title"] = newStuffInput.innerHTML;

        var descInput = document.createElement("textarea");
        descInput.setAttribute("rows", "4");
        descInput.setAttribute("cols", "20");
        descInput.innerHTML = div.querySelectorAll(":nth-child(3)")[0].innerHTML;
        // whatsnew["shownDescription"] = descInput.innerHTML;

        var whatsnewNode = document.getElementById("whatsnewInput");
        var descNode = document.getElementById("descInput");

        document.getElementById("whatsnew").innerHTML = newStuff;
        whatsnewNode.appendChild(newStuffInput);
        document.getElementById("description").innerHTML = newStuffDesc;
        descNode.appendChild(descInput);

        modal.style.display = "block";
        span.onclick = function () {
            modal.style.display = "none";
            whatsnewNode.removeChild(whatsnewNode.firstChild);
            descNode.removeChild(descNode.firstChild);

        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
                whatsnewNode.removeChild(whatsnewNode.firstChild);
                descNode.removeChild(descNode.firstChild);

            }
        }


        var submit = document.getElementById("submit");
        submit.style.cssText = "height: 10%; width: 25%; font-size: 14px; float: right; color: black; margin-right: 40%;";
        new_submit = submit.cloneNode(true);
        new_submit.addEventListener("click", function () {
            submitChanges(newStuffInput, descInput)
        }, false);
        submit.parentNode.replaceChild(new_submit, submit);



        function submitChanges(header, description) {
            div.querySelectorAll(":nth-child(2)")[0].innerHTML = header.value;
            div.querySelectorAll(":nth-child(3)")[0].innerHTML = description.value;

            modal.style.display = "none";
            whatsnewNode.removeChild(whatsnewNode.firstChild);
            descNode.removeChild(descNode.firstChild);
        }
    }