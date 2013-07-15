
var assert = require("assert");
var qdomain = require("../index");

qdomain(function(defer) {
    setTimeout(function() {
        defer.reject(new Error("rejected"));
    }, 1);
}).done(null, function(err) {
    assert.equal(err.message, "rejected");
    console.log("ok");
});
