$.holdReady(true);

window.onload = function() {
	QUnit.test( "Test Case One", function( assert ) {
        // code
        assert.equal(2+2, 4, "test addition");
	});
	QUnit.test( "Test Case Two", function( assert ) {
        // code
        assert.equal(2-2, 0, "test subtraction");
	});
}
