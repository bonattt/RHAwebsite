
window.onload = function() {
	QUnit.test( "test 1", function( assert ) {
	  assert.ok( 1 == "1", "Passed!" );
	});
	
	QUnit.test( "test 2", function( assert ) {
	  assert.equal("thing", "thing", "Passed!" );
	});
}