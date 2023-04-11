
(function() {


    function Lodash() {
        return this;
    }


    Lodash.prototype.size = function () {
        // var length = collection ? collection.length : 0;
        // return typeof length == 'number' ? length : keys(collection).length;
        return "size";
    }
    //
    // window._ = Lodash;
    //

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = Chance;
        }
        exports.Lodash = Lodash;
    }


    if (typeof window === "object" && typeof window.document === "object") {
        window.Lodash = Lodash;
        window.lodash = new Lodash();
    }

}());
