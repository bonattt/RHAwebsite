var committeeMap = new Object();
var committeeID;

function setAdmin(officers) {
    if (userIsOfficer(officers)) {
        setupAddCommitteeButton();
        var editButtons = insertEditButtons('committee', 'committee-modal-', 'committeeid',
            function (json_data, put_id) {
                saveCommittee(json_data);
            });
        var deleteConfirm = document.getElementById('confirm-delete');
        deleteConfirm.addEventListener('click', function () {
            var element = document.getElementById(selected_element_id);
            var deleteid = element.dataset.committeeid;
            var apiExtension = 'committee/' + deleteid
            var xhr = xhrDeleteRequest(apiExtension);
            deleteFunction(element.dataset.image.substring(2, element.dataset.image.length));
            xhr.onload = function () { location.reload() }
            xhr.send();
            document.getElementById("imageFile").value = '';
        });
        var cancelBtn = document.getElementById('modal-cancel');
        cancelBtn.addEventListener('click', function () {
            document.getElementById("imageFile").value = '';
        });
        var deleteBtn = document.getElementById('modal-delete');
        deleteBtn.style.display = "inline";
        deleteBtn.addEventListener('click', function() {
            document.getElementById("imageFile").value = '';
        });
    }
    return;
}

function setupAddCommitteeButton() {

    var addCommitteeBtn = document.getElementById("addCommittee");
    addCommitteeBtn.style.display = "block"; //*/
    addCommitteeBtn.addEventListener('click', function () {
        var deleteBtn = document.getElementById('modal-delete');
        deleteBtn.disabled = true;
        var committeeName = document.getElementById('committee-modal-committeename')
        committeeName.value = '';
        var committeeDesc = document.getElementById('committee-modal-description')
        committeeDesc.value = '';
        var submitBtn = document.getElementById('modal-submit')
        var addCommitteeSubmit = function (e) {
            var photoXhr = new PhotoPostXhr('committeePhoto');
            var urlExtension = 'committee/';
            var postXhr = xhrPostRequest(urlExtension);
            postXhr.onload = function () { location.reload(); }
            var json_data = { 'committeeName': committeeName.value, 'description': committeeDesc.value };
            photoXhr.imageCallback(postXhr, json_data, 'image');
            var files = document.getElementById("imageFile").files;
            var formData = new FormData();
            formData.append("imageFile", files[0]);
            photoXhr.send(formData);
            document.getElementById("imageFile").value = '';
        }
        submitBtn.addEventListener('click', addCommitteeSubmit);
        var addCommitteeCancel = function () {
            clearSubmitHandlers(submitBtn);
            cancelBtn.removeEventListener('click', addCommitteeCancel);
        }
        var cancelBtn = document.getElementById('modal-cancel');
        cancelBtn.addEventListener('click', function () {
            // do nothing.
        });
    });
}

function clearImageForm() {
    var formData = new FormData();

}

function setup() {
    var apiExtension = 'committees/';
    var urlExtension = 'committees';
    var xhr = xhrGetRequest(urlExtension);
    xhr.onload = function () { createHTMLFromResponseText(xhr.responseText) }
    xhr.send();
    function createHTMLFromResponseText(committee) {
        committee = JSON.parse(committee);
        for (var i = 0; i < committee.length; i++) {
            var id = committee[i].committeeid
            committeeMap[committee[i].committeename] = id;
            if (i % 2 == 0) {
                var html = "<div class='committeeWrapperRight'>";
                html += "<div class='committees'><h3 class='edit' id='committee" + id + "'>" + committee[i].committeename + "</h3>";
                html += "<p>" + committee[i].description + "</p></div>";
                html += "<image class='committeePhoto' id=image" + id + " src=" + committee[i].image + " alt=" + committee[i].committeename + "></div>";
            } else {
                var html = "<div class='committeeWrapperLeft'>";
                html += "<image class='committeePhoto' id=image" + id + " src=" + committee[i].image + " alt=" + committee[i].committeename + ">";
                html += "<div class='committees'><h3 class='edit' id='committee" + id + "'>" + committee[i].committeename + "</h3>";
                html += "<p>" + committee[i].description + "</p></div></div>";
            }

            var committees = document.getElementById("committees");
            committees.innerHTML += html;

            var dataset = document.getElementById('committee' + id).dataset;
            var fields = ["committeename", "committeeid", "description", "image"]
            fields.forEach(function (field) {
                dataset[field] = committee[i][field];
            });
        }

        var officersxhr = getOfficers();
        officersxhr.onload = () => { setAdmin(officersxhr.responseText) }
        officersxhr.send();
    }
}

function saveCommittee(data) {
    var urlExtension = 'committee/' + data.committeeid;
    var xhr = xhrPutRequest(urlExtension);
    var json_data = { committeename: data.committeename, description: data.description, image: data.image};
    var imageInput = document.getElementById("imageFile");

    if (imageInput.value != '') {
        var photoXhr = new PhotoReplaceXhr("committeePhoto");
        photoXhr.imageCallback(xhr, data, "image");
        var file = imageInput.files[0];
        photoXhr.send(file);
        //photoXhr

//        var image_to_delete = data.image.replace('.', "");
//        var photoPost = new XMLHttpRequest();
//        photoPost.open('POST', location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/api/v1/committeePhoto', true);
//        var files = imageInput.files;
//        var formData = new FormData();
//        formData.append("imageFile", files[0]);
//        photoPost.onreadystatechange = function (e) {
//            if (photoPost.readyState == 4 && photoPost.status == 200) {
//                deleteFunction(data.image.substring(2));
//                json_data.image = JSON.parse(photoPost.response).filepath;
//                xhr.onreadystatechange = function (e) {
//                    if(xhr.readyState == 4 && xhr.status == 200) {
//                        location.reload();
//                    }
//                };
//                xhr.send(JSON.stringify(json_data));
//            }
//        }
//        photoPost.send(formData);
    } else {
        xhr.send(JSON.stringify(json_data));
    }

    imageInput.value = '';
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

$(document).ready(function () {
    setup();
});