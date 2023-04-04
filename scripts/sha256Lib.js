(function () {
    function Sha256() {
    }

    Sha256.prototype.encode = function(message) {
        var crypto = window.crypto || window.msCrypto;
        var buffer = new TextEncoder('utf-8').encode(message);
        return crypto.subtle.digest('SHA-256', buffer)
            .then(hex);
    };

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

    if (typeof exports !== 'undefined') {
        exports.Sha256 = Sha256;
    } else {
        window.Sha256 = Sha256;
    }
})();