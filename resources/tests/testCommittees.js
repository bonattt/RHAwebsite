$.holdReady(true);

window.onload = function() {
	QUnit.test( "", function( assert ) {
	  //showModal();
	  assert.ok( 1 == "1", "Passed!" );
	});
}