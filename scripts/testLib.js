(function() {
    // function lodash() {
    //     if (!(this instanceof lodash)) {
    //         return new lodash();
    //     }else{
    //         return this;
    //     }
    // }

    function lodash(value) {
        // exit early if already wrapped, even if wrapped by a different `lodash` constructor
        if (value && typeof value == 'object' && value.__wrapped__) {
            return value;
        }
        // allow invoking `lodash` without the `new` operator
        if (!(this instanceof lodash)) {
            return new lodash(value);
        }
        this.__wrapped__ = value;
    }

    lodash.prototype.size = function () {

        return "Math.max";
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
