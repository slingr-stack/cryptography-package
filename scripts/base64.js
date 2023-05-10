exports.encode = function (str) {
    return sys.utils.base64.encode(str);
}

exports.decode = function (str) {
    return sys.utils.base64.decode(str);
}

exports.configTest = function () {
    return config.get("webhooksSharedKey");
}