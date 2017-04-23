var officerMap = new Object();
var editName;
const API_EXTENSION = '';
const MESSAGE_MODAL_ID = 'messageModal';


function setAdmin(officers) {
    if (userIsOfficer(officers)) {
        setupAddOfficerButton();
        var editbuttons = insertEditButtons(
            'officer',
            'officers-modal-',
            'user_id',
            function (json_data, put_id) {
                var apiUrl = 'member/' + put_id
                var xhr = xhrPutRequest(apiUrl);
                delete json_data.user_id;
                delete json_data.username;
                for (attr in json_data) {
                    if (json_data[attr] == null) {
                        delete json_data[attr]
                    }
                }

                if (json_data.membertype == '') {
                    msg = 'Officers must have a member type.'
                    delete json_data.membertype;
                }
                xhr.onload = function () { location.reload() };
                var imageEntry = document.getElementById("imageFilePut");
                var global_id = selected_element_id.replace('officer', '');
                global_id = parseInt(global_id);
                //            alert(selected_element_id + ' ?= ' + put_id + ' = ' + (selected_element_id == put_id));
                if (global_id != put_id) {
                    alert('WARNING WARNING:\nselected_element_id: ' + global_id + '\nput_id: ' + put_id);
                }
                if (imageEntry.value != '') {
                    var image_to_delete = json_data.image;

                    var photoPost = new XMLHttpRequest();
                    photoPost.open('POST', location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/api/v1/officerPhoto', true);
                    var files = imageEntry.files;
                    var formData = new FormData();
                    formData.append("imageFile", files[0]);

                    photoPost.onreadystatechange = function (e) {
                        if (photoPost.readyState == 4 && photoPost.status == 200) {
                            deleteFunction(image_to_delete.substring(2, image_to_delete.length));
                            json_data.image = JSON.parse(photoPost.response).filepath;
                            xhr.onreadystatechange = function (e) {
                                if (xhr.readyState == 4 && xhr.status == 200) {
                                    location.reload();
                                }
                            };
                            xhr.send(JSON.stringify(json_data));
                        }
                    }
                    photoPost.send(formData);
                } else {
                    xhr.send(JSON.stringify(json_data));
                }
                imageEntry.value = '';
            });

        var deleteBtn = document.getElementById('modal-delete');
        deleteBtn.style.display = "inline";
        deleteBtn.addEventListener('click', function() {
            var imageEntry = document.getElementById("imageFilePut")
            imageEntry.value = '';
        });

        var cancelBtn = document.getElementById('modal-cancel');
        cancelBtn.addEventListener('click', function () {
            var imageEntry = document.getElementById("imageFilePut");
            imageEntry.value = '';
        });

        var deleteConfirm = document.getElementById('confirm-delete');
        deleteConfirm.addEventListener('click', function () {
            // "selected_element_id" global decleared in adminPermission.js ... sorry about that... :(
            var element = document.getElementById(selected_element_id);
            var dataset = element.dataset;
            var json_data = { "memberType": null };
            var apiUrl = 'member/' + dataset.user_id;
            var xhr = xhrPutRequest(apiUrl);
            deleteFunction(dataset.image.substring(2, dataset.image.length));
            xhr.onload = function () { location.reload() }
            xhr.send(JSON.stringify(json_data));
        });
    }
    //var addOfficeButton = document.getElementById("addOfficer");
    //addOfficeButton.addEventListener("click", showEmptyModal);
    //addOfficeButton.style.display = "block";
}

function deleteFunction(filePath) {
    var photoDeleteApi = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/api/v1/photo';
    var formData = new FormData();
    var photoxhr = new XMLHttpRequest();
    var dbObject = {};
    dbObject["imagePath"] = 'resources' + filePath;

    photoxhr.open('DELETE', photoDeleteApi, true);
    photoxhr.setRequestHeader('Content-Type', 'application/json');

    photoxhr.send(JSON.stringify(dbObject));
}

function setupAddOfficerButton() {
    var addOfficerBtn = document.getElementById('addOfficerButton');
    addOfficerBtn.style.display = "block"; //*/
    addOfficerBtn.addEventListener('click', function () {
        var usernameEntry = document.getElementById('addOfficerModal-username');
        usernameEntry.value = ''
        var memebertypeEntry = document.getElementById('addOfficerModal-membertype');
        memebertypeEntry.value = ''
    });
    var submitBtn = document.getElementById('addOfficerModal-submit');
    submitBtn.addEventListener('click', function () {
        var usernameEntry = document.getElementById('addOfficerModal-username');
        var username = usernameEntry.value;
        var membertypeEntry = document.getElementById('addOfficerModal-membertype');
        var memberType = membertypeEntry.value;

        var urlExtension = 'members/' + username;
        var json_data = { "memberType": memberType };
        var xhr = xhrPutRequest(urlExtension);
        xhr.onload = function () { location.reload() };
        var imageEntry = document.getElementById("imageFilePost");
        if (imageEntry.value != '') {
            var photoPost = new PhotoPostXhr("officerPhoto");
            photoPost.imageCallback(xhr, json_data, 'image');
            var files = imageEntry.files;
            var formData = new FormData();
            formData.append("imageFile", files[0]);
            imageEntry.value = ''
            photoPost.send(formData);
        } else {
            xhr.send(JSON.stringify(json_data));
        }
    });
    var cancelBtn = document.getElementById('addOfficerModal-cancel');
    cancelBtn.addEventListener('click', function () {
        var imageEntry = document.getElementById("imageFilePost");
        imageEntry.value = '';
    });
}

function showMessageModal(message) {
    var modalBody = document.getElementById('messageModalBody');
    var text = document.createElement('p');
    text.appendChild(document.createTextNode(message));
    modalBody.appendChild(text);
    $('#' + MESSAGE_MODAL_ID).modal('show');
}


function setup() {

    var officerId;

    var xhr = xhrGetRequest('officers');
    xhr.onload = function () {
        createHTMLFromResponseText(xhr.responseText);
    }
    xhr.send();
    // setTimeout(}, 300);

    function createHTMLFromResponseText(officer) {
        officer = JSON.parse(officer);

        for (var i = 0; i < officer.length; i++) {
            if (officer[i].memberType != "") {
                var html = "<div class='officer'>";
                html += "<h3 class='edit' id='officer" + officer[i].user_id + "'>"

                html += officer[i].firstname + " " + officer[i].lastname + " - " + officer[i].membertype
                html += "</h3>";
                html += "<img src='" + officer[i].image + "' alt='" + officer[i].membertype + "'height='294' width='195'>";
                html += "<p>Email: <a href='mailto:" + officer[i].username + "@rose-hulman.edu'>" + officer[i].username + "@rose-hulman.edu</a></p>";
                html += "<p> Phone Number: " + officer[i].phone_number + "</p>";
                html += "<p> Room: " + officer[i].hall + " " + officer[i].room_number + "</p>";
                html += "<p>Box #: " + officer[i].cm + "</p>";

                officerMap[officer[i].username] = officer[i].user_id;

                var officers = document.getElementById("officers");
                officers.innerHTML += html;

                var dataset = document.getElementById('officer' + officer[i].user_id).dataset;
                var fields = ["user_id", "firstname", "lastname", "username",
                    "membertype", "phone_number", "room_number", "hall", "cm", "image"];
                fields.forEach(function (field) {
                    dataset[field] = officer[i][field];
                });
            }
        }
        var officersxhr = getOfficers();
        officersxhr.onload = function () {
            setAdmin(officersxhr.responseText);
        }
        officersxhr.send();
        // setTimeout(function () { setAdmin(officersxhr.responseText) }, 300); // */
    }
}

function addDataset(fields, officer) {

}

function showModal(editImage) {
    var eventSrc = (editImage.target || editImage.srcElement);
    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName("close")[0];
    var nameAndTitle = eventSrc.parentElement.innerHTML;

    var parent = eventSrc.parentElement.parentElement;

    nameAndTitle = nameAndTitle.split(" - ");
    editName = nameAndTitle[0];
    // var name = "Name: " + nameAndTitle[0];
    var name = "Name: ";
    var title = "Title: ";
    var email = "Email: ";
    var phoneNumber = "Phone number: ";
    var room = "Room number: ";
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


    var emailInput = document.createElement("textarea");
    emailInput.setAttribute("rows", "1");
    emailInput.setAttribute("cols", "30");
    emailInput.setAttribute("id", "email-text");
    emailInput.innerHTML = parent.querySelectorAll(":nth-child(3)")[0].textContent.split(": ")[1];

    var phnNumInput = document.createElement("textarea");
    phnNumInput.setAttribute("rows", "1");
    phnNumInput.setAttribute("cols", "30");
    phnNumInput.setAttribute("id", "phone-text");
    phnNumInput.innerHTML = parent.querySelectorAll(":nth-child(4)")[0].textContent.split(": ")[1];

    var roomInput = document.createElement("textarea");
    roomInput.setAttribute("rows", "1");
    roomInput.setAttribute("cols", "30");
    roomInput.setAttribute("id", "room-text");
    roomInput.innerHTML = parent.querySelectorAll(":nth-child(5)")[0].textContent.split(": ")[1];


    cm = "CM: ";
    CMInput = document.createElement("textarea");
    CMInput.setAttribute("rows", "1");
    CMInput.setAttribute("cols", "30");
    CMInput.setAttribute("id", "cm-text");
    CMInput.innerHTML = parent.querySelectorAll(":nth-child(6)")[0].textContent.split(": ")[1];


    var nameNode = document.getElementById("nameInput");
    var emailNode = document.getElementById("emailInput");
    var phnNode = document.getElementById("phnNumInput");
    var roomNode = document.getElementById("roomInput");
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
    roomNode.appendChild(roomInput);
    document.getElementById("room").innerHTML = room;
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
    submitButton.addEventListener("click", function () { saveOfficer() }, false);

    modalContent.appendChild(submitButton);

    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
        nameNode.removeChild(nameNode.firstChild);
        emailNode.removeChild(emailNode.firstChild);
        phnNode.removeChild(phnNode.firstChild);
        titleNode.removeChild(titleNode.firstChild);
        roomNode.removeChild(roomNode.firstChild);
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
            roomNode.removeChild(roomNode.firstChild);
            if (CMNode.firstChild) {
                CMNode.removeChild(CMNode.firstChild);
            }
            modalContent.removeChild(submitButton);
        }
    }
}

$(document).ready(function () {
    setup();
});
