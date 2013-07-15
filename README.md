
# qdomain - Promises from domains

Small experiment combining node.js [domain][] error handling with promises
using the [Q][] library.

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

`qdomain` takes a callback and returns a promise. It can be resolved or
rejected using following methods:

  1. Throw an exception on this tick, the next or whenever to reject it. That's
     the magic of domains!
  2. Call `resolve` or `reject` on the given defer object
    - It's full [Q defer object][defer]
  3. Return another promise

This makes it easy to capture stream errors while piping for example

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

## Note about domain disposing

When the promise is resolved or rejected the domain associated with it will be
[disposed][dispose] automatically. Which means all IO and timers must be
completed before resolving the promise or they will be canceled! This has few
nice features:

  - No more errors can be thrown from the `qdomain` callback
  - You can be sure that all IO started from the callback has been completed
    (or canceled) when the promise is resolved or rejected.

## Install

    npm install qdomain

[domain]: http://nodejs.org/api/domain.html
[Q]: https://github.com/kriskowal/q
[dispose]: http://nodejs.org/api/domain.html#domain_domain_dispose
[defer]: https://github.com/kriskowal/q/wiki/API-Reference#qdefer
