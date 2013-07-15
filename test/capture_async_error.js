
var assert = require("assert");
var qdomain = require("../index");

qdomain(function() {
    setTimeout(function() {
        throw new Error("async err");
    }, 1);
}).done(null, function(err) {
    assert.equal(err.message, "async err");
    console.log("ok");
    process.exit(0);
});
