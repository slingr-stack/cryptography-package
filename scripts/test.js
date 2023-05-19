const _lodashInstance = pkg.crypto.testLib.lodash()

exports.size = function () {
    return _lodashInstance.size();
};

exports.dependencyPackage = function () {
    return dependencies.serviceTest.http.serviceTest2();
};
