$.holdReady(true);

window.onload = function() {
	QUnit.test( "populateCalendarData", function( assert ) {
	    var embed3 = "<iframe src=\"https://calendar.google.com/calendar/embed?mode=WEEK&amp;height=800&amp;" +
	        "wkst=1&amp;bgcolor=%23FFFFFF&amp;src=25v1djivm37d6psb5284pojmqs%40group.calendar.google.com&amp;" +
	        "color=%23AB8B00&amp;ctz=America%2FNew_York\" style=\"border-width:0\" width=\"100%\" height=\"100%\"" +
	        "frameborder=\"0\" scrolling=\"no\"></iframe>";
	    var embed4 = "<iframe src=\"https://calendar.google.com/calendar/embed?mode=WEEK&amp;" +
	        "height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;" +
	        "src=s2bdbeg620ghgp9bh1e6k818uo%40group.calendar.google.com&amp;" +
	        "color=%238D6F47&amp;ctz=America%2FNew_York\" style=\"border-width:0\" width=\"100%\" height=\"100%\" " +
	        "frameborder=\"0\" scrolling=\"no\"></iframe>";

	    var calendars = [
              {
                "equipmentid": 3,
                "equipmentname": "Kan Jam",
                "equipmentdescription": "This is equipment 1",
                "equipmentembed": embed3,
                "rentaltimeindays": 3
              },
              {
                "equipmentid": 4,
                "equipmentname": "Cornhole",
                "equipmentdescription": "This is equipment 2",
                "equipmentembed": embed4,
                "rentaltimeindays": 3
              }
            ];
        var fields = ["id", "name", "desc", "embed"]
	    var selector = document.createElement('select');
	    selector.setAttribute('id', 'calendar-selector');
	    populateCalendarData(JSON.stringify(calendars));
	    document.getElementById('hiddenDiv').appendChild(selector);

        var kanJam = document.getElementById("Kan Jam");
	    assert.ok(kanJam, "Kan Jam is created");
        var kanJamData = kanJam;
	    for (var f in fields) {
	        assert.equal(kanJamData.getAttribute('data-'+f), calendars[0][f], "Kan Jam has correct " + f);
	    }

        var cornhole = document.getElementById("Cornhole")
	    assert.ok(cornhole, "Cornhole is created");
	    var cornholeData = cornhole;
	    for (var f in fields) {
	        assert.equal(cornholeData.getAttribute('data-'+f), calendars[1][f], "Cornhole has correct " + f);
	    }
	});

	QUnit.test( "lastUpdated", function( assert ) {
        var element = document.createElement("div");
        element.setAttribute('id', 'calendar-last-updated');
        document.getElementById('hiddenDiv').appendChild(element);

        lastUpdated();
        assert.equal(element.children.length, 1, "one child added.");

        element.appendChild(document.createElement("p"));
        element.appendChild(document.createElement("p"));

        lastUpdated();
        assert.equal(element.children.length, 1, "Children removed and one added");

        var testDate = new Date();
        var dateStr = element.children[0].textContent;
        console.log(dateStr);

        var daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday"];
        assert.ok(dateStr.includes(daysOfTheWeek[testDate.getDay()]), "date string has day of the week");

        assert.ok(dateStr.includes(testDate.getDate()+''), "date string has date");
        assert.ok(dateStr.includes((testDate.getMonth()+1)+''), "date string has month");
        assert.ok(dateStr.includes(testDate.getFullYear()+''), "date string has year");

	});

	QUnit.test( "lastUpdated: afternoon", function( assert ) {

	    var today = new Date("2017-03-08T20:05:00.000Z");
	    var hour = 3;
        var result = getLastUpdatedString(today).toLowerCase();
        console.log("RESULT (afternoon): " + result);
        assert.ok(result.includes("3:05"), "has correct hour and minute");
        assert.ok(result.includes("pm"), "is afternoon");
	});

	QUnit.test( "lastUpdated: morning, same day (timezone)", function( assert ) {
	    var today = new Date("2017-03-08T10:15:00.000Z");
	    var hour = 3;
        var result = getLastUpdatedString(today).toLowerCase();
        console.log("RESULT (morning): " + result);
        assert.ok(result.includes("5:15"), "has correct hour and minute");
        assert.ok(result.includes("am"), "is morning");
	});

	QUnit.test( "lastUpdated: previous day (timezone)", function( assert ) {

	    var today = new Date("2017-03-08T04:15:00.000Z");
	    var hour = 3;
        var result = getLastUpdatedString(today).toLowerCase();
        console.log("RESULT (previous day): " + result);
        assert.ok(result.includes("11:15"), "has correct hour and minute");
        assert.ok(result.includes("pm"), "is afternoon");
	});

}