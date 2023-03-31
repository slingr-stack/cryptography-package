const sha256 = app.sha256Lib.sha256;

exports.encode = function(text){
    return sha256(text)
}
