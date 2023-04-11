(function() {
    function Lodash() {
        if (!(this instanceof Lodash)) {
            return new Lodash();
        }else{
            return this;
        }
    }

    Lodash.prototype.size = function () {
        return "size";
    }

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = Lodash;
        }
        exports.Lodash = Lodash;
    }

    if (typeof window === "object" && typeof window.document === "object") {
        window.Lodash = Lodash;
        window.lodash = new Lodash();
    }

}());
