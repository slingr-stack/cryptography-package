var _sha256 = pkg.crypto.sha256Lib.Sha256();

exports.encode = function(text){
    return _sha256.encode(text);
}
