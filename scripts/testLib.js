(function() {
    function lodash() {
        if (!(this instanceof lodash)) {
            return new lodash();
        }else{
            return this;
        }
    }
    lodash.prototype.size = function () {

        return Math.max;
    }
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = lodash;
        }
        exports.lodash = lodash;
    }

    if (typeof window === "object" && typeof window.document === "object") {
        window.lodash = lodash;
        window.lodash = new lodash();
    }

}());
