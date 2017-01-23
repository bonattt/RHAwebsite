// append something to this
const BASE_API_URL = 'http://rha-website-1.csse.rose-hulman.edu:3000/api/v1/';

var modal_event_handlers = [];

var userIsOfficer = function(officers) {
	officer = JSON.parse(officers);
    var tempUser = JSON.parse(sessionStorage.getItem("userData"));
	if (!tempUser) {
        return false;
    }
    for (var i = 0; i < officer.length; i++) {
        if (officer[i].username === tempUser.username) {
			return true;
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
		editButton.setAttribute("class", "admin-edit-button btn btn-info btn-lg");
		editButton.setAttribute("data-toggle", "modal");
		editButton.setAttribute("data-target", "#myModal");
        editButton.addEventListener("click", 
                generateEditButtonListener(elementId, uiElementRootId, submitFunc, idFieldName)
            );
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
     console.log("edit callback created for " + dataElementId + ", " + uiElementRootId);
     return function(event) {
            console.log("edit button pressed for " + dataElementId + ", " + uiElementRootId);
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
    console.log('dataset id = ' + dataElementId);
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

var populateModalFields

var clearSubmitHandlers = function(element, inputMode) {
    if (inputMode == undefined) {
        inputMode = 'click';
    }
    modal_event_handlers.forEach(function(handler) {
        element.removeEventListener(inputMode, handler);
    });
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
			if (textField != undefined) {
				dataset[attr] = textField.value;
				json_data[attr] = textField.value;
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
    var urlExtention = 'officers/';
    var xhr = xhrGetRequest(urlExtention);
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

function xhrGetRequest(urlExtention) {
	return createXhrRequest('GET', urlExtention);
}

function xhrPostRequest(urlExtention) {
	return createXhrRequestJSON('POST', urlExtention);
}

function xhrPutRequest(urlExtention) {
	return createXhrRequestJSON('PUT', urlExtention);
}

function createXhrRequestJSON(method, urlExtention) {
	checkUrlExtension(urlExtention);
    var fullApiUrl = BASE_API_URL + urlExtention;
	var xhr = createCORSRequestJSON(method, fullApiUrl);
    // alert('url: ' + fullApiUrl);
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

function createXhrRequest(method, urlExtention) {
	checkUrlExtension(urlExtention);
	var xhr = createCORSRequest(method, BASE_API_URL + urlExtention);
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
