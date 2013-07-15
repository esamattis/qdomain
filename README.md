
# qdomain - Promises from domains

Small experiment combining node.js [domain][] error handling with promises
using the [q][] library.

Using domains it is possible to capture unhandled asynchronous exceptions.
This module wraps that magic to promises.

```javascript
var qdomain = require("qdomain");

qdomain(function(defer){

  setTimeout(function(){
    throw new Error("async error");
  }, 100);

}).then(function(){
  // nothing...
}, function(err){

  // We will get the thrown async error here!

});
```

`qdomain` takes a callback and returns a promise. That callback can be resolved
or rejected using following methods:

  1. Throw an exception on this tick, the next or whatever. That's the magic
     of domains!
  2. Call `resolve` or `reject` on the given defer object
  3. Return another promise

This makes it easy to capture stream error while piping for example

```javascript
qdomain(function(defer){
  fs.createReadStream("somefile")
  .pipe(transform1())
  .pipe(transform2())
  .pipe(transform3())
  .pipe(fs.createWriteStream("output-file"))
  .on("close", defer.resolve);
}).fail(function(err){
  // Any IO errors or transform errors will be handled here
});
```

[domain]: http://nodejs.org/api/domain.html
[q]: https://github.com/kriskowal/q
