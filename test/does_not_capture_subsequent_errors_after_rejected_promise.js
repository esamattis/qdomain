
var assert = require("assert");
var Q = require("q");

var qdomain = require("../index");

process.on('uncaughtException', function(err) {
    assert.equal(err.message, "other err");
    console.log("ok");
    process.exit(0);
});

qdomain(function() {
    var mydefer = Q.defer();
    setTimeout(function() {
        mydefer.reject("rejected");
    },1);
    return mydefer.promise;
}).fail(function(err) {
    assert.equal(err, "rejected");
    throw new Error("other err");
}).done();
