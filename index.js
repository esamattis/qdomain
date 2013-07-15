
var Q = require("q");
var domain = require("domain");

function promiseInDomain(fn) {
    var promiseDomain = domain.create();
    var defer = Q.defer();

    promiseDomain.on("error", defer.reject);

    promiseDomain.run(function() {
        process.nextTick(function() {
            var res = fn(defer);
            // If promise is returned use that to resolve the final promise
            if (res && typeof res.then === "function") {
                defer.resolve(res);
            }
        });
    });

    // Before resolving the promise for the user dispose the domain
    function end(res) {
        var endDefer = Q.defer();
        process.nextTick(function() {
            promiseDomain.dispose();
            endDefer.resolve(res);
        });
        return endDefer.promise;
    }

    return defer.promise.then(end, function(err) {
        return end(Q.reject(err));
    });

}

function bindDomain(fn) {
    return function() {
        return promiseInDomain(fn);
    };
}

promiseInDomain.bind = bindDomain;

module.exports = promiseInDomain;
