(function(window, undefined) {
    /** Detect free variable `exports` */
    var freeExports = typeof exports == 'object' && exports;

    /** Detect free variable `global` and use it as `window` */
    var freeGlobal = typeof global == 'object' && global;
    if (freeGlobal.global === freeGlobal) {
        window = freeGlobal;
    }

    /** Used for array and object method references */
    var arrayRef = [],
        objectRef = {};

    /** Used to generate unique IDs */
    var idCounter = 0;

    /** Used internally to indicate various things */
    var indicatorObject = objectRef;

    /** Used by `cachedContains` as the default size when optimizations are enabled for large arrays */
    var largeArraySize = 30;

    /** Used to restore the original `_` reference in `noConflict` */
    var oldDash = window._;

    /** Used to match HTML entities */
    var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g;

    /** Used to match empty string literals in compiled template source */
    var reEmptyStringLeading = /\b__p \+= '';/g,
        reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
        reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

    /** Used to match regexp flags from their coerced string values */
    var reFlags = /\w*$/;

    /** Used to detect if a method is native */
    var reNative = RegExp('^' +
        (objectRef.valueOf + '')
            .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            .replace(/valueOf|for [^\]]+/g, '.+?') + '$'
    );

    /**
     * Used to match ES6 template delimiters
     * http://people.mozilla.org/~jorendorff/es6-draft.html#sec-7.8.6
     */
    var reEsTemplate = /\$\{((?:(?=\\?)\\?[\s\S])*?)\}/g;

    /** Used to match "interpolate" template delimiters */
    var reInterpolate = /<%=([\s\S]+?)%>/g;

    /** Used to ensure capturing order of template delimiters */
    var reNoMatch = /($^)/;

    /** Used to match HTML characters */
    var reUnescapedHtml = /[&<>"']/g;

    /** Used to match unescaped characters in compiled string literals */
    var reUnescapedString = /['\n\r\t\u2028\u2029\\]/g;

    /** Used to fix the JScript [[DontEnum]] bug */
    var shadowed = [
        'constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable',
        'toLocaleString', 'toString', 'valueOf'
    ];

    /** Used to make template sourceURLs easier to identify */
    var templateCounter = 0;

    /** Native method shortcuts */
    var ceil = Math.ceil,
        concat = arrayRef.concat,
        floor = Math.floor,
        getPrototypeOf = reNative.test(getPrototypeOf = Object.getPrototypeOf) && getPrototypeOf,
        hasOwnProperty = objectRef.hasOwnProperty,
        push = arrayRef.push,
        toString = objectRef.toString;

    /* Native method shortcuts for methods with the same name as other `lodash` methods */
    var nativeBind = reNative.test(nativeBind = slice.bind) && nativeBind,
        nativeIsArray = reNative.test(nativeIsArray = Array.isArray) && nativeIsArray,
        nativeIsFinite = window.isFinite,
        nativeIsNaN = window.isNaN,
        nativeKeys = reNative.test(nativeKeys = Object.keys) && nativeKeys,
        nativeMax = Math.max,
        nativeMin = Math.min,
        nativeRandom = Math.random;

    /** `Object#toString` result shortcuts */
    var argsClass = '[object Arguments]',
        arrayClass = '[object Array]',
        boolClass = '[object Boolean]',
        dateClass = '[object Date]',
        funcClass = '[object Function]',
        numberClass = '[object Number]',
        objectClass = '[object Object]',
        regexpClass = '[object RegExp]',
        stringClass = '[object String]';

    /** Detect various environments */
    var isIeOpera = !!window.attachEvent,
        isV8 = nativeBind && !/\n|true/.test(nativeBind + isIeOpera);

    /* Detect if `Function#bind` exists and is inferred to be fast (all but V8) */
    var isBindFast = nativeBind && !isV8;

    /* Detect if `Object.keys` exists and is inferred to be fast (IE, Opera, V8) */
    var isKeysFast = nativeKeys && (isIeOpera || isV8);

    /**
     * Detect the JScript [[DontEnum]] bug:
     *
     * In IE < 9 an objects own properties, shadowing non-enumerable ones, are
     * made non-enumerable as well.
     */
    var hasDontEnumBug;

    /**
     * Detect if a `prototype` properties are enumerable by default:
     *
     * Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1
     * (if the prototype or a property on the prototype has been set)
     * incorrectly sets a function's `prototype` property [[Enumerable]]
     * value to `true`.
     */
    var hasEnumPrototype;

    /** Detect if own properties are iterated after inherited properties (IE < 9) */
    var iteratesOwnLast;

    /**
     * Detect if `Array#shift` and `Array#splice` augment array-like objects
     * incorrectly:
     *
     * Firefox < 10, IE compatibility mode, and IE < 9 have buggy Array `shift()`
     * and `splice()` functions that fail to remove the last element, `value[0]`,
     * of array-like objects even though the `length` property is set to `0`.
     * The `shift()` method is buggy in IE 8 compatibility mode, while `splice()`
     * is buggy regardless of mode in IE < 9 and buggy in compatibility mode in IE 9.
     */
    var hasObjectSpliceBug = (hasObjectSpliceBug = { '0': 1, 'length': 1 },
        arrayRef.splice.call(hasObjectSpliceBug, 0, 1), hasObjectSpliceBug[0]);

    /** Detect if `arguments` object indexes are non-enumerable (Firefox < 4, IE < 9, PhantomJS, Safari < 5.1) */
    var nonEnumArgs = true;

    (function() {
        var props = [];
        function ctor() { this.x = 1; }
        ctor.prototype = { 'valueOf': 1, 'y': 1 };
        for (var prop in new ctor) { props.push(prop); }
        for (prop in arguments) { nonEnumArgs = !prop; }

        hasDontEnumBug = !/valueOf/.test(props);
        hasEnumPrototype = ctor.propertyIsEnumerable('prototype');
        iteratesOwnLast = props[0] != 'x';
    }(1));

    /** Detect if `arguments` objects are `Object` objects (all but Opera < 10.5) */
    var argsAreObjects = arguments.constructor == Object;

    /** Detect if `arguments` objects [[Class]] is unresolvable (Firefox < 4, IE < 9) */
    var noArgsClass = !isArguments(arguments);

    /**
     * Detect lack of support for accessing string characters by index:
     *
     * IE < 8 can't access characters by index and IE 8 can only access
     * characters by index on string literals.
     */
    var noCharByIndex = ('x'[0] + Object('x')[0]) != 'xx';

    /**
     * Detect if a node's [[Class]] is unresolvable (IE < 9)
     * and that the JS engine won't error when attempting to coerce an object to
     * a string without a `toString` function.
     */
    try {
        var noNodeClass = toString.call(document) == objectClass && !({ 'toString': 0 } + '');
    } catch(e) { }

    /** Used to identify object classifications that `_.clone` supports */
    var cloneableClasses = {};
    cloneableClasses[funcClass] = false;
    cloneableClasses[argsClass] = cloneableClasses[arrayClass] =
        cloneableClasses[boolClass] = cloneableClasses[dateClass] =
            cloneableClasses[numberClass] = cloneableClasses[objectClass] =
                cloneableClasses[regexpClass] = cloneableClasses[stringClass] = true;

    /** Used to lookup a built-in constructor by [[Class]] */
    var ctorByClass = {};
    ctorByClass[arrayClass] = Array;
    ctorByClass[boolClass] = Boolean;
    ctorByClass[dateClass] = Date;
    ctorByClass[objectClass] = Object;
    ctorByClass[numberClass] = Number;
    ctorByClass[regexpClass] = RegExp;
    ctorByClass[stringClass] = String;

    /** Used to determine if values are of the language type Object */
    var objectTypes = {
        'boolean': false,
        'function': true,
        'object': true,
        'number': false,
        'string': false,
        'undefined': false
    };

    /** Used to escape characters for inclusion in compiled string literals */
    var stringEscapes = {
        '\\': '\\',
        "'": "'",
        '\n': 'n',
        '\r': 'r',
        '\t': 't',
        '\u2028': 'u2028',
        '\u2029': 'u2029'
    };

    /*--------------------------------------------------------------------------*/

    /**
     * Creates a `lodash` object, that wraps the given `value`, to enable method
     * chaining.
     *
     * In addition to Lo-Dash methods, wrappers also have the following `Array` methods:
     * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`, `splice`,
     * and `unshift`
     *
     * The chainable wrapper functions are:
     * `after`, `assign`, `bind`, `bindAll`, `bindKey`, `chain`, `compact`, `compose`,
     * `concat`, `countBy`, `debounce`, `defaults`, `defer`, `delay`, `difference`,
     * `filter`, `flatten`, `forEach`, `forIn`, `forOwn`, `functions`, `groupBy`,
     * `initial`, `intersection`, `invert`, `invoke`, `keys`, `map`, `max`, `memoize`,
     * `merge`, `min`, `object`, `omit`, `once`, `pairs`, `partial`, `partialRight`,
     * `pick`, `pluck`, `push`, `range`, `reject`, `rest`, `reverse`, `shuffle`,
     * `slice`, `sort`, `sortBy`, `splice`, `tap`, `throttle`, `times`, `toArray`,
     * `union`, `uniq`, `unshift`, `values`, `where`, `without`, `wrap`, and `zip`
     *
     * The non-chainable wrapper functions are:
     * `clone`, `cloneDeep`, `contains`, `escape`, `every`, `find`, `has`, `identity`,
     * `indexOf`, `isArguments`, `isArray`, `isBoolean`, `isDate`, `isElement`, `isEmpty`,
     * `isEqual`, `isFinite`, `isFunction`, `isNaN`, `isNull`, `isNumber`, `isObject`,
     * `isPlainObject`, `isRegExp`, `isString`, `isUndefined`, `join`, `lastIndexOf`,
     * `mixin`, `noConflict`, `pop`, `random`, `reduce`, `reduceRight`, `result`,
     * `shift`, `size`, `some`, `sortedIndex`, `template`, `unescape`, and `uniqueId`
     *
     * The wrapper functions `first` and `last` return wrapped values when `n` is
     * passed, otherwise they return unwrapped values.
     *
     * @name _
     * @constructor
     * @category Chaining
     * @param {Mixed} value The value to wrap in a `lodash` instance.
     * @returns {Object} Returns a `lodash` instance.
     */

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

        return "Math.maxx";
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

}(this));