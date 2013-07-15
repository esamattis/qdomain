
var assert = require("assert");
var qdomain = require("../index");

qdomain(function(defer) {
    setTimeout(function() {
        defer.resolve("ok");
    }, 1);
}).done(function(msg) {
    assert.equal(msg, "ok");
    console.log("ok");
});
