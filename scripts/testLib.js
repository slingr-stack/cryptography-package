
(function() {


    function Lodash() {
        return new Lodash();
    }


    Lodash.prototype.size = function () {
        // var length = collection ? collection.length : 0;
        // return typeof length == 'number' ? length : keys(collection).length;
        return "size";
    }
    //
    // window._ = Lodash;
    //

    if (typeof window === "object" && typeof window.document === "object") {
        window.Lodash = Lodash;
        window.lodash = new Lodash();
    }

}());
