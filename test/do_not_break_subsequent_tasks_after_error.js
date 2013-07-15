
var assert = require("assert");
var qdomain = require("../index");

qdomain(function() {

    setTimeout(function() {
        throw new Error("async err");
    }, 1);


}).fail(function() {
    setTimeout(function() {
        console.log("ok");
    }, 1);
});
