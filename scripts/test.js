const _lodashInstance = pkg.crypto.testLib.lodash()

exports.dependencyPackage = function () {
    return dependencies.serviceTest.http.serviceTest2();
};
