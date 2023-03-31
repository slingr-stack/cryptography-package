const _sha256 = app.sha256Lib.Sha256();

exports.encode = function(text){
    return _sha256.encode(text);
}
