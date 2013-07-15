
var assert = require("assert");
var qdomain = require("../index");

process.on('uncaughtException', function(err) {
    console.log("fail", err);
    process.exit(2);
});

setTimeout(function() {
    console.log("ok");
}, 20);

qdomain(function() {
    setTimeout(function() {
        throw new Error("first");
    }, 1);

    setTimeout(function() {
        throw new Error("second");
    }, 10);

}).done(null, function(err) {
    assert.equal(err.message, "first");
});
