const _lodashInstance = pkg.crypto.testLib.lodash()

exports.size = function (object) {
    return _lodashInstance.size(object);
};