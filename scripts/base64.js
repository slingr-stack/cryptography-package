exports.encode = function (str) {
    return sys.utils.base64.encode(str);
}

exports.decode = function (str) {
    return sys.utils.base64.decode(str);
}

exports.dependency = function(str) {
    var key = dependencies.testdep.test.t3();
    return key;
}

exports.dependency2 = function(str) {
    var key = dependencies.packageTest.test.something();
    return key;
}

exports.nestedtest = function(){
    var value =  "Dependency Crypto\n" + dependencies.testdep.test.doublenested()
    return value;
}