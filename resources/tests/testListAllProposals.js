
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


//	QUnit.test( "createColumnHead", function( assert ) {
//	    var str = "test name"
//        var head = createColumnHead(str);
//        assert.ok( head.textContent.includes(str), "create column head includes name!" );
//	});
//
//
//	QUnit.test( "createTableRow", function( assert ) {
//        var index = 0;
//        var proposal = {};
//        var isAdmin = false;
//
//	    var tr = createTableRow(index, proposal, isAdmin)
//        assert.ok( false, "UNIMPLEMENTED: create column head includes name!" );
//	});

    QUnit.test( "createDateTD--unMarshalHtml5", function( assert ) {
        var dateStr = "2015-04-07T05:00:00.000Z";
        var dateOut = unMarshalHtml5(dateStr);
        var dateLs = dateOut.split('-');

        assert.equal(dateLs[1], 4, "meshaled date obj has correct month");
        assert.equal(dateLs[2], 7, "meshaled date obj has correct day");
        assert.equal(dateLs[0], 2015, "meshaled date obj has correct year");
    });


//	QUnit.test( "createDateTD--test time zones", function( assert ) {
//        var year = 2017;
//        var month = 4;
//        var day = 7;
//
//        var dateStr = year+"-"+zeroPad(month,2)+"-"+zeroPad(day,2)+"T05:00:00.000Z"
//        var td = getDateTD(dateStr, 3);
//
//        var dateOut = td.innerHTML.split('/');
//        console.log(dateOut);
//
//        var monthOut = dateOut[0]
//        assert.equal(monthOut, month+'', "month");
//
//        var dayOut = dateOut[1];
//        assert.equal(dayOut, day+'', "day");
//
//        var yearOut = dateOut[2];
//        assert.equal(yearOut, year+'', "year");
//
//	});
}