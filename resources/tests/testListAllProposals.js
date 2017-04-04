
$.holdReady(true);

function zeroPad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}


window.onload = function() {

	QUnit.test( "createDateTD--test ALL dates", function( assert ) {
        function testDate(year, month, day) {
            var dateStr = year+"-"+zeroPad(month,2)+"-"+zeroPad(day,2)+"T05:00:00.000Z"
            var td = getDateTD(dateStr, 3);

            var dateOut = td.innerHTML.split('/');

            var monthOut = dateOut[0]
            assert.equal(monthOut, month+'', "month "+td.innerHTML);

            var dayOut = dateOut[1];
            assert.equal(dayOut, day+'', "day: "+td.innerHTML);

            var yearOut = dateOut[2];
            assert.equal(yearOut, year+'', "year "+td.innerHTML);
        }

        for (var month = 1; month < 13; month++) {
            for (var day = 1; day < 32; day++) {
                if (month == 2 && day > 28) { break; }
                if (month == 4 && day > 30) { break; }
                if (month == 6 && day > 30) { break; }
                if (month == 9 && day > 30) { break; }
                if (month == 11 && day > 30) { break; }
                testDate(2017, month, day);
            }
        }
	});


    QUnit.test( "createDateTD--unMarshalHtml5", function( assert ) {
        var dateStr = "2015-04-07T05:00:00.000Z";
        var dateOut = unMarshalHtml5(dateStr);
        var dateLs = dateOut.split('-');

        assert.equal(dateLs[1], 4, "meshaled date obj has correct month");
        assert.equal(dateLs[2], 7, "meshaled date obj has correct day");
        assert.equal(dateLs[0], 2015, "meshaled date obj has correct year");
    });

    QUnit.test( "dateInputValueInvalid", function( assert ) {
        assert.ok(!dateInputValueInvalid('2014-04-30'), "30th of a 30 day month");
        assert.ok(!dateInputValueInvalid('2014-12-31'), "31th of a 31 day month");
        assert.ok(!dateInputValueInvalid('2014-03-01'), "1st of any month");
        assert.ok(dateInputValueInvalid('2014-13-03'), "13th month invalid");
        assert.ok(dateInputValueInvalid('2014/10/03'), "slashes invalid");
        assert.ok(dateInputValueInvalid('2014-00-03'), "0th month invalid");
        assert.ok(dateInputValueInvalid('2014-06-00'), "0th day invalid");
        assert.ok(dateInputValueInvalid('2014-02-29'), "29th of feb invalid");
        assert.ok(dateInputValueInvalid('2014-4-31'), "31st day of 30-day month invalid");
        assert.ok(dateInputValueInvalid('2014-12-32'), "32nd day of any month invalid");
        assert.ok(dateInputValueInvalid('20q14-06-20'), "year with letters invalid");
        assert.ok(dateInputValueInvalid('2014-06l-20'), "month with letters invalid");
        assert.ok(dateInputValueInvalid('2014-06-u20'), "day with letters invalid");
        assert.ok(dateInputValueInvalid('2014--20'), "blank invalid");
        assert.ok(dateInputValueInvalid('2014'), "plain number invalid");
        assert.ok(dateInputValueInvalid('apowjdpo'), "letters invalid");
    });

    QUnit.test( "getInvalidDateFields", function( assert ) {
        var dates_json = {
                'proposed_date': "2017-01-01",
                'event_date': "1999--01",
                'event_signup_open': "2020-00-15",
                'event_signup_close': "2020-02-29"
        }
        var invalid_dates = getInvalidDateFields(dates_json);
        assert.ok(!invalid_dates.includes('proposed_date'), "doesn't include correct date")
        assert.ok(invalid_dates.includes('event_date'), "includes monthless date")
        assert.ok(invalid_dates.includes('event_signup_open'), "includes 0th month date")
        assert.ok(invalid_dates.includes('event_signup_close'), "includes 29th of feb")
    });

    QUnit.test( "verifyDates on invalid dates", function( assert ) {
        var dates_json = {
                'proposed_date': "2009-02-",
                'event_date': "2016-12-31",
                'event_signup_open': "2012-15-15",
                'event_signup_close': "2014-12-32"
        }
        var msgModal = document.getElementById('infoModal-body');
        msgModal.innerHTML = '';

        assert.ok(verifyDates(dates_json), "returns true if any dates invalid");

        var msg = msgModal.innerHTML;
        assert.ok(msg != '', 'error message is made');
        assert.ok(msg.includes('proposed date'), 'error message contains "proposed date"')
        assert.ok(!msg.includes('event date'), 'error message DOES NOT contain "event date"')
        assert.ok(msg.includes('event signup open'), 'error message contains "event signup open"')
        assert.ok(msg.includes('event signup close'), 'error message contains "event signup close"')
    });

    QUnit.test( "verifyDates on valid dates", function( assert ) {
        var dates_json = {
                'proposed_date': "2009-02-01",
                'event_date': "2016-12-31",
                'event_signup_open': "2012-4-30",
                'event_signup_close': "2014-6-15"
        }
        var msgModal = document.getElementById('infoModal-body');
        msgModal.innerHTML = '';

        assert.ok(!verifyDates(dates_json), "returns false if all dates invalid");

        var msg = msgModal.innerHTML;
        assert.ok(!msg.includes('proposed date'), 'error message DOES NOT contain "proposed date"')
        assert.ok(!msg.includes('event date'), 'error message DOES NOT contain "event date"')
        assert.ok(!msg.includes('event signup open'), 'error message DOES NOT contain "event signup open"')
        assert.ok(!msg.includes('event signup close'), 'error message DOES NOT contain "event signup close"')
    });
}