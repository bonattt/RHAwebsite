function displayUpcomingEvents() {

    var xhr = getEvents();
    xhr.send();
    console.log(xhr);
    setTimeout(function () { actuallyDoShit(xhr.responseText) }, 300);
    // var apiURL = "http://rha-website-1.csse.rose-hulman.edu:3000/";

    function actuallyDoShit(proposal) {
        console.log(proposal);
        proposal = JSON.parse(proposal);

        for (var i = 0; i < proposal.length; i++) {
            var html = "<div class='event'><a href='sign-ups'>";
            html += "<img src=" + proposal[i].image_path + " alt='Event' class='eventImage'>";
            html += "<div class='eventText'><h2>" + proposal[i].proposal_name + "</h2>";
            html += "<p>" + proposal[i].event_date + "</p></div></a></div>";

            var sidebar = document.getElementById("sidebarEvents");
            console.log(sidebar);
            sidebar.innerHTML += html;
            // console.log(sidebar);
        }

    }

    function getEvents() {
        var url = 'http://rha-website-1.csse.rose-hulman.edu:3000/api/v1/events';
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
            // var responseText = xhr.responseText;
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
}

(function () {
    var isAdmin = true;
    var hasListener = false;
    var whatsnew = {};

    if (isAdmin) {
        var adminValues = document.getElementsByClassName("edit");
        for (var i = 0; i < adminValues.length; i++) {
            var editImage = document.createElement("img");
            editImage.setAttribute("src", "../images/edit.png");
            editImage.style.cssText = "float: right;";
            // adminValues[i].appendChild(editImage);
            adminValues[i].insertBefore(editImage, adminValues[i].firstChild);
            editImage.addEventListener("click", function (e) {
                showModal(e);
            }, false);
        }
    }

    function getFrontPageNews() {

    }

    function inputHandler(property, value) {
        console.log(value);
        whatsnew[property] = value;
        $('#title').text(whatsnew.title);
        $('#shownDescription').text(whatsnew.shownDescription);
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

    $(document).ready(function () {
        console.log("HELLO");
        displayUpcomingEvents();

    });

})();