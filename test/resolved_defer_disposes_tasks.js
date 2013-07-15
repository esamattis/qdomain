
var qdomain = require("../index");

qdomain(function(defer) {

    setTimeout(function() {
        defer.resolve();
        console.log("ok");
    }, 1);

    setTimeout(function() {
        console.log("fail");
    }, 5);

});

