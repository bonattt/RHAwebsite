function setup() {
	var addButton = document.getElementById("calendar-add-button");
	// addButton.addEventListener("click", function() {addNewCalendar() });
}

var addNewCalendar = function (dataElementId, targetIdRoot) {
	console.log("adminPermission.SETUP EDIT MODAL");
	var dataset = document.getElementById(dataElementId).dataset;
	for (attr in dataset) {
		var textField = document.getElementById(targetIdRoot + attr);
		if (textField == undefined) { continue; }
		textField.value = dataset[attr];
	}

	/*var nameField = document.getElementById(targetIdRoot + "name");
	nameField.value = dataset.name;
	
	var descriptionField = document.getElementById(targetIdRoot + "desc");
	descriptionField.value = dataset.desc; //*/
}

$(document).ready(function() {
	setup();
}); 
