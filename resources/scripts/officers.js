var officerMap = new Object();
var editName;
const API_EXTENSION = '';
const MESSAGE_MODAL_ID = 'messageModal';


function showNotification(message) {
    document.getElementById("messageModal-body").innerHTML = message;
    $("#messageModal").modal()
}

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
                if (json_data.phone_number.length != 10) {
                    showNotification("please enter a 10-digit phone number");
                    return;
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
        var phoneEntry = document.getElementById('addOfficerModal-phone_number');
        var hallEntry = document.getElementById('addOfficerModal-hall');
        var roomEntry = document.getElementById('addOfficerModal-room_number');
        var cmEntry = document.getElementById('addOfficerModal-cm');

        var urlExtension = 'members/' + username;
        var json_data = {"memberType": membertypeEntry.value};

        if (phoneEntry.value != '') {
            if (phoneEntry.value.length != 10) {
                showNotification("please enter a 10-digit phone number");
                return;
            }
            json_data.phone_number = phoneEntry.value
        }
        if (hallEntry.value != '') { json_data.hall = hallEntry.value}
        if (roomEntry.value != '') { json_data.room_number = roomEntry.value}
        if (cmEntry.value != '') { json_data.cm = cmEntry.value}

        console.log(json_data.phone_number);
//        if (json_data.phone_number.length != 10) {
//            showNotification("please enter a 10-digit phone number");
//            return;
//        }

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

$(document).ready(function () {
    setup();
});
