(function() {
    function lodash() {
        if (!(this instanceof lodash)) {
            return new lodash();
        }else{
            return this;
        }
    }

    lodash.prototype.size = function (collection) {
        var length = collection ? collection.length : 0;
        return typeof length == 'number' ? length : keys(collection).length;
    }


    var keys = !nativeKeys ? shimKeys : function(object) {
        if (!isObject(object)) {
            return [];
        }
        if ((hasEnumPrototype && typeof object == 'function') ||
            (nonEnumArgs && object.length && isArguments(object))) {
            return shimKeys(object);
        }
        return nativeKeys(object);
    };




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
