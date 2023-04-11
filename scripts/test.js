const _lodashInstance = pkg.crypto.testLib.lodash()

exports.size = function (collection) {
    return _lodashInstance.size(collection);
};