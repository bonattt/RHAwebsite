$.holdReady(true);

window.onload = function() {
	QUnit.test( "Build Row", function( assert ) {
        //showModal();
        var mochData = {"field1": "data1", "field2": "data2", "field3": 3, "field4": 4};
        var rowNumber = 3;
        var fields = ["field1", "field3"];

        var row = buildRow(mochData, fields, 3);

        assert.equal(row.getAttribute("id"), "row3", "has correct id");
        // appends blank <td/> tag
        assert.equal(row.children.length, fields.length+1,  "only makes columns for selected fields");

        assert.ok(!row.children[0].getAttribute("id"), "first entry has no id");
        assert.equal(row.children[0].children.length, 0, "first entry has no children");
        assert.equal(row.children[1].children.length, 0, "column 1 has no child");
        assert.equal(row.children[2].children.length, 0, "column 2 has no child");

        assert.equal(row.children[1].getAttribute("id"), "row"+rowNumber+"col0", "column 1 has correct id");
        assert.equal(row.children[2].getAttribute("id"), "row"+rowNumber+"col1", "column 2 has correct id");

        assert.equal(row.children[1].textContent, mochData.field1, "column 1 has correct text");
        assert.equal(row.children[2].textContent, ''+mochData.field3, "column 2 has correct text");

	});

	QUnit.test( "Build Funds Row", function( assert ) {
        var rowNumber = 2
        var fund = {'fund_name': 1, 'funds_amount': "two"};
        var row = buildFundsRow(fund, rowNumber);

        // these are the keys used in the BuildFundsRow function
        // var keys = ['fund_name', 'funds_amount']

        assert.equal(row.children.length, 4, "fund row has 4 columns");
        assert.equal(row.children[3].children.length, 1, "last column has button child");

        assert.ok(!row.children[0].getAttribute("id"), "first entry has no id");
        assert.equal(row.children[0].children.length, 0, "first entry has no children");
        assert.equal(row.children[1].children.length, 0, "column 1 has no child");
        assert.equal(row.children[2].children.length, 0, "column 2 has no child");

        assert.equal(row.children[0].textContent, '', "first entry is blank");
        assert.equal(row.children[1].textContent, ''+fund.fund_name, "column 1 has correct data");
        assert.equal(row.children[2].textContent, ''+fund.funds_amount, "column 2 has correct data");

	});


	QUnit.test( "Build Payment Row", function( assert ) {
        var rowNumber = 2
        var payment =
            {
                'proposal_id': 1, // normal cases
                'cm': "two",
                "receiver": 3,
                'amountused': 123.45678, // special cases
                'datereceived': "2016-12-21T05:00:00.000Z",
                'dateprocessed': "2017-03-20T05:00:00.000Z"
            };
        var row = buildPaymentRow(payment, rowNumber);

        // these are the keys used in the BuildPaymentRow function
        // var keys = ['proposal_id', 'cm', 'receiver']

        assert.equal(row.children[0].textContent, '', "first entry is blank");
        assert.equal(row.children[1].textContent, ''+payment.proposal_id, "column 1 has correct data");
        assert.equal(row.children[2].textContent, ''+payment.cm, "column 2 has correct data");
        assert.equal(row.children[3].textContent, ''+payment.receiver, "column 3 has correct data");
        assert.equal(row.children[4].textContent, '$123.46', "column 4* has correct data");
        assert.equal(row.children[5].textContent, monthNames[11]+' 21, 2016', "column 5* has correct date");
        assert.equal(row.children[6].textContent, monthNames[2]+' 20, 2017', "column 6* has correct date");

	});

	QUnit.test( "Compose Date Str", function( assert ) {
	    var dateStr = "2016-12-21T05:00:00.000Z";
	    var output = composeDateStr(dateStr);
	    var expected = 'December 21, 2016';
        assert.equal(output, expected, "test");
	});
}