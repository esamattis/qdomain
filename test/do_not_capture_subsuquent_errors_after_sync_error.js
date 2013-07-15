
var assert = require("assert");
var qdomain = require("../index");

process.on('uncaughtException', function(err) {
    assert.equal(err.message, "other err");
    console.log("ok");
    process.exit(0);
});

qdomain(function() {
    throw new Error("sync error");
}).done(null, function() {
    throw new Error("other err");
});
