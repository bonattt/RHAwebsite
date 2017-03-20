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
        assert.ok(!row.children[0].getAttribute("class"), "first entry has no class");
        assert.equal(row.children[0].children.length, 0, "first entry has no children");

        assert.equal(row.children[1].getAttribute("id"), "row"+rowNumber+"col1", "column 1 has correct id");
        assert.equal(row.children[2].getAttribute("id"), "row"+rowNumber+"col2", "column 2 has correct id");

	});

}