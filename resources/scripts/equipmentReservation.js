function setup() {
	// var addButton = document.getElementById("calendar-add-button");
	// addButton.addEventListener("click", function() {addNewCalendar("calendar1", "calendar-modal-")});

	var xhr = xhrGetRequest('equipment');
	xhr.send();
	setTimeout(function () { populateCalendarData(xhr.responseText) }, 300);

	var select = document.getElementById("calendar-selector");
	select.onchange = function() {
		var selIndex = select.selectedIndex + 1;
		console.log(selIndex);
		var selValue = $('select option:nth-child(' + selIndex + ')').val();
		console.log(selValue);
		var calendarToSelect = document.getElementById(selValue);
		console.log(calendarToSelect);
		switchCalendarView(calendarToSelect);
	}

	// var dataset = document.getElementById("calendar2").dataset;
}

function populateCalendarData(calendars) {
	calendars = JSON.parse(calendars);
	var body = document.getElementsByTagName('body')[0];
	var selector = document.getElementById('calendar-selector');

	for (var i = 0; i < calendars.length; i++) {
		var data = document.createElement('div');
		data.setAttribute('id', calendars[i].equipmentname);
		data.setAttribute('data-id', calendars[i].equipmentid);
		data.setAttribute('data-name', calendars[i].equipmentname);
		data.setAttribute('data-desc', calendars[i].equipmentdescription);
		data.setAttribute('data-embed', calendars[i].equipmentembed);

		body.appendChild(data);

		var option = document.createElement('option');
		option.setAttribute('value', calendars[i].equipmentname);
		option.innerHTML = calendars[i].equipmentname;

		selector.appendChild(option);
	}
}

 function addNewCalendar(dataElementId, targetIdRoot) {
	var dataset = document.getElementById(dataElementId).dataset;
	for (attr in dataset) {
		var textField = document.getElementById(targetIdRoot + attr);
		if (textField == undefined) { continue; }
		textField.value = dataset[attr];

		console.log(textField);
	}

	/*var nameField = document.getElementById(targetIdRoot + "name");
	nameField.value = dataset.name;
	
	var descriptionField = document.getElementById(targetIdRoot + "desc");
	descriptionField.value = dataset.desc; //*/
}

function lastUpdated() {
	var update, date, currDate, currTime, today;
	update = document.getElementById("calendar-last-updated");
	while (update.hasChildNodes()) {
		update.removeChild(update.lastChild);
	}
	date = document.createElement("p");

	today = new Date();
	date.innerHTML = getLastUpdatedString(today);

	update.appendChild(date);
}

function getLastUpdatedString(today) {
    var day = today.getDay();

	if(day == 0) {
		day = "Sunday";
	} else if (day == 1) {
		day = "Monday";
	} else if(day == 2) {
		day = "Tuesday";
	} else if(day == 3) {
		day = "Wednesday";
	} else if(day == 4) {
		day = "Thursday";
	} else if (day == 5) {
		day = "Friday";
	} else {
		day = "Saturday";
	}

	var minutes = today.getMinutes();
	if (minutes.length < 3) {
		minutes = "0" + minutes;
	}

	var AMorPM;

	var hours = today.getHours();
	if (hours > 12) {
		AMorPM = " PM";
		hours = hours % 12;
	} else {
		AMorPM = " AM";
	}

	currDate = day + ", " + (today.getMonth()+1) + "/" + today.getDate() + "/" + today.getFullYear();
	currTime = hours + ":" + minutes + AMorPM;
	return "This calendar was last updated on " + currDate + " at " + currTime;
}

function switchCalendarView(calendarToView) {
	console.log("I'm happening!");
	var calendarFrame = document.getElementById("calendar-wrapper");
	if (calendarToView == null) {
		calendarFrame.innerHTML = "";
		return;
	}
	console.log(calendarFrame);
	console.log(calendarToView);
	console.log(calendarToView.getAttribute("data-embed"));

	calendarFrame.innerHTML = calendarToView.getAttribute("data-embed");
	lastUpdated();
};

$(document).ready(function() {
	setup();
}); 
