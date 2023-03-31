const _sha256 = app.sha256Lib.sha256();

exports.encode = function(text){
    return _sha256.encode(text)
}
