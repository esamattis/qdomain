
var assert = require("assert");
var qdomain = require("../index");

process.on('uncaughtException', function(err) {
    assert.equal(err.message, "other err");
    console.log("ok");
    process.exit(0);
});

qdomain(function(defer) {
    setTimeout(function() {
        defer.resolve();
    }, 1);

}).done(function() {
    throw new Error("other err");
});
