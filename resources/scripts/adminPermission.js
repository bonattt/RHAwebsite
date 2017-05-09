// append something to this
const BASE_API_URL = 'http://ec2-52-15-141-212.us-east-2.compute.amazonaws.com:3000/api/v1/';

var modal_event_handlers = [];
var delete_confirm_handlers = [];
var delete_init_handlers = [];

var selected_element_id;

var userIsOfficer = function(officers) {
	officer = JSON.parse(officers);
    var tempUser = JSON.parse(sessionStorage.getItem("userData"));
	if (!tempUser) {
        return false;
    }
    for (var i = 0; i < officer.length; i++) {
        if (officer[i].username === tempUser.username) {
        	if (officer[i].firstname == null || officer[i].lastname == null) {
        		var xhr = xhrPutRequest('members/' + officer[i].username);
        		var tempName = tempUser.name.split(" ");
        		var firstname = tempName[0];
        		var lastname = tempName[1];
        		officer[i].firstname = firstname;
        		officer[i].lastname = lastname;
        		xhr.send(JSON.stringify(officer[i]));
        	}
			return true;
		}
		if (tempUser.username == null) {
			var xhr = xhrPostRequest('singleMember');
			var tempName = tempUser.name.split(" ");
    		var firstname = tempName[0];
    		var lastname = tempName[1];
    		var json = {};
    		json.username = tempUser.username;
    		json.firstname = firstname;
    		json.lastname = lastname;
    		xhr.send(JSON.stringify(json));
		}
	}
	return false;
}

var insertEditButtons = function(dataElementRoot, uiElementRootId, idFieldName, submitFunc, attributes) {
    var adminValues = document.getElementsByClassName("edit");
	var buttonList = [];
    for (var i = 0; i < adminValues.length; i++) {
		var elementId = adminValues[i].id;
        var editButton = document.createElement("img");
        editButton.setAttribute("src", "../images/edit.png");
		editButton.setAttribute("class", "admin-edit-button btn btn-lg");
		editButton.setAttribute("data-toggle", "modal");
		editButton.setAttribute("data-target", "#myModal");
        editButton.addEventListener("click", 
                generateEditButtonListener(elementId, uiElementRootId, submitFunc, idFieldName)
            );
        editButton.addEventListener('click', function(clickedId) {
            return function() {
                console.log(clickedId);
                selected_element_id = clickedId;
            }
        } (elementId));
        /*
         * this is messy, but basically I need to curry so that the
         * actionListener for the button press has the values in its
         * local environment because the environment where the function
         * is created changes the values that are used.
         */
		if (attributes != undefined) {
			appendAttributes(editButton, attributes);
		}
		// editButton.addEventListener("click", modalSubmitFunc, false);
		adminValues[i].appendChild(editButton);
		buttonList.push(editButton);
	}
	return buttonList;
}

// dataElementId    - the id of the HTML5 data attributes which will be used to populate the modal's fields
// uiElementRootId  - the root id of the modal's fields which will be populated
// submitFunc       - the function which is called uppon pressing the submit button.
// idFieldName      - the value of this field will passed to submitFunc for use in the API url.
var generateEditButtonListener = function(dataElementId, uiElementRootId, submitFunc, idFieldName) {
     return function(event) {
        var deleteBtn = document.getElementById('modal-delete');
//        if (deleteBtn != null && typeof deleteBtn != "undefined") {
//            deleteBtn.disabled = false;
//        } else {
//        }
        setupEditModal(dataElementId, uiElementRootId, submitFunc, idFieldName);
     };
}

var insertEditButtonsBefore = function (modalSubmitFunc, attributes) {
    var adminValues = document.getElementsByClassName("edit");
	var buttonList = [];
    for (var i = 0; i < adminValues.length; i++) {
        var editButton = document.createElement("img");
        editButton.setAttribute("src", "../images/edit.png");
		if (attributes != undefined) {
			appendAttributes(editButton, attributes);
		}
		editButton.addEventListener("click", modalSubmitFunc, false);
		adminValues[i].insertBefore(editButton, adminValues[i].firstChild);
		buttonList.push(editButton);
	}
}

var appendAttributes = function (element, attributes) {
	for (attr in attributes) {
		element.setAttribute(attr, attributes[attr]);
	}
}

var setupEditModal = function (dataElementId, uiElementRootId, submitFunc, idFieldName) {
    var dataset = document.getElementById(dataElementId).dataset;
	for (attr in dataset) {
		var textField = document.getElementById(uiElementRootId + attr);
		if (textField != undefined) {
            textField.value = dataset[attr];
        }
	}
    enableSubmitButton(dataElementId, uiElementRootId, submitFunc, idFieldName);
    if (textField != undefined) {
        textField.value = dataset[attr];
    }
	
	/*var nameField = document.getElementById(uiElementRootId + "name");
	nameField.value = dataset.name;
	
	var descriptionField = document.getElementById(uiElementRootId + "desc");
	descriptionField.value = dataset.desc; //*/
}


var clearSubmitHandlers = function(element, inputMode) {
    if (inputMode == undefined) {
        inputMode = 'click';
    }
    modal_event_handlers.forEach(function(handler) {
        element.removeEventListener(inputMode, handler);
    });
}

var enableDeleteInit = function(dataElementid, apiIdField, btnId, deleteFunc) {
    var deleteBtn = document.getElementById(btnId);
    delete_init_handlers.forEach(function (handler) {
        deleteBtn.removeEventListener('click', handler);
    });
    delete_init_handlers = [];
    var newHandler = function() {
        enableDeleteConfirm(dataElementId, apiField, 'delete-confirm', deleteFunc);
    }
    deleteBtn.addEventListener('click', newHandler);
    delete_init_handlers.push(newHandler);    
}

var enableDeleteConfirm = function(dataElementid, apiIdField, btnId, deleteFunc) {
    var deleteBtn = document.getElementById(btnId);
    delete_confirm_handlers.forEach(function (handler) {
        deleteBtn.removeEventListener('click', handler);
        
    });
    delete_handlers = [];
    var newHandler = function () {
        var dataset = document.getElementById(dataElementId);
        deleteFunc(dataset[apiIdField]);
    }
    deleteBtn.addEventListener('click', newHandler);
    delete_handlers.push(newHandler);
}

var enableSubmitButton = function(dataElementId, uiElementRootId, submitFunc, idFieldName) {
	//if (apiExtention == undefined) {
		//SUBMIT_ALERT(dataElementId, uiElementRootId);
		//return;
	//}
	var submitButton = document.getElementById("modal-submit");
	var cancelButton = document.getElementById("modal-cancel");
    var handleSubmitButton = function(event) {
        clearSubmitHandlers(submitButton);
		var dataset = document.getElementById(dataElementId).dataset;
		var json_data = {}
		for (attr in dataset) {
			var textField = document.getElementById(uiElementRootId + attr);
			if (textField != undefined) { //Check if textfield is actually a file Uploader
				json_data[attr] = textField.value;
                if (attr == 'image' || attr == 'image_path') {
    				dataset[attr] = textField.value; // hacky fix for my bad code.
    			}
			} else {
				json_data[attr] = dataset[attr];
			}
            
            if (json_data[attr] == '') {
                delete json_data[attr]
            }
		}
		// alert(JSON.stringify(json_data));
        var apiurl_id = dataset[idFieldName];
		submitFunc(json_data, apiurl_id);
	};
    modal_event_handlers.push(handleSubmitButton); // global varialbe.
	submitButton.addEventListener("click", handleSubmitButton);
    cancelButton.addEventListener("click", function(event) { clearSubmitHandlers(submitButton) });
}

/*var SUBMIT_ALERT = function(dataElementId, uiElementRootId) {
	var submitButton = document.getElementById("modal-submit");
	msg = "please add the API extension as an arguement to the function 'enableSubmitButton'"; 
	alert(msg);
	submitButton.addEventListener("click", function(event) {
		/*var msg = "TODO: add a database query here! \n";
		var dataset = document.getElementById(dataElementId).dataset;
		for (attr in dataset) {
			var textField = document.getElementById(uiElementRootId + attr);
			if (textField != undefined) {
				console.log("updating attr " + attr);
				dataset[attr] = textField.value;
			}
			msg += attr + ": " + dataset[attr] + "\n";
		} // * /
		alert(msg);
	});
}*/

function getOfficers() {
    var urlExtension = 'officers/';
    var xhr = xhrGetRequest(urlExtension);
    return xhr;
}

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

function createCORSRequestJSON(method, url) {
	var xhr = new XMLHttpRequest();
	xhr.open(method, url, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	// xhr.setRequestHeader('Cache-Control', 'no-cache');
	// xhr.setRequestHeader('Postman-Token', '50080db4-9d36-83cd-d446-2dd286337b12');
	// xhr.setRequestHeader('Host', 'rha-website-1.csse.rose-hulman.edu:3000');
	return xhr;
}

function xhrGetRequest(urlExtension) {
	return createXhrRequest('GET', urlExtension);
}

function xhrPostRequest(urlExtension) {
	return createXhrRequestJSON('POST', urlExtension);
}

function xhrPutRequest(urlExtension) {
	return createXhrRequestJSON('PUT', urlExtension);
}

function xhrDeleteRequest(urlExtension) {
    return createXhrRequestJSON('DELETE', urlExtension);
}

function createXhrRequestJSON(method, urlExtension) {
	checkUrlExtension(urlExtension);
    var fullApiUrl = BASE_API_URL + urlExtension;
	var xhr = createCORSRequestJSON(method, fullApiUrl);
	if (!xhr) {
		throw new Error('CORS not supported');
	}
	xhr.onload = function () {
		var responseText = xhr.responseText;
	}
	xhr.onerror = function () {
        var msg = "There was an error with an XHR " + method + " JSON(??) request.";
	}
	return xhr;
}

function createXhrRequest(method, urlExtension) {
	checkUrlExtension(urlExtension);
	var xhr = createCORSRequest(method, BASE_API_URL + urlExtension);
	if (!xhr) {
		throw new Error('CORS not supported');
	}
	xhr.onload = function () {
		var responseText = xhr.responseText;
	}
	xhr.onerror = function () {
	}
	return xhr;
}

function checkUrlExtension(url) {
	if (url.includes(BASE_API_URL )) {
		console.log('!!! WARNING !!!\n\ta url containing the full API extension' +
					'was passed into a function expecting an extension');
	}
}
