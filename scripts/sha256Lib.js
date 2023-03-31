function sha256(message) {
    var crypto = window.crypto || window.msCrypto;
    var buffer = new TextEncoder('utf-8').encode(message);
    var digest = crypto.subtle.digest('SHA-256', buffer);
    return hex(digest);
}

function hex(buffer) {
    var hexCodes = [];
    var view = new DataView(buffer);
    for (var i = 0; i < view.byteLength; i += 4) {
        var value = view.getUint32(i);
        var stringValue = value.toString(16);
        var padding = '00000000';
        var paddedValue = (padding + stringValue).slice(-padding.length);
        hexCodes.push(paddedValue);
    }
    return hexCodes.join('');
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = {
        sha256: sha256
    };
}