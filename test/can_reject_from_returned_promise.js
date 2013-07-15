
var assert = require("assert");
var Q = require("q");

var qdomain = require("../index");


qdomain(function() {
    return Q.reject("rejected");
}).fail(function(err) {
    assert.equal(err, "rejected");
    console.log("ok");
});
