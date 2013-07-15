
var assert = require("assert");
var qdomain = require("../index");

qdomain(function() {
      throw new Error("sync err");
}).done(null, function(err) {
    assert.equal(err.message, "sync err");
    console.log("ok");
    process.exit(0);
});
