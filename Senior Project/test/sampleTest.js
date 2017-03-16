var expect = require("chai").expect;


describe("Sample Example", function() {
    describe("sample quality", function() {
        it("does a thing", function() {
            expect("hello").to.equal("hello");
            expect([1, 2, 3]).to.deep.equal([1, 2, 3]);
        });
    });
});