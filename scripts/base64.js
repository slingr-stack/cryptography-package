exports.encode = function (str) {
    return sys.utils.base64.encode(str);
}

exports.decode = function (str) {
    return sys.utils.base64.decode(str);
}

exports.dependency = function(str) {
    var key = dependencies.testdep.t3();
    return key;
}