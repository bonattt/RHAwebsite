var expect = require("chai").expect;
var rewire = require("rewire");

describe("Sample Example", function() {
    describe("sample quality", function() {
        it("does a thing", function() {
            expect("hello").to.equal("hello");
            expect([1, 2, 3]).to.deep.equal([1, 2, 3]);
        });
    });

    describe("using rewire", function() {
        it("return one", function() {
            var module = rewire("../server.js");
            expect(1).to.equal(parseInt("1"));
        });
        it("say hello", function(){
            var module = rewire("../test/seeIfRewireJsWorks.js");
            expect("hello world").to.equal(module.sayHello());
        });
    });
});