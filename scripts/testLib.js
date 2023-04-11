(function () {

    // Constructor
    function Test () {
        if (!(this instanceof Test)) {
            return new Test()
        }        
        return this;
    }

    Test.prototype.other = function () {
        return "other"
    };
    
    // CommonJS module
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = Test;
        }
        exports.Test = Test;
    }

    // Register as an anonymous AMD module
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return Test;
        });
    }

    // if there is a importsScrips object define test for worker
    // allows worker to use full Test functionality with seed
    if (typeof importScripts !== 'undefined') {
        test = new Test();
        self.Test = Test;
    }

    // If there is a window object, that at least has a document property,
    // instantiate and define test on the window
    if (typeof window === "object" && typeof window.document === "object") {
        window.Test = Test;
        window.test = new Test();
    }
})();