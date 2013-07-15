
var assert = require("assert");
var qdomain = require("../index");

qdomain(function(defer) {

    setTimeout(function() {
        defer.resolve();
    }, 1);


}).done(function() {
    setTimeout(function() {
        console.log("ok");
    }, 1);
});
