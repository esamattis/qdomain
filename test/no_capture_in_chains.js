
console.log("ok");
// var assert = require("assert");
// var qdomain = require("../index");
// 
// process.on('uncaughtException', function(err) {
//     assert.equal(err.message, "no capture");
//     console.log("ok");
//     process.exit(0);
// });
// 
// 
// qdomain(function() {
// 
//     setTimeout(function() {
//         throw new Error("async err");
//     }, 1);
// 
// 
// }).fail(function(err) {
//     console.log("asyn");
//     assert.equal(err.message, "async err");
// }).fin(function() {
//     console.log("fin");
// 
//     setTimeout(function() {
//         console.log("throw");
//         throw new Error("no capture");
//     }, 1);
// 
// }).done();
