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
	    var selector = document.createElement('select');
	    selector.setAttribute('id', 'calendar-selector');
	    populateCalendarData(JSON.stringify(calendars));
	    document.getElementById('hiddenDiv').appendChild(selector);

        var kanJam = document.getElementById("Kan Jam");
	    assert.ok(kanJam, "Kan Jam is created");
        var kanJamData = kanJam;
	    for (var field in calendars[0]) {
	        assert.equal(kanJamData.getAttribute('data-'+field), calendars[0][field], "Kan Jam has correct " + field);
	    }

        var cornhole = document.getElementById("Cornhole")
	    assert.ok(cornhole, "Cornhole is created");
	    var cornholeData = cornhole;
	    for (var field in calendars[1]) {
	        assert.equal(cornholeData.getAttribute('data-'+field), calendars[1][field], "Cornhole has correct " + field);
	    }
	});

}