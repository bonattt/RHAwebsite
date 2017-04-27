function setAdmin(officers) {
    if (userIsOfficer(officers)) {
        var addProposalButton = document.getElementById("addProposal"); // Using same styling as button on Proposals page; didn't want to add new styling rule
        addProposalButton.style.display = "block";
    }
}

function setup() {
	var officersxhr = getOfficers();
	officersxhr.onload = function () {
		setAdmin(officersxhr.responseText);
	}
    officersxhr.send();

	var xhr = xhrGetRequest('equipment');
	xhr.onload = function () {
		populateCalendarData(xhr.responseText);
	};
	xhr.send();

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

	var submitBtn = document.getElementById("modal-submit");
	submitBtn.addEventListener("click", submit);
}

function submit() {
    var name = document.getElementById("name").value;
    var embed = document.getElementById("embededLink").value;

    json_object = {};
    json_object["equipmentName"] = name;
    json_object["equipmentEmbed"] = embed;

    var xhr = xhrPostRequest('equipment');

    xhr.onload = function() {
    	location.reload();
    };

    console.log(JSON.stringify(json_object));
    xhr.send(JSON.stringify(json_object));
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
		data.setAttribute('data-embed', calendars[i].equipmentembed);

		body.appendChild(data);

		var option = document.createElement('option');
		option.setAttribute('value', calendars[i].equipmentname);
		option.innerHTML = calendars[i].equipmentname;

		selector.appendChild(option);
	}
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
	var calendarFrame = document.getElementById("calendar-wrapper");
	if (calendarToView == null) {
		calendarFrame.innerHTML = "";
		return;
	}

	//Display the delete button you will create here, and retrieve the ID the calendar and set its dataset.equipmentID to it
	// console.log(calendarToView.dataset["embed"]);
	// console.log(calendarToView.dataset["id"]);

	var firstDelete = document.getElementById("delete-calendar");
	firstDelete.style.display = "inline";

	console.log("equipment/" + calendarToView.dataset["id"]);

	var deleteBtn = document.getElementById("confirm-delete");
	deleteBtn.addEventListener("click", function () {

		var extension = "equipment/" + calendarToView.dataset["id"];
		var xhr = xhrDeleteRequest(extension);
		xhr.onload = function () {
			location.reload();
		};

		xhr.send();

	});

	calendarFrame.innerHTML = calendarToView.getAttribute("data-embed");
	lastUpdated();
};

$(document).ready(function() {
	setup();
}); 
