
var assert = require("assert");
var qdomain = require("../index");
var fs = require("fs");


qdomain(function() {
    fs.createReadStream("doesnotexist").pipe(fs.createWriteStream("targetfile"));
}).fail(function(err) {
    assert.equal(err.code, "ENOENT");
    console.log("ok");
});
