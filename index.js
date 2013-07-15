
var Q = require("q");
var domain = require("domain");

function promiseInDomain(fn) {
    var promiseDomain = domain.create();
    var defer = Q.defer();

    promiseDomain.on("error", function(err) {

        process.nextTick(function() {
            promiseDomain.dispose();
            defer.reject(err);
        });

    });

    process.nextTick(function() {
        promiseDomain.run(function() {
            fn(defer);
        });
    });


    return defer.promise.then(function(res) {
        var d2 = Q.defer();
        process.nextTick(function() {
            promiseDomain.dispose();
            d2.resolve(res);
        });
        return d2.promise;
    });

}

function bindDomain(fn) {
    return function() {
        return promiseInDomain(fn);
    };
}

promiseInDomain.bind = bindDomain;

module.exports = promiseInDomain;
