
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

var insertEditButtons = function(showModalFunc, dataElementId, targetIdRoot, attributes) {
    var adminValues = document.getElementsByClassName("edit");
	var buttonList = [];
    for (var i = 0; i < adminValues.length; i++) {
        var editButton = document.createElement("img");
        editButton.setAttribute("src", "../images/edit.png");
		editButton.setAttribute("class", "admin-edit-button btn btn-info btn-lg");
		editButton.setAttribute("data-toggle", "modal");	// data-toggle="modal"
		editButton.setAttribute("data-target", "#myModal");	// data-target="#myModal"
		editButton.setAttribute("onclick", "setupEditModal('"+dataElementId+"', '"+targetIdRoot+"');");
		if (attributes != undefined) {
			appendAttributes(editButton, attributes);
		}
		editButton.addEventListener("click", showModalFunc, false);
		adminValues[i].appendChild(editButton);
		buttonList.push(editButton);
	}
}

var insertEditButtonsBefore = function(showModalFunc, attributes) {
    var adminValues = document.getElementsByClassName("edit");
	var buttonList = [];
    for (var i = 0; i < adminValues.length; i++) {
        var editButton = document.createElement("img");
        editButton.setAttribute("src", "../images/edit.png");
		if (attributes != undefined) {
			appendAttributes(editButton, attributes);
		}
		editButton.addEventListener("click", showModalFunc, false);
		adminValues[i].insertBefore(editButton, adminValues[i].firstChild);
		buttonList.push(editButton);
	}
}

var appendAttributes = function(element, attributes) {
	for (attr in attributes) {
		element.setAttribute(attr, attributes[attr]);
	}
}

var setupEditModal = function(dataElementId, targetIdRoot) {
	console.log("adminPermission.SETUP EDIT MODAL");
	var dataset = document.getElementById(dataElementId).dataset;
	for (attr in dataset) {
		var textField = document.getElementById(targetIdRoot + attr);
		if (textField == undefined) {continue;}
		textField.value = dataset[attr];
	}
	
	/*var nameField = document.getElementById(targetIdRoot + "name");
	nameField.value = dataset.name;
	
	var descriptionField = document.getElementById(targetIdRoot + "desc");
	descriptionField.value = dataset.desc; //*/
}

var enableSubmitButton = function(dataElementId, targetIdRoot) {
	var submitButton = document.getElementById("modal-submit");
	submitButton.addEventListener("click", function(event) {
		var msg = "TODO: add a database query here! \n";
		var dataset = document.getElementById(dataElementId).dataset;
		for (attr in dataset) {
			var textField = document.getElementById(targetIdRoot + attr);
			if (textField != undefined) {
				console.log("updating attr " + attr);
				dataset[attr] = textField.value;
			}
			msg += attr + ": " + dataset[attr] + "\n";
		}
		console.log("An alert should appear");
		alert(msg);
	});
}



