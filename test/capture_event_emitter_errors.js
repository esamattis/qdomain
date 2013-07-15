
var assert = require("assert");
var qdomain = require("../index");
var EventEmitter = require("events").EventEmitter;

qdomain(function() {
    var emitter = new EventEmitter();

    setTimeout(function() {
        emitter.emit("error", new Error("emitter error"));
    }, 1);

}).fail(function(err) {
    assert.equal(err.message, "emitter error");
    console.log("ok");
});
