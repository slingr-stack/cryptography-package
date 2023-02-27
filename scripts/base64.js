exports.encode = function (str) {
    return btoa(str);
}

exports.decode = function (str) {
    return atob(str);
}