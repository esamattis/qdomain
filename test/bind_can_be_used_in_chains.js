
var assert = require("assert");
var Q = require("q");

var qdomain = require("../index");

Q("ok").then(qdomain.bind(function() {

    setTimeout(function() {
        throw new Error("async err");
    }, 1);

})).fail(function(err) {
    assert.equal(err.message, "async err");
    console.log("ok");
}).done();
