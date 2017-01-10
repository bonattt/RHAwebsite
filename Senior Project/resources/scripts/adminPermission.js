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

var insertEditButtons = function(modalSubmitFunc, dataElementRoot, targetIdRoot, attributes) {
    var adminValues = document.getElementsByClassName("edit");
	var buttonList = [];
    for (var i = 0; i < adminValues.length; i++) {
		var elementId = adminValues[i].id;
        var editButton = document.createElement("img");
        console.log("setupEditModal('" + elementId + "', '"+targetIdRoot+"')");
        editButton.setAttribute("src", "../images/edit.png");
		editButton.setAttribute("class", "admin-edit-button btn btn-info btn-lg");
		editButton.setAttribute("data-toggle", "modal");	// data-toggle="modal"
		editButton.setAttribute("data-target", "#myModal");	// data-target="#myModal"
		//editButton.setAttribute("onclick", "setupEditModal('"+ dataElementRoot + id + "', '"+targetIdRoot+"');");
		editButton.setAttribute("onclick", "setupEditModal('"+ elementId + "', '"+targetIdRoot+"');");
		if (attributes != undefined) {
			appendAttributes(editButton, attributes);
		}
		editButton.addEventListener("click", modalSubmitFunc, false);
		adminValues[i].appendChild(editButton);
		buttonList.push(editButton);
	}
	return buttonList;
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

var setupEditModal = function (dataElementId, targetIdRoot) {
	console.log("adminPermission.SETUP EDIT MODAL");
	console.log("edit data ID = " + dataElementId);
	var dataset = document.getElementById(dataElementId).dataset;
	console.log(dataset);
	for (attr in dataset) {
		console.log("dataset." + attr + " = " + dataset[attr]);
		var textField = document.getElementById(targetIdRoot + attr);
		if (textField != undefined) {
            textField.value = dataset[attr];
        }
	}
    enableSubmitButton(dataElementId, targetIdRoot, function(json_data, put_id) {
        console.log('sending API put request');
        console.log(json_data);
        var apiUrl = 'committee/' + put_id
        var xhr = xhrPutRequest(apiUrl);
        alert('sending API put request...\napi url: "' + apiUrl + '"');
        xhr.send();
        setTimeout(function () { 
            console.log(xhr.responseText);
        }, 300);
    });
    if (textField != undefined) { 
        textField.value = dataset[attr];
    }
	
	/*var nameField = document.getElementById(targetIdRoot + "name");
	nameField.value = dataset.name;
	
	var descriptionField = document.getElementById(targetIdRoot + "desc");
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

var enableSubmitButton = function(dataElementId, targetIdRoot, submitFunc) {
	console.log('enabling submit button!!');
	//if (apiExtention == undefined) {
		//SUBMIT_ALERT(dataElementId, targetIdRoot);
		//return;
	//}
	var submitButton = document.getElementById("modal-submit");
	var cancelButton = document.getElementById("modal-cancel");
    var handleSubmitButton = function(event) {
        clearSubmitHandlers(submitButton);
		console.log('submit button presses!');
		var dataset = document.getElementById(dataElementId).dataset;
		var json_data = {}
		for (attr in dataset) {
			var textField = document.getElementById(targetIdRoot + attr);
			if (textField != undefined) {
				dataset[attr] = textField.value;
				json_data[attr] = textField.value;
			} else {
				json_data[attr] = dataset[attr];
			}
		}
		// alert(JSON.stringify(json_data));
		console.log('submitFunc:');
        var committeeId = dataset.committeeid;
		submitFunc(json_data, committeeId);
	};
    modal_event_handlers.push(handleSubmitButton); // global varialbe.
	submitButton.addEventListener("click", handleSubmitButton);
    cancelButton.addEventListener("click", function(event) { clearSubmitHandlers(submitButton) });
}

var SUBMIT_ALERT = function(dataElementId, targetIdRoot) {
	var submitButton = document.getElementById("modal-submit");
	msg = "please add the API extension as an arguement to the function 'enableSubmitButton'"; 
	console.log(msg);
	alert(msg);
	submitButton.addEventListener("click", function(event) {
		/*var msg = "TODO: add a database query here! \n";
		var dataset = document.getElementById(dataElementId).dataset;
		for (attr in dataset) {
			var textField = document.getElementById(targetIdRoot + attr);
			if (textField != undefined) {
				console.log("updating attr " + attr);
				dataset[attr] = textField.value;
			}
			msg += attr + ": " + dataset[attr] + "\n";
		} //*/
		alert(msg);
	});
}

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
	console.log("creating XHR " + method + " JSON(??) request");
	checkUrlExtension(urlExtention);
	var xhr = createCORSRequestJSON(method, BASE_API_URL + urlExtention);
	if (!xhr) {
		throw new Error('CORS not supported');
	}
	xhr.onload = function () {
		var responseText = xhr.responseText;
        alert('Xhr ' + method + 'completed successfully!.');
	}
	xhr.onerror = function () {
        var msg = "There was an error with an XHR " + method + " JSON(??) request.";
        alert(msg);
		console.log(msg);
	}
	return xhr;
}

function createXhrRequest(method, urlExtention) {
	console.log("creating XHR " + method + " request");
	checkUrlExtension(urlExtention);
	var xhr = createCORSRequest(method, BASE_API_URL + urlExtention);
	if (!xhr) {
		throw new Error('CORS not supported');
	}
	xhr.onload = function () {
		var responseText = xhr.responseText;
	}
	xhr.onerror = function () {
		console.log("There was an error with an XHR " + method + " request.");
	}
	return xhr;
}

function checkUrlExtension(url) {
	if (url.includes(BASE_API_URL )) {
		console.log('!!! WARNING !!!\n\ta url containing the full API extension' +
					'was passed into a function expecting an extension');
	}
}


