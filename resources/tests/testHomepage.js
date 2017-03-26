$.holdReady(true);

// this overwrites a function in the script being tested
var filePathDeleted = "NOT CALLED YET";

function deleteFunction(filePath) {
    filePathDeleted = filePath;
    console.log('TES: would deleting "'+filePath+'"');
}

window.onload = function() {

	QUnit.test( "populateDeletePhotoModal", function( assert ) {
        var carousel = document.getElementById('carousel-inner');
        var expectedLength = carousel.children.length;

        populateDeletePhotoModal();

        var deleteForm = document.getElementById('deletePhotoForm');
        assert.equal(deleteForm.children.length, expectedLength, "delete form has correct number of elements" );
        assert.equal(carousel.children.length, expectedLength, "carousel children not mutated." );
	});

	QUnit.test( "figureOutSelectedRadioButton", function( assert ) {
//        var carousel = document.getElementById('carousel-inner');
//        var expectedLength = carousel.children.length;
//
//        populateDeletePhotoModal();
//
//        var deleteForm = document.getElementById('deletePhotoForm');
//        assert.equal(deleteForm.children.length, expectedLength, "delete form has correct number of elements" );
//        assert.equal(carousel.children.length, expectedLength, "carousel children not mutated." );
        var radioButtons = document.getElementsByTagName('input');

        radioButtons[0].checked = true;
        radioButtons[1].checked = false;
        radioButtons[2].checked = false;
        figureOutSelectedRadioButton(radioButtons);
        assert.equal(filePathDeleted, "/notAnImage0", "radio button one deletes image one");

        radioButtons[0].checked = false;
        radioButtons[1].checked = true;
        radioButtons[2].checked = false;
        figureOutSelectedRadioButton(radioButtons);
        assert.equal(filePathDeleted, "/notAnImage1", "radio button two deletes image two");

        radioButtons[0].checked = false;
        radioButtons[1].checked = false;
        radioButtons[2].checked = true;
        figureOutSelectedRadioButton(radioButtons);
        assert.equal(filePathDeleted, "/notAnImage2", "radio button three deletes image three");
	});

}