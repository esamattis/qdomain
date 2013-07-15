
var Q = require("q");
var domain = require("domain");

function promiseInDomain(fn) {
    var promiseDomain = domain.create();
    var defer = Q.defer();

    promiseDomain.on("error", defer.reject);

    promiseDomain.run(function() {
        process.nextTick(function() {
            var res = fn(defer);
            if (res && typeof res.then === "function") {
                defer.resolve(res);
            }
        });
    });

    function end(res) {
        var d2 = Q.defer();
        process.nextTick(function() {
            promiseDomain.dispose();
            d2.resolve(res);
        });
        return d2.promise;
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
