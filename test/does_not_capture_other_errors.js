
var assert = require("assert");
var qdomain = require("../index");

process.on('uncaughtException', function(err) {
    assert.equal(err.message, "other err");
    console.log("ok");
    process.exit(0);
});

qdomain(function() {
    setTimeout(function() {
        throw new Error("async err");
    }, 1);

}).done(null, function() {
    throw new Error("other err");
});
