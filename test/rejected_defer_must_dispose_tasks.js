
var assert = require("assert");
var qdomain = require("../index");


qdomain(function(defer) {

    setTimeout(function() {
        defer.reject();
    }, 1);

    setTimeout(function() {
        console.log("fail");
    }, 5);

});

setTimeout(function() {
    console.log("ok");
}, 10);

