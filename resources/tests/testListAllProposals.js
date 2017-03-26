$.holdReady(true);

window.onload = function() {
	QUnit.test( "createColumnHead", function( assert ) {
	    var str = "test name"
        var head = createColumnHead(str);
        assert.ok( head.textContent.includes(str), "create column head includes name!" );
	});


	QUnit.test( "createTableRow", function( assert ) {
        var index = 0;
        var proposal = {};
        var isAdmin = false;

	    var tr = createTableRow(index, proposal, isAdmin)
        assert.ok( false, "create column head includes name!" );
	});

}