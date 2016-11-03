(function () {

    // var committee = [{
    //     name: "On Campus",
    //     image_path: "../images/committees/oncampus.jpg",
    //     description: "The On-campus committee plans everything that RHA does on campus for the residents. We keep Chauncey's stocked with the newest DVDs. We plan and run competitive tournaments like Smash Brothers, Texas Holdem, Holiday Decorating, Res HallFeud, and more. We also show movies outdoors on the big screen, and sponsor an Easter egg hunt in the spring. We also take your best ideas on how to improve the on campus living experience and make them a reality."
    // },
    //     {
    //         name: "Off Campus",
    //         image_path: "../images/committees/offcampus.jpg",
    //         description: "The RHA Off Campus committee plans events that are held off of the Rose-Hulman campus. RHA will often pay for a portion of the ticket and organize transportation to make these events more affordable and accessible. Some events include trips to Six Flags, Turkey Run, Pacers Games, and highly anticipated movies. The Off Campus committee is also responsible for planning the annual Deming Park Cookout which provides free food to all on campus residents."
    //     },
    //     {
    //         name: "Service",
    //         image_path: "../images/committees/service.jpg",
    //         description: "Volunteer? Do I have to build a house or help run an orphanage? No, volunteering is so much more than that. Everyday we volunteer our time by helping other people out. The service committee focuses on improving the Terre Haute community. Several events include helping underprivileged kids at Ryves Hall, hosting Blood Drives and fundraising for local charity organizations, as well as the quarterly Give Up A Meal (GUAM) program. Join the service committee to find out what service is really all about."
    //     },
    //     {
    //         name: "Publicity",
    //         image_path: "../images/committees/publicity.jpg",
    //         description: "Publicity committee is for those who want to help publicize all of the many R.H.A. events. Some of the responsibilities include making the iconic RHA light board being happily in full support of R.H.A. activities, but can vary week to week. Frequently, we combine with service to create ‘surblicity’ to create one epic force of a committee. Come check it out!"
    //     }];
    var xhr = getCommittees();
    xhr.send();
    setTimeout(function () { actuallyDoShit(xhr.responseText) }, 300);

    function actuallyDoShit(committee) {
        console.log("committee is: " + committee);
        committee = JSON.parse(committee);
        for (var i = 0; i < committee.length; i++) {
            console.log("Image path: " + committee[i].image);
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
                showModal(e);
            }, false);
        }
    }

    function getCommittees() {
        var url = 'http://rha-website-1.csse.rose-hulman.edu:3000/api/v1/committees';
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




function showModal() {
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