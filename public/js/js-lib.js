/*!
 * jQuery JavaScript Library v3.2.0
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-16T21:26Z
 */
( function( global, factory ) {

    "use strict";

    if ( typeof module === "object" && typeof module.exports === "object" ) {

        // For CommonJS and CommonJS-like environments where a proper `window`
        // is present, execute the factory and get jQuery.
        // For environments that do not have a `window` with a `document`
        // (such as Node.js), expose a factory as module.exports.
        // This accentuates the need for the creation of a real `window`.
        // e.g. var jQuery = require("jquery")(window);
        // See ticket #14549 for more info.
        module.exports = global.document ?
            factory( global, true ) :
            function( w ) {
                if ( !w.document ) {
                    throw new Error( "jQuery requires a window with a document" );
                }
                return factory( w );
            };
    } else {
        factory( global );
    }

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
    "use strict";

    var arr = [];

    var document = window.document;

    var getProto = Object.getPrototypeOf;

    var slice = arr.slice;

    var concat = arr.concat;

    var push = arr.push;

    var indexOf = arr.indexOf;

    var class2type = {};

    var toString = class2type.toString;

    var hasOwn = class2type.hasOwnProperty;

    var fnToString = hasOwn.toString;

    var ObjectFunctionString = fnToString.call( Object );

    var support = {};



    function DOMEval( code, doc ) {
        doc = doc || document;

        var script = doc.createElement( "script" );

        script.text = code;
        doc.head.appendChild( script ).parentNode.removeChild( script );
    }
    /* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



    var
        version = "3.2.0",

        // Define a local copy of jQuery
        jQuery = function( selector, context ) {

            // The jQuery object is actually just the init constructor 'enhanced'
            // Need init if jQuery is called (just allow error to be thrown if not included)
            return new jQuery.fn.init( selector, context );
        },

        // Support: Android <=4.0 only
        // Make sure we trim BOM and NBSP
        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

        // Matches dashed string for camelizing
        rmsPrefix = /^-ms-/,
        rdashAlpha = /-([a-z])/g,

        // Used by jQuery.camelCase as callback to replace()
        fcamelCase = function( all, letter ) {
            return letter.toUpperCase();
        };

    jQuery.fn = jQuery.prototype = {

        // The current version of jQuery being used
        jquery: version,

        constructor: jQuery,

        // The default length of a jQuery object is 0
        length: 0,

        toArray: function() {
            return slice.call( this );
        },

        // Get the Nth element in the matched element set OR
        // Get the whole matched element set as a clean array
        get: function( num ) {

            // Return all the elements in a clean array
            if ( num == null ) {
                return slice.call( this );
            }

            // Return just the one element from the set
            return num < 0 ? this[ num + this.length ] : this[ num ];
        },

        // Take an array of elements and push it onto the stack
        // (returning the new matched element set)
        pushStack: function( elems ) {

            // Build a new jQuery matched element set
            var ret = jQuery.merge( this.constructor(), elems );

            // Add the old object onto the stack (as a reference)
            ret.prevObject = this;

            // Return the newly-formed element set
            return ret;
        },

        // Execute a callback for every element in the matched set.
        each: function( callback ) {
            return jQuery.each( this, callback );
        },

        map: function( callback ) {
            return this.pushStack( jQuery.map( this, function( elem, i ) {
                return callback.call( elem, i, elem );
            } ) );
        },

        slice: function() {
            return this.pushStack( slice.apply( this, arguments ) );
        },

        first: function() {
            return this.eq( 0 );
        },

        last: function() {
            return this.eq( -1 );
        },

        eq: function( i ) {
            var len = this.length,
                j = +i + ( i < 0 ? len : 0 );
            return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
        },

        end: function() {
            return this.prevObject || this.constructor();
        },

        // For internal use only.
        // Behaves like an Array's method, not like a jQuery method.
        push: push,
        sort: arr.sort,
        splice: arr.splice
    };

    jQuery.extend = jQuery.fn.extend = function() {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[ 0 ] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if ( typeof target === "boolean" ) {
            deep = target;

            // Skip the boolean and the target
            target = arguments[ i ] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
            target = {};
        }

        // Extend jQuery itself if only one argument is passed
        if ( i === length ) {
            target = this;
            i--;
        }

        for ( ; i < length; i++ ) {

            // Only deal with non-null/undefined values
            if ( ( options = arguments[ i ] ) != null ) {

                // Extend the base object
                for ( name in options ) {
                    src = target[ name ];
                    copy = options[ name ];

                    // Prevent never-ending loop
                    if ( target === copy ) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
                        ( copyIsArray = Array.isArray( copy ) ) ) ) {

                        if ( copyIsArray ) {
                            copyIsArray = false;
                            clone = src && Array.isArray( src ) ? src : [];

                        } else {
                            clone = src && jQuery.isPlainObject( src ) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[ name ] = jQuery.extend( deep, clone, copy );

                        // Don't bring in undefined values
                    } else if ( copy !== undefined ) {
                        target[ name ] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };

    jQuery.extend( {

        // Unique for each copy of jQuery on the page
        expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

        // Assume jQuery is ready without the ready module
        isReady: true,

        error: function( msg ) {
            throw new Error( msg );
        },

        noop: function() {},

        isFunction: function( obj ) {
            return jQuery.type( obj ) === "function";
        },

        isWindow: function( obj ) {
            return obj != null && obj === obj.window;
        },

        isNumeric: function( obj ) {

            // As of jQuery 3.0, isNumeric is limited to
            // strings and numbers (primitives or objects)
            // that can be coerced to finite numbers (gh-2662)
            var type = jQuery.type( obj );
            return ( type === "number" || type === "string" ) &&

                // parseFloat NaNs numeric-cast false positives ("")
                // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
                // subtraction forces infinities to NaN
                !isNaN( obj - parseFloat( obj ) );
        },

        isPlainObject: function( obj ) {
            var proto, Ctor;

            // Detect obvious negatives
            // Use toString instead of jQuery.type to catch host objects
            if ( !obj || toString.call( obj ) !== "[object Object]" ) {
                return false;
            }

            proto = getProto( obj );

            // Objects with no prototype (e.g., `Object.create( null )`) are plain
            if ( !proto ) {
                return true;
            }

            // Objects with prototype are plain iff they were constructed by a global Object function
            Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
            return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
        },

        isEmptyObject: function( obj ) {

            /* eslint-disable no-unused-vars */
            // See https://github.com/eslint/eslint/issues/6125
            var name;

            for ( name in obj ) {
                return false;
            }
            return true;
        },

        type: function( obj ) {
            if ( obj == null ) {
                return obj + "";
            }

            // Support: Android <=2.3 only (functionish RegExp)
            return typeof obj === "object" || typeof obj === "function" ?
                class2type[ toString.call( obj ) ] || "object" :
                typeof obj;
        },

        // Evaluates a script in a global context
        globalEval: function( code ) {
            DOMEval( code );
        },

        // Convert dashed to camelCase; used by the css and data modules
        // Support: IE <=9 - 11, Edge 12 - 13
        // Microsoft forgot to hump their vendor prefix (#9572)
        camelCase: function( string ) {
            return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
        },

        each: function( obj, callback ) {
            var length, i = 0;

            if ( isArrayLike( obj ) ) {
                length = obj.length;
                for ( ; i < length; i++ ) {
                    if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
                        break;
                    }
                }
            } else {
                for ( i in obj ) {
                    if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
                        break;
                    }
                }
            }

            return obj;
        },

        // Support: Android <=4.0 only
        trim: function( text ) {
            return text == null ?
                "" :
                ( text + "" ).replace( rtrim, "" );
        },

        // results is for internal usage only
        makeArray: function( arr, results ) {
            var ret = results || [];

            if ( arr != null ) {
                if ( isArrayLike( Object( arr ) ) ) {
                    jQuery.merge( ret,
                        typeof arr === "string" ?
                            [ arr ] : arr
                    );
                } else {
                    push.call( ret, arr );
                }
            }

            return ret;
        },

        inArray: function( elem, arr, i ) {
            return arr == null ? -1 : indexOf.call( arr, elem, i );
        },

        // Support: Android <=4.0 only, PhantomJS 1 only
        // push.apply(_, arraylike) throws on ancient WebKit
        merge: function( first, second ) {
            var len = +second.length,
                j = 0,
                i = first.length;

            for ( ; j < len; j++ ) {
                first[ i++ ] = second[ j ];
            }

            first.length = i;

            return first;
        },

        grep: function( elems, callback, invert ) {
            var callbackInverse,
                matches = [],
                i = 0,
                length = elems.length,
                callbackExpect = !invert;

            // Go through the array, only saving the items
            // that pass the validator function
            for ( ; i < length; i++ ) {
                callbackInverse = !callback( elems[ i ], i );
                if ( callbackInverse !== callbackExpect ) {
                    matches.push( elems[ i ] );
                }
            }

            return matches;
        },

        // arg is for internal usage only
        map: function( elems, callback, arg ) {
            var length, value,
                i = 0,
                ret = [];

            // Go through the array, translating each of the items to their new values
            if ( isArrayLike( elems ) ) {
                length = elems.length;
                for ( ; i < length; i++ ) {
                    value = callback( elems[ i ], i, arg );

                    if ( value != null ) {
                        ret.push( value );
                    }
                }

                // Go through every key on the object,
            } else {
                for ( i in elems ) {
                    value = callback( elems[ i ], i, arg );

                    if ( value != null ) {
                        ret.push( value );
                    }
                }
            }

            // Flatten any nested arrays
            return concat.apply( [], ret );
        },

        // A global GUID counter for objects
        guid: 1,

        // Bind a function to a context, optionally partially applying any
        // arguments.
        proxy: function( fn, context ) {
            var tmp, args, proxy;

            if ( typeof context === "string" ) {
                tmp = fn[ context ];
                context = fn;
                fn = tmp;
            }

            // Quick check to determine if target is callable, in the spec
            // this throws a TypeError, but we will just return undefined.
            if ( !jQuery.isFunction( fn ) ) {
                return undefined;
            }

            // Simulated bind
            args = slice.call( arguments, 2 );
            proxy = function() {
                return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
            };

            // Set the guid of unique handler to the same of original handler, so it can be removed
            proxy.guid = fn.guid = fn.guid || jQuery.guid++;

            return proxy;
        },

        now: Date.now,

        // jQuery.support is not used in Core but other projects attach their
        // properties to it so it needs to exist.
        support: support
    } );

    if ( typeof Symbol === "function" ) {
        jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
    }

// Populate the class2type map
    jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
        function( i, name ) {
            class2type[ "[object " + name + "]" ] = name.toLowerCase();
        } );

    function isArrayLike( obj ) {

        // Support: real iOS 8.2 only (not reproducible in simulator)
        // `in` check used to prevent JIT error (gh-2145)
        // hasOwn isn't used here due to false negatives
        // regarding Nodelist length in IE
        var length = !!obj && "length" in obj && obj.length,
            type = jQuery.type( obj );

        if ( type === "function" || jQuery.isWindow( obj ) ) {
            return false;
        }

        return type === "array" || length === 0 ||
            typeof length === "number" && length > 0 && ( length - 1 ) in obj;
    }
    var Sizzle =
        /*!
         * Sizzle CSS Selector Engine v2.3.3
         * https://sizzlejs.com/
         *
         * Copyright jQuery Foundation and other contributors
         * Released under the MIT license
         * http://jquery.org/license
         *
         * Date: 2016-08-08
         */
        (function( window ) {

            var i,
                support,
                Expr,
                getText,
                isXML,
                tokenize,
                compile,
                select,
                outermostContext,
                sortInput,
                hasDuplicate,

                // Local document vars
                setDocument,
                document,
                docElem,
                documentIsHTML,
                rbuggyQSA,
                rbuggyMatches,
                matches,
                contains,

                // Instance-specific data
                expando = "sizzle" + 1 * new Date(),
                preferredDoc = window.document,
                dirruns = 0,
                done = 0,
                classCache = createCache(),
                tokenCache = createCache(),
                compilerCache = createCache(),
                sortOrder = function( a, b ) {
                    if ( a === b ) {
                        hasDuplicate = true;
                    }
                    return 0;
                },

                // Instance methods
                hasOwn = ({}).hasOwnProperty,
                arr = [],
                pop = arr.pop,
                push_native = arr.push,
                push = arr.push,
                slice = arr.slice,
                // Use a stripped-down indexOf as it's faster than native
                // https://jsperf.com/thor-indexof-vs-for/5
                indexOf = function( list, elem ) {
                    var i = 0,
                        len = list.length;
                    for ( ; i < len; i++ ) {
                        if ( list[i] === elem ) {
                            return i;
                        }
                    }
                    return -1;
                },

                booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

                // Regular expressions

                // http://www.w3.org/TR/css3-selectors/#whitespace
                whitespace = "[\\x20\\t\\r\\n\\f]",

                // http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
                identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

                // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
                attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
                    // Operator (capture 2)
                    "*([*^$|!~]?=)" + whitespace +
                    // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
                    "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
                    "*\\]",

                pseudos = ":(" + identifier + ")(?:\\((" +
                    // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
                    // 1. quoted (capture 3; capture 4 or capture 5)
                    "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
                    // 2. simple (capture 6)
                    "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
                    // 3. anything else (capture 2)
                    ".*" +
                    ")\\)|)",

                // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
                rwhitespace = new RegExp( whitespace + "+", "g" ),
                rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

                rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
                rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

                rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

                rpseudo = new RegExp( pseudos ),
                ridentifier = new RegExp( "^" + identifier + "$" ),

                matchExpr = {
                    "ID": new RegExp( "^#(" + identifier + ")" ),
                    "CLASS": new RegExp( "^\\.(" + identifier + ")" ),
                    "TAG": new RegExp( "^(" + identifier + "|[*])" ),
                    "ATTR": new RegExp( "^" + attributes ),
                    "PSEUDO": new RegExp( "^" + pseudos ),
                    "CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
                        "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
                        "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
                    "bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
                    // For use in libraries implementing .is()
                    // We use this for POS matching in `select`
                    "needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                        whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
                },

                rinputs = /^(?:input|select|textarea|button)$/i,
                rheader = /^h\d$/i,

                rnative = /^[^{]+\{\s*\[native \w/,

                // Easily-parseable/retrievable ID or TAG or CLASS selectors
                rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

                rsibling = /[+~]/,

                // CSS escapes
                // http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
                runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
                funescape = function( _, escaped, escapedWhitespace ) {
                    var high = "0x" + escaped - 0x10000;
                    // NaN means non-codepoint
                    // Support: Firefox<24
                    // Workaround erroneous numeric interpretation of +"0x"
                    return high !== high || escapedWhitespace ?
                        escaped :
                        high < 0 ?
                            // BMP codepoint
                            String.fromCharCode( high + 0x10000 ) :
                            // Supplemental Plane codepoint (surrogate pair)
                            String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
                },

                // CSS string/identifier serialization
                // https://drafts.csswg.org/cssom/#common-serializing-idioms
                rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                fcssescape = function( ch, asCodePoint ) {
                    if ( asCodePoint ) {

                        // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
                        if ( ch === "\0" ) {
                            return "\uFFFD";
                        }

                        // Control characters and (dependent upon position) numbers get escaped as code points
                        return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
                    }

                    // Other potentially-special ASCII characters get backslash-escaped
                    return "\\" + ch;
                },

                // Used for iframes
                // See setDocument()
                // Removing the function wrapper causes a "Permission Denied"
                // error in IE
                unloadHandler = function() {
                    setDocument();
                },

                disabledAncestor = addCombinator(
                    function( elem ) {
                        return elem.disabled === true && ("form" in elem || "label" in elem);
                    },
                    { dir: "parentNode", next: "legend" }
                );

// Optimize for push.apply( _, NodeList )
            try {
                push.apply(
                    (arr = slice.call( preferredDoc.childNodes )),
                    preferredDoc.childNodes
                );
                // Support: Android<4.0
                // Detect silently failing push.apply
                arr[ preferredDoc.childNodes.length ].nodeType;
            } catch ( e ) {
                push = { apply: arr.length ?

                    // Leverage slice if possible
                    function( target, els ) {
                        push_native.apply( target, slice.call(els) );
                    } :

                    // Support: IE<9
                    // Otherwise append directly
                    function( target, els ) {
                        var j = target.length,
                            i = 0;
                        // Can't trust NodeList.length
                        while ( (target[j++] = els[i++]) ) {}
                        target.length = j - 1;
                    }
                };
            }

            function Sizzle( selector, context, results, seed ) {
                var m, i, elem, nid, match, groups, newSelector,
                    newContext = context && context.ownerDocument,

                    // nodeType defaults to 9, since context defaults to document
                    nodeType = context ? context.nodeType : 9;

                results = results || [];

                // Return early from calls with invalid selector or context
                if ( typeof selector !== "string" || !selector ||
                    nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

                    return results;
                }

                // Try to shortcut find operations (as opposed to filters) in HTML documents
                if ( !seed ) {

                    if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
                        setDocument( context );
                    }
                    context = context || document;

                    if ( documentIsHTML ) {

                        // If the selector is sufficiently simple, try using a "get*By*" DOM method
                        // (excepting DocumentFragment context, where the methods don't exist)
                        if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

                            // ID selector
                            if ( (m = match[1]) ) {

                                // Document context
                                if ( nodeType === 9 ) {
                                    if ( (elem = context.getElementById( m )) ) {

                                        // Support: IE, Opera, Webkit
                                        // TODO: identify versions
                                        // getElementById can match elements by name instead of ID
                                        if ( elem.id === m ) {
                                            results.push( elem );
                                            return results;
                                        }
                                    } else {
                                        return results;
                                    }

                                    // Element context
                                } else {

                                    // Support: IE, Opera, Webkit
                                    // TODO: identify versions
                                    // getElementById can match elements by name instead of ID
                                    if ( newContext && (elem = newContext.getElementById( m )) &&
                                        contains( context, elem ) &&
                                        elem.id === m ) {

                                        results.push( elem );
                                        return results;
                                    }
                                }

                                // Type selector
                            } else if ( match[2] ) {
                                push.apply( results, context.getElementsByTagName( selector ) );
                                return results;

                                // Class selector
                            } else if ( (m = match[3]) && support.getElementsByClassName &&
                                context.getElementsByClassName ) {

                                push.apply( results, context.getElementsByClassName( m ) );
                                return results;
                            }
                        }

                        // Take advantage of querySelectorAll
                        if ( support.qsa &&
                            !compilerCache[ selector + " " ] &&
                            (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

                            if ( nodeType !== 1 ) {
                                newContext = context;
                                newSelector = selector;

                                // qSA looks outside Element context, which is not what we want
                                // Thanks to Andrew Dupont for this workaround technique
                                // Support: IE <=8
                                // Exclude object elements
                            } else if ( context.nodeName.toLowerCase() !== "object" ) {

                                // Capture the context ID, setting it first if necessary
                                if ( (nid = context.getAttribute( "id" )) ) {
                                    nid = nid.replace( rcssescape, fcssescape );
                                } else {
                                    context.setAttribute( "id", (nid = expando) );
                                }

                                // Prefix every selector in the list
                                groups = tokenize( selector );
                                i = groups.length;
                                while ( i-- ) {
                                    groups[i] = "#" + nid + " " + toSelector( groups[i] );
                                }
                                newSelector = groups.join( "," );

                                // Expand context for sibling selectors
                                newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
                                    context;
                            }

                            if ( newSelector ) {
                                try {
                                    push.apply( results,
                                        newContext.querySelectorAll( newSelector )
                                    );
                                    return results;
                                } catch ( qsaError ) {
                                } finally {
                                    if ( nid === expando ) {
                                        context.removeAttribute( "id" );
                                    }
                                }
                            }
                        }
                    }
                }

                // All others
                return select( selector.replace( rtrim, "$1" ), context, results, seed );
            }

            /**
             * Create key-value caches of limited size
             * @returns {function(string, object)} Returns the Object data after storing it on itself with
             *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
             *	deleting the oldest entry
             */
            function createCache() {
                var keys = [];

                function cache( key, value ) {
                    // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
                    if ( keys.push( key + " " ) > Expr.cacheLength ) {
                        // Only keep the most recent entries
                        delete cache[ keys.shift() ];
                    }
                    return (cache[ key + " " ] = value);
                }
                return cache;
            }

            /**
             * Mark a function for special use by Sizzle
             * @param {Function} fn The function to mark
             */
            function markFunction( fn ) {
                fn[ expando ] = true;
                return fn;
            }

            /**
             * Support testing using an element
             * @param {Function} fn Passed the created element and returns a boolean result
             */
            function assert( fn ) {
                var el = document.createElement("fieldset");

                try {
                    return !!fn( el );
                } catch (e) {
                    return false;
                } finally {
                    // Remove from its parent by default
                    if ( el.parentNode ) {
                        el.parentNode.removeChild( el );
                    }
                    // release memory in IE
                    el = null;
                }
            }

            /**
             * Adds the same handler for all of the specified attrs
             * @param {String} attrs Pipe-separated list of attributes
             * @param {Function} handler The method that will be applied
             */
            function addHandle( attrs, handler ) {
                var arr = attrs.split("|"),
                    i = arr.length;

                while ( i-- ) {
                    Expr.attrHandle[ arr[i] ] = handler;
                }
            }

            /**
             * Checks document order of two siblings
             * @param {Element} a
             * @param {Element} b
             * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
             */
            function siblingCheck( a, b ) {
                var cur = b && a,
                    diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
                        a.sourceIndex - b.sourceIndex;

                // Use IE sourceIndex if available on both nodes
                if ( diff ) {
                    return diff;
                }

                // Check if b follows a
                if ( cur ) {
                    while ( (cur = cur.nextSibling) ) {
                        if ( cur === b ) {
                            return -1;
                        }
                    }
                }

                return a ? 1 : -1;
            }

            /**
             * Returns a function to use in pseudos for input types
             * @param {String} type
             */
            function createInputPseudo( type ) {
                return function( elem ) {
                    var name = elem.nodeName.toLowerCase();
                    return name === "input" && elem.type === type;
                };
            }

            /**
             * Returns a function to use in pseudos for buttons
             * @param {String} type
             */
            function createButtonPseudo( type ) {
                return function( elem ) {
                    var name = elem.nodeName.toLowerCase();
                    return (name === "input" || name === "button") && elem.type === type;
                };
            }

            /**
             * Returns a function to use in pseudos for :enabled/:disabled
             * @param {Boolean} disabled true for :disabled; false for :enabled
             */
            function createDisabledPseudo( disabled ) {

                // Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
                return function( elem ) {

                    // Only certain elements can match :enabled or :disabled
                    // https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
                    // https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
                    if ( "form" in elem ) {

                        // Check for inherited disabledness on relevant non-disabled elements:
                        // * listed form-associated elements in a disabled fieldset
                        //   https://html.spec.whatwg.org/multipage/forms.html#category-listed
                        //   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
                        // * option elements in a disabled optgroup
                        //   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
                        // All such elements have a "form" property.
                        if ( elem.parentNode && elem.disabled === false ) {

                            // Option elements defer to a parent optgroup if present
                            if ( "label" in elem ) {
                                if ( "label" in elem.parentNode ) {
                                    return elem.parentNode.disabled === disabled;
                                } else {
                                    return elem.disabled === disabled;
                                }
                            }

                            // Support: IE 6 - 11
                            // Use the isDisabled shortcut property to check for disabled fieldset ancestors
                            return elem.isDisabled === disabled ||

                                // Where there is no isDisabled, check manually
                                /* jshint -W018 */
                                elem.isDisabled !== !disabled &&
                                disabledAncestor( elem ) === disabled;
                        }

                        return elem.disabled === disabled;

                        // Try to winnow out elements that can't be disabled before trusting the disabled property.
                        // Some victims get caught in our net (label, legend, menu, track), but it shouldn't
                        // even exist on them, let alone have a boolean value.
                    } else if ( "label" in elem ) {
                        return elem.disabled === disabled;
                    }

                    // Remaining elements are neither :enabled nor :disabled
                    return false;
                };
            }

            /**
             * Returns a function to use in pseudos for positionals
             * @param {Function} fn
             */
            function createPositionalPseudo( fn ) {
                return markFunction(function( argument ) {
                    argument = +argument;
                    return markFunction(function( seed, matches ) {
                        var j,
                            matchIndexes = fn( [], seed.length, argument ),
                            i = matchIndexes.length;

                        // Match elements found at the specified indexes
                        while ( i-- ) {
                            if ( seed[ (j = matchIndexes[i]) ] ) {
                                seed[j] = !(matches[j] = seed[j]);
                            }
                        }
                    });
                });
            }

            /**
             * Checks a node for validity as a Sizzle context
             * @param {Element|Object=} context
             * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
             */
            function testContext( context ) {
                return context && typeof context.getElementsByTagName !== "undefined" && context;
            }

// Expose support vars for convenience
            support = Sizzle.support = {};

            /**
             * Detects XML nodes
             * @param {Element|Object} elem An element or a document
             * @returns {Boolean} True iff elem is a non-HTML XML node
             */
            isXML = Sizzle.isXML = function( elem ) {
                // documentElement is verified for cases where it doesn't yet exist
                // (such as loading iframes in IE - #4833)
                var documentElement = elem && (elem.ownerDocument || elem).documentElement;
                return documentElement ? documentElement.nodeName !== "HTML" : false;
            };

            /**
             * Sets document-related variables once based on the current document
             * @param {Element|Object} [doc] An element or document object to use to set the document
             * @returns {Object} Returns the current document
             */
            setDocument = Sizzle.setDocument = function( node ) {
                var hasCompare, subWindow,
                    doc = node ? node.ownerDocument || node : preferredDoc;

                // Return early if doc is invalid or already selected
                if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
                    return document;
                }

                // Update global variables
                document = doc;
                docElem = document.documentElement;
                documentIsHTML = !isXML( document );

                // Support: IE 9-11, Edge
                // Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
                if ( preferredDoc !== document &&
                    (subWindow = document.defaultView) && subWindow.top !== subWindow ) {

                    // Support: IE 11, Edge
                    if ( subWindow.addEventListener ) {
                        subWindow.addEventListener( "unload", unloadHandler, false );

                        // Support: IE 9 - 10 only
                    } else if ( subWindow.attachEvent ) {
                        subWindow.attachEvent( "onunload", unloadHandler );
                    }
                }

                /* Attributes
                 ---------------------------------------------------------------------- */

                // Support: IE<8
                // Verify that getAttribute really returns attributes and not properties
                // (excepting IE8 booleans)
                support.attributes = assert(function( el ) {
                    el.className = "i";
                    return !el.getAttribute("className");
                });

                /* getElement(s)By*
                 ---------------------------------------------------------------------- */

                // Check if getElementsByTagName("*") returns only elements
                support.getElementsByTagName = assert(function( el ) {
                    el.appendChild( document.createComment("") );
                    return !el.getElementsByTagName("*").length;
                });

                // Support: IE<9
                support.getElementsByClassName = rnative.test( document.getElementsByClassName );

                // Support: IE<10
                // Check if getElementById returns elements by name
                // The broken getElementById methods don't pick up programmatically-set names,
                // so use a roundabout getElementsByName test
                support.getById = assert(function( el ) {
                    docElem.appendChild( el ).id = expando;
                    return !document.getElementsByName || !document.getElementsByName( expando ).length;
                });

                // ID filter and find
                if ( support.getById ) {
                    Expr.filter["ID"] = function( id ) {
                        var attrId = id.replace( runescape, funescape );
                        return function( elem ) {
                            return elem.getAttribute("id") === attrId;
                        };
                    };
                    Expr.find["ID"] = function( id, context ) {
                        if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
                            var elem = context.getElementById( id );
                            return elem ? [ elem ] : [];
                        }
                    };
                } else {
                    Expr.filter["ID"] =  function( id ) {
                        var attrId = id.replace( runescape, funescape );
                        return function( elem ) {
                            var node = typeof elem.getAttributeNode !== "undefined" &&
                                elem.getAttributeNode("id");
                            return node && node.value === attrId;
                        };
                    };

                    // Support: IE 6 - 7 only
                    // getElementById is not reliable as a find shortcut
                    Expr.find["ID"] = function( id, context ) {
                        if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
                            var node, i, elems,
                                elem = context.getElementById( id );

                            if ( elem ) {

                                // Verify the id attribute
                                node = elem.getAttributeNode("id");
                                if ( node && node.value === id ) {
                                    return [ elem ];
                                }

                                // Fall back on getElementsByName
                                elems = context.getElementsByName( id );
                                i = 0;
                                while ( (elem = elems[i++]) ) {
                                    node = elem.getAttributeNode("id");
                                    if ( node && node.value === id ) {
                                        return [ elem ];
                                    }
                                }
                            }

                            return [];
                        }
                    };
                }

                // Tag
                Expr.find["TAG"] = support.getElementsByTagName ?
                    function( tag, context ) {
                        if ( typeof context.getElementsByTagName !== "undefined" ) {
                            return context.getElementsByTagName( tag );

                            // DocumentFragment nodes don't have gEBTN
                        } else if ( support.qsa ) {
                            return context.querySelectorAll( tag );
                        }
                    } :

                    function( tag, context ) {
                        var elem,
                            tmp = [],
                            i = 0,
                            // By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
                            results = context.getElementsByTagName( tag );

                        // Filter out possible comments
                        if ( tag === "*" ) {
                            while ( (elem = results[i++]) ) {
                                if ( elem.nodeType === 1 ) {
                                    tmp.push( elem );
                                }
                            }

                            return tmp;
                        }
                        return results;
                    };

                // Class
                Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
                        if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
                            return context.getElementsByClassName( className );
                        }
                    };

                /* QSA/matchesSelector
                 ---------------------------------------------------------------------- */

                // QSA and matchesSelector support

                // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
                rbuggyMatches = [];

                // qSa(:focus) reports false when true (Chrome 21)
                // We allow this because of a bug in IE8/9 that throws an error
                // whenever `document.activeElement` is accessed on an iframe
                // So, we allow :focus to pass through QSA all the time to avoid the IE error
                // See https://bugs.jquery.com/ticket/13378
                rbuggyQSA = [];

                if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
                    // Build QSA regex
                    // Regex strategy adopted from Diego Perini
                    assert(function( el ) {
                        // Select is set to empty string on purpose
                        // This is to test IE's treatment of not explicitly
                        // setting a boolean content attribute,
                        // since its presence should be enough
                        // https://bugs.jquery.com/ticket/12359
                        docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
                            "<select id='" + expando + "-\r\\' msallowcapture=''>" +
                            "<option selected=''></option></select>";

                        // Support: IE8, Opera 11-12.16
                        // Nothing should be selected when empty strings follow ^= or $= or *=
                        // The test attribute must be unknown in Opera but "safe" for WinRT
                        // https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
                        if ( el.querySelectorAll("[msallowcapture^='']").length ) {
                            rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
                        }

                        // Support: IE8
                        // Boolean attributes and "value" are not treated correctly
                        if ( !el.querySelectorAll("[selected]").length ) {
                            rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
                        }

                        // Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
                        if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
                            rbuggyQSA.push("~=");
                        }

                        // Webkit/Opera - :checked should return selected option elements
                        // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                        // IE8 throws error here and will not see later tests
                        if ( !el.querySelectorAll(":checked").length ) {
                            rbuggyQSA.push(":checked");
                        }

                        // Support: Safari 8+, iOS 8+
                        // https://bugs.webkit.org/show_bug.cgi?id=136851
                        // In-page `selector#id sibling-combinator selector` fails
                        if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
                            rbuggyQSA.push(".#.+[+~]");
                        }
                    });

                    assert(function( el ) {
                        el.innerHTML = "<a href='' disabled='disabled'></a>" +
                            "<select disabled='disabled'><option/></select>";

                        // Support: Windows 8 Native Apps
                        // The type and name attributes are restricted during .innerHTML assignment
                        var input = document.createElement("input");
                        input.setAttribute( "type", "hidden" );
                        el.appendChild( input ).setAttribute( "name", "D" );

                        // Support: IE8
                        // Enforce case-sensitivity of name attribute
                        if ( el.querySelectorAll("[name=d]").length ) {
                            rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
                        }

                        // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
                        // IE8 throws error here and will not see later tests
                        if ( el.querySelectorAll(":enabled").length !== 2 ) {
                            rbuggyQSA.push( ":enabled", ":disabled" );
                        }

                        // Support: IE9-11+
                        // IE's :disabled selector does not pick up the children of disabled fieldsets
                        docElem.appendChild( el ).disabled = true;
                        if ( el.querySelectorAll(":disabled").length !== 2 ) {
                            rbuggyQSA.push( ":enabled", ":disabled" );
                        }

                        // Opera 10-11 does not throw on post-comma invalid pseudos
                        el.querySelectorAll("*,:x");
                        rbuggyQSA.push(",.*:");
                    });
                }

                if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
                        docElem.webkitMatchesSelector ||
                        docElem.mozMatchesSelector ||
                        docElem.oMatchesSelector ||
                        docElem.msMatchesSelector) )) ) {

                    assert(function( el ) {
                        // Check to see if it's possible to do matchesSelector
                        // on a disconnected node (IE 9)
                        support.disconnectedMatch = matches.call( el, "*" );

                        // This should fail with an exception
                        // Gecko does not error, returns false instead
                        matches.call( el, "[s!='']:x" );
                        rbuggyMatches.push( "!=", pseudos );
                    });
                }

                rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
                rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

                /* Contains
                 ---------------------------------------------------------------------- */
                hasCompare = rnative.test( docElem.compareDocumentPosition );

                // Element contains another
                // Purposefully self-exclusive
                // As in, an element does not contain itself
                contains = hasCompare || rnative.test( docElem.contains ) ?
                    function( a, b ) {
                        var adown = a.nodeType === 9 ? a.documentElement : a,
                            bup = b && b.parentNode;
                        return a === bup || !!( bup && bup.nodeType === 1 && (
                                adown.contains ?
                                    adown.contains( bup ) :
                                    a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
                            ));
                    } :
                    function( a, b ) {
                        if ( b ) {
                            while ( (b = b.parentNode) ) {
                                if ( b === a ) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    };

                /* Sorting
                 ---------------------------------------------------------------------- */

                // Document order sorting
                sortOrder = hasCompare ?
                    function( a, b ) {

                        // Flag for duplicate removal
                        if ( a === b ) {
                            hasDuplicate = true;
                            return 0;
                        }

                        // Sort on method existence if only one input has compareDocumentPosition
                        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                        if ( compare ) {
                            return compare;
                        }

                        // Calculate position if both inputs belong to the same document
                        compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
                            a.compareDocumentPosition( b ) :

                            // Otherwise we know they are disconnected
                            1;

                        // Disconnected nodes
                        if ( compare & 1 ||
                            (!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

                            // Choose the first element that is related to our preferred document
                            if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
                                return -1;
                            }
                            if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
                                return 1;
                            }

                            // Maintain original order
                            return sortInput ?
                                ( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
                                0;
                        }

                        return compare & 4 ? -1 : 1;
                    } :
                    function( a, b ) {
                        // Exit early if the nodes are identical
                        if ( a === b ) {
                            hasDuplicate = true;
                            return 0;
                        }

                        var cur,
                            i = 0,
                            aup = a.parentNode,
                            bup = b.parentNode,
                            ap = [ a ],
                            bp = [ b ];

                        // Parentless nodes are either documents or disconnected
                        if ( !aup || !bup ) {
                            return a === document ? -1 :
                                b === document ? 1 :
                                    aup ? -1 :
                                        bup ? 1 :
                                            sortInput ?
                                                ( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
                                                0;

                            // If the nodes are siblings, we can do a quick check
                        } else if ( aup === bup ) {
                            return siblingCheck( a, b );
                        }

                        // Otherwise we need full lists of their ancestors for comparison
                        cur = a;
                        while ( (cur = cur.parentNode) ) {
                            ap.unshift( cur );
                        }
                        cur = b;
                        while ( (cur = cur.parentNode) ) {
                            bp.unshift( cur );
                        }

                        // Walk down the tree looking for a discrepancy
                        while ( ap[i] === bp[i] ) {
                            i++;
                        }

                        return i ?
                            // Do a sibling check if the nodes have a common ancestor
                            siblingCheck( ap[i], bp[i] ) :

                            // Otherwise nodes in our document sort first
                            ap[i] === preferredDoc ? -1 :
                                bp[i] === preferredDoc ? 1 :
                                    0;
                    };

                return document;
            };

            Sizzle.matches = function( expr, elements ) {
                return Sizzle( expr, null, null, elements );
            };

            Sizzle.matchesSelector = function( elem, expr ) {
                // Set document vars if needed
                if ( ( elem.ownerDocument || elem ) !== document ) {
                    setDocument( elem );
                }

                // Make sure that attribute selectors are quoted
                expr = expr.replace( rattributeQuotes, "='$1']" );

                if ( support.matchesSelector && documentIsHTML &&
                    !compilerCache[ expr + " " ] &&
                    ( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
                    ( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

                    try {
                        var ret = matches.call( elem, expr );

                        // IE 9's matchesSelector returns false on disconnected nodes
                        if ( ret || support.disconnectedMatch ||
                            // As well, disconnected nodes are said to be in a document
                            // fragment in IE 9
                            elem.document && elem.document.nodeType !== 11 ) {
                            return ret;
                        }
                    } catch (e) {}
                }

                return Sizzle( expr, document, null, [ elem ] ).length > 0;
            };

            Sizzle.contains = function( context, elem ) {
                // Set document vars if needed
                if ( ( context.ownerDocument || context ) !== document ) {
                    setDocument( context );
                }
                return contains( context, elem );
            };

            Sizzle.attr = function( elem, name ) {
                // Set document vars if needed
                if ( ( elem.ownerDocument || elem ) !== document ) {
                    setDocument( elem );
                }

                var fn = Expr.attrHandle[ name.toLowerCase() ],
                    // Don't get fooled by Object.prototype properties (jQuery #13807)
                    val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
                        fn( elem, name, !documentIsHTML ) :
                        undefined;

                return val !== undefined ?
                    val :
                    support.attributes || !documentIsHTML ?
                        elem.getAttribute( name ) :
                        (val = elem.getAttributeNode(name)) && val.specified ?
                            val.value :
                            null;
            };

            Sizzle.escape = function( sel ) {
                return (sel + "").replace( rcssescape, fcssescape );
            };

            Sizzle.error = function( msg ) {
                throw new Error( "Syntax error, unrecognized expression: " + msg );
            };

            /**
             * Document sorting and removing duplicates
             * @param {ArrayLike} results
             */
            Sizzle.uniqueSort = function( results ) {
                var elem,
                    duplicates = [],
                    j = 0,
                    i = 0;

                // Unless we *know* we can detect duplicates, assume their presence
                hasDuplicate = !support.detectDuplicates;
                sortInput = !support.sortStable && results.slice( 0 );
                results.sort( sortOrder );

                if ( hasDuplicate ) {
                    while ( (elem = results[i++]) ) {
                        if ( elem === results[ i ] ) {
                            j = duplicates.push( i );
                        }
                    }
                    while ( j-- ) {
                        results.splice( duplicates[ j ], 1 );
                    }
                }

                // Clear input after sorting to release objects
                // See https://github.com/jquery/sizzle/pull/225
                sortInput = null;

                return results;
            };

            /**
             * Utility function for retrieving the text value of an array of DOM nodes
             * @param {Array|Element} elem
             */
            getText = Sizzle.getText = function( elem ) {
                var node,
                    ret = "",
                    i = 0,
                    nodeType = elem.nodeType;

                if ( !nodeType ) {
                    // If no nodeType, this is expected to be an array
                    while ( (node = elem[i++]) ) {
                        // Do not traverse comment nodes
                        ret += getText( node );
                    }
                } else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
                    // Use textContent for elements
                    // innerText usage removed for consistency of new lines (jQuery #11153)
                    if ( typeof elem.textContent === "string" ) {
                        return elem.textContent;
                    } else {
                        // Traverse its children
                        for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
                            ret += getText( elem );
                        }
                    }
                } else if ( nodeType === 3 || nodeType === 4 ) {
                    return elem.nodeValue;
                }
                // Do not include comment or processing instruction nodes

                return ret;
            };

            Expr = Sizzle.selectors = {

                // Can be adjusted by the user
                cacheLength: 50,

                createPseudo: markFunction,

                match: matchExpr,

                attrHandle: {},

                find: {},

                relative: {
                    ">": { dir: "parentNode", first: true },
                    " ": { dir: "parentNode" },
                    "+": { dir: "previousSibling", first: true },
                    "~": { dir: "previousSibling" }
                },

                preFilter: {
                    "ATTR": function( match ) {
                        match[1] = match[1].replace( runescape, funescape );

                        // Move the given value to match[3] whether quoted or unquoted
                        match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

                        if ( match[2] === "~=" ) {
                            match[3] = " " + match[3] + " ";
                        }

                        return match.slice( 0, 4 );
                    },

                    "CHILD": function( match ) {
                        /* matches from matchExpr["CHILD"]
                         1 type (only|nth|...)
                         2 what (child|of-type)
                         3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
                         4 xn-component of xn+y argument ([+-]?\d*n|)
                         5 sign of xn-component
                         6 x of xn-component
                         7 sign of y-component
                         8 y of y-component
                         */
                        match[1] = match[1].toLowerCase();

                        if ( match[1].slice( 0, 3 ) === "nth" ) {
                            // nth-* requires argument
                            if ( !match[3] ) {
                                Sizzle.error( match[0] );
                            }

                            // numeric x and y parameters for Expr.filter.CHILD
                            // remember that false/true cast respectively to 0/1
                            match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
                            match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

                            // other types prohibit arguments
                        } else if ( match[3] ) {
                            Sizzle.error( match[0] );
                        }

                        return match;
                    },

                    "PSEUDO": function( match ) {
                        var excess,
                            unquoted = !match[6] && match[2];

                        if ( matchExpr["CHILD"].test( match[0] ) ) {
                            return null;
                        }

                        // Accept quoted arguments as-is
                        if ( match[3] ) {
                            match[2] = match[4] || match[5] || "";

                            // Strip excess characters from unquoted arguments
                        } else if ( unquoted && rpseudo.test( unquoted ) &&
                            // Get excess from tokenize (recursively)
                            (excess = tokenize( unquoted, true )) &&
                            // advance to the next closing parenthesis
                            (excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

                            // excess is a negative index
                            match[0] = match[0].slice( 0, excess );
                            match[2] = unquoted.slice( 0, excess );
                        }

                        // Return only captures needed by the pseudo filter method (type and argument)
                        return match.slice( 0, 3 );
                    }
                },

                filter: {

                    "TAG": function( nodeNameSelector ) {
                        var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
                        return nodeNameSelector === "*" ?
                            function() { return true; } :
                            function( elem ) {
                                return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                            };
                    },

                    "CLASS": function( className ) {
                        var pattern = classCache[ className + " " ];

                        return pattern ||
                            (pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
                            classCache( className, function( elem ) {
                                return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
                            });
                    },

                    "ATTR": function( name, operator, check ) {
                        return function( elem ) {
                            var result = Sizzle.attr( elem, name );

                            if ( result == null ) {
                                return operator === "!=";
                            }
                            if ( !operator ) {
                                return true;
                            }

                            result += "";

                            return operator === "=" ? result === check :
                                operator === "!=" ? result !== check :
                                    operator === "^=" ? check && result.indexOf( check ) === 0 :
                                        operator === "*=" ? check && result.indexOf( check ) > -1 :
                                            operator === "$=" ? check && result.slice( -check.length ) === check :
                                                operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
                                                    operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
                                                        false;
                        };
                    },

                    "CHILD": function( type, what, argument, first, last ) {
                        var simple = type.slice( 0, 3 ) !== "nth",
                            forward = type.slice( -4 ) !== "last",
                            ofType = what === "of-type";

                        return first === 1 && last === 0 ?

                            // Shortcut for :nth-*(n)
                            function( elem ) {
                                return !!elem.parentNode;
                            } :

                            function( elem, context, xml ) {
                                var cache, uniqueCache, outerCache, node, nodeIndex, start,
                                    dir = simple !== forward ? "nextSibling" : "previousSibling",
                                    parent = elem.parentNode,
                                    name = ofType && elem.nodeName.toLowerCase(),
                                    useCache = !xml && !ofType,
                                    diff = false;

                                if ( parent ) {

                                    // :(first|last|only)-(child|of-type)
                                    if ( simple ) {
                                        while ( dir ) {
                                            node = elem;
                                            while ( (node = node[ dir ]) ) {
                                                if ( ofType ?
                                                        node.nodeName.toLowerCase() === name :
                                                        node.nodeType === 1 ) {

                                                    return false;
                                                }
                                            }
                                            // Reverse direction for :only-* (if we haven't yet done so)
                                            start = dir = type === "only" && !start && "nextSibling";
                                        }
                                        return true;
                                    }

                                    start = [ forward ? parent.firstChild : parent.lastChild ];

                                    // non-xml :nth-child(...) stores cache data on `parent`
                                    if ( forward && useCache ) {

                                        // Seek `elem` from a previously-cached index

                                        // ...in a gzip-friendly way
                                        node = parent;
                                        outerCache = node[ expando ] || (node[ expando ] = {});

                                        // Support: IE <9 only
                                        // Defend against cloned attroperties (jQuery gh-1709)
                                        uniqueCache = outerCache[ node.uniqueID ] ||
                                            (outerCache[ node.uniqueID ] = {});

                                        cache = uniqueCache[ type ] || [];
                                        nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
                                        diff = nodeIndex && cache[ 2 ];
                                        node = nodeIndex && parent.childNodes[ nodeIndex ];

                                        while ( (node = ++nodeIndex && node && node[ dir ] ||

                                            // Fallback to seeking `elem` from the start
                                            (diff = nodeIndex = 0) || start.pop()) ) {

                                            // When found, cache indexes on `parent` and break
                                            if ( node.nodeType === 1 && ++diff && node === elem ) {
                                                uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
                                                break;
                                            }
                                        }

                                    } else {
                                        // Use previously-cached element index if available
                                        if ( useCache ) {
                                            // ...in a gzip-friendly way
                                            node = elem;
                                            outerCache = node[ expando ] || (node[ expando ] = {});

                                            // Support: IE <9 only
                                            // Defend against cloned attroperties (jQuery gh-1709)
                                            uniqueCache = outerCache[ node.uniqueID ] ||
                                                (outerCache[ node.uniqueID ] = {});

                                            cache = uniqueCache[ type ] || [];
                                            nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
                                            diff = nodeIndex;
                                        }

                                        // xml :nth-child(...)
                                        // or :nth-last-child(...) or :nth(-last)?-of-type(...)
                                        if ( diff === false ) {
                                            // Use the same loop as above to seek `elem` from the start
                                            while ( (node = ++nodeIndex && node && node[ dir ] ||
                                                (diff = nodeIndex = 0) || start.pop()) ) {

                                                if ( ( ofType ?
                                                        node.nodeName.toLowerCase() === name :
                                                        node.nodeType === 1 ) &&
                                                    ++diff ) {

                                                    // Cache the index of each encountered element
                                                    if ( useCache ) {
                                                        outerCache = node[ expando ] || (node[ expando ] = {});

                                                        // Support: IE <9 only
                                                        // Defend against cloned attroperties (jQuery gh-1709)
                                                        uniqueCache = outerCache[ node.uniqueID ] ||
                                                            (outerCache[ node.uniqueID ] = {});

                                                        uniqueCache[ type ] = [ dirruns, diff ];
                                                    }

                                                    if ( node === elem ) {
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                    }

                                    // Incorporate the offset, then check against cycle size
                                    diff -= last;
                                    return diff === first || ( diff % first === 0 && diff / first >= 0 );
                                }
                            };
                    },

                    "PSEUDO": function( pseudo, argument ) {
                        // pseudo-class names are case-insensitive
                        // http://www.w3.org/TR/selectors/#pseudo-classes
                        // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
                        // Remember that setFilters inherits from pseudos
                        var args,
                            fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
                                Sizzle.error( "unsupported pseudo: " + pseudo );

                        // The user may use createPseudo to indicate that
                        // arguments are needed to create the filter function
                        // just as Sizzle does
                        if ( fn[ expando ] ) {
                            return fn( argument );
                        }

                        // But maintain support for old signatures
                        if ( fn.length > 1 ) {
                            args = [ pseudo, pseudo, "", argument ];
                            return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
                                markFunction(function( seed, matches ) {
                                    var idx,
                                        matched = fn( seed, argument ),
                                        i = matched.length;
                                    while ( i-- ) {
                                        idx = indexOf( seed, matched[i] );
                                        seed[ idx ] = !( matches[ idx ] = matched[i] );
                                    }
                                }) :
                                function( elem ) {
                                    return fn( elem, 0, args );
                                };
                        }

                        return fn;
                    }
                },

                pseudos: {
                    // Potentially complex pseudos
                    "not": markFunction(function( selector ) {
                        // Trim the selector passed to compile
                        // to avoid treating leading and trailing
                        // spaces as combinators
                        var input = [],
                            results = [],
                            matcher = compile( selector.replace( rtrim, "$1" ) );

                        return matcher[ expando ] ?
                            markFunction(function( seed, matches, context, xml ) {
                                var elem,
                                    unmatched = matcher( seed, null, xml, [] ),
                                    i = seed.length;

                                // Match elements unmatched by `matcher`
                                while ( i-- ) {
                                    if ( (elem = unmatched[i]) ) {
                                        seed[i] = !(matches[i] = elem);
                                    }
                                }
                            }) :
                            function( elem, context, xml ) {
                                input[0] = elem;
                                matcher( input, null, xml, results );
                                // Don't keep the element (issue #299)
                                input[0] = null;
                                return !results.pop();
                            };
                    }),

                    "has": markFunction(function( selector ) {
                        return function( elem ) {
                            return Sizzle( selector, elem ).length > 0;
                        };
                    }),

                    "contains": markFunction(function( text ) {
                        text = text.replace( runescape, funescape );
                        return function( elem ) {
                            return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
                        };
                    }),

                    // "Whether an element is represented by a :lang() selector
                    // is based solely on the element's language value
                    // being equal to the identifier C,
                    // or beginning with the identifier C immediately followed by "-".
                    // The matching of C against the element's language value is performed case-insensitively.
                    // The identifier C does not have to be a valid language name."
                    // http://www.w3.org/TR/selectors/#lang-pseudo
                    "lang": markFunction( function( lang ) {
                        // lang value must be a valid identifier
                        if ( !ridentifier.test(lang || "") ) {
                            Sizzle.error( "unsupported lang: " + lang );
                        }
                        lang = lang.replace( runescape, funescape ).toLowerCase();
                        return function( elem ) {
                            var elemLang;
                            do {
                                if ( (elemLang = documentIsHTML ?
                                        elem.lang :
                                        elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

                                    elemLang = elemLang.toLowerCase();
                                    return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
                                }
                            } while ( (elem = elem.parentNode) && elem.nodeType === 1 );
                            return false;
                        };
                    }),

                    // Miscellaneous
                    "target": function( elem ) {
                        var hash = window.location && window.location.hash;
                        return hash && hash.slice( 1 ) === elem.id;
                    },

                    "root": function( elem ) {
                        return elem === docElem;
                    },

                    "focus": function( elem ) {
                        return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                    },

                    // Boolean properties
                    "enabled": createDisabledPseudo( false ),
                    "disabled": createDisabledPseudo( true ),

                    "checked": function( elem ) {
                        // In CSS3, :checked should return both checked and selected elements
                        // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                        var nodeName = elem.nodeName.toLowerCase();
                        return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
                    },

                    "selected": function( elem ) {
                        // Accessing this property makes selected-by-default
                        // options in Safari work properly
                        if ( elem.parentNode ) {
                            elem.parentNode.selectedIndex;
                        }

                        return elem.selected === true;
                    },

                    // Contents
                    "empty": function( elem ) {
                        // http://www.w3.org/TR/selectors/#empty-pseudo
                        // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
                        //   but not by others (comment: 8; processing instruction: 7; etc.)
                        // nodeType < 6 works because attributes (2) do not appear as children
                        for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
                            if ( elem.nodeType < 6 ) {
                                return false;
                            }
                        }
                        return true;
                    },

                    "parent": function( elem ) {
                        return !Expr.pseudos["empty"]( elem );
                    },

                    // Element/input types
                    "header": function( elem ) {
                        return rheader.test( elem.nodeName );
                    },

                    "input": function( elem ) {
                        return rinputs.test( elem.nodeName );
                    },

                    "button": function( elem ) {
                        var name = elem.nodeName.toLowerCase();
                        return name === "input" && elem.type === "button" || name === "button";
                    },

                    "text": function( elem ) {
                        var attr;
                        return elem.nodeName.toLowerCase() === "input" &&
                            elem.type === "text" &&

                            // Support: IE<8
                            // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
                            ( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
                    },

                    // Position-in-collection
                    "first": createPositionalPseudo(function() {
                        return [ 0 ];
                    }),

                    "last": createPositionalPseudo(function( matchIndexes, length ) {
                        return [ length - 1 ];
                    }),

                    "eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
                        return [ argument < 0 ? argument + length : argument ];
                    }),

                    "even": createPositionalPseudo(function( matchIndexes, length ) {
                        var i = 0;
                        for ( ; i < length; i += 2 ) {
                            matchIndexes.push( i );
                        }
                        return matchIndexes;
                    }),

                    "odd": createPositionalPseudo(function( matchIndexes, length ) {
                        var i = 1;
                        for ( ; i < length; i += 2 ) {
                            matchIndexes.push( i );
                        }
                        return matchIndexes;
                    }),

                    "lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
                        var i = argument < 0 ? argument + length : argument;
                        for ( ; --i >= 0; ) {
                            matchIndexes.push( i );
                        }
                        return matchIndexes;
                    }),

                    "gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
                        var i = argument < 0 ? argument + length : argument;
                        for ( ; ++i < length; ) {
                            matchIndexes.push( i );
                        }
                        return matchIndexes;
                    })
                }
            };

            Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
            for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
                Expr.pseudos[ i ] = createInputPseudo( i );
            }
            for ( i in { submit: true, reset: true } ) {
                Expr.pseudos[ i ] = createButtonPseudo( i );
            }

// Easy API for creating new setFilters
            function setFilters() {}
            setFilters.prototype = Expr.filters = Expr.pseudos;
            Expr.setFilters = new setFilters();

            tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
                var matched, match, tokens, type,
                    soFar, groups, preFilters,
                    cached = tokenCache[ selector + " " ];

                if ( cached ) {
                    return parseOnly ? 0 : cached.slice( 0 );
                }

                soFar = selector;
                groups = [];
                preFilters = Expr.preFilter;

                while ( soFar ) {

                    // Comma and first run
                    if ( !matched || (match = rcomma.exec( soFar )) ) {
                        if ( match ) {
                            // Don't consume trailing commas as valid
                            soFar = soFar.slice( match[0].length ) || soFar;
                        }
                        groups.push( (tokens = []) );
                    }

                    matched = false;

                    // Combinators
                    if ( (match = rcombinators.exec( soFar )) ) {
                        matched = match.shift();
                        tokens.push({
                            value: matched,
                            // Cast descendant combinators to space
                            type: match[0].replace( rtrim, " " )
                        });
                        soFar = soFar.slice( matched.length );
                    }

                    // Filters
                    for ( type in Expr.filter ) {
                        if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
                            (match = preFilters[ type ]( match ))) ) {
                            matched = match.shift();
                            tokens.push({
                                value: matched,
                                type: type,
                                matches: match
                            });
                            soFar = soFar.slice( matched.length );
                        }
                    }

                    if ( !matched ) {
                        break;
                    }
                }

                // Return the length of the invalid excess
                // if we're just parsing
                // Otherwise, throw an error or return tokens
                return parseOnly ?
                    soFar.length :
                    soFar ?
                        Sizzle.error( selector ) :
                        // Cache the tokens
                        tokenCache( selector, groups ).slice( 0 );
            };

            function toSelector( tokens ) {
                var i = 0,
                    len = tokens.length,
                    selector = "";
                for ( ; i < len; i++ ) {
                    selector += tokens[i].value;
                }
                return selector;
            }

            function addCombinator( matcher, combinator, base ) {
                var dir = combinator.dir,
                    skip = combinator.next,
                    key = skip || dir,
                    checkNonElements = base && key === "parentNode",
                    doneName = done++;

                return combinator.first ?
                    // Check against closest ancestor/preceding element
                    function( elem, context, xml ) {
                        while ( (elem = elem[ dir ]) ) {
                            if ( elem.nodeType === 1 || checkNonElements ) {
                                return matcher( elem, context, xml );
                            }
                        }
                        return false;
                    } :

                    // Check against all ancestor/preceding elements
                    function( elem, context, xml ) {
                        var oldCache, uniqueCache, outerCache,
                            newCache = [ dirruns, doneName ];

                        // We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
                        if ( xml ) {
                            while ( (elem = elem[ dir ]) ) {
                                if ( elem.nodeType === 1 || checkNonElements ) {
                                    if ( matcher( elem, context, xml ) ) {
                                        return true;
                                    }
                                }
                            }
                        } else {
                            while ( (elem = elem[ dir ]) ) {
                                if ( elem.nodeType === 1 || checkNonElements ) {
                                    outerCache = elem[ expando ] || (elem[ expando ] = {});

                                    // Support: IE <9 only
                                    // Defend against cloned attroperties (jQuery gh-1709)
                                    uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

                                    if ( skip && skip === elem.nodeName.toLowerCase() ) {
                                        elem = elem[ dir ] || elem;
                                    } else if ( (oldCache = uniqueCache[ key ]) &&
                                        oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

                                        // Assign to newCache so results back-propagate to previous elements
                                        return (newCache[ 2 ] = oldCache[ 2 ]);
                                    } else {
                                        // Reuse newcache so results back-propagate to previous elements
                                        uniqueCache[ key ] = newCache;

                                        // A match means we're done; a fail means we have to keep checking
                                        if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
                                            return true;
                                        }
                                    }
                                }
                            }
                        }
                        return false;
                    };
            }

            function elementMatcher( matchers ) {
                return matchers.length > 1 ?
                    function( elem, context, xml ) {
                        var i = matchers.length;
                        while ( i-- ) {
                            if ( !matchers[i]( elem, context, xml ) ) {
                                return false;
                            }
                        }
                        return true;
                    } :
                    matchers[0];
            }

            function multipleContexts( selector, contexts, results ) {
                var i = 0,
                    len = contexts.length;
                for ( ; i < len; i++ ) {
                    Sizzle( selector, contexts[i], results );
                }
                return results;
            }

            function condense( unmatched, map, filter, context, xml ) {
                var elem,
                    newUnmatched = [],
                    i = 0,
                    len = unmatched.length,
                    mapped = map != null;

                for ( ; i < len; i++ ) {
                    if ( (elem = unmatched[i]) ) {
                        if ( !filter || filter( elem, context, xml ) ) {
                            newUnmatched.push( elem );
                            if ( mapped ) {
                                map.push( i );
                            }
                        }
                    }
                }

                return newUnmatched;
            }

            function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
                if ( postFilter && !postFilter[ expando ] ) {
                    postFilter = setMatcher( postFilter );
                }
                if ( postFinder && !postFinder[ expando ] ) {
                    postFinder = setMatcher( postFinder, postSelector );
                }
                return markFunction(function( seed, results, context, xml ) {
                    var temp, i, elem,
                        preMap = [],
                        postMap = [],
                        preexisting = results.length,

                        // Get initial elements from seed or context
                        elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

                        // Prefilter to get matcher input, preserving a map for seed-results synchronization
                        matcherIn = preFilter && ( seed || !selector ) ?
                            condense( elems, preMap, preFilter, context, xml ) :
                            elems,

                        matcherOut = matcher ?
                            // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
                            postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

                                // ...intermediate processing is necessary
                                [] :

                                // ...otherwise use results directly
                                results :
                            matcherIn;

                    // Find primary matches
                    if ( matcher ) {
                        matcher( matcherIn, matcherOut, context, xml );
                    }

                    // Apply postFilter
                    if ( postFilter ) {
                        temp = condense( matcherOut, postMap );
                        postFilter( temp, [], context, xml );

                        // Un-match failing elements by moving them back to matcherIn
                        i = temp.length;
                        while ( i-- ) {
                            if ( (elem = temp[i]) ) {
                                matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
                            }
                        }
                    }

                    if ( seed ) {
                        if ( postFinder || preFilter ) {
                            if ( postFinder ) {
                                // Get the final matcherOut by condensing this intermediate into postFinder contexts
                                temp = [];
                                i = matcherOut.length;
                                while ( i-- ) {
                                    if ( (elem = matcherOut[i]) ) {
                                        // Restore matcherIn since elem is not yet a final match
                                        temp.push( (matcherIn[i] = elem) );
                                    }
                                }
                                postFinder( null, (matcherOut = []), temp, xml );
                            }

                            // Move matched elements from seed to results to keep them synchronized
                            i = matcherOut.length;
                            while ( i-- ) {
                                if ( (elem = matcherOut[i]) &&
                                    (temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

                                    seed[temp] = !(results[temp] = elem);
                                }
                            }
                        }

                        // Add elements to results, through postFinder if defined
                    } else {
                        matcherOut = condense(
                            matcherOut === results ?
                                matcherOut.splice( preexisting, matcherOut.length ) :
                                matcherOut
                        );
                        if ( postFinder ) {
                            postFinder( null, results, matcherOut, xml );
                        } else {
                            push.apply( results, matcherOut );
                        }
                    }
                });
            }

            function matcherFromTokens( tokens ) {
                var checkContext, matcher, j,
                    len = tokens.length,
                    leadingRelative = Expr.relative[ tokens[0].type ],
                    implicitRelative = leadingRelative || Expr.relative[" "],
                    i = leadingRelative ? 1 : 0,

                    // The foundational matcher ensures that elements are reachable from top-level context(s)
                    matchContext = addCombinator( function( elem ) {
                        return elem === checkContext;
                    }, implicitRelative, true ),
                    matchAnyContext = addCombinator( function( elem ) {
                        return indexOf( checkContext, elem ) > -1;
                    }, implicitRelative, true ),
                    matchers = [ function( elem, context, xml ) {
                        var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
                                (checkContext = context).nodeType ?
                                    matchContext( elem, context, xml ) :
                                    matchAnyContext( elem, context, xml ) );
                        // Avoid hanging onto element (issue #299)
                        checkContext = null;
                        return ret;
                    } ];

                for ( ; i < len; i++ ) {
                    if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
                        matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
                    } else {
                        matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

                        // Return special upon seeing a positional matcher
                        if ( matcher[ expando ] ) {
                            // Find the next relative operator (if any) for proper handling
                            j = ++i;
                            for ( ; j < len; j++ ) {
                                if ( Expr.relative[ tokens[j].type ] ) {
                                    break;
                                }
                            }
                            return setMatcher(
                                i > 1 && elementMatcher( matchers ),
                                i > 1 && toSelector(
                                    // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                                    tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
                                ).replace( rtrim, "$1" ),
                                matcher,
                                i < j && matcherFromTokens( tokens.slice( i, j ) ),
                                j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
                                j < len && toSelector( tokens )
                            );
                        }
                        matchers.push( matcher );
                    }
                }

                return elementMatcher( matchers );
            }

            function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
                var bySet = setMatchers.length > 0,
                    byElement = elementMatchers.length > 0,
                    superMatcher = function( seed, context, xml, results, outermost ) {
                        var elem, j, matcher,
                            matchedCount = 0,
                            i = "0",
                            unmatched = seed && [],
                            setMatched = [],
                            contextBackup = outermostContext,
                            // We must always have either seed elements or outermost context
                            elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
                            // Use integer dirruns iff this is the outermost matcher
                            dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
                            len = elems.length;

                        if ( outermost ) {
                            outermostContext = context === document || context || outermost;
                        }

                        // Add elements passing elementMatchers directly to results
                        // Support: IE<9, Safari
                        // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
                        for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
                            if ( byElement && elem ) {
                                j = 0;
                                if ( !context && elem.ownerDocument !== document ) {
                                    setDocument( elem );
                                    xml = !documentIsHTML;
                                }
                                while ( (matcher = elementMatchers[j++]) ) {
                                    if ( matcher( elem, context || document, xml) ) {
                                        results.push( elem );
                                        break;
                                    }
                                }
                                if ( outermost ) {
                                    dirruns = dirrunsUnique;
                                }
                            }

                            // Track unmatched elements for set filters
                            if ( bySet ) {
                                // They will have gone through all possible matchers
                                if ( (elem = !matcher && elem) ) {
                                    matchedCount--;
                                }

                                // Lengthen the array for every element, matched or not
                                if ( seed ) {
                                    unmatched.push( elem );
                                }
                            }
                        }

                        // `i` is now the count of elements visited above, and adding it to `matchedCount`
                        // makes the latter nonnegative.
                        matchedCount += i;

                        // Apply set filters to unmatched elements
                        // NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
                        // equals `i`), unless we didn't visit _any_ elements in the above loop because we have
                        // no element matchers and no seed.
                        // Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
                        // case, which will result in a "00" `matchedCount` that differs from `i` but is also
                        // numerically zero.
                        if ( bySet && i !== matchedCount ) {
                            j = 0;
                            while ( (matcher = setMatchers[j++]) ) {
                                matcher( unmatched, setMatched, context, xml );
                            }

                            if ( seed ) {
                                // Reintegrate element matches to eliminate the need for sorting
                                if ( matchedCount > 0 ) {
                                    while ( i-- ) {
                                        if ( !(unmatched[i] || setMatched[i]) ) {
                                            setMatched[i] = pop.call( results );
                                        }
                                    }
                                }

                                // Discard index placeholder values to get only actual matches
                                setMatched = condense( setMatched );
                            }

                            // Add matches to results
                            push.apply( results, setMatched );

                            // Seedless set matches succeeding multiple successful matchers stipulate sorting
                            if ( outermost && !seed && setMatched.length > 0 &&
                                ( matchedCount + setMatchers.length ) > 1 ) {

                                Sizzle.uniqueSort( results );
                            }
                        }

                        // Override manipulation of globals by nested matchers
                        if ( outermost ) {
                            dirruns = dirrunsUnique;
                            outermostContext = contextBackup;
                        }

                        return unmatched;
                    };

                return bySet ?
                    markFunction( superMatcher ) :
                    superMatcher;
            }

            compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
                var i,
                    setMatchers = [],
                    elementMatchers = [],
                    cached = compilerCache[ selector + " " ];

                if ( !cached ) {
                    // Generate a function of recursive functions that can be used to check each element
                    if ( !match ) {
                        match = tokenize( selector );
                    }
                    i = match.length;
                    while ( i-- ) {
                        cached = matcherFromTokens( match[i] );
                        if ( cached[ expando ] ) {
                            setMatchers.push( cached );
                        } else {
                            elementMatchers.push( cached );
                        }
                    }

                    // Cache the compiled function
                    cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

                    // Save selector and tokenization
                    cached.selector = selector;
                }
                return cached;
            };

            /**
             * A low-level selection function that works with Sizzle's compiled
             *  selector functions
             * @param {String|Function} selector A selector or a pre-compiled
             *  selector function built with Sizzle.compile
             * @param {Element} context
             * @param {Array} [results]
             * @param {Array} [seed] A set of elements to match against
             */
            select = Sizzle.select = function( selector, context, results, seed ) {
                var i, tokens, token, type, find,
                    compiled = typeof selector === "function" && selector,
                    match = !seed && tokenize( (selector = compiled.selector || selector) );

                results = results || [];

                // Try to minimize operations if there is only one selector in the list and no seed
                // (the latter of which guarantees us context)
                if ( match.length === 1 ) {

                    // Reduce context if the leading compound selector is an ID
                    tokens = match[0] = match[0].slice( 0 );
                    if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
                        context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

                        context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
                        if ( !context ) {
                            return results;

                            // Precompiled matchers will still verify ancestry, so step up a level
                        } else if ( compiled ) {
                            context = context.parentNode;
                        }

                        selector = selector.slice( tokens.shift().value.length );
                    }

                    // Fetch a seed set for right-to-left matching
                    i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
                    while ( i-- ) {
                        token = tokens[i];

                        // Abort if we hit a combinator
                        if ( Expr.relative[ (type = token.type) ] ) {
                            break;
                        }
                        if ( (find = Expr.find[ type ]) ) {
                            // Search, expanding context for leading sibling combinators
                            if ( (seed = find(
                                    token.matches[0].replace( runescape, funescape ),
                                    rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
                                )) ) {

                                // If seed is empty or no tokens remain, we can return early
                                tokens.splice( i, 1 );
                                selector = seed.length && toSelector( tokens );
                                if ( !selector ) {
                                    push.apply( results, seed );
                                    return results;
                                }

                                break;
                            }
                        }
                    }
                }

                // Compile and execute a filtering function if one is not provided
                // Provide `match` to avoid retokenization if we modified the selector above
                ( compiled || compile( selector, match ) )(
                    seed,
                    context,
                    !documentIsHTML,
                    results,
                    !context || rsibling.test( selector ) && testContext( context.parentNode ) || context
                );
                return results;
            };

// One-time assignments

// Sort stability
            support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
            support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
            setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
            support.sortDetached = assert(function( el ) {
                // Should return 1, but returns 4 (following)
                return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
            });

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
            if ( !assert(function( el ) {
                    el.innerHTML = "<a href='#'></a>";
                    return el.firstChild.getAttribute("href") === "#" ;
                }) ) {
                addHandle( "type|href|height|width", function( elem, name, isXML ) {
                    if ( !isXML ) {
                        return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
                    }
                });
            }

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
            if ( !support.attributes || !assert(function( el ) {
                    el.innerHTML = "<input/>";
                    el.firstChild.setAttribute( "value", "" );
                    return el.firstChild.getAttribute( "value" ) === "";
                }) ) {
                addHandle( "value", function( elem, name, isXML ) {
                    if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
                        return elem.defaultValue;
                    }
                });
            }

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
            if ( !assert(function( el ) {
                    return el.getAttribute("disabled") == null;
                }) ) {
                addHandle( booleans, function( elem, name, isXML ) {
                    var val;
                    if ( !isXML ) {
                        return elem[ name ] === true ? name.toLowerCase() :
                            (val = elem.getAttributeNode( name )) && val.specified ?
                                val.value :
                                null;
                    }
                });
            }

            return Sizzle;

        })( window );



    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;

// Deprecated
    jQuery.expr[ ":" ] = jQuery.expr.pseudos;
    jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
    jQuery.text = Sizzle.getText;
    jQuery.isXMLDoc = Sizzle.isXML;
    jQuery.contains = Sizzle.contains;
    jQuery.escapeSelector = Sizzle.escape;




    var dir = function( elem, dir, until ) {
        var matched = [],
            truncate = until !== undefined;

        while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
            if ( elem.nodeType === 1 ) {
                if ( truncate && jQuery( elem ).is( until ) ) {
                    break;
                }
                matched.push( elem );
            }
        }
        return matched;
    };


    var siblings = function( n, elem ) {
        var matched = [];

        for ( ; n; n = n.nextSibling ) {
            if ( n.nodeType === 1 && n !== elem ) {
                matched.push( n );
            }
        }

        return matched;
    };


    var rneedsContext = jQuery.expr.match.needsContext;



    function nodeName( elem, name ) {

        return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

    };
    var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



    var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
    function winnow( elements, qualifier, not ) {
        if ( jQuery.isFunction( qualifier ) ) {
            return jQuery.grep( elements, function( elem, i ) {
                return !!qualifier.call( elem, i, elem ) !== not;
            } );
        }

        // Single element
        if ( qualifier.nodeType ) {
            return jQuery.grep( elements, function( elem ) {
                return ( elem === qualifier ) !== not;
            } );
        }

        // Arraylike of elements (jQuery, arguments, Array)
        if ( typeof qualifier !== "string" ) {
            return jQuery.grep( elements, function( elem ) {
                return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
            } );
        }

        // Simple selector that can be filtered directly, removing non-Elements
        if ( risSimple.test( qualifier ) ) {
            return jQuery.filter( qualifier, elements, not );
        }

        // Complex selector, compare the two sets, removing non-Elements
        qualifier = jQuery.filter( qualifier, elements );
        return jQuery.grep( elements, function( elem ) {
            return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
        } );
    }

    jQuery.filter = function( expr, elems, not ) {
        var elem = elems[ 0 ];

        if ( not ) {
            expr = ":not(" + expr + ")";
        }

        if ( elems.length === 1 && elem.nodeType === 1 ) {
            return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
        }

        return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
            return elem.nodeType === 1;
        } ) );
    };

    jQuery.fn.extend( {
        find: function( selector ) {
            var i, ret,
                len = this.length,
                self = this;

            if ( typeof selector !== "string" ) {
                return this.pushStack( jQuery( selector ).filter( function() {
                    for ( i = 0; i < len; i++ ) {
                        if ( jQuery.contains( self[ i ], this ) ) {
                            return true;
                        }
                    }
                } ) );
            }

            ret = this.pushStack( [] );

            for ( i = 0; i < len; i++ ) {
                jQuery.find( selector, self[ i ], ret );
            }

            return len > 1 ? jQuery.uniqueSort( ret ) : ret;
        },
        filter: function( selector ) {
            return this.pushStack( winnow( this, selector || [], false ) );
        },
        not: function( selector ) {
            return this.pushStack( winnow( this, selector || [], true ) );
        },
        is: function( selector ) {
            return !!winnow(
                this,

                // If this is a positional/relative selector, check membership in the returned set
                // so $("p:first").is("p:last") won't return true for a doc with two "p".
                typeof selector === "string" && rneedsContext.test( selector ) ?
                    jQuery( selector ) :
                    selector || [],
                false
            ).length;
        }
    } );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
    var rootjQuery,

        // A simple way to check for HTML strings
        // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
        // Strict HTML recognition (#11290: must start with <)
        // Shortcut simple #id case for speed
        rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

        init = jQuery.fn.init = function( selector, context, root ) {
            var match, elem;

            // HANDLE: $(""), $(null), $(undefined), $(false)
            if ( !selector ) {
                return this;
            }

            // Method init() accepts an alternate rootjQuery
            // so migrate can support jQuery.sub (gh-2101)
            root = root || rootjQuery;

            // Handle HTML strings
            if ( typeof selector === "string" ) {
                if ( selector[ 0 ] === "<" &&
                    selector[ selector.length - 1 ] === ">" &&
                    selector.length >= 3 ) {

                    // Assume that strings that start and end with <> are HTML and skip the regex check
                    match = [ null, selector, null ];

                } else {
                    match = rquickExpr.exec( selector );
                }

                // Match html or make sure no context is specified for #id
                if ( match && ( match[ 1 ] || !context ) ) {

                    // HANDLE: $(html) -> $(array)
                    if ( match[ 1 ] ) {
                        context = context instanceof jQuery ? context[ 0 ] : context;

                        // Option to run scripts is true for back-compat
                        // Intentionally let the error be thrown if parseHTML is not present
                        jQuery.merge( this, jQuery.parseHTML(
                            match[ 1 ],
                            context && context.nodeType ? context.ownerDocument || context : document,
                            true
                        ) );

                        // HANDLE: $(html, props)
                        if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
                            for ( match in context ) {

                                // Properties of context are called as methods if possible
                                if ( jQuery.isFunction( this[ match ] ) ) {
                                    this[ match ]( context[ match ] );

                                    // ...and otherwise set as attributes
                                } else {
                                    this.attr( match, context[ match ] );
                                }
                            }
                        }

                        return this;

                        // HANDLE: $(#id)
                    } else {
                        elem = document.getElementById( match[ 2 ] );

                        if ( elem ) {

                            // Inject the element directly into the jQuery object
                            this[ 0 ] = elem;
                            this.length = 1;
                        }
                        return this;
                    }

                    // HANDLE: $(expr, $(...))
                } else if ( !context || context.jquery ) {
                    return ( context || root ).find( selector );

                    // HANDLE: $(expr, context)
                    // (which is just equivalent to: $(context).find(expr)
                } else {
                    return this.constructor( context ).find( selector );
                }

                // HANDLE: $(DOMElement)
            } else if ( selector.nodeType ) {
                this[ 0 ] = selector;
                this.length = 1;
                return this;

                // HANDLE: $(function)
                // Shortcut for document ready
            } else if ( jQuery.isFunction( selector ) ) {
                return root.ready !== undefined ?
                    root.ready( selector ) :

                    // Execute immediately if ready is not present
                    selector( jQuery );
            }

            return jQuery.makeArray( selector, this );
        };

// Give the init function the jQuery prototype for later instantiation
    init.prototype = jQuery.fn;

// Initialize central reference
    rootjQuery = jQuery( document );


    var rparentsprev = /^(?:parents|prev(?:Until|All))/,

        // Methods guaranteed to produce a unique set when starting from a unique set
        guaranteedUnique = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };

    jQuery.fn.extend( {
        has: function( target ) {
            var targets = jQuery( target, this ),
                l = targets.length;

            return this.filter( function() {
                var i = 0;
                for ( ; i < l; i++ ) {
                    if ( jQuery.contains( this, targets[ i ] ) ) {
                        return true;
                    }
                }
            } );
        },

        closest: function( selectors, context ) {
            var cur,
                i = 0,
                l = this.length,
                matched = [],
                targets = typeof selectors !== "string" && jQuery( selectors );

            // Positional selectors never match, since there's no _selection_ context
            if ( !rneedsContext.test( selectors ) ) {
                for ( ; i < l; i++ ) {
                    for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

                        // Always skip document fragments
                        if ( cur.nodeType < 11 && ( targets ?
                                targets.index( cur ) > -1 :

                                // Don't pass non-elements to Sizzle
                                cur.nodeType === 1 &&
                                jQuery.find.matchesSelector( cur, selectors ) ) ) {

                            matched.push( cur );
                            break;
                        }
                    }
                }
            }

            return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
        },

        // Determine the position of an element within the set
        index: function( elem ) {

            // No argument, return index in parent
            if ( !elem ) {
                return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
            }

            // Index in selector
            if ( typeof elem === "string" ) {
                return indexOf.call( jQuery( elem ), this[ 0 ] );
            }

            // Locate the position of the desired element
            return indexOf.call( this,

                // If it receives a jQuery object, the first element is used
                elem.jquery ? elem[ 0 ] : elem
            );
        },

        add: function( selector, context ) {
            return this.pushStack(
                jQuery.uniqueSort(
                    jQuery.merge( this.get(), jQuery( selector, context ) )
                )
            );
        },

        addBack: function( selector ) {
            return this.add( selector == null ?
                this.prevObject : this.prevObject.filter( selector )
            );
        }
    } );

    function sibling( cur, dir ) {
        while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
        return cur;
    }

    jQuery.each( {
        parent: function( elem ) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents: function( elem ) {
            return dir( elem, "parentNode" );
        },
        parentsUntil: function( elem, i, until ) {
            return dir( elem, "parentNode", until );
        },
        next: function( elem ) {
            return sibling( elem, "nextSibling" );
        },
        prev: function( elem ) {
            return sibling( elem, "previousSibling" );
        },
        nextAll: function( elem ) {
            return dir( elem, "nextSibling" );
        },
        prevAll: function( elem ) {
            return dir( elem, "previousSibling" );
        },
        nextUntil: function( elem, i, until ) {
            return dir( elem, "nextSibling", until );
        },
        prevUntil: function( elem, i, until ) {
            return dir( elem, "previousSibling", until );
        },
        siblings: function( elem ) {
            return siblings( ( elem.parentNode || {} ).firstChild, elem );
        },
        children: function( elem ) {
            return siblings( elem.firstChild );
        },
        contents: function( elem ) {
            if ( nodeName( elem, "iframe" ) ) {
                return elem.contentDocument;
            }

            // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
            // Treat the template element as a regular one in browsers that
            // don't support it.
            if ( nodeName( elem, "template" ) ) {
                elem = elem.content || elem;
            }

            return jQuery.merge( [], elem.childNodes );
        }
    }, function( name, fn ) {
        jQuery.fn[ name ] = function( until, selector ) {
            var matched = jQuery.map( this, fn, until );

            if ( name.slice( -5 ) !== "Until" ) {
                selector = until;
            }

            if ( selector && typeof selector === "string" ) {
                matched = jQuery.filter( selector, matched );
            }

            if ( this.length > 1 ) {

                // Remove duplicates
                if ( !guaranteedUnique[ name ] ) {
                    jQuery.uniqueSort( matched );
                }

                // Reverse order for parents* and prev-derivatives
                if ( rparentsprev.test( name ) ) {
                    matched.reverse();
                }
            }

            return this.pushStack( matched );
        };
    } );
    var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
    function createOptions( options ) {
        var object = {};
        jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
            object[ flag ] = true;
        } );
        return object;
    }

    /*
     * Create a callback list using the following parameters:
     *
     *	options: an optional list of space-separated options that will change how
     *			the callback list behaves or a more traditional option object
     *
     * By default a callback list will act like an event callback list and can be
     * "fired" multiple times.
     *
     * Possible options:
     *
     *	once:			will ensure the callback list can only be fired once (like a Deferred)
     *
     *	memory:			will keep track of previous values and will call any callback added
     *					after the list has been fired right away with the latest "memorized"
     *					values (like a Deferred)
     *
     *	unique:			will ensure a callback can only be added once (no duplicate in the list)
     *
     *	stopOnFalse:	interrupt callings when a callback returns false
     *
     */
    jQuery.Callbacks = function( options ) {

        // Convert options from String-formatted to Object-formatted if needed
        // (we check in cache first)
        options = typeof options === "string" ?
            createOptions( options ) :
            jQuery.extend( {}, options );

        var // Flag to know if list is currently firing
            firing,

            // Last fire value for non-forgettable lists
            memory,

            // Flag to know if list was already fired
            fired,

            // Flag to prevent firing
            locked,

            // Actual callback list
            list = [],

            // Queue of execution data for repeatable lists
            queue = [],

            // Index of currently firing callback (modified by add/remove as needed)
            firingIndex = -1,

            // Fire callbacks
            fire = function() {

                // Enforce single-firing
                locked = locked || options.once;

                // Execute callbacks for all pending executions,
                // respecting firingIndex overrides and runtime changes
                fired = firing = true;
                for ( ; queue.length; firingIndex = -1 ) {
                    memory = queue.shift();
                    while ( ++firingIndex < list.length ) {

                        // Run callback and check for early termination
                        if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
                            options.stopOnFalse ) {

                            // Jump to end and forget the data so .add doesn't re-fire
                            firingIndex = list.length;
                            memory = false;
                        }
                    }
                }

                // Forget the data if we're done with it
                if ( !options.memory ) {
                    memory = false;
                }

                firing = false;

                // Clean up if we're done firing for good
                if ( locked ) {

                    // Keep an empty list if we have data for future add calls
                    if ( memory ) {
                        list = [];

                        // Otherwise, this object is spent
                    } else {
                        list = "";
                    }
                }
            },

            // Actual Callbacks object
            self = {

                // Add a callback or a collection of callbacks to the list
                add: function() {
                    if ( list ) {

                        // If we have memory from a past run, we should fire after adding
                        if ( memory && !firing ) {
                            firingIndex = list.length - 1;
                            queue.push( memory );
                        }

                        ( function add( args ) {
                            jQuery.each( args, function( _, arg ) {
                                if ( jQuery.isFunction( arg ) ) {
                                    if ( !options.unique || !self.has( arg ) ) {
                                        list.push( arg );
                                    }
                                } else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

                                    // Inspect recursively
                                    add( arg );
                                }
                            } );
                        } )( arguments );

                        if ( memory && !firing ) {
                            fire();
                        }
                    }
                    return this;
                },

                // Remove a callback from the list
                remove: function() {
                    jQuery.each( arguments, function( _, arg ) {
                        var index;
                        while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
                            list.splice( index, 1 );

                            // Handle firing indexes
                            if ( index <= firingIndex ) {
                                firingIndex--;
                            }
                        }
                    } );
                    return this;
                },

                // Check if a given callback is in the list.
                // If no argument is given, return whether or not list has callbacks attached.
                has: function( fn ) {
                    return fn ?
                        jQuery.inArray( fn, list ) > -1 :
                        list.length > 0;
                },

                // Remove all callbacks from the list
                empty: function() {
                    if ( list ) {
                        list = [];
                    }
                    return this;
                },

                // Disable .fire and .add
                // Abort any current/pending executions
                // Clear all callbacks and values
                disable: function() {
                    locked = queue = [];
                    list = memory = "";
                    return this;
                },
                disabled: function() {
                    return !list;
                },

                // Disable .fire
                // Also disable .add unless we have memory (since it would have no effect)
                // Abort any pending executions
                lock: function() {
                    locked = queue = [];
                    if ( !memory && !firing ) {
                        list = memory = "";
                    }
                    return this;
                },
                locked: function() {
                    return !!locked;
                },

                // Call all callbacks with the given context and arguments
                fireWith: function( context, args ) {
                    if ( !locked ) {
                        args = args || [];
                        args = [ context, args.slice ? args.slice() : args ];
                        queue.push( args );
                        if ( !firing ) {
                            fire();
                        }
                    }
                    return this;
                },

                // Call all the callbacks with the given arguments
                fire: function() {
                    self.fireWith( this, arguments );
                    return this;
                },

                // To know if the callbacks have already been called at least once
                fired: function() {
                    return !!fired;
                }
            };

        return self;
    };


    function Identity( v ) {
        return v;
    }
    function Thrower( ex ) {
        throw ex;
    }

    function adoptValue( value, resolve, reject, noValue ) {
        var method;

        try {

            // Check for promise aspect first to privilege synchronous behavior
            if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
                method.call( value ).done( resolve ).fail( reject );

                // Other thenables
            } else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
                method.call( value, resolve, reject );

                // Other non-thenables
            } else {

                // Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
                // * false: [ value ].slice( 0 ) => resolve( value )
                // * true: [ value ].slice( 1 ) => resolve()
                resolve.apply( undefined, [ value ].slice( noValue ) );
            }

            // For Promises/A+, convert exceptions into rejections
            // Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
            // Deferred#then to conditionally suppress rejection.
        } catch ( value ) {

            // Support: Android 4.0 only
            // Strict mode functions invoked without .call/.apply get global-object context
            reject.apply( undefined, [ value ] );
        }
    }

    jQuery.extend( {

        Deferred: function( func ) {
            var tuples = [

                    // action, add listener, callbacks,
                    // ... .then handlers, argument index, [final state]
                    [ "notify", "progress", jQuery.Callbacks( "memory" ),
                        jQuery.Callbacks( "memory" ), 2 ],
                    [ "resolve", "done", jQuery.Callbacks( "once memory" ),
                        jQuery.Callbacks( "once memory" ), 0, "resolved" ],
                    [ "reject", "fail", jQuery.Callbacks( "once memory" ),
                        jQuery.Callbacks( "once memory" ), 1, "rejected" ]
                ],
                state = "pending",
                promise = {
                    state: function() {
                        return state;
                    },
                    always: function() {
                        deferred.done( arguments ).fail( arguments );
                        return this;
                    },
                    "catch": function( fn ) {
                        return promise.then( null, fn );
                    },

                    // Keep pipe for back-compat
                    pipe: function( /* fnDone, fnFail, fnProgress */ ) {
                        var fns = arguments;

                        return jQuery.Deferred( function( newDefer ) {
                            jQuery.each( tuples, function( i, tuple ) {

                                // Map tuples (progress, done, fail) to arguments (done, fail, progress)
                                var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

                                // deferred.progress(function() { bind to newDefer or newDefer.notify })
                                // deferred.done(function() { bind to newDefer or newDefer.resolve })
                                // deferred.fail(function() { bind to newDefer or newDefer.reject })
                                deferred[ tuple[ 1 ] ]( function() {
                                    var returned = fn && fn.apply( this, arguments );
                                    if ( returned && jQuery.isFunction( returned.promise ) ) {
                                        returned.promise()
                                            .progress( newDefer.notify )
                                            .done( newDefer.resolve )
                                            .fail( newDefer.reject );
                                    } else {
                                        newDefer[ tuple[ 0 ] + "With" ](
                                            this,
                                            fn ? [ returned ] : arguments
                                        );
                                    }
                                } );
                            } );
                            fns = null;
                        } ).promise();
                    },
                    then: function( onFulfilled, onRejected, onProgress ) {
                        var maxDepth = 0;
                        function resolve( depth, deferred, handler, special ) {
                            return function() {
                                var that = this,
                                    args = arguments,
                                    mightThrow = function() {
                                        var returned, then;

                                        // Support: Promises/A+ section 2.3.3.3.3
                                        // https://promisesaplus.com/#point-59
                                        // Ignore double-resolution attempts
                                        if ( depth < maxDepth ) {
                                            return;
                                        }

                                        returned = handler.apply( that, args );

                                        // Support: Promises/A+ section 2.3.1
                                        // https://promisesaplus.com/#point-48
                                        if ( returned === deferred.promise() ) {
                                            throw new TypeError( "Thenable self-resolution" );
                                        }

                                        // Support: Promises/A+ sections 2.3.3.1, 3.5
                                        // https://promisesaplus.com/#point-54
                                        // https://promisesaplus.com/#point-75
                                        // Retrieve `then` only once
                                        then = returned &&

                                            // Support: Promises/A+ section 2.3.4
                                            // https://promisesaplus.com/#point-64
                                            // Only check objects and functions for thenability
                                            ( typeof returned === "object" ||
                                            typeof returned === "function" ) &&
                                            returned.then;

                                        // Handle a returned thenable
                                        if ( jQuery.isFunction( then ) ) {

                                            // Special processors (notify) just wait for resolution
                                            if ( special ) {
                                                then.call(
                                                    returned,
                                                    resolve( maxDepth, deferred, Identity, special ),
                                                    resolve( maxDepth, deferred, Thrower, special )
                                                );

                                                // Normal processors (resolve) also hook into progress
                                            } else {

                                                // ...and disregard older resolution values
                                                maxDepth++;

                                                then.call(
                                                    returned,
                                                    resolve( maxDepth, deferred, Identity, special ),
                                                    resolve( maxDepth, deferred, Thrower, special ),
                                                    resolve( maxDepth, deferred, Identity,
                                                        deferred.notifyWith )
                                                );
                                            }

                                            // Handle all other returned values
                                        } else {

                                            // Only substitute handlers pass on context
                                            // and multiple values (non-spec behavior)
                                            if ( handler !== Identity ) {
                                                that = undefined;
                                                args = [ returned ];
                                            }

                                            // Process the value(s)
                                            // Default process is resolve
                                            ( special || deferred.resolveWith )( that, args );
                                        }
                                    },

                                    // Only normal processors (resolve) catch and reject exceptions
                                    process = special ?
                                        mightThrow :
                                        function() {
                                            try {
                                                mightThrow();
                                            } catch ( e ) {

                                                if ( jQuery.Deferred.exceptionHook ) {
                                                    jQuery.Deferred.exceptionHook( e,
                                                        process.stackTrace );
                                                }

                                                // Support: Promises/A+ section 2.3.3.3.4.1
                                                // https://promisesaplus.com/#point-61
                                                // Ignore post-resolution exceptions
                                                if ( depth + 1 >= maxDepth ) {

                                                    // Only substitute handlers pass on context
                                                    // and multiple values (non-spec behavior)
                                                    if ( handler !== Thrower ) {
                                                        that = undefined;
                                                        args = [ e ];
                                                    }

                                                    deferred.rejectWith( that, args );
                                                }
                                            }
                                        };

                                // Support: Promises/A+ section 2.3.3.3.1
                                // https://promisesaplus.com/#point-57
                                // Re-resolve promises immediately to dodge false rejection from
                                // subsequent errors
                                if ( depth ) {
                                    process();
                                } else {

                                    // Call an optional hook to record the stack, in case of exception
                                    // since it's otherwise lost when execution goes async
                                    if ( jQuery.Deferred.getStackHook ) {
                                        process.stackTrace = jQuery.Deferred.getStackHook();
                                    }
                                    window.setTimeout( process );
                                }
                            };
                        }

                        return jQuery.Deferred( function( newDefer ) {

                            // progress_handlers.add( ... )
                            tuples[ 0 ][ 3 ].add(
                                resolve(
                                    0,
                                    newDefer,
                                    jQuery.isFunction( onProgress ) ?
                                        onProgress :
                                        Identity,
                                    newDefer.notifyWith
                                )
                            );

                            // fulfilled_handlers.add( ... )
                            tuples[ 1 ][ 3 ].add(
                                resolve(
                                    0,
                                    newDefer,
                                    jQuery.isFunction( onFulfilled ) ?
                                        onFulfilled :
                                        Identity
                                )
                            );

                            // rejected_handlers.add( ... )
                            tuples[ 2 ][ 3 ].add(
                                resolve(
                                    0,
                                    newDefer,
                                    jQuery.isFunction( onRejected ) ?
                                        onRejected :
                                        Thrower
                                )
                            );
                        } ).promise();
                    },

                    // Get a promise for this deferred
                    // If obj is provided, the promise aspect is added to the object
                    promise: function( obj ) {
                        return obj != null ? jQuery.extend( obj, promise ) : promise;
                    }
                },
                deferred = {};

            // Add list-specific methods
            jQuery.each( tuples, function( i, tuple ) {
                var list = tuple[ 2 ],
                    stateString = tuple[ 5 ];

                // promise.progress = list.add
                // promise.done = list.add
                // promise.fail = list.add
                promise[ tuple[ 1 ] ] = list.add;

                // Handle state
                if ( stateString ) {
                    list.add(
                        function() {

                            // state = "resolved" (i.e., fulfilled)
                            // state = "rejected"
                            state = stateString;
                        },

                        // rejected_callbacks.disable
                        // fulfilled_callbacks.disable
                        tuples[ 3 - i ][ 2 ].disable,

                        // progress_callbacks.lock
                        tuples[ 0 ][ 2 ].lock
                    );
                }

                // progress_handlers.fire
                // fulfilled_handlers.fire
                // rejected_handlers.fire
                list.add( tuple[ 3 ].fire );

                // deferred.notify = function() { deferred.notifyWith(...) }
                // deferred.resolve = function() { deferred.resolveWith(...) }
                // deferred.reject = function() { deferred.rejectWith(...) }
                deferred[ tuple[ 0 ] ] = function() {
                    deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
                    return this;
                };

                // deferred.notifyWith = list.fireWith
                // deferred.resolveWith = list.fireWith
                // deferred.rejectWith = list.fireWith
                deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
            } );

            // Make the deferred a promise
            promise.promise( deferred );

            // Call given func if any
            if ( func ) {
                func.call( deferred, deferred );
            }

            // All done!
            return deferred;
        },

        // Deferred helper
        when: function( singleValue ) {
            var

                // count of uncompleted subordinates
                remaining = arguments.length,

                // count of unprocessed arguments
                i = remaining,

                // subordinate fulfillment data
                resolveContexts = Array( i ),
                resolveValues = slice.call( arguments ),

                // the master Deferred
                master = jQuery.Deferred(),

                // subordinate callback factory
                updateFunc = function( i ) {
                    return function( value ) {
                        resolveContexts[ i ] = this;
                        resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
                        if ( !( --remaining ) ) {
                            master.resolveWith( resolveContexts, resolveValues );
                        }
                    };
                };

            // Single- and empty arguments are adopted like Promise.resolve
            if ( remaining <= 1 ) {
                adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
                    !remaining );

                // Use .then() to unwrap secondary thenables (cf. gh-3000)
                if ( master.state() === "pending" ||
                    jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

                    return master.then();
                }
            }

            // Multiple arguments are aggregated like Promise.all array elements
            while ( i-- ) {
                adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
            }

            return master.promise();
        }
    } );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
    var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

    jQuery.Deferred.exceptionHook = function( error, stack ) {

        // Support: IE 8 - 9 only
        // Console exists when dev tools are open, which can happen at any time
        if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
            window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
        }
    };




    jQuery.readyException = function( error ) {
        window.setTimeout( function() {
            throw error;
        } );
    };




// The deferred used on DOM ready
    var readyList = jQuery.Deferred();

    jQuery.fn.ready = function( fn ) {

        readyList
            .then( fn )

            // Wrap jQuery.readyException in a function so that the lookup
            // happens at the time of error handling instead of callback
            // registration.
            .catch( function( error ) {
                jQuery.readyException( error );
            } );

        return this;
    };

    jQuery.extend( {

        // Is the DOM ready to be used? Set to true once it occurs.
        isReady: false,

        // A counter to track how many items to wait for before
        // the ready event fires. See #6781
        readyWait: 1,

        // Handle when the DOM is ready
        ready: function( wait ) {

            // Abort if there are pending holds or we're already ready
            if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
                return;
            }

            // Remember that the DOM is ready
            jQuery.isReady = true;

            // If a normal DOM Ready event fired, decrement, and wait if need be
            if ( wait !== true && --jQuery.readyWait > 0 ) {
                return;
            }

            // If there are functions bound, to execute
            readyList.resolveWith( document, [ jQuery ] );
        }
    } );

    jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
    function completed() {
        document.removeEventListener( "DOMContentLoaded", completed );
        window.removeEventListener( "load", completed );
        jQuery.ready();
    }

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
    if ( document.readyState === "complete" ||
        ( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

        // Handle it asynchronously to allow scripts the opportunity to delay ready
        window.setTimeout( jQuery.ready );

    } else {

        // Use the handy event callback
        document.addEventListener( "DOMContentLoaded", completed );

        // A fallback to window.onload, that will always work
        window.addEventListener( "load", completed );
    }




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
    var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
        var i = 0,
            len = elems.length,
            bulk = key == null;

        // Sets many values
        if ( jQuery.type( key ) === "object" ) {
            chainable = true;
            for ( i in key ) {
                access( elems, fn, i, key[ i ], true, emptyGet, raw );
            }

            // Sets one value
        } else if ( value !== undefined ) {
            chainable = true;

            if ( !jQuery.isFunction( value ) ) {
                raw = true;
            }

            if ( bulk ) {

                // Bulk operations run against the entire set
                if ( raw ) {
                    fn.call( elems, value );
                    fn = null;

                    // ...except when executing function values
                } else {
                    bulk = fn;
                    fn = function( elem, key, value ) {
                        return bulk.call( jQuery( elem ), value );
                    };
                }
            }

            if ( fn ) {
                for ( ; i < len; i++ ) {
                    fn(
                        elems[ i ], key, raw ?
                            value :
                            value.call( elems[ i ], i, fn( elems[ i ], key ) )
                    );
                }
            }
        }

        if ( chainable ) {
            return elems;
        }

        // Gets
        if ( bulk ) {
            return fn.call( elems );
        }

        return len ? fn( elems[ 0 ], key ) : emptyGet;
    };
    var acceptData = function( owner ) {

        // Accepts only:
        //  - Node
        //    - Node.ELEMENT_NODE
        //    - Node.DOCUMENT_NODE
        //  - Object
        //    - Any
        return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
    };




    function Data() {
        this.expando = jQuery.expando + Data.uid++;
    }

    Data.uid = 1;

    Data.prototype = {

        cache: function( owner ) {

            // Check if the owner object already has a cache
            var value = owner[ this.expando ];

            // If not, create one
            if ( !value ) {
                value = {};

                // We can accept data for non-element nodes in modern browsers,
                // but we should not, see #8335.
                // Always return an empty object.
                if ( acceptData( owner ) ) {

                    // If it is a node unlikely to be stringify-ed or looped over
                    // use plain assignment
                    if ( owner.nodeType ) {
                        owner[ this.expando ] = value;

                        // Otherwise secure it in a non-enumerable property
                        // configurable must be true to allow the property to be
                        // deleted when data is removed
                    } else {
                        Object.defineProperty( owner, this.expando, {
                            value: value,
                            configurable: true
                        } );
                    }
                }
            }

            return value;
        },
        set: function( owner, data, value ) {
            var prop,
                cache = this.cache( owner );

            // Handle: [ owner, key, value ] args
            // Always use camelCase key (gh-2257)
            if ( typeof data === "string" ) {
                cache[ jQuery.camelCase( data ) ] = value;

                // Handle: [ owner, { properties } ] args
            } else {

                // Copy the properties one-by-one to the cache object
                for ( prop in data ) {
                    cache[ jQuery.camelCase( prop ) ] = data[ prop ];
                }
            }
            return cache;
        },
        get: function( owner, key ) {
            return key === undefined ?
                this.cache( owner ) :

                // Always use camelCase key (gh-2257)
                owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
        },
        access: function( owner, key, value ) {

            // In cases where either:
            //
            //   1. No key was specified
            //   2. A string key was specified, but no value provided
            //
            // Take the "read" path and allow the get method to determine
            // which value to return, respectively either:
            //
            //   1. The entire cache object
            //   2. The data stored at the key
            //
            if ( key === undefined ||
                ( ( key && typeof key === "string" ) && value === undefined ) ) {

                return this.get( owner, key );
            }

            // When the key is not a string, or both a key and value
            // are specified, set or extend (existing objects) with either:
            //
            //   1. An object of properties
            //   2. A key and value
            //
            this.set( owner, key, value );

            // Since the "set" path can have two possible entry points
            // return the expected data based on which path was taken[*]
            return value !== undefined ? value : key;
        },
        remove: function( owner, key ) {
            var i,
                cache = owner[ this.expando ];

            if ( cache === undefined ) {
                return;
            }

            if ( key !== undefined ) {

                // Support array or space separated string of keys
                if ( Array.isArray( key ) ) {

                    // If key is an array of keys...
                    // We always set camelCase keys, so remove that.
                    key = key.map( jQuery.camelCase );
                } else {
                    key = jQuery.camelCase( key );

                    // If a key with the spaces exists, use it.
                    // Otherwise, create an array by matching non-whitespace
                    key = key in cache ?
                        [ key ] :
                        ( key.match( rnothtmlwhite ) || [] );
                }

                i = key.length;

                while ( i-- ) {
                    delete cache[ key[ i ] ];
                }
            }

            // Remove the expando if there's no more data
            if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

                // Support: Chrome <=35 - 45
                // Webkit & Blink performance suffers when deleting properties
                // from DOM nodes, so set to undefined instead
                // https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
                if ( owner.nodeType ) {
                    owner[ this.expando ] = undefined;
                } else {
                    delete owner[ this.expando ];
                }
            }
        },
        hasData: function( owner ) {
            var cache = owner[ this.expando ];
            return cache !== undefined && !jQuery.isEmptyObject( cache );
        }
    };
    var dataPriv = new Data();

    var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        rmultiDash = /[A-Z]/g;

    function getData( data ) {
        if ( data === "true" ) {
            return true;
        }

        if ( data === "false" ) {
            return false;
        }

        if ( data === "null" ) {
            return null;
        }

        // Only convert to a number if it doesn't change the string
        if ( data === +data + "" ) {
            return +data;
        }

        if ( rbrace.test( data ) ) {
            return JSON.parse( data );
        }

        return data;
    }

    function dataAttr( elem, key, data ) {
        var name;

        // If nothing was found internally, try to fetch any
        // data from the HTML5 data-* attribute
        if ( data === undefined && elem.nodeType === 1 ) {
            name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
            data = elem.getAttribute( name );

            if ( typeof data === "string" ) {
                try {
                    data = getData( data );
                } catch ( e ) {}

                // Make sure we set the data so it isn't changed later
                dataUser.set( elem, key, data );
            } else {
                data = undefined;
            }
        }
        return data;
    }

    jQuery.extend( {
        hasData: function( elem ) {
            return dataUser.hasData( elem ) || dataPriv.hasData( elem );
        },

        data: function( elem, name, data ) {
            return dataUser.access( elem, name, data );
        },

        removeData: function( elem, name ) {
            dataUser.remove( elem, name );
        },

        // TODO: Now that all calls to _data and _removeData have been replaced
        // with direct calls to dataPriv methods, these can be deprecated.
        _data: function( elem, name, data ) {
            return dataPriv.access( elem, name, data );
        },

        _removeData: function( elem, name ) {
            dataPriv.remove( elem, name );
        }
    } );

    jQuery.fn.extend( {
        data: function( key, value ) {
            var i, name, data,
                elem = this[ 0 ],
                attrs = elem && elem.attributes;

            // Gets all values
            if ( key === undefined ) {
                if ( this.length ) {
                    data = dataUser.get( elem );

                    if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
                        i = attrs.length;
                        while ( i-- ) {

                            // Support: IE 11 only
                            // The attrs elements can be null (#14894)
                            if ( attrs[ i ] ) {
                                name = attrs[ i ].name;
                                if ( name.indexOf( "data-" ) === 0 ) {
                                    name = jQuery.camelCase( name.slice( 5 ) );
                                    dataAttr( elem, name, data[ name ] );
                                }
                            }
                        }
                        dataPriv.set( elem, "hasDataAttrs", true );
                    }
                }

                return data;
            }

            // Sets multiple values
            if ( typeof key === "object" ) {
                return this.each( function() {
                    dataUser.set( this, key );
                } );
            }

            return access( this, function( value ) {
                var data;

                // The calling jQuery object (element matches) is not empty
                // (and therefore has an element appears at this[ 0 ]) and the
                // `value` parameter was not undefined. An empty jQuery object
                // will result in `undefined` for elem = this[ 0 ] which will
                // throw an exception if an attempt to read a data cache is made.
                if ( elem && value === undefined ) {

                    // Attempt to get data from the cache
                    // The key will always be camelCased in Data
                    data = dataUser.get( elem, key );
                    if ( data !== undefined ) {
                        return data;
                    }

                    // Attempt to "discover" the data in
                    // HTML5 custom data-* attrs
                    data = dataAttr( elem, key );
                    if ( data !== undefined ) {
                        return data;
                    }

                    // We tried really hard, but the data doesn't exist.
                    return;
                }

                // Set the data...
                this.each( function() {

                    // We always store the camelCased key
                    dataUser.set( this, key, value );
                } );
            }, null, value, arguments.length > 1, null, true );
        },

        removeData: function( key ) {
            return this.each( function() {
                dataUser.remove( this, key );
            } );
        }
    } );


    jQuery.extend( {
        queue: function( elem, type, data ) {
            var queue;

            if ( elem ) {
                type = ( type || "fx" ) + "queue";
                queue = dataPriv.get( elem, type );

                // Speed up dequeue by getting out quickly if this is just a lookup
                if ( data ) {
                    if ( !queue || Array.isArray( data ) ) {
                        queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
                    } else {
                        queue.push( data );
                    }
                }
                return queue || [];
            }
        },

        dequeue: function( elem, type ) {
            type = type || "fx";

            var queue = jQuery.queue( elem, type ),
                startLength = queue.length,
                fn = queue.shift(),
                hooks = jQuery._queueHooks( elem, type ),
                next = function() {
                    jQuery.dequeue( elem, type );
                };

            // If the fx queue is dequeued, always remove the progress sentinel
            if ( fn === "inprogress" ) {
                fn = queue.shift();
                startLength--;
            }

            if ( fn ) {

                // Add a progress sentinel to prevent the fx queue from being
                // automatically dequeued
                if ( type === "fx" ) {
                    queue.unshift( "inprogress" );
                }

                // Clear up the last queue stop function
                delete hooks.stop;
                fn.call( elem, next, hooks );
            }

            if ( !startLength && hooks ) {
                hooks.empty.fire();
            }
        },

        // Not public - generate a queueHooks object, or return the current one
        _queueHooks: function( elem, type ) {
            var key = type + "queueHooks";
            return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
                    empty: jQuery.Callbacks( "once memory" ).add( function() {
                        dataPriv.remove( elem, [ type + "queue", key ] );
                    } )
                } );
        }
    } );

    jQuery.fn.extend( {
        queue: function( type, data ) {
            var setter = 2;

            if ( typeof type !== "string" ) {
                data = type;
                type = "fx";
                setter--;
            }

            if ( arguments.length < setter ) {
                return jQuery.queue( this[ 0 ], type );
            }

            return data === undefined ?
                this :
                this.each( function() {
                    var queue = jQuery.queue( this, type, data );

                    // Ensure a hooks for this queue
                    jQuery._queueHooks( this, type );

                    if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
                        jQuery.dequeue( this, type );
                    }
                } );
        },
        dequeue: function( type ) {
            return this.each( function() {
                jQuery.dequeue( this, type );
            } );
        },
        clearQueue: function( type ) {
            return this.queue( type || "fx", [] );
        },

        // Get a promise resolved when queues of a certain type
        // are emptied (fx is the type by default)
        promise: function( type, obj ) {
            var tmp,
                count = 1,
                defer = jQuery.Deferred(),
                elements = this,
                i = this.length,
                resolve = function() {
                    if ( !( --count ) ) {
                        defer.resolveWith( elements, [ elements ] );
                    }
                };

            if ( typeof type !== "string" ) {
                obj = type;
                type = undefined;
            }
            type = type || "fx";

            while ( i-- ) {
                tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
                if ( tmp && tmp.empty ) {
                    count++;
                    tmp.empty.add( resolve );
                }
            }
            resolve();
            return defer.promise( obj );
        }
    } );
    var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

    var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


    var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

    var isHiddenWithinTree = function( elem, el ) {

        // isHiddenWithinTree might be called from jQuery#filter function;
        // in that case, element will be second argument
        elem = el || elem;

        // Inline style trumps all
        return elem.style.display === "none" ||
            elem.style.display === "" &&

            // Otherwise, check computed style
            // Support: Firefox <=43 - 45
            // Disconnected elements can have computed display: none, so first confirm that elem is
            // in the document.
            jQuery.contains( elem.ownerDocument, elem ) &&

            jQuery.css( elem, "display" ) === "none";
    };

    var swap = function( elem, options, callback, args ) {
        var ret, name,
            old = {};

        // Remember the old values, and insert the new ones
        for ( name in options ) {
            old[ name ] = elem.style[ name ];
            elem.style[ name ] = options[ name ];
        }

        ret = callback.apply( elem, args || [] );

        // Revert the old values
        for ( name in options ) {
            elem.style[ name ] = old[ name ];
        }

        return ret;
    };




    function adjustCSS( elem, prop, valueParts, tween ) {
        var adjusted,
            scale = 1,
            maxIterations = 20,
            currentValue = tween ?
                function() {
                    return tween.cur();
                } :
                function() {
                    return jQuery.css( elem, prop, "" );
                },
            initial = currentValue(),
            unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

            // Starting value computation is required for potential unit mismatches
            initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
                rcssNum.exec( jQuery.css( elem, prop ) );

        if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

            // Trust units reported by jQuery.css
            unit = unit || initialInUnit[ 3 ];

            // Make sure we update the tween properties later on
            valueParts = valueParts || [];

            // Iteratively approximate from a nonzero starting point
            initialInUnit = +initial || 1;

            do {

                // If previous iteration zeroed out, double until we get *something*.
                // Use string for doubling so we don't accidentally see scale as unchanged below
                scale = scale || ".5";

                // Adjust and apply
                initialInUnit = initialInUnit / scale;
                jQuery.style( elem, prop, initialInUnit + unit );

                // Update scale, tolerating zero or NaN from tween.cur()
                // Break the loop if scale is unchanged or perfect, or if we've just had enough.
            } while (
            scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
                );
        }

        if ( valueParts ) {
            initialInUnit = +initialInUnit || +initial || 0;

            // Apply relative offset (+=/-=) if specified
            adjusted = valueParts[ 1 ] ?
                initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
                +valueParts[ 2 ];
            if ( tween ) {
                tween.unit = unit;
                tween.start = initialInUnit;
                tween.end = adjusted;
            }
        }
        return adjusted;
    }


    var defaultDisplayMap = {};

    function getDefaultDisplay( elem ) {
        var temp,
            doc = elem.ownerDocument,
            nodeName = elem.nodeName,
            display = defaultDisplayMap[ nodeName ];

        if ( display ) {
            return display;
        }

        temp = doc.body.appendChild( doc.createElement( nodeName ) );
        display = jQuery.css( temp, "display" );

        temp.parentNode.removeChild( temp );

        if ( display === "none" ) {
            display = "block";
        }
        defaultDisplayMap[ nodeName ] = display;

        return display;
    }

    function showHide( elements, show ) {
        var display, elem,
            values = [],
            index = 0,
            length = elements.length;

        // Determine new display value for elements that need to change
        for ( ; index < length; index++ ) {
            elem = elements[ index ];
            if ( !elem.style ) {
                continue;
            }

            display = elem.style.display;
            if ( show ) {

                // Since we force visibility upon cascade-hidden elements, an immediate (and slow)
                // check is required in this first loop unless we have a nonempty display value (either
                // inline or about-to-be-restored)
                if ( display === "none" ) {
                    values[ index ] = dataPriv.get( elem, "display" ) || null;
                    if ( !values[ index ] ) {
                        elem.style.display = "";
                    }
                }
                if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
                    values[ index ] = getDefaultDisplay( elem );
                }
            } else {
                if ( display !== "none" ) {
                    values[ index ] = "none";

                    // Remember what we're overwriting
                    dataPriv.set( elem, "display", display );
                }
            }
        }

        // Set the display of the elements in a second loop to avoid constant reflow
        for ( index = 0; index < length; index++ ) {
            if ( values[ index ] != null ) {
                elements[ index ].style.display = values[ index ];
            }
        }

        return elements;
    }

    jQuery.fn.extend( {
        show: function() {
            return showHide( this, true );
        },
        hide: function() {
            return showHide( this );
        },
        toggle: function( state ) {
            if ( typeof state === "boolean" ) {
                return state ? this.show() : this.hide();
            }

            return this.each( function() {
                if ( isHiddenWithinTree( this ) ) {
                    jQuery( this ).show();
                } else {
                    jQuery( this ).hide();
                }
            } );
        }
    } );
    var rcheckableType = ( /^(?:checkbox|radio)$/i );

    var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

    var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
    var wrapMap = {

        // Support: IE <=9 only
        option: [ 1, "<select multiple='multiple'>", "</select>" ],

        // XHTML parsers do not magically insert elements in the
        // same way that tag soup parsers do. So we cannot shorten
        // this by omitting <tbody> or other required elements.
        thead: [ 1, "<table>", "</table>" ],
        col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

        _default: [ 0, "", "" ]
    };

// Support: IE <=9 only
    wrapMap.optgroup = wrapMap.option;

    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;


    function getAll( context, tag ) {

        // Support: IE <=9 - 11 only
        // Use typeof to avoid zero-argument method invocation on host objects (#15151)
        var ret;

        if ( typeof context.getElementsByTagName !== "undefined" ) {
            ret = context.getElementsByTagName( tag || "*" );

        } else if ( typeof context.querySelectorAll !== "undefined" ) {
            ret = context.querySelectorAll( tag || "*" );

        } else {
            ret = [];
        }

        if ( tag === undefined || tag && nodeName( context, tag ) ) {
            return jQuery.merge( [ context ], ret );
        }

        return ret;
    }


// Mark scripts as having already been evaluated
    function setGlobalEval( elems, refElements ) {
        var i = 0,
            l = elems.length;

        for ( ; i < l; i++ ) {
            dataPriv.set(
                elems[ i ],
                "globalEval",
                !refElements || dataPriv.get( refElements[ i ], "globalEval" )
            );
        }
    }


    var rhtml = /<|&#?\w+;/;

    function buildFragment( elems, context, scripts, selection, ignored ) {
        var elem, tmp, tag, wrap, contains, j,
            fragment = context.createDocumentFragment(),
            nodes = [],
            i = 0,
            l = elems.length;

        for ( ; i < l; i++ ) {
            elem = elems[ i ];

            if ( elem || elem === 0 ) {

                // Add nodes directly
                if ( jQuery.type( elem ) === "object" ) {

                    // Support: Android <=4.0 only, PhantomJS 1 only
                    // push.apply(_, arraylike) throws on ancient WebKit
                    jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

                    // Convert non-html into a text node
                } else if ( !rhtml.test( elem ) ) {
                    nodes.push( context.createTextNode( elem ) );

                    // Convert html into DOM nodes
                } else {
                    tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

                    // Deserialize a standard representation
                    tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
                    wrap = wrapMap[ tag ] || wrapMap._default;
                    tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

                    // Descend through wrappers to the right content
                    j = wrap[ 0 ];
                    while ( j-- ) {
                        tmp = tmp.lastChild;
                    }

                    // Support: Android <=4.0 only, PhantomJS 1 only
                    // push.apply(_, arraylike) throws on ancient WebKit
                    jQuery.merge( nodes, tmp.childNodes );

                    // Remember the top-level container
                    tmp = fragment.firstChild;

                    // Ensure the created nodes are orphaned (#12392)
                    tmp.textContent = "";
                }
            }
        }

        // Remove wrapper from fragment
        fragment.textContent = "";

        i = 0;
        while ( ( elem = nodes[ i++ ] ) ) {

            // Skip elements already in the context collection (trac-4087)
            if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
                if ( ignored ) {
                    ignored.push( elem );
                }
                continue;
            }

            contains = jQuery.contains( elem.ownerDocument, elem );

            // Append to fragment
            tmp = getAll( fragment.appendChild( elem ), "script" );

            // Preserve script evaluation history
            if ( contains ) {
                setGlobalEval( tmp );
            }

            // Capture executables
            if ( scripts ) {
                j = 0;
                while ( ( elem = tmp[ j++ ] ) ) {
                    if ( rscriptType.test( elem.type || "" ) ) {
                        scripts.push( elem );
                    }
                }
            }
        }

        return fragment;
    }


    ( function() {
        var fragment = document.createDocumentFragment(),
            div = fragment.appendChild( document.createElement( "div" ) ),
            input = document.createElement( "input" );

        // Support: Android 4.0 - 4.3 only
        // Check state lost if the name is set (#11217)
        // Support: Windows Web Apps (WWA)
        // `name` and `type` must use .setAttribute for WWA (#14901)
        input.setAttribute( "type", "radio" );
        input.setAttribute( "checked", "checked" );
        input.setAttribute( "name", "t" );

        div.appendChild( input );

        // Support: Android <=4.1 only
        // Older WebKit doesn't clone checked state correctly in fragments
        support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

        // Support: IE <=11 only
        // Make sure textarea (and checkbox) defaultValue is properly cloned
        div.innerHTML = "<textarea>x</textarea>";
        support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
    } )();
    var documentElement = document.documentElement;



    var
        rkeyEvent = /^key/,
        rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

    function returnTrue() {
        return true;
    }

    function returnFalse() {
        return false;
    }

// Support: IE <=9 only
// See #13393 for more info
    function safeActiveElement() {
        try {
            return document.activeElement;
        } catch ( err ) { }
    }

    function on( elem, types, selector, data, fn, one ) {
        var origFn, type;

        // Types can be a map of types/handlers
        if ( typeof types === "object" ) {

            // ( types-Object, selector, data )
            if ( typeof selector !== "string" ) {

                // ( types-Object, data )
                data = data || selector;
                selector = undefined;
            }
            for ( type in types ) {
                on( elem, type, selector, data, types[ type ], one );
            }
            return elem;
        }

        if ( data == null && fn == null ) {

            // ( types, fn )
            fn = selector;
            data = selector = undefined;
        } else if ( fn == null ) {
            if ( typeof selector === "string" ) {

                // ( types, selector, fn )
                fn = data;
                data = undefined;
            } else {

                // ( types, data, fn )
                fn = data;
                data = selector;
                selector = undefined;
            }
        }
        if ( fn === false ) {
            fn = returnFalse;
        } else if ( !fn ) {
            return elem;
        }

        if ( one === 1 ) {
            origFn = fn;
            fn = function( event ) {

                // Can use an empty set, since event contains the info
                jQuery().off( event );
                return origFn.apply( this, arguments );
            };

            // Use same guid so caller can remove using origFn
            fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
        }
        return elem.each( function() {
            jQuery.event.add( this, types, fn, data, selector );
        } );
    }

    /*
     * Helper functions for managing events -- not part of the public interface.
     * Props to Dean Edwards' addEvent library for many of the ideas.
     */
    jQuery.event = {

        global: {},

        add: function( elem, types, handler, data, selector ) {

            var handleObjIn, eventHandle, tmp,
                events, t, handleObj,
                special, handlers, type, namespaces, origType,
                elemData = dataPriv.get( elem );

            // Don't attach events to noData or text/comment nodes (but allow plain objects)
            if ( !elemData ) {
                return;
            }

            // Caller can pass in an object of custom data in lieu of the handler
            if ( handler.handler ) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
                selector = handleObjIn.selector;
            }

            // Ensure that invalid selectors throw exceptions at attach time
            // Evaluate against documentElement in case elem is a non-element node (e.g., document)
            if ( selector ) {
                jQuery.find.matchesSelector( documentElement, selector );
            }

            // Make sure that the handler has a unique ID, used to find/remove it later
            if ( !handler.guid ) {
                handler.guid = jQuery.guid++;
            }

            // Init the element's event structure and main handler, if this is the first
            if ( !( events = elemData.events ) ) {
                events = elemData.events = {};
            }
            if ( !( eventHandle = elemData.handle ) ) {
                eventHandle = elemData.handle = function( e ) {

                    // Discard the second event of a jQuery.event.trigger() and
                    // when an event is called after a page has unloaded
                    return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
                        jQuery.event.dispatch.apply( elem, arguments ) : undefined;
                };
            }

            // Handle multiple events separated by a space
            types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
            t = types.length;
            while ( t-- ) {
                tmp = rtypenamespace.exec( types[ t ] ) || [];
                type = origType = tmp[ 1 ];
                namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

                // There *must* be a type, no attaching namespace-only handlers
                if ( !type ) {
                    continue;
                }

                // If event changes its type, use the special event handlers for the changed type
                special = jQuery.event.special[ type ] || {};

                // If selector defined, determine special event api type, otherwise given type
                type = ( selector ? special.delegateType : special.bindType ) || type;

                // Update special based on newly reset type
                special = jQuery.event.special[ type ] || {};

                // handleObj is passed to all event handlers
                handleObj = jQuery.extend( {
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
                    namespace: namespaces.join( "." )
                }, handleObjIn );

                // Init the event handler queue if we're the first
                if ( !( handlers = events[ type ] ) ) {
                    handlers = events[ type ] = [];
                    handlers.delegateCount = 0;

                    // Only use addEventListener if the special events handler returns false
                    if ( !special.setup ||
                        special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

                        if ( elem.addEventListener ) {
                            elem.addEventListener( type, eventHandle );
                        }
                    }
                }

                if ( special.add ) {
                    special.add.call( elem, handleObj );

                    if ( !handleObj.handler.guid ) {
                        handleObj.handler.guid = handler.guid;
                    }
                }

                // Add to the element's handler list, delegates in front
                if ( selector ) {
                    handlers.splice( handlers.delegateCount++, 0, handleObj );
                } else {
                    handlers.push( handleObj );
                }

                // Keep track of which events have ever been used, for event optimization
                jQuery.event.global[ type ] = true;
            }

        },

        // Detach an event or set of events from an element
        remove: function( elem, types, handler, selector, mappedTypes ) {

            var j, origCount, tmp,
                events, t, handleObj,
                special, handlers, type, namespaces, origType,
                elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

            if ( !elemData || !( events = elemData.events ) ) {
                return;
            }

            // Once for each type.namespace in types; type may be omitted
            types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
            t = types.length;
            while ( t-- ) {
                tmp = rtypenamespace.exec( types[ t ] ) || [];
                type = origType = tmp[ 1 ];
                namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

                // Unbind all events (on this namespace, if provided) for the element
                if ( !type ) {
                    for ( type in events ) {
                        jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
                    }
                    continue;
                }

                special = jQuery.event.special[ type ] || {};
                type = ( selector ? special.delegateType : special.bindType ) || type;
                handlers = events[ type ] || [];
                tmp = tmp[ 2 ] &&
                    new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

                // Remove matching events
                origCount = j = handlers.length;
                while ( j-- ) {
                    handleObj = handlers[ j ];

                    if ( ( mappedTypes || origType === handleObj.origType ) &&
                        ( !handler || handler.guid === handleObj.guid ) &&
                        ( !tmp || tmp.test( handleObj.namespace ) ) &&
                        ( !selector || selector === handleObj.selector ||
                        selector === "**" && handleObj.selector ) ) {
                        handlers.splice( j, 1 );

                        if ( handleObj.selector ) {
                            handlers.delegateCount--;
                        }
                        if ( special.remove ) {
                            special.remove.call( elem, handleObj );
                        }
                    }
                }

                // Remove generic event handler if we removed something and no more handlers exist
                // (avoids potential for endless recursion during removal of special event handlers)
                if ( origCount && !handlers.length ) {
                    if ( !special.teardown ||
                        special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

                        jQuery.removeEvent( elem, type, elemData.handle );
                    }

                    delete events[ type ];
                }
            }

            // Remove data and the expando if it's no longer used
            if ( jQuery.isEmptyObject( events ) ) {
                dataPriv.remove( elem, "handle events" );
            }
        },

        dispatch: function( nativeEvent ) {

            // Make a writable jQuery.Event from the native event object
            var event = jQuery.event.fix( nativeEvent );

            var i, j, ret, matched, handleObj, handlerQueue,
                args = new Array( arguments.length ),
                handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
                special = jQuery.event.special[ event.type ] || {};

            // Use the fix-ed jQuery.Event rather than the (read-only) native event
            args[ 0 ] = event;

            for ( i = 1; i < arguments.length; i++ ) {
                args[ i ] = arguments[ i ];
            }

            event.delegateTarget = this;

            // Call the preDispatch hook for the mapped type, and let it bail if desired
            if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
                return;
            }

            // Determine handlers
            handlerQueue = jQuery.event.handlers.call( this, event, handlers );

            // Run delegates first; they may want to stop propagation beneath us
            i = 0;
            while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
                event.currentTarget = matched.elem;

                j = 0;
                while ( ( handleObj = matched.handlers[ j++ ] ) &&
                !event.isImmediatePropagationStopped() ) {

                    // Triggered event must either 1) have no namespace, or 2) have namespace(s)
                    // a subset or equal to those in the bound event (both can have no namespace).
                    if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

                        event.handleObj = handleObj;
                        event.data = handleObj.data;

                        ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
                        handleObj.handler ).apply( matched.elem, args );

                        if ( ret !== undefined ) {
                            if ( ( event.result = ret ) === false ) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        }
                    }
                }
            }

            // Call the postDispatch hook for the mapped type
            if ( special.postDispatch ) {
                special.postDispatch.call( this, event );
            }

            return event.result;
        },

        handlers: function( event, handlers ) {
            var i, handleObj, sel, matchedHandlers, matchedSelectors,
                handlerQueue = [],
                delegateCount = handlers.delegateCount,
                cur = event.target;

            // Find delegate handlers
            if ( delegateCount &&

                // Support: IE <=9
                // Black-hole SVG <use> instance trees (trac-13180)
                cur.nodeType &&

                // Support: Firefox <=42
                // Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
                // https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
                // Support: IE 11 only
                // ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
                !( event.type === "click" && event.button >= 1 ) ) {

                for ( ; cur !== this; cur = cur.parentNode || this ) {

                    // Don't check non-elements (#13208)
                    // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
                    if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
                        matchedHandlers = [];
                        matchedSelectors = {};
                        for ( i = 0; i < delegateCount; i++ ) {
                            handleObj = handlers[ i ];

                            // Don't conflict with Object.prototype properties (#13203)
                            sel = handleObj.selector + " ";

                            if ( matchedSelectors[ sel ] === undefined ) {
                                matchedSelectors[ sel ] = handleObj.needsContext ?
                                    jQuery( sel, this ).index( cur ) > -1 :
                                    jQuery.find( sel, this, null, [ cur ] ).length;
                            }
                            if ( matchedSelectors[ sel ] ) {
                                matchedHandlers.push( handleObj );
                            }
                        }
                        if ( matchedHandlers.length ) {
                            handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
                        }
                    }
                }
            }

            // Add the remaining (directly-bound) handlers
            cur = this;
            if ( delegateCount < handlers.length ) {
                handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
            }

            return handlerQueue;
        },

        addProp: function( name, hook ) {
            Object.defineProperty( jQuery.Event.prototype, name, {
                enumerable: true,
                configurable: true,

                get: jQuery.isFunction( hook ) ?
                    function() {
                        if ( this.originalEvent ) {
                            return hook( this.originalEvent );
                        }
                    } :
                    function() {
                        if ( this.originalEvent ) {
                            return this.originalEvent[ name ];
                        }
                    },

                set: function( value ) {
                    Object.defineProperty( this, name, {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: value
                    } );
                }
            } );
        },

        fix: function( originalEvent ) {
            return originalEvent[ jQuery.expando ] ?
                originalEvent :
                new jQuery.Event( originalEvent );
        },

        special: {
            load: {

                // Prevent triggered image.load events from bubbling to window.load
                noBubble: true
            },
            focus: {

                // Fire native event if possible so blur/focus sequence is correct
                trigger: function() {
                    if ( this !== safeActiveElement() && this.focus ) {
                        this.focus();
                        return false;
                    }
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if ( this === safeActiveElement() && this.blur ) {
                        this.blur();
                        return false;
                    }
                },
                delegateType: "focusout"
            },
            click: {

                // For checkable types, fire native event so checked state will be right
                trigger: function() {
                    if ( rcheckableType.test( this.type ) &&
                        this.click && nodeName( this, "input" ) ) {

                        this.click();
                        return false;
                    }
                },

                // For cross-browser consistency, don't fire native .click() on links
                _default: function( event ) {
                    return nodeName( event.target, "a" );
                }
            },

            beforeunload: {
                postDispatch: function( event ) {

                    // Support: Firefox 20+
                    // Firefox doesn't alert if the returnValue field is not set.
                    if ( event.result !== undefined && event.originalEvent ) {
                        event.originalEvent.returnValue = event.result;
                    }
                }
            }
        }
    };

    jQuery.removeEvent = function( elem, type, handle ) {

        // This "if" is needed for plain objects
        if ( elem.removeEventListener ) {
            elem.removeEventListener( type, handle );
        }
    };

    jQuery.Event = function( src, props ) {

        // Allow instantiation without the 'new' keyword
        if ( !( this instanceof jQuery.Event ) ) {
            return new jQuery.Event( src, props );
        }

        // Event object
        if ( src && src.type ) {
            this.originalEvent = src;
            this.type = src.type;

            // Events bubbling up the document may have been marked as prevented
            // by a handler lower down the tree; reflect the correct value.
            this.isDefaultPrevented = src.defaultPrevented ||
            src.defaultPrevented === undefined &&

            // Support: Android <=2.3 only
            src.returnValue === false ?
                returnTrue :
                returnFalse;

            // Create target properties
            // Support: Safari <=6 - 7 only
            // Target should not be a text node (#504, #13143)
            this.target = ( src.target && src.target.nodeType === 3 ) ?
                src.target.parentNode :
                src.target;

            this.currentTarget = src.currentTarget;
            this.relatedTarget = src.relatedTarget;

            // Event type
        } else {
            this.type = src;
        }

        // Put explicitly provided properties onto the event object
        if ( props ) {
            jQuery.extend( this, props );
        }

        // Create a timestamp if incoming event doesn't have one
        this.timeStamp = src && src.timeStamp || jQuery.now();

        // Mark it as fixed
        this[ jQuery.expando ] = true;
    };

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
    jQuery.Event.prototype = {
        constructor: jQuery.Event,
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        isSimulated: false,

        preventDefault: function() {
            var e = this.originalEvent;

            this.isDefaultPrevented = returnTrue;

            if ( e && !this.isSimulated ) {
                e.preventDefault();
            }
        },
        stopPropagation: function() {
            var e = this.originalEvent;

            this.isPropagationStopped = returnTrue;

            if ( e && !this.isSimulated ) {
                e.stopPropagation();
            }
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;

            this.isImmediatePropagationStopped = returnTrue;

            if ( e && !this.isSimulated ) {
                e.stopImmediatePropagation();
            }

            this.stopPropagation();
        }
    };

// Includes all common event props including KeyEvent and MouseEvent specific props
    jQuery.each( {
        altKey: true,
        bubbles: true,
        cancelable: true,
        changedTouches: true,
        ctrlKey: true,
        detail: true,
        eventPhase: true,
        metaKey: true,
        pageX: true,
        pageY: true,
        shiftKey: true,
        view: true,
        "char": true,
        charCode: true,
        key: true,
        keyCode: true,
        button: true,
        buttons: true,
        clientX: true,
        clientY: true,
        offsetX: true,
        offsetY: true,
        pointerId: true,
        pointerType: true,
        screenX: true,
        screenY: true,
        targetTouches: true,
        toElement: true,
        touches: true,

        which: function( event ) {
            var button = event.button;

            // Add which for key events
            if ( event.which == null && rkeyEvent.test( event.type ) ) {
                return event.charCode != null ? event.charCode : event.keyCode;
            }

            // Add which for click: 1 === left; 2 === middle; 3 === right
            if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
                if ( button & 1 ) {
                    return 1;
                }

                if ( button & 2 ) {
                    return 3;
                }

                if ( button & 4 ) {
                    return 2;
                }

                return 0;
            }

            return event.which;
        }
    }, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
    jQuery.each( {
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function( orig, fix ) {
        jQuery.event.special[ orig ] = {
            delegateType: fix,
            bindType: fix,

            handle: function( event ) {
                var ret,
                    target = this,
                    related = event.relatedTarget,
                    handleObj = event.handleObj;

                // For mouseenter/leave call the handler if related is outside the target.
                // NB: No relatedTarget if the mouse left/entered the browser window
                if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
                    event.type = handleObj.origType;
                    ret = handleObj.handler.apply( this, arguments );
                    event.type = fix;
                }
                return ret;
            }
        };
    } );

    jQuery.fn.extend( {

        on: function( types, selector, data, fn ) {
            return on( this, types, selector, data, fn );
        },
        one: function( types, selector, data, fn ) {
            return on( this, types, selector, data, fn, 1 );
        },
        off: function( types, selector, fn ) {
            var handleObj, type;
            if ( types && types.preventDefault && types.handleObj ) {

                // ( event )  dispatched jQuery.Event
                handleObj = types.handleObj;
                jQuery( types.delegateTarget ).off(
                    handleObj.namespace ?
                        handleObj.origType + "." + handleObj.namespace :
                        handleObj.origType,
                    handleObj.selector,
                    handleObj.handler
                );
                return this;
            }
            if ( typeof types === "object" ) {

                // ( types-object [, selector] )
                for ( type in types ) {
                    this.off( type, selector, types[ type ] );
                }
                return this;
            }
            if ( selector === false || typeof selector === "function" ) {

                // ( types [, fn] )
                fn = selector;
                selector = undefined;
            }
            if ( fn === false ) {
                fn = returnFalse;
            }
            return this.each( function() {
                jQuery.event.remove( this, types, fn, selector );
            } );
        }
    } );


    var

        /* eslint-disable max-len */

        // See https://github.com/eslint/eslint/issues/3229
        rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

        /* eslint-enable */

        // Support: IE <=10 - 11, Edge 12 - 13
        // In IE/Edge using regex groups here causes severe slowdowns.
        // See https://connect.microsoft.com/IE/feedback/details/1736512/
        rnoInnerhtml = /<script|<style|<link/i,

        // checked="checked" or checked
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
        rscriptTypeMasked = /^true\/(.*)/,
        rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
    function manipulationTarget( elem, content ) {
        if ( nodeName( elem, "table" ) &&
            nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

            return jQuery( ">tbody", elem )[ 0 ] || elem;
        }

        return elem;
    }

// Replace/restore the type attribute of script elements for safe DOM manipulation
    function disableScript( elem ) {
        elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
        return elem;
    }
    function restoreScript( elem ) {
        var match = rscriptTypeMasked.exec( elem.type );

        if ( match ) {
            elem.type = match[ 1 ];
        } else {
            elem.removeAttribute( "type" );
        }

        return elem;
    }

    function cloneCopyEvent( src, dest ) {
        var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

        if ( dest.nodeType !== 1 ) {
            return;
        }

        // 1. Copy private data: events, handlers, etc.
        if ( dataPriv.hasData( src ) ) {
            pdataOld = dataPriv.access( src );
            pdataCur = dataPriv.set( dest, pdataOld );
            events = pdataOld.events;

            if ( events ) {
                delete pdataCur.handle;
                pdataCur.events = {};

                for ( type in events ) {
                    for ( i = 0, l = events[ type ].length; i < l; i++ ) {
                        jQuery.event.add( dest, type, events[ type ][ i ] );
                    }
                }
            }
        }

        // 2. Copy user data
        if ( dataUser.hasData( src ) ) {
            udataOld = dataUser.access( src );
            udataCur = jQuery.extend( {}, udataOld );

            dataUser.set( dest, udataCur );
        }
    }

// Fix IE bugs, see support tests
    function fixInput( src, dest ) {
        var nodeName = dest.nodeName.toLowerCase();

        // Fails to persist the checked state of a cloned checkbox or radio button.
        if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
            dest.checked = src.checked;

            // Fails to return the selected option to the default selected state when cloning options
        } else if ( nodeName === "input" || nodeName === "textarea" ) {
            dest.defaultValue = src.defaultValue;
        }
    }

    function domManip( collection, args, callback, ignored ) {

        // Flatten any nested arrays
        args = concat.apply( [], args );

        var fragment, first, scripts, hasScripts, node, doc,
            i = 0,
            l = collection.length,
            iNoClone = l - 1,
            value = args[ 0 ],
            isFunction = jQuery.isFunction( value );

        // We can't cloneNode fragments that contain checked, in WebKit
        if ( isFunction ||
            ( l > 1 && typeof value === "string" &&
            !support.checkClone && rchecked.test( value ) ) ) {
            return collection.each( function( index ) {
                var self = collection.eq( index );
                if ( isFunction ) {
                    args[ 0 ] = value.call( this, index, self.html() );
                }
                domManip( self, args, callback, ignored );
            } );
        }

        if ( l ) {
            fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
            first = fragment.firstChild;

            if ( fragment.childNodes.length === 1 ) {
                fragment = first;
            }

            // Require either new content or an interest in ignored elements to invoke the callback
            if ( first || ignored ) {
                scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
                hasScripts = scripts.length;

                // Use the original fragment for the last item
                // instead of the first because it can end up
                // being emptied incorrectly in certain situations (#8070).
                for ( ; i < l; i++ ) {
                    node = fragment;

                    if ( i !== iNoClone ) {
                        node = jQuery.clone( node, true, true );

                        // Keep references to cloned scripts for later restoration
                        if ( hasScripts ) {

                            // Support: Android <=4.0 only, PhantomJS 1 only
                            // push.apply(_, arraylike) throws on ancient WebKit
                            jQuery.merge( scripts, getAll( node, "script" ) );
                        }
                    }

                    callback.call( collection[ i ], node, i );
                }

                if ( hasScripts ) {
                    doc = scripts[ scripts.length - 1 ].ownerDocument;

                    // Reenable scripts
                    jQuery.map( scripts, restoreScript );

                    // Evaluate executable scripts on first document insertion
                    for ( i = 0; i < hasScripts; i++ ) {
                        node = scripts[ i ];
                        if ( rscriptType.test( node.type || "" ) &&
                            !dataPriv.access( node, "globalEval" ) &&
                            jQuery.contains( doc, node ) ) {

                            if ( node.src ) {

                                // Optional AJAX dependency, but won't run scripts if not present
                                if ( jQuery._evalUrl ) {
                                    jQuery._evalUrl( node.src );
                                }
                            } else {
                                DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
                            }
                        }
                    }
                }
            }
        }

        return collection;
    }

    function remove( elem, selector, keepData ) {
        var node,
            nodes = selector ? jQuery.filter( selector, elem ) : elem,
            i = 0;

        for ( ; ( node = nodes[ i ] ) != null; i++ ) {
            if ( !keepData && node.nodeType === 1 ) {
                jQuery.cleanData( getAll( node ) );
            }

            if ( node.parentNode ) {
                if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
                    setGlobalEval( getAll( node, "script" ) );
                }
                node.parentNode.removeChild( node );
            }
        }

        return elem;
    }

    jQuery.extend( {
        htmlPrefilter: function( html ) {
            return html.replace( rxhtmlTag, "<$1></$2>" );
        },

        clone: function( elem, dataAndEvents, deepDataAndEvents ) {
            var i, l, srcElements, destElements,
                clone = elem.cloneNode( true ),
                inPage = jQuery.contains( elem.ownerDocument, elem );

            // Fix IE cloning issues
            if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
                !jQuery.isXMLDoc( elem ) ) {

                // We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
                destElements = getAll( clone );
                srcElements = getAll( elem );

                for ( i = 0, l = srcElements.length; i < l; i++ ) {
                    fixInput( srcElements[ i ], destElements[ i ] );
                }
            }

            // Copy the events from the original to the clone
            if ( dataAndEvents ) {
                if ( deepDataAndEvents ) {
                    srcElements = srcElements || getAll( elem );
                    destElements = destElements || getAll( clone );

                    for ( i = 0, l = srcElements.length; i < l; i++ ) {
                        cloneCopyEvent( srcElements[ i ], destElements[ i ] );
                    }
                } else {
                    cloneCopyEvent( elem, clone );
                }
            }

            // Preserve script evaluation history
            destElements = getAll( clone, "script" );
            if ( destElements.length > 0 ) {
                setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
            }

            // Return the cloned set
            return clone;
        },

        cleanData: function( elems ) {
            var data, elem, type,
                special = jQuery.event.special,
                i = 0;

            for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
                if ( acceptData( elem ) ) {
                    if ( ( data = elem[ dataPriv.expando ] ) ) {
                        if ( data.events ) {
                            for ( type in data.events ) {
                                if ( special[ type ] ) {
                                    jQuery.event.remove( elem, type );

                                    // This is a shortcut to avoid jQuery.event.remove's overhead
                                } else {
                                    jQuery.removeEvent( elem, type, data.handle );
                                }
                            }
                        }

                        // Support: Chrome <=35 - 45+
                        // Assign undefined instead of using delete, see Data#remove
                        elem[ dataPriv.expando ] = undefined;
                    }
                    if ( elem[ dataUser.expando ] ) {

                        // Support: Chrome <=35 - 45+
                        // Assign undefined instead of using delete, see Data#remove
                        elem[ dataUser.expando ] = undefined;
                    }
                }
            }
        }
    } );

    jQuery.fn.extend( {
        detach: function( selector ) {
            return remove( this, selector, true );
        },

        remove: function( selector ) {
            return remove( this, selector );
        },

        text: function( value ) {
            return access( this, function( value ) {
                return value === undefined ?
                    jQuery.text( this ) :
                    this.empty().each( function() {
                        if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
                            this.textContent = value;
                        }
                    } );
            }, null, value, arguments.length );
        },

        append: function() {
            return domManip( this, arguments, function( elem ) {
                if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
                    var target = manipulationTarget( this, elem );
                    target.appendChild( elem );
                }
            } );
        },

        prepend: function() {
            return domManip( this, arguments, function( elem ) {
                if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
                    var target = manipulationTarget( this, elem );
                    target.insertBefore( elem, target.firstChild );
                }
            } );
        },

        before: function() {
            return domManip( this, arguments, function( elem ) {
                if ( this.parentNode ) {
                    this.parentNode.insertBefore( elem, this );
                }
            } );
        },

        after: function() {
            return domManip( this, arguments, function( elem ) {
                if ( this.parentNode ) {
                    this.parentNode.insertBefore( elem, this.nextSibling );
                }
            } );
        },

        empty: function() {
            var elem,
                i = 0;

            for ( ; ( elem = this[ i ] ) != null; i++ ) {
                if ( elem.nodeType === 1 ) {

                    // Prevent memory leaks
                    jQuery.cleanData( getAll( elem, false ) );

                    // Remove any remaining nodes
                    elem.textContent = "";
                }
            }

            return this;
        },

        clone: function( dataAndEvents, deepDataAndEvents ) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

            return this.map( function() {
                return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
            } );
        },

        html: function( value ) {
            return access( this, function( value ) {
                var elem = this[ 0 ] || {},
                    i = 0,
                    l = this.length;

                if ( value === undefined && elem.nodeType === 1 ) {
                    return elem.innerHTML;
                }

                // See if we can take a shortcut and just use innerHTML
                if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
                    !wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

                    value = jQuery.htmlPrefilter( value );

                    try {
                        for ( ; i < l; i++ ) {
                            elem = this[ i ] || {};

                            // Remove element nodes and prevent memory leaks
                            if ( elem.nodeType === 1 ) {
                                jQuery.cleanData( getAll( elem, false ) );
                                elem.innerHTML = value;
                            }
                        }

                        elem = 0;

                        // If using innerHTML throws an exception, use the fallback method
                    } catch ( e ) {}
                }

                if ( elem ) {
                    this.empty().append( value );
                }
            }, null, value, arguments.length );
        },

        replaceWith: function() {
            var ignored = [];

            // Make the changes, replacing each non-ignored context element with the new content
            return domManip( this, arguments, function( elem ) {
                var parent = this.parentNode;

                if ( jQuery.inArray( this, ignored ) < 0 ) {
                    jQuery.cleanData( getAll( this ) );
                    if ( parent ) {
                        parent.replaceChild( elem, this );
                    }
                }

                // Force callback invocation
            }, ignored );
        }
    } );

    jQuery.each( {
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function( name, original ) {
        jQuery.fn[ name ] = function( selector ) {
            var elems,
                ret = [],
                insert = jQuery( selector ),
                last = insert.length - 1,
                i = 0;

            for ( ; i <= last; i++ ) {
                elems = i === last ? this : this.clone( true );
                jQuery( insert[ i ] )[ original ]( elems );

                // Support: Android <=4.0 only, PhantomJS 1 only
                // .get() because push.apply(_, arraylike) throws on ancient WebKit
                push.apply( ret, elems.get() );
            }

            return this.pushStack( ret );
        };
    } );
    var rmargin = ( /^margin/ );

    var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

    var getStyles = function( elem ) {

        // Support: IE <=11 only, Firefox <=30 (#15098, #14150)
        // IE throws on elements created in popups
        // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
        var view = elem.ownerDocument.defaultView;

        if ( !view || !view.opener ) {
            view = window;
        }

        return view.getComputedStyle( elem );
    };



    ( function() {

        // Executing both pixelPosition & boxSizingReliable tests require only one layout
        // so they're executed at the same time to save the second computation.
        function computeStyleTests() {

            // This is a singleton, we need to execute it only once
            if ( !div ) {
                return;
            }

            div.style.cssText =
                "box-sizing:border-box;" +
                "position:relative;display:block;" +
                "margin:auto;border:1px;padding:1px;" +
                "top:1%;width:50%";
            div.innerHTML = "";
            documentElement.appendChild( container );

            var divStyle = window.getComputedStyle( div );
            pixelPositionVal = divStyle.top !== "1%";

            // Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
            reliableMarginLeftVal = divStyle.marginLeft === "2px";
            boxSizingReliableVal = divStyle.width === "4px";

            // Support: Android 4.0 - 4.3 only
            // Some styles come back with percentage values, even though they shouldn't
            div.style.marginRight = "50%";
            pixelMarginRightVal = divStyle.marginRight === "4px";

            documentElement.removeChild( container );

            // Nullify the div so it wouldn't be stored in the memory and
            // it will also be a sign that checks already performed
            div = null;
        }

        var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
            container = document.createElement( "div" ),
            div = document.createElement( "div" );

        // Finish early in limited (non-browser) environments
        if ( !div.style ) {
            return;
        }

        // Support: IE <=9 - 11 only
        // Style of cloned element affects source element cloned (#8908)
        div.style.backgroundClip = "content-box";
        div.cloneNode( true ).style.backgroundClip = "";
        support.clearCloneStyle = div.style.backgroundClip === "content-box";

        container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
            "padding:0;margin-top:1px;position:absolute";
        container.appendChild( div );

        jQuery.extend( support, {
            pixelPosition: function() {
                computeStyleTests();
                return pixelPositionVal;
            },
            boxSizingReliable: function() {
                computeStyleTests();
                return boxSizingReliableVal;
            },
            pixelMarginRight: function() {
                computeStyleTests();
                return pixelMarginRightVal;
            },
            reliableMarginLeft: function() {
                computeStyleTests();
                return reliableMarginLeftVal;
            }
        } );
    } )();


    function curCSS( elem, name, computed ) {
        var width, minWidth, maxWidth, ret,
            style = elem.style;

        computed = computed || getStyles( elem );

        // getPropertyValue is needed for:
        //   .css('filter') (IE 9 only, #12537)
        //   .css('--customProperty) (#3144)
        if ( computed ) {
            ret = computed.getPropertyValue( name ) || computed[ name ];

            if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
                ret = jQuery.style( elem, name );
            }

            // A tribute to the "awesome hack by Dean Edwards"
            // Android Browser returns percentage for some values,
            // but width seems to be reliably pixels.
            // This is against the CSSOM draft spec:
            // https://drafts.csswg.org/cssom/#resolved-values
            if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

                // Remember the original values
                width = style.width;
                minWidth = style.minWidth;
                maxWidth = style.maxWidth;

                // Put in the new values to get a computed value out
                style.minWidth = style.maxWidth = style.width = ret;
                ret = computed.width;

                // Revert the changed values
                style.width = width;
                style.minWidth = minWidth;
                style.maxWidth = maxWidth;
            }
        }

        return ret !== undefined ?

            // Support: IE <=9 - 11 only
            // IE returns zIndex value as an integer.
            ret + "" :
            ret;
    }


    function addGetHookIf( conditionFn, hookFn ) {

        // Define the hook, we'll check on the first run if it's really needed.
        return {
            get: function() {
                if ( conditionFn() ) {

                    // Hook not needed (or it's not possible to use it due
                    // to missing dependency), remove it.
                    delete this.get;
                    return;
                }

                // Hook needed; redefine it so that the support test is not executed again.
                return ( this.get = hookFn ).apply( this, arguments );
            }
        };
    }


    var

        // Swappable if display is none or starts with table
        // except "table", "table-cell", or "table-caption"
        // See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
        rdisplayswap = /^(none|table(?!-c[ea]).+)/,
        rcustomProp = /^--/,
        cssShow = { position: "absolute", visibility: "hidden", display: "block" },
        cssNormalTransform = {
            letterSpacing: "0",
            fontWeight: "400"
        },

        cssPrefixes = [ "Webkit", "Moz", "ms" ],
        emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
    function vendorPropName( name ) {

        // Shortcut for names that are not vendor prefixed
        if ( name in emptyStyle ) {
            return name;
        }

        // Check for vendor prefixed names
        var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
            i = cssPrefixes.length;

        while ( i-- ) {
            name = cssPrefixes[ i ] + capName;
            if ( name in emptyStyle ) {
                return name;
            }
        }
    }

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
    function finalPropName( name ) {
        var ret = jQuery.cssProps[ name ];
        if ( !ret ) {
            ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
        }
        return ret;
    }

    function setPositiveNumber( elem, value, subtract ) {

        // Any relative (+/-) values have already been
        // normalized at this point
        var matches = rcssNum.exec( value );
        return matches ?

            // Guard against undefined "subtract", e.g., when used as in cssHooks
            Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
            value;
    }

    function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
        var i,
            val = 0;

        // If we already have the right measurement, avoid augmentation
        if ( extra === ( isBorderBox ? "border" : "content" ) ) {
            i = 4;

            // Otherwise initialize for horizontal or vertical properties
        } else {
            i = name === "width" ? 1 : 0;
        }

        for ( ; i < 4; i += 2 ) {

            // Both box models exclude margin, so add it if we want it
            if ( extra === "margin" ) {
                val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
            }

            if ( isBorderBox ) {

                // border-box includes padding, so remove it if we want content
                if ( extra === "content" ) {
                    val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
                }

                // At this point, extra isn't border nor margin, so remove border
                if ( extra !== "margin" ) {
                    val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
                }
            } else {

                // At this point, extra isn't content, so add padding
                val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

                // At this point, extra isn't content nor padding, so add border
                if ( extra !== "padding" ) {
                    val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
                }
            }
        }

        return val;
    }

    function getWidthOrHeight( elem, name, extra ) {

        // Start with computed style
        var valueIsBorderBox,
            styles = getStyles( elem ),
            val = curCSS( elem, name, styles ),
            isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

        // Computed unit is not pixels. Stop here and return.
        if ( rnumnonpx.test( val ) ) {
            return val;
        }

        // Check for style in case a browser which returns unreliable values
        // for getComputedStyle silently falls back to the reliable elem.style
        valueIsBorderBox = isBorderBox &&
            ( support.boxSizingReliable() || val === elem.style[ name ] );

        // Normalize "", auto, and prepare for extra
        val = parseFloat( val ) || 0;

        // Use the active box-sizing model to add/subtract irrelevant styles
        return ( val +
                augmentWidthOrHeight(
                    elem,
                    name,
                    extra || ( isBorderBox ? "border" : "content" ),
                    valueIsBorderBox,
                    styles
                )
            ) + "px";
    }

    jQuery.extend( {

        // Add in style property hooks for overriding the default
        // behavior of getting and setting a style property
        cssHooks: {
            opacity: {
                get: function( elem, computed ) {
                    if ( computed ) {

                        // We should always get a number back from opacity
                        var ret = curCSS( elem, "opacity" );
                        return ret === "" ? "1" : ret;
                    }
                }
            }
        },

        // Don't automatically add "px" to these possibly-unitless properties
        cssNumber: {
            "animationIterationCount": true,
            "columnCount": true,
            "fillOpacity": true,
            "flexGrow": true,
            "flexShrink": true,
            "fontWeight": true,
            "lineHeight": true,
            "opacity": true,
            "order": true,
            "orphans": true,
            "widows": true,
            "zIndex": true,
            "zoom": true
        },

        // Add in properties whose names you wish to fix before
        // setting or getting the value
        cssProps: {
            "float": "cssFloat"
        },

        // Get and set the style property on a DOM Node
        style: function( elem, name, value, extra ) {

            // Don't set styles on text and comment nodes
            if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
                return;
            }

            // Make sure that we're working with the right name
            var ret, type, hooks,
                origName = jQuery.camelCase( name ),
                isCustomProp = rcustomProp.test( name ),
                style = elem.style;

            // Make sure that we're working with the right name. We don't
            // want to query the value if it is a CSS custom property
            // since they are user-defined.
            if ( !isCustomProp ) {
                name = finalPropName( origName );
            }

            // Gets hook for the prefixed version, then unprefixed version
            hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

            // Check if we're setting a value
            if ( value !== undefined ) {
                type = typeof value;

                // Convert "+=" or "-=" to relative numbers (#7345)
                if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
                    value = adjustCSS( elem, name, ret );

                    // Fixes bug #9237
                    type = "number";
                }

                // Make sure that null and NaN values aren't set (#7116)
                if ( value == null || value !== value ) {
                    return;
                }

                // If a number was passed in, add the unit (except for certain CSS properties)
                if ( type === "number" ) {
                    value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
                }

                // background-* props affect original clone's values
                if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
                    style[ name ] = "inherit";
                }

                // If a hook was provided, use that value, otherwise just set the specified value
                if ( !hooks || !( "set" in hooks ) ||
                    ( value = hooks.set( elem, value, extra ) ) !== undefined ) {

                    if ( isCustomProp ) {
                        style.setProperty( name, value );
                    } else {
                        style[ name ] = value;
                    }
                }

            } else {

                // If a hook was provided get the non-computed value from there
                if ( hooks && "get" in hooks &&
                    ( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

                    return ret;
                }

                // Otherwise just get the value from the style object
                return style[ name ];
            }
        },

        css: function( elem, name, extra, styles ) {
            var val, num, hooks,
                origName = jQuery.camelCase( name ),
                isCustomProp = rcustomProp.test( name );

            // Make sure that we're working with the right name. We don't
            // want to modify the value if it is a CSS custom property
            // since they are user-defined.
            if ( !isCustomProp ) {
                name = finalPropName( origName );
            }

            // Try prefixed name followed by the unprefixed name
            hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

            // If a hook was provided get the computed value from there
            if ( hooks && "get" in hooks ) {
                val = hooks.get( elem, true, extra );
            }

            // Otherwise, if a way to get the computed value exists, use that
            if ( val === undefined ) {
                val = curCSS( elem, name, styles );
            }

            // Convert "normal" to computed value
            if ( val === "normal" && name in cssNormalTransform ) {
                val = cssNormalTransform[ name ];
            }

            // Make numeric if forced or a qualifier was provided and val looks numeric
            if ( extra === "" || extra ) {
                num = parseFloat( val );
                return extra === true || isFinite( num ) ? num || 0 : val;
            }

            return val;
        }
    } );

    jQuery.each( [ "height", "width" ], function( i, name ) {
        jQuery.cssHooks[ name ] = {
            get: function( elem, computed, extra ) {
                if ( computed ) {

                    // Certain elements can have dimension info if we invisibly show them
                    // but it must have a current display style that would benefit
                    return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

                    // Support: Safari 8+
                    // Table columns in Safari have non-zero offsetWidth & zero
                    // getBoundingClientRect().width unless display is changed.
                    // Support: IE <=11 only
                    // Running getBoundingClientRect on a disconnected node
                    // in IE throws an error.
                    ( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
                        swap( elem, cssShow, function() {
                            return getWidthOrHeight( elem, name, extra );
                        } ) :
                        getWidthOrHeight( elem, name, extra );
                }
            },

            set: function( elem, value, extra ) {
                var matches,
                    styles = extra && getStyles( elem ),
                    subtract = extra && augmentWidthOrHeight(
                            elem,
                            name,
                            extra,
                            jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
                            styles
                        );

                // Convert to pixels if value adjustment is needed
                if ( subtract && ( matches = rcssNum.exec( value ) ) &&
                    ( matches[ 3 ] || "px" ) !== "px" ) {

                    elem.style[ name ] = value;
                    value = jQuery.css( elem, name );
                }

                return setPositiveNumber( elem, value, subtract );
            }
        };
    } );

    jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
        function( elem, computed ) {
            if ( computed ) {
                return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
                        elem.getBoundingClientRect().left -
                        swap( elem, { marginLeft: 0 }, function() {
                            return elem.getBoundingClientRect().left;
                        } )
                    ) + "px";
            }
        }
    );

// These hooks are used by animate to expand properties
    jQuery.each( {
        margin: "",
        padding: "",
        border: "Width"
    }, function( prefix, suffix ) {
        jQuery.cssHooks[ prefix + suffix ] = {
            expand: function( value ) {
                var i = 0,
                    expanded = {},

                    // Assumes a single number if not a string
                    parts = typeof value === "string" ? value.split( " " ) : [ value ];

                for ( ; i < 4; i++ ) {
                    expanded[ prefix + cssExpand[ i ] + suffix ] =
                        parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
                }

                return expanded;
            }
        };

        if ( !rmargin.test( prefix ) ) {
            jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
        }
    } );

    jQuery.fn.extend( {
        css: function( name, value ) {
            return access( this, function( elem, name, value ) {
                var styles, len,
                    map = {},
                    i = 0;

                if ( Array.isArray( name ) ) {
                    styles = getStyles( elem );
                    len = name.length;

                    for ( ; i < len; i++ ) {
                        map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
                    }

                    return map;
                }

                return value !== undefined ?
                    jQuery.style( elem, name, value ) :
                    jQuery.css( elem, name );
            }, name, value, arguments.length > 1 );
        }
    } );


    function Tween( elem, options, prop, end, easing ) {
        return new Tween.prototype.init( elem, options, prop, end, easing );
    }
    jQuery.Tween = Tween;

    Tween.prototype = {
        constructor: Tween,
        init: function( elem, options, prop, end, easing, unit ) {
            this.elem = elem;
            this.prop = prop;
            this.easing = easing || jQuery.easing._default;
            this.options = options;
            this.start = this.now = this.cur();
            this.end = end;
            this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
        },
        cur: function() {
            var hooks = Tween.propHooks[ this.prop ];

            return hooks && hooks.get ?
                hooks.get( this ) :
                Tween.propHooks._default.get( this );
        },
        run: function( percent ) {
            var eased,
                hooks = Tween.propHooks[ this.prop ];

            if ( this.options.duration ) {
                this.pos = eased = jQuery.easing[ this.easing ](
                    percent, this.options.duration * percent, 0, 1, this.options.duration
                );
            } else {
                this.pos = eased = percent;
            }
            this.now = ( this.end - this.start ) * eased + this.start;

            if ( this.options.step ) {
                this.options.step.call( this.elem, this.now, this );
            }

            if ( hooks && hooks.set ) {
                hooks.set( this );
            } else {
                Tween.propHooks._default.set( this );
            }
            return this;
        }
    };

    Tween.prototype.init.prototype = Tween.prototype;

    Tween.propHooks = {
        _default: {
            get: function( tween ) {
                var result;

                // Use a property on the element directly when it is not a DOM element,
                // or when there is no matching style property that exists.
                if ( tween.elem.nodeType !== 1 ||
                    tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
                    return tween.elem[ tween.prop ];
                }

                // Passing an empty string as a 3rd parameter to .css will automatically
                // attempt a parseFloat and fallback to a string if the parse fails.
                // Simple values such as "10px" are parsed to Float;
                // complex values such as "rotate(1rad)" are returned as-is.
                result = jQuery.css( tween.elem, tween.prop, "" );

                // Empty strings, null, undefined and "auto" are converted to 0.
                return !result || result === "auto" ? 0 : result;
            },
            set: function( tween ) {

                // Use step hook for back compat.
                // Use cssHook if its there.
                // Use .style if available and use plain properties where available.
                if ( jQuery.fx.step[ tween.prop ] ) {
                    jQuery.fx.step[ tween.prop ]( tween );
                } else if ( tween.elem.nodeType === 1 &&
                    ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
                    jQuery.cssHooks[ tween.prop ] ) ) {
                    jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
                } else {
                    tween.elem[ tween.prop ] = tween.now;
                }
            }
        }
    };

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function( tween ) {
            if ( tween.elem.nodeType && tween.elem.parentNode ) {
                tween.elem[ tween.prop ] = tween.now;
            }
        }
    };

    jQuery.easing = {
        linear: function( p ) {
            return p;
        },
        swing: function( p ) {
            return 0.5 - Math.cos( p * Math.PI ) / 2;
        },
        _default: "swing"
    };

    jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
    jQuery.fx.step = {};




    var
        fxNow, inProgress,
        rfxtypes = /^(?:toggle|show|hide)$/,
        rrun = /queueHooks$/;

    function schedule() {
        if ( inProgress ) {
            if ( document.hidden === false && window.requestAnimationFrame ) {
                window.requestAnimationFrame( schedule );
            } else {
                window.setTimeout( schedule, jQuery.fx.interval );
            }

            jQuery.fx.tick();
        }
    }

// Animations created synchronously will run synchronously
    function createFxNow() {
        window.setTimeout( function() {
            fxNow = undefined;
        } );
        return ( fxNow = jQuery.now() );
    }

// Generate parameters to create a standard animation
    function genFx( type, includeWidth ) {
        var which,
            i = 0,
            attrs = { height: type };

        // If we include width, step value is 1 to do all cssExpand values,
        // otherwise step value is 2 to skip over Left and Right
        includeWidth = includeWidth ? 1 : 0;
        for ( ; i < 4; i += 2 - includeWidth ) {
            which = cssExpand[ i ];
            attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
        }

        if ( includeWidth ) {
            attrs.opacity = attrs.width = type;
        }

        return attrs;
    }

    function createTween( value, prop, animation ) {
        var tween,
            collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
            index = 0,
            length = collection.length;
        for ( ; index < length; index++ ) {
            if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

                // We're done with this property
                return tween;
            }
        }
    }

    function defaultPrefilter( elem, props, opts ) {
        var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
            isBox = "width" in props || "height" in props,
            anim = this,
            orig = {},
            style = elem.style,
            hidden = elem.nodeType && isHiddenWithinTree( elem ),
            dataShow = dataPriv.get( elem, "fxshow" );

        // Queue-skipping animations hijack the fx hooks
        if ( !opts.queue ) {
            hooks = jQuery._queueHooks( elem, "fx" );
            if ( hooks.unqueued == null ) {
                hooks.unqueued = 0;
                oldfire = hooks.empty.fire;
                hooks.empty.fire = function() {
                    if ( !hooks.unqueued ) {
                        oldfire();
                    }
                };
            }
            hooks.unqueued++;

            anim.always( function() {

                // Ensure the complete handler is called before this completes
                anim.always( function() {
                    hooks.unqueued--;
                    if ( !jQuery.queue( elem, "fx" ).length ) {
                        hooks.empty.fire();
                    }
                } );
            } );
        }

        // Detect show/hide animations
        for ( prop in props ) {
            value = props[ prop ];
            if ( rfxtypes.test( value ) ) {
                delete props[ prop ];
                toggle = toggle || value === "toggle";
                if ( value === ( hidden ? "hide" : "show" ) ) {

                    // Pretend to be hidden if this is a "show" and
                    // there is still data from a stopped show/hide
                    if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
                        hidden = true;

                        // Ignore all other no-op show/hide data
                    } else {
                        continue;
                    }
                }
                orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
            }
        }

        // Bail out if this is a no-op like .hide().hide()
        propTween = !jQuery.isEmptyObject( props );
        if ( !propTween && jQuery.isEmptyObject( orig ) ) {
            return;
        }

        // Restrict "overflow" and "display" styles during box animations
        if ( isBox && elem.nodeType === 1 ) {

            // Support: IE <=9 - 11, Edge 12 - 13
            // Record all 3 overflow attributes because IE does not infer the shorthand
            // from identically-valued overflowX and overflowY
            opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

            // Identify a display type, preferring old show/hide data over the CSS cascade
            restoreDisplay = dataShow && dataShow.display;
            if ( restoreDisplay == null ) {
                restoreDisplay = dataPriv.get( elem, "display" );
            }
            display = jQuery.css( elem, "display" );
            if ( display === "none" ) {
                if ( restoreDisplay ) {
                    display = restoreDisplay;
                } else {

                    // Get nonempty value(s) by temporarily forcing visibility
                    showHide( [ elem ], true );
                    restoreDisplay = elem.style.display || restoreDisplay;
                    display = jQuery.css( elem, "display" );
                    showHide( [ elem ] );
                }
            }

            // Animate inline elements as inline-block
            if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
                if ( jQuery.css( elem, "float" ) === "none" ) {

                    // Restore the original display value at the end of pure show/hide animations
                    if ( !propTween ) {
                        anim.done( function() {
                            style.display = restoreDisplay;
                        } );
                        if ( restoreDisplay == null ) {
                            display = style.display;
                            restoreDisplay = display === "none" ? "" : display;
                        }
                    }
                    style.display = "inline-block";
                }
            }
        }

        if ( opts.overflow ) {
            style.overflow = "hidden";
            anim.always( function() {
                style.overflow = opts.overflow[ 0 ];
                style.overflowX = opts.overflow[ 1 ];
                style.overflowY = opts.overflow[ 2 ];
            } );
        }

        // Implement show/hide animations
        propTween = false;
        for ( prop in orig ) {

            // General show/hide setup for this element animation
            if ( !propTween ) {
                if ( dataShow ) {
                    if ( "hidden" in dataShow ) {
                        hidden = dataShow.hidden;
                    }
                } else {
                    dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
                }

                // Store hidden/visible for toggle so `.stop().toggle()` "reverses"
                if ( toggle ) {
                    dataShow.hidden = !hidden;
                }

                // Show elements before animating them
                if ( hidden ) {
                    showHide( [ elem ], true );
                }

                /* eslint-disable no-loop-func */

                anim.done( function() {

                    /* eslint-enable no-loop-func */

                    // The final step of a "hide" animation is actually hiding the element
                    if ( !hidden ) {
                        showHide( [ elem ] );
                    }
                    dataPriv.remove( elem, "fxshow" );
                    for ( prop in orig ) {
                        jQuery.style( elem, prop, orig[ prop ] );
                    }
                } );
            }

            // Per-property setup
            propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
            if ( !( prop in dataShow ) ) {
                dataShow[ prop ] = propTween.start;
                if ( hidden ) {
                    propTween.end = propTween.start;
                    propTween.start = 0;
                }
            }
        }
    }

    function propFilter( props, specialEasing ) {
        var index, name, easing, value, hooks;

        // camelCase, specialEasing and expand cssHook pass
        for ( index in props ) {
            name = jQuery.camelCase( index );
            easing = specialEasing[ name ];
            value = props[ index ];
            if ( Array.isArray( value ) ) {
                easing = value[ 1 ];
                value = props[ index ] = value[ 0 ];
            }

            if ( index !== name ) {
                props[ name ] = value;
                delete props[ index ];
            }

            hooks = jQuery.cssHooks[ name ];
            if ( hooks && "expand" in hooks ) {
                value = hooks.expand( value );
                delete props[ name ];

                // Not quite $.extend, this won't overwrite existing keys.
                // Reusing 'index' because we have the correct "name"
                for ( index in value ) {
                    if ( !( index in props ) ) {
                        props[ index ] = value[ index ];
                        specialEasing[ index ] = easing;
                    }
                }
            } else {
                specialEasing[ name ] = easing;
            }
        }
    }

    function Animation( elem, properties, options ) {
        var result,
            stopped,
            index = 0,
            length = Animation.prefilters.length,
            deferred = jQuery.Deferred().always( function() {

                // Don't match elem in the :animated selector
                delete tick.elem;
            } ),
            tick = function() {
                if ( stopped ) {
                    return false;
                }
                var currentTime = fxNow || createFxNow(),
                    remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

                    // Support: Android 2.3 only
                    // Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
                    temp = remaining / animation.duration || 0,
                    percent = 1 - temp,
                    index = 0,
                    length = animation.tweens.length;

                for ( ; index < length; index++ ) {
                    animation.tweens[ index ].run( percent );
                }

                deferred.notifyWith( elem, [ animation, percent, remaining ] );

                // If there's more to do, yield
                if ( percent < 1 && length ) {
                    return remaining;
                }

                // If this was an empty animation, synthesize a final progress notification
                if ( !length ) {
                    deferred.notifyWith( elem, [ animation, 1, 0 ] );
                }

                // Resolve the animation and report its conclusion
                deferred.resolveWith( elem, [ animation ] );
                return false;
            },
            animation = deferred.promise( {
                elem: elem,
                props: jQuery.extend( {}, properties ),
                opts: jQuery.extend( true, {
                    specialEasing: {},
                    easing: jQuery.easing._default
                }, options ),
                originalProperties: properties,
                originalOptions: options,
                startTime: fxNow || createFxNow(),
                duration: options.duration,
                tweens: [],
                createTween: function( prop, end ) {
                    var tween = jQuery.Tween( elem, animation.opts, prop, end,
                        animation.opts.specialEasing[ prop ] || animation.opts.easing );
                    animation.tweens.push( tween );
                    return tween;
                },
                stop: function( gotoEnd ) {
                    var index = 0,

                        // If we are going to the end, we want to run all the tweens
                        // otherwise we skip this part
                        length = gotoEnd ? animation.tweens.length : 0;
                    if ( stopped ) {
                        return this;
                    }
                    stopped = true;
                    for ( ; index < length; index++ ) {
                        animation.tweens[ index ].run( 1 );
                    }

                    // Resolve when we played the last frame; otherwise, reject
                    if ( gotoEnd ) {
                        deferred.notifyWith( elem, [ animation, 1, 0 ] );
                        deferred.resolveWith( elem, [ animation, gotoEnd ] );
                    } else {
                        deferred.rejectWith( elem, [ animation, gotoEnd ] );
                    }
                    return this;
                }
            } ),
            props = animation.props;

        propFilter( props, animation.opts.specialEasing );

        for ( ; index < length; index++ ) {
            result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
            if ( result ) {
                if ( jQuery.isFunction( result.stop ) ) {
                    jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
                        jQuery.proxy( result.stop, result );
                }
                return result;
            }
        }

        jQuery.map( props, createTween, animation );

        if ( jQuery.isFunction( animation.opts.start ) ) {
            animation.opts.start.call( elem, animation );
        }

        // Attach callbacks from options
        animation
            .progress( animation.opts.progress )
            .done( animation.opts.done, animation.opts.complete )
            .fail( animation.opts.fail )
            .always( animation.opts.always );

        jQuery.fx.timer(
            jQuery.extend( tick, {
                elem: elem,
                anim: animation,
                queue: animation.opts.queue
            } )
        );

        return animation;
    }

    jQuery.Animation = jQuery.extend( Animation, {

        tweeners: {
            "*": [ function( prop, value ) {
                var tween = this.createTween( prop, value );
                adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
                return tween;
            } ]
        },

        tweener: function( props, callback ) {
            if ( jQuery.isFunction( props ) ) {
                callback = props;
                props = [ "*" ];
            } else {
                props = props.match( rnothtmlwhite );
            }

            var prop,
                index = 0,
                length = props.length;

            for ( ; index < length; index++ ) {
                prop = props[ index ];
                Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
                Animation.tweeners[ prop ].unshift( callback );
            }
        },

        prefilters: [ defaultPrefilter ],

        prefilter: function( callback, prepend ) {
            if ( prepend ) {
                Animation.prefilters.unshift( callback );
            } else {
                Animation.prefilters.push( callback );
            }
        }
    } );

    jQuery.speed = function( speed, easing, fn ) {
        var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
                complete: fn || !fn && easing ||
                jQuery.isFunction( speed ) && speed,
                duration: speed,
                easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
            };

        // Go to the end state if fx are off
        if ( jQuery.fx.off ) {
            opt.duration = 0;

        } else {
            if ( typeof opt.duration !== "number" ) {
                if ( opt.duration in jQuery.fx.speeds ) {
                    opt.duration = jQuery.fx.speeds[ opt.duration ];

                } else {
                    opt.duration = jQuery.fx.speeds._default;
                }
            }
        }

        // Normalize opt.queue - true/undefined/null -> "fx"
        if ( opt.queue == null || opt.queue === true ) {
            opt.queue = "fx";
        }

        // Queueing
        opt.old = opt.complete;

        opt.complete = function() {
            if ( jQuery.isFunction( opt.old ) ) {
                opt.old.call( this );
            }

            if ( opt.queue ) {
                jQuery.dequeue( this, opt.queue );
            }
        };

        return opt;
    };

    jQuery.fn.extend( {
        fadeTo: function( speed, to, easing, callback ) {

            // Show any hidden elements after setting opacity to 0
            return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

            // Animate to the value specified
                .end().animate( { opacity: to }, speed, easing, callback );
        },
        animate: function( prop, speed, easing, callback ) {
            var empty = jQuery.isEmptyObject( prop ),
                optall = jQuery.speed( speed, easing, callback ),
                doAnimation = function() {

                    // Operate on a copy of prop so per-property easing won't be lost
                    var anim = Animation( this, jQuery.extend( {}, prop ), optall );

                    // Empty animations, or finishing resolves immediately
                    if ( empty || dataPriv.get( this, "finish" ) ) {
                        anim.stop( true );
                    }
                };
            doAnimation.finish = doAnimation;

            return empty || optall.queue === false ?
                this.each( doAnimation ) :
                this.queue( optall.queue, doAnimation );
        },
        stop: function( type, clearQueue, gotoEnd ) {
            var stopQueue = function( hooks ) {
                var stop = hooks.stop;
                delete hooks.stop;
                stop( gotoEnd );
            };

            if ( typeof type !== "string" ) {
                gotoEnd = clearQueue;
                clearQueue = type;
                type = undefined;
            }
            if ( clearQueue && type !== false ) {
                this.queue( type || "fx", [] );
            }

            return this.each( function() {
                var dequeue = true,
                    index = type != null && type + "queueHooks",
                    timers = jQuery.timers,
                    data = dataPriv.get( this );

                if ( index ) {
                    if ( data[ index ] && data[ index ].stop ) {
                        stopQueue( data[ index ] );
                    }
                } else {
                    for ( index in data ) {
                        if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
                            stopQueue( data[ index ] );
                        }
                    }
                }

                for ( index = timers.length; index--; ) {
                    if ( timers[ index ].elem === this &&
                        ( type == null || timers[ index ].queue === type ) ) {

                        timers[ index ].anim.stop( gotoEnd );
                        dequeue = false;
                        timers.splice( index, 1 );
                    }
                }

                // Start the next in the queue if the last step wasn't forced.
                // Timers currently will call their complete callbacks, which
                // will dequeue but only if they were gotoEnd.
                if ( dequeue || !gotoEnd ) {
                    jQuery.dequeue( this, type );
                }
            } );
        },
        finish: function( type ) {
            if ( type !== false ) {
                type = type || "fx";
            }
            return this.each( function() {
                var index,
                    data = dataPriv.get( this ),
                    queue = data[ type + "queue" ],
                    hooks = data[ type + "queueHooks" ],
                    timers = jQuery.timers,
                    length = queue ? queue.length : 0;

                // Enable finishing flag on private data
                data.finish = true;

                // Empty the queue first
                jQuery.queue( this, type, [] );

                if ( hooks && hooks.stop ) {
                    hooks.stop.call( this, true );
                }

                // Look for any active animations, and finish them
                for ( index = timers.length; index--; ) {
                    if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
                        timers[ index ].anim.stop( true );
                        timers.splice( index, 1 );
                    }
                }

                // Look for any animations in the old queue and finish them
                for ( index = 0; index < length; index++ ) {
                    if ( queue[ index ] && queue[ index ].finish ) {
                        queue[ index ].finish.call( this );
                    }
                }

                // Turn off finishing flag
                delete data.finish;
            } );
        }
    } );

    jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
        var cssFn = jQuery.fn[ name ];
        jQuery.fn[ name ] = function( speed, easing, callback ) {
            return speed == null || typeof speed === "boolean" ?
                cssFn.apply( this, arguments ) :
                this.animate( genFx( name, true ), speed, easing, callback );
        };
    } );

// Generate shortcuts for custom animations
    jQuery.each( {
        slideDown: genFx( "show" ),
        slideUp: genFx( "hide" ),
        slideToggle: genFx( "toggle" ),
        fadeIn: { opacity: "show" },
        fadeOut: { opacity: "hide" },
        fadeToggle: { opacity: "toggle" }
    }, function( name, props ) {
        jQuery.fn[ name ] = function( speed, easing, callback ) {
            return this.animate( props, speed, easing, callback );
        };
    } );

    jQuery.timers = [];
    jQuery.fx.tick = function() {
        var timer,
            i = 0,
            timers = jQuery.timers;

        fxNow = jQuery.now();

        for ( ; i < timers.length; i++ ) {
            timer = timers[ i ];

            // Run the timer and safely remove it when done (allowing for external removal)
            if ( !timer() && timers[ i ] === timer ) {
                timers.splice( i--, 1 );
            }
        }

        if ( !timers.length ) {
            jQuery.fx.stop();
        }
        fxNow = undefined;
    };

    jQuery.fx.timer = function( timer ) {
        jQuery.timers.push( timer );
        jQuery.fx.start();
    };

    jQuery.fx.interval = 13;
    jQuery.fx.start = function() {
        if ( inProgress ) {
            return;
        }

        inProgress = true;
        schedule();
    };

    jQuery.fx.stop = function() {
        inProgress = null;
    };

    jQuery.fx.speeds = {
        slow: 600,
        fast: 200,

        // Default speed
        _default: 400
    };


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
    jQuery.fn.delay = function( time, type ) {
        time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
        type = type || "fx";

        return this.queue( type, function( next, hooks ) {
            var timeout = window.setTimeout( next, time );
            hooks.stop = function() {
                window.clearTimeout( timeout );
            };
        } );
    };


    ( function() {
        var input = document.createElement( "input" ),
            select = document.createElement( "select" ),
            opt = select.appendChild( document.createElement( "option" ) );

        input.type = "checkbox";

        // Support: Android <=4.3 only
        // Default value for a checkbox should be "on"
        support.checkOn = input.value !== "";

        // Support: IE <=11 only
        // Must access selectedIndex to make default options select
        support.optSelected = opt.selected;

        // Support: IE <=11 only
        // An input loses its value after becoming a radio
        input = document.createElement( "input" );
        input.value = "t";
        input.type = "radio";
        support.radioValue = input.value === "t";
    } )();


    var boolHook,
        attrHandle = jQuery.expr.attrHandle;

    jQuery.fn.extend( {
        attr: function( name, value ) {
            return access( this, jQuery.attr, name, value, arguments.length > 1 );
        },

        removeAttr: function( name ) {
            return this.each( function() {
                jQuery.removeAttr( this, name );
            } );
        }
    } );

    jQuery.extend( {
        attr: function( elem, name, value ) {
            var ret, hooks,
                nType = elem.nodeType;

            // Don't get/set attributes on text, comment and attribute nodes
            if ( nType === 3 || nType === 8 || nType === 2 ) {
                return;
            }

            // Fallback to prop when attributes are not supported
            if ( typeof elem.getAttribute === "undefined" ) {
                return jQuery.prop( elem, name, value );
            }

            // Attribute hooks are determined by the lowercase version
            // Grab necessary hook if one is defined
            if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
                hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
                    ( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
            }

            if ( value !== undefined ) {
                if ( value === null ) {
                    jQuery.removeAttr( elem, name );
                    return;
                }

                if ( hooks && "set" in hooks &&
                    ( ret = hooks.set( elem, value, name ) ) !== undefined ) {
                    return ret;
                }

                elem.setAttribute( name, value + "" );
                return value;
            }

            if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
                return ret;
            }

            ret = jQuery.find.attr( elem, name );

            // Non-existent attributes return null, we normalize to undefined
            return ret == null ? undefined : ret;
        },

        attrHooks: {
            type: {
                set: function( elem, value ) {
                    if ( !support.radioValue && value === "radio" &&
                        nodeName( elem, "input" ) ) {
                        var val = elem.value;
                        elem.setAttribute( "type", value );
                        if ( val ) {
                            elem.value = val;
                        }
                        return value;
                    }
                }
            }
        },

        removeAttr: function( elem, value ) {
            var name,
                i = 0,

                // Attribute names can contain non-HTML whitespace characters
                // https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
                attrNames = value && value.match( rnothtmlwhite );

            if ( attrNames && elem.nodeType === 1 ) {
                while ( ( name = attrNames[ i++ ] ) ) {
                    elem.removeAttribute( name );
                }
            }
        }
    } );

// Hooks for boolean attributes
    boolHook = {
        set: function( elem, value, name ) {
            if ( value === false ) {

                // Remove boolean attributes when set to false
                jQuery.removeAttr( elem, name );
            } else {
                elem.setAttribute( name, name );
            }
            return name;
        }
    };

    jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
        var getter = attrHandle[ name ] || jQuery.find.attr;

        attrHandle[ name ] = function( elem, name, isXML ) {
            var ret, handle,
                lowercaseName = name.toLowerCase();

            if ( !isXML ) {

                // Avoid an infinite loop by temporarily removing this function from the getter
                handle = attrHandle[ lowercaseName ];
                attrHandle[ lowercaseName ] = ret;
                ret = getter( elem, name, isXML ) != null ?
                    lowercaseName :
                    null;
                attrHandle[ lowercaseName ] = handle;
            }
            return ret;
        };
    } );




    var rfocusable = /^(?:input|select|textarea|button)$/i,
        rclickable = /^(?:a|area)$/i;

    jQuery.fn.extend( {
        prop: function( name, value ) {
            return access( this, jQuery.prop, name, value, arguments.length > 1 );
        },

        removeProp: function( name ) {
            return this.each( function() {
                delete this[ jQuery.propFix[ name ] || name ];
            } );
        }
    } );

    jQuery.extend( {
        prop: function( elem, name, value ) {
            var ret, hooks,
                nType = elem.nodeType;

            // Don't get/set properties on text, comment and attribute nodes
            if ( nType === 3 || nType === 8 || nType === 2 ) {
                return;
            }

            if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

                // Fix name and attach hooks
                name = jQuery.propFix[ name ] || name;
                hooks = jQuery.propHooks[ name ];
            }

            if ( value !== undefined ) {
                if ( hooks && "set" in hooks &&
                    ( ret = hooks.set( elem, value, name ) ) !== undefined ) {
                    return ret;
                }

                return ( elem[ name ] = value );
            }

            if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
                return ret;
            }

            return elem[ name ];
        },

        propHooks: {
            tabIndex: {
                get: function( elem ) {

                    // Support: IE <=9 - 11 only
                    // elem.tabIndex doesn't always return the
                    // correct value when it hasn't been explicitly set
                    // https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
                    // Use proper attribute retrieval(#12072)
                    var tabindex = jQuery.find.attr( elem, "tabindex" );

                    if ( tabindex ) {
                        return parseInt( tabindex, 10 );
                    }

                    if (
                        rfocusable.test( elem.nodeName ) ||
                        rclickable.test( elem.nodeName ) &&
                        elem.href
                    ) {
                        return 0;
                    }

                    return -1;
                }
            }
        },

        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    } );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
    if ( !support.optSelected ) {
        jQuery.propHooks.selected = {
            get: function( elem ) {

                /* eslint no-unused-expressions: "off" */

                var parent = elem.parentNode;
                if ( parent && parent.parentNode ) {
                    parent.parentNode.selectedIndex;
                }
                return null;
            },
            set: function( elem ) {

                /* eslint no-unused-expressions: "off" */

                var parent = elem.parentNode;
                if ( parent ) {
                    parent.selectedIndex;

                    if ( parent.parentNode ) {
                        parent.parentNode.selectedIndex;
                    }
                }
            }
        };
    }

    jQuery.each( [
        "tabIndex",
        "readOnly",
        "maxLength",
        "cellSpacing",
        "cellPadding",
        "rowSpan",
        "colSpan",
        "useMap",
        "frameBorder",
        "contentEditable"
    ], function() {
        jQuery.propFix[ this.toLowerCase() ] = this;
    } );




    // Strip and collapse whitespace according to HTML spec
    // https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
    function stripAndCollapse( value ) {
        var tokens = value.match( rnothtmlwhite ) || [];
        return tokens.join( " " );
    }


    function getClass( elem ) {
        return elem.getAttribute && elem.getAttribute( "class" ) || "";
    }

    jQuery.fn.extend( {
        addClass: function( value ) {
            var classes, elem, cur, curValue, clazz, j, finalValue,
                i = 0;

            if ( jQuery.isFunction( value ) ) {
                return this.each( function( j ) {
                    jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
                } );
            }

            if ( typeof value === "string" && value ) {
                classes = value.match( rnothtmlwhite ) || [];

                while ( ( elem = this[ i++ ] ) ) {
                    curValue = getClass( elem );
                    cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

                    if ( cur ) {
                        j = 0;
                        while ( ( clazz = classes[ j++ ] ) ) {
                            if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
                                cur += clazz + " ";
                            }
                        }

                        // Only assign if different to avoid unneeded rendering.
                        finalValue = stripAndCollapse( cur );
                        if ( curValue !== finalValue ) {
                            elem.setAttribute( "class", finalValue );
                        }
                    }
                }
            }

            return this;
        },

        removeClass: function( value ) {
            var classes, elem, cur, curValue, clazz, j, finalValue,
                i = 0;

            if ( jQuery.isFunction( value ) ) {
                return this.each( function( j ) {
                    jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
                } );
            }

            if ( !arguments.length ) {
                return this.attr( "class", "" );
            }

            if ( typeof value === "string" && value ) {
                classes = value.match( rnothtmlwhite ) || [];

                while ( ( elem = this[ i++ ] ) ) {
                    curValue = getClass( elem );

                    // This expression is here for better compressibility (see addClass)
                    cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

                    if ( cur ) {
                        j = 0;
                        while ( ( clazz = classes[ j++ ] ) ) {

                            // Remove *all* instances
                            while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
                                cur = cur.replace( " " + clazz + " ", " " );
                            }
                        }

                        // Only assign if different to avoid unneeded rendering.
                        finalValue = stripAndCollapse( cur );
                        if ( curValue !== finalValue ) {
                            elem.setAttribute( "class", finalValue );
                        }
                    }
                }
            }

            return this;
        },

        toggleClass: function( value, stateVal ) {
            var type = typeof value;

            if ( typeof stateVal === "boolean" && type === "string" ) {
                return stateVal ? this.addClass( value ) : this.removeClass( value );
            }

            if ( jQuery.isFunction( value ) ) {
                return this.each( function( i ) {
                    jQuery( this ).toggleClass(
                        value.call( this, i, getClass( this ), stateVal ),
                        stateVal
                    );
                } );
            }

            return this.each( function() {
                var className, i, self, classNames;

                if ( type === "string" ) {

                    // Toggle individual class names
                    i = 0;
                    self = jQuery( this );
                    classNames = value.match( rnothtmlwhite ) || [];

                    while ( ( className = classNames[ i++ ] ) ) {

                        // Check each className given, space separated list
                        if ( self.hasClass( className ) ) {
                            self.removeClass( className );
                        } else {
                            self.addClass( className );
                        }
                    }

                    // Toggle whole class name
                } else if ( value === undefined || type === "boolean" ) {
                    className = getClass( this );
                    if ( className ) {

                        // Store className if set
                        dataPriv.set( this, "__className__", className );
                    }

                    // If the element has a class name or if we're passed `false`,
                    // then remove the whole classname (if there was one, the above saved it).
                    // Otherwise bring back whatever was previously saved (if anything),
                    // falling back to the empty string if nothing was stored.
                    if ( this.setAttribute ) {
                        this.setAttribute( "class",
                            className || value === false ?
                                "" :
                                dataPriv.get( this, "__className__" ) || ""
                        );
                    }
                }
            } );
        },

        hasClass: function( selector ) {
            var className, elem,
                i = 0;

            className = " " + selector + " ";
            while ( ( elem = this[ i++ ] ) ) {
                if ( elem.nodeType === 1 &&
                    ( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
                    return true;
                }
            }

            return false;
        }
    } );




    var rreturn = /\r/g;

    jQuery.fn.extend( {
        val: function( value ) {
            var hooks, ret, isFunction,
                elem = this[ 0 ];

            if ( !arguments.length ) {
                if ( elem ) {
                    hooks = jQuery.valHooks[ elem.type ] ||
                        jQuery.valHooks[ elem.nodeName.toLowerCase() ];

                    if ( hooks &&
                        "get" in hooks &&
                        ( ret = hooks.get( elem, "value" ) ) !== undefined
                    ) {
                        return ret;
                    }

                    ret = elem.value;

                    // Handle most common string cases
                    if ( typeof ret === "string" ) {
                        return ret.replace( rreturn, "" );
                    }

                    // Handle cases where value is null/undef or number
                    return ret == null ? "" : ret;
                }

                return;
            }

            isFunction = jQuery.isFunction( value );

            return this.each( function( i ) {
                var val;

                if ( this.nodeType !== 1 ) {
                    return;
                }

                if ( isFunction ) {
                    val = value.call( this, i, jQuery( this ).val() );
                } else {
                    val = value;
                }

                // Treat null/undefined as ""; convert numbers to string
                if ( val == null ) {
                    val = "";

                } else if ( typeof val === "number" ) {
                    val += "";

                } else if ( Array.isArray( val ) ) {
                    val = jQuery.map( val, function( value ) {
                        return value == null ? "" : value + "";
                    } );
                }

                hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

                // If set returns undefined, fall back to normal setting
                if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
                    this.value = val;
                }
            } );
        }
    } );

    jQuery.extend( {
        valHooks: {
            option: {
                get: function( elem ) {

                    var val = jQuery.find.attr( elem, "value" );
                    return val != null ?
                        val :

                        // Support: IE <=10 - 11 only
                        // option.text throws exceptions (#14686, #14858)
                        // Strip and collapse whitespace
                        // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
                        stripAndCollapse( jQuery.text( elem ) );
                }
            },
            select: {
                get: function( elem ) {
                    var value, option, i,
                        options = elem.options,
                        index = elem.selectedIndex,
                        one = elem.type === "select-one",
                        values = one ? null : [],
                        max = one ? index + 1 : options.length;

                    if ( index < 0 ) {
                        i = max;

                    } else {
                        i = one ? index : 0;
                    }

                    // Loop through all the selected options
                    for ( ; i < max; i++ ) {
                        option = options[ i ];

                        // Support: IE <=9 only
                        // IE8-9 doesn't update selected after form reset (#2551)
                        if ( ( option.selected || i === index ) &&

                            // Don't return options that are disabled or in a disabled optgroup
                            !option.disabled &&
                            ( !option.parentNode.disabled ||
                            !nodeName( option.parentNode, "optgroup" ) ) ) {

                            // Get the specific value for the option
                            value = jQuery( option ).val();

                            // We don't need an array for one selects
                            if ( one ) {
                                return value;
                            }

                            // Multi-Selects return an array
                            values.push( value );
                        }
                    }

                    return values;
                },

                set: function( elem, value ) {
                    var optionSet, option,
                        options = elem.options,
                        values = jQuery.makeArray( value ),
                        i = options.length;

                    while ( i-- ) {
                        option = options[ i ];

                        /* eslint-disable no-cond-assign */

                        if ( option.selected =
                                jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
                        ) {
                            optionSet = true;
                        }

                        /* eslint-enable no-cond-assign */
                    }

                    // Force browsers to behave consistently when non-matching value is set
                    if ( !optionSet ) {
                        elem.selectedIndex = -1;
                    }
                    return values;
                }
            }
        }
    } );

// Radios and checkboxes getter/setter
    jQuery.each( [ "radio", "checkbox" ], function() {
        jQuery.valHooks[ this ] = {
            set: function( elem, value ) {
                if ( Array.isArray( value ) ) {
                    return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
                }
            }
        };
        if ( !support.checkOn ) {
            jQuery.valHooks[ this ].get = function( elem ) {
                return elem.getAttribute( "value" ) === null ? "on" : elem.value;
            };
        }
    } );




// Return jQuery for attributes-only inclusion


    var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

    jQuery.extend( jQuery.event, {

        trigger: function( event, data, elem, onlyHandlers ) {

            var i, cur, tmp, bubbleType, ontype, handle, special,
                eventPath = [ elem || document ],
                type = hasOwn.call( event, "type" ) ? event.type : event,
                namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

            cur = tmp = elem = elem || document;

            // Don't do events on text and comment nodes
            if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
                return;
            }

            // focus/blur morphs to focusin/out; ensure we're not firing them right now
            if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
                return;
            }

            if ( type.indexOf( "." ) > -1 ) {

                // Namespaced trigger; create a regexp to match event type in handle()
                namespaces = type.split( "." );
                type = namespaces.shift();
                namespaces.sort();
            }
            ontype = type.indexOf( ":" ) < 0 && "on" + type;

            // Caller can pass in a jQuery.Event object, Object, or just an event type string
            event = event[ jQuery.expando ] ?
                event :
                new jQuery.Event( type, typeof event === "object" && event );

            // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
            event.isTrigger = onlyHandlers ? 2 : 3;
            event.namespace = namespaces.join( "." );
            event.rnamespace = event.namespace ?
                new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
                null;

            // Clean up the event in case it is being reused
            event.result = undefined;
            if ( !event.target ) {
                event.target = elem;
            }

            // Clone any incoming data and prepend the event, creating the handler arg list
            data = data == null ?
                [ event ] :
                jQuery.makeArray( data, [ event ] );

            // Allow special events to draw outside the lines
            special = jQuery.event.special[ type ] || {};
            if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
                return;
            }

            // Determine event propagation path in advance, per W3C events spec (#9951)
            // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
            if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

                bubbleType = special.delegateType || type;
                if ( !rfocusMorph.test( bubbleType + type ) ) {
                    cur = cur.parentNode;
                }
                for ( ; cur; cur = cur.parentNode ) {
                    eventPath.push( cur );
                    tmp = cur;
                }

                // Only add window if we got to document (e.g., not plain obj or detached DOM)
                if ( tmp === ( elem.ownerDocument || document ) ) {
                    eventPath.push( tmp.defaultView || tmp.parentWindow || window );
                }
            }

            // Fire handlers on the event path
            i = 0;
            while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

                event.type = i > 1 ?
                    bubbleType :
                    special.bindType || type;

                // jQuery handler
                handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
                    dataPriv.get( cur, "handle" );
                if ( handle ) {
                    handle.apply( cur, data );
                }

                // Native handler
                handle = ontype && cur[ ontype ];
                if ( handle && handle.apply && acceptData( cur ) ) {
                    event.result = handle.apply( cur, data );
                    if ( event.result === false ) {
                        event.preventDefault();
                    }
                }
            }
            event.type = type;

            // If nobody prevented the default action, do it now
            if ( !onlyHandlers && !event.isDefaultPrevented() ) {

                if ( ( !special._default ||
                    special._default.apply( eventPath.pop(), data ) === false ) &&
                    acceptData( elem ) ) {

                    // Call a native DOM method on the target with the same name as the event.
                    // Don't do default actions on window, that's where global variables be (#6170)
                    if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

                        // Don't re-trigger an onFOO event when we call its FOO() method
                        tmp = elem[ ontype ];

                        if ( tmp ) {
                            elem[ ontype ] = null;
                        }

                        // Prevent re-triggering of the same event, since we already bubbled it above
                        jQuery.event.triggered = type;
                        elem[ type ]();
                        jQuery.event.triggered = undefined;

                        if ( tmp ) {
                            elem[ ontype ] = tmp;
                        }
                    }
                }
            }

            return event.result;
        },

        // Piggyback on a donor event to simulate a different one
        // Used only for `focus(in | out)` events
        simulate: function( type, elem, event ) {
            var e = jQuery.extend(
                new jQuery.Event(),
                event,
                {
                    type: type,
                    isSimulated: true
                }
            );

            jQuery.event.trigger( e, null, elem );
        }

    } );

    jQuery.fn.extend( {

        trigger: function( type, data ) {
            return this.each( function() {
                jQuery.event.trigger( type, data, this );
            } );
        },
        triggerHandler: function( type, data ) {
            var elem = this[ 0 ];
            if ( elem ) {
                return jQuery.event.trigger( type, data, elem, true );
            }
        }
    } );


    jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
        "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
        "change select submit keydown keypress keyup contextmenu" ).split( " " ),
        function( i, name ) {

            // Handle event binding
            jQuery.fn[ name ] = function( data, fn ) {
                return arguments.length > 0 ?
                    this.on( name, null, data, fn ) :
                    this.trigger( name );
            };
        } );

    jQuery.fn.extend( {
        hover: function( fnOver, fnOut ) {
            return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
        }
    } );




    support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
    if ( !support.focusin ) {
        jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

            // Attach a single capturing handler on the document while someone wants focusin/focusout
            var handler = function( event ) {
                jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
            };

            jQuery.event.special[ fix ] = {
                setup: function() {
                    var doc = this.ownerDocument || this,
                        attaches = dataPriv.access( doc, fix );

                    if ( !attaches ) {
                        doc.addEventListener( orig, handler, true );
                    }
                    dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
                },
                teardown: function() {
                    var doc = this.ownerDocument || this,
                        attaches = dataPriv.access( doc, fix ) - 1;

                    if ( !attaches ) {
                        doc.removeEventListener( orig, handler, true );
                        dataPriv.remove( doc, fix );

                    } else {
                        dataPriv.access( doc, fix, attaches );
                    }
                }
            };
        } );
    }
    var location = window.location;

    var nonce = jQuery.now();

    var rquery = ( /\?/ );



// Cross-browser xml parsing
    jQuery.parseXML = function( data ) {
        var xml;
        if ( !data || typeof data !== "string" ) {
            return null;
        }

        // Support: IE 9 - 11 only
        // IE throws on parseFromString with invalid input.
        try {
            xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
        } catch ( e ) {
            xml = undefined;
        }

        if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
            jQuery.error( "Invalid XML: " + data );
        }
        return xml;
    };


    var
        rbracket = /\[\]$/,
        rCRLF = /\r?\n/g,
        rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
        rsubmittable = /^(?:input|select|textarea|keygen)/i;

    function buildParams( prefix, obj, traditional, add ) {
        var name;

        if ( Array.isArray( obj ) ) {

            // Serialize array item.
            jQuery.each( obj, function( i, v ) {
                if ( traditional || rbracket.test( prefix ) ) {

                    // Treat each array item as a scalar.
                    add( prefix, v );

                } else {

                    // Item is non-scalar (array or object), encode its numeric index.
                    buildParams(
                        prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
                        v,
                        traditional,
                        add
                    );
                }
            } );

        } else if ( !traditional && jQuery.type( obj ) === "object" ) {

            // Serialize object item.
            for ( name in obj ) {
                buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
            }

        } else {

            // Serialize scalar item.
            add( prefix, obj );
        }
    }

// Serialize an array of form elements or a set of
// key/values into a query string
    jQuery.param = function( a, traditional ) {
        var prefix,
            s = [],
            add = function( key, valueOrFunction ) {

                // If value is a function, invoke it and use its return value
                var value = jQuery.isFunction( valueOrFunction ) ?
                    valueOrFunction() :
                    valueOrFunction;

                s[ s.length ] = encodeURIComponent( key ) + "=" +
                    encodeURIComponent( value == null ? "" : value );
            };

        // If an array was passed in, assume that it is an array of form elements.
        if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

            // Serialize the form elements
            jQuery.each( a, function() {
                add( this.name, this.value );
            } );

        } else {

            // If traditional, encode the "old" way (the way 1.3.2 or older
            // did it), otherwise encode params recursively.
            for ( prefix in a ) {
                buildParams( prefix, a[ prefix ], traditional, add );
            }
        }

        // Return the resulting serialization
        return s.join( "&" );
    };

    jQuery.fn.extend( {
        serialize: function() {
            return jQuery.param( this.serializeArray() );
        },
        serializeArray: function() {
            return this.map( function() {

                // Can add propHook for "elements" to filter or add form elements
                var elements = jQuery.prop( this, "elements" );
                return elements ? jQuery.makeArray( elements ) : this;
            } )
                .filter( function() {
                    var type = this.type;

                    // Use .is( ":disabled" ) so that fieldset[disabled] works
                    return this.name && !jQuery( this ).is( ":disabled" ) &&
                        rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
                        ( this.checked || !rcheckableType.test( type ) );
                } )
                .map( function( i, elem ) {
                    var val = jQuery( this ).val();

                    if ( val == null ) {
                        return null;
                    }

                    if ( Array.isArray( val ) ) {
                        return jQuery.map( val, function( val ) {
                            return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
                        } );
                    }

                    return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
                } ).get();
        }
    } );


    var
        r20 = /%20/g,
        rhash = /#.*$/,
        rantiCache = /([?&])_=[^&]*/,
        rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

        // #7653, #8125, #8152: local protocol detection
        rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        rnoContent = /^(?:GET|HEAD)$/,
        rprotocol = /^\/\//,

        /* Prefilters
         * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
         * 2) These are called:
         *    - BEFORE asking for a transport
         *    - AFTER param serialization (s.data is a string if s.processData is true)
         * 3) key is the dataType
         * 4) the catchall symbol "*" can be used
         * 5) execution will start with transport dataType and THEN continue down to "*" if needed
         */
        prefilters = {},

        /* Transports bindings
         * 1) key is the dataType
         * 2) the catchall symbol "*" can be used
         * 3) selection will start with transport dataType and THEN go to "*" if needed
         */
        transports = {},

        // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
        allTypes = "*/".concat( "*" ),

        // Anchor tag for parsing the document origin
        originAnchor = document.createElement( "a" );
    originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
    function addToPrefiltersOrTransports( structure ) {

        // dataTypeExpression is optional and defaults to "*"
        return function( dataTypeExpression, func ) {

            if ( typeof dataTypeExpression !== "string" ) {
                func = dataTypeExpression;
                dataTypeExpression = "*";
            }

            var dataType,
                i = 0,
                dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

            if ( jQuery.isFunction( func ) ) {

                // For each dataType in the dataTypeExpression
                while ( ( dataType = dataTypes[ i++ ] ) ) {

                    // Prepend if requested
                    if ( dataType[ 0 ] === "+" ) {
                        dataType = dataType.slice( 1 ) || "*";
                        ( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

                        // Otherwise append
                    } else {
                        ( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
                    }
                }
            }
        };
    }

// Base inspection function for prefilters and transports
    function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

        var inspected = {},
            seekingTransport = ( structure === transports );

        function inspect( dataType ) {
            var selected;
            inspected[ dataType ] = true;
            jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
                var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
                if ( typeof dataTypeOrTransport === "string" &&
                    !seekingTransport && !inspected[ dataTypeOrTransport ] ) {

                    options.dataTypes.unshift( dataTypeOrTransport );
                    inspect( dataTypeOrTransport );
                    return false;
                } else if ( seekingTransport ) {
                    return !( selected = dataTypeOrTransport );
                }
            } );
            return selected;
        }

        return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
    }

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
    function ajaxExtend( target, src ) {
        var key, deep,
            flatOptions = jQuery.ajaxSettings.flatOptions || {};

        for ( key in src ) {
            if ( src[ key ] !== undefined ) {
                ( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
            }
        }
        if ( deep ) {
            jQuery.extend( true, target, deep );
        }

        return target;
    }

    /* Handles responses to an ajax request:
     * - finds the right dataType (mediates between content-type and expected dataType)
     * - returns the corresponding response
     */
    function ajaxHandleResponses( s, jqXHR, responses ) {

        var ct, type, finalDataType, firstDataType,
            contents = s.contents,
            dataTypes = s.dataTypes;

        // Remove auto dataType and get content-type in the process
        while ( dataTypes[ 0 ] === "*" ) {
            dataTypes.shift();
            if ( ct === undefined ) {
                ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
            }
        }

        // Check if we're dealing with a known content-type
        if ( ct ) {
            for ( type in contents ) {
                if ( contents[ type ] && contents[ type ].test( ct ) ) {
                    dataTypes.unshift( type );
                    break;
                }
            }
        }

        // Check to see if we have a response for the expected dataType
        if ( dataTypes[ 0 ] in responses ) {
            finalDataType = dataTypes[ 0 ];
        } else {

            // Try convertible dataTypes
            for ( type in responses ) {
                if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
                    finalDataType = type;
                    break;
                }
                if ( !firstDataType ) {
                    firstDataType = type;
                }
            }

            // Or just use first one
            finalDataType = finalDataType || firstDataType;
        }

        // If we found a dataType
        // We add the dataType to the list if needed
        // and return the corresponding response
        if ( finalDataType ) {
            if ( finalDataType !== dataTypes[ 0 ] ) {
                dataTypes.unshift( finalDataType );
            }
            return responses[ finalDataType ];
        }
    }

    /* Chain conversions given the request and the original response
     * Also sets the responseXXX fields on the jqXHR instance
     */
    function ajaxConvert( s, response, jqXHR, isSuccess ) {
        var conv2, current, conv, tmp, prev,
            converters = {},

            // Work with a copy of dataTypes in case we need to modify it for conversion
            dataTypes = s.dataTypes.slice();

        // Create converters map with lowercased keys
        if ( dataTypes[ 1 ] ) {
            for ( conv in s.converters ) {
                converters[ conv.toLowerCase() ] = s.converters[ conv ];
            }
        }

        current = dataTypes.shift();

        // Convert to each sequential dataType
        while ( current ) {

            if ( s.responseFields[ current ] ) {
                jqXHR[ s.responseFields[ current ] ] = response;
            }

            // Apply the dataFilter if provided
            if ( !prev && isSuccess && s.dataFilter ) {
                response = s.dataFilter( response, s.dataType );
            }

            prev = current;
            current = dataTypes.shift();

            if ( current ) {

                // There's only work to do if current dataType is non-auto
                if ( current === "*" ) {

                    current = prev;

                    // Convert response if prev dataType is non-auto and differs from current
                } else if ( prev !== "*" && prev !== current ) {

                    // Seek a direct converter
                    conv = converters[ prev + " " + current ] || converters[ "* " + current ];

                    // If none found, seek a pair
                    if ( !conv ) {
                        for ( conv2 in converters ) {

                            // If conv2 outputs current
                            tmp = conv2.split( " " );
                            if ( tmp[ 1 ] === current ) {

                                // If prev can be converted to accepted input
                                conv = converters[ prev + " " + tmp[ 0 ] ] ||
                                    converters[ "* " + tmp[ 0 ] ];
                                if ( conv ) {

                                    // Condense equivalence converters
                                    if ( conv === true ) {
                                        conv = converters[ conv2 ];

                                        // Otherwise, insert the intermediate dataType
                                    } else if ( converters[ conv2 ] !== true ) {
                                        current = tmp[ 0 ];
                                        dataTypes.unshift( tmp[ 1 ] );
                                    }
                                    break;
                                }
                            }
                        }
                    }

                    // Apply converter (if not an equivalence)
                    if ( conv !== true ) {

                        // Unless errors are allowed to bubble, catch and return them
                        if ( conv && s.throws ) {
                            response = conv( response );
                        } else {
                            try {
                                response = conv( response );
                            } catch ( e ) {
                                return {
                                    state: "parsererror",
                                    error: conv ? e : "No conversion from " + prev + " to " + current
                                };
                            }
                        }
                    }
                }
            }
        }

        return { state: "success", data: response };
    }

    jQuery.extend( {

        // Counter for holding the number of active queries
        active: 0,

        // Last-Modified header cache for next request
        lastModified: {},
        etag: {},

        ajaxSettings: {
            url: location.href,
            type: "GET",
            isLocal: rlocalProtocol.test( location.protocol ),
            global: true,
            processData: true,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",

            /*
             timeout: 0,
             data: null,
             dataType: null,
             username: null,
             password: null,
             cache: null,
             throws: false,
             traditional: false,
             headers: {},
             */

            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },

            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },

            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },

            // Data converters
            // Keys separate source (or catchall "*") and destination types with a single space
            converters: {

                // Convert anything to text
                "* text": String,

                // Text to html (true = no transformation)
                "text html": true,

                // Evaluate text as a json expression
                "text json": JSON.parse,

                // Parse text as xml
                "text xml": jQuery.parseXML
            },

            // For options that shouldn't be deep extended:
            // you can add your own custom options here if
            // and when you create one that shouldn't be
            // deep extended (see ajaxExtend)
            flatOptions: {
                url: true,
                context: true
            }
        },

        // Creates a full fledged settings object into target
        // with both ajaxSettings and settings fields.
        // If target is omitted, writes into ajaxSettings.
        ajaxSetup: function( target, settings ) {
            return settings ?

                // Building a settings object
                ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

                // Extending ajaxSettings
                ajaxExtend( jQuery.ajaxSettings, target );
        },

        ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
        ajaxTransport: addToPrefiltersOrTransports( transports ),

        // Main method
        ajax: function( url, options ) {

            // If url is an object, simulate pre-1.5 signature
            if ( typeof url === "object" ) {
                options = url;
                url = undefined;
            }

            // Force options to be an object
            options = options || {};

            var transport,

                // URL without anti-cache param
                cacheURL,

                // Response headers
                responseHeadersString,
                responseHeaders,

                // timeout handle
                timeoutTimer,

                // Url cleanup var
                urlAnchor,

                // Request state (becomes false upon send and true upon completion)
                completed,

                // To know if global events are to be dispatched
                fireGlobals,

                // Loop variable
                i,

                // uncached part of the url
                uncached,

                // Create the final options object
                s = jQuery.ajaxSetup( {}, options ),

                // Callbacks context
                callbackContext = s.context || s,

                // Context for global events is callbackContext if it is a DOM node or jQuery collection
                globalEventContext = s.context &&
                ( callbackContext.nodeType || callbackContext.jquery ) ?
                    jQuery( callbackContext ) :
                    jQuery.event,

                // Deferreds
                deferred = jQuery.Deferred(),
                completeDeferred = jQuery.Callbacks( "once memory" ),

                // Status-dependent callbacks
                statusCode = s.statusCode || {},

                // Headers (they are sent all at once)
                requestHeaders = {},
                requestHeadersNames = {},

                // Default abort message
                strAbort = "canceled",

                // Fake xhr
                jqXHR = {
                    readyState: 0,

                    // Builds headers hashtable if needed
                    getResponseHeader: function( key ) {
                        var match;
                        if ( completed ) {
                            if ( !responseHeaders ) {
                                responseHeaders = {};
                                while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
                                    responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
                                }
                            }
                            match = responseHeaders[ key.toLowerCase() ];
                        }
                        return match == null ? null : match;
                    },

                    // Raw string
                    getAllResponseHeaders: function() {
                        return completed ? responseHeadersString : null;
                    },

                    // Caches the header
                    setRequestHeader: function( name, value ) {
                        if ( completed == null ) {
                            name = requestHeadersNames[ name.toLowerCase() ] =
                                requestHeadersNames[ name.toLowerCase() ] || name;
                            requestHeaders[ name ] = value;
                        }
                        return this;
                    },

                    // Overrides response content-type header
                    overrideMimeType: function( type ) {
                        if ( completed == null ) {
                            s.mimeType = type;
                        }
                        return this;
                    },

                    // Status-dependent callbacks
                    statusCode: function( map ) {
                        var code;
                        if ( map ) {
                            if ( completed ) {

                                // Execute the appropriate callbacks
                                jqXHR.always( map[ jqXHR.status ] );
                            } else {

                                // Lazy-add the new callbacks in a way that preserves old ones
                                for ( code in map ) {
                                    statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
                                }
                            }
                        }
                        return this;
                    },

                    // Cancel the request
                    abort: function( statusText ) {
                        var finalText = statusText || strAbort;
                        if ( transport ) {
                            transport.abort( finalText );
                        }
                        done( 0, finalText );
                        return this;
                    }
                };

            // Attach deferreds
            deferred.promise( jqXHR );

            // Add protocol if not provided (prefilters might expect it)
            // Handle falsy url in the settings object (#10093: consistency with old signature)
            // We also use the url parameter if available
            s.url = ( ( url || s.url || location.href ) + "" )
                .replace( rprotocol, location.protocol + "//" );

            // Alias method option to type as per ticket #12004
            s.type = options.method || options.type || s.method || s.type;

            // Extract dataTypes list
            s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

            // A cross-domain request is in order when the origin doesn't match the current origin.
            if ( s.crossDomain == null ) {
                urlAnchor = document.createElement( "a" );

                // Support: IE <=8 - 11, Edge 12 - 13
                // IE throws exception on accessing the href property if url is malformed,
                // e.g. http://example.com:80x/
                try {
                    urlAnchor.href = s.url;

                    // Support: IE <=8 - 11 only
                    // Anchor's host property isn't correctly set when s.url is relative
                    urlAnchor.href = urlAnchor.href;
                    s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
                        urlAnchor.protocol + "//" + urlAnchor.host;
                } catch ( e ) {

                    // If there is an error parsing the URL, assume it is crossDomain,
                    // it can be rejected by the transport if it is invalid
                    s.crossDomain = true;
                }
            }

            // Convert data if not already a string
            if ( s.data && s.processData && typeof s.data !== "string" ) {
                s.data = jQuery.param( s.data, s.traditional );
            }

            // Apply prefilters
            inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

            // If request was aborted inside a prefilter, stop there
            if ( completed ) {
                return jqXHR;
            }

            // We can fire global events as of now if asked to
            // Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
            fireGlobals = jQuery.event && s.global;

            // Watch for a new set of requests
            if ( fireGlobals && jQuery.active++ === 0 ) {
                jQuery.event.trigger( "ajaxStart" );
            }

            // Uppercase the type
            s.type = s.type.toUpperCase();

            // Determine if request has content
            s.hasContent = !rnoContent.test( s.type );

            // Save the URL in case we're toying with the If-Modified-Since
            // and/or If-None-Match header later on
            // Remove hash to simplify url manipulation
            cacheURL = s.url.replace( rhash, "" );

            // More options handling for requests with no content
            if ( !s.hasContent ) {

                // Remember the hash so we can put it back
                uncached = s.url.slice( cacheURL.length );

                // If data is available, append data to url
                if ( s.data ) {
                    cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

                    // #9682: remove data so that it's not used in an eventual retry
                    delete s.data;
                }

                // Add or update anti-cache param if needed
                if ( s.cache === false ) {
                    cacheURL = cacheURL.replace( rantiCache, "$1" );
                    uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
                }

                // Put hash and anti-cache on the URL that will be requested (gh-1732)
                s.url = cacheURL + uncached;

                // Change '%20' to '+' if this is encoded form body content (gh-2658)
            } else if ( s.data && s.processData &&
                ( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
                s.data = s.data.replace( r20, "+" );
            }

            // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
            if ( s.ifModified ) {
                if ( jQuery.lastModified[ cacheURL ] ) {
                    jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
                }
                if ( jQuery.etag[ cacheURL ] ) {
                    jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
                }
            }

            // Set the correct header, if data is being sent
            if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
                jqXHR.setRequestHeader( "Content-Type", s.contentType );
            }

            // Set the Accepts header for the server, depending on the dataType
            jqXHR.setRequestHeader(
                "Accept",
                s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
                    s.accepts[ s.dataTypes[ 0 ] ] +
                    ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
                    s.accepts[ "*" ]
            );

            // Check for headers option
            for ( i in s.headers ) {
                jqXHR.setRequestHeader( i, s.headers[ i ] );
            }

            // Allow custom headers/mimetypes and early abort
            if ( s.beforeSend &&
                ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

                // Abort if not done already and return
                return jqXHR.abort();
            }

            // Aborting is no longer a cancellation
            strAbort = "abort";

            // Install callbacks on deferreds
            completeDeferred.add( s.complete );
            jqXHR.done( s.success );
            jqXHR.fail( s.error );

            // Get transport
            transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

            // If no transport, we auto-abort
            if ( !transport ) {
                done( -1, "No Transport" );
            } else {
                jqXHR.readyState = 1;

                // Send global event
                if ( fireGlobals ) {
                    globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
                }

                // If request was aborted inside ajaxSend, stop there
                if ( completed ) {
                    return jqXHR;
                }

                // Timeout
                if ( s.async && s.timeout > 0 ) {
                    timeoutTimer = window.setTimeout( function() {
                        jqXHR.abort( "timeout" );
                    }, s.timeout );
                }

                try {
                    completed = false;
                    transport.send( requestHeaders, done );
                } catch ( e ) {

                    // Rethrow post-completion exceptions
                    if ( completed ) {
                        throw e;
                    }

                    // Propagate others as results
                    done( -1, e );
                }
            }

            // Callback for when everything is done
            function done( status, nativeStatusText, responses, headers ) {
                var isSuccess, success, error, response, modified,
                    statusText = nativeStatusText;

                // Ignore repeat invocations
                if ( completed ) {
                    return;
                }

                completed = true;

                // Clear timeout if it exists
                if ( timeoutTimer ) {
                    window.clearTimeout( timeoutTimer );
                }

                // Dereference transport for early garbage collection
                // (no matter how long the jqXHR object will be used)
                transport = undefined;

                // Cache response headers
                responseHeadersString = headers || "";

                // Set readyState
                jqXHR.readyState = status > 0 ? 4 : 0;

                // Determine if successful
                isSuccess = status >= 200 && status < 300 || status === 304;

                // Get response data
                if ( responses ) {
                    response = ajaxHandleResponses( s, jqXHR, responses );
                }

                // Convert no matter what (that way responseXXX fields are always set)
                response = ajaxConvert( s, response, jqXHR, isSuccess );

                // If successful, handle type chaining
                if ( isSuccess ) {

                    // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
                    if ( s.ifModified ) {
                        modified = jqXHR.getResponseHeader( "Last-Modified" );
                        if ( modified ) {
                            jQuery.lastModified[ cacheURL ] = modified;
                        }
                        modified = jqXHR.getResponseHeader( "etag" );
                        if ( modified ) {
                            jQuery.etag[ cacheURL ] = modified;
                        }
                    }

                    // if no content
                    if ( status === 204 || s.type === "HEAD" ) {
                        statusText = "nocontent";

                        // if not modified
                    } else if ( status === 304 ) {
                        statusText = "notmodified";

                        // If we have data, let's convert it
                    } else {
                        statusText = response.state;
                        success = response.data;
                        error = response.error;
                        isSuccess = !error;
                    }
                } else {

                    // Extract error from statusText and normalize for non-aborts
                    error = statusText;
                    if ( status || !statusText ) {
                        statusText = "error";
                        if ( status < 0 ) {
                            status = 0;
                        }
                    }
                }

                // Set data for the fake xhr object
                jqXHR.status = status;
                jqXHR.statusText = ( nativeStatusText || statusText ) + "";

                // Success/Error
                if ( isSuccess ) {
                    deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
                } else {
                    deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
                }

                // Status-dependent callbacks
                jqXHR.statusCode( statusCode );
                statusCode = undefined;

                if ( fireGlobals ) {
                    globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
                        [ jqXHR, s, isSuccess ? success : error ] );
                }

                // Complete
                completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

                if ( fireGlobals ) {
                    globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

                    // Handle the global AJAX counter
                    if ( !( --jQuery.active ) ) {
                        jQuery.event.trigger( "ajaxStop" );
                    }
                }
            }

            return jqXHR;
        },

        getJSON: function( url, data, callback ) {
            return jQuery.get( url, data, callback, "json" );
        },

        getScript: function( url, callback ) {
            return jQuery.get( url, undefined, callback, "script" );
        }
    } );

    jQuery.each( [ "get", "post" ], function( i, method ) {
        jQuery[ method ] = function( url, data, callback, type ) {

            // Shift arguments if data argument was omitted
            if ( jQuery.isFunction( data ) ) {
                type = type || callback;
                callback = data;
                data = undefined;
            }

            // The url can be an options object (which then must have .url)
            return jQuery.ajax( jQuery.extend( {
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            }, jQuery.isPlainObject( url ) && url ) );
        };
    } );


    jQuery._evalUrl = function( url ) {
        return jQuery.ajax( {
            url: url,

            // Make this explicit, since user can override this through ajaxSetup (#11264)
            type: "GET",
            dataType: "script",
            cache: true,
            async: false,
            global: false,
            "throws": true
        } );
    };


    jQuery.fn.extend( {
        wrapAll: function( html ) {
            var wrap;

            if ( this[ 0 ] ) {
                if ( jQuery.isFunction( html ) ) {
                    html = html.call( this[ 0 ] );
                }

                // The elements to wrap the target around
                wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

                if ( this[ 0 ].parentNode ) {
                    wrap.insertBefore( this[ 0 ] );
                }

                wrap.map( function() {
                    var elem = this;

                    while ( elem.firstElementChild ) {
                        elem = elem.firstElementChild;
                    }

                    return elem;
                } ).append( this );
            }

            return this;
        },

        wrapInner: function( html ) {
            if ( jQuery.isFunction( html ) ) {
                return this.each( function( i ) {
                    jQuery( this ).wrapInner( html.call( this, i ) );
                } );
            }

            return this.each( function() {
                var self = jQuery( this ),
                    contents = self.contents();

                if ( contents.length ) {
                    contents.wrapAll( html );

                } else {
                    self.append( html );
                }
            } );
        },

        wrap: function( html ) {
            var isFunction = jQuery.isFunction( html );

            return this.each( function( i ) {
                jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
            } );
        },

        unwrap: function( selector ) {
            this.parent( selector ).not( "body" ).each( function() {
                jQuery( this ).replaceWith( this.childNodes );
            } );
            return this;
        }
    } );


    jQuery.expr.pseudos.hidden = function( elem ) {
        return !jQuery.expr.pseudos.visible( elem );
    };
    jQuery.expr.pseudos.visible = function( elem ) {
        return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
    };




    jQuery.ajaxSettings.xhr = function() {
        try {
            return new window.XMLHttpRequest();
        } catch ( e ) {}
    };

    var xhrSuccessStatus = {

            // File protocol always yields status code 0, assume 200
            0: 200,

            // Support: IE <=9 only
            // #1450: sometimes IE returns 1223 when it should be 204
            1223: 204
        },
        xhrSupported = jQuery.ajaxSettings.xhr();

    support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
    support.ajax = xhrSupported = !!xhrSupported;

    jQuery.ajaxTransport( function( options ) {
        var callback, errorCallback;

        // Cross domain only allowed if supported through XMLHttpRequest
        if ( support.cors || xhrSupported && !options.crossDomain ) {
            return {
                send: function( headers, complete ) {
                    var i,
                        xhr = options.xhr();

                    xhr.open(
                        options.type,
                        options.url,
                        options.async,
                        options.username,
                        options.password
                    );

                    // Apply custom fields if provided
                    if ( options.xhrFields ) {
                        for ( i in options.xhrFields ) {
                            xhr[ i ] = options.xhrFields[ i ];
                        }
                    }

                    // Override mime type if needed
                    if ( options.mimeType && xhr.overrideMimeType ) {
                        xhr.overrideMimeType( options.mimeType );
                    }

                    // X-Requested-With header
                    // For cross-domain requests, seeing as conditions for a preflight are
                    // akin to a jigsaw puzzle, we simply never set it to be sure.
                    // (it can always be set on a per-request basis or even using ajaxSetup)
                    // For same-domain requests, won't change header if already provided.
                    if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
                        headers[ "X-Requested-With" ] = "XMLHttpRequest";
                    }

                    // Set headers
                    for ( i in headers ) {
                        xhr.setRequestHeader( i, headers[ i ] );
                    }

                    // Callback
                    callback = function( type ) {
                        return function() {
                            if ( callback ) {
                                callback = errorCallback = xhr.onload =
                                    xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

                                if ( type === "abort" ) {
                                    xhr.abort();
                                } else if ( type === "error" ) {

                                    // Support: IE <=9 only
                                    // On a manual native abort, IE9 throws
                                    // errors on any property access that is not readyState
                                    if ( typeof xhr.status !== "number" ) {
                                        complete( 0, "error" );
                                    } else {
                                        complete(

                                            // File: protocol always yields status 0; see #8605, #14207
                                            xhr.status,
                                            xhr.statusText
                                        );
                                    }
                                } else {
                                    complete(
                                        xhrSuccessStatus[ xhr.status ] || xhr.status,
                                        xhr.statusText,

                                        // Support: IE <=9 only
                                        // IE9 has no XHR2 but throws on binary (trac-11426)
                                        // For XHR2 non-text, let the caller handle it (gh-2498)
                                        ( xhr.responseType || "text" ) !== "text"  ||
                                        typeof xhr.responseText !== "string" ?
                                            { binary: xhr.response } :
                                            { text: xhr.responseText },
                                        xhr.getAllResponseHeaders()
                                    );
                                }
                            }
                        };
                    };

                    // Listen to events
                    xhr.onload = callback();
                    errorCallback = xhr.onerror = callback( "error" );

                    // Support: IE 9 only
                    // Use onreadystatechange to replace onabort
                    // to handle uncaught aborts
                    if ( xhr.onabort !== undefined ) {
                        xhr.onabort = errorCallback;
                    } else {
                        xhr.onreadystatechange = function() {

                            // Check readyState before timeout as it changes
                            if ( xhr.readyState === 4 ) {

                                // Allow onerror to be called first,
                                // but that will not handle a native abort
                                // Also, save errorCallback to a variable
                                // as xhr.onerror cannot be accessed
                                window.setTimeout( function() {
                                    if ( callback ) {
                                        errorCallback();
                                    }
                                } );
                            }
                        };
                    }

                    // Create the abort callback
                    callback = callback( "abort" );

                    try {

                        // Do send the request (this may raise an exception)
                        xhr.send( options.hasContent && options.data || null );
                    } catch ( e ) {

                        // #14683: Only rethrow if this hasn't been notified as an error yet
                        if ( callback ) {
                            throw e;
                        }
                    }
                },

                abort: function() {
                    if ( callback ) {
                        callback();
                    }
                }
            };
        }
    } );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
    jQuery.ajaxPrefilter( function( s ) {
        if ( s.crossDomain ) {
            s.contents.script = false;
        }
    } );

// Install script dataType
    jQuery.ajaxSetup( {
        accepts: {
            script: "text/javascript, application/javascript, " +
            "application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function( text ) {
                jQuery.globalEval( text );
                return text;
            }
        }
    } );

// Handle cache's special case and crossDomain
    jQuery.ajaxPrefilter( "script", function( s ) {
        if ( s.cache === undefined ) {
            s.cache = false;
        }
        if ( s.crossDomain ) {
            s.type = "GET";
        }
    } );

// Bind script tag hack transport
    jQuery.ajaxTransport( "script", function( s ) {

        // This transport only deals with cross domain requests
        if ( s.crossDomain ) {
            var script, callback;
            return {
                send: function( _, complete ) {
                    script = jQuery( "<script>" ).prop( {
                        charset: s.scriptCharset,
                        src: s.url
                    } ).on(
                        "load error",
                        callback = function( evt ) {
                            script.remove();
                            callback = null;
                            if ( evt ) {
                                complete( evt.type === "error" ? 404 : 200, evt.type );
                            }
                        }
                    );

                    // Use native DOM manipulation to avoid our domManip AJAX trickery
                    document.head.appendChild( script[ 0 ] );
                },
                abort: function() {
                    if ( callback ) {
                        callback();
                    }
                }
            };
        }
    } );




    var oldCallbacks = [],
        rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
    jQuery.ajaxSetup( {
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
            this[ callback ] = true;
            return callback;
        }
    } );

// Detect, normalize options and install callbacks for jsonp requests
    jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

        var callbackName, overwritten, responseContainer,
            jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
                        "url" :
                        typeof s.data === "string" &&
                        ( s.contentType || "" )
                            .indexOf( "application/x-www-form-urlencoded" ) === 0 &&
                        rjsonp.test( s.data ) && "data"
                );

        // Handle iff the expected data type is "jsonp" or we have a parameter to set
        if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

            // Get callback name, remembering preexisting value associated with it
            callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
                s.jsonpCallback() :
                s.jsonpCallback;

            // Insert callback into url or form data
            if ( jsonProp ) {
                s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
            } else if ( s.jsonp !== false ) {
                s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
            }

            // Use data converter to retrieve json after script execution
            s.converters[ "script json" ] = function() {
                if ( !responseContainer ) {
                    jQuery.error( callbackName + " was not called" );
                }
                return responseContainer[ 0 ];
            };

            // Force json dataType
            s.dataTypes[ 0 ] = "json";

            // Install callback
            overwritten = window[ callbackName ];
            window[ callbackName ] = function() {
                responseContainer = arguments;
            };

            // Clean-up function (fires after converters)
            jqXHR.always( function() {

                // If previous value didn't exist - remove it
                if ( overwritten === undefined ) {
                    jQuery( window ).removeProp( callbackName );

                    // Otherwise restore preexisting value
                } else {
                    window[ callbackName ] = overwritten;
                }

                // Save back as free
                if ( s[ callbackName ] ) {

                    // Make sure that re-using the options doesn't screw things around
                    s.jsonpCallback = originalSettings.jsonpCallback;

                    // Save the callback name for future use
                    oldCallbacks.push( callbackName );
                }

                // Call if it was a function and we have a response
                if ( responseContainer && jQuery.isFunction( overwritten ) ) {
                    overwritten( responseContainer[ 0 ] );
                }

                responseContainer = overwritten = undefined;
            } );

            // Delegate to script
            return "script";
        }
    } );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
    support.createHTMLDocument = ( function() {
        var body = document.implementation.createHTMLDocument( "" ).body;
        body.innerHTML = "<form></form><form></form>";
        return body.childNodes.length === 2;
    } )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
    jQuery.parseHTML = function( data, context, keepScripts ) {
        if ( typeof data !== "string" ) {
            return [];
        }
        if ( typeof context === "boolean" ) {
            keepScripts = context;
            context = false;
        }

        var base, parsed, scripts;

        if ( !context ) {

            // Stop scripts or inline event handlers from being executed immediately
            // by using document.implementation
            if ( support.createHTMLDocument ) {
                context = document.implementation.createHTMLDocument( "" );

                // Set the base href for the created document
                // so any parsed elements with URLs
                // are based on the document's URL (gh-2965)
                base = context.createElement( "base" );
                base.href = document.location.href;
                context.head.appendChild( base );
            } else {
                context = document;
            }
        }

        parsed = rsingleTag.exec( data );
        scripts = !keepScripts && [];

        // Single tag
        if ( parsed ) {
            return [ context.createElement( parsed[ 1 ] ) ];
        }

        parsed = buildFragment( [ data ], context, scripts );

        if ( scripts && scripts.length ) {
            jQuery( scripts ).remove();
        }

        return jQuery.merge( [], parsed.childNodes );
    };


    /**
     * Load a url into a page
     */
    jQuery.fn.load = function( url, params, callback ) {
        var selector, type, response,
            self = this,
            off = url.indexOf( " " );

        if ( off > -1 ) {
            selector = stripAndCollapse( url.slice( off ) );
            url = url.slice( 0, off );
        }

        // If it's a function
        if ( jQuery.isFunction( params ) ) {

            // We assume that it's the callback
            callback = params;
            params = undefined;

            // Otherwise, build a param string
        } else if ( params && typeof params === "object" ) {
            type = "POST";
        }

        // If we have elements to modify, make the request
        if ( self.length > 0 ) {
            jQuery.ajax( {
                url: url,

                // If "type" variable is undefined, then "GET" method will be used.
                // Make value of this field explicit since
                // user can override it through ajaxSetup method
                type: type || "GET",
                dataType: "html",
                data: params
            } ).done( function( responseText ) {

                // Save response for use in complete callback
                response = arguments;

                self.html( selector ?

                    // If a selector was specified, locate the right elements in a dummy div
                    // Exclude scripts to avoid IE 'Permission Denied' errors
                    jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

                    // Otherwise use the full result
                    responseText );

                // If the request succeeds, this function gets "data", "status", "jqXHR"
                // but they are ignored because response was set above.
                // If it fails, this function gets "jqXHR", "status", "error"
            } ).always( callback && function( jqXHR, status ) {
                    self.each( function() {
                        callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
                    } );
                } );
        }

        return this;
    };




// Attach a bunch of functions for handling common AJAX events
    jQuery.each( [
        "ajaxStart",
        "ajaxStop",
        "ajaxComplete",
        "ajaxError",
        "ajaxSuccess",
        "ajaxSend"
    ], function( i, type ) {
        jQuery.fn[ type ] = function( fn ) {
            return this.on( type, fn );
        };
    } );




    jQuery.expr.pseudos.animated = function( elem ) {
        return jQuery.grep( jQuery.timers, function( fn ) {
            return elem === fn.elem;
        } ).length;
    };




    jQuery.offset = {
        setOffset: function( elem, options, i ) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
                position = jQuery.css( elem, "position" ),
                curElem = jQuery( elem ),
                props = {};

            // Set position first, in-case top/left are set even on static elem
            if ( position === "static" ) {
                elem.style.position = "relative";
            }

            curOffset = curElem.offset();
            curCSSTop = jQuery.css( elem, "top" );
            curCSSLeft = jQuery.css( elem, "left" );
            calculatePosition = ( position === "absolute" || position === "fixed" ) &&
                ( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

            // Need to be able to calculate position if either
            // top or left is auto and position is either absolute or fixed
            if ( calculatePosition ) {
                curPosition = curElem.position();
                curTop = curPosition.top;
                curLeft = curPosition.left;

            } else {
                curTop = parseFloat( curCSSTop ) || 0;
                curLeft = parseFloat( curCSSLeft ) || 0;
            }

            if ( jQuery.isFunction( options ) ) {

                // Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
                options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
            }

            if ( options.top != null ) {
                props.top = ( options.top - curOffset.top ) + curTop;
            }
            if ( options.left != null ) {
                props.left = ( options.left - curOffset.left ) + curLeft;
            }

            if ( "using" in options ) {
                options.using.call( elem, props );

            } else {
                curElem.css( props );
            }
        }
    };

    jQuery.fn.extend( {
        offset: function( options ) {

            // Preserve chaining for setter
            if ( arguments.length ) {
                return options === undefined ?
                    this :
                    this.each( function( i ) {
                        jQuery.offset.setOffset( this, options, i );
                    } );
            }

            var doc, docElem, rect, win,
                elem = this[ 0 ];

            if ( !elem ) {
                return;
            }

            // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
            // Support: IE <=11 only
            // Running getBoundingClientRect on a
            // disconnected node in IE throws an error
            if ( !elem.getClientRects().length ) {
                return { top: 0, left: 0 };
            }

            rect = elem.getBoundingClientRect();

            doc = elem.ownerDocument;
            docElem = doc.documentElement;
            win = doc.defaultView;

            return {
                top: rect.top + win.pageYOffset - docElem.clientTop,
                left: rect.left + win.pageXOffset - docElem.clientLeft
            };
        },

        position: function() {
            if ( !this[ 0 ] ) {
                return;
            }

            var offsetParent, offset,
                elem = this[ 0 ],
                parentOffset = { top: 0, left: 0 };

            // Fixed elements are offset from window (parentOffset = {top:0, left: 0},
            // because it is its only offset parent
            if ( jQuery.css( elem, "position" ) === "fixed" ) {

                // Assume getBoundingClientRect is there when computed position is fixed
                offset = elem.getBoundingClientRect();

            } else {

                // Get *real* offsetParent
                offsetParent = this.offsetParent();

                // Get correct offsets
                offset = this.offset();
                if ( !nodeName( offsetParent[ 0 ], "html" ) ) {
                    parentOffset = offsetParent.offset();
                }

                // Add offsetParent borders
                parentOffset = {
                    top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
                    left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
                };
            }

            // Subtract parent offsets and element margins
            return {
                top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
                left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
            };
        },

        // This method will return documentElement in the following cases:
        // 1) For the element inside the iframe without offsetParent, this method will return
        //    documentElement of the parent window
        // 2) For the hidden or detached element
        // 3) For body or html element, i.e. in case of the html node - it will return itself
        //
        // but those exceptions were never presented as a real life use-cases
        // and might be considered as more preferable results.
        //
        // This logic, however, is not guaranteed and can change at any point in the future
        offsetParent: function() {
            return this.map( function() {
                var offsetParent = this.offsetParent;

                while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
                    offsetParent = offsetParent.offsetParent;
                }

                return offsetParent || documentElement;
            } );
        }
    } );

// Create scrollLeft and scrollTop methods
    jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
        var top = "pageYOffset" === prop;

        jQuery.fn[ method ] = function( val ) {
            return access( this, function( elem, method, val ) {

                // Coalesce documents and windows
                var win;
                if ( jQuery.isWindow( elem ) ) {
                    win = elem;
                } else if ( elem.nodeType === 9 ) {
                    win = elem.defaultView;
                }

                if ( val === undefined ) {
                    return win ? win[ prop ] : elem[ method ];
                }

                if ( win ) {
                    win.scrollTo(
                        !top ? val : win.pageXOffset,
                        top ? val : win.pageYOffset
                    );

                } else {
                    elem[ method ] = val;
                }
            }, method, val, arguments.length );
        };
    } );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
    jQuery.each( [ "top", "left" ], function( i, prop ) {
        jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
            function( elem, computed ) {
                if ( computed ) {
                    computed = curCSS( elem, prop );

                    // If curCSS returns percentage, fallback to offset
                    return rnumnonpx.test( computed ) ?
                        jQuery( elem ).position()[ prop ] + "px" :
                        computed;
                }
            }
        );
    } );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
    jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
        jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
            function( defaultExtra, funcName ) {

                // Margin is only for outerHeight, outerWidth
                jQuery.fn[ funcName ] = function( margin, value ) {
                    var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
                        extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

                    return access( this, function( elem, type, value ) {
                        var doc;

                        if ( jQuery.isWindow( elem ) ) {

                            // $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
                            return funcName.indexOf( "outer" ) === 0 ?
                                elem[ "inner" + name ] :
                                elem.document.documentElement[ "client" + name ];
                        }

                        // Get document width or height
                        if ( elem.nodeType === 9 ) {
                            doc = elem.documentElement;

                            // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
                            // whichever is greatest
                            return Math.max(
                                elem.body[ "scroll" + name ], doc[ "scroll" + name ],
                                elem.body[ "offset" + name ], doc[ "offset" + name ],
                                doc[ "client" + name ]
                            );
                        }

                        return value === undefined ?

                            // Get width or height on the element, requesting but not forcing parseFloat
                            jQuery.css( elem, type, extra ) :

                            // Set width or height on the element
                            jQuery.style( elem, type, value, extra );
                    }, type, chainable ? margin : undefined, chainable );
                };
            } );
    } );


    jQuery.fn.extend( {

        bind: function( types, data, fn ) {
            return this.on( types, null, data, fn );
        },
        unbind: function( types, fn ) {
            return this.off( types, null, fn );
        },

        delegate: function( selector, types, data, fn ) {
            return this.on( types, selector, data, fn );
        },
        undelegate: function( selector, types, fn ) {

            // ( namespace ) or ( selector, types [, fn] )
            return arguments.length === 1 ?
                this.off( selector, "**" ) :
                this.off( types, selector || "**", fn );
        },
        holdReady: function( hold ) {
            if ( hold ) {
                jQuery.readyWait++;
            } else {
                jQuery.ready( true );
            }
        }
    } );

    jQuery.isArray = Array.isArray;
    jQuery.parseJSON = JSON.parse;
    jQuery.nodeName = nodeName;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

    if ( typeof define === "function" && define.amd ) {
        define( "jquery", [], function() {
            return jQuery;
        } );
    }




    var

        // Map over jQuery in case of overwrite
        _jQuery = window.jQuery,

        // Map over the $ in case of overwrite
        _$ = window.$;

    jQuery.noConflict = function( deep ) {
        if ( window.$ === jQuery ) {
            window.$ = _$;
        }

        if ( deep && window.jQuery === jQuery ) {
            window.jQuery = _jQuery;
        }

        return jQuery;
    };

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
    if ( !noGlobal ) {
        window.jQuery = window.$ = jQuery;
    }




    return jQuery;
} );
(function(){var define=null;!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.eio=e():t.eio=e()}(this,function(){return function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return t[n].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}([function(t,e,r){"use strict";t.exports=r(1)},function(t,e,r){"use strict";t.exports=r(2),t.exports.parser=r(9)},function(t,e,r){(function(e){"use strict";function n(t,r){if(!(this instanceof n))return new n(t,r);r=r||{},t&&"object"===("undefined"==typeof t?"undefined":i(t))&&(r=t,t=null),t?(t=h(t),r.hostname=t.host,r.secure="https"===t.protocol||"wss"===t.protocol,r.port=t.port,t.query&&(r.query=t.query)):r.host&&(r.hostname=h(r.host).host),this.secure=null!=r.secure?r.secure:e.location&&"https:"===location.protocol,r.hostname&&!r.port&&(r.port=this.secure?"443":"80"),this.agent=r.agent||!1,this.hostname=r.hostname||(e.location?location.hostname:"localhost"),this.port=r.port||(e.location&&location.port?location.port:this.secure?443:80),this.query=r.query||{},"string"==typeof this.query&&(this.query=l.decode(this.query)),this.upgrade=!1!==r.upgrade,this.path=(r.path||"/engine.io").replace(/\/$/,"")+"/",this.forceJSONP=!!r.forceJSONP,this.jsonp=!1!==r.jsonp,this.forceBase64=!!r.forceBase64,this.enablesXDR=!!r.enablesXDR,this.timestampParam=r.timestampParam||"t",this.timestampRequests=r.timestampRequests,this.transports=r.transports||["polling","websocket"],this.readyState="",this.writeBuffer=[],this.prevBufferLen=0,this.policyPort=r.policyPort||843,this.rememberUpgrade=r.rememberUpgrade||!1,this.binaryType=null,this.onlyBinaryUpgrades=r.onlyBinaryUpgrades,this.perMessageDeflate=!1!==r.perMessageDeflate&&(r.perMessageDeflate||{}),!0===this.perMessageDeflate&&(this.perMessageDeflate={}),this.perMessageDeflate&&null==this.perMessageDeflate.threshold&&(this.perMessageDeflate.threshold=1024),this.pfx=r.pfx||null,this.key=r.key||null,this.passphrase=r.passphrase||null,this.cert=r.cert||null,this.ca=r.ca||null,this.ciphers=r.ciphers||null,this.rejectUnauthorized=void 0===r.rejectUnauthorized?null:r.rejectUnauthorized,this.forceNode=!!r.forceNode;var o="object"===("undefined"==typeof e?"undefined":i(e))&&e;o.global===o&&(r.extraHeaders&&Object.keys(r.extraHeaders).length>0&&(this.extraHeaders=r.extraHeaders),r.localAddress&&(this.localAddress=r.localAddress)),this.id=null,this.upgrades=null,this.pingInterval=null,this.pingTimeout=null,this.pingIntervalTimer=null,this.pingTimeoutTimer=null,this.open()}function o(t){var e={};for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);return e}var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s=r(3),a=r(19),c=r(23)("engine.io-client:socket"),u=r(30),p=r(9),h=r(31),f=r(32),l=r(20);t.exports=n,n.priorWebsocketSuccess=!1,a(n.prototype),n.protocol=p.protocol,n.Socket=n,n.Transport=r(8),n.transports=r(3),n.parser=r(9),n.prototype.createTransport=function(t){c('creating transport "%s"',t);var e=o(this.query);e.EIO=p.protocol,e.transport=t,this.id&&(e.sid=this.id);var r=new s[t]({agent:this.agent,hostname:this.hostname,port:this.port,secure:this.secure,path:this.path,query:e,forceJSONP:this.forceJSONP,jsonp:this.jsonp,forceBase64:this.forceBase64,enablesXDR:this.enablesXDR,timestampRequests:this.timestampRequests,timestampParam:this.timestampParam,policyPort:this.policyPort,socket:this,pfx:this.pfx,key:this.key,passphrase:this.passphrase,cert:this.cert,ca:this.ca,ciphers:this.ciphers,rejectUnauthorized:this.rejectUnauthorized,perMessageDeflate:this.perMessageDeflate,extraHeaders:this.extraHeaders,forceNode:this.forceNode,localAddress:this.localAddress});return r},n.prototype.open=function(){var t;if(this.rememberUpgrade&&n.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1)t="websocket";else{if(0===this.transports.length){var e=this;return void setTimeout(function(){e.emit("error","No transports available")},0)}t=this.transports[0]}this.readyState="opening";try{t=this.createTransport(t)}catch(r){return this.transports.shift(),void this.open()}t.open(),this.setTransport(t)},n.prototype.setTransport=function(t){c("setting transport %s",t.name);var e=this;this.transport&&(c("clearing existing transport %s",this.transport.name),this.transport.removeAllListeners()),this.transport=t,t.on("drain",function(){e.onDrain()}).on("packet",function(t){e.onPacket(t)}).on("error",function(t){e.onError(t)}).on("close",function(){e.onClose("transport close")})},n.prototype.probe=function(t){function e(){if(f.onlyBinaryUpgrades){var e=!this.supportsBinary&&f.transport.supportsBinary;h=h||e}h||(c('probe transport "%s" opened',t),p.send([{type:"ping",data:"probe"}]),p.once("packet",function(e){if(!h)if("pong"===e.type&&"probe"===e.data){if(c('probe transport "%s" pong',t),f.upgrading=!0,f.emit("upgrading",p),!p)return;n.priorWebsocketSuccess="websocket"===p.name,c('pausing current transport "%s"',f.transport.name),f.transport.pause(function(){h||"closed"!==f.readyState&&(c("changing transport and sending upgrade packet"),u(),f.setTransport(p),p.send([{type:"upgrade"}]),f.emit("upgrade",p),p=null,f.upgrading=!1,f.flush())})}else{c('probe transport "%s" failed',t);var r=new Error("probe error");r.transport=p.name,f.emit("upgradeError",r)}}))}function r(){h||(h=!0,u(),p.close(),p=null)}function o(e){var n=new Error("probe error: "+e);n.transport=p.name,r(),c('probe transport "%s" failed because of error: %s',t,e),f.emit("upgradeError",n)}function i(){o("transport closed")}function s(){o("socket closed")}function a(t){p&&t.name!==p.name&&(c('"%s" works - aborting "%s"',t.name,p.name),r())}function u(){p.removeListener("open",e),p.removeListener("error",o),p.removeListener("close",i),f.removeListener("close",s),f.removeListener("upgrading",a)}c('probing transport "%s"',t);var p=this.createTransport(t,{probe:1}),h=!1,f=this;n.priorWebsocketSuccess=!1,p.once("open",e),p.once("error",o),p.once("close",i),this.once("close",s),this.once("upgrading",a),p.open()},n.prototype.onOpen=function(){if(c("socket open"),this.readyState="open",n.priorWebsocketSuccess="websocket"===this.transport.name,this.emit("open"),this.flush(),"open"===this.readyState&&this.upgrade&&this.transport.pause){c("starting upgrade probes");for(var t=0,e=this.upgrades.length;t<e;t++)this.probe(this.upgrades[t])}},n.prototype.onPacket=function(t){if("opening"===this.readyState||"open"===this.readyState||"closing"===this.readyState)switch(c('socket receive: type "%s", data "%s"',t.type,t.data),this.emit("packet",t),this.emit("heartbeat"),t.type){case"open":this.onHandshake(f(t.data));break;case"pong":this.setPing(),this.emit("pong");break;case"error":var e=new Error("server error");e.code=t.data,this.onError(e);break;case"message":this.emit("data",t.data),this.emit("message",t.data)}else c('packet received with socket readyState "%s"',this.readyState)},n.prototype.onHandshake=function(t){this.emit("handshake",t),this.id=t.sid,this.transport.query.sid=t.sid,this.upgrades=this.filterUpgrades(t.upgrades),this.pingInterval=t.pingInterval,this.pingTimeout=t.pingTimeout,this.onOpen(),"closed"!==this.readyState&&(this.setPing(),this.removeListener("heartbeat",this.onHeartbeat),this.on("heartbeat",this.onHeartbeat))},n.prototype.onHeartbeat=function(t){clearTimeout(this.pingTimeoutTimer);var e=this;e.pingTimeoutTimer=setTimeout(function(){"closed"!==e.readyState&&e.onClose("ping timeout")},t||e.pingInterval+e.pingTimeout)},n.prototype.setPing=function(){var t=this;clearTimeout(t.pingIntervalTimer),t.pingIntervalTimer=setTimeout(function(){c("writing ping packet - expecting pong within %sms",t.pingTimeout),t.ping(),t.onHeartbeat(t.pingTimeout)},t.pingInterval)},n.prototype.ping=function(){var t=this;this.sendPacket("ping",function(){t.emit("ping")})},n.prototype.onDrain=function(){this.writeBuffer.splice(0,this.prevBufferLen),this.prevBufferLen=0,0===this.writeBuffer.length?this.emit("drain"):this.flush()},n.prototype.flush=function(){"closed"!==this.readyState&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length&&(c("flushing %d packets in socket",this.writeBuffer.length),this.transport.send(this.writeBuffer),this.prevBufferLen=this.writeBuffer.length,this.emit("flush"))},n.prototype.write=n.prototype.send=function(t,e,r){return this.sendPacket("message",t,e,r),this},n.prototype.sendPacket=function(t,e,r,n){if("function"==typeof e&&(n=e,e=void 0),"function"==typeof r&&(n=r,r=null),"closing"!==this.readyState&&"closed"!==this.readyState){r=r||{},r.compress=!1!==r.compress;var o={type:t,data:e,options:r};this.emit("packetCreate",o),this.writeBuffer.push(o),n&&this.once("flush",n),this.flush()}},n.prototype.close=function(){function t(){n.onClose("forced close"),c("socket closing - telling transport to close"),n.transport.close()}function e(){n.removeListener("upgrade",e),n.removeListener("upgradeError",e),t()}function r(){n.once("upgrade",e),n.once("upgradeError",e)}if("opening"===this.readyState||"open"===this.readyState){this.readyState="closing";var n=this;this.writeBuffer.length?this.once("drain",function(){this.upgrading?r():t()}):this.upgrading?r():t()}return this},n.prototype.onError=function(t){c("socket error %j",t),n.priorWebsocketSuccess=!1,this.emit("error",t),this.onClose("transport error",t)},n.prototype.onClose=function(t,e){if("opening"===this.readyState||"open"===this.readyState||"closing"===this.readyState){c('socket close with reason: "%s"',t);var r=this;clearTimeout(this.pingIntervalTimer),clearTimeout(this.pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),this.readyState="closed",this.id=null,this.emit("close",t,e),r.writeBuffer=[],r.prevBufferLen=0}},n.prototype.filterUpgrades=function(t){for(var e=[],r=0,n=t.length;r<n;r++)~u(this.transports,t[r])&&e.push(t[r]);return e}}).call(e,function(){return this}())},function(t,e,r){(function(t){"use strict";function n(e){var r,n=!1,a=!1,c=!1!==e.jsonp;if(t.location){var u="https:"===location.protocol,p=location.port;p||(p=u?443:80),n=e.hostname!==location.hostname||p!==e.port,a=e.secure!==u}if(e.xdomain=n,e.xscheme=a,r=new o(e),"open"in r&&!e.forceJSONP)return new i(e);if(!c)throw new Error("JSONP disabled");return new s(e)}var o=r(4),i=r(6),s=r(27),a=r(28);e.polling=n,e.websocket=a}).call(e,function(){return this}())},function(t,e,r){(function(e){"use strict";var n=r(5);t.exports=function(t){var r=t.xdomain,o=t.xscheme,i=t.enablesXDR;try{if("undefined"!=typeof XMLHttpRequest&&(!r||n))return new XMLHttpRequest}catch(s){}try{if("undefined"!=typeof XDomainRequest&&!o&&i)return new XDomainRequest}catch(s){}if(!r)try{return new(e[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")}catch(s){}}}).call(e,function(){return this}())},function(t,e){try{t.exports="undefined"!=typeof XMLHttpRequest&&"withCredentials"in new XMLHttpRequest}catch(r){t.exports=!1}},function(t,e,r){(function(e){"use strict";function n(){}function o(t){if(c.call(this,t),this.requestTimeout=t.requestTimeout,e.location){var r="https:"===location.protocol,n=location.port;n||(n=r?443:80),this.xd=t.hostname!==e.location.hostname||n!==t.port,this.xs=t.secure!==r}else this.extraHeaders=t.extraHeaders}function i(t){this.method=t.method||"GET",this.uri=t.uri,this.xd=!!t.xd,this.xs=!!t.xs,this.async=!1!==t.async,this.data=void 0!==t.data?t.data:null,this.agent=t.agent,this.isBinary=t.isBinary,this.supportsBinary=t.supportsBinary,this.enablesXDR=t.enablesXDR,this.requestTimeout=t.requestTimeout,this.pfx=t.pfx,this.key=t.key,this.passphrase=t.passphrase,this.cert=t.cert,this.ca=t.ca,this.ciphers=t.ciphers,this.rejectUnauthorized=t.rejectUnauthorized,this.extraHeaders=t.extraHeaders,this.create()}function s(){for(var t in i.requests)i.requests.hasOwnProperty(t)&&i.requests[t].abort()}var a=r(4),c=r(7),u=r(19),p=r(21),h=r(23)("engine.io-client:polling-xhr");t.exports=o,t.exports.Request=i,p(o,c),o.prototype.supportsBinary=!0,o.prototype.request=function(t){return t=t||{},t.uri=this.uri(),t.xd=this.xd,t.xs=this.xs,t.agent=this.agent||!1,t.supportsBinary=this.supportsBinary,t.enablesXDR=this.enablesXDR,t.pfx=this.pfx,t.key=this.key,t.passphrase=this.passphrase,t.cert=this.cert,t.ca=this.ca,t.ciphers=this.ciphers,t.rejectUnauthorized=this.rejectUnauthorized,t.requestTimeout=this.requestTimeout,t.extraHeaders=this.extraHeaders,new i(t)},o.prototype.doWrite=function(t,e){var r="string"!=typeof t&&void 0!==t,n=this.request({method:"POST",data:t,isBinary:r}),o=this;n.on("success",e),n.on("error",function(t){o.onError("xhr post error",t)}),this.sendXhr=n},o.prototype.doPoll=function(){h("xhr poll");var t=this.request(),e=this;t.on("data",function(t){e.onData(t)}),t.on("error",function(t){e.onError("xhr poll error",t)}),this.pollXhr=t},u(i.prototype),i.prototype.create=function(){var t={agent:this.agent,xdomain:this.xd,xscheme:this.xs,enablesXDR:this.enablesXDR};t.pfx=this.pfx,t.key=this.key,t.passphrase=this.passphrase,t.cert=this.cert,t.ca=this.ca,t.ciphers=this.ciphers,t.rejectUnauthorized=this.rejectUnauthorized;var r=this.xhr=new a(t),n=this;try{h("xhr open %s: %s",this.method,this.uri),r.open(this.method,this.uri,this.async);try{if(this.extraHeaders){r.setDisableHeaderCheck(!0);for(var o in this.extraHeaders)this.extraHeaders.hasOwnProperty(o)&&r.setRequestHeader(o,this.extraHeaders[o])}}catch(s){}if(this.supportsBinary&&(r.responseType="arraybuffer"),"POST"===this.method)try{this.isBinary?r.setRequestHeader("Content-type","application/octet-stream"):r.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch(s){}try{r.setRequestHeader("Accept","*/*")}catch(s){}"withCredentials"in r&&(r.withCredentials=!0),this.requestTimeout&&(r.timeout=this.requestTimeout),this.hasXDR()?(r.onload=function(){n.onLoad()},r.onerror=function(){n.onError(r.responseText)}):r.onreadystatechange=function(){4===r.readyState&&(200===r.status||1223===r.status?n.onLoad():setTimeout(function(){n.onError(r.status)},0))},h("xhr data %s",this.data),r.send(this.data)}catch(s){return void setTimeout(function(){n.onError(s)},0)}e.document&&(this.index=i.requestsCount++,i.requests[this.index]=this)},i.prototype.onSuccess=function(){this.emit("success"),this.cleanup()},i.prototype.onData=function(t){this.emit("data",t),this.onSuccess()},i.prototype.onError=function(t){this.emit("error",t),this.cleanup(!0)},i.prototype.cleanup=function(t){if("undefined"!=typeof this.xhr&&null!==this.xhr){if(this.hasXDR()?this.xhr.onload=this.xhr.onerror=n:this.xhr.onreadystatechange=n,t)try{this.xhr.abort()}catch(r){}e.document&&delete i.requests[this.index],this.xhr=null}},i.prototype.onLoad=function(){var t;try{var e;try{e=this.xhr.getResponseHeader("Content-Type").split(";")[0]}catch(r){}if("application/octet-stream"===e)t=this.xhr.response||this.xhr.responseText;else if(this.supportsBinary)try{t=String.fromCharCode.apply(null,new Uint8Array(this.xhr.response))}catch(r){for(var n=new Uint8Array(this.xhr.response),o=[],i=0,s=n.length;i<s;i++)o.push(n[i]);t=String.fromCharCode.apply(null,o)}else t=this.xhr.responseText}catch(r){this.onError(r)}null!=t&&this.onData(t)},i.prototype.hasXDR=function(){return"undefined"!=typeof e.XDomainRequest&&!this.xs&&this.enablesXDR},i.prototype.abort=function(){this.cleanup()},i.requestsCount=0,i.requests={},e.document&&(e.attachEvent?e.attachEvent("onunload",s):e.addEventListener&&e.addEventListener("beforeunload",s,!1))}).call(e,function(){return this}())},function(t,e,r){"use strict";function n(t){var e=t&&t.forceBase64;p&&!e||(this.supportsBinary=!1),o.call(this,t)}var o=r(8),i=r(20),s=r(9),a=r(21),c=r(22),u=r(23)("engine.io-client:polling");t.exports=n;var p=function(){var t=r(4),e=new t({xdomain:!1});return null!=e.responseType}();a(n,o),n.prototype.name="polling",n.prototype.doOpen=function(){this.poll()},n.prototype.pause=function(t){function e(){u("paused"),r.readyState="paused",t()}var r=this;if(this.readyState="pausing",this.polling||!this.writable){var n=0;this.polling&&(u("we are currently polling - waiting to pause"),n++,this.once("pollComplete",function(){u("pre-pause polling complete"),--n||e()})),this.writable||(u("we are currently writing - waiting to pause"),n++,this.once("drain",function(){u("pre-pause writing complete"),--n||e()}))}else e()},n.prototype.poll=function(){u("polling"),this.polling=!0,this.doPoll(),this.emit("poll")},n.prototype.onData=function(t){var e=this;u("polling got data %s",t);var r=function(t,r,n){return"opening"===e.readyState&&e.onOpen(),"close"===t.type?(e.onClose(),!1):void e.onPacket(t)};s.decodePayload(t,this.socket.binaryType,r),"closed"!==this.readyState&&(this.polling=!1,this.emit("pollComplete"),"open"===this.readyState?this.poll():u('ignoring poll - transport state "%s"',this.readyState))},n.prototype.doClose=function(){function t(){u("writing close packet"),e.write([{type:"close"}])}var e=this;"open"===this.readyState?(u("transport open - closing"),t()):(u("transport not open - deferring close"),this.once("open",t))},n.prototype.write=function(t){var e=this;this.writable=!1;var r=function(){e.writable=!0,e.emit("drain")};s.encodePayload(t,this.supportsBinary,function(t){e.doWrite(t,r)})},n.prototype.uri=function(){var t=this.query||{},e=this.secure?"https":"http",r="";!1!==this.timestampRequests&&(t[this.timestampParam]=c()),this.supportsBinary||t.sid||(t.b64=1),t=i.encode(t),this.port&&("https"===e&&443!==Number(this.port)||"http"===e&&80!==Number(this.port))&&(r=":"+this.port),t.length&&(t="?"+t);var n=this.hostname.indexOf(":")!==-1;return e+"://"+(n?"["+this.hostname+"]":this.hostname)+r+this.path+t}},function(t,e,r){"use strict";function n(t){this.path=t.path,this.hostname=t.hostname,this.port=t.port,this.secure=t.secure,this.query=t.query,this.timestampParam=t.timestampParam,this.timestampRequests=t.timestampRequests,this.readyState="",this.agent=t.agent||!1,this.socket=t.socket,this.enablesXDR=t.enablesXDR,this.pfx=t.pfx,this.key=t.key,this.passphrase=t.passphrase,this.cert=t.cert,this.ca=t.ca,this.ciphers=t.ciphers,this.rejectUnauthorized=t.rejectUnauthorized,this.forceNode=t.forceNode,this.extraHeaders=t.extraHeaders,this.localAddress=t.localAddress}var o=r(9),i=r(19);t.exports=n,i(n.prototype),n.prototype.onError=function(t,e){var r=new Error(t);return r.type="TransportError",r.description=e,this.emit("error",r),this},n.prototype.open=function(){return"closed"!==this.readyState&&""!==this.readyState||(this.readyState="opening",this.doOpen()),this},n.prototype.close=function(){return"opening"!==this.readyState&&"open"!==this.readyState||(this.doClose(),this.onClose()),this},n.prototype.send=function(t){if("open"!==this.readyState)throw new Error("Transport not open");this.write(t)},n.prototype.onOpen=function(){this.readyState="open",this.writable=!0,this.emit("open")},n.prototype.onData=function(t){var e=o.decodePacket(t,this.socket.binaryType);this.onPacket(e)},n.prototype.onPacket=function(t){this.emit("packet",t)},n.prototype.onClose=function(){this.readyState="closed",this.emit("close")}},function(t,e,r){(function(t){function n(t,r){var n="b"+e.packets[t.type]+t.data.data;return r(n)}function o(t,r,n){if(!r)return e.encodeBase64Packet(t,n);var o=t.data,i=new Uint8Array(o),s=new Uint8Array(1+o.byteLength);s[0]=v[t.type];for(var a=0;a<i.length;a++)s[a+1]=i[a];return n(s.buffer)}function i(t,r,n){if(!r)return e.encodeBase64Packet(t,n);var o=new FileReader;return o.onload=function(){t.data=o.result,e.encodePacket(t,r,!0,n)},o.readAsArrayBuffer(t.data)}function s(t,r,n){if(!r)return e.encodeBase64Packet(t,n);if(m)return i(t,r,n);var o=new Uint8Array(1);o[0]=v[t.type];var s=new x([o.buffer,t.data]);return n(s)}function a(t){try{t=d.decode(t)}catch(e){return!1}return t}function c(t,e,r){for(var n=new Array(t.length),o=l(t.length,r),i=function(t,r,o){e(r,function(e,r){n[t]=r,o(e,n)})},s=0;s<t.length;s++)i(s,t[s],o)}var u,p=r(10),h=r(11),f=r(13),l=r(14),d=r(15);t&&t.ArrayBuffer&&(u=r(17));var y="undefined"!=typeof navigator&&/Android/i.test(navigator.userAgent),g="undefined"!=typeof navigator&&/PhantomJS/i.test(navigator.userAgent),m=y||g;e.protocol=3;var v=e.packets={open:0,close:1,ping:2,pong:3,message:4,upgrade:5,noop:6},b=p(v),w={type:"error",data:"parser error"},x=r(18);e.encodePacket=function(e,r,i,a){"function"==typeof r&&(a=r,r=!1),"function"==typeof i&&(a=i,i=null);var c=void 0===e.data?void 0:e.data.buffer||e.data;if(t.ArrayBuffer&&c instanceof ArrayBuffer)return o(e,r,a);if(x&&c instanceof t.Blob)return s(e,r,a);if(c&&c.base64)return n(e,a);var u=v[e.type];return void 0!==e.data&&(u+=i?d.encode(String(e.data)):String(e.data)),a(""+u)},e.encodeBase64Packet=function(r,n){var o="b"+e.packets[r.type];if(x&&r.data instanceof t.Blob){var i=new FileReader;return i.onload=function(){var t=i.result.split(",")[1];n(o+t)},i.readAsDataURL(r.data)}var s;try{s=String.fromCharCode.apply(null,new Uint8Array(r.data))}catch(a){for(var c=new Uint8Array(r.data),u=new Array(c.length),p=0;p<c.length;p++)u[p]=c[p];s=String.fromCharCode.apply(null,u)}return o+=t.btoa(s),n(o)},e.decodePacket=function(t,r,n){if(void 0===t)return w;if("string"==typeof t){if("b"==t.charAt(0))return e.decodeBase64Packet(t.substr(1),r);if(n&&(t=a(t),t===!1))return w;var o=t.charAt(0);return Number(o)==o&&b[o]?t.length>1?{type:b[o],data:t.substring(1)}:{type:b[o]}:w}var i=new Uint8Array(t),o=i[0],s=f(t,1);return x&&"blob"===r&&(s=new x([s])),{type:b[o],data:s}},e.decodeBase64Packet=function(t,e){var r=b[t.charAt(0)];if(!u)return{type:r,data:{base64:!0,data:t.substr(1)}};var n=u.decode(t.substr(1));return"blob"===e&&x&&(n=new x([n])),{type:r,data:n}},e.encodePayload=function(t,r,n){function o(t){return t.length+":"+t}function i(t,n){e.encodePacket(t,!!s&&r,!0,function(t){n(null,o(t))})}"function"==typeof r&&(n=r,r=null);var s=h(t);return r&&s?x&&!m?e.encodePayloadAsBlob(t,n):e.encodePayloadAsArrayBuffer(t,n):t.length?void c(t,i,function(t,e){return n(e.join(""))}):n("0:")},e.decodePayload=function(t,r,n){if("string"!=typeof t)return e.decodePayloadAsBinary(t,r,n);"function"==typeof r&&(n=r,r=null);var o;if(""==t)return n(w,0,1);for(var i,s,a="",c=0,u=t.length;c<u;c++){var p=t.charAt(c);if(":"!=p)a+=p;else{if(""==a||a!=(i=Number(a)))return n(w,0,1);if(s=t.substr(c+1,i),a!=s.length)return n(w,0,1);if(s.length){if(o=e.decodePacket(s,r,!0),w.type==o.type&&w.data==o.data)return n(w,0,1);var h=n(o,c+i,u);if(!1===h)return}c+=i,a=""}}return""!=a?n(w,0,1):void 0},e.encodePayloadAsArrayBuffer=function(t,r){function n(t,r){e.encodePacket(t,!0,!0,function(t){return r(null,t)})}return t.length?void c(t,n,function(t,e){var n=e.reduce(function(t,e){var r;return r="string"==typeof e?e.length:e.byteLength,t+r.toString().length+r+2},0),o=new Uint8Array(n),i=0;return e.forEach(function(t){var e="string"==typeof t,r=t;if(e){for(var n=new Uint8Array(t.length),s=0;s<t.length;s++)n[s]=t.charCodeAt(s);r=n.buffer}e?o[i++]=0:o[i++]=1;for(var a=r.byteLength.toString(),s=0;s<a.length;s++)o[i++]=parseInt(a[s]);o[i++]=255;for(var n=new Uint8Array(r),s=0;s<n.length;s++)o[i++]=n[s]}),r(o.buffer)}):r(new ArrayBuffer(0))},e.encodePayloadAsBlob=function(t,r){function n(t,r){e.encodePacket(t,!0,!0,function(t){var e=new Uint8Array(1);if(e[0]=1,"string"==typeof t){for(var n=new Uint8Array(t.length),o=0;o<t.length;o++)n[o]=t.charCodeAt(o);t=n.buffer,e[0]=0}for(var i=t instanceof ArrayBuffer?t.byteLength:t.size,s=i.toString(),a=new Uint8Array(s.length+1),o=0;o<s.length;o++)a[o]=parseInt(s[o]);if(a[s.length]=255,x){var c=new x([e.buffer,a.buffer,t]);r(null,c)}})}c(t,n,function(t,e){return r(new x(e))})},e.decodePayloadAsBinary=function(t,r,n){"function"==typeof r&&(n=r,r=null);for(var o=t,i=[],s=!1;o.byteLength>0;){for(var a=new Uint8Array(o),c=0===a[0],u="",p=1;255!=a[p];p++){if(u.length>310){s=!0;break}u+=a[p]}if(s)return n(w,0,1);o=f(o,2+u.length),u=parseInt(u);var h=f(o,0,u);if(c)try{h=String.fromCharCode.apply(null,new Uint8Array(h))}catch(l){var d=new Uint8Array(h);h="";for(var p=0;p<d.length;p++)h+=String.fromCharCode(d[p])}i.push(h),o=f(o,u)}var y=i.length;i.forEach(function(t,o){n(e.decodePacket(t,r,!0),o,y)})}}).call(e,function(){return this}())},function(t,e){t.exports=Object.keys||function(t){var e=[],r=Object.prototype.hasOwnProperty;for(var n in t)r.call(t,n)&&e.push(n);return e}},function(t,e,r){(function(e){function n(t){function r(t){if(!t)return!1;if(e.Buffer&&e.Buffer.isBuffer&&e.Buffer.isBuffer(t)||e.ArrayBuffer&&t instanceof ArrayBuffer||e.Blob&&t instanceof Blob||e.File&&t instanceof File)return!0;if(o(t)){for(var n=0;n<t.length;n++)if(r(t[n]))return!0}else if(t&&"object"==typeof t){t.toJSON&&"function"==typeof t.toJSON&&(t=t.toJSON());for(var i in t)if(Object.prototype.hasOwnProperty.call(t,i)&&r(t[i]))return!0}return!1}return r(t)}var o=r(12);t.exports=n}).call(e,function(){return this}())},function(t,e){t.exports=Array.isArray||function(t){return"[object Array]"==Object.prototype.toString.call(t)}},function(t,e){t.exports=function(t,e,r){var n=t.byteLength;if(e=e||0,r=r||n,t.slice)return t.slice(e,r);if(e<0&&(e+=n),r<0&&(r+=n),r>n&&(r=n),e>=n||e>=r||0===n)return new ArrayBuffer(0);for(var o=new Uint8Array(t),i=new Uint8Array(r-e),s=e,a=0;s<r;s++,a++)i[a]=o[s];return i.buffer}},function(t,e){function r(t,e,r){function o(t,n){if(o.count<=0)throw new Error("after called too many times");--o.count,t?(i=!0,e(t),e=r):0!==o.count||i||e(null,n)}var i=!1;return r=r||n,o.count=t,0===t?e():o}function n(){}t.exports=r},function(t,e,r){var n;(function(t,o){!function(i){function s(t){for(var e,r,n=[],o=0,i=t.length;o<i;)e=t.charCodeAt(o++),e>=55296&&e<=56319&&o<i?(r=t.charCodeAt(o++),56320==(64512&r)?n.push(((1023&e)<<10)+(1023&r)+65536):(n.push(e),o--)):n.push(e);return n}function a(t){for(var e,r=t.length,n=-1,o="";++n<r;)e=t[n],e>65535&&(e-=65536,o+=b(e>>>10&1023|55296),e=56320|1023&e),o+=b(e);return o}function c(t,e){return b(t>>e&63|128)}function u(t){if(0==(4294967168&t))return b(t);var e="";return 0==(4294965248&t)?e=b(t>>6&31|192):0==(4294901760&t)?(e=b(t>>12&15|224),e+=c(t,6)):0==(4292870144&t)&&(e=b(t>>18&7|240),e+=c(t,12),e+=c(t,6)),e+=b(63&t|128)}function p(t){for(var e,r=s(t),n=r.length,o=-1,i="";++o<n;)e=r[o],i+=u(e);return i}function h(){if(v>=m)throw Error("Invalid byte index");var t=255&g[v];if(v++,128==(192&t))return 63&t;throw Error("Invalid continuation byte")}function f(){var t,e,r,n,o;if(v>m)throw Error("Invalid byte index");if(v==m)return!1;if(t=255&g[v],v++,0==(128&t))return t;if(192==(224&t)){var e=h();if(o=(31&t)<<6|e,o>=128)return o;throw Error("Invalid continuation byte")}if(224==(240&t)){if(e=h(),r=h(),o=(15&t)<<12|e<<6|r,o>=2048)return o;throw Error("Invalid continuation byte")}if(240==(248&t)&&(e=h(),r=h(),n=h(),o=(15&t)<<18|e<<12|r<<6|n,o>=65536&&o<=1114111))return o;throw Error("Invalid WTF-8 detected")}function l(t){g=s(t),m=g.length,v=0;for(var e,r=[];(e=f())!==!1;)r.push(e);return a(r)}var d="object"==typeof e&&e,y=("object"==typeof t&&t&&t.exports==d&&t,"object"==typeof o&&o);y.global!==y&&y.window!==y||(i=y);var g,m,v,b=String.fromCharCode,w={version:"1.0.0",encode:p,decode:l};n=function(){return w}.call(e,r,e,t),!(void 0!==n&&(t.exports=n))}(this)}).call(e,r(16)(t),function(){return this}())},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children=[],t.webpackPolyfill=1),t}},function(t,e){!function(){"use strict";for(var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",r=new Uint8Array(256),n=0;n<t.length;n++)r[t.charCodeAt(n)]=n;e.encode=function(e){var r,n=new Uint8Array(e),o=n.length,i="";for(r=0;r<o;r+=3)i+=t[n[r]>>2],i+=t[(3&n[r])<<4|n[r+1]>>4],i+=t[(15&n[r+1])<<2|n[r+2]>>6],i+=t[63&n[r+2]];return o%3===2?i=i.substring(0,i.length-1)+"=":o%3===1&&(i=i.substring(0,i.length-2)+"=="),i},e.decode=function(t){var e,n,o,i,s,a=.75*t.length,c=t.length,u=0;"="===t[t.length-1]&&(a--,"="===t[t.length-2]&&a--);var p=new ArrayBuffer(a),h=new Uint8Array(p);for(e=0;e<c;e+=4)n=r[t.charCodeAt(e)],o=r[t.charCodeAt(e+1)],i=r[t.charCodeAt(e+2)],s=r[t.charCodeAt(e+3)],h[u++]=n<<2|o>>4,h[u++]=(15&o)<<4|i>>2,h[u++]=(3&i)<<6|63&s;return p}}()},function(t,e){(function(e){function r(t){for(var e=0;e<t.length;e++){var r=t[e];if(r.buffer instanceof ArrayBuffer){var n=r.buffer;if(r.byteLength!==n.byteLength){var o=new Uint8Array(r.byteLength);o.set(new Uint8Array(n,r.byteOffset,r.byteLength)),n=o.buffer}t[e]=n}}}function n(t,e){e=e||{};var n=new i;r(t);for(var o=0;o<t.length;o++)n.append(t[o]);return e.type?n.getBlob(e.type):n.getBlob()}function o(t,e){return r(t),new Blob(t,e||{})}var i=e.BlobBuilder||e.WebKitBlobBuilder||e.MSBlobBuilder||e.MozBlobBuilder,s=function(){try{var t=new Blob(["hi"]);return 2===t.size}catch(e){return!1}}(),a=s&&function(){try{var t=new Blob([new Uint8Array([1,2])]);return 2===t.size}catch(e){return!1}}(),c=i&&i.prototype.append&&i.prototype.getBlob;t.exports=function(){return s?a?e.Blob:o:c?n:void 0}()}).call(e,function(){return this}())},function(t,e,r){function n(t){if(t)return o(t)}function o(t){for(var e in n.prototype)t[e]=n.prototype[e];return t}t.exports=n,n.prototype.on=n.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+t]=this._callbacks["$"+t]||[]).push(e),this},n.prototype.once=function(t,e){function r(){this.off(t,r),e.apply(this,arguments)}return r.fn=e,this.on(t,r),this},n.prototype.off=n.prototype.removeListener=n.prototype.removeAllListeners=n.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var r=this._callbacks["$"+t];if(!r)return this;if(1==arguments.length)return delete this._callbacks["$"+t],this;for(var n,o=0;o<r.length;o++)if(n=r[o],n===e||n.fn===e){r.splice(o,1);break}return this},n.prototype.emit=function(t){this._callbacks=this._callbacks||{};var e=[].slice.call(arguments,1),r=this._callbacks["$"+t];if(r){r=r.slice(0);for(var n=0,o=r.length;n<o;++n)r[n].apply(this,e)}return this},n.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks["$"+t]||[]},n.prototype.hasListeners=function(t){return!!this.listeners(t).length}},function(t,e){e.encode=function(t){var e="";for(var r in t)t.hasOwnProperty(r)&&(e.length&&(e+="&"),e+=encodeURIComponent(r)+"="+encodeURIComponent(t[r]));return e},e.decode=function(t){for(var e={},r=t.split("&"),n=0,o=r.length;n<o;n++){var i=r[n].split("=");e[decodeURIComponent(i[0])]=decodeURIComponent(i[1])}return e}},function(t,e){t.exports=function(t,e){var r=function(){};r.prototype=e.prototype,t.prototype=new r,t.prototype.constructor=t}},function(t,e){"use strict";function r(t){var e="";do e=s[t%a]+e,t=Math.floor(t/a);while(t>0);return e}function n(t){var e=0;for(p=0;p<t.length;p++)e=e*a+c[t.charAt(p)];return e}function o(){var t=r(+new Date);return t!==i?(u=0,i=t):t+"."+r(u++)}for(var i,s="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),a=64,c={},u=0,p=0;p<a;p++)c[s[p]]=p;o.encode=r,o.decode=n,t.exports=o},function(t,e,r){(function(n){function o(){return"undefined"!=typeof document&&"WebkitAppearance"in document.documentElement.style||window.console&&(console.firebug||console.exception&&console.table)||navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31}function i(){var t=arguments,r=this.useColors;if(t[0]=(r?"%c":"")+this.namespace+(r?" %c":" ")+t[0]+(r?"%c ":" ")+"+"+e.humanize(this.diff),!r)return t;var n="color: "+this.color;t=[t[0],n,"color: inherit"].concat(Array.prototype.slice.call(t,1));var o=0,i=0;return t[0].replace(/%[a-z%]/g,function(t){"%%"!==t&&(o++,"%c"===t&&(i=o))}),t.splice(i,0,n),t}function s(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function a(t){try{null==t?e.storage.removeItem("debug"):e.storage.debug=t;
}catch(r){}}function c(){try{return e.storage.debug}catch(t){}if("undefined"!=typeof n&&"env"in n)return n.env.DEBUG}function u(){try{return window.localStorage}catch(t){}}e=t.exports=r(25),e.log=s,e.formatArgs=i,e.save=a,e.load=c,e.useColors=o,e.storage="undefined"!=typeof chrome&&"undefined"!=typeof chrome.storage?chrome.storage.local:u(),e.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],e.formatters.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}},e.enable(c())}).call(e,r(24))},function(t,e){function r(){throw new Error("setTimeout has not been defined")}function n(){throw new Error("clearTimeout has not been defined")}function o(t){if(p===setTimeout)return setTimeout(t,0);if((p===r||!p)&&setTimeout)return p=setTimeout,setTimeout(t,0);try{return p(t,0)}catch(e){try{return p.call(null,t,0)}catch(e){return p.call(this,t,0)}}}function i(t){if(h===clearTimeout)return clearTimeout(t);if((h===n||!h)&&clearTimeout)return h=clearTimeout,clearTimeout(t);try{return h(t)}catch(e){try{return h.call(null,t)}catch(e){return h.call(this,t)}}}function s(){y&&l&&(y=!1,l.length?d=l.concat(d):g=-1,d.length&&a())}function a(){if(!y){var t=o(s);y=!0;for(var e=d.length;e;){for(l=d,d=[];++g<e;)l&&l[g].run();g=-1,e=d.length}l=null,y=!1,i(t)}}function c(t,e){this.fun=t,this.array=e}function u(){}var p,h,f=t.exports={};!function(){try{p="function"==typeof setTimeout?setTimeout:r}catch(t){p=r}try{h="function"==typeof clearTimeout?clearTimeout:n}catch(t){h=n}}();var l,d=[],y=!1,g=-1;f.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)e[r-1]=arguments[r];d.push(new c(t,e)),1!==d.length||y||o(a)},c.prototype.run=function(){this.fun.apply(null,this.array)},f.title="browser",f.browser=!0,f.env={},f.argv=[],f.version="",f.versions={},f.on=u,f.addListener=u,f.once=u,f.off=u,f.removeListener=u,f.removeAllListeners=u,f.emit=u,f.binding=function(t){throw new Error("process.binding is not supported")},f.cwd=function(){return"/"},f.chdir=function(t){throw new Error("process.chdir is not supported")},f.umask=function(){return 0}},function(t,e,r){function n(){return e.colors[p++%e.colors.length]}function o(t){function r(){}function o(){var t=o,r=+new Date,i=r-(u||r);t.diff=i,t.prev=u,t.curr=r,u=r,null==t.useColors&&(t.useColors=e.useColors()),null==t.color&&t.useColors&&(t.color=n());for(var s=new Array(arguments.length),a=0;a<s.length;a++)s[a]=arguments[a];s[0]=e.coerce(s[0]),"string"!=typeof s[0]&&(s=["%o"].concat(s));var c=0;s[0]=s[0].replace(/%([a-z%])/g,function(r,n){if("%%"===r)return r;c++;var o=e.formatters[n];if("function"==typeof o){var i=s[c];r=o.call(t,i),s.splice(c,1),c--}return r}),s=e.formatArgs.apply(t,s);var p=o.log||e.log||console.log.bind(console);p.apply(t,s)}r.enabled=!1,o.enabled=!0;var i=e.enabled(t)?o:r;return i.namespace=t,i}function i(t){e.save(t);for(var r=(t||"").split(/[\s,]+/),n=r.length,o=0;o<n;o++)r[o]&&(t=r[o].replace(/[\\^$+?.()|[\]{}]/g,"\\$&").replace(/\*/g,".*?"),"-"===t[0]?e.skips.push(new RegExp("^"+t.substr(1)+"$")):e.names.push(new RegExp("^"+t+"$")))}function s(){e.enable("")}function a(t){var r,n;for(r=0,n=e.skips.length;r<n;r++)if(e.skips[r].test(t))return!1;for(r=0,n=e.names.length;r<n;r++)if(e.names[r].test(t))return!0;return!1}function c(t){return t instanceof Error?t.stack||t.message:t}e=t.exports=o.debug=o,e.coerce=c,e.disable=s,e.enable=i,e.enabled=a,e.humanize=r(26),e.names=[],e.skips=[],e.formatters={};var u,p=0},function(t,e){function r(t){if(t=String(t),!(t.length>1e4)){var e=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*p;case"days":case"day":case"d":return r*u;case"hours":case"hour":case"hrs":case"hr":case"h":return r*c;case"minutes":case"minute":case"mins":case"min":case"m":return r*a;case"seconds":case"second":case"secs":case"sec":case"s":return r*s;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function n(t){return t>=u?Math.round(t/u)+"d":t>=c?Math.round(t/c)+"h":t>=a?Math.round(t/a)+"m":t>=s?Math.round(t/s)+"s":t+"ms"}function o(t){return i(t,u,"day")||i(t,c,"hour")||i(t,a,"minute")||i(t,s,"second")||t+" ms"}function i(t,e,r){if(!(t<e))return t<1.5*e?Math.floor(t/e)+" "+r:Math.ceil(t/e)+" "+r+"s"}var s=1e3,a=60*s,c=60*a,u=24*c,p=365.25*u;t.exports=function(t,e){e=e||{};var i=typeof t;if("string"===i&&t.length>0)return r(t);if("number"===i&&isNaN(t)===!1)return e["long"]?o(t):n(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))}},function(t,e,r){(function(e){"use strict";function n(){}function o(t){i.call(this,t),this.query=this.query||{},a||(e.___eio||(e.___eio=[]),a=e.___eio),this.index=a.length;var r=this;a.push(function(t){r.onData(t)}),this.query.j=this.index,e.document&&e.addEventListener&&e.addEventListener("beforeunload",function(){r.script&&(r.script.onerror=n)},!1)}var i=r(7),s=r(21);t.exports=o;var a,c=/\n/g,u=/\\n/g;s(o,i),o.prototype.supportsBinary=!1,o.prototype.doClose=function(){this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),this.form&&(this.form.parentNode.removeChild(this.form),this.form=null,this.iframe=null),i.prototype.doClose.call(this)},o.prototype.doPoll=function(){var t=this,e=document.createElement("script");this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),e.async=!0,e.src=this.uri(),e.onerror=function(e){t.onError("jsonp poll error",e)};var r=document.getElementsByTagName("script")[0];r?r.parentNode.insertBefore(e,r):(document.head||document.body).appendChild(e),this.script=e;var n="undefined"!=typeof navigator&&/gecko/i.test(navigator.userAgent);n&&setTimeout(function(){var t=document.createElement("iframe");document.body.appendChild(t),document.body.removeChild(t)},100)},o.prototype.doWrite=function(t,e){function r(){n(),e()}function n(){if(o.iframe)try{o.form.removeChild(o.iframe)}catch(t){o.onError("jsonp polling iframe removal error",t)}try{var e='<iframe src="javascript:0" name="'+o.iframeId+'">';i=document.createElement(e)}catch(t){i=document.createElement("iframe"),i.name=o.iframeId,i.src="javascript:0"}i.id=o.iframeId,o.form.appendChild(i),o.iframe=i}var o=this;if(!this.form){var i,s=document.createElement("form"),a=document.createElement("textarea"),p=this.iframeId="eio_iframe_"+this.index;s.className="socketio",s.style.position="absolute",s.style.top="-1000px",s.style.left="-1000px",s.target=p,s.method="POST",s.setAttribute("accept-charset","utf-8"),a.name="d",s.appendChild(a),document.body.appendChild(s),this.form=s,this.area=a}this.form.action=this.uri(),n(),t=t.replace(u,"\\\n"),this.area.value=t.replace(c,"\\n");try{this.form.submit()}catch(h){}this.iframe.attachEvent?this.iframe.onreadystatechange=function(){"complete"===o.iframe.readyState&&r()}:this.iframe.onload=r}}).call(e,function(){return this}())},function(t,e,r){(function(e){"use strict";function n(t){var e=t&&t.forceBase64;e&&(this.supportsBinary=!1),this.perMessageDeflate=t.perMessageDeflate,this.usingBrowserWebSocket=h&&!t.forceNode,this.usingBrowserWebSocket||(l=o),i.call(this,t)}var o,i=r(8),s=r(9),a=r(20),c=r(21),u=r(22),p=r(23)("engine.io-client:websocket"),h=e.WebSocket||e.MozWebSocket;if("undefined"==typeof window)try{o=r(29)}catch(f){}var l=h;l||"undefined"!=typeof window||(l=o),t.exports=n,c(n,i),n.prototype.name="websocket",n.prototype.supportsBinary=!0,n.prototype.doOpen=function(){if(this.check()){var t=this.uri(),e=void 0,r={agent:this.agent,perMessageDeflate:this.perMessageDeflate};r.pfx=this.pfx,r.key=this.key,r.passphrase=this.passphrase,r.cert=this.cert,r.ca=this.ca,r.ciphers=this.ciphers,r.rejectUnauthorized=this.rejectUnauthorized,this.extraHeaders&&(r.headers=this.extraHeaders),this.localAddress&&(r.localAddress=this.localAddress);try{this.ws=this.usingBrowserWebSocket?new l(t):new l(t,e,r)}catch(n){return this.emit("error",n)}void 0===this.ws.binaryType&&(this.supportsBinary=!1),this.ws.supports&&this.ws.supports.binary?(this.supportsBinary=!0,this.ws.binaryType="nodebuffer"):this.ws.binaryType="arraybuffer",this.addEventListeners()}},n.prototype.addEventListeners=function(){var t=this;this.ws.onopen=function(){t.onOpen()},this.ws.onclose=function(){t.onClose()},this.ws.onmessage=function(e){t.onData(e.data)},this.ws.onerror=function(e){t.onError("websocket error",e)}},n.prototype.write=function(t){function r(){n.emit("flush"),setTimeout(function(){n.writable=!0,n.emit("drain")},0)}var n=this;this.writable=!1;for(var o=t.length,i=0,a=o;i<a;i++)!function(t){s.encodePacket(t,n.supportsBinary,function(i){if(!n.usingBrowserWebSocket){var s={};if(t.options&&(s.compress=t.options.compress),n.perMessageDeflate){var a="string"==typeof i?e.Buffer.byteLength(i):i.length;a<n.perMessageDeflate.threshold&&(s.compress=!1)}}try{n.usingBrowserWebSocket?n.ws.send(i):n.ws.send(i,s)}catch(c){p("websocket closed before onclose event")}--o||r()})}(t[i])},n.prototype.onClose=function(){i.prototype.onClose.call(this)},n.prototype.doClose=function(){"undefined"!=typeof this.ws&&this.ws.close()},n.prototype.uri=function(){var t=this.query||{},e=this.secure?"wss":"ws",r="";this.port&&("wss"===e&&443!==Number(this.port)||"ws"===e&&80!==Number(this.port))&&(r=":"+this.port),this.timestampRequests&&(t[this.timestampParam]=u()),this.supportsBinary||(t.b64=1),t=a.encode(t),t.length&&(t="?"+t);var n=this.hostname.indexOf(":")!==-1;return e+"://"+(n?"["+this.hostname+"]":this.hostname)+r+this.path+t},n.prototype.check=function(){return!(!l||"__initialize"in l&&this.name===n.prototype.name)}}).call(e,function(){return this}())},function(t,e){},function(t,e){var r=[].indexOf;t.exports=function(t,e){if(r)return t.indexOf(e);for(var n=0;n<t.length;++n)if(t[n]===e)return n;return-1}},function(t,e){var r=/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,n=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];t.exports=function(t){var e=t,o=t.indexOf("["),i=t.indexOf("]");o!=-1&&i!=-1&&(t=t.substring(0,o)+t.substring(o,i).replace(/:/g,";")+t.substring(i,t.length));for(var s=r.exec(t||""),a={},c=14;c--;)a[n[c]]=s[c]||"";return o!=-1&&i!=-1&&(a.source=e,a.host=a.host.substring(1,a.host.length-1).replace(/;/g,":"),a.authority=a.authority.replace("[","").replace("]","").replace(/;/g,":"),a.ipv6uri=!0),a}},function(t,e){(function(e){var r=/^[\],:{}\s]*$/,n=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,o=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,i=/(?:^|:|,)(?:\s*\[)+/g,s=/^\s+/,a=/\s+$/;t.exports=function(t){return"string"==typeof t&&t?(t=t.replace(s,"").replace(a,""),e.JSON&&JSON.parse?JSON.parse(t):r.test(t.replace(n,"@").replace(o,"]").replace(i,""))?new Function("return "+t)():void 0):null}}).call(e,function(){return this}())}])});})();
(function(ns){var CLIENT_VERSION = "2.5.6";var CLIENT_TYPE ="WEB";ns.wrapper=function(goog,wd){
    var h,n=this;function p(a){return void 0!==a}function aa(){}function ba(a){a.$b=function(){return a.ef?a.ef:a.ef=new a}}
    function da(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
    else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function ea(a){return"array"==da(a)}function q(a){return"string"==typeof a}function fa(a){return"number"==typeof a}function ga(a){return"function"==da(a)}function ha(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}function ia(a,b,c){return a.call.apply(a.bind,arguments)}
    function ja(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function r(a,b,c){r=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ia:ja;return r.apply(null,arguments)}var ka=Date.now||function(){return+new Date};
    function la(a,b){var c=a.split("."),d=n;c[0]in d||!d.execScript||d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)!c.length&&p(b)?d[e]=b:d=d[e]?d[e]:d[e]={}}function ma(a,b){function c(){}c.prototype=b.prototype;a.oh=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.gh=function(a,c,f){for(var d=Array(arguments.length-2),e=2;e<arguments.length;e++)d[e-2]=arguments[e];return b.prototype[c].apply(a,d)}};function na(a){return/^\s*$/.test(a)?!1:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,""))}function oa(a){a=String(a);if(na(a))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);}function pa(){this.Kd=void 0}
    function qa(a,b,c){if(null==b)c.push("null");else{if("object"==typeof b){if(ea(b)){var d=b;b=d.length;c.push("[");for(var e="",f=0;f<b;f++)c.push(e),e=d[f],qa(a,a.Kd?a.Kd.call(d,String(f),e):e,c),e=",";c.push("]");return}if(b instanceof String||b instanceof Number||b instanceof Boolean)b=b.valueOf();else{c.push("{");f="";for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&(e=b[d],"function"!=typeof e&&(c.push(f),ra(d,c),c.push(":"),qa(a,a.Kd?a.Kd.call(b,d,e):e,c),f=","));c.push("}");return}}switch(typeof b){case "string":ra(b,
        c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?String(b):"null");break;case "boolean":c.push(String(b));break;case "function":c.push("null");break;default:throw Error("Unknown type: "+typeof b);}}}var sa={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},ta=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;
    function ra(a,b){b.push('"',a.replace(ta,function(a){var b=sa[a];b||(b="\\u"+(a.charCodeAt(0)|65536).toString(16).substr(1),sa[a]=b);return b}),'"')};var ua={};function va(a){return"undefined"!==typeof JSON&&p(JSON.parse)?JSON.parse(a):oa(a)}function t(a){if("undefined"!==typeof JSON&&p(JSON.stringify))a=JSON.stringify(a);else{var b=[];qa(new pa,a,b);a=b.join("")}return a};function wa(){this.mb=-1};function xa(){this.mb=64;this.V=[];this.fe=[];this.If=[];this.Fd=[];this.Fd[0]=128;for(var a=1;a<this.mb;++a)this.Fd[a]=0;this.Xd=this.ec=0;this.reset()}ma(xa,wa);xa.prototype.reset=function(){this.V[0]=1732584193;this.V[1]=4023233417;this.V[2]=2562383102;this.V[3]=271733878;this.V[4]=3285377520;this.Xd=this.ec=0};
    function ya(a,b,c){c||(c=0);var d=a.If;if(q(b))for(var e=0;16>e;e++)d[e]=b.charCodeAt(c)<<24|b.charCodeAt(c+1)<<16|b.charCodeAt(c+2)<<8|b.charCodeAt(c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.V[0];c=a.V[1];for(var g=a.V[2],k=a.V[3],l=a.V[4],m,e=0;80>e;e++)40>e?20>e?(f=k^c&(g^k),m=1518500249):(f=c^g^k,m=1859775393):60>e?(f=c&g|k&(c|g),m=2400959708):(f=c^g^k,m=3395469782),f=(b<<
        5|b>>>27)+f+l+m+d[e]&4294967295,l=k,k=g,g=(c<<30|c>>>2)&4294967295,c=b,b=f;a.V[0]=a.V[0]+b&4294967295;a.V[1]=a.V[1]+c&4294967295;a.V[2]=a.V[2]+g&4294967295;a.V[3]=a.V[3]+k&4294967295;a.V[4]=a.V[4]+l&4294967295}
    xa.prototype.update=function(a,b){if(null!=a){p(b)||(b=a.length);for(var c=b-this.mb,d=0,e=this.fe,f=this.ec;d<b;){if(0==f)for(;d<=c;)ya(this,a,d),d+=this.mb;if(q(a))for(;d<b;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.mb){ya(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.mb){ya(this,e);f=0;break}}this.ec=f;this.Xd+=b}};
    xa.prototype.digest=function(){var a=[],b=8*this.Xd;56>this.ec?this.update(this.Fd,56-this.ec):this.update(this.Fd,this.mb-(this.ec-56));for(var c=this.mb-1;56<=c;c--)this.fe[c]=b&255,b/=256;ya(this,this.fe);for(c=b=0;5>c;c++)for(var d=24;0<=d;d-=8)a[b]=this.V[c]>>d&255,++b;return a};function za(a){if(Error.captureStackTrace)Error.captureStackTrace(this,za);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}ma(za,Error);za.prototype.name="CustomError";function Aa(){return Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^ka()).toString(36)};var Ba=Array.prototype.indexOf?function(a,b,c){return Array.prototype.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(q(a))return q(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},Ca=Array.prototype.forEach?function(a,b,c){Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Da=Array.prototype.filter?function(a,b,c){return Array.prototype.filter.call(a,
        b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,g=q(a)?a.split(""):a,k=0;k<d;k++)if(k in g){var l=g[k];b.call(c,l,k,a)&&(e[f++]=l)}return e},Ea=Array.prototype.map?function(a,b,c){return Array.prototype.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=q(a)?a.split(""):a,g=0;g<d;g++)g in f&&(e[g]=b.call(c,f[g],g,a));return e},Fa=Array.prototype.reduce?function(a,b,c,d){d&&(b=r(b,d));return Array.prototype.reduce.call(a,b,c)}:function(a,b,c,d){var e=c;Ca(a,function(c,g){e=b.call(d,
        e,c,g,a)});return e},Ga=Array.prototype.every?function(a,b,c){return Array.prototype.every.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&!b.call(c,e[f],f,a))return!1;return!0};function Ha(a,b){var c=Ia(a,b,void 0);return 0>c?null:q(a)?a.charAt(c):a[c]}function Ia(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return f;return-1}function Ja(a,b){var c=Ba(a,b);0<=c&&Array.prototype.splice.call(a,c,1)}
    function Ka(a,b){a.sort(b||La)}function La(a,b){return a>b?1:a<b?-1:0};var Ma;a:{var Na=n.navigator;if(Na){var Oa=Na.userAgent;if(Oa){Ma=Oa;break a}}Ma=""};function u(a,b){for(var c in a)b.call(void 0,a[c],c,a)}function Pa(a,b){var c={},d;for(d in a)c[d]=b.call(void 0,a[d],d,a);return c}function Qa(a,b){for(var c in a)if(!b.call(void 0,a[c],c,a))return!1;return!0}function Ra(a){var b=0,c;for(c in a)b++;return b}function Sa(a){for(var b in a)return b}function Ta(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}function Ua(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}function Va(a,b){return null!==a&&b in a}
    function Wa(a,b){for(var c in a)if(a[c]==b)return!0;return!1}function Xa(a,b,c){for(var d in a)if(b.call(c,a[d],d,a))return d}function Ya(a,b){var c=Xa(a,b,void 0);return c&&a[c]}function Za(a){for(var b in a)return!1;return!0}function $a(a){var b={},c;for(c in a)b[c]=a[c];return b}var ab="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
    function bb(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<ab.length;f++)c=ab[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};var cb=null,db=null;function eb(a){var b="";fb(a,function(a){b+=String.fromCharCode(a)});return b}function fb(a,b){function c(b){for(;d<a.length;){var c=a.charAt(d++),e=db[c];if(null!=e)return e;if(!/^[\s\xa0]*$/.test(c))throw Error("Unknown base64 encoding at char: "+c);}return b}gb();for(var d=0;;){var e=c(-1),f=c(0),g=c(64),k=c(64);if(64===k&&-1===e)break;b(e<<2|f>>4);64!=g&&(b(f<<4&240|g>>2),64!=k&&b(g<<6&192|k))}}
    function gb(){if(!cb){cb={};db={};for(var a=0;65>a;a++)cb[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a),db[cb[a]]=a,62<=a&&(db["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a)]=a)}};var hb=function(){var a=1;return function(){return a++}}();function v(a,b){if(!a)throw ib(b);}function ib(a){return Error("Wilddog ("+Wilddog.Ne+") INTERNAL ASSERT FAILED: "+a)}function jb(a){try{return"NODE"==CLIENT_TYPE?(new Buffer(a,"base64")).toString("utf8"):"undefined"!==typeof atob?atob(a):eb(a)}catch(b){kb("base64Decode failed: ",b)}return null}
    function lb(a){for(var b=[],c=0,d=0;d<a.length;d++){var e=a.charCodeAt(d);55296<=e&&56319>=e&&(e-=55296,d++,v(d<a.length,"Surrogate pair missing trail surrogate."),e=65536+(e<<10)+(a.charCodeAt(d)-56320));128>e?b[c++]=e:(2048>e?b[c++]=e>>6|192:(65536>e?b[c++]=e>>12|224:(b[c++]=e>>18|240,b[c++]=e>>12&63|128),b[c++]=e>>6&63|128),b[c++]=e&63|128)}a=new xa;a.update(b);b=a.digest();gb();a=cb;c=[];for(d=0;d<b.length;d+=3){var f=b[d],g=(e=d+1<b.length)?b[d+1]:0,k=d+2<b.length,l=k?b[d+2]:0,m=f>>2,f=(f&3)<<
        4|g>>4,g=(g&15)<<2|l>>6,l=l&63;k||(l=64,e||(g=64));c.push(a[m],a[f],a[g],a[l])}return c.join("")}function mb(a){for(var b="",c=0;c<arguments.length;c++)var d=arguments[c],e=da(d),b="array"==e||"object"==e&&"number"==typeof d.length?b+mb.apply(null,arguments[c]):"object"===typeof arguments[c]?b+t(arguments[c]):b+arguments[c],b=b+" ";return b}var nb=null,ob=!0;function kb(a){!0===ob&&(ob=!1,null===nb&&!0===w.get("logging_enabled")&&Wilddog.Ve(!0));if(nb){var b=mb.apply(null,arguments);nb(b)}}
    function pb(a){return function(){kb(a,arguments)}}function qb(a){if("undefined"!==typeof console){var b="WILDDOG INTERNAL ERROR: "+mb.apply(null,arguments);"undefined"!==typeof console.error?console.error(b):console.log(b)}}function rb(a){var b=mb.apply(null,arguments);throw Error("WILDDOG FATAL ERROR: "+b);}function x(a){if("undefined"!==typeof console){var b="WILDDOG WARNING: "+mb.apply(null,arguments);"undefined"!==typeof console.warn?console.warn(b):console.log(b)}}
    function sb(a){var b="",c="",d="",e="",f=!0,g="https",k=443;if(q(a)){var l=a.indexOf("//");0<=l&&(g=a.substring(0,l-1),a=a.substring(l+2));l=a.indexOf("/");-1===l&&(l=a.length);b=a.substring(0,l);e="";a=a.substring(l).split("/");for(l=0;l<a.length;l++)if(0<a[l].length){var m=a[l];try{m=decodeURIComponent(m.replace(/\+/g," "))}catch(A){}e+="/"+m}a=b.split(".");3===a.length?(c=a[1],d=a[0].toLowerCase()):2===a.length&&(c=a[0]);l=b.indexOf(":");0<=l&&(f="https"===g||"wss"===g,k=b.substring(l+1),isFinite(k)&&
    (k=String(k)),k=q(k)?/^\s*-?0x/i.test(k)?parseInt(k,16):parseInt(k,10):NaN)}return{host:b,port:k,domain:c,Rg:d,Nb:f,scheme:g,Jb:e}}function tb(a){return fa(a)&&(a!=a||a==Number.POSITIVE_INFINITY||a==Number.NEGATIVE_INFINITY)}function ub(a,b){if(a===b)return 0;if("[MIN_NAME]"===a||"[MAX_NAME]"===b)return-1;if("[MIN_NAME]"===b||"[MAX_NAME]"===a)return 1;var c=vb(a),d=vb(b);return null!==c?null!==d?0==c-d?a.length-b.length:c-d:-1:null!==d?1:a<b?-1:1}
    function wb(a){if("object"!==typeof a||null===a)return t(a);var b=[],c;for(c in a)b.push(c);b.sort();c="{";for(var d=0;d<b.length;d++)0!==d&&(c+=","),c+=t(b[d]),c+=":",c+=wb(a[b[d]]);return c+"}"}function xb(a,b){if(ea(a))for(var c=0;c<a.length;++c)b(c,a[c]);else u(a,b)}
    function yb(a){v(!tb(a),"Invalid JSON number");var b,c,d,e;0===a?(d=c=0,b=-Infinity===1/a?1:0):(b=0>a,a=Math.abs(a),a>=Math.pow(2,-1022)?(d=Math.min(Math.floor(Math.log(a)/Math.LN2),1023),c=d+1023,d=Math.round(a*Math.pow(2,52-d)-Math.pow(2,52))):(c=0,d=Math.round(a/Math.pow(2,-1074))));e=[];for(a=52;a;--a)e.push(d%2?1:0),d=Math.floor(d/2);for(a=11;a;--a)e.push(c%2?1:0),c=Math.floor(c/2);e.push(b?1:0);e.reverse();b=e.join("");c="";for(a=0;64>a;a+=8)d=parseInt(b.substr(a,8),2).toString(16),1===d.length&&
    (d="0"+d),c+=d;return c.toLowerCase()}var zb=/^-?\d{1,10}$/;function vb(a){return zb.test(a)&&(a=Number(a),-2147483648<=a&&2147483647>=a)?a:null}function Ab(a){try{a()}catch(b){setTimeout(function(){x("Exception was thrown by user callback.",b.stack||"");throw b;},Math.floor(0))}}function y(a,b){if(ga(a)){var c=Array.prototype.slice.call(arguments,1).slice();Ab(function(){a.apply(null,c)})}};function Bb(a){v(ea(a)&&0<a.length,"Requires a non-empty array");this.Kf=a;this.sb={}}Bb.prototype.Yd=function(a,b){for(var c=this.sb[a]||[],d=0;d<c.length;d++)if(c[d].Af){var e=c.splice(d,1)[0];e.xb.apply(e.context,Array.prototype.slice.call(arguments,1))}else c[d].xb.apply(c[d].context,Array.prototype.slice.call(arguments,1))};Bb.prototype.Gb=function(a,b,c){Cb(this,a);this.sb[a]=this.sb[a]||[];this.sb[a].push({xb:b,context:c,Af:!1});(a=this.ld(a))&&b.apply(c,[a])};
    Bb.prototype.Dd=function(a,b,c){Cb(this,a);var d=this.ld(a);d?b.apply(c,[d]):(this.sb[a]=this.sb[a]||[],this.sb[a].push({xb:b,context:c,Af:!0}))};Bb.prototype.kc=function(a,b,c){Cb(this,a);a=this.sb[a]||[];for(var d=0;d<a.length;d++)if(a[d].xb===b&&(!c||c===a[d].context)){a.splice(d,1);break}};function Cb(a,b){v(Ha(a.Kf,function(a){return a===b}),"Unknown event: "+b)};function z(a,b){Bb.call(this,["authStateChanged","authTokenExpired"]);this.Jf={zf:!1};this.Oe={};Object.defineProperty(this,"name",{value:b,writable:!1});Object.defineProperty(this,"options",{value:a,writable:!1})}ma(z,Bb);function Db(a,b){z.prototype[a]=function(){return b(this)}}z.prototype.Xf=function(a,b){var c=!0,d;for(d in Eb)if(Eb.hasOwnProperty(d)&&Eb[d]===a){c=!1;break}if(c)throw Error("Unknown event "+a);this.Oe[a]=b;switch(a){case Eb.cb:this.Jf.zf=b&&b.zf}this.Yd(a,b)};
    z.prototype.emit=z.prototype.Xf;z.prototype.Nf=function(a,b){this.Dd(a,b)};z.prototype.bindOnce=z.prototype.Nf;z.prototype.bind=function(a,b){this.Gb(a,b)};z.prototype.bind=z.prototype.bind;z.prototype.Tg=function(a,b){this.kc(a,b)};z.prototype.unbind=z.prototype.Tg;z.prototype.ld=function(a){switch(a){case Eb.cb:return this.Oe[Eb.cb]}return null};var Eb={cb:"authStateChanged",Re:"authTokenExpired"};z.prototype.kb=Eb;function Fb(a,b,c,d,e,f){this.uid=e;this.displayName=a;this.phone=f;this.email=b;this.photoURL=c;this.providerId=d};function Gb(a,b,c){this.ga=c;this.Vf=a;this.zg=b;this.Ad=0;this.pd=null}Gb.prototype.get=function(){var a;0<this.Ad?(this.Ad--,a=this.pd,this.pd=a.next,a.next=null):a=this.Vf();return a};Gb.prototype.put=function(a){this.zg(a);this.Ad<this.ga&&(this.Ad++,a.next=this.pd,this.pd=a)};function Hb(){this.ae=this.uc=null}var Jb=new Gb(function(){return new Ib},function(a){a.reset()},100);Hb.prototype.add=function(a,b){var c=Jb.get();c.set(a,b);this.ae?this.ae.next=c:this.uc=c;this.ae=c};Hb.prototype.remove=function(){var a=null;this.uc&&(a=this.uc,this.uc=this.uc.next,this.uc||(this.ae=null),a.next=null);return a};function Ib(){this.next=this.scope=this.ne=null}Ib.prototype.set=function(a,b){this.ne=a;this.scope=b;this.next=null};
    Ib.prototype.reset=function(){this.next=this.scope=this.ne=null};function Kb(a){n.setTimeout(function(){throw a;},0)}var Lb;
    function Mb(){var a=n.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&-1==Ma.indexOf("Presto")&&(a=function(){var a=document.createElement("IFRAME");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+b.location.host,a=r(function(a){if(("*"==d||a.origin==
        d)&&a.data==c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a&&-1==Ma.indexOf("Trident")&&-1==Ma.indexOf("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(p(c.next)){c=c.next;var a=c.ob;c.ob=null;a()}};return function(a){d.next={ob:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("SCRIPT")?function(a){var b=
        document.createElement("SCRIPT");b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};document.documentElement.appendChild(b)}:function(a){n.setTimeout(a,0)}};function Nb(a,b){Ob||Pb();Qb||(Ob(),Qb=!0);Rb.add(a,b)}var Ob;function Pb(){var a=n.Promise;if(-1!=String(a).indexOf("[native code]")){var b=a.resolve(void 0);Ob=function(){b.then(Sb)}}else Ob=function(){var a=Sb,b;!(b=!ga(n.setImmediate))&&(b=n.Window&&n.Window.prototype)&&(b=-1==Ma.indexOf("Edge")&&n.Window.prototype.setImmediate==n.setImmediate);b?(Lb||(Lb=Mb()),Lb(a)):n.setImmediate(a)}}var Qb=!1,Rb=new Hb;
    function Sb(){for(var a;a=Rb.remove();){try{a.ne.call(a.scope)}catch(b){Kb(b)}Jb.put(a)}Qb=!1};function Tb(a,b){this.ca=Ub;this.xf=void 0;this.Ub=this.nb=this.Da=null;this.md=this.le=!1;if(a!=aa)try{var c=this;a.call(b,function(a){Vb(c,Wb,a)},function(a){if(!(a instanceof Xb))try{if(a instanceof Error)throw a;throw Error("Promise rejected.");}catch(e){}Vb(c,Yb,a)})}catch(d){Vb(this,Yb,d)}}var Ub=0,Wb=2,Yb=3;function Zb(){this.next=this.context=this.lc=this.Qc=this.w=null;this.Yc=!1}Zb.prototype.reset=function(){this.context=this.lc=this.Qc=this.w=null;this.Yc=!1};
    var $b=new Gb(function(){return new Zb},function(a){a.reset()},100);function ac(a,b,c){var d=$b.get();d.Qc=a;d.lc=b;d.context=c;return d}Tb.prototype.then=function(a,b,c){return bc(this,ga(a)?a:null,ga(b)?b:null,c)};Tb.prototype.then=Tb.prototype.then;Tb.prototype.$goog_Thenable=!0;h=Tb.prototype;h.Sg=function(a,b){return bc(this,null,a,b)};h.cancel=function(a){this.ca==Ub&&Nb(function(){var b=new Xb(a);cc(this,b)},this)};
    function cc(a,b){if(a.ca==Ub)if(a.Da){var c=a.Da;if(c.nb){for(var d=0,e=null,f=null,g=c.nb;g&&(g.Yc||(d++,g.w==a&&(e=g),!(e&&1<d)));g=g.next)e||(f=g);e&&(c.ca==Ub&&1==d?cc(c,b):(f?(d=f,d.next==c.Ub&&(c.Ub=d),d.next=d.next.next):dc(c),ec(c,e,Yb,b)))}a.Da=null}else Vb(a,Yb,b)}function fc(a,b){a.nb||a.ca!=Wb&&a.ca!=Yb||gc(a);a.Ub?a.Ub.next=b:a.nb=b;a.Ub=b}
    function bc(a,b,c,d){var e=ac(null,null,null);e.w=new Tb(function(a,g){e.Qc=b?function(c){try{var e=b.call(d,c);a(e)}catch(m){g(m)}}:a;e.lc=c?function(b){try{var e=c.call(d,b);!p(e)&&b instanceof Xb?g(b):a(e)}catch(m){g(m)}}:g});e.w.Da=a;fc(a,e);return e.w}h.Ug=function(a){this.ca=Ub;Vb(this,Wb,a)};h.Vg=function(a){this.ca=Ub;Vb(this,Yb,a)};
    function Vb(a,b,c){if(a.ca==Ub){a===c&&(b=Yb,c=new TypeError("Promise cannot resolve to itself"));a.ca=1;var d;a:{var e=c,f=a.Ug,g=a.Vg;if(e instanceof Tb)fc(e,ac(f||aa,g||null,a)),d=!0;else{var k;if(e)try{k=!!e.$goog_Thenable}catch(m){k=!1}else k=!1;if(k)e.then(f,g,a),d=!0;else{if(ha(e))try{var l=e.then;if(ga(l)){hc(e,l,f,g,a);d=!0;break a}}catch(m){g.call(a,m);d=!0;break a}d=!1}}}d||(a.xf=c,a.ca=b,a.Da=null,gc(a),b!=Yb||c instanceof Xb||ic(a,c))}}
    function hc(a,b,c,d,e){function f(a){k||(k=!0,d.call(e,a))}function g(a){k||(k=!0,c.call(e,a))}var k=!1;try{b.call(a,g,f)}catch(l){f(l)}}function gc(a){a.le||(a.le=!0,Nb(a.$f,a))}function dc(a){var b=null;a.nb&&(b=a.nb,a.nb=b.next,b.next=null);a.nb||(a.Ub=null);return b}h.$f=function(){for(var a;a=dc(this);)ec(this,a,this.ca,this.xf);this.le=!1};
    function ec(a,b,c,d){if(c==Yb&&b.lc&&!b.Yc)for(;a&&a.md;a=a.Da)a.md=!1;if(b.w)b.w.Da=null,jc(b,c,d);else try{b.Yc?b.Qc.call(b.context):jc(b,c,d)}catch(e){kc.call(null,e)}$b.put(b)}function jc(a,b,c){b==Wb?a.Qc.call(a.context,c):a.lc&&a.lc.call(a.context,c)}function ic(a,b){a.md=!0;Nb(function(){a.md&&kc.call(null,b)})}var kc=Kb;function Xb(a){za.call(this,a)}ma(Xb,za);Xb.prototype.name="cancel";var lc="undefined"!=typeof Promise?Promise:"undefined"!=typeof n.Promise?n.Promise:Tb;n.setTimeout||(n.setTimeout=function(){setTimeout.apply(null,arguments)});Tb.prototype["catch"]=Tb.prototype.Sg;function B(){var a=this;this.reject=this.resolve=null;this.u=new lc(function(b,c){a.resolve=b;a.reject=c})}function C(a,b){return function(c,d){c?a.reject(c):a.resolve(d);ga(b)&&(mc(a.u),1===b.length?b(c):b(c,d))}}function mc(a){a.then(void 0,aa)};function D(a,b,c,d,e){Fb.call(this,b.displayName,b.email,b.photoURL,b.providerId,b.uid,b.phone);this.isAnonymous="anonymous"===this.providerId;this.emailVerified=!0===c;this.phoneVerified=!0===d;this.providerData=e||[];this.refreshToken=null;Object.defineProperty(this,"__authManager",{value:a,writable:!1})}ma(D,Fb);la("wd.User",D);D.prototype["delete"]=function(a){var b=new B;nc(this.__authManager,this.Ia(),C(b,a));return b.u};D.prototype["delete"]=D.prototype["delete"];
    D.prototype.Ia=function(){return(this.__authManager.Ua||null).idToken};D.prototype.getToken=D.prototype.Ia;D.prototype.re=function(){return this.phone};D.prototype.getPhone=D.prototype.re;
    D.prototype.link=function(a,b){E("wilddog.User.link",1,2,arguments.length);oc("wilddog.User.link",a);var c=a.provider,d=new B,e={};e.idToken=this.Ia();"password"==c?(e.email=a.email,e.password=a.password,pc(this.__authManager,e,C(d,b))):(e.providerId=a.provider,e.accessToken=a.accessToken,e.openId=a.openId||"",e.authType="link",qc(this.__authManager,e,C(d,b)));return d.u};D.prototype.link=D.prototype.link;
    D.prototype.Wg=function(a,b){E("wilddog.User.unlink",1,2,arguments.length);rc("wilddog.User.unlink",1,a);var c=new B,d=this;sc(this.__authManager,"unlink",{idToken:this.Ia(),deleteProvider:[a]},C(c,function(c,f){f&&(d.providerData=d.providerData.filter(function(b){if(b.providerId!=a)return b}),0===d.providerData.length&&tc(d.__authManager));b&&b(c,f)}));return c.u};D.prototype.unlink=D.prototype.Wg;
    D.prototype.jg=function(a,b){E("wilddog.auth().signInWithPopup",1,2,arguments.length);oc("wilddog.auth().signInWithPopup",a);var c=new B;uc(this.__authManager,a,{authType:"link",idToken:this.Ia()},C(c,b));return c.u};D.prototype.linkWithPopup=D.prototype.jg;D.prototype.kg=function(a,b){E("wilddog.auth().signInWithPopup",1,2,arguments.length);oc("wilddog.auth().signInWithPopup",a);var c=new B;wc(this.__authManager,a,{authType:"link",idToken:this.Ia()},C(c,b));return c.u};
    D.prototype.linkWithRedirect=D.prototype.kg;D.prototype.$g=function(a,b){E("wilddog.User.updateProfile",1,2,arguments.length);oc("wilddog.User.updateProfile",a);var c=new B;a.idToken=this.Ia();sc(this.__authManager,"profile",a,C(c,b));return c.u};D.prototype.updateProfile=D.prototype.$g;D.prototype.Xg=function(a,b){E("wilddog.User.updateEmail",1,2,arguments.length);rc("wilddog.User.updateEmail",1,a);var c=new B;pc(this.__authManager,{email:a,idToken:this.Ia()},C(c,b));return c.u};
    D.prototype.updateEmail=D.prototype.Xg;D.prototype.Zg=function(a,b){E("wilddog.User.updatePhone",1,2,arguments.length);rc("wilddog.User.updatePhone",1,a);var c=new B;pc(this.__authManager,{phoneNumber:a,idToken:this.Ia()},C(c,b));return c.u};D.prototype.updatePhone=D.prototype.Zg;D.prototype.bh=function(a,b){E("wilddog.User.verifiyPhone",1,2,arguments.length);rc("wilddog.User.verifiyPhone",1,a);var c=new B;xc(this.__authManager,{phoneNumber:this.re(),smsCode:a},C(c,b));return c.u};
    D.prototype.verifiyPhone=D.prototype.bh;D.prototype.Yg=function(a,b){E("wilddog.User.updatePassword",1,2,arguments.length);rc("wilddog.User.updatePassword",1,a);var c=new B;pc(this.__authManager,{password:a,idToken:this.Ia()},C(c,b));return c.u};D.prototype.updatePassword=D.prototype.Yg;
    D.prototype.Ag=function(a){E("wilddog.User.sendEmailVerification",0,1,arguments.length);F("wilddog.User.sendEmailVerification",1,a,!0);var b=new B;yc(this.__authManager,{idToken:this.Ia(),requestType:"VERIFY_EMAIL"},C(b,a));return b.u};D.prototype.sendEmailVerification=D.prototype.Ag;
    D.prototype.Dg=function(a){E("wilddog.User.sendPhoneVerification",0,1,arguments.length);F("wilddog.User.sendPhoneVerification",1,a,!0);var b=new B;zc(this.__authManager,{phoneNumber:this.re(),type:"PHONE_VERIFY"},C(b,a));return b.u};D.prototype.sendPhoneVerification=D.prototype.Dg;D.prototype.reload=function(a){E("wilddog.User.reload",0,1,arguments.length);F("wilddog.User.reload",1,a,!0);var b=new B;Ac(this.__authManager,this.Ia(),C(b,a));return b.u};D.prototype.reload=D.prototype.reload;
    D.prototype.wg=function(a,b){E("wilddog.User.reload",1,2,arguments.length);F("wilddog.User.reload",2,b,!0);if(!a||!a.provider)throw Error("Unknown credential object.");var c=new B;qc(this.__authManager,a,C(c,b));return c.u};D.prototype.reauthenticate=D.prototype.wg;function Bc(a){var b="POST";switch(a.providerId||a.provider){case "password":a="verifyPassword";break;case "anonymous":a="verifyAnonymous";break;case "custom":a="verifyCustomToken";break;default:a="credential",b="GET"}if(!a)throw Error("Unknown provider '"+provider+"'.");return{path:a,method:b}};function Cc(a){if(a&&a.users&&a.users[0])return a=a.users[0],new Fb(a.displayName,a.email,a.photoUrl,a.providerId,a.localId,a.phoneNumber);throw Error("Bad response format.");}function Dc(a,b){var c=Cc(b);if(!c)return null;var d=b.users[0],e=d.providerUserInfo.map(function(a){a.photoURL=a.photoUrl;delete a.photoUrl;return a});return new D(a,c,d.emailVerified,d.phoneNumberVerified,e)};var Ec="auth.wilddog.com";function Fc(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function G(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]}function Gc(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b(c,a[c])}function Hc(a){var b={};Gc(a,function(a,d){b[a]=d});return b};function Ic(a){var b={},c={},d={},e="";try{var f=a.split("."),g=jb(f[0])||"",k=jb(f[1])||"",b=va(g),c=va(k),e=f[2],d=c.d||{};delete c.d}catch(l){console.warn("error",l)}return{jh:b,he:c,data:d,lh:e}}function Jc(a){a=Ic(a).he;return"object"===typeof a&&a.hasOwnProperty("iat")?G(a,"iat"):null};function Kc(a,b,c){this.De=["session",b.Gd,b.vc,a].join(":");this.Vd=c}Kc.prototype.set=function(a,b){if(!b)if(this.Vd.length)b=this.Vd[0];else throw Error("wd.auth.SessionManager : No storage options available!");b.set(this.De,a)};Kc.prototype.get=function(){var a=Ea(this.Vd,r(this.eg,this)),a=Da(a,function(a){return null!==a});Ka(a,function(a,c){return Jc(c.idToken)-Jc(a.idToken)});return 0<a.length?a.shift():null};Kc.prototype.eg=function(a){try{var b=a.get(this.De);if(b.idToken)return b;this.clear(a)}catch(c){}return null};
    Kc.prototype.clear=function(){var a=this;Ca(this.Vd,function(b){b.remove(a.De)})};var Lc={NETWORK_ERROR:"Unable to contact the Wilddog server.",SERVER_ERROR:"An unknown server error occurred.",TRANSPORT_UNAVAILABLE:"There are no login transports available for the requested method.",REQUEST_INTERRUPTED:"The browser redirected the page before the login request could complete.",USER_CANCELLED:"The user cancelled authentication."};function Mc(a){var b=G(Lc,a),b=Error(b,a);b.code=a;return b};function Nc(a,b,c){this.dd=a||{};this.Xc=b||{};this.Z=c||{};this.dd.remember||(this.dd.remember="default")}var Oc=["remember","redirectTo"];function Pc(a){var b={},c={};Gc(a||{},function(a,e){0<=Ba(Oc,a)?b[a]=e:c[a]=e});return new Nc(b,{},c)};function Qc(a){this.Ac=a;this.Hd="wilddog:"}Qc.prototype.set=function(a,b){null==b?this.Ac.removeItem(this.Hd+a):this.Ac.setItem(this.Hd+a,t(b))};Qc.prototype.get=function(a){a=this.Ac.getItem(this.Hd+a);return null==a?null:va(a)};Qc.prototype.remove=function(a){this.Ac.removeItem(this.Hd+a)};Qc.prototype.toString=function(){return this.Ac.toString()};function Rc(){this.wc={}}Rc.prototype.set=function(a,b){null==b?delete this.wc[a]:this.wc[a]=b};Rc.prototype.get=function(a){return Fc(this.wc,a)?this.wc[a]:null};Rc.prototype.remove=function(a){delete this.wc[a]};function Sc(a){try{if("undefined"!==typeof window&&"undefined"!==typeof window[a]){var b=window[a];b.setItem("wilddog:sentinel","cache");b.removeItem("wilddog:sentinel");return new Qc(b)}}catch(c){}return new Rc}var Tc=Sc("localStorage"),Uc=Sc("sessionStorage");function Vc(a){var b=[];Gc(a,function(a,d){ea(d)?Ca(d,function(c){b.push(encodeURIComponent(a)+"="+encodeURIComponent(c))}):b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))});return b.length?"&"+b.join("&"):""}function Wc(a){var b={};a=a.replace(/^\?/,"").split("&");Ca(a,function(a){a&&(a=a.split("="),b[a[0]]=a[1])});return b};function Xc(){var a=window.opener.frames,b;for(b=a.length-1;0<=b;b--)try{if(a[b].location.protocol===window.location.protocol&&a[b].location.host===window.location.host&&"__winchan_relay_frame"===a[b].name)return a[b]}catch(c){}return null}function Yc(a,b,c){a.attachEvent?a.attachEvent("on"+b,c):a.addEventListener&&a.addEventListener(b,c,!1)}function Zc(a,b,c){a.detachEvent?a.detachEvent("on"+b,c):a.removeEventListener&&a.removeEventListener(b,c,!1)}
    function $c(a){/^https?:\/\//.test(a)||(a=window.location.href);var b=/^(https?:\/\/[\-_a-zA-Z\.0-9:]+)/.exec(a);return b?b[1]:a}function ad(){var a=document.location.hash,b="";try{var a=a.replace("#",""),c=Wc(a);c&&Fc(c,"__wilddog_request_key")&&(b=G(c,"__wilddog_request_key"))}catch(d){}return b}function bd(){var a=sb(Ec);return a.scheme+"://"+a.host+"/v2"}function cd(a){return bd()+"/"+a+"/auth/channel"};function dd(){return"undefined"!==typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(navigator.userAgent)}function ed(){return"undefined"!==typeof location&&/^file:\//.test(location.href)}
    function fd(){if("undefined"===typeof navigator)return!1;var a=navigator.userAgent;if("Microsoft Internet Explorer"===navigator.appName){if((a=a.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/))&&1<a.length)return 8<=parseFloat(a[1])}else if(-1<a.indexOf("Trident")&&(a=a.match(/rv:([0-9]{2,2}[\.0-9]{0,})/))&&1<a.length)return 8<=parseFloat(a[1]);return!1};function gd(a){a.method||(a.method="GET");a.headers||(a.headers={});a.headers["Content-Type"]||"GET"==a.method||(a.headers["Content-Type"]="application/json");a.headers["Content-Type"]&&(a.headers["Content-Type"]=a.headers["Content-Type"].toLowerCase());this.options=a}
    gd.prototype.open=function(a,b,c){function d(){c&&(c(Mc("REQUEST_INTERRUPTED")),c=null)}var e=new XMLHttpRequest,f=this.options.method.toUpperCase(),g;Yc(window,"beforeunload",d);e.onreadystatechange=function(){if(c&&4===e.readyState){var a;if(200<=e.status&&300>e.status){try{a=va(e.responseText)}catch(A){}c(null,a)}else 500<=e.status&&600>e.status?c(Mc("SERVER_ERROR")):c(Mc("NETWORK_ERROR"));c=null;Zc(window,"beforeunload",d)}};if("GET"===f)a+=(/\?/.test(a)?"":"?")+Vc(b),g=null;else{var k=this.options.headers["Content-Type"];
        "application/json"===k&&(g=t(b));"application/x-www-form-urlencoded"===k&&(g=Vc(b))}e.open(f,a,!0);a={Accept:"application/json;text/plain"};bb(a,this.options.headers);for(var l in a)e.setRequestHeader(l,a[l]);e.send(g)};gd.isAvailable=function(){return"NODE"!=CLIENT_TYPE&&!!window.XMLHttpRequest&&(!("undefined"!==typeof navigator&&(navigator.userAgent.match(/MSIE/)||navigator.userAgent.match(/Trident/)))||fd())};gd.prototype.ie=function(){return"json"};var hd={};var id={};function jd(a){if(!a.window_features||"undefined"!==typeof navigator&&(-1!==navigator.userAgent.indexOf("Fennec/")||-1!==navigator.userAgent.indexOf("Firefox/")&&-1!==navigator.userAgent.indexOf("Android")))a.window_features=void 0;a.window_name||(a.window_name="_blank");this.options=a}
    jd.prototype.open=function(a,b,c){function d(a){g&&(document.body.removeChild(g),g=void 0);A&&(A=clearInterval(A));Zc(window,"message",e);Zc(window,"unload",d);if(m&&!a)try{m.close()}catch(vc){k.postMessage("die",l)}m=k=void 0}function e(a){if(a.origin===l)try{var b=va(a.data);"ready"===b.a?k.postMessage(L,l):"error"===b.a?(d(!1),c&&(c(b.d),c=null)):"response"===b.a&&(d(b.forceKeepWindowOpen),c&&(c(null,b.d),c=null))}catch(Ti){}}var f=fd(),g,k;if(!this.options.relay_url)return c(Error("invalid arguments: origin of url and relay_url must match"));
        var l=$c(a);if(l!==$c(this.options.relay_url))c&&setTimeout(function(){c(Error("invalid arguments: origin of url and relay_url must match"))},0);else{f&&(g=document.createElement("iframe"),g.setAttribute("src",this.options.relay_url),g.style.display="none",g.setAttribute("name","__winchan_relay_frame"),document.body.appendChild(g),k=g.contentWindow);a+=(/\?/.test(a)?"":"?")+Vc(b);var m=window.open(a,this.options.window_name,this.options.window_features);k||(k=m);var A=setInterval(function(){m&&m.closed&&
        (d(!1),c&&(c(Mc("USER_CANCELLED")),c=null))},500),L=t({a:"request",d:b});Yc(window,"unload",d);Yc(window,"message",e)}};
    jd.isAvailable=function(){return"WEB"==CLIENT_TYPE&&"postMessage"in window&&!ed()&&!(dd()||"undefined"!==typeof navigator&&(navigator.userAgent.match(/Windows Phone/)||window.Windows&&/^ms-appx:/.test(location.href))||"undefined"!==typeof navigator&&"undefined"!==typeof window&&(navigator.userAgent.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i)||navigator.userAgent.match(/CriOS/)||navigator.userAgent.match(/Twitter for iPhone/)||navigator.userAgent.match(/FBAN\/FBIOS/)||window.navigator.standalone))&&
        !("undefined"!==typeof navigator&&navigator.userAgent.match(/PhantomJS/))};jd.prototype.ie=function(){return"popup"};function kd(){this.uf=Aa()+Aa()+Aa()}kd.prototype.open=function(a,b){w.set("redirect_request_id",this.uf);b.requestId=this.uf;b.redirectTo=b.redirectTo||window.location.href;a+=(/\?/.test(a)?"":"?")+Vc(b);window.location=a};kd.isAvailable=function(){return"WEB"==CLIENT_TYPE&&!ed()&&!dd()};kd.prototype.ie=function(){return"redirect"};function ld(a){var b=[];a.forEach(function(a){null!=this.jf[a]&&b.push(this.jf[a])},md);return b}var w=Uc,md=new function(){this.jf={XHR:gd,JSONP:hd,Cordova:id,Popup:jd,Redirect:kd}};function nd(a,b,c){this.Tb=a;this.ea=a.app;this.Sb=b;this.qc=new Kc(this.ea.name,b,[Tc,w]);this.Ua=null;this.Hb=c;od(this)}function od(a){w.get("redirect_request_id")&&pd(a);var b=a.qc.get();b&&b.idToken?Ac(a,b.idToken,function(c,d){if(!c&&d){var e={signIn:!0};e.currentUser=d;e.idToken=b.idToken;qd(a,e,{});rd(a,e)}else rd(a,null)}):rd(a,null)}function sd(a,b,c,d){b&&b.idToken?td(a,b.idToken,c,function(a,b){d(a,b)}):(rd(a,null),d(Error("No idToken found in response.")))}
    function td(a,b,c,d){Ac(a,b,function(e,f){if(!e&&f){var g={signIn:!0};g.currentUser=f;g.idToken=b;qd(a,g,c);rd(a,g);d(null,f)}else rd(a,null),d(e)})}function tc(a,b){a.ea.bindOnce(a.ea.kb.cb,function(){rd(a,null);b(null)})}function qc(a,b,c){ud(a);var d=new Nc({},{},b||{});b=Bc(b);d.Z._method=b.method;var e=ld(["XHR","JSONP","NodeHttp","WxHttp"]);vd(a,e,"/auth/"+b.path,d,function(a,b){y(c,a,b)})}
    function xd(a,b){ud(a);var c=new Nc({},{},{}),d=ld(["WxImplicit"]);vd(a,d,"/auth/wxapp",c,function(a,c){y(b,a,c)})}
    function uc(a,b,c,d){ud(a);var e=ld(["Popup","Cordova"]);requestInfo=Pc(c);height=width=625;b.id?(requestInfo.Z.providerId=b.id,requestInfo.Z.scope=b.scope||"",requestInfo.Z.appId=a.Sb.vc,requestInfo.Xc.window_features="menubar=yes,modal=yes,alwaysRaised=yeslocation=yes,resizable=yes,scrollbars=yes,status=yes,height="+height+",width="+width+",top="+("object"===typeof screen?.5*(screen.height-height):0)+",left="+("object"===typeof screen?.5*(screen.width-width):0),requestInfo.Xc.relay_url=cd(a.Sb.vc),
        requestInfo.Xc.requestWithCredential=r(a.ab,a),vd(a,e,"/auth/oauth",requestInfo,function(a,b){y(d,a,b)})):setTimeout(function(){y(d,Mc("TRANSPORT_UNAVAILABLE_FOR_UNKNOWN_PROVIDER"))},0)}function wc(a,b,c,d){ud(a);var e=ld(["Redirect"]);c=Pc(c);b.id?(c.Z.providerId=b.id,c.Z.scope=b.scope||"",c.Z.appId=a.Sb.vc,w.set("redirect_client_options",c.dd),vd(a,e,"/auth/oauth",c,function(a,b){y(d,a,b)})):y(d,Mc("TRANSPORT_UNAVAILABLE"))}
    function pd(a){var b=w.get("redirect_request_id");if(b){var c=w.get("redirect_client_options"),d=ld(["XHR","JSONP"]);serverParams={requestId:b,requestKey:ad()};transportOptions={};requestInfo=new Nc(c,transportOptions,serverParams);try{document.location.hash=document.location.hash.replace(/&__wilddog_request_key=([a-zA-z0-9]*)/,"")}catch(e){}vd(a,d,"/auth/session",requestInfo,function(){w.remove("redirect_request_id");w.remove("redirect_client_options")}.bind(a))}}
    function yd(a,b,c){ud(a);b=Pc(b);b.Z._method="POST";a.ab("/auth/signupNewUser",b,function(b,e){!b&&e&&e.idToken?td(a,e.idToken,null,function(a,b){y(c,a,b)}):y(c,b)})}
    function sc(a,b,c,d){var e={idToken:c.idToken},f=c.photoURL||a.Ua.currentUser.photoURL,g=c.displayName||a.Ua.currentUser.displayName;switch(b){case "unlink":e.deleteProvider=c.deleteProvider;break;case "profile":e.photoUrl=f,e.displayName=g}zd(a,e,function(b,c){b?y(d,b):(a.Ua.currentUser.displayName=g,a.Ua.currentUser.photoURL=f,qd(a,a.Ua),y(d,b,c))})}function pc(a,b,c){zd(a,b,function(b,e){b?y(c,b):sd(a,e,{},c)})}
    function zd(a,b,c){b=Pc(b);b.Z._method="POST";b.Z.idToken=a.Ua.idToken;a.ab("/auth/setAccountInfo",b,function(a,b){a?c(a):c(a,b)})}function Ac(a,b,c){ud(a);b=Pc({idToken:b});b.Z._method="POST";a.ab("/auth/getAccountInfo",b,function(b,e){b?c(b):c(b,Dc(a,e))})}function nc(a,b,c){ud(a);b=Pc({idToken:b});b.Z._method="POST";a.ab("/auth/deleteAccount",b,function(b,e){!b&&e&&"ok"==e.status&&a.Ua&&tc(a);y(c,b)})}
    function yc(a,b,c){ud(a);b=Pc(b);b.Z._method="POST";a.ab("/auth/getOobConfirmationCode",b,function(a,b){y(c,a,b)})}nd.prototype.me=function(a,b){ud(this);var c=Pc({email:a});c.Z._method="POST";this.ab("/auth/getProvider",c,function(a,c){a?y(b,a):y(b,a,c.allProviders||[])})};nd.prototype.ab=function(a,b,c){var d=ld(["XHR","JSONP","NodeHttp","WxHttp"]);Ad(this,d,a,b,c)};
    function vd(a,b,c,d,e){Ad(a,b,c,d,function(b,c){!b&&c&&c.idToken?sd(a,c,d.dd,function(a,b){a?e(a):e(null,b)}):e(b||Mc("UNKNOWN_ERROR"))})}
    function Ad(a,b,c,d,e){b=Da(b,function(a){return"function"===typeof a.isAvailable&&a.isAvailable()});0===b.length?setTimeout(function(){e(Mc("TRANSPORT_UNAVAILABLE"))},0):(b=b.shift(),d.Xc.method=d.Z._method,b=new b(d.Xc),d=Hc(d.Z),d.v=CLIENT_TYPE+CLIENT_VERSION,d.transport=b.ie(),d.suppress_status_codes=!0,a=bd()+"/"+a.Sb.vc+c,b.open(a,d,function(a,b){if(a)e(a);else if(b&&b.error){var c=Error(b.message);c.code=b.errcode;e(c)}else e(null,b)}))}
    function qd(a,b,c){a.qc.clear();c=c||{};var d=Tc;"sessionOnly"===c.remember&&(d=w);"none"!==c.remember&&a.qc.set(b,d)}function rd(a,b){a.Ua=b;a.Tb.currentUser=b&&b.signIn?b.currentUser:null;a.Hb&&a.Hb(null!==b);b&&b.signIn||a.qc.clear();a.ea.emit(a.ea.kb.cb,b||{signIn:!1})}function ud(a){if(a.Sb.ff&&"auth.wilddog.com"===Ec)throw Error("This custom Wilddog server ('"+a.Sb.domain+"') does not support delegated login.");}
    function xc(a,b,c){b=Pc(b);b.Z._method="POST";a.ab("/auth/verifyPhone",b,function(b,e){!b&&e&&"ok"==e.status&&a.Tb.currentUser&&(a.Tb.currentUser.phoneVerified=!0);!b&&e&&e.idToken?td(a,e.idToken,null,function(a){y(c,a)}):y(c,b)})}function Bd(a,b,c){ud(a);b=Pc(b);b.Z._method="POST";a.ab("/auth/resetPhonePassword",b,function(a,b){a?y(c,a):y(c,a,b)})}function zc(a,b,c){ud(a);b=Pc(b);b.Z._method="POST";a.ab("/auth/sendSmsCode",b,function(a,b){y(c,a,b)})};function E(a,b,c,d){var e;d<b?e="at least "+b:d>c&&(e=0===c?"none":"no more than "+c);if(e)throw Error(a+" failed: Was called with "+d+(1===d?" argument.":" arguments.")+" Expects "+e+".");}function Cd(a,b,c){switch(b){case 1:b=c?"first":"First";break;case 2:b=c?"second":"Second";break;case 3:b=c?"third":"Third";break;case 4:b=c?"fourth":"Fourth";break;default:throw Error("errorPrefix called with argumentNumber > 4.  Need to update it?");}return a+" failed: "+(b+" argument ")}
    function F(a,b,c,d){if((!d||p(c))&&!ga(c))throw Error(Cd(a,b,d)+"must be a valid function.");}function Dd(a,b,c){if(p(c)&&(!ha(c)||null===c))throw Error(Cd(a,b,!0)+"must be a valid context object.");};function H(a,b){if(1==arguments.length){this.C=a.split("/");for(var c=0,d=0;d<this.C.length;d++)0<this.C[d].length&&(this.C[c]=this.C[d],c++);this.C.length=c;this.ba=0}else this.C=a,this.ba=b}function I(a,b){var c=J(a);if(null===c)return b;if(c===J(b))return I(K(a),K(b));throw Error("INTERNAL ERROR: innerPath ("+b+") is not within outerPath ("+a+")");}function J(a){return a.ba>=a.C.length?null:a.C[a.ba]}function Ed(a){return a.C.length-a.ba}
    function K(a){var b=a.ba;b<a.C.length&&b++;return new H(a.C,b)}function Fd(a){return a.ba<a.C.length?a.C[a.C.length-1]:null}h=H.prototype;h.toString=function(){for(var a="",b=this.ba;b<this.C.length;b++)""!==this.C[b]&&(a+="/"+this.C[b]);return a||"/"};h.slice=function(a){return this.C.slice(this.ba+(a||0))};h.parent=function(){if(this.ba>=this.C.length)return null;for(var a=[],b=this.ba;b<this.C.length-1;b++)a.push(this.C[b]);return new H(a,0)};
    h.w=function(a){for(var b=[],c=this.ba;c<this.C.length;c++)b.push(this.C[c]);if(a instanceof H)for(c=a.ba;c<a.C.length;c++)b.push(a.C[c]);else for(a=a.split("/"),c=0;c<a.length;c++)0<a[c].length&&b.push(a[c]);return new H(b,0)};h.f=function(){return this.ba>=this.C.length};h.fa=function(a){if(Ed(this)!==Ed(a))return!1;for(var b=this.ba,c=a.ba;b<=this.C.length;b++,c++)if(this.C[b]!==a.C[c])return!1;return!0};
    h.contains=function(a){var b=this.ba,c=a.ba;if(Ed(this)>Ed(a))return!1;for(;b<this.C.length;){if(this.C[b]!==a.C[c])return!1;++b;++c}return!0};var M=new H("");function Gd(a,b){this.Za=a.slice();this.La=Math.max(1,this.Za.length);this.Xe=b;for(var c=0;c<this.Za.length;c++)this.La+=Hd(this.Za[c]);Id(this)}Gd.prototype.push=function(a){0<this.Za.length&&(this.La+=1);this.Za.push(a);this.La+=Hd(a);Id(this)};Gd.prototype.pop=function(){var a=this.Za.pop();this.La-=Hd(a);0<this.Za.length&&--this.La};
    function Id(a){if(768<a.La)throw Error(a.Xe+"has a key path longer than 768 bytes ("+a.La+").");if(32<a.Za.length)throw Error(a.Xe+"path specified exceeds the maximum depth that can be written (32) or object contains a cycle "+Jd(a));}function Jd(a){return 0==a.Za.length?"":"in property '"+a.Za.join(".")+"'"};function Hd(a){for(var b=0,c=0;c<a.length;c++){var d=a.charCodeAt(c);128>d?b++:2048>d?b+=2:55296<=d&&56319>=d?(b+=4,c++):b+=3}return b};var Kd=/[\[\].#$\/\u0000-\u001F\u007F]/,Ld=/[\[\].#$\u0000-\u001F\u007F]/;function Md(a){return q(a)&&0!==a.length&&!Kd.test(a)}function Nd(a){return null===a||q(a)||fa(a)&&!tb(a)||ha(a)&&Fc(a,".sv")}function Od(a,b,c,d){d&&!p(b)||Pd(Cd(a,1,d),b,c)}
    function Pd(a,b,c){c instanceof H&&(c=new Gd(c,a));if(!p(b))throw Error(a+"contains undefined "+Jd(c));if(ga(b))throw Error(a+"contains a function "+Jd(c)+" with contents: "+b.toString());if(tb(b))throw Error(a+"contains "+b.toString()+" "+Jd(c));if(q(b)&&b.length>10485760/3&&10485760<Hd(b))throw Error(a+"contains a string greater than 10485760 utf8 bytes "+Jd(c)+" ('"+b.substring(0,50)+"...')");if(ha(b)){var d=!1,e=!1;Gc(b,function(b,g){if(".value"===b)d=!0;else if(".priority"!==b&&".sv"!==b&&(e=
            !0,!Md(b)))throw Error(a+" contains an invalid key ("+b+") "+Jd(c)+'.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');c.push(b);Pd(a,g,c);c.pop()});if(d&&e)throw Error(a+' contains ".value" child '+Jd(c)+" in addition to actual children.");}}
    function Qd(a,b){var c,d;for(c=0;c<b.length;c++){d=b[c];for(var e=d.slice(),f=0;f<e.length;f++)if((".priority"!==e[f]||f!==e.length-1)&&!Md(e[f]))throw Error(a+"contains an invalid key ("+e[f]+") in path "+d.toString()+'. Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');}b.sort(H.hh);e=null;for(c=0;c<b.length;c++){d=b[c];if(null!==e&&e.contains(d))throw Error(a+"contains a path "+e.toString()+" that is ancestor of another path "+d.toString());e=d}}
    function Rd(a,b,c){var d=Cd(a,1,!1);if(!ha(b)||ea(b))throw Error(d+" must be an Object containing the children to replace.");if(Fc(b,".value"))throw Error(d+' must not contain ".value".  To overwrite with a leaf value, just use .set() instead.');var e=[];Gc(b,function(a,b){var f=new H(a);Pd(d,b,c.w(f));if(".priority"===Fd(f)&&!Nd(b))throw Error(d+"contains an invalid value for '"+f.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");e.push(f)});
        Qd(d,e)}function Sd(a,b,c){if(tb(c))throw Error(Cd(a,b,!1)+"is "+c.toString()+", but must be a valid Wilddog priority (a string, finite number, server value, or null).");if(!Nd(c))throw Error(Cd(a,b,!1)+"must be a valid Wilddog priority (a string, finite number, server value, or null).");}
    function Td(a,b,c){if(!c||p(b))switch(b){case "value":case "child_added":case "child_removed":case "child_changed":case "child_moved":break;default:throw Error(Cd(a,1,c)+'must be a valid event type: "value", "child_added", "child_removed", "child_changed", or "child_moved".');}}function Ud(a,b,c,d){if((!d||p(c))&&!Md(c))throw Error(Cd(a,b,d)+'was an invalid key: "'+c+'".  Wilddog keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").');}
    function Vd(a,b){if(!q(b)||0===b.length||Ld.test(b))throw Error(Cd(a,1,!1)+'was an invalid path: "'+b+'". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"');}function Wd(a,b){b&&(b=b.replace(/^\/*\.info(\/|$)/,"/"));Vd(a,b)}function Xd(a,b){if(".info"===J(b))throw Error(a+" failed: Can't modify data under /.info/");}function rc(a,b,c){if(!q(c))throw Error(Cd(a,b,!1)+"must be a valid string.");}
    function oc(a,b){if(!ha(b)||null===b)throw Error(Cd(a,1,!1)+"must be a valid object.");};function N(a){if(!a.options.authDomain)throw Error("Could not find 'authDomain' in options.");var b=this;this.Lf=function(a){var b=/^([a-zA-Z0-9\-_]+)\.([a-z]+)\.com/.exec(a.toLowerCase());if(!b)throw Error("Bad 'authDomain' format '"+a+"'.");return{vc:b[1],nh:b[2],fh:b[0],Gd:"",ff:"wilddog"!==b[2]}}(a.options.authDomain);this.app=a;this.da=new nd(this,this.Lf);this.app.bind(this.app.kb.Re,function(a){var c=b.da;a=a.reason;c.qc.clear();c.Ua=null;c.Tb.currentUser=null;c.ea.emit(c.ea.kb.cb,{signIn:!1,
        reason:a});c.Hb&&c.Hb(!1)})}N.prototype.mg=function(a){function b(b){var d;if(!(d=b&&b.signIn)){var f=c.da;d=w.get("redirect_request_id");f=f.qc.get();d=!(d||f&&f.idToken)}d&&a(b&&b.signIn?b.currentUser:null)}var c=this;E("wilddog.auth().onAuthStateChanged",1,1,arguments.length);F("wilddog.auth().onAuthStateChanged",1,a,!1);this.app.bind(this.app.kb.cb,b);return function(){c.app.unbind(c.app.kb.cb,b)}};N.prototype.onAuthStateChanged=N.prototype.mg;
    N.prototype.Hg=function(a){E("wilddog.auth().signInAnonymously",0,1,arguments.length);F("wilddog.auth().signInAnonymously",1,a,!0);var b=new B;yd(this.da,{},C(b,a));return b.u};N.prototype.signInAnonymously=N.prototype.Hg;N.prototype.Ig=function(a){E("wilddog.auth().signInAnonymously",0,1,arguments.length);F("wilddog.auth().signInAnonymously",1,a,!0);var b=new B;xd(this.da,C(b,a));return b.u};N.prototype.signInWeapp=N.prototype.Ig;
    N.prototype.Bg=function(a,b){E("wilddog.auth().sendPasswordResetEmail",1,2,arguments.length);F("wilddog.auth().sendPasswordResetEmail",2,b,!0);var c=new B;yc(this.da,{requestType:"RESET_PASSWORD",email:a},C(c,b));return c.u};N.prototype.sendPasswordResetEmail=N.prototype.Bg;N.prototype.Cg=function(a,b){E("wilddog.auth().sendPasswordResetSms",1,2,arguments.length);F("wilddog.auth().sendPasswordResetSms",2,b,!0);var c=new B;zc(this.da,{type:"PASSWORD_RESET",phoneNumber:a},C(c,b));return c.u};
    N.prototype.sendPasswordResetSms=N.prototype.Cg;N.prototype.Sf=function(a,b,c,d){E("wilddog.auth().sendPasswordResetSms",3,4,arguments.length);F("wilddog.auth().sendPasswordResetSms",4,d,!0);rc("wilddog.auth().sendPasswordResetSms",2,b);var e=new B;Bd(this.da,{phoneNumber:a,password:c,smsCode:b},C(e,d));return e.u};N.prototype.confirmPasswordResetSms=N.prototype.Sf;
    N.prototype.me=function(a,b){E("wilddog.auth().fetchProvidersForEmail",1,2,arguments.length);F("wilddog.auth().fetchProvidersForEmail",2,b,!0);var c=new B;this.da.me(a,C(c,b));return c.u};N.prototype.fetchProvidersForEmail=N.prototype.me;N.prototype.Kg=function(a,b){E("wilddog.auth().signInWithCustomToken",1,2,arguments.length);F("wilddog.auth().signInWithCustomToken",2,b,!0);var c=new B;qc(this.da,{providerId:"custom",token:a},C(c,b));return c.u};N.prototype.signInWithCustomToken=N.prototype.Kg;
    N.prototype.Lg=function(a,b,c){E("wilddog.auth().signInWithEmailAndPassword",2,3,arguments.length);F("wilddog.auth().signInWithEmailAndPassword",3,c,!0);var d=new B;qc(this.da,{providerId:"password",password:b,email:a},C(d,c));return d.u};N.prototype.signInWithEmailAndPassword=N.prototype.Lg;
    N.prototype.Mg=function(a,b,c){E("wilddog.auth().signInWithPhoneAndPassword",2,3,arguments.length);F("wilddog.auth().signInWithPhoneAndPassword",3,c,!0);var d=new B;qc(this.da,{providerId:"password",password:b,phoneNumber:a},C(d,c));return d.u};N.prototype.signInWithPhoneAndPassword=N.prototype.Mg;N.prototype.Pg=function(a){E("wilddog.auth().signOut",0,1,arguments.length);F("wilddog.auth().signOut",1,a,!0);var b=new B;tc(this.da,C(b,a));return b.u};N.prototype.signOut=N.prototype.Pg;
    N.prototype.Tf=function(a,b,c){E("wilddog.auth().createUserWithEmailAndPassword",2,3,arguments.length);F("wilddog.auth().createUserWithEmailAndPassword",3,c,!0);var d=new B;yd(this.da,{email:a,password:b},C(d,c));return d.u};N.prototype.createUserWithEmailAndPassword=N.prototype.Tf;
    N.prototype.Uf=function(a,b,c){E("wilddog.auth().createUserWithPhoneAndPassword",2,3,arguments.length);F("wilddog.auth().createUserWithPhoneAndPassword",3,c,!0);var d=new B;yd(this.da,{phoneNumber:a,password:b},C(d,c));return d.u};N.prototype.createUserWithPhoneAndPassword=N.prototype.Uf;N.prototype.Ng=function(a,b){E("wilddog.auth().signInWithPopup",1,2,arguments.length);oc("wilddog.auth().signInWithPopup",a);var c=new B;uc(this.da,a,{authType:"login"},C(c,b));return c.u};
    N.prototype.signInWithPopup=N.prototype.Ng;N.prototype.Og=function(a,b){E("wilddog.auth().signInWithRedirect",1,2,arguments.length);oc("wilddog.auth().signInWithRedirect",a);var c=new B;wc(this.da,a,{authType:"login"},C(c,b));return c.u};N.prototype.signInWithRedirect=N.prototype.Og;
    N.prototype.Jg=function(a,b){E("wilddog.auth().signInWithCredential",1,2,arguments.length);oc("wilddog.auth().signInWithCredential",a);var c={};"password"==a.provider?(c.providerId=a.provider,c.email=a.email,c.phoneNumber=a.phone,c.password=a.password):(c.providerId=a.provider,c.accessToken=a.accessToken,c.openId=a.openId||a.email);c.authType="login";var d=new B;qc(this.da,c,C(d,b));return d.u};N.prototype.signInWithCredential=N.prototype.Jg;function Yd(){this.Ue="DEFAULT";this.lg={};this.Zc={};this.ee=this.app=null}Yd.prototype.hg=function(a,b){var c=b||this.Ue;this.Zc[c]=new z(a,c);b==this.Ue||null==b?this.app=this.Zc[c]:this[c]=this.Zc[c];return this.Zc[c]};Yd.prototype.initializeApp=Yd.prototype.hg;Yd.prototype.Ee=function(a,b){this.lg[a]=b;Db(a,b);this[a]=function(){if(this.app)return this.app[a]();throw Error("Default application not initialized!Please call wilddog.initializeApp first.");}};Yd.prototype.regService=Yd.prototype.Ee;
    Yd.prototype.Ne=CLIENT_VERSION;Yd.prototype.SDK_VERSION=Yd.prototype.Ne;var Zd=new Yd;function $d(a,b){return ub(a.name,b.name)}function ae(a,b){return ub(a,b)};function be(){}var ce={};function de(a){return r(a.compare,a)}be.prototype.rd=function(a,b){return 0!==this.compare(new O("[MIN_NAME]",a),new O("[MIN_NAME]",b))};function ee(a){this.gc=a}ma(ee,be);h=ee.prototype;h.Ec=function(a){return!a.R(this.gc).f()};h.compare=function(a,b){var c=a.node.R(this.gc),d=b.node.R(this.gc),c=c.yc(d);return 0===c?ub(a.name,b.name):c};h.Kc=function(a,b){var c=P(a),c=Q.U(this.gc,c);return new O(b,c)};h.Lc=function(){var a=Q.U(this.gc,fe);return new O("[MAX_NAME]",a)};
    h.toString=function(){return this.gc};function ge(){}ma(ge,be);h=ge.prototype;h.compare=function(a,b){var c=a.node.H(),d=b.node.H(),c=c.yc(d);return 0===c?ub(a.name,b.name):c};h.Ec=function(a){return!a.H().f()};h.rd=function(a,b){return!a.H().fa(b.H())};h.Lc=function(){return new O("[MAX_NAME]",new he("[PRIORITY-POST]",fe))};h.Kc=function(a,b){var c=P(a);return new O(b,new he("[PRIORITY-POST]",c))};h.toString=function(){return".priority"};var R=new ge;function ie(){}ma(ie,be);h=ie.prototype;
    h.compare=function(a,b){return ub(a.name,b.name)};h.Ec=function(){throw ib("KeyIndex.isDefinedOn not expected to be called.");};h.rd=function(){return!1};h.Lc=function(){return new O("[MAX_NAME]",Q)};h.Kc=function(a){v(q(a),"KeyIndex indexValue must always be a string.");return new O(a,Q)};h.toString=function(){return".key"};var je=new ie;function ke(){}ma(ke,be);h=ke.prototype;h.compare=function(a,b){var c=a.node.yc(b.node);return 0===c?ub(a.name,b.name):c};h.Ec=function(){return!0};
    h.rd=function(a,b){return!a.fa(b)};h.Lc=function(){return le};h.Kc=function(a,b){var c=P(a);return new O(b,c)};h.toString=function(){return".value"};var me=new ke;function ne(a,b){this.sd=a;this.hc=b}ne.prototype.get=function(a){var b=G(this.sd,a);if(!b)throw Error("No index defined for "+a);return b===ce?null:b};function oe(a,b,c){var d=Pa(a.sd,function(d,f){var e=G(a.hc,f);v(e,"Missing index implementation for "+f);if(d===ce){if(e.Ec(b.node)){for(var k=[],l=c.ac(pe),m=S(l);m;)m.name!=b.name&&k.push(m),m=S(l);k.push(b);return qe(k,de(e))}return ce}e=c.get(b.name);k=d;e&&(k=k.remove(new O(b.name,e)));return k.Wa(b,b.node)});return new ne(d,a.hc)}
    function re(a,b,c){var d=Pa(a.sd,function(a){if(a===ce)return a;var d=c.get(b.name);return d?a.remove(new O(b.name,d)):a});return new ne(d,a.hc)}var se=new ne({".priority":ce},{".priority":R});function O(a,b){this.name=a;this.node=b}function pe(a,b){return new O(a,b)};function he(a,b){this.J=a;v(p(this.J)&&null!==this.J,"LeafNode shouldn't be created with null/undefined value.");this.ha=b||Q;te(this.ha);this.Eb=null}h=he.prototype;h.S=function(){return!0};h.H=function(){return this.ha};h.ia=function(a){return new he(this.J,a)};h.R=function(a){return".priority"===a?this.ha:Q};h.va=function(a){return a.f()?this:".priority"===J(a)?this.ha:Q};h.Pa=function(){return!1};h.bf=function(){return null};
    h.U=function(a,b){return".priority"===a?this.ia(b):b.f()&&".priority"!==a?this:Q.U(a,b).ia(this.ha)};h.L=function(a,b){var c=J(a);if(null===c)return b;if(b.f()&&".priority"!==c)return this;v(".priority"!==c||1===Ed(a),".priority must be the last token in a path");return this.U(c,Q.L(K(a),b))};h.f=function(){return!1};h.Fb=function(){return 0};h.P=function(a){return a&&!this.H().f()?{".value":this.Ja(),".priority":this.H().P()}:this.Ja()};
    h.hash=function(){if(null===this.Eb){var a="";this.ha.f()||(a+="priority:"+ue(this.ha.P())+":");var b=typeof this.J,a=a+(b+":"),a="number"===b?a+yb(this.J):a+this.J;this.Eb=lb(a)}return this.Eb};h.Ja=function(){return this.J};h.yc=function(a){if(a===Q)return 1;if(a instanceof T)return-1;v(a.S(),"Unknown node type");var b=typeof a.J,c=typeof this.J,d=Ba(ve,b),e=Ba(ve,c);v(0<=d,"Unknown leaf type: "+b);v(0<=e,"Unknown leaf type: "+c);return d===e?"object"===c?0:this.J<a.J?-1:this.J===a.J?0:1:e-d};
    var ve=["object","boolean","number","string"];he.prototype.vb=function(){return this};he.prototype.Fc=function(){return!0};he.prototype.fa=function(a){return a===this?!0:a.S()?this.J===a.J&&this.ha.fa(a.ha):!1};he.prototype.toString=function(){return t(this.P(!0))};function we(a,b){this.Va=a;this.Ea=b?b:xe}h=we.prototype;h.Wa=function(a,b){return new we(this.Va,this.Ea.Wa(a,b,this.Va).aa(null,null,ye,null,null))};h.remove=function(a){return new we(this.Va,this.Ea.remove(a,this.Va).aa(null,null,ye,null,null))};h.get=function(a){for(var b,c=this.Ea;!c.f();){b=this.Va(a,c.key);if(0===b)return c.value;0>b?c=c.left:0<b&&(c=c.right)}return null};
    function ze(a,b){for(var c,d=a.Ea,e=null;!d.f();){c=a.Va(b,d.key);if(0===c){if(d.left.f())return e?e.key:null;for(d=d.left;!d.right.f();)d=d.right;return d.key}0>c?d=d.left:0<c&&(e=d,d=d.right)}throw Error("Attempted to find predecessor key for a nonexistent key.  What gives?");}h.f=function(){return this.Ea.f()};h.count=function(){return this.Ea.count()};h.Nc=function(){return this.Ea.Nc()};h.jc=function(){return this.Ea.jc()};h.qa=function(a){return this.Ea.qa(a)};
    h.ac=function(a){return new Ae(this.Ea,null,this.Va,!1,a)};h.bc=function(a,b){return new Ae(this.Ea,a,this.Va,!1,b)};h.dc=function(a,b){return new Ae(this.Ea,a,this.Va,!0,b)};h.cf=function(a){return new Ae(this.Ea,null,this.Va,!0,a)};function Ae(a,b,c,d,e){this.Md=e||null;this.we=d;for(this.Ya=[];!a.f();)if(e=b?c(a.key,b):1,d&&(e*=-1),0>e)a=this.we?a.left:a.right;else if(0===e){this.Ya.push(a);break}else this.Ya.push(a),a=this.we?a.right:a.left}
    function S(a){if(0===a.Ya.length)return null;var b=a.Ya.pop(),c;c=a.Md?a.Md(b.key,b.value):{key:b.key,value:b.value};if(a.we)for(b=b.left;!b.f();)a.Ya.push(b),b=b.right;else for(b=b.right;!b.f();)a.Ya.push(b),b=b.left;return c}function Be(a){if(0===a.Ya.length)return null;var b;b=a.Ya;b=b[b.length-1];return a.Md?a.Md(b.key,b.value):{key:b.key,value:b.value}}function Ce(a,b,c,d,e){this.key=a;this.value=b;this.color=null!=c?c:De;this.left=null!=d?d:xe;this.right=null!=e?e:xe}var De=!0,ye=!1;h=Ce.prototype;
    h.aa=function(a,b,c,d,e){return new Ce(null!=a?a:this.key,null!=b?b:this.value,null!=c?c:this.color,null!=d?d:this.left,null!=e?e:this.right)};h.count=function(){return this.left.count()+1+this.right.count()};h.f=function(){return!1};h.qa=function(a){return this.left.qa(a)||a(this.key,this.value)||this.right.qa(a)};function Ee(a){return a.left.f()?a:Ee(a.left)}h.Nc=function(){return Ee(this).key};h.jc=function(){return this.right.f()?this.key:this.right.jc()};
    h.Wa=function(a,b,c){var d,e;e=this;d=c(a,e.key);e=0>d?e.aa(null,null,null,e.left.Wa(a,b,c),null):0===d?e.aa(null,b,null,null,null):e.aa(null,null,null,null,e.right.Wa(a,b,c));return Fe(e)};function Ge(a){if(a.left.f())return xe;a.left.la()||a.left.left.la()||(a=He(a));a=a.aa(null,null,null,Ge(a.left),null);return Fe(a)}
    h.remove=function(a,b){var c,d;c=this;if(0>b(a,c.key))c.left.f()||c.left.la()||c.left.left.la()||(c=He(c)),c=c.aa(null,null,null,c.left.remove(a,b),null);else{c.left.la()&&(c=Ie(c));c.right.f()||c.right.la()||c.right.left.la()||(c=Je(c),c.left.left.la()&&(c=Ie(c),c=Je(c)));if(0===b(a,c.key)){if(c.right.f())return xe;d=Ee(c.right);c=c.aa(d.key,d.value,null,null,Ge(c.right))}c=c.aa(null,null,null,null,c.right.remove(a,b))}return Fe(c)};h.la=function(){return this.color};
    function Fe(a){a.right.la()&&!a.left.la()&&(a=Ke(a));a.left.la()&&a.left.left.la()&&(a=Ie(a));a.left.la()&&a.right.la()&&(a=Je(a));return a}function He(a){a=Je(a);a.right.left.la()&&(a=a.aa(null,null,null,null,Ie(a.right)),a=Ke(a),a=Je(a));return a}function Ke(a){return a.right.aa(null,null,a.color,a.aa(null,null,De,null,a.right.left),null)}function Ie(a){return a.left.aa(null,null,a.color,null,a.aa(null,null,De,a.left.right,null))}
    function Je(a){return a.aa(null,null,!a.color,a.left.aa(null,null,!a.left.color,null,null),a.right.aa(null,null,!a.right.color,null,null))}function Le(){}h=Le.prototype;h.aa=function(){return this};h.Wa=function(a,b){return new Ce(a,b,null)};h.remove=function(){return this};h.count=function(){return 0};h.f=function(){return!0};h.qa=function(){return!1};h.Nc=function(){return null};h.jc=function(){return null};h.la=function(){return!1};var xe=new Le;function T(a,b,c){this.A=a;(this.ha=b)&&te(this.ha);a.f()&&v(!this.ha||this.ha.f(),"An empty node cannot have a priority");this.Cb=c;this.Eb=null}h=T.prototype;h.S=function(){return!1};h.H=function(){return this.ha||Q};h.ia=function(a){return this.A.f()?this:new T(this.A,a,this.Cb)};h.R=function(a){if(".priority"===a)return this.H();a=this.A.get(a);return null===a?Q:a};h.va=function(a){var b=J(a);return null===b?this:this.R(b).va(K(a))};h.Pa=function(a){return null!==this.A.get(a)};
    h.U=function(a,b){v(b,"We should always be passing snapshot nodes");if(".priority"===a)return this.ia(b);var c=new O(a,b),d,e;b.f()?(d=this.A.remove(a),c=re(this.Cb,c,this.A)):(d=this.A.Wa(a,b),c=oe(this.Cb,c,this.A));e=d.f()?Q:this.ha;return new T(d,e,c)};h.L=function(a,b){var c=J(a);if(null===c)return b;v(".priority"!==J(a)||1===Ed(a),".priority must be the last token in a path");var d=this.R(c).L(K(a),b);return this.U(c,d)};h.f=function(){return this.A.f()};h.Fb=function(){return this.A.count()};
    var Me=/^(0|[1-9]\d*)$/;h=T.prototype;h.P=function(a){if(this.f())return null;var b={},c=0,d=0,e=!0;this.X(R,function(f,g){b[f]=g.P(a);c++;e&&Me.test(f)?d=Math.max(d,Number(f)):e=!1});if(!a&&e&&d<2*c){var f=[],g;for(g in b)f[g]=b[g];return f}a&&!this.H().f()&&(b[".priority"]=this.H().P());return b};h.hash=function(){if(null===this.Eb){var a="";this.H().f()||(a+="priority:"+ue(this.H().P())+":");this.X(R,function(b,c){var d=c.hash();""!==d&&(a+=":"+b+":"+d)});this.Eb=""===a?"":lb(a)}return this.Eb};
    h.bf=function(a,b,c){return(c=Ne(this,c))?(a=ze(c,new O(a,b)))?a.name:null:ze(this.A,a)};function Oe(a,b){var c;c=(c=Ne(a,b))?(c=c.Nc())&&c.name:a.A.Nc();return c?new O(c,a.A.get(c)):null}function Pe(a,b){var c;c=(c=Ne(a,b))?(c=c.jc())&&c.name:a.A.jc();return c?new O(c,a.A.get(c)):null}h.X=function(a,b){var c=Ne(this,a);return c?c.qa(function(a){return b(a.name,a.node)}):this.A.qa(b)};h.ac=function(a){return this.bc(Qe,a)};
    h.bc=function(a,b){var c=Ne(this,b);if(c)return c.bc(a,function(a){return a});for(var c=this.A.bc(a.name,pe),d=Be(c);null!=d&&0>b.compare(d,a);)S(c),d=Be(c);return c};h.cf=function(a){return this.dc(a.Lc(),a)};h.dc=function(a,b){var c=Ne(this,b);if(c)return c.dc(a,function(a){return a});for(var c=this.A.dc(a.name,pe),d=Be(c);null!=d&&0<b.compare(d,a);)S(c),d=Be(c);return c};h.yc=function(a){return this.f()?a.f()?0:-1:a.S()||a.f()?1:a===fe?-1:0};
    h.vb=function(a){if(a===je||Wa(this.Cb.hc,a.toString()))return this;var b=this.Cb,c=this.A;v(a!==je,"KeyIndex always exists and isn't meant to be added to the IndexMap.");for(var d=[],e=!1,c=c.ac(pe),f=S(c);f;)e=e||a.Ec(f.node),d.push(f),f=S(c);d=e?qe(d,de(a)):ce;e=a.toString();c=$a(b.hc);c[e]=a;a=$a(b.sd);a[e]=d;return new T(this.A,this.ha,new ne(a,c))};h.Fc=function(a){return a===je||Wa(this.Cb.hc,a.toString())};
    h.fa=function(a){if(a===this)return!0;if(a.S())return!1;if(this.H().fa(a.H())&&this.A.count()===a.A.count()){var b=this.ac(R);a=a.ac(R);for(var c=S(b),d=S(a);c&&d;){if(c.name!==d.name||!c.node.fa(d.node))return!1;c=S(b);d=S(a)}return null===c&&null===d}return!1};function Ne(a,b){return b===je?null:a.Cb.get(b.toString())}h.toString=function(){return t(this.P(!0))};function P(a,b){if(null===a)return Q;var c=null;"object"===typeof a&&".priority"in a?c=a[".priority"]:"undefined"!==typeof b&&(c=b);v(null===c||"string"===typeof c||"number"===typeof c||"object"===typeof c&&".sv"in c,"Invalid priority type found: "+typeof c);"object"===typeof a&&".value"in a&&null!==a[".value"]&&(a=a[".value"]);if("object"!==typeof a||".sv"in a)return new he(a,P(c));if(a instanceof Array){var d=Q,e=a;u(e,function(a,b){if(Fc(e,b)&&"."!==b.substring(0,1)){var c=P(a);if(c.S()||!c.f())d=
        d.U(b,c)}});return d.ia(P(c))}var f=[],g=!1,k=a;Gc(k,function(a){if("string"!==typeof a||"."!==a.substring(0,1)){var b=P(k[a]);b.f()||(g=g||!b.H().f(),f.push(new O(a,b)))}});if(0==f.length)return Q;var l=qe(f,$d,function(a){return a.name},ae);if(g){var m=qe(f,de(R));return new T(l,P(c),new ne({".priority":m},{".priority":R}))}return new T(l,P(c),se)}var Re=Math.log(2);
    function Se(a){this.count=parseInt(Math.log(a+1)/Re,10);this.Te=this.count-1;this.Of=a+1&parseInt(Array(this.count+1).join("1"),2)}function Te(a){var b=!(a.Of&1<<a.Te);a.Te--;return b}
    function qe(a,b,c,d){function e(b,d){var f=d-b;if(0==f)return null;if(1==f){var g=a[b],k=c?c(g):g;return new Ce(k,g.node,ye,null,null)}var g=parseInt(f/2,10)+b,f=e(b,g),L=e(g+1,d),g=a[g],k=c?c(g):g;return new Ce(k,g.node,ye,f,L)}a.sort(b);var f=function(b){function d(b,d){var k=A-b,l=A;A-=b;var l=e(k+1,l),k=a[k],m=c?c(k):k,l=new Ce(m,k.node,d,null,l);f?f.left=l:g=l;f=l}for(var f=null,g=null,A=a.length,L=0;L<b.count;++L){var ca=Te(b),vc=Math.pow(2,b.count-(L+1));ca?d(vc,ye):(d(vc,ye),d(vc,De))}return g}(new Se(a.length));
        return null!==f?new we(d||b,f):new we(d||b)}function ue(a){return"number"===typeof a?"number:"+yb(a):"string:"+a}function te(a){if(a.S()){var b=a.P();v("string"===typeof b||"number"===typeof b||"object"===typeof b&&Fc(b,".sv"),"Priority must be a string or number.")}else v(a===fe||a.f(),"priority of unexpected type.");v(a===fe||a.H().f(),"Priority nodes can't have a priority of their own.")}var Q=new T(new we(ae),null,se);function Ue(){T.call(this,new we(ae),Q,se)}ma(Ue,T);h=Ue.prototype;
    h.yc=function(a){return a===this?0:1};h.fa=function(a){return a===this};h.H=function(){return this};h.R=function(){return Q};h.f=function(){return!1};var fe=new Ue,Qe=new O("[MIN_NAME]",Q),le=new O("[MAX_NAME]",fe);function U(a,b,c){this.I=a;this.Y=b;this.g=c}U.prototype.P=function(){E("Wilddog.DataSnapshot.val",0,0,arguments.length);return this.I.P()};U.prototype.val=U.prototype.P;U.prototype.Ye=function(){E("Wilddog.DataSnapshot.exportVal",0,0,arguments.length);return this.I.P(!0)};U.prototype.exportVal=U.prototype.Ye;U.prototype.ag=function(){E("Wilddog.DataSnapshot.exists",0,0,arguments.length);return!this.I.f()};U.prototype.exists=U.prototype.ag;
    U.prototype.w=function(a){E("Wilddog.DataSnapshot.child",0,1,arguments.length);fa(a)&&(a=String(a));Vd("Wilddog.DataSnapshot.child",a);var b=new H(a),c=this.Y.w(b);return new U(this.I.va(b),c,R)};U.prototype.child=U.prototype.w;U.prototype.Pa=function(a){E("Wilddog.DataSnapshot.hasChild",1,1,arguments.length);Vd("Wilddog.DataSnapshot.hasChild",a);var b=new H(a);return!this.I.va(b).f()};U.prototype.hasChild=U.prototype.Pa;
    U.prototype.H=function(){E("Wilddog.DataSnapshot.getPriority",0,0,arguments.length);return this.I.H().P()};U.prototype.getPriority=U.prototype.H;U.prototype.forEach=function(a){E("Wilddog.DataSnapshot.forEach",1,1,arguments.length);F("Wilddog.DataSnapshot.forEach",1,a,!1);if(this.I.S())return!1;var b=this;return!!this.I.X(this.g,function(c,d){return a(new U(d,b.Y.w(c),R))})};U.prototype.forEach=U.prototype.forEach;
    U.prototype.nd=function(){E("Wilddog.DataSnapshot.hasChildren",0,0,arguments.length);return this.I.S()?!1:!this.I.f()};U.prototype.hasChildren=U.prototype.nd;U.prototype.name=function(){x("Wilddog.DataSnapshot.name() being deprecated. Please use Wilddog.DataSnapshot.key() instead.");E("Wilddog.DataSnapshot.name",0,0,arguments.length);return this.key()};U.prototype.name=U.prototype.name;U.prototype.key=function(){E("Wilddog.DataSnapshot.key",0,0,arguments.length);return this.Y.key()};
    U.prototype.key=U.prototype.key;U.prototype.Fb=function(){E("Wilddog.DataSnapshot.numChildren",0,0,arguments.length);return this.I.Fb()};U.prototype.numChildren=U.prototype.Fb;U.prototype.pc=function(){E("Wilddog.DataSnapshot.ref",0,0,arguments.length);return this.Y};U.prototype.ref=U.prototype.pc;function Ve(){Bb.call(this,["online"]);if("undefined"!==typeof window&&"undefined"!==typeof window.addEventListener){this.mc=window.navigator?window.navigator.onLine:!0;var a=this;window.addEventListener("online",function(){a.mc||(a.mc=!0,a.Yd("online",!0))},!1);window.addEventListener("offline",function(){a.mc&&(a.mc=!1,a.Yd("online",!1))},!1)}}ma(Ve,Bb);Ve.prototype.ld=function(a){v("online"===a,"Unknown event type: "+a);return this.mc};ba(Ve);function We(){Bb.call(this,["visible"]);var a,b;"undefined"!==typeof document&&"undefined"!==typeof document.addEventListener&&("undefined"!==typeof document.hidden?(b="visibilitychange",a="hidden"):"undefined"!==typeof document.mozHidden?(b="mozvisibilitychange",a="mozHidden"):"undefined"!==typeof document.msHidden?(b="msvisibilitychange",a="msHidden"):"undefined"!==typeof document.webkitHidden&&(b="webkitvisibilitychange",a="webkitHidden"));this.tc=!0;if(b){var c=this;document.addEventListener(b,
        function(){var b=!document[a];b!==c.tc&&(c.tc=b,c.Yd("visible",b))},!1)}}ma(We,Bb);We.prototype.ld=function(a){v("visible"===a,"Unknown event type: "+a);return this.tc};ba(We);var Xe,Ye=null;"undefined"!=typeof require&&"undefined"!==typeof module&&module.exports?Ye=require("engine.io-client"):"undefined"!=typeof window?Ye=window.eio:"undefined"!=typeof global&&(Ye=global.eio);Xe=Ye;function Ze(a,b,c,d,e,f,g){this.id=a;this.o=pb("c:"+this.id+":");this.Xa=c;this.Cd=d;this.Rc=e;this.Ca=f;this.og=g;this.B=b;this.ca=0;this.o("Connection created");$e(this)}function $e(a){af(a,function(b){a.Ma=b;a.Ma.on("open",bf(a));a.Ma.on("error",cf(a))})}
    function bf(a){return function(){a.Ma.on("message",df(a));a.Ma.on("close",ef(a))}}
    function df(a){return function(b){if(null==b)throw Error("data is null");if(0!=b.charAt(0))if(2==b.charAt(0)){var c=null;try{c=JSON.parse(b.substr(1))}catch(d){throw d;}if("object"!=typeof c||2>c.length)throw Error("decodedData in wrong format");b=c[1];"wd"==c[0]?"c"==b.t?(c=b.d,"h"==c.t?ff(a,c.d):"r"==c.t?(c=c.d,a.o("Reset packet received.  New host: "+c),b=a.B.ka,b[b.indexOf(a.Xa)]=c,gf(a.B,b),a.close()):"s"==c.t&&(a.og(c.d),a.close())):"d"==b.t&&a.Cd(b.d):a.o("eventType not known")}else 1!=b.charAt(0)&&
    a.o("data format error")}}function ef(a){return function(){2!==a.ca&&(a.o("Closing realtime connection."),a.ca=2,a.Ca&&(a.Ca(this.Xa),a.Ca=null))}}function cf(a){return function(){a.close()}}
    function ff(a,b){var c=b.ts,d=b.v,e=b.h;a.sessionId=b.s;"1.0"!=d&&x("Protocol version mismatch detected");0==a.ca&&(e==a.Xa||a.B.Rd?(a.ca=1,a.o("realtime state connected"),hf(a.B,a.Xa),a.Rc&&(a.Rc(c,a.Xa),a.Rc=null)):(c=a.B.ka.indexOf(a.Xa),d=a.B.ka,0<=c&&(d[c]=e),gf(a.B,d),a.o("updateHost ",d.toString()),a.Ma.close(),a.Xa=e,af(a,function(b){a.Ma=b;a.Ma.on("open",bf(a));a.Ma.on("error",cf(a))})))}
    function af(a,b){var c=["polling","websocket"],d=(a.B.Nb?"https://":"http://")+a.Xa+"?v=1.0&cv="+CLIENT_VERSION,e=a.B;e.host!==e.ka&&(d=d+"&ns="+a.B.ye);a.sessionId&&(d=d+"&s="+a.sessionId);0<a.B.qb.length&&(d=d+"&fst="+encodeURIComponent(a.B.qb.join(",")));e=Tc.get("UUID");e||(e=a.je(),Tc.set("UUID",e));var f={path:"/.ws",rememberUpgrade:!0};"undefined"==typeof document&&(f.jsonp=!1);a.B.dh?f.transports=["websocket"]:null!=c&&(f.transports=c);c=Xe(d+"&did="+e,f);kb("new Socket_",typeof c);b(c)}
    Ze.prototype.jb=function(a){a="2"+JSON.stringify(["wd",{t:"d",d:a}]);kb("sendRequest by eio",a);this.Ma.send(a)};Ze.prototype.close=function(){2!==this.ca&&(this.o("Closing realtime connection."),this.ca=2,this.Ma&&this.Ma.close(),this.Ca&&(this.Ca(this.Xa),this.Ca=null))};Ze.prototype.je=function(){for(var a=0,b="";32>a;)b+="0123456789abcdefghijklmnopqrstuvwxyz"[Math.floor(36*Math.random())],a++;return b};function jf(a,b,c,d){this.id=kf++;this.o=pb("p:"+this.id+":");this.de=this.gf=this.ve=!1;this.ma={};this.wa=[];this.Tc=0;this.Pc=[];this.pa=!1;this.m={};this.sa=1E3;this.xd=3E5;this.Ib=b;this.Oc=c;this.Ce=d;this.B=a;this.He=null;this.Ld={};this.yg=0;this.Hc=this.Gc=null;this.$c=0;lf(this,0);We.$b().Gb("visible",this.tg,this);-1===a.host.indexOf("wd.local")&&Ve.$b().Gb("online",this.qg,this)}var kf=0,mf=0;h=jf.prototype;
    h.jb=function(a,b,c){var d=++this.yg;a={r:d,a:a,b:b};this.o(t(a));v(this.pa,"sendRequest call when we're not connected not allowed.");this.Qa.jb(a);c&&(this.Ld[d]=c)};h.hf=function(a,b,c,d){var e=nf(a),f=a.path.toString();this.o("Listen called for "+f+" "+e);this.ma[f]=this.ma[f]||{};v(!this.ma[f][e],"listen() called twice for same path/queryId.");a={O:d,od:b,query:a,tag:c};this.ma[f][e]=a;this.pa&&of(this,a)};
    function of(a,b){var c=b.query,d=c.path.toString(),e=nf(c);a.o("Listen on "+d+" for "+e);var f={p:d};b.tag&&(f.q=pf(c.D),f.t=b.tag);f.h=b.od();a.jb("q",f,function(f){var g=f.d,l=f.s,m=f.c;if(g&&"object"===typeof g&&Fc(g,"w")){var A=G(g,"w");ea(A)&&0<=Ba(A,"no_index")&&x("Using an unspecified index. Consider adding "+('".indexOn": "'+c.D.g.toString()+'"')+" at "+c.path.toString()+" to your security rules for better performance")}(a.ma[d]&&a.ma[d][e])===b&&(a.o("listen response",f),"ok"!==l&&qf(a,d,
        e),b.O&&b.O(l,g,m))})}h.ee=function(a,b,c){this.Na={Wf:a,Ze:!1,xb:b,bd:c};this.o("Authenticating using credential: "+a);rf(this);40==a.length&&(this.o("Admin auth credential detected.  Reducing max reconnect time."),this.xd=3E4)};h.Cf=function(a){delete this.Na;this.pa&&this.jb("unauth",{},function(b){a(b.s,b.d,b.c||null)})};
    function rf(a){var b=a.Na;a.pa&&b&&a.jb("auth",{cred:b.Wf},function(c){var d=c.s,e=c.d||"error";c=c.c||null;"ok"!==d&&a.Na===b&&delete a.Na;b.Ze?"ok"!==d&&b.bd&&b.bd(d,e,c):(b.Ze=!0,b.xb&&b.xb(d,e))})}h.Df=function(a,b){var c=a.path.toString(),d=nf(a);this.o("Unlisten called for "+c+" "+d);if(qf(this,c,d)&&this.pa){var e=pf(a.D);this.o("Unlisten on "+c+" for "+d);c={p:c};b&&(c.q=e,c.t=b);this.jb("n",c)}};h.Be=function(a,b,c){this.pa?sf(this,"o",a,b,c):this.Pc.push({Jb:a,action:"o",data:b,O:c})};
    h.mf=function(a,b,c){this.pa?sf(this,"om",a,b,c):this.Pc.push({Jb:a,action:"om",data:b,O:c})};h.Bd=function(a,b){this.pa?sf(this,"oc",a,null,b):this.Pc.push({Jb:a,action:"oc",data:null,O:b})};function sf(a,b,c,d,e){c={p:c,d:d};a.o("onDisconnect "+b,c);a.jb(b,c,function(a){e&&setTimeout(function(){e(a.s,a.d,a.c)},Math.floor(0))})}h.put=function(a,b,c,d){tf(this,"p",a,b,c,d)};h.kf=function(a,b,c,d){tf(this,"m",a,b,c,d)};
    function tf(a,b,c,d,e,f){d={p:c,d:d};p(f)&&(d.h=f);a.wa.push({action:b,request:d,O:e});a.Tc++;b=a.wa.length-1;a.pa?uf(a,b):a.o("Buffering put: "+c)}function uf(a,b){var c=a.wa[b].action,d=a.wa[b].request,e=a.wa[b].O;a.wa[b].vg=a.pa;a.jb(c,d,function(d){a.o(c+" response",d);delete a.wa[b];a.Tc--;0===a.Tc&&(a.wa=[]);e&&e(d.s,d.d,d.c)})}h.Fe=function(a){if(this.pa){a={c:a};this.o("reportStats",a);var b=this;this.jb("s",a,function(a){"ok"!==a.s&&b.o("reportStats","Error sending stats: "+a.d,"Code:"+a.c)})}};
    h.ng=function(a){if("r"in a){this.o("from server: "+t(a));var b=a.r,c=this.Ld[b];c&&(delete this.Ld[b],c(a.b))}else{if("error"in a)throw"A server-side error has occurred: "+a.error;"a"in a&&(b=a.a,c=a.b,this.o("handleServerMessage",b,c),"d"===b?this.Ib(c.p,c.d,!1,c.t):"m"===b?this.Ib(c.p,c.d,!0,c.t):"c"===b?vf(this,c.p,c.q):"ac"===b?(a=c.s,b=c.d,c=this.Na,delete this.Na,c&&c.bd&&c.bd(a,b)):"sd"===b?this.He?this.He(c):"msg"in c&&"undefined"!==typeof console&&console.log("WILDDOG: "+c.msg.replace("\n",
                "\nWILDDOG: ")):qb("Unrecognized action received from server: "+t(b)+"\nAre you using the latest client?"))}};
    h.Rc=function(a,b){if(!1===this.pa){this.o("connection ready");this.pa=!0;this.Qa=this.m[b].Ka;for(var c in this.m)this.m.hasOwnProperty(c)&&(clearTimeout(this.m[c].ze),delete this.m[c].ze);delete this.m[b];this.Hc=(new Date).getTime();this.Ce({serverTimeOffset:a-(new Date).getTime()});c=Tc.get("UUID");c||(c=this.je(),Tc.set("UUID",c));var d={};d["sdk.js."+CLIENT_VERSION.replace(/\./g,"-")]=1;d.did=c;dd()&&(d["framework.cordova"]=1);this.Fe(d);wf(this);this.Oc(!0)}else this.m[b].Ka.close(),delete this.m[b]};
    function lf(a,b,c){v(!a.Qa,"Scheduling a connect when we're already connected/ing?");xf(a,function(){var a=c||this.B.ka[0];this.m[a]=this.m[a]||{sa:1E3,$c:0};this.m[a].gb&&clearTimeout(this.m[a].gb);var e=this;this.m[a].gb=setTimeout(function(){e.m[a]&&e.m[a].gb&&(e.m[a].gb=null,yf(e,a))},Math.floor(b))}.bind(a))}
    h.tg=function(a){if(a&&!this.tc&&this.sa===this.xd){this.o("Window became visible.  Reducing delay.");this.sa=1E3;var b=!1,c;for(c in this.m)this.m.hasOwnProperty(c)&&c.Ka&&(b=!0,c.sa=1E3);this.Qa||b||lf(this,0)}this.tc=a};
    h.qg=function(a){if(a){this.o("Browser went online.");this.sa=1E3;a=!1;for(var b in this.m)this.m.hasOwnProperty(b)&&b.Ka&&(a=!0,b.sa=1E3);this.Qa||a||this.de||lf(this,0)}else for(b in this.o("Browser went offline.  Killing connection."),this.Qa&&this.Qa.close(),this.m)this.m.hasOwnProperty(b)&&b.Ka&&b.Ka.close()};
    h.rg=function(a){this.o("data client disconnected");if(this.pa&&this.Qa.Xa!=a||-1==this.B.ka.indexOf(a))delete this.m[a];else{this.pa=!1;this.Qa=null;for(var b=0;b<this.wa.length;b++){var c=this.wa[b];c&&"h"in c.request&&c.vg&&(c.O&&c.O("disconnect"),delete this.wa[b],this.Tc--)}0===this.Tc&&(this.wa=[]);this.Ld={};if(zf(this)){if(!this.B.Rd){this.m[a]=this.m[a]||{sa:1E3,$c:0};this.m[a].$c++;var b=!0,d;for(d in this.m)this.m.hasOwnProperty(d)&&5>this.m[d].$c&&(b=!1);c=this.B;!md.Qd&&null!=a&&0>c.qb.indexOf(a)&&
    a!=c.host&&(c.qb.push(a),w.set("failHosts",JSON.stringify(c.qb)));if(b&&Object.getOwnPropertyNames(this.m).length==this.B.ka.length&&!this.B.Rd){this.o("error while connecting",a);gf(this.B,[]);for(d in this.m)this.m.hasOwnProperty(d)&&this.m[d].gb&&clearTimeout(this.m[d].gb);this.m={};lf(this,0);return}}this.tc?this.Hc&&(3E4<(new Date).getTime()-this.Hc&&(this.m[a].sa=1E3),this.Hc=null):(this.o("Window isn't visible.  Delaying reconnect."),this.m[a].sa=this.xd,this.m[a].Gc=(new Date).getTime());
        d=Math.max(0,this.m[a].sa-((new Date).getTime()-this.Gc));d*=Math.random();this.o("Trying to reconnect in "+d+"ms");lf(this,d,a)}this.Oc(!1)}};function yf(a,b){a.o("Making a connection attempt");a.Gc=(new Date).getTime();a.Hc=null;var c=r(a.ng,a),d=r(a.Rc,a),e=r(a.rg,a),f=a.id+":"+mf++;a.m[b].Ka=new Ze(f,a.B,b,c,d,e,function(b){x(b+" ("+a.B.toString()+")");a.gf=!0});var g=a.B.ka[a.B.ka.indexOf(b)+1];g&&(a.m[b].ze=a.m[b].ze||setTimeout(function(){zf(a)&&lf(a,0,g)},1E4))}
    h.Dc=function(){this.ve=!0;if(this.Qa)this.Qa.close();else for(var a in this.m)this.m.hasOwnProperty(a)&&(a.Ka?a.Ka.close():a.gb&&(clearTimeout(a.gb),a.gb=null))};h.resume=function(){this.ve=!1;this.sa=1E3;var a=!1,b;for(b in this.m)this.m.hasOwnProperty(b)&&b.Ka&&(a=!0,b.sa=1E3);this.Qa||a||lf(this,0)};function vf(a,b,c){c=c?Ea(c,function(a){return wb(a)}).join("$"):"default";(a=qf(a,b,c))&&a.O&&a.O("permission_denied")}
    function qf(a,b,c){b=(new H(b)).toString();var d;p(a.ma[b])?(d=a.ma[b][c],delete a.ma[b][c],0===Ra(a.ma[b])&&delete a.ma[b]):d=void 0;return d}function wf(a){rf(a);u(a.ma,function(b){u(b,function(b){of(a,b)})});for(var b=0;b<a.wa.length;b++)a.wa[b]&&uf(a,b);for(;a.Pc.length;)b=a.Pc.shift(),sf(a,b.action,b.Jb,b.data,b.O)}function zf(a){var b;b=Ve.$b().mc;return!a.gf&&!a.ve&&b}h.je=function(){for(var a=0,b="";32>a;)b+="0123456789abcdefghijklmnopqrstuvwxyz"[Math.floor(36*Math.random())],a++;return b};
    function xf(a,b){if(0!=a.B.ka.length&&a.B.ka)b(a.B.ka);else{a.Gc=(new Date).getTime();var c=ld(["XHR","JSONP","NodeHttp","WxHttp"]),c=Da(c,function(a){return"function"===typeof a.isAvailable&&a.isAvailable()});if(0===c.length)setTimeout(function(){a.close()},0);else{var c=new (c.shift())({method:"GET"}),d=("undefined"==typeof document?"http":"https")+"://ns.wilddog.com/v1/lookup?appId="+a.B.ye;a.de=!0;c.open(d,null,function(c,d){a.de=!1;if(d&&(d.errcode||d.message))throw c=Error(d.message||"Unknown error!"),
        c.code=d.errcode,c;if(c||!d.nssList){var e=Math.max(0,a.sa-((new Date).getTime()-a.Gc)),e=Math.random()*e;a.o("Trying to nslookup in "+e+"ms");setTimeout(function(){lf(a,0)},e);a.sa=Math.min(a.xd,1.3*a.sa)}else gf(a.B,d.nssList),b(d.nssList)})}}};function Af(a,b){this.o=pb("p:rest:");this.B=a;this.Ib=b;this.Na=null;this.ma={}}function Bf(a,b){if(p(b))return"tag$"+b;var c=a.D;v(Cf(c)&&c.g==R,"should have a tag if it's not a default query.");return a.path.toString()}h=Af.prototype;
    h.hf=function(a,b,c,d){var e=a.path.toString();this.o("Listen called for "+e+" "+nf(a));var f=Bf(a,c),g={};this.ma[f]=g;a=Df(a.D);var k=this;Ef(this,e+".json",a,function(a,b){var l=b;404===a&&(a=l=null);null===a&&k.Ib(e,l,!1,c);G(k.ma,f)===g&&d(a?401==a?"permission_denied":"rest_error:"+a:"ok",null)})};h.Df=function(a,b){var c=Bf(a,b);delete this.ma[c]};h.ee=function(a,b){this.Na=a;var c=Ic(a),d=c.data,c=c.he&&c.he.exp;b&&b("ok",{auth:d,expires:c})};h.Cf=function(a){this.Na=null;a("ok",null)};
    h.Be=function(){};h.mf=function(){};h.Bd=function(){};h.put=function(){};h.kf=function(){};h.Fe=function(){};
    function Ef(a,b,c,d){c=c||{};c.format="export";a.Na&&(c.auth=a.Na);var e=(a.B.Nb?"https://":"http://")+a.B.host+b+"?"+Vc(c);a.o("Sending REST request for "+e);var f=new XMLHttpRequest;f.onreadystatechange=function(){if(d&&4===f.readyState){a.o("REST Response for "+e+" received. status:",f.status,"response:",f.responseText);var b=null;if(200<=f.status&&300>f.status){try{b=va(f.responseText)}catch(k){x("Failed to parse JSON response for "+e+": "+f.responseText)}d(null,b)}else 401!==f.status&&404!==
    f.status&&x("Got unsuccessful REST response for "+e+" Status: "+f.status),d(f.status);d=null}};f.open("GET",e,!0);f.send()};function Ff(){this.Nd=Q}Ff.prototype.j=function(a){return this.Nd.va(a)};Ff.prototype.toString=function(){return this.Nd.toString()};function Gf(){this.set={}}h=Gf.prototype;h.add=function(a,b){this.set[a]=null!==b?b:!0};h.contains=function(a){return Fc(this.set,a)};h.get=function(a){return this.contains(a)?this.set[a]:void 0};h.remove=function(a){delete this.set[a]};h.clear=function(){this.set={}};h.f=function(){return Za(this.set)};h.count=function(){return Ra(this.set)};function Hf(a,b){u(a.set,function(a,d){b(d,a)})}h.keys=function(){var a=[];u(this.set,function(b,c){a.push(c)});return a};function If(){this.A=this.J=null}If.prototype.find=function(a){if(null!=this.J)return this.J.va(a);if(a.f()||null==this.A)return null;var b=J(a);a=K(a);return this.A.contains(b)?this.A.get(b).find(a):null};function Jf(a,b,c){if(b.f())a.J=c,a.A=null;else if(null!==a.J)a.J=a.J.L(b,c);else{null==a.A&&(a.A=new Gf);var d=J(b);a.A.contains(d)||a.A.add(d,new If);a=a.A.get(d);b=K(b);Jf(a,b,c)}}
    function Kf(a,b){if(b.f())return a.J=null,a.A=null,!0;if(null!==a.J){if(a.J.S())return!1;var c=a.J;a.J=null;c.X(R,function(b,c){Jf(a,new H(b),c)});return Kf(a,b)}return null!==a.A?(c=J(b),b=K(b),a.A.contains(c)&&Kf(a.A.get(c),b)&&a.A.remove(c),a.A.f()?(a.A=null,!0):!1):!0}function Lf(a,b,c){null!==a.J?c(b,a.J):a.X(function(a,e){var d=new H(b.toString()+"/"+a);Lf(e,d,c)})}If.prototype.X=function(a){null!==this.A&&Hf(this.A,function(b,c){a(b,c)})};function Mf(a,b){this.type=Nf;this.source=Of;this.path=a;this.Ge=b}Mf.prototype.Sc=function(){return this.path.f()?this:new Mf(K(this.path),this.Ge)};Mf.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" ack write revert="+this.Ge+")"};function Pf(a,b,c){this.type=Qf;this.source=a;this.path=b;this.children=c}Pf.prototype.Sc=function(a){if(this.path.f())return a=this.children.subtree(new H(a)),a.f()?null:a.value?new Rf(this.source,M,a.value):new Pf(this.source,M,a);v(J(this.path)===a,"Can't get a merge for a child not on the path of the operation");return new Pf(this.source,K(this.path),this.children)};Pf.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"};function Rf(a,b,c){this.type=Sf;this.source=a;this.path=b;this.Ra=c}Rf.prototype.Sc=function(a){return this.path.f()?new Rf(this.source,M,this.Ra.R(a)):new Rf(this.source,K(this.path),this.Ra)};Rf.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" overwrite: "+this.Ra.toString()+")"};function Tf(a,b){this.type=Uf;this.source=a;this.path=b}Tf.prototype.Sc=function(){return this.path.f()?new Tf(this.source,M):new Tf(this.source,K(this.path))};Tf.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" listen_complete)"};var Sf=0,Qf=1,Nf=2,Uf=3;function Vf(a,b,c,d){this.oe=a;this.$e=b;this.Lb=c;this.Me=d;v(!d||b,"Tagged queries must be from server.")}var Of=new Vf(!0,!1,null,!1),Wf=new Vf(!1,!0,null,!1);Vf.prototype.toString=function(){return this.oe?"user":this.Me?"server(queryID="+this.Lb+")":"server"};function Xf(a,b){this.value=a;this.children=b||Yf}var Yf=new we(function(a,b){return a===b?0:a<b?-1:1});function Zf(a){var b=$f;u(a,function(a,d){b=b.set(new H(d),a)});return b}h=Xf.prototype;h.f=function(){return null===this.value&&this.children.f()};function ag(a,b,c){if(null!=a.value&&c(a.value))return{path:M,value:a.value};if(b.f())return null;var d=J(b);a=a.children.get(d);return null!==a?(b=ag(a,K(b),c),null!=b?{path:(new H(d)).w(b.path),value:b.value}:null):null}
    function bg(a,b){return ag(a,b,function(){return!0})}h.subtree=function(a){if(a.f())return this;var b=this.children.get(J(a));return null!==b?b.subtree(K(a)):$f};h.set=function(a,b){if(a.f())return new Xf(b,this.children);var c=J(a),d=(this.children.get(c)||$f).set(K(a),b),c=this.children.Wa(c,d);return new Xf(this.value,c)};
    h.remove=function(a){if(a.f())return this.children.f()?$f:new Xf(null,this.children);var b=J(a),c=this.children.get(b);return c?(a=c.remove(K(a)),b=a.f()?this.children.remove(b):this.children.Wa(b,a),null===this.value&&b.f()?$f:new Xf(this.value,b)):this};h.get=function(a){if(a.f())return this.value;var b=this.children.get(J(a));return b?b.get(K(a)):null};
    function cg(a,b,c){if(b.f())return c;var d=J(b);b=cg(a.children.get(d)||$f,K(b),c);d=b.f()?a.children.remove(d):a.children.Wa(d,b);return new Xf(a.value,d)}function dg(a,b){return eg(a,M,b)}function eg(a,b,c){var d={};a.children.qa(function(a,f){d[a]=eg(f,b.w(a),c)});return c(b,a.value,d)}function fg(a,b,c){return gg(a,b,M,c)}function gg(a,b,c,d){var e=a.value?d(c,a.value):!1;if(e)return e;if(b.f())return null;e=J(b);return(a=a.children.get(e))?gg(a,K(b),c.w(e),d):null}
    function hg(a,b,c){if(!b.f()){var d=!0;a.value&&(d=c(M,a.value));!0===d&&(d=J(b),(a=a.children.get(d))&&ig(a,K(b),M.w(d),c))}}function ig(a,b,c,d){if(b.f())return a;a.value&&d(c,a.value);var e=J(b);return(a=a.children.get(e))?ig(a,K(b),c.w(e),d):$f}function jg(a,b){kg(a,M,b)}function kg(a,b,c){a.children.qa(function(a,e){kg(e,b.w(a),c)});a.value&&c(b,a.value)}function lg(a,b){a.children.qa(function(a,d){d.value&&b(a,d.value)})}var $f=new Xf(null);
    Xf.prototype.toString=function(){var a={};jg(this,function(b,c){a[b.toString()]=c.toString()});return t(a)};function mg(a,b,c){this.I=a;this.N=b;this.Xb=c}function ng(a,b){return a.N&&!a.Xb||a.I.Pa(b)}mg.prototype.j=function(){return this.I};function og(a,b){this.K=a;this.Od=b}function pg(a,b,c,d){return new og(new mg(b,c,d),a.Od)}function qg(a){return a.K.N?a.K.j():null}og.prototype.F=function(){return this.Od};function rg(a){return a.Od.N?a.Od.j():null};function V(a,b,c,d){this.type=a;this.Sa=b;this.fb=c;this.Ae=d;this.Id=void 0};function sg(a,b,c,d){this.ke=b;this.Pd=c;this.Id=d;this.jd=a}sg.prototype.cc=function(){var a=this.Pd.pc();return"value"===this.jd?a.path:a.parent().path};sg.prototype.qe=function(){return this.jd};sg.prototype.Yb=function(){return this.ke.Yb(this)};sg.prototype.toString=function(){return this.cc().toString()+":"+this.jd+":"+t(this.Pd.Ye())};function tg(a,b,c){this.ke=a;this.error=b;this.path=c}tg.prototype.cc=function(){return this.path};tg.prototype.qe=function(){return"cancel"};
    tg.prototype.Yb=function(){return this.ke.Yb(this)};tg.prototype.toString=function(){return this.path.toString()+":cancel"};function ug(a,b,c){this.Vb=a;this.yb=b;this.zb=c||null}h=ug.prototype;h.wf=function(a){return"value"===a};h.createEvent=function(a,b){var c=b.D.g;return new sg("value",this,new U(a.Sa,b.pc(),c))};h.Yb=function(a){var b=this.zb;if("cancel"===a.qe()){v(this.yb,"Raising a cancel event on a listener with no cancel callback");var c=this.yb;return function(){c.call(b,a.error)}}var d=this.Vb;return function(){d.call(b,a.Pd)}};h.Se=function(a,b){return this.yb?new tg(this,a,b):null};
    h.matches=function(a){return a instanceof ug?a.Vb&&this.Vb?a.Vb===this.Vb&&a.zb===this.zb:!0:!1};h.df=function(){return null!==this.Vb};function vg(a,b,c){this.oa=a;this.yb=b;this.zb=c}h=vg.prototype;h.wf=function(a){a="children_added"===a?"child_added":a;return Va(this.oa,"children_removed"===a?"child_removed":a)};h.Se=function(a,b){return this.yb?new tg(this,a,b):null};
    h.createEvent=function(a,b){v(null!=a.fb,"Child events should have a childName.");var c=b.pc().w(a.fb);return new sg(a.type,this,new U(a.Sa,c,b.D.g),a.Id)};h.Yb=function(a){var b=this.zb;if("cancel"===a.qe()){v(this.yb,"Raising a cancel event on a listener with no cancel callback");var c=this.yb;return function(){c.call(b,a.error)}}var d=this.oa[a.jd];return function(){d.call(b,a.Pd,a.Id)}};
    h.matches=function(a){if(a instanceof vg){if(!this.oa||!a.oa)return!0;if(this.zb===a.zb){var b=Ra(a.oa);if(b===Ra(this.oa)){if(1===b){var b=Sa(a.oa),c=Sa(this.oa);return c===b&&(!a.oa[b]||!this.oa[c]||a.oa[b]===this.oa[c])}return Qa(this.oa,function(b,c){return a.oa[c]===b})}}}return!1};h.df=function(){return null!==this.oa};function wg(a){this.Y=a;this.g=a.D.g}function xg(a,b,c,d){var e=[],f=[];Ca(b,function(b){"child_changed"===b.type&&a.g.rd(b.Ae,b.Sa)&&f.push(new V("child_moved",b.Sa,b.fb))});yg(a,e,"child_removed",b,d,c);yg(a,e,"child_added",b,d,c);yg(a,e,"child_moved",f,d,c);yg(a,e,"child_changed",b,d,c);yg(a,e,"value",b,d,c);return e}function yg(a,b,c,d,e,f){d=Da(d,function(a){return a.type===c});Ka(d,r(a.Rf,a));Ca(d,function(c){var d=zg(a,c,f);Ca(e,function(e){e.wf(c.type)&&b.push(e.createEvent(d,a.Y))})})}
    function zg(a,b,c){"value"!==b.type&&"child_removed"!==b.type&&(b.Id=c.bf(b.fb,b.Sa,a.g));return b}wg.prototype.Rf=function(a,b){if(null==a.fb||null==b.fb)throw ib("Should only compare child_ events.");return this.g.compare(new O(a.fb,a.Sa),new O(b.fb,b.Sa))};function Ag(){}Ag.prototype.af=function(){return null};Ag.prototype.pe=function(){return null};var Bg=new Ag;function Cg(a,b,c){this.Ef=a;this.Ta=b;this.Ed=c}Cg.prototype.af=function(a){var b=this.Ta.K;if(ng(b,a))return b.j().R(a);b=null!=this.Ed?new mg(this.Ed,!0,!1):this.Ta.F();return this.Ef.eb(a,b)};Cg.prototype.pe=function(a,b,c){var d=null!=this.Ed?this.Ed:rg(this.Ta);a=this.Ef.ge(d,b,1,c,a);return 0===a.length?null:a[0]};function Dg(a,b){this.$d=a;this.Pf=b}function Eg(a){this.M=a}
    Eg.prototype.lb=function(a,b,c,d){var e=new Fg,f;if(b.type===Sf)b.source.oe?c=Gg(this,a,b.path,b.Ra,c,d,e):(v(b.source.$e,"Unknown source."),f=b.source.Me,c=Hg(this,a,b.path,b.Ra,c,d,f,e));else if(b.type===Qf)b.source.oe?c=Ig(this,a,b.path,b.children,c,d,e):(v(b.source.$e,"Unknown source."),f=b.source.Me,c=Jg(this,a,b.path,b.children,c,d,f,e));else if(b.type===Nf)if(b.Ge)if(f=b.path,null!=c.rc(f))c=a;else{b=new Cg(c,a,d);d=a.K.j();if(f.f()||".priority"===J(f))a.F().N?b=c.Ba(rg(a)):(b=a.F().j(),v(b instanceof
        T,"serverChildren would be complete if leaf node"),b=c.xc(b)),b=this.M.Aa(d,b,e);else{f=J(f);var g=c.eb(f,a.F());null==g&&ng(a.F(),f)&&(g=d.R(f));b=null!=g?this.M.L(d,f,g,b,e):a.K.j().Pa(f)?this.M.L(d,f,Q,b,e):d;b.f()&&a.F().N&&(d=c.Ba(rg(a)),d.S()&&(b=this.M.Aa(b,d,e)))}d=a.F().N||null!=c.rc(M);c=pg(a,b,d,this.M.Oa())}else c=Kg(this,a,b.path,c,d,e);else if(b.type===Uf)d=b.path,b=a.F(),f=b.j(),g=b.N||d.f(),c=Lg(this,new og(a.K,new mg(f,g,b.Xb)),d,c,Bg,e);else throw ib("Unknown operation type: "+b.type);
        e=Ta(e.pb);d=c;b=d.K;b.N&&(f=b.j().S()||b.j().f(),g=qg(a),(0<e.length||!a.K.N||f&&!b.j().fa(g)||!b.j().H().fa(g.H()))&&e.push(new V("value",qg(d))));return new Dg(c,e)};
    function Lg(a,b,c,d,e,f){var g=b.K;if(null!=d.rc(c))return b;var k;if(c.f())v(b.F().N,"If change path is empty, we must have complete server data"),b.F().Xb?(e=rg(b),d=d.xc(e instanceof T?e:Q)):d=d.Ba(rg(b)),f=a.M.Aa(b.K.j(),d,f);else{var l=J(c);if(".priority"==l)v(1==Ed(c),"Can't have a priority with additional path components"),f=g.j(),k=b.F().j(),d=d.ad(c,f,k),f=null!=d?a.M.ia(f,d):g.j();else{var m=K(c);ng(g,l)?(k=b.F().j(),d=d.ad(c,g.j(),k),d=null!=d?g.j().R(l).L(m,d):g.j().R(l)):d=d.eb(l,b.F());
        f=null!=d?a.M.L(g.j(),l,d,e,f):g.j()}}return pg(b,f,g.N||c.f(),a.M.Oa())}function Hg(a,b,c,d,e,f,g,k){var l=b.F();g=g?a.M:a.M.Zb();if(c.f())d=g.Aa(l.j(),d,null);else if(g.Oa()&&!l.Xb)d=l.j().L(c,d),d=g.Aa(l.j(),d,null);else{var m=J(c);if((c.f()?!l.N||l.Xb:!ng(l,J(c)))&&1<Ed(c))return b;d=l.j().R(m).L(K(c),d);d=".priority"==m?g.ia(l.j(),d):g.L(l.j(),m,d,Bg,null)}l=l.N||c.f();b=new og(b.K,new mg(d,l,g.Oa()));return Lg(a,b,c,e,new Cg(e,b,f),k)}
    function Gg(a,b,c,d,e,f,g){var k=b.K;e=new Cg(e,b,f);if(c.f())g=a.M.Aa(b.K.j(),d,g),a=pg(b,g,!0,a.M.Oa());else if(f=J(c),".priority"===f)g=a.M.ia(b.K.j(),d),a=pg(b,g,k.N,k.Xb);else{var l=K(c);c=k.j().R(f);if(!l.f()){var m=e.af(f);d=null!=m?".priority"===Fd(l)&&m.va(l.parent()).f()?m:m.L(l,d):Q}c.fa(d)?a=b:(g=a.M.L(k.j(),f,d,e,g),a=pg(b,g,k.N,a.M.Oa()))}return a}
    function Ig(a,b,c,d,e,f,g){var k=b;jg(d,function(d,m){var l=c.w(d);ng(b.K,J(l))&&(k=Gg(a,k,l,m,e,f,g))});jg(d,function(d,m){var l=c.w(d);ng(b.K,J(l))||(k=Gg(a,k,l,m,e,f,g))});return k}function Mg(a,b){jg(b,function(b,d){a=a.L(b,d)});return a}
    function Jg(a,b,c,d,e,f,g,k){if(b.F().j().f()&&!b.F().N)return b;var l=b;c=c.f()?d:cg($f,c,d);var m=b.F().j();c.children.qa(function(c,d){if(m.Pa(c)){var A=b.F().j().R(c),A=Mg(A,d);l=Hg(a,l,new H(c),A,e,f,g,k)}});c.children.qa(function(c,d){var A=!b.F().N&&null==d.value;m.Pa(c)||A||(A=b.F().j().R(c),A=Mg(A,d),l=Hg(a,l,new H(c),A,e,f,g,k))});return l}
    function Kg(a,b,c,d,e,f){if(null!=d.rc(c))return b;var g=new Cg(d,b,e),k=e=b.K.j();if(b.F().N){if(c.f())e=d.Ba(rg(b)),k=a.M.Aa(b.K.j(),e,f);else if(".priority"===J(c)){var l=d.eb(J(c),b.F());null==l||e.f()||e.H().fa(l)||(k=a.M.ia(e,l))}else l=J(c),e=d.eb(l,b.F()),null!=e&&(k=a.M.L(b.K.j(),l,e,g,f));e=!0}else if(b.K.N||c.f())k=e,e=b.K.j(),e.S()||e.X(R,function(c){var e=d.eb(c,b.F());null!=e&&(k=a.M.L(k,c,e,g,f))}),e=b.K.N;else{l=J(c);if(1==Ed(c)||ng(b.K,l))c=d.eb(l,b.F()),null!=c&&(k=a.M.L(e,l,c,g,
        f));e=!1}return pg(b,k,e,a.M.Oa())};function Ng(a,b){this.Y=a;var c=a.D,d=new Og(c.g),c=Cf(c)?new Og(c.g):c.ra?new Pg(c):new Qg(c);this.sf=new Eg(c);var e=b.F(),f=b.K,g=d.Aa(Q,e.j(),null),k=c.Aa(Q,f.j(),null);this.Ta=new og(new mg(k,f.N,c.Oa()),new mg(g,e.N,d.Oa()));this.hb=[];this.Yf=new wg(a)}h=Ng.prototype;h.F=function(){return this.Ta.F().j()};h.rb=function(a){var b=rg(this.Ta);return b&&(Cf(this.Y.D)||!a.f()&&!b.R(J(a)).f())?b.va(a):null};h.f=function(){return 0===this.hb.length};h.Rb=function(a){this.hb.push(a)};
    h.tb=function(a,b){var c=[];if(b){v(null==a,"A cancel should cancel all event registrations.");var d=this.Y.path;Ca(this.hb,function(a){(a=a.Se(b,d))&&c.push(a)})}if(a){for(var e=[],f=0;f<this.hb.length;++f){var g=this.hb[f];if(!g.matches(a))e.push(g);else if(a.df()){e=e.concat(this.hb.slice(f+1));break}}this.hb=e}else this.hb=[];return c};
    h.lb=function(a,b,c){a.type===Qf&&null!==a.source.Lb&&(v(rg(this.Ta),"We should always have a full cache before handling merges"),v(qg(this.Ta),"Missing event cache, even though we have a server cache"));var d=this.Ta;a=this.sf.lb(d,a,b,c);b=this.sf;c=a.$d;v(c.K.j().Fc(b.M.g),"Event snap not indexed");v(c.F().j().Fc(b.M.g),"Server snap not indexed");v(a.$d.F().N||!d.F().N,"Once a server snap is complete, it should never go back");this.Ta=a.$d;return Rg(this,a.Pf,a.$d.K.j(),null)};
    function Sg(a,b){var c=a.Ta.K,d=[];c.j().S()||c.j().X(R,function(a,b){d.push(new V("child_added",b,a))});c.N&&d.push(new V("value",c.j()));return Rg(a,d,c.j(),b)}function Rg(a,b,c,d){return xg(a.Yf,b,c,d?[d]:a.hb)};function Tg(){this.Fa={}}h=Tg.prototype;h.f=function(){return Za(this.Fa)};h.lb=function(a,b,c){var d=a.source.Lb;if(null!==d)return d=G(this.Fa,d),v(null!=d,"SyncTree gave us an op for an invalid query."),d.lb(a,b,c);var e=[];u(this.Fa,function(d){e=e.concat(d.lb(a,b,c))});return e};h.Rb=function(a,b,c,d,e){var f=nf(a),g=G(this.Fa,f);g||((g=c.Ba(e?d:null))?c=!0:(g=d instanceof T?c.xc(d):Q,c=!1),g=new Ng(a,new og(new mg(g,c,!1),new mg(d,e,!1))),this.Fa[f]=g);g.Rb(b);return Sg(g,b)};
    h.tb=function(a,b,c){var d=nf(a),e=[],f=[],g=null!=Ug(this);if("default"===d){var k=this;u(this.Fa,function(a,d){f=f.concat(a.tb(b,c));a.f()&&(delete k.Fa[d],Cf(a.Y.D)||e.push(a.Y))})}else{var l=G(this.Fa,d);l&&(f=f.concat(l.tb(b,c)),l.f()&&(delete this.Fa[d],Cf(l.Y.D)||e.push(l.Y)))}g&&null==Ug(this)&&e.push(new W(a.G.ea,a.G,a.path));return{xg:e,Zf:f}};function Vg(a){return Da(Ta(a.Fa),function(a){return!Cf(a.Y.D)})}h.rb=function(a){var b=null;u(this.Fa,function(c){b=b||c.rb(a)});return b};
    function Wg(a,b){if(Cf(b.D))return Ug(a);var c=nf(b);return G(a.Fa,c)}function Ug(a){return Ya(a.Fa,function(a){return Cf(a.Y.D)})||null};function Xg(a){this.$=a}var Yg=new Xg(new Xf(null));function Zg(a,b,c){if(b.f())return new Xg(new Xf(c));var d=bg(a.$,b);if(null!=d){var e=d.path,d=d.value;b=I(e,b);d=d.L(b,c);return new Xg(a.$.set(e,d))}a=cg(a.$,b,new Xf(c));return new Xg(a)}function $g(a,b,c){var d=a;Gc(c,function(a,c){d=Zg(d,b.w(a),c)});return d}Xg.prototype.Jd=function(a){if(a.f())return Yg;a=cg(this.$,a,$f);return new Xg(a)};function ah(a,b){var c=bg(a.$,b);return null!=c?a.$.get(c.path).va(I(c.path,b)):null}
    function bh(a){var b=[],c=a.$.value;null!=c?c.S()||c.X(R,function(a,c){b.push(new O(a,c))}):a.$.children.qa(function(a,c){null!=c.value&&b.push(new O(a,c.value))});return b}function ch(a,b){if(b.f())return a;var c=ah(a,b);return null!=c?new Xg(new Xf(c)):new Xg(a.$.subtree(b))}Xg.prototype.f=function(){return this.$.f()};Xg.prototype.apply=function(a){return dh(M,this.$,a)};
    function dh(a,b,c){if(null!=b.value)return c.L(a,b.value);var d=null;b.children.qa(function(b,f){".priority"===b?(v(null!==f.value,"Priority writes must always be leaf nodes"),d=f.value):c=dh(a.w(b),f,c)});c.va(a).f()||null===d||(c=c.L(a.w(".priority"),d));return c};function eh(){this.W=Yg;this.Ga=[];this.Ic=-1}h=eh.prototype;
    h.Jd=function(a){var b=Ia(this.Ga,function(b){return b.be===a});v(0<=b,"removeWrite called with nonexistent writeId.");var c=this.Ga[b];this.Ga.splice(b,1);for(var d=c.visible,e=!1,f=this.Ga.length-1;d&&0<=f;){var g=this.Ga[f];g.visible&&(f>=b&&fh(g,c.path)?d=!1:c.path.contains(g.path)&&(e=!0));f--}if(d){if(e)this.W=gh(this.Ga,hh,M),this.Ic=0<this.Ga.length?this.Ga[this.Ga.length-1].be:-1;else if(c.Ra)this.W=this.W.Jd(c.path);else{var k=this;u(c.children,function(a,b){k.W=k.W.Jd(c.path.w(b))})}return c.path}return null};
    h.Ba=function(a,b,c,d){if(c||d){var e=ch(this.W,a);return!d&&e.f()?b:d||null!=b||null!=ah(e,M)?(e=gh(this.Ga,function(b){return(b.visible||d)&&(!c||!(0<=Ba(c,b.be)))&&(b.path.contains(a)||a.contains(b.path))},a),b=b||Q,e.apply(b)):null}e=ah(this.W,a);if(null!=e)return e;e=ch(this.W,a);return e.f()?b:null!=b||null!=ah(e,M)?(b=b||Q,e.apply(b)):null};
    h.xc=function(a,b){var c=Q,d=ah(this.W,a);if(d)d.S()||d.X(R,function(a,b){c=c.U(a,b)});else if(b){var e=ch(this.W,a);b.X(R,function(a,b){var d=ch(e,new H(a)).apply(b);c=c.U(a,d)});Ca(bh(e),function(a){c=c.U(a.name,a.node)})}else e=ch(this.W,a),Ca(bh(e),function(a){c=c.U(a.name,a.node)});return c};h.ad=function(a,b,c,d){v(c||d,"Either existingEventSnap or existingServerSnap must exist");a=a.w(b);if(null!=ah(this.W,a))return null;a=ch(this.W,a);return a.f()?d.va(b):a.apply(d.va(b))};
    h.eb=function(a,b,c){a=a.w(b);var d=ah(this.W,a);return null!=d?d:ng(c,b)?ch(this.W,a).apply(c.j().R(b)):null};h.rc=function(a){return ah(this.W,a)};h.ge=function(a,b,c,d,e,f){var g;a=ch(this.W,a);g=ah(a,M);if(null==g)if(null!=b)g=a.apply(b);else return[];g=g.vb(f);if(g.f()||g.S())return[];b=[];a=de(f);e=e?g.dc(c,f):g.bc(c,f);for(f=S(e);f&&b.length<d;)0!==a(f,c)&&b.push(f),f=S(e);return b};
    function fh(a,b){return a.Ra?a.path.contains(b):!!Xa(a.children,function(c,d){return a.path.w(d).contains(b)})}function hh(a){return a.visible}
    function gh(a,b,c){for(var d=Yg,e=0;e<a.length;++e){var f=a[e];if(b(f)){var g=f.path;if(f.Ra)c.contains(g)?(g=I(c,g),d=Zg(d,g,f.Ra)):g.contains(c)&&(g=I(g,c),d=Zg(d,M,f.Ra.va(g)));else if(f.children)if(c.contains(g))g=I(c,g),d=$g(d,g,f.children);else{if(g.contains(c))if(g=I(g,c),g.f())d=$g(d,M,f.children);else if(f=G(f.children,J(g)))f=f.va(K(g)),d=Zg(d,M,f)}else throw ib("WriteRecord should have .snap or .children");}}return d}function ih(a,b){this.Pb=a;this.$=b}h=ih.prototype;
    h.Ba=function(a,b,c){return this.$.Ba(this.Pb,a,b,c)};h.xc=function(a){return this.$.xc(this.Pb,a)};h.ad=function(a,b,c){return this.$.ad(this.Pb,a,b,c)};h.rc=function(a){return this.$.rc(this.Pb.w(a))};h.ge=function(a,b,c,d,e){return this.$.ge(this.Pb,a,b,c,d,e)};h.eb=function(a,b){return this.$.eb(this.Pb,a,b)};h.w=function(a){return new ih(this.Pb.w(a),this.$)};function jh(a){this.za=$f;this.Kb=new eh;this.Le={};this.oc={};this.Jc=a}function kh(a,b,c,d,e){var f=a.Kb,g=e;v(d>f.Ic,"Stacking an older write on top of newer ones");p(g)||(g=!0);f.Ga.push({path:b,Ra:c,be:d,visible:g});g&&(f.W=Zg(f.W,b,c));f.Ic=d;return e?lh(a,new Rf(Of,b,c)):[]}function mh(a,b,c,d){var e=a.Kb;v(d>e.Ic,"Stacking an older merge on top of newer ones");e.Ga.push({path:b,children:c,be:d,visible:!0});e.W=$g(e.W,b,c);e.Ic=d;c=Zf(c);return lh(a,new Pf(Of,b,c))}
    function nh(a,b,c){c=c||!1;b=a.Kb.Jd(b);return null==b?[]:lh(a,new Mf(b,c))}function oh(a,b,c){c=Zf(c);return lh(a,new Pf(Wf,b,c))}function ph(a,b,c,d){d=qh(a,d);if(null!=d){var e=rh(d);d=e.path;e=e.Lb;b=I(d,b);c=new Rf(new Vf(!1,!0,e,!0),b,c);return sh(a,d,c)}return[]}function th(a,b,c,d){if(d=qh(a,d)){var e=rh(d);d=e.path;e=e.Lb;b=I(d,b);c=Zf(c);c=new Pf(new Vf(!1,!0,e,!0),b,c);return sh(a,d,c)}return[]}
    jh.prototype.Rb=function(a,b){var c=a.path,d=null,e=!1;hg(this.za,c,function(a,b){var f=I(a,c);d=b.rb(f);e=e||null!=Ug(b);return!d});var f=this.za.get(c);f?(e=e||null!=Ug(f),d=d||f.rb(M)):(f=new Tg,this.za=this.za.set(c,f));var g;null!=d?g=!0:(g=!1,d=Q,lg(this.za.subtree(c),function(a,b){var c=b.rb(M);c&&(d=d.U(a,c))}));var k=null!=Wg(f,a);if(!k&&!Cf(a.D)){var l=uh(a);v(!Va(this.oc,l),"View does not exist, but we have a tag");var m=vh++;this.oc[l]=m;this.Le["_"+m]=l}g=f.Rb(a,b,new ih(c,this.Kb),d,
        g);k||e||(f=Wg(f,a),g=g.concat(wh(this,a,f)));return g};
    jh.prototype.tb=function(a,b,c){var d=a.path,e=this.za.get(d),f=[];if(e&&("default"===nf(a)||null!=Wg(e,a))){f=e.tb(a,b,c);e.f()&&(this.za=this.za.remove(d));e=f.xg;f=f.Zf;b=-1!==Ia(e,function(a){return Cf(a.D)});var g=fg(this.za,d,function(a,b){return null!=Ug(b)});if(b&&!g&&(d=this.za.subtree(d),!d.f()))for(var d=xh(d),k=0;k<d.length;++k){var l=d[k],m=l.Y,l=yh(this,l);this.Jc.Ie(m,zh(this,m),l.od,l.O)}if(!g&&0<e.length&&!c)if(b)this.Jc.Ud(a,null);else{var A=this;Ca(e,function(a){nf(a);var b=A.oc[uh(a)];
        A.Jc.Ud(a,b)})}Ah(this,e)}return f};jh.prototype.Ba=function(a,b){var c=this.Kb,d=fg(this.za,a,function(b,c){var d=I(b,a);if(d=c.rb(d))return d});return c.Ba(a,d,b,!0)};function xh(a){return dg(a,function(a,c,d){if(c&&null!=Ug(c))return[Ug(c)];var b=[];c&&(b=Vg(c));u(d,function(a){b=b.concat(a)});return b})}function Ah(a,b){for(var c=0;c<b.length;++c){var d=b[c];if(!Cf(d.D)){var d=uh(d),e=a.oc[d];delete a.oc[d];delete a.Le["_"+e]}}}
    function wh(a,b,c){var d=b.path,e=zh(a,b);c=yh(a,c);b=a.Jc.Ie(b,e,c.od,c.O);d=a.za.subtree(d);if(e)v(null==Ug(d.value),"If we're adding a query, it shouldn't be shadowed");else for(e=dg(d,function(a,b,c){if(!a.f()&&b&&null!=Ug(b))return[Ug(b).Y];var d=[];b&&(d=d.concat(Ea(Vg(b),function(a){return a.Y})));u(c,function(a){d=d.concat(a)});return d}),d=0;d<e.length;++d)c=e[d],a.Jc.Ud(c,zh(a,c));return b}
    function yh(a,b){var c=b.Y,d=zh(a,c);return{od:function(){return(b.F()||Q).hash()},O:function(b,f,g){if("ok"===b)return d?(f=c.path,(g=qh(a,d))?(b=rh(g),g=b.path,b=b.Lb,f=I(g,f),f=new Tf(new Vf(!1,!0,b,!0),f),g=sh(a,g,f)):g=[]):g=lh(a,new Tf(Wf,c.path)),g;b=(b||"error").toUpperCase();f&&(b+=": "+f);f=Error(b);f.code=g;x(f.message);return a.tb(c,null,f)}}}function uh(a){return a.path.toString()+"$"+nf(a)}
    function rh(a){var b=a.indexOf("$");v(-1!==b&&b<a.length-1,"Bad queryKey.");return{Lb:a.substr(b+1),path:new H(a.substr(0,b))}}function qh(a,b){var c=a.Le,d="_"+b;return null!==c&&d in c?c[d]:void 0}function zh(a,b){var c=uh(b);return G(a.oc,c)}var vh=1;function sh(a,b,c){var d=a.za.get(b);v(d,"Missing sync point for query tag that we're tracking");return d.lb(c,new ih(b,a.Kb),null)}function lh(a,b){return Bh(a,b,a.za,null,new ih(M,a.Kb))}
    function Bh(a,b,c,d,e){if(b.path.f())return Ch(a,b,c,d,e);var f=c.get(M);null==d&&null!=f&&(d=f.rb(M));var g=[],k=J(b.path),l=b.Sc(k);if((c=c.children.get(k))&&l)var m=d?d.R(k):null,k=e.w(k),g=g.concat(Bh(a,l,c,m,k));f&&(g=g.concat(f.lb(b,e,d)));return g}function Ch(a,b,c,d,e){var f=c.get(M);null==d&&null!=f&&(d=f.rb(M));var g=[];c.children.qa(function(c,f){var k=d?d.R(c):null,l=e.w(c),L=b.Sc(c);L&&(g=g.concat(Ch(a,L,f,k,l)))});f&&(g=g.concat(f.lb(b,e,d)));return g};function Dh(){this.zc={}}Dh.prototype.get=function(){return $a(this.zc)};function Eh(a){this.Qf=a;this.ud=null}Eh.prototype.get=function(){var a=this.Qf.get(),b=$a(a);if(this.ud)for(var c in this.ud)b[c]-=this.ud[c];this.ud=a;return b};function Fh(a,b){this.Bf={};this.Sd=new Eh(a);this.na=b;var c=1E4+2E4*Math.random();setTimeout(r(this.tf,this),Math.floor(c))}Fh.prototype.tf=function(){var a=this.Sd.get(),b={},c=!1,d;for(d in a)0<a[d]&&Fc(this.Bf,d)&&(b[d]=a[d],c=!0);c&&this.na.Fe(b);setTimeout(r(this.tf,this),Math.floor(6E5*Math.random()))};var Gh={},Hh={};function Ih(a){a=a.toString();Gh[a]||(Gh[a]=new Dh);return Gh[a]}function Jh(a,b){var c=a.toString();Hh[c]||(Hh[c]=b());return Hh[c]};function Kh(a,b){return a&&"object"===typeof a?(v(".sv"in a,"Unexpected leaf node or priority contents"),b[a[".sv"]]):a}function Lh(a,b){var c=new If;Lf(a,new H(""),function(a,e){Jf(c,a,Mh(e,b))});return c}function Mh(a,b){var c=a.H().P(),c=Kh(c,b),d;if(a.S()){var e=Kh(a.Ja(),b);return e!==a.Ja()||c!==a.H().P()?new he(e,P(c)):a}d=a;c!==a.H().P()&&(d=d.ia(new he(c)));a.X(R,function(a,c){var e=Mh(c,b);e!==c&&(d=d.U(a,e))});return d};function Nh(){this.children={};this.cd=0;this.value=null}function Oh(a,b,c){this.yd=a?a:"";this.Da=b?b:null;this.I=c?c:new Nh}function Ph(a,b){for(var c=b instanceof H?b:new H(b),d=a,e;null!==(e=J(c));)var f=G(d.I.children,e)||new Nh,d=new Oh(e,d,f),c=K(c);return d}h=Oh.prototype;h.Ja=function(){return this.I.value};function Qh(a,b){v("undefined"!==typeof b,"Cannot set value to undefined");a.I.value=b;Rh(a)}h.clear=function(){this.I.value=null;this.I.children={};this.I.cd=0;Rh(this)};
    h.nd=function(){return 0<this.I.cd};h.f=function(){return null===this.Ja()&&!this.nd()};h.X=function(a){var b=this;u(this.I.children,function(c,d){a(new Oh(d,b,c))})};function Sh(a,b,c,d){c&&!d&&b(a);a.X(function(a){Sh(a,b,!0,d)});c&&d&&b(a)}function Th(a,b){for(var c=a.parent();null!==c&&!b(c);)c=c.parent()}h.path=function(){return new H(null===this.Da?this.yd:this.Da.path()+"/"+this.yd)};h.name=function(){return this.yd};h.parent=function(){return this.Da};
    function Rh(a){if(null!==a.Da){var b=a.Da,c=a.yd,d=a.f(),e=Fc(b.I.children,c);d&&e?(delete b.I.children[c],b.I.cd--,Rh(b)):d||e||(b.I.children[c]=a.I,b.I.cd++,Rh(b))}};function Uh(){this.Ab=[]}function Vh(a,b){for(var c=null,d=0;d<b.length;d++){var e=b[d],f=e.cc();null===c||f.fa(c.cc())||(a.Ab.push(c),c=null);null===c&&(c=new Wh(f));c.add(e)}c&&a.Ab.push(c)}function Xh(a,b,c){Vh(a,c);Yh(a,function(a){return a.fa(b)})}function Zh(a,b,c){Vh(a,c);Yh(a,function(a){return a.contains(b)||b.contains(a)})}
    function Yh(a,b){for(var c=!0,d=0;d<a.Ab.length;d++){var e=a.Ab[d];if(e)if(e=e.cc(),b(e)){for(var e=a.Ab[d],f=0;f<e.kd.length;f++){var g=e.kd[f];if(null!==g){e.kd[f]=null;var k=g.Yb();nb&&kb("event: "+g.toString());Ab(k)}}a.Ab[d]=null}else c=!1}c&&(a.Ab=[])}function Wh(a){this.xa=a;this.kd=[]}Wh.prototype.add=function(a){this.kd.push(a)};Wh.prototype.cc=function(){return this.xa};function $h(a,b,c){this.B=b;this.ea=a;this.Td=Ih(b);this.ja=new Uh;this.zd=1;this.na=this.ib=null;c||0<=("object"===typeof window&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)?(this.na=new Af(this.B,r(this.Ib,this)),setTimeout(r(this.Oc,this,!0),0)):this.na=this.ib=new jf(this.B,r(this.Ib,this),r(this.Oc,this),r(this.Ce,this));this.Qg=Jh(b,r(function(){return new Fh(this.Td,this.na)},this));this.sc=
        new Oh;this.te=new Ff;var d=this;this.td=new jh({Ie:function(a,b,c,k){b=[];c=d.te.j(a.path);c.f()||(b=lh(d.td,new Rf(Wf,a.path,c)),setTimeout(function(){k("ok")},0));return b},Ud:aa});this.ea.bind(this.ea.kb.cb,function(a){a&&a.signIn?d.na.ee(a.idToken,function(b,c){d.Tb(b,c,a)},function(a,b){ai(d,a,b)}):d.na.Cf(function(a,b){ai(d,a,b)})});bi(this,"connected",!1);this.Ca=new If;this.hd=0;this.ue=null;this.T=new jh({Ie:function(a,b,c,k){d.na.hf(a,c,b,function(b,c,e){b=k(b,c,e);Zh(d.ja,a.path,b)});
        return[]},Ud:function(a,b){d.na.Df(a,b)}})}h=$h.prototype;h.Tb=function(){this.Hb(!0)};function ai(a,b,c){a.Hb(!1);"expired_token"==b&&a.ea.emit(a.ea.kb.Re,{status:b,reason:c})}h.toString=function(){return(this.B.Nb?"https://":"http://")+this.B.host};h.name=function(){return this.B.ye};function ci(a){a=a.te.j(new H(".info/serverTimeOffset")).P()||0;return(new Date).getTime()+a}function di(a){a=a={timestamp:ci(a)};a.timestamp=a.timestamp||(new Date).getTime();return a}
    h.Ib=function(a,b,c,d){this.hd++;var e=new H(a);b=this.ue?this.ue(a,b):b;a=[];d?c?(b=Pa(b,function(a){return P(a)}),a=th(this.T,e,b,d)):(b=P(b),a=ph(this.T,e,b,d)):c?(d=Pa(b,function(a){return P(a)}),a=oh(this.T,e,d)):(d=P(b),a=lh(this.T,new Rf(Wf,e,d)));d=e;0<a.length&&(d=ei(this,e));Zh(this.ja,d,a)};h.Oc=function(a){bi(this,"connected",a);!1===a&&fi(this)};h.Ce=function(a){var b=this;xb(a,function(a,d){bi(b,d,a)})};h.Hb=function(a){bi(this,"authenticated",a)};
    function bi(a,b,c){b=new H("/.info/"+b);c=P(c);var d=a.te;d.Nd=d.Nd.L(b,c);c=lh(a.td,new Rf(Wf,b,c));Zh(a.ja,b,c)}h.ub=function(a,b,c,d){this.o("set",{path:a.toString(),value:b,kh:c});var e=di(this);b=P(b,c);var e=Mh(b,e),f=this.zd++,e=kh(this.T,a,e,f,!0);Vh(this.ja,e);var g=this;this.na.put(a.toString(),b.P(!0),function(b,c,e){var k="ok"===b;k||x("set at "+a+" failed: "+b);k=nh(g.T,f,!k);Zh(g.ja,a,k);gi(d,b,c,e)});e=hi(this,a);ei(this,e);Zh(this.ja,e,[])};
    h.update=function(a,b,c){this.o("update",{path:a.toString(),value:b});var d=!0,e=di(this),f={};u(b,function(a,b){d=!1;var c=P(a);f[b]=Mh(c,e)});if(d)kb("update() called with empty data.  Don't do anything."),gi(c,"ok");else{var g=this.zd++,k=mh(this.T,a,f,g);Vh(this.ja,k);var l=this;this.na.kf(a.toString(),b,function(b,d,e){var f="ok"===b;f||x("update at "+a+" failed: "+b);var f=nh(l.T,g,!f),k=a;0<f.length&&(k=ei(l,a));Zh(l.ja,k,f);gi(c,b,d,e)});b=hi(this,a);ei(this,b);Zh(this.ja,a,[])}};
    function fi(a){a.o("onDisconnectEvents");var b=di(a),c=[];Lf(Lh(a.Ca,b),M,function(b,e){c=c.concat(lh(a.T,new Rf(Wf,b,e)));var d=hi(a,b);ei(a,d)});a.Ca=new If;Zh(a.ja,M,c)}h.Bd=function(a,b){var c=this;this.na.Bd(a.toString(),function(d,e,f){"ok"===d&&Kf(c.Ca,a);gi(b,d,e,f)})};function ii(a,b,c,d){var e=P(c);a.na.Be(b.toString(),e.P(!0),function(c,g,k){"ok"===c&&Jf(a.Ca,b,e);gi(d,c,g,k)})}
    function ji(a,b,c,d,e){var f=P(c,d);a.na.Be(b.toString(),f.P(!0),function(c,d,l){"ok"===c&&Jf(a.Ca,b,f);gi(e,c,d,l)})}function ki(a,b,c,d){var e=!0,f;for(f in c)e=!1;e?(kb("onDisconnect().update() called with empty data.  Don't do anything."),gi(d,"ok")):a.na.mf(b.toString(),c,function(e,f,l){if("ok"===e)for(var g in c)if(c.hasOwnProperty(g)){var k=P(c[g]);Jf(a.Ca,b.w(g),k)}gi(d,e,f,l)})}function li(a,b,c){c=".info"===J(b.path)?a.td.Rb(b,c):a.T.Rb(b,c);Xh(a.ja,b.path,c)}h.Dc=function(){this.ib&&this.ib.Dc()};
    h.resume=function(){this.ib&&this.ib.resume()};h.Je=function(a){if("undefined"!==typeof console){a?(this.Sd||(this.Sd=new Eh(this.Td)),a=this.Sd.get()):a=this.Td.get();var b=Fa(Ua(a),function(a,b){return Math.max(b.length,a)},0),c;for(c in a)if(a.hasOwnProperty(c)){for(var d=a[c],e=c.length;e<b+2;e++)c+=" ";console.log(c+d)}}};h.Ke=function(a){var b=this.Td,c;p(c)||(c=1);Fc(b.zc,a)||(b.zc[a]=0);b.zc[a]+=c;this.Qg.Bf[a]=!0};h.o=function(a){var b="";this.ib&&(b=this.ib.id+":");kb(b,arguments)};
    function gi(a,b,c,d){a&&Ab(function(){if("ok"==b)a(null);else{var e=(b||"error").toUpperCase();c&&(e+=": "+(c||"Unknown error"));e=Error(e);e.code=d||29999;a(e)}})};function mi(a,b,c,d,e){this.host=a.toLowerCase();this.domain=this.host.substr(this.host.indexOf(".")+1);this.Nb=b;this.ye=c;this.dh=d;this.Gd=e||"";md.Qd?(this.Rd=!0,this.ka=[md.Qd]):(this.ka=(a=Tc.get("host:"+a))&&a.split(",ts:")[1]>=Date.now()-6E5?a.split(",ts:")[0].split(","):[],this.Rd=!1);this.qb=JSON.parse(w.get("failHosts"))||[]}mi.prototype.ff=function(){return"wilddogio.com"!==this.domain&&"wilddogio-demo.com"!==this.domain};
    function gf(a,b){md.Qd||(null==b||0==b.length?(a.ka=[],Tc.remove("host:"+a.host)):(a.ka=b,Tc.set("host:"+a.host,a.ka.toString()+",ts:"+Date.now())))}mi.prototype.toString=function(){var a=(this.Nb?"https://":"http://")+this.host;this.Gd&&(a+="<"+this.Gd+">");return a};function hf(a,b){if(!md.Qd){var c=a.qb.indexOf(b);0<=c&&(a.qb.splice(c,1),w.set("failHosts",JSON.stringify(a.qb)))}};function ni(a,b,c,d,e){function f(){}a.o("transaction on "+b);var g=new W(a.ea,a,b);g.Gb("value",f);c={path:b,update:c,O:d,status:null,order:hb(),Qe:e,yf:0,Zd:function(){g.kc("value",f)},ce:null,Ha:null,ed:null,fd:null,gd:null};d=a.T.Ba(b,void 0)||Q;c.ed=d;d=c.update(d.P());if(p(d)){Pd("transaction failed: Data returned ",d,c.path);c.status=1;e=Ph(a.sc,b);var k=e.Ja()||[];k.push(c);Qh(e,k);"object"===typeof d&&null!==d&&Fc(d,".priority")?(k=G(d,".priority"),v(Nd(k),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):
        k=(a.T.Ba(b)||Q).H().P();e=di(a);d=P(d,k);e=Mh(d,e);c.fd=d;c.gd=e;c.Ha=a.zd++;c=kh(a.T,b,e,c.Ha,c.Qe);Zh(a.ja,b,c);oi(a)}else c.Zd(),c.fd=null,c.gd=null,c.O&&(a=new U(c.ed,new W(a.ea,a,c.path),R),c.O(null,!1,a))}function oi(a,b){var c=b||a.sc;b||pi(a,c);if(null!==c.Ja()){var d=qi(a,c);v(0<d.length,"Sending zero length transaction queue");Ga(d,function(a){return 1===a.status})&&ri(a,c.path(),d)}else c.nd()&&c.X(function(b){oi(a,b)})}
    function ri(a,b,c){for(var d=Ea(c,function(a){return a.Ha}),e=a.T.Ba(b,d)||Q,d=e,e=e.hash(),f=0;f<c.length;f++){var g=c[f];v(1===g.status,"tryToSendTransactionQueue_: items in queue should all be run.");g.status=2;g.yf++;var k=I(b,g.path),d=d.L(k,g.fd)}var d=d.P(!0),l=a.ea;a.na.put(b.toString(),d,function(d){a.o("transaction put response",{path:b.toString(),status:d});var e=[];if("ok"===d){d=[];for(f=0;f<c.length;f++){c[f].status=3;e=e.concat(nh(a.T,c[f].Ha));if(c[f].O){var g=c[f].gd,k=new W(l,a,
        c[f].path);d.push(r(c[f].O,null,null,!0,new U(g,k,R)))}c[f].Zd()}pi(a,Ph(a.sc,b));oi(a);Zh(a.ja,b,e);for(f=0;f<d.length;f++)Ab(d[f])}else{if("datastale"===d)for(f=0;f<c.length;f++)c[f].status=4===c[f].status?5:1;else for(x("transaction at "+b.toString()+" failed: "+d),f=0;f<c.length;f++)c[f].status=5,c[f].ce=d;ei(a,b)}},e)}function ei(a,b){var c=si(a,b),d=c.path(),c=qi(a,c);ti(a,c,d);return d}
    function ti(a,b,c){if(0!==b.length){for(var d=[],e=[],f=Ea(b,function(a){return a.Ha}),g=0;g<b.length;g++){var k=b[g],l=I(c,k.path),m=!1,A;v(null!==l,"rerunTransactionsUnderNode_: relativePath should not be null.");if(5===k.status)m=!0,A=k.ce,e=e.concat(nh(a.T,k.Ha,!0));else if(1===k.status)if(25<=k.yf)m=!0,A="maxretry",e=e.concat(nh(a.T,k.Ha,!0));else{var L=a.T.Ba(k.path,f)||Q;k.ed=L;var ca=b[g].update(L.P());p(ca)?(Pd("transaction failed: Data returned ",ca,k.path),l=P(ca),"object"===typeof ca&&
    null!=ca&&Fc(ca,".priority")||(l=l.ia(L.H())),L=k.Ha,ca=di(a),ca=Mh(l,ca),k.fd=l,k.gd=ca,k.Ha=a.zd++,Ja(f,L),e=e.concat(kh(a.T,k.path,ca,k.Ha,k.Qe)),e=e.concat(nh(a.T,L,!0))):(m=!0,A="nodata",e=e.concat(nh(a.T,k.Ha,!0)))}Zh(a.ja,c,e);e=[];m&&(b[g].status=3,setTimeout(b[g].Zd,Math.floor(0)),b[g].O&&("nodata"===A?(k=new W(a.ea,a,b[g].path),d.push(r(b[g].O,null,null,!1,new U(b[g].ed,k,R)))):("maxretry"==A?(k=Error("maxretries: The transaction had too many retries!"),k.code=26203):"set"==A?(k=Error("overriddenbyset: The transaction was overridden by a subsequent set!"),
        k.code=26204):(k=Error("user_code_exception: User code called from the SyncReference runloop threw an exception!"),k.code=26202),d.push(r(b[g].O,null,k,!1,null)))))}pi(a,a.sc);for(g=0;g<d.length;g++)Ab(d[g]);oi(a)}}function si(a,b){for(var c,d=a.sc;null!==(c=J(b))&&null===d.Ja();)d=Ph(d,c),b=K(b);return d}function qi(a,b){var c=[];ui(a,b,c);c.sort(function(a,b){return a.order-b.order});return c}
    function ui(a,b,c){var d=b.Ja();if(null!==d)for(var e=0;e<d.length;e++)c.push(d[e]);b.X(function(b){ui(a,b,c)})}function pi(a,b){var c=b.Ja();if(c){for(var d=0,e=0;e<c.length;e++)3!==c[e].status&&(c[d]=c[e],d++);c.length=d;Qh(b,0<c.length?c:null)}b.X(function(b){pi(a,b)})}function hi(a,b){var c=si(a,b).path(),d=Ph(a.sc,b);Th(d,function(b){vi(a,b)});vi(a,d);Sh(d,function(b){vi(a,b)});return c}
    function vi(a,b){var c=b.Ja();if(null!==c){for(var d=[],e=[],f=-1,g=0;g<c.length;g++)if(4!==c[g].status)if(2===c[g].status)v(f===g-1,"All SENT items should be at beginning of queue."),f=g,c[g].status=4,c[g].ce="set";else if(v(1===c[g].status,"Unexpected transaction status in abort"),c[g].Zd(),e=e.concat(nh(a.T,c[g].Ha,!0)),c[g].O){var k=Error("overriddenbyset: The transaction was overridden by a subsequent set!");k.code=26204;d.push(r(c[g].O,null,k,!1,null))}-1===f?Qh(b,null):c.length=f+1;Zh(a.ja,
        b.path(),e);for(g=0;g<d.length;g++)Ab(d[g])}};function wi(){this.$a={};this.ah=!1}ba(wi);wi.prototype.Dc=function(a){for(var b in this.$a[a.name])this.$a[a.name].hasOwnProperty(b)&&this.$a[a.name][b].Dc()};wi.prototype.resume=function(a){for(var b in this.$a[a.name])this.$a[a.name].hasOwnProperty(b)&&this.$a[a.name][b].resume()};function xi(a){var b=this;this.ob=a;this.Wd="*";fd()?this.Mc=this.qd=Xc():(this.Mc=window.opener,this.qd=window);if(!b.Mc)throw"Unable to find relay frame";Yc(this.qd,"message",r(this.Cd,this));Yc(this.qd,"message",r(this.lf,this));try{yi(this,{a:"ready"})}catch(c){Yc(this.Mc,"load",function(){yi(b,{a:"ready"})})}Yc(window,"unload",r(this.sg,this))}function yi(a,b){b=t(b);fd()?a.Mc.doPost(b,a.Wd):a.Mc.postMessage(b,a.Wd)}
    xi.prototype.Cd=function(a){var b=this,c;try{c=va(a.data)}catch(d){}c&&"request"===c.a&&(Zc(window,"message",this.Cd),this.Wd=a.origin,this.ob&&setTimeout(function(){b.ob(b.Wd,c.d,function(a,c){b.Mf=!c;b.ob=void 0;yi(b,{a:"response",d:a,forceKeepWindowOpen:c})})},0))};xi.prototype.sg=function(){try{Zc(this.qd,"message",this.lf)}catch(a){}this.ob&&(yi(this,{a:"error",d:"unknown closed window"}),this.ob=void 0);try{window.close()}catch(a){}};xi.prototype.lf=function(a){if(this.Mf&&"die"===a.data)try{window.close()}catch(b){}};var X={cg:function(){ua.Ka.eh.bg();ua.Ka.Ff.ih()}};X.forceLongPolling=X.cg;X.dg=function(){ua.Ka.Ff.bg()};X.forceWebSockets=X.dg;X.Gg=function(a,b){a.G.ib.He=b};X.setSecurityDebugCallback=X.Gg;X.Je=function(a,b){a.G.Je(b)};X.stats=X.Je;X.Ke=function(a,b){a.G.Ke(b)};X.statsIncrementCounter=X.Ke;X.hd=function(a){return a.G.hd};X.dataUpdateCount=X.hd;X.ig=function(a,b){a.G.ue=b};X.interceptServerData=X.ig;X.pg=function(a){new xi(a)};X.onPopupOpen=X.pg;X.Eg=function(a){Ec=a};
    X.setAuthenticationServer=X.Eg;function Y(a,b){this.Uc=a;this.xa=b}Y.prototype.cancel=function(a){E("Wilddog.onDisconnect().cancel",0,1,arguments.length);F("Wilddog.onDisconnect().cancel",1,a,!0);var b=new B;this.Uc.Bd(this.xa,C(b,a));return b.u};Y.prototype.cancel=Y.prototype.cancel;Y.prototype.cancel=Y.prototype.cancel;
    Y.prototype.remove=function(a){E("Wilddog.onDisconnect().remove",0,1,arguments.length);Xd("Wilddog.onDisconnect().remove",this.xa);F("Wilddog.onDisconnect().remove",1,a,!0);var b=new B;ii(this.Uc,this.xa,null,C(b,a));return b.u};Y.prototype.remove=Y.prototype.remove;Y.prototype.remove=Y.prototype.remove;
    Y.prototype.set=function(a,b){E("Wilddog.onDisconnect().set",1,2,arguments.length);Xd("Wilddog.onDisconnect().set",this.xa);Od("Wilddog.onDisconnect().set",a,this.xa,!1);F("Wilddog.onDisconnect().set",2,b,!0);var c=new B;ii(this.Uc,this.xa,a,C(c,b));return c.u};Y.prototype.set=Y.prototype.set;Y.prototype.set=Y.prototype.set;
    Y.prototype.ub=function(a,b,c){E("Wilddog.onDisconnect().setWithPriority",2,3,arguments.length);Xd("Wilddog.onDisconnect().setWithPriority",this.xa);Od("Wilddog.onDisconnect().setWithPriority",a,this.xa,!1);Sd("Wilddog.onDisconnect().setWithPriority",2,b);F("Wilddog.onDisconnect().setWithPriority",3,c,!0);var d=new B;ji(this.Uc,this.xa,a,b,C(d,c));return d.u};Y.prototype.setWithPriority=Y.prototype.ub;Y.prototype.setWithPriority=Y.prototype.ub;
    Y.prototype.update=function(a,b){E("Wilddog.onDisconnect().update",1,2,arguments.length);Xd("Wilddog.onDisconnect().update",this.xa);if(ea(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;x("Passing an Array to Wilddog.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}Rd("Wilddog.onDisconnect().update",a,this.xa);F("Wilddog.onDisconnect().update",2,b,!0);c=new B;
        ki(this.Uc,this.xa,a,C(c,b));return c.u};Y.prototype.update=Y.prototype.update;Y.prototype.update=Y.prototype.update;function Og(a){this.g=a}h=Og.prototype;h.L=function(a,b,c,d,e){v(a.Fc(this.g),"A node must be indexed if only a child is updated");d=a.R(b);if(d.fa(c))return a;null!=e&&(c.f()?a.Pa(b)?zi(e,new V("child_removed",d,b)):v(a.S(),"A child remove without an old child only makes sense on a leaf node"):d.f()?zi(e,new V("child_added",c,b)):zi(e,new V("child_changed",c,b,d)));return a.S()&&c.f()?a:a.U(b,c).vb(this.g)};
    h.Aa=function(a,b,c){null!=c&&(a.S()||a.X(R,function(a,e){b.Pa(a)||zi(c,new V("child_removed",e,a))}),b.S()||b.X(R,function(b,e){if(a.Pa(b)){var d=a.R(b);d.fa(e)||zi(c,new V("child_changed",e,b,d))}else zi(c,new V("child_added",e,b))}));return b.vb(this.g)};h.ia=function(a,b){return a.f()?Q:a.ia(b)};h.Oa=function(){return!1};h.Zb=function(){return this};function Qg(a){this.se=new Og(a.g);this.g=a.g;var b;a.ta?(b=Ai(a),b=a.g.Kc(Bi(a),b)):b=Qe;this.Wc=b;a.ua?(b=Ci(a),a=a.g.Kc(Di(a),b)):a=a.g.Lc();this.Cc=a}h=Qg.prototype;h.matches=function(a){return 0>=this.g.compare(this.Wc,a)&&0>=this.g.compare(a,this.Cc)};h.L=function(a,b,c,d,e){this.matches(new O(b,c))||(c=Q);return this.se.L(a,b,c,d,e)};h.Aa=function(a,b,c){b.S()&&(b=Q);var d=b.vb(this.g),d=d.ia(Q),e=this;b.X(R,function(a,b){e.matches(new O(a,b))||(d=d.U(a,Q))});return this.se.Aa(a,d,c)};
    h.ia=function(a){return a};h.Oa=function(){return!0};h.Zb=function(){return this.se};function Pg(a){this.ya=new Qg(a);this.g=a.g;v(a.ra,"Only valid if limit has been set");this.ga=a.ga;this.Mb=!Ei(a)}h=Pg.prototype;h.L=function(a,b,c,d,e){this.ya.matches(new O(b,c))||(c=Q);return a.R(b).fa(c)?a:a.Fb()<this.ga?this.ya.Zb().L(a,b,c,d,e):Fi(this,a,b,c,d,e)};
    h.Aa=function(a,b,c){var d;if(b.S()||b.f())d=Q.vb(this.g);else if(2*this.ga<b.Fb()&&b.Fc(this.g)){d=Q.vb(this.g);b=this.Mb?b.dc(this.ya.Cc,this.g):b.bc(this.ya.Wc,this.g);for(var e=0;0<b.Ya.length&&e<this.ga;){var f=S(b),g;if(g=this.Mb?0>=this.g.compare(this.ya.Wc,f):0>=this.g.compare(f,this.ya.Cc))d=d.U(f.name,f.node),e++;else break}}else{d=b.vb(this.g);d=d.ia(Q);var k,l,m;if(this.Mb){b=d.cf(this.g);k=this.ya.Cc;l=this.ya.Wc;var A=de(this.g);m=function(a,b){return A(b,a)}}else b=d.ac(this.g),k=this.ya.Wc,
        l=this.ya.Cc,m=de(this.g);for(var e=0,L=!1;0<b.Ya.length;)f=S(b),!L&&0>=m(k,f)&&(L=!0),(g=L&&e<this.ga&&0>=m(f,l))?e++:d=d.U(f.name,Q)}return this.ya.Zb().Aa(a,d,c)};h.ia=function(a){return a};h.Oa=function(){return!0};h.Zb=function(){return this.ya.Zb()};
    function Fi(a,b,c,d,e,f){var g;if(a.Mb){var k=de(a.g);g=function(a,b){return k(b,a)}}else g=de(a.g);v(b.Fb()==a.ga,"");var l=new O(c,d),m=a.Mb?Oe(b,a.g):Pe(b,a.g),A=a.ya.matches(l);if(b.Pa(c)){var L=b.R(c),m=e.pe(a.g,m,a.Mb);null!=m&&m.name==c&&(m=e.pe(a.g,m,a.Mb));e=null==m?1:g(m,l);if(A&&!d.f()&&0<=e)return null!=f&&zi(f,new V("child_changed",d,c,L)),b.U(c,d);null!=f&&zi(f,new V("child_removed",L,c));b=b.U(c,Q);return null!=m&&a.ya.matches(m)?(null!=f&&zi(f,new V("child_added",m.node,m.name)),b.U(m.name,
        m.node)):b}return d.f()?b:A&&0<=g(m,l)?(null!=f&&(zi(f,new V("child_removed",m.node,m.name)),zi(f,new V("child_added",d,c))),b.U(c,d).U(m.name,Q)):b};function Fg(){this.pb={}}
    function zi(a,b){var c=b.type,d=b.fb;v("child_added"==c||"child_changed"==c||"child_removed"==c,"Only child changes supported for tracking");v(".priority"!==d,"Only non-priority child changes can be tracked.");var e=G(a.pb,d);if(e){var f=e.type;if("child_added"==c&&"child_removed"==f)a.pb[d]=new V("child_changed",b.Sa,d,e.Sa);else if("child_removed"==c&&"child_added"==f)delete a.pb[d];else if("child_removed"==c&&"child_changed"==f)a.pb[d]=new V("child_removed",e.Ae,d);else if("child_changed"==c&&
        "child_added"==f)a.pb[d]=new V("child_added",b.Sa,d);else if("child_changed"==c&&"child_changed"==f)a.pb[d]=new V("child_changed",b.Sa,d,e.Ae);else throw ib("Illegal combination of changes: "+b+" occurred after "+e);}else a.pb[d]=b};function Gi(){this.Wb=this.ua=this.Ob=this.ta=this.ra=!1;this.ga=0;this.Qb="";this.ic=null;this.Db="";this.fc=null;this.Bb="";this.g=R}var Hi=new Gi;function Ei(a){return""===a.Qb?a.ta:"l"===a.Qb}function Bi(a){v(a.ta,"Only valid if start has been set");return a.ic}function Ai(a){v(a.ta,"Only valid if start has been set");return a.Ob?a.Db:"[MIN_NAME]"}function Di(a){v(a.ua,"Only valid if end has been set");return a.fc}
    function Ci(a){v(a.ua,"Only valid if end has been set");return a.Wb?a.Bb:"[MAX_NAME]"}function Ii(a){var b=new Gi;b.ra=a.ra;b.ga=a.ga;b.ta=a.ta;b.ic=a.ic;b.Ob=a.Ob;b.Db=a.Db;b.ua=a.ua;b.fc=a.fc;b.Wb=a.Wb;b.Bb=a.Bb;b.g=a.g;return b}h=Gi.prototype;h.xe=function(a){var b=Ii(this);b.ra=!0;b.ga=a;b.Qb="";return b};h.vd=function(a){var b=Ii(this);b.ra=!0;b.ga=a;b.Qb="l";return b};h.wd=function(a){var b=Ii(this);b.ra=!0;b.ga=a;b.Qb="r";return b};
    h.Vc=function(a,b){var c=Ii(this);c.ta=!0;p(a)||(a=null);c.ic=a;null!=b?(c.Ob=!0,c.Db=b):(c.Ob=!1,c.Db="");return c};h.Bc=function(a,b){var c=Ii(this);c.ua=!0;p(a)||(a=null);c.fc=a;p(b)?(c.Wb=!0,c.Bb=b):(c.mh=!1,c.Bb="");return c};function Ji(a,b){var c=Ii(a);c.g=b;return c}function pf(a){var b={};a.ta&&(b.sp=a.ic,a.Ob&&(b.sn=a.Db));a.ua&&(b.ep=a.fc,a.Wb&&(b.en=a.Bb));if(a.ra){b.l=a.ga;var c=a.Qb;""===c&&(c=Ei(a)?"l":"r");b.vf=c}a.g!==R&&(b.i=a.g.toString());return b}
    function Cf(a){return!(a.ta||a.ua||a.ra)}function Df(a){var b={};if(Cf(a)&&a.g==R)return b;var c;a.g===R?c="$priority":a.g===me?c="$value":a.g===je?c="$key":(v(a.g instanceof ee,"Unrecognized index type!"),c=a.g.toString());b.orderBy=t(c);a.ta&&(b.startAt=t(a.ic),a.Ob&&(b.startAt+=","+t(a.Db)));a.ua&&(b.endAt=t(a.fc),a.Wb&&(b.endAt+=","+t(a.Bb)));a.ra&&(Ei(a)?b.limitToFirst=a.ga:b.limitToLast=a.ga);return b}h.toString=function(){return t(pf(this))};function Z(a,b,c,d){this.G=a;this.path=b;this.D=c;this.nc=d}
    function Ki(a){var b=null,c=null;a.ta&&(b=Bi(a));a.ua&&(c=Di(a));if(a.g===je){if(a.ta){if("[MIN_NAME]"!=Ai(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==typeof b)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}if(a.ua){if("[MAX_NAME]"!=Ci(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==
        typeof c)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}}else if(a.g===R){if(null!=b&&!Nd(b)||null!=c&&!Nd(c))throw Error("Query: When ordering by priority, the first argument passed to startAt(), endAt(), or equalTo() must be a valid priority value (null, a number, or a string).");}else if(v(a.g instanceof ee||a.g===me,"unknown index type."),null!=b&&"object"===typeof b||null!=c&&"object"===typeof c)throw Error("Query: First argument passed to startAt(), endAt(), or equalTo() cannot be an object.");
    }function Li(a){if(a.ta&&a.ua&&a.ra&&(!a.ra||""===a.Qb))throw Error("Query: Can't combine startAt(), endAt(), and limit(). Use limitToFirst() or limitToLast() instead.");}function Mi(a,b){if(!0===a.nc)throw Error(b+": You can't combine multiple orderBy calls.");}Z.prototype.pc=function(a){E("Query.ref",0,1,arguments.length);a&&Wd("Query.ref",a);return new W(this.app,this.G,a?this.path.w(a):this.path)};Z.prototype.ref=Z.prototype.pc;
    Z.prototype.Gb=function(a,b,c,d){E("Query.on",2,4,arguments.length);Td("Query.on",a,!1);F("Query.on",2,b,!1);var e=Ni("Query.on",c,d);if("value"===a)li(this.G,this,new ug(b,e.cancel||null,e.context||null));else{var f={};f[a]=b;li(this.G,this,new vg(f,e.cancel,e.context))}return b};Z.prototype.on=Z.prototype.Gb;
    Z.prototype.kc=function(a,b,c){E("Query.off",0,3,arguments.length);Td("Query.off",a,!0);F("Query.off",2,b,!0);Dd("Query.off",3,c);var d=null,e=null;"value"===a?d=new ug(b||null,null,c||null):a&&(b&&(e={},e[a]=b),d=new vg(e,null,c||null));e=this.G;d=".info"===J(this.path)?e.td.tb(this,d):e.T.tb(this,d);Xh(e.ja,this.path,d)};Z.prototype.off=Z.prototype.kc;
    Z.prototype.Dd=function(a,b,c,d){function e(c){k&&(k=!1,g.kc(a,e),b&&b.call(f.context,c),l.resolve(c))}E("Query.once",1,4,arguments.length);Td("Query.once",a,!1);F("Query.once",2,b,!0);var f=Ni("Query.once",c,d),g=this,k=!0,l=new B;mc(l.u);this.Gb(a,e,function(b){g.kc(a,e);f.cancel&&f.cancel.call(f.context,b);l.reject(b)});return l.u};Z.prototype.once=Z.prototype.Dd;Z.prototype.once=Z.prototype.Dd;
    Z.prototype.xe=function(a){x("Query.limit() being deprecated. Please use Query.limitToFirst() or Query.limitToLast() instead.");E("Query.limit",1,1,arguments.length);if(!fa(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limit: First argument must be a positive integer.");if(this.D.ra)throw Error("Query.limit: Limit was already set (by another call to limit, limitToFirst, orlimitToLast.");var b=this.D.xe(a);Li(b);return new Z(this.G,this.path,b,this.nc)};Z.prototype.limit=Z.prototype.xe;
    Z.prototype.vd=function(a){E("Query.limitToFirst",1,1,arguments.length);if(!fa(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToFirst: First argument must be a positive integer.");if(this.D.ra)throw Error("Query.limitToFirst: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new Z(this.G,this.path,this.D.vd(a),this.nc)};Z.prototype.limitToFirst=Z.prototype.vd;Z.prototype.limitToFirst=Z.prototype.vd;
    Z.prototype.wd=function(a){E("Query.limitToLast",1,1,arguments.length);if(!fa(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToLast: First argument must be a positive integer.");if(this.D.ra)throw Error("Query.limitToLast: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new Z(this.G,this.path,this.D.wd(a),this.nc)};Z.prototype.limitToLast=Z.prototype.wd;Z.prototype.limitToLast=Z.prototype.wd;
    Z.prototype.nf=function(a){E("Query.orderByChild",1,1,arguments.length);if("$key"===a)throw Error('Query.orderByChild: "$key" is invalid.  Use Query.orderByKey() instead.');if("$priority"===a)throw Error('Query.orderByChild: "$priority" is invalid.  Use Query.orderByPriority() instead.');if("$value"===a)throw Error('Query.orderByChild: "$value" is invalid.  Use Query.orderByValue() instead.');Ud("Query.orderByChild",1,a,!1);Mi(this,"Query.orderByChild");var b=Ji(this.D,new ee(a));Ki(b);return new Z(this.G,
        this.path,b,!0)};Z.prototype.orderByChild=Z.prototype.nf;Z.prototype.orderByChild=Z.prototype.nf;Z.prototype.pf=function(){E("Query.orderByKey",0,0,arguments.length);Mi(this,"Query.orderByKey");var a=Ji(this.D,je);Ki(a);return new Z(this.G,this.path,a,!0)};Z.prototype.orderByKey=Z.prototype.pf;Z.prototype.orderByKey=Z.prototype.pf;Z.prototype.qf=function(){E("Query.orderByPriority",0,0,arguments.length);Mi(this,"Query.orderByPriority");var a=Ji(this.D,R);Ki(a);return new Z(this.G,this.path,a,!0)};
    Z.prototype.orderByPriority=Z.prototype.qf;Z.prototype.orderByPriority=Z.prototype.qf;Z.prototype.rf=function(){E("Query.orderByValue",0,0,arguments.length);Mi(this,"Query.orderByValue");var a=Ji(this.D,me);Ki(a);return new Z(this.G,this.path,a,!0)};Z.prototype.orderByValue=Z.prototype.rf;Z.prototype.orderByValue=Z.prototype.rf;
    Z.prototype.Vc=function(a,b){E("Query.startAt",0,2,arguments.length);Od("Query.startAt",a,this.path,!0);Ud("Query.startAt",2,b,!0);var c=this.D.Vc(a,b);Li(c);Ki(c);if(this.D.ta)throw Error("Query.startAt: Starting point was already set (by another call to startAt or equalTo).");p(a)||(b=a=null);return new Z(this.G,this.path,c,this.nc)};Z.prototype.startAt=Z.prototype.Vc;Z.prototype.startAt=Z.prototype.Vc;
    Z.prototype.Bc=function(a,b){E("Query.endAt",0,2,arguments.length);Od("Query.endAt",a,this.path,!0);Ud("Query.endAt",2,b,!0);var c=this.D.Bc(a,b);Li(c);Ki(c);if(this.D.ua)throw Error("Query.endAt: Ending point was already set (by another call to endAt or equalTo).");return new Z(this.G,this.path,c,this.nc)};Z.prototype.endAt=Z.prototype.Bc;Z.prototype.endAt=Z.prototype.Bc;
    Z.prototype.We=function(a,b){E("Query.equalTo",1,2,arguments.length);Od("Query.equalTo",a,this.path,!1);Ud("Query.equalTo",2,b,!0);if(this.D.ta)throw Error("Query.equalTo: Starting point was already set (by another call to endAt or equalTo).");if(this.D.ua)throw Error("Query.equalTo: Ending point was already set (by another call to endAt or equalTo).");return this.Vc(a,b).Bc(a,b)};Z.prototype.equalTo=Z.prototype.We;Z.prototype.equalTo=Z.prototype.We;
    Z.prototype.toString=function(){E("Query.toString",0,0,arguments.length);for(var a=this.path,b="",c=a.ba;c<a.C.length;c++)""!==a.C[c]&&(b+="/"+encodeURIComponent(String(a.C[c])));return this.G.toString()+(b||"/")};Z.prototype.toString=Z.prototype.toString;function nf(a){a=wb(pf(a.D));return"{}"===a?"default":a}
    function Ni(a,b,c){var d={cancel:null,context:null};if(b&&c)d.cancel=b,F(a,3,d.cancel,!0),d.context=c,Dd(a,4,d.context);else if(b)if("object"===typeof b&&null!==b)d.context=b;else if("function"===typeof b)d.cancel=b;else throw Error(Cd(a,3,!0)+" must either be a cancel callback or a context object.");return d};function Oi(a,b){this.committed=a;this.snapshot=b};var Pi=function(){var a=0,b=[];return function(c){var d=c===a;a=c;for(var e=Array(8),f=7;0<=f;f--)e[f]="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c%64),c=Math.floor(c/64);v(0===c,"Cannot push at time == 0");c=e.join("");if(d){for(f=11;0<=f&&63===b[f];f--)b[f]=0;b[f]++}else for(f=0;12>f;f++)b[f]=Math.floor(64*Math.random());for(f=0;12>f;f++)c+="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);v(20===c.length,"nextPushId: Length should be 20.");
        return c}}();function W(a,b,c){this.app=a;if(!b&&!c){b=a.options.syncURL;c=!0===a.options.websocketOnly?!0:!1;if(!b)throw Error("Could not find 'syncURL' in options.");a=sb(b);var d=a.Rg;"wilddog"===a.domain&&rb(a.host+" is no longer supported. Please use <YOUR WILDDOG>.wilddogio.com instead");d||rb("Cannot parse Wilddog url. Please use https://<YOUR WILDDOG>.wilddogio.com");a.Nb||"undefined"!==typeof window&&window.location&&window.location.protocol&&-1!==window.location.protocol.indexOf("https:")&&x("Insecure Wilddog access from a secure page. Please use https.");
        if(a.Jb){var e=a.Jb;e&&(e=e.replace(/^\/*\.info(\/|$)/,"/"));q(e)&&0!==e.length&&!Ld.test(e)||rb("App syncURL was an invalid path: "+b+'. Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"')}b=new mi(a.host,a.Nb,d,"ws"===a.scheme||"wss"===a.scheme||c);a=new H(a.Jb);c=wi.$b();d=this.app;e=b.toString();c.$a[d.name]||(c.$a[d.name]={});var f=G(c.$a[d.name],e);f||(f=new $h(d,b,c.ah),c.$a[d.name][e]=f);b=f;c=a}Z.call(this,b,c,Hi,!1)}ma(W,Z);
    W.prototype.name=function(){x("Wilddog.name() being deprecated. Please use Wilddog.key() instead.");E("Wilddog.name",0,0,arguments.length);return this.key()};W.prototype.name=W.prototype.name;W.prototype.key=function(){E("Wilddog.key",0,0,arguments.length);return this.path.f()?null:Fd(this.path)};W.prototype.key=W.prototype.key;
    W.prototype.w=function(a){E("Wilddog.child",1,1,arguments.length);fa(a)?a=String(a):a instanceof H||(null===J(this.path)?Wd("Wilddog.child",a):Vd("Wilddog.child",a));return new W(this.app,this.G,this.path.w(a))};W.prototype.child=W.prototype.w;W.prototype.parent=function(){E("Wilddog.parent",0,0,arguments.length);var a=this.path.parent();return null===a?null:new W(this.app,this.G,a)};W.prototype.parent=W.prototype.parent;
    W.prototype.root=function(){E("Wilddog.ref",0,0,arguments.length);for(var a=this;null!==a.parent();)a=a.parent();return a};W.prototype.root=W.prototype.root;W.prototype.set=function(a,b){E("Wilddog.set",1,2,arguments.length);Xd("Wilddog.set",this.path);Od("Wilddog.set",a,this.path,!1);F("Wilddog.set",2,b,!0);var c=new B;this.G.ub(this.path,a,null,C(c,b));return c.u};W.prototype.set=W.prototype.set;
    W.prototype.update=function(a,b){E("Wilddog.update",1,2,arguments.length);Xd("Wilddog.update",this.path);if(ea(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;x("Passing an Array to Wilddog.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}Rd("Wilddog.update",a,this.path);F("Wilddog.update",2,b,!0);c=new B;this.G.update(this.path,a,C(c,b));return c.u};W.prototype.update=W.prototype.update;
    W.prototype.ub=function(a,b,c){E("Wilddog.setWithPriority",2,3,arguments.length);Xd("Wilddog.setWithPriority",this.path);Od("Wilddog.setWithPriority",a,this.path,!1);Sd("Wilddog.setWithPriority",2,b);F("Wilddog.setWithPriority",3,c,!0);if(".length"===this.key()||".keys"===this.key())throw"Wilddog.setWithPriority failed: "+this.key()+" is a read-only object.";var d=new B;this.G.ub(this.path,a,b,C(d,c));return d.u};W.prototype.setWithPriority=W.prototype.ub;
    W.prototype.remove=function(a){E("Wilddog.remove",0,1,arguments.length);Xd("Wilddog.remove",this.path);F("Wilddog.remove",1,a,!0);return this.set(null,a)};W.prototype.remove=W.prototype.remove;
    W.prototype.transaction=function(a,b,c){E("Wilddog.transaction",1,3,arguments.length);Xd("Wilddog.transaction",this.path);F("Wilddog.transaction",1,a,!1);F("Wilddog.transaction",2,b,!0);if(p(c)&&"boolean"!=typeof c)throw Error(Cd("Wilddog.transaction",3,!0)+"must be a boolean.");if(".length"===this.key()||".keys"===this.key())throw"Wilddog.transaction failed: "+this.key()+" is a read-only object.";"undefined"===typeof c&&(c=!0);var d=new B;ga(b)&&mc(d.u);ni(this.G,this.path,a,function(a,c,g){a?d.reject(a):
        d.resolve(new Oi(c,g));ga(b)&&b(a,c,g)},c);return d.u};W.prototype.transaction=W.prototype.transaction;W.prototype.Fg=function(a,b){E("Wilddog.setPriority",1,2,arguments.length);Xd("Wilddog.setPriority",this.path);Sd("Wilddog.setPriority",1,a);F("Wilddog.setPriority",2,b,!0);var c=new B;this.G.ub(this.path.w(".priority"),a,null,C(c,b));return c.u};W.prototype.setPriority=W.prototype.Fg;
    W.prototype.push=function(a,b){E("Wilddog.push",0,2,arguments.length);Xd("Wilddog.push",this.path);Od("Wilddog.push",a,this.path,!0);F("Wilddog.push",2,b,!0);var c=ci(this.G),d=Pi(c),c=this.w(d);if(null!=a){var e=this,f=c.set(a,b).then(function(){return e.w(d)});c.then=r(f.then,f);c["catch"]=r(f.then,f,void 0);ga(b)&&mc(f)}return c};W.prototype.push=W.prototype.push;W.prototype.onDisconnect=function(){Xd("Wilddog.onDisconnect",this.path);return new Y(this.G,this.path)};W.prototype.onDisconnect=W.prototype.onDisconnect;
    function Qi(){E("Wilddog.goOffline",0,0,arguments.length);wi.$b().Dc(this.app)}la("module$exports$wd$sync$Sync.goOffline",Qi);function Ri(){E("Wilddog.goOnline",0,0,arguments.length);wi.$b().resume(this.app)}la("module$exports$wd$sync$Sync.goOnline",Ri);var Si={TIMESTAMP:{".sv":"timestamp"}};la("module$exports$wd$sync$Sync.ServerValue",Si);la("module$exports$wd$sync$Sync.INTERNAL",X);la("module$exports$wd$sync$Sync.Context",wi);W.prototype.fg=Qi;W.prototype.goOffline=W.prototype.fg;
    W.prototype.gg=Ri;W.prototype.goOnline=W.prototype.gg;W.prototype.Ve=function(a,b){v(!b||!0===a||!1===a,"Can't turn on custom loggers persistently.");!0===a?("undefined"!==typeof console&&("function"===typeof console.log?nb=r(console.log,console):"object"===typeof console.log&&(nb=function(a){console.log(a)})),b&&w.set("logging_enabled",!0)):a?nb=a:(nb=null,w.remove("logging_enabled"))};W.prototype.enableLogging=W.prototype.Ve;W.prototype.Hf=Si;W.prototype.ServerValue=W.prototype.Hf;
    W.prototype.Gf=X;W.prototype.INTERNAL=W.prototype.Gf;md&&md.ug&&md.ug(Z);Zd.Ee("sync",function(a){return new W(a)});Zd.Ee("auth",function(a){null==a.Pe&&(a.Pe=new N(a));return a.Pe});
    (function(a){a.auth=a.auth?a.auth:{};[{id:"password",name:"Wilddog",wb:"phoneOrEmail",bb:"password"},{id:"password",name:"Email",wb:"email",bb:"password"},{id:"qq",name:"QQ",wb:"accessToken",bb:"openId"},{id:"weibo",name:"Weibo",wb:"accessToken",bb:"openId"},{id:"weixin",name:"Weixin",wb:"accessToken",bb:"openId"},{id:"weixinmp",name:"Weixinmp",wb:"accessToken",bb:"openId"}].forEach(function(b){a.auth[b.name+"AuthProvider"]=function(){this.id=b.id;this.addScope=function(a){this.scope=a}};"Wilddog"==
    b.name?(a.auth.WilddogAuthProvider.emailCredential=function(a,d){var c={};c.provider=b.id;c.email=a;c[b.bb]=d;return c},a.auth.WilddogAuthProvider.phoneCredential=function(a,d){var c={};c.provider=b.id;c.phoneNumber=a;c[b.bb]=d;return c}):a.auth[b.name+"AuthProvider"].credential="Email"==b.name?function(a,d){x("wilddog.auth.EmailAuthProvider being deprecated. Please usewilddog.auth.WilddogAuthProvider instead.");var c={};c.provider=b.id;c[b.wb]=a;c[b.bb]=d;return c}:function(a,d){var c={};c.provider=
        b.id;c[b.wb]=a;c[b.bb]=d;return c}})})(Zd);if("WEB"==CLIENT_TYPE)"object"==typeof module&&module.exports&&(module.exports=Zd),"function"==typeof define&&define.amd&&define("wilddog",[],function(){return Zd}),"undefined"!=typeof window?window.wilddog=Zd:WorkerGlobalScope&&self&&(self.wilddog=Zd);else if("NODE"==CLIENT_TYPE||"WX"==CLIENT_TYPE||"RN"==CLIENT_TYPE)module.exports=Zd;
};ns.wrapper(ns.goog,ns.wd)})({goog:{},wd:{}})
