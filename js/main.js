/*!
 * jQuery JavaScript Library v3.3.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2018-01-20T17:24Z
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

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		type: true,
		src: true,
		noModule: true
	};

	function DOMEval( code, doc, node ) {
		doc = doc || document;

		var i,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {
				if ( node[ i ] ) {
					script[ i ] = node[ i ];
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.3.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

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
	if ( typeof target !== "object" && !isFunction( target ) ) {
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

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
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
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
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



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
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

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
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
							if ( isFunction( this[ match ] ) ) {
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
		} else if ( isFunction( selector ) ) {
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
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

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
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
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
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
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
									if ( isFunction( then ) ) {

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
								isFunction( onProgress ) ?
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
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
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

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
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
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

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
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
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


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
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
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
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
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

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
								name = camelCase( name.slice( 5 ) );
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
	var adjusted, scale,
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

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
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

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



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
			if ( toType( elem ) === "object" ) {

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

			get: isFunction( hook ) ?
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

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
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
	this.timeStamp = src && src.timeStamp || Date.now();

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

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
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
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
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

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc, node );
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

var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		div.style.position = "absolute";
		scrollboxSizeVal = div.offsetWidth === 36 || "absolute";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableMarginLeftVal,
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

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
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
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

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

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5
		) );
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),
		val = curCSS( elem, dimension, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox;

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = valueIsBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ dimension ] );

	// Fall back to offsetWidth/offsetHeight when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	// Support: Android <=4.1 - 4.3 only
	// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
	if ( val === "auto" ||
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) {

		val = elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ];

		// offsetWidth/offsetHeight provide border-box values
		valueIsBorderBox = true;
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
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
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
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
			origName = camelCase( name ),
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

jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
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
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),
				isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra && boxModelAdjustment(
					elem,
					dimension,
					extra,
					isBorderBox,
					styles
				);

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && support.scrollboxSize() === styles.position ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
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

	if ( prefix !== "margin" ) {
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
	return ( fxNow = Date.now() );
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

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
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
		name = camelCase( index );
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
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
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
		if ( isFunction( props ) ) {
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
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
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
		if ( isFunction( opt.old ) ) {
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

	fxNow = Date.now();

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
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
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

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
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
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

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
		var hooks, ret, valueIsFunction,
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

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
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


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

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
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

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
			lastElement = cur;
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
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

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

var nonce = Date.now();

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

	} else if ( !traditional && toType( obj ) === "object" ) {

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
			var value = isFunction( valueOrFunction ) ?
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

		if ( isFunction( func ) ) {

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

			// Support: IE <=8 - 11, Edge 12 - 15
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

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
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
		if ( isFunction( data ) ) {
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
			if ( isFunction( html ) ) {
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
		if ( isFunction( html ) ) {
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
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
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
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

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
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

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
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
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
			if ( responseContainer && isFunction( overwritten ) ) {
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
	if ( isFunction( params ) ) {

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

		if ( isFunction( options ) ) {

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

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
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

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
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
			if ( isWindow( elem ) ) {
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

				if ( isWindow( elem ) ) {

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
	}
} );

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
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
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};




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
data.projects.forEach(function(item, index) {
    var active = '';
    if (item.favorite) {
        if (index === 0 ) {
            active = 'active';
        }
        $('#images').append('<div class="slide '+ active +'" data-url="' + item.backgroundImage + '"' +
            ' data-title="' + item.title + '" data-cat="' + item.subtitle + '"' +
            ' data-perma="' + item.link + '"></div>');
    }
});

/**
 * Owl Carousel v2.3.4
 * Copyright 2013-2018 David Deutsch
 * Licensed under: SEE LICENSE IN https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE
 */
!function(a,b,c,d){function e(b,c){this.settings=null,this.options=a.extend({},e.Defaults,c),this.$element=a(b),this._handlers={},this._plugins={},this._supress={},this._current=null,this._speed=null,this._coordinates=[],this._breakpoint=null,this._width=null,this._items=[],this._clones=[],this._mergers=[],this._widths=[],this._invalidated={},this._pipe=[],this._drag={time:null,target:null,pointer:null,stage:{start:null,current:null},direction:null},this._states={current:{},tags:{initializing:["busy"],animating:["busy"],dragging:["interacting"]}},a.each(["onResize","onThrottledResize"],a.proxy(function(b,c){this._handlers[c]=a.proxy(this[c],this)},this)),a.each(e.Plugins,a.proxy(function(a,b){this._plugins[a.charAt(0).toLowerCase()+a.slice(1)]=new b(this)},this)),a.each(e.Workers,a.proxy(function(b,c){this._pipe.push({filter:c.filter,run:a.proxy(c.run,this)})},this)),this.setup(),this.initialize()}e.Defaults={items:3,loop:!1,center:!1,rewind:!1,checkVisibility:!0,mouseDrag:!0,touchDrag:!0,pullDrag:!0,freeDrag:!1,margin:0,stagePadding:0,merge:!1,mergeFit:!0,autoWidth:!1,startPosition:0,rtl:!1,smartSpeed:250,fluidSpeed:!1,dragEndSpeed:!1,responsive:{},responsiveRefreshRate:200,responsiveBaseElement:b,fallbackEasing:"swing",slideTransition:"",info:!1,nestedItemSelector:!1,itemElement:"div",stageElement:"div",refreshClass:"owl-refresh",loadedClass:"owl-loaded",loadingClass:"owl-loading",rtlClass:"owl-rtl",responsiveClass:"owl-responsive",dragClass:"owl-drag",itemClass:"owl-item",stageClass:"owl-stage",stageOuterClass:"owl-stage-outer",grabClass:"owl-grab"},e.Width={Default:"default",Inner:"inner",Outer:"outer"},e.Type={Event:"event",State:"state"},e.Plugins={},e.Workers=[{filter:["width","settings"],run:function(){this._width=this.$element.width()}},{filter:["width","items","settings"],run:function(a){a.current=this._items&&this._items[this.relative(this._current)]}},{filter:["items","settings"],run:function(){this.$stage.children(".cloned").remove()}},{filter:["width","items","settings"],run:function(a){var b=this.settings.margin||"",c=!this.settings.autoWidth,d=this.settings.rtl,e={width:"auto","margin-left":d?b:"","margin-right":d?"":b};!c&&this.$stage.children().css(e),a.css=e}},{filter:["width","items","settings"],run:function(a){var b=(this.width()/this.settings.items).toFixed(3)-this.settings.margin,c=null,d=this._items.length,e=!this.settings.autoWidth,f=[];for(a.items={merge:!1,width:b};d--;)c=this._mergers[d],c=this.settings.mergeFit&&Math.min(c,this.settings.items)||c,a.items.merge=c>1||a.items.merge,f[d]=e?b*c:this._items[d].width();this._widths=f}},{filter:["items","settings"],run:function(){var b=[],c=this._items,d=this.settings,e=Math.max(2*d.items,4),f=2*Math.ceil(c.length/2),g=d.loop&&c.length?d.rewind?e:Math.max(e,f):0,h="",i="";for(g/=2;g>0;)b.push(this.normalize(b.length/2,!0)),h+=c[b[b.length-1]][0].outerHTML,b.push(this.normalize(c.length-1-(b.length-1)/2,!0)),i=c[b[b.length-1]][0].outerHTML+i,g-=1;this._clones=b,a(h).addClass("cloned").appendTo(this.$stage),a(i).addClass("cloned").prependTo(this.$stage)}},{filter:["width","items","settings"],run:function(){for(var a=this.settings.rtl?1:-1,b=this._clones.length+this._items.length,c=-1,d=0,e=0,f=[];++c<b;)d=f[c-1]||0,e=this._widths[this.relative(c)]+this.settings.margin,f.push(d+e*a);this._coordinates=f}},{filter:["width","items","settings"],run:function(){var a=this.settings.stagePadding,b=this._coordinates,c={width:Math.ceil(Math.abs(b[b.length-1]))+2*a,"padding-left":a||"","padding-right":a||""};this.$stage.css(c)}},{filter:["width","items","settings"],run:function(a){var b=this._coordinates.length,c=!this.settings.autoWidth,d=this.$stage.children();if(c&&a.items.merge)for(;b--;)a.css.width=this._widths[this.relative(b)],d.eq(b).css(a.css);else c&&(a.css.width=a.items.width,d.css(a.css))}},{filter:["items"],run:function(){this._coordinates.length<1&&this.$stage.removeAttr("style")}},{filter:["width","items","settings"],run:function(a){a.current=a.current?this.$stage.children().index(a.current):0,a.current=Math.max(this.minimum(),Math.min(this.maximum(),a.current)),this.reset(a.current)}},{filter:["position"],run:function(){this.animate(this.coordinates(this._current))}},{filter:["width","position","items","settings"],run:function(){var a,b,c,d,e=this.settings.rtl?1:-1,f=2*this.settings.stagePadding,g=this.coordinates(this.current())+f,h=g+this.width()*e,i=[];for(c=0,d=this._coordinates.length;c<d;c++)a=this._coordinates[c-1]||0,b=Math.abs(this._coordinates[c])+f*e,(this.op(a,"<=",g)&&this.op(a,">",h)||this.op(b,"<",g)&&this.op(b,">",h))&&i.push(c);this.$stage.children(".active").removeClass("active"),this.$stage.children(":eq("+i.join("), :eq(")+")").addClass("active"),this.$stage.children(".center").removeClass("center"),this.settings.center&&this.$stage.children().eq(this.current()).addClass("center")}}],e.prototype.initializeStage=function(){this.$stage=this.$element.find("."+this.settings.stageClass),this.$stage.length||(this.$element.addClass(this.options.loadingClass),this.$stage=a("<"+this.settings.stageElement+">",{class:this.settings.stageClass}).wrap(a("<div/>",{class:this.settings.stageOuterClass})),this.$element.append(this.$stage.parent()))},e.prototype.initializeItems=function(){var b=this.$element.find(".owl-item");if(b.length)return this._items=b.get().map(function(b){return a(b)}),this._mergers=this._items.map(function(){return 1}),void this.refresh();this.replace(this.$element.children().not(this.$stage.parent())),this.isVisible()?this.refresh():this.invalidate("width"),this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass)},e.prototype.initialize=function(){if(this.enter("initializing"),this.trigger("initialize"),this.$element.toggleClass(this.settings.rtlClass,this.settings.rtl),this.settings.autoWidth&&!this.is("pre-loading")){var a,b,c;a=this.$element.find("img"),b=this.settings.nestedItemSelector?"."+this.settings.nestedItemSelector:d,c=this.$element.children(b).width(),a.length&&c<=0&&this.preloadAutoWidthImages(a)}this.initializeStage(),this.initializeItems(),this.registerEventHandlers(),this.leave("initializing"),this.trigger("initialized")},e.prototype.isVisible=function(){return!this.settings.checkVisibility||this.$element.is(":visible")},e.prototype.setup=function(){var b=this.viewport(),c=this.options.responsive,d=-1,e=null;c?(a.each(c,function(a){a<=b&&a>d&&(d=Number(a))}),e=a.extend({},this.options,c[d]),"function"==typeof e.stagePadding&&(e.stagePadding=e.stagePadding()),delete e.responsive,e.responsiveClass&&this.$element.attr("class",this.$element.attr("class").replace(new RegExp("("+this.options.responsiveClass+"-)\\S+\\s","g"),"$1"+d))):e=a.extend({},this.options),this.trigger("change",{property:{name:"settings",value:e}}),this._breakpoint=d,this.settings=e,this.invalidate("settings"),this.trigger("changed",{property:{name:"settings",value:this.settings}})},e.prototype.optionsLogic=function(){this.settings.autoWidth&&(this.settings.stagePadding=!1,this.settings.merge=!1)},e.prototype.prepare=function(b){var c=this.trigger("prepare",{content:b});return c.data||(c.data=a("<"+this.settings.itemElement+"/>").addClass(this.options.itemClass).append(b)),this.trigger("prepared",{content:c.data}),c.data},e.prototype.update=function(){for(var b=0,c=this._pipe.length,d=a.proxy(function(a){return this[a]},this._invalidated),e={};b<c;)(this._invalidated.all||a.grep(this._pipe[b].filter,d).length>0)&&this._pipe[b].run(e),b++;this._invalidated={},!this.is("valid")&&this.enter("valid")},e.prototype.width=function(a){switch(a=a||e.Width.Default){case e.Width.Inner:case e.Width.Outer:return this._width;default:return this._width-2*this.settings.stagePadding+this.settings.margin}},e.prototype.refresh=function(){this.enter("refreshing"),this.trigger("refresh"),this.setup(),this.optionsLogic(),this.$element.addClass(this.options.refreshClass),this.update(),this.$element.removeClass(this.options.refreshClass),this.leave("refreshing"),this.trigger("refreshed")},e.prototype.onThrottledResize=function(){b.clearTimeout(this.resizeTimer),this.resizeTimer=b.setTimeout(this._handlers.onResize,this.settings.responsiveRefreshRate)},e.prototype.onResize=function(){return!!this._items.length&&(this._width!==this.$element.width()&&(!!this.isVisible()&&(this.enter("resizing"),this.trigger("resize").isDefaultPrevented()?(this.leave("resizing"),!1):(this.invalidate("width"),this.refresh(),this.leave("resizing"),void this.trigger("resized")))))},e.prototype.registerEventHandlers=function(){a.support.transition&&this.$stage.on(a.support.transition.end+".owl.core",a.proxy(this.onTransitionEnd,this)),!1!==this.settings.responsive&&this.on(b,"resize",this._handlers.onThrottledResize),this.settings.mouseDrag&&(this.$element.addClass(this.options.dragClass),this.$stage.on("mousedown.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("dragstart.owl.core selectstart.owl.core",function(){return!1})),this.settings.touchDrag&&(this.$stage.on("touchstart.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("touchcancel.owl.core",a.proxy(this.onDragEnd,this)))},e.prototype.onDragStart=function(b){var d=null;3!==b.which&&(a.support.transform?(d=this.$stage.css("transform").replace(/.*\(|\)| /g,"").split(","),d={x:d[16===d.length?12:4],y:d[16===d.length?13:5]}):(d=this.$stage.position(),d={x:this.settings.rtl?d.left+this.$stage.width()-this.width()+this.settings.margin:d.left,y:d.top}),this.is("animating")&&(a.support.transform?this.animate(d.x):this.$stage.stop(),this.invalidate("position")),this.$element.toggleClass(this.options.grabClass,"mousedown"===b.type),this.speed(0),this._drag.time=(new Date).getTime(),this._drag.target=a(b.target),this._drag.stage.start=d,this._drag.stage.current=d,this._drag.pointer=this.pointer(b),a(c).on("mouseup.owl.core touchend.owl.core",a.proxy(this.onDragEnd,this)),a(c).one("mousemove.owl.core touchmove.owl.core",a.proxy(function(b){var d=this.difference(this._drag.pointer,this.pointer(b));a(c).on("mousemove.owl.core touchmove.owl.core",a.proxy(this.onDragMove,this)),Math.abs(d.x)<Math.abs(d.y)&&this.is("valid")||(b.preventDefault(),this.enter("dragging"),this.trigger("drag"))},this)))},e.prototype.onDragMove=function(a){var b=null,c=null,d=null,e=this.difference(this._drag.pointer,this.pointer(a)),f=this.difference(this._drag.stage.start,e);this.is("dragging")&&(a.preventDefault(),this.settings.loop?(b=this.coordinates(this.minimum()),c=this.coordinates(this.maximum()+1)-b,f.x=((f.x-b)%c+c)%c+b):(b=this.settings.rtl?this.coordinates(this.maximum()):this.coordinates(this.minimum()),c=this.settings.rtl?this.coordinates(this.minimum()):this.coordinates(this.maximum()),d=this.settings.pullDrag?-1*e.x/5:0,f.x=Math.max(Math.min(f.x,b+d),c+d)),this._drag.stage.current=f,this.animate(f.x))},e.prototype.onDragEnd=function(b){var d=this.difference(this._drag.pointer,this.pointer(b)),e=this._drag.stage.current,f=d.x>0^this.settings.rtl?"left":"right";a(c).off(".owl.core"),this.$element.removeClass(this.options.grabClass),(0!==d.x&&this.is("dragging")||!this.is("valid"))&&(this.speed(this.settings.dragEndSpeed||this.settings.smartSpeed),this.current(this.closest(e.x,0!==d.x?f:this._drag.direction)),this.invalidate("position"),this.update(),this._drag.direction=f,(Math.abs(d.x)>3||(new Date).getTime()-this._drag.time>300)&&this._drag.target.one("click.owl.core",function(){return!1})),this.is("dragging")&&(this.leave("dragging"),this.trigger("dragged"))},e.prototype.closest=function(b,c){var e=-1,f=30,g=this.width(),h=this.coordinates();return this.settings.freeDrag||a.each(h,a.proxy(function(a,i){return"left"===c&&b>i-f&&b<i+f?e=a:"right"===c&&b>i-g-f&&b<i-g+f?e=a+1:this.op(b,"<",i)&&this.op(b,">",h[a+1]!==d?h[a+1]:i-g)&&(e="left"===c?a+1:a),-1===e},this)),this.settings.loop||(this.op(b,">",h[this.minimum()])?e=b=this.minimum():this.op(b,"<",h[this.maximum()])&&(e=b=this.maximum())),e},e.prototype.animate=function(b){var c=this.speed()>0;this.is("animating")&&this.onTransitionEnd(),c&&(this.enter("animating"),this.trigger("translate")),a.support.transform3d&&a.support.transition?this.$stage.css({transform:"translate3d("+b+"px,0px,0px)",transition:this.speed()/1e3+"s"+(this.settings.slideTransition?" "+this.settings.slideTransition:"")}):c?this.$stage.animate({left:b+"px"},this.speed(),this.settings.fallbackEasing,a.proxy(this.onTransitionEnd,this)):this.$stage.css({left:b+"px"})},e.prototype.is=function(a){return this._states.current[a]&&this._states.current[a]>0},e.prototype.current=function(a){if(a===d)return this._current;if(0===this._items.length)return d;if(a=this.normalize(a),this._current!==a){var b=this.trigger("change",{property:{name:"position",value:a}});b.data!==d&&(a=this.normalize(b.data)),this._current=a,this.invalidate("position"),this.trigger("changed",{property:{name:"position",value:this._current}})}return this._current},e.prototype.invalidate=function(b){return"string"===a.type(b)&&(this._invalidated[b]=!0,this.is("valid")&&this.leave("valid")),a.map(this._invalidated,function(a,b){return b})},e.prototype.reset=function(a){(a=this.normalize(a))!==d&&(this._speed=0,this._current=a,this.suppress(["translate","translated"]),this.animate(this.coordinates(a)),this.release(["translate","translated"]))},e.prototype.normalize=function(a,b){var c=this._items.length,e=b?0:this._clones.length;return!this.isNumeric(a)||c<1?a=d:(a<0||a>=c+e)&&(a=((a-e/2)%c+c)%c+e/2),a},e.prototype.relative=function(a){return a-=this._clones.length/2,this.normalize(a,!0)},e.prototype.maximum=function(a){var b,c,d,e=this.settings,f=this._coordinates.length;if(e.loop)f=this._clones.length/2+this._items.length-1;else if(e.autoWidth||e.merge){if(b=this._items.length)for(c=this._items[--b].width(),d=this.$element.width();b--&&!((c+=this._items[b].width()+this.settings.margin)>d););f=b+1}else f=e.center?this._items.length-1:this._items.length-e.items;return a&&(f-=this._clones.length/2),Math.max(f,0)},e.prototype.minimum=function(a){return a?0:this._clones.length/2},e.prototype.items=function(a){return a===d?this._items.slice():(a=this.normalize(a,!0),this._items[a])},e.prototype.mergers=function(a){return a===d?this._mergers.slice():(a=this.normalize(a,!0),this._mergers[a])},e.prototype.clones=function(b){var c=this._clones.length/2,e=c+this._items.length,f=function(a){return a%2==0?e+a/2:c-(a+1)/2};return b===d?a.map(this._clones,function(a,b){return f(b)}):a.map(this._clones,function(a,c){return a===b?f(c):null})},e.prototype.speed=function(a){return a!==d&&(this._speed=a),this._speed},e.prototype.coordinates=function(b){var c,e=1,f=b-1;return b===d?a.map(this._coordinates,a.proxy(function(a,b){return this.coordinates(b)},this)):(this.settings.center?(this.settings.rtl&&(e=-1,f=b+1),c=this._coordinates[b],c+=(this.width()-c+(this._coordinates[f]||0))/2*e):c=this._coordinates[f]||0,c=Math.ceil(c))},e.prototype.duration=function(a,b,c){return 0===c?0:Math.min(Math.max(Math.abs(b-a),1),6)*Math.abs(c||this.settings.smartSpeed)},e.prototype.to=function(a,b){var c=this.current(),d=null,e=a-this.relative(c),f=(e>0)-(e<0),g=this._items.length,h=this.minimum(),i=this.maximum();this.settings.loop?(!this.settings.rewind&&Math.abs(e)>g/2&&(e+=-1*f*g),a=c+e,(d=((a-h)%g+g)%g+h)!==a&&d-e<=i&&d-e>0&&(c=d-e,a=d,this.reset(c))):this.settings.rewind?(i+=1,a=(a%i+i)%i):a=Math.max(h,Math.min(i,a)),this.speed(this.duration(c,a,b)),this.current(a),this.isVisible()&&this.update()},e.prototype.next=function(a){a=a||!1,this.to(this.relative(this.current())+1,a)},e.prototype.prev=function(a){a=a||!1,this.to(this.relative(this.current())-1,a)},e.prototype.onTransitionEnd=function(a){if(a!==d&&(a.stopPropagation(),(a.target||a.srcElement||a.originalTarget)!==this.$stage.get(0)))return!1;this.leave("animating"),this.trigger("translated")},e.prototype.viewport=function(){var d;return this.options.responsiveBaseElement!==b?d=a(this.options.responsiveBaseElement).width():b.innerWidth?d=b.innerWidth:c.documentElement&&c.documentElement.clientWidth?d=c.documentElement.clientWidth:console.warn("Can not detect viewport width."),d},e.prototype.replace=function(b){this.$stage.empty(),this._items=[],b&&(b=b instanceof jQuery?b:a(b)),this.settings.nestedItemSelector&&(b=b.find("."+this.settings.nestedItemSelector)),b.filter(function(){return 1===this.nodeType}).each(a.proxy(function(a,b){b=this.prepare(b),this.$stage.append(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)},this)),this.reset(this.isNumeric(this.settings.startPosition)?this.settings.startPosition:0),this.invalidate("items")},e.prototype.add=function(b,c){var e=this.relative(this._current);c=c===d?this._items.length:this.normalize(c,!0),b=b instanceof jQuery?b:a(b),this.trigger("add",{content:b,position:c}),b=this.prepare(b),0===this._items.length||c===this._items.length?(0===this._items.length&&this.$stage.append(b),0!==this._items.length&&this._items[c-1].after(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)):(this._items[c].before(b),this._items.splice(c,0,b),this._mergers.splice(c,0,1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)),this._items[e]&&this.reset(this._items[e].index()),this.invalidate("items"),this.trigger("added",{content:b,position:c})},e.prototype.remove=function(a){(a=this.normalize(a,!0))!==d&&(this.trigger("remove",{content:this._items[a],position:a}),this._items[a].remove(),this._items.splice(a,1),this._mergers.splice(a,1),this.invalidate("items"),this.trigger("removed",{content:null,position:a}))},e.prototype.preloadAutoWidthImages=function(b){b.each(a.proxy(function(b,c){this.enter("pre-loading"),c=a(c),a(new Image).one("load",a.proxy(function(a){c.attr("src",a.target.src),c.css("opacity",1),this.leave("pre-loading"),!this.is("pre-loading")&&!this.is("initializing")&&this.refresh()},this)).attr("src",c.attr("src")||c.attr("data-src")||c.attr("data-src-retina"))},this))},e.prototype.destroy=function(){this.$element.off(".owl.core"),this.$stage.off(".owl.core"),a(c).off(".owl.core"),!1!==this.settings.responsive&&(b.clearTimeout(this.resizeTimer),this.off(b,"resize",this._handlers.onThrottledResize));for(var d in this._plugins)this._plugins[d].destroy();this.$stage.children(".cloned").remove(),this.$stage.unwrap(),this.$stage.children().contents().unwrap(),this.$stage.children().unwrap(),this.$stage.remove(),this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class",this.$element.attr("class").replace(new RegExp(this.options.responsiveClass+"-\\S+\\s","g"),"")).removeData("owl.carousel")},e.prototype.op=function(a,b,c){var d=this.settings.rtl;switch(b){case"<":return d?a>c:a<c;case">":return d?a<c:a>c;case">=":return d?a<=c:a>=c;case"<=":return d?a>=c:a<=c}},e.prototype.on=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d):a.attachEvent&&a.attachEvent("on"+b,c)},e.prototype.off=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,d):a.detachEvent&&a.detachEvent("on"+b,c)},e.prototype.trigger=function(b,c,d,f,g){var h={item:{count:this._items.length,index:this.current()}},i=a.camelCase(a.grep(["on",b,d],function(a){return a}).join("-").toLowerCase()),j=a.Event([b,"owl",d||"carousel"].join(".").toLowerCase(),a.extend({relatedTarget:this},h,c));return this._supress[b]||(a.each(this._plugins,function(a,b){b.onTrigger&&b.onTrigger(j)}),this.register({type:e.Type.Event,name:b}),this.$element.trigger(j),this.settings&&"function"==typeof this.settings[i]&&this.settings[i].call(this,j)),j},e.prototype.enter=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]===d&&(this._states.current[b]=0),this._states.current[b]++},this))},e.prototype.leave=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]--},this))},e.prototype.register=function(b){if(b.type===e.Type.Event){if(a.event.special[b.name]||(a.event.special[b.name]={}),!a.event.special[b.name].owl){var c=a.event.special[b.name]._default;a.event.special[b.name]._default=function(a){return!c||!c.apply||a.namespace&&-1!==a.namespace.indexOf("owl")?a.namespace&&a.namespace.indexOf("owl")>-1:c.apply(this,arguments)},a.event.special[b.name].owl=!0}}else b.type===e.Type.State&&(this._states.tags[b.name]?this._states.tags[b.name]=this._states.tags[b.name].concat(b.tags):this._states.tags[b.name]=b.tags,this._states.tags[b.name]=a.grep(this._states.tags[b.name],a.proxy(function(c,d){return a.inArray(c,this._states.tags[b.name])===d},this)))},e.prototype.suppress=function(b){a.each(b,a.proxy(function(a,b){this._supress[b]=!0},this))},e.prototype.release=function(b){a.each(b,a.proxy(function(a,b){delete this._supress[b]},this))},e.prototype.pointer=function(a){var c={x:null,y:null};return a=a.originalEvent||a||b.event,a=a.touches&&a.touches.length?a.touches[0]:a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:a,a.pageX?(c.x=a.pageX,c.y=a.pageY):(c.x=a.clientX,c.y=a.clientY),c},e.prototype.isNumeric=function(a){return!isNaN(parseFloat(a))},e.prototype.difference=function(a,b){return{x:a.x-b.x,y:a.y-b.y}},a.fn.owlCarousel=function(b){var c=Array.prototype.slice.call(arguments,1);return this.each(function(){var d=a(this),f=d.data("owl.carousel");f||(f=new e(this,"object"==typeof b&&b),d.data("owl.carousel",f),a.each(["next","prev","to","destroy","refresh","replace","add","remove"],function(b,c){f.register({type:e.Type.Event,name:c}),f.$element.on(c+".owl.carousel.core",a.proxy(function(a){a.namespace&&a.relatedTarget!==this&&(this.suppress([c]),f[c].apply(this,[].slice.call(arguments,1)),this.release([c]))},f))})),"string"==typeof b&&"_"!==b.charAt(0)&&f[b].apply(f,c)})},a.fn.owlCarousel.Constructor=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._interval=null,this._visible=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoRefresh&&this.watch()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={autoRefresh:!0,autoRefreshInterval:500},e.prototype.watch=function(){this._interval||(this._visible=this._core.isVisible(),this._interval=b.setInterval(a.proxy(this.refresh,this),this._core.settings.autoRefreshInterval))},e.prototype.refresh=function(){this._core.isVisible()!==this._visible&&(this._visible=!this._visible,this._core.$element.toggleClass("owl-hidden",!this._visible),this._visible&&this._core.invalidate("width")&&this._core.refresh())},e.prototype.destroy=function(){var a,c;b.clearInterval(this._interval);for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoRefresh=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._loaded=[],this._handlers={"initialized.owl.carousel change.owl.carousel resized.owl.carousel":a.proxy(function(b){if(b.namespace&&this._core.settings&&this._core.settings.lazyLoad&&(b.property&&"position"==b.property.name||"initialized"==b.type)){var c=this._core.settings,e=c.center&&Math.ceil(c.items/2)||c.items,f=c.center&&-1*e||0,g=(b.property&&b.property.value!==d?b.property.value:this._core.current())+f,h=this._core.clones().length,i=a.proxy(function(a,b){this.load(b)},this);for(c.lazyLoadEager>0&&(e+=c.lazyLoadEager,c.loop&&(g-=c.lazyLoadEager,e++));f++<e;)this.load(h/2+this._core.relative(g)),h&&a.each(this._core.clones(this._core.relative(g)),i),g++}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={lazyLoad:!1,lazyLoadEager:0},e.prototype.load=function(c){var d=this._core.$stage.children().eq(c),e=d&&d.find(".owl-lazy");!e||a.inArray(d.get(0),this._loaded)>-1||(e.each(a.proxy(function(c,d){var e,f=a(d),g=b.devicePixelRatio>1&&f.attr("data-src-retina")||f.attr("data-src")||f.attr("data-srcset");this._core.trigger("load",{element:f,url:g},"lazy"),f.is("img")?f.one("load.owl.lazy",a.proxy(function(){f.css("opacity",1),this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("src",g):f.is("source")?f.one("load.owl.lazy",a.proxy(function(){this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("srcset",g):(e=new Image,e.onload=a.proxy(function(){f.css({"background-image":'url("'+g+'")',opacity:"1"}),this._core.trigger("loaded",{element:f,url:g},"lazy")},this),e.src=g)},this)),this._loaded.push(d.get(0)))},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this._core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Lazy=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(c){this._core=c,this._previousHeight=null,this._handlers={"initialized.owl.carousel refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&this.update()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&"position"===a.property.name&&this.update()},this),"loaded.owl.lazy":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&a.element.closest("."+this._core.settings.itemClass).index()===this._core.current()&&this.update()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers),this._intervalId=null;var d=this;a(b).on("load",function(){d._core.settings.autoHeight&&d.update()}),a(b).resize(function(){d._core.settings.autoHeight&&(null!=d._intervalId&&clearTimeout(d._intervalId),d._intervalId=setTimeout(function(){d.update()},250))})};e.Defaults={autoHeight:!1,autoHeightClass:"owl-height"},e.prototype.update=function(){var b=this._core._current,c=b+this._core.settings.items,d=this._core.settings.lazyLoad,e=this._core.$stage.children().toArray().slice(b,c),f=[],g=0;a.each(e,function(b,c){f.push(a(c).height())}),g=Math.max.apply(null,f),g<=1&&d&&this._previousHeight&&(g=this._previousHeight),this._previousHeight=g,this._core.$stage.parent().height(g).addClass(this._core.settings.autoHeightClass)},e.prototype.destroy=function(){var a,b;for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoHeight=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._videos={},this._playing=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.register({type:"state",name:"playing",tags:["interacting"]})},this),"resize.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.video&&this.isInFullScreen()&&a.preventDefault()},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.is("resizing")&&this._core.$stage.find(".cloned .owl-video-frame").remove()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"===a.property.name&&this._playing&&this.stop()},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find(".owl-video");c.length&&(c.css("display","none"),this.fetch(c,a(b.content)))}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers),this._core.$element.on("click.owl.video",".owl-video-play-icon",a.proxy(function(a){this.play(a)},this))};e.Defaults={video:!1,videoHeight:!1,videoWidth:!1},e.prototype.fetch=function(a,b){var c=function(){return a.attr("data-vimeo-id")?"vimeo":a.attr("data-vzaar-id")?"vzaar":"youtube"}(),d=a.attr("data-vimeo-id")||a.attr("data-youtube-id")||a.attr("data-vzaar-id"),e=a.attr("data-width")||this._core.settings.videoWidth,f=a.attr("data-height")||this._core.settings.videoHeight,g=a.attr("href");if(!g)throw new Error("Missing video URL.");if(d=g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),d[3].indexOf("youtu")>-1)c="youtube";else if(d[3].indexOf("vimeo")>-1)c="vimeo";else{if(!(d[3].indexOf("vzaar")>-1))throw new Error("Video URL not supported.");c="vzaar"}d=d[6],this._videos[g]={type:c,id:d,width:e,height:f},b.attr("data-video",g),this.thumbnail(a,this._videos[g])},e.prototype.thumbnail=function(b,c){var d,e,f,g=c.width&&c.height?"width:"+c.width+"px;height:"+c.height+"px;":"",h=b.find("img"),i="src",j="",k=this._core.settings,l=function(c){e='<div class="owl-video-play-icon"></div>',d=k.lazyLoad?a("<div/>",{class:"owl-video-tn "+j,srcType:c}):a("<div/>",{class:"owl-video-tn",style:"opacity:1;background-image:url("+c+")"}),b.after(d),b.after(e)};if(b.wrap(a("<div/>",{class:"owl-video-wrapper",style:g})),this._core.settings.lazyLoad&&(i="data-src",j="owl-lazy"),h.length)return l(h.attr(i)),h.remove(),!1;"youtube"===c.type?(f="//img.youtube.com/vi/"+c.id+"/hqdefault.jpg",l(f)):"vimeo"===c.type?a.ajax({type:"GET",url:"//vimeo.com/api/v2/video/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a[0].thumbnail_large,l(f)}}):"vzaar"===c.type&&a.ajax({type:"GET",url:"//vzaar.com/api/videos/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a.framegrab_url,l(f)}})},e.prototype.stop=function(){this._core.trigger("stop",null,"video"),this._playing.find(".owl-video-frame").remove(),this._playing.removeClass("owl-video-playing"),this._playing=null,this._core.leave("playing"),this._core.trigger("stopped",null,"video")},e.prototype.play=function(b){var c,d=a(b.target),e=d.closest("."+this._core.settings.itemClass),f=this._videos[e.attr("data-video")],g=f.width||"100%",h=f.height||this._core.$stage.height();this._playing||(this._core.enter("playing"),this._core.trigger("play",null,"video"),e=this._core.items(this._core.relative(e.index())),this._core.reset(e.index()),c=a('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>'),c.attr("height",h),c.attr("width",g),"youtube"===f.type?c.attr("src","//www.youtube.com/embed/"+f.id+"?autoplay=1&rel=0&v="+f.id):"vimeo"===f.type?c.attr("src","//player.vimeo.com/video/"+f.id+"?autoplay=1"):"vzaar"===f.type&&c.attr("src","//view.vzaar.com/"+f.id+"/player?autoplay=true"),a(c).wrap('<div class="owl-video-frame" />').insertAfter(e.find(".owl-video")),this._playing=e.addClass("owl-video-playing"))},e.prototype.isInFullScreen=function(){var b=c.fullscreenElement||c.mozFullScreenElement||c.webkitFullscreenElement;return b&&a(b).parent().hasClass("owl-video-frame")},e.prototype.destroy=function(){var a,b;this._core.$element.off("click.owl.video");for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Video=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this.core=b,this.core.options=a.extend({},e.Defaults,this.core.options),this.swapping=!0,this.previous=d,this.next=d,this.handlers={"change.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&(this.previous=this.core.current(),this.next=a.property.value)},this),"drag.owl.carousel dragged.owl.carousel translated.owl.carousel":a.proxy(function(a){a.namespace&&(this.swapping="translated"==a.type)},this),"translate.owl.carousel":a.proxy(function(a){a.namespace&&this.swapping&&(this.core.options.animateOut||this.core.options.animateIn)&&this.swap()},this)},this.core.$element.on(this.handlers)};e.Defaults={animateOut:!1,
animateIn:!1},e.prototype.swap=function(){if(1===this.core.settings.items&&a.support.animation&&a.support.transition){this.core.speed(0);var b,c=a.proxy(this.clear,this),d=this.core.$stage.children().eq(this.previous),e=this.core.$stage.children().eq(this.next),f=this.core.settings.animateIn,g=this.core.settings.animateOut;this.core.current()!==this.previous&&(g&&(b=this.core.coordinates(this.previous)-this.core.coordinates(this.next),d.one(a.support.animation.end,c).css({left:b+"px"}).addClass("animated owl-animated-out").addClass(g)),f&&e.one(a.support.animation.end,c).addClass("animated owl-animated-in").addClass(f))}},e.prototype.clear=function(b){a(b.target).css({left:""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),this.core.onTransitionEnd()},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this.core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Animate=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._call=null,this._time=0,this._timeout=0,this._paused=!0,this._handlers={"changed.owl.carousel":a.proxy(function(a){a.namespace&&"settings"===a.property.name?this._core.settings.autoplay?this.play():this.stop():a.namespace&&"position"===a.property.name&&this._paused&&(this._time=0)},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoplay&&this.play()},this),"play.owl.autoplay":a.proxy(function(a,b,c){a.namespace&&this.play(b,c)},this),"stop.owl.autoplay":a.proxy(function(a){a.namespace&&this.stop()},this),"mouseover.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"mouseleave.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.play()},this),"touchstart.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"touchend.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this.play()},this)},this._core.$element.on(this._handlers),this._core.options=a.extend({},e.Defaults,this._core.options)};e.Defaults={autoplay:!1,autoplayTimeout:5e3,autoplayHoverPause:!1,autoplaySpeed:!1},e.prototype._next=function(d){this._call=b.setTimeout(a.proxy(this._next,this,d),this._timeout*(Math.round(this.read()/this._timeout)+1)-this.read()),this._core.is("interacting")||c.hidden||this._core.next(d||this._core.settings.autoplaySpeed)},e.prototype.read=function(){return(new Date).getTime()-this._time},e.prototype.play=function(c,d){var e;this._core.is("rotating")||this._core.enter("rotating"),c=c||this._core.settings.autoplayTimeout,e=Math.min(this._time%(this._timeout||c),c),this._paused?(this._time=this.read(),this._paused=!1):b.clearTimeout(this._call),this._time+=this.read()%c-e,this._timeout=c,this._call=b.setTimeout(a.proxy(this._next,this,d),c-e)},e.prototype.stop=function(){this._core.is("rotating")&&(this._time=0,this._paused=!0,b.clearTimeout(this._call),this._core.leave("rotating"))},e.prototype.pause=function(){this._core.is("rotating")&&!this._paused&&(this._time=this.read(),this._paused=!0,b.clearTimeout(this._call))},e.prototype.destroy=function(){var a,b;this.stop();for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.autoplay=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(b){this._core=b,this._initialized=!1,this._pages=[],this._controls={},this._templates=[],this.$element=this._core.$element,this._overrides={next:this._core.next,prev:this._core.prev,to:this._core.to},this._handlers={"prepared.owl.carousel":a.proxy(function(b){b.namespace&&this._core.settings.dotsData&&this._templates.push('<div class="'+this._core.settings.dotClass+'">'+a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot")+"</div>")},this),"added.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,0,this._templates.pop())},this),"remove.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,1)},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&this.draw()},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&!this._initialized&&(this._core.trigger("initialize",null,"navigation"),this.initialize(),this.update(),this.draw(),this._initialized=!0,this._core.trigger("initialized",null,"navigation"))},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._initialized&&(this._core.trigger("refresh",null,"navigation"),this.update(),this.draw(),this._core.trigger("refreshed",null,"navigation"))},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers)};e.Defaults={nav:!1,navText:['<span aria-label="Previous">&#x2039;</span>','<span aria-label="Next">&#x203a;</span>'],navSpeed:!1,navElement:'button type="button" role="presentation"',navContainer:!1,navContainerClass:"owl-nav",navClass:["owl-prev","owl-next"],slideBy:1,dotClass:"owl-dot",dotsClass:"owl-dots",dots:!0,dotsEach:!1,dotsData:!1,dotsSpeed:!1,dotsContainer:!1},e.prototype.initialize=function(){var b,c=this._core.settings;this._controls.$relative=(c.navContainer?a(c.navContainer):a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"),this._controls.$previous=a("<"+c.navElement+">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click",a.proxy(function(a){this.prev(c.navSpeed)},this)),this._controls.$next=a("<"+c.navElement+">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click",a.proxy(function(a){this.next(c.navSpeed)},this)),c.dotsData||(this._templates=[a('<button role="button">').addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]),this._controls.$absolute=(c.dotsContainer?a(c.dotsContainer):a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"),this._controls.$absolute.on("click","button",a.proxy(function(b){var d=a(b.target).parent().is(this._controls.$absolute)?a(b.target).index():a(b.target).parent().index();b.preventDefault(),this.to(d,c.dotsSpeed)},this));for(b in this._overrides)this._core[b]=a.proxy(this[b],this)},e.prototype.destroy=function(){var a,b,c,d,e;e=this._core.settings;for(a in this._handlers)this.$element.off(a,this._handlers[a]);for(b in this._controls)"$relative"===b&&e.navContainer?this._controls[b].html(""):this._controls[b].remove();for(d in this.overides)this._core[d]=this._overrides[d];for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},e.prototype.update=function(){var a,b,c,d=this._core.clones().length/2,e=d+this._core.items().length,f=this._core.maximum(!0),g=this._core.settings,h=g.center||g.autoWidth||g.dotsData?1:g.dotsEach||g.items;if("page"!==g.slideBy&&(g.slideBy=Math.min(g.slideBy,g.items)),g.dots||"page"==g.slideBy)for(this._pages=[],a=d,b=0,c=0;a<e;a++){if(b>=h||0===b){if(this._pages.push({start:Math.min(f,a-d),end:a-d+h-1}),Math.min(f,a-d)===f)break;b=0,++c}b+=this._core.mergers(this._core.relative(a))}},e.prototype.draw=function(){var b,c=this._core.settings,d=this._core.items().length<=c.items,e=this._core.relative(this._core.current()),f=c.loop||c.rewind;this._controls.$relative.toggleClass("disabled",!c.nav||d),c.nav&&(this._controls.$previous.toggleClass("disabled",!f&&e<=this._core.minimum(!0)),this._controls.$next.toggleClass("disabled",!f&&e>=this._core.maximum(!0))),this._controls.$absolute.toggleClass("disabled",!c.dots||d),c.dots&&(b=this._pages.length-this._controls.$absolute.children().length,c.dotsData&&0!==b?this._controls.$absolute.html(this._templates.join("")):b>0?this._controls.$absolute.append(new Array(b+1).join(this._templates[0])):b<0&&this._controls.$absolute.children().slice(b).remove(),this._controls.$absolute.find(".active").removeClass("active"),this._controls.$absolute.children().eq(a.inArray(this.current(),this._pages)).addClass("active"))},e.prototype.onTrigger=function(b){var c=this._core.settings;b.page={index:a.inArray(this.current(),this._pages),count:this._pages.length,size:c&&(c.center||c.autoWidth||c.dotsData?1:c.dotsEach||c.items)}},e.prototype.current=function(){var b=this._core.relative(this._core.current());return a.grep(this._pages,a.proxy(function(a,c){return a.start<=b&&a.end>=b},this)).pop()},e.prototype.getPosition=function(b){var c,d,e=this._core.settings;return"page"==e.slideBy?(c=a.inArray(this.current(),this._pages),d=this._pages.length,b?++c:--c,c=this._pages[(c%d+d)%d].start):(c=this._core.relative(this._core.current()),d=this._core.items().length,b?c+=e.slideBy:c-=e.slideBy),c},e.prototype.next=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!0),b)},e.prototype.prev=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!1),b)},e.prototype.to=function(b,c,d){var e;!d&&this._pages.length?(e=this._pages.length,a.proxy(this._overrides.to,this._core)(this._pages[(b%e+e)%e].start,c)):a.proxy(this._overrides.to,this._core)(b,c)},a.fn.owlCarousel.Constructor.Plugins.Navigation=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(c){this._core=c,this._hashes={},this.$element=this._core.$element,this._handlers={"initialized.owl.carousel":a.proxy(function(c){c.namespace&&"URLHash"===this._core.settings.startPosition&&a(b).trigger("hashchange.owl.navigation")},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");if(!c)return;this._hashes[c]=b.content}},this),"changed.owl.carousel":a.proxy(function(c){if(c.namespace&&"position"===c.property.name){var d=this._core.items(this._core.relative(this._core.current())),e=a.map(this._hashes,function(a,b){return a===d?b:null}).join();if(!e||b.location.hash.slice(1)===e)return;b.location.hash=e}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers),a(b).on("hashchange.owl.navigation",a.proxy(function(a){var c=b.location.hash.substring(1),e=this._core.$stage.children(),f=this._hashes[c]&&e.index(this._hashes[c]);f!==d&&f!==this._core.current()&&this._core.to(this._core.relative(f),!1,!0)},this))};e.Defaults={URLhashListener:!1},e.prototype.destroy=function(){var c,d;a(b).off("hashchange.owl.navigation");for(c in this._handlers)this._core.$element.off(c,this._handlers[c]);for(d in Object.getOwnPropertyNames(this))"function"!=typeof this[d]&&(this[d]=null)},a.fn.owlCarousel.Constructor.Plugins.Hash=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){function e(b,c){var e=!1,f=b.charAt(0).toUpperCase()+b.slice(1);return a.each((b+" "+h.join(f+" ")+f).split(" "),function(a,b){if(g[b]!==d)return e=!c||b,!1}),e}function f(a){return e(a,!0)}var g=a("<support>").get(0).style,h="Webkit Moz O ms".split(" "),i={transition:{end:{WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"}},animation:{end:{WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd",animation:"animationend"}}},j={csstransforms:function(){return!!e("transform")},csstransforms3d:function(){return!!e("perspective")},csstransitions:function(){return!!e("transition")},cssanimations:function(){return!!e("animation")}};j.csstransitions()&&(a.support.transition=new String(f("transition")),a.support.transition.end=i.transition.end[a.support.transition]),j.cssanimations()&&(a.support.animation=new String(f("animation")),a.support.animation.end=i.animation.end[a.support.animation]),j.csstransforms()&&(a.support.transform=new String(f("transform")),a.support.transform3d=j.csstransforms3d())}(window.Zepto||window.jQuery,window,document);
/*!
 * VERSION: 1.16.0
 * DATE: 2015-03-01
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";_gsScope._gsDefine("TweenMax",["core.Animation","core.SimpleTimeline","TweenLite"],function(t,e,i){var r=function(t){var e,i=[],r=t.length;for(e=0;e!==r;i.push(t[e++]));return i},s=function(t,e,r){i.call(this,t,e,r),this._cycle=0,this._yoyo=!0===this.vars.yoyo,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._dirty=!0,this.render=s.prototype.render},n=1e-10,o=i._internals,a=o.isSelector,h=o.isArray,l=s.prototype=i.to({},.1,{}),u=[];s.version="1.16.0",l.constructor=s,l.kill()._gc=!1,s.killTweensOf=s.killDelayedCallsTo=i.killTweensOf,s.getTweensOf=i.getTweensOf,s.lagSmoothing=i.lagSmoothing,s.ticker=i.ticker,s.render=i.render,l.invalidate=function(){return this._yoyo=!0===this.vars.yoyo,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._uncache(!0),i.prototype.invalidate.call(this)},l.updateTo=function(t,e){var r,s=this.ratio,n=this.vars.immediateRender||t.immediateRender;e&&this._startTime<this._timeline._time&&(this._startTime=this._timeline._time,this._uncache(!1),this._gc?this._enabled(!0,!1):this._timeline.insert(this,this._startTime-this._delay));for(r in t)this.vars[r]=t[r];if(this._initted||n)if(e)this._initted=!1,n&&this.render(0,!0,!0);else if(this._gc&&this._enabled(!0,!1),this._notifyPluginsOfEnabled&&this._firstPT&&i._onPluginEvent("_onDisable",this),this._time/this._duration>.998){var o=this._time;this.render(0,!0,!1),this._initted=!1,this.render(o,!0,!1)}else if(this._time>0||n){this._initted=!1,this._init();for(var a,h=1/(1-s),l=this._firstPT;l;)a=l.s+l.c,l.c*=h,l.s=a-l.c,l=l._next}return this},l.render=function(t,e,i){this._initted||0===this._duration&&this.vars.repeat&&this.invalidate();var r,s,a,h,l,c,d,p,f=this._dirty?this.totalDuration():this._totalDuration,v=this._time,_=this._totalTime,g=this._cycle,m=this._duration,y=this._rawPrevTime;if(t>=f?(this._totalTime=f,this._cycle=this._repeat,this._yoyo&&0!=(1&this._cycle)?(this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0):(this._time=m,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1),this._reversed||(r=!0,s="onComplete"),0===m&&(this._initted||!this.vars.lazy||i)&&(this._startTime===this._timeline._duration&&(t=0),(0===t||0>y||y===n)&&y!==t&&(i=!0,y>n&&(s="onReverseComplete")),this._rawPrevTime=p=!e||t||y===t?t:n)):1e-7>t?(this._totalTime=this._time=this._cycle=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0,(0!==_||0===m&&y>0)&&(s="onReverseComplete",r=this._reversed),0>t&&(this._active=!1,0===m&&(this._initted||!this.vars.lazy||i)&&(y>=0&&(i=!0),this._rawPrevTime=p=!e||t||y===t?t:n)),this._initted||(i=!0)):(this._totalTime=this._time=t,0!==this._repeat&&(h=m+this._repeatDelay,this._cycle=this._totalTime/h>>0,0!==this._cycle&&this._cycle===this._totalTime/h&&this._cycle--,this._time=this._totalTime-this._cycle*h,this._yoyo&&0!=(1&this._cycle)&&(this._time=m-this._time),this._time>m?this._time=m:0>this._time&&(this._time=0)),this._easeType?(l=this._time/m,c=this._easeType,d=this._easePower,(1===c||3===c&&l>=.5)&&(l=1-l),3===c&&(l*=2),1===d?l*=l:2===d?l*=l*l:3===d?l*=l*l*l:4===d&&(l*=l*l*l*l),this.ratio=1===c?1-l:2===c?l:.5>this._time/m?l/2:1-l/2):this.ratio=this._ease.getRatio(this._time/m)),v===this._time&&!i&&g===this._cycle)return void(_!==this._totalTime&&this._onUpdate&&(e||this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||u)));if(!this._initted){if(this._init(),!this._initted||this._gc)return;if(!i&&this._firstPT&&(!1!==this.vars.lazy&&this._duration||this.vars.lazy&&!this._duration))return this._time=v,this._totalTime=_,this._rawPrevTime=y,this._cycle=g,o.lazyTweens.push(this),void(this._lazy=[t,e]);this._time&&!r?this.ratio=this._ease.getRatio(this._time/m):r&&this._ease._calcEnd&&(this.ratio=this._ease.getRatio(0===this._time?0:1))}for(!1!==this._lazy&&(this._lazy=!1),this._active||!this._paused&&this._time!==v&&t>=0&&(this._active=!0),0===_&&(2===this._initted&&t>0&&this._init(),this._startAt&&(t>=0?this._startAt.render(t,e,i):s||(s="_dummyGS")),this.vars.onStart&&(0!==this._totalTime||0===m)&&(e||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||u))),a=this._firstPT;a;)a.f?a.t[a.p](a.c*this.ratio+a.s):a.t[a.p]=a.c*this.ratio+a.s,a=a._next;this._onUpdate&&(0>t&&this._startAt&&this._startTime&&this._startAt.render(t,e,i),e||(this._totalTime!==_||r)&&this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||u)),this._cycle!==g&&(e||this._gc||this.vars.onRepeat&&this.vars.onRepeat.apply(this.vars.onRepeatScope||this,this.vars.onRepeatParams||u)),s&&(!this._gc||i)&&(0>t&&this._startAt&&!this._onUpdate&&this._startTime&&this._startAt.render(t,e,i),r&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[s]&&this.vars[s].apply(this.vars[s+"Scope"]||this,this.vars[s+"Params"]||u),0===m&&this._rawPrevTime===n&&p!==n&&(this._rawPrevTime=0))},s.to=function(t,e,i){return new s(t,e,i)},s.from=function(t,e,i){return i.runBackwards=!0,i.immediateRender=0!=i.immediateRender,new s(t,e,i)},s.fromTo=function(t,e,i,r){return r.startAt=i,r.immediateRender=0!=r.immediateRender&&0!=i.immediateRender,new s(t,e,r)},s.staggerTo=s.allTo=function(t,e,n,o,l,c,d){o=o||0;var p,f,v,_,g=n.delay||0,m=[],y=function(){n.onComplete&&n.onComplete.apply(n.onCompleteScope||this,arguments),l.apply(d||this,c||u)};for(h(t)||("string"==typeof t&&(t=i.selector(t)||t),a(t)&&(t=r(t))),t=t||[],0>o&&(t=r(t),t.reverse(),o*=-1),p=t.length-1,v=0;p>=v;v++){f={};for(_ in n)f[_]=n[_];f.delay=g,v===p&&l&&(f.onComplete=y),m[v]=new s(t[v],e,f),g+=o}return m},s.staggerFrom=s.allFrom=function(t,e,i,r,n,o,a){return i.runBackwards=!0,i.immediateRender=0!=i.immediateRender,s.staggerTo(t,e,i,r,n,o,a)},s.staggerFromTo=s.allFromTo=function(t,e,i,r,n,o,a,h){return r.startAt=i,r.immediateRender=0!=r.immediateRender&&0!=i.immediateRender,s.staggerTo(t,e,r,n,o,a,h)},s.delayedCall=function(t,e,i,r,n){return new s(e,0,{delay:t,onComplete:e,onCompleteParams:i,onCompleteScope:r,onReverseComplete:e,onReverseCompleteParams:i,onReverseCompleteScope:r,immediateRender:!1,useFrames:n,overwrite:0})},s.set=function(t,e){return new s(t,0,e)},s.isTweening=function(t){return i.getTweensOf(t,!0).length>0};var c=function(t,e){for(var r=[],s=0,n=t._first;n;)n instanceof i?r[s++]=n:(e&&(r[s++]=n),r=r.concat(c(n,e)),s=r.length),n=n._next;return r},d=s.getAllTweens=function(e){return c(t._rootTimeline,e).concat(c(t._rootFramesTimeline,e))};s.killAll=function(t,i,r,s){null==i&&(i=!0),null==r&&(r=!0);var n,o,a,h=d(0!=s),l=h.length,u=i&&r&&s;for(a=0;l>a;a++)o=h[a],(u||o instanceof e||(n=o.target===o.vars.onComplete)&&r||i&&!n)&&(t?o.totalTime(o._reversed?0:o.totalDuration()):o._enabled(!1,!1))},s.killChildTweensOf=function(t,e){if(null!=t){var n,l,u,c,d,p=o.tweenLookup;if("string"==typeof t&&(t=i.selector(t)||t),a(t)&&(t=r(t)),h(t))for(c=t.length;--c>-1;)s.killChildTweensOf(t[c],e);else{n=[];for(u in p)for(l=p[u].target.parentNode;l;)l===t&&(n=n.concat(p[u].tweens)),l=l.parentNode;for(d=n.length,c=0;d>c;c++)e&&n[c].totalTime(n[c].totalDuration()),n[c]._enabled(!1,!1)}}};var p=function(t,i,r,s){i=!1!==i,r=!1!==r,s=!1!==s;for(var n,o,a=d(s),h=i&&r&&s,l=a.length;--l>-1;)o=a[l],(h||o instanceof e||(n=o.target===o.vars.onComplete)&&r||i&&!n)&&o.paused(t)};return s.pauseAll=function(t,e,i){p(!0,t,e,i)},s.resumeAll=function(t,e,i){p(!1,t,e,i)},s.globalTimeScale=function(e){var r=t._rootTimeline,s=i.ticker.time;return arguments.length?(e=e||n,r._startTime=s-(s-r._startTime)*r._timeScale/e,r=t._rootFramesTimeline,s=i.ticker.frame,r._startTime=s-(s-r._startTime)*r._timeScale/e,r._timeScale=t._rootTimeline._timeScale=e,e):r._timeScale},l.progress=function(t){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&0!=(1&this._cycle)?1-t:t)+this._cycle*(this._duration+this._repeatDelay),!1):this._time/this.duration()},l.totalProgress=function(t){return arguments.length?this.totalTime(this.totalDuration()*t,!1):this._totalTime/this.totalDuration()},l.time=function(t,e){return arguments.length?(this._dirty&&this.totalDuration(),t>this._duration&&(t=this._duration),this._yoyo&&0!=(1&this._cycle)?t=this._duration-t+this._cycle*(this._duration+this._repeatDelay):0!==this._repeat&&(t+=this._cycle*(this._duration+this._repeatDelay)),this.totalTime(t,e)):this._time},l.duration=function(e){return arguments.length?t.prototype.duration.call(this,e):this._duration},l.totalDuration=function(t){return arguments.length?-1===this._repeat?this:this.duration((t-this._repeat*this._repeatDelay)/(this._repeat+1)):(this._dirty&&(this._totalDuration=-1===this._repeat?999999999999:this._duration*(this._repeat+1)+this._repeatDelay*this._repeat,this._dirty=!1),this._totalDuration)},l.repeat=function(t){return arguments.length?(this._repeat=t,this._uncache(!0)):this._repeat},l.repeatDelay=function(t){return arguments.length?(this._repeatDelay=t,this._uncache(!0)):this._repeatDelay},l.yoyo=function(t){return arguments.length?(this._yoyo=t,this):this._yoyo},s},!0),_gsScope._gsDefine("TimelineLite",["core.Animation","core.SimpleTimeline","TweenLite"],function(t,e,i){var r=function(t){e.call(this,t),this._labels={},this.autoRemoveChildren=!0===this.vars.autoRemoveChildren,this.smoothChildTiming=!0===this.vars.smoothChildTiming,this._sortChildren=!0,this._onUpdate=this.vars.onUpdate;var i,r,s=this.vars;for(r in s)i=s[r],h(i)&&-1!==i.join("").indexOf("{self}")&&(s[r]=this._swapSelfInParams(i));h(s.tweens)&&this.add(s.tweens,0,s.align,s.stagger)},s=1e-10,n=i._internals,o=r._internals={},a=n.isSelector,h=n.isArray,l=n.lazyTweens,u=n.lazyRender,c=[],d=_gsScope._gsDefine.globals,p=function(t){var e,i={};for(e in t)i[e]=t[e];return i},f=o.pauseCallback=function(t,e,i,r){var n,o=t._timeline,a=o._totalTime,h=t._startTime,l=t.ratio?s:0,u=t.ratio?0:s;if(e||!this._forcingPlayhead){for(o.pause(h),n=t._prev;n&&n._startTime===h;)n._rawPrevTime=u,n=n._prev;for(n=t._next;n&&n._startTime===h;)n._rawPrevTime=l,n=n._next;e&&e.apply(r||o,i||c),this._forcingPlayhead&&o.seek(a)}},v=function(t){var e,i=[],r=t.length;for(e=0;e!==r;i.push(t[e++]));return i},_=r.prototype=new e;return r.version="1.16.0",_.constructor=r,_.kill()._gc=_._forcingPlayhead=!1,_.to=function(t,e,r,s){var n=r.repeat&&d.TweenMax||i;return e?this.add(new n(t,e,r),s):this.set(t,r,s)},_.from=function(t,e,r,s){return this.add((r.repeat&&d.TweenMax||i).from(t,e,r),s)},_.fromTo=function(t,e,r,s,n){var o=s.repeat&&d.TweenMax||i;return e?this.add(o.fromTo(t,e,r,s),n):this.set(t,s,n)},_.staggerTo=function(t,e,s,n,o,h,l,u){var c,d=new r({onComplete:h,onCompleteParams:l,onCompleteScope:u,smoothChildTiming:this.smoothChildTiming});for("string"==typeof t&&(t=i.selector(t)||t),t=t||[],a(t)&&(t=v(t)),n=n||0,0>n&&(t=v(t),t.reverse(),n*=-1),c=0;t.length>c;c++)s.startAt&&(s.startAt=p(s.startAt)),d.to(t[c],e,p(s),c*n);return this.add(d,o)},_.staggerFrom=function(t,e,i,r,s,n,o,a){return i.immediateRender=0!=i.immediateRender,i.runBackwards=!0,this.staggerTo(t,e,i,r,s,n,o,a)},_.staggerFromTo=function(t,e,i,r,s,n,o,a,h){return r.startAt=i,r.immediateRender=0!=r.immediateRender&&0!=i.immediateRender,this.staggerTo(t,e,r,s,n,o,a,h)},_.call=function(t,e,r,s){return this.add(i.delayedCall(0,t,e,r),s)},_.set=function(t,e,r){return r=this._parseTimeOrLabel(r,0,!0),null==e.immediateRender&&(e.immediateRender=r===this._time&&!this._paused),this.add(new i(t,0,e),r)},r.exportRoot=function(t,e){t=t||{},null==t.smoothChildTiming&&(t.smoothChildTiming=!0);var s,n,o=new r(t),a=o._timeline;for(null==e&&(e=!0),a._remove(o,!0),o._startTime=0,o._rawPrevTime=o._time=o._totalTime=a._time,s=a._first;s;)n=s._next,e&&s instanceof i&&s.target===s.vars.onComplete||o.add(s,s._startTime-s._delay),s=n;return a.add(o,0),o},_.add=function(s,n,o,a){var l,u,c,d,p,f;if("number"!=typeof n&&(n=this._parseTimeOrLabel(n,0,!0,s)),!(s instanceof t)){if(s instanceof Array||s&&s.push&&h(s)){for(o=o||"normal",a=a||0,l=n,u=s.length,c=0;u>c;c++)h(d=s[c])&&(d=new r({tweens:d})),this.add(d,l),"string"!=typeof d&&"function"!=typeof d&&("sequence"===o?l=d._startTime+d.totalDuration()/d._timeScale:"start"===o&&(d._startTime-=d.delay())),l+=a;return this._uncache(!0)}if("string"==typeof s)return this.addLabel(s,n);if("function"!=typeof s)throw"Cannot add "+s+" into the timeline; it is not a tween, timeline, function, or string.";s=i.delayedCall(0,s)}if(e.prototype.add.call(this,s,n),(this._gc||this._time===this._duration)&&!this._paused&&this._duration<this.duration())for(p=this,f=p.rawTime()>s._startTime;p._timeline;)f&&p._timeline.smoothChildTiming?p.totalTime(p._totalTime,!0):p._gc&&p._enabled(!0,!1),p=p._timeline;return this},_.remove=function(e){if(e instanceof t)return this._remove(e,!1);if(e instanceof Array||e&&e.push&&h(e)){for(var i=e.length;--i>-1;)this.remove(e[i]);return this}return"string"==typeof e?this.removeLabel(e):this.kill(null,e)},_._remove=function(t,i){e.prototype._remove.call(this,t,i);var r=this._last;return r?this._time>r._startTime+r._totalDuration/r._timeScale&&(this._time=this.duration(),this._totalTime=this._totalDuration):this._time=this._totalTime=this._duration=this._totalDuration=0,this},_.append=function(t,e){return this.add(t,this._parseTimeOrLabel(null,e,!0,t))},_.insert=_.insertMultiple=function(t,e,i,r){return this.add(t,e||0,i,r)},_.appendMultiple=function(t,e,i,r){return this.add(t,this._parseTimeOrLabel(null,e,!0,t),i,r)},_.addLabel=function(t,e){return this._labels[t]=this._parseTimeOrLabel(e),this},_.addPause=function(t,e,r,s){var n=i.delayedCall(0,f,["{self}",e,r,s],this);return n.data="isPause",this.add(n,t)},_.removeLabel=function(t){return delete this._labels[t],this},_.getLabelTime=function(t){return null!=this._labels[t]?this._labels[t]:-1},_._parseTimeOrLabel=function(e,i,r,s){var n;if(s instanceof t&&s.timeline===this)this.remove(s);else if(s&&(s instanceof Array||s.push&&h(s)))for(n=s.length;--n>-1;)s[n]instanceof t&&s[n].timeline===this&&this.remove(s[n]);if("string"==typeof i)return this._parseTimeOrLabel(i,r&&"number"==typeof e&&null==this._labels[i]?e-this.duration():0,r);if(i=i||0,"string"!=typeof e||!isNaN(e)&&null==this._labels[e])null==e&&(e=this.duration());else{if(-1===(n=e.indexOf("=")))return null==this._labels[e]?r?this._labels[e]=this.duration()+i:i:this._labels[e]+i;i=parseInt(e.charAt(n-1)+"1",10)*Number(e.substr(n+1)),e=n>1?this._parseTimeOrLabel(e.substr(0,n-1),0,r):this.duration()}return Number(e)+i},_.seek=function(t,e){return this.totalTime("number"==typeof t?t:this._parseTimeOrLabel(t),!1!==e)},_.stop=function(){return this.paused(!0)},_.gotoAndPlay=function(t,e){return this.play(t,e)},_.gotoAndStop=function(t,e){return this.pause(t,e)},_.render=function(t,e,i){this._gc&&this._enabled(!0,!1);var r,n,o,a,h,d=this._dirty?this.totalDuration():this._totalDuration,p=this._time,f=this._startTime,v=this._timeScale,_=this._paused;if(t>=d)this._totalTime=this._time=d,this._reversed||this._hasPausedChild()||(n=!0,a="onComplete",0===this._duration&&(0===t||0>this._rawPrevTime||this._rawPrevTime===s)&&this._rawPrevTime!==t&&this._first&&(h=!0,this._rawPrevTime>s&&(a="onReverseComplete"))),this._rawPrevTime=this._duration||!e||t||this._rawPrevTime===t?t:s,t=d+1e-4;else if(1e-7>t)if(this._totalTime=this._time=0,(0!==p||0===this._duration&&this._rawPrevTime!==s&&(this._rawPrevTime>0||0>t&&this._rawPrevTime>=0))&&(a="onReverseComplete",n=this._reversed),0>t)this._active=!1,this._timeline.autoRemoveChildren&&this._reversed?(h=n=!0,a="onReverseComplete"):this._rawPrevTime>=0&&this._first&&(h=!0),this._rawPrevTime=t;else{if(this._rawPrevTime=this._duration||!e||t||this._rawPrevTime===t?t:s,0===t&&n)for(r=this._first;r&&0===r._startTime;)r._duration||(n=!1),r=r._next;t=0,this._initted||(h=!0)}else this._totalTime=this._time=this._rawPrevTime=t;if(this._time!==p&&this._first||i||h){if(this._initted||(this._initted=!0),this._active||!this._paused&&this._time!==p&&t>0&&(this._active=!0),0===p&&this.vars.onStart&&0!==this._time&&(e||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||c)),this._time>=p)for(r=this._first;r&&(o=r._next,!this._paused||_);)(r._active||r._startTime<=this._time&&!r._paused&&!r._gc)&&(r._reversed?r.render((r._dirty?r.totalDuration():r._totalDuration)-(t-r._startTime)*r._timeScale,e,i):r.render((t-r._startTime)*r._timeScale,e,i)),r=o;else for(r=this._last;r&&(o=r._prev,!this._paused||_);)(r._active||p>=r._startTime&&!r._paused&&!r._gc)&&(r._reversed?r.render((r._dirty?r.totalDuration():r._totalDuration)-(t-r._startTime)*r._timeScale,e,i):r.render((t-r._startTime)*r._timeScale,e,i)),r=o;this._onUpdate&&(e||(l.length&&u(),this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||c))),a&&(this._gc||(f===this._startTime||v!==this._timeScale)&&(0===this._time||d>=this.totalDuration())&&(n&&(l.length&&u(),this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[a]&&this.vars[a].apply(this.vars[a+"Scope"]||this,this.vars[a+"Params"]||c)))}},_._hasPausedChild=function(){for(var t=this._first;t;){if(t._paused||t instanceof r&&t._hasPausedChild())return!0;t=t._next}return!1},_.getChildren=function(t,e,r,s){s=s||-9999999999;for(var n=[],o=this._first,a=0;o;)s>o._startTime||(o instanceof i?!1!==e&&(n[a++]=o):(!1!==r&&(n[a++]=o),!1!==t&&(n=n.concat(o.getChildren(!0,e,r)),a=n.length))),o=o._next;return n},_.getTweensOf=function(t,e){var r,s,n=this._gc,o=[],a=0;for(n&&this._enabled(!0,!0),r=i.getTweensOf(t),s=r.length;--s>-1;)(r[s].timeline===this||e&&this._contains(r[s]))&&(o[a++]=r[s]);return n&&this._enabled(!1,!0),o},_.recent=function(){return this._recent},_._contains=function(t){for(var e=t.timeline;e;){if(e===this)return!0;e=e.timeline}return!1},_.shiftChildren=function(t,e,i){i=i||0;for(var r,s=this._first,n=this._labels;s;)s._startTime>=i&&(s._startTime+=t),s=s._next;if(e)for(r in n)n[r]>=i&&(n[r]+=t);return this._uncache(!0)},_._kill=function(t,e){if(!t&&!e)return this._enabled(!1,!1);for(var i=e?this.getTweensOf(e):this.getChildren(!0,!0,!1),r=i.length,s=!1;--r>-1;)i[r]._kill(t,e)&&(s=!0);return s},_.clear=function(t){var e=this.getChildren(!1,!0,!0),i=e.length;for(this._time=this._totalTime=0;--i>-1;)e[i]._enabled(!1,!1);return!1!==t&&(this._labels={}),this._uncache(!0)},_.invalidate=function(){for(var e=this._first;e;)e.invalidate(),e=e._next;return t.prototype.invalidate.call(this)},_._enabled=function(t,i){if(t===this._gc)for(var r=this._first;r;)r._enabled(t,!0),r=r._next;return e.prototype._enabled.call(this,t,i)},_.totalTime=function(){this._forcingPlayhead=!0;var e=t.prototype.totalTime.apply(this,arguments);return this._forcingPlayhead=!1,e},_.duration=function(t){return arguments.length?(0!==this.duration()&&0!==t&&this.timeScale(this._duration/t),this):(this._dirty&&this.totalDuration(),this._duration)},_.totalDuration=function(t){if(!arguments.length){if(this._dirty){for(var e,i,r=0,s=this._last,n=999999999999;s;)e=s._prev,s._dirty&&s.totalDuration(),s._startTime>n&&this._sortChildren&&!s._paused?this.add(s,s._startTime-s._delay):n=s._startTime,0>s._startTime&&!s._paused&&(r-=s._startTime,this._timeline.smoothChildTiming&&(this._startTime+=s._startTime/this._timeScale),this.shiftChildren(-s._startTime,!1,-9999999999),n=0),i=s._startTime+s._totalDuration/s._timeScale,i>r&&(r=i),s=e;this._duration=this._totalDuration=r,this._dirty=!1}return this._totalDuration}return 0!==this.totalDuration()&&0!==t&&this.timeScale(this._totalDuration/t),this},_.paused=function(e){if(!e)for(var i=this._first,r=this._time;i;)i._startTime===r&&"isPause"===i.data&&(i._rawPrevTime=r),i=i._next;return t.prototype.paused.apply(this,arguments)},_.usesFrames=function(){for(var e=this._timeline;e._timeline;)e=e._timeline;return e===t._rootFramesTimeline},_.rawTime=function(){return this._paused?this._totalTime:(this._timeline.rawTime()-this._startTime)*this._timeScale},r},!0),_gsScope._gsDefine("TimelineMax",["TimelineLite","TweenLite","easing.Ease"],function(t,e,i){var r=function(e){t.call(this,e),this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._cycle=0,this._yoyo=!0===this.vars.yoyo,this._dirty=!0},s=1e-10,n=[],o=e._internals,a=o.lazyTweens,h=o.lazyRender,l=new i(null,null,1,0),u=r.prototype=new t;return u.constructor=r,u.kill()._gc=!1,r.version="1.16.0",u.invalidate=function(){return this._yoyo=!0===this.vars.yoyo,this._repeat=this.vars.repeat||0,this._repeatDelay=this.vars.repeatDelay||0,this._uncache(!0),t.prototype.invalidate.call(this)},u.addCallback=function(t,i,r,s){return this.add(e.delayedCall(0,t,r,s),i)},u.removeCallback=function(t,e){if(t)if(null==e)this._kill(null,t);else for(var i=this.getTweensOf(t,!1),r=i.length,s=this._parseTimeOrLabel(e);--r>-1;)i[r]._startTime===s&&i[r]._enabled(!1,!1);return this},u.removePause=function(e){return this.removeCallback(t._internals.pauseCallback,e)},u.tweenTo=function(t,i){i=i||{};var r,s,o,a={ease:l,useFrames:this.usesFrames(),immediateRender:!1};for(s in i)a[s]=i[s];return a.time=this._parseTimeOrLabel(t),r=Math.abs(Number(a.time)-this._time)/this._timeScale||.001,o=new e(this,r,a),a.onStart=function(){o.target.paused(!0),o.vars.time!==o.target.time()&&r===o.duration()&&o.duration(Math.abs(o.vars.time-o.target.time())/o.target._timeScale),i.onStart&&i.onStart.apply(i.onStartScope||o,i.onStartParams||n)},o},u.tweenFromTo=function(t,e,i){i=i||{},t=this._parseTimeOrLabel(t),i.startAt={onComplete:this.seek,onCompleteParams:[t],onCompleteScope:this},i.immediateRender=!1!==i.immediateRender;var r=this.tweenTo(e,i);return r.duration(Math.abs(r.vars.time-t)/this._timeScale||.001)},u.render=function(t,e,i){this._gc&&this._enabled(!0,!1);var r,o,l,u,c,d,p=this._dirty?this.totalDuration():this._totalDuration,f=this._duration,v=this._time,_=this._totalTime,g=this._startTime,m=this._timeScale,y=this._rawPrevTime,x=this._paused,b=this._cycle;if(t>=p)this._locked||(this._totalTime=p,this._cycle=this._repeat),this._reversed||this._hasPausedChild()||(o=!0,u="onComplete",0===this._duration&&(0===t||0>y||y===s)&&y!==t&&this._first&&(c=!0,y>s&&(u="onReverseComplete"))),this._rawPrevTime=this._duration||!e||t||this._rawPrevTime===t?t:s,this._yoyo&&0!=(1&this._cycle)?this._time=t=0:(this._time=f,t=f+1e-4);else if(1e-7>t)if(this._locked||(this._totalTime=this._cycle=0),this._time=0,(0!==v||0===f&&y!==s&&(y>0||0>t&&y>=0)&&!this._locked)&&(u="onReverseComplete",o=this._reversed),0>t)this._active=!1,this._timeline.autoRemoveChildren&&this._reversed?(c=o=!0,u="onReverseComplete"):y>=0&&this._first&&(c=!0),this._rawPrevTime=t;else{if(this._rawPrevTime=f||!e||t||this._rawPrevTime===t?t:s,0===t&&o)for(r=this._first;r&&0===r._startTime;)r._duration||(o=!1),r=r._next;t=0,this._initted||(c=!0)}else 0===f&&0>y&&(c=!0),this._time=this._rawPrevTime=t,this._locked||(this._totalTime=t,0!==this._repeat&&(d=f+this._repeatDelay,this._cycle=this._totalTime/d>>0,0!==this._cycle&&this._cycle===this._totalTime/d&&this._cycle--,this._time=this._totalTime-this._cycle*d,this._yoyo&&0!=(1&this._cycle)&&(this._time=f-this._time),this._time>f?(this._time=f,t=f+1e-4):0>this._time?this._time=t=0:t=this._time));if(this._cycle!==b&&!this._locked){var T=this._yoyo&&0!=(1&b),w=T===(this._yoyo&&0!=(1&this._cycle)),E=this._totalTime,S=this._cycle,A=this._rawPrevTime,R=this._time;if(this._totalTime=b*f,b>this._cycle?T=!T:this._totalTime+=f,this._time=v,this._rawPrevTime=0===f?y-1e-4:y,this._cycle=b,this._locked=!0,v=T?0:f,this.render(v,e,0===f),e||this._gc||this.vars.onRepeat&&this.vars.onRepeat.apply(this.vars.onRepeatScope||this,this.vars.onRepeatParams||n),w&&(v=T?f+1e-4:-1e-4,this.render(v,!0,!1)),this._locked=!1,this._paused&&!x)return;this._time=R,this._totalTime=E,this._cycle=S,this._rawPrevTime=A}if(!(this._time!==v&&this._first||i||c))return void(_!==this._totalTime&&this._onUpdate&&(e||this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||n)));if(this._initted||(this._initted=!0),this._active||!this._paused&&this._totalTime!==_&&t>0&&(this._active=!0),0===_&&this.vars.onStart&&0!==this._totalTime&&(e||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||n)),this._time>=v)for(r=this._first;r&&(l=r._next,!this._paused||x);)(r._active||r._startTime<=this._time&&!r._paused&&!r._gc)&&(r._reversed?r.render((r._dirty?r.totalDuration():r._totalDuration)-(t-r._startTime)*r._timeScale,e,i):r.render((t-r._startTime)*r._timeScale,e,i)),r=l;else for(r=this._last;r&&(l=r._prev,!this._paused||x);)(r._active||v>=r._startTime&&!r._paused&&!r._gc)&&(r._reversed?r.render((r._dirty?r.totalDuration():r._totalDuration)-(t-r._startTime)*r._timeScale,e,i):r.render((t-r._startTime)*r._timeScale,e,i)),r=l;this._onUpdate&&(e||(a.length&&h(),this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||n))),u&&(this._locked||this._gc||(g===this._startTime||m!==this._timeScale)&&(0===this._time||p>=this.totalDuration())&&(o&&(a.length&&h(),this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[u]&&this.vars[u].apply(this.vars[u+"Scope"]||this,this.vars[u+"Params"]||n)))},u.getActive=function(t,e,i){null==t&&(t=!0),null==e&&(e=!0),null==i&&(i=!1);var r,s,n=[],o=this.getChildren(t,e,i),a=0,h=o.length;for(r=0;h>r;r++)s=o[r],s.isActive()&&(n[a++]=s);return n},u.getLabelAfter=function(t){t||0!==t&&(t=this._time);var e,i=this.getLabelsArray(),r=i.length;for(e=0;r>e;e++)if(i[e].time>t)return i[e].name;return null},u.getLabelBefore=function(t){null==t&&(t=this._time);for(var e=this.getLabelsArray(),i=e.length;--i>-1;)if(t>e[i].time)return e[i].name;return null},u.getLabelsArray=function(){var t,e=[],i=0;for(t in this._labels)e[i++]={time:this._labels[t],name:t};return e.sort(function(t,e){return t.time-e.time}),e},u.progress=function(t,e){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&0!=(1&this._cycle)?1-t:t)+this._cycle*(this._duration+this._repeatDelay),e):this._time/this.duration()},u.totalProgress=function(t,e){return arguments.length?this.totalTime(this.totalDuration()*t,e):this._totalTime/this.totalDuration()},u.totalDuration=function(e){return arguments.length?-1===this._repeat?this:this.duration((e-this._repeat*this._repeatDelay)/(this._repeat+1)):(this._dirty&&(t.prototype.totalDuration.call(this),this._totalDuration=-1===this._repeat?999999999999:this._duration*(this._repeat+1)+this._repeatDelay*this._repeat),this._totalDuration)},u.time=function(t,e){return arguments.length?(this._dirty&&this.totalDuration(),t>this._duration&&(t=this._duration),this._yoyo&&0!=(1&this._cycle)?t=this._duration-t+this._cycle*(this._duration+this._repeatDelay):0!==this._repeat&&(t+=this._cycle*(this._duration+this._repeatDelay)),this.totalTime(t,e)):this._time},u.repeat=function(t){return arguments.length?(this._repeat=t,this._uncache(!0)):this._repeat},u.repeatDelay=function(t){return arguments.length?(this._repeatDelay=t,this._uncache(!0)):this._repeatDelay},u.yoyo=function(t){return arguments.length?(this._yoyo=t,this):this._yoyo},u.currentLabel=function(t){return arguments.length?this.seek(t,!0):this.getLabelBefore(this._time+1e-8)},r},!0),function(){var t=180/Math.PI,e=[],i=[],r=[],s={},n=_gsScope._gsDefine.globals,o=function(t,e,i,r){this.a=t,this.b=e,this.c=i,this.d=r,this.da=r-t,this.ca=i-t,this.ba=e-t},a=",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",h=function(t,e,i,r){var s={a:t},n={},o={},a={c:r},h=(t+e)/2,l=(e+i)/2,u=(i+r)/2,c=(h+l)/2,d=(l+u)/2,p=(d-c)/8;return s.b=h+(t-h)/4,n.b=c+p,s.c=n.a=(s.b+n.b)/2,n.c=o.a=(c+d)/2,o.b=d-p,a.b=u+(r-u)/4,o.c=a.a=(o.b+a.b)/2,[s,n,o,a]},l=function(t,s,n,o,a){var l,u,c,d,p,f,v,_,g,m,y,x,b,T=t.length-1,w=0,E=t[0].a;for(l=0;T>l;l++)p=t[w],u=p.a,c=p.d,d=t[w+1].d,a?(y=e[l],x=i[l],b=.25*(x+y)*s/(o?.5:r[l]||.5),f=c-(c-u)*(o?.5*s:0!==y?b/y:0),v=c+(d-c)*(o?.5*s:0!==x?b/x:0),_=c-(f+((v-f)*(3*y/(y+x)+.5)/4||0))):(f=c-.5*(c-u)*s,v=c+.5*(d-c)*s,_=c-(f+v)/2),f+=_,v+=_,p.c=g=f,p.b=0!==l?E:E=p.a+.6*(p.c-p.a),p.da=c-u,p.ca=g-u,p.ba=E-u,n?(m=h(u,E,g,c),t.splice(w,1,m[0],m[1],m[2],m[3]),w+=4):w++,E=v;p=t[w],p.b=E,p.c=E+.4*(p.d-E),p.da=p.d-p.a,p.ca=p.c-p.a,p.ba=E-p.a,n&&(m=h(p.a,E,p.c,p.d),t.splice(w,1,m[0],m[1],m[2],m[3]))},u=function(t,r,s,n){var a,h,l,u,c,d,p=[];if(n)for(t=[n].concat(t),h=t.length;--h>-1;)"string"==typeof(d=t[h][r])&&"="===d.charAt(1)&&(t[h][r]=n[r]+Number(d.charAt(0)+d.substr(2)));if(0>(a=t.length-2))return p[0]=new o(t[0][r],0,0,t[-1>a?0:1][r]),p;for(h=0;a>h;h++)l=t[h][r],u=t[h+1][r],p[h]=new o(l,0,0,u),s&&(c=t[h+2][r],e[h]=(e[h]||0)+(u-l)*(u-l),i[h]=(i[h]||0)+(c-u)*(c-u));return p[h]=new o(t[h][r],0,0,t[h+1][r]),p},c=function(t,n,o,h,c,d){var p,f,v,_,g,m,y,x,b={},T=[],w=d||t[0];c="string"==typeof c?","+c+",":a,null==n&&(n=1);for(f in t[0])T.push(f);if(t.length>1){for(x=t[t.length-1],y=!0,p=T.length;--p>-1;)if(f=T[p],Math.abs(w[f]-x[f])>.05){y=!1;break}y&&(t=t.concat(),d&&t.unshift(d),t.push(t[1]),d=t[t.length-3])}for(e.length=i.length=r.length=0,p=T.length;--p>-1;)f=T[p],s[f]=-1!==c.indexOf(","+f+","),b[f]=u(t,f,s[f],d);for(p=e.length;--p>-1;)e[p]=Math.sqrt(e[p]),i[p]=Math.sqrt(i[p]);if(!h){for(p=T.length;--p>-1;)if(s[f])for(v=b[T[p]],m=v.length-1,_=0;m>_;_++)g=v[_+1].da/i[_]+v[_].da/e[_],r[_]=(r[_]||0)+g*g;for(p=r.length;--p>-1;)r[p]=Math.sqrt(r[p])}for(p=T.length,_=o?4:1;--p>-1;)f=T[p],v=b[f],l(v,n,o,h,s[f]),y&&(v.splice(0,_),v.splice(v.length-_,_));return b},d=function(t,e,i){e=e||"soft";var r,s,n,a,h,l,u,c,d,p,f,v={},_="cubic"===e?3:2,g="soft"===e,m=[];if(g&&i&&(t=[i].concat(t)),null==t||_+1>t.length)throw"invalid Bezier data";for(d in t[0])m.push(d);for(l=m.length;--l>-1;){for(d=m[l],v[d]=h=[],p=0,c=t.length,u=0;c>u;u++)r=null==i?t[u][d]:"string"==typeof(f=t[u][d])&&"="===f.charAt(1)?i[d]+Number(f.charAt(0)+f.substr(2)):Number(f),g&&u>1&&c-1>u&&(h[p++]=(r+h[p-2])/2),h[p++]=r;for(c=p-_+1,p=0,u=0;c>u;u+=_)r=h[u],s=h[u+1],n=h[u+2],a=2===_?0:h[u+3],h[p++]=f=3===_?new o(r,s,n,a):new o(r,(2*s+r)/3,(2*s+n)/3,n);h.length=p}return v},p=function(t,e,i){for(var r,s,n,o,a,h,l,u,c,d,p,f=1/i,v=t.length;--v>-1;)for(d=t[v],n=d.a,o=d.d-n,a=d.c-n,h=d.b-n,r=s=0,u=1;i>=u;u++)l=f*u,c=1-l,r=s-(s=(l*l*o+3*c*(l*a+c*h))*l),p=v*i+u-1,e[p]=(e[p]||0)+r*r},f=function(t,e){e=e>>0||6;var i,r,s,n,o=[],a=[],h=0,l=0,u=e-1,c=[],d=[];for(i in t)p(t[i],o,e);for(s=o.length,r=0;s>r;r++)h+=Math.sqrt(o[r]),n=r%e,d[n]=h,n===u&&(l+=h,n=r/e>>0,c[n]=d,a[n]=l,h=0,d=[]);return{length:l,lengths:a,segments:c}},v=_gsScope._gsDefine.plugin({propName:"bezier",priority:-1,version:"1.3.4",API:2,global:!0,init:function(t,e,i){this._target=t,e instanceof Array&&(e={values:e}),this._func={},this._round={},this._props=[],this._timeRes=null==e.timeResolution?6:parseInt(e.timeResolution,10);var r,s,n,o,a,h=e.values||[],l={},u=h[0],p=e.autoRotate||i.vars.orientToBezier;this._autoRotate=p?p instanceof Array?p:[["x","y","rotation",!0===p?0:Number(p)||0]]:null;for(r in u)this._props.push(r);for(n=this._props.length;--n>-1;)r=this._props[n],this._overwriteProps.push(r),s=this._func[r]="function"==typeof t[r],l[r]=s?t[r.indexOf("set")||"function"!=typeof t["get"+r.substr(3)]?r:"get"+r.substr(3)]():parseFloat(t[r]),a||l[r]!==h[0][r]&&(a=l);if(this._beziers="cubic"!==e.type&&"quadratic"!==e.type&&"soft"!==e.type?c(h,isNaN(e.curviness)?1:e.curviness,!1,"thruBasic"===e.type,e.correlate,a):d(h,e.type,l),this._segCount=this._beziers[r].length,this._timeRes){var v=f(this._beziers,this._timeRes);this._length=v.length,this._lengths=v.lengths,this._segments=v.segments,this._l1=this._li=this._s1=this._si=0,this._l2=this._lengths[0],this._curSeg=this._segments[0],this._s2=this._curSeg[0],this._prec=1/this._curSeg.length}if(p=this._autoRotate)for(this._initialRotations=[],p[0]instanceof Array||(this._autoRotate=p=[p]),n=p.length;--n>-1;){for(o=0;3>o;o++)r=p[n][o],
        this._func[r]="function"==typeof t[r]&&t[r.indexOf("set")||"function"!=typeof t["get"+r.substr(3)]?r:"get"+r.substr(3)];r=p[n][2],this._initialRotations[n]=this._func[r]?this._func[r].call(this._target):this._target[r]}return this._startRatio=i.vars.runBackwards?1:0,!0},set:function(e){var i,r,s,n,o,a,h,l,u,c,d=this._segCount,p=this._func,f=this._target,v=e!==this._startRatio;if(this._timeRes){if(u=this._lengths,c=this._curSeg,e*=this._length,s=this._li,e>this._l2&&d-1>s){for(l=d-1;l>s&&e>=(this._l2=u[++s]););this._l1=u[s-1],this._li=s,this._curSeg=c=this._segments[s],this._s2=c[this._s1=this._si=0]}else if(this._l1>e&&s>0){for(;s>0&&(this._l1=u[--s])>=e;);0===s&&this._l1>e?this._l1=0:s++,this._l2=u[s],this._li=s,this._curSeg=c=this._segments[s],this._s1=c[(this._si=c.length-1)-1]||0,this._s2=c[this._si]}if(i=s,e-=this._l1,s=this._si,e>this._s2&&c.length-1>s){for(l=c.length-1;l>s&&e>=(this._s2=c[++s]););this._s1=c[s-1],this._si=s}else if(this._s1>e&&s>0){for(;s>0&&(this._s1=c[--s])>=e;);0===s&&this._s1>e?this._s1=0:s++,this._s2=c[s],this._si=s}a=(s+(e-this._s1)/(this._s2-this._s1))*this._prec}else i=0>e?0:e>=1?d-1:d*e>>0,a=(e-i*(1/d))*d;for(r=1-a,s=this._props.length;--s>-1;)n=this._props[s],o=this._beziers[n][i],h=(a*a*o.da+3*r*(a*o.ca+r*o.ba))*a+o.a,this._round[n]&&(h=Math.round(h)),p[n]?f[n](h):f[n]=h;if(this._autoRotate){var _,g,m,y,x,b,T,w=this._autoRotate;for(s=w.length;--s>-1;)n=w[s][2],b=w[s][3]||0,T=!0===w[s][4]?1:t,o=this._beziers[w[s][0]],_=this._beziers[w[s][1]],o&&_&&(o=o[i],_=_[i],g=o.a+(o.b-o.a)*a,y=o.b+(o.c-o.b)*a,g+=(y-g)*a,y+=(o.c+(o.d-o.c)*a-y)*a,m=_.a+(_.b-_.a)*a,x=_.b+(_.c-_.b)*a,m+=(x-m)*a,x+=(_.c+(_.d-_.c)*a-x)*a,h=v?Math.atan2(x-m,y-g)*T+b:this._initialRotations[s],p[n]?f[n](h):f[n]=h)}}}),_=v.prototype;v.bezierThrough=c,v.cubicToQuadratic=h,v._autoCSS=!0,v.quadraticToCubic=function(t,e,i){return new o(t,(2*e+t)/3,(2*e+i)/3,i)},v._cssRegister=function(){var t=n.CSSPlugin;if(t){var e=t._internals,i=e._parseToProxy,r=e._setPluginRatio,s=e.CSSPropTween;e._registerComplexSpecialProp("bezier",{parser:function(t,e,n,o,a,h){e instanceof Array&&(e={values:e}),h=new v;var l,u,c,d=e.values,p=d.length-1,f=[],_={};if(0>p)return a;for(l=0;p>=l;l++)c=i(t,d[l],o,a,h,p!==l),f[l]=c.end;for(u in e)_[u]=e[u];return _.values=f,a=new s(t,"bezier",0,0,c.pt,2),a.data=c,a.plugin=h,a.setRatio=r,0===_.autoRotate&&(_.autoRotate=!0),!_.autoRotate||_.autoRotate instanceof Array||(l=!0===_.autoRotate?0:Number(_.autoRotate),_.autoRotate=null!=c.end.left?[["left","top","rotation",l,!1]]:null!=c.end.x&&[["x","y","rotation",l,!1]]),_.autoRotate&&(o._transform||o._enableTransforms(!1),c.autoRotate=o._target._gsTransform),h._onInitTween(c.proxy,_,o._tween),a}})}},_._roundProps=function(t,e){for(var i=this._overwriteProps,r=i.length;--r>-1;)(t[i[r]]||t.bezier||t.bezierThrough)&&(this._round[i[r]]=e)},_._kill=function(t){var e,i,r=this._props;for(e in this._beziers)if(e in t)for(delete this._beziers[e],delete this._func[e],i=r.length;--i>-1;)r[i]===e&&r.splice(i,1);return this._super._kill.call(this,t)}}(),_gsScope._gsDefine("plugins.CSSPlugin",["plugins.TweenPlugin","TweenLite"],function(t,e){var i,r,s,n,o=function(){t.call(this,"css"),this._overwriteProps.length=0,this.setRatio=o.prototype.setRatio},a=_gsScope._gsDefine.globals,h={},l=o.prototype=new t("css");l.constructor=o,o.version="1.16.0",o.API=2,o.defaultTransformPerspective=0,o.defaultSkewType="compensated",l="px",o.suffixMap={top:l,right:l,bottom:l,left:l,width:l,height:l,fontSize:l,padding:l,margin:l,perspective:l,lineHeight:""};var u,c,d,p,f,v,_=/(?:\d|\-\d|\.\d|\-\.\d)+/g,g=/(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,m=/(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,y=/(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,x=/(?:\d|\-|\+|=|#|\.)*/g,b=/opacity *= *([^)]*)/i,T=/opacity:([^;]*)/i,w=/alpha\(opacity *=.+?\)/i,E=/^(rgb|hsl)/,S=/([A-Z])/g,A=/-([a-z])/gi,R=/(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,O=function(t,e){return e.toUpperCase()},P=/(?:Left|Right|Width)/i,M=/(M11|M12|M21|M22)=[\d\-\.e]+/gi,C=/progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,L=/,(?=[^\)]*(?:\(|$))/gi,D=Math.PI/180,I=180/Math.PI,j={},k=document,N=function(t){return k.createElementNS?k.createElementNS("http://www.w3.org/1999/xhtml",t):k.createElement(t)},F=N("div"),B=N("img"),U=o._internals={_specialProps:h},X=navigator.userAgent,z=function(){var t=X.indexOf("Android"),e=N("a");return d=-1!==X.indexOf("Safari")&&-1===X.indexOf("Chrome")&&(-1===t||Number(X.substr(t+8,1))>3),f=d&&6>Number(X.substr(X.indexOf("Version/")+8,1)),p=-1!==X.indexOf("Firefox"),(/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(X)||/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(X))&&(v=parseFloat(RegExp.$1)),!!e&&(e.style.cssText="top:1px;opacity:.55;",/^0.55/.test(e.style.opacity))}(),W=function(t){return b.test("string"==typeof t?t:(t.currentStyle?t.currentStyle.filter:t.style.filter)||"")?parseFloat(RegExp.$1)/100:1},G=function(t){window.console&&console.log(t)},H="",Y="",q=function(t,e){e=e||F;var i,r,s=e.style;if(void 0!==s[t])return t;for(t=t.charAt(0).toUpperCase()+t.substr(1),i=["O","Moz","ms","Ms","Webkit"],r=5;--r>-1&&void 0===s[i[r]+t];);return r>=0?(Y=3===r?"ms":i[r],H="-"+Y.toLowerCase()+"-",Y+t):null},V=k.defaultView?k.defaultView.getComputedStyle:function(){},K=o.getStyle=function(t,e,i,r,s){var n;return z||"opacity"!==e?(!r&&t.style[e]?n=t.style[e]:(i=i||V(t))?n=i[e]||i.getPropertyValue(e)||i.getPropertyValue(e.replace(S,"-$1").toLowerCase()):t.currentStyle&&(n=t.currentStyle[e]),null==s||n&&"none"!==n&&"auto"!==n&&"auto auto"!==n?n:s):W(t)},$=U.convertToPixels=function(t,i,r,s,n){if("px"===s||!s)return r;if("auto"===s||!r)return 0;var a,h,l,u=P.test(i),c=t,d=F.style,p=0>r;if(p&&(r=-r),"%"===s&&-1!==i.indexOf("border"))a=r/100*(u?t.clientWidth:t.clientHeight);else{if(d.cssText="border:0 solid red;position:"+K(t,"position")+";line-height:0;","%"!==s&&c.appendChild)d[u?"borderLeftWidth":"borderTopWidth"]=r+s;else{if(c=t.parentNode||k.body,h=c._gsCache,l=e.ticker.frame,h&&u&&h.time===l)return h.width*r/100;d[u?"width":"height"]=r+s}c.appendChild(F),a=parseFloat(F[u?"offsetWidth":"offsetHeight"]),c.removeChild(F),u&&"%"===s&&!1!==o.cacheWidths&&(h=c._gsCache=c._gsCache||{},h.time=l,h.width=a/r*100),0!==a||n||(a=$(t,i,r,s,!0))}return p?-a:a},J=U.calculateOffset=function(t,e,i){if("absolute"!==K(t,"position",i))return 0;var r="left"===e?"Left":"Top",s=K(t,"margin"+r,i);return t["offset"+r]-($(t,e,parseFloat(s),s.replace(x,""))||0)},Q=function(t,e){var i,r,s,n={};if(e=e||V(t,null))if(i=e.length)for(;--i>-1;)s=e[i],(-1===s.indexOf("-transform")||wt===s)&&(n[s.replace(A,O)]=e.getPropertyValue(s));else for(i in e)(-1===i.indexOf("Transform")||Tt===i)&&(n[i]=e[i]);else if(e=t.currentStyle||t.style)for(i in e)"string"==typeof i&&void 0===n[i]&&(n[i.replace(A,O)]=e[i]);return z||(n.opacity=W(t)),r=Lt(t,e,!1),n.rotation=r.rotation,n.skewX=r.skewX,n.scaleX=r.scaleX,n.scaleY=r.scaleY,n.x=r.x,n.y=r.y,St&&(n.z=r.z,n.rotationX=r.rotationX,n.rotationY=r.rotationY,n.scaleZ=r.scaleZ),n.filters&&delete n.filters,n},Z=function(t,e,i,r,s){var n,o,a,h={},l=t.style;for(o in i)"cssText"!==o&&"length"!==o&&isNaN(o)&&(e[o]!==(n=i[o])||s&&s[o])&&-1===o.indexOf("Origin")&&("number"==typeof n||"string"==typeof n)&&(h[o]="auto"!==n||"left"!==o&&"top"!==o?""!==n&&"auto"!==n&&"none"!==n||"string"!=typeof e[o]||""===e[o].replace(y,"")?n:0:J(t,o),void 0!==l[o]&&(a=new pt(l,o,l[o],a)));if(r)for(o in r)"className"!==o&&(h[o]=r[o]);return{difs:h,firstMPT:a}},tt={width:["Left","Right"],height:["Top","Bottom"]},et=["marginLeft","marginRight","marginTop","marginBottom"],it=function(t,e,i){var r=parseFloat("width"===e?t.offsetWidth:t.offsetHeight),s=tt[e],n=s.length;for(i=i||V(t,null);--n>-1;)r-=parseFloat(K(t,"padding"+s[n],i,!0))||0,r-=parseFloat(K(t,"border"+s[n]+"Width",i,!0))||0;return r},rt=function(t,e){(null==t||""===t||"auto"===t||"auto auto"===t)&&(t="0 0");var i=t.split(" "),r=-1!==t.indexOf("left")?"0%":-1!==t.indexOf("right")?"100%":i[0],s=-1!==t.indexOf("top")?"0%":-1!==t.indexOf("bottom")?"100%":i[1];return null==s?s="center"===r?"50%":"0":"center"===s&&(s="50%"),("center"===r||isNaN(parseFloat(r))&&-1===(r+"").indexOf("="))&&(r="50%"),e&&(e.oxp=-1!==r.indexOf("%"),e.oyp=-1!==s.indexOf("%"),e.oxr="="===r.charAt(1),e.oyr="="===s.charAt(1),e.ox=parseFloat(r.replace(y,"")),e.oy=parseFloat(s.replace(y,""))),r+" "+s+(i.length>2?" "+i[2]:"")},st=function(t,e){return"string"==typeof t&&"="===t.charAt(1)?parseInt(t.charAt(0)+"1",10)*parseFloat(t.substr(2)):parseFloat(t)-parseFloat(e)},nt=function(t,e){return null==t?e:"string"==typeof t&&"="===t.charAt(1)?parseInt(t.charAt(0)+"1",10)*parseFloat(t.substr(2))+e:parseFloat(t)},ot=function(t,e,i,r){var s,n,o,a,h,l=1e-6;return null==t?a=e:"number"==typeof t?a=t:(s=360,n=t.split("_"),h="="===t.charAt(1),o=(h?parseInt(t.charAt(0)+"1",10)*parseFloat(n[0].substr(2)):parseFloat(n[0]))*(-1===t.indexOf("rad")?1:I)-(h?0:e),n.length&&(r&&(r[i]=e+o),-1!==t.indexOf("short")&&(o%=s)!==o%(s/2)&&(o=0>o?o+s:o-s),-1!==t.indexOf("_cw")&&0>o?o=(o+9999999999*s)%s-(0|o/s)*s:-1!==t.indexOf("ccw")&&o>0&&(o=(o-9999999999*s)%s-(0|o/s)*s)),a=e+o),l>a&&a>-l&&(a=0),a},at={aqua:[0,255,255],lime:[0,255,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,255],navy:[0,0,128],white:[255,255,255],fuchsia:[255,0,255],olive:[128,128,0],yellow:[255,255,0],orange:[255,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[255,0,0],pink:[255,192,203],cyan:[0,255,255],transparent:[255,255,255,0]},ht=function(t,e,i){return t=0>t?t+1:t>1?t-1:t,0|255*(1>6*t?e+6*(i-e)*t:.5>t?i:2>3*t?e+6*(i-e)*(2/3-t):e)+.5},lt=o.parseColor=function(t){var e,i,r,s,n,o;return t&&""!==t?"number"==typeof t?[t>>16,255&t>>8,255&t]:(","===t.charAt(t.length-1)&&(t=t.substr(0,t.length-1)),at[t]?at[t]:"#"===t.charAt(0)?(4===t.length&&(e=t.charAt(1),i=t.charAt(2),r=t.charAt(3),t="#"+e+e+i+i+r+r),t=parseInt(t.substr(1),16),[t>>16,255&t>>8,255&t]):"hsl"===t.substr(0,3)?(t=t.match(_),s=Number(t[0])%360/360,n=Number(t[1])/100,o=Number(t[2])/100,i=.5>=o?o*(n+1):o+n-o*n,e=2*o-i,t.length>3&&(t[3]=Number(t[3])),t[0]=ht(s+1/3,e,i),t[1]=ht(s,e,i),t[2]=ht(s-1/3,e,i),t):(t=t.match(_)||at.transparent,t[0]=Number(t[0]),t[1]=Number(t[1]),t[2]=Number(t[2]),t.length>3&&(t[3]=Number(t[3])),t)):at.black},ut="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";for(l in at)ut+="|"+l+"\\b";ut=RegExp(ut+")","gi");var ct=function(t,e,i,r){if(null==t)return function(t){return t};var s,n=e?(t.match(ut)||[""])[0]:"",o=t.split(n).join("").match(m)||[],a=t.substr(0,t.indexOf(o[0])),h=")"===t.charAt(t.length-1)?")":"",l=-1!==t.indexOf(" ")?" ":",",u=o.length,c=u>0?o[0].replace(_,""):"";return u?s=e?function(t){var e,d,p,f;if("number"==typeof t)t+=c;else if(r&&L.test(t)){for(f=t.replace(L,"|").split("|"),p=0;f.length>p;p++)f[p]=s(f[p]);return f.join(",")}if(e=(t.match(ut)||[n])[0],d=t.split(e).join("").match(m)||[],p=d.length,u>p--)for(;u>++p;)d[p]=i?d[0|(p-1)/2]:o[p];return a+d.join(l)+l+e+h+(-1!==t.indexOf("inset")?" inset":"")}:function(t){var e,n,d;if("number"==typeof t)t+=c;else if(r&&L.test(t)){for(n=t.replace(L,"|").split("|"),d=0;n.length>d;d++)n[d]=s(n[d]);return n.join(",")}if(e=t.match(m)||[],d=e.length,u>d--)for(;u>++d;)e[d]=i?e[0|(d-1)/2]:o[d];return a+e.join(l)+h}:function(t){return t}},dt=function(t){return t=t.split(","),function(e,i,r,s,n,o,a){var h,l=(i+"").split(" ");for(a={},h=0;4>h;h++)a[t[h]]=l[h]=l[h]||l[(h-1)/2>>0];return s.parse(e,a,n,o)}},pt=(U._setPluginRatio=function(t){this.plugin.setRatio(t);for(var e,i,r,s,n=this.data,o=n.proxy,a=n.firstMPT,h=1e-6;a;)e=o[a.v],a.r?e=Math.round(e):h>e&&e>-h&&(e=0),a.t[a.p]=e,a=a._next;if(n.autoRotate&&(n.autoRotate.rotation=o.rotation),1===t)for(a=n.firstMPT;a;){if(i=a.t,i.type){if(1===i.type){for(s=i.xs0+i.s+i.xs1,r=1;i.l>r;r++)s+=i["xn"+r]+i["xs"+(r+1)];i.e=s}}else i.e=i.s+i.xs0;a=a._next}},function(t,e,i,r,s){this.t=t,this.p=e,this.v=i,this.r=s,r&&(r._prev=this,this._next=r)}),ft=(U._parseToProxy=function(t,e,i,r,s,n){var o,a,h,l,u,c=r,d={},p={},f=i._transform,v=j;for(i._transform=null,j=e,r=u=i.parse(t,e,r,s),j=v,n&&(i._transform=f,c&&(c._prev=null,c._prev&&(c._prev._next=null)));r&&r!==c;){if(1>=r.type&&(a=r.p,p[a]=r.s+r.c,d[a]=r.s,n||(l=new pt(r,"s",a,l,r.r),r.c=0),1===r.type))for(o=r.l;--o>0;)h="xn"+o,a=r.p+"_"+h,p[a]=r.data[h],d[a]=r[h],n||(l=new pt(r,h,a,l,r.rxp[h]));r=r._next}return{proxy:d,end:p,firstMPT:l,pt:u}},U.CSSPropTween=function(t,e,r,s,o,a,h,l,u,c,d){this.t=t,this.p=e,this.s=r,this.c=s,this.n=h||e,t instanceof ft||n.push(this.n),this.r=l,this.type=a||0,u&&(this.pr=u,i=!0),this.b=void 0===c?r:c,this.e=void 0===d?r+s:d,o&&(this._next=o,o._prev=this)}),vt=o.parseComplex=function(t,e,i,r,s,n,o,a,h,l){i=i||n||"",o=new ft(t,e,0,0,o,l?2:1,null,!1,a,i,r),r+="";var c,d,p,f,v,m,y,x,b,T,w,S,A=i.split(", ").join(",").split(" "),R=r.split(", ").join(",").split(" "),O=A.length,P=!1!==u;for((-1!==r.indexOf(",")||-1!==i.indexOf(","))&&(A=A.join(" ").replace(L,", ").split(" "),R=R.join(" ").replace(L,", ").split(" "),O=A.length),O!==R.length&&(A=(n||"").split(" "),O=A.length),o.plugin=h,o.setRatio=l,c=0;O>c;c++)if(f=A[c],v=R[c],(x=parseFloat(f))||0===x)o.appendXtra("",x,st(v,x),v.replace(g,""),P&&-1!==v.indexOf("px"),!0);else if(s&&("#"===f.charAt(0)||at[f]||E.test(f)))S=","===v.charAt(v.length-1)?"),":")",f=lt(f),v=lt(v),b=f.length+v.length>6,b&&!z&&0===v[3]?(o["xs"+o.l]+=o.l?" transparent":"transparent",o.e=o.e.split(R[c]).join("transparent")):(z||(b=!1),o.appendXtra(b?"rgba(":"rgb(",f[0],v[0]-f[0],",",!0,!0).appendXtra("",f[1],v[1]-f[1],",",!0).appendXtra("",f[2],v[2]-f[2],b?",":S,!0),b&&(f=4>f.length?1:f[3],o.appendXtra("",f,(4>v.length?1:v[3])-f,S,!1)));else if(m=f.match(_)){if(!(y=v.match(g))||y.length!==m.length)return o;for(p=0,d=0;m.length>d;d++)w=m[d],T=f.indexOf(w,p),o.appendXtra(f.substr(p,T-p),Number(w),st(y[d],w),"",P&&"px"===f.substr(T+w.length,2),0===d),p=T+w.length;o["xs"+o.l]+=f.substr(p)}else o["xs"+o.l]+=o.l?" "+f:f;if(-1!==r.indexOf("=")&&o.data){for(S=o.xs0+o.data.s,c=1;o.l>c;c++)S+=o["xs"+c]+o.data["xn"+c];o.e=S+o["xs"+c]}return o.l||(o.type=-1,o.xs0=o.e),o.xfirst||o},_t=9;for(l=ft.prototype,l.l=l.pr=0;--_t>0;)l["xn"+_t]=0,l["xs"+_t]="";l.xs0="",l._next=l._prev=l.xfirst=l.data=l.plugin=l.setRatio=l.rxp=null,l.appendXtra=function(t,e,i,r,s,n){var o=this,a=o.l;return o["xs"+a]+=n&&a?" "+t:t||"",i||0===a||o.plugin?(o.l++,o.type=o.setRatio?2:1,o["xs"+o.l]=r||"",a>0?(o.data["xn"+a]=e+i,o.rxp["xn"+a]=s,o["xn"+a]=e,o.plugin||(o.xfirst=new ft(o,"xn"+a,e,i,o.xfirst||o,0,o.n,s,o.pr),o.xfirst.xs0=0),o):(o.data={s:e+i},o.rxp={},o.s=e,o.c=i,o.r=s,o)):(o["xs"+a]+=e+(r||""),o)};var gt=function(t,e){e=e||{},this.p=e.prefix?q(t)||t:t,h[t]=h[this.p]=this,this.format=e.formatter||ct(e.defaultValue,e.color,e.collapsible,e.multi),e.parser&&(this.parse=e.parser),this.clrs=e.color,this.multi=e.multi,this.keyword=e.keyword,this.dflt=e.defaultValue,this.pr=e.priority||0},mt=U._registerComplexSpecialProp=function(t,e,i){"object"!=typeof e&&(e={parser:i});var r,s,n=t.split(","),o=e.defaultValue;for(i=i||[o],r=0;n.length>r;r++)e.prefix=0===r&&e.prefix,e.defaultValue=i[r]||o,s=new gt(n[r],e)},yt=function(t){if(!h[t]){var e=t.charAt(0).toUpperCase()+t.substr(1)+"Plugin";mt(t,{parser:function(t,i,r,s,n,o,l){var u=a.com.greensock.plugins[e];return u?(u._cssRegister(),h[r].parse(t,i,r,s,n,o,l)):(G("Error: "+e+" js file not loaded."),n)}})}};l=gt.prototype,l.parseComplex=function(t,e,i,r,s,n){var o,a,h,l,u,c,d=this.keyword;if(this.multi&&(L.test(i)||L.test(e)?(a=e.replace(L,"|").split("|"),h=i.replace(L,"|").split("|")):d&&(a=[e],h=[i])),h){for(l=h.length>a.length?h.length:a.length,o=0;l>o;o++)e=a[o]=a[o]||this.dflt,i=h[o]=h[o]||this.dflt,d&&(u=e.indexOf(d),c=i.indexOf(d),u!==c&&(-1===c?a[o]=a[o].split(d).join(""):-1===u&&(a[o]+=" "+d)));e=a.join(", "),i=h.join(", ")}return vt(t,this.p,e,i,this.clrs,this.dflt,r,this.pr,s,n)},l.parse=function(t,e,i,r,n,o){return this.parseComplex(t.style,this.format(K(t,this.p,s,!1,this.dflt)),this.format(e),n,o)},o.registerSpecialProp=function(t,e,i){mt(t,{parser:function(t,r,s,n,o,a){var h=new ft(t,s,0,0,o,2,s,!1,i);return h.plugin=a,h.setRatio=e(t,r,n._tween,s),h},priority:i})},o.useSVGTransformAttr=d;var xt,bt="scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),Tt=q("transform"),wt=H+"transform",Et=q("transformOrigin"),St=null!==q("perspective"),At=U.Transform=function(){this.perspective=parseFloat(o.defaultTransformPerspective)||0,this.force3D=!(!1===o.defaultForce3D||!St)&&(o.defaultForce3D||"auto")},Rt=window.SVGElement,Ot=function(t,e,i){var r,s=k.createElementNS("http://www.w3.org/2000/svg",t),n=/([a-z])([A-Z])/g;for(r in i)s.setAttributeNS(null,r.replace(n,"$1-$2").toLowerCase(),i[r]);return e.appendChild(s),s},Pt=k.documentElement,Mt=function(){var t,e,i,r=v||/Android/i.test(X)&&!window.chrome;return k.createElementNS&&!r&&(t=Ot("svg",Pt),e=Ot("rect",t,{width:100,height:50,x:100}),i=e.getBoundingClientRect().width,e.style[Et]="50% 50%",e.style[Tt]="scaleX(0.5)",r=i===e.getBoundingClientRect().width&&!(p&&St),Pt.removeChild(t)),r}(),Ct=function(t,e,i,r){var s,n;r&&(n=r.split(" ")).length||(s=t.getBBox(),e=rt(e).split(" "),n=[(-1!==e[0].indexOf("%")?parseFloat(e[0])/100*s.width:parseFloat(e[0]))+s.x,(-1!==e[1].indexOf("%")?parseFloat(e[1])/100*s.height:parseFloat(e[1]))+s.y]),i.xOrigin=parseFloat(n[0]),i.yOrigin=parseFloat(n[1]),t.setAttribute("data-svg-origin",n.join(" "))},Lt=U.getTransform=function(t,e,i,r){if(t._gsTransform&&i&&!r)return t._gsTransform;var n,a,h,l,u,c,d,p,f,v,_=i?t._gsTransform||new At:new At,g=0>_.scaleX,m=2e-5,y=1e5,x=St?parseFloat(K(t,Et,e,!1,"0 0 0").split(" ")[2])||_.zOrigin||0:0,b=parseFloat(o.defaultTransformPerspective)||0;if(Tt?a=K(t,wt,e,!0):t.currentStyle&&(a=t.currentStyle.filter.match(M),a=a&&4===a.length?[a[0].substr(4),Number(a[2].substr(4)),Number(a[1].substr(4)),a[3].substr(4),_.x||0,_.y||0].join(","):""),n=!a||"none"===a||"matrix(1, 0, 0, 1, 0, 0)"===a,_.svg=!!(Rt&&"function"==typeof t.getBBox&&t.getCTM&&(!t.parentNode||t.parentNode.getBBox&&t.parentNode.getCTM)),_.svg&&(n&&-1!==(t.style[Tt]+"").indexOf("matrix")&&(a=t.style[Tt],n=!1),Ct(t,K(t,Et,s,!1,"50% 50%")+"",_,t.getAttribute("data-svg-origin")),xt=o.useSVGTransformAttr||Mt,h=t.getAttribute("transform"),n&&h&&-1!==h.indexOf("matrix")&&(a=h,n=0)),!n){for(h=(a||"").match(/(?:\-|\b)[\d\-\.e]+\b/gi)||[],l=h.length;--l>-1;)u=Number(h[l]),h[l]=(c=u-(u|=0))?(0|c*y+(0>c?-.5:.5))/y+u:u;if(16===h.length){var T,w,E,S,A,R=h[0],O=h[1],P=h[2],C=h[3],L=h[4],D=h[5],j=h[6],k=h[7],N=h[8],F=h[9],B=h[10],U=h[12],X=h[13],z=h[14],W=h[11],G=Math.atan2(j,B);_.zOrigin&&(z=-_.zOrigin,U=N*z-h[12],X=F*z-h[13],z=B*z+_.zOrigin-h[14]),_.rotationX=G*I,G&&(S=Math.cos(-G),A=Math.sin(-G),T=L*S+N*A,w=D*S+F*A,E=j*S+B*A,N=L*-A+N*S,F=D*-A+F*S,B=j*-A+B*S,W=k*-A+W*S,L=T,D=w,j=E),G=Math.atan2(N,B),_.rotationY=G*I,G&&(S=Math.cos(-G),A=Math.sin(-G),T=R*S-N*A,w=O*S-F*A,E=P*S-B*A,F=O*A+F*S,B=P*A+B*S,W=C*A+W*S,R=T,O=w,P=E),G=Math.atan2(O,R),_.rotation=G*I,G&&(S=Math.cos(-G),A=Math.sin(-G),R=R*S+L*A,w=O*S+D*A,D=O*-A+D*S,j=P*-A+j*S,O=w),_.rotationX&&Math.abs(_.rotationX)+Math.abs(_.rotation)>359.9&&(_.rotationX=_.rotation=0,_.rotationY+=180),_.scaleX=(0|Math.sqrt(R*R+O*O)*y+.5)/y,_.scaleY=(0|Math.sqrt(D*D+F*F)*y+.5)/y,_.scaleZ=(0|Math.sqrt(j*j+B*B)*y+.5)/y,_.skewX=0,_.perspective=W?1/(0>W?-W:W):0,_.x=U,_.y=X,_.z=z,_.svg&&(_.x-=_.xOrigin-(_.xOrigin*R-_.yOrigin*L),_.y-=_.yOrigin-(_.yOrigin*O-_.xOrigin*D))}else if(!(St&&!r&&h.length&&_.x===h[4]&&_.y===h[5]&&(_.rotationX||_.rotationY)||void 0!==_.x&&"none"===K(t,"display",e))){var H=h.length>=6,Y=H?h[0]:1,q=h[1]||0,V=h[2]||0,$=H?h[3]:1;_.x=h[4]||0,_.y=h[5]||0,d=Math.sqrt(Y*Y+q*q),p=Math.sqrt($*$+V*V),f=Y||q?Math.atan2(q,Y)*I:_.rotation||0,v=V||$?Math.atan2(V,$)*I+f:_.skewX||0,Math.abs(v)>90&&270>Math.abs(v)&&(g?(d*=-1,v+=0>=f?180:-180,f+=0>=f?180:-180):(p*=-1,v+=0>=v?180:-180)),_.scaleX=d,_.scaleY=p,_.rotation=f,_.skewX=v,St&&(_.rotationX=_.rotationY=_.z=0,_.perspective=b,_.scaleZ=1),_.svg&&(_.x-=_.xOrigin-(_.xOrigin*Y-_.yOrigin*q),_.y-=_.yOrigin-(_.yOrigin*$-_.xOrigin*V))}_.zOrigin=x;for(l in _)m>_[l]&&_[l]>-m&&(_[l]=0)}return i&&(t._gsTransform=_,_.svg&&(xt&&t.style[Tt]?Nt(t.style,Tt):!xt&&t.getAttribute("transform")&&t.removeAttribute("transform"))),_},Dt=function(t){var e,i,r=this.data,s=-r.rotation*D,n=s+r.skewX*D,o=1e5,a=(0|Math.cos(s)*r.scaleX*o)/o,h=(0|Math.sin(s)*r.scaleX*o)/o,l=(0|Math.sin(n)*-r.scaleY*o)/o,u=(0|Math.cos(n)*r.scaleY*o)/o,c=this.t.style,d=this.t.currentStyle;if(d){i=h,h=-l,l=-i,e=d.filter,c.filter="";var p,f,_=this.t.offsetWidth,g=this.t.offsetHeight,m="absolute"!==d.position,y="progid:DXImageTransform.Microsoft.Matrix(M11="+a+", M12="+h+", M21="+l+", M22="+u,T=r.x+_*r.xPercent/100,w=r.y+g*r.yPercent/100;if(null!=r.ox&&(p=(r.oxp?.01*_*r.ox:r.ox)-_/2,f=(r.oyp?.01*g*r.oy:r.oy)-g/2,T+=p-(p*a+f*h),w+=f-(p*l+f*u)),m?(p=_/2,f=g/2,y+=", Dx="+(p-(p*a+f*h)+T)+", Dy="+(f-(p*l+f*u)+w)+")"):y+=", sizingMethod='auto expand')",c.filter=-1!==e.indexOf("DXImageTransform.Microsoft.Matrix(")?e.replace(C,y):y+" "+e,(0===t||1===t)&&1===a&&0===h&&0===l&&1===u&&(m&&-1===y.indexOf("Dx=0, Dy=0")||b.test(e)&&100!==parseFloat(RegExp.$1)||-1===e.indexOf(e.indexOf("Alpha"))&&c.removeAttribute("filter")),!m){var E,S,A,R=8>v?1:-1;for(p=r.ieOffsetX||0,f=r.ieOffsetY||0,r.ieOffsetX=Math.round((_-((0>a?-a:a)*_+(0>h?-h:h)*g))/2+T),r.ieOffsetY=Math.round((g-((0>u?-u:u)*g+(0>l?-l:l)*_))/2+w),_t=0;4>_t;_t++)S=et[_t],E=d[S],i=-1!==E.indexOf("px")?parseFloat(E):$(this.t,S,parseFloat(E),E.replace(x,""))||0,A=i!==r[S]?2>_t?-r.ieOffsetX:-r.ieOffsetY:2>_t?p-r.ieOffsetX:f-r.ieOffsetY,c[S]=(r[S]=Math.round(i-A*(0===_t||2===_t?1:R)))+"px"}}},It=U.set3DTransformRatio=function(t){var e,i,r,s,n,o,a,h,l,u,c,d,f,v,_,g,m,y,x,b,T,w=this.data,E=this.t.style,S=w.rotation*D,A=w.scaleX,R=w.scaleY,O=w.scaleZ,P=w.x,M=w.y,C=w.z,L=w.perspective;if(!(1!==t&&0!==t&&w.force3D||!0===w.force3D||w.rotationY||w.rotationX||1!==O||L||C||this.tween._totalTime!==this.tween._totalDuration&&this.tween._totalTime))return void jt.call(this,t);if(p&&(v=1e-4,v>A&&A>-v&&(A=O=2e-5),v>R&&R>-v&&(R=O=2e-5),!L||w.z||w.rotationX||w.rotationY||(L=0)),S||w.skewX)_=e=Math.cos(S),g=s=Math.sin(S),w.skewX&&(S-=w.skewX*D,_=Math.cos(S),g=Math.sin(S),"simple"===w.skewType&&(m=Math.tan(w.skewX*D),m=Math.sqrt(1+m*m),_*=m,g*=m)),i=-g,n=_;else{if(!(w.rotationY||w.rotationX||1!==O||L||w.svg))return void(E[Tt]=(w.xPercent||w.yPercent?"translate("+w.xPercent+"%,"+w.yPercent+"%) translate3d(":"translate3d(")+P+"px,"+M+"px,"+C+"px)"+(1!==A||1!==R?" scale("+A+","+R+")":""));e=n=1,i=s=0}l=1,r=o=a=h=u=c=0,d=L?-1/L:0,f=w.zOrigin,v=1e-6,b=",",T="0",S=w.rotationY*D,S&&(_=Math.cos(S),g=Math.sin(S),a=-g,u=d*-g,r=e*g,o=s*g,l=_,d*=_,e*=_,s*=_),S=w.rotationX*D,S&&(_=Math.cos(S),g=Math.sin(S),m=i*_+r*g,y=n*_+o*g,h=l*g,c=d*g,r=i*-g+r*_,o=n*-g+o*_,l*=_,d*=_,i=m,n=y),1!==O&&(r*=O,o*=O,l*=O,d*=O),1!==R&&(i*=R,n*=R,h*=R,c*=R),1!==A&&(e*=A,s*=A,a*=A,u*=A),(f||w.svg)&&(f&&(P+=r*-f,M+=o*-f,C+=l*-f+f),w.svg&&(P+=w.xOrigin-(w.xOrigin*e+w.yOrigin*i),M+=w.yOrigin-(w.xOrigin*s+w.yOrigin*n)),v>P&&P>-v&&(P=T),v>M&&M>-v&&(M=T),v>C&&C>-v&&(C=0)),x=w.xPercent||w.yPercent?"translate("+w.xPercent+"%,"+w.yPercent+"%) matrix3d(":"matrix3d(",x+=(v>e&&e>-v?T:e)+b+(v>s&&s>-v?T:s)+b+(v>a&&a>-v?T:a),x+=b+(v>u&&u>-v?T:u)+b+(v>i&&i>-v?T:i)+b+(v>n&&n>-v?T:n),w.rotationX||w.rotationY?(x+=b+(v>h&&h>-v?T:h)+b+(v>c&&c>-v?T:c)+b+(v>r&&r>-v?T:r),x+=b+(v>o&&o>-v?T:o)+b+(v>l&&l>-v?T:l)+b+(v>d&&d>-v?T:d)+b):x+=",0,0,0,0,1,0,",x+=P+b+M+b+C+b+(L?1+-C/L:1)+")",E[Tt]=x},jt=U.set2DTransformRatio=function(t){var e,i,r,s,n,o,a,h,l,u,c,d,p=this.data,f=this.t,v=f.style,_=p.x,g=p.y;return!(p.rotationX||p.rotationY||p.z||!0===p.force3D||"auto"===p.force3D&&1!==t&&0!==t)||p.svg&&xt||!St?(s=p.scaleX,n=p.scaleY,void(p.rotation||p.skewX||p.svg?(e=p.rotation*D,i=p.skewX*D,r=1e5,o=Math.cos(e)*s,a=Math.sin(e)*s,h=Math.sin(e-i)*-n,l=Math.cos(e-i)*n,i&&"simple"===p.skewType&&(d=Math.tan(i),d=Math.sqrt(1+d*d),h*=d,l*=d),p.svg&&(_+=p.xOrigin-(p.xOrigin*o+p.yOrigin*h),g+=p.yOrigin-(p.xOrigin*a+p.yOrigin*l),c=1e-6,c>_&&_>-c&&(_=0),c>g&&g>-c&&(g=0)),u=(0|o*r)/r+","+(0|a*r)/r+","+(0|h*r)/r+","+(0|l*r)/r+","+_+","+g+")",p.svg&&xt?f.setAttribute("transform","matrix("+u):v[Tt]=(p.xPercent||p.yPercent?"translate("+p.xPercent+"%,"+p.yPercent+"%) matrix(":"matrix(")+u):v[Tt]=(p.xPercent||p.yPercent?"translate("+p.xPercent+"%,"+p.yPercent+"%) matrix(":"matrix(")+s+",0,0,"+n+","+_+","+g+")")):(this.setRatio=It,void It.call(this,t))};l=At.prototype,l.x=l.y=l.z=l.skewX=l.skewY=l.rotation=l.rotationX=l.rotationY=l.zOrigin=l.xPercent=l.yPercent=0,l.scaleX=l.scaleY=l.scaleZ=1,mt("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent",{parser:function(t,e,i,r,n,a,h){if(r._lastParsedTransform===h)return n;r._lastParsedTransform=h;var l,u,c,d,p,f,v,_=r._transform=Lt(t,s,!0,h.parseTransform),g=t.style,m=1e-6,y=bt.length,x=h,b={};if("string"==typeof x.transform&&Tt)c=F.style,c[Tt]=x.transform,c.display="block",c.position="absolute",k.body.appendChild(F),l=Lt(F,null,!1),k.body.removeChild(F);else if("object"==typeof x){if(l={scaleX:nt(null!=x.scaleX?x.scaleX:x.scale,_.scaleX),scaleY:nt(null!=x.scaleY?x.scaleY:x.scale,_.scaleY),scaleZ:nt(x.scaleZ,_.scaleZ),x:nt(x.x,_.x),y:nt(x.y,_.y),z:nt(x.z,_.z),xPercent:nt(x.xPercent,_.xPercent),yPercent:nt(x.yPercent,_.yPercent),perspective:nt(x.transformPerspective,_.perspective)},null!=(v=x.directionalRotation))if("object"==typeof v)for(c in v)x[c]=v[c];else x.rotation=v;"string"==typeof x.x&&-1!==x.x.indexOf("%")&&(l.x=0,l.xPercent=nt(x.x,_.xPercent)),"string"==typeof x.y&&-1!==x.y.indexOf("%")&&(l.y=0,l.yPercent=nt(x.y,_.yPercent)),l.rotation=ot("rotation"in x?x.rotation:"shortRotation"in x?x.shortRotation+"_short":"rotationZ"in x?x.rotationZ:_.rotation,_.rotation,"rotation",b),St&&(l.rotationX=ot("rotationX"in x?x.rotationX:"shortRotationX"in x?x.shortRotationX+"_short":_.rotationX||0,_.rotationX,"rotationX",b),l.rotationY=ot("rotationY"in x?x.rotationY:"shortRotationY"in x?x.shortRotationY+"_short":_.rotationY||0,_.rotationY,"rotationY",b)),l.skewX=null==x.skewX?_.skewX:ot(x.skewX,_.skewX),l.skewY=null==x.skewY?_.skewY:ot(x.skewY,_.skewY),(u=l.skewY-_.skewY)&&(l.skewX+=u,l.rotation+=u)}for(St&&null!=x.force3D&&(_.force3D=x.force3D,f=!0),_.skewType=x.skewType||_.skewType||o.defaultSkewType,(p=_.force3D||_.z||_.rotationX||_.rotationY||l.z||l.rotationX||l.rotationY||l.perspective)||null==x.scale||(l.scaleZ=1);--y>-1;)i=bt[y],((d=l[i]-_[i])>m||-m>d||null!=x[i]||null!=j[i])&&(f=!0,n=new ft(_,i,_[i],d,n),i in b&&(n.e=b[i]),n.xs0=0,n.plugin=a,r._overwriteProps.push(n.n));return d=x.transformOrigin,_.svg&&(d||x.svgOrigin)&&(Ct(t,rt(d),l,x.svgOrigin),n=new ft(_,"xOrigin",_.xOrigin,l.xOrigin-_.xOrigin,n,-1,"transformOrigin"),n.b=_.xOrigin,n.e=n.xs0=l.xOrigin,n=new ft(_,"yOrigin",_.yOrigin,l.yOrigin-_.yOrigin,n,-1,"transformOrigin"),n.b=_.yOrigin,n.e=n.xs0=l.yOrigin,d=xt?null:"0px 0px"),(d||St&&p&&_.zOrigin)&&(Tt?(f=!0,i=Et,d=(d||K(t,i,s,!1,"50% 50%"))+"",n=new ft(g,i,0,0,n,-1,"transformOrigin"),n.b=g[i],n.plugin=a,St?(c=_.zOrigin,d=d.split(" "),_.zOrigin=(d.length>2&&(0===c||"0px"!==d[2])?parseFloat(d[2]):c)||0,n.xs0=n.e=d[0]+" "+(d[1]||"50%")+" 0px",n=new ft(_,"zOrigin",0,0,n,-1,n.n),n.b=c,n.xs0=n.e=_.zOrigin):n.xs0=n.e=d):rt(d+"",_)),f&&(r._transformType=_.svg&&xt||!p&&3!==this._transformType?2:3),n},prefix:!0}),mt("boxShadow",{defaultValue:"0px 0px 0px 0px #999",prefix:!0,color:!0,multi:!0,keyword:"inset"}),mt("borderRadius",{defaultValue:"0px",parser:function(t,e,i,n,o){e=this.format(e);var a,h,l,u,c,d,p,f,v,_,g,m,y,x,b,T,w=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],E=t.style;for(v=parseFloat(t.offsetWidth),_=parseFloat(t.offsetHeight),a=e.split(" "),h=0;w.length>h;h++)this.p.indexOf("border")&&(w[h]=q(w[h])),c=u=K(t,w[h],s,!1,"0px"),-1!==c.indexOf(" ")&&(u=c.split(" "),c=u[0],u=u[1]),d=l=a[h],p=parseFloat(c),m=c.substr((p+"").length),y="="===d.charAt(1),y?(f=parseInt(d.charAt(0)+"1",10),d=d.substr(2),f*=parseFloat(d),g=d.substr((f+"").length-(0>f?1:0))||""):(f=parseFloat(d),g=d.substr((f+"").length)),""===g&&(g=r[i]||m),g!==m&&(x=$(t,"borderLeft",p,m),b=$(t,"borderTop",p,m),"%"===g?(c=x/v*100+"%",u=b/_*100+"%"):"em"===g?(T=$(t,"borderLeft",1,"em"),c=x/T+"em",u=b/T+"em"):(c=x+"px",u=b+"px"),y&&(d=parseFloat(c)+f+g,l=parseFloat(u)+f+g)),o=vt(E,w[h],c+" "+u,d+" "+l,!1,"0px",o);return o},prefix:!0,formatter:ct("0px 0px 0px 0px",!1,!0)}),mt("backgroundPosition",{defaultValue:"0 0",parser:function(t,e,i,r,n,o){var a,h,l,u,c,d,p="background-position",f=s||V(t,null),_=this.format((f?v?f.getPropertyValue(p+"-x")+" "+f.getPropertyValue(p+"-y"):f.getPropertyValue(p):t.currentStyle.backgroundPositionX+" "+t.currentStyle.backgroundPositionY)||"0 0"),g=this.format(e);if(-1!==_.indexOf("%")!=(-1!==g.indexOf("%"))&&(d=K(t,"backgroundImage").replace(R,""))&&"none"!==d){for(a=_.split(" "),h=g.split(" "),B.setAttribute("src",d),l=2;--l>-1;)_=a[l],(u=-1!==_.indexOf("%"))!==(-1!==h[l].indexOf("%"))&&(c=0===l?t.offsetWidth-B.width:t.offsetHeight-B.height,a[l]=u?parseFloat(_)/100*c+"px":parseFloat(_)/c*100+"%");_=a.join(" ")}return this.parseComplex(t.style,_,g,n,o)},formatter:rt}),mt("backgroundSize",{defaultValue:"0 0",formatter:rt}),mt("perspective",{defaultValue:"0px",prefix:!0}),mt("perspectiveOrigin",{defaultValue:"50% 50%",prefix:!0}),mt("transformStyle",{prefix:!0}),mt("backfaceVisibility",{prefix:!0}),mt("userSelect",{prefix:!0}),mt("margin",{parser:dt("marginTop,marginRight,marginBottom,marginLeft")}),mt("padding",{parser:dt("paddingTop,paddingRight,paddingBottom,paddingLeft")}),mt("clip",{defaultValue:"rect(0px,0px,0px,0px)",parser:function(t,e,i,r,n,o){var a,h,l;return 9>v?(h=t.currentStyle,l=8>v?" ":",",a="rect("+h.clipTop+l+h.clipRight+l+h.clipBottom+l+h.clipLeft+")",e=this.format(e).split(",").join(l)):(a=this.format(K(t,this.p,s,!1,this.dflt)),e=this.format(e)),this.parseComplex(t.style,a,e,n,o)}}),mt("textShadow",{defaultValue:"0px 0px 0px #999",color:!0,multi:!0}),mt("autoRound,strictUnits",{parser:function(t,e,i,r,s){return s}}),mt("border",{defaultValue:"0px solid #000",parser:function(t,e,i,r,n,o){return this.parseComplex(t.style,this.format(K(t,"borderTopWidth",s,!1,"0px")+" "+K(t,"borderTopStyle",s,!1,"solid")+" "+K(t,"borderTopColor",s,!1,"#000")),this.format(e),n,o)},color:!0,formatter:function(t){var e=t.split(" ");return e[0]+" "+(e[1]||"solid")+" "+(t.match(ut)||["#000"])[0]}}),mt("borderWidth",{parser:dt("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")}),mt("float,cssFloat,styleFloat",{parser:function(t,e,i,r,s){var n=t.style,o="cssFloat"in n?"cssFloat":"styleFloat";return new ft(n,o,0,0,s,-1,i,!1,0,n[o],e)}});var kt=function(t){var e,i=this.t,r=i.filter||K(this.data,"filter")||"",s=0|this.s+this.c*t;100===s&&(-1===r.indexOf("atrix(")&&-1===r.indexOf("radient(")&&-1===r.indexOf("oader(")?(i.removeAttribute("filter"),e=!K(this.data,"filter")):(i.filter=r.replace(w,""),e=!0)),e||(this.xn1&&(i.filter=r=r||"alpha(opacity="+s+")"),-1===r.indexOf("pacity")?0===s&&this.xn1||(i.filter=r+" alpha(opacity="+s+")"):i.filter=r.replace(b,"opacity="+s))};mt("opacity,alpha,autoAlpha",{defaultValue:"1",parser:function(t,e,i,r,n,o){var a=parseFloat(K(t,"opacity",s,!1,"1")),h=t.style,l="autoAlpha"===i;return"string"==typeof e&&"="===e.charAt(1)&&(e=("-"===e.charAt(0)?-1:1)*parseFloat(e.substr(2))+a),l&&1===a&&"hidden"===K(t,"visibility",s)&&0!==e&&(a=0),z?n=new ft(h,"opacity",a,e-a,n):(n=new ft(h,"opacity",100*a,100*(e-a),n),n.xn1=l?1:0,h.zoom=1,n.type=2,n.b="alpha(opacity="+n.s+")",n.e="alpha(opacity="+(n.s+n.c)+")",n.data=t,n.plugin=o,n.setRatio=kt),l&&(n=new ft(h,"visibility",0,0,n,-1,null,!1,0,0!==a?"inherit":"hidden",0===e?"hidden":"inherit"),n.xs0="inherit",r._overwriteProps.push(n.n),r._overwriteProps.push(i)),n}})
;var Nt=function(t,e){e&&(t.removeProperty?(("ms"===e.substr(0,2)||"webkit"===e.substr(0,6))&&(e="-"+e),t.removeProperty(e.replace(S,"-$1").toLowerCase())):t.removeAttribute(e))},Ft=function(t){if(this.t._gsClassPT=this,1===t||0===t){this.t.setAttribute("class",0===t?this.b:this.e);for(var e=this.data,i=this.t.style;e;)e.v?i[e.p]=e.v:Nt(i,e.p),e=e._next;1===t&&this.t._gsClassPT===this&&(this.t._gsClassPT=null)}else this.t.getAttribute("class")!==this.e&&this.t.setAttribute("class",this.e)};mt("className",{parser:function(t,e,r,n,o,a,h){var l,u,c,d,p,f=t.getAttribute("class")||"",v=t.style.cssText;if(o=n._classNamePT=new ft(t,r,0,0,o,2),o.setRatio=Ft,o.pr=-11,i=!0,o.b=f,u=Q(t,s),c=t._gsClassPT){for(d={},p=c.data;p;)d[p.p]=1,p=p._next;c.setRatio(1)}return t._gsClassPT=o,o.e="="!==e.charAt(1)?e:f.replace(RegExp("\\s*\\b"+e.substr(2)+"\\b"),"")+("+"===e.charAt(0)?" "+e.substr(2):""),n._tween._duration&&(t.setAttribute("class",o.e),l=Z(t,u,Q(t),h,d),t.setAttribute("class",f),o.data=l.firstMPT,t.style.cssText=v,o=o.xfirst=n.parse(t,l.difs,o,a)),o}});var Bt=function(t){if((1===t||0===t)&&this.data._totalTime===this.data._totalDuration&&"isFromStart"!==this.data.data){var e,i,r,s,n=this.t.style,o=h.transform.parse;if("all"===this.e)n.cssText="",s=!0;else for(e=this.e.split(" ").join("").split(","),r=e.length;--r>-1;)i=e[r],h[i]&&(h[i].parse===o?s=!0:i="transformOrigin"===i?Et:h[i].p),Nt(n,i);s&&(Nt(n,Tt),this.t._gsTransform&&delete this.t._gsTransform)}};for(mt("clearProps",{parser:function(t,e,r,s,n){return n=new ft(t,r,0,0,n,2),n.setRatio=Bt,n.e=e,n.pr=-10,n.data=s._tween,i=!0,n}}),l="bezier,throwProps,physicsProps,physics2D".split(","),_t=l.length;_t--;)yt(l[_t]);l=o.prototype,l._firstPT=l._lastParsedTransform=l._transform=null,l._onInitTween=function(t,e,a){if(!t.nodeType)return!1;this._target=t,this._tween=a,this._vars=e,u=e.autoRound,i=!1,r=e.suffixMap||o.suffixMap,s=V(t,""),n=this._overwriteProps;var h,l,p,v,_,g,m,y,x,b=t.style;if(c&&""===b.zIndex&&("auto"===(h=K(t,"zIndex",s))||""===h)&&this._addLazySet(b,"zIndex",0),"string"==typeof e&&(v=b.cssText,h=Q(t,s),b.cssText=v+";"+e,h=Z(t,h,Q(t)).difs,!z&&T.test(e)&&(h.opacity=parseFloat(RegExp.$1)),e=h,b.cssText=v),this._firstPT=l=this.parse(t,e,null),this._transformType){for(x=3===this._transformType,Tt?d&&(c=!0,""===b.zIndex&&("auto"===(m=K(t,"zIndex",s))||""===m)&&this._addLazySet(b,"zIndex",0),f&&this._addLazySet(b,"WebkitBackfaceVisibility",this._vars.WebkitBackfaceVisibility||(x?"visible":"hidden"))):b.zoom=1,p=l;p&&p._next;)p=p._next;y=new ft(t,"transform",0,0,null,2),this._linkCSSP(y,null,p),y.setRatio=x&&St?It:Tt?jt:Dt,y.data=this._transform||Lt(t,s,!0),y.tween=a,n.pop()}if(i){for(;l;){for(g=l._next,p=v;p&&p.pr>l.pr;)p=p._next;(l._prev=p?p._prev:_)?l._prev._next=l:v=l,(l._next=p)?p._prev=l:_=l,l=g}this._firstPT=v}return!0},l.parse=function(t,e,i,n){var o,a,l,c,d,p,f,v,_,g,m=t.style;for(o in e)p=e[o],a=h[o],a?i=a.parse(t,p,o,this,i,n,e):(d=K(t,o,s)+"",_="string"==typeof p,"color"===o||"fill"===o||"stroke"===o||-1!==o.indexOf("Color")||_&&E.test(p)?(_||(p=lt(p),p=(p.length>3?"rgba(":"rgb(")+p.join(",")+")"),i=vt(m,o,d,p,!0,"transparent",i,0,n)):!_||-1===p.indexOf(" ")&&-1===p.indexOf(",")?(l=parseFloat(d),f=l||0===l?d.substr((l+"").length):"",(""===d||"auto"===d)&&("width"===o||"height"===o?(l=it(t,o,s),f="px"):"left"===o||"top"===o?(l=J(t,o,s),f="px"):(l="opacity"!==o?0:1,f="")),g=_&&"="===p.charAt(1),g?(c=parseInt(p.charAt(0)+"1",10),p=p.substr(2),c*=parseFloat(p),v=p.replace(x,"")):(c=parseFloat(p),v=_?p.replace(x,""):""),""===v&&(v=o in r?r[o]:f),p=c||0===c?(g?c+l:c)+v:e[o],f!==v&&""!==v&&(c||0===c)&&l&&(l=$(t,o,l,f),"%"===v?(l/=$(t,o,100,"%")/100,!0!==e.strictUnits&&(d=l+"%")):"em"===v?l/=$(t,o,1,"em"):"px"!==v&&(c=$(t,o,c,v),v="px"),g&&(c||0===c)&&(p=c+l+v)),g&&(c+=l),!l&&0!==l||!c&&0!==c?void 0!==m[o]&&(p||"NaN"!=p+""&&null!=p)?(i=new ft(m,o,c||l||0,0,i,-1,o,!1,0,d,p),i.xs0="none"!==p||"display"!==o&&-1===o.indexOf("Style")?p:d):G("invalid "+o+" tween value: "+e[o]):(i=new ft(m,o,l,c-l,i,0,o,!1!==u&&("px"===v||"zIndex"===o),0,d,p),i.xs0=v)):i=vt(m,o,d,p,!0,null,i,0,n)),n&&i&&!i.plugin&&(i.plugin=n);return i},l.setRatio=function(t){var e,i,r,s=this._firstPT,n=1e-6;if(1!==t||this._tween._time!==this._tween._duration&&0!==this._tween._time)if(t||this._tween._time!==this._tween._duration&&0!==this._tween._time||-1e-6===this._tween._rawPrevTime)for(;s;){if(e=s.c*t+s.s,s.r?e=Math.round(e):n>e&&e>-n&&(e=0),s.type)if(1===s.type)if(2===(r=s.l))s.t[s.p]=s.xs0+e+s.xs1+s.xn1+s.xs2;else if(3===r)s.t[s.p]=s.xs0+e+s.xs1+s.xn1+s.xs2+s.xn2+s.xs3;else if(4===r)s.t[s.p]=s.xs0+e+s.xs1+s.xn1+s.xs2+s.xn2+s.xs3+s.xn3+s.xs4;else if(5===r)s.t[s.p]=s.xs0+e+s.xs1+s.xn1+s.xs2+s.xn2+s.xs3+s.xn3+s.xs4+s.xn4+s.xs5;else{for(i=s.xs0+e+s.xs1,r=1;s.l>r;r++)i+=s["xn"+r]+s["xs"+(r+1)];s.t[s.p]=i}else-1===s.type?s.t[s.p]=s.xs0:s.setRatio&&s.setRatio(t);else s.t[s.p]=e+s.xs0;s=s._next}else for(;s;)2!==s.type?s.t[s.p]=s.b:s.setRatio(t),s=s._next;else for(;s;)2!==s.type?s.t[s.p]=s.e:s.setRatio(t),s=s._next},l._enableTransforms=function(t){this._transform=this._transform||Lt(this._target,s,!0),this._transformType=this._transform.svg&&xt||!t&&3!==this._transformType?2:3};var Ut=function(){this.t[this.p]=this.e,this.data._linkCSSP(this,this._next,null,!0)};l._addLazySet=function(t,e,i){var r=this._firstPT=new ft(t,e,0,0,this._firstPT,2);r.e=i,r.setRatio=Ut,r.data=this},l._linkCSSP=function(t,e,i,r){return t&&(e&&(e._prev=t),t._next&&(t._next._prev=t._prev),t._prev?t._prev._next=t._next:this._firstPT===t&&(this._firstPT=t._next,r=!0),i?i._next=t:r||null!==this._firstPT||(this._firstPT=t),t._next=e,t._prev=i),t},l._kill=function(e){var i,r,s,n=e;if(e.autoAlpha||e.alpha){n={};for(r in e)n[r]=e[r];n.opacity=1,n.autoAlpha&&(n.visibility=1)}return e.className&&(i=this._classNamePT)&&(s=i.xfirst,s&&s._prev?this._linkCSSP(s._prev,i._next,s._prev._prev):s===this._firstPT&&(this._firstPT=i._next),i._next&&this._linkCSSP(i._next,i._next._next,s._prev),this._classNamePT=null),t.prototype._kill.call(this,n)};var Xt=function(t,e,i){var r,s,n,o;if(t.slice)for(s=t.length;--s>-1;)Xt(t[s],e,i);else for(r=t.childNodes,s=r.length;--s>-1;)n=r[s],o=n.type,n.style&&(e.push(Q(n)),i&&i.push(n)),1!==o&&9!==o&&11!==o||!n.childNodes.length||Xt(n,e,i)};return o.cascadeTo=function(t,i,r){var s,n,o,a,h=e.to(t,i,r),l=[h],u=[],c=[],d=[],p=e._internals.reservedProps;for(t=h._targets||h.target,Xt(t,u,d),h.render(i,!0,!0),Xt(t,c),h.render(0,!0,!0),h._enabled(!0),s=d.length;--s>-1;)if(n=Z(d[s],u[s],c[s]),n.firstMPT){n=n.difs;for(o in r)p[o]&&(n[o]=r[o]);a={};for(o in n)a[o]=u[s][o];l.push(e.fromTo(d[s],i,a,n))}return l},t.activate([o]),o},!0),function(){var t=_gsScope._gsDefine.plugin({propName:"roundProps",priority:-1,API:2,init:function(t,e,i){return this._tween=i,!0}}),e=t.prototype;e._onInitAllProps=function(){for(var t,e,i,r=this._tween,s=r.vars.roundProps instanceof Array?r.vars.roundProps:r.vars.roundProps.split(","),n=s.length,o={},a=r._propLookup.roundProps;--n>-1;)o[s[n]]=1;for(n=s.length;--n>-1;)for(t=s[n],e=r._firstPT;e;)i=e._next,e.pg?e.t._roundProps(o,!0):e.n===t&&(this._add(e.t,t,e.s,e.c),i&&(i._prev=e._prev),e._prev?e._prev._next=i:r._firstPT===e&&(r._firstPT=i),e._next=e._prev=null,r._propLookup[t]=a),e=i;return!1},e._add=function(t,e,i,r){this._addTween(t,e,i,i+r,e,!0),this._overwriteProps.push(e)}}(),_gsScope._gsDefine.plugin({propName:"attr",API:2,version:"0.3.3",init:function(t,e){var i,r,s;if("function"!=typeof t.setAttribute)return!1;this._target=t,this._proxy={},this._start={},this._end={};for(i in e)this._start[i]=this._proxy[i]=r=t.getAttribute(i),s=this._addTween(this._proxy,i,parseFloat(r),e[i],i),this._end[i]=s?s.s+s.c:e[i],this._overwriteProps.push(i);return!0},set:function(t){this._super.setRatio.call(this,t);for(var e,i=this._overwriteProps,r=i.length,s=1===t?this._end:t?this._proxy:this._start;--r>-1;)e=i[r],this._target.setAttribute(e,s[e]+"")}}),_gsScope._gsDefine.plugin({propName:"directionalRotation",version:"0.2.1",API:2,init:function(t,e){"object"!=typeof e&&(e={rotation:e}),this.finals={};var i,r,s,n,o,a,h=!0===e.useRadians?2*Math.PI:360,l=1e-6;for(i in e)"useRadians"!==i&&(a=(e[i]+"").split("_"),r=a[0],s=parseFloat("function"!=typeof t[i]?t[i]:t[i.indexOf("set")||"function"!=typeof t["get"+i.substr(3)]?i:"get"+i.substr(3)]()),n=this.finals[i]="string"==typeof r&&"="===r.charAt(1)?s+parseInt(r.charAt(0)+"1",10)*Number(r.substr(2)):Number(r)||0,o=n-s,a.length&&(r=a.join("_"),-1!==r.indexOf("short")&&(o%=h)!==o%(h/2)&&(o=0>o?o+h:o-h),-1!==r.indexOf("_cw")&&0>o?o=(o+9999999999*h)%h-(0|o/h)*h:-1!==r.indexOf("ccw")&&o>0&&(o=(o-9999999999*h)%h-(0|o/h)*h)),(o>l||-l>o)&&(this._addTween(t,i,s,s+o,i),this._overwriteProps.push(i)));return!0},set:function(t){var e;if(1!==t)this._super.setRatio.call(this,t);else for(e=this._firstPT;e;)e.f?e.t[e.p](this.finals[e.p]):e.t[e.p]=this.finals[e.p],e=e._next}})._autoCSS=!0,_gsScope._gsDefine("easing.Back",["easing.Ease"],function(t){var e,i,r,s=_gsScope.GreenSockGlobals||_gsScope,n=s.com.greensock,o=2*Math.PI,a=Math.PI/2,h=n._class,l=function(e,i){var r=h("easing."+e,function(){},!0),s=r.prototype=new t;return s.constructor=r,s.getRatio=i,r},u=t.register||function(){},c=function(t,e,i,r){var s=h("easing."+t,{easeOut:new e,easeIn:new i,easeInOut:new r},!0);return u(s,t),s},d=function(t,e,i){this.t=t,this.v=e,i&&(this.next=i,i.prev=this,this.c=i.v-e,this.gap=i.t-t)},p=function(e,i){var r=h("easing."+e,function(t){this._p1=t||0===t?t:1.70158,this._p2=1.525*this._p1},!0),s=r.prototype=new t;return s.constructor=r,s.getRatio=i,s.config=function(t){return new r(t)},r},f=c("Back",p("BackOut",function(t){return(t-=1)*t*((this._p1+1)*t+this._p1)+1}),p("BackIn",function(t){return t*t*((this._p1+1)*t-this._p1)}),p("BackInOut",function(t){return 1>(t*=2)?.5*t*t*((this._p2+1)*t-this._p2):.5*((t-=2)*t*((this._p2+1)*t+this._p2)+2)})),v=h("easing.SlowMo",function(t,e,i){e=e||0===e?e:.7,null==t?t=.7:t>1&&(t=1),this._p=1!==t?e:0,this._p1=(1-t)/2,this._p2=t,this._p3=this._p1+this._p2,this._calcEnd=!0===i},!0),_=v.prototype=new t;return _.constructor=v,_.getRatio=function(t){var e=t+(.5-t)*this._p;return this._p1>t?this._calcEnd?1-(t=1-t/this._p1)*t:e-(t=1-t/this._p1)*t*t*t*e:t>this._p3?this._calcEnd?1-(t=(t-this._p3)/this._p1)*t:e+(t-e)*(t=(t-this._p3)/this._p1)*t*t*t:this._calcEnd?1:e},v.ease=new v(.7,.7),_.config=v.config=function(t,e,i){return new v(t,e,i)},e=h("easing.SteppedEase",function(t){t=t||1,this._p1=1/t,this._p2=t+1},!0),_=e.prototype=new t,_.constructor=e,_.getRatio=function(t){return 0>t?t=0:t>=1&&(t=.999999999),(this._p2*t>>0)*this._p1},_.config=e.config=function(t){return new e(t)},i=h("easing.RoughEase",function(e){e=e||{};for(var i,r,s,n,o,a,h=e.taper||"none",l=[],u=0,c=0|(e.points||20),p=c,f=!1!==e.randomize,v=!0===e.clamp,_=e.template instanceof t?e.template:null,g="number"==typeof e.strength?.4*e.strength:.4;--p>-1;)i=f?Math.random():1/c*p,r=_?_.getRatio(i):i,"none"===h?s=g:"out"===h?(n=1-i,s=n*n*g):"in"===h?s=i*i*g:.5>i?(n=2*i,s=.5*n*n*g):(n=2*(1-i),s=.5*n*n*g),f?r+=Math.random()*s-.5*s:p%2?r+=.5*s:r-=.5*s,v&&(r>1?r=1:0>r&&(r=0)),l[u++]={x:i,y:r};for(l.sort(function(t,e){return t.x-e.x}),a=new d(1,1,null),p=c;--p>-1;)o=l[p],a=new d(o.x,o.y,a);this._prev=new d(0,0,0!==a.t?a:a.next)},!0),_=i.prototype=new t,_.constructor=i,_.getRatio=function(t){var e=this._prev;if(t>e.t){for(;e.next&&t>=e.t;)e=e.next;e=e.prev}else for(;e.prev&&e.t>=t;)e=e.prev;return this._prev=e,e.v+(t-e.t)/e.gap*e.c},_.config=function(t){return new i(t)},i.ease=new i,c("Bounce",l("BounceOut",function(t){return 1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375}),l("BounceIn",function(t){return 1/2.75>(t=1-t)?1-7.5625*t*t:2/2.75>t?1-(7.5625*(t-=1.5/2.75)*t+.75):2.5/2.75>t?1-(7.5625*(t-=2.25/2.75)*t+.9375):1-(7.5625*(t-=2.625/2.75)*t+.984375)}),l("BounceInOut",function(t){var e=.5>t;return t=e?1-2*t:2*t-1,t=1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375,e?.5*(1-t):.5*t+.5})),c("Circ",l("CircOut",function(t){return Math.sqrt(1-(t-=1)*t)}),l("CircIn",function(t){return-(Math.sqrt(1-t*t)-1)}),l("CircInOut",function(t){return 1>(t*=2)?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)})),r=function(e,i,r){var s=h("easing."+e,function(t,e){this._p1=t>=1?t:1,this._p2=(e||r)/(1>t?t:1),this._p3=this._p2/o*(Math.asin(1/this._p1)||0),this._p2=o/this._p2},!0),n=s.prototype=new t;return n.constructor=s,n.getRatio=i,n.config=function(t,e){return new s(t,e)},s},c("Elastic",r("ElasticOut",function(t){return this._p1*Math.pow(2,-10*t)*Math.sin((t-this._p3)*this._p2)+1},.3),r("ElasticIn",function(t){return-this._p1*Math.pow(2,10*(t-=1))*Math.sin((t-this._p3)*this._p2)},.3),r("ElasticInOut",function(t){return 1>(t*=2)?-.5*this._p1*Math.pow(2,10*(t-=1))*Math.sin((t-this._p3)*this._p2):.5*this._p1*Math.pow(2,-10*(t-=1))*Math.sin((t-this._p3)*this._p2)+1},.45)),c("Expo",l("ExpoOut",function(t){return 1-Math.pow(2,-10*t)}),l("ExpoIn",function(t){return Math.pow(2,10*(t-1))-.001}),l("ExpoInOut",function(t){return 1>(t*=2)?.5*Math.pow(2,10*(t-1)):.5*(2-Math.pow(2,-10*(t-1)))})),c("Sine",l("SineOut",function(t){return Math.sin(t*a)}),l("SineIn",function(t){return 1-Math.cos(t*a)}),l("SineInOut",function(t){return-.5*(Math.cos(Math.PI*t)-1)})),h("easing.EaseLookup",{find:function(e){return t.map[e]}},!0),u(s.SlowMo,"SlowMo","ease,"),u(i,"RoughEase","ease,"),u(e,"SteppedEase","ease,"),f},!0)}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),function(t,e){"use strict";var i=t.GreenSockGlobals=t.GreenSockGlobals||t;if(!i.TweenLite){var r,s,n,o,a,h=function(t){var e,r=t.split("."),s=i;for(e=0;r.length>e;e++)s[r[e]]=s=s[r[e]]||{};return s},l=h("com.greensock"),u=1e-10,c=function(t){var e,i=[],r=t.length;for(e=0;e!==r;i.push(t[e++]));return i},d=function(){},p=function(){var t=Object.prototype.toString,e=t.call([]);return function(i){return null!=i&&(i instanceof Array||"object"==typeof i&&!!i.push&&t.call(i)===e)}}(),f={},v=function(r,s,n,o){this.sc=f[r]?f[r].sc:[],f[r]=this,this.gsClass=null,this.func=n;var a=[];this.check=function(l){for(var u,c,d,p,_=s.length,g=_;--_>-1;)(u=f[s[_]]||new v(s[_],[])).gsClass?(a[_]=u.gsClass,g--):l&&u.sc.push(this);if(0===g&&n)for(c=("com.greensock."+r).split("."),d=c.pop(),p=h(c.join("."))[d]=this.gsClass=n.apply(n,a),o&&(i[d]=p,"function"==typeof define&&define.amd?define((t.GreenSockAMDPath?t.GreenSockAMDPath+"/":"")+r.split(".").pop(),[],function(){return p}):r===e&&"undefined"!=typeof module&&module.exports&&(module.exports=p)),_=0;this.sc.length>_;_++)this.sc[_].check()},this.check(!0)},_=t._gsDefine=function(t,e,i,r){return new v(t,e,i,r)},g=l._class=function(t,e,i){return e=e||function(){},_(t,[],function(){return e},i),e};_.globals=i;var m=[0,0,1,1],y=[],x=g("easing.Ease",function(t,e,i,r){this._func=t,this._type=i||0,this._power=r||0,this._params=e?m.concat(e):m},!0),b=x.map={},T=x.register=function(t,e,i,r){for(var s,n,o,a,h=e.split(","),u=h.length,c=(i||"easeIn,easeOut,easeInOut").split(",");--u>-1;)for(n=h[u],s=r?g("easing."+n,null,!0):l.easing[n]||{},o=c.length;--o>-1;)a=c[o],b[n+"."+a]=b[a+n]=s[a]=t.getRatio?t:t[a]||new t};for(n=x.prototype,n._calcEnd=!1,n.getRatio=function(t){if(this._func)return this._params[0]=t,this._func.apply(null,this._params);var e=this._type,i=this._power,r=1===e?1-t:2===e?t:.5>t?2*t:2*(1-t);return 1===i?r*=r:2===i?r*=r*r:3===i?r*=r*r*r:4===i&&(r*=r*r*r*r),1===e?1-r:2===e?r:.5>t?r/2:1-r/2},r=["Linear","Quad","Cubic","Quart","Quint,Strong"],s=r.length;--s>-1;)n=r[s]+",Power"+s,T(new x(null,null,1,s),n,"easeOut",!0),T(new x(null,null,2,s),n,"easeIn"+(0===s?",easeNone":"")),T(new x(null,null,3,s),n,"easeInOut");b.linear=l.easing.Linear.easeIn,b.swing=l.easing.Quad.easeInOut;var w=g("events.EventDispatcher",function(t){this._listeners={},this._eventTarget=t||this});n=w.prototype,n.addEventListener=function(t,e,i,r,s){s=s||0;var n,h,l=this._listeners[t],u=0;for(null==l&&(this._listeners[t]=l=[]),h=l.length;--h>-1;)n=l[h],n.c===e&&n.s===i?l.splice(h,1):0===u&&s>n.pr&&(u=h+1);l.splice(u,0,{c:e,s:i,up:r,pr:s}),this!==o||a||o.wake()},n.removeEventListener=function(t,e){var i,r=this._listeners[t];if(r)for(i=r.length;--i>-1;)if(r[i].c===e)return void r.splice(i,1)},n.dispatchEvent=function(t){var e,i,r,s=this._listeners[t];if(s)for(e=s.length,i=this._eventTarget;--e>-1;)(r=s[e])&&(r.up?r.c.call(r.s||i,{type:t,target:i}):r.c.call(r.s||i))};var E=t.requestAnimationFrame,S=t.cancelAnimationFrame,A=Date.now||function(){return(new Date).getTime()},R=A();for(r=["ms","moz","webkit","o"],s=r.length;--s>-1&&!E;)E=t[r[s]+"RequestAnimationFrame"],S=t[r[s]+"CancelAnimationFrame"]||t[r[s]+"CancelRequestAnimationFrame"];g("Ticker",function(t,e){var i,r,s,n,h,l=this,c=A(),p=!1!==e&&E,f=500,v=33,_="tick",g=function(t){var e,o,a=A()-R;a>f&&(c+=a-v),R+=a,l.time=(R-c)/1e3,e=l.time-h,(!i||e>0||!0===t)&&(l.frame++,h+=e+(e>=n?.004:n-e),o=!0),!0!==t&&(s=r(g)),o&&l.dispatchEvent(_)};w.call(l),l.time=l.frame=0,l.tick=function(){g(!0)},l.lagSmoothing=function(t,e){f=t||1/u,v=Math.min(e,f,0)},l.sleep=function(){null!=s&&(p&&S?S(s):clearTimeout(s),r=d,s=null,l===o&&(a=!1))},l.wake=function(){null!==s?l.sleep():l.frame>10&&(R=A()-f+5),r=0===i?d:p&&E?E:function(t){return setTimeout(t,0|1e3*(h-l.time)+1)},l===o&&(a=!0),g(2)},l.fps=function(t){return arguments.length?(i=t,n=1/(i||60),h=this.time+n,void l.wake()):i},l.useRAF=function(t){return arguments.length?(l.sleep(),p=t,void l.fps(i)):p},l.fps(t),setTimeout(function(){p&&(!s||5>l.frame)&&l.useRAF(!1)},1500)}),n=l.Ticker.prototype=new l.events.EventDispatcher,n.constructor=l.Ticker;var O=g("core.Animation",function(t,e){if(this.vars=e=e||{},this._duration=this._totalDuration=t||0,this._delay=Number(e.delay)||0,this._timeScale=1,this._active=!0===e.immediateRender,this.data=e.data,this._reversed=!0===e.reversed,W){a||o.wake();var i=this.vars.useFrames?z:W;i.add(this,i._time),this.vars.paused&&this.paused(!0)}});o=O.ticker=new l.Ticker,n=O.prototype,n._dirty=n._gc=n._initted=n._paused=!1,n._totalTime=n._time=0,n._rawPrevTime=-1,n._next=n._last=n._onUpdate=n._timeline=n.timeline=null,n._paused=!1;var P=function(){a&&A()-R>2e3&&o.wake(),setTimeout(P,2e3)};P(),n.play=function(t,e){return null!=t&&this.seek(t,e),this.reversed(!1).paused(!1)},n.pause=function(t,e){return null!=t&&this.seek(t,e),this.paused(!0)},n.resume=function(t,e){return null!=t&&this.seek(t,e),this.paused(!1)},n.seek=function(t,e){return this.totalTime(Number(t),!1!==e)},n.restart=function(t,e){return this.reversed(!1).paused(!1).totalTime(t?-this._delay:0,!1!==e,!0)},n.reverse=function(t,e){return null!=t&&this.seek(t||this.totalDuration(),e),this.reversed(!0).paused(!1)},n.render=function(){},n.invalidate=function(){return this._time=this._totalTime=0,this._initted=this._gc=!1,this._rawPrevTime=-1,(this._gc||!this.timeline)&&this._enabled(!0),this},n.isActive=function(){var t,e=this._timeline,i=this._startTime;return!e||!this._gc&&!this._paused&&e.isActive()&&(t=e.rawTime())>=i&&i+this.totalDuration()/this._timeScale>t},n._enabled=function(t,e){return a||o.wake(),this._gc=!t,this._active=this.isActive(),!0!==e&&(t&&!this.timeline?this._timeline.add(this,this._startTime-this._delay):!t&&this.timeline&&this._timeline._remove(this,!0)),!1},n._kill=function(){return this._enabled(!1,!1)},n.kill=function(t,e){return this._kill(t,e),this},n._uncache=function(t){for(var e=t?this:this.timeline;e;)e._dirty=!0,e=e.timeline;return this},n._swapSelfInParams=function(t){for(var e=t.length,i=t.concat();--e>-1;)"{self}"===t[e]&&(i[e]=this);return i},n.eventCallback=function(t,e,i,r){if("on"===(t||"").substr(0,2)){var s=this.vars;if(1===arguments.length)return s[t];null==e?delete s[t]:(s[t]=e,s[t+"Params"]=p(i)&&-1!==i.join("").indexOf("{self}")?this._swapSelfInParams(i):i,s[t+"Scope"]=r),"onUpdate"===t&&(this._onUpdate=e)}return this},n.delay=function(t){return arguments.length?(this._timeline.smoothChildTiming&&this.startTime(this._startTime+t-this._delay),this._delay=t,this):this._delay},n.duration=function(t){return arguments.length?(this._duration=this._totalDuration=t,this._uncache(!0),this._timeline.smoothChildTiming&&this._time>0&&this._time<this._duration&&0!==t&&this.totalTime(this._totalTime*(t/this._duration),!0),this):(this._dirty=!1,this._duration)},n.totalDuration=function(t){return this._dirty=!1,arguments.length?this.duration(t):this._totalDuration},n.time=function(t,e){return arguments.length?(this._dirty&&this.totalDuration(),this.totalTime(t>this._duration?this._duration:t,e)):this._time},n.totalTime=function(t,e,i){if(a||o.wake(),!arguments.length)return this._totalTime;if(this._timeline){if(0>t&&!i&&(t+=this.totalDuration()),this._timeline.smoothChildTiming){this._dirty&&this.totalDuration();var r=this._totalDuration,s=this._timeline;if(t>r&&!i&&(t=r),this._startTime=(this._paused?this._pauseTime:s._time)-(this._reversed?r-t:t)/this._timeScale,s._dirty||this._uncache(!1),s._timeline)for(;s._timeline;)s._timeline._time!==(s._startTime+s._totalTime)/s._timeScale&&s.totalTime(s._totalTime,!0),s=s._timeline}this._gc&&this._enabled(!0,!1),(this._totalTime!==t||0===this._duration)&&(this.render(t,e,!1),I.length&&H())}return this},n.progress=n.totalProgress=function(t,e){return arguments.length?this.totalTime(this.duration()*t,e):this._time/this.duration()},n.startTime=function(t){return arguments.length?(t!==this._startTime&&(this._startTime=t,this.timeline&&this.timeline._sortChildren&&this.timeline.add(this,t-this._delay)),this):this._startTime},n.endTime=function(t){return this._startTime+(0!=t?this.totalDuration():this.duration())/this._timeScale},n.timeScale=function(t){if(!arguments.length)return this._timeScale;if(t=t||u,this._timeline&&this._timeline.smoothChildTiming){var e=this._pauseTime,i=e||0===e?e:this._timeline.totalTime();this._startTime=i-(i-this._startTime)*this._timeScale/t}return this._timeScale=t,this._uncache(!1)},n.reversed=function(t){return arguments.length?(t!=this._reversed&&(this._reversed=t,this.totalTime(this._timeline&&!this._timeline.smoothChildTiming?this.totalDuration()-this._totalTime:this._totalTime,!0)),this):this._reversed},n.paused=function(t){if(!arguments.length)return this._paused;var e,i,r=this._timeline;return t!=this._paused&&r&&(a||t||o.wake(),e=r.rawTime(),i=e-this._pauseTime,!t&&r.smoothChildTiming&&(this._startTime+=i,this._uncache(!1)),this._pauseTime=t?e:null,this._paused=t,this._active=this.isActive(),!t&&0!==i&&this._initted&&this.duration()&&this.render(r.smoothChildTiming?this._totalTime:(e-this._startTime)/this._timeScale,!0,!0)),this._gc&&!t&&this._enabled(!0,!1),this};var M=g("core.SimpleTimeline",function(t){O.call(this,0,t),this.autoRemoveChildren=this.smoothChildTiming=!0});n=M.prototype=new O,n.constructor=M,n.kill()._gc=!1,n._first=n._last=n._recent=null,n._sortChildren=!1,n.add=n.insert=function(t,e){var i,r;if(t._startTime=Number(e||0)+t._delay,t._paused&&this!==t._timeline&&(t._pauseTime=t._startTime+(this.rawTime()-t._startTime)/t._timeScale),t.timeline&&t.timeline._remove(t,!0),t.timeline=t._timeline=this,t._gc&&t._enabled(!0,!0),i=this._last,this._sortChildren)for(r=t._startTime;i&&i._startTime>r;)i=i._prev;return i?(t._next=i._next,i._next=t):(t._next=this._first,this._first=t),t._next?t._next._prev=t:this._last=t,t._prev=i,this._recent=t,this._timeline&&this._uncache(!0),this},n._remove=function(t,e){return t.timeline===this&&(e||t._enabled(!1,!0),t._prev?t._prev._next=t._next:this._first===t&&(this._first=t._next),t._next?t._next._prev=t._prev:this._last===t&&(this._last=t._prev),t._next=t._prev=t.timeline=null,t===this._recent&&(this._recent=this._last),this._timeline&&this._uncache(!0)),this},n.render=function(t,e,i){var r,s=this._first;for(this._totalTime=this._time=this._rawPrevTime=t;s;)r=s._next,(s._active||t>=s._startTime&&!s._paused)&&(s._reversed?s.render((s._dirty?s.totalDuration():s._totalDuration)-(t-s._startTime)*s._timeScale,e,i):s.render((t-s._startTime)*s._timeScale,e,i)),s=r},n.rawTime=function(){return a||o.wake(),this._totalTime};var C=g("TweenLite",function(e,i,r){if(O.call(this,i,r),this.render=C.prototype.render,null==e)throw"Cannot tween a null target.";this.target=e="string"!=typeof e?e:C.selector(e)||e;var s,n,o,a=e.jquery||e.length&&e!==t&&e[0]&&(e[0]===t||e[0].nodeType&&e[0].style&&!e.nodeType),h=this.vars.overwrite;if(this._overwrite=h=null==h?X[C.defaultOverwrite]:"number"==typeof h?h>>0:X[h],(a||e instanceof Array||e.push&&p(e))&&"number"!=typeof e[0])for(this._targets=o=c(e),this._propLookup=[],this._siblings=[],s=0;o.length>s;s++)n=o[s],n?"string"!=typeof n?n.length&&n!==t&&n[0]&&(n[0]===t||n[0].nodeType&&n[0].style&&!n.nodeType)?(o.splice(s--,1),this._targets=o=o.concat(c(n))):(this._siblings[s]=Y(n,this,!1),1===h&&this._siblings[s].length>1&&V(n,this,null,1,this._siblings[s])):"string"==typeof(n=o[s--]=C.selector(n))&&o.splice(s+1,1):o.splice(s--,1);else this._propLookup={},this._siblings=Y(e,this,!1),1===h&&this._siblings.length>1&&V(e,this,null,1,this._siblings);(this.vars.immediateRender||0===i&&0===this._delay&&!1!==this.vars.immediateRender)&&(this._time=-u,this.render(-this._delay))},!0),L=function(e){return e&&e.length&&e!==t&&e[0]&&(e[0]===t||e[0].nodeType&&e[0].style&&!e.nodeType)},D=function(t,e){var i,r={};for(i in t)U[i]||i in e&&"transform"!==i&&"x"!==i&&"y"!==i&&"width"!==i&&"height"!==i&&"className"!==i&&"border"!==i||!(!N[i]||N[i]&&N[i]._autoCSS)||(r[i]=t[i],delete t[i]);t.css=r};n=C.prototype=new O,n.constructor=C,n.kill()._gc=!1,n.ratio=0,n._firstPT=n._targets=n._overwrittenProps=n._startAt=null,n._notifyPluginsOfEnabled=n._lazy=!1,C.version="1.16.0",C.defaultEase=n._ease=new x(null,null,1,1),C.defaultOverwrite="auto",C.ticker=o,C.autoSleep=120,C.lagSmoothing=function(t,e){o.lagSmoothing(t,e)},C.selector=t.$||t.jQuery||function(e){var i=t.$||t.jQuery;return i?(C.selector=i,i(e)):"undefined"==typeof document?e:document.querySelectorAll?document.querySelectorAll(e):document.getElementById("#"===e.charAt(0)?e.substr(1):e)};var I=[],j={},k=C._internals={isArray:p,isSelector:L,lazyTweens:I},N=C._plugins={},F=k.tweenLookup={},B=0,U=k.reservedProps={ease:1,delay:1,overwrite:1,onComplete:1,onCompleteParams:1,onCompleteScope:1,useFrames:1,runBackwards:1,startAt:1,onUpdate:1,onUpdateParams:1,onUpdateScope:1,onStart:1,onStartParams:1,onStartScope:1,onReverseComplete:1,onReverseCompleteParams:1,onReverseCompleteScope:1,onRepeat:1,onRepeatParams:1,onRepeatScope:1,easeParams:1,yoyo:1,immediateRender:1,repeat:1,repeatDelay:1,data:1,paused:1,reversed:1,autoCSS:1,lazy:1,onOverwrite:1},X={none:0,all:1,auto:2,concurrent:3,allOnStart:4,preexisting:5,true:1,false:0},z=O._rootFramesTimeline=new M,W=O._rootTimeline=new M,G=30,H=k.lazyRender=function(){var t,e=I.length;for(j={};--e>-1;)(t=I[e])&&!1!==t._lazy&&(t.render(t._lazy[0],t._lazy[1],!0),t._lazy=!1);I.length=0};W._startTime=o.time,z._startTime=o.frame,W._active=z._active=!0,setTimeout(H,1),O._updateRoot=C.render=function(){var t,e,i;if(I.length&&H(),W.render((o.time-W._startTime)*W._timeScale,!1,!1),z.render((o.frame-z._startTime)*z._timeScale,!1,!1),I.length&&H(),o.frame>=G){G=o.frame+(parseInt(C.autoSleep,10)||120);for(i in F){for(e=F[i].tweens,t=e.length;--t>-1;)e[t]._gc&&e.splice(t,1);0===e.length&&delete F[i]}if((!(i=W._first)||i._paused)&&C.autoSleep&&!z._first&&1===o._listeners.tick.length){for(;i&&i._paused;)i=i._next;i||o.sleep()}}},o.addEventListener("tick",O._updateRoot);var Y=function(t,e,i){var r,s,n=t._gsTweenID;if(F[n||(t._gsTweenID=n="t"+B++)]||(F[n]={target:t,tweens:[]}),e&&(r=F[n].tweens,r[s=r.length]=e,i))for(;--s>-1;)r[s]===e&&r.splice(s,1);return F[n].tweens},q=function(t,e,i,r){var s,n,o=t.vars.onOverwrite;return o&&(s=o(t,e,i,r)),o=C.onOverwrite,o&&(n=o(t,e,i,r)),!1!==s&&!1!==n},V=function(t,e,i,r,s){var n,o,a,h;if(1===r||r>=4){for(h=s.length,n=0;h>n;n++)if((a=s[n])!==e)a._gc||q(a,e)&&a._enabled(!1,!1)&&(o=!0);else if(5===r)break;return o}var l,c=e._startTime+u,d=[],p=0,f=0===e._duration;for(n=s.length;--n>-1;)(a=s[n])===e||a._gc||a._paused||(a._timeline!==e._timeline?(l=l||K(e,0,f),0===K(a,l,f)&&(d[p++]=a)):c>=a._startTime&&a._startTime+a.totalDuration()/a._timeScale>c&&((f||!a._initted)&&2e-10>=c-a._startTime||(d[p++]=a)));for(n=p;--n>-1;)if(a=d[n],2===r&&a._kill(i,t,e)&&(o=!0),2!==r||!a._firstPT&&a._initted){if(2!==r&&!q(a,e))continue;a._enabled(!1,!1)&&(o=!0)}return o},K=function(t,e,i){for(var r=t._timeline,s=r._timeScale,n=t._startTime;r._timeline;){if(n+=r._startTime,s*=r._timeScale,r._paused)return-100;r=r._timeline}return n/=s,n>e?n-e:i&&n===e||!t._initted&&2*u>n-e?u:(n+=t.totalDuration()/t._timeScale/s)>e+u?0:n-e-u};n._init=function(){var t,e,i,r,s,n=this.vars,o=this._overwrittenProps,a=this._duration,h=!!n.immediateRender,l=n.ease;if(n.startAt){this._startAt&&(this._startAt.render(-1,!0),this._startAt.kill()),s={};for(r in n.startAt)s[r]=n.startAt[r];if(s.overwrite=!1,s.immediateRender=!0,s.lazy=h&&!1!==n.lazy,s.startAt=s.delay=null,this._startAt=C.to(this.target,0,s),h)if(this._time>0)this._startAt=null;else if(0!==a)return}else if(n.runBackwards&&0!==a)if(this._startAt)this._startAt.render(-1,!0),this._startAt.kill(),this._startAt=null;else{0!==this._time&&(h=!1),i={};for(r in n)U[r]&&"autoCSS"!==r||(i[r]=n[r]);if(i.overwrite=0,i.data="isFromStart",i.lazy=h&&!1!==n.lazy,i.immediateRender=h,this._startAt=C.to(this.target,0,i),h){if(0===this._time)return}else this._startAt._init(),this._startAt._enabled(!1),this.vars.immediateRender&&(this._startAt=null)}if(this._ease=l=l?l instanceof x?l:"function"==typeof l?new x(l,n.easeParams):b[l]||C.defaultEase:C.defaultEase,n.easeParams instanceof Array&&l.config&&(this._ease=l.config.apply(l,n.easeParams)),this._easeType=this._ease._type,this._easePower=this._ease._power,this._firstPT=null,this._targets)for(t=this._targets.length;--t>-1;)this._initProps(this._targets[t],this._propLookup[t]={},this._siblings[t],o?o[t]:null)&&(e=!0);else e=this._initProps(this.target,this._propLookup,this._siblings,o);if(e&&C._onPluginEvent("_onInitAllProps",this),o&&(this._firstPT||"function"!=typeof this.target&&this._enabled(!1,!1)),n.runBackwards)for(i=this._firstPT;i;)i.s+=i.c,i.c=-i.c,i=i._next;this._onUpdate=n.onUpdate,this._initted=!0},n._initProps=function(e,i,r,s){var n,o,a,h,l,u;if(null==e)return!1;j[e._gsTweenID]&&H(),this.vars.css||e.style&&e!==t&&e.nodeType&&N.css&&!1!==this.vars.autoCSS&&D(this.vars,e);for(n in this.vars){if(u=this.vars[n],U[n])u&&(u instanceof Array||u.push&&p(u))&&-1!==u.join("").indexOf("{self}")&&(this.vars[n]=u=this._swapSelfInParams(u,this));else if(N[n]&&(h=new N[n])._onInitTween(e,this.vars[n],this)){for(this._firstPT=l={_next:this._firstPT,t:h,p:"setRatio",s:0,c:1,f:!0,n:n,pg:!0,pr:h._priority},o=h._overwriteProps.length;--o>-1;)i[h._overwriteProps[o]]=this._firstPT;(h._priority||h._onInitAllProps)&&(a=!0),(h._onDisable||h._onEnable)&&(this._notifyPluginsOfEnabled=!0)}else this._firstPT=i[n]=l={_next:this._firstPT,t:e,p:n,f:"function"==typeof e[n],n:n,pg:!1,pr:0},l.s=l.f?e[n.indexOf("set")||"function"!=typeof e["get"+n.substr(3)]?n:"get"+n.substr(3)]():parseFloat(e[n]),l.c="string"==typeof u&&"="===u.charAt(1)?parseInt(u.charAt(0)+"1",10)*Number(u.substr(2)):Number(u)-l.s||0;l&&l._next&&(l._next._prev=l)}return s&&this._kill(s,e)?this._initProps(e,i,r,s):this._overwrite>1&&this._firstPT&&r.length>1&&V(e,this,i,this._overwrite,r)?(this._kill(i,e),this._initProps(e,i,r,s)):(this._firstPT&&(!1!==this.vars.lazy&&this._duration||this.vars.lazy&&!this._duration)&&(j[e._gsTweenID]=!0),a)},n.render=function(t,e,i){var r,s,n,o,a=this._time,h=this._duration,l=this._rawPrevTime;if(t>=h)this._totalTime=this._time=h,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1,this._reversed||(r=!0,s="onComplete"),0===h&&(this._initted||!this.vars.lazy||i)&&(this._startTime===this._timeline._duration&&(t=0),(0===t||0>l||l===u&&"isPause"!==this.data)&&l!==t&&(i=!0,l>u&&(s="onReverseComplete")),
    this._rawPrevTime=o=!e||t||l===t?t:u);else if(1e-7>t)this._totalTime=this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0,(0!==a||0===h&&l>0)&&(s="onReverseComplete",r=this._reversed),0>t&&(this._active=!1,0===h&&(this._initted||!this.vars.lazy||i)&&(l>=0&&(l!==u||"isPause"!==this.data)&&(i=!0),this._rawPrevTime=o=!e||t||l===t?t:u)),this._initted||(i=!0);else if(this._totalTime=this._time=t,this._easeType){var c=t/h,d=this._easeType,p=this._easePower;(1===d||3===d&&c>=.5)&&(c=1-c),3===d&&(c*=2),1===p?c*=c:2===p?c*=c*c:3===p?c*=c*c*c:4===p&&(c*=c*c*c*c),this.ratio=1===d?1-c:2===d?c:.5>t/h?c/2:1-c/2}else this.ratio=this._ease.getRatio(t/h);if(this._time!==a||i){if(!this._initted){if(this._init(),!this._initted||this._gc)return;if(!i&&this._firstPT&&(!1!==this.vars.lazy&&this._duration||this.vars.lazy&&!this._duration))return this._time=this._totalTime=a,this._rawPrevTime=l,I.push(this),void(this._lazy=[t,e]);this._time&&!r?this.ratio=this._ease.getRatio(this._time/h):r&&this._ease._calcEnd&&(this.ratio=this._ease.getRatio(0===this._time?0:1))}for(!1!==this._lazy&&(this._lazy=!1),this._active||!this._paused&&this._time!==a&&t>=0&&(this._active=!0),0===a&&(this._startAt&&(t>=0?this._startAt.render(t,e,i):s||(s="_dummyGS")),this.vars.onStart&&(0!==this._time||0===h)&&(e||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||y))),n=this._firstPT;n;)n.f?n.t[n.p](n.c*this.ratio+n.s):n.t[n.p]=n.c*this.ratio+n.s,n=n._next;this._onUpdate&&(0>t&&this._startAt&&-1e-4!==t&&this._startAt.render(t,e,i),e||(this._time!==a||r)&&this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||y)),s&&(!this._gc||i)&&(0>t&&this._startAt&&!this._onUpdate&&-1e-4!==t&&this._startAt.render(t,e,i),r&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[s]&&this.vars[s].apply(this.vars[s+"Scope"]||this,this.vars[s+"Params"]||y),0===h&&this._rawPrevTime===u&&o!==u&&(this._rawPrevTime=0))}},n._kill=function(t,e,i){if("all"===t&&(t=null),null==t&&(null==e||e===this.target))return this._lazy=!1,this._enabled(!1,!1);e="string"!=typeof e?e||this._targets||this.target:C.selector(e)||e;var r,s,n,o,a,h,l,u,c;if((p(e)||L(e))&&"number"!=typeof e[0])for(r=e.length;--r>-1;)this._kill(t,e[r])&&(h=!0);else{if(this._targets){for(r=this._targets.length;--r>-1;)if(e===this._targets[r]){a=this._propLookup[r]||{},this._overwrittenProps=this._overwrittenProps||[],s=this._overwrittenProps[r]=t?this._overwrittenProps[r]||{}:"all";break}}else{if(e!==this.target)return!1;a=this._propLookup,s=this._overwrittenProps=t?this._overwrittenProps||{}:"all"}if(a){if(l=t||a,u=t!==s&&"all"!==s&&t!==a&&("object"!=typeof t||!t._tempKill),i&&(C.onOverwrite||this.vars.onOverwrite)){for(n in l)a[n]&&(c||(c=[]),c.push(n));if(!q(this,i,e,c))return!1}for(n in l)(o=a[n])&&(o.pg&&o.t._kill(l)&&(h=!0),o.pg&&0!==o.t._overwriteProps.length||(o._prev?o._prev._next=o._next:o===this._firstPT&&(this._firstPT=o._next),o._next&&(o._next._prev=o._prev),o._next=o._prev=null),delete a[n]),u&&(s[n]=1);!this._firstPT&&this._initted&&this._enabled(!1,!1)}}return h},n.invalidate=function(){return this._notifyPluginsOfEnabled&&C._onPluginEvent("_onDisable",this),this._firstPT=this._overwrittenProps=this._startAt=this._onUpdate=null,this._notifyPluginsOfEnabled=this._active=this._lazy=!1,this._propLookup=this._targets?{}:[],O.prototype.invalidate.call(this),this.vars.immediateRender&&(this._time=-u,this.render(-this._delay)),this},n._enabled=function(t,e){if(a||o.wake(),t&&this._gc){var i,r=this._targets;if(r)for(i=r.length;--i>-1;)this._siblings[i]=Y(r[i],this,!0);else this._siblings=Y(this.target,this,!0)}return O.prototype._enabled.call(this,t,e),!(!this._notifyPluginsOfEnabled||!this._firstPT)&&C._onPluginEvent(t?"_onEnable":"_onDisable",this)},C.to=function(t,e,i){return new C(t,e,i)},C.from=function(t,e,i){return i.runBackwards=!0,i.immediateRender=0!=i.immediateRender,new C(t,e,i)},C.fromTo=function(t,e,i,r){return r.startAt=i,r.immediateRender=0!=r.immediateRender&&0!=i.immediateRender,new C(t,e,r)},C.delayedCall=function(t,e,i,r,s){return new C(e,0,{delay:t,onComplete:e,onCompleteParams:i,onCompleteScope:r,onReverseComplete:e,onReverseCompleteParams:i,onReverseCompleteScope:r,immediateRender:!1,lazy:!1,useFrames:s,overwrite:0})},C.set=function(t,e){return new C(t,0,e)},C.getTweensOf=function(t,e){if(null==t)return[];t="string"!=typeof t?t:C.selector(t)||t;var i,r,s,n;if((p(t)||L(t))&&"number"!=typeof t[0]){for(i=t.length,r=[];--i>-1;)r=r.concat(C.getTweensOf(t[i],e));for(i=r.length;--i>-1;)for(n=r[i],s=i;--s>-1;)n===r[s]&&r.splice(i,1)}else for(r=Y(t).concat(),i=r.length;--i>-1;)(r[i]._gc||e&&!r[i].isActive())&&r.splice(i,1);return r},C.killTweensOf=C.killDelayedCallsTo=function(t,e,i){"object"==typeof e&&(i=e,e=!1);for(var r=C.getTweensOf(t,e),s=r.length;--s>-1;)r[s]._kill(i,t)};var $=g("plugins.TweenPlugin",function(t,e){this._overwriteProps=(t||"").split(","),this._propName=this._overwriteProps[0],this._priority=e||0,this._super=$.prototype},!0);if(n=$.prototype,$.version="1.10.1",$.API=2,n._firstPT=null,n._addTween=function(t,e,i,r,s,n){var o,a;return null!=r&&(o="number"==typeof r||"="!==r.charAt(1)?Number(r)-i:parseInt(r.charAt(0)+"1",10)*Number(r.substr(2)))?(this._firstPT=a={_next:this._firstPT,t:t,p:e,s:i,c:o,f:"function"==typeof t[e],n:s||e,r:n},a._next&&(a._next._prev=a),a):void 0},n.setRatio=function(t){for(var e,i=this._firstPT,r=1e-6;i;)e=i.c*t+i.s,i.r?e=Math.round(e):r>e&&e>-r&&(e=0),i.f?i.t[i.p](e):i.t[i.p]=e,i=i._next},n._kill=function(t){var e,i=this._overwriteProps,r=this._firstPT;if(null!=t[this._propName])this._overwriteProps=[];else for(e=i.length;--e>-1;)null!=t[i[e]]&&i.splice(e,1);for(;r;)null!=t[r.n]&&(r._next&&(r._next._prev=r._prev),r._prev?(r._prev._next=r._next,r._prev=null):this._firstPT===r&&(this._firstPT=r._next)),r=r._next;return!1},n._roundProps=function(t,e){for(var i=this._firstPT;i;)(t[this._propName]||null!=i.n&&t[i.n.split(this._propName+"_").join("")])&&(i.r=e),i=i._next},C._onPluginEvent=function(t,e){var i,r,s,n,o,a=e._firstPT;if("_onInitAllProps"===t){for(;a;){for(o=a._next,r=s;r&&r.pr>a.pr;)r=r._next;(a._prev=r?r._prev:n)?a._prev._next=a:s=a,(a._next=r)?r._prev=a:n=a,a=o}a=e._firstPT=s}for(;a;)a.pg&&"function"==typeof a.t[t]&&a.t[t]()&&(i=!0),a=a._next;return i},$.activate=function(t){for(var e=t.length;--e>-1;)t[e].API===$.API&&(N[(new t[e])._propName]=t[e]);return!0},_.plugin=function(t){if(!(t&&t.propName&&t.init&&t.API))throw"illegal plugin definition.";var e,i=t.propName,r=t.priority||0,s=t.overwriteProps,n={init:"_onInitTween",set:"setRatio",kill:"_kill",round:"_roundProps",initAll:"_onInitAllProps"},o=g("plugins."+i.charAt(0).toUpperCase()+i.substr(1)+"Plugin",function(){$.call(this,i,r),this._overwriteProps=s||[]},!0===t.global),a=o.prototype=new $(i);a.constructor=o,o.API=t.API;for(e in n)"function"==typeof t[e]&&(a[n[e]]=t[e]);return o.version=t.version,$.activate([o]),o},r=t._gsQueue){for(s=0;r.length>s;s++)r[s]();for(n in f)f[n].func||t.console.log("GSAP encountered missing dependency: com.greensock."+n)}a=!1}}("undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window,"TweenMax");/*!
 * VERSION: 0.2.2
 * DATE: 2017-06-19
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";_gsScope._gsDefine("easing.CustomEase",["easing.Ease"],function(t){var e=/(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,i=/[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,r=/[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi,s=/[cLlsS]/g,n="CustomEase only accepts Cubic Bezier data.",o=function(t,e,i,r,s,n,a,h,l,u,c){var d=(t+i)/2,p=(e+r)/2,f=(i+s)/2,v=(r+n)/2,_=(s+a)/2,g=(n+h)/2,m=(d+f)/2,y=(p+v)/2,x=(f+_)/2,b=(v+g)/2,T=(m+x)/2,w=(y+b)/2,E=a-t,S=h-e,A=Math.abs((i-a)*S-(r-h)*E),R=Math.abs((s-a)*S-(n-h)*E),O;return u||(u=[{x:t,y:e},{x:a,y:h}],c=1),u.splice(c||u.length-1,0,{x:T,y:w}),(A+R)*(A+R)>l*(E*E+S*S)&&(O=u.length,o(t,e,d,p,m,y,T,w,l,u,c),o(T,w,x,b,_,g,a,h,l,u,c+1+(u.length-O))),u},a=function(t){var e=(t+"").replace(r,function(t){var e=+t;return e<1e-4&&e>-1e-4?0:e}).match(i)||[],s=[],o=0,a=0,h=e.length,l=2,u,c,d,p,f,v,_,g,m,y,x;for(u=0;u<h;u++)if(m=p,isNaN(e[u])?(p=e[u].toUpperCase(),f=p!==e[u]):u--,c=+e[u+1],d=+e[u+2],f&&(c+=o,d+=a),u||(_=c,g=d),"M"===p)v&&v.length<8&&(s.length-=1,l=0),o=_=c,a=g=d,v=[c,d],l=2,s.push(v),u+=2,p="L";else if("C"===p)v||(v=[0,0]),v[l++]=c,v[l++]=d,f||(o=a=0),v[l++]=o+1*e[u+3],v[l++]=a+1*e[u+4],v[l++]=o+=1*e[u+5],v[l++]=a+=1*e[u+6],u+=6;else if("S"===p)"C"===m||"S"===m?(y=o-v[l-4],x=a-v[l-3],v[l++]=o+y,v[l++]=a+x):(v[l++]=o,v[l++]=a),v[l++]=c,v[l++]=d,f||(o=a=0),v[l++]=o+=1*e[u+3],v[l++]=a+=1*e[u+4],u+=4;else{if("L"!==p&&"Z"!==p)throw n;"Z"===p&&(c=_,d=g,v.closed=!0),("L"===p||Math.abs(o-c)>.5||Math.abs(a-d)>.5)&&(v[l++]=o+(c-o)/3,v[l++]=a+(d-a)/3,v[l++]=o+2*(c-o)/3,v[l++]=a+2*(d-a)/3,v[l++]=c,v[l++]=d,"L"===p&&(u+=2)),o=c,a=d}return s[0]},h=function(t){var e=t.length,i=999999999999,r;for(r=1;r<e;r+=6)+t[r]<i&&(i=+t[r]);return i},l=function(t,e,i){i||0===i||(i=Math.max(+t[t.length-1],+t[1]));var r=-1*+t[0],s=-i,n=t.length,o=1/(+t[n-2]+r),a=-e||(Math.abs(+t[n-1]-+t[1])<.01*(+t[n-2]-+t[0])?h(t)+s:+t[n-1]+s),l;for(a=a?1/a:-o,l=0;l<n;l+=2)t[l]=(+t[l]+r)*o,t[l+1]=(+t[l+1]+s)*a},u=function(t){var e=this.lookup[t*this.l|0]||this.lookup[this.l-1];return e.nx<t&&(e=e.n),e.y+(t-e.x)/e.cx*e.cy},c=function(e,i,r){this._calcEnd=!0,this.id=e,e&&(t.map[e]=this),this.getRatio=u,this.setData(i,r)},d=c.prototype=new t;return d.constructor=c,d.setData=function(t,i){t=t||"0,0,1,1";var r=t.match(e),h=1,u=[],c,d,p,f,v,_,g,m,y,x;if(i=i||{},x=i.precision||1,this.data=t,this.lookup=[],this.points=u,this.fast=x<=1,(s.test(t)||-1!==t.indexOf("M")&&-1===t.indexOf("C"))&&(r=a(t)),4===(c=r.length))r.unshift(0,0),r.push(1,1),c=8;else if((c-2)%6)throw n;for(0==+r[0]&&1==+r[c-2]||l(r,i.height,i.originY),this.rawBezier=r,f=2;f<c;f+=6)d={x:+r[f-2],y:+r[f-1]},p={x:+r[f+4],y:+r[f+5]},u.push(d,p),o(d.x,d.y,+r[f],+r[f+1],+r[f+2],+r[f+3],p.x,p.y,1/(2e5*x),u,u.length-1);for(c=u.length,f=0;f<c;f++)g=u[f],m=u[f-1]||g,g.x>m.x||m.y!==g.y&&m.x===g.x||g===m?(m.cx=g.x-m.x,m.cy=g.y-m.y,m.n=g,m.nx=g.x,this.fast&&f>1&&Math.abs(m.cy/m.cx-u[f-2].cy/u[f-2].cx)>2&&(this.fast=!1),m.cx<h&&(m.cx?h=m.cx:(m.cx=.001,f===c-1&&(m.x-=.001,h=Math.min(h,.001),this.fast=!1)))):(u.splice(f--,1),c--);if(c=1/h+1|0,this.l=c,v=1/c,_=0,g=u[0],this.fast){for(f=0;f<c;f++)y=f*v,g.nx<y&&(g=u[++_]),d=g.y+(y-g.x)/g.cx*g.cy,this.lookup[f]={x:y,cx:v,y:d,cy:0,nx:9},f&&(this.lookup[f-1].cy=d-this.lookup[f-1].y);this.lookup[c-1].cy=u[u.length-1].y-d}else{for(f=0;f<c;f++)g.nx<f*v&&(g=u[++_]),this.lookup[f]=g;_<u.length-1&&(this.lookup[f-1]=u[u.length-2])}return this._calcEnd=1!==u[u.length-1].y||0!==u[0].y,this},d.getRatio=u,d.getSVGData=function(t){return c.getSVGData(this,t)},c.create=function(t,e,i){return new c(t,e,i)},c.version="0.2.2",c.bezierToPoints=o,c.get=function(e){return t.map[e]},c.getSVGData=function(e,i){i=i||{};var r=1e3,s=i.width||100,n=i.height||100,o=i.x||0,a=(i.y||0)+n,h=i.path,l,u,c,d,p,f,v,_,g,m;if(i.invert&&(n=-n,a=0),e=e.getRatio?e:t.map[e]||console.log("No ease found: ",e),e.rawBezier){for(l=[],v=e.rawBezier.length,c=0;c<v;c+=2)l.push((1e3*(o+e.rawBezier[c]*s)|0)/1e3+","+(1e3*(a+e.rawBezier[c+1]*-n)|0)/1e3);l[0]="M"+l[0],l[1]="C"+l[1]}else for(l=["M"+o+","+a],v=Math.max(5,200*(i.precision||1)),d=1/v,v+=2,_=5/v,g=(1e3*(o+d*s)|0)/1e3,m=(1e3*(a+e.getRatio(d)*-n)|0)/1e3,u=(m-a)/(g-o),c=2;c<v;c++)p=(1e3*(o+c*d*s)|0)/1e3,f=(1e3*(a+e.getRatio(c*d)*-n)|0)/1e3,(Math.abs((f-m)/(p-g)-u)>_||c===v-1)&&(l.push(g+","+m),u=(f-m)/(p-g)),g=p,m=f;return h&&("string"==typeof h?document.querySelector(h):h).setAttribute("d",l.join(" ")),l.join(" ")},c},!0)}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),function(t){"use strict";var e=function(){return(_gsScope.GreenSockGlobals||_gsScope)[t]};"undefined"!=typeof module&&module.exports?(require("../TweenLite.js"),module.exports=e()):"function"==typeof define&&define.amd&&define(["TweenLite"],e)}("CustomEase"),/*!
* @license PreloadJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2011-2013 gskinner.com, inc.
*
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
*
* This notice shall be included in all copies or substantial portions of the Software.
*/
    this.createjs=this.createjs||{},function(){"use strict";var t=createjs.PreloadJS=createjs.PreloadJS||{};t.version="0.6.0",t.buildDate="Thu, 11 Dec 2014 23:32:09 GMT"}(),this.createjs=this.createjs||{},createjs.extend=function(t,e){"use strict";function i(){this.constructor=t}return i.prototype=e.prototype,t.prototype=new i},this.createjs=this.createjs||{},createjs.promote=function(t,e){"use strict";var i=t.prototype,r=Object.getPrototypeOf&&Object.getPrototypeOf(i)||i.__proto__;if(r){i[(e+="_")+"constructor"]=r.constructor;for(var s in r)i.hasOwnProperty(s)&&"function"==typeof r[s]&&(i[e+s]=r[s])}return t},this.createjs=this.createjs||{},createjs.indexOf=function(t,e){"use strict";for(var i=0,r=t.length;r>i;i++)if(e===t[i])return i;return-1},this.createjs=this.createjs||{},function(){"use strict";createjs.proxy=function(t,e){var i=Array.prototype.slice.call(arguments,2);return function(){return t.apply(e,Array.prototype.slice.call(arguments,0).concat(i))}}}(),this.createjs=this.createjs||{},function(){"use strict";function t(){throw"BrowserDetect cannot be instantiated"}var e=t.agent=window.navigator.userAgent;t.isWindowPhone=e.indexOf("IEMobile")>-1||e.indexOf("Windows Phone")>-1,t.isFirefox=e.indexOf("Firefox")>-1,t.isOpera=null!=window.opera,t.isChrome=e.indexOf("Chrome")>-1,t.isIOS=(e.indexOf("iPod")>-1||e.indexOf("iPhone")>-1||e.indexOf("iPad")>-1)&&!t.isWindowPhone,t.isAndroid=e.indexOf("Android")>-1&&!t.isWindowPhone,t.isBlackberry=e.indexOf("Blackberry")>-1,createjs.BrowserDetect=t}(),this.createjs=this.createjs||{},function(){"use strict";function t(t,e,i){this.type=t,this.target=null,this.currentTarget=null,this.eventPhase=0,this.bubbles=!!e,this.cancelable=!!i,this.timeStamp=(new Date).getTime(),this.defaultPrevented=!1,this.propagationStopped=!1,this.immediatePropagationStopped=!1,this.removed=!1}var e=t.prototype;e.preventDefault=function(){this.defaultPrevented=this.cancelable&&!0},e.stopPropagation=function(){this.propagationStopped=!0},e.stopImmediatePropagation=function(){this.immediatePropagationStopped=this.propagationStopped=!0},e.remove=function(){this.removed=!0},e.clone=function(){return new t(this.type,this.bubbles,this.cancelable)},e.set=function(t){for(var e in t)this[e]=t[e];return this},e.toString=function(){return"[Event (type="+this.type+")]"},createjs.Event=t}(),this.createjs=this.createjs||{},function(){"use strict";function t(t,e,i){this.Event_constructor("error"),this.title=t,this.message=e,this.data=i}createjs.extend(t,createjs.Event).clone=function(){return new createjs.ErrorEvent(this.title,this.message,this.data)},createjs.ErrorEvent=createjs.promote(t,"Event")}(),this.createjs=this.createjs||{},function(){"use strict";function t(){this._listeners=null,this._captureListeners=null}var e=t.prototype;t.initialize=function(t){t.addEventListener=e.addEventListener,t.on=e.on,t.removeEventListener=t.off=e.removeEventListener,t.removeAllEventListeners=e.removeAllEventListeners,t.hasEventListener=e.hasEventListener,t.dispatchEvent=e.dispatchEvent,t._dispatchEvent=e._dispatchEvent,t.willTrigger=e.willTrigger},e.addEventListener=function(t,e,i){var r;r=i?this._captureListeners=this._captureListeners||{}:this._listeners=this._listeners||{};var s=r[t];return s&&this.removeEventListener(t,e,i),s=r[t],s?s.push(e):r[t]=[e],e},e.on=function(t,e,i,r,s,n){return e.handleEvent&&(i=i||e,e=e.handleEvent),i=i||this,this.addEventListener(t,function(t){e.call(i,t,s),r&&t.remove()},n)},e.removeEventListener=function(t,e,i){var r=i?this._captureListeners:this._listeners;if(r){var s=r[t];if(s)for(var n=0,o=s.length;o>n;n++)if(s[n]==e){1==o?delete r[t]:s.splice(n,1);break}}},e.off=e.removeEventListener,e.removeAllEventListeners=function(t){t?(this._listeners&&delete this._listeners[t],this._captureListeners&&delete this._captureListeners[t]):this._listeners=this._captureListeners=null},e.dispatchEvent=function(t){if("string"==typeof t){var e=this._listeners;if(!e||!e[t])return!1;t=new createjs.Event(t)}else t.target&&t.clone&&(t=t.clone());try{t.target=this}catch(t){}if(t.bubbles&&this.parent){for(var i=this,r=[i];i.parent;)r.push(i=i.parent);var s,n=r.length;for(s=n-1;s>=0&&!t.propagationStopped;s--)r[s]._dispatchEvent(t,1+(0==s));for(s=1;n>s&&!t.propagationStopped;s++)r[s]._dispatchEvent(t,3)}else this._dispatchEvent(t,2);return t.defaultPrevented},e.hasEventListener=function(t){var e=this._listeners,i=this._captureListeners;return!!(e&&e[t]||i&&i[t])},e.willTrigger=function(t){for(var e=this;e;){if(e.hasEventListener(t))return!0;e=e.parent}return!1},e.toString=function(){return"[EventDispatcher]"},e._dispatchEvent=function(t,e){var i,r=1==e?this._captureListeners:this._listeners;if(t&&r){var s=r[t.type];if(!s||!(i=s.length))return;try{t.currentTarget=this}catch(t){}try{t.eventPhase=e}catch(t){}t.removed=!1,s=s.slice();for(var n=0;i>n&&!t.immediatePropagationStopped;n++){var o=s[n];o.handleEvent?o.handleEvent(t):o(t),t.removed&&(this.off(t.type,o,1==e),t.removed=!1)}}},createjs.EventDispatcher=t}(),this.createjs=this.createjs||{},function(){"use strict";function t(t,e){this.Event_constructor("progress"),this.loaded=t,this.total=null==e?1:e,this.progress=0==e?0:this.loaded/this.total}createjs.extend(t,createjs.Event).clone=function(){return new createjs.ProgressEvent(this.loaded,this.total)},createjs.ProgressEvent=createjs.promote(t,"Event")}(window),function(){function t(e,r){function n(t){if(n[t]!==_)return n[t];var e;if("bug-string-char-index"==t)e="a"!="a"[0];else if("json"==t)e=n("json-stringify")&&n("json-parse");else{var i,s='{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';if("json-stringify"==t){var h=r.stringify,u="function"==typeof h&&y;if(u){(i=function(){return 1}).toJSON=i;try{u="0"===h(0)&&"0"===h(new o)&&'""'==h(new a)&&h(m)===_&&h(_)===_&&h()===_&&"1"===h(i)&&"[1]"==h([i])&&"[null]"==h([_])&&"null"==h(null)&&"[null,null,null]"==h([_,m,null])&&h({a:[i,!0,!1,null,"\0\b\n\f\r\t"]})==s&&"1"===h(null,i)&&"[\n 1,\n 2\n]"==h([1,2],null,1)&&'"-271821-04-20T00:00:00.000Z"'==h(new l(-864e13))&&'"+275760-09-13T00:00:00.000Z"'==h(new l(864e13))&&'"-000001-01-01T00:00:00.000Z"'==h(new l(-621987552e5))&&'"1969-12-31T23:59:59.999Z"'==h(new l(-1))}catch(t){u=!1}}e=u}if("json-parse"==t){var c=r.parse;if("function"==typeof c)try{if(0===c("0")&&!c(!1)){i=c(s);var d=5==i.a.length&&1===i.a[0];if(d){try{d=!c('"\t"')}catch(t){}if(d)try{d=1!==c("01")}catch(t){}if(d)try{d=1!==c("1.")}catch(t){}}}}catch(t){d=!1}e=d}}return n[t]=!!e}e||(e=s.Object()),r||(r=s.Object());var o=e.Number||s.Number,a=e.String||s.String,h=e.Object||s.Object,l=e.Date||s.Date,u=e.SyntaxError||s.SyntaxError,c=e.TypeError||s.TypeError,d=e.Math||s.Math,p=e.JSON||s.JSON;"object"==typeof p&&p&&(r.stringify=p.stringify,r.parse=p.parse);var f,v,_,g=h.prototype,m=g.toString,y=new l(-0xc782b5b800cec);try{y=-109252==y.getUTCFullYear()&&0===y.getUTCMonth()&&1===y.getUTCDate()&&10==y.getUTCHours()&&37==y.getUTCMinutes()&&6==y.getUTCSeconds()&&708==y.getUTCMilliseconds()}catch(t){}if(!n("json")){var x="[object Function]",b="[object Date]",T="[object Number]",w="[object String]",E="[object Array]",S="[object Boolean]",A=n("bug-string-char-index");if(!y)var R=d.floor,O=[0,31,59,90,120,151,181,212,243,273,304,334],P=function(t,e){return O[e]+365*(t-1970)+R((t-1969+(e=+(e>1)))/4)-R((t-1901+e)/100)+R((t-1601+e)/400)};if((f=g.hasOwnProperty)||(f=function(t){var e,i={};return(i.__proto__=null,i.__proto__={toString:1},i).toString!=m?f=function(t){var e=this.__proto__,i=t in(this.__proto__=null,this);return this.__proto__=e,i}:(e=i.constructor,f=function(t){var i=(this.constructor||e).prototype;return t in this&&!(t in i&&this[t]===i[t])}),i=null,f.call(this,t)}),v=function(t,e){var r,s,n,o=0;(r=function(){this.valueOf=0}).prototype.valueOf=0,s=new r;for(n in s)f.call(s,n)&&o++;return r=s=null,o?v=2==o?function(t,e){var i,r={},s=m.call(t)==x;for(i in t)s&&"prototype"==i||f.call(r,i)||!(r[i]=1)||!f.call(t,i)||e(i)}:function(t,e){var i,r,s=m.call(t)==x;for(i in t)s&&"prototype"==i||!f.call(t,i)||(r="constructor"===i)||e(i);(r||f.call(t,i="constructor"))&&e(i)}:(s=["valueOf","toString","toLocaleString","propertyIsEnumerable","isPrototypeOf","hasOwnProperty","constructor"],v=function(t,e){var r,n,o=m.call(t)==x,a=!o&&"function"!=typeof t.constructor&&i[typeof t.hasOwnProperty]&&t.hasOwnProperty||f;for(r in t)o&&"prototype"==r||!a.call(t,r)||e(r);for(n=s.length;r=s[--n];a.call(t,r)&&e(r));}),v(t,e)},!n("json-stringify")){var M={92:"\\\\",34:'\\"',8:"\\b",12:"\\f",10:"\\n",13:"\\r",9:"\\t"},C="000000",L=function(t,e){return(C+(e||0)).slice(-t)},D="\\u00",I=function(t){for(var e='"',i=0,r=t.length,s=!A||r>10,n=s&&(A?t.split(""):t);r>i;i++){var o=t.charCodeAt(i);switch(o){case 8:case 9:case 10:case 12:case 13:case 34:case 92:e+=M[o];break;default:if(32>o){e+=D+L(2,o.toString(16));break}e+=s?n[i]:t.charAt(i)}}return e+'"'},j=function(t,e,i,r,s,n,o){var a,h,l,u,d,p,g,y,x,A,O,M,C,D,k,N;try{a=e[t]}catch(t){}if("object"==typeof a&&a)if((h=m.call(a))!=b||f.call(a,"toJSON"))"function"==typeof a.toJSON&&(h!=T&&h!=w&&h!=E||f.call(a,"toJSON"))&&(a=a.toJSON(t));else if(a>-1/0&&1/0>a){if(P){for(d=R(a/864e5),l=R(d/365.2425)+1970-1;P(l+1,0)<=d;l++);for(u=R((d-P(l,0))/30.42);P(l,u+1)<=d;u++);d=1+d-P(l,u),p=(a%864e5+864e5)%864e5,g=R(p/36e5)%24,y=R(p/6e4)%60,x=R(p/1e3)%60,A=p%1e3}else l=a.getUTCFullYear(),u=a.getUTCMonth(),d=a.getUTCDate(),g=a.getUTCHours(),y=a.getUTCMinutes(),x=a.getUTCSeconds(),A=a.getUTCMilliseconds();a=(0>=l||l>=1e4?(0>l?"-":"+")+L(6,0>l?-l:l):L(4,l))+"-"+L(2,u+1)+"-"+L(2,d)+"T"+L(2,g)+":"+L(2,y)+":"+L(2,x)+"."+L(3,A)+"Z"}else a=null;if(i&&(a=i.call(e,t,a)),null===a)return"null";if((h=m.call(a))==S)return""+a;if(h==T)return a>-1/0&&1/0>a?""+a:"null";if(h==w)return I(""+a);if("object"==typeof a){for(D=o.length;D--;)if(o[D]===a)throw c();if(o.push(a),O=[],k=n,n+=s,h==E){for(C=0,D=a.length;D>C;C++)M=j(C,a,i,r,s,n,o),O.push(M===_?"null":M);N=O.length?s?"[\n"+n+O.join(",\n"+n)+"\n"+k+"]":"["+O.join(",")+"]":"[]"}else v(r||a,function(t){var e=j(t,a,i,r,s,n,o);e!==_&&O.push(I(t)+":"+(s?" ":"")+e)}),N=O.length?s?"{\n"+n+O.join(",\n"+n)+"\n"+k+"}":"{"+O.join(",")+"}":"{}";return o.pop(),N}};r.stringify=function(t,e,r){var s,n,o,a;if(i[typeof e]&&e)if((a=m.call(e))==x)n=e;else if(a==E){o={};for(var h,l=0,u=e.length;u>l;h=e[l++],((a=m.call(h))==w||a==T)&&(o[h]=1));}if(r)if((a=m.call(r))==T){if((r-=r%1)>0)for(s="",r>10&&(r=10);s.length<r;s+=" ");}else a==w&&(s=r.length<=10?r:r.slice(0,10));return j("",(h={},h[""]=t,h),n,o,s,"",[])}}if(!n("json-parse")){var k,N,F=a.fromCharCode,B={92:"\\",34:'"',47:"/",98:"\b",116:"\t",110:"\n",102:"\f",114:"\r"},U=function(){throw k=N=null,u()},X=function(){for(var t,e,i,r,s,n=N,o=n.length;o>k;)switch(s=n.charCodeAt(k)){case 9:case 10:case 13:case 32:k++;break;case 123:case 125:case 91:case 93:case 58:case 44:return t=A?n.charAt(k):n[k],k++,t;case 34:for(t="@",k++;o>k;)if(32>(s=n.charCodeAt(k)))U();else if(92==s)switch(s=n.charCodeAt(++k)){case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:t+=B[s],k++;break;case 117:for(e=++k,i=k+4;i>k;k++)(s=n.charCodeAt(k))>=48&&57>=s||s>=97&&102>=s||s>=65&&70>=s||U();t+=F("0x"+n.slice(e,k));break;default:U()}else{if(34==s)break;for(s=n.charCodeAt(k),e=k;s>=32&&92!=s&&34!=s;)s=n.charCodeAt(++k);t+=n.slice(e,k)}if(34==n.charCodeAt(k))return k++,t;U();default:if(e=k,45==s&&(r=!0,s=n.charCodeAt(++k)),s>=48&&57>=s){for(48==s&&(s=n.charCodeAt(k+1))>=48&&57>=s&&U(),r=!1;o>k&&(s=n.charCodeAt(k))>=48&&57>=s;k++);if(46==n.charCodeAt(k)){for(i=++k;o>i&&(s=n.charCodeAt(i))>=48&&57>=s;i++);i==k&&U(),k=i}if(101==(s=n.charCodeAt(k))||69==s){for(s=n.charCodeAt(++k),(43==s||45==s)&&k++,i=k;o>i&&(s=n.charCodeAt(i))>=48&&57>=s;i++);i==k&&U(),k=i}return+n.slice(e,k)}if(r&&U(),"true"==n.slice(k,k+4))return k+=4,!0;if("false"==n.slice(k,k+5))return k+=5,!1;if("null"==n.slice(k,k+4))return k+=4,null;U()}return"$"},z=function(t){var e,i;if("$"==t&&U(),"string"==typeof t){if("@"==(A?t.charAt(0):t[0]))return t.slice(1);if("["==t){for(e=[];"]"!=(t=X());i||(i=!0))i&&(","==t?"]"==(t=X())&&U():U()),","==t&&U(),e.push(z(t));return e}if("{"==t){for(e={};"}"!=(t=X());i||(i=!0))i&&(","==t?"}"==(t=X())&&U():U()),(","==t||"string"!=typeof t||"@"!=(A?t.charAt(0):t[0])||":"!=X())&&U(),e[t.slice(1)]=z(X());return e}U()}return t},W=function(t,e,i){var r=G(t,e,i);r===_?delete t[e]:t[e]=r},G=function(t,e,i){var r,s=t[e];if("object"==typeof s&&s)if(m.call(s)==E)for(r=s.length;r--;)W(s,r,i);else v(s,function(t){W(s,t,i)});return i.call(t,e,s)};r.parse=function(t,e){var i,r;return k=0,N=""+t,i=z(X()),"$"!=X()&&U(),k=N=null,e&&m.call(e)==x?G((r={},r[""]=i,r),"",e):i}}}return r.runInContext=t,r}var e="function"==typeof define&&define.amd,i={function:!0,object:!0},r=i[typeof exports]&&exports&&!exports.nodeType&&exports,s=i[typeof window]&&window||this,n=r&&i[typeof module]&&module&&!module.nodeType&&"object"==typeof global&&global;if(!n||n.global!==n&&n.window!==n&&n.self!==n||(s=n),r&&!e)t(s,r);else{var o=s.JSON,a=s.JSON3,h=!1,l=t(s,s.JSON3={noConflict:function(){return h||(h=!0,s.JSON=o,s.JSON3=a,o=a=null),l}});s.JSON={parse:l.parse,stringify:l.stringify}}e&&define(function(){return l})}.call(this),function(){var t={};t.parseXML=function(t,e){var i=null;try{if(window.DOMParser){i=(new DOMParser).parseFromString(t,e)}else i=new ActiveXObject("Microsoft.XMLDOM"),i.async=!1,i.loadXML(t)}catch(t){}return i},t.parseJSON=function(t){if(null==t)return null;try{return JSON.parse(t)}catch(t){throw t}},createjs.DataUtils=t}(),this.createjs=this.createjs||{},function(){"use strict";function t(){this.src=null,this.type=null,this.id=null,this.maintainOrder=!1,this.callback=null,this.data=null,this.method=createjs.LoadItem.GET,this.values=null,this.headers=null,this.withCredentials=!1,this.mimeType=null,this.crossOrigin=null,this.loadTimeout=8e3}var e=t.prototype={},i=t;i.create=function(e){if("string"==typeof e){var r=new t;return r.src=e,r}if(e instanceof i)return e;if(e instanceof Object)return e;throw new Error("Type not recognized.")},e.set=function(t){for(var e in t)this[e]=t[e];return this},createjs.LoadItem=i}(),function(){var t={};t.ABSOLUTE_PATT=/^(?:\w+:)?\/{2}/i,t.RELATIVE_PATT=/^[.\/]*?\//i,t.EXTENSION_PATT=/\/?[^\/]+\.(\w{1,5})$/i,t.parseURI=function(e){var i={absolute:!1,relative:!1};if(null==e)return i;var r=e.indexOf("?");r>-1&&(e=e.substr(0,r));var s;return t.ABSOLUTE_PATT.test(e)?i.absolute=!0:t.RELATIVE_PATT.test(e)&&(i.relative=!0),(s=e.match(t.EXTENSION_PATT))&&(i.extension=s[1].toLowerCase()),i},t.formatQueryString=function(t,e){if(null==t)throw new Error("You must specify data.");var i=[];for(var r in t)i.push(r+"="+escape(t[r]));return e&&(i=i.concat(e)),i.join("&")},t.buildPath=function(t,e){if(null==e)return t;var i=[],r=t.indexOf("?");if(-1!=r){var s=t.slice(r+1);i=i.concat(s.split("&"))}return-1!=r?t.slice(0,r)+"?"+this._formatQueryString(e,i):t+"?"+this._formatQueryString(e,i)},t.isCrossDomain=function(t){var e=document.createElement("a");e.href=t.src;var i=document.createElement("a");return i.href=location.href,""!=e.hostname&&(e.port!=i.port||e.protocol!=i.protocol||e.hostname!=i.hostname)},t.isLocal=function(t){var e=document.createElement("a");return e.href=t.src,""==e.hostname&&"file:"==e.protocol},t.isBinary=function(t){switch(t){case createjs.AbstractLoader.IMAGE:case createjs.AbstractLoader.BINARY:return!0;default:return!1}},t.isImageTag=function(t){return t instanceof HTMLImageElement},t.isAudioTag=function(t){return!!window.HTMLAudioElement&&t instanceof HTMLAudioElement},t.isVideoTag=function(t){return window.HTMLVideoElement?t instanceof HTMLVideoElement:void 0},t.isText=function(t){switch(t){case createjs.AbstractLoader.TEXT:case createjs.AbstractLoader.JSON:case createjs.AbstractLoader.MANIFEST:case createjs.AbstractLoader.XML:case createjs.AbstractLoader.CSS:case createjs.AbstractLoader.SVG:case createjs.AbstractLoader.JAVASCRIPT:return!0;default:return!1}},t.getTypeByExtension=function(t){if(null==t)return createjs.AbstractLoader.TEXT;switch(t.toLowerCase()){case"jpeg":case"jpg":case"gif":case"png":case"webp":case"bmp":return createjs.AbstractLoader.IMAGE;case"ogg":case"mp3":case"webm":return createjs.AbstractLoader.SOUND;case"mp4":case"webm":case"ts":return createjs.AbstractLoader.VIDEO;case"json":return createjs.AbstractLoader.JSON;case"xml":return createjs.AbstractLoader.XML;case"css":return createjs.AbstractLoader.CSS;case"js":return createjs.AbstractLoader.JAVASCRIPT;case"svg":return createjs.AbstractLoader.SVG;default:return createjs.AbstractLoader.TEXT}},createjs.RequestUtils=t}(),this.createjs=this.createjs||{},function(){"use strict";function t(t,e,i){this.EventDispatcher_constructor(),this.loaded=!1,this.canceled=!1,this.progress=0,this.type=i,this.resultFormatter=null,this._item=t?createjs.LoadItem.create(t):null,this._preferXHR=e,this._result=null,this._rawResult=null,this._loadedItems=null,this._tagSrcAttribute=null,this._tag=null}var e=createjs.extend(t,createjs.EventDispatcher),i=t;i.POST="POST",i.GET="GET",i.BINARY="binary",i.CSS="css",i.IMAGE="image",i.JAVASCRIPT="javascript",i.JSON="json",i.JSONP="jsonp",i.MANIFEST="manifest",i.SOUND="sound",i.VIDEO="video",i.SPRITESHEET="spritesheet",i.SVG="svg",i.TEXT="text",i.XML="xml",e.getItem=function(){return this._item},e.getResult=function(t){return t?this._rawResult:this._result},e.getTag=function(){return this._tag},e.setTag=function(t){this._tag=t},e.load=function(){this._createRequest(),this._request.on("complete",this,this),this._request.on("progress",this,this),this._request.on("loadStart",this,this),this._request.on("abort",this,this),this._request.on("timeout",this,this),this._request.on("error",this,this);var t=new createjs.Event("initialize");t.loader=this._request,this.dispatchEvent(t),this._request.load()},e.cancel=function(){this.canceled=!0,this.destroy()},e.destroy=function(){this._request&&(this._request.removeAllEventListeners(),this._request.destroy()),this._request=null,this._item=null,this._rawResult=null,this._result=null,this._loadItems=null,this.removeAllEventListeners()},e.getLoadedItems=function(){return this._loadedItems},e._createRequest=function(){this._request=this._preferXHR?new createjs.XHRRequest(this._item):new createjs.TagRequest(this._item,this._tag||this._createTag(),this._tagSrcAttribute)},e._createTag=function(){return null},e._sendLoadStart=function(){this._isCanceled()||this.dispatchEvent("loadstart")},e._sendProgress=function(t){if(!this._isCanceled()){var e=null;"number"==typeof t?(this.progress=t,e=new createjs.ProgressEvent(this.progress)):(e=t,this.progress=t.loaded/t.total,e.progress=this.progress,(isNaN(this.progress)||1/0==this.progress)&&(this.progress=0)),this.hasEventListener("progress")&&this.dispatchEvent(e)}},e._sendComplete=function(){if(!this._isCanceled()){this.loaded=!0;var t=new createjs.Event("complete");t.rawResult=this._rawResult,null!=this._result&&(t.result=this._result),this.dispatchEvent(t)}},e._sendError=function(t){!this._isCanceled()&&this.hasEventListener("error")&&(null==t&&(t=new createjs.ErrorEvent("PRELOAD_ERROR_EMPTY")),this.dispatchEvent(t))},e._isCanceled=function(){return!(null!=window.createjs&&!this.canceled)},e.resultFormatter=null,e.handleEvent=function(t){switch(t.type){case"complete":this._rawResult=t.target._response;var e=this.resultFormatter&&this.resultFormatter(this),i=this;e instanceof Function?e(function(t){i._result=t,i._sendComplete()}):(this._result=e||this._rawResult,this._sendComplete());break;case"progress":this._sendProgress(t);break;case"error":this._sendError(t);break;case"loadstart":this._sendLoadStart();break;case"abort":case"timeout":this._isCanceled()||this.dispatchEvent(t.type)}},e.buildPath=function(t,e){return createjs.RequestUtils.buildPath(t,e)},e.toString=function(){return"[PreloadJS AbstractLoader]"},createjs.AbstractLoader=createjs.promote(t,"EventDispatcher")}(),this.createjs=this.createjs||{},function(){"use strict";function t(t,e,i){this.AbstractLoader_constructor(t,e,i),this.resultFormatter=this._formatResult,this._tagSrcAttribute="src"}var e=createjs.extend(t,createjs.AbstractLoader);e.load=function(){this._tag||(this._tag=this._createTag(this._item.src)),this._tag.preload="auto",this._tag.load(),this.AbstractLoader_load()},e._createTag=function(){},e._createRequest=function(){this._request=this._preferXHR?new createjs.XHRRequest(this._item):new createjs.MediaTagRequest(this._item,this._tag||this._createTag(),this._tagSrcAttribute)},e._formatResult=function(t){return this._tag.removeEventListener&&this._tag.removeEventListener("canplaythrough",this._loadedHandler),this._tag.onstalled=null,this._preferXHR&&(t.getTag().src=t.getResult(!0)),t.getTag()},createjs.AbstractMediaLoader=createjs.promote(t,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";var t=function(t){this._item=t},e=createjs.extend(t,createjs.EventDispatcher);e.load=function(){},e.destroy=function(){},e.cancel=function(){},createjs.AbstractRequest=createjs.promote(t,"EventDispatcher")}(),this.createjs=this.createjs||{},function(){"use strict";function t(t,e,i){this.AbstractRequest_constructor(t),this._tag=e,this._tagSrcAttribute=i,this._loadedHandler=createjs.proxy(this._handleTagComplete,this),this._addedToDOM=!1,this._startTagVisibility=null}var e=createjs.extend(t,createjs.AbstractRequest);e.load=function(){null==this._tag.parentNode&&(window.document.body.appendChild(this._tag),this._addedToDOM=!0),this._tag.onload=createjs.proxy(this._handleTagComplete,this),this._tag.onreadystatechange=createjs.proxy(this._handleReadyStateChange,this);var t=new createjs.Event("initialize");t.loader=this._tag,this.dispatchEvent(t),this._hideTag(),this._tag[this._tagSrcAttribute]=this._item.src},e.destroy=function(){this._clean(),this._tag=null,this.AbstractRequest_destroy()},e._handleReadyStateChange=function(){clearTimeout(this._loadTimeout);var t=this._tag;("loaded"==t.readyState||"complete"==t.readyState)&&this._handleTagComplete()},e._handleTagComplete=function(){this._rawResult=this._tag,this._result=this.resultFormatter&&this.resultFormatter(this)||this._rawResult,this._clean(),this._showTag(),this.dispatchEvent("complete")},e._clean=function(){this._tag.onload=null,this._tag.onreadystatechange=null,this._addedToDOM&&null!=this._tag.parentNode&&this._tag.parentNode.removeChild(this._tag)},e._hideTag=function(){this._startTagVisibility=this._tag.style.visibility,this._tag.style.visibility="hidden"},e._showTag=function(){this._tag.style.visibility=this._startTagVisibility},e._handleStalled=function(){},createjs.TagRequest=createjs.promote(t,"AbstractRequest")}(),this.createjs=this.createjs||{},function(){"use strict";function t(t,e,i){this.AbstractRequest_constructor(t),this._tag=e,this._tagSrcAttribute=i,this._loadedHandler=createjs.proxy(this._handleTagComplete,this)}var e=createjs.extend(t,createjs.TagRequest);e.load=function(){this._tag.onstalled=createjs.proxy(this._handleStalled,this),this._tag.onprogress=createjs.proxy(this._handleProgress,this),this._tag.addEventListener&&this._tag.addEventListener("canplaythrough",this._loadedHandler,!1),this.TagRequest_load()},e._handleReadyStateChange=function(){clearTimeout(this._loadTimeout);var t=this._tag;("loaded"==t.readyState||"complete"==t.readyState)&&this._handleTagComplete()},e._handleStalled=function(){},e._handleProgress=function(t){if(t&&!(t.loaded>0&&0==t.total)){var e=new createjs.ProgressEvent(t.loaded,t.total);this.dispatchEvent(e)}},e._clean=function(){this._tag.removeEventListener&&this._tag.removeEventListener("canplaythrough",this._loadedHandler),this._tag.onstalled=null,this._tag.onprogress=null,this.TagRequest__clean()},createjs.MediaTagRequest=createjs.promote(t,"TagRequest")}(),this.createjs=this.createjs||{},function(){"use strict";function t(t){this.AbstractRequest_constructor(t),this._request=null,this._loadTimeout=null,this._xhrLevel=1,this._response=null,this._rawResponse=null,this._canceled=!1,this._handleLoadStartProxy=createjs.proxy(this._handleLoadStart,this),this._handleProgressProxy=createjs.proxy(this._handleProgress,this),this._handleAbortProxy=createjs.proxy(this._handleAbort,this),this._handleErrorProxy=createjs.proxy(this._handleError,this),this._handleTimeoutProxy=createjs.proxy(this._handleTimeout,this),this._handleLoadProxy=createjs.proxy(this._handleLoad,this),this._handleReadyStateChangeProxy=createjs.proxy(this._handleReadyStateChange,this),this._createXHR(t)}var e=createjs.extend(t,createjs.AbstractRequest);t.ACTIVEX_VERSIONS=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.5.0","Msxml2.XMLHTTP.4.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],e.getResult=function(t){return t&&this._rawResponse?this._rawResponse:this._response},e.cancel=function(){this.canceled=!0,this._clean(),this._request.abort()},e.load=function(){if(null==this._request)return void this._handleError();this._request.addEventListener("loadstart",this._handleLoadStartProxy,!1),this._request.addEventListener("progress",this._handleProgressProxy,!1),this._request.addEventListener("abort",this._handleAbortProxy,!1),this._request.addEventListener("error",this._handleErrorProxy,!1),this._request.addEventListener("timeout",this._handleTimeoutProxy,!1),this._request.addEventListener("load",this._handleLoadProxy,!1),this._request.addEventListener("readystatechange",this._handleReadyStateChangeProxy,!1),1==this._xhrLevel&&(this._loadTimeout=setTimeout(createjs.proxy(this._handleTimeout,this),this._item.loadTimeout));try{this._item.values&&this._item.method!=createjs.AbstractLoader.GET?this._item.method==createjs.AbstractLoader.POST&&this._request.send(createjs.RequestUtils.formatQueryString(this._item.values)):this._request.send()}catch(t){this.dispatchEvent(new createjs.ErrorEvent("XHR_SEND",null,t))}},e.setResponseType=function(t){this._request.responseType=t},e.getAllResponseHeaders=function(){return this._request.getAllResponseHeaders instanceof Function?this._request.getAllResponseHeaders():null},e.getResponseHeader=function(t){return this._request.getResponseHeader instanceof Function?this._request.getResponseHeader(t):null},e._handleProgress=function(t){if(t&&!(t.loaded>0&&0==t.total)){var e=new createjs.ProgressEvent(t.loaded,t.total);this.dispatchEvent(e)}},e._handleLoadStart=function(){clearTimeout(this._loadTimeout),this.dispatchEvent("loadstart")},e._handleAbort=function(t){this._clean(),this.dispatchEvent(new createjs.ErrorEvent("XHR_ABORTED",null,t))},e._handleError=function(t){this._clean(),this.dispatchEvent(new createjs.ErrorEvent(t.message))},e._handleReadyStateChange=function(){4==this._request.readyState&&this._handleLoad()},e._handleLoad=function(){if(!this.loaded){this.loaded=!0;var t=this._checkError();if(t)return void this._handleError(t);this._response=this._getResponse(),this._clean(),this.dispatchEvent(new createjs.Event("complete"))}},e._handleTimeout=function(t){this._clean(),this.dispatchEvent(new createjs.ErrorEvent("PRELOAD_TIMEOUT",null,t))},e._checkError=function(){var t=parseInt(this._request.status);switch(t){case 404:case 0:return new Error(t)}return null},e._getResponse=function(){if(null!=this._response)return this._response;if(null!=this._request.response)return this._request.response;try{if(null!=this._request.responseText)return this._request.responseText}catch(t){}try{if(null!=this._request.responseXML)return this._request.responseXML}catch(t){}return null},e._createXHR=function(t){var e=createjs.RequestUtils.isCrossDomain(t),i={},r=null;if(window.XMLHttpRequest)r=new XMLHttpRequest,e&&void 0===r.withCredentials&&window.XDomainRequest&&(r=new XDomainRequest);else{for(var n=0,o=s.ACTIVEX_VERSIONS.length;o>n;n++){s.ACTIVEX_VERSIONS[n];try{r=new ActiveXObject(axVersions);break}catch(t){}}if(null==r)return!1}t.mimeType&&r.overrideMimeType&&r.overrideMimeType(t.mimeType),this._xhrLevel="string"==typeof r.responseType?2:1;var a=null;if(a=t.method==createjs.AbstractLoader.GET?createjs.RequestUtils.buildPath(t.src,t.values):t.src,r.open(t.method||createjs.AbstractLoader.GET,a,!0),e&&r instanceof XMLHttpRequest&&1==this._xhrLevel&&(i.Origin=location.origin),t.values&&t.method==createjs.AbstractLoader.POST&&(i["Content-Type"]="application/x-www-form-urlencoded"),e||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest"),t.headers)for(var h in t.headers)i[h]=t.headers[h];for(h in i)r.setRequestHeader(h,i[h]);return r instanceof XMLHttpRequest&&void 0!==t.withCredentials&&(r.withCredentials=t.withCredentials),this._request=r,!0},e._clean=function(){clearTimeout(this._loadTimeout),this._request.removeEventListener("loadstart",this._handleLoadStartProxy),this._request.removeEventListener("progress",this._handleProgressProxy),this._request.removeEventListener("abort",this._handleAbortProxy),this._request.removeEventListener("error",this._handleErrorProxy),this._request.removeEventListener("timeout",this._handleTimeoutProxy),this._request.removeEventListener("load",this._handleLoadProxy),this._request.removeEventListener("readystatechange",this._handleReadyStateChangeProxy)},e.toString=function(){return"[PreloadJS XHRRequest]"},createjs.XHRRequest=createjs.promote(t,"AbstractRequest")}(),this.createjs=this.createjs||{},function(){"use strict";function t(t,e,i){this.AbstractLoader_constructor(),this.init(t,e,i)}var e=createjs.extend(t,createjs.AbstractLoader),i=t;e.init=function(t,e,i){this.useXHR=!0,this.preferXHR=!0,this._preferXHR=!0,this.setPreferXHR(t),this.stopOnError=!1,this.maintainScriptOrder=!0,this.next=null,this._paused=!1,this._basePath=e,this._crossOrigin=i,this._typeCallbacks={},this._extensionCallbacks={},this._loadStartWasDispatched=!1,this._maxConnections=1,this._currentlyLoadingScript=null,this._currentLoads=[],this._loadQueue=[],this._loadQueueBackup=[],this._loadItemsById={},this._loadItemsBySrc={},this._loadedResults={},this._loadedRawResults={},this._numItems=0,this._numItemsLoaded=0,this._scriptOrder=[],this._loadedScripts=[],this._lastProgress=NaN,this._availableLoaders=[createjs.ImageLoader,createjs.JavaScriptLoader,createjs.CSSLoader,createjs.JSONLoader,createjs.JSONPLoader,createjs.SoundLoader,createjs.ManifestLoader,createjs.SpriteSheetLoader,createjs.XMLLoader,createjs.SVGLoader,createjs.BinaryLoader,createjs.VideoLoader,createjs.TextLoader],this._defaultLoaderLength=this._availableLoaders.length},i.loadTimeout=8e3,i.LOAD_TIMEOUT=0,i.BINARY=createjs.AbstractLoader.BINARY,i.CSS=createjs.AbstractLoader.CSS,i.IMAGE=createjs.AbstractLoader.IMAGE,i.JAVASCRIPT=createjs.AbstractLoader.JAVASCRIPT,i.JSON=createjs.AbstractLoader.JSON,i.JSONP=createjs.AbstractLoader.JSONP,i.MANIFEST=createjs.AbstractLoader.MANIFEST,i.SOUND=createjs.AbstractLoader.SOUND,i.VIDEO=createjs.AbstractLoader.VIDEO,i.SVG=createjs.AbstractLoader.SVG,i.TEXT=createjs.AbstractLoader.TEXT,i.XML=createjs.AbstractLoader.XML,i.POST=createjs.AbstractLoader.POST,i.GET=createjs.AbstractLoader.GET,e.registerLoader=function(t){if(!t||!t.canLoadItem)throw new Error("loader is of an incorrect type.");if(-1!=this._availableLoaders.indexOf(t))throw new Error("loader already exists.");this._availableLoaders.unshift(t)},e.unregisterLoader=function(t){var e=this._availableLoaders.indexOf(t);-1!=e&&e<this._defaultLoaderLength-1&&this._availableLoaders.splice(e,1)},e.setUseXHR=function(t){return this.setPreferXHR(t)},e.setPreferXHR=function(t){return this.preferXHR=0!=t&&null!=window.XMLHttpRequest,this.preferXHR},e.removeAll=function(){this.remove()},e.remove=function(t){var e=null;if(!t||t instanceof Array){if(t)e=t;else if(arguments.length>0)return}else e=[t];var i=!1;if(e){for(;e.length;){var r=e.pop(),s=this.getResult(r);for(n=this._loadQueue.length-1;n>=0;n--)if(o=this._loadQueue[n].getItem(),o.id==r||o.src==r){this._loadQueue.splice(n,1)[0].cancel();break}for(n=this._loadQueueBackup.length-1;n>=0;n--)if(o=this._loadQueueBackup[n].getItem(),o.id==r||o.src==r){this._loadQueueBackup.splice(n,1)[0].cancel();break}if(s)delete this._loadItemsById[s.id],delete this._loadItemsBySrc[s.src],
    this._disposeItem(s);else for(var n=this._currentLoads.length-1;n>=0;n--){var o=this._currentLoads[n].getItem();if(o.id==r||o.src==r){this._currentLoads.splice(n,1)[0].cancel(),i=!0;break}}}i&&this._loadNext()}else{this.close();for(var a in this._loadItemsById)this._disposeItem(this._loadItemsById[a]);this.init(this.preferXHR,this._basePath)}},e.reset=function(){this.close();for(var t in this._loadItemsById)this._disposeItem(this._loadItemsById[t]);for(var e=[],i=0,r=this._loadQueueBackup.length;r>i;i++)e.push(this._loadQueueBackup[i].getItem());this.loadManifest(e,!1)},e.installPlugin=function(t){if(null!=t&&null!=t.getPreloadHandlers){var e=t.getPreloadHandlers();if(e.scope=t,null!=e.types)for(var i=0,r=e.types.length;r>i;i++)this._typeCallbacks[e.types[i]]=e;if(null!=e.extensions)for(i=0,r=e.extensions.length;r>i;i++)this._extensionCallbacks[e.extensions[i]]=e}},e.setMaxConnections=function(t){this._maxConnections=t,!this._paused&&this._loadQueue.length>0&&this._loadNext()},e.loadFile=function(t,e,i){if(null==t){var r=new createjs.ErrorEvent("PRELOAD_NO_FILE");return void this._sendError(r)}this._addItem(t,null,i),this.setPaused(!1===e)},e.loadManifest=function(t,e,r){var s=null,n=null;if(t instanceof Array){if(0==t.length){var o=new createjs.ErrorEvent("PRELOAD_MANIFEST_EMPTY");return void this._sendError(o)}s=t}else if("string"==typeof t)s=[{src:t,type:i.MANIFEST}];else{if("object"!=typeof t){var o=new createjs.ErrorEvent("PRELOAD_MANIFEST_NULL");return void this._sendError(o)}if(void 0!==t.src){if(null==t.type)t.type=i.MANIFEST;else if(t.type!=i.MANIFEST){var o=new createjs.ErrorEvent("PRELOAD_MANIFEST_TYPE");this._sendError(o)}s=[t]}else void 0!==t.manifest&&(s=t.manifest,n=t.path)}for(var a=0,h=s.length;h>a;a++)this._addItem(s[a],n,r);this.setPaused(!1===e)},e.load=function(){this.setPaused(!1)},e.getItem=function(t){return this._loadItemsById[t]||this._loadItemsBySrc[t]},e.getResult=function(t,e){var i=this._loadItemsById[t]||this._loadItemsBySrc[t];if(null==i)return null;var r=i.id;return e&&this._loadedRawResults[r]?this._loadedRawResults[r]:this._loadedResults[r]},e.getItems=function(t){for(var e=[],i=0,r=this._loadQueueBackup.length;r>i;i++){var s=this._loadQueueBackup[i],n=s.getItem();(!0!==t||s.loaded)&&e.push({item:n,result:this.getResult(n.id),rawResult:this.getResult(n.id,!0)})}return e},e.setPaused=function(t){this._paused=t,this._paused||this._loadNext()},e.close=function(){for(;this._currentLoads.length;)this._currentLoads.pop().cancel();this._scriptOrder.length=0,this._loadedScripts.length=0,this.loadStartWasDispatched=!1,this._itemCount=0,this._lastProgress=NaN},e._addItem=function(t,e,i){var r=this._createLoadItem(t,e,i);if(null!=r){var s=this._createLoader(r);null!=s&&(r._loader=s,this._loadQueue.push(s),this._loadQueueBackup.push(s),this._numItems++,this._updateProgress(),(this.maintainScriptOrder&&r.type==createjs.LoadQueue.JAVASCRIPT||!0===r.maintainOrder)&&(this._scriptOrder.push(r),this._loadedScripts.push(null)))}},e._createLoadItem=function(t,e,r){var s=createjs.LoadItem.create(t);if(null==s)return null;var n=createjs.RequestUtils.parseURI(s.src);n.extension&&(s.ext=n.extension),null==s.type&&(s.type=createjs.RequestUtils.getTypeByExtension(s.ext));var o="",a=r||this._basePath,h=s.src;if(!n.absolute&&!n.relative)if(e){o=e;var l=createjs.RequestUtils.parseURI(e);h=e+h,null==a||l.absolute||l.relative||(o=a+o)}else null!=a&&(o=a);s.src=o+s.src,s.path=o,(void 0===s.id||null===s.id||""===s.id)&&(s.id=h);var u=this._typeCallbacks[s.type]||this._extensionCallbacks[s.ext];if(u){var c=u.callback.call(u.scope,s,this);if(!1===c)return null;!0===c||null!=c&&(s._loader=c),n=createjs.RequestUtils.parseURI(s.src),null!=n.extension&&(s.ext=n.extension)}return this._loadItemsById[s.id]=s,this._loadItemsBySrc[s.src]=s,null==s.loadTimeout&&(s.loadTimeout=i.loadTimeout),null==s.crossOrigin&&(s.crossOrigin=this._crossOrigin),s},e._createLoader=function(t){if(null!=t._loader)return t._loader;for(var e=this.preferXHR,i=0;i<this._availableLoaders.length;i++){var r=this._availableLoaders[i];if(r&&r.canLoadItem(t))return new r(t,e)}return null},e._loadNext=function(){if(!this._paused){this._loadStartWasDispatched||(this._sendLoadStart(),this._loadStartWasDispatched=!0),this._numItems==this._numItemsLoaded?(this.loaded=!0,this._sendComplete(),this.next&&this.next.load&&this.next.load()):this.loaded=!1;for(var t=0;t<this._loadQueue.length&&!(this._currentLoads.length>=this._maxConnections);t++){var e=this._loadQueue[t];this._canStartLoad(e)&&(this._loadQueue.splice(t,1),t--,this._loadItem(e))}}},e._loadItem=function(t){t.on("fileload",this._handleFileLoad,this),t.on("progress",this._handleProgress,this),t.on("complete",this._handleFileComplete,this),t.on("error",this._handleError,this),t.on("fileerror",this._handleFileError,this),this._currentLoads.push(t),this._sendFileStart(t.getItem()),t.load()},e._handleFileLoad=function(t){t.target=null,this.dispatchEvent(t)},e._handleFileError=function(t){var e=new createjs.ErrorEvent("FILE_LOAD_ERROR",null,t.item);this._sendError(e)},e._handleError=function(t){var e=t.target;this._numItemsLoaded++,this._finishOrderedItem(e,!0),this._updateProgress();var i=new createjs.ErrorEvent("FILE_LOAD_ERROR",null,e.getItem());this._sendError(i),this.stopOnError||(this._removeLoadItem(e),this._loadNext())},e._handleFileComplete=function(t){var e=t.target,i=e.getItem(),r=e.getResult();this._loadedResults[i.id]=r;var s=e.getResult(!0);null!=s&&s!==r&&(this._loadedRawResults[i.id]=s),this._saveLoadedItems(e),this._removeLoadItem(e),this._finishOrderedItem(e)||this._processFinishedLoad(i,e)},e._saveLoadedItems=function(t){var e=t.getLoadedItems();if(null!==e)for(var i=0;i<e.length;i++){var r=e[i].item;this._loadItemsBySrc[r.src]=r,this._loadItemsById[r.id]=r,this._loadedResults[r.id]=e[i].result,this._loadedRawResults[r.id]=e[i].rawResult}},e._finishOrderedItem=function(t,e){var i=t.getItem();if(this.maintainScriptOrder&&i.type==createjs.LoadQueue.JAVASCRIPT||i.maintainOrder){t instanceof createjs.JavaScriptLoader&&(this._currentlyLoadingScript=!1);var r=createjs.indexOf(this._scriptOrder,i);return-1!=r&&(this._loadedScripts[r]=!0===e||i,this._checkScriptLoadOrder(),!0)}return!1},e._checkScriptLoadOrder=function(){for(var t=this._loadedScripts.length,e=0;t>e;e++){var i=this._loadedScripts[e];if(null===i)break;if(!0!==i){var r=this._loadedResults[i.id];i.type==createjs.LoadQueue.JAVASCRIPT&&(document.body||document.getElementsByTagName("body")[0]).appendChild(r);var s=i._loader;this._processFinishedLoad(i,s),this._loadedScripts[e]=!0}}},e._processFinishedLoad=function(t,e){this._numItemsLoaded++,this._updateProgress(),this._sendFileComplete(t,e),this._loadNext()},e._canStartLoad=function(t){if(!this.maintainScriptOrder||t.preferXHR)return!0;var e=t.getItem();if(e.type!=createjs.LoadQueue.JAVASCRIPT)return!0;if(this._currentlyLoadingScript)return!1;for(var i=this._scriptOrder.indexOf(e),r=0;i>r;){if(null==this._loadedScripts[r])return!1;r++}return this._currentlyLoadingScript=!0,!0},e._removeLoadItem=function(t){delete t.getItem()._loader;for(var e=this._currentLoads.length,i=0;e>i;i++)if(this._currentLoads[i]==t){this._currentLoads.splice(i,1);break}},e._handleProgress=function(t){var e=t.target;this._sendFileProgress(e.getItem(),e.progress),this._updateProgress()},e._updateProgress=function(){var t=this._numItemsLoaded/this._numItems,e=this._numItems-this._numItemsLoaded;if(e>0){for(var i=0,r=0,s=this._currentLoads.length;s>r;r++)i+=this._currentLoads[r].progress;t+=i/e*(e/this._numItems)}this._lastProgress!=t&&(this._sendProgress(t),this._lastProgress=t)},e._disposeItem=function(t){delete this._loadedResults[t.id],delete this._loadedRawResults[t.id],delete this._loadItemsById[t.id],delete this._loadItemsBySrc[t.src]},e._sendFileProgress=function(t,e){if(this._isCanceled())return void this._cleanUp();if(this.hasEventListener("fileprogress")){var i=new createjs.Event("fileprogress");i.progress=e,i.loaded=e,i.total=1,i.item=t,this.dispatchEvent(i)}},e._sendFileComplete=function(t,e){if(!this._isCanceled()){var i=new createjs.Event("fileload");i.loader=e,i.item=t,i.result=this._loadedResults[t.id],i.rawResult=this._loadedRawResults[t.id],t.completeHandler&&t.completeHandler(i),this.hasEventListener("fileload")&&this.dispatchEvent(i)}},e._sendFileStart=function(t){var e=new createjs.Event("filestart");e.item=t,this.hasEventListener("filestart")&&this.dispatchEvent(e)},e.toString=function(){return"[PreloadJS LoadQueue]"},createjs.LoadQueue=createjs.promote(t,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function t(t){this.AbstractLoader_constructor(t,!0,createjs.AbstractLoader.TEXT)}(createjs.extend(t,createjs.AbstractLoader),t).canLoadItem=function(t){return t.type==createjs.AbstractLoader.TEXT},createjs.TextLoader=createjs.promote(t,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function t(t){this.AbstractLoader_constructor(t,!0,createjs.AbstractLoader.BINARY),this.on("initialize",this._updateXHR,this)}var e=createjs.extend(t,createjs.AbstractLoader);t.canLoadItem=function(t){return t.type==createjs.AbstractLoader.BINARY},e._updateXHR=function(t){t.loader.setResponseType("arraybuffer")},createjs.BinaryLoader=createjs.promote(t,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function t(t,e){this.AbstractLoader_constructor(t,e,createjs.AbstractLoader.CSS),this.resultFormatter=this._formatResult,this._tagSrcAttribute="href",this._tag=document.createElement(e?"style":"link"),this._tag.rel="stylesheet",this._tag.type="text/css"}var e=createjs.extend(t,createjs.AbstractLoader);t.canLoadItem=function(t){return t.type==createjs.AbstractLoader.CSS},e._formatResult=function(t){if(this._preferXHR){var e=t.getTag();if(document.getElementsByTagName("head")[0].appendChild(e),e.styleSheet)e.styleSheet.cssText=t.getResult(!0);else{var i=document.createTextNode(t.getResult(!0));e.appendChild(i)}}else e=this._tag;return e},createjs.CSSLoader=createjs.promote(t,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function t(t,e){this.AbstractLoader_constructor(t,e,createjs.AbstractLoader.IMAGE),this.resultFormatter=this._formatResult,this._tagSrcAttribute="src",createjs.RequestUtils.isImageTag(t)?this._tag=t:createjs.RequestUtils.isImageTag(t.src)?this._tag=t.src:createjs.RequestUtils.isImageTag(t.tag)&&(this._tag=t.tag),null!=this._tag?this._preferXHR=!1:this._tag=document.createElement("img"),this.on("initialize",this._updateXHR,this)}var e=createjs.extend(t,createjs.AbstractLoader);t.canLoadItem=function(t){return t.type==createjs.AbstractLoader.IMAGE},e.load=function(){if(""!=this._tag.src&&this._tag.complete)return void this._sendComplete();var t=this._item.crossOrigin;1==t&&(t="Anonymous"),null==t||createjs.RequestUtils.isLocal(this._item.src)||(this._tag.crossOrigin=t),this.AbstractLoader_load()},e._updateXHR=function(t){t.loader.mimeType="text/plain; charset=x-user-defined-binary",t.loader.setResponseType&&t.loader.setResponseType("blob")},e._formatResult=function(t){var e=this;return function(i){var r=e._tag,s=window.URL||window.webkitURL;if(e._preferXHR)if(s){var n=s.createObjectURL(t.getResult(!0));r.src=n,r.onload=function(){s.revokeObjectURL(e.src)}}else r.src=t.getItem().src;r.complete?i(r):r.onload=function(){i(this)}}},createjs.ImageLoader=createjs.promote(t,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function t(t,e){this.AbstractLoader_constructor(t,e,createjs.AbstractLoader.JAVASCRIPT),this.resultFormatter=this._formatResult,this._tagSrcAttribute="src",this.setTag(document.createElement("script"))}var e=createjs.extend(t,createjs.AbstractLoader);t.canLoadItem=function(t){return t.type==createjs.AbstractLoader.JAVASCRIPT},e._formatResult=function(t){var e=t.getTag();return this._preferXHR&&(e.text=t.getResult(!0)),e},createjs.JavaScriptLoader=createjs.promote(t,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function t(t){this.AbstractLoader_constructor(t,!0,createjs.AbstractLoader.JSON),this.resultFormatter=this._formatResult}var e=createjs.extend(t,createjs.AbstractLoader);t.canLoadItem=function(t){return t.type==createjs.AbstractLoader.JSON&&!t._loadAsJSONP},e._formatResult=function(t){var e=null;try{e=createjs.DataUtils.parseJSON(t.getResult(!0))}catch(t){var i=new createjs.ErrorEvent("JSON_FORMAT",null,t);return this._sendError(i),t}return e},createjs.JSONLoader=createjs.promote(t,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function t(t){this.AbstractLoader_constructor(t,!1,createjs.AbstractLoader.JSONP),this.setTag(document.createElement("script")),this.getTag().type="text/javascript"}var e=createjs.extend(t,createjs.AbstractLoader);t.canLoadItem=function(t){return t.type==createjs.AbstractLoader.JSONP||t._loadAsJSONP},e.cancel=function(){this.AbstractLoader_cancel(),this._dispose()},e.load=function(){if(null==this._item.callback)throw new Error("callback is required for loading JSONP requests.");if(null!=window[this._item.callback])throw new Error("JSONP callback '"+this._item.callback+"' already exists on window. You need to specify a different callback or re-name the current one.");window[this._item.callback]=createjs.proxy(this._handleLoad,this),window.document.body.appendChild(this._tag),this._tag.src=this._item.src},e._handleLoad=function(t){this._result=this._rawResult=t,this._sendComplete(),this._dispose()},e._dispose=function(){window.document.body.removeChild(this._tag),delete window[this._item.callback]},createjs.JSONPLoader=createjs.promote(t,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function t(t){this.AbstractLoader_constructor(t,null,createjs.AbstractLoader.MANIFEST),this._manifestQueue=null}var e=createjs.extend(t,createjs.AbstractLoader),i=t;i.MANIFEST_PROGRESS=.25,i.canLoadItem=function(t){return t.type==createjs.AbstractLoader.MANIFEST},e.load=function(){this.AbstractLoader_load()},e._createRequest=function(){var t=this._item.callback;this._request=null!=t?new createjs.JSONPLoader(this._item):new createjs.JSONLoader(this._item)},e.handleEvent=function(t){switch(t.type){case"complete":return this._rawResult=t.target.getResult(!0),this._result=t.target.getResult(),this._sendProgress(i.MANIFEST_PROGRESS),void this._loadManifest(this._result);case"progress":return t.loaded*=i.MANIFEST_PROGRESS,this.progress=t.loaded/t.total,(isNaN(this.progress)||1/0==this.progress)&&(this.progress=0),void this._sendProgress(t)}this.AbstractLoader_handleEvent(t)},e.destroy=function(){this.AbstractLoader_destroy(),this._manifestQueue.close()},e._loadManifest=function(t){if(t&&t.manifest){var e=this._manifestQueue=new createjs.LoadQueue;e.on("fileload",this._handleManifestFileLoad,this),e.on("progress",this._handleManifestProgress,this),e.on("complete",this._handleManifestComplete,this,!0),e.on("error",this._handleManifestError,this,!0),e.loadManifest(t)}else this._sendComplete()},e._handleManifestFileLoad=function(t){t.target=null,this.dispatchEvent(t)},e._handleManifestComplete=function(){this._loadedItems=this._manifestQueue.getItems(!0),this._sendComplete()},e._handleManifestProgress=function(t){this.progress=t.progress*(1-i.MANIFEST_PROGRESS)+i.MANIFEST_PROGRESS,this._sendProgress(this.progress)},e._handleManifestError=function(t){var e=new createjs.Event("fileerror");e.item=t.data,this.dispatchEvent(e)},createjs.ManifestLoader=createjs.promote(t,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function t(t,e){this.AbstractMediaLoader_constructor(t,e,createjs.AbstractLoader.SOUND),createjs.RequestUtils.isAudioTag(t)?this._tag=t:createjs.RequestUtils.isAudioTag(t.src)?this._tag=t:createjs.RequestUtils.isAudioTag(t.tag)&&(this._tag=createjs.RequestUtils.isAudioTag(t)?t:t.src),null!=this._tag&&(this._preferXHR=!1)}var e=createjs.extend(t,createjs.AbstractMediaLoader);t.canLoadItem=function(t){return t.type==createjs.AbstractLoader.SOUND},e._createTag=function(t){var e=document.createElement("audio");return e.autoplay=!1,e.preload="none",e.src=t,e},createjs.SoundLoader=createjs.promote(t,"AbstractMediaLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function t(t,e){this.AbstractMediaLoader_constructor(t,e,createjs.AbstractLoader.VIDEO),createjs.RequestUtils.isVideoTag(t)||createjs.RequestUtils.isVideoTag(t.src)?(this.setTag(createjs.RequestUtils.isVideoTag(t)?t:t.src),this._preferXHR=!1):this.setTag(this._createTag())}var e=createjs.extend(t,createjs.AbstractMediaLoader),i=t;e._createTag=function(){return document.createElement("video")},i.canLoadItem=function(t){return t.type==createjs.AbstractLoader.VIDEO},createjs.VideoLoader=createjs.promote(t,"AbstractMediaLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function t(t){this.AbstractLoader_constructor(t,null,createjs.AbstractLoader.SPRITESHEET),this._manifestQueue=null}var e=createjs.extend(t,createjs.AbstractLoader),i=t;i.SPRITESHEET_PROGRESS=.25,i.canLoadItem=function(t){return t.type==createjs.AbstractLoader.SPRITESHEET},e.destroy=function(){this.AbstractLoader_destroy,this._manifestQueue.close()},e._createRequest=function(){var t=this._item.callback;this._request=null!=t&&t instanceof Function?new createjs.JSONPLoader(this._item):new createjs.JSONLoader(this._item)},e.handleEvent=function(t){switch(t.type){case"complete":return this._rawResult=t.target.getResult(!0),this._result=t.target.getResult(),this._sendProgress(i.SPRITESHEET_PROGRESS),void this._loadManifest(this._result);case"progress":return t.loaded*=i.SPRITESHEET_PROGRESS,this.progress=t.loaded/t.total,(isNaN(this.progress)||1/0==this.progress)&&(this.progress=0),void this._sendProgress(t)}this.AbstractLoader_handleEvent(t)},e._loadManifest=function(t){if(t&&t.images){var e=this._manifestQueue=new createjs.LoadQueue;e.on("complete",this._handleManifestComplete,this,!0),e.on("fileload",this._handleManifestFileLoad,this),e.on("progress",this._handleManifestProgress,this),e.on("error",this._handleManifestError,this,!0),e.loadManifest(t.images)}},e._handleManifestFileLoad=function(t){var e=t.result;if(null!=e){var i=this.getResult().images;i[i.indexOf(t.item.src)]=e}},e._handleManifestComplete=function(){this._result=new createjs.SpriteSheet(this._result),this._loadedItems=this._manifestQueue.getItems(!0),this._sendComplete()},e._handleManifestProgress=function(t){this.progress=t.progress*(1-i.SPRITESHEET_PROGRESS)+i.SPRITESHEET_PROGRESS,this._sendProgress(this.progress)},e._handleManifestError=function(t){var e=new createjs.Event("fileerror");e.item=t.data,this.dispatchEvent(e)},createjs.SpriteSheetLoader=createjs.promote(t,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function t(t,e){this.AbstractLoader_constructor(t,e,createjs.AbstractLoader.SVG),this.resultFormatter=this._formatResult,this._tagSrcAttribute="data",e?this.setTag(document.createElement("svg")):(this.setTag(document.createElement("object")),this.getTag().type="image/svg+xml"),this.getTag().style.visibility="hidden"}var e=createjs.extend(t,createjs.AbstractLoader);t.canLoadItem=function(t){return t.type==createjs.AbstractLoader.SVG},e._formatResult=function(t){var e=createjs.DataUtils.parseXML(t.getResult(!0),"text/xml"),i=t.getTag();return!this._preferXHR&&document.body.contains(i)&&document.body.removeChild(i),null!=e.documentElement?(i.appendChild(e.documentElement),i.style.visibility="visible",i):e},createjs.SVGLoader=createjs.promote(t,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function t(t){this.AbstractLoader_constructor(t,!0,createjs.AbstractLoader.XML),this.resultFormatter=this._formatResult}var e=createjs.extend(t,createjs.AbstractLoader);t.canLoadItem=function(t){return t.type==createjs.AbstractLoader.XML},e._formatResult=function(t){return createjs.DataUtils.parseXML(t.getResult(!0),"text/xml")},createjs.XMLLoader=createjs.promote(t,"AbstractLoader")}(),function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.PIXI=t()}}(function(){var t;return function t(e,i,r){function s(o,a){if(!i[o]){if(!e[o]){var h="function"==typeof require&&require;if(!a&&h)return h(o,!0);if(n)return n(o,!0);var l=new Error("Cannot find module '"+o+"'");throw l.code="MODULE_NOT_FOUND",l}var u=i[o]={exports:{}};e[o][0].call(u.exports,function(t){var i=e[o][1][t];return s(i||t)},u,u.exports,t,e,i,r)}return i[o].exports}for(var n="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(t,e,i){"use strict";"use restrict";function r(t){var e=32;return t&=-t,t&&e--,65535&t&&(e-=16),16711935&t&&(e-=8),252645135&t&&(e-=4),858993459&t&&(e-=2),1431655765&t&&(e-=1),e}var s=32;i.INT_BITS=s,i.INT_MAX=2147483647,i.INT_MIN=-1<<31,i.sign=function(t){return(t>0)-(0>t)},i.abs=function(t){var e=t>>31;return(t^e)-e},i.min=function(t,e){return e^(t^e)&-(e>t)},i.max=function(t,e){return t^(t^e)&-(e>t)},i.isPow2=function(t){return!(t&t-1||!t)},i.log2=function(t){var e,i;return e=(t>65535)<<4,t>>>=e,i=(t>255)<<3,t>>>=i,e|=i,i=(t>15)<<2,t>>>=i,e|=i,i=(t>3)<<1,t>>>=i,(e|=i)|t>>1},i.log10=function(t){return t>=1e9?9:t>=1e8?8:t>=1e7?7:t>=1e6?6:t>=1e5?5:t>=1e4?4:t>=1e3?3:t>=100?2:t>=10?1:0},i.popCount=function(t){return t-=t>>>1&1431655765,16843009*((t=(858993459&t)+(t>>>2&858993459))+(t>>>4)&252645135)>>>24},i.countTrailingZeros=r,i.nextPow2=function(t){return t+=0===t,--t,t|=t>>>1,t|=t>>>2,t|=t>>>4,t|=t>>>8,(t|=t>>>16)+1},i.prevPow2=function(t){return t|=t>>>1,t|=t>>>2,t|=t>>>4,t|=t>>>8,(t|=t>>>16)-(t>>>1)},i.parity=function(t){return t^=t>>>16,t^=t>>>8,t^=t>>>4,27030>>>(t&=15)&1};var n=new Array(256);!function(t){for(var e=0;256>e;++e){var i=e,r=e,s=7;for(i>>>=1;i;i>>>=1)r<<=1,r|=1&i,--s;t[e]=r<<s&255}}(n),i.reverse=function(t){return n[255&t]<<24|n[t>>>8&255]<<16|n[t>>>16&255]<<8|n[t>>>24&255]},i.interleave2=function(t,e){return t&=65535,t=16711935&(t|t<<8),t=252645135&(t|t<<4),t=858993459&(t|t<<2),t=1431655765&(t|t<<1),e&=65535,e=16711935&(e|e<<8),e=252645135&(e|e<<4),e=858993459&(e|e<<2),e=1431655765&(e|e<<1),t|e<<1},i.deinterleave2=function(t,e){return t=t>>>e&1431655765,t=858993459&(t|t>>>1),t=252645135&(t|t>>>2),t=16711935&(t|t>>>4),(t=65535&(t|t>>>16))<<16>>16},i.interleave3=function(t,e,i){return t&=1023,t=4278190335&(t|t<<16),t=251719695&(t|t<<8),t=3272356035&(t|t<<4),t=1227133513&(t|t<<2),e&=1023,e=4278190335&(e|e<<16),e=251719695&(e|e<<8),e=3272356035&(e|e<<4),e=1227133513&(e|e<<2),t|=e<<1,i&=1023,i=4278190335&(i|i<<16),i=251719695&(i|i<<8),i=3272356035&(i|i<<4),i=1227133513&(i|i<<2),t|i<<2},i.deinterleave3=function(t,e){return t=t>>>e&1227133513,t=3272356035&(t|t>>>2),t=251719695&(t|t>>>4),t=4278190335&(t|t>>>8),(t=1023&(t|t>>>16))<<22>>22},i.nextCombination=function(t){var e=t|t-1;return e+1|(~e&-~e)-1>>>r(t)+1}},{}],2:[function(t,e,i){"use strict";function r(t,e,i){i=i||2;var r=e&&e.length,n=r?e[0]*i:t.length,a=s(t,0,n,i,!0),h=[];if(!a)return h;var l,u,d,p,f,v,_;if(r&&(a=c(t,e,a,i)),t.length>80*i){l=d=t[0],u=p=t[1];for(var g=i;n>g;g+=i)f=t[g],v=t[g+1],l>f&&(l=f),u>v&&(u=v),f>d&&(d=f),v>p&&(p=v);_=Math.max(d-l,p-u)}return o(a,h,i,l,u,_),h}function s(t,e,i,r,s){var n,o;if(s===C(t,e,i,r)>0)for(n=e;i>n;n+=r)o=O(n,t[n],t[n+1],o);else for(n=i-r;n>=e;n-=r)o=O(n,t[n],t[n+1],o);return o&&T(o,o.next)&&(P(o),o=o.next),o}function n(t,e){if(!t)return t;e||(e=t);var i,r=t;do{if(i=!1,r.steiner||!T(r,r.next)&&0!==b(r.prev,r,r.next))r=r.next;else{if(P(r),(r=e=r.prev)===r.next)return null;i=!0}}while(i||r!==e);return e}function o(t,e,i,r,s,c,d){if(t){!d&&c&&v(t,r,s,c);for(var p,f,_=t;t.prev!==t.next;)if(p=t.prev,f=t.next,c?h(t,r,s,c):a(t))e.push(p.i/i),e.push(t.i/i),e.push(f.i/i),P(t),t=f.next,_=f.next;else if((t=f)===_){d?1===d?(t=l(t,e,i),o(t,e,i,r,s,c,2)):2===d&&u(t,e,i,r,s,c):o(n(t),e,i,r,s,c,1);break}}}function a(t){var e=t.prev,i=t,r=t.next;if(b(e,i,r)>=0)return!1;for(var s=t.next.next;s!==t.prev;){if(y(e.x,e.y,i.x,i.y,r.x,r.y,s.x,s.y)&&b(s.prev,s,s.next)>=0)return!1;s=s.next}return!0}function h(t,e,i,r){var s=t.prev,n=t,o=t.next;if(b(s,n,o)>=0)return!1;for(var a=s.x<n.x?s.x<o.x?s.x:o.x:n.x<o.x?n.x:o.x,h=s.y<n.y?s.y<o.y?s.y:o.y:n.y<o.y?n.y:o.y,l=s.x>n.x?s.x>o.x?s.x:o.x:n.x>o.x?n.x:o.x,u=s.y>n.y?s.y>o.y?s.y:o.y:n.y>o.y?n.y:o.y,c=g(a,h,e,i,r),d=g(l,u,e,i,r),p=t.nextZ;p&&p.z<=d;){if(p!==t.prev&&p!==t.next&&y(s.x,s.y,n.x,n.y,o.x,o.y,p.x,p.y)&&b(p.prev,p,p.next)>=0)return!1;p=p.nextZ}for(p=t.prevZ;p&&p.z>=c;){if(p!==t.prev&&p!==t.next&&y(s.x,s.y,n.x,n.y,o.x,o.y,p.x,p.y)&&b(p.prev,p,p.next)>=0)return!1;p=p.prevZ}return!0}function l(t,e,i){var r=t;do{var s=r.prev,n=r.next.next;!T(s,n)&&w(s,r,r.next,n)&&S(s,n)&&S(n,s)&&(e.push(s.i/i),e.push(r.i/i),e.push(n.i/i),P(r),P(r.next),r=t=n),r=r.next}while(r!==t);return r}function u(t,e,i,r,s,a){var h=t;do{for(var l=h.next.next;l!==h.prev;){if(h.i!==l.i&&x(h,l)){var u=R(h,l);return h=n(h,h.next),u=n(u,u.next),o(h,e,i,r,s,a),void o(u,e,i,r,s,a)}l=l.next}h=h.next}while(h!==t)}function c(t,e,i,r){var o,a,h,l,u,c=[];for(o=0,a=e.length;a>o;o++)h=e[o]*r,l=a-1>o?e[o+1]*r:t.length,u=s(t,h,l,r,!1),u===u.next&&(u.steiner=!0),c.push(m(u));for(c.sort(d),o=0;o<c.length;o++)p(c[o],i),i=n(i,i.next);return i}function d(t,e){return t.x-e.x}function p(t,e){if(e=f(t,e)){var i=R(e,t);n(i,i.next)}}function f(t,e){var i,r=e,s=t.x,n=t.y,o=-1/0;do{if(n<=r.y&&n>=r.next.y){var a=r.x+(n-r.y)*(r.next.x-r.x)/(r.next.y-r.y);if(s>=a&&a>o){if(o=a,a===s){if(n===r.y)return r;if(n===r.next.y)return r.next}i=r.x<r.next.x?r:r.next}}r=r.next}while(r!==e);if(!i)return null;if(s===o)return i.prev;var h,l=i,u=i.x,c=i.y,d=1/0;for(r=i.next;r!==l;)s>=r.x&&r.x>=u&&y(c>n?s:o,n,u,c,c>n?o:s,n,r.x,r.y)&&(h=Math.abs(n-r.y)/(s-r.x),(d>h||h===d&&r.x>i.x)&&S(r,t)&&(i=r,d=h)),r=r.next;return i}function v(t,e,i,r){var s=t;do{null===s.z&&(s.z=g(s.x,s.y,e,i,r)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next}while(s!==t);s.prevZ.nextZ=null,s.prevZ=null,_(s)}function _(t){var e,i,r,s,n,o,a,h,l=1;do{for(i=t,t=null,n=null,o=0;i;){for(o++,r=i,a=0,e=0;l>e&&(a++,r=r.nextZ);e++);for(h=l;a>0||h>0&&r;)0===a?(s=r,r=r.nextZ,h--):0!==h&&r?i.z<=r.z?(s=i,i=i.nextZ,a--):(s=r,r=r.nextZ,h--):(s=i,i=i.nextZ,a--),n?n.nextZ=s:t=s,s.prevZ=n,n=s;i=r}n.nextZ=null,l*=2}while(o>1);return t}function g(t,e,i,r,s){return t=32767*(t-i)/s,e=32767*(e-r)/s,t=16711935&(t|t<<8),t=252645135&(t|t<<4),t=858993459&(t|t<<2),t=1431655765&(t|t<<1),e=16711935&(e|e<<8),e=252645135&(e|e<<4),e=858993459&(e|e<<2),e=1431655765&(e|e<<1),t|e<<1}function m(t){var e=t,i=t;do{e.x<i.x&&(i=e),e=e.next}while(e!==t);return i}function y(t,e,i,r,s,n,o,a){return(s-o)*(e-a)-(t-o)*(n-a)>=0&&(t-o)*(r-a)-(i-o)*(e-a)>=0&&(i-o)*(n-a)-(s-o)*(r-a)>=0}function x(t,e){return t.next.i!==e.i&&t.prev.i!==e.i&&!E(t,e)&&S(t,e)&&S(e,t)&&A(t,e)}function b(t,e,i){return(e.y-t.y)*(i.x-e.x)-(e.x-t.x)*(i.y-e.y)}function T(t,e){return t.x===e.x&&t.y===e.y}function w(t,e,i,r){return!!(T(t,e)&&T(i,r)||T(t,r)&&T(i,e))||b(t,e,i)>0!=b(t,e,r)>0&&b(i,r,t)>0!=b(i,r,e)>0}function E(t,e){var i=t;do{if(i.i!==t.i&&i.next.i!==t.i&&i.i!==e.i&&i.next.i!==e.i&&w(i,i.next,t,e))return!0;i=i.next}while(i!==t);return!1}function S(t,e){return b(t.prev,t,t.next)<0?b(t,e,t.next)>=0&&b(t,t.prev,e)>=0:b(t,e,t.prev)<0||b(t,t.next,e)<0}function A(t,e){var i=t,r=!1,s=(t.x+e.x)/2,n=(t.y+e.y)/2;do{i.y>n!=i.next.y>n&&s<(i.next.x-i.x)*(n-i.y)/(i.next.y-i.y)+i.x&&(r=!r),i=i.next}while(i!==t);return r}function R(t,e){var i=new M(t.i,t.x,t.y),r=new M(e.i,e.x,e.y),s=t.next,n=e.prev;return t.next=e,e.prev=t,i.next=s,s.prev=i,r.next=i,i.prev=r,n.next=r,r.prev=n,r}function O(t,e,i,r){var s=new M(t,e,i);return r?(s.next=r.next,s.prev=r,r.next.prev=s,r.next=s):(s.prev=s,s.next=s),s}function P(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ)}function M(t,e,i){this.i=t,this.x=e,this.y=i,this.prev=null,this.next=null,this.z=null,this.prevZ=null,this.nextZ=null,this.steiner=!1}function C(t,e,i,r){for(var s=0,n=e,o=i-r;i>n;n+=r)s+=(t[o]-t[n])*(t[n+1]+t[o+1]),o=n;return s}e.exports=r,r.deviation=function(t,e,i,r){var s=e&&e.length,n=s?e[0]*i:t.length,o=Math.abs(C(t,0,n,i));if(s)for(var a=0,h=e.length;h>a;a++){var l=e[a]*i,u=h-1>a?e[a+1]*i:t.length;o-=Math.abs(C(t,l,u,i))}var c=0;for(a=0;a<r.length;a+=3){var d=r[a]*i,p=r[a+1]*i,f=r[a+2]*i;c+=Math.abs((t[d]-t[f])*(t[p+1]-t[d+1])-(t[d]-t[p])*(t[f+1]-t[d+1]))}return 0===o&&0===c?0:Math.abs((c-o)/o)},r.flatten=function(t){for(var e=t[0][0].length,i={vertices:[],holes:[],dimensions:e},r=0,s=0;s<t.length;s++){for(var n=0;n<t[s].length;n++)for(var o=0;e>o;o++)i.vertices.push(t[s][n][o]);s>0&&(r+=t[s-1].length,i.holes.push(r))}return i}},{}],3:[function(t,e,i){"use strict";function r(t,e,i){this.fn=t,this.context=e,this.once=i||!1}function s(){}var n=Object.prototype.hasOwnProperty,o="function"!=typeof Object.create&&"~";s.prototype._events=void 0,s.prototype.eventNames=function(){var t,e=this._events,i=[];if(!e)return i;for(t in e)n.call(e,t)&&i.push(o?t.slice(1):t);return Object.getOwnPropertySymbols?i.concat(Object.getOwnPropertySymbols(e)):i},s.prototype.listeners=function(t,e){var i=o?o+t:t,r=this._events&&this._events[i];if(e)return!!r;if(!r)return[];if(r.fn)return[r.fn];for(var s=0,n=r.length,a=new Array(n);n>s;s++)a[s]=r[s].fn;return a},s.prototype.emit=function(t,e,i,r,s,n){var a=o?o+t:t;if(!this._events||!this._events[a])return!1;var h,l,u=this._events[a],c=arguments.length;if("function"==typeof u.fn){switch(u.once&&this.removeListener(t,u.fn,void 0,!0),c){case 1:return u.fn.call(u.context),!0;case 2:return u.fn.call(u.context,e),!0;case 3:return u.fn.call(u.context,e,i),!0;case 4:return u.fn.call(u.context,e,i,r),!0;case 5:return u.fn.call(u.context,e,i,r,s),!0;case 6:return u.fn.call(u.context,e,i,r,s,n),!0}for(l=1,h=new Array(c-1);c>l;l++)h[l-1]=arguments[l];u.fn.apply(u.context,h)}else{var d,p=u.length;for(l=0;p>l;l++)switch(u[l].once&&this.removeListener(t,u[l].fn,void 0,!0),c){case 1:u[l].fn.call(u[l].context);break;case 2:u[l].fn.call(u[l].context,e);break;case 3:u[l].fn.call(u[l].context,e,i);break;default:if(!h)for(d=1,h=new Array(c-1);c>d;d++)h[d-1]=arguments[d];u[l].fn.apply(u[l].context,h)}}return!0},s.prototype.on=function(t,e,i){var s=new r(e,i||this),n=o?o+t:t;return this._events||(this._events=o?{}:Object.create(null)),this._events[n]?this._events[n].fn?this._events[n]=[this._events[n],s]:this._events[n].push(s):this._events[n]=s,this},s.prototype.once=function(t,e,i){var s=new r(e,i||this,!0),n=o?o+t:t;return this._events||(this._events=o?{}:Object.create(null)),this._events[n]?this._events[n].fn?this._events[n]=[this._events[n],s]:this._events[n].push(s):this._events[n]=s,this},s.prototype.removeListener=function(t,e,i,r){var s=o?o+t:t;if(!this._events||!this._events[s])return this;var n=this._events[s],a=[];if(e)if(n.fn)(n.fn!==e||r&&!n.once||i&&n.context!==i)&&a.push(n);else for(var h=0,l=n.length;l>h;h++)(n[h].fn!==e||r&&!n[h].once||i&&n[h].context!==i)&&a.push(n[h]);return a.length?this._events[s]=1===a.length?a[0]:a:delete this._events[s],this},s.prototype.removeAllListeners=function(t){return this._events?(t?delete this._events[o?o+t:t]:this._events=o?{}:Object.create(null),this):this},s.prototype.off=s.prototype.removeListener,s.prototype.addListener=s.prototype.on,s.prototype.setMaxListeners=function(){return this},s.prefixed=o,void 0!==e&&(e.exports=s)},{}],4:[function(e,i,r){!function(e){
        var r=/iPhone/i,s=/iPod/i,n=/iPad/i,o=/(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,a=/Android/i,h=/(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,l=/(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,u=/IEMobile/i,c=/(?=.*\bWindows\b)(?=.*\bARM\b)/i,d=/BlackBerry/i,p=/BB10/i,f=/Opera Mini/i,v=/(CriOS|Chrome)(?=.*\bMobile\b)/i,_=/(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,g=new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)","i"),m=function(t,e){return t.test(e)},y=function(t){var e=t||navigator.userAgent,i=e.split("[FBAN");return void 0!==i[1]&&(e=i[0]),i=e.split("Twitter"),void 0!==i[1]&&(e=i[0]),this.apple={phone:m(r,e),ipod:m(s,e),tablet:!m(r,e)&&m(n,e),device:m(r,e)||m(s,e)||m(n,e)},this.amazon={phone:m(h,e),tablet:!m(h,e)&&m(l,e),device:m(h,e)||m(l,e)},this.android={phone:m(h,e)||m(o,e),tablet:!m(h,e)&&!m(o,e)&&(m(l,e)||m(a,e)),device:m(h,e)||m(l,e)||m(o,e)||m(a,e)},this.windows={phone:m(u,e),tablet:m(c,e),device:m(u,e)||m(c,e)},this.other={blackberry:m(d,e),blackberry10:m(p,e),opera:m(f,e),firefox:m(_,e),chrome:m(v,e),device:m(d,e)||m(p,e)||m(f,e)||m(_,e)||m(v,e)},this.seven_inch=m(g,e),this.any=this.apple.device||this.android.device||this.windows.device||this.other.device||this.seven_inch,this.phone=this.apple.phone||this.android.phone||this.windows.phone,this.tablet=this.apple.tablet||this.android.tablet||this.windows.tablet,"undefined"==typeof window?this:void 0},x=function(){var t=new y;return t.Class=y,t};void 0!==i&&i.exports&&"undefined"==typeof window?i.exports=y:void 0!==i&&i.exports&&"undefined"!=typeof window?i.exports=x():"function"==typeof t&&t.amd?t("isMobile",[],e.isMobile=x()):e.isMobile=x()}(this)},{}],5:[function(t,e,i){"use strict";function r(t){if(null===t||void 0===t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}function s(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},i=0;10>i;i++)e["_"+String.fromCharCode(i)]=i;if("0123456789"!==Object.getOwnPropertyNames(e).map(function(t){return e[t]}).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach(function(t){r[t]=t}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(t){return!1}}var n=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable;e.exports=s()?Object.assign:function(t,e){for(var i,s,a=r(t),h=1;h<arguments.length;h++){i=Object(arguments[h]);for(var l in i)n.call(i,l)&&(a[l]=i[l]);if(Object.getOwnPropertySymbols){s=Object.getOwnPropertySymbols(i);for(var u=0;u<s.length;u++)o.call(i,s[u])&&(a[s[u]]=i[s[u]])}}return a}},{}],6:[function(t,e,i){var r=new ArrayBuffer(0),s=function(t,e,i,s){this.gl=t,this.buffer=t.createBuffer(),this.type=e||t.ARRAY_BUFFER,this.drawType=s||t.STATIC_DRAW,this.data=r,i&&this.upload(i)};s.prototype.upload=function(t,e,i){i||this.bind();var r=this.gl;t=t||this.data,e=e||0,this.data.byteLength>=t.byteLength?r.bufferSubData(this.type,e,t):r.bufferData(this.type,t,this.drawType),this.data=t},s.prototype.bind=function(){this.gl.bindBuffer(this.type,this.buffer)},s.createVertexBuffer=function(t,e,i){return new s(t,t.ARRAY_BUFFER,e,i)},s.createIndexBuffer=function(t,e,i){return new s(t,t.ELEMENT_ARRAY_BUFFER,e,i)},s.create=function(t,e,i,r){return new s(t,e,r)},s.prototype.destroy=function(){this.gl.deleteBuffer(this.buffer)},e.exports=s},{}],7:[function(t,e,i){var r=t("./GLTexture"),s=function(t,e,i){this.gl=t,this.framebuffer=t.createFramebuffer(),this.stencil=null,this.texture=null,this.width=e||100,this.height=i||100};s.prototype.enableTexture=function(t){var e=this.gl;this.texture=t||new r(e),this.texture.bind(),this.bind(),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,this.texture.texture,0)},s.prototype.enableStencil=function(){if(!this.stencil){var t=this.gl;this.stencil=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,this.stencil),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.RENDERBUFFER,this.stencil),t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_STENCIL,this.width,this.height)}},s.prototype.clear=function(t,e,i,r){this.bind();var s=this.gl;s.clearColor(t,e,i,r),s.clear(s.COLOR_BUFFER_BIT)},s.prototype.bind=function(){var t=this.gl;this.texture&&this.texture.unbind(),t.bindFramebuffer(t.FRAMEBUFFER,this.framebuffer)},s.prototype.unbind=function(){var t=this.gl;t.bindFramebuffer(t.FRAMEBUFFER,null)},s.prototype.resize=function(t,e){var i=this.gl;this.width=t,this.height=e,this.texture&&this.texture.uploadData(null,t,e),this.stencil&&(i.bindRenderbuffer(i.RENDERBUFFER,this.stencil),i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,t,e))},s.prototype.destroy=function(){var t=this.gl;this.texture&&this.texture.destroy(),t.deleteFramebuffer(this.framebuffer),this.gl=null,this.stencil=null,this.texture=null},s.createRGBA=function(t,e,i){var n=r.fromData(t,null,e,i);n.enableNearestScaling(),n.enableWrapClamp();var o=new s(t,e,i);return o.enableTexture(n),o.unbind(),o},s.createFloat32=function(t,e,i,n){var o=new r.fromData(t,n,e,i);o.enableNearestScaling(),o.enableWrapClamp();var a=new s(t,e,i);return a.enableTexture(o),a.unbind(),a},e.exports=s},{"./GLTexture":9}],8:[function(t,e,i){var r=t("./shader/compileProgram"),s=t("./shader/extractAttributes"),n=t("./shader/extractUniforms"),o=t("./shader/generateUniformAccessObject"),a=function(t,e,i){this.gl=t,this.program=r(t,e,i),this.attributes=s(t,this.program);var a=n(t,this.program);this.uniforms=o(t,a)};a.prototype.bind=function(){this.gl.useProgram(this.program)},a.prototype.destroy=function(){},e.exports=a},{"./shader/compileProgram":14,"./shader/extractAttributes":16,"./shader/extractUniforms":17,"./shader/generateUniformAccessObject":18}],9:[function(t,e,i){var r=function(t,e,i,r,s){this.gl=t,this.texture=t.createTexture(),this.mipmap=!1,this.premultiplyAlpha=!1,this.width=e||0,this.height=i||0,this.format=r||t.RGBA,this.type=s||t.UNSIGNED_BYTE};r.prototype.upload=function(t){this.bind();var e=this.gl;this.width=t.videoWidth||t.width,this.height=t.videoHeight||t.height,e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,this.premultiplyAlpha),e.texImage2D(e.TEXTURE_2D,0,this.format,this.format,this.type,t)};var s=!1;r.prototype.uploadData=function(t,e,i){this.bind();var r=this.gl;if(this.width=e||this.width,this.height=i||this.height,t instanceof Float32Array){if(!s){if(!r.getExtension("OES_texture_float"))throw new Error("floating point textures not available");s=!0}this.type=r.FLOAT}else this.type=r.UNSIGNED_BYTE;r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,this.premultiplyAlpha),r.texImage2D(r.TEXTURE_2D,0,this.format,this.width,this.height,0,this.format,this.type,t||null)},r.prototype.bind=function(t){var e=this.gl;void 0!==t&&e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,this.texture)},r.prototype.unbind=function(){var t=this.gl;t.bindTexture(t.TEXTURE_2D,null)},r.prototype.minFilter=function(t){var e=this.gl;this.bind(),this.mipmap?e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,t?e.LINEAR_MIPMAP_LINEAR:e.NEAREST_MIPMAP_NEAREST):e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,t?e.LINEAR:e.NEAREST)},r.prototype.magFilter=function(t){var e=this.gl;this.bind(),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,t?e.LINEAR:e.NEAREST)},r.prototype.enableMipmap=function(){var t=this.gl;this.bind(),this.mipmap=!0,t.generateMipmap(t.TEXTURE_2D)},r.prototype.enableLinearScaling=function(){this.minFilter(!0),this.magFilter(!0)},r.prototype.enableNearestScaling=function(){this.minFilter(!1),this.magFilter(!1)},r.prototype.enableWrapClamp=function(){var t=this.gl;this.bind(),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)},r.prototype.enableWrapRepeat=function(){var t=this.gl;this.bind(),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT)},r.prototype.enableWrapMirrorRepeat=function(){var t=this.gl;this.bind(),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.MIRRORED_REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.MIRRORED_REPEAT)},r.prototype.destroy=function(){this.gl.deleteTexture(this.texture)},r.fromSource=function(t,e,i){var s=new r(t);return s.premultiplyAlpha=i||!1,s.upload(e),s},r.fromData=function(t,e,i,s){var n=new r(t);return n.uploadData(e,i,s),n},e.exports=r},{}],10:[function(t,e,i){function r(t,e){if(this.nativeVaoExtension=null,r.FORCE_NATIVE||(this.nativeVaoExtension=t.getExtension("OES_vertex_array_object")||t.getExtension("MOZ_OES_vertex_array_object")||t.getExtension("WEBKIT_OES_vertex_array_object")),this.nativeState=e,this.nativeVaoExtension){this.nativeVao=this.nativeVaoExtension.createVertexArrayOES();var i=t.getParameter(t.MAX_VERTEX_ATTRIBS);this.nativeState={tempAttribState:new Array(i),attribState:new Array(i)}}this.gl=t,this.attributes=[],this.indexBuffer=null,this.dirty=!1}var s=t("./setVertexAttribArrays");r.prototype.constructor=r,e.exports=r,r.FORCE_NATIVE=!1,r.prototype.bind=function(){return this.nativeVao?(this.nativeVaoExtension.bindVertexArrayOES(this.nativeVao),this.dirty&&(this.dirty=!1,this.activate())):this.activate(),this},r.prototype.unbind=function(){return this.nativeVao&&this.nativeVaoExtension.bindVertexArrayOES(null),this},r.prototype.activate=function(){for(var t=this.gl,e=null,i=0;i<this.attributes.length;i++){var r=this.attributes[i];e!==r.buffer&&(r.buffer.bind(),e=r.buffer),t.vertexAttribPointer(r.attribute.location,r.attribute.size,r.type||t.FLOAT,r.normalized||!1,r.stride||0,r.start||0)}return s(t,this.attributes,this.nativeState),this.indexBuffer.bind(),this},r.prototype.addAttribute=function(t,e,i,r,s,n){return this.attributes.push({buffer:t,attribute:e,location:e.location,type:i||this.gl.FLOAT,normalized:r||!1,stride:s||0,start:n||0}),this.dirty=!0,this},r.prototype.addIndex=function(t){return this.indexBuffer=t,this.dirty=!0,this},r.prototype.clear=function(){return this.nativeVao&&this.nativeVaoExtension.bindVertexArrayOES(this.nativeVao),this.attributes.length=0,this.indexBuffer=null,this},r.prototype.draw=function(t,e,i){var r=this.gl;return r.drawElements(t,e,r.UNSIGNED_SHORT,i||0),this},r.prototype.destroy=function(){this.gl=null,this.indexBuffer=null,this.attributes=null,this.nativeState=null,this.nativeVao&&this.nativeVaoExtension.deleteVertexArrayOES(this.nativeVao),this.nativeVaoExtension=null,this.nativeVao=null}},{"./setVertexAttribArrays":13}],11:[function(t,e,i){var r=function(t,e){var i=t.getContext("webgl",e)||t.getContext("experimental-webgl",e);if(!i)throw new Error("This browser does not support webGL. Try using the canvas renderer");return i};e.exports=r},{}],12:[function(t,e,i){var r={createContext:t("./createContext"),setVertexAttribArrays:t("./setVertexAttribArrays"),GLBuffer:t("./GLBuffer"),GLFramebuffer:t("./GLFramebuffer"),GLShader:t("./GLShader"),GLTexture:t("./GLTexture"),VertexArrayObject:t("./VertexArrayObject"),shader:t("./shader")};void 0!==e&&e.exports&&(e.exports=r),"undefined"!=typeof window&&(window.pixi={gl:r})},{"./GLBuffer":6,"./GLFramebuffer":7,"./GLShader":8,"./GLTexture":9,"./VertexArrayObject":10,"./createContext":11,"./setVertexAttribArrays":13,"./shader":19}],13:[function(t,e,i){var r=function(t,e,i){var r;if(i){var s=i.tempAttribState,n=i.attribState;for(r=0;r<s.length;r++)s[r]=!1;for(r=0;r<e.length;r++)s[e[r].attribute.location]=!0;for(r=0;r<n.length;r++)n[r]!==s[r]&&(n[r]=s[r],i.attribState[r]?t.enableVertexAttribArray(r):t.disableVertexAttribArray(r))}else for(r=0;r<e.length;r++){var o=e[r];t.enableVertexAttribArray(o.attribute.location)}};e.exports=r},{}],14:[function(t,e,i){var r=function(t,e,i){var r=s(t,t.VERTEX_SHADER,e),n=s(t,t.FRAGMENT_SHADER,i),o=t.createProgram();return t.attachShader(o,r),t.attachShader(o,n),t.linkProgram(o),t.getProgramParameter(o,t.LINK_STATUS)||(console.error("Pixi.js Error: Could not initialize shader."),console.error("gl.VALIDATE_STATUS",t.getProgramParameter(o,t.VALIDATE_STATUS)),console.error("gl.getError()",t.getError()),""!==t.getProgramInfoLog(o)&&console.warn("Pixi.js Warning: gl.getProgramInfoLog()",t.getProgramInfoLog(o)),t.deleteProgram(o),o=null),t.deleteShader(r),t.deleteShader(n),o},s=function(t,e,i){var r=t.createShader(e);return t.shaderSource(r,i),t.compileShader(r),t.getShaderParameter(r,t.COMPILE_STATUS)?r:(console.log(t.getShaderInfoLog(r)),null)};e.exports=r},{}],15:[function(t,e,i){var r=function(t,e){switch(t){case"float":return 0;case"vec2":return new Float32Array(2*e);case"vec3":return new Float32Array(3*e);case"vec4":return new Float32Array(4*e);case"int":case"sampler2D":return 0;case"ivec2":return new Int32Array(2*e);case"ivec3":return new Int32Array(3*e);case"ivec4":return new Int32Array(4*e);case"bool":return!1;case"bvec2":return s(2*e);case"bvec3":return s(3*e);case"bvec4":return s(4*e);case"mat2":return new Float32Array([1,0,0,1]);case"mat3":return new Float32Array([1,0,0,0,1,0,0,0,1]);case"mat4":return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}},s=function(t){for(var e=new Array(t),i=0;i<e.length;i++)e[i]=!1;return e};e.exports=r},{}],16:[function(t,e,i){var r=t("./mapType"),s=t("./mapSize"),n=function(t,e){for(var i={},n=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES),a=0;n>a;a++){var h=t.getActiveAttrib(e,a),l=r(t,h.type);i[h.name]={type:l,size:s(l),location:t.getAttribLocation(e,h.name),pointer:o}}return i},o=function(t,e,i,r){gl.vertexAttribPointer(this.location,this.size,t||gl.FLOAT,e||!1,i||0,r||0)};e.exports=n},{"./mapSize":20,"./mapType":21}],17:[function(t,e,i){var r=t("./mapType"),s=t("./defaultValue"),n=function(t,e){for(var i={},n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS),o=0;n>o;o++){var a=t.getActiveUniform(e,o),h=a.name.replace(/\[.*?\]/,""),l=r(t,a.type);i[h]={type:l,size:a.size,location:t.getUniformLocation(e,h),value:s(l,a.size)}}return i};e.exports=n},{"./defaultValue":15,"./mapType":21}],18:[function(t,e,i){var r=function(t,e){var i={data:{}};i.gl=t;for(var r=Object.keys(e),a=0;a<r.length;a++){var h=r[a],l=h.split("."),u=l[l.length-1],c=o(l,i),d=e[h];c.data[u]=d,c.gl=t,Object.defineProperty(c,u,{get:s(u),set:n(u,d)})}return i},s=function(t){var e=a.replace("%%",t);return new Function(e)},n=function(t,e){var i,r=h.replace(/%%/g,t);return i=1===e.size?l[e.type]:u[e.type],i&&(r+="\nthis.gl."+i+";"),new Function("value",r)},o=function(t,e){for(var i=e,r=0;r<t.length-1;r++){var s=i[t[r]]||{data:{}};i[t[r]]=s,i=s}return i},a=["return this.data.%%.value;"].join("\n"),h=["this.data.%%.value = value;","var location = this.data.%%.location;"].join("\n"),l={float:"uniform1f(location, value)",vec2:"uniform2f(location, value[0], value[1])",vec3:"uniform3f(location, value[0], value[1], value[2])",vec4:"uniform4f(location, value[0], value[1], value[2], value[3])",int:"uniform1i(location, value)",ivec2:"uniform2i(location, value[0], value[1])",ivec3:"uniform3i(location, value[0], value[1], value[2])",ivec4:"uniform4i(location, value[0], value[1], value[2], value[3])",bool:"uniform1i(location, value)",bvec2:"uniform2i(location, value[0], value[1])",bvec3:"uniform3i(location, value[0], value[1], value[2])",bvec4:"uniform4i(location, value[0], value[1], value[2], value[3])",mat2:"uniformMatrix2fv(location, false, value)",mat3:"uniformMatrix3fv(location, false, value)",mat4:"uniformMatrix4fv(location, false, value)",sampler2D:"uniform1i(location, value)"},u={float:"uniform1fv(location, value)",vec2:"uniform2fv(location, value)",vec3:"uniform3fv(location, value)",vec4:"uniform4fv(location, value)",int:"uniform1iv(location, value)",ivec2:"uniform2iv(location, value)",ivec3:"uniform3iv(location, value)",ivec4:"uniform4iv(location, value)",bool:"uniform1iv(location, value)",bvec2:"uniform2iv(location, value)",bvec3:"uniform3iv(location, value)",bvec4:"uniform4iv(location, value)",sampler2D:"uniform1iv(location, value)"};e.exports=r},{}],19:[function(t,e,i){e.exports={compileProgram:t("./compileProgram"),defaultValue:t("./defaultValue"),extractAttributes:t("./extractAttributes"),extractUniforms:t("./extractUniforms"),generateUniformAccessObject:t("./generateUniformAccessObject"),mapSize:t("./mapSize"),mapType:t("./mapType")}},{"./compileProgram":14,"./defaultValue":15,"./extractAttributes":16,"./extractUniforms":17,"./generateUniformAccessObject":18,"./mapSize":20,"./mapType":21}],20:[function(t,e,i){var r=function(t){return s[t]},s={float:1,vec2:2,vec3:3,vec4:4,int:1,ivec2:2,ivec3:3,ivec4:4,bool:1,bvec2:2,bvec3:3,bvec4:4,mat2:4,mat3:9,mat4:16,sampler2D:1};e.exports=r},{}],21:[function(t,e,i){var r=function(t,e){if(!s){var i=Object.keys(n);s={};for(var r=0;r<i.length;++r){var o=i[r];s[t[o]]=n[o]}}return s[e]},s=null,n={FLOAT:"float",FLOAT_VEC2:"vec2",FLOAT_VEC3:"vec3",FLOAT_VEC4:"vec4",INT:"int",INT_VEC2:"ivec2",INT_VEC3:"ivec3",INT_VEC4:"ivec4",BOOL:"bool",BOOL_VEC2:"bvec2",BOOL_VEC3:"bvec3",BOOL_VEC4:"bvec4",FLOAT_MAT2:"mat2",FLOAT_MAT3:"mat3",FLOAT_MAT4:"mat4",SAMPLER_2D:"sampler2D"};e.exports=r},{}],22:[function(t,e,i){(function(t){function e(t,e){for(var i=0,r=t.length-1;r>=0;r--){var s=t[r];"."===s?t.splice(r,1):".."===s?(t.splice(r,1),i++):i&&(t.splice(r,1),i--)}if(e)for(;i--;i)t.unshift("..");return t}function r(t,e){if(t.filter)return t.filter(e);for(var i=[],r=0;r<t.length;r++)e(t[r],r,t)&&i.push(t[r]);return i}var s=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,n=function(t){return s.exec(t).slice(1)};i.resolve=function(){for(var i="",s=!1,n=arguments.length-1;n>=-1&&!s;n--){var o=n>=0?arguments[n]:t.cwd();if("string"!=typeof o)throw new TypeError("Arguments to path.resolve must be strings");o&&(i=o+"/"+i,s="/"===o.charAt(0))}return i=e(r(i.split("/"),function(t){return!!t}),!s).join("/"),(s?"/":"")+i||"."},i.normalize=function(t){var s=i.isAbsolute(t),n="/"===o(t,-1);return t=e(r(t.split("/"),function(t){return!!t}),!s).join("/"),t||s||(t="."),t&&n&&(t+="/"),(s?"/":"")+t},i.isAbsolute=function(t){return"/"===t.charAt(0)},i.join=function(){var t=Array.prototype.slice.call(arguments,0);return i.normalize(r(t,function(t,e){if("string"!=typeof t)throw new TypeError("Arguments to path.join must be strings");return t}).join("/"))},i.relative=function(t,e){function r(t){for(var e=0;e<t.length&&""===t[e];e++);for(var i=t.length-1;i>=0&&""===t[i];i--);return e>i?[]:t.slice(e,i-e+1)}t=i.resolve(t).substr(1),e=i.resolve(e).substr(1);for(var s=r(t.split("/")),n=r(e.split("/")),o=Math.min(s.length,n.length),a=o,h=0;o>h;h++)if(s[h]!==n[h]){a=h;break}for(var l=[],h=a;h<s.length;h++)l.push("..");return l=l.concat(n.slice(a)),l.join("/")},i.sep="/",i.delimiter=":",i.dirname=function(t){var e=n(t),i=e[0],r=e[1];return i||r?(r&&(r=r.substr(0,r.length-1)),i+r):"."},i.basename=function(t,e){var i=n(t)[2];return e&&i.substr(-1*e.length)===e&&(i=i.substr(0,i.length-e.length)),i},i.extname=function(t){return n(t)[3]};var o="b"==="ab".substr(-1)?function(t,e,i){return t.substr(e,i)}:function(t,e,i){return 0>e&&(e=t.length+e),t.substr(e,i)}}).call(this,t("_process"))},{_process:23}],23:[function(t,e,i){function r(t){if(l===setTimeout)return setTimeout(t,0);try{return l(t,0)}catch(e){try{return l.call(null,t,0)}catch(e){return l.call(this,t,0)}}}function s(t){if(u===clearTimeout)return clearTimeout(t);try{return u(t)}catch(e){try{return u.call(null,t)}catch(e){return u.call(this,t)}}}function n(){f&&d&&(f=!1,d.length?p=d.concat(p):v=-1,p.length&&o())}function o(){if(!f){var t=r(n);f=!0;for(var e=p.length;e;){for(d=p,p=[];++v<e;)d&&d[v].run();v=-1,e=p.length}d=null,f=!1,s(t)}}function a(t,e){this.fun=t,this.array=e}function h(){}var l,u,c=e.exports={};!function(){try{l=setTimeout}catch(t){l=function(){throw new Error("setTimeout is not defined")}}try{u=clearTimeout}catch(t){u=function(){throw new Error("clearTimeout is not defined")}}}();var d,p=[],f=!1,v=-1;c.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var i=1;i<arguments.length;i++)e[i-1]=arguments[i];p.push(new a(t,e)),1!==p.length||f||r(o)},a.prototype.run=function(){this.fun.apply(null,this.array)},c.title="browser",c.browser=!0,c.env={},c.argv=[],c.version="",c.versions={},c.on=h,c.addListener=h,c.once=h,c.off=h,c.removeListener=h,c.removeAllListeners=h,c.emit=h,c.binding=function(t){throw new Error("process.binding is not supported")},c.cwd=function(){return"/"},c.chdir=function(t){throw new Error("process.chdir is not supported")},c.umask=function(){return 0}},{}],24:[function(e,i,r){(function(e){!function(s){function n(t){throw new RangeError(I[t])}function o(t,e){for(var i=t.length,r=[];i--;)r[i]=e(t[i]);return r}function a(t,e){var i=t.split("@"),r="";return i.length>1&&(r=i[0]+"@",t=i[1]),t=t.replace(D,"."),r+o(t.split("."),e).join(".")}function h(t){for(var e,i,r=[],s=0,n=t.length;n>s;)e=t.charCodeAt(s++),e>=55296&&56319>=e&&n>s?(i=t.charCodeAt(s++),56320==(64512&i)?r.push(((1023&e)<<10)+(1023&i)+65536):(r.push(e),s--)):r.push(e);return r}function l(t){return o(t,function(t){var e="";return t>65535&&(t-=65536,e+=N(t>>>10&1023|55296),t=56320|1023&t),e+=N(t)}).join("")}function u(t){return 10>t-48?t-22:26>t-65?t-65:26>t-97?t-97:w}function c(t,e){return t+22+75*(26>t)-((0!=e)<<5)}function d(t,e,i){var r=0;for(t=i?k(t/R):t>>1,t+=k(t/e);t>j*S>>1;r+=w)t=k(t/j);return k(r+(j+1)*t/(t+A))}function p(t){var e,i,r,s,o,a,h,c,p,f,v=[],_=t.length,g=0,m=P,y=O;for(i=t.lastIndexOf(M),0>i&&(i=0),r=0;i>r;++r)t.charCodeAt(r)>=128&&n("not-basic"),v.push(t.charCodeAt(r));for(s=i>0?i+1:0;_>s;){for(o=g,a=1,h=w;s>=_&&n("invalid-input"),c=u(t.charCodeAt(s++)),(c>=w||c>k((T-g)/a))&&n("overflow"),g+=c*a,!((p=y>=h?E:h>=y+S?S:h-y)>c);h+=w)f=w-p,a>k(T/f)&&n("overflow"),a*=f;e=v.length+1,y=d(g-o,e,0==o),k(g/e)>T-m&&n("overflow"),m+=k(g/e),g%=e,v.splice(g++,0,m)}return l(v)}function f(t){var e,i,r,s,o,a,l,u,p,f,v,_,g,m,y,x=[];for(t=h(t),_=t.length,e=P,i=0,o=O,a=0;_>a;++a)128>(v=t[a])&&x.push(N(v));for(r=s=x.length,s&&x.push(M);_>r;){for(l=T,a=0;_>a;++a)(v=t[a])>=e&&l>v&&(l=v);for(g=r+1,l-e>k((T-i)/g)&&n("overflow"),i+=(l-e)*g,e=l,a=0;_>a;++a)if(v=t[a],e>v&&++i>T&&n("overflow"),v==e){for(u=i,p=w;!((f=o>=p?E:p>=o+S?S:p-o)>u);p+=w)y=u-f,m=w-f,x.push(N(c(f+y%m,0))),u=k(y/m);x.push(N(c(u,0))),o=d(i,g,r==s),i=0,++r}++i,++e}return x.join("")}function v(t){return a(t,function(t){return C.test(t)?p(t.slice(4).toLowerCase()):t})}function _(t){return a(t,function(t){return L.test(t)?"xn--"+f(t):t})}var g="object"==typeof r&&r&&!r.nodeType&&r,m="object"==typeof i&&i&&!i.nodeType&&i,y="object"==typeof e&&e;y.global!==y&&y.window!==y&&y.self!==y||(s=y);var x,b,T=2147483647,w=36,E=1,S=26,A=38,R=700,O=72,P=128,M="-",C=/^xn--/,L=/[^\x20-\x7E]/,D=/[\x2E\u3002\uFF0E\uFF61]/g,I={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},j=w-E,k=Math.floor,N=String.fromCharCode;if(x={version:"1.4.1",ucs2:{decode:h,encode:l},decode:p,encode:f,toASCII:_,toUnicode:v},"function"==typeof t&&"object"==typeof t.amd&&t.amd)t("punycode",function(){return x});else if(g&&m)if(i.exports==g)m.exports=x;else for(b in x)x.hasOwnProperty(b)&&(g[b]=x[b]);else s.punycode=x}(this)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],25:[function(t,e,i){"use strict";function r(t,e){return Object.prototype.hasOwnProperty.call(t,e)}e.exports=function(t,e,i,n){e=e||"&",i=i||"=";var o={};if("string"!=typeof t||0===t.length)return o;var a=/\+/g;t=t.split(e);var h=1e3;n&&"number"==typeof n.maxKeys&&(h=n.maxKeys);var l=t.length;h>0&&l>h&&(l=h);for(var u=0;l>u;++u){var c,d,p,f,v=t[u].replace(a,"%20"),_=v.indexOf(i);_>=0?(c=v.substr(0,_),d=v.substr(_+1)):(c=v,d=""),p=decodeURIComponent(c),f=decodeURIComponent(d),r(o,p)?s(o[p])?o[p].push(f):o[p]=[o[p],f]:o[p]=f}return o};var s=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)}},{}],26:[function(t,e,i){"use strict";function r(t,e){if(t.map)return t.map(e);for(var i=[],r=0;r<t.length;r++)i.push(e(t[r],r));return i}var s=function(t){switch(typeof t){case"string":return t;case"boolean":return t?"true":"false";case"number":return isFinite(t)?t:"";default:return""}};e.exports=function(t,e,i,a){return e=e||"&",i=i||"=",null===t&&(t=void 0),"object"==typeof t?r(o(t),function(o){var a=encodeURIComponent(s(o))+i;return n(t[o])?r(t[o],function(t){return a+encodeURIComponent(s(t))}).join(e):a+encodeURIComponent(s(t[o]))}).join(e):a?encodeURIComponent(s(a))+i+encodeURIComponent(s(t)):""};var n=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},o=Object.keys||function(t){var e=[];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&e.push(i);return e}},{}],27:[function(t,e,i){"use strict";i.decode=i.parse=t("./decode"),i.encode=i.stringify=t("./encode")},{"./decode":25,"./encode":26}],28:[function(t,e,i){"use strict";function r(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null}function s(t,e,i){if(t&&l.isObject(t)&&t instanceof r)return t;var s=new r;return s.parse(t,e,i),s}function n(t){return l.isString(t)&&(t=s(t)),t instanceof r?t.format():r.prototype.format.call(t)}function o(t,e){return s(t,!1,!0).resolve(e)}function a(t,e){return t?s(t,!1,!0).resolveObject(e):e}var h=t("punycode"),l=t("./util");i.parse=s,i.resolve=o,i.resolveObject=a,i.format=n,i.Url=r;var u=/^([a-z0-9.+-]+:)/i,c=/:[0-9]*$/,d=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,p=["<",">",'"',"`"," ","\r","\n","\t"],f=["{","}","|","\\","^","`"].concat(p),v=["'"].concat(f),_=["%","/","?",";","#"].concat(v),g=["/","?","#"],m=/^[+a-z0-9A-Z_-]{0,63}$/,y=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,x={javascript:!0,"javascript:":!0},b={javascript:!0,"javascript:":!0},T={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0},w=t("querystring");r.prototype.parse=function(t,e,i){if(!l.isString(t))throw new TypeError("Parameter 'url' must be a string, not "+typeof t);var r=t.indexOf("?"),s=-1!==r&&r<t.indexOf("#")?"?":"#",n=t.split(s),o=/\\/g;n[0]=n[0].replace(o,"/"),t=n.join(s);var a=t;if(a=a.trim(),!i&&1===t.split("#").length){var c=d.exec(a);if(c)return this.path=a,this.href=a,this.pathname=c[1],c[2]?(this.search=c[2],this.query=e?w.parse(this.search.substr(1)):this.search.substr(1)):e&&(this.search="",this.query={}),this}var p=u.exec(a);if(p){p=p[0];var f=p.toLowerCase();this.protocol=f,a=a.substr(p.length)}if(i||p||a.match(/^\/\/[^@\/]+@[^@\/]+/)){var E="//"===a.substr(0,2);!E||p&&b[p]||(a=a.substr(2),this.slashes=!0)}if(!b[p]&&(E||p&&!T[p])){for(var S=-1,A=0;A<g.length;A++){var R=a.indexOf(g[A]);-1!==R&&(-1===S||S>R)&&(S=R)}var O,P;P=-1===S?a.lastIndexOf("@"):a.lastIndexOf("@",S),-1!==P&&(O=a.slice(0,P),a=a.slice(P+1),this.auth=decodeURIComponent(O)),S=-1;for(var A=0;A<_.length;A++){var R=a.indexOf(_[A]);-1!==R&&(-1===S||S>R)&&(S=R)}-1===S&&(S=a.length),this.host=a.slice(0,S),a=a.slice(S),this.parseHost(),this.hostname=this.hostname||"";var M="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];if(!M)for(var C=this.hostname.split(/\./),A=0,L=C.length;L>A;A++){var D=C[A];if(D&&!D.match(m)){for(var I="",j=0,k=D.length;k>j;j++)I+=D.charCodeAt(j)>127?"x":D[j];if(!I.match(m)){var N=C.slice(0,A),F=C.slice(A+1),B=D.match(y);B&&(N.push(B[1]),F.unshift(B[2])),F.length&&(a="/"+F.join(".")+a),this.hostname=N.join(".");break}}}this.hostname.length>255?this.hostname="":this.hostname=this.hostname.toLowerCase(),M||(this.hostname=h.toASCII(this.hostname));var U=this.port?":"+this.port:"",X=this.hostname||"";this.host=X+U,this.href+=this.host,M&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),"/"!==a[0]&&(a="/"+a))}if(!x[f])for(var A=0,L=v.length;L>A;A++){var z=v[A];if(-1!==a.indexOf(z)){var W=encodeURIComponent(z);W===z&&(W=escape(z)),a=a.split(z).join(W)}}var G=a.indexOf("#");-1!==G&&(this.hash=a.substr(G),a=a.slice(0,G));var H=a.indexOf("?");if(-1!==H?(this.search=a.substr(H),this.query=a.substr(H+1),e&&(this.query=w.parse(this.query)),a=a.slice(0,H)):e&&(this.search="",this.query={}),a&&(this.pathname=a),T[f]&&this.hostname&&!this.pathname&&(this.pathname="/"),this.pathname||this.search){var U=this.pathname||"",Y=this.search||"";this.path=U+Y}return this.href=this.format(),this},r.prototype.format=function(){var t=this.auth||"";t&&(t=encodeURIComponent(t),t=t.replace(/%3A/i,":"),t+="@");var e=this.protocol||"",i=this.pathname||"",r=this.hash||"",s=!1,n="";this.host?s=t+this.host:this.hostname&&(s=t+(-1===this.hostname.indexOf(":")?this.hostname:"["+this.hostname+"]"),this.port&&(s+=":"+this.port)),this.query&&l.isObject(this.query)&&Object.keys(this.query).length&&(n=w.stringify(this.query));var o=this.search||n&&"?"+n||"";return e&&":"!==e.substr(-1)&&(e+=":"),this.slashes||(!e||T[e])&&!1!==s?(s="//"+(s||""),i&&"/"!==i.charAt(0)&&(i="/"+i)):s||(s=""),r&&"#"!==r.charAt(0)&&(r="#"+r),o&&"?"!==o.charAt(0)&&(o="?"+o),i=i.replace(/[?#]/g,function(t){return encodeURIComponent(t)}),o=o.replace("#","%23"),e+s+i+o+r},r.prototype.resolve=function(t){return this.resolveObject(s(t,!1,!0)).format()},r.prototype.resolveObject=function(t){if(l.isString(t)){var e=new r;e.parse(t,!1,!0),t=e}for(var i=new r,s=Object.keys(this),n=0;n<s.length;n++){var o=s[n];i[o]=this[o]}if(i.hash=t.hash,""===t.href)return i.href=i.format(),i;if(t.slashes&&!t.protocol){for(var a=Object.keys(t),h=0;h<a.length;h++){var u=a[h];"protocol"!==u&&(i[u]=t[u])}return T[i.protocol]&&i.hostname&&!i.pathname&&(i.path=i.pathname="/"),i.href=i.format(),i}if(t.protocol&&t.protocol!==i.protocol){if(!T[t.protocol]){for(var c=Object.keys(t),d=0;d<c.length;d++){var p=c[d];i[p]=t[p]}return i.href=i.format(),i}if(i.protocol=t.protocol,t.host||b[t.protocol])i.pathname=t.pathname;else{for(var f=(t.pathname||"").split("/");f.length&&!(t.host=f.shift()););t.host||(t.host=""),t.hostname||(t.hostname=""),""!==f[0]&&f.unshift(""),f.length<2&&f.unshift(""),i.pathname=f.join("/")}if(i.search=t.search,i.query=t.query,i.host=t.host||"",i.auth=t.auth,i.hostname=t.hostname||t.host,i.port=t.port,i.pathname||i.search){var v=i.pathname||"",_=i.search||"";i.path=v+_}return i.slashes=i.slashes||t.slashes,i.href=i.format(),i}var g=i.pathname&&"/"===i.pathname.charAt(0),m=t.host||t.pathname&&"/"===t.pathname.charAt(0),y=m||g||i.host&&t.pathname,x=y,w=i.pathname&&i.pathname.split("/")||[],f=t.pathname&&t.pathname.split("/")||[],E=i.protocol&&!T[i.protocol];if(E&&(i.hostname="",i.port=null,i.host&&(""===w[0]?w[0]=i.host:w.unshift(i.host)),i.host="",t.protocol&&(t.hostname=null,t.port=null,t.host&&(""===f[0]?f[0]=t.host:f.unshift(t.host)),t.host=null),y=y&&(""===f[0]||""===w[0])),m)i.host=t.host||""===t.host?t.host:i.host,i.hostname=t.hostname||""===t.hostname?t.hostname:i.hostname,i.search=t.search,i.query=t.query,w=f;else if(f.length)w||(w=[]),w.pop(),w=w.concat(f),i.search=t.search,i.query=t.query;else if(!l.isNullOrUndefined(t.search)){if(E){i.hostname=i.host=w.shift();var S=!!(i.host&&i.host.indexOf("@")>0)&&i.host.split("@");S&&(i.auth=S.shift(),i.host=i.hostname=S.shift())}return i.search=t.search,i.query=t.query,l.isNull(i.pathname)&&l.isNull(i.search)||(i.path=(i.pathname?i.pathname:"")+(i.search?i.search:"")),i.href=i.format(),i}if(!w.length)return i.pathname=null,i.search?i.path="/"+i.search:i.path=null,i.href=i.format(),i;for(var A=w.slice(-1)[0],R=(i.host||t.host||w.length>1)&&("."===A||".."===A)||""===A,O=0,P=w.length;P>=0;P--)A=w[P],"."===A?w.splice(P,1):".."===A?(w.splice(P,1),O++):O&&(w.splice(P,1),O--);if(!y&&!x)for(;O--;O)w.unshift("..");!y||""===w[0]||w[0]&&"/"===w[0].charAt(0)||w.unshift(""),R&&"/"!==w.join("/").substr(-1)&&w.push("");var M=""===w[0]||w[0]&&"/"===w[0].charAt(0);if(E){i.hostname=i.host=M?"":w.length?w.shift():"";var S=!!(i.host&&i.host.indexOf("@")>0)&&i.host.split("@");S&&(i.auth=S.shift(),i.host=i.hostname=S.shift())}return y=y||i.host&&w.length,y&&!M&&w.unshift(""),w.length?i.pathname=w.join("/"):(i.pathname=null,
        i.path=null),l.isNull(i.pathname)&&l.isNull(i.search)||(i.path=(i.pathname?i.pathname:"")+(i.search?i.search:"")),i.auth=t.auth||i.auth,i.slashes=i.slashes||t.slashes,i.href=i.format(),i},r.prototype.parseHost=function(){var t=this.host,e=c.exec(t);e&&(e=e[0],":"!==e&&(this.port=e.substr(1)),t=t.substr(0,t.length-e.length)),t&&(this.hostname=t)}},{"./util":29,punycode:24,querystring:27}],29:[function(t,e,i){"use strict";e.exports={isString:function(t){return"string"==typeof t},isObject:function(t){return"object"==typeof t&&null!==t},isNull:function(t){return null===t},isNullOrUndefined:function(t){return null==t}}},{}],30:[function(t,e,i){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function s(t,e,i,r){(0,o.default)(e)(t,(0,h.default)(i),r)}Object.defineProperty(i,"__esModule",{value:!0}),i.default=s;var n=t("./internal/eachOfLimit"),o=r(n),a=t("./internal/withoutIndex"),h=r(a);e.exports=i.default},{"./internal/eachOfLimit":34,"./internal/withoutIndex":41}],31:[function(t,e,i){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(i,"__esModule",{value:!0});var s=t("./eachLimit"),n=r(s),o=t("./internal/doLimit"),a=r(o);i.default=(0,a.default)(n.default,1),e.exports=i.default},{"./eachLimit":30,"./internal/doLimit":33}],32:[function(t,e,i){"use strict";function r(){this.head=this.tail=null,this.length=0}function s(t,e){t.length=1,t.head=t.tail=e}Object.defineProperty(i,"__esModule",{value:!0}),i.default=r,r.prototype.removeLink=function(t){return t.prev?t.prev.next=t.next:this.head=t.next,t.next?t.next.prev=t.prev:this.tail=t.prev,t.prev=t.next=null,this.length-=1,t},r.prototype.empty=r,r.prototype.insertAfter=function(t,e){e.prev=t,e.next=t.next,t.next?t.next.prev=e:this.tail=e,t.next=e,this.length+=1},r.prototype.insertBefore=function(t,e){e.prev=t.prev,e.next=t,t.prev?t.prev.next=e:this.head=e,t.prev=e,this.length+=1},r.prototype.unshift=function(t){this.head?this.insertBefore(this.head,t):s(this,t)},r.prototype.push=function(t){this.tail?this.insertAfter(this.tail,t):s(this,t)},r.prototype.shift=function(){return this.head&&this.removeLink(this.head)},r.prototype.pop=function(){return this.tail&&this.removeLink(this.tail)},e.exports=i.default},{}],33:[function(t,e,i){"use strict";function r(t,e){return function(i,r,s){return t(i,e,r,s)}}Object.defineProperty(i,"__esModule",{value:!0}),i.default=r,e.exports=i.default},{}],34:[function(t,e,i){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function s(t){return function(e,i,r){function s(t){if(c-=1,t)l=!0,r(t);else{if(l&&0>=c)return r(null);n()}}function n(){for(;t>c&&!l;){var e=a();if(null===e)return l=!0,void(0>=c&&r(null));c+=1,i(e.value,e.key,(0,d.default)(s))}}if(r=(0,h.default)(r||o.default),0>=t||!e)return r(null);var a=(0,u.default)(e),l=!1,c=0;n()}}Object.defineProperty(i,"__esModule",{value:!0}),i.default=s;var n=t("lodash/noop"),o=r(n),a=t("./once"),h=r(a),l=t("./iterator"),u=r(l),c=t("./onlyOnce"),d=r(c);e.exports=i.default},{"./iterator":36,"./once":37,"./onlyOnce":38,"lodash/noop":62}],35:[function(t,e,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=function(t){return r&&t[r]&&t[r]()};var r="function"==typeof Symbol&&Symbol.iterator;e.exports=i.default},{}],36:[function(t,e,i){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function s(t){var e=-1,i=t.length;return function(){return++e<i?{value:t[e],key:e}:null}}function n(t){var e=-1;return function(){var i=t.next();return i.done?null:(e++,{value:i.value,key:e})}}function o(t){var e=(0,p.default)(t),i=-1,r=e.length;return function(){var s=e[++i];return r>i?{value:t[s],key:s}:null}}function a(t){if((0,l.default)(t))return s(t);var e=(0,c.default)(t);return e?n(e):o(t)}Object.defineProperty(i,"__esModule",{value:!0}),i.default=a;var h=t("lodash/isArrayLike"),l=r(h),u=t("./getIterator"),c=r(u),d=t("lodash/keys"),p=r(d);e.exports=i.default},{"./getIterator":35,"lodash/isArrayLike":54,"lodash/keys":61}],37:[function(t,e,i){"use strict";function r(t){return function(){if(null!==t){var e=t;t=null,e.apply(this,arguments)}}}Object.defineProperty(i,"__esModule",{value:!0}),i.default=r,e.exports=i.default},{}],38:[function(t,e,i){"use strict";function r(t){return function(){if(null===t)throw new Error("Callback was already called.");var e=t;t=null,e.apply(this,arguments)}}Object.defineProperty(i,"__esModule",{value:!0}),i.default=r,e.exports=i.default},{}],39:[function(t,e,i){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function s(t,e,i){function r(t,e,i){if(null!=i&&"function"!=typeof i)throw new Error("task callback must be a function");return l.started=!0,(0,h.default)(t)||(t=[t]),0===t.length&&l.idle()?(0,_.default)(function(){l.drain()}):((0,o.default)(t,function(t){var r={data:t,callback:i||u.default};e?l._tasks.unshift(r):l._tasks.push(r)}),void(0,_.default)(l.process))}function s(t){return(0,d.default)(function(e){n-=1,(0,o.default)(t,function(t){(0,o.default)(a,function(e,i){return e===t?(a.splice(i,1),!1):void 0}),t.callback.apply(t,e),null!=e[0]&&l.error(e[0],t.data)}),n<=l.concurrency-l.buffer&&l.unsaturated(),l.idle()&&l.drain(),l.process()})}if(null==e)e=1;else if(0===e)throw new Error("Concurrency must not be zero");var n=0,a=[],l={_tasks:new m.default,concurrency:e,payload:i,saturated:u.default,unsaturated:u.default,buffer:e/4,empty:u.default,drain:u.default,error:u.default,started:!1,paused:!1,push:function(t,e){r(t,!1,e)},kill:function(){l.drain=u.default,l._tasks.empty()},unshift:function(t,e){r(t,!0,e)},process:function(){for(;!l.paused&&n<l.concurrency&&l._tasks.length;){var e=[],i=[],r=l._tasks.length;l.payload&&(r=Math.min(r,l.payload));for(var o=0;r>o;o++){var h=l._tasks.shift();e.push(h),i.push(h.data)}0===l._tasks.length&&l.empty(),n+=1,a.push(e[0]),n===l.concurrency&&l.saturated();var u=(0,f.default)(s(e));t(i,u)}},length:function(){return l._tasks.length},running:function(){return n},workersList:function(){return a},idle:function(){return l._tasks.length+n===0},pause:function(){l.paused=!0},resume:function(){if(!1!==l.paused){l.paused=!1;for(var t=Math.min(l.concurrency,l._tasks.length),e=1;t>=e;e++)(0,_.default)(l.process)}}};return l}Object.defineProperty(i,"__esModule",{value:!0}),i.default=s;var n=t("lodash/_arrayEach"),o=r(n),a=t("lodash/isArray"),h=r(a),l=t("lodash/noop"),u=r(l),c=t("lodash/rest"),d=r(c),p=t("./onlyOnce"),f=r(p),v=t("./setImmediate"),_=r(v),g=t("./DoublyLinkedList"),m=r(g);e.exports=i.default},{"./DoublyLinkedList":32,"./onlyOnce":38,"./setImmediate":40,"lodash/_arrayEach":43,"lodash/isArray":53,"lodash/noop":62,"lodash/rest":63}],40:[function(t,e,i){(function(e){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function s(t){setTimeout(t,0)}function n(t){return(0,h.default)(function(e,i){t(function(){e.apply(null,i)})})}Object.defineProperty(i,"__esModule",{value:!0}),i.hasNextTick=i.hasSetImmediate=void 0,i.fallback=s,i.wrap=n;var o,a=t("lodash/rest"),h=r(a),l=i.hasSetImmediate="function"==typeof setImmediate&&setImmediate,u=i.hasNextTick="object"==typeof e&&"function"==typeof e.nextTick;o=l?setImmediate:u?e.nextTick:s,i.default=n(o)}).call(this,t("_process"))},{_process:23,"lodash/rest":63}],41:[function(t,e,i){"use strict";function r(t){return function(e,i,r){return t(e,r)}}Object.defineProperty(i,"__esModule",{value:!0}),i.default=r,e.exports=i.default},{}],42:[function(t,e,i){function r(t,e,i){switch(i.length){case 0:return t.call(e);case 1:return t.call(e,i[0]);case 2:return t.call(e,i[0],i[1]);case 3:return t.call(e,i[0],i[1],i[2])}return t.apply(e,i)}e.exports=r},{}],43:[function(t,e,i){function r(t,e){for(var i=-1,r=t?t.length:0;++i<r&&!1!==e(t[i],i,t););return t}e.exports=r},{}],44:[function(t,e,i){function r(t,e){var i=o(t)||n(t)?s(t.length,String):[],r=i.length,h=!!r;for(var u in t)!e&&!l.call(t,u)||h&&("length"==u||a(u,r))||i.push(u);return i}var s=t("./_baseTimes"),n=t("./isArguments"),o=t("./isArray"),a=t("./_isIndex"),h=Object.prototype,l=h.hasOwnProperty;e.exports=r},{"./_baseTimes":47,"./_isIndex":48,"./isArguments":52,"./isArray":53}],45:[function(t,e,i){function r(t){if(!s(t))return n(t);var e=[];for(var i in Object(t))a.call(t,i)&&"constructor"!=i&&e.push(i);return e}var s=t("./_isPrototype"),n=t("./_nativeKeys"),o=Object.prototype,a=o.hasOwnProperty;e.exports=r},{"./_isPrototype":49,"./_nativeKeys":50}],46:[function(t,e,i){function r(t,e){return e=n(void 0===e?t.length-1:e,0),function(){for(var i=arguments,r=-1,o=n(i.length-e,0),a=Array(o);++r<o;)a[r]=i[e+r];r=-1;for(var h=Array(e+1);++r<e;)h[r]=i[r];return h[e]=a,s(t,this,h)}}var s=t("./_apply"),n=Math.max;e.exports=r},{"./_apply":42}],47:[function(t,e,i){function r(t,e){for(var i=-1,r=Array(t);++i<t;)r[i]=e(i);return r}e.exports=r},{}],48:[function(t,e,i){function r(t,e){return!!(e=null==e?s:e)&&("number"==typeof t||n.test(t))&&t>-1&&t%1==0&&e>t}var s=9007199254740991,n=/^(?:0|[1-9]\d*)$/;e.exports=r},{}],49:[function(t,e,i){function r(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||s)}var s=Object.prototype;e.exports=r},{}],50:[function(t,e,i){var r=t("./_overArg"),s=r(Object.keys,Object);e.exports=s},{"./_overArg":51}],51:[function(t,e,i){function r(t,e){return function(i){return t(e(i))}}e.exports=r},{}],52:[function(t,e,i){function r(t){return s(t)&&a.call(t,"callee")&&(!l.call(t,"callee")||h.call(t)==n)}var s=t("./isArrayLikeObject"),n="[object Arguments]",o=Object.prototype,a=o.hasOwnProperty,h=o.toString,l=o.propertyIsEnumerable;e.exports=r},{"./isArrayLikeObject":55}],53:[function(t,e,i){var r=Array.isArray;e.exports=r},{}],54:[function(t,e,i){function r(t){return null!=t&&n(t.length)&&!s(t)}var s=t("./isFunction"),n=t("./isLength");e.exports=r},{"./isFunction":56,"./isLength":57}],55:[function(t,e,i){function r(t){return n(t)&&s(t)}var s=t("./isArrayLike"),n=t("./isObjectLike");e.exports=r},{"./isArrayLike":54,"./isObjectLike":59}],56:[function(t,e,i){function r(t){var e=s(t)?h.call(t):"";return e==n||e==o}var s=t("./isObject"),n="[object Function]",o="[object GeneratorFunction]",a=Object.prototype,h=a.toString;e.exports=r},{"./isObject":58}],57:[function(t,e,i){function r(t){return"number"==typeof t&&t>-1&&t%1==0&&s>=t}var s=9007199254740991;e.exports=r},{}],58:[function(t,e,i){function r(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}e.exports=r},{}],59:[function(t,e,i){function r(t){return!!t&&"object"==typeof t}e.exports=r},{}],60:[function(t,e,i){function r(t){return"symbol"==typeof t||s(t)&&a.call(t)==n}var s=t("./isObjectLike"),n="[object Symbol]",o=Object.prototype,a=o.toString;e.exports=r},{"./isObjectLike":59}],61:[function(t,e,i){function r(t){return o(t)?s(t):n(t)}var s=t("./_arrayLikeKeys"),n=t("./_baseKeys"),o=t("./isArrayLike");e.exports=r},{"./_arrayLikeKeys":44,"./_baseKeys":45,"./isArrayLike":54}],62:[function(t,e,i){function r(){}e.exports=r},{}],63:[function(t,e,i){function r(t,e){if("function"!=typeof t)throw new TypeError(o);return e=void 0===e?e:n(e),s(t,e)}var s=t("./_baseRest"),n=t("./toInteger"),o="Expected a function";e.exports=r},{"./_baseRest":46,"./toInteger":65}],64:[function(t,e,i){function r(t){if(!t)return 0===t?t:0;if((t=s(t))===n||t===-n){return(0>t?-1:1)*o}return t===t?t:0}var s=t("./toNumber"),n=1/0,o=1.7976931348623157e308;e.exports=r},{"./toNumber":66}],65:[function(t,e,i){function r(t){var e=s(t),i=e%1;return e===e?i?e-i:e:0}var s=t("./toFinite");e.exports=r},{"./toFinite":64}],66:[function(t,e,i){function r(t){if("number"==typeof t)return t;if(n(t))return o;if(s(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=s(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(a,"");var i=l.test(t);return i||u.test(t)?c(t.slice(2),i?2:8):h.test(t)?o:+t}var s=t("./isObject"),n=t("./isSymbol"),o=NaN,a=/^\s+|\s+$/g,h=/^[-+]0x[0-9a-f]+$/i,l=/^0b[01]+$/i,u=/^0o[0-7]+$/i,c=parseInt;e.exports=r},{"./isObject":58,"./isSymbol":60}],67:[function(t,e,i){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(i,"__esModule",{value:!0}),i.default=function(t,e){return(0,n.default)(function(e,i){t(e[0],i)},e,1)};var s=t("./internal/queue"),n=r(s);e.exports=i.default},{"./internal/queue":39}],68:[function(t,e,i){"use strict";function r(t,e){h.call(this),e=e||l,this.baseUrl=t||"",this.progress=0,this.loading=!1,this._progressChunk=0,this._beforeMiddleware=[],this._afterMiddleware=[],this._boundLoadResource=this._loadResource.bind(this),this._buffer=[],this._numToLoad=0,this._queue=s(this._boundLoadResource,e),this.resources={}}var s=t("async/queue"),n=t("async/eachSeries"),o=t("url"),a=t("./Resource"),h=t("eventemitter3"),l=10,u=100;r.prototype=Object.create(h.prototype),r.prototype.constructor=r,e.exports=r,r.prototype.add=r.prototype.enqueue=function(t,e,i,r){if(Array.isArray(t)){for(var s=0;s<t.length;++s)this.add(t[s]);return this}if("object"==typeof t&&(r=e||t.callback||t.onComplete,i=t,e=t.url,t=t.name||t.key||t.url),"string"!=typeof e&&(r=i,i=e,e=t),"string"!=typeof e)throw new Error("No url passed to add resource to loader.");if("function"==typeof i&&(r=i,i=null),this.resources[t])throw new Error('Resource with name "'+t+'" already exists.');return e=this._prepareUrl(e),this.resources[t]=new a(t,e,i),"function"==typeof r&&this.resources[t].once("afterMiddleware",r),this._numToLoad++,this._queue.started?(this._queue.push(this.resources[t]),this._progressChunk=(u-this.progress)/(this._queue.length()+this._queue.running())):(this._buffer.push(this.resources[t]),this._progressChunk=u/this._buffer.length),this},r.prototype.before=r.prototype.pre=function(t){return this._beforeMiddleware.push(t),this},r.prototype.after=r.prototype.use=function(t){return this._afterMiddleware.push(t),this},r.prototype.reset=function(){this.progress=0,this.loading=!1,this._progressChunk=0,this._buffer.length=0,this._numToLoad=0,this._queue.kill(),this._queue.started=!1;for(var t in this.resources){var e=this.resources[t];e.off("complete",this._onLoad,this),e.isLoading&&e.abort()}return this.resources={},this},r.prototype.load=function(t){if("function"==typeof t&&this.once("complete",t),this._queue.started)return this;this.emit("start",this),this.loading=!0;for(var e=0;e<this._buffer.length;++e)this._queue.push(this._buffer[e]);return this._buffer.length=0,this},r.prototype._prepareUrl=function(t){var e=o.parse(t);return e.protocol||!e.pathname||0===e.pathname.indexOf("//")?t:this.baseUrl.length&&this.baseUrl.lastIndexOf("/")!==this.baseUrl.length-1&&"/"!==t.charAt(0)?this.baseUrl+"/"+t:this.baseUrl+t},r.prototype._loadResource=function(t,e){var i=this;t._dequeue=e,n(this._beforeMiddleware,function(e,r){e.call(i,t,function(){r(t.isComplete?{}:null)})},function(){t.isComplete?i._onLoad(t):(t.once("complete",i._onLoad,i),t.load())})},r.prototype._onComplete=function(){this.loading=!1,this.emit("complete",this,this.resources)},r.prototype._onLoad=function(t){var e=this;n(this._afterMiddleware,function(i,r){i.call(e,t,r)},function(){t.emit("afterMiddleware",t),e._numToLoad--,e.progress+=e._progressChunk,e.emit("progress",e,t),t.error?e.emit("error",t.error,e,t):e.emit("load",e,t),0===e._numToLoad&&(e.progress=100,e._onComplete())}),t._dequeue()},r.LOAD_TYPE=a.LOAD_TYPE,r.XHR_RESPONSE_TYPE=a.XHR_RESPONSE_TYPE},{"./Resource":69,"async/eachSeries":31,"async/queue":67,eventemitter3:3,url:28}],69:[function(t,e,i){"use strict";function r(t,e,i){if(o.call(this),i=i||{},"string"!=typeof t||"string"!=typeof e)throw new Error("Both name and url are required for constructing a resource.");this.name=t,this.url=e,this.isDataUrl=0===this.url.indexOf("data:"),this.data=null,this.crossOrigin=!0===i.crossOrigin?"anonymous":i.crossOrigin,this.loadType=i.loadType||this._determineLoadType(),this.xhrType=i.xhrType,this.metadata=i.metadata||{},this.error=null,this.xhr=null,this.isJson=!1,this.isXml=!1,this.isImage=!1,this.isAudio=!1,this.isVideo=!1,this.isComplete=!1,this.isLoading=!1,this._dequeue=null,this._boundComplete=this.complete.bind(this),this._boundOnError=this._onError.bind(this),this._boundOnProgress=this._onProgress.bind(this),this._boundXhrOnError=this._xhrOnError.bind(this),this._boundXhrOnAbort=this._xhrOnAbort.bind(this),this._boundXhrOnLoad=this._xhrOnLoad.bind(this),this._boundXdrOnTimeout=this._xdrOnTimeout.bind(this)}function s(t){return t.toString().replace("object ","")}function n(t,e,i){e&&0===e.indexOf(".")&&(e=e.substring(1)),e&&(t[e]=i)}var o=t("eventemitter3"),a=t("url"),h=!(!window.XDomainRequest||"withCredentials"in new XMLHttpRequest),l=null,u=0,c=200;r.prototype=Object.create(o.prototype),r.prototype.constructor=r,e.exports=r,r.prototype.complete=function(){if(this.data&&this.data.removeEventListener&&(this.data.removeEventListener("error",this._boundOnError,!1),this.data.removeEventListener("load",this._boundComplete,!1),this.data.removeEventListener("progress",this._boundOnProgress,!1),this.data.removeEventListener("canplaythrough",this._boundComplete,!1)),this.xhr&&(this.xhr.removeEventListener?(this.xhr.removeEventListener("error",this._boundXhrOnError,!1),this.xhr.removeEventListener("abort",this._boundXhrOnAbort,!1),this.xhr.removeEventListener("progress",this._boundOnProgress,!1),this.xhr.removeEventListener("load",this._boundXhrOnLoad,!1)):(this.xhr.onerror=null,this.xhr.ontimeout=null,this.xhr.onprogress=null,this.xhr.onload=null)),this.isComplete)throw new Error("Complete called again for an already completed resource.");this.isComplete=!0,this.isLoading=!1,this.emit("complete",this)},r.prototype.abort=function(t){if(!this.error){if(this.error=new Error(t),this.xhr)this.xhr.abort();else if(this.xdr)this.xdr.abort();else if(this.data)if(void 0!==this.data.src)this.data.src="";else for(;this.data.firstChild;)this.data.removeChild(this.data.firstChild);this.complete()}},r.prototype.load=function(t){if(!this.isLoading)if(this.isComplete){if(t){var e=this;setTimeout(function(){t(e)},1)}}else switch(t&&this.once("complete",t),this.isLoading=!0,this.emit("start",this),!1!==this.crossOrigin&&"string"==typeof this.crossOrigin||(this.crossOrigin=this._determineCrossOrigin(this.url)),this.loadType){case r.LOAD_TYPE.IMAGE:this._loadElement("image");break;case r.LOAD_TYPE.AUDIO:this._loadSourceElement("audio");break;case r.LOAD_TYPE.VIDEO:this._loadSourceElement("video");break;case r.LOAD_TYPE.XHR:default:h&&this.crossOrigin?this._loadXdr():this._loadXhr()}},r.prototype._loadElement=function(t){this.metadata.loadElement?this.data=this.metadata.loadElement:"image"===t&&void 0!==window.Image?this.data=new Image:this.data=document.createElement(t),this.crossOrigin&&(this.data.crossOrigin=this.crossOrigin),this.metadata.skipSource||(this.data.src=this.url);var e="is"+t[0].toUpperCase()+t.substring(1);!1===this[e]&&(this[e]=!0),this.data.addEventListener("error",this._boundOnError,!1),this.data.addEventListener("load",this._boundComplete,!1),this.data.addEventListener("progress",this._boundOnProgress,!1)},r.prototype._loadSourceElement=function(t){if(this.metadata.loadElement?this.data=this.metadata.loadElement:"audio"===t&&void 0!==window.Audio?this.data=new Audio:this.data=document.createElement(t),null===this.data)return void this.abort("Unsupported element "+t);if(!this.metadata.skipSource)if(navigator.isCocoonJS)this.data.src=Array.isArray(this.url)?this.url[0]:this.url;else if(Array.isArray(this.url))for(var e=0;e<this.url.length;++e)this.data.appendChild(this._createSource(t,this.url[e]));else this.data.appendChild(this._createSource(t,this.url));this["is"+t[0].toUpperCase()+t.substring(1)]=!0,this.data.addEventListener("error",this._boundOnError,!1),this.data.addEventListener("load",this._boundComplete,!1),this.data.addEventListener("progress",this._boundOnProgress,!1),this.data.addEventListener("canplaythrough",this._boundComplete,!1),this.data.load()},r.prototype._loadXhr=function(){"string"!=typeof this.xhrType&&(this.xhrType=this._determineXhrType());var t=this.xhr=new XMLHttpRequest;t.open("GET",this.url,!0),this.xhrType===r.XHR_RESPONSE_TYPE.JSON||this.xhrType===r.XHR_RESPONSE_TYPE.DOCUMENT?t.responseType=r.XHR_RESPONSE_TYPE.TEXT:t.responseType=this.xhrType,t.addEventListener("error",this._boundXhrOnError,!1),t.addEventListener("abort",this._boundXhrOnAbort,!1),t.addEventListener("progress",this._boundOnProgress,!1),t.addEventListener("load",this._boundXhrOnLoad,!1),t.send()},r.prototype._loadXdr=function(){"string"!=typeof this.xhrType&&(this.xhrType=this._determineXhrType());var t=this.xhr=new XDomainRequest;t.timeout=5e3,t.onerror=this._boundXhrOnError,t.ontimeout=this._boundXdrOnTimeout,t.onprogress=this._boundOnProgress,t.onload=this._boundXhrOnLoad,t.open("GET",this.url,!0),setTimeout(function(){t.send()},0)},r.prototype._createSource=function(t,e,i){i||(i=t+"/"+e.substr(e.lastIndexOf(".")+1));var r=document.createElement("source");return r.src=e,r.type=i,r},r.prototype._onError=function(t){this.abort("Failed to load element using "+t.target.nodeName)},r.prototype._onProgress=function(t){t&&t.lengthComputable&&this.emit("progress",this,t.loaded/t.total)},r.prototype._xhrOnError=function(){var t=this.xhr;this.abort(s(t)+" Request failed. Status: "+t.status+', text: "'+t.statusText+'"')},r.prototype._xhrOnAbort=function(){this.abort(s(this.xhr)+" Request was aborted by the user.")},r.prototype._xdrOnTimeout=function(){this.abort(s(this.xhr)+" Request timed out.")},r.prototype._xhrOnLoad=function(){var t=this.xhr,e=void 0===t.status?t.status:c;if(!(e===c||204===e||0===e&&t.responseText.length>0))return void this.abort("["+t.status+"]"+t.statusText+":"+t.responseURL);if(this.xhrType===r.XHR_RESPONSE_TYPE.TEXT)this.data=t.responseText;else if(this.xhrType===r.XHR_RESPONSE_TYPE.JSON)try{this.data=JSON.parse(t.responseText),this.isJson=!0}catch(t){return void this.abort("Error trying to parse loaded json:",t)}else if(this.xhrType===r.XHR_RESPONSE_TYPE.DOCUMENT)try{if(window.DOMParser){var i=new DOMParser;this.data=i.parseFromString(t.responseText,"text/xml")}else{var s=document.createElement("div");s.innerHTML=t.responseText,this.data=s}this.isXml=!0}catch(t){return void this.abort("Error trying to parse loaded xml:",t)}else this.data=t.response||t.responseText;this.complete()},r.prototype._determineCrossOrigin=function(t,e){if(0===t.indexOf("data:"))return"";e=e||window.location,l||(l=document.createElement("a")),l.href=t,t=a.parse(l.href);var i=!t.port&&""===e.port||t.port===e.port;return t.hostname===e.hostname&&i&&t.protocol===e.protocol?"":"anonymous"},r.prototype._determineXhrType=function(){return r._xhrTypeMap[this._getExtension()]||r.XHR_RESPONSE_TYPE.TEXT},r.prototype._determineLoadType=function(){return r._loadTypeMap[this._getExtension()]||r.LOAD_TYPE.XHR},r.prototype._getExtension=function(){var t=this.url,e="";if(this.isDataUrl){var i=t.indexOf("/");e=t.substring(i+1,t.indexOf(";",i))}else{var r=t.indexOf("?");-1!==r&&(t=t.substring(0,r)),e=t.substring(t.lastIndexOf(".")+1)}return e.toLowerCase()},r.prototype._getMimeFromXhrType=function(t){switch(t){case r.XHR_RESPONSE_TYPE.BUFFER:return"application/octet-binary";case r.XHR_RESPONSE_TYPE.BLOB:return"application/blob";case r.XHR_RESPONSE_TYPE.DOCUMENT:return"application/xml";case r.XHR_RESPONSE_TYPE.JSON:return"application/json";case r.XHR_RESPONSE_TYPE.DEFAULT:case r.XHR_RESPONSE_TYPE.TEXT:default:return"text/plain"}},r.LOAD_TYPE={XHR:1,IMAGE:2,AUDIO:3,VIDEO:4},r.XHR_RESPONSE_TYPE={DEFAULT:"text",BUFFER:"arraybuffer",BLOB:"blob",DOCUMENT:"document",JSON:"json",TEXT:"text"},r._loadTypeMap={gif:r.LOAD_TYPE.IMAGE,png:r.LOAD_TYPE.IMAGE,bmp:r.LOAD_TYPE.IMAGE,jpg:r.LOAD_TYPE.IMAGE,jpeg:r.LOAD_TYPE.IMAGE,tif:r.LOAD_TYPE.IMAGE,tiff:r.LOAD_TYPE.IMAGE,webp:r.LOAD_TYPE.IMAGE,tga:r.LOAD_TYPE.IMAGE,"svg+xml":r.LOAD_TYPE.IMAGE},r._xhrTypeMap={xhtml:r.XHR_RESPONSE_TYPE.DOCUMENT,html:r.XHR_RESPONSE_TYPE.DOCUMENT,htm:r.XHR_RESPONSE_TYPE.DOCUMENT,xml:r.XHR_RESPONSE_TYPE.DOCUMENT,tmx:r.XHR_RESPONSE_TYPE.DOCUMENT,tsx:r.XHR_RESPONSE_TYPE.DOCUMENT,svg:r.XHR_RESPONSE_TYPE.DOCUMENT,gif:r.XHR_RESPONSE_TYPE.BLOB,png:r.XHR_RESPONSE_TYPE.BLOB,bmp:r.XHR_RESPONSE_TYPE.BLOB,jpg:r.XHR_RESPONSE_TYPE.BLOB,jpeg:r.XHR_RESPONSE_TYPE.BLOB,tif:r.XHR_RESPONSE_TYPE.BLOB,tiff:r.XHR_RESPONSE_TYPE.BLOB,webp:r.XHR_RESPONSE_TYPE.BLOB,tga:r.XHR_RESPONSE_TYPE.BLOB,json:r.XHR_RESPONSE_TYPE.JSON,text:r.XHR_RESPONSE_TYPE.TEXT,txt:r.XHR_RESPONSE_TYPE.TEXT},r.setExtensionLoadType=function(t,e){n(r._loadTypeMap,t,e)},r.setExtensionXhrType=function(t,e){n(r._xhrTypeMap,t,e)}},{eventemitter3:3,url:28}],70:[function(t,e,i){"use strict";e.exports={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encodeBinary:function(t){for(var e,i="",r=new Array(4),s=0,n=0,o=0;s<t.length;){for(e=new Array(3),n=0;n<e.length;n++)s<t.length?e[n]=255&t.charCodeAt(s++):e[n]=0;switch(r[0]=e[0]>>2,r[1]=(3&e[0])<<4|e[1]>>4,r[2]=(15&e[1])<<2|e[2]>>6,r[3]=63&e[2],o=s-(t.length-1)){case 2:r[3]=64,r[2]=64;break;case 1:r[3]=64}for(n=0;n<r.length;n++)i+=this._keyStr.charAt(r[n])}return i}}},{}],71:[function(t,e,i){"use strict";e.exports=t("./Loader"),e.exports.Resource=t("./Resource"),e.exports.middleware={caching:{memory:t("./middlewares/caching/memory")},parsing:{blob:t("./middlewares/parsing/blob")}}},{"./Loader":68,"./Resource":69,"./middlewares/caching/memory":72,"./middlewares/parsing/blob":73}],72:[function(t,e,i){"use strict";var r={};e.exports=function(){return function(t,e){r[t.url]?(t.data=r[t.url],t.complete()):t.once("complete",function(){r[this.url]=this.data}),e()}}},{}],73:[function(t,e,i){"use strict";var r=t("../../Resource"),s=t("../../b64"),n=window.URL||window.webkitURL;e.exports=function(){return function(t,e){if(!t.data)return void e();if(t.xhr&&t.xhrType===r.XHR_RESPONSE_TYPE.BLOB)if(window.Blob&&"string"!=typeof t.data){if(0===t.data.type.indexOf("image")){var i=n.createObjectURL(t.data);return t.blob=t.data,t.data=new Image,t.data.src=i,t.isImage=!0,void(t.data.onload=function(){n.revokeObjectURL(i),t.data.onload=null,e()})}}else{var o=t.xhr.getResponseHeader("content-type");if(o&&0===o.indexOf("image"))return t.data=new Image,t.data.src="data:"+o+";base64,"+s.encodeBinary(t.xhr.responseText),t.isImage=!0,void(t.data.onload=function(){t.data.onload=null,e()})}e()}}},{"../../Resource":69,"../../b64":70}],74:[function(t,e,i){function r(t){(n.tablet||n.phone)&&this.createTouchHook();var e=document.createElement("div");e.style.width="100px",e.style.height="100px",e.style.position="absolute",e.style.top=0,e.style.left=0,e.style.zIndex=2,this.div=e,this.pool=[],this.renderId=0,this.debug=!1,this.renderer=t,this.children=[],this._onKeyDown=this._onKeyDown.bind(this),this._onMouseMove=this._onMouseMove.bind(this),this.isActive=!1,this.isMobileAccessabillity=!1,window.addEventListener("keydown",this._onKeyDown,!1)}var s=t("../core"),n=t("ismobilejs");Object.assign(s.DisplayObject.prototype,t("./accessibleTarget")),r.prototype.constructor=r,e.exports=r,r.prototype.createTouchHook=function(){var t=document.createElement("button");t.style.width="1px",t.style.height="1px",t.style.position="absolute",t.style.top="-1000px",t.style.left="-1000px",t.style.zIndex=2,t.style.backgroundColor="#FF0000",t.title="HOOK DIV",t.addEventListener("focus",function(){this.isMobileAccessabillity=!0,this.activate(),document.body.removeChild(t)}.bind(this)),document.body.appendChild(t)},r.prototype.activate=function(){this.isActive||(this.isActive=!0,window.document.addEventListener("mousemove",this._onMouseMove,!0),window.removeEventListener("keydown",this._onKeyDown,!1),this.renderer.on("postrender",this.update,this),this.renderer.view.parentNode&&this.renderer.view.parentNode.appendChild(this.div))},r.prototype.deactivate=function(){this.isActive&&!this.isMobileAccessabillity&&(this.isActive=!1,window.document.removeEventListener("mousemove",this._onMouseMove),window.addEventListener("keydown",this._onKeyDown,!1),this.renderer.off("postrender",this.update),this.div.parentNode&&this.div.parentNode.removeChild(this.div))},r.prototype.updateAccessibleObjects=function(t){if(t.visible){t.accessible&&t.interactive&&(t._accessibleActive||this.addChild(t),t.renderId=this.renderId);for(var e=t.children,i=e.length-1;i>=0;i--)this.updateAccessibleObjects(e[i])}},r.prototype.update=function(){if(this.renderer.renderingToScreen){this.updateAccessibleObjects(this.renderer._lastObjectRendered);var t=this.renderer.view.getBoundingClientRect(),e=t.width/this.renderer.width,i=t.height/this.renderer.height,r=this.div;r.style.left=t.left+"px",r.style.top=t.top+"px",r.style.width=this.renderer.width+"px",r.style.height=this.renderer.height+"px";for(var n=0;n<this.children.length;n++){var o=this.children[n];if(o.renderId!==this.renderId)o._accessibleActive=!1,s.utils.removeItems(this.children,n,1),this.div.removeChild(o._accessibleDiv),this.pool.push(o._accessibleDiv),o._accessibleDiv=null,n--,0===this.children.length&&this.deactivate();else{r=o._accessibleDiv;var a=o.hitArea,h=o.worldTransform;o.hitArea?(r.style.left=(h.tx+a.x*h.a)*e+"px",r.style.top=(h.ty+a.y*h.d)*i+"px",r.style.width=a.width*h.a*e+"px",r.style.height=a.height*h.d*i+"px"):(a=o.getBounds(),this.capHitArea(a),r.style.left=a.x*e+"px",r.style.top=a.y*i+"px",r.style.width=a.width*e+"px",r.style.height=a.height*i+"px")}}this.renderId++}},r.prototype.capHitArea=function(t){t.x<0&&(t.width+=t.x,t.x=0),t.y<0&&(t.height+=t.y,t.y=0),t.x+t.width>this.renderer.width&&(t.width=this.renderer.width-t.x),t.y+t.height>this.renderer.height&&(t.height=this.renderer.height-t.y)},r.prototype.addChild=function(t){var e=this.pool.pop();e||(e=document.createElement("button"),e.style.width="100px",e.style.height="100px",e.style.backgroundColor=this.debug?"rgba(255,0,0,0.5)":"transparent",e.style.position="absolute",e.style.zIndex=2,e.style.borderStyle="none",e.addEventListener("click",this._onClick.bind(this)),e.addEventListener("focus",this._onFocus.bind(this)),e.addEventListener("focusout",this._onFocusOut.bind(this))),t.accessibleTitle?e.title=t.accessibleTitle:t.accessibleTitle||t.accessibleHint||(e.title="displayObject "+this.tabIndex),t.accessibleHint&&e.setAttribute("aria-label",t.accessibleHint),t._accessibleActive=!0,t._accessibleDiv=e,e.displayObject=t,this.children.push(t),this.div.appendChild(t._accessibleDiv),t._accessibleDiv.tabIndex=t.tabIndex},r.prototype._onClick=function(t){var e=this.renderer.plugins.interaction;e.dispatchEvent(t.target.displayObject,"click",e.eventData)},r.prototype._onFocus=function(t){var e=this.renderer.plugins.interaction;e.dispatchEvent(t.target.displayObject,"mouseover",e.eventData)},r.prototype._onFocusOut=function(t){var e=this.renderer.plugins.interaction;e.dispatchEvent(t.target.displayObject,"mouseout",e.eventData)},r.prototype._onKeyDown=function(t){9===t.keyCode&&this.activate()},r.prototype._onMouseMove=function(){this.deactivate()},r.prototype.destroy=function(){this.div=null;for(var t=0;t<this.children.length;t++)this.children[t].div=null;window.document.removeEventListener("mousemove",this._onMouseMove),window.removeEventListener("keydown",this._onKeyDown),this.pool=null,this.children=null,this.renderer=null},s.WebGLRenderer.registerPlugin("accessibility",r),s.CanvasRenderer.registerPlugin("accessibility",r)},{"../core":97,"./accessibleTarget":75,ismobilejs:4}],75:[function(t,e,i){var r={accessible:!1,accessibleTitle:null,accessibleHint:null,tabIndex:0,_accessibleActive:!1,_accessibleDiv:!1};e.exports=r},{}],76:[function(t,e,i){e.exports={accessibleTarget:t("./accessibleTarget"),AccessibilityManager:t("./AccessibilityManager")}},{"./AccessibilityManager":74,"./accessibleTarget":75}],77:[function(t,e,i){function r(t){if(t instanceof Array){if("precision"!==t[0].substring(0,9)){var e=t.slice(0);return e.unshift("precision "+n.PRECISION.DEFAULT+" float;"),e}}else if("precision"!==t.substring(0,9))return"precision "+n.PRECISION.DEFAULT+" float;\n"+t;return t}var s=t("pixi-gl-core").GLShader,n=t("./const"),o=function(t,e,i){s.call(this,t,r(e),r(i))};o.prototype=Object.create(s.prototype),o.prototype.constructor=o,e.exports=o},{"./const":78,
        "pixi-gl-core":12}],78:[function(t,e,i){var r={VERSION:"4.0.0",PI_2:2*Math.PI,RAD_TO_DEG:180/Math.PI,DEG_TO_RAD:Math.PI/180,TARGET_FPMS:.06,RENDERER_TYPE:{UNKNOWN:0,WEBGL:1,CANVAS:2},BLEND_MODES:{NORMAL:0,ADD:1,MULTIPLY:2,SCREEN:3,OVERLAY:4,DARKEN:5,LIGHTEN:6,COLOR_DODGE:7,COLOR_BURN:8,HARD_LIGHT:9,SOFT_LIGHT:10,DIFFERENCE:11,EXCLUSION:12,HUE:13,SATURATION:14,COLOR:15,LUMINOSITY:16},DRAW_MODES:{POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},SCALE_MODES:{DEFAULT:0,LINEAR:0,NEAREST:1},WRAP_MODES:{DEFAULT:0,CLAMP:0,REPEAT:1,MIRRORED_REPEAT:2},GC_MODES:{DEFAULT:1,AUTO:0,MANUAL:1},MIPMAP_TEXTURES:!0,RETINA_PREFIX:/@(.+)x/,RESOLUTION:1,FILTER_RESOLUTION:1,DEFAULT_RENDER_OPTIONS:{view:null,resolution:1,antialias:!1,forceFXAA:!1,autoResize:!1,transparent:!1,backgroundColor:0,clearBeforeRender:!0,preserveDrawingBuffer:!1,roundPixels:!1},SHAPES:{POLY:0,RECT:1,CIRC:2,ELIP:3,RREC:4},PRECISION:{DEFAULT:"mediump",LOW:"lowp",MEDIUM:"mediump",HIGH:"highp"},TRANSFORM_MODE:{DEFAULT:0,STATIC:0,DYNAMIC:1},TEXT_GRADIENT:{LINEAR_VERTICAL:0,LINEAR_HORIZONTAL:1},SPRITE_BATCH_SIZE:4096,SPRITE_MAX_TEXTURES:t("./utils/maxRecommendedTextures")(32)};e.exports=r},{"./utils/maxRecommendedTextures":152}],79:[function(t,e,i){function r(){this.minX=1/0,this.minY=1/0,this.maxX=-1/0,this.maxY=-1/0,this.rect=null}var s=t("../math"),n=s.Rectangle;r.prototype.constructor=r,e.exports=r,r.prototype.isEmpty=function(){return this.minX>this.maxX||this.minY>this.maxY},r.prototype.clear=function(){this.updateID++,this.minX=1/0,this.minY=1/0,this.maxX=-1/0,this.maxY=-1/0},r.prototype.getRectangle=function(t){return this.minX>this.maxX||this.minY>this.maxY?n.EMPTY:(t=t||new n(0,0,1,1),t.x=this.minX,t.y=this.minY,t.width=this.maxX-this.minX,t.height=this.maxY-this.minY,t)},r.prototype.addPoint=function(t){this.minX=Math.min(this.minX,t.x),this.maxX=Math.max(this.maxX,t.x),this.minY=Math.min(this.minY,t.y),this.maxY=Math.max(this.maxY,t.y)},r.prototype.addQuad=function(t){var e=this.minX,i=this.minY,r=this.maxX,s=this.maxY,n=t[0],o=t[1];e=e>n?n:e,i=i>o?o:i,r=n>r?n:r,s=o>s?o:s,n=t[2],o=t[3],e=e>n?n:e,i=i>o?o:i,r=n>r?n:r,s=o>s?o:s,n=t[4],o=t[5],e=e>n?n:e,i=i>o?o:i,r=n>r?n:r,s=o>s?o:s,n=t[6],o=t[7],e=e>n?n:e,i=i>o?o:i,r=n>r?n:r,s=o>s?o:s,this.minX=e,this.minY=i,this.maxX=r,this.maxY=s},r.prototype.addFrame=function(t,e,i,r,s){var n=t.worldTransform,o=n.a,a=n.b,h=n.c,l=n.d,u=n.tx,c=n.ty,d=this.minX,p=this.minY,f=this.maxX,v=this.maxY,_=o*e+h*i+u,g=a*e+l*i+c;d=d>_?_:d,p=p>g?g:p,f=_>f?_:f,v=g>v?g:v,_=o*r+h*i+u,g=a*r+l*i+c,d=d>_?_:d,p=p>g?g:p,f=_>f?_:f,v=g>v?g:v,_=o*e+h*s+u,g=a*e+l*s+c,d=d>_?_:d,p=p>g?g:p,f=_>f?_:f,v=g>v?g:v,_=o*r+h*s+u,g=a*r+l*s+c,d=d>_?_:d,p=p>g?g:p,f=_>f?_:f,v=g>v?g:v,this.minX=d,this.minY=p,this.maxX=f,this.maxY=v},r.prototype.addVertices=function(t,e,i,r){for(var s=t.worldTransform,n=s.a,o=s.b,a=s.c,h=s.d,l=s.tx,u=s.ty,c=this.minX,d=this.minY,p=this.maxX,f=this.maxY,v=i;r>v;v+=2){var _=e[v],g=e[v+1],m=n*_+a*g+l,y=h*g+o*_+u;c=c>m?m:c,d=d>y?y:d,p=m>p?m:p,f=y>f?y:f}this.minX=c,this.minY=d,this.maxX=p,this.maxY=f},r.prototype.addBounds=function(t){var e=this.minX,i=this.minY,r=this.maxX,s=this.maxY;this.minX=t.minX<e?t.minX:e,this.minY=t.minY<i?t.minY:i,this.maxX=t.maxX>r?t.maxX:r,this.maxY=t.maxY>s?t.maxY:s}},{"../math":102}],80:[function(t,e,i){function r(){n.call(this),this.children=[]}var s=t("../utils"),n=t("./DisplayObject");r.prototype=Object.create(n.prototype),r.prototype.constructor=r,e.exports=r,Object.defineProperties(r.prototype,{width:{get:function(){return this.scale.x*this.getLocalBounds().width},set:function(t){var e=this.getLocalBounds().width;this.scale.x=0!==e?t/e:1,this._width=t}},height:{get:function(){return this.scale.y*this.getLocalBounds().height},set:function(t){var e=this.getLocalBounds().height;this.scale.y=0!==e?t/e:1,this._height=t}}}),r.prototype.onChildrenChange=function(){},r.prototype.addChild=function(t){var e=arguments.length;if(e>1)for(var i=0;e>i;i++)this.addChild(arguments[i]);else t.parent&&t.parent.removeChild(t),t.parent=this,this.transform._parentID=-1,this.children.push(t),this.onChildrenChange(this.children.length-1),t.emit("added",this);return t},r.prototype.addChildAt=function(t,e){if(e>=0&&e<=this.children.length)return t.parent&&t.parent.removeChild(t),t.parent=this,this.children.splice(e,0,t),this.onChildrenChange(e),t.emit("added",this),t;throw new Error(t+"addChildAt: The index "+e+" supplied is out of bounds "+this.children.length)},r.prototype.swapChildren=function(t,e){if(t!==e){var i=this.getChildIndex(t),r=this.getChildIndex(e);if(0>i||0>r)throw new Error("swapChildren: Both the supplied DisplayObjects must be children of the caller.");this.children[i]=e,this.children[r]=t,this.onChildrenChange(r>i?i:r)}},r.prototype.getChildIndex=function(t){var e=this.children.indexOf(t);if(-1===e)throw new Error("The supplied DisplayObject must be a child of the caller");return e},r.prototype.setChildIndex=function(t,e){if(0>e||e>=this.children.length)throw new Error("The supplied index is out of bounds");var i=this.getChildIndex(t);s.removeItems(this.children,i,1),this.children.splice(e,0,t),this.onChildrenChange(e)},r.prototype.getChildAt=function(t){if(0>t||t>=this.children.length)throw new Error("getChildAt: Supplied index "+t+" does not exist in the child list, or the supplied DisplayObject is not a child of the caller");return this.children[t]},r.prototype.removeChild=function(t){var e=arguments.length;if(e>1)for(var i=0;e>i;i++)this.removeChild(arguments[i]);else{var r=this.children.indexOf(t);if(-1===r)return;t.parent=null,s.removeItems(this.children,r,1),this.onChildrenChange(r),t.emit("removed",this)}return t},r.prototype.removeChildAt=function(t){var e=this.getChildAt(t);return e.parent=null,s.removeItems(this.children,t,1),this.onChildrenChange(t),e.emit("removed",this),e},r.prototype.removeChildren=function(t,e){var i,r,s=t||0,n="number"==typeof e?e:this.children.length,o=n-s;if(o>0&&n>=o){for(i=this.children.splice(s,o),r=0;r<i.length;++r)i[r].parent=null;for(this.onChildrenChange(t),r=0;r<i.length;++r)i[r].emit("removed",this);return i}if(0===o&&0===this.children.length)return[];throw new RangeError("removeChildren: numeric values are outside the acceptable range.")},r.prototype.updateTransform=function(){if(this._boundsID++,this.visible){this.transform.updateTransform(this.parent.transform),this.worldAlpha=this.alpha*this.parent.worldAlpha;for(var t=0,e=this.children.length;e>t;++t)this.children[t].updateTransform()}},r.prototype.containerUpdateTransform=r.prototype.updateTransform,r.prototype.calculateBounds=function(){if(this._bounds.clear(),this.visible){this._calculateBounds();for(var t=0;t<this.children.length;t++){var e=this.children[t];e.calculateBounds(),this._bounds.addBounds(e._bounds)}this._boundsID=this._lastBoundsID}},r.prototype._calculateBounds=function(){},r.prototype.renderWebGL=function(t){if(this.visible&&!(this.worldAlpha<=0)&&this.renderable)if(this._mask||this._filters)this.renderAdvancedWebGL(t);else{this._renderWebGL(t);for(var e=0,i=this.children.length;i>e;++e)this.children[e].renderWebGL(t)}},r.prototype.renderAdvancedWebGL=function(t){t.currentRenderer.flush();var e,i,r=this._filters,s=this._mask;if(r){for(this._enabledFilters||(this._enabledFilters=[]),this._enabledFilters.length=0,e=0;e<r.length;e++)r[e].enabled&&this._enabledFilters.push(r[e]);this._enabledFilters.length&&t.filterManager.pushFilter(this,this._enabledFilters)}for(s&&t.maskManager.pushMask(this,this._mask),t.currentRenderer.start(),this._renderWebGL(t),e=0,i=this.children.length;i>e;e++)this.children[e].renderWebGL(t);t.currentRenderer.flush(),s&&t.maskManager.popMask(this,this._mask),r&&this._enabledFilters&&this._enabledFilters.length&&t.filterManager.popFilter(),t.currentRenderer.start()},r.prototype._renderWebGL=function(t){},r.prototype._renderCanvas=function(t){},r.prototype.renderCanvas=function(t){if(this.visible&&!(this.alpha<=0)&&this.renderable){this._mask&&t.maskManager.pushMask(this._mask),this._renderCanvas(t);for(var e=0,i=this.children.length;i>e;++e)this.children[e].renderCanvas(t);this._mask&&t.maskManager.popMask(t)}},r.prototype.destroy=function(t){n.prototype.destroy.call(this);var e="boolean"==typeof t?t:t&&t.children,i=this.children;if(this.children=null,e)for(var r=i.length-1;r>=0;r--){var s=i[r];s.parent=null,s.destroy(t)}}},{"../utils":151,"./DisplayObject":81}],81:[function(t,e,i){function r(){s.call(this);var t=n.TRANSFORM_MODE.DEFAULT===n.TRANSFORM_MODE.STATIC?o:a;this.transform=new t,this.alpha=1,this.visible=!0,this.renderable=!0,this.parent=null,this.worldAlpha=1,this.filterArea=null,this._filters=null,this._enabledFilters=null,this._bounds=new h,this._boundsID=0,this._lastBoundsID=-1,this._boundsRect=null,this._localBoundsRect=null,this._mask=null}var s=t("eventemitter3"),n=t("../const"),o=t("./TransformStatic"),a=t("./Transform"),h=t("./Bounds"),l=t("../math"),u=new r;r.prototype=Object.create(s.prototype),r.prototype.constructor=r,e.exports=r,Object.defineProperties(r.prototype,{x:{get:function(){return this.position.x},set:function(t){this.transform.position.x=t}},y:{get:function(){return this.position.y},set:function(t){this.transform.position.y=t}},worldTransform:{get:function(){return this.transform.worldTransform}},localTransform:{get:function(){return this.transform.localTransform}},position:{get:function(){return this.transform.position},set:function(t){this.transform.position.copy(t)}},scale:{get:function(){return this.transform.scale},set:function(t){this.transform.scale.copy(t)}},pivot:{get:function(){return this.transform.pivot},set:function(t){this.transform.pivot.copy(t)}},skew:{get:function(){return this.transform.skew},set:function(t){this.transform.skew.copy(t)}},rotation:{get:function(){return this.transform.rotation},set:function(t){this.transform.rotation=t}},worldVisible:{get:function(){var t=this;do{if(!t.visible)return!1;t=t.parent}while(t);return!0}},mask:{get:function(){return this._mask},set:function(t){this._mask&&(this._mask.renderable=!0),this._mask=t,this._mask&&(this._mask.renderable=!1)}},filters:{get:function(){return this._filters&&this._filters.slice()},set:function(t){this._filters=t&&t.slice()}}}),r.prototype.updateTransform=function(){this.transform.updateTransform(this.parent.transform),this.worldAlpha=this.alpha*this.parent.worldAlpha,this._bounds.updateID++},r.prototype.displayObjectUpdateTransform=r.prototype.updateTransform,r.prototype._recursivePostUpdateTransform=function(){this.parent?(this.parent._recursivePostUpdateTransform(),this.transform.updateTransform(this.parent.transform)):this.transform.updateTransform(u.transform)},r.prototype.getBounds=function(t,e){return t||(this.parent?(this._recursivePostUpdateTransform(),this.updateTransform()):(this.parent=u,this.parent.transform._worldID++,this.updateTransform(),this.parent=null)),this._boundsID!==this._lastBoundsID&&this.calculateBounds(),e||(this._boundsRect||(this._boundsRect=new l.Rectangle),e=this._boundsRect),this._bounds.getRectangle(e)},r.prototype.getLocalBounds=function(t){var e=this.transform,i=this.parent;this.parent=null,this.transform=u.transform,t||(this._localBoundsRect||(this._localBoundsRect=new l.Rectangle),t=this._localBoundsRect);var r=this.getBounds(!1,t);return this.parent=i,this.transform=e,r},r.prototype.toGlobal=function(t,e,i){return i||(this._recursivePostUpdateTransform(),this.parent?this.displayObjectUpdateTransform():(this.parent=u,this.displayObjectUpdateTransform(),this.parent=null)),this.worldTransform.apply(t,e)},r.prototype.toLocal=function(t,e,i,r){return e&&(t=e.toGlobal(t,i,r)),r||(this._recursivePostUpdateTransform(),this.parent?this.displayObjectUpdateTransform():(this.parent=u,this.displayObjectUpdateTransform(),this.parent=null)),this.worldTransform.applyInverse(t,i)},r.prototype.renderWebGL=function(t){},r.prototype.renderCanvas=function(t){},r.prototype.setParent=function(t){if(!t||!t.addChild)throw new Error("setParent: Argument must be a Container");return t.addChild(this),t},r.prototype.setTransform=function(t,e,i,r,s,n,o,a,h){return this.position.x=t||0,this.position.y=e||0,this.scale.x=i||1,this.scale.y=r||1,this.rotation=s||0,this.skew.x=n||0,this.skew.y=o||0,this.pivot.x=a||0,this.pivot.y=h||0,this},r.prototype.destroy=function(){this.removeAllListeners(),this.parent&&this.parent.removeChild(this),this.transform=null,this.parent=null,this._bounds=null,this._currentBounds=null,this._mask=null,this.filterArea=null}},{"../const":78,"../math":102,"./Bounds":79,"./Transform":82,"./TransformStatic":84,eventemitter3:3}],82:[function(t,e,i){function r(){n.call(this),this.position=new s.Point(0,0),this.scale=new s.Point(1,1),this.skew=new s.ObservablePoint(this.updateSkew,this,0,0),this.pivot=new s.Point(0,0),this._rotation=0,this._sr=Math.sin(0),this._cr=Math.cos(0),this._cy=Math.cos(0),this._sy=Math.sin(0),this._nsx=Math.sin(0),this._cx=Math.cos(0)}var s=t("../math"),n=t("./TransformBase");r.prototype=Object.create(n.prototype),r.prototype.constructor=r,r.prototype.updateSkew=function(){this._cy=Math.cos(this.skew.y),this._sy=Math.sin(this.skew.y),this._nsx=Math.sin(this.skew.x),this._cx=Math.cos(this.skew.x)},r.prototype.updateLocalTransform=function(){var t,e,i,r,s=this.localTransform;t=this._cr*this.scale.x,e=this._sr*this.scale.x,i=-this._sr*this.scale.y,r=this._cr*this.scale.y,s.a=this._cy*t+this._sy*i,s.b=this._cy*e+this._sy*r,s.c=this._nsx*t+this._cx*i,s.d=this._nsx*e+this._cx*r},r.prototype.updateTransform=function(t){var e,i,r,s,n=t.worldTransform,o=this.worldTransform,a=this.localTransform;e=this._cr*this.scale.x,i=this._sr*this.scale.x,r=-this._sr*this.scale.y,s=this._cr*this.scale.y,a.a=this._cy*e+this._sy*r,a.b=this._cy*i+this._sy*s,a.c=this._nsx*e+this._cx*r,a.d=this._nsx*i+this._cx*s,a.tx=this.position.x-(this.pivot.x*a.a+this.pivot.y*a.c),a.ty=this.position.y-(this.pivot.x*a.b+this.pivot.y*a.d),o.a=a.a*n.a+a.b*n.c,o.b=a.a*n.b+a.b*n.d,o.c=a.c*n.a+a.d*n.c,o.d=a.c*n.b+a.d*n.d,o.tx=a.tx*n.a+a.ty*n.c+n.tx,o.ty=a.tx*n.b+a.ty*n.d+n.ty,this._worldID++},r.prototype.setFromMatrix=function(t){t.decompose(this)},Object.defineProperties(r.prototype,{rotation:{get:function(){return this._rotation},set:function(t){this._rotation=t,this._sr=Math.sin(t),this._cr=Math.cos(t)}}}),e.exports=r},{"../math":102,"./TransformBase":83}],83:[function(t,e,i){function r(){this.worldTransform=new s.Matrix,this.localTransform=new s.Matrix,this._worldID=0}var s=t("../math");r.prototype.constructor=r,r.prototype.updateLocalTransform=function(){},r.prototype.updateTransform=function(t){var e=t.worldTransform,i=this.worldTransform,r=this.localTransform;i.a=r.a*e.a+r.b*e.c,i.b=r.a*e.b+r.b*e.d,i.c=r.c*e.a+r.d*e.c,i.d=r.c*e.b+r.d*e.d,i.tx=r.tx*e.a+r.ty*e.c+e.tx,i.ty=r.tx*e.b+r.ty*e.d+e.ty,this._worldID++},r.prototype.updateWorldTransform=r.prototype.updateTransform,r.IDENTITY=new r,e.exports=r},{"../math":102}],84:[function(t,e,i){function r(){n.call(this),this.position=new s.ObservablePoint(this.onChange,this,0,0),this.scale=new s.ObservablePoint(this.onChange,this,1,1),this.pivot=new s.ObservablePoint(this.onChange,this,0,0),this.skew=new s.ObservablePoint(this.updateSkew,this,0,0),this._rotation=0,this._sr=Math.sin(0),this._cr=Math.cos(0),this._cy=Math.cos(0),this._sy=Math.sin(0),this._nsx=Math.sin(0),this._cx=Math.cos(0),this._localID=0,this._currentLocalID=0}var s=t("../math"),n=t("./TransformBase");r.prototype=Object.create(n.prototype),r.prototype.constructor=r,r.prototype.onChange=function(){this._localID++},r.prototype.updateSkew=function(){this._cy=Math.cos(this.skew._y),this._sy=Math.sin(this.skew._y),this._nsx=Math.sin(this.skew._x),this._cx=Math.cos(this.skew._x),this._localID++},r.prototype.updateLocalTransform=function(){var t=this.localTransform;if(this._localID!==this._currentLocalID){var e,i,r,s;e=this._cr*this.scale._x,i=this._sr*this.scale._x,r=-this._sr*this.scale._y,s=this._cr*this.scale._y,t.a=this._cy*e+this._sy*r,t.b=this._cy*i+this._sy*s,t.c=this._nsx*e+this._cx*r,t.d=this._nsx*i+this._cx*s,t.tx=this.position._x-(this.pivot._x*t.a+this.pivot._y*t.c),t.ty=this.position._y-(this.pivot._x*t.b+this.pivot._y*t.d),this._currentLocalID=this._localID,this._parentID=-1}},r.prototype.updateTransform=function(t){var e=t.worldTransform,i=this.worldTransform,r=this.localTransform;if(this._localID!==this._currentLocalID){var s,n,o,a;s=this._cr*this.scale._x,n=this._sr*this.scale._x,o=-this._sr*this.scale._y,a=this._cr*this.scale._y,r.a=this._cy*s+this._sy*o,r.b=this._cy*n+this._sy*a,r.c=this._nsx*s+this._cx*o,r.d=this._nsx*n+this._cx*a,r.tx=this.position._x-(this.pivot._x*r.a+this.pivot._y*r.c),r.ty=this.position._y-(this.pivot._x*r.b+this.pivot._y*r.d),this._currentLocalID=this._localID,this._parentID=-1}this._parentID!==t._worldID&&(i.a=r.a*e.a+r.b*e.c,i.b=r.a*e.b+r.b*e.d,i.c=r.c*e.a+r.d*e.c,i.d=r.c*e.b+r.d*e.d,i.tx=r.tx*e.a+r.ty*e.c+e.tx,i.ty=r.tx*e.b+r.ty*e.d+e.ty,this._parentID=t._worldID,this._worldID++)},r.prototype.setFromMatrix=function(t){t.decompose(this),this._localID++},Object.defineProperties(r.prototype,{rotation:{get:function(){return this._rotation},set:function(t){this._rotation=t,this._sr=Math.sin(t),this._cr=Math.cos(t),this._localID++}}}),e.exports=r},{"../math":102,"./TransformBase":83}],85:[function(t,e,i){function r(){n.call(this),this.fillAlpha=1,this.lineWidth=0,this.lineColor=0,this.graphicsData=[],this.tint=16777215,this._prevTint=16777215,this.blendMode=c.BLEND_MODES.NORMAL,this.currentPath=null,this._webGL={},this.isMask=!1,this.boundsPadding=0,this._localBounds=new d,this.dirty=0,this.fastRectDirty=-1,this.clearDirty=0,this.boundsDirty=-1,this.cachedSpriteDirty=!1,this._spriteRect=null,this._fastRect=!1}var s,n=t("../display/Container"),o=t("../textures/RenderTexture"),a=t("../textures/Texture"),h=t("./GraphicsData"),l=t("../sprites/Sprite"),u=t("../math"),c=t("../const"),d=t("../display/Bounds"),p=t("./utils/bezierCurveTo"),f=t("../renderers/canvas/CanvasRenderer"),v=new u.Matrix,_=new u.Point;r._SPRITE_TEXTURE=null,r.prototype=Object.create(n.prototype),r.prototype.constructor=r,e.exports=r,r.prototype.clone=function(){var t=new r;t.renderable=this.renderable,t.fillAlpha=this.fillAlpha,t.lineWidth=this.lineWidth,t.lineColor=this.lineColor,t.tint=this.tint,t.blendMode=this.blendMode,t.isMask=this.isMask,t.boundsPadding=this.boundsPadding,t.dirty=0,t.cachedSpriteDirty=this.cachedSpriteDirty;for(var e=0;e<this.graphicsData.length;++e)t.graphicsData.push(this.graphicsData[e].clone());return t.currentPath=t.graphicsData[t.graphicsData.length-1],t.updateLocalBounds(),t},r.prototype.lineStyle=function(t,e,i){if(this.lineWidth=t||0,this.lineColor=e||0,this.lineAlpha=void 0===i?1:i,this.currentPath)if(this.currentPath.shape.points.length){var r=new u.Polygon(this.currentPath.shape.points.slice(-2));r.closed=!1,this.drawShape(r)}else this.currentPath.lineWidth=this.lineWidth,this.currentPath.lineColor=this.lineColor,this.currentPath.lineAlpha=this.lineAlpha;return this},r.prototype.moveTo=function(t,e){var i=new u.Polygon([t,e]);return i.closed=!1,this.drawShape(i),this},r.prototype.lineTo=function(t,e){return this.currentPath.shape.points.push(t,e),this.dirty++,this},r.prototype.quadraticCurveTo=function(t,e,i,r){this.currentPath?0===this.currentPath.shape.points.length&&(this.currentPath.shape.points=[0,0]):this.moveTo(0,0);var s,n,o=20,a=this.currentPath.shape.points;0===a.length&&this.moveTo(0,0);for(var h=a[a.length-2],l=a[a.length-1],u=0,c=1;o>=c;++c)u=c/o,s=h+(t-h)*u,n=l+(e-l)*u,a.push(s+(t+(i-t)*u-s)*u,n+(e+(r-e)*u-n)*u);return this.dirty++,this},r.prototype.bezierCurveTo=function(t,e,i,r,s,n){this.currentPath?0===this.currentPath.shape.points.length&&(this.currentPath.shape.points=[0,0]):this.moveTo(0,0);var o=this.currentPath.shape.points,a=o[o.length-2],h=o[o.length-1];return o.length-=2,p(a,h,t,e,i,r,s,n,o),this.dirty++,this},r.prototype.arcTo=function(t,e,i,r,s){this.currentPath?0===this.currentPath.shape.points.length&&this.currentPath.shape.points.push(t,e):this.moveTo(t,e);var n=this.currentPath.shape.points,o=n[n.length-2],a=n[n.length-1],h=a-e,l=o-t,u=r-e,c=i-t,d=Math.abs(h*c-l*u);if(1e-8>d||0===s)n[n.length-2]===t&&n[n.length-1]===e||n.push(t,e);else{var p=h*h+l*l,f=u*u+c*c,v=h*u+l*c,_=s*Math.sqrt(p)/d,g=s*Math.sqrt(f)/d,m=_*v/p,y=g*v/f,x=_*c+g*l,b=_*u+g*h,T=l*(g+m),w=h*(g+m),E=c*(_+y),S=u*(_+y),A=Math.atan2(w-b,T-x),R=Math.atan2(S-b,E-x);this.arc(x+t,b+e,s,A,R,l*u>c*h)}return this.dirty++,this},r.prototype.arc=function(t,e,i,r,s,n){if(n=n||!1,r===s)return this;!n&&r>=s?s+=2*Math.PI:n&&s>=r&&(r+=2*Math.PI);var o=n?-1*(r-s):s-r,a=40*Math.ceil(Math.abs(o)/(2*Math.PI));if(0===o)return this;var h=t+Math.cos(r)*i,l=e+Math.sin(r)*i;this.currentPath?this.currentPath.shape.points.push(h,l):this.moveTo(h,l);for(var u=this.currentPath.shape.points,c=o/(2*a),d=2*c,p=Math.cos(c),f=Math.sin(c),v=a-1,_=v%1/v,g=0;v>=g;g++){var m=g+_*g,y=c+r+d*m,x=Math.cos(y),b=-Math.sin(y);u.push((p*x+f*b)*i+t,(p*-b+f*x)*i+e)}return this.dirty++,this},r.prototype.beginFill=function(t,e){return this.filling=!0,this.fillColor=t||0,this.fillAlpha=void 0===e?1:e,this.currentPath&&this.currentPath.shape.points.length<=2&&(this.currentPath.fill=this.filling,this.currentPath.fillColor=this.fillColor,this.currentPath.fillAlpha=this.fillAlpha),this},r.prototype.endFill=function(){return this.filling=!1,this.fillColor=null,this.fillAlpha=1,this},r.prototype.drawRect=function(t,e,i,r){return this.drawShape(new u.Rectangle(t,e,i,r)),this},r.prototype.drawRoundedRect=function(t,e,i,r,s){return this.drawShape(new u.RoundedRectangle(t,e,i,r,s)),this},r.prototype.drawCircle=function(t,e,i){return this.drawShape(new u.Circle(t,e,i)),this},r.prototype.drawEllipse=function(t,e,i,r){return this.drawShape(new u.Ellipse(t,e,i,r)),this},r.prototype.drawPolygon=function(t){var e=t,i=!0;if(e instanceof u.Polygon&&(i=e.closed,e=e.points),!Array.isArray(e)){e=new Array(arguments.length);for(var r=0;r<e.length;++r)e[r]=arguments[r]}var s=new u.Polygon(e);return s.closed=i,this.drawShape(s),this},r.prototype.clear=function(){return this.lineWidth=0,this.filling=!1,this.dirty++,this.clearDirty++,this.graphicsData=[],this},r.prototype.isFastRect=function(){return 1===this.graphicsData.length&&this.graphicsData[0].shape.type===c.SHAPES.RECT&&!this.graphicsData[0].lineWidth},r.prototype._renderWebGL=function(t){this.dirty!==this.fastRectDirty&&(this.fastRectDirty=this.dirty,this._fastRect=this.isFastRect()),this._fastRect?this._renderSpriteRect(t):(t.setObjectRenderer(t.plugins.graphics),t.plugins.graphics.render(this))},r.prototype._renderSpriteRect=function(t){var e=this.graphicsData[0].shape;if(!this._spriteRect){if(!r._SPRITE_TEXTURE){r._SPRITE_TEXTURE=o.create(10,10);var i=t._activeRenderTarget;t.bindRenderTexture(r._SPRITE_TEXTURE),t.clear([1,1,1,1]),t.bindRenderTarget(i)}this._spriteRect=new l(r._SPRITE_TEXTURE)}this._spriteRect.tint=this.graphicsData[0].fillColor,this._spriteRect.alpha=this.graphicsData[0].fillAlpha,this._spriteRect.worldAlpha=this.worldAlpha*this._spriteRect.alpha,r._SPRITE_TEXTURE._frame.width=e.width,r._SPRITE_TEXTURE._frame.height=e.height,this._spriteRect.transform.worldTransform=this.transform.worldTransform,this._spriteRect.anchor.set(-e.x/e.width,-e.y/e.height),this._spriteRect.onAnchorUpdate(),this._spriteRect._renderWebGL(t)},r.prototype._renderCanvas=function(t){!0!==this.isMask&&t.plugins.graphics.render(this)},r.prototype._calculateBounds=function(){if(this.renderable){this.boundsDirty!==this.dirty&&(this.boundsDirty=this.dirty,this.updateLocalBounds(),this.dirty++,this.cachedSpriteDirty=!0);var t=this._localBounds;this._bounds.addFrame(this.transform,t.minX,t.minY,t.maxX,t.maxY)}},r.prototype.containsPoint=function(t){this.worldTransform.applyInverse(t,_);for(var e=this.graphicsData,i=0;i<e.length;i++){var r=e[i];if(r.fill&&r.shape&&r.shape.contains(_.x,_.y))return!0}return!1},r.prototype.updateLocalBounds=function(){var t=1/0,e=-1/0,i=1/0,r=-1/0;if(this.graphicsData.length)for(var s,n,o,a,h,l,u=0;u<this.graphicsData.length;u++){var d=this.graphicsData[u],p=d.type,f=d.lineWidth;if(s=d.shape,p===c.SHAPES.RECT||p===c.SHAPES.RREC)o=s.x-f/2,a=s.y-f/2,h=s.width+f,l=s.height+f,t=t>o?o:t,e=o+h>e?o+h:e,i=i>a?a:i,r=a+l>r?a+l:r;else if(p===c.SHAPES.CIRC)o=s.x,a=s.y,h=s.radius+f/2,l=s.radius+f/2,t=t>o-h?o-h:t,e=o+h>e?o+h:e,i=i>a-l?a-l:i,r=a+l>r?a+l:r;else if(p===c.SHAPES.ELIP)o=s.x,a=s.y,h=s.width+f/2,l=s.height+f/2,t=t>o-h?o-h:t,e=o+h>e?o+h:e,i=i>a-l?a-l:i,r=a+l>r?a+l:r;else{n=s.points;for(var v=0;v<n.length;v+=2)o=n[v],a=n[v+1],t=t>o-f?o-f:t,e=o+f>e?o+f:e,i=i>a-f?a-f:i,r=a+f>r?a+f:r}}else t=0,e=0,i=0,r=0;var _=this.boundsPadding;this._localBounds.minX=t-_,this._localBounds.maxX=e+2*_,this._localBounds.minY=i-_,this._localBounds.maxY=r+2*_},r.prototype.drawShape=function(t){this.currentPath&&this.currentPath.shape.points.length<=2&&this.graphicsData.pop(),this.currentPath=null;var e=new h(this.lineWidth,this.lineColor,this.lineAlpha,this.fillColor,this.fillAlpha,this.filling,t);return this.graphicsData.push(e),e.type===c.SHAPES.POLY&&(e.shape.closed=e.shape.closed||this.filling,this.currentPath=e),this.dirty++,e},r.prototype.generateCanvasTexture=function(t,e){e=e||1;var i=this.getLocalBounds(),r=new o.create(i.width*e,i.height*e);s||(s=new f),v.tx=-i.x,v.ty=-i.y,s.render(this,r,!1,v);var n=a.fromCanvas(r.baseTexture._canvasRenderTarget.canvas,t);return n.baseTexture.resolution=e,n},r.prototype.closePath=function(){var t=this.currentPath;return t&&t.shape&&t.shape.close(),this},r.prototype.addHole=function(){var t=this.graphicsData.pop();return this.currentPath=this.graphicsData[this.graphicsData.length-1],this.currentPath.addHole(t.shape),this.currentPath=null,this},r.prototype.destroy=function(){n.prototype.destroy.apply(this,arguments);for(var t=0;t<this.graphicsData.length;++t)this.graphicsData[t].destroy();for(var e in this._webgl)for(var i=0;i<this._webgl[e].data.length;++i)this._webgl[e].data[i].destroy();this._spriteRect&&this._spriteRect.destroy(),this.graphicsData=null,this.currentPath=null,this._webgl=null,this._localBounds=null}},{"../const":78,"../display/Bounds":79,"../display/Container":80,"../math":102,"../renderers/canvas/CanvasRenderer":109,"../sprites/Sprite":133,"../textures/RenderTexture":143,"../textures/Texture":144,"./GraphicsData":86,"./utils/bezierCurveTo":88}],86:[function(t,e,i){function r(t,e,i,r,s,n,o){this.lineWidth=t,this.lineColor=e,this.lineAlpha=i,this._lineTint=e,this.fillColor=r,this.fillAlpha=s,this._fillTint=r,this.fill=n,this.holes=[],this.shape=o,this.type=o.type}r.prototype.constructor=r,e.exports=r,r.prototype.clone=function(){return new r(this.lineWidth,this.lineColor,this.lineAlpha,this.fillColor,this.fillAlpha,this.fill,this.shape)},r.prototype.addHole=function(t){this.holes.push(t)},r.prototype.destroy=function(){this.shape=null,this.holes=null}},{}],87:[function(t,e,i){function r(t){this.renderer=t}var s=t("../../renderers/canvas/CanvasRenderer"),n=t("../../const");r.prototype.constructor=r,e.exports=r,s.registerPlugin("graphics",r),r.prototype.render=function(t){var e=this.renderer,i=e.context,r=t.worldAlpha,s=t.transform.worldTransform,o=e.resolution;this._prevTint!==this.tint&&(this.dirty=!0),i.setTransform(s.a*o,s.b*o,s.c*o,s.d*o,s.tx*o,s.ty*o),t.dirty&&(this.updateGraphicsTint(t),t.dirty=!1),e.setBlendMode(t.blendMode);for(var a=0;a<t.graphicsData.length;a++){var h=t.graphicsData[a],l=h.shape,u=h._fillTint,c=h._lineTint;if(i.lineWidth=h.lineWidth,h.type===n.SHAPES.POLY){i.beginPath(),this.renderPolygon(l.points,l.closed,i);for(var d=0;d<h.holes.length;d++){var p=h.holes[d];this.renderPolygon(p.points,!0,i)}h.fill&&(i.globalAlpha=h.fillAlpha*r,i.fillStyle="#"+("00000"+(0|u).toString(16)).substr(-6),i.fill()),h.lineWidth&&(i.globalAlpha=h.lineAlpha*r,i.strokeStyle="#"+("00000"+(0|c).toString(16)).substr(-6),i.stroke())}else if(h.type===n.SHAPES.RECT)(h.fillColor||0===h.fillColor)&&(i.globalAlpha=h.fillAlpha*r,i.fillStyle="#"+("00000"+(0|u).toString(16)).substr(-6),i.fillRect(l.x,l.y,l.width,l.height)),h.lineWidth&&(i.globalAlpha=h.lineAlpha*r,i.strokeStyle="#"+("00000"+(0|c).toString(16)).substr(-6),i.strokeRect(l.x,l.y,l.width,l.height));else if(h.type===n.SHAPES.CIRC)i.beginPath(),i.arc(l.x,l.y,l.radius,0,2*Math.PI),i.closePath(),h.fill&&(i.globalAlpha=h.fillAlpha*r,i.fillStyle="#"+("00000"+(0|u).toString(16)).substr(-6),i.fill()),h.lineWidth&&(i.globalAlpha=h.lineAlpha*r,i.strokeStyle="#"+("00000"+(0|c).toString(16)).substr(-6),i.stroke());else if(h.type===n.SHAPES.ELIP){var f=2*l.width,v=2*l.height,_=l.x-f/2,g=l.y-v/2;i.beginPath();var m=.5522848,y=f/2*m,x=v/2*m,b=_+f,T=g+v,w=_+f/2,E=g+v/2;i.moveTo(_,E),i.bezierCurveTo(_,E-x,w-y,g,w,g),i.bezierCurveTo(w+y,g,b,E-x,b,E),i.bezierCurveTo(b,E+x,w+y,T,w,T),i.bezierCurveTo(w-y,T,_,E+x,_,E),i.closePath(),h.fill&&(i.globalAlpha=h.fillAlpha*r,i.fillStyle="#"+("00000"+(0|u).toString(16)).substr(-6),i.fill()),h.lineWidth&&(i.globalAlpha=h.lineAlpha*r,i.strokeStyle="#"+("00000"+(0|c).toString(16)).substr(-6),i.stroke())}else if(h.type===n.SHAPES.RREC){var S=l.x,A=l.y,R=l.width,O=l.height,P=l.radius,M=Math.min(R,O)/2|0;P=P>M?M:P,i.beginPath(),i.moveTo(S,A+P),i.lineTo(S,A+O-P),i.quadraticCurveTo(S,A+O,S+P,A+O),i.lineTo(S+R-P,A+O),i.quadraticCurveTo(S+R,A+O,S+R,A+O-P),i.lineTo(S+R,A+P),i.quadraticCurveTo(S+R,A,S+R-P,A),i.lineTo(S+P,A),i.quadraticCurveTo(S,A,S,A+P),i.closePath(),(h.fillColor||0===h.fillColor)&&(i.globalAlpha=h.fillAlpha*r,i.fillStyle="#"+("00000"+(0|u).toString(16)).substr(-6),i.fill()),h.lineWidth&&(i.globalAlpha=h.lineAlpha*r,i.strokeStyle="#"+("00000"+(0|c).toString(16)).substr(-6),i.stroke())}}},r.prototype.updateGraphicsTint=function(t){t._prevTint=t.tint;for(var e=(t.tint>>16&255)/255,i=(t.tint>>8&255)/255,r=(255&t.tint)/255,s=0;s<t.graphicsData.length;s++){var n=t.graphicsData[s],o=0|n.fillColor,a=0|n.lineColor;n._fillTint=((o>>16&255)/255*e*255<<16)+((o>>8&255)/255*i*255<<8)+(255&o)/255*r*255,n._lineTint=((a>>16&255)/255*e*255<<16)+((a>>8&255)/255*i*255<<8)+(255&a)/255*r*255}},r.prototype.renderPolygon=function(t,e,i){i.moveTo(t[0],t[1]);for(var r=1;r<t.length/2;r++)i.lineTo(t[2*r],t[2*r+1]);e&&i.closePath()},r.prototype.destroy=function(){this.renderer=null}},{"../../const":78,"../../renderers/canvas/CanvasRenderer":109}],88:[function(t,e,i){var r=function(t,e,i,r,s,n,o,a,h){h=h||[];var l,u,c,d,p,f=20;h.push(t,e);for(var v=0,_=1;f>=_;++_)v=_/f,l=1-v,u=l*l,c=u*l,d=v*v,p=d*v,h.push(c*t+3*u*v*i+3*l*d*s+p*o,c*e+3*u*v*r+3*l*d*n+p*a);return h};e.exports=r},{}],89:[function(t,e,i){function r(t){o.call(this,t),this.graphicsDataPool=[],this.primitiveShader=null,this.gl=t.gl,this.CONTEXT_UID=0}var s=t("../../utils"),n=t("../../const"),o=t("../../renderers/webgl/utils/ObjectRenderer"),a=t("../../renderers/webgl/WebGLRenderer"),h=t("./WebGLGraphicsData"),l=t("./shaders/PrimitiveShader"),u=t("./utils/buildPoly"),c=t("./utils/buildRectangle"),d=t("./utils/buildRoundedRectangle"),p=t("./utils/buildCircle");r.prototype=Object.create(o.prototype),r.prototype.constructor=r,e.exports=r,a.registerPlugin("graphics",r),r.prototype.onContextChange=function(){this.gl=this.renderer.gl,this.CONTEXT_UID=this.renderer.CONTEXT_UID,this.primitiveShader=new l(this.gl)},r.prototype.destroy=function(){o.prototype.destroy.call(this);for(var t=0;t<this.graphicsDataPool.length;++t)this.graphicsDataPool[t].destroy();this.graphicsDataPool=null},r.prototype.render=function(t){var e,i=this.renderer,r=i.gl,n=t._webGL[this.CONTEXT_UID];n&&t.dirty===n.dirty||(this.updateGraphics(t),n=t._webGL[this.CONTEXT_UID]);var o=this.primitiveShader;i.bindShader(o),i.state.setBlendMode(t.blendMode);for(var a=0,h=n.data.length;h>a;a++){e=n.data[a];var l=e.shader;i.bindShader(l),l.uniforms.translationMatrix=t.transform.worldTransform.toArray(!0),l.uniforms.tint=s.hex2rgb(t.tint),l.uniforms.alpha=t.worldAlpha,e.vao.bind().draw(r.TRIANGLE_STRIP,e.indices.length).unbind()}},r.prototype.updateGraphics=function(t){var e=this.renderer.gl,i=t._webGL[this.CONTEXT_UID]
    ;i||(i=t._webGL[this.CONTEXT_UID]={lastIndex:0,data:[],gl:e,clearDirty:-1,dirty:-1}),i.dirty=t.dirty;var r;if(t.clearDirty!==i.clearDirty){for(i.clearDirty=t.clearDirty,r=0;r<i.data.length;r++){var s=i.data[r];this.graphicsDataPool.push(s)}i.data=[],i.lastIndex=0}var o;for(r=i.lastIndex;r<t.graphicsData.length;r++){var a=t.graphicsData[r];o=this.getWebGLData(i,0),a.type===n.SHAPES.POLY&&u(a,o),a.type===n.SHAPES.RECT?c(a,o):a.type===n.SHAPES.CIRC||a.type===n.SHAPES.ELIP?p(a,o):a.type===n.SHAPES.RREC&&d(a,o),i.lastIndex++}for(r=0;r<i.data.length;r++)o=i.data[r],o.dirty&&o.upload()},r.prototype.getWebGLData=function(t,e){var i=t.data[t.data.length-1];return(!i||i.points.length>32e4)&&(i=this.graphicsDataPool.pop()||new h(this.renderer.gl,this.primitiveShader,this.renderer.state.attribsState),i.reset(e),t.data.push(i)),i.dirty=!0,i}},{"../../const":78,"../../renderers/webgl/WebGLRenderer":116,"../../renderers/webgl/utils/ObjectRenderer":126,"../../utils":151,"./WebGLGraphicsData":90,"./shaders/PrimitiveShader":91,"./utils/buildCircle":92,"./utils/buildPoly":94,"./utils/buildRectangle":95,"./utils/buildRoundedRectangle":96}],90:[function(t,e,i){function r(t,e,i){this.gl=t,this.color=[0,0,0],this.points=[],this.indices=[],this.buffer=s.GLBuffer.createVertexBuffer(t),this.indexBuffer=s.GLBuffer.createIndexBuffer(t),this.dirty=!0,this.glPoints=null,this.glIndices=null,this.shader=e,this.vao=new s.VertexArrayObject(t,i).addIndex(this.indexBuffer).addAttribute(this.buffer,e.attributes.aVertexPosition,t.FLOAT,!1,24,0).addAttribute(this.buffer,e.attributes.aColor,t.FLOAT,!1,24,8)}var s=t("pixi-gl-core");r.prototype.constructor=r,e.exports=r,r.prototype.reset=function(){this.points.length=0,this.indices.length=0},r.prototype.upload=function(){this.glPoints=new Float32Array(this.points),this.buffer.upload(this.glPoints),this.glIndices=new Uint16Array(this.indices),this.indexBuffer.upload(this.glIndices),this.dirty=!1},r.prototype.destroy=function(){this.color=null,this.points=null,this.indices=null,this.vao.destroy(),this.buffer.destroy(),this.indexBuffer.destroy(),this.gl=null,this.buffer=null,this.indexBuffer=null,this.glPoints=null,this.glIndices=null}},{"pixi-gl-core":12}],91:[function(t,e,i){function r(t){s.call(this,t,["attribute vec2 aVertexPosition;","attribute vec4 aColor;","uniform mat3 translationMatrix;","uniform mat3 projectionMatrix;","uniform float alpha;","uniform vec3 tint;","varying vec4 vColor;","void main(void){","   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);","   vColor = aColor * vec4(tint * alpha, alpha);","}"].join("\n"),["varying vec4 vColor;","void main(void){","   gl_FragColor = vColor;","}"].join("\n"))}var s=t("../../../Shader");r.prototype=Object.create(s.prototype),r.prototype.constructor=r,e.exports=r},{"../../../Shader":77}],92:[function(t,e,i){var r=t("./buildLine"),s=t("../../../const"),n=t("../../../utils"),o=function(t,e){var i,o,a=t.shape,h=a.x,l=a.y;t.type===s.SHAPES.CIRC?(i=a.radius,o=a.radius):(i=a.width,o=a.height);var u=Math.floor(30*Math.sqrt(a.radius))||Math.floor(15*Math.sqrt(a.width+a.height)),c=2*Math.PI/u,d=0;if(t.fill){var p=n.hex2rgb(t.fillColor),f=t.fillAlpha,v=p[0]*f,_=p[1]*f,g=p[2]*f,m=e.points,y=e.indices,x=m.length/6;for(y.push(x),d=0;u+1>d;d++)m.push(h,l,v,_,g,f),m.push(h+Math.sin(c*d)*i,l+Math.cos(c*d)*o,v,_,g,f),y.push(x++,x++);y.push(x-1)}if(t.lineWidth){var b=t.points;for(t.points=[],d=0;u+1>d;d++)t.points.push(h+Math.sin(c*d)*i,l+Math.cos(c*d)*o);r(t,e),t.points=b}};e.exports=o},{"../../../const":78,"../../../utils":151,"./buildLine":93}],93:[function(t,e,i){var r=t("../../../math"),s=t("../../../utils"),n=function(t,e){var i=0,n=t.points;if(0!==n.length){var o=new r.Point(n[0],n[1]),a=new r.Point(n[n.length-2],n[n.length-1]);if(o.x===a.x&&o.y===a.y){n=n.slice(),n.pop(),n.pop(),a=new r.Point(n[n.length-2],n[n.length-1]);var h=a.x+.5*(o.x-a.x),l=a.y+.5*(o.y-a.y);n.unshift(h,l),n.push(h,l)}var u,c,d,p,f,v,_,g,m,y,x,b,T,w,E,S,A,R,O,P,M,C,L,D=e.points,I=e.indices,j=n.length/2,k=n.length,N=D.length/6,F=t.lineWidth/2,B=s.hex2rgb(t.lineColor),U=t.lineAlpha,X=B[0]*U,z=B[1]*U,W=B[2]*U;for(d=n[0],p=n[1],f=n[2],v=n[3],m=-(p-v),y=d-f,L=Math.sqrt(m*m+y*y),m/=L,y/=L,m*=F,y*=F,D.push(d-m,p-y,X,z,W,U),D.push(d+m,p+y,X,z,W,U),i=1;j-1>i;i++)d=n[2*(i-1)],p=n[2*(i-1)+1],f=n[2*i],v=n[2*i+1],_=n[2*(i+1)],g=n[2*(i+1)+1],m=-(p-v),y=d-f,L=Math.sqrt(m*m+y*y),m/=L,y/=L,m*=F,y*=F,x=-(v-g),b=f-_,L=Math.sqrt(x*x+b*b),x/=L,b/=L,x*=F,b*=F,E=-y+p-(-y+v),S=-m+f-(-m+d),A=(-m+d)*(-y+v)-(-m+f)*(-y+p),R=-b+g-(-b+v),O=-x+f-(-x+_),P=(-x+_)*(-b+v)-(-x+f)*(-b+g),M=E*O-R*S,Math.abs(M)<.1?(M+=10.1,D.push(f-m,v-y,X,z,W,U),D.push(f+m,v+y,X,z,W,U)):(u=(S*P-O*A)/M,c=(R*A-E*P)/M,C=(u-f)*(u-f)+(c-v)*(c-v),C>19600?(T=m-x,w=y-b,L=Math.sqrt(T*T+w*w),T/=L,w/=L,T*=F,w*=F,D.push(f-T,v-w),D.push(X,z,W,U),D.push(f+T,v+w),D.push(X,z,W,U),D.push(f-T,v-w),D.push(X,z,W,U),k++):(D.push(u,c),D.push(X,z,W,U),D.push(f-(u-f),v-(c-v)),D.push(X,z,W,U)));for(d=n[2*(j-2)],p=n[2*(j-2)+1],f=n[2*(j-1)],v=n[2*(j-1)+1],m=-(p-v),y=d-f,L=Math.sqrt(m*m+y*y),m/=L,y/=L,m*=F,y*=F,D.push(f-m,v-y),D.push(X,z,W,U),D.push(f+m,v+y),D.push(X,z,W,U),I.push(N),i=0;k>i;i++)I.push(N++);I.push(N-1)}};e.exports=n},{"../../../math":102,"../../../utils":151}],94:[function(t,e,i){var r=t("./buildLine"),s=t("../../../utils"),n=t("earcut"),o=function(t,e){t.points=t.shape.points.slice();var i=t.points;if(t.fill&&i.length>6){for(var o=[],a=t.holes,h=0;h<a.length;h++){var l=a[h];o.push(i.length/2),i=i.concat(l.points)}var u=e.points,c=e.indices,d=i.length/2,p=s.hex2rgb(t.fillColor),f=t.fillAlpha,v=p[0]*f,_=p[1]*f,g=p[2]*f,m=n(i,o,2);if(!m)return;var y=u.length/6;for(h=0;h<m.length;h+=3)c.push(m[h]+y),c.push(m[h]+y),c.push(m[h+1]+y),c.push(m[h+2]+y),c.push(m[h+2]+y);for(h=0;d>h;h++)u.push(i[2*h],i[2*h+1],v,_,g,f)}t.lineWidth>0&&r(t,e)};e.exports=o},{"../../../utils":151,"./buildLine":93,earcut:2}],95:[function(t,e,i){var r=t("./buildLine"),s=t("../../../utils"),n=function(t,e){var i=t.shape,n=i.x,o=i.y,a=i.width,h=i.height;if(t.fill){var l=s.hex2rgb(t.fillColor),u=t.fillAlpha,c=l[0]*u,d=l[1]*u,p=l[2]*u,f=e.points,v=e.indices,_=f.length/6;f.push(n,o),f.push(c,d,p,u),f.push(n+a,o),f.push(c,d,p,u),f.push(n,o+h),f.push(c,d,p,u),f.push(n+a,o+h),f.push(c,d,p,u),v.push(_,_,_+1,_+2,_+3,_+3)}if(t.lineWidth){var g=t.points;t.points=[n,o,n+a,o,n+a,o+h,n,o+h,n,o],r(t,e),t.points=g}};e.exports=n},{"../../../utils":151,"./buildLine":93}],96:[function(t,e,i){var r=t("earcut"),s=t("./buildLine"),n=t("../../../utils"),o=function(t,e){var i=t.shape,o=i.x,h=i.y,l=i.width,u=i.height,c=i.radius,d=[];if(d.push(o,h+c),a(o,h+u-c,o,h+u,o+c,h+u,d),a(o+l-c,h+u,o+l,h+u,o+l,h+u-c,d),a(o+l,h+c,o+l,h,o+l-c,h,d),a(o+c,h,o,h,o,h+c+1e-10,d),t.fill){var p=n.hex2rgb(t.fillColor),f=t.fillAlpha,v=p[0]*f,_=p[1]*f,g=p[2]*f,m=e.points,y=e.indices,x=m.length/6,b=r(d,null,2),T=0;for(T=0;T<b.length;T+=3)y.push(b[T]+x),y.push(b[T]+x),y.push(b[T+1]+x),y.push(b[T+2]+x),y.push(b[T+2]+x);for(T=0;T<d.length;T++)m.push(d[T],d[++T],v,_,g,f)}if(t.lineWidth){var w=t.points;t.points=d,s(t,e),t.points=w}},a=function(t,e,i,r,s,n,o){function a(t,e,i){return t+(e-t)*i}for(var h,l,u,c,d,p,f=20,v=o||[],_=0,g=0;f>=g;g++)_=g/f,h=a(t,i,_),l=a(e,r,_),u=a(i,s,_),c=a(r,n,_),d=a(h,u,_),p=a(l,c,_),v.push(d,p);return v};e.exports=o},{"../../../utils":151,"./buildLine":93,earcut:2}],97:[function(t,e,i){var r=e.exports=Object.assign(t("./const"),t("./math"),{utils:t("./utils"),ticker:t("./ticker"),DisplayObject:t("./display/DisplayObject"),Container:t("./display/Container"),Transform:t("./display/Transform"),TransformStatic:t("./display/TransformStatic"),TransformBase:t("./display/TransformBase"),Sprite:t("./sprites/Sprite"),CanvasSpriteRenderer:t("./sprites/canvas/CanvasSpriteRenderer"),CanvasTinter:t("./sprites/canvas/CanvasTinter"),SpriteRenderer:t("./sprites/webgl/SpriteRenderer"),Text:t("./text/Text"),TextStyle:t("./text/TextStyle"),Graphics:t("./graphics/Graphics"),GraphicsData:t("./graphics/GraphicsData"),GraphicsRenderer:t("./graphics/webgl/GraphicsRenderer"),CanvasGraphicsRenderer:t("./graphics/canvas/CanvasGraphicsRenderer"),Texture:t("./textures/Texture"),BaseTexture:t("./textures/BaseTexture"),RenderTexture:t("./textures/RenderTexture"),BaseRenderTexture:t("./textures/BaseRenderTexture"),VideoBaseTexture:t("./textures/VideoBaseTexture"),TextureUvs:t("./textures/TextureUvs"),CanvasRenderer:t("./renderers/canvas/CanvasRenderer"),CanvasRenderTarget:t("./renderers/canvas/utils/CanvasRenderTarget"),Shader:t("./Shader"),WebGLRenderer:t("./renderers/webgl/WebGLRenderer"),WebGLManager:t("./renderers/webgl/managers/WebGLManager"),ObjectRenderer:t("./renderers/webgl/utils/ObjectRenderer"),RenderTarget:t("./renderers/webgl/utils/RenderTarget"),Quad:t("./renderers/webgl/utils/Quad"),SpriteMaskFilter:t("./renderers/webgl/filters/spriteMask/SpriteMaskFilter"),Filter:t("./renderers/webgl/filters/Filter"),glCore:t("pixi-gl-core"),autoDetectRenderer:function(t,e,i,s){return t=t||800,e=e||600,!s&&r.utils.isWebGLSupported()?new r.WebGLRenderer(t,e,i):new r.CanvasRenderer(t,e,i)}})},{"./Shader":77,"./const":78,"./display/Container":80,"./display/DisplayObject":81,"./display/Transform":82,"./display/TransformBase":83,"./display/TransformStatic":84,"./graphics/Graphics":85,"./graphics/GraphicsData":86,"./graphics/canvas/CanvasGraphicsRenderer":87,"./graphics/webgl/GraphicsRenderer":89,"./math":102,"./renderers/canvas/CanvasRenderer":109,"./renderers/canvas/utils/CanvasRenderTarget":111,"./renderers/webgl/WebGLRenderer":116,"./renderers/webgl/filters/Filter":118,"./renderers/webgl/filters/spriteMask/SpriteMaskFilter":121,"./renderers/webgl/managers/WebGLManager":125,"./renderers/webgl/utils/ObjectRenderer":126,"./renderers/webgl/utils/Quad":127,"./renderers/webgl/utils/RenderTarget":128,"./sprites/Sprite":133,"./sprites/canvas/CanvasSpriteRenderer":134,"./sprites/canvas/CanvasTinter":135,"./sprites/webgl/SpriteRenderer":137,"./text/Text":139,"./text/TextStyle":140,"./textures/BaseRenderTexture":141,"./textures/BaseTexture":142,"./textures/RenderTexture":143,"./textures/Texture":144,"./textures/TextureUvs":145,"./textures/VideoBaseTexture":146,"./ticker":148,"./utils":151,"pixi-gl-core":12}],98:[function(t,e,i){function r(t){return 0>t?-1:t>0?1:0}function s(){for(var t=0;16>t;t++){var e=[];c.push(e);for(var i=0;16>i;i++)for(var s=r(n[t]*n[i]+a[t]*o[i]),d=r(o[t]*n[i]+h[t]*o[i]),p=r(n[t]*a[i]+a[t]*h[i]),f=r(o[t]*a[i]+h[t]*h[i]),v=0;16>v;v++)if(n[v]===s&&o[v]===d&&a[v]===p&&h[v]===f){e.push(v);break}}for(t=0;16>t;t++){var _=new u;_.set(n[t],o[t],a[t],h[t],0,0),l.push(_)}}var n=[1,1,0,-1,-1,-1,0,1,1,1,0,-1,-1,-1,0,1],o=[0,1,1,1,0,-1,-1,-1,0,1,1,1,0,-1,-1,-1],a=[0,-1,-1,-1,0,1,1,1,0,1,1,1,0,-1,-1,-1],h=[1,1,0,-1,-1,-1,0,1,-1,-1,0,1,1,1,0,-1],l=[],u=t("./Matrix"),c=[];s();var d={E:0,SE:1,S:2,SW:3,W:4,NW:5,N:6,NE:7,MIRROR_VERTICAL:8,MIRROR_HORIZONTAL:12,uX:function(t){return n[t]},uY:function(t){return o[t]},vX:function(t){return a[t]},vY:function(t){return h[t]},inv:function(t){return 8&t?15&t:7&-t},add:function(t,e){return c[t][e]},sub:function(t,e){return c[t][d.inv(e)]},rotate180:function(t){return 4^t},isSwapWidthHeight:function(t){return 2==(3&t)},byDirection:function(t,e){return 2*Math.abs(t)<=Math.abs(e)?e>=0?d.S:d.N:2*Math.abs(e)<=Math.abs(t)?t>0?d.E:d.W:e>0?t>0?d.SE:d.SW:t>0?d.NE:d.NW},matrixAppendRotationInv:function(t,e,i,r){var s=l[d.inv(e)];i=i||0,r=r||0,s.tx=i,s.ty=r,t.append(s)}};e.exports=d},{"./Matrix":99}],99:[function(t,e,i){function r(){this.a=1,this.b=0,this.c=0,this.d=1,this.tx=0,this.ty=0,this.array=null}var s=t("./Point");r.prototype.constructor=r,e.exports=r,r.prototype.fromArray=function(t){this.a=t[0],this.b=t[1],this.c=t[3],this.d=t[4],this.tx=t[2],this.ty=t[5]},r.prototype.set=function(t,e,i,r,s,n){return this.a=t,this.b=e,this.c=i,this.d=r,this.tx=s,this.ty=n,this},r.prototype.toArray=function(t,e){this.array||(this.array=new Float32Array(9));var i=e||this.array;return t?(i[0]=this.a,i[1]=this.b,i[2]=0,i[3]=this.c,i[4]=this.d,i[5]=0,i[6]=this.tx,i[7]=this.ty,i[8]=1):(i[0]=this.a,i[1]=this.c,i[2]=this.tx,i[3]=this.b,i[4]=this.d,i[5]=this.ty,i[6]=0,i[7]=0,i[8]=1),i},r.prototype.apply=function(t,e){e=e||new s;var i=t.x,r=t.y;return e.x=this.a*i+this.c*r+this.tx,e.y=this.b*i+this.d*r+this.ty,e},r.prototype.applyInverse=function(t,e){e=e||new s;var i=1/(this.a*this.d+this.c*-this.b),r=t.x,n=t.y;return e.x=this.d*i*r+-this.c*i*n+(this.ty*this.c-this.tx*this.d)*i,e.y=this.a*i*n+-this.b*i*r+(-this.ty*this.a+this.tx*this.b)*i,e},r.prototype.translate=function(t,e){return this.tx+=t,this.ty+=e,this},r.prototype.scale=function(t,e){return this.a*=t,this.d*=e,this.c*=t,this.b*=e,this.tx*=t,this.ty*=e,this},r.prototype.rotate=function(t){var e=Math.cos(t),i=Math.sin(t),r=this.a,s=this.c,n=this.tx;return this.a=r*e-this.b*i,this.b=r*i+this.b*e,this.c=s*e-this.d*i,this.d=s*i+this.d*e,this.tx=n*e-this.ty*i,this.ty=n*i+this.ty*e,this},r.prototype.append=function(t){var e=this.a,i=this.b,r=this.c,s=this.d;return this.a=t.a*e+t.b*r,this.b=t.a*i+t.b*s,this.c=t.c*e+t.d*r,this.d=t.c*i+t.d*s,this.tx=t.tx*e+t.ty*r+this.tx,this.ty=t.tx*i+t.ty*s+this.ty,this},r.prototype.setTransform=function(t,e,i,r,s,n,o,a,h){var l,u,c,d,p,f,v,_,g,m;return p=Math.sin(o),f=Math.cos(o),v=Math.cos(h),_=Math.sin(h),g=-Math.sin(a),m=Math.cos(a),l=f*s,u=p*s,c=-p*n,d=f*n,this.a=v*l+_*c,this.b=v*u+_*d,this.c=g*l+m*c,this.d=g*u+m*d,this.tx=t+(i*l+r*c),this.ty=e+(i*u+r*d),this},r.prototype.prepend=function(t){var e=this.tx;if(1!==t.a||0!==t.b||0!==t.c||1!==t.d){var i=this.a,r=this.c;this.a=i*t.a+this.b*t.c,this.b=i*t.b+this.b*t.d,this.c=r*t.a+this.d*t.c,this.d=r*t.b+this.d*t.d}return this.tx=e*t.a+this.ty*t.c+t.tx,this.ty=e*t.b+this.ty*t.d+t.ty,this},r.prototype.decompose=function(t){var e=this.a,i=this.b,r=this.c,s=this.d,n=Math.atan2(-r,s),o=Math.atan2(i,e);return 1e-5>Math.abs(1-n/o)?(t.rotation=o,0>e&&s>=0&&(t.rotation+=t.rotation<=0?Math.PI:-Math.PI),t.skew.x=t.skew.y=0):(t.skew.x=n,t.skew.y=o),t.scale.x=Math.sqrt(e*e+i*i),t.scale.y=Math.sqrt(r*r+s*s),t.position.x=this.tx,t.position.y=this.ty,t},r.prototype.invert=function(){var t=this.a,e=this.b,i=this.c,r=this.d,s=this.tx,n=t*r-e*i;return this.a=r/n,this.b=-e/n,this.c=-i/n,this.d=t/n,this.tx=(i*this.ty-r*s)/n,this.ty=-(t*this.ty-e*s)/n,this},r.prototype.identity=function(){return this.a=1,this.b=0,this.c=0,this.d=1,this.tx=0,this.ty=0,this},r.prototype.clone=function(){var t=new r;return t.a=this.a,t.b=this.b,t.c=this.c,t.d=this.d,t.tx=this.tx,t.ty=this.ty,t},r.prototype.copy=function(t){return t.a=this.a,t.b=this.b,t.c=this.c,t.d=this.d,t.tx=this.tx,t.ty=this.ty,t},r.IDENTITY=new r,r.TEMP_MATRIX=new r},{"./Point":101}],100:[function(t,e,i){function r(t,e,i,r){this._x=i||0,this._y=r||0,this.cb=t,this.scope=e}r.prototype.constructor=r,e.exports=r,Object.defineProperties(r.prototype,{x:{get:function(){return this._x},set:function(t){this._x!==t&&(this._x=t,this.cb.call(this.scope))}},y:{get:function(){return this._y},set:function(t){this._y!==t&&(this._y=t,this.cb.call(this.scope))}}}),r.prototype.set=function(t,e){var i=t||0,r=e||(0!==e?i:0);this._x===i&&this._y===r||(this._x=i,this._y=r,this.cb.call(this.scope))},r.prototype.copy=function(t){this._x===t.x&&this._y===t.y||(this._x=t.x,this._y=t.y,this.cb.call(this.scope))}},{}],101:[function(t,e,i){function r(t,e){this.x=t||0,this.y=e||0}r.prototype.constructor=r,e.exports=r,r.prototype.clone=function(){return new r(this.x,this.y)},r.prototype.copy=function(t){this.set(t.x,t.y)},r.prototype.equals=function(t){return t.x===this.x&&t.y===this.y},r.prototype.set=function(t,e){this.x=t||0,this.y=e||(0!==e?this.x:0)}},{}],102:[function(t,e,i){e.exports={Point:t("./Point"),ObservablePoint:t("./ObservablePoint"),Matrix:t("./Matrix"),GroupD8:t("./GroupD8"),Circle:t("./shapes/Circle"),Ellipse:t("./shapes/Ellipse"),Polygon:t("./shapes/Polygon"),Rectangle:t("./shapes/Rectangle"),RoundedRectangle:t("./shapes/RoundedRectangle")}},{"./GroupD8":98,"./Matrix":99,"./ObservablePoint":100,"./Point":101,"./shapes/Circle":103,"./shapes/Ellipse":104,"./shapes/Polygon":105,"./shapes/Rectangle":106,"./shapes/RoundedRectangle":107}],103:[function(t,e,i){function r(t,e,i){this.x=t||0,this.y=e||0,this.radius=i||0,this.type=n.SHAPES.CIRC}var s=t("./Rectangle"),n=t("../../const");r.prototype.constructor=r,e.exports=r,r.prototype.clone=function(){return new r(this.x,this.y,this.radius)},r.prototype.contains=function(t,e){if(this.radius<=0)return!1;var i=this.x-t,r=this.y-e,s=this.radius*this.radius;return i*=i,r*=r,s>=i+r},r.prototype.getBounds=function(){return new s(this.x-this.radius,this.y-this.radius,2*this.radius,2*this.radius)}},{"../../const":78,"./Rectangle":106}],104:[function(t,e,i){function r(t,e,i,r){this.x=t||0,this.y=e||0,this.width=i||0,this.height=r||0,this.type=n.SHAPES.ELIP}var s=t("./Rectangle"),n=t("../../const");r.prototype.constructor=r,e.exports=r,r.prototype.clone=function(){return new r(this.x,this.y,this.width,this.height)},r.prototype.contains=function(t,e){if(this.width<=0||this.height<=0)return!1;var i=(t-this.x)/this.width,r=(e-this.y)/this.height;return i*=i,r*=r,1>=i+r},r.prototype.getBounds=function(){return new s(this.x-this.width,this.y-this.height,this.width,this.height)}},{"../../const":78,"./Rectangle":106}],105:[function(t,e,i){function r(t){var e=t;if(!Array.isArray(e)){e=new Array(arguments.length);for(var i=0;i<e.length;++i)e[i]=arguments[i]}if(e[0]instanceof s){for(var r=[],o=0,a=e.length;a>o;o++)r.push(e[o].x,e[o].y);e=r}this.closed=!0,this.points=e,this.type=n.SHAPES.POLY}var s=t("../Point"),n=t("../../const");r.prototype.constructor=r,e.exports=r,r.prototype.clone=function(){return new r(this.points.slice())},r.prototype.close=function(){var t=this.points;t[0]===t[t.length-2]&&t[1]===t[t.length-1]||t.push(t[0],t[1])},r.prototype.contains=function(t,e){for(var i=!1,r=this.points.length/2,s=0,n=r-1;r>s;n=s++){var o=this.points[2*s],a=this.points[2*s+1],h=this.points[2*n],l=this.points[2*n+1];a>e!=l>e&&(h-o)*(e-a)/(l-a)+o>t&&(i=!i)}return i}},{"../../const":78,"../Point":101}],106:[function(t,e,i){function r(t,e,i,r){this.x=t||0,this.y=e||0,this.width=i||0,this.height=r||0,this.type=s.SHAPES.RECT}var s=t("../../const");r.prototype.constructor=r,e.exports=r,r.EMPTY=new r(0,0,0,0),r.prototype.clone=function(){return new r(this.x,this.y,this.width,this.height)},r.prototype.copy=function(t){return this.x=t.x,this.y=t.y,this.width=t.width,this.height=t.height,this},r.prototype.contains=function(t,e){return!(this.width<=0||this.height<=0)&&(t>=this.x&&t<this.x+this.width&&e>=this.y&&e<this.y+this.height)},r.prototype.pad=function(t,e){t=t||0,e=e||(0!==e?t:0),this.x-=t,this.y-=e,this.width+=2*t,this.height+=2*e},r.prototype.fit=function(t){this.x<t.x&&(this.width+=this.x,this.width<0&&(this.width=0),this.x=t.x),this.y<t.y&&(this.height+=this.y,this.height<0&&(this.height=0),this.y=t.y),this.x+this.width>t.x+t.width&&(this.width=t.width-this.x,this.width<0&&(this.width=0)),this.y+this.height>t.y+t.height&&(this.height=t.height-this.y,this.height<0&&(this.height=0))},r.prototype.enlarge=function(t){if(t!==r.EMPTY){var e=Math.min(this.x,t.x),i=Math.max(this.x+this.width,t.x+t.width),s=Math.min(this.y,t.y),n=Math.max(this.y+this.height,t.y+t.height);this.x=e,this.width=i-e,this.y=s,this.height=n-s}}},{"../../const":78}],107:[function(t,e,i){function r(t,e,i,r,n){this.x=t||0,this.y=e||0,this.width=i||0,this.height=r||0,this.radius=n||20,this.type=s.SHAPES.RREC}var s=t("../../const");r.prototype.constructor=r,e.exports=r,r.prototype.clone=function(){return new r(this.x,this.y,this.width,this.height,this.radius)},r.prototype.contains=function(t,e){return!(this.width<=0||this.height<=0)&&(t>=this.x&&t<=this.x+this.width&&e>=this.y&&e<=this.y+this.height)}},{"../../const":78}],108:[function(t,e,i){function r(t,e,i,r){if(l.call(this),s.sayHello(t),r)for(var n in o.DEFAULT_RENDER_OPTIONS)void 0===r[n]&&(r[n]=o.DEFAULT_RENDER_OPTIONS[n]);else r=o.DEFAULT_RENDER_OPTIONS;this.type=o.RENDERER_TYPE.UNKNOWN,this.width=e||800,this.height=i||600,this.view=r.view||document.createElement("canvas"),this.resolution=r.resolution,this.transparent=r.transparent,this.autoResize=r.autoResize||!1,this.blendModes=null,this.preserveDrawingBuffer=r.preserveDrawingBuffer,this.clearBeforeRender=r.clearBeforeRender,this.roundPixels=r.roundPixels,this._backgroundColor=0,this._backgroundColorRgba=[0,0,0,0],this._backgroundColorString="#000000",this.backgroundColor=r.backgroundColor||this._backgroundColor,this._tempDisplayObjectParent=new a,this._lastObjectRendered=this._tempDisplayObjectParent}var s=t("../utils"),n=t("../math"),o=t("../const"),a=t("../display/Container"),h=t("../textures/RenderTexture"),l=t("eventemitter3"),u=new n.Matrix;r.prototype=Object.create(l.prototype),r.prototype.constructor=r,e.exports=r,Object.defineProperties(r.prototype,{backgroundColor:{get:function(){return this._backgroundColor},set:function(t){this._backgroundColor=t,this._backgroundColorString=s.hex2string(t),s.hex2rgb(t,this._backgroundColorRgba)}}}),r.prototype.resize=function(t,e){this.width=t*this.resolution,this.height=e*this.resolution,this.view.width=this.width,this.view.height=this.height,this.autoResize&&(this.view.style.width=this.width/this.resolution+"px",this.view.style.height=this.height/this.resolution+"px")},r.prototype.generateTexture=function(t,e,i){var r=t.getLocalBounds(),s=h.create(0|r.width,0|r.height,e,i);return u.tx=-r.x,u.ty=-r.y,this.render(t,s,!1,u,!0),s},r.prototype.destroy=function(t){t&&this.view.parentNode&&this.view.parentNode.removeChild(this.view),this.type=o.RENDERER_TYPE.UNKNOWN,this.width=0,this.height=0,this.view=null,this.resolution=0,this.transparent=!1,this.autoResize=!1,this.blendModes=null,this.preserveDrawingBuffer=!1,this.clearBeforeRender=!1,this.roundPixels=!1,this._backgroundColor=0,this._backgroundColorRgba=null,this._backgroundColorString=null,this.backgroundColor=0,this._tempDisplayObjectParent=null,this._lastObjectRendered=null}},{"../const":78,"../display/Container":80,"../math":102,"../textures/RenderTexture":143,"../utils":151,eventemitter3:3}],109:[function(t,e,i){function r(t,e,i){i=i||{},s.call(this,"Canvas",t,e,i),this.type=l.RENDERER_TYPE.CANVAS,this.rootContext=this.view.getContext("2d",{alpha:this.transparent}),this.rootResolution=this.resolution,this.refresh=!0,this.maskManager=new n(this),this.smoothProperty="imageSmoothingEnabled",this.rootContext.imageSmoothingEnabled||(this.rootContext.webkitImageSmoothingEnabled?this.smoothProperty="webkitImageSmoothingEnabled":this.rootContext.mozImageSmoothingEnabled?this.smoothProperty="mozImageSmoothingEnabled":this.rootContext.oImageSmoothingEnabled?this.smoothProperty="oImageSmoothingEnabled":this.rootContext.msImageSmoothingEnabled&&(this.smoothProperty="msImageSmoothingEnabled")),this.initPlugins(),this.blendModes=a(),this._activeBlendMode=null,this.context=null,this.renderingToScreen=!1,this.resize(t,e)}var s=t("../SystemRenderer"),n=t("./utils/CanvasMaskManager"),o=t("./utils/CanvasRenderTarget"),a=t("./utils/mapCanvasBlendModesToPixi"),h=t("../../utils"),l=t("../../const");r.prototype=Object.create(s.prototype),r.prototype.constructor=r,e.exports=r,h.pluginTarget.mixin(r),r.prototype.render=function(t,e,i,r,s){if(this.view){this.renderingToScreen=!e,this.emit("prerender"),e?(e=e.baseTexture||e,e._canvasRenderTarget||(e._canvasRenderTarget=new o(e.width,e.height,e.resolution),e.source=e._canvasRenderTarget.canvas,e.valid=!0),this.context=e._canvasRenderTarget.context,this.resolution=e._canvasRenderTarget.resolution):(this.context=this.rootContext,this.resolution=this.rootResolution);var n=this.context;if(e||(this._lastObjectRendered=t),!s){var a=t.parent,h=this._tempDisplayObjectParent.transform.worldTransform;r?r.copy(h):h.identity(),t.parent=this._tempDisplayObjectParent,t.updateTransform(),t.parent=a}n.setTransform(1,0,0,1,0,0),n.globalAlpha=1,n.globalCompositeOperation=this.blendModes[l.BLEND_MODES.NORMAL],navigator.isCocoonJS&&this.view.screencanvas&&(n.fillStyle="black",n.clear()),(void 0!==i?i:this.clearBeforeRender)&&this.renderingToScreen&&(this.transparent?n.clearRect(0,0,this.width,this.height):(n.fillStyle=this._backgroundColorString,n.fillRect(0,0,this.width,this.height)));var u=this.context;this.context=n,t.renderCanvas(this),this.context=u,this.emit("postrender")}},r.prototype.setBlendMode=function(t){this._activeBlendMode!==t&&(this.context.globalCompositeOperation=this.blendModes[t])},r.prototype.destroy=function(t){this.destroyPlugins(),s.prototype.destroy.call(this,t),this.context=null,this.refresh=!0,this.maskManager.destroy(),this.maskManager=null,this.smoothProperty=null},r.prototype.resize=function(t,e){s.prototype.resize.call(this,t,e),this.smoothProperty&&(this.rootContext[this.smoothProperty]=l.SCALE_MODES.DEFAULT===l.SCALE_MODES.LINEAR)}},{"../../const":78,"../../utils":151,"../SystemRenderer":108,"./utils/CanvasMaskManager":110,"./utils/CanvasRenderTarget":111,"./utils/mapCanvasBlendModesToPixi":113}],110:[function(t,e,i){function r(t){this.renderer=t}var s=t("../../../const");r.prototype.constructor=r,e.exports=r,r.prototype.pushMask=function(t){var e=this.renderer;e.context.save();var i=t.alpha,r=t.transform.worldTransform,s=e.resolution;e.context.setTransform(r.a*s,r.b*s,r.c*s,r.d*s,r.tx*s,r.ty*s),t._texture||(this.renderGraphicsShape(t),e.context.clip()),t.worldAlpha=i},r.prototype.renderGraphicsShape=function(t){var e=this.renderer.context,i=t.graphicsData.length;if(0!==i){e.beginPath();for(var r=0;i>r;r++){var n=t.graphicsData[r],o=n.shape;if(n.type===s.SHAPES.POLY){var a=o.points;e.moveTo(a[0],a[1]);for(var h=1;h<a.length/2;h++)e.lineTo(a[2*h],a[2*h+1]);a[0]===a[a.length-2]&&a[1]===a[a.length-1]&&e.closePath()}else if(n.type===s.SHAPES.RECT)e.rect(o.x,o.y,o.width,o.height),e.closePath();else if(n.type===s.SHAPES.CIRC)e.arc(o.x,o.y,o.radius,0,2*Math.PI),e.closePath();else if(n.type===s.SHAPES.ELIP){var l=2*o.width,u=2*o.height,c=o.x-l/2,d=o.y-u/2,p=.5522848,f=l/2*p,v=u/2*p,_=c+l,g=d+u,m=c+l/2,y=d+u/2;e.moveTo(c,y),e.bezierCurveTo(c,y-v,m-f,d,m,d),e.bezierCurveTo(m+f,d,_,y-v,_,y),e.bezierCurveTo(_,y+v,m+f,g,m,g),e.bezierCurveTo(m-f,g,c,y+v,c,y),e.closePath()}else if(n.type===s.SHAPES.RREC){var x=o.x,b=o.y,T=o.width,w=o.height,E=o.radius,S=Math.min(T,w)/2|0;E=E>S?S:E,e.moveTo(x,b+E),e.lineTo(x,b+w-E),e.quadraticCurveTo(x,b+w,x+E,b+w),e.lineTo(x+T-E,b+w),e.quadraticCurveTo(x+T,b+w,x+T,b+w-E),e.lineTo(x+T,b+E),e.quadraticCurveTo(x+T,b,x+T-E,b),e.lineTo(x+E,b),e.quadraticCurveTo(x,b,x,b+E),e.closePath()}}}},r.prototype.popMask=function(t){t.context.restore()},r.prototype.destroy=function(){}},{"../../../const":78}],111:[function(t,e,i){function r(t,e,i){this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.resolution=i||s.RESOLUTION,this.resize(t,e)}var s=t("../../../const");r.prototype.constructor=r,e.exports=r,Object.defineProperties(r.prototype,{width:{get:function(){return this.canvas.width},set:function(t){this.canvas.width=t}},height:{get:function(){return this.canvas.height},set:function(t){this.canvas.height=t}}}),r.prototype.clear=function(){this.context.setTransform(1,0,0,1,0,0),this.context.clearRect(0,0,this.canvas.width,this.canvas.height)},r.prototype.resize=function(t,e){this.canvas.width=t*this.resolution,this.canvas.height=e*this.resolution},r.prototype.destroy=function(){this.context=null,this.canvas=null}},{"../../../const":78}],112:[function(t,e,i){var r=function(){if("undefined"==typeof document)return!1;var t="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABAQMAAADD8p2OAAAAA1BMVEX/",e="AAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==",i=new Image;i.src=t+"AP804Oa6"+e;var r=new Image;r.src=t+"/wCKxvRF"+e;var s=document.createElement("canvas");s.width=6,s.height=1;var n=s.getContext("2d");n.globalCompositeOperation="multiply",n.drawImage(i,0,0),n.drawImage(r,2,0);var o=n.getImageData(2,0,1,1);if(!o)return!1;var a=o.data;return 255===a[0]&&0===a[1]&&0===a[2]};e.exports=r},{}],113:[function(t,e,i){function r(t){return t=t||[],n()?(t[s.BLEND_MODES.NORMAL]="source-over",t[s.BLEND_MODES.ADD]="lighter",t[s.BLEND_MODES.MULTIPLY]="multiply",t[s.BLEND_MODES.SCREEN]="screen",t[s.BLEND_MODES.OVERLAY]="overlay",t[s.BLEND_MODES.DARKEN]="darken",t[s.BLEND_MODES.LIGHTEN]="lighten",t[s.BLEND_MODES.COLOR_DODGE]="color-dodge",t[s.BLEND_MODES.COLOR_BURN]="color-burn",t[s.BLEND_MODES.HARD_LIGHT]="hard-light",t[s.BLEND_MODES.SOFT_LIGHT]="soft-light",t[s.BLEND_MODES.DIFFERENCE]="difference",t[s.BLEND_MODES.EXCLUSION]="exclusion",t[s.BLEND_MODES.HUE]="hue",t[s.BLEND_MODES.SATURATION]="saturate",t[s.BLEND_MODES.COLOR]="color",t[s.BLEND_MODES.LUMINOSITY]="luminosity"):(t[s.BLEND_MODES.NORMAL]="source-over",t[s.BLEND_MODES.ADD]="lighter",t[s.BLEND_MODES.MULTIPLY]="source-over",t[s.BLEND_MODES.SCREEN]="source-over",t[s.BLEND_MODES.OVERLAY]="source-over",t[s.BLEND_MODES.DARKEN]="source-over",t[s.BLEND_MODES.LIGHTEN]="source-over",t[s.BLEND_MODES.COLOR_DODGE]="source-over",t[s.BLEND_MODES.COLOR_BURN]="source-over",t[s.BLEND_MODES.HARD_LIGHT]="source-over",t[s.BLEND_MODES.SOFT_LIGHT]="source-over",t[s.BLEND_MODES.DIFFERENCE]="source-over",t[s.BLEND_MODES.EXCLUSION]="source-over",t[s.BLEND_MODES.HUE]="source-over",t[s.BLEND_MODES.SATURATION]="source-over",t[s.BLEND_MODES.COLOR]="source-over",t[s.BLEND_MODES.LUMINOSITY]="source-over"),t}var s=t("../../../const"),n=t("./canUseNewCanvasBlendModes");e.exports=r},{"../../../const":78,"./canUseNewCanvasBlendModes":112}],114:[function(t,e,i){function r(t){this.renderer=t,this.count=0,this.checkCount=0,this.maxIdle=3600,this.checkCountMax=600,this.mode=s.GC_MODES.DEFAULT}var s=t("../../const");r.prototype.constructor=r,e.exports=r,r.prototype.update=function(){this.count++,this.mode!==s.GC_MODES.MANUAL&&++this.checkCount>this.checkCountMax&&(this.checkCount=0,this.run())},r.prototype.run=function(){var t,e,i=this.renderer.textureManager,r=i._managedTextures,s=!1;for(t=0;t<r.length;t++){var n=r[t];!n._glRenderTargets&&this.count-n.touched>this.maxIdle&&(i.destroyTexture(n,!0),r[t]=null,s=!0)}if(s){for(e=0,t=0;t<r.length;t++)null!==r[t]&&(r[e++]=r[t]);r.length=e}},r.prototype.unload=function(t){var e=this.renderer.textureManager;t._texture&&e.destroyTexture(t._texture,!0);for(var i=t.children.length-1;i>=0;i--)this.unload(t.children[i])}},{"../../const":78}],115:[function(t,e,i){var r=t("pixi-gl-core").GLTexture,s=t("../../const"),n=t("./utils/RenderTarget"),o=t("../../utils"),a=function(t){this.renderer=t,this.gl=t.gl,this._managedTextures=[]};a.prototype.bindTexture=function(){},a.prototype.getTexture=function(){},a.prototype.updateTexture=function(t){t=t.baseTexture||t;var e=!!t._glRenderTargets;if(t.hasLoaded){var i=t._glTextures[this.renderer.CONTEXT_UID];if(i)e?t._glRenderTargets[this.renderer.CONTEXT_UID].resize(t.width,t.height):i.upload(t.source);else{if(e){var o=new n(this.gl,t.width,t.height,t.scaleMode,t.resolution);o.resize(t.width,t.height),t._glRenderTargets[this.renderer.CONTEXT_UID]=o,i=o.texture}else i=new r(this.gl),i.premultiplyAlpha=!0,i.upload(t.source);t._glTextures[this.renderer.CONTEXT_UID]=i,t.on("update",this.updateTexture,this),t.on("dispose",this.destroyTexture,this),this._managedTextures.push(t),t.isPowerOfTwo?(t.mipmap&&i.enableMipmap(),t.wrapMode===s.WRAP_MODES.CLAMP?i.enableWrapClamp():t.wrapMode===s.WRAP_MODES.REPEAT?i.enableWrapRepeat():i.enableWrapMirrorRepeat()):i.enableWrapClamp(),t.scaleMode===s.SCALE_MODES.NEAREST?i.enableNearestScaling():i.enableLinearScaling()}return i}},a.prototype.destroyTexture=function(t,e){if(t=t.baseTexture||t,t.hasLoaded&&t._glTextures[this.renderer.CONTEXT_UID]&&(t._glTextures[this.renderer.CONTEXT_UID].destroy(),t.off("update",this.updateTexture,this),t.off("dispose",this.destroyTexture,this),delete t._glTextures[this.renderer.CONTEXT_UID],!e)){var i=this._managedTextures.indexOf(t);-1!==i&&o.removeItems(this._managedTextures,i,1)}},a.prototype.removeAll=function(){for(var t=0;t<this._managedTextures.length;++t){var e=this._managedTextures[t]
    ;e._glTextures[this.renderer.CONTEXT_UID]&&delete e._glTextures[this.renderer.CONTEXT_UID]}},a.prototype.destroy=function(){for(var t=0;t<this._managedTextures.length;++t){var e=this._managedTextures[t];this.destroyTexture(e,!0),e.off("update",this.updateTexture,this),e.off("dispose",this.destroyTexture,this)}this._managedTextures=null},e.exports=a},{"../../const":78,"../../utils":151,"./utils/RenderTarget":128,"pixi-gl-core":12}],116:[function(t,e,i){function r(t,e,i){i=i||{},s.call(this,"WebGL",t,e,i),this.type=m.RENDERER_TYPE.WEBGL,this.handleContextLost=this.handleContextLost.bind(this),this.handleContextRestored=this.handleContextRestored.bind(this),this.view.addEventListener("webglcontextlost",this.handleContextLost,!1),this.view.addEventListener("webglcontextrestored",this.handleContextRestored,!1),this._contextOptions={alpha:this.transparent,antialias:i.antialias,premultipliedAlpha:this.transparent&&"notMultiplied"!==this.transparent,stencil:!0,preserveDrawingBuffer:i.preserveDrawingBuffer},this._backgroundColorRgba[3]=this.transparent?0:1,this.maskManager=new n(this),this.stencilManager=new o(this),this.emptyRenderer=new l(this),this.currentRenderer=this.emptyRenderer,this.initPlugins(),i.context&&v(i.context),this.gl=i.context||p(this.view,this._contextOptions),this.CONTEXT_UID=y++,this.state=new d(this.gl),this.renderingToScreen=!0,this._initContext(),this.filterManager=new a(this),this.drawModes=f(this.gl),this._activeShader=null,this._activeRenderTarget=null,this._activeTextureLocation=999,this._activeTexture=null,this.setBlendMode(0)}var s=t("../SystemRenderer"),n=t("./managers/MaskManager"),o=t("./managers/StencilManager"),a=t("./managers/FilterManager"),h=t("./utils/RenderTarget"),l=t("./utils/ObjectRenderer"),u=t("./TextureManager"),c=t("./TextureGarbageCollector"),d=t("./WebGLState"),p=t("pixi-gl-core").createContext,f=t("./utils/mapWebGLDrawModesToPixi"),v=t("./utils/validateContext"),_=t("../../utils"),g=t("pixi-gl-core"),m=t("../../const"),y=0;r.prototype=Object.create(s.prototype),r.prototype.constructor=r,e.exports=r,_.pluginTarget.mixin(r),r.prototype._initContext=function(){var t=this.gl;this.textureManager=new u(this),this.textureGC=new c(this),this.state.resetToDefault(),this.rootRenderTarget=new h(t,this.width,this.height,null,this.resolution,!0),this.rootRenderTarget.clearColor=this._backgroundColorRgba,this.bindRenderTarget(this.rootRenderTarget),this.emit("context",t),this.resize(this.width,this.height)},r.prototype.render=function(t,e,i,r,s){if(this.renderingToScreen=!e,this.emit("prerender"),this.gl&&!this.gl.isContextLost()){if(e||(this._lastObjectRendered=t),!s){var n=t.parent;t.parent=this._tempDisplayObjectParent,t.updateTransform(),t.parent=n}this.bindRenderTexture(e,r),this.currentRenderer.start(),(void 0!==i?i:this.clearBeforeRender)&&this._activeRenderTarget.clear(),t.renderWebGL(this),this.currentRenderer.flush(),this.textureGC.update(),this.emit("postrender")}},r.prototype.setObjectRenderer=function(t){this.currentRenderer!==t&&(this.currentRenderer.stop(),this.currentRenderer=t,this.currentRenderer.start())},r.prototype.flush=function(){this.setObjectRenderer(this.emptyRenderer)},r.prototype.resize=function(t,e){s.prototype.resize.call(this,t,e),this.rootRenderTarget.resize(t,e),this._activeRenderTarget===this.rootRenderTarget&&(this.rootRenderTarget.activate(),this._activeShader&&(this._activeShader.uniforms.projectionMatrix=this.rootRenderTarget.projectionMatrix.toArray(!0)))},r.prototype.setBlendMode=function(t){this.state.setBlendMode(t)},r.prototype.clear=function(t){this._activeRenderTarget.clear(t)},r.prototype.setTransform=function(t){this._activeRenderTarget.transform=t},r.prototype.bindRenderTexture=function(t,e){var i;if(t){var r=t.baseTexture,s=this.gl;r._glRenderTargets[this.CONTEXT_UID]?(this._activeTextureLocation=r._id,s.activeTexture(s.TEXTURE0+r._id),s.bindTexture(s.TEXTURE_2D,null)):(this.textureManager.updateTexture(r),s.bindTexture(s.TEXTURE_2D,null)),i=r._glRenderTargets[this.CONTEXT_UID],i.setFrame(t.frame)}else i=this.rootRenderTarget;return i.transform=e,this.bindRenderTarget(i),this},r.prototype.bindRenderTarget=function(t){return t!==this._activeRenderTarget&&(this._activeRenderTarget=t,t.activate(),this._activeShader&&(this._activeShader.uniforms.projectionMatrix=t.projectionMatrix.toArray(!0)),this.stencilManager.setMaskStack(t.stencilMaskStack)),this},r.prototype.bindShader=function(t){return this._activeShader!==t&&(this._activeShader=t,t.bind(),t.uniforms.projectionMatrix=this._activeRenderTarget.projectionMatrix.toArray(!0)),this},r.prototype.bindTexture=function(t,e){t=t.baseTexture||t;var i=this.gl;return e=e||0,this._activeTextureLocation!==e&&(this._activeTextureLocation=e,i.activeTexture(i.TEXTURE0+e)),this._activeTexture=t,t._glTextures[this.CONTEXT_UID]?(t.touched=this.textureGC.count,t._glTextures[this.CONTEXT_UID].bind()):this.textureManager.updateTexture(t),this},r.prototype.createVao=function(){return new g.VertexArrayObject(this.gl,this.state.attribState)},r.prototype.reset=function(){return this.setObjectRenderer(this.emptyRenderer),this._activeShader=null,this._activeRenderTarget=this.rootRenderTarget,this._activeTextureLocation=999,this._activeTexture=null,this.rootRenderTarget.activate(),this.state.resetToDefault(),this},r.prototype.handleContextLost=function(t){t.preventDefault()},r.prototype.handleContextRestored=function(){this._initContext(),this.textureManager.removeAll()},r.prototype.destroy=function(t){this.destroyPlugins(),this.view.removeEventListener("webglcontextlost",this.handleContextLost),this.view.removeEventListener("webglcontextrestored",this.handleContextRestored),this.textureManager.destroy(),s.prototype.destroy.call(this,t),this.uid=0,this.maskManager.destroy(),this.stencilManager.destroy(),this.filterManager.destroy(),this.maskManager=null,this.filterManager=null,this.textureManager=null,this.currentRenderer=null,this.handleContextLost=null,this.handleContextRestored=null,this._contextOptions=null,this.gl.useProgram(null),this.gl.getExtension("WEBGL_lose_context")&&this.gl.getExtension("WEBGL_lose_context").loseContext(),this.gl=null}},{"../../const":78,"../../utils":151,"../SystemRenderer":108,"./TextureGarbageCollector":114,"./TextureManager":115,"./WebGLState":117,"./managers/FilterManager":122,"./managers/MaskManager":123,"./managers/StencilManager":124,"./utils/ObjectRenderer":126,"./utils/RenderTarget":128,"./utils/mapWebGLDrawModesToPixi":131,"./utils/validateContext":132,"pixi-gl-core":12}],117:[function(t,e,i){function r(t){this.activeState=new Uint8Array(16),this.defaultState=new Uint8Array(16),this.defaultState[0]=1,this.stackIndex=0,this.stack=[],this.gl=t,this.maxAttribs=t.getParameter(t.MAX_VERTEX_ATTRIBS),this.attribState={tempAttribState:new Array(this.maxAttribs),attribState:new Array(this.maxAttribs)},this.blendModes=s(t),this.nativeVaoExtension=t.getExtension("OES_vertex_array_object")||t.getExtension("MOZ_OES_vertex_array_object")||t.getExtension("WEBKIT_OES_vertex_array_object")}var s=t("./utils/mapWebGLBlendModesToPixi");r.prototype.push=function(){var t=this.stack[++this.stackIndex];t||(t=this.stack[this.stackIndex]=new Uint8Array(16));for(var e=0;e<this.activeState.length;e++)this.activeState[e]=t[e]};var n=0,o=1,a=2,h=3,l=4;r.prototype.pop=function(){var t=this.stack[--this.stackIndex];this.setState(t)},r.prototype.setState=function(t){this.setBlend(t[0]),this.setDepthTest(t[1]),this.setFrontFace(t[2]),this.setCullFace(t[3]),this.setBlendMode(t[4])},r.prototype.setBlend=function(t){if(!(this.activeState[0]===t|0)){this.activeState[0]=0|t;var e=this.gl;t?e.enable(e.BLEND):e.disable(e.BLEND)}},r.prototype.setBlendMode=function(t){t!==this.activeState[4]&&(this.activeState[4]=t,this.gl.blendFunc(this.blendModes[t][0],this.blendModes[t][1]))},r.prototype.setDepthTest=function(t){if(!(this.activeState[1]===t|0)){this.activeState[1]=0|t;var e=this.gl;t?e.enable(e.DEPTH_TEST):e.disable(e.DEPTH_TEST)}},r.prototype.setCullFace=function(t){if(!(this.activeState[3]===t|0)){this.activeState[3]=0|t;var e=this.gl;t?e.enable(e.CULL_FACE):e.disable(e.CULL_FACE)}},r.prototype.setFrontFace=function(t){if(!(this.activeState[2]===t|0)){this.activeState[2]=0|t;var e=this.gl;t?e.frontFace(e.CW):e.frontFace(e.CCW)}},r.prototype.resetAttributes=function(){var t;for(t=0;t<this.attribState.tempAttribState.length;t++)this.attribState.tempAttribState[t]=0;for(t=0;t<this.attribState.attribState.length;t++)this.attribState.attribState[t]=0;var e=this.gl;for(t=1;t<this.maxAttribs;t++)e.disableVertexAttribArray(t)},r.prototype.resetToDefault=function(){this.nativeVaoExtension&&this.nativeVaoExtension.bindVertexArrayOES(null),this.resetAttributes();for(var t=0;t<this.activeState.length;t++)this.activeState[t]=32;var e=this.gl;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),this.setState(this.defaultState)},e.exports=r},{"./utils/mapWebGLBlendModesToPixi":130}],118:[function(t,e,i){function r(t,e,i){this.vertexSrc=t||r.defaultVertexSrc,this.fragmentSrc=e||r.defaultFragmentSrc,this.blendMode=o.BLEND_MODES.NORMAL,this.uniformData=i||s(this.vertexSrc,this.fragmentSrc,"projectionMatrix|uSampler"),this.uniforms={};for(var h in this.uniformData)this.uniforms[h]=this.uniformData[h].value;this.glShaders=[],a[this.vertexSrc+this.fragmentSrc]||(a[this.vertexSrc+this.fragmentSrc]=n.uid()),this.glShaderKey=a[this.vertexSrc+this.fragmentSrc],this.padding=4,this.resolution=1,this.enabled=!0}var s=t("./extractUniformsFromSrc"),n=t("../../../utils"),o=t("../../../const"),a={};e.exports=r,r.prototype.apply=function(t,e,i,r){t.applyFilter(this,e,i,r)},r.defaultVertexSrc=["attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","uniform mat3 projectionMatrix;","uniform mat3 filterMatrix;","varying vec2 vTextureCoord;","varying vec2 vFilterCoord;","void main(void){","   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);","   vFilterCoord = ( filterMatrix * vec3( aTextureCoord, 1.0)  ).xy;","   vTextureCoord = aTextureCoord ;","}"].join("\n"),r.defaultFragmentSrc=["varying vec2 vTextureCoord;","varying vec2 vFilterCoord;","uniform sampler2D uSampler;","uniform sampler2D filterSampler;","void main(void){","   vec4 masky = texture2D(filterSampler, vFilterCoord);","   vec4 sample = texture2D(uSampler, vTextureCoord);","   vec4 color;","   if(mod(vFilterCoord.x, 1.0) > 0.5)","   {","     color = vec4(1.0, 0.0, 0.0, 1.0);","   }","   else","   {","     color = vec4(0.0, 1.0, 0.0, 1.0);","   }","   gl_FragColor = mix(sample, masky, 0.5);","   gl_FragColor *= sample.a;","}"].join("\n")},{"../../../const":78,"../../../utils":151,"./extractUniformsFromSrc":119}],119:[function(t,e,i){function r(t,e,i){var r=s(t,i),n=s(e,i);return Object.assign(r,n)}function s(t){for(var e,i=new RegExp("^(projectionMatrix|uSampler|filterArea)$"),r={},s=t.replace(/\s+/g," ").split(/\s*;\s*/),o=0;o<s.length;o++){var a=s[o].trim();if(a.indexOf("uniform")>-1){var h=a.split(" "),l=h[1],u=h[2],c=1;u.indexOf("[")>-1&&(e=u.split(/\[|\]/),u=e[0],c*=Number(e[1])),u.match(i)||(r[u]={value:n(l,c),name:u,type:l})}}return r}var n=t("pixi-gl-core").shader.defaultValue;e.exports=r},{"pixi-gl-core":12}],120:[function(t,e,i){var r=t("../../../math"),s=function(t,e,i){var r=t.identity();return r.translate(e.x/i.width,e.y/i.height),r.scale(i.width,i.height),r},n=function(t,e,i){var r=t.identity();r.translate(e.x/i.width,e.y/i.height);var s=i.width/e.width,n=i.height/e.height;return r.scale(s,n),r},o=function(t,e,i,s){var n=s.worldTransform.copy(r.Matrix.TEMP_MATRIX),o=s._texture.baseTexture,a=t.identity(),h=i.height/i.width;a.translate(e.x/i.width,e.y/i.height),a.scale(1,h);var l=i.width/o.width,u=i.height/o.height;return n.tx/=o.width*l,n.ty/=o.width*l,n.invert(),a.prepend(n),a.scale(1,1/h),a.scale(l,u),a.translate(s.anchor.x,s.anchor.y),a};e.exports={calculateScreenSpaceMatrix:s,calculateNormalizedScreenSpaceMatrix:n,calculateSpriteMatrix:o}},{"../../../math":102}],121:[function(t,e,i){function r(t){var e=new n.Matrix;s.call(this,"#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 otherMatrix;\n\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n}\n","#define GLSLIFY 1\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float alpha;\nuniform sampler2D mask;\n\nvoid main(void)\n{\n    // check clip! this will stop the mask bleeding out from the edges\n    vec2 text = abs( vMaskCoord - 0.5 );\n    text = step(0.5, text);\n    float clip = 1.0 - max(text.y, text.x);\n    vec4 original = texture2D(uSampler, vTextureCoord);\n    vec4 masky = texture2D(mask, vMaskCoord);\n    original *= (masky.r * masky.a * alpha * clip);\n    gl_FragColor = original;\n}\n"),t.renderable=!1,this.maskSprite=t,this.maskMatrix=e}var s=t("../Filter"),n=t("../../../../math");r.prototype=Object.create(s.prototype),r.prototype.constructor=r,e.exports=r,r.prototype.apply=function(t,e,i){var r=this.maskSprite;this.uniforms.mask=r._texture,this.uniforms.otherMatrix=t.calculateSpriteMatrix(this.maskMatrix,r),this.uniforms.alpha=r.worldAlpha,t.applyFilter(this,e,i)}},{"../../../../math":102,"../Filter":118}],122:[function(t,e,i){function r(t){s.call(this,t),this.gl=this.renderer.gl,this.quad=new o(this.gl,t.state.attribState),this.shaderCache={},this.pool={},this.filterData=null}var s=t("./WebGLManager"),n=t("../utils/RenderTarget"),o=t("../utils/Quad"),a=t("../../../math"),h=t("../../../Shader"),l=t("../filters/filterTransforms"),u=t("bit-twiddle"),c=function(){this.renderTarget=null,this.sourceFrame=new a.Rectangle,this.destinationFrame=new a.Rectangle,this.filters=[],this.target=null,this.resolution=1};r.prototype=Object.create(s.prototype),r.prototype.constructor=r,e.exports=r,r.prototype.pushFilter=function(t,e){var i=this.renderer,r=this.filterData;if(!r){r=this.renderer._activeRenderTarget.filterStack;var s=new c;s.sourceFrame=s.destinationFrame=this.renderer._activeRenderTarget.size,s.renderTarget=i._activeRenderTarget,this.renderer._activeRenderTarget.filterData=r={index:0,stack:[s]},this.filterData=r}var n=r.stack[++r.index];n||(n=r.stack[r.index]=new c);var o=e[0].resolution,a=e[0].padding,h=t.filterArea||t.getBounds(!0),l=n.sourceFrame,u=n.destinationFrame;l.x=(h.x*o|0)/o,l.y=(h.y*o|0)/o,l.width=(h.width*o|0)/o,l.height=(h.height*o|0)/o,r.stack[0].renderTarget.transform||l.fit(r.stack[0].destinationFrame),l.pad(a),u.width=l.width,u.height=l.height;var d=this.getPotRenderTarget(i.gl,l.width,l.height,o);n.target=t,n.filters=e,n.resolution=o,n.renderTarget=d,d.setFrame(u,l),i.bindRenderTarget(d),i.clear()},r.prototype.popFilter=function(){var t=this.filterData,e=t.stack[t.index-1],i=t.stack[t.index];this.quad.map(i.renderTarget.size,i.sourceFrame).upload();var r=i.filters;if(1===r.length)r[0].apply(this,i.renderTarget,e.renderTarget,!1),this.freePotRenderTarget(i.renderTarget);else{var s=i.renderTarget,n=this.getPotRenderTarget(this.renderer.gl,i.sourceFrame.width,i.sourceFrame.height,1);n.setFrame(i.destinationFrame,i.sourceFrame);for(var o=0;o<r.length-1;o++){r[o].apply(this,s,n,!0);var a=s;s=n,n=a}r[o].apply(this,s,e.renderTarget,!1),this.freePotRenderTarget(s),this.freePotRenderTarget(n)}0===--t.index&&(this.filterData=null)},r.prototype.applyFilter=function(t,e,i,r){var s=this.renderer,n=t.glShaders[s.CONTEXT_UID];if(n||(t.glShaderKey?(n=this.shaderCache[t.glShaderKey])||(n=t.glShaders[s.CONTEXT_UID]=this.shaderCache[t.glShaderKey]=new h(this.gl,t.vertexSrc,t.fragmentSrc)):n=t.glShaders[s.CONTEXT_UID]=new h(this.gl,t.vertexSrc,t.fragmentSrc),this.quad.initVao(n)),s.bindRenderTarget(i),r){var o=s.gl;o.disable(o.SCISSOR_TEST),s.clear(),o.enable(o.SCISSOR_TEST)}i===s.maskManager.scissorRenderTarget&&s.maskManager.pushScissorMask(null,s.maskManager.scissorData),s.bindShader(n),this.syncUniforms(n,t),e.texture.bind(0),s._activeTextureLocation=0,s.state.setBlendMode(t.blendMode),this.quad.draw()},r.prototype.syncUniforms=function(t,e){var i,r=e.uniformData,s=e.uniforms,n=1;if(t.uniforms.data.filterArea){i=this.filterData.stack[this.filterData.index];var o=t.uniforms.filterArea;o[0]=i.renderTarget.size.width,o[1]=i.renderTarget.size.height,o[2]=i.sourceFrame.x,o[3]=i.sourceFrame.y,t.uniforms.filterArea=o}if(t.uniforms.data.filterClamp){i=this.filterData.stack[this.filterData.index];var a=t.uniforms.filterClamp;a[0]=.5/i.renderTarget.size.width,a[1]=.5/i.renderTarget.size.height,a[2]=(i.sourceFrame.width-.5)/i.renderTarget.size.width,a[3]=(i.sourceFrame.height-.5)/i.renderTarget.size.height,t.uniforms.filterClamp=a}var h;for(var l in r)if("sampler2D"===r[l].type){if(t.uniforms[l]=n,s[l].baseTexture)this.renderer.bindTexture(s[l].baseTexture,n);else{var u=this.renderer.gl;this.renderer._activeTextureLocation=u.TEXTURE0+n,u.activeTexture(u.TEXTURE0+n),s[l].texture.bind()}n++}else"mat3"===r[l].type?void 0!==s[l].a?t.uniforms[l]=s[l].toArray(!0):t.uniforms[l]=s[l]:"vec2"===r[l].type?void 0!==s[l].x?(h=t.uniforms[l]||new Float32Array(2),h[0]=s[l].x,h[1]=s[l].y,t.uniforms[l]=h):t.uniforms[l]=s[l]:"float"===r[l].type?t.uniforms.data[l].value!==r[l]&&(t.uniforms[l]=s[l]):t.uniforms[l]=s[l]},r.prototype.getRenderTarget=function(t,e){var i=this.filterData.stack[this.filterData.index],r=this.getPotRenderTarget(this.renderer.gl,i.sourceFrame.width,i.sourceFrame.height,e||i.resolution);return r.setFrame(i.destinationFrame,i.sourceFrame),r},r.prototype.returnRenderTarget=function(t){return this.freePotRenderTarget(t)},r.prototype.calculateScreenSpaceMatrix=function(t){var e=this.filterData.stack[this.filterData.index];return l.calculateScreenSpaceMatrix(t,e.sourceFrame,e.renderTarget.size)},r.prototype.calculateNormalizedScreenSpaceMatrix=function(t){var e=this.filterData.stack[this.filterData.index];return l.calculateNormalizedScreenSpaceMatrix(t,e.sourceFrame,e.renderTarget.size,e.destinationFrame)},r.prototype.calculateSpriteMatrix=function(t,e){var i=this.filterData.stack[this.filterData.index];return l.calculateSpriteMatrix(t,i.sourceFrame,i.renderTarget.size,e)},r.prototype.destroy=function(){this.shaderCache=[],this.emptyPool()},r.prototype.getPotRenderTarget=function(t,e,i,r){e=u.nextPow2(e*r),i=u.nextPow2(i*r);var s=(65535&e)<<16|65535&i;this.pool[s]||(this.pool[s]=[]);var o=this.pool[s].pop()||new n(t,e,i,null,1);return o.resolution=r,o.defaultFrame.width=o.size.width=e/r,o.defaultFrame.height=o.size.height=i/r,o},r.prototype.emptyPool=function(){for(var t in this.pool){var e=this.pool[t];if(e)for(var i=0;i<e.length;i++)e[i].destroy(!0)}this.pool={}},r.prototype.freePotRenderTarget=function(t){var e=t.size.width*t.resolution,i=t.size.height*t.resolution,r=(65535&e)<<16|65535&i;this.pool[r].push(t)}},{"../../../Shader":77,"../../../math":102,"../filters/filterTransforms":120,"../utils/Quad":127,"../utils/RenderTarget":128,"./WebGLManager":125,"bit-twiddle":1}],123:[function(t,e,i){function r(t){s.call(this,t),this.scissor=!1,this.scissorData=null,this.scissorRenderTarget=null,this.enableScissor=!0,this.alphaMaskPool=[],this.alphaMaskIndex=0}var s=t("./WebGLManager"),n=t("../filters/spriteMask/SpriteMaskFilter");r.prototype=Object.create(s.prototype),r.prototype.constructor=r,e.exports=r,r.prototype.pushMask=function(t,e){if(e.texture)this.pushSpriteMask(t,e);else if(this.enableScissor&&!this.scissor&&!this.renderer.stencilManager.stencilMaskStack.length&&e.isFastRect()){var i=e.worldTransform,r=Math.atan2(i.b,i.a);r=Math.round(r*(180/Math.PI)),r%90?this.pushStencilMask(e):this.pushScissorMask(t,e)}else this.pushStencilMask(e)},r.prototype.popMask=function(t,e){e.texture?this.popSpriteMask(t,e):this.enableScissor&&!this.renderer.stencilManager.stencilMaskStack.length?this.popScissorMask(t,e):this.popStencilMask(t,e)},r.prototype.pushSpriteMask=function(t,e){var i=this.alphaMaskPool[this.alphaMaskIndex];i||(i=this.alphaMaskPool[this.alphaMaskIndex]=[new n(e)]),i[0].resolution=this.renderer.resolution,i[0].maskSprite=e,t.filterArea=e.getBounds(!0),this.renderer.filterManager.pushFilter(t,i),this.alphaMaskIndex++},r.prototype.popSpriteMask=function(){this.renderer.filterManager.popFilter(),this.alphaMaskIndex--},r.prototype.pushStencilMask=function(t){this.renderer.currentRenderer.stop(),this.renderer.stencilManager.pushStencil(t)},r.prototype.popStencilMask=function(){this.renderer.currentRenderer.stop(),this.renderer.stencilManager.popStencil()},r.prototype.pushScissorMask=function(t,e){e.renderable=!0;var i=this.renderer._activeRenderTarget,r=e.getBounds();r.fit(i.size),e.renderable=!1,this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST);var s=this.renderer.resolution;this.renderer.gl.scissor(r.x*s,(i.root?i.size.height-r.y-r.height:r.y)*s,r.width*s,r.height*s),this.scissorRenderTarget=i,this.scissorData=e,this.scissor=!0},r.prototype.popScissorMask=function(){this.scissorRenderTarget=null,this.scissorData=null,this.scissor=!1;var t=this.renderer.gl;t.disable(t.SCISSOR_TEST)}},{"../filters/spriteMask/SpriteMaskFilter":121,"./WebGLManager":125}],124:[function(t,e,i){function r(t){s.call(this,t),this.stencilMaskStack=null}var s=t("./WebGLManager");r.prototype=Object.create(s.prototype),r.prototype.constructor=r,e.exports=r,r.prototype.setMaskStack=function(t){this.stencilMaskStack=t;var e=this.renderer.gl;0===t.length?e.disable(e.STENCIL_TEST):e.enable(e.STENCIL_TEST)},r.prototype.pushStencil=function(t){this.renderer.setObjectRenderer(this.renderer.plugins.graphics),this.renderer._activeRenderTarget.attachStencilBuffer();var e=this.renderer.gl,i=this.stencilMaskStack;0===i.length&&(e.enable(e.STENCIL_TEST),e.clear(e.STENCIL_BUFFER_BIT),e.stencilFunc(e.ALWAYS,1,1)),i.push(t),e.colorMask(!1,!1,!1,!1),e.stencilOp(e.KEEP,e.KEEP,e.INCR),this.renderer.plugins.graphics.render(t),e.colorMask(!0,!0,!0,!0),e.stencilFunc(e.NOTEQUAL,0,i.length),e.stencilOp(e.KEEP,e.KEEP,e.KEEP)},r.prototype.popStencil=function(){this.renderer.setObjectRenderer(this.renderer.plugins.graphics);var t=this.renderer.gl,e=this.stencilMaskStack,i=e.pop();0===e.length?t.disable(t.STENCIL_TEST):(t.colorMask(!1,!1,!1,!1),t.stencilOp(t.KEEP,t.KEEP,t.DECR),this.renderer.plugins.graphics.render(i),t.colorMask(!0,!0,!0,!0),t.stencilFunc(t.NOTEQUAL,0,e.length),t.stencilOp(t.KEEP,t.KEEP,t.KEEP))},r.prototype.destroy=function(){s.prototype.destroy.call(this),this.stencilMaskStack.stencilStack=null}},{"./WebGLManager":125}],125:[function(t,e,i){function r(t){this.renderer=t,this.renderer.on("context",this.onContextChange,this)}r.prototype.constructor=r,e.exports=r,r.prototype.onContextChange=function(){},r.prototype.destroy=function(){this.renderer.off("context",this.onContextChange,this),this.renderer=null}},{}],126:[function(t,e,i){function r(t){s.call(this,t)}var s=t("../managers/WebGLManager");r.prototype=Object.create(s.prototype),r.prototype.constructor=r,e.exports=r,r.prototype.start=function(){},r.prototype.stop=function(){this.flush()},r.prototype.flush=function(){},r.prototype.render=function(t){}},{"../managers/WebGLManager":125}],127:[function(t,e,i){function r(t,e){this.gl=t,this.vertices=new Float32Array([-1,-1,1,-1,1,1,-1,1]),this.uvs=new Float32Array([0,0,1,0,1,1,0,1]),this.interleaved=new Float32Array(16);for(var i=0;4>i;i++)this.interleaved[4*i]=this.vertices[2*i],this.interleaved[4*i+1]=this.vertices[2*i+1],this.interleaved[4*i+2]=this.uvs[2*i],this.interleaved[4*i+3]=this.uvs[2*i+1];this.indices=n(1),this.vertexBuffer=s.GLBuffer.createVertexBuffer(t,this.interleaved,t.STATIC_DRAW),this.indexBuffer=s.GLBuffer.createIndexBuffer(t,this.indices,t.STATIC_DRAW),this.vao=new s.VertexArrayObject(t,e)}var s=t("pixi-gl-core"),n=t("../../../utils/createIndicesForQuads");r.prototype.constructor=r,r.prototype.initVao=function(t){this.vao.clear().addIndex(this.indexBuffer).addAttribute(this.vertexBuffer,t.attributes.aVertexPosition,this.gl.FLOAT,!1,16,0).addAttribute(this.vertexBuffer,t.attributes.aTextureCoord,this.gl.FLOAT,!1,16,8)},r.prototype.map=function(t,e){var i=0,r=0;return this.uvs[0]=i,this.uvs[1]=r,this.uvs[2]=i+e.width/t.width,this.uvs[3]=r,this.uvs[4]=i+e.width/t.width,this.uvs[5]=r+e.height/t.height,this.uvs[6]=i,this.uvs[7]=r+e.height/t.height,i=e.x,r=e.y,this.vertices[0]=i,this.vertices[1]=r,this.vertices[2]=i+e.width,this.vertices[3]=r,this.vertices[4]=i+e.width,this.vertices[5]=r+e.height,this.vertices[6]=i,this.vertices[7]=r+e.height,this},r.prototype.draw=function(){return this.vao.bind().draw(this.gl.TRIANGLES,6,0).unbind(),this},r.prototype.upload=function(){for(var t=0;4>t;t++)this.interleaved[4*t]=this.vertices[2*t],this.interleaved[4*t+1]=this.vertices[2*t+1],this.interleaved[4*t+2]=this.uvs[2*t],this.interleaved[4*t+3]=this.uvs[2*t+1];return this.vertexBuffer.upload(this.interleaved),this},r.prototype.destroy=function(){var t=this.gl;t.deleteBuffer(this.vertexBuffer),t.deleteBuffer(this.indexBuffer)},e.exports=r},{"../../../utils/createIndicesForQuads":149,"pixi-gl-core":12}],128:[function(t,e,i){var r=t("../../../math"),s=t("../../../const"),n=t("pixi-gl-core").GLFramebuffer,o=function(t,e,i,o,a,h){this.gl=t,this.frameBuffer=null,this.texture=null,this.clearColor=[0,0,0,0],this.size=new r.Rectangle(0,0,1,1),this.resolution=a||s.RESOLUTION,this.projectionMatrix=new r.Matrix,this.transform=null,this.frame=null,this.defaultFrame=new r.Rectangle,this.destinationFrame=null,this.sourceFrame=null,this.stencilBuffer=null,this.stencilMaskStack=[],this.filterData=null,this.scaleMode=o||s.SCALE_MODES.DEFAULT,this.root=h,this.root?(this.frameBuffer=new n(t,100,100),this.frameBuffer.framebuffer=null):(this.frameBuffer=n.createRGBA(t,100,100),this.scaleMode===s.SCALE_MODES.NEAREST?this.frameBuffer.texture.enableNearestScaling():this.frameBuffer.texture.enableLinearScaling(),this.texture=this.frameBuffer.texture),this.setFrame(),this.resize(e,i)};o.prototype.constructor=o,e.exports=o,o.prototype.clear=function(t){var e=t||this.clearColor;this.frameBuffer.clear(e[0],e[1],e[2],e[3])},o.prototype.attachStencilBuffer=function(){this.root||this.frameBuffer.enableStencil()},o.prototype.setFrame=function(t,e){this.destinationFrame=t||this.destinationFrame||this.defaultFrame,this.sourceFrame=e||this.sourceFrame||t},o.prototype.activate=function(){var t=this.gl;this.frameBuffer.bind(),this.calculateProjection(this.destinationFrame,this.sourceFrame),this.transform&&this.projectionMatrix.append(this.transform),this.destinationFrame!==this.sourceFrame?(t.enable(t.SCISSOR_TEST),t.scissor(0|this.destinationFrame.x,0|this.destinationFrame.y,this.destinationFrame.width*this.resolution|0,this.destinationFrame.height*this.resolution|0)):t.disable(t.SCISSOR_TEST),t.viewport(0|this.destinationFrame.x,0|this.destinationFrame.y,this.destinationFrame.width*this.resolution|0,this.destinationFrame.height*this.resolution|0)},o.prototype.calculateProjection=function(t,e){var i=this.projectionMatrix;e=e||t,i.identity(),this.root?(i.a=1/t.width*2,i.d=-1/t.height*2,i.tx=-1-e.x*i.a,i.ty=1-e.y*i.d):(i.a=1/t.width*2,i.d=1/t.height*2,i.tx=-1-e.x*i.a,i.ty=-1-e.y*i.d)},o.prototype.resize=function(t,e){if(t|=0,e|=0,this.size.width!==t||this.size.height!==e){this.size.width=t,this.size.height=e,this.defaultFrame.width=t,this.defaultFrame.height=e,this.frameBuffer.resize(t*this.resolution,e*this.resolution);var i=this.frame||this.size;this.calculateProjection(i)}},o.prototype.destroy=function(){this.frameBuffer.destroy(),this.frameBuffer=null,this.texture=null}},{"../../../const":78,"../../../math":102,"pixi-gl-core":12}],129:[function(t,e,i){function r(t){for(var e="",i=0;t>i;i++)i>0&&(e+="\nelse "),t-1>i&&(e+="if(test == "+i+".0){}");return e}var s=t("pixi-gl-core"),n=["precision mediump float;","void main(void){","float test = 0.1;","%forloop%","gl_FragColor = vec4(0.0);","}"].join("\n"),o=function(t,e){var i=!e;if(i){var o=document.createElement("canvas");o.width=1,o.height=1,e=s.createContext(o)}for(var a=e.createShader(e.FRAGMENT_SHADER);;){var h=n.replace(/%forloop%/gi,r(t));if(e.shaderSource(a,h),e.compileShader(a),e.getShaderParameter(a,e.COMPILE_STATUS))break;t=t/2|0}return i&&e.getExtension("WEBGL_lose_context")&&e.getExtension("WEBGL_lose_context").loseContext(),t};e.exports=o},{"pixi-gl-core":12}],130:[function(t,e,i){function r(t,e){return e=e||[],e[s.BLEND_MODES.NORMAL]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[s.BLEND_MODES.ADD]=[t.ONE,t.DST_ALPHA],e[s.BLEND_MODES.MULTIPLY]=[t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA],e[s.BLEND_MODES.SCREEN]=[t.ONE,t.ONE_MINUS_SRC_COLOR],e[s.BLEND_MODES.OVERLAY]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[s.BLEND_MODES.DARKEN]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[s.BLEND_MODES.LIGHTEN]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[s.BLEND_MODES.COLOR_DODGE]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[s.BLEND_MODES.COLOR_BURN]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[s.BLEND_MODES.HARD_LIGHT]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[s.BLEND_MODES.SOFT_LIGHT]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[s.BLEND_MODES.DIFFERENCE]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[s.BLEND_MODES.EXCLUSION]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[s.BLEND_MODES.HUE]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[s.BLEND_MODES.SATURATION]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[s.BLEND_MODES.COLOR]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[s.BLEND_MODES.LUMINOSITY]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e}var s=t("../../../const");e.exports=r},{"../../../const":78}],131:[function(t,e,i){function r(t,e){e=e||{},e[s.DRAW_MODES.POINTS]=t.POINTS,e[s.DRAW_MODES.LINES]=t.LINES,e[s.DRAW_MODES.LINE_LOOP]=t.LINE_LOOP,e[s.DRAW_MODES.LINE_STRIP]=t.LINE_STRIP,e[s.DRAW_MODES.TRIANGLES]=t.TRIANGLES,e[s.DRAW_MODES.TRIANGLE_STRIP]=t.TRIANGLE_STRIP,e[s.DRAW_MODES.TRIANGLE_FAN]=t.TRIANGLE_FAN}var s=t("../../../const");e.exports=r},{"../../../const":78}],132:[function(t,e,i){function r(t){t.getContextAttributes().stencil||console.warn("Provided WebGL context does not have a stencil buffer, masks may not render correctly")}e.exports=r},{}],133:[function(t,e,i){function r(t){o.call(this),this.anchor=new s.ObservablePoint(this.onAnchorUpdate,this),this._texture=null,this._width=0,this._height=0,this._tint=null,this._tintRGB=null,this.tint=16777215,this.blendMode=h.BLEND_MODES.NORMAL,this.shader=null,this.cachedTint=16777215,this.texture=t||n.EMPTY,this.vertexData=new Float32Array(8),this.vertexTrimmedData=null,this._transformID=-1,this._textureID=-1}var s=t("../math"),n=t("../textures/Texture"),o=t("../display/Container"),a=t("../utils"),h=t("../const"),l=new s.Point;r.prototype=Object.create(o.prototype),r.prototype.constructor=r,e.exports=r,Object.defineProperties(r.prototype,{width:{get:function(){return Math.abs(this.scale.x)*this.texture.orig.width},set:function(t){var e=a.sign(this.scale.x)||1;this.scale.x=e*t/this.texture.orig.width,this._width=t}},height:{get:function(){return Math.abs(this.scale.y)*this.texture.orig.height},set:function(t){var e=a.sign(this.scale.y)||1;this.scale.y=e*t/this.texture.orig.height,this._height=t}},tint:{get:function(){return this._tint},set:function(t){this._tint=t,this._tintRGB=(t>>16)+(65280&t)+((255&t)<<16)}},texture:{get:function(){return this._texture},set:function(t){this._texture!==t&&(this._texture=t,this.cachedTint=16777215,this._textureID=-1,t&&(t.baseTexture.hasLoaded?this._onTextureUpdate():t.once("update",this._onTextureUpdate,this)))}}}),r.prototype._onTextureUpdate=function(){this._textureID=-1,this._width&&(this.scale.x=a.sign(this.scale.x)*this._width/this.texture.orig.width),this._height&&(this.scale.y=a.sign(this.scale.y)*this._height/this.texture.orig.height)},r.prototype.onAnchorUpdate=function(){this._transformID=-1},r.prototype.calculateVertices=function(){if(this._transformID!==this.transform._worldID||this._textureID!==this._texture._updateID){this._transformID=this.transform._worldID,this._textureID=this._texture._updateID
    ;var t,e,i,r,s=this._texture,n=this.transform.worldTransform,o=n.a,a=n.b,h=n.c,l=n.d,u=n.tx,c=n.ty,d=this.vertexData,p=s.trim,f=s.orig;p?(e=p.x-this.anchor._x*f.width,t=e+p.width,r=p.y-this.anchor._y*f.height,i=r+p.height):(t=f.width*(1-this.anchor._x),e=f.width*-this.anchor._x,i=f.height*(1-this.anchor._y),r=f.height*-this.anchor._y),d[0]=o*e+h*r+u,d[1]=l*r+a*e+c,d[2]=o*t+h*r+u,d[3]=l*r+a*t+c,d[4]=o*t+h*i+u,d[5]=l*i+a*t+c,d[6]=o*e+h*i+u,d[7]=l*i+a*e+c}},r.prototype.calculateTrimmedVertices=function(){this.vertexTrimmedData||(this.vertexTrimmedData=new Float32Array(8));var t,e,i,r,s=this._texture,n=this.vertexTrimmedData,o=s.orig,a=this.transform.worldTransform,h=a.a,l=a.b,u=a.c,c=a.d,d=a.tx,p=a.ty;t=o.width*(1-this.anchor._x),e=o.width*-this.anchor._x,i=o.height*(1-this.anchor._y),r=o.height*-this.anchor._y,n[0]=h*e+u*r+d,n[1]=c*r+l*e+p,n[2]=h*t+u*r+d,n[3]=c*r+l*t+p,n[4]=h*t+u*i+d,n[5]=c*i+l*t+p,n[6]=h*e+u*i+d,n[7]=c*i+l*e+p},r.prototype._renderWebGL=function(t){this.calculateVertices(),t.setObjectRenderer(t.plugins.sprite),t.plugins.sprite.render(this)},r.prototype._renderCanvas=function(t){t.plugins.sprite.render(this)},r.prototype._calculateBounds=function(){var t=this._texture.trim,e=this._texture.orig;!t||t.width===e.width&&t.height===e.height?(this.calculateVertices(),this._bounds.addQuad(this.vertexData)):(this.calculateTrimmedVertices(),this._bounds.addQuad(this.vertexTrimmedData))},r.prototype.getLocalBounds=function(t){return 0===this.children.length?(this._bounds.minX=-this._texture.orig.width*this.anchor._x,this._bounds.minY=-this._texture.orig.height*this.anchor._y,this._bounds.maxX=this._texture.orig.width,this._bounds.maxY=this._texture.orig.height,t||(this._localBoundsRect||(this._localBoundsRect=new s.Rectangle),t=this._localBoundsRect),this._bounds.getRectangle(t)):o.prototype.getLocalBounds.call(this,t)},r.prototype.containsPoint=function(t){this.worldTransform.applyInverse(t,l);var e,i=this._texture.orig.width,r=this._texture.orig.height,s=-i*this.anchor.x;return l.x>s&&l.x<s+i&&(e=-r*this.anchor.y,l.y>e&&l.y<e+r)},r.prototype.destroy=function(t){if(o.prototype.destroy.call(this,t),this.anchor=null,"boolean"==typeof t?t:t&&t.texture){var e="boolean"==typeof t?t:t&&t.baseTexture;this._texture.destroy(!!e)}this._texture=null,this.shader=null},r.from=function(t){return new r(n.from(t))},r.fromFrame=function(t){var e=a.TextureCache[t];if(!e)throw new Error('The frameId "'+t+'" does not exist in the texture cache');return new r(e)},r.fromImage=function(t,e,i){return new r(n.fromImage(t,e,i))}},{"../const":78,"../display/Container":80,"../math":102,"../textures/Texture":144,"../utils":151}],134:[function(t,e,i){function r(t){this.renderer=t}var s=t("../../renderers/canvas/CanvasRenderer"),n=t("../../const"),o=t("../../math"),a=new o.Matrix,h=t("./CanvasTinter");r.prototype.constructor=r,e.exports=r,s.registerPlugin("sprite",r),r.prototype.render=function(t){var e,i,r=t._texture,s=this.renderer,l=t.transform.worldTransform,u=r._frame.width,c=r._frame.height;if(!(r.orig.width<=0||r.orig.height<=0)&&r.baseTexture.source&&(s.setBlendMode(t.blendMode),r.valid)){s.context.globalAlpha=t.worldAlpha;var d=r.baseTexture.scaleMode===n.SCALE_MODES.LINEAR;s.smoothProperty&&s.context[s.smoothProperty]!==d&&(s.context[s.smoothProperty]=d),r.trim?(e=r.trim.width/2+r.trim.x-t.anchor.x*r.orig.width,i=r.trim.height/2+r.trim.y-t.anchor.y*r.orig.height):(e=(.5-t.anchor.x)*r.orig.width,i=(.5-t.anchor.y)*r.orig.height),r.rotate&&(l.copy(a),l=a,o.GroupD8.matrixAppendRotationInv(l,r.rotate,e,i),e=0,i=0),e-=u/2,i-=c/2,s.roundPixels?(s.context.setTransform(l.a,l.b,l.c,l.d,l.tx*s.resolution|0,l.ty*s.resolution|0),e|=0,i|=0):s.context.setTransform(l.a,l.b,l.c,l.d,l.tx*s.resolution,l.ty*s.resolution);var p=r.baseTexture.resolution;16777215!==t.tint?(t.cachedTint!==t.tint&&(t.cachedTint=t.tint,t.tintedTexture=h.getTintedTexture(t,t.tint)),s.context.drawImage(t.tintedTexture,0,0,u*p,c*p,e*s.resolution,i*s.resolution,u*s.resolution,c*s.resolution)):s.context.drawImage(r.baseTexture.source,r._frame.x*p,r._frame.y*p,u*p,c*p,e*s.resolution,i*s.resolution,u*s.resolution,c*s.resolution)}},r.prototype.destroy=function(){this.renderer=null}},{"../../const":78,"../../math":102,"../../renderers/canvas/CanvasRenderer":109,"./CanvasTinter":135}],135:[function(t,e,i){var r=t("../../utils"),s=t("../../renderers/canvas/utils/canUseNewCanvasBlendModes"),n=e.exports={getTintedTexture:function(t,e){var i=t.texture;e=n.roundColor(e);var r="#"+("00000"+(0|e).toString(16)).substr(-6);if(i.tintCache=i.tintCache||{},i.tintCache[r])return i.tintCache[r];var s=n.canvas||document.createElement("canvas");if(n.tintMethod(i,e,s),n.convertTintToImage){var o=new Image;o.src=s.toDataURL(),i.tintCache[r]=o}else i.tintCache[r]=s,n.canvas=null;return s},tintWithMultiply:function(t,e,i){var r=i.getContext("2d"),s=t._frame.clone(),n=t.baseTexture.resolution;s.x*=n,s.y*=n,s.width*=n,s.height*=n,i.width=s.width,i.height=s.height,r.fillStyle="#"+("00000"+(0|e).toString(16)).substr(-6),r.fillRect(0,0,s.width,s.height),r.globalCompositeOperation="multiply",r.drawImage(t.baseTexture.source,s.x,s.y,s.width,s.height,0,0,s.width,s.height),r.globalCompositeOperation="destination-atop",r.drawImage(t.baseTexture.source,s.x,s.y,s.width,s.height,0,0,s.width,s.height)},tintWithOverlay:function(t,e,i){var r=i.getContext("2d"),s=t._frame.clone(),n=t.baseTexture.resolution;s.x*=n,s.y*=n,s.width*=n,s.height*=n,i.width=s.width,i.height=s.height,r.globalCompositeOperation="copy",r.fillStyle="#"+("00000"+(0|e).toString(16)).substr(-6),r.fillRect(0,0,s.width,s.height),r.globalCompositeOperation="destination-atop",r.drawImage(t.baseTexture.source,s.x,s.y,s.width,s.height,0,0,s.width,s.height)},tintWithPerPixel:function(t,e,i){var s=i.getContext("2d"),n=t._frame.clone(),o=t.baseTexture.resolution;n.x*=o,n.y*=o,n.width*=o,n.height*=o,i.width=n.width,i.height=n.height,s.globalCompositeOperation="copy",s.drawImage(t.baseTexture.source,n.x,n.y,n.width,n.height,0,0,n.width,n.height);for(var a=r.hex2rgb(e),h=a[0],l=a[1],u=a[2],c=s.getImageData(0,0,n.width,n.height),d=c.data,p=0;p<d.length;p+=4)d[p+0]*=h,d[p+1]*=l,d[p+2]*=u;s.putImageData(c,0,0)},roundColor:function(t){var e=n.cacheStepsPerColorChannel,i=r.hex2rgb(t);return i[0]=Math.min(255,i[0]/e*e),i[1]=Math.min(255,i[1]/e*e),i[2]=Math.min(255,i[2]/e*e),r.rgb2hex(i)},cacheStepsPerColorChannel:8,convertTintToImage:!1,canUseMultiply:s(),tintMethod:0};n.tintMethod=n.canUseMultiply?n.tintWithMultiply:n.tintWithPerPixel},{"../../renderers/canvas/utils/canUseNewCanvasBlendModes":112,"../../utils":151}],136:[function(t,e,i){var r=function(t){this.vertices=new ArrayBuffer(t),this.float32View=new Float32Array(this.vertices),this.uint32View=new Uint32Array(this.vertices)};e.exports=r,r.prototype.destroy=function(){this.vertices=null,this.positions=null,this.uvs=null,this.colors=null}},{}],137:[function(t,e,i){function r(t){s.call(this,t),this.vertSize=5,this.vertByteSize=4*this.vertSize,this.size=u.SPRITE_BATCH_SIZE,this.buffers=[];for(var e=1;e<=d.nextPow2(this.size);e*=2){var i=4*e*this.vertByteSize;this.buffers.push(new l(i))}this.indices=o(this.size),this.shaders=null,this.currentIndex=0,p=0,this.groups=[];for(var r=0;r<this.size;r++)this.groups[r]={textures:[],textureCount:0,ids:[],size:0,start:0,blend:0};this.sprites=[],this.vertexBuffers=[],this.vaos=[],this.vaoMax=2,this.vertexCount=0,this.renderer.on("prerender",this.onPrerender,this)}var s=t("../../renderers/webgl/utils/ObjectRenderer"),n=t("../../renderers/webgl/WebGLRenderer"),o=t("../../utils/createIndicesForQuads"),a=t("./generateMultiTextureShader"),h=t("../../renderers/webgl/utils/checkMaxIfStatmentsInShader"),l=t("./BatchBuffer"),u=t("../../const"),c=t("pixi-gl-core"),d=t("bit-twiddle"),p=0;r.prototype=Object.create(s.prototype),r.prototype.constructor=r,e.exports=r,n.registerPlugin("sprite",r),r.prototype.onContextChange=function(){var t=this.renderer.gl;this.MAX_TEXTURES=Math.min(t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),u.SPRITE_MAX_TEXTURES),this.MAX_TEXTURES=h(this.MAX_TEXTURES,t),this.shaders=new Array(this.MAX_TEXTURES),this.shaders[0]=a(t,1),this.shaders[1]=a(t,2),this.indexBuffer=c.GLBuffer.createIndexBuffer(t,this.indices,t.STATIC_DRAW);for(var e=this.shaders[1],i=0;i<this.vaoMax;i++)this.vertexBuffers[i]=c.GLBuffer.createVertexBuffer(t,null,t.STREAM_DRAW),this.vaos[i]=this.renderer.createVao().addIndex(this.indexBuffer).addAttribute(this.vertexBuffers[i],e.attributes.aVertexPosition,t.FLOAT,!1,this.vertByteSize,0).addAttribute(this.vertexBuffers[i],e.attributes.aTextureCoord,t.UNSIGNED_SHORT,!0,this.vertByteSize,8).addAttribute(this.vertexBuffers[i],e.attributes.aColor,t.UNSIGNED_BYTE,!0,this.vertByteSize,12).addAttribute(this.vertexBuffers[i],e.attributes.aTextureId,t.FLOAT,!1,this.vertByteSize,16);this.vao=this.vaos[0],this.currentBlendMode=99999},r.prototype.onPrerender=function(){this.vertexCount=0},r.prototype.render=function(t){this.currentIndex>=this.size&&this.flush(),t.texture._uvs&&(this.sprites[this.currentIndex++]=t)},r.prototype.flush=function(){if(0!==this.currentIndex){var t,e,i,r,s,n,o,h=this.renderer.gl,l=d.nextPow2(this.currentIndex),u=d.log2(l),f=this.buffers[u],v=this.sprites,_=this.groups,g=f.float32View,m=f.uint32View,y=0,x=1,b=0,T=_[0],w=v[0].blendMode;T.textureCount=0,T.start=0,T.blend=w,p++;for(var E=0;E<this.currentIndex;E++){var S=v[E];if(t=S._texture.baseTexture,w!==S.blendMode&&(w=S.blendMode,e=null,b=this.MAX_TEXTURES,p++),e!==t&&(e=t,t._enabled!==p&&(b===this.MAX_TEXTURES&&(p++,b=0,T.size=E-T.start,T=_[x++],T.textureCount=0,T.blend=w,T.start=E),t._enabled=p,t._id=b,T.textures[T.textureCount++]=t,b++)),i=S.vertexData,r=S._tintRGB+(255*S.worldAlpha<<24),s=S._texture._uvs.uvsUint32,n=t._id,this.renderer.roundPixels){var A=this.renderer.resolution;g[y]=(i[0]*A|0)/A,g[y+1]=(i[1]*A|0)/A,g[y+5]=(i[2]*A|0)/A,g[y+6]=(i[3]*A|0)/A,g[y+10]=(i[4]*A|0)/A,g[y+11]=(i[5]*A|0)/A,g[y+15]=(i[6]*A|0)/A,g[y+16]=(i[7]*A|0)/A}else g[y]=i[0],g[y+1]=i[1],g[y+5]=i[2],g[y+6]=i[3],g[y+10]=i[4],g[y+11]=i[5],g[y+15]=i[6],g[y+16]=i[7];m[y+2]=s[0],m[y+7]=s[1],m[y+12]=s[2],m[y+17]=s[3],m[y+3]=m[y+8]=m[y+13]=m[y+18]=r,g[y+4]=g[y+9]=g[y+14]=g[y+19]=n,y+=20}for(T.size=E-T.start,this.vertexCount++,this.vaoMax<=this.vertexCount&&(this.vaoMax++,o=this.shaders[1],this.vertexBuffers[this.vertexCount]=c.GLBuffer.createVertexBuffer(h,null,h.STREAM_DRAW),this.vaos[this.vertexCount]=this.renderer.createVao().addIndex(this.indexBuffer).addAttribute(this.vertexBuffers[this.vertexCount],o.attributes.aVertexPosition,h.FLOAT,!1,this.vertByteSize,0).addAttribute(this.vertexBuffers[this.vertexCount],o.attributes.aTextureCoord,h.UNSIGNED_SHORT,!0,this.vertByteSize,8).addAttribute(this.vertexBuffers[this.vertexCount],o.attributes.aColor,h.UNSIGNED_BYTE,!0,this.vertByteSize,12).addAttribute(this.vertexBuffers[this.vertexCount],o.attributes.aTextureId,h.FLOAT,!1,this.vertByteSize,16)),this.vertexBuffers[this.vertexCount].upload(f.vertices,0),this.vao=this.vaos[this.vertexCount].bind(),E=0;x>E;E++){var R=_[E],O=R.textureCount;o=this.shaders[O-1],o||(o=this.shaders[O-1]=a(h,O)),this.renderer.bindShader(o);for(var P=0;O>P;P++)this.renderer.bindTexture(R.textures[P],P);this.renderer.state.setBlendMode(R.blend),h.drawElements(h.TRIANGLES,6*R.size,h.UNSIGNED_SHORT,6*R.start*2)}this.currentIndex=0}},r.prototype.start=function(){},r.prototype.stop=function(){this.flush(),this.vao.unbind()},r.prototype.destroy=function(){for(var t=0;t<this.vaoMax;t++)this.vertexBuffers[t].destroy(),this.vaos[t].destroy();for(this.indexBuffer.destroy(),this.renderer.off("prerender",this.onPrerender,this),s.prototype.destroy.call(this),t=0;t<this.shaders.length;t++)this.shaders[t]&&this.shaders[t].destroy();for(this.vertexBuffers=null,this.vaos=null,this.indexBuffer=null,this.indices=null,this.sprites=null,t=0;t<this.buffers.length;t++)this.buffers[t].destroy()}},{"../../const":78,"../../renderers/webgl/WebGLRenderer":116,"../../renderers/webgl/utils/ObjectRenderer":126,"../../renderers/webgl/utils/checkMaxIfStatmentsInShader":129,"../../utils/createIndicesForQuads":149,"./BatchBuffer":136,"./generateMultiTextureShader":138,"bit-twiddle":1,"pixi-gl-core":12}],138:[function(t,e,i){function r(t,e){var i="#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\nattribute float aTextureId;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\n\nvoid main(void){\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n   vTextureId = aTextureId;\n   vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n",r=o;r=r.replace(/%count%/gi,e),r=r.replace(/%forloop%/gi,s(e));for(var a=new n(t,i,r),h=[],l=0;e>l;l++)h[l]=l;return a.bind(),a.uniforms.uSamplers=h,a}function s(t){var e="";e+="\n",e+="\n";for(var i=0;t>i;i++)i>0&&(e+="\nelse "),t-1>i&&(e+="if(textureId == "+i+".0)"),e+="\n{",e+="\n\tcolor = texture2D(uSamplers["+i+"], vTextureCoord);",e+="\n}";return e+="\n",e+="\n"}var n=t("../../Shader"),o=["varying vec2 vTextureCoord;","varying vec4 vColor;","varying float vTextureId;","uniform sampler2D uSamplers[%count%];","void main(void){","vec4 color;","float textureId = floor(vTextureId+0.5);","%forloop%","gl_FragColor = color * vColor;","}"].join("\n");e.exports=r},{"../../Shader":77}],139:[function(t,e,i){function r(t,e){this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.resolution=h.RESOLUTION,this._text=null,this._style=null,this._styleListener=null,this._font="";var i=n.fromCanvas(this.canvas);i.orig=new o.Rectangle,i.trim=new o.Rectangle,s.call(this,i),this.text=t,this.style=e,this.localStyleID=-1}var s=t("../sprites/Sprite"),n=t("../textures/Texture"),o=t("../math"),a=t("../utils"),h=t("../const"),l=t("./TextStyle"),u={texture:!0,children:!1,baseTexture:!0};r.prototype=Object.create(s.prototype),r.prototype.constructor=r,e.exports=r,r.fontPropertiesCache={},r.fontPropertiesCanvas=document.createElement("canvas"),r.fontPropertiesContext=r.fontPropertiesCanvas.getContext("2d"),Object.defineProperties(r.prototype,{width:{get:function(){return this.updateText(!0),Math.abs(this.scale.x)*this.texture.orig.width},set:function(t){this.updateText(!0);var e=a.sign(this.scale.x)||1;this.scale.x=e*t/this.texture.orig.width,this._width=t}},height:{get:function(){return this.updateText(!0),Math.abs(this.scale.y)*this._texture.orig.height},set:function(t){this.updateText(!0);var e=a.sign(this.scale.x)||1;this.scale.x=e*t/this.texture.orig.width,this._width=t}},style:{get:function(){return this._style},set:function(t){t=t||{},this._style=t instanceof l?t:new l(t),this.localStyleID=-1,this.dirty=!0}},text:{get:function(){return this._text},set:function(t){t=t||" ",t=t.toString(),this._text!==t&&(this._text=t,this.dirty=!0)}}}),r.prototype.updateText=function(t){var e=this._style;if(this.localStyleID!==e.styleID&&(this.dirty=!0,this.localStyleID=e.styleID),this.dirty||!t){var i="number"==typeof e.fontSize?e.fontSize+"px":e.fontSize;this._font=e.fontStyle+" "+e.fontVariant+" "+e.fontWeight+" "+i+" "+e.fontFamily,this.context.font=this._font;var r,s=e.wordWrap?this.wordWrap(this._text):this._text,n=s.split(/(?:\r\n|\r|\n)/),o=new Array(n.length),a=0,h=this.determineFontProperties(this._font);for(r=0;r<n.length;r++){var l=this.context.measureText(n[r]).width+(n[r].length-1)*e.letterSpacing;o[r]=l,a=Math.max(a,l)}var u=a+e.strokeThickness;e.dropShadow&&(u+=e.dropShadowDistance),u+=2*e.padding,this.canvas.width=Math.ceil((u+this.context.lineWidth)*this.resolution);var c=this.style.lineHeight||h.fontSize+e.strokeThickness,d=Math.max(c,h.fontSize+e.strokeThickness)+(n.length-1)*c;e.dropShadow&&(d+=e.dropShadowDistance),this.canvas.height=Math.ceil((d+2*this._style.padding)*this.resolution),this.context.scale(this.resolution,this.resolution),navigator.isCocoonJS&&this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.context.font=this._font,this.context.strokeStyle=e.stroke,this.context.lineWidth=e.strokeThickness,this.context.textBaseline=e.textBaseline,this.context.lineJoin=e.lineJoin,this.context.miterLimit=e.miterLimit;var p,f;if(e.dropShadow){e.dropShadowBlur>0?(this.context.shadowColor=e.dropShadowColor,this.context.shadowBlur=e.dropShadowBlur):this.context.fillStyle=e.dropShadowColor;var v=Math.cos(e.dropShadowAngle)*e.dropShadowDistance,_=Math.sin(e.dropShadowAngle)*e.dropShadowDistance;for(r=0;r<n.length;r++)p=e.strokeThickness/2,f=e.strokeThickness/2+r*c+h.ascent,"right"===e.align?p+=a-o[r]:"center"===e.align&&(p+=(a-o[r])/2),e.fill&&(this.drawLetterSpacing(n[r],p+v+e.padding,f+_+e.padding),e.stroke&&e.strokeThickness&&(this.context.strokeStyle=e.dropShadowColor,this.drawLetterSpacing(n[r],p+v+e.padding,f+_+e.padding,!0),this.context.strokeStyle=e.stroke))}for(this.context.fillStyle=this._generateFillStyle(e,n),r=0;r<n.length;r++)p=e.strokeThickness/2,f=e.strokeThickness/2+r*c+h.ascent,"right"===e.align?p+=a-o[r]:"center"===e.align&&(p+=(a-o[r])/2),e.stroke&&e.strokeThickness&&this.drawLetterSpacing(n[r],p+e.padding,f+e.padding,!0),e.fill&&this.drawLetterSpacing(n[r],p+e.padding,f+e.padding);this.updateTexture()}},r.prototype.drawLetterSpacing=function(t,e,i,r){var s=this._style,n=s.letterSpacing;if(0===n)return void(r?this.context.strokeText(t,e,i):this.context.fillText(t,e,i));for(var o,a=String.prototype.split.call(t,""),h=0,l=e;h<t.length;)o=a[h++],r?this.context.strokeText(o,l,i):this.context.fillText(o,l,i),l+=this.context.measureText(o).width+n},r.prototype.updateTexture=function(){var t=this._texture,e=this._style;t.baseTexture.hasLoaded=!0,t.baseTexture.resolution=this.resolution,t.baseTexture.realWidth=this.canvas.width,t.baseTexture.realHeight=this.canvas.height,t.baseTexture.width=this.canvas.width/this.resolution,t.baseTexture.height=this.canvas.height/this.resolution,t.trim.width=t._frame.width=this.canvas.width/this.resolution,t.trim.height=t._frame.height=this.canvas.height/this.resolution,t.trim.x=-e.padding,t.trim.y=-e.padding,t.orig.width=t._frame.width,t.orig.height=t._frame.height-2*e.padding,this._onTextureUpdate(),t.baseTexture.emit("update",t.baseTexture),this.dirty=!1},r.prototype.renderWebGL=function(t){this.resolution!==t.resolution&&(this.resolution=t.resolution,this.dirty=!0),this.updateText(!0),s.prototype.renderWebGL.call(this,t)},r.prototype._renderCanvas=function(t){this.resolution!==t.resolution&&(this.resolution=t.resolution,this.dirty=!0),this.updateText(!0),s.prototype._renderCanvas.call(this,t)},r.prototype.determineFontProperties=function(t){var e=r.fontPropertiesCache[t];if(!e){e={};var i=r.fontPropertiesCanvas,s=r.fontPropertiesContext;s.font=t;var n=Math.ceil(s.measureText("|MÃ‰q").width),o=Math.ceil(s.measureText("M").width),a=2*o;o=1.4*o|0,i.width=n,i.height=a,s.fillStyle="#f00",s.fillRect(0,0,n,a),s.font=t,s.textBaseline="alphabetic",s.fillStyle="#000",s.fillText("|MÃ‰q",0,o);var h,l,u=s.getImageData(0,0,n,a).data,c=u.length,d=4*n,p=0,f=!1;for(h=0;o>h;h++){for(l=0;d>l;l+=4)if(255!==u[p+l]){f=!0;break}if(f)break;p+=d}for(e.ascent=o-h,p=c-d,f=!1,h=a;h>o;h--){for(l=0;d>l;l+=4)if(255!==u[p+l]){f=!0;break}if(f)break;p-=d}e.descent=h-o,e.fontSize=e.ascent+e.descent,r.fontPropertiesCache[t]=e}return e},r.prototype.wordWrap=function(t){for(var e="",i=t.split("\n"),r=this._style.wordWrapWidth,s=0;s<i.length;s++){for(var n=r,o=i[s].split(" "),a=0;a<o.length;a++){var h=this.context.measureText(o[a]).width;if(this._style.breakWords&&h>r)for(var l=o[a].split(""),u=0;u<l.length;u++){var c=this.context.measureText(l[u]).width;c>n?(e+="\n"+l[u],n=r-c):(0===u&&(e+=" "),e+=l[u],n-=c)}else{var d=h+this.context.measureText(" ").width;0===a||d>n?(a>0&&(e+="\n"),e+=o[a],n=r-h):(n-=d,e+=" "+o[a])}}s<i.length-1&&(e+="\n")}return e},r.prototype._calculateBounds=function(){this.updateText(!0),this.calculateVertices(),this._bounds.addQuad(this.vertexData)},r.prototype._onStyleChange=function(){this.dirty=!0},r.prototype._generateFillStyle=function(t,e){if(Array.isArray(t.fill)){var i,r,s,n,o,a=this.canvas.width/this.resolution,l=this.canvas.height/this.resolution;if(t.fillGradientType===h.TEXT_GRADIENT.LINEAR_VERTICAL)for(r=this.context.createLinearGradient(a/2,0,a/2,l),s=(t.fill.length+1)*e.length,n=0,i=0;i<e.length;i++){n+=1;for(var u=0;u<t.fill.length;u++)o=n/s,r.addColorStop(o,t.fill[u]),n++}else for(r=this.context.createLinearGradient(0,l/2,a,l/2),s=t.fill.length+1,n=1,i=0;i<t.fill.length;i++)o=n/s,r.addColorStop(o,t.fill[i]),n++;return r}return t.fill},r.prototype.destroy=function(t){"boolean"==typeof t&&(t={children:t}),t=Object.assign({},u,t),s.prototype.destroy.call(this,t),this.context=null,this.canvas=null,this._style=null}},{"../const":78,"../math":102,"../sprites/Sprite":133,"../textures/Texture":144,"../utils":151,"./TextStyle":140}],140:[function(t,e,i){function r(t){this.styleID=0,Object.assign(this,this._defaults,t)}function s(t){if("number"==typeof t)return o.hex2string(t);if(Array.isArray(t))for(var e=0;e<t.length;++e)"number"==typeof t[e]&&(t[e]=o.hex2string(t[e]));return t}var n=t("../const"),o=t("../utils");r.prototype.constructor=r,e.exports=r,r.prototype._defaults={align:"left",breakWords:!1,dropShadow:!1,dropShadowAngle:Math.PI/6,dropShadowBlur:0,dropShadowColor:"#000000",dropShadowDistance:5,fill:"black",fillGradientType:n.TEXT_GRADIENT.LINEAR_VERTICAL,fontFamily:"Arial",fontSize:26,fontStyle:"normal",fontVariant:"normal",fontWeight:"normal",letterSpacing:0,lineHeight:0,lineJoin:"miter",miterLimit:10,padding:0,stroke:"black",strokeThickness:0,textBaseline:"alphabetic",wordWrap:!1,wordWrapWidth:100},r.prototype.clone=function(){var t={};for(var e in this._defaults)t[e]=this[e];return new r(t)},r.prototype.reset=function(){Object.assign(this,this._defaults)},Object.defineProperties(r.prototype,{align:{get:function(){return this._align},set:function(t){this._align!==t&&(this._align=t,this.styleID++)}},breakWords:{get:function(){return this._breakWords},set:function(t){this._breakWords!==t&&(this._breakWords=t,this.styleID++)}},dropShadow:{get:function(){return this._dropShadow},set:function(t){this._dropShadow!==t&&(this._dropShadow=t,this.styleID++)}},dropShadowAngle:{get:function(){return this._dropShadowAngle},set:function(t){this._dropShadowAngle!==t&&(this._dropShadowAngle=t,this.styleID++)}},dropShadowBlur:{get:function(){return this._dropShadowBlur},set:function(t){this._dropShadowBlur!==t&&(this._dropShadowBlur=t,this.styleID++)}},dropShadowColor:{get:function(){return this._dropShadowColor},set:function(t){var e=s(t);this._dropShadowColor!==e&&(this._dropShadowColor=e,this.styleID++)}},dropShadowDistance:{get:function(){return this._dropShadowDistance},set:function(t){this._dropShadowDistance!==t&&(this._dropShadowDistance=t,this.styleID++)}},fill:{get:function(){return this._fill},set:function(t){var e=s(t);this._fill!==e&&(this._fill=e,this.styleID++)}},fillGradientType:{get:function(){return this._fillGradientType},set:function(t){this._fillGradientType!==t&&(this._fillGradientType=t,this.styleID++)}},fontFamily:{get:function(){return this._fontFamily},set:function(t){this.fontFamily!==t&&(this._fontFamily=t,this.styleID++)}},fontSize:{get:function(){return this._fontSize},set:function(t){this._fontSize!==t&&(this._fontSize=t,this.styleID++)}},fontStyle:{get:function(){return this._fontStyle},set:function(t){this._fontStyle!==t&&(this._fontStyle=t,this.styleID++)}},fontVariant:{get:function(){return this._fontVariant},set:function(t){this._fontVariant!==t&&(this._fontVariant=t,this.styleID++)}},fontWeight:{get:function(){return this._fontWeight},set:function(t){this._fontWeight!==t&&(this._fontWeight=t,this.styleID++)}},letterSpacing:{get:function(){return this._letterSpacing},set:function(t){this._letterSpacing!==t&&(this._letterSpacing=t,this.styleID++)}},lineHeight:{get:function(){return this._lineHeight},set:function(t){this._lineHeight!==t&&(this._lineHeight=t,this.styleID++)}},lineJoin:{get:function(){return this._lineJoin},set:function(t){this._lineJoin!==t&&(this._lineJoin=t,this.styleID++)}},miterLimit:{get:function(){return this._miterLimit},set:function(t){this._miterLimit!==t&&(this._miterLimit=t,this.styleID++)}},padding:{get:function(){return this._padding},set:function(t){this._padding!==t&&(this._padding=t,this.styleID++)}},stroke:{get:function(){return this._stroke},set:function(t){var e=s(t);this._stroke!==e&&(this._stroke=e,this.styleID++)}},strokeThickness:{get:function(){return this._strokeThickness},set:function(t){this._strokeThickness!==t&&(this._strokeThickness=t,this.styleID++)}},textBaseline:{get:function(){return this._textBaseline},set:function(t){this._textBaseline!==t&&(this._textBaseline=t,this.styleID++)}},wordWrap:{get:function(){return this._wordWrap},set:function(t){this._wordWrap!==t&&(this._wordWrap=t,this.styleID++)}},wordWrapWidth:{get:function(){return this._wordWrapWidth},set:function(t){this._wordWrapWidth!==t&&(this._wordWrapWidth=t,this.styleID++)}}})},{"../const":78,"../utils":151}],141:[function(t,e,i){function r(t,e,i,r){s.call(this,null,i),this.resolution=r||n.RESOLUTION,this.width=t||100,this.height=e||100,this.realWidth=this.width*this.resolution,this.realHeight=this.height*this.resolution,this.scaleMode=i||n.SCALE_MODES.DEFAULT,this.hasLoaded=!0,this._glRenderTargets=[],this._canvasRenderTarget=null,this.valid=!1}var s=t("./BaseTexture"),n=t("../const");r.prototype=Object.create(s.prototype),r.prototype.constructor=r,e.exports=r,r.prototype.resize=function(t,e){t===this.width&&e===this.height||(this.valid=t>0&&e>0,this.width=t,this.height=e,this.realWidth=this.width*this.resolution,this.realHeight=this.height*this.resolution,this.valid&&this.emit("update",this))},r.prototype.destroy=function(){s.prototype.destroy.call(this,!0),this.renderer=null}},{"../const":78,"./BaseTexture":142}],142:[function(t,e,i){function r(t,e,i){o.call(this),this.uid=s.uid(),this.touched=0,this.resolution=i||n.RESOLUTION,this.width=100,this.height=100,this.realWidth=100,this.realHeight=100,this.scaleMode=e||n.SCALE_MODES.DEFAULT,this.hasLoaded=!1,this.isLoading=!1,this.source=null,this.premultipliedAlpha=!0,this.imageUrl=null,this.isPowerOfTwo=!1,this.mipmap=n.MIPMAP_TEXTURES,this.wrapMode=n.WRAP_MODES.DEFAULT,this._glTextures=[],this._enabled=0,this._id=0,t&&this.loadSource(t)}var s=t("../utils"),n=t("../const"),o=t("eventemitter3"),a=t("../utils/determineCrossOrigin"),h=t("bit-twiddle");r.prototype=Object.create(o.prototype),r.prototype.constructor=r,e.exports=r,r.prototype.update=function(){this.realWidth=this.source.naturalWidth||this.source.videoWidth||this.source.width,this.realHeight=this.source.naturalHeight||this.source.videoHeight||this.source.height,this.width=this.realWidth/this.resolution,this.height=this.realHeight/this.resolution,this.isPowerOfTwo=h.isPow2(this.realWidth)&&h.isPow2(this.realHeight),this.emit("update",this)},r.prototype.loadSource=function(t){var e=this.isLoading;if(this.hasLoaded=!1,this.isLoading=!1,e&&this.source&&(this.source.onload=null,this.source.onerror=null),this.source=t,(this.source.complete||this.source.getContext)&&this.source.width&&this.source.height)this._sourceLoaded();else if(!t.getContext){this.isLoading=!0;var i=this;t.onload=function(){t.onload=null,t.onerror=null,i.isLoading&&(i.isLoading=!1,i._sourceLoaded(),i.emit("loaded",i))},t.onerror=function(){t.onload=null,t.onerror=null,i.isLoading&&(i.isLoading=!1,i.emit("error",i))},t.complete&&t.src&&(this.isLoading=!1,t.onload=null,t.onerror=null,t.width&&t.height?(this._sourceLoaded(),e&&this.emit("loaded",this)):e&&this.emit("error",this))}},r.prototype._sourceLoaded=function(){this.hasLoaded=!0,this.update()},r.prototype.destroy=function(){this.imageUrl?(delete s.BaseTextureCache[this.imageUrl],delete s.TextureCache[this.imageUrl],this.imageUrl=null,navigator.isCocoonJS||(this.source.src="")):this.source&&this.source._pixiId&&delete s.BaseTextureCache[this.source._pixiId],this.source=null,this.dispose()},r.prototype.dispose=function(){this.emit("dispose",this)},r.prototype.updateSourceImage=function(t){this.source.src=t,this.loadSource(this.source)},r.fromImage=function(t,e,i){var n=s.BaseTextureCache[t];if(!n){var o=new Image;void 0===e&&0!==t.indexOf("data:")&&(o.crossOrigin=a(t)),n=new r(o,i),n.imageUrl=t,o.src=t,s.BaseTextureCache[t]=n,n.resolution=s.getResolutionOfUrl(t)}return n},r.fromCanvas=function(t,e){t._pixiId||(t._pixiId="canvas_"+s.uid());var i=s.BaseTextureCache[t._pixiId];return i||(i=new r(t,e),s.BaseTextureCache[t._pixiId]=i),i}},{"../const":78,"../utils":151,"../utils/determineCrossOrigin":150,"bit-twiddle":1,eventemitter3:3}],143:[function(t,e,i){function r(t,e){if(this.legacyRenderer=null,!(t instanceof s)){var i=arguments[1],r=arguments[2],o=arguments[3]||0,a=arguments[4]||1;console.warn("v4 RenderTexture now expects a new BaseRenderTexture. Please use RenderTexture.create("+i+", "+r+")"),this.legacyRenderer=arguments[0],e=null,t=new s(i,r,o,a)}n.call(this,t,e),this.valid=!0,this._updateUvs()}var s=t("./BaseRenderTexture"),n=t("./Texture");r.prototype=Object.create(n.prototype),r.prototype.constructor=r,e.exports=r,r.prototype.resize=function(t,e,i){this.valid=t>0&&e>0,this._frame.width=this.orig.width=t,this._frame.height=this.orig.height=e,i||this.baseTexture.resize(t,e),this._updateUvs()},r.create=function(t,e,i,n){return new r(new s(t,e,i,n))}},{"./BaseRenderTexture":141,"./Texture":144}],144:[function(t,e,i){function r(t,e,i,s,n){if(a.call(this),this.noFrame=!1,e||(this.noFrame=!0,e=new h.Rectangle(0,0,1,1)),t instanceof r&&(t=t.baseTexture),this.baseTexture=t,this._frame=e,this.trim=s,this.valid=!1,this.requiresUpdate=!1,this._uvs=null,this.orig=i||e,this._rotate=+(n||0),!0===n)this._rotate=2;else if(this._rotate%2!=0)throw"attempt to use diamond-shaped UVs. If you are sure, set rotation manually";t.hasLoaded?(this.noFrame&&(e=new h.Rectangle(0,0,t.width,t.height),t.on("update",this.onBaseTextureUpdated,this)),this.frame=e):t.once("loaded",this.onBaseTextureLoaded,this),this._updateID=0}var s=t("./BaseTexture"),n=t("./VideoBaseTexture"),o=t("./TextureUvs"),a=t("eventemitter3"),h=t("../math"),l=t("../utils");r.prototype=Object.create(a.prototype),r.prototype.constructor=r,e.exports=r,Object.defineProperties(r.prototype,{frame:{get:function(){return this._frame},set:function(t){if(this._frame=t,this.noFrame=!1,t.x+t.width>this.baseTexture.width||t.y+t.height>this.baseTexture.height)throw new Error("Texture Error: frame does not fit inside the base Texture dimensions "+this);this.valid=t&&t.width&&t.height&&this.baseTexture.hasLoaded,this.trim||this.rotate||(this.orig=t),this.valid&&this._updateUvs()}},rotate:{get:function(){return this._rotate},set:function(t){this._rotate=t,this.valid&&this._updateUvs()}},width:{get:function(){return this.orig?this.orig.width:0}},height:{get:function(){return this.orig?this.orig.height:0}}}),r.prototype.update=function(){this.baseTexture.update()},r.prototype.onBaseTextureLoaded=function(t){this._updateID++,this.noFrame?this.frame=new h.Rectangle(0,0,t.width,t.height):this.frame=this._frame,this.baseTexture.on("update",this.onBaseTextureUpdated,this),this.emit("update",this)},r.prototype.onBaseTextureUpdated=function(t){this._updateID++,this._frame.width=t.width,this._frame.height=t.height,this.emit("update",this)},r.prototype.destroy=function(t){this.baseTexture&&(t&&(l.TextureCache[this.baseTexture.imageUrl]&&delete l.TextureCache[this.baseTexture.imageUrl],this.baseTexture.destroy()),this.baseTexture.off("update",this.onBaseTextureUpdated,this),this.baseTexture.off("loaded",this.onBaseTextureLoaded,this),this.baseTexture=null),this._frame=null,this._uvs=null,this.trim=null,this.orig=null,this.valid=!1,this.off("dispose",this.dispose,this),this.off("update",this.update,this)},r.prototype.clone=function(){return new r(this.baseTexture,this.frame,this.orig,this.trim,this.rotate)},r.prototype._updateUvs=function(){this._uvs||(this._uvs=new o),
        this._uvs.set(this._frame,this.baseTexture,this.rotate),this._updateID++},r.fromImage=function(t,e,i){var n=l.TextureCache[t];return n||(n=new r(s.fromImage(t,e,i)),l.TextureCache[t]=n),n},r.fromFrame=function(t){var e=l.TextureCache[t];if(!e)throw new Error('The frameId "'+t+'" does not exist in the texture cache');return e},r.fromCanvas=function(t,e){return new r(s.fromCanvas(t,e))},r.fromVideo=function(t,e){return"string"==typeof t?r.fromVideoUrl(t,e):new r(n.fromVideo(t,e))},r.fromVideoUrl=function(t,e){return new r(n.fromUrl(t,e))},r.from=function(t){if("string"==typeof t){var e=l.TextureCache[t];if(!e){return null!==t.match(/\.(mp4|webm|ogg|h264|avi|mov)$/)?r.fromVideoUrl(t):r.fromImage(t)}return e}return t instanceof HTMLCanvasElement?r.fromCanvas(t):t instanceof HTMLVideoElement?r.fromVideo(t):t instanceof s?new r(s):void 0},r.addTextureToCache=function(t,e){l.TextureCache[e]=t},r.removeTextureFromCache=function(t){var e=l.TextureCache[t];return delete l.TextureCache[t],delete l.BaseTextureCache[t],e},r.EMPTY=new r(new s),r.EMPTY.destroy=function(){},r.EMPTY.on=function(){},r.EMPTY.once=function(){},r.EMPTY.emit=function(){}},{"../math":102,"../utils":151,"./BaseTexture":142,"./TextureUvs":145,"./VideoBaseTexture":146,eventemitter3:3}],145:[function(t,e,i){function r(){this.x0=0,this.y0=0,this.x1=1,this.y1=0,this.x2=1,this.y2=1,this.x3=0,this.y3=1,this.uvsUint32=new Uint32Array(4)}e.exports=r;var s=t("../math/GroupD8");r.prototype.set=function(t,e,i){var r=e.width,n=e.height;if(i){var o=t.width/2/r,a=t.height/2/n,h=t.x/r+o,l=t.y/n+a;i=s.add(i,s.NW),this.x0=h+o*s.uX(i),this.y0=l+a*s.uY(i),i=s.add(i,2),this.x1=h+o*s.uX(i),this.y1=l+a*s.uY(i),i=s.add(i,2),this.x2=h+o*s.uX(i),this.y2=l+a*s.uY(i),i=s.add(i,2),this.x3=h+o*s.uX(i),this.y3=l+a*s.uY(i)}else this.x0=t.x/r,this.y0=t.y/n,this.x1=(t.x+t.width)/r,this.y1=t.y/n,this.x2=(t.x+t.width)/r,this.y2=(t.y+t.height)/n,this.x3=t.x/r,this.y3=(t.y+t.height)/n;this.uvsUint32[0]=(65535*this.y0&65535)<<16|65535*this.x0&65535,this.uvsUint32[1]=(65535*this.y1&65535)<<16|65535*this.x1&65535,this.uvsUint32[2]=(65535*this.y2&65535)<<16|65535*this.x2&65535,this.uvsUint32[3]=(65535*this.y3&65535)<<16|65535*this.x3&65535}},{"../math/GroupD8":98}],146:[function(t,e,i){function r(t,e){if(!t)throw new Error("No video source element specified.");(t.readyState===t.HAVE_ENOUGH_DATA||t.readyState===t.HAVE_FUTURE_DATA)&&t.width&&t.height&&(t.complete=!0),n.call(this,t,e),this.autoUpdate=!1,this._onUpdate=this._onUpdate.bind(this),this._onCanPlay=this._onCanPlay.bind(this),t.complete||(t.addEventListener("canplay",this._onCanPlay),t.addEventListener("canplaythrough",this._onCanPlay),t.addEventListener("play",this._onPlayStart.bind(this)),t.addEventListener("pause",this._onPlayStop.bind(this))),this.__loaded=!1}function s(t,e){e||(e="video/"+t.substr(t.lastIndexOf(".")+1));var i=document.createElement("source");return i.src=t,i.type=e,i}var n=t("./BaseTexture"),o=t("../utils");r.prototype=Object.create(n.prototype),r.prototype.constructor=r,e.exports=r,r.prototype._onUpdate=function(){this.autoUpdate&&(window.requestAnimationFrame(this._onUpdate),this.update())},r.prototype._onPlayStart=function(){this.autoUpdate||(window.requestAnimationFrame(this._onUpdate),this.autoUpdate=!0)},r.prototype._onPlayStop=function(){this.autoUpdate=!1},r.prototype._onCanPlay=function(){this.hasLoaded=!0,this.source&&(this.source.removeEventListener("canplay",this._onCanPlay),this.source.removeEventListener("canplaythrough",this._onCanPlay),this.width=this.source.videoWidth,this.height=this.source.videoHeight,this.source.play(),this.__loaded||(this.__loaded=!0,this.emit("loaded",this)))},r.prototype.destroy=function(){this.source&&this.source._pixiId&&(delete o.BaseTextureCache[this.source._pixiId],delete this.source._pixiId),n.prototype.destroy.call(this)},r.fromVideo=function(t,e){t._pixiId||(t._pixiId="video_"+o.uid());var i=o.BaseTextureCache[t._pixiId];return i||(i=new r(t,e),o.BaseTextureCache[t._pixiId]=i),i},r.fromUrl=function(t,e){var i=document.createElement("video");if(Array.isArray(t))for(var n=0;n<t.length;++n)i.appendChild(s(t[n].src||t[n],t[n].mime));else i.appendChild(s(t.src||t,t.mime));return i.load(),i.play(),r.fromVideo(i,e)},r.fromUrls=r.fromUrl},{"../utils":151,"./BaseTexture":142}],147:[function(t,e,i){function r(){var t=this;this._tick=function(e){t._requestId=null,t.started&&(t.update(e),t.started&&null===t._requestId&&t._emitter.listeners(o,!0)&&(t._requestId=requestAnimationFrame(t._tick)))},this._emitter=new n,this._requestId=null,this._maxElapsedMS=100,this.autoStart=!1,this.deltaTime=1,this.elapsedMS=1/s.TARGET_FPMS,this.lastTime=0,this.speed=1,this.started=!1}var s=t("../const"),n=t("eventemitter3"),o="tick";Object.defineProperties(r.prototype,{FPS:{get:function(){return 1e3/this.elapsedMS}},minFPS:{get:function(){return 1e3/this._maxElapsedMS},set:function(t){var e=Math.min(Math.max(0,t)/1e3,s.TARGET_FPMS);this._maxElapsedMS=1/e}}}),r.prototype._requestIfNeeded=function(){null===this._requestId&&this._emitter.listeners(o,!0)&&(this.lastTime=performance.now(),this._requestId=requestAnimationFrame(this._tick))},r.prototype._cancelIfNeeded=function(){null!==this._requestId&&(cancelAnimationFrame(this._requestId),this._requestId=null)},r.prototype._startIfPossible=function(){this.started?this._requestIfNeeded():this.autoStart&&this.start()},r.prototype.add=function(t,e){return this._emitter.on(o,t,e),this._startIfPossible(),this},r.prototype.addOnce=function(t,e){return this._emitter.once(o,t,e),this._startIfPossible(),this},r.prototype.remove=function(t,e){return this._emitter.off(o,t,e),this._emitter.listeners(o,!0)||this._cancelIfNeeded(),this},r.prototype.start=function(){this.started||(this.started=!0,this._requestIfNeeded())},r.prototype.stop=function(){this.started&&(this.started=!1,this._cancelIfNeeded())},r.prototype.update=function(t){var e;t=t||performance.now(),t>this.lastTime?(e=this.elapsedMS=t-this.lastTime,e>this._maxElapsedMS&&(e=this._maxElapsedMS),this.deltaTime=e*s.TARGET_FPMS*this.speed,this._emitter.emit(o,this.deltaTime)):this.deltaTime=this.elapsedMS=0,this.lastTime=t},e.exports=r},{"../const":78,eventemitter3:3}],148:[function(t,e,i){var r=t("./Ticker"),s=new r;s.autoStart=!0,e.exports={shared:s,Ticker:r}},{"./Ticker":147}],149:[function(t,e,i){var r=function(t){for(var e=6*t,i=new Uint16Array(e),r=0,s=0;e>r;r+=6,s+=4)i[r+0]=s+0,i[r+1]=s+1,i[r+2]=s+2,i[r+3]=s+0,i[r+4]=s+2,i[r+5]=s+3;return i};e.exports=r},{}],150:[function(t,e,i){var r,s=t("url"),n=function(t,e){if(0===t.indexOf("data:"))return"";e=e||window.location,r||(r=document.createElement("a")),r.href=t,t=s.parse(r.href);var i=!t.port&&""===e.port||t.port===e.port;return t.hostname===e.hostname&&i&&t.protocol===e.protocol?"":"anonymous"};e.exports=n},{url:28}],151:[function(t,e,i){var r=t("../const"),s=e.exports={_uid:0,_saidHello:!1,EventEmitter:t("eventemitter3"),pluginTarget:t("./pluginTarget"),uid:function(){return++s._uid},hex2rgb:function(t,e){return e=e||[],e[0]=(t>>16&255)/255,e[1]=(t>>8&255)/255,e[2]=(255&t)/255,e},hex2string:function(t){return t=t.toString(16),"#"+(t="000000".substr(0,6-t.length)+t)},rgb2hex:function(t){return(255*t[0]<<16)+(255*t[1]<<8)+255*t[2]},getResolutionOfUrl:function(t){var e=r.RETINA_PREFIX.exec(t);return e?parseFloat(e[1]):1},sayHello:function(t){if(!s._saidHello)if(navigator.userAgent.toLowerCase().indexOf("chrome")>-1)var e=["\n %c %c %c Pixi.js "+r.VERSION+" - âœ° "+t+" âœ°  %c  %c  http://www.pixijs.com/  %c %c â™¥%câ™¥%câ™¥ \n\n","background: #ff66a5; padding:5px 0;","background: #ff66a5; padding:5px 0;","color: #ff66a5; background: #030307; padding:5px 0;","background: #ff66a5; padding:5px 0;","background: #ffc3dc; padding:5px 0;","background: #ff66a5; padding:5px 0;","color: #ff2424; background: #fff; padding:5px 0;","color: #ff2424; background: #fff; padding:5px 0;","color: #ff2424; background: #fff; padding:5px 0;"];else s._saidHello=!0},isWebGLSupported:function(){var t={stencil:!0,failIfMajorPerformanceCaveat:!0};try{if(!window.WebGLRenderingContext)return!1;var e=document.createElement("canvas"),i=e.getContext("webgl",t)||e.getContext("experimental-webgl",t),r=!(!i||!i.getContextAttributes().stencil);if(i){var s=i.getExtension("WEBGL_lose_context");s&&s.loseContext()}return i=null,r}catch(t){return!1}},sign:function(t){return t?0>t?-1:1:0},removeItems:function(t,e,i){var r=t.length;if(!(e>=r||0===i)){i=e+i>r?r-e:i;for(var s=e,n=r-i;n>s;++s)t[s]=t[s+i];t.length=n}},TextureCache:{},BaseTextureCache:{}}},{"../const":78,"./pluginTarget":153,eventemitter3:3}],152:[function(t,e,i){var r=t("ismobilejs"),s=function(t){return r.tablet||r.phone?2:t};e.exports=s},{ismobilejs:4}],153:[function(t,e,i){function r(t){t.__plugins={},t.registerPlugin=function(e,i){t.__plugins[e]=i},t.prototype.initPlugins=function(){this.plugins=this.plugins||{};for(var e in t.__plugins)this.plugins[e]=new t.__plugins[e](this)},t.prototype.destroyPlugins=function(){for(var t in this.plugins)this.plugins[t].destroy(),this.plugins[t]=null;this.plugins=null}}e.exports={mixin:function(t){r(t)}}},{}],154:[function(t,e,i){function r(t){var e=(new Error).stack;void 0===e?console.warn("Deprecation Warning: ",t):(e=e.split("\n").splice(3).join("\n"),console.groupCollapsed?(console.groupCollapsed("%cDeprecation Warning: %c%s","color:#614108;background:#fffbe6","font-weight:normal;color:#614108;background:#fffbe6",t),console.warn(e),console.groupEnd()):(console.warn("Deprecation Warning: ",t),console.warn(e)))}var s=t("./core"),n=t("./mesh"),o=t("./particles"),a=t("./extras"),h=t("./filters");s.SpriteBatch=function(){throw new ReferenceError("SpriteBatch does not exist any more, please use the new ParticleContainer instead.")},s.AssetLoader=function(){throw new ReferenceError("The loader system was overhauled in pixi v3, please see the new PIXI.loaders.Loader class.")},Object.defineProperties(s,{Stage:{get:function(){return r("You do not need to use a PIXI Stage any more, you can simply render any container."),s.Container}},DisplayObjectContainer:{get:function(){return r("DisplayObjectContainer has been shortened to Container, please use Container from now on."),s.Container}},Strip:{get:function(){return r("The Strip class has been renamed to Mesh and moved to mesh.Mesh, please use mesh.Mesh from now on."),n.Mesh}},Rope:{get:function(){return r("The Rope class has been moved to mesh.Rope, please use mesh.Rope from now on."),n.Rope}},ParticleContainer:{get:function(){return r("The ParticleContainer class has been moved to particles.ParticleContainer, please use particles.ParticleContainer from now on."),o.ParticleContainer}},MovieClip:{get:function(){return r("The MovieClip class has been moved to extras.MovieClip, please use extras.MovieClip from now on."),a.MovieClip}},TilingSprite:{get:function(){return r("The TilingSprite class has been moved to extras.TilingSprite, please use extras.TilingSprite from now on."),a.TilingSprite}},BitmapText:{get:function(){return r("The BitmapText class has been moved to extras.BitmapText, please use extras.BitmapText from now on."),a.BitmapText}},blendModes:{get:function(){return r("The blendModes has been moved to BLEND_MODES, please use BLEND_MODES from now on."),s.BLEND_MODES}},scaleModes:{get:function(){return r("The scaleModes has been moved to SCALE_MODES, please use SCALE_MODES from now on."),s.SCALE_MODES}},BaseTextureCache:{get:function(){return r("The BaseTextureCache class has been moved to utils.BaseTextureCache, please use utils.BaseTextureCache from now on."),s.utils.BaseTextureCache}},TextureCache:{get:function(){return r("The TextureCache class has been moved to utils.TextureCache, please use utils.TextureCache from now on."),s.utils.TextureCache}},math:{get:function(){return r("The math namespace is deprecated, please access members already accessible on PIXI."),s}},AbstractFilter:{get:function(){return r("AstractFilter has been renamed to Filter, please use PIXI.Filter"),s.Filter}},TransformManual:{get:function(){return r("TransformManual has been renamed to TransformBase, please update your pixi-spine"),s.TransformBase}}}),s.DisplayObject.prototype.generateTexture=function(t,e,i){return r("generateTexture has moved to the renderer, please use renderer.generateTexture(displayObject)"),t.generateTexture(this,e,i)},s.Graphics.prototype.generateTexture=function(t,e){return r("graphics generate texture has moved to the renderer. Or to render a graphics to a texture using canvas please use generateCanvasTexture"),this.generateCanvasTexture(t,e)},s.RenderTexture.prototype.render=function(t,e,i,s){this.legacyRenderer.render(t,this,i,e,!s),r("RenderTexture.render is now deprecated, please use renderer.render(displayObject, renderTexture)")},s.RenderTexture.prototype.getImage=function(t){return r("RenderTexture.getImage is now deprecated, please use renderer.extract.image(target)"),this.legacyRenderer.extract.image(t)},s.RenderTexture.prototype.getBase64=function(t){return r("RenderTexture.getBase64 is now deprecated, please use renderer.extract.base64(target)"),this.legacyRenderer.extract.base64(t)},s.RenderTexture.prototype.getCanvas=function(t){return r("RenderTexture.getCanvas is now deprecated, please use renderer.extract.canvas(target)"),this.legacyRenderer.extract.canvas(t)},s.RenderTexture.prototype.getPixels=function(t){return r("RenderTexture.getPixels is now deprecated, please use renderer.extract.pixels(target)"),this.legacyRenderer.pixels(t)},s.Sprite.prototype.setTexture=function(t){this.texture=t,r("setTexture is now deprecated, please use the texture property, e.g : sprite.texture = texture;")},a.BitmapText.prototype.setText=function(t){this.text=t,r("setText is now deprecated, please use the text property, e.g : myBitmapText.text = 'my text';")},s.Text.prototype.setText=function(t){this.text=t,r("setText is now deprecated, please use the text property, e.g : myText.text = 'my text';")},s.Text.prototype.setStyle=function(t){this.style=t,r("setStyle is now deprecated, please use the style property, e.g : myText.style = style;")},Object.defineProperties(s.TextStyle.prototype,{font:{get:function(){r("text style property 'font' is now deprecated, please use the 'fontFamily','fontSize',fontStyle','fontVariant' and 'fontWeight' properties from now on");var t="number"==typeof this._fontSize?this._fontSize+"px":this._fontSize;return this._fontStyle+" "+this._fontVariant+" "+this._fontWeight+" "+t+" "+this._fontFamily},set:function(t){r("text style property 'font' is now deprecated, please use the 'fontFamily','fontSize',fontStyle','fontVariant' and 'fontWeight' properties from now on"),t.indexOf("italic")>1?this._fontStyle="italic":t.indexOf("oblique")>-1?this._fontStyle="oblique":this._fontStyle="normal",t.indexOf("small-caps")>-1?this._fontVariant="small-caps":this._fontVariant="normal";var e,i=t.split(" "),s=-1;for(this._fontSize=26,e=0;e<i.length;++e)if(i[e].match(/(px|pt|em|%)/)){s=e,this._fontSize=i[e];break}for(this._fontWeight="normal",e=0;s>e;++e)if(i[e].match(/(bold|bolder|lighter|100|200|300|400|500|600|700|800|900)/)){this._fontWeight=i[e];break}if(s>-1&&s<i.length-1){for(this._fontFamily="",e=s+1;e<i.length;++e)this._fontFamily+=i[e]+" ";this._fontFamily=this._fontFamily.slice(0,-1)}else this._fontFamily="Arial";this.styleID++}}}),s.Texture.prototype.setFrame=function(t){this.frame=t,r("setFrame is now deprecated, please use the frame property, e.g : myTexture.frame = frame;")},Object.defineProperties(h,{AbstractFilter:{get:function(){return r("AstractFilter has been renamed to Filter, please use PIXI.Filter"),s.AbstractFilter}},SpriteMaskFilter:{get:function(){return r("filters.SpriteMaskFilter is an undocumented alias, please use SpriteMaskFilter from now on."),s.SpriteMaskFilter}}}),s.utils.uuid=function(){return r("utils.uuid() is deprecated, please use utils.uid() from now on."),s.utils.uid()},s.utils.canUseNewCanvasBlendModes=function(){return r("utils.canUseNewCanvasBlendModes() is deprecated, please use CanvasTinter.canUseMultiply from now on"),s.CanvasTinter.canUseMultiply}},{"./core":97,"./extras":164,"./filters":175,"./mesh":191,"./particles":194}],155:[function(t,e,i){function r(t){this.renderer=t,t.extract=this}var s=t("../../core"),n=new s.Rectangle;r.prototype.constructor=r,e.exports=r,r.prototype.image=function(t){var e=new Image;return e.src=this.base64(t),e},r.prototype.base64=function(t){return this.canvas(t).toDataURL()},r.prototype.canvas=function(t){var e,i,r,o,a=this.renderer;t&&(o=t instanceof s.RenderTexture?t:a.generateTexture(t)),o?(e=o.baseTexture._canvasRenderTarget.context,i=o.baseTexture._canvasRenderTarget.resolution,r=o.frame):(e=a.rootContext,i=a.rootResolution,r=n,r.width=this.renderer.width,r.height=this.renderer.height);var h=r.width*i,l=r.height*i,u=new s.CanvasRenderTarget(h,l),c=e.getImageData(r.x*i,r.y*i,h,l);return u.context.putImageData(c,0,0),u.canvas},r.prototype.pixels=function(t){var e,i,r,o,a=this.renderer;return t&&(o=t instanceof s.RenderTexture?t:a.generateTexture(t)),o?(e=o.baseTexture._canvasRenderTarget.context,i=o.baseTexture._canvasRenderTarget.resolution,r=o.frame):(e=a.rootContext,i=a.rootResolution,r=n,r.width=a.width,r.height=a.height),e.getImageData(0,0,r.width*i,r.height*i).data},r.prototype.destroy=function(){this.renderer.extract=null,this.renderer=null},s.CanvasRenderer.registerPlugin("extract",r)},{"../../core":97}],156:[function(t,e,i){e.exports={webGL:t("./webgl/WebGLExtract"),canvas:t("./canvas/CanvasExtract")}},{"./canvas/CanvasExtract":155,"./webgl/WebGLExtract":157}],157:[function(t,e,i){function r(t){this.renderer=t,t.extract=this}var s=t("../../core"),n=new s.Rectangle;r.prototype.constructor=r,e.exports=r,r.prototype.image=function(t){var e=new Image;return e.src=this.base64(t),e},r.prototype.base64=function(t){return this.canvas(t).toDataURL()},r.prototype.canvas=function(t){var e,i,r,o,a=this.renderer,h=!1;t&&(o=t instanceof s.RenderTexture?t:this.renderer.generateTexture(t)),o?(e=o.baseTexture._glRenderTargets[this.renderer.CONTEXT_UID],i=e.resolution,r=o.frame,h=!1):(e=this.renderer.rootRenderTarget,i=e.resolution,h=!0,r=n,r.width=e.size.width,r.height=e.size.height);var l=r.width*i,u=r.height*i,c=new s.CanvasRenderTarget(l,u);if(e){a.bindRenderTarget(e);var d=new Uint8Array(4*l*u),p=a.gl;p.readPixels(r.x*i,r.y*i,l,u,p.RGBA,p.UNSIGNED_BYTE,d);var f=c.context.getImageData(0,0,l,u);f.data.set(d),c.context.putImageData(f,0,0),h&&(c.context.scale(1,-1),c.context.drawImage(c.canvas,0,-u))}return c.canvas},r.prototype.pixels=function(t){var e,i,r,o,a=this.renderer;t&&(o=t instanceof s.RenderTexture?t:this.renderer.generateTexture(t)),o?(e=o.baseTexture._glRenderTargets[this.renderer.CONTEXT_UID],i=e.resolution,r=o.frame):(e=this.renderer.rootRenderTarget,i=e.resolution,r=n,r.width=e.size.width,r.height=e.size.height);var h=r.width*i,l=r.height*i,u=new Uint8Array(4*h*l);if(e){a.bindRenderTarget(e);var c=a.gl;c.readPixels(r.x*i,r.y*i,h,l,c.RGBA,c.UNSIGNED_BYTE,u)}return u},r.prototype.destroy=function(){this.renderer.extract=null,this.renderer=null},s.WebGLRenderer.registerPlugin("extract",r)},{"../../core":97}],158:[function(t,e,i){function r(t,e){s.Container.call(this),e=e||{},this.textWidth=0,this.textHeight=0,this._glyphs=[],this._font={tint:void 0!==e.tint?e.tint:16777215,align:e.align||"left",name:null,size:0},this.font=e.font,this._text=t,this.maxWidth=0,this.maxLineHeight=0,this._anchor=new n(this.makeDirty,this,0,0),this.dirty=!1,this.updateText()}var s=t("../core"),n=t("../core/math/ObservablePoint");r.prototype=Object.create(s.Container.prototype),r.prototype.constructor=r,e.exports=r,Object.defineProperties(r.prototype,{tint:{get:function(){return this._font.tint},set:function(t){this._font.tint="number"==typeof t&&t>=0?t:16777215,this.dirty=!0}},align:{get:function(){return this._font.align},set:function(t){this._font.align=t||"left",this.dirty=!0}},anchor:{get:function(){return this._anchor},set:function(t){"number"==typeof t?this._anchor.set(t):this._anchor.copy(t)}},font:{get:function(){return this._font},set:function(t){t&&("string"==typeof t?(t=t.split(" "),this._font.name=1===t.length?t[0]:t.slice(1).join(" "),this._font.size=t.length>=2?parseInt(t[0],10):r.fonts[this._font.name].size):(this._font.name=t.name,this._font.size="number"==typeof t.size?t.size:parseInt(t.size,10)),this.dirty=!0)}},text:{get:function(){return this._text},set:function(t){t=t.toString()||" ",this._text!==t&&(this._text=t,this.dirty=!0)}}}),r.prototype.updateText=function(){for(var t=r.fonts[this._font.name],e=new s.Point,i=null,n=[],o=0,a=0,h=[],l=0,u=this._font.size/t.size,c=-1,d=0,p=0,f=0;f<this.text.length;f++){var v=this.text.charCodeAt(f);if(/(\s)/.test(this.text.charAt(f))&&(c=f,d=o),/(?:\r\n|\r|\n)/.test(this.text.charAt(f)))h.push(o),a=Math.max(a,o),l++,e.x=0,e.y+=t.lineHeight,i=null;else if(-1!==c&&this.maxWidth>0&&e.x*u>this.maxWidth)s.utils.removeItems(n,c,f-c),f=c,c=-1,h.push(d),a=Math.max(a,d),l++,e.x=0,e.y+=t.lineHeight,i=null;else{var _=t.chars[v];_&&(i&&_.kerning[i]&&(e.x+=_.kerning[i]),n.push({texture:_.texture,line:l,charCode:v,position:new s.Point(e.x+_.xOffset,e.y+_.yOffset)}),o=e.x+(_.texture.width+_.xOffset),e.x+=_.xAdvance,p=Math.max(p,_.yOffset+_.texture.height),i=v)}}h.push(o),a=Math.max(a,o);var g=[];for(f=0;l>=f;f++){var m=0;"right"===this._font.align?m=a-h[f]:"center"===this._font.align&&(m=(a-h[f])/2),g.push(m)}var y=n.length,x=this.tint;for(f=0;y>f;f++){var b=this._glyphs[f];b?b.texture=n[f].texture:(b=new s.Sprite(n[f].texture),this._glyphs.push(b)),b.position.x=(n[f].position.x+g[n[f].line])*u,b.position.y=n[f].position.y*u,b.scale.x=b.scale.y=u,b.tint=x,b.parent||this.addChild(b)}for(f=y;f<this._glyphs.length;++f)this.removeChild(this._glyphs[f]);if(this.textWidth=a*u,this.textHeight=(e.y+t.lineHeight)*u,0!==this.anchor.x||0!==this.anchor.y)for(f=0;y>f;f++)this._glyphs[f].x-=this.textWidth*this.anchor.x,this._glyphs[f].y-=this.textHeight*this.anchor.y;this.maxLineHeight=p*u},r.prototype.updateTransform=function(){this.validate(),this.containerUpdateTransform()},r.prototype.getLocalBounds=function(){return this.validate(),s.Container.prototype.getLocalBounds.call(this)},r.prototype.validate=function(){this.dirty&&(this.updateText(),this.dirty=!1)},r.prototype.makeDirty=function(){this.dirty=!0},r.fonts={}},{"../core":97,"../core/math/ObservablePoint":100}],159:[function(t,e,i){function r(t){s.Sprite.call(this,t[0]instanceof s.Texture?t[0]:t[0].texture),this._textures=null,this._durations=null,this.textures=t,this.animationSpeed=1,this.loop=!0,this.onComplete=null,this._currentTime=0,this.playing=!1}var s=t("../core");r.prototype=Object.create(s.Sprite.prototype),r.prototype.constructor=r,e.exports=r,Object.defineProperties(r.prototype,{totalFrames:{get:function(){return this._textures.length}},textures:{get:function(){return this._textures},set:function(t){if(t[0]instanceof s.Texture)this._textures=t,this._durations=null;else{this._textures=[],this._durations=[];for(var e=0;e<t.length;e++)this._textures.push(t[e].texture),this._durations.push(t[e].time)}}},currentFrame:{get:function(){var t=Math.floor(this._currentTime)%this._textures.length;return 0>t&&(t+=this._textures.length),t}}}),r.prototype.stop=function(){this.playing&&(this.playing=!1,s.ticker.shared.remove(this.update,this))},r.prototype.play=function(){this.playing||(this.playing=!0,s.ticker.shared.add(this.update,this))},r.prototype.gotoAndStop=function(t){this.stop(),this._currentTime=t,this._texture=this._textures[this.currentFrame],this._textureID=-1},r.prototype.gotoAndPlay=function(t){this._currentTime=t,this.play()},r.prototype.update=function(t){var e=this.animationSpeed*t;if(null!==this._durations){var i=this._currentTime%1*this._durations[this.currentFrame];for(i+=e/60*1e3;0>i;)this._currentTime--,i+=this._durations[this.currentFrame];var r=Math.sign(this.animationSpeed*t);for(this._currentTime=Math.floor(this._currentTime);i>=this._durations[this.currentFrame];)i-=this._durations[this.currentFrame]*r,this._currentTime+=r;this._currentTime+=i/this._durations[this.currentFrame]}else this._currentTime+=e;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):(this._texture=this._textures[this.currentFrame],this._textureID=-1)},r.prototype.destroy=function(){this.stop(),s.Sprite.prototype.destroy.call(this)},r.fromFrames=function(t){for(var e=[],i=0;i<t.length;++i)e.push(s.Texture.fromFrame(t[i]));return new r(e)},r.fromImages=function(t){for(var e=[],i=0;i<t.length;++i)e.push(s.Texture.fromImage(t[i]));return new r(e)}},{"../core":97}],160:[function(t,e,i){function r(t,e,i){s.Sprite.call(this,t),this.tileScale=new s.Point(1,1),this.tilePosition=new s.Point(0,0),this._width=e||100,this._height=i||100,this._uvs=new s.TextureUvs,this._canvasPattern=null,this._glDatas=[]}var s=t("../core"),n=new s.Point,o=t("../core/textures/Texture"),a=t("../core/sprites/canvas/CanvasTinter"),h=t("./webgl/TilingShader"),l=new Float32Array(4);r.prototype=Object.create(s.Sprite.prototype),r.prototype.constructor=r,e.exports=r,Object.defineProperties(r.prototype,{width:{get:function(){return this._width},set:function(t){this._width=t}},height:{get:function(){return this._height},set:function(t){this._height=t}}}),r.prototype._onTextureUpdate=function(){},r.prototype._renderWebGL=function(t){var e=this._texture;if(e&&e._uvs){t.flush();var i=t.gl,r=this._glDatas[t.CONTEXT_UID];r||(r={shader:new h(i),quad:new s.Quad(i)},this._glDatas[t.CONTEXT_UID]=r,r.quad.initVao(r.shader));var n=r.quad.vertices;n[0]=n[6]=this._width*-this.anchor.x,n[1]=n[3]=this._height*-this.anchor.y,n[2]=n[4]=this._width*(1-this.anchor.x),n[5]=n[7]=this._height*(1-this.anchor.y),r.quad.upload(),t.bindShader(r.shader);var o=e._uvs,a=e._frame.width,u=e._frame.height,c=e.baseTexture.width,d=e.baseTexture.height,p=r.shader.uniforms.uPixelSize;p[0]=1/c,p[1]=1/d,r.shader.uniforms.uPixelSize=p;var f=r.shader.uniforms.uFrame;f[0]=o.x0,f[1]=o.y0,f[2]=o.x1-o.x0,f[3]=o.y2-o.y0,r.shader.uniforms.uFrame=f;var v=r.shader.uniforms.uTransform;v[0]=this.tilePosition.x%(a*this.tileScale.x)/this._width,v[1]=this.tilePosition.y%(u*this.tileScale.y)/this._height,v[2]=c/this._width*this.tileScale.x,v[3]=d/this._height*this.tileScale.y,r.shader.uniforms.uTransform=v,r.shader.uniforms.translationMatrix=this.worldTransform.toArray(!0);var _=l;s.utils.hex2rgb(this.tint,_),_[3]=this.worldAlpha,r.shader.uniforms.uColor=_,t.bindTexture(this._texture,0),t.state.setBlendMode(this.blendMode),r.quad.draw()}},r.prototype._renderCanvas=function(t){var e=this._texture;if(e.baseTexture.hasLoaded){var i=t.context,r=this.worldTransform,n=t.resolution,o=e.baseTexture,h=this.tilePosition.x/this.tileScale.x%e._frame.width,l=this.tilePosition.y/this.tileScale.y%e._frame.height;if(!this._canvasPattern){var u=new s.CanvasRenderTarget(e._frame.width,e._frame.height);16777215!==this.tint?(this.cachedTint!==this.tint&&(this.cachedTint=this.tint,this.tintedTexture=a.getTintedTexture(this,this.tint)),u.context.drawImage(this.tintedTexture,0,0)):u.context.drawImage(o.source,-e._frame.x,-e._frame.y),this._canvasPattern=u.context.createPattern(u.canvas,"repeat")}i.globalAlpha=this.worldAlpha,i.setTransform(r.a*n,r.b*n,r.c*n,r.d*n,r.tx*n,r.ty*n),i.scale(this.tileScale.x,this.tileScale.y),i.translate(h+this.anchor.x*-this._width,l+this.anchor.y*-this._height);var c=t.blendModes[this.blendMode];c!==t.context.globalCompositeOperation&&(i.globalCompositeOperation=c),i.fillStyle=this._canvasPattern,i.fillRect(-h,-l,this._width/this.tileScale.x,this._height/this.tileScale.y)}},r.prototype.getBounds=function(){var t,e,i,r,s=this._width,n=this._height,o=s*(1-this.anchor.x),a=s*-this.anchor.x,h=n*(1-this.anchor.y),l=n*-this.anchor.y,u=this.worldTransform,c=u.a,d=u.b,p=u.c,f=u.d,v=u.tx,_=u.ty,g=c*a+p*l+v,m=f*l+d*a+_,y=c*o+p*l+v,x=f*l+d*o+_,b=c*o+p*h+v,T=f*h+d*o+_,w=c*a+p*h+v,E=f*h+d*a+_;t=g,t=t>y?y:t,t=t>b?b:t,t=t>w?w:t,i=m,i=i>x?x:i,i=i>T?T:i,i=i>E?E:i,e=g,e=y>e?y:e,e=b>e?b:e,e=w>e?w:e,r=m,r=x>r?x:r,r=T>r?T:r,r=E>r?E:r;var S=this._bounds;return S.x=t,S.width=e-t,S.y=i,S.height=r-i,this._currentBounds=S,S},r.prototype.containsPoint=function(t){this.worldTransform.applyInverse(t,n);var e,i=this._width,r=this._height,s=-i*this.anchor.x;return n.x>s&&n.x<s+i&&(e=-r*this.anchor.y,n.y>e&&n.y<e+r)},r.prototype.destroy=function(){s.Sprite.prototype.destroy.call(this),this.tileScale=null,this._tileScaleOffset=null,this.tilePosition=null,this._uvs=null},r.from=function(t,e,i){return new r(o.from(t),e,i)},r.fromFrame=function(t,e,i){var n=s.utils.TextureCache[t];if(!n)throw new Error('The frameId "'+t+'" does not exist in the texture cache '+this);return new r(n,e,i)},r.fromImage=function(t,e,i,n,o){return new r(s.Texture.fromImage(t,n,o),e,i)}},{"../core":97,"../core/sprites/canvas/CanvasTinter":135,"../core/textures/Texture":144,"./webgl/TilingShader":165}],161:[function(t,e,i){var r=t("../core"),s=r.DisplayObject,n=new r.Matrix;s.prototype._cacheAsBitmap=!1,s.prototype._cacheData=!1;var o=function(){this.originalRenderWebGL=null,this.originalRenderCanvas=null,this.originalUpdateTransform=null,this.originalHitTest=null,this.originalDestroy=null,this.originalMask=null,this.originalFilterArea=null,this.sprite=null};Object.defineProperties(s.prototype,{cacheAsBitmap:{get:function(){return this._cacheAsBitmap},set:function(t){if(this._cacheAsBitmap!==t){this._cacheAsBitmap=t;var e;t?(this._cacheData||(this._cacheData=new o),e=this._cacheData,e.originalRenderWebGL=this.renderWebGL,e.originalRenderCanvas=this.renderCanvas,e.originalUpdateTransform=this.updateTransform,e.originalGetBounds=this.getBounds,e.originalDestroy=this.destroy,e.originalContainsPoint=this.containsPoint,e.originalMask=this._mask,e.originalFilterArea=this.filterArea,this.renderWebGL=this._renderCachedWebGL,this.renderCanvas=this._renderCachedCanvas,this.destroy=this._cacheAsBitmapDestroy):(e=this._cacheData,e.sprite&&this._destroyCachedDisplayObject(),this.renderWebGL=e.originalRenderWebGL,this.renderCanvas=e.originalRenderCanvas,this.getBounds=e.originalGetBounds,this.destroy=e.originalDestroy,this.updateTransform=e.originalUpdateTransform,this.containsPoint=e.originalContainsPoint,this._mask=e.originalMask,this.filterArea=e.originalFilterArea)}}}}),s.prototype._renderCachedWebGL=function(t){!this.visible||this.worldAlpha<=0||!this.renderable||(this._initCachedDisplayObject(t),this._cacheData.sprite._transformID=-1,this._cacheData.sprite.worldAlpha=this.worldAlpha,this._cacheData.sprite._renderWebGL(t))},s.prototype._initCachedDisplayObject=function(t){if(!this._cacheData||!this._cacheData.sprite){t.currentRenderer.flush();var e=this.getLocalBounds().clone();if(this._filters){var i=this._filters[0].padding;e.x-=i,e.y-=i,e.width+=2*i,e.height+=2*i}var s=t._activeRenderTarget,o=t.filterManager.filterStack,a=r.RenderTexture.create(0|e.width,0|e.height),h=n;h.tx=-e.x,h.ty=-e.y,this.transform.worldTransform.identity(),this.renderWebGL=this._cacheData.originalRenderWebGL,t.render(this,a,!0,h,!0),t.bindRenderTarget(s),t.filterManager.filterStack=o,this.renderWebGL=this._renderCachedWebGL,this.updateTransform=this.displayObjectUpdateTransform,this.getBounds=this._getCachedBounds,this._mask=null,this.filterArea=null;var l=new r.Sprite(a);l.transform.worldTransform=this.transform.worldTransform,l.anchor.x=-e.x/e.width,l.anchor.y=-e.y/e.height,this._cacheData.sprite=l,this.transform._parentID=-1,this.updateTransform(),this.containsPoint=l.containsPoint.bind(l)}},s.prototype._renderCachedCanvas=function(t){!this.visible||this.worldAlpha<=0||!this.renderable||(this._initCachedDisplayObjectCanvas(t),this._cacheData.sprite.worldAlpha=this.worldAlpha,this._cacheData.sprite.renderCanvas(t))},s.prototype._initCachedDisplayObjectCanvas=function(t){if(!this._cacheData||!this._cacheData.sprite){
        var e=this.getLocalBounds(),i=t.context,s=new r.RenderTexture.create(0|e.width,0|e.height),o=n;this.transform.worldTransform.copy(o),o.invert(),o.tx-=e.x,o.ty-=e.y,this.renderCanvas=this._cacheData.originalRenderCanvas,t.render(this,s,!0,o,!1),t.context=i,this.renderCanvas=this._renderCachedCanvas,this.updateTransform=this.displayObjectUpdateTransform,this.getBounds=this._getCachedBounds,this._mask=null,this.filterArea=null;var a=new r.Sprite(s);a.transform.worldTransform=this.transform.worldTransform,a.anchor.x=-e.x/e.width,a.anchor.y=-e.y/e.height,this.updateTransform(),this._cacheData.sprite=a,this.containsPoint=a.containsPoint.bind(a)}},s.prototype._getCachedBounds=function(){return this._cacheData.sprite._currentBounds=null,this._cacheData.sprite.getBounds()},s.prototype._destroyCachedDisplayObject=function(){this._cacheData.sprite._texture.destroy(!0),this._cacheData.sprite=null},s.prototype._cacheAsBitmapDestroy=function(){this.cacheAsBitmap=!1,this.destroy()}},{"../core":97}],162:[function(t,e,i){var r=t("../core");r.DisplayObject.prototype.name=null,r.Container.prototype.getChildByName=function(t){for(var e=0;e<this.children.length;e++)if(this.children[e].name===t)return this.children[e];return null}},{"../core":97}],163:[function(t,e,i){var r=t("../core");r.DisplayObject.prototype.getGlobalPosition=function(t){return t=t||new r.Point,this.parent?(this.displayObjectUpdateTransform(),t.x=this.worldTransform.tx,t.y=this.worldTransform.ty):(t.x=this.position.x,t.y=this.position.y),t}},{"../core":97}],164:[function(t,e,i){t("./cacheAsBitmap"),t("./getChildByName"),t("./getGlobalPosition"),e.exports={MovieClip:t("./MovieClip"),TilingSprite:t("./TilingSprite"),BitmapText:t("./BitmapText")}},{"./BitmapText":158,"./MovieClip":159,"./TilingSprite":160,"./cacheAsBitmap":161,"./getChildByName":162,"./getGlobalPosition":163}],165:[function(t,e,i){function r(t){s.call(this,t,"#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\n\nuniform vec4 uFrame;\nuniform vec4 uTransform;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vec2 coord = aTextureCoord;\n    coord -= uTransform.xy;\n    coord /= uTransform.zw;\n    vTextureCoord = coord;\n}\n","#define GLSLIFY 1\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 uColor;\nuniform vec4 uFrame;\nuniform vec2 uPixelSize;\n\nvoid main(void)\n{\n\n   \tvec2 coord = mod(vTextureCoord, uFrame.zw);\n   \tcoord = clamp(coord, uPixelSize, uFrame.zw - uPixelSize);\n   \tcoord += uFrame.xy;\n\n   \tvec4 sample = texture2D(uSampler, coord);\n  \tvec4 color = vec4(uColor.rgb * uColor.a, uColor.a);\n\n   \tgl_FragColor = sample * color ;\n}\n")}var s=t("../../core/Shader");r.prototype=Object.create(s.prototype),r.prototype.constructor=r,e.exports=r},{"../../core/Shader":77}],166:[function(t,e,i){function r(t,e,i){s.Filter.call(this),this.blurXFilter=new n,this.blurYFilter=new o,this.resolution=1,this.padding=0,this.resolution=i||1,this.quality=e||4,this.blur=t||8}var s=t("../../core"),n=t("./BlurXFilter"),o=t("./BlurYFilter");r.prototype=Object.create(s.Filter.prototype),r.prototype.constructor=r,e.exports=r,r.prototype.apply=function(t,e,i){var r=t.getRenderTarget(!0);this.blurXFilter.apply(t,e,r,!0),this.blurYFilter.apply(t,r,i,!1),t.returnRenderTarget(r)},Object.defineProperties(r.prototype,{blur:{get:function(){return this.blurXFilter.blur},set:function(t){this.blurXFilter.blur=this.blurYFilter.blur=t,this.padding=2*Math.max(Math.abs(this.blurYFilter.strength),Math.abs(this.blurYFilter.strength))}},quality:{get:function(){return this.blurXFilter.quality},set:function(t){this.blurXFilter.quality=this.blurYFilter.quality=t}},blurX:{get:function(){return this.blurXFilter.blur},set:function(t){this.blurXFilter.blur=t,this.padding=2*Math.max(Math.abs(this.blurYFilter.strength),Math.abs(this.blurYFilter.strength))}},blurY:{get:function(){return this.blurYFilter.blur},set:function(t){this.blurYFilter.blur=t,this.padding=2*Math.max(Math.abs(this.blurYFilter.strength),Math.abs(this.blurYFilter.strength))}}})},{"../../core":97,"./BlurXFilter":167,"./BlurYFilter":168}],167:[function(t,e,i){function r(t,e,i){var r=n(5,!0),a=o(5);s.Filter.call(this,r,a),this.resolution=i||1,this._quality=0,this.quality=e||4,this.strength=t||8,this.firstRun=!0}var s=t("../../core"),n=t("./generateBlurVertSource"),o=t("./generateBlurFragSource"),a=t("./getMaxBlurKernelSize");r.prototype=Object.create(s.Filter.prototype),r.prototype.constructor=r,e.exports=r,r.prototype.apply=function(t,e,i,r){if(this.firstRun){var s=t.renderer.gl,h=a(s);this.vertexSrc=n(h,!0),this.fragmentSrc=o(h),this.firstRun=!1}if(this.uniforms.strength=1/i.size.width*(i.size.width/e.size.width),this.uniforms.strength*=this.strength,this.uniforms.strength/=this.passes,1===this.passes)t.applyFilter(this,e,i,r);else{for(var l=t.getRenderTarget(!0),u=e,c=l,d=0;d<this.passes-1;d++){t.applyFilter(this,u,c,!0);var p=c;c=u,u=p}t.applyFilter(this,u,i,r),t.returnRenderTarget(l)}},Object.defineProperties(r.prototype,{blur:{get:function(){return this.strength},set:function(t){this.padding=2*Math.abs(t),this.strength=t}},quality:{get:function(){return this._quality},set:function(t){this._quality=t,this.passes=t}}})},{"../../core":97,"./generateBlurFragSource":169,"./generateBlurVertSource":170,"./getMaxBlurKernelSize":171}],168:[function(t,e,i){function r(t,e,i){var r=n(5,!1),a=o(5);s.Filter.call(this,r,a),this.resolution=i||1,this._quality=0,this.quality=e||4,this.strength=t||8,this.firstRun=!0}var s=t("../../core"),n=t("./generateBlurVertSource"),o=t("./generateBlurFragSource"),a=t("./getMaxBlurKernelSize");r.prototype=Object.create(s.Filter.prototype),r.prototype.constructor=r,e.exports=r,r.prototype.apply=function(t,e,i,r){if(this.firstRun){var s=t.renderer.gl,h=a(s);this.vertexSrc=n(h,!1),this.fragmentSrc=o(h),this.firstRun=!1}if(this.uniforms.strength=1/i.size.height*(i.size.height/e.size.height),this.uniforms.strength*=this.strength,this.uniforms.strength/=this.passes,1===this.passes)t.applyFilter(this,e,i,r);else{for(var l=t.getRenderTarget(!0),u=e,c=l,d=0;d<this.passes-1;d++){t.applyFilter(this,u,c,!0);var p=c;c=u,u=p}t.applyFilter(this,u,i,r),t.returnRenderTarget(l)}},Object.defineProperties(r.prototype,{blur:{get:function(){return this.strength},set:function(t){this.padding=2*Math.abs(t),this.strength=t}},quality:{get:function(){return this._quality},set:function(t){this._quality=t,this.passes=t}}})},{"../../core":97,"./generateBlurFragSource":169,"./generateBlurVertSource":170,"./getMaxBlurKernelSize":171}],169:[function(t,e,i){var r={5:[.153388,.221461,.250301],7:[.071303,.131514,.189879,.214607],9:[.028532,.067234,.124009,.179044,.20236],11:[.0093,.028002,.065984,.121703,.175713,.198596],13:[.002406,.009255,.027867,.065666,.121117,.174868,.197641],15:[489e-6,.002403,.009246,.02784,.065602,.120999,.174697,.197448]},s=["varying vec2 vBlurTexCoords[%size%];","uniform sampler2D uSampler;","void main(void)","{","\tgl_FragColor = vec4(0.0);","\t%blur%","}"].join("\n"),n=function(t){for(var e,i=r[t],n=i.length,o=s,a="",h="gl_FragColor += texture2D(uSampler, vBlurTexCoords[%index%]) * %value%;",l=0;t>l;l++){var u=h.replace("%index%",l);e=l,l>=n&&(e=t-l-1),u=u.replace("%value%",i[e]),a+=u,a+="\n"}return o=o.replace("%blur%",a),o=o.replace("%size%",t)};e.exports=n},{}],170:[function(t,e,i){var r=["attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","uniform float strength;","uniform mat3 projectionMatrix;","varying vec2 vBlurTexCoords[%size%];","void main(void)","{","gl_Position = vec4((projectionMatrix * vec3((aVertexPosition), 1.0)).xy, 0.0, 1.0);","%blur%","}"].join("\n"),s=function(t,e){var i,s,n=Math.ceil(t/2),o=r,a="";i=e?"vBlurTexCoords[%index%] = aTextureCoord + vec2(%sampleIndex% * strength, 0.0);":"vBlurTexCoords[%index%] = aTextureCoord + vec2(0.0, %sampleIndex% * strength);";for(var h=0;t>h;h++){var l=i.replace("%index%",h);s=h,h>=n&&(s=t-h-1),l=l.replace("%sampleIndex%",h-(n-1)+".0"),a+=l,a+="\n"}return o=o.replace("%blur%",a),o=o.replace("%size%",t)};e.exports=s},{}],171:[function(t,e,i){var r=function(t){for(var e=t.getParameter(t.MAX_VARYING_VECTORS),i=15;i>e;)i-=2;return i};e.exports=r},{}],172:[function(t,e,i){function r(){s.Filter.call(this,"#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}","#define GLSLIFY 1\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float m[20];\n\nvoid main(void)\n{\n\n    vec4 c = texture2D(uSampler, vTextureCoord);\n\n    gl_FragColor.r = (m[0] * c.r);\n        gl_FragColor.r += (m[1] * c.g);\n        gl_FragColor.r += (m[2] * c.b);\n        gl_FragColor.r += (m[3] * c.a);\n        gl_FragColor.r += m[4] * c.a;\n\n    gl_FragColor.g = (m[5] * c.r);\n        gl_FragColor.g += (m[6] * c.g);\n        gl_FragColor.g += (m[7] * c.b);\n        gl_FragColor.g += (m[8] * c.a);\n        gl_FragColor.g += m[9] * c.a;\n\n     gl_FragColor.b = (m[10] * c.r);\n        gl_FragColor.b += (m[11] * c.g);\n        gl_FragColor.b += (m[12] * c.b);\n        gl_FragColor.b += (m[13] * c.a);\n        gl_FragColor.b += m[14] * c.a;\n\n     gl_FragColor.a = (m[15] * c.r);\n        gl_FragColor.a += (m[16] * c.g);\n        gl_FragColor.a += (m[17] * c.b);\n        gl_FragColor.a += (m[18] * c.a);\n        gl_FragColor.a += m[19] * c.a;\n\n//    gl_FragColor = vec4(m[0]);\n}\n"),this.uniforms.m=[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0]}var s=t("../../core");r.prototype=Object.create(s.Filter.prototype),r.prototype.constructor=r,e.exports=r,r.prototype._loadMatrix=function(t,e){e=!!e;var i=t;e&&(this._multiply(i,this.uniforms.m,t),i=this._colorMatrix(i)),this.uniforms.m=i},r.prototype._multiply=function(t,e,i){return t[0]=e[0]*i[0]+e[1]*i[5]+e[2]*i[10]+e[3]*i[15],t[1]=e[0]*i[1]+e[1]*i[6]+e[2]*i[11]+e[3]*i[16],t[2]=e[0]*i[2]+e[1]*i[7]+e[2]*i[12]+e[3]*i[17],t[3]=e[0]*i[3]+e[1]*i[8]+e[2]*i[13]+e[3]*i[18],t[4]=e[0]*i[4]+e[1]*i[9]+e[2]*i[14]+e[3]*i[19],t[5]=e[5]*i[0]+e[6]*i[5]+e[7]*i[10]+e[8]*i[15],t[6]=e[5]*i[1]+e[6]*i[6]+e[7]*i[11]+e[8]*i[16],t[7]=e[5]*i[2]+e[6]*i[7]+e[7]*i[12]+e[8]*i[17],t[8]=e[5]*i[3]+e[6]*i[8]+e[7]*i[13]+e[8]*i[18],t[9]=e[5]*i[4]+e[6]*i[9]+e[7]*i[14]+e[8]*i[19],t[10]=e[10]*i[0]+e[11]*i[5]+e[12]*i[10]+e[13]*i[15],t[11]=e[10]*i[1]+e[11]*i[6]+e[12]*i[11]+e[13]*i[16],t[12]=e[10]*i[2]+e[11]*i[7]+e[12]*i[12]+e[13]*i[17],t[13]=e[10]*i[3]+e[11]*i[8]+e[12]*i[13]+e[13]*i[18],t[14]=e[10]*i[4]+e[11]*i[9]+e[12]*i[14]+e[13]*i[19],t[15]=e[15]*i[0]+e[16]*i[5]+e[17]*i[10]+e[18]*i[15],t[16]=e[15]*i[1]+e[16]*i[6]+e[17]*i[11]+e[18]*i[16],t[17]=e[15]*i[2]+e[16]*i[7]+e[17]*i[12]+e[18]*i[17],t[18]=e[15]*i[3]+e[16]*i[8]+e[17]*i[13]+e[18]*i[18],t[19]=e[15]*i[4]+e[16]*i[9]+e[17]*i[14]+e[18]*i[19],t},r.prototype._colorMatrix=function(t){var e=new Float32Array(t);return e[4]/=255,e[9]/=255,e[14]/=255,e[19]/=255,e},r.prototype.brightness=function(t,e){var i=[t,0,0,0,0,0,t,0,0,0,0,0,t,0,0,0,0,0,1,0];this._loadMatrix(i,e)},r.prototype.greyscale=function(t,e){var i=[t,t,t,0,0,t,t,t,0,0,t,t,t,0,0,0,0,0,1,0];this._loadMatrix(i,e)},r.prototype.grayscale=r.prototype.greyscale,r.prototype.blackAndWhite=function(t){var e=[.3,.6,.1,0,0,.3,.6,.1,0,0,.3,.6,.1,0,0,0,0,0,1,0];this._loadMatrix(e,t)},r.prototype.hue=function(t,e){t=(t||0)/180*Math.PI;var i=Math.cos(t),r=Math.sin(t),s=Math.sqrt,n=1/3,o=s(n),a=i+(1-i)*n,h=n*(1-i)-o*r,l=n*(1-i)+o*r,u=n*(1-i)+o*r,c=i+n*(1-i),d=n*(1-i)-o*r,p=n*(1-i)-o*r,f=n*(1-i)+o*r,v=i+n*(1-i),_=[a,h,l,0,0,u,c,d,0,0,p,f,v,0,0,0,0,0,1,0];this._loadMatrix(_,e)},r.prototype.contrast=function(t,e){var i=(t||0)+1,r=-128*(i-1),s=[i,0,0,0,r,0,i,0,0,r,0,0,i,0,r,0,0,0,1,0];this._loadMatrix(s,e)},r.prototype.saturate=function(t,e){var i=2*(t||0)/3+1,r=-.5*(i-1),s=[i,r,r,0,0,r,i,r,0,0,r,r,i,0,0,0,0,0,1,0];this._loadMatrix(s,e)},r.prototype.desaturate=function(){this.saturate(-1)},r.prototype.negative=function(t){var e=[0,1,1,0,0,1,0,1,0,0,1,1,0,0,0,0,0,0,1,0];this._loadMatrix(e,t)},r.prototype.sepia=function(t){var e=[.393,.7689999,.18899999,0,0,.349,.6859999,.16799999,0,0,.272,.5339999,.13099999,0,0,0,0,0,1,0];this._loadMatrix(e,t)},r.prototype.technicolor=function(t){var e=[1.9125277891456083,-.8545344976951645,-.09155508482755585,0,11.793603434377337,-.3087833385928097,1.7658908555458428,-.10601743074722245,0,-70.35205161461398,-.231103377548616,-.7501899197440212,1.847597816108189,0,30.950940869491138,0,0,0,1,0];this._loadMatrix(e,t)},r.prototype.polaroid=function(t){var e=[1.438,-.062,-.062,0,0,-.122,1.378,-.122,0,0,-.016,-.016,1.483,0,0,0,0,0,1,0];this._loadMatrix(e,t)},r.prototype.toBGR=function(t){var e=[0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0];this._loadMatrix(e,t)},r.prototype.kodachrome=function(t){var e=[1.1285582396593525,-.3967382283601348,-.03992559172921793,0,63.72958762196502,-.16404339962244616,1.0835251566291304,-.05498805115633132,0,24.732407896706203,-.16786010706155763,-.5603416277695248,1.6014850761964943,0,35.62982807460946,0,0,0,1,0];this._loadMatrix(e,t)},r.prototype.browni=function(t){var e=[.5997023498159715,.34553243048391263,-.2708298674538042,0,47.43192855600873,-.037703249837783157,.8609577587992641,.15059552388459913,0,-36.96841498319127,.24113635128153335,-.07441037908422492,.44972182064877153,0,-7.562075277591283,0,0,0,1,0];this._loadMatrix(e,t)},r.prototype.vintage=function(t){var e=[.6279345635605994,.3202183420819367,-.03965408211312453,0,9.651285835294123,.02578397704808868,.6441188644374771,.03259127616149294,0,7.462829176470591,.0466055556782719,-.0851232987247891,.5241648018700465,0,5.159190588235296,0,0,0,1,0];this._loadMatrix(e,t)},r.prototype.colorTone=function(t,e,i,r,s){t=t||.2,e=e||.15,i=i||16770432,r=r||3375104;var n=(i>>16&255)/255,o=(i>>8&255)/255,a=(255&i)/255,h=(r>>16&255)/255,l=(r>>8&255)/255,u=(255&r)/255,c=[.3,.59,.11,0,0,n,o,a,t,0,h,l,u,e,0,n-h,o-l,a-u,0,0];this._loadMatrix(c,s)},r.prototype.night=function(t,e){t=t||.1;var i=[-2*t,-t,0,0,0,-t,0,t,0,0,0,t,2*t,0,0,0,0,0,1,0];this._loadMatrix(i,e)},r.prototype.predator=function(t,e){var i=[11.224130630493164*t,-4.794486999511719*t,-2.8746118545532227*t,0*t,.40342438220977783*t,-3.6330697536468506*t,9.193157196044922*t,-2.951810836791992*t,0*t,-1.316135048866272*t,-3.2184197902679443*t,-4.2375030517578125*t,7.476448059082031*t,0*t,.8044459223747253*t,0,0,0,1,0];this._loadMatrix(i,e)},r.prototype.lsd=function(t){var e=[2,-.4,.5,0,0,-.5,2,-.4,0,0,-.4,-.5,3,0,0,0,0,0,1,0];this._loadMatrix(e,t)},r.prototype.reset=function(){var t=[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0];this._loadMatrix(t,!1)},Object.defineProperties(r.prototype,{matrix:{get:function(){return this.uniforms.m},set:function(t){this.uniforms.m=t}}})},{"../../core":97}],173:[function(t,e,i){function r(t,e){var i=new s.Matrix;t.renderable=!1,s.Filter.call(this,"#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 filterMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vFilterCoord;\n\nvoid main(void)\n{\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vFilterCoord = ( filterMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n   vTextureCoord = aTextureCoord;\n}","#define GLSLIFY 1\nvarying vec2 vFilterCoord;\nvarying vec2 vTextureCoord;\n\nuniform vec2 scale;\n\nuniform sampler2D uSampler;\nuniform sampler2D mapSampler;\n\nuniform vec4 filterClamp;\n\nvoid main(void)\n{\n   vec4 map =  texture2D(mapSampler, vFilterCoord);\n\n   map -= 0.5;\n   map.xy *= scale;\n\n   gl_FragColor = texture2D(uSampler, clamp(vec2(vTextureCoord.x + map.x, vTextureCoord.y + map.y), filterClamp.xy, filterClamp.zw));\n}\n"),this.maskSprite=t,this.maskMatrix=i,this.uniforms.mapSampler=t.texture,this.uniforms.filterMatrix=i.toArray(!0),this.uniforms.scale={x:1,y:1},null!==e&&void 0!==e||(e=20),this.scale=new s.Point(e,e)}var s=t("../../core");r.prototype=Object.create(s.Filter.prototype),r.prototype.constructor=r,e.exports=r,r.prototype.apply=function(t,e,i){var r=1/i.destinationFrame.width*(i.size.width/e.size.width);this.uniforms.filterMatrix=t.calculateSpriteMatrix(this.maskMatrix,this.maskSprite),this.uniforms.scale.x=this.scale.x*r,this.uniforms.scale.y=this.scale.y*r,t.applyFilter(this,e,i)},Object.defineProperties(r.prototype,{map:{get:function(){return this.uniforms.mapSampler},set:function(t){this.uniforms.mapSampler=t}}})},{"../../core":97}],174:[function(t,e,i){function r(){s.Filter.call(this,"#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nuniform vec4 filterArea;\n\nvarying vec2 vTextureCoord;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvoid texcoords(vec2 fragCoord, vec2 resolution,\n               out vec2 v_rgbNW, out vec2 v_rgbNE,\n               out vec2 v_rgbSW, out vec2 v_rgbSE,\n               out vec2 v_rgbM) {\n    vec2 inverseVP = 1.0 / resolution.xy;\n    v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;\n    v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;\n    v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;\n    v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;\n    v_rgbM = vec2(fragCoord * inverseVP);\n}\n\nvoid main(void) {\n\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n   vTextureCoord = aTextureCoord;\n\n   vec2 fragCoord = vTextureCoord * filterArea.xy;\n\n   texcoords(fragCoord, filterArea.xy, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n}",'#define GLSLIFY 1\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\n/**\n Basic FXAA implementation based on the code on geeks3d.com with the\n modification that the texture2DLod stuff was removed since it\'s\n unsupported by WebGL.\n \n --\n \n From:\n https://github.com/mitsuhiko/webgl-meincraft\n \n Copyright (c) 2011 by Armin Ronacher.\n \n Some rights reserved.\n \n Redistribution and use in source and binary forms, with or without\n modification, are permitted provided that the following conditions are\n met:\n \n * Redistributions of source code must retain the above copyright\n notice, this list of conditions and the following disclaimer.\n \n * Redistributions in binary form must reproduce the above\n copyright notice, this list of conditions and the following\n disclaimer in the documentation and/or other materials provided\n with the distribution.\n \n * The names of the contributors may not be used to endorse or\n promote products derived from this software without specific\n prior written permission.\n \n THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\n LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\n A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\n OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\n SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\n LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\n DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\n THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\n OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n */\n\n#ifndef FXAA_REDUCE_MIN\n#define FXAA_REDUCE_MIN   (1.0/ 128.0)\n#endif\n#ifndef FXAA_REDUCE_MUL\n#define FXAA_REDUCE_MUL   (1.0 / 8.0)\n#endif\n#ifndef FXAA_SPAN_MAX\n#define FXAA_SPAN_MAX     8.0\n#endif\n\n//optimized version for mobile, where dependent\n//texture reads can be a bottleneck\nvec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 resolution,\n          vec2 v_rgbNW, vec2 v_rgbNE,\n          vec2 v_rgbSW, vec2 v_rgbSE,\n          vec2 v_rgbM) {\n    vec4 color;\n    mediump vec2 inverseVP = vec2(1.0 / resolution.x, 1.0 / resolution.y);\n    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;\n    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;\n    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;\n    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;\n    vec4 texColor = texture2D(tex, v_rgbM);\n    vec3 rgbM  = texColor.xyz;\n    vec3 luma = vec3(0.299, 0.587, 0.114);\n    float lumaNW = dot(rgbNW, luma);\n    float lumaNE = dot(rgbNE, luma);\n    float lumaSW = dot(rgbSW, luma);\n    float lumaSE = dot(rgbSE, luma);\n    float lumaM  = dot(rgbM,  luma);\n    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n    \n    mediump vec2 dir;\n    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n    \n    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *\n                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\n    \n    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),\n              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\n                  dir * rcpDirMin)) * inverseVP;\n    \n    vec3 rgbA = 0.5 * (\n                       texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +\n                       texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);\n    vec3 rgbB = rgbA * 0.5 + 0.25 * (\n                                     texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +\n                                     texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);\n    \n    float lumaB = dot(rgbB, luma);\n    if ((lumaB < lumaMin) || (lumaB > lumaMax))\n        color = vec4(rgbA, texColor.a);\n    else\n        color = vec4(rgbB, texColor.a);\n    return color;\n}\n\nvoid main() {\n\n  \tvec2 fragCoord = vTextureCoord * filterArea.xy;\n\n  \tvec4 color;\n\n    color = fxaa(uSampler, fragCoord, filterArea.xy, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n\n  \tgl_FragColor = color;\n}\n')}var s=t("../../core");r.prototype=Object.create(s.Filter.prototype),r.prototype.constructor=r,e.exports=r},{"../../core":97}],175:[function(t,e,i){e.exports={FXAAFilter:t("./fxaa/FXAAFilter"),NoiseFilter:t("./noise/NoiseFilter"),DisplacementFilter:t("./displacement/DisplacementFilter"),BlurFilter:t("./blur/BlurFilter"),BlurXFilter:t("./blur/BlurXFilter"),BlurYFilter:t("./blur/BlurYFilter"),ColorMatrixFilter:t("./colormatrix/ColorMatrixFilter"),VoidFilter:t("./void/VoidFilter")}},{"./blur/BlurFilter":166,"./blur/BlurXFilter":167,"./blur/BlurYFilter":168,"./colormatrix/ColorMatrixFilter":172,"./displacement/DisplacementFilter":173,"./fxaa/FXAAFilter":174,"./noise/NoiseFilter":176,"./void/VoidFilter":177}],176:[function(t,e,i){function r(){s.Filter.call(this,"#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}","precision highp float;\n#define GLSLIFY 1\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform float noise;\nuniform sampler2D uSampler;\n\nfloat rand(vec2 co)\n{\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main()\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    float diff = (rand(gl_FragCoord.xy) - 0.5) * noise;\n\n    color.r += diff;\n    color.g += diff;\n    color.b += diff;\n\n    gl_FragColor = color;\n}\n"),this.noise=.5}var s=t("../../core");r.prototype=Object.create(s.Filter.prototype),r.prototype.constructor=r,e.exports=r,Object.defineProperties(r.prototype,{noise:{get:function(){return this.uniforms.noise},set:function(t){this.uniforms.noise=t}}})},{"../../core":97}],177:[function(t,e,i){function r(){s.Filter.call(this,"#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}","#define GLSLIFY 1\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n   gl_FragColor = texture2D(uSampler, vTextureCoord);\n}\n"),this.glShaderKey="void"}var s=t("../../core");r.prototype=Object.create(s.Filter.prototype),r.prototype.constructor=r,e.exports=r},{"../../core":97}],178:[function(t,e,i){function r(){this.global=new s.Point,this.target=null,this.originalEvent=null}var s=t("../core");r.prototype.constructor=r,e.exports=r,r.prototype.getLocalPosition=function(t,e,i){return t.worldTransform.applyInverse(i||this.global,e)}},{"../core":97}],179:[function(t,e,i){function r(t,e){o.call(this),e=e||{},this.renderer=t,this.autoPreventDefault=void 0===e.autoPreventDefault||e.autoPreventDefault,this.interactionFrequency=e.interactionFrequency||10,this.mouse=new n,this.mouse.global.set(-999999),this.eventData={stopped:!1,target:null,type:null,data:this.mouse,stopPropagation:function(){this.stopped=!0}},this.interactiveDataPool=[],this.interactionDOMElement=null,this.moveWhenInside=!1,this.eventsAdded=!1,this.onMouseUp=this.onMouseUp.bind(this),this.processMouseUp=this.processMouseUp.bind(this),this.onMouseDown=this.onMouseDown.bind(this),this.processMouseDown=this.processMouseDown.bind(this),this.onMouseMove=this.onMouseMove.bind(this),this.processMouseMove=this.processMouseMove.bind(this),this.onMouseOut=this.onMouseOut.bind(this),this.processMouseOverOut=this.processMouseOverOut.bind(this),this.onMouseOver=this.onMouseOver.bind(this),this.onTouchStart=this.onTouchStart.bind(this),this.processTouchStart=this.processTouchStart.bind(this),this.onTouchEnd=this.onTouchEnd.bind(this),this.processTouchEnd=this.processTouchEnd.bind(this),this.onTouchMove=this.onTouchMove.bind(this),this.processTouchMove=this.processTouchMove.bind(this),this.defaultCursorStyle="inherit",this.currentCursorStyle="inherit",this._tempPoint=new s.Point,this.resolution=1,this.setTargetElement(this.renderer.view,this.renderer.resolution)}var s=t("../core"),n=t("./InteractionData"),o=t("eventemitter3");Object.assign(s.DisplayObject.prototype,t("./interactiveTarget")),r.prototype=Object.create(o.prototype),r.prototype.constructor=r,e.exports=r,r.prototype.setTargetElement=function(t,e){this.removeEvents(),this.interactionDOMElement=t,this.resolution=e||1,this.addEvents()},r.prototype.addEvents=function(){this.interactionDOMElement&&(s.ticker.shared.add(this.update,this),window.navigator.msPointerEnabled&&(this.interactionDOMElement.style["-ms-content-zooming"]="none",this.interactionDOMElement.style["-ms-touch-action"]="none"),window.document.addEventListener("mousemove",this.onMouseMove,!0),this.interactionDOMElement.addEventListener("mousedown",this.onMouseDown,!0),this.interactionDOMElement.addEventListener("mouseout",this.onMouseOut,!0),this.interactionDOMElement.addEventListener("mouseover",this.onMouseOver,!0),this.interactionDOMElement.addEventListener("touchstart",this.onTouchStart,!0),this.interactionDOMElement.addEventListener("touchend",this.onTouchEnd,!0),this.interactionDOMElement.addEventListener("touchmove",this.onTouchMove,!0),window.addEventListener("mouseup",this.onMouseUp,!0),this.eventsAdded=!0)},r.prototype.removeEvents=function(){this.interactionDOMElement&&(s.ticker.shared.remove(this.update),window.navigator.msPointerEnabled&&(this.interactionDOMElement.style["-ms-content-zooming"]="",this.interactionDOMElement.style["-ms-touch-action"]=""),window.document.removeEventListener("mousemove",this.onMouseMove,!0),this.interactionDOMElement.removeEventListener("mousedown",this.onMouseDown,!0),this.interactionDOMElement.removeEventListener("mouseout",this.onMouseOut,!0),this.interactionDOMElement.removeEventListener("mouseover",this.onMouseOver,!0),this.interactionDOMElement.removeEventListener("touchstart",this.onTouchStart,!0),this.interactionDOMElement.removeEventListener("touchend",this.onTouchEnd,!0),this.interactionDOMElement.removeEventListener("touchmove",this.onTouchMove,!0),this.interactionDOMElement=null,window.removeEventListener("mouseup",this.onMouseUp,!0),this.eventsAdded=!1)},r.prototype.update=function(t){if(this._deltaTime+=t,!(this._deltaTime<this.interactionFrequency)&&(this._deltaTime=0,this.interactionDOMElement)){if(this.didMove)return void(this.didMove=!1);this.cursor=this.defaultCursorStyle,this.processInteractive(this.mouse.global,this.renderer._lastObjectRendered,this.processMouseOverOut,!0),this.currentCursorStyle!==this.cursor&&(this.currentCursorStyle=this.cursor,this.interactionDOMElement.style.cursor=this.cursor)}},r.prototype.dispatchEvent=function(t,e,i){i.stopped||(i.target=t,i.type=e,t.emit(e,i),t[e]&&t[e](i))},r.prototype.mapPositionToPoint=function(t,e,i){var r;r=this.interactionDOMElement.parentElement?this.interactionDOMElement.getBoundingClientRect():{x:0,y:0,width:0,height:0},t.x=(e-r.left)*(this.interactionDOMElement.width/r.width)/this.resolution,t.y=(i-r.top)*(this.interactionDOMElement.height/r.height)/this.resolution},r.prototype.processInteractive=function(t,e,i,r,s){if(!e||!e.visible)return!1;var n=!1,o=s=e.interactive||s;if(e.hitArea&&(o=!1),r&&e._mask&&(e._mask.containsPoint(t)||(r=!1)),r&&e.filterArea&&(e.filterArea.contains(t.x,t.y)||(r=!1)),e.interactiveChildren)for(var a=e.children,h=a.length-1;h>=0;h--){var l=a[h];if(this.processInteractive(t,l,i,r,o)){if(!l.parent)continue;n=!0,o=!1,r=!1}}return s&&(r&&!n&&(e.hitArea?(e.worldTransform.applyInverse(t,this._tempPoint),n=e.hitArea.contains(this._tempPoint.x,this._tempPoint.y)):e.containsPoint&&(n=e.containsPoint(t))),e.interactive&&i(e,n)),n},r.prototype.onMouseDown=function(t){this.mouse.originalEvent=t,this.eventData.data=this.mouse,this.eventData.stopped=!1,this.mapPositionToPoint(this.mouse.global,t.clientX,t.clientY),this.autoPreventDefault&&this.mouse.originalEvent.preventDefault(),this.processInteractive(this.mouse.global,this.renderer._lastObjectRendered,this.processMouseDown,!0);var e=2===t.button||3===t.which;this.emit(e?"rightdown":"mousedown",this.eventData)},r.prototype.processMouseDown=function(t,e){var i=this.mouse.originalEvent,r=2===i.button||3===i.which;e&&(t[r?"_isRightDown":"_isLeftDown"]=!0,this.dispatchEvent(t,r?"rightdown":"mousedown",this.eventData))},r.prototype.onMouseUp=function(t){this.mouse.originalEvent=t,this.eventData.data=this.mouse,this.eventData.stopped=!1,this.mapPositionToPoint(this.mouse.global,t.clientX,t.clientY),this.processInteractive(this.mouse.global,this.renderer._lastObjectRendered,this.processMouseUp,!0);var e=2===t.button||3===t.which;this.emit(e?"rightup":"mouseup",this.eventData)},r.prototype.processMouseUp=function(t,e){var i=this.mouse.originalEvent,r=2===i.button||3===i.which,s=r?"_isRightDown":"_isLeftDown";e?(this.dispatchEvent(t,r?"rightup":"mouseup",this.eventData),t[s]&&(t[s]=!1,this.dispatchEvent(t,r?"rightclick":"click",this.eventData))):t[s]&&(t[s]=!1,this.dispatchEvent(t,r?"rightupoutside":"mouseupoutside",this.eventData))},r.prototype.onMouseMove=function(t){this.mouse.originalEvent=t,this.eventData.data=this.mouse,this.eventData.stopped=!1,this.mapPositionToPoint(this.mouse.global,t.clientX,t.clientY),this.didMove=!0,this.cursor=this.defaultCursorStyle,
        this.processInteractive(this.mouse.global,this.renderer._lastObjectRendered,this.processMouseMove,!0),this.emit("mousemove",this.eventData),this.currentCursorStyle!==this.cursor&&(this.currentCursorStyle=this.cursor,this.interactionDOMElement.style.cursor=this.cursor)},r.prototype.processMouseMove=function(t,e){this.processMouseOverOut(t,e),this.moveWhenInside&&!e||this.dispatchEvent(t,"mousemove",this.eventData)},r.prototype.onMouseOut=function(t){this.mouse.originalEvent=t,this.eventData.data=this.mouse,this.eventData.stopped=!1,this.mapPositionToPoint(this.mouse.global,t.clientX,t.clientY),this.interactionDOMElement.style.cursor=this.defaultCursorStyle,this.mapPositionToPoint(this.mouse.global,t.clientX,t.clientY),this.processInteractive(this.mouse.global,this.renderer._lastObjectRendered,this.processMouseOverOut,!1),this.emit("mouseout",this.eventData)},r.prototype.processMouseOverOut=function(t,e){e?(t._over||(t._over=!0,this.dispatchEvent(t,"mouseover",this.eventData)),t.buttonMode&&(this.cursor=t.defaultCursor)):t._over&&(t._over=!1,this.dispatchEvent(t,"mouseout",this.eventData))},r.prototype.onMouseOver=function(t){this.mouse.originalEvent=t,this.eventData.data=this.mouse,this.eventData.stopped=!1,this.emit("mouseover",this.eventData)},r.prototype.onTouchStart=function(t){this.autoPreventDefault&&t.preventDefault();for(var e=t.changedTouches,i=e.length,r=0;i>r;r++){var s=e[r],n=this.getTouchData(s);n.originalEvent=t,this.eventData.data=n,this.eventData.stopped=!1,this.processInteractive(n.global,this.renderer._lastObjectRendered,this.processTouchStart,!0),this.emit("touchstart",this.eventData),this.returnTouchData(n)}},r.prototype.processTouchStart=function(t,e){e&&(t._touchDown=!0,this.dispatchEvent(t,"touchstart",this.eventData))},r.prototype.onTouchEnd=function(t){this.autoPreventDefault&&t.preventDefault();for(var e=t.changedTouches,i=e.length,r=0;i>r;r++){var s=e[r],n=this.getTouchData(s);n.originalEvent=t,this.eventData.data=n,this.eventData.stopped=!1,this.processInteractive(n.global,this.renderer._lastObjectRendered,this.processTouchEnd,!0),this.emit("touchend",this.eventData),this.returnTouchData(n)}},r.prototype.processTouchEnd=function(t,e){e?(this.dispatchEvent(t,"touchend",this.eventData),t._touchDown&&(t._touchDown=!1,this.dispatchEvent(t,"tap",this.eventData))):t._touchDown&&(t._touchDown=!1,this.dispatchEvent(t,"touchendoutside",this.eventData))},r.prototype.onTouchMove=function(t){this.autoPreventDefault&&t.preventDefault();for(var e=t.changedTouches,i=e.length,r=0;i>r;r++){var s=e[r],n=this.getTouchData(s);n.originalEvent=t,this.eventData.data=n,this.eventData.stopped=!1,this.processInteractive(n.global,this.renderer._lastObjectRendered,this.processTouchMove,this.moveWhenInside),this.emit("touchmove",this.eventData),this.returnTouchData(n)}},r.prototype.processTouchMove=function(t,e){this.moveWhenInside&&!e||this.dispatchEvent(t,"touchmove",this.eventData)},r.prototype.getTouchData=function(t){var e=this.interactiveDataPool.pop();return e||(e=new n),e.identifier=t.identifier,this.mapPositionToPoint(e.global,t.clientX,t.clientY),navigator.isCocoonJS&&(e.global.x=e.global.x/this.resolution,e.global.y=e.global.y/this.resolution),t.globalX=e.global.x,t.globalY=e.global.y,e},r.prototype.returnTouchData=function(t){this.interactiveDataPool.push(t)},r.prototype.destroy=function(){this.removeEvents(),this.removeAllListeners(),this.renderer=null,this.mouse=null,this.eventData=null,this.interactiveDataPool=null,this.interactionDOMElement=null,this.onMouseUp=null,this.processMouseUp=null,this.onMouseDown=null,this.processMouseDown=null,this.onMouseMove=null,this.processMouseMove=null,this.onMouseOut=null,this.processMouseOverOut=null,this.onMouseOver=null,this.onTouchStart=null,this.processTouchStart=null,this.onTouchEnd=null,this.processTouchEnd=null,this.onTouchMove=null,this.processTouchMove=null,this._tempPoint=null},s.WebGLRenderer.registerPlugin("interaction",r),s.CanvasRenderer.registerPlugin("interaction",r)},{"../core":97,"./InteractionData":178,"./interactiveTarget":181,eventemitter3:3}],180:[function(t,e,i){e.exports={InteractionData:t("./InteractionData"),InteractionManager:t("./InteractionManager"),interactiveTarget:t("./interactiveTarget")}},{"./InteractionData":178,"./InteractionManager":179,"./interactiveTarget":181}],181:[function(t,e,i){var r={interactive:!1,interactiveChildren:!0,hitArea:null,buttonMode:!1,defaultCursor:"pointer",_over:!1,_isLeftDown:!1,_isRightDown:!1,_touchDown:!1};e.exports=r},{}],182:[function(t,e,i){function r(t,e){var i={},r=t.data.getElementsByTagName("info")[0],s=t.data.getElementsByTagName("common")[0];i.font=r.getAttribute("face"),i.size=parseInt(r.getAttribute("size"),10),i.lineHeight=parseInt(s.getAttribute("lineHeight"),10),i.chars={};for(var a=t.data.getElementsByTagName("char"),h=0;h<a.length;h++){var l=parseInt(a[h].getAttribute("id"),10),u=new n.Rectangle(parseInt(a[h].getAttribute("x"),10)+e.frame.x,parseInt(a[h].getAttribute("y"),10)+e.frame.y,parseInt(a[h].getAttribute("width"),10),parseInt(a[h].getAttribute("height"),10));i.chars[l]={xOffset:parseInt(a[h].getAttribute("xoffset"),10),yOffset:parseInt(a[h].getAttribute("yoffset"),10),xAdvance:parseInt(a[h].getAttribute("xadvance"),10),kerning:{},texture:new n.Texture(e.baseTexture,u)}}var c=t.data.getElementsByTagName("kerning");for(h=0;h<c.length;h++){var d=parseInt(c[h].getAttribute("first"),10),p=parseInt(c[h].getAttribute("second"),10),f=parseInt(c[h].getAttribute("amount"),10);i.chars[p]&&(i.chars[p].kerning[d]=f)}t.bitmapFont=i,o.BitmapText.fonts[i.font]=i}var s=t("resource-loader").Resource,n=t("../core"),o=t("../extras"),a=t("path");e.exports=function(){return function(t,e){if(!t.data||!t.isXml)return e();if(0===t.data.getElementsByTagName("page").length||0===t.data.getElementsByTagName("info").length||null===t.data.getElementsByTagName("info")[0].getAttribute("face"))return e();var i=t.isDataUrl?"":a.dirname(t.url);t.isDataUrl&&("."===i&&(i=""),this.baseUrl&&i&&("/"===this.baseUrl.charAt(this.baseUrl.length-1)&&(i+="/"),i=i.replace(this.baseUrl,""))),i&&"/"!==i.charAt(i.length-1)&&(i+="/");var o=i+t.data.getElementsByTagName("page")[0].getAttribute("file");if(n.utils.TextureCache[o])r(t,n.utils.TextureCache[o]),e();else{var h={crossOrigin:t.crossOrigin,loadType:s.LOAD_TYPE.IMAGE,metadata:t.metadata.imageMetadata};this.add(t.name+"_image",o,h,function(i){r(t,i.texture),e()})}}}},{"../core":97,"../extras":164,path:22,"resource-loader":71}],183:[function(t,e,i){e.exports={Loader:t("./loader"),bitmapFontParser:t("./bitmapFontParser"),spritesheetParser:t("./spritesheetParser"),textureParser:t("./textureParser"),Resource:t("resource-loader").Resource}},{"./bitmapFontParser":182,"./loader":184,"./spritesheetParser":185,"./textureParser":186,"resource-loader":71}],184:[function(t,e,i){function r(t,e){s.call(this,t,e);for(var i=0;i<r._pixiMiddleware.length;++i)this.use(r._pixiMiddleware[i]())}var s=t("resource-loader"),n=t("./textureParser"),o=t("./spritesheetParser"),a=t("./bitmapFontParser");r.prototype=Object.create(s.prototype),r.prototype.constructor=r,e.exports=r,r._pixiMiddleware=[s.middleware.parsing.blob,n,o,a],r.addPixiMiddleware=function(t){r._pixiMiddleware.push(t)};var h=s.Resource;h.setExtensionXhrType("fnt",h.XHR_RESPONSE_TYPE.DOCUMENT)},{"./bitmapFontParser":182,"./spritesheetParser":185,"./textureParser":186,"resource-loader":71}],185:[function(t,e,i){var r=t("resource-loader").Resource,s=t("path"),n=t("../core"),o=1e3;e.exports=function(){return function(t,e){var i,a=t.name+"_image";if(!t.data||!t.isJson||!t.data.frames||this.resources[a])return e();var h={crossOrigin:t.crossOrigin,loadType:r.LOAD_TYPE.IMAGE,metadata:t.metadata.imageMetadata};i=t.isDataUrl?t.data.meta.image:s.dirname(t.url.replace(this.baseUrl,""))+"/"+t.data.meta.image,this.add(a,i,h,function(i){function r(e,r){for(var s=e;r>s-e&&s<u.length;){var o=u[s],a=l[o].frame;if(a){var h=null,d=null,p=new n.Rectangle(0,0,l[o].sourceSize.w/c,l[o].sourceSize.h/c);h=l[o].rotated?new n.Rectangle(a.x/c,a.y/c,a.h/c,a.w/c):new n.Rectangle(a.x/c,a.y/c,a.w/c,a.h/c),l[o].trimmed&&(d=new n.Rectangle(l[o].spriteSourceSize.x/c,l[o].spriteSourceSize.y/c,l[o].spriteSourceSize.w/c,l[o].spriteSourceSize.h/c)),t.textures[o]=new n.Texture(i.texture.baseTexture,h,p,d,l[o].rotated?2:0),n.utils.TextureCache[o]=t.textures[o]}s++}}function s(){return d*o<u.length}function a(t){r(d*o,o),d++,setTimeout(t,0)}function h(){a(function(){s()?h():e()})}t.textures={};var l=t.data.frames,u=Object.keys(l),c=n.utils.getResolutionOfUrl(t.url),d=0;u.length<=o?(r(0,o),e()):h()})}}},{"../core":97,path:22,"resource-loader":71}],186:[function(t,e,i){var r=t("../core");e.exports=function(){return function(t,e){if(t.data&&t.isImage){var i=new r.BaseTexture(t.data,null,r.utils.getResolutionOfUrl(t.url));i.imageUrl=t.url,t.texture=new r.Texture(i),r.utils.BaseTextureCache[t.url]=i,r.utils.TextureCache[t.url]=t.texture}e()}}},{"../core":97}],187:[function(t,e,i){function r(t,e,i,n,o){s.Container.call(this),this._texture=null,this.uvs=i||new Float32Array([0,0,1,0,1,1,0,1]),this.vertices=e||new Float32Array([0,0,100,0,100,100,0,100]),this.indices=n||new Uint16Array([0,1,3,2]),this.dirty=0,this.indexDirty=0,this.blendMode=s.BLEND_MODES.NORMAL,this.canvasPadding=0,this.drawMode=o||r.DRAW_MODES.TRIANGLE_MESH,this.texture=t,this.shader=null,this.tintRgb=new Float32Array([1,1,1]),this._glDatas=[]}var s=t("../core"),n=t("pixi-gl-core"),o=t("./webgl/MeshShader"),a=new s.Point,h=new s.Polygon;r.prototype=Object.create(s.Container.prototype),r.prototype.constructor=r,e.exports=r,Object.defineProperties(r.prototype,{texture:{get:function(){return this._texture},set:function(t){this._texture!==t&&(this._texture=t,t&&(t.baseTexture.hasLoaded?this._onTextureUpdate():t.once("update",this._onTextureUpdate,this)))}},tint:{get:function(){return s.utils.rgb2hex(this.tintRgb)},set:function(t){this.tintRgb=s.utils.hex2rgb(t,this.tintRgb)}}}),r.prototype._renderWebGL=function(t){t.flush();var e=t.gl,i=this._glDatas[t.CONTEXT_UID];i||(i={shader:new o(e),vertexBuffer:n.GLBuffer.createVertexBuffer(e,this.vertices,e.STREAM_DRAW),uvBuffer:n.GLBuffer.createVertexBuffer(e,this.uvs,e.STREAM_DRAW),indexBuffer:n.GLBuffer.createIndexBuffer(e,this.indices,e.STATIC_DRAW),vao:new n.VertexArrayObject(e),dirty:this.dirty,indexDirty:this.indexDirty},i.vao=new n.VertexArrayObject(e).addIndex(i.indexBuffer).addAttribute(i.vertexBuffer,i.shader.attributes.aVertexPosition,e.FLOAT,!1,8,0).addAttribute(i.uvBuffer,i.shader.attributes.aTextureCoord,e.FLOAT,!1,8,0),this._glDatas[t.CONTEXT_UID]=i),this.dirty!==i.dirty&&(i.dirty=this.dirty,i.uvBuffer.upload()),this.indexDirty!==i.indexDirty&&(i.indexDirty=this.indexDirty,i.indexBuffer.upload()),i.vertexBuffer.upload(),t.bindShader(i.shader),t.bindTexture(this._texture,0),t.state.setBlendMode(this.blendMode),i.shader.uniforms.translationMatrix=this.worldTransform.toArray(!0),i.shader.uniforms.alpha=this.worldAlpha,i.shader.uniforms.tint=this.tintRgb;var s=this.drawMode===r.DRAW_MODES.TRIANGLE_MESH?e.TRIANGLE_STRIP:e.TRIANGLES;i.vao.bind().draw(s,this.indices.length).unbind()},r.prototype._renderCanvas=function(t){var e=t.context,i=this.worldTransform,s=t.resolution;t.roundPixels?e.setTransform(i.a*s,i.b*s,i.c*s,i.d*s,i.tx*s|0,i.ty*s|0):e.setTransform(i.a*s,i.b*s,i.c*s,i.d*s,i.tx*s,i.ty*s),this.drawMode===r.DRAW_MODES.TRIANGLE_MESH?this._renderCanvasTriangleMesh(e):this._renderCanvasTriangles(e)},r.prototype._renderCanvasTriangleMesh=function(t){for(var e=this.vertices,i=this.uvs,r=e.length/2,s=0;r-2>s;s++){var n=2*s;this._renderCanvasDrawTriangle(t,e,i,n,n+2,n+4)}},r.prototype._renderCanvasTriangles=function(t){for(var e=this.vertices,i=this.uvs,r=this.indices,s=r.length,n=0;s>n;n+=3){var o=2*r[n],a=2*r[n+1],h=2*r[n+2];this._renderCanvasDrawTriangle(t,e,i,o,a,h)}},r.prototype._renderCanvasDrawTriangle=function(t,e,i,r,s,n){var o=this._texture.baseTexture,a=o.source,h=o.width,l=o.height,u=e[r],c=e[s],d=e[n],p=e[r+1],f=e[s+1],v=e[n+1],_=i[r]*o.width,g=i[s]*o.width,m=i[n]*o.width,y=i[r+1]*o.height,x=i[s+1]*o.height,b=i[n+1]*o.height;if(this.canvasPadding>0){var T=this.canvasPadding/this.worldTransform.a,w=this.canvasPadding/this.worldTransform.d,E=(u+c+d)/3,S=(p+f+v)/3,A=u-E,R=p-S,O=Math.sqrt(A*A+R*R);u=E+A/O*(O+T),p=S+R/O*(O+w),A=c-E,R=f-S,O=Math.sqrt(A*A+R*R),c=E+A/O*(O+T),f=S+R/O*(O+w),A=d-E,R=v-S,O=Math.sqrt(A*A+R*R),d=E+A/O*(O+T),v=S+R/O*(O+w)}t.save(),t.beginPath(),t.moveTo(u,p),t.lineTo(c,f),t.lineTo(d,v),t.closePath(),t.clip();var P=_*x+y*m+g*b-x*m-y*g-_*b,M=u*x+y*d+c*b-x*d-y*c-u*b,C=_*c+u*m+g*d-c*m-u*g-_*d,L=_*x*d+y*c*m+u*g*b-u*x*m-y*g*d-_*c*b,D=p*x+y*v+f*b-x*v-y*f-p*b,I=_*f+p*m+g*v-f*m-p*g-_*v,j=_*x*v+y*f*m+p*g*b-p*x*m-y*g*v-_*f*b;t.transform(M/P,D/P,C/P,I/P,L/P,j/P),t.drawImage(a,0,0,h*o.resolution,l*o.resolution,0,0,h,l),t.restore()},r.prototype.renderMeshFlat=function(t){var e=this.context,i=t.vertices,r=i.length/2;e.beginPath();for(var s=1;r-2>s;s++){var n=2*s,o=i[n],a=i[n+2],h=i[n+4],l=i[n+1],u=i[n+3],c=i[n+5];e.moveTo(o,l),e.lineTo(a,u),e.lineTo(h,c)}e.fillStyle="#FF0000",e.fill(),e.closePath()},r.prototype._onTextureUpdate=function(){},r.prototype._calculateBounds=function(){this._bounds.addVertices(this.transform,this.vertices,0,this.vertices.length)},r.prototype.containsPoint=function(t){if(!this.getBounds().contains(t.x,t.y))return!1;this.worldTransform.applyInverse(t,a);for(var e=this.vertices,i=h.points,s=this.indices,n=this.indices.length,o=this.drawMode===r.DRAW_MODES.TRIANGLES?3:1,l=0;n>l+2;l+=o){var u=2*s[l],c=2*s[l+1],d=2*s[l+2];if(i[0]=e[u],i[1]=e[u+1],i[2]=e[c],i[3]=e[c+1],i[4]=e[d],i[5]=e[d+1],h.contains(a.x,a.y))return!0}return!1},r.DRAW_MODES={TRIANGLE_MESH:0,TRIANGLES:1}},{"../core":97,"./webgl/MeshShader":192,"pixi-gl-core":12}],188:[function(t,e,i){function r(t,e,i,r,o){n.call(this,t,4,4);var a=this.uvs;a[6]=a[14]=a[22]=a[30]=1,a[25]=a[27]=a[29]=a[31]=1,this._origWidth=t.width,this._origHeight=t.height,this._uvw=1/this._origWidth,this._uvh=1/this._origHeight,this.width=t.width,this.height=t.height,a[2]=a[10]=a[18]=a[26]=this._uvw*e,a[4]=a[12]=a[20]=a[28]=1-this._uvw*r,a[9]=a[11]=a[13]=a[15]=this._uvh*i,a[17]=a[19]=a[21]=a[23]=1-this._uvh*o,this.leftWidth=void 0!==e?e:s,this.rightWidth=void 0!==r?r:s,this.topHeight=void 0!==i?i:s,this.bottomHeight=void 0!==o?o:s}var s=10,n=t("./Plane");r.prototype=Object.create(n.prototype),r.prototype.constructor=r,e.exports=r,Object.defineProperties(r.prototype,{width:{get:function(){return this._width},set:function(t){this._width=t,this.updateVerticalVertices()}},height:{get:function(){return this._height},set:function(t){this._height=t,this.updateHorizontalVertices()}},leftWidth:{get:function(){return this._leftWidth},set:function(t){this._leftWidth=t;var e=this.uvs,i=this.vertices;e[2]=e[10]=e[18]=e[26]=this._uvw*t,i[2]=i[10]=i[18]=i[26]=t,this.dirty=!0}},rightWidth:{get:function(){return this._rightWidth},set:function(t){this._rightWidth=t;var e=this.uvs,i=this.vertices;e[4]=e[12]=e[20]=e[28]=1-this._uvw*t,i[4]=i[12]=i[20]=i[28]=this._width-t,this.dirty=!0}},topHeight:{get:function(){return this._topHeight},set:function(t){this._topHeight=t;var e=this.uvs,i=this.vertices;e[9]=e[11]=e[13]=e[15]=this._uvh*t,i[9]=i[11]=i[13]=i[15]=t,this.dirty=!0}},bottomHeight:{get:function(){return this._bottomHeight},set:function(t){this._bottomHeight=t;var e=this.uvs,i=this.vertices;e[17]=e[19]=e[21]=e[23]=1-this._uvh*t,i[17]=i[19]=i[21]=i[23]=this._height-t,this.dirty=!0}}}),r.prototype.updateHorizontalVertices=function(){var t=this.vertices;t[9]=t[11]=t[13]=t[15]=this._topHeight,t[17]=t[19]=t[21]=t[23]=this._height-this._bottomHeight,t[25]=t[27]=t[29]=t[31]=this._height},r.prototype.updateVerticalVertices=function(){var t=this.vertices;t[2]=t[10]=t[18]=t[26]=this._leftWidth,t[4]=t[12]=t[20]=t[28]=this._width-this._rightWidth,t[6]=t[14]=t[22]=t[30]=this._width},r.prototype._renderCanvas=function(t){var e=t.context;e.globalAlpha=this.worldAlpha;var i=this.worldTransform,r=t.resolution;t.roundPixels?e.setTransform(i.a*r,i.b*r,i.c*r,i.d*r,i.tx*r|0,i.ty*r|0):e.setTransform(i.a*r,i.b*r,i.c*r,i.d*r,i.tx*r,i.ty*r);var s=this._texture.baseTexture,n=s.source,o=s.width,a=s.height;this.drawSegment(e,n,o,a,0,1,10,11),this.drawSegment(e,n,o,a,2,3,12,13),this.drawSegment(e,n,o,a,4,5,14,15),this.drawSegment(e,n,o,a,8,9,18,19),this.drawSegment(e,n,o,a,10,11,20,21),this.drawSegment(e,n,o,a,12,13,22,23),this.drawSegment(e,n,o,a,16,17,26,27),this.drawSegment(e,n,o,a,18,19,28,29),this.drawSegment(e,n,o,a,20,21,30,31)},r.prototype.drawSegment=function(t,e,i,r,s,n,o,a){var h=this.uvs,l=this.vertices,u=(h[o]-h[s])*i,c=(h[a]-h[n])*r,d=l[o]-l[s],p=l[a]-l[n];1>u&&(u=1),1>c&&(c=1),1>d&&(d=1),1>p&&(p=1),t.drawImage(e,h[s]*i,h[n]*r,u,c,l[s],l[n],d,p)}},{"./Plane":189}],189:[function(t,e,i){function r(t,e,i){s.call(this,t),this._ready=!0,this.verticesX=e||10,this.verticesY=i||10,this.drawMode=s.DRAW_MODES.TRIANGLES,this.refresh()}var s=t("./Mesh");r.prototype=Object.create(s.prototype),r.prototype.constructor=r,e.exports=r,r.prototype.refresh=function(){var t=this.verticesX*this.verticesY,e=[],i=[],r=[],s=[],n=this.texture,o=this.verticesX-1,a=this.verticesY-1,h=0,l=n.width/o,u=n.height/a;for(h=0;t>h;h++){var c=h%this.verticesX,d=h/this.verticesX|0;e.push(c*l,d*u),r.push(n._uvs.x0+(n._uvs.x1-n._uvs.x0)*(c/(this.verticesX-1)),n._uvs.y0+(n._uvs.y3-n._uvs.y0)*(d/(this.verticesY-1)))}var p=o*a;for(h=0;p>h;h++){var f=h%o,v=h/o|0,_=v*this.verticesX+f,g=v*this.verticesX+f+1,m=(v+1)*this.verticesX+f,y=(v+1)*this.verticesX+f+1;s.push(_,g,m),s.push(g,y,m)}this.vertices=new Float32Array(e),this.uvs=new Float32Array(r),this.colors=new Float32Array(i),this.indices=new Uint16Array(s),this.indexDirty=!0},r.prototype._onTextureUpdate=function(){s.prototype._onTextureUpdate.call(this),this._ready&&this.refresh()}},{"./Mesh":187}],190:[function(t,e,i){function r(t,e){s.call(this,t),this.points=e,this.vertices=new Float32Array(4*e.length),this.uvs=new Float32Array(4*e.length),this.colors=new Float32Array(2*e.length),this.indices=new Uint16Array(2*e.length),this._ready=!0,this.refresh()}var s=t("./Mesh"),n=t("../core");r.prototype=Object.create(s.prototype),r.prototype.constructor=r,e.exports=r,r.prototype.refresh=function(){var t=this.points;if(!(t.length<1)&&this._texture._uvs){var e=this.uvs,i=this.indices,r=this.colors,s=this._texture._uvs,o=new n.Point(s.x0,s.y0),a=new n.Point(s.x2-s.x0,s.y2-s.y0);e[0]=0+o.x,e[1]=0+o.y,e[2]=0+o.x,e[3]=1*a.y+o.y,r[0]=1,r[1]=1,i[0]=0,i[1]=1;for(var h,l,u,c=t.length,d=1;c>d;d++)h=t[d],l=4*d,u=d/(c-1),e[l]=u*a.x+o.x,e[l+1]=0+o.y,e[l+2]=u*a.x+o.x,e[l+3]=1*a.y+o.y,l=2*d,r[l]=1,r[l+1]=1,l=2*d,i[l]=l,i[l+1]=l+1;this.dirty=!0,this.indexDirty=!0}},r.prototype._onTextureUpdate=function(){s.prototype._onTextureUpdate.call(this),this._ready&&this.refresh()},r.prototype.updateTransform=function(){var t=this.points;if(!(t.length<1)){for(var e,i,r,s,n,o,a=t[0],h=0,l=0,u=this.vertices,c=t.length,d=0;c>d;d++)i=t[d],r=4*d,e=d<t.length-1?t[d+1]:i,l=-(e.x-a.x),h=e.y-a.y,s=10*(1-d/(c-1)),s>1&&(s=1),n=Math.sqrt(h*h+l*l),o=this._texture.height/2,h/=n,l/=n,h*=o,l*=o,u[r]=i.x+h,u[r+1]=i.y+l,u[r+2]=i.x-h,u[r+3]=i.y-l,a=i;this.containerUpdateTransform()}}},{"../core":97,"./Mesh":187}],191:[function(t,e,i){e.exports={Mesh:t("./Mesh"),Plane:t("./Plane"),NineSlicePlane:t("./NineSlicePlane"),Rope:t("./Rope"),MeshShader:t("./webgl/MeshShader")}},{"./Mesh":187,"./NineSlicePlane":188,"./Plane":189,"./Rope":190,"./webgl/MeshShader":192}],192:[function(t,e,i){function r(t){s.call(this,t,["attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","uniform mat3 translationMatrix;","uniform mat3 projectionMatrix;","varying vec2 vTextureCoord;","void main(void){","   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);","   vTextureCoord = aTextureCoord;","}"].join("\n"),["varying vec2 vTextureCoord;","uniform float alpha;","uniform vec3 tint;","uniform sampler2D uSampler;","void main(void){","   gl_FragColor = texture2D(uSampler, vTextureCoord) * vec4(tint * alpha, alpha);","}"].join("\n"))}var s=t("../../core/Shader");r.prototype=Object.create(s.prototype),r.prototype.constructor=r,e.exports=r},{"../../core/Shader":77}],193:[function(t,e,i){function r(t,e,i){s.Container.call(this),i=i||15e3,t=t||15e3;var r=16384;i>r&&(i=r),i>t&&(i=t),this._properties=[!1,!0,!1,!1,!1],this._maxSize=t,this._batchSize=i,this._glBuffers=[],this._bufferToUpdate=0,this.interactiveChildren=!1,this.blendMode=s.BLEND_MODES.NORMAL,this.roundPixels=!0,this.baseTexture=null,this.setProperties(e)}var s=t("../core");r.prototype=Object.create(s.Container.prototype),r.prototype.constructor=r,e.exports=r,r.prototype.setProperties=function(t){t&&(this._properties[0]="scale"in t?!!t.scale:this._properties[0],this._properties[1]="position"in t?!!t.position:this._properties[1],this._properties[2]="rotation"in t?!!t.rotation:this._properties[2],this._properties[3]="uvs"in t?!!t.uvs:this._properties[3],this._properties[4]="alpha"in t?!!t.alpha:this._properties[4])},r.prototype.updateTransform=function(){this.displayObjectUpdateTransform()},r.prototype.renderWebGL=function(t){this.visible&&!(this.worldAlpha<=0)&&this.children.length&&this.renderable&&(this.baseTexture||(this.baseTexture=this.children[0]._texture.baseTexture,this.baseTexture.hasLoaded||this.baseTexture.once("update",function(){this.onChildrenChange(0)},this)),t.setObjectRenderer(t.plugins.particle),t.plugins.particle.render(this))},r.prototype.onChildrenChange=function(t){var e=Math.floor(t/this._batchSize);e<this._bufferToUpdate&&(this._bufferToUpdate=e)},r.prototype.renderCanvas=function(t){if(this.visible&&!(this.worldAlpha<=0)&&this.children.length&&this.renderable){var e=t.context,i=this.worldTransform,r=!0,s=0,n=0,o=0,a=0,h=t.blendModes[this.blendMode];h!==e.globalCompositeOperation&&(e.globalCompositeOperation=h),e.globalAlpha=this.worldAlpha,this.displayObjectUpdateTransform();for(var l=0;l<this.children.length;++l){var u=this.children[l];if(u.visible){var c=u.texture.frame;if(e.globalAlpha=this.worldAlpha*u.alpha,u.rotation%(2*Math.PI)==0)r&&(e.setTransform(i.a,i.b,i.c,i.d,i.tx*t.resolution,i.ty*t.resolution),r=!1),s=u.anchor.x*(-c.width*u.scale.x)+u.position.x+.5,n=u.anchor.y*(-c.height*u.scale.y)+u.position.y+.5,o=c.width*u.scale.x,a=c.height*u.scale.y;else{r||(r=!0),u.displayObjectUpdateTransform();var d=u.worldTransform;t.roundPixels?e.setTransform(d.a,d.b,d.c,d.d,d.tx*t.resolution|0,d.ty*t.resolution|0):e.setTransform(d.a,d.b,d.c,d.d,d.tx*t.resolution,d.ty*t.resolution),s=u.anchor.x*-c.width+.5,n=u.anchor.y*-c.height+.5,o=c.width,a=c.height}var p=u.texture.baseTexture.resolution;e.drawImage(u.texture.baseTexture.source,c.x*p,c.y*p,c.width*p,c.height*p,s*p,n*p,o*p,a*p)}}}},r.prototype.destroy=function(){if(s.Container.prototype.destroy.apply(this,arguments),this._buffers)for(var t=0;t<this._buffers.length;++t)this._buffers[t].destroy();this._properties=null,this._buffers=null}},{"../core":97}],194:[function(t,e,i){e.exports={ParticleContainer:t("./ParticleContainer"),ParticleRenderer:t("./webgl/ParticleRenderer")}},{"./ParticleContainer":193,"./webgl/ParticleRenderer":196}],195:[function(t,e,i){function r(t,e,i,r){this.gl=t,this.vertSize=2,this.vertByteSize=4*this.vertSize,this.size=r,this.dynamicProperties=[],this.staticProperties=[];for(var s=0;s<e.length;s++){var n=e[s];n={attribute:n.attribute,size:n.size,uploadFunction:n.uploadFunction,offset:n.offset},i[s]?this.dynamicProperties.push(n):this.staticProperties.push(n)}this.staticStride=0,this.staticBuffer=null,this.staticData=null,this.dynamicStride=0,this.dynamicBuffer=null,this.dynamicData=null,this.initBuffers()}var s=t("pixi-gl-core"),n=t("../../core/utils/createIndicesForQuads");r.prototype.constructor=r,e.exports=r,r.prototype.initBuffers=function(){var t,e,i=this.gl,r=0;for(this.indices=n(this.size),this.indexBuffer=s.GLBuffer.createIndexBuffer(i,this.indices,i.STATIC_DRAW),this.dynamicStride=0,t=0;t<this.dynamicProperties.length;t++)e=this.dynamicProperties[t],e.offset=r,r+=e.size,this.dynamicStride+=e.size;this.dynamicData=new Float32Array(this.size*this.dynamicStride*4),this.dynamicBuffer=s.GLBuffer.createVertexBuffer(i,this.dynamicData,i.STREAM_DRAW);var o=0;for(this.staticStride=0,t=0;t<this.staticProperties.length;t++)e=this.staticProperties[t],e.offset=o,o+=e.size,this.staticStride+=e.size;for(this.staticData=new Float32Array(this.size*this.staticStride*4),this.staticBuffer=s.GLBuffer.createVertexBuffer(i,this.staticData,i.STATIC_DRAW),this.vao=new s.VertexArrayObject(i).addIndex(this.indexBuffer),t=0;t<this.dynamicProperties.length;t++)e=this.dynamicProperties[t],this.vao.addAttribute(this.dynamicBuffer,e.attribute,i.FLOAT,!1,4*this.dynamicStride,4*e.offset);for(t=0;t<this.staticProperties.length;t++)e=this.staticProperties[t],this.vao.addAttribute(this.staticBuffer,e.attribute,i.FLOAT,!1,4*this.staticStride,4*e.offset)},r.prototype.uploadDynamic=function(t,e,i){for(var r=0;r<this.dynamicProperties.length;r++){var s=this.dynamicProperties[r];s.uploadFunction(t,e,i,this.dynamicData,this.dynamicStride,s.offset)}this.dynamicBuffer.upload()},r.prototype.uploadStatic=function(t,e,i){for(var r=0;r<this.staticProperties.length;r++){var s=this.staticProperties[r];s.uploadFunction(t,e,i,this.staticData,this.staticStride,s.offset)}this.staticBuffer.upload()},r.prototype.bind=function(){this.vao.bind()},r.prototype.destroy=function(){this.dynamicProperties=null,this.dynamicData=null,this.dynamicBuffer.destroy(),this.staticProperties=null,this.staticData=null,this.staticBuffer.destroy()}},{"../../core/utils/createIndicesForQuads":149,"pixi-gl-core":12}],196:[function(t,e,i){function r(t){s.ObjectRenderer.call(this,t),this.shader=null,this.indexBuffer=null,this.properties=null,this.tempMatrix=new s.Matrix,this.CONTEXT_UID=0}var s=t("../../core"),n=t("./ParticleShader"),o=t("./ParticleBuffer");r.prototype=Object.create(s.ObjectRenderer.prototype),r.prototype.constructor=r,e.exports=r,s.WebGLRenderer.registerPlugin("particle",r),r.prototype.onContextChange=function(){var t=this.renderer.gl;this.CONTEXT_UID=this.renderer.CONTEXT_UID,this.shader=new n(t),this.properties=[{attribute:this.shader.attributes.aVertexPosition,size:2,uploadFunction:this.uploadVertices,offset:0},{attribute:this.shader.attributes.aPositionCoord,size:2,uploadFunction:this.uploadPosition,offset:0},{attribute:this.shader.attributes.aRotation,size:1,uploadFunction:this.uploadRotation,offset:0},{attribute:this.shader.attributes.aTextureCoord,size:2,uploadFunction:this.uploadUvs,offset:0},{attribute:this.shader.attributes.aColor,size:1,uploadFunction:this.uploadAlpha,offset:0}]},r.prototype.start=function(){this.renderer.bindShader(this.shader)},r.prototype.render=function(t){var e=t.children,i=e.length,r=t._maxSize,s=t._batchSize;if(0!==i){i>r&&(i=r);var n=t._glBuffers[this.renderer.CONTEXT_UID];n||(n=t._glBuffers[this.renderer.CONTEXT_UID]=this.generateBuffers(t)),this.renderer.setBlendMode(t.blendMode);var o=this.renderer.gl,a=t.worldTransform.copy(this.tempMatrix);a.prepend(this.renderer._activeRenderTarget.projectionMatrix),this.shader.uniforms.projectionMatrix=a.toArray(!0),this.shader.uniforms.uAlpha=t.worldAlpha;var h=e[0]._texture.baseTexture;this.renderer.bindTexture(h);for(var l=0,u=0;i>l;l+=s,u+=1){var c=i-l;c>s&&(c=s);var d=n[u];d.uploadDynamic(e,l,c),t._bufferToUpdate===u&&(d.uploadStatic(e,l,c),t._bufferToUpdate=u+1),d.vao.bind().draw(o.TRIANGLES,6*c).unbind()}}},r.prototype.generateBuffers=function(t){var e,i=this.renderer.gl,r=[],s=t._maxSize,n=t._batchSize,a=t._properties;for(e=0;s>e;e+=n)r.push(new o(i,this.properties,a,n));return r},r.prototype.uploadVertices=function(t,e,i,r,s,n){for(var o,a,h,l,u,c,d,p,f,v,_=0;i>_;_++)o=t[e+_],a=o._texture,u=o.scale.x,c=o.scale.y,h=a.trim,l=a.orig,h?(p=h.x-o.anchor.x*l.width,d=p+h.width,v=h.y-o.anchor.y*l.height,f=v+h.height):(d=l.width*(1-o.anchor.x),p=l.width*-o.anchor.x,f=l.height*(1-o.anchor.y),v=l.height*-o.anchor.y),r[n]=p*u,r[n+1]=v*c,r[n+s]=d*u,r[n+s+1]=v*c,r[n+2*s]=d*u,r[n+2*s+1]=f*c,r[n+3*s]=p*u,r[n+3*s+1]=f*c,n+=4*s},r.prototype.uploadPosition=function(t,e,i,r,s,n){for(var o=0;i>o;o++){var a=t[e+o].position;r[n]=a.x,r[n+1]=a.y,r[n+s]=a.x,r[n+s+1]=a.y,r[n+2*s]=a.x,r[n+2*s+1]=a.y,r[n+3*s]=a.x,r[n+3*s+1]=a.y,n+=4*s}},r.prototype.uploadRotation=function(t,e,i,r,s,n){for(var o=0;i>o;o++){var a=t[e+o].rotation;r[n]=a,r[n+s]=a,r[n+2*s]=a,r[n+3*s]=a,n+=4*s}},r.prototype.uploadUvs=function(t,e,i,r,s,n){for(var o=0;i>o;o++){var a=t[e+o]._texture._uvs;a?(r[n]=a.x0,r[n+1]=a.y0,r[n+s]=a.x1,r[n+s+1]=a.y1,r[n+2*s]=a.x2,r[n+2*s+1]=a.y2,r[n+3*s]=a.x3,r[n+3*s+1]=a.y3,n+=4*s):(r[n]=0,r[n+1]=0,r[n+s]=0,r[n+s+1]=0,r[n+2*s]=0,r[n+2*s+1]=0,r[n+3*s]=0,r[n+3*s+1]=0,n+=4*s)}},r.prototype.uploadAlpha=function(t,e,i,r,s,n){for(var o=0;i>o;o++){var a=t[e+o].alpha;r[n]=a,r[n+s]=a,r[n+2*s]=a,r[n+3*s]=a,n+=4*s}},r.prototype.destroy=function(){this.renderer.gl&&this.renderer.gl.deleteBuffer(this.indexBuffer),s.ObjectRenderer.prototype.destroy.apply(this,arguments),this.shader.destroy(),this.indices=null,this.tempMatrix=null}},{"../../core":97,"./ParticleBuffer":195,"./ParticleShader":197}],197:[function(t,e,i){function r(t){s.call(this,t,["attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","attribute float aColor;","attribute vec2 aPositionCoord;","attribute vec2 aScale;","attribute float aRotation;","uniform mat3 projectionMatrix;","varying vec2 vTextureCoord;","varying float vColor;","void main(void){","   vec2 v = aVertexPosition;","   v.x = (aVertexPosition.x) * cos(aRotation) - (aVertexPosition.y) * sin(aRotation);","   v.y = (aVertexPosition.x) * sin(aRotation) + (aVertexPosition.y) * cos(aRotation);","   v = v + aPositionCoord;","   gl_Position = vec4((projectionMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);","   vTextureCoord = aTextureCoord;","   vColor = aColor;","}"].join("\n"),["varying vec2 vTextureCoord;","varying float vColor;","uniform sampler2D uSampler;","uniform float uAlpha;","void main(void){","  vec4 color = texture2D(uSampler, vTextureCoord) * vColor * uAlpha;","  if (color.a == 0.0) discard;","  gl_FragColor = color;","}"].join("\n"))}var s=t("../../core/Shader");r.prototype=Object.create(s.prototype),r.prototype.constructor=r,e.exports=r},{"../../core/Shader":77}],198:[function(t,e,i){Math.sign||(Math.sign=function(t){return t=+t,0===t||isNaN(t)?t:t>0?1:-1})},{}],199:[function(t,e,i){Object.assign||(Object.assign=t("object-assign"))},{"object-assign":5}],200:[function(t,e,i){t("./Object.assign"),t("./requestAnimationFrame"),t("./Math.sign"),window.ArrayBuffer||(window.ArrayBuffer=Array),window.Float32Array||(window.Float32Array=Array),window.Uint32Array||(window.Uint32Array=Array),window.Uint16Array||(window.Uint16Array=Array)},{"./Math.sign":198,"./Object.assign":199,"./requestAnimationFrame":201}],201:[function(t,e,i){(function(t){if(Date.now&&Date.prototype.getTime||(Date.now=function(){return(new Date).getTime()}),!t.performance||!t.performance.now){var e=Date.now();t.performance||(t.performance={}),t.performance.now=function(){return Date.now()-e}}for(var i=Date.now(),r=["ms","moz","webkit","o"],s=0;s<r.length&&!t.requestAnimationFrame;++s)t.requestAnimationFrame=t[r[s]+"RequestAnimationFrame"],t.cancelAnimationFrame=t[r[s]+"CancelAnimationFrame"]||t[r[s]+"CancelRequestAnimationFrame"];t.requestAnimationFrame||(t.requestAnimationFrame=function(t){if("function"!=typeof t)throw new TypeError(t+"is not a function");var e=Date.now(),r=16+i-e;return 0>r&&(r=0),i=e,setTimeout(function(){i=Date.now(),t(performance.now())},r)}),t.cancelAnimationFrame||(t.cancelAnimationFrame=function(t){clearTimeout(t)})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],202:[function(t,e,i){function r(){}var s=t("../../core");r.prototype.constructor=r,e.exports=r,r.prototype.upload=function(t,e){"function"==typeof t&&(e=t,t=null),e()},r.prototype.register=function(){return this},
        r.prototype.add=function(){return this},r.prototype.destroy=function(){},s.CanvasRenderer.registerPlugin("prepare",r)},{"../../core":97}],203:[function(t,e,i){e.exports={webGL:t("./webgl/WebGLPrepare"),canvas:t("./canvas/CanvasPrepare")}},{"./canvas/CanvasPrepare":202,"./webgl/WebGLPrepare":204}],204:[function(t,e,i){function r(t){this.renderer=t,this.queue=[],this.addHooks=[],this.uploadHooks=[],this.completes=[],this.ticking=!1,this.register(o,s).register(a,n)}function s(t,e){return e instanceof h.BaseTexture&&(t.textureManager.updateTexture(e),!0)}function n(t,e){return e instanceof h.Graphics&&(t.plugins.graphics.updateGraphics(e),!0)}function o(t,e){if(t instanceof h.BaseTexture)return-1===e.indexOf(t)&&e.push(t),!0;if(t._texture&&t._texture instanceof h.Texture){var i=t._texture.baseTexture;return-1===e.indexOf(i)&&e.push(i),!0}return!1}function a(t,e){return t instanceof h.Graphics&&(e.push(t),!0)}var h=t("../../core"),l=h.ticker.shared;r.UPLOADS_PER_FRAME=4,r.prototype.constructor=r,e.exports=r,r.prototype.upload=function(t,e){"function"==typeof t&&(e=t,t=null),t&&this.add(t),this.queue.length?(this.numLeft=r.UPLOADS_PER_FRAME,this.completes.push(e),this.ticking||(this.ticking=!0,l.add(this.tick,this))):e()},r.prototype.tick=function(){for(var t,e;this.queue.length&&this.numLeft>0;){var i=this.queue[0],s=!1;for(t=0,e=this.uploadHooks.length;e>t;t++)if(this.uploadHooks[t](this.renderer,i)){this.numLeft--,this.queue.shift(),s=!0;break}s||this.queue.shift()}if(this.queue.length)this.numLeft=r.UPLOADS_PER_FRAME;else{this.ticking=!1,l.remove(this.tick,this);var n=this.completes.slice(0);for(this.completes.length=0,t=0,e=n.length;e>t;t++)n[t]()}},r.prototype.register=function(t,e){return t&&this.addHooks.push(t),e&&this.uploadHooks.push(e),this},r.prototype.add=function(t){var e,i;for(e=0,i=this.addHooks.length;i>e&&!this.addHooks[e](t,this.queue);e++);if(t instanceof h.Container)for(e=t.children.length-1;e>=0;e--)this.add(t.children[e]);return this},r.prototype.destroy=function(){this.ticking&&l.remove(this.tick,this),this.ticking=!1,this.addHooks=null,this.uploadHooks=null,this.renderer=null,this.completes=null,this.queue=null},h.WebGLRenderer.registerPlugin("prepare",r)},{"../../core":97}],205:[function(t,e,i){(function(i){t("./polyfill");var r=e.exports=t("./core");r.extras=t("./extras"),r.filters=t("./filters"),r.interaction=t("./interaction"),r.loaders=t("./loaders"),r.mesh=t("./mesh"),r.particles=t("./particles"),r.accessibility=t("./accessibility"),r.extract=t("./extract"),r.prepare=t("./prepare"),r.loader=new r.loaders.Loader,Object.assign(r,t("./deprecation")),i.PIXI=r}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./accessibility":76,"./core":97,"./deprecation":154,"./extract":156,"./extras":164,"./filters":175,"./interaction":180,"./loaders":183,"./mesh":191,"./particles":194,"./polyfill":200,"./prepare":203}]},{},[205])(205)}),function(){var t;t="undefined"!=typeof exports&&null!==exports?exports:this,t.Lethargy=function(){function t(t,e,i,r){this.stability=null!=t?Math.abs(t):8,this.sensitivity=null!=e?1+Math.abs(e):100,this.tolerance=null!=i?1+Math.abs(i):1.1,this.delay=null!=r?r:150,this.lastUpDeltas=function(){var t,e,i;for(i=[],t=1,e=2*this.stability;e>=1?e>=t:t>=e;e>=1?t++:t--)i.push(null);return i}.call(this),this.lastDownDeltas=function(){var t,e,i;for(i=[],t=1,e=2*this.stability;e>=1?e>=t:t>=e;e>=1?t++:t--)i.push(null);return i}.call(this),this.deltasTimestamp=function(){var t,e,i;for(i=[],t=1,e=2*this.stability;e>=1?e>=t:t>=e;e>=1?t++:t--)i.push(null);return i}.call(this)}return t.prototype.check=function(t){var e;return t=t.originalEvent||t,null!=t.wheelDelta?e=t.wheelDelta:null!=t.deltaY?e=-40*t.deltaY:(null!=t.detail||0===t.detail)&&(e=-40*t.detail),this.deltasTimestamp.push(Date.now()),this.deltasTimestamp.shift(),e>0?(this.lastUpDeltas.push(e),this.lastUpDeltas.shift(),this.isInertia(1)):(this.lastDownDeltas.push(e),this.lastDownDeltas.shift(),this.isInertia(-1))},t.prototype.isInertia=function(t){var e,i,r,s,n,o,a;return e=-1===t?this.lastDownDeltas:this.lastUpDeltas,null===e[0]?t:!(this.deltasTimestamp[2*this.stability-2]+this.delay>Date.now()&&e[0]===e[2*this.stability-1])&&(r=e.slice(0,this.stability),i=e.slice(this.stability,2*this.stability),a=r.reduce(function(t,e){return t+e}),n=i.reduce(function(t,e){return t+e}),o=a/r.length,s=n/i.length,Math.abs(o)<Math.abs(s*this.tolerance)&&this.sensitivity<Math.abs(s)&&t)},t.prototype.showLastUpDeltas=function(){return this.lastUpDeltas},t.prototype.showLastDownDeltas=function(){return this.lastDownDeltas},t}()}.call(this),function(){var t;t=function(){var t,e,i;return e=[],i=function(t,r){return t=t||e,t.__proto__=i.prototype,t.selector=r||"",t},t=function(e,r){var s;return e?(s=t.getDOMObject(e,r),r&&(e+=" "+r),i(s,e)):i()},t.extend=function(t){return Array.prototype.slice.call(arguments,1).forEach(function(e){var i,r;r=[];for(i in e)r.push(t[i]=e[i]);return r}),t},i.prototype=t.fn={},t}(),window.Quo=t,"$$"in window||(window.$$=t)}.call(this),function(){!function(t){var e,i,r,s,n,o,a,h;e=[],s=Object.prototype,r=/^\s*<(\w+|!)[^>]*>/,n=document.createElement("table"),o=document.createElement("tr"),i={tr:document.createElement("tbody"),tbody:n,thead:n,tfoot:n,td:o,th:o,"*":document.createElement("div")},t.toType=function(t){return s.toString.call(t).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()},t.isOwnProperty=function(t,e){return s.hasOwnProperty.call(t,e)},t.getDOMObject=function(e,i){var s,n,o;return s=null,n=[1,9,11],o=t.toType(e),"array"===o?s=a(e):"string"===o&&r.test(e)?(s=t.fragment(e.trim(),RegExp.$1),e=null):"string"===o?(s=t.query(document,e),i&&(s=1===s.length?t.query(s[0],i):t.map(function(){return t.query(s,i)}))):(n.indexOf(e.nodeType)>=0||e===window)&&(s=[e],e=null),s},t.map=function(e,i){var r,s,n;if(n=[],r=void 0,"array"===t.toType(e))for(r=0;r<e.length;)s=i(e[r],r),null!=s&&n.push(s),r++;else for(r in e)null!=(s=i(e[r],r))&&n.push(s);return h(n)},t.each=function(e,i){var r;if(r=void 0,"array"===t.toType(e))for(r=0;r<e.length&&!1!==i.call(e[r],r,e[r]);)r++;else for(r in e)if(!1===i.call(e[r],r,e[r]))break;return e},t.mix=function(){var e,i,r,s,n;for(r={},e=0,s=arguments.length;e<s;){i=arguments[e];for(n in i)t.isOwnProperty(i,n)&&void 0!==i[n]&&(r[n]=i[n]);e++}return r},t.fragment=function(e,r){var s;return null==r&&(r="*"),r in i||(r="*"),s=i[r],s.innerHTML=""+e,t.each(Array.prototype.slice.call(s.childNodes),function(){return s.removeChild(this)})},t.fn.map=function(e){return t.map(this,function(t,i){return e.call(t,i,t)})},t.fn.instance=function(t){return this.map(function(){return this[t]})},t.fn.filter=function(e){return t([].filter.call(this,function(i){return i.parentNode&&t.query(i.parentNode,e).indexOf(i)>=0}))},t.fn.forEach=e.forEach,t.fn.indexOf=e.indexOf,a=function(t){return t.filter(function(t){return void 0!==t&&null!==t})},h=function(t){return t.length>0?[].concat.apply([],t):t}}(Quo)}.call(this),function(){!function(t){t.fn.attr=function(e,i){return"string"===t.toType(e)&&void 0===i?this[0].getAttribute(e):this.each(function(){return this.setAttribute(e,i)})},t.fn.data=function(t,e){return this.attr("data-"+t,e)},t.fn.val=function(e){return"string"===t.toType(e)?this.each(function(){return this.value=e}):this.length>0?this[0].value:null},t.fn.show=function(){return this.style("display","block")},t.fn.hide=function(){return this.style("display","none")},t.fn.height=function(){return this.offset().height},t.fn.width=function(){return this.offset().width},t.fn.offset=function(){var t;return t=this[0].getBoundingClientRect(),{left:t.left+window.pageXOffset,top:t.top+window.pageYOffset,width:t.width,height:t.height}},t.fn.remove=function(){return this.each(function(){if(null!=this.parentNode)return this.parentNode.removeChild(this)})}}(Quo)}.call(this),function(){!function(t){var e,i,r,s,n,o,a;r=null,e=/WebKit\/([\d.]+)/,i={Android:/(Android)\s+([\d.]+)/,ipad:/(iPad).*OS\s([\d_]+)/,iphone:/(iPhone\sOS)\s([\d_]+)/,blackberry:/(BlackBerry).*Version\/([\d.]+)/,webos:/(webOS|hpwOS)[\s\/]([\d.]+)/},t.isMobile=function(){return r=r||n(),r.isMobile},t.environment=function(){return r=r||n()},t.isOnline=function(){return navigator.onLine},n=function(){var t,e;return e=navigator.userAgent,t={},t.browser=s(e),t.os=o(e),t.isMobile=!!t.os,t.screen=a(),t},s=function(t){var i;return(i=t.match(e))?i[0]:t},o=function(t){var e,r,s;e=null;for(r in i)if(s=t.match(i[r])){e={name:"iphone"===r||"ipad"===r?"ios":r,version:s[2].replace("_",".")};break}return e},a=function(){return{width:window.innerWidth,height:window.innerHeight}}}(Quo)}.call(this),function(){!function(t){var e;t.fn.text=function(e){return e||"number"===t.toType(e)?this.each(function(){return this.textContent=e}):this[0].textContent},t.fn.html=function(e){var i;return i=t.toType(e),e||"number"===i||"null"===i?this.each(function(){return"string"===i||"number"===i||"null"===i?this.innerHTML=e:(this.innerHTML=null,this.appendChild(e))}):this[0].innerHTML},t.fn.append=function(i){return this.each(function(){return"string"!==t.toType(i)?this.insertBefore(i):i?this.appendChild(e(i)):void 0})},t.fn.prepend=function(e){return this.each(function(){var i;return"string"===t.toType(e)?this.innerHTML=e+this.innerHTML:(i=this.parentNode,i.insertBefore(e,i.firstChild))})},t.fn.replaceWith=function(i){return this.each(function(){var r;return"string"===t.toType(i)&&(i=e(i)),(r=this.parentNode)&&r.insertBefore(i,this),t(this).remove()})},t.fn.empty=function(){return this.each(function(){this.innerHTML=null})},e=function(t){var e;return e=document.createElement("div"),e.innerHTML=t,e.firstChild}}(Quo)}.call(this),function(){!function(t){var e,i;t.query=function(t,e){var i;return i=t.querySelectorAll(e),i=Array.prototype.slice.call(i)},t.fn.find=function(e){var i;return i=1===this.length?Quo.query(this[0],e):this.map(function(){return Quo.query(this,e)}),t(i)},t.fn.parent=function(t){var r;return r=t?i(this):this.instance("parentNode"),e(r,t)},t.fn.siblings=function(t){var i;return i=this.map(function(t,e){return Array.prototype.slice.call(e.parentNode.children).filter(function(t){return t!==e})}),e(i,t)},t.fn.children=function(t){var i;return i=this.map(function(){return Array.prototype.slice.call(this.children)}),e(i,t)},t.fn.get=function(t){return void 0===t?this:this[t]},t.fn.first=function(){return t(this[0])},t.fn.last=function(){return t(this[this.length-1])},t.fn.closest=function(e,i){var r,s;for(s=this[0],r=t(e),r.length||(s=null);s&&r.indexOf(s)<0;)s=s!==i&&s!==document&&s.parentNode;return t(s)},t.fn.each=function(t){return this.forEach(function(e,i){return t.call(e,i,e)}),this},i=function(e){var i;for(i=[];e.length>0;)e=t.map(e,function(t){if((t=t.parentNode)&&t!==document&&i.indexOf(t)<0)return i.push(t),t});return i},e=function(e,i){return void 0===i?t(e):t(e).filter(i)}}(Quo)}.call(this),function(){!function(t){var e,i;t.fn.addClass=function(t){return this.each(function(){if(!i(t,this.className))return this.className+=" "+t,this.className=this.className.trim()})},t.fn.removeClass=function(t){return this.each(function(){return t?i(t,this.className)?this.className=this.className.replace(t," ").replace(/\s+/g," ").trim():void 0:this.className=""})},t.fn.toggleClass=function(t){return this.each(function(){return i(t,this.className)?this.className=this.className.replace(t," "):(this.className+=" "+t,this.className=this.className.trim())})},t.fn.hasClass=function(t){return i(t,this[0].className)},t.fn.style=function(t,i){return i?this.each(function(){return this.style[t]=i}):this[0].style[t]||e(this[0],t)},i=function(t,e){return e.split(/\s+/g).indexOf(t)>=0},e=function(t,e){return document.defaultView.getComputedStyle(t,"")[e]}}(Quo)}.call(this),function(){!function(t){var e,i,r,s,n,o,a,h,l,u,c;e={TYPE:"GET",MIME:"json"},r={script:"text/javascript, application/javascript",json:"application/json",xml:"application/xml, text/xml",html:"text/html",text:"text/plain"},i=0,t.ajaxSettings={type:e.TYPE,async:!0,success:{},error:{},context:null,dataType:e.MIME,headers:{},xhr:function(){return new window.XMLHttpRequest},crossDomain:!1,timeout:0},t.ajax=function(i){var r,a,u;if(a=t.mix(t.ajaxSettings,i),a.type===e.TYPE?a.url+=t.serializeParameters(a.data,"?"):a.data=t.serializeParameters(a.data),s(a.url))return t.jsonp(a);u=a.xhr(),u.onreadystatechange=function(){if(4===u.readyState)return clearTimeout(r),l(u,a)},u.open(a.type,a.url,a.async),h(u,a),a.timeout>0&&(r=setTimeout(function(){return c(u,a)},a.timeout));try{u.send(a.data)}catch(t){u=t,o("Resource not found",u,a)}return a.async?u:n(u,a)},t.jsonp=function(e){var r,s,n,o;return e.async?(s="jsonp"+ ++i,n=document.createElement("script"),o={abort:function(){if(t(n).remove(),s in window)return window[s]={}}},r=void 0,window[s]=function(i){return clearTimeout(r),t(n).remove(),delete window[s],u(i,o,e)},n.src=e.url.replace(/=\?/,"="+s),t("head").append(n),e.timeout>0&&(r=setTimeout(function(){return c(o,e)},e.timeout)),o):console.error("QuoJS.ajax: Unable to make jsonp synchronous call.")},t.get=function(e,i,r,s){return t.ajax({url:e,data:i,success:r,dataType:s})},t.post=function(t,e,i,r){return a("POST",t,e,i,r)},t.put=function(t,e,i,r){return a("PUT",t,e,i,r)},t.delete=function(t,e,i,r){return a("DELETE",t,e,i,r)},t.json=function(i,r,s){return t.ajax({url:i,data:r,success:s,dataType:e.MIME})},t.serializeParameters=function(t,e){var i,r;null==e&&(e=""),r=e;for(i in t)t.hasOwnProperty(i)&&(r!==e&&(r+="&"),r+=i+"="+t[i]);return r===e?"":r},l=function(t,e){t.status>=200&&t.status<300||0===t.status?e.async&&u(n(t,e),t,e):o("QuoJS.ajax: Unsuccesful request",t,e)},u=function(t,e,i){i.success.call(i.context,t,e)},o=function(t,e,i){i.error.call(i.context,t,e,i)},h=function(t,e){var i;e.contentType&&(e.headers["Content-Type"]=e.contentType),e.dataType&&(e.headers.Accept=r[e.dataType]);for(i in e.headers)t.setRequestHeader(i,e.headers[i])},c=function(t,e){t.onreadystatechange={},t.abort(),o("QuoJS.ajax: Timeout exceeded",t,e)},a=function(e,i,r,s,n){return t.ajax({type:e,url:i,data:r,success:s,dataType:n,contentType:"application/x-www-form-urlencoded"})},n=function(t,i){var r;if(r=t.responseText)if(i.dataType===e.MIME)try{r=JSON.parse(r)}catch(e){r=e,o("QuoJS.ajax: Parse Error",t,i)}else"xml"===i.dataType&&(r=t.responseXML);return r},s=function(t){return/=\?/.test(t)}}(Quo)}.call(this),function(){!function(t){var e,i;e=/complete|loaded|interactive/,i={touch:"touchstart",tap:"tap"},["touch","tap"].forEach(function(e){return t.fn[e]=function(r){return t(document.body).delegate(this.selector,i[e],r)},this}),t.fn.on=function(e,i,r){return void 0===i||"function"===t.toType(i)?this.bind(e,i):this.delegate(i,e,r)},t.fn.off=function(e,i,r){return void 0===i||"function"===t.toType(i)?this.unbind(e,i):this.undelegate(i,e,r)},t.fn.ready=function(i){return e.test(document.readyState)?i(t):t.fn.addEvent(document,"DOMContentLoaded",function(){return i(t)}),this}}(Quo)}.call(this),function(){!function(t){var e,i,r,s,n,o,a,h,l,u,c;e=1,s={},r={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"},i={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",tap:"click",doubletap:"dblclick",orientationchange:"resize"},t.Event=function(t,e){var i,r;if(i=document.createEvent("Events"),i.initEvent(t,!0,!0,null,null,null,null,null,null,null,null,null,null,null,null),e)for(r in e)i[r]=e[r];return i},t.fn.bind=function(t,e){return this.each(function(){u(this,t,e)})},t.fn.unbind=function(t,e){return this.each(function(){c(this,t,e)})},t.fn.delegate=function(e,i,r){return this.each(function(s,o){u(o,i,r,e,function(i){return function(r){var s,a;if(a=t(r.target).closest(e,o).get(0))return s=t.extend(n(r),{currentTarget:a,liveFired:o}),i.apply(a,[s].concat([].slice.call(arguments,1)))}})})},t.fn.undelegate=function(t,e,i){return this.each(function(){c(this,e,i,t)})},t.fn.trigger=function(e,i){return"string"===t.toType(e)&&(e=t.Event(e,i)),this.each(function(){this.dispatchEvent(e)})},t.fn.addEvent=function(t,e,i){return t.addEventListener?t.addEventListener(e,i,!1):t.attachEvent?t.attachEvent("on"+e,i):t["on"+e]=i},t.fn.removeEvent=function(t,e,i){return t.removeEventListener?t.removeEventListener(e,i,!1):t.detachEvent?t.detachEvent("on"+e,i):t["on"+e]=null},u=function(e,i,r,n,h){var u;return i=a(i),u=l(e),u=s[u]||(s[u]=[]),h=h&&h(r,i),i={event:i,callback:r,selector:n,proxy:o(h,r,e),delegate:h,index:u.length},u.push(i),t.fn.addEvent(e,i.event,i.proxy)},c=function(e,i,r,n){var o;return i=a(i),o=l(e),h(o,i,r,n).forEach(function(i){return delete s[o][i.index],t.fn.removeEvent(e,i.event,i.proxy)})},l=function(t){return t._id||(t._id=e++)},a=function(e){return(t.isMobile()?e:i[e])||e},o=function(t,e,i){return e=t||e,function(t){var r;return r=e.apply(i,[t].concat(t.data)),!1===r&&t.preventDefault(),r}},h=function(t,e,i,r){return(s[t]||[]).filter(function(t){return t&&(!e||t.event===e)&&(!i||t.fn===i)&&(!r||t.selector===r)})},n=function(e){var i;return i=t.extend({originalEvent:e},e),t.each(r,function(t,r){return i[t]=function(){return this[r]=function(){return!0},e[t].apply(e,arguments)},i[r]=function(){return!1}}),i}}(Quo)}.call(this),function(){!function(a){var i,h,b,f,n,p,s,r,j,m,l,d,c,e,k,q,v,y,x,u;b={},h=[],i=[],f=void 0,["doubleTap","hold","swipe","swiping","swipeLeft","swipeRight","swipeUp","swipeDown","rotate","rotating","rotateLeft","rotateRight","pinch","pinching","pinchIn","pinchOut","drag","dragLeft","dragRight","dragUp","dragDown"].forEach(function(t){a.fn[t]=function(e){return this.on(t,e)}}),a(document).ready(function(){return e()}),e=function(){var t;return t=a(document.body),t.bind("touchstart",v),t.bind("touchmove",q),t.bind("touchend",k),t.bind("touchcancel",r)},v=function(t){var e,i,r;return i=Date.now(),e=i-(b.last||i),f&&clearTimeout(f),r=l(t),t=r.length,h=m(r,t),b.el=a(y(r[0].target)),b.fingers=t,b.last=i,1===t?(b.isDoubleTap=e>0&&e<=250,setTimeout(d,650)):2===t?(b.initial_angle=parseInt(n(h),10),b.initial_distance=parseInt(j(h),10),b.angle_difference=0,b.distance_difference=0):void 0},q=function(t){var e,n;return b.el&&(n=l(t),e=n.length,e===b.fingers?(i=m(n,e),c(t)&&u("swiping"),2===e&&(s(),p(),t.preventDefault())):r()),!0},c=function(){var t,e;return t=!1,i[0]&&(t=Math.abs(h[0].x-i[0].x)>30,e=Math.abs(h[0].y-i[0].y)>30,t=b.el&&(t||e)),t},k=function(){var t;return b.isDoubleTap?(u("doubleTap"),r()):1===b.fingers?c()?(u("swipe"),t=x(h[0].x,i[0].x,h[0].y,i[0].y),u("swipe"+t),r()):(u("tap"),f=setTimeout(r,250)):2===b.fingers?(t=!1,0!==b.angle_difference&&(u("rotate",{angle:b.angle_difference}),t=b.angle_difference>0?"rotateRight":"rotateLeft",u(t,{angle:b.angle_difference}),t=!0),0!==b.distance_difference&&(u("pinch",{angle:b.distance_difference}),t=b.distance_difference>0?"pinchOut":"pinchIn",u(t,{distance:b.distance_difference}),t=!0),!t&&i[0]&&(Math.abs(h[0].x-i[0].x)>10||Math.abs(h[0].y-i[0].y)>10)&&(u("drag"),t=x(h[0].x,i[0].x,h[0].y,i[0].y),u("drag"+t)),r()):void 0},m=function(t,e){var i,r;for(r=[],i=0;i<e;)r.push({x:t[i].pageX,y:t[i].pageY}),i++;return r},s=function(){var g,o,t;if(g=parseInt(n(i),10),g=parseInt(b.initial_angle-g,10),Math.abs(g)>20||0!==b.angle_difference){for(o=0,t=b.angle_difference<0?"-":"+";Math.abs(g-b.angle_difference)>90&&o++<10;)eval("diff "+t+"= 180;");return b.angle_difference=parseInt(g,10),u("rotating",{angle:b.angle_difference})}},p=function(){var t;if(t=parseInt(j(i),10),t=b.initial_distance-t,Math.abs(t)>10)return b.distance_difference=t,u("pinching",{distance:t})},u=function(t,e){if(b.el)return e=e||{},i[0]&&(e.iniTouch=b.fingers>1?h:h[0],e.currentTouch=b.fingers>1?i:i[0]),b.el.trigger(t,e)},r=function(){return h=[],i=[],b={},clearTimeout(f)},n=function(t){var e;return e=t[0],t=t[1],e=Math.atan(-1*(t.y-e.y)/(t.x-e.x))*(180/Math.PI),e<0?e+180:e},j=function(t){var e;return e=t[0],t=t[1],-1*Math.sqrt((t.x-e.x)*(t.x-e.x)+(t.y-e.y)*(t.y-e.y))},l=function(t){return a.isMobile()?t.touches:[t]},y=function(t){return"tagName"in t?t:t.parentNode},x=function(t,e,i,r){return Math.abs(t-e)>=Math.abs(i-r)?t-e>0?"Left":"Right":i-r>0?"Up":"Down"},d=function(){if(b.last&&Date.now()-b.last>=650)return u("hold")}}(Quo)}.call(this);var global_custom2;!function t(e,i,r){function s(o,a){if(!i[o]){if(!e[o]){var h="function"==typeof require&&require;if(!a&&h)return h(o,!0);if(n)return n(o,!0);var l=new Error("Cannot find module '"+o+"'");throw l.code="MODULE_NOT_FOUND",l}var u=i[o]={exports:{}};e[o][0].call(u.exports,function(t){var i=e[o][1][t];return s(i||t)},u,u.exports,t,e,i,r)}return i[o].exports}for(var n="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(t,e,i){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(i,"__esModule",{value:!0});var a=function(){function t(t,e){for(var i=0;i<e.length;i++){var r=e[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,i,r){return i&&t(e.prototype,i),r&&t(e,r),e}}(),h=function t(e,i,r){null===e&&(e=Function.prototype);var s=Object.getOwnPropertyDescriptor(e,i);if(void 0===s){var n=Object.getPrototypeOf(e);return null===n?void 0:t(n,i,r)}if("value"in s)return s.value;var o=s.get;if(void 0!==o)return o.call(r)},l=t("../../index"),u=r(l),c=function(t){function e(t){s(this,e);var i=n(this,Object.getPrototypeOf(e).call(this,t));return i.createExtraBound(),i.resizing=!1,i.cache=null,i.dom.divs=Array.prototype.slice.call(t.divs,0),i}return o(e,t),a(e,[{key:"createExtraBound",value:function t(){var e=this;["getCache","inViewport"].forEach(function(t){return e[t]=e[t].bind(e)})}},{key:"resize",value:function t(){this.resizing=!0,this.getCache(),h(Object.getPrototypeOf(e.prototype),"resize",this).call(this),this.resizing=!1}},{key:"getCache",value:function t(){var e=this;this.cache=[],this.dom.divs.forEach(function(t,i){t.style.display="block",t.style.transform="none";var r=e.vars.target,s=t.getBoundingClientRect(),n={el:t,state:!0,top:s.top+r,left:s.left,center:s.height/2,bottom:s.bottom+r,speed:t.getAttribute("data-speed")||"-1"};4===i&&console.log(s.top,r,n.top),e.cache.push(n)}),this.vars.bounding=this.dom.section.getBoundingClientRect().height-(this.vars.native?0:this.vars.height)}},{key:"run",value:function t(){this.dom.divs.forEach(this.inViewport),this.dom.section.style[this.prefix]=this.getTransform(-1*this.vars.current),h(Object.getPrototypeOf(e.prototype),"run",this).call(this)}},{key:"inViewport",value:function t(e,i){if(this.cache&&!this.resizing){var r=this.cache[i],s=this.vars.current,n=(r.top+r.center-s)*r.speed,o=Math.round(r.top+n-s);Math.round(r.bottom+n-s)>0&&o<this.vars.height?(e.classList.contains("inviewport")||e.classList.add("inviewport"),e.style.display="block",e.style[this.prefix]=this.getTransform(n)):e.classList.contains("inviewport")&&e.classList.remove("inviewport")}}}]),e}(u.default);i.default=c},{"../../index":3}],2:[function(t,e,i){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var s=t("./custom"),n=r(s);global_custom2=n},{"./custom":1}],3:[function(t,e,i){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(i,"__esModule",{value:!0});var n=function(){function t(t,e){for(var i=0;i<e.length;i++){var r=e[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,i,r){return i&&t(e.prototype,i),r&&t(e,r),e}}(),o=t("dom-classes"),a=r(o),h=t("dom-create-element"),l=r(h),u=t("prefix"),c=r(u),d=t("virtual-scroll"),p=r(d),f=t("dom-events"),v=r(f),_=function(){function t(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];s(this,t),this.createBound(),this.options=e,this.prefix=(0,c.default)("transform"),this.rAF=void 0,this.extends="Smooth"!=this.constructor.name,this.vars={direction:this.options.direction||"vertical",native:this.options.native||!1,ease:this.options.ease||.075,preload:this.options.preload||!1,current:0,target:0,height:window.innerHeight,width:window.innerWidth,bounding:0,timer:null,ticking:!1},this.vs=this.vars.native?null:new p.default({limitInertia:this.options.vs&&this.options.vs.limitInertia||!1,mouseMultiplier:this.options.vs&&this.options.vs.mouseMultiplier||1,touchMultiplier:this.options.vs&&this.options.vs.touchMultiplier||1.5,firefoxMultiplier:this.options.vs&&this.options.vs.firefoxMultiplier||30,preventTouch:this.options.vs&&this.options.vs.preventTouch||!0}),this.dom={listener:this.options.listener||document.body,section:this.options.section||document.querySelector(".vs-section")||null,scrollbar:this.vars.native||this.options.noscrollbar?null:{state:{clicked:!1,x:0},el:(0,l.default)({selector:"div",styles:"vs-scrollbar vs-"+this.vars.direction+" vs-scrollbar-"+this.constructor.name.toLowerCase()}),drag:{el:(0,l.default)({selector:"div",styles:"vs-scrolldrag"}),delta:0,height:50}}}}return n(t,[{key:"createBound",value:function t(){var e=this;["run","calc","debounce","resize","mouseUp","mouseDown","mouseMove","calcScroll","scrollTo"].forEach(function(t){return e[t]=e[t].bind(e)})}},{key:"init",value:function t(){this.addClasses(),this.vars.preload&&this.preloadImages(),this.vars.native?this.addFakeScrollHeight():!this.options.noscrollbar&&this.addFakeScrollBar(),this.addEvents(),this.resize()}},{key:"addClasses",value:function t(){var e=this.vars.native?"native":"virtual",i="vertical"===this.vars.direction?"y":"x";a.default.add(this.dom.listener,"is-"+e+"-scroll"),a.default.add(this.dom.listener,i+"-scroll")}},{key:"preloadImages",value:function t(){var e=this,i=Array.prototype.slice.call(this.dom.listener.querySelectorAll("img"),0);i.forEach(function(t){var r=document.createElement("img");v.default.once(r,"load",function(){i.splice(i.indexOf(t),1),0===i.length&&e.resize()}),r.src=t.getAttribute("src")})}},{key:"calc",value:function t(e){var i="horizontal"==this.vars.direction?e.deltaX:e.deltaY;this.vars.target+=-1*i,this.clampTarget()}},{key:"debounce",value:function t(){var e=this,i=this.dom.listener===document.body;this.vars.target="vertical"===this.vars.direction?i?window.scrollY||window.pageYOffset:this.dom.listener.scrollTop:i?window.scrollX||window.pageXOffset:this.dom.listener.scrollLeft,clearTimeout(this.vars.timer),this.vars.ticking||(this.vars.ticking=!0,a.default.add(this.dom.listener,"is-scrolling")),this.vars.timer=setTimeout(function(){e.vars.ticking=!1,a.default.remove(e.dom.listener,"is-scrolling")},200)}},{key:"run",value:function t(){if(this.vars.current+=(this.vars.target-this.vars.current)*this.vars.ease,this.vars.current<.1&&(this.vars.current=0),this.rAF=requestAnimationFrame(this.run),this.extends||(this.dom.section.style[this.prefix]=this.getTransform(-this.vars.current.toFixed(2))),!this.vars.native&&!this.options.noscrollbar){var e=this.dom.scrollbar.drag.height,i="vertical"===this.vars.direction?this.vars.height:this.vars.width,r=Math.abs(this.vars.current)/(this.vars.bounding/(i-e))+e/.5-e,s=Math.max(0,Math.min(r-e,r+e));this.dom.scrollbar.drag.el.style[this.prefix]=this.getTransform(s.toFixed(2))}}},{key:"getTransform",value:function t(e){return"vertical"===this.vars.direction?"translate3d(0,"+e+"px,0)":"translate3d("+e+"px,0,0)"}},{key:"on",value:function t(){var e=arguments.length<=0||void 0===arguments[0]||arguments[0],i=this.dom.listener===document.body?window:this.dom.listener;this.vars.native?v.default.on(i,"scroll",this.debounce):this.vs&&this.vs.on(this.calc),e&&this.requestAnimationFrame()}},{key:"off",value:function t(){var e=arguments.length<=0||void 0===arguments[0]||arguments[0],i=this.dom.listener===document.body?window:this.dom.listener;this.vars.native?v.default.off(i,"scroll",this.debounce):this.vs&&this.vs.off(this.calc),e&&this.cancelAnimationFrame()}},{key:"requestAnimationFrame",value:function(t){function e(){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(){this.rAF=requestAnimationFrame(this.run)})},{key:"cancelAnimationFrame",value:function(t){function e(){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(){cancelAnimationFrame(this.rAF)})},{key:"addEvents",value:function t(){this.on(),v.default.on(window,"resize",this.resize)}},{key:"removeEvents",value:function t(){this.off(),v.default.off(window,"resize",this.resize)}},{key:"addFakeScrollBar",value:function t(){this.dom.listener.appendChild(this.dom.scrollbar.el),this.dom.scrollbar.el.appendChild(this.dom.scrollbar.drag.el),v.default.on(this.dom.scrollbar.el,"click",this.calcScroll),v.default.on(this.dom.scrollbar.el,"mousedown",this.mouseDown),v.default.on(document,"mousemove",this.mouseMove),v.default.on(document,"mouseup",this.mouseUp)}},{key:"removeFakeScrollBar",value:function t(){v.default.off(this.dom.scrollbar.el,"click",this.calcScroll),v.default.off(this.dom.scrollbar.el,"mousedown",this.mouseDown),v.default.off(document,"mousemove",this.mouseMove),v.default.off(document,"mouseup",this.mouseUp),this.dom.listener.removeChild(this.dom.scrollbar.el)}},{key:"mouseDown",value:function t(e){e.preventDefault(),1==e.which&&(this.dom.scrollbar.state.clicked=!0)}},{key:"mouseUp",value:function t(e){this.dom.scrollbar.state.clicked=!1,a.default.remove(this.dom.listener,"is-dragging")}},{key:"mouseMove",value:function t(e){this.dom.scrollbar.state.clicked&&this.calcScroll(e)}},{key:"addFakeScrollHeight",value:function t(){this.dom.scroll=(0,l.default)({selector:"div",styles:"vs-scroll-view"}),this.dom.listener.appendChild(this.dom.scroll)}},{key:"removeFakeScrollHeight",value:function t(){this.dom.listener.removeChild(this.dom.scroll)}},{key:"calcScroll",value:function t(e){var i="vertical"==this.vars.direction?e.clientY:e.clientX,r="vertical"==this.vars.direction?this.vars.height:this.vars.width,s=i*(this.vars.bounding/r);a.default.add(this.dom.listener,"is-dragging"),this.vars.target=s,this.clampTarget(),this.dom.scrollbar&&(this.dom.scrollbar.drag.delta=this.vars.target)}},{key:"scrollTo",value:function t(e){this.vars.native?"vertical"==this.vars.direction?window.scrollTo(0,e):window.scrollTo(e,0):(this.vars.target=e,this.clampTarget())}},{key:"resize",value:function t(){var e="vertical"===this.vars.direction?"height":"width";if(this.vars.height=window.innerHeight,this.vars.width=window.innerWidth,!this.extends){var i=this.dom.section.getBoundingClientRect();this.vars.bounding="vertical"===this.vars.direction?i.height-(this.vars.native?0:this.vars.height):i.right-(this.vars.native?0:this.vars.width)}this.vars.native||this.options.noscrollbar?this.vars.native?this.dom.scroll.style[e]=this.vars.bounding+"px":this.clampTarget():(this.dom.scrollbar.drag.height=this.vars.height*(this.vars.height/(this.vars.bounding+this.vars.height)),this.dom.scrollbar.drag.el.style[e]=this.dom.scrollbar.drag.height+"px")}},{key:"clampTarget",value:function t(){this.vars.target=Math.round(Math.max(0,Math.min(this.vars.target,this.vars.bounding)))}},{key:"destroy",value:function t(){this.vars.native?(a.default.remove(this.dom.listener,"is-native-scroll"),this.removeFakeScrollHeight()):(a.default.remove(this.dom.listener,"is-virtual-scroll"),!this.options.noscrollbar&&this.removeFakeScrollBar()),
            "vertical"===this.vars.direction?a.default.remove(this.dom.listener,"y-scroll"):a.default.remove(this.dom.listener,"x-scroll"),this.vs&&(this.vs.destroy(),this.vs=null),this.removeEvents()}}]),t}();i.default=_,window.Smooth=_},{"dom-classes":5,"dom-create-element":6,"dom-events":7,prefix:11,"virtual-scroll":17}],4:[function(t,e,i){"use strict";function r(t,e){return function(){return t.apply(e,arguments)}}var s=Object.prototype.toString,n=Object.prototype.hasOwnProperty;e.exports=function(t){if(!t)return console.warn("bindAll requires at least one argument.");var e=Array.prototype.slice.call(arguments,1);if(0===e.length)for(var i in t)n.call(t,i)&&"function"==typeof t[i]&&"[object Function]"==s.call(t[i])&&e.push(i);for(var o=0;o<e.length;o++){var a=e[o];t[a]=r(t[a],t)}}},{}],5:[function(t,e,i){function r(t){if(t.classList)return t.classList;var e=t.className.replace(/^\s+|\s+$/g,""),i=e.split(u);return""===i[0]&&i.shift(),i}function s(t,e){if(t.classList)return void t.classList.add(e);var i=r(t);~l(i,e)||i.push(e),t.className=i.join(" ")}function n(t,e){return t.classList?t.classList.contains(e):!!~l(r(t),e)}function o(t,e){if("[object RegExp]"==c.call(e))return a(t,e);if(t.classList)return void t.classList.remove(e);var i=r(t),s=l(i,e);~s&&i.splice(s,1),t.className=i.join(" ")}function a(t,e,i){for(var s=Array.prototype.slice.call(r(t)),n=0;n<s.length;n++)e.test(s[n])&&o(t,s[n])}function h(t,e){if(t.classList)return t.classList.toggle(e);n(t,e)?o(t,e):s(t,e)}var l=t("indexof"),u=/\s+/,c=Object.prototype.toString;e.exports=r,e.exports.add=s,e.exports.contains=n,e.exports.has=n,e.exports.toggle=h,e.exports.remove=o,e.exports.removeMatching=a},{indexof:8}],6:[function(t,e,i){function r(t){t=t||{};var e=document.createElement(t.selector);if(t.attr)for(var i in t.attr)t.attr.hasOwnProperty(i)&&e.setAttribute(i,t.attr[i]);return"a"==t.selector&&t.link&&(e.href=t.link,t.target&&e.setAttribute("target",t.target)),"img"==t.selector&&t.src&&(e.src=t.src,t.lazyload&&(e.style.opacity=0,e.onload=function(){e.style.opacity=1})),t.id&&(e.id=t.id),t.styles&&(e.className=t.styles),t.html&&(e.innerHTML=t.html),t.children&&e.appendChild(t.children),e}e.exports=r},{}],7:[function(t,e,i){var r=t("synthetic-dom-events"),s=function(t,e,i,r){return t.addEventListener(e,i,r||!1)},n=function(t,e,i,r){return t.removeEventListener(e,i,r||!1)},o=function(t,e,i,r){function o(s){n(t,e,o,r),i(s)}s(t,e,o,r)},a=function(t,e,i){var s=r(e,i);t.dispatchEvent(s)};document.addEventListener||(s=function(t,e,i){return t.attachEvent("on"+e,i)}),document.removeEventListener||(n=function(t,e,i){return t.detachEvent("on"+e,i)}),document.dispatchEvent||(a=function(t,e,i){var s=r(e,i);return t.fireEvent("on"+s.type,s)}),e.exports={on:s,off:n,once:o,emit:a}},{"synthetic-dom-events":12}],8:[function(t,e,i){var r=[].indexOf;e.exports=function(t,e){if(r)return t.indexOf(e);for(var i=0;i<t.length;++i)if(t[i]===e)return i;return-1}},{}],9:[function(t,e,i){(function(){var t;t=void 0!==i&&null!==i?i:this,t.Lethargy=function(){function t(t,e,i,r){this.stability=null!=t?Math.abs(t):8,this.sensitivity=null!=e?1+Math.abs(e):100,this.tolerance=null!=i?1+Math.abs(i):1.1,this.delay=null!=r?r:150,this.lastUpDeltas=function(){var t,e,i;for(i=[],t=1,e=2*this.stability;1<=e?t<=e:t>=e;1<=e?t++:t--)i.push(null);return i}.call(this),this.lastDownDeltas=function(){var t,e,i;for(i=[],t=1,e=2*this.stability;1<=e?t<=e:t>=e;1<=e?t++:t--)i.push(null);return i}.call(this),this.deltasTimestamp=function(){var t,e,i;for(i=[],t=1,e=2*this.stability;1<=e?t<=e:t>=e;1<=e?t++:t--)i.push(null);return i}.call(this)}return t.prototype.check=function(t){var e;return t=t.originalEvent||t,null!=t.wheelDelta?e=t.wheelDelta:null!=t.deltaY?e=-40*t.deltaY:null==t.detail&&0!==t.detail||(e=-40*t.detail),this.deltasTimestamp.push(Date.now()),this.deltasTimestamp.shift(),e>0?(this.lastUpDeltas.push(e),this.lastUpDeltas.shift(),this.isInertia(1)):(this.lastDownDeltas.push(e),this.lastDownDeltas.shift(),this.isInertia(-1));return!1},t.prototype.isInertia=function(t){var e,i,r,s,n,o,a;return e=-1===t?this.lastDownDeltas:this.lastUpDeltas,null===e[0]?t:!(this.deltasTimestamp[2*this.stability-2]+this.delay>Date.now()&&e[0]===e[2*this.stability-1])&&(r=e.slice(0,this.stability),i=e.slice(this.stability,2*this.stability),a=r.reduce(function(t,e){return t+e}),n=i.reduce(function(t,e){return t+e}),o=a/r.length,s=n/i.length,Math.abs(o)<Math.abs(s*this.tolerance)&&this.sensitivity<Math.abs(s)&&t)},t.prototype.showLastUpDeltas=function(){return this.lastUpDeltas},t.prototype.showLastDownDeltas=function(){return this.lastDownDeltas},t}()}).call(this)},{}],10:[function(t,e,i){"use strict";function r(t){if(null===t||void 0===t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}var s=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;e.exports=Object.assign||function(t,e){for(var i,o=r(t),a,h=1;h<arguments.length;h++){i=Object(arguments[h]);for(var l in i)s.call(i,l)&&(o[l]=i[l]);if(Object.getOwnPropertySymbols){a=Object.getOwnPropertySymbols(i);for(var u=0;u<a.length;u++)n.call(i,a[u])&&(o[a[u]]=i[a[u]])}}return o}},{}],11:[function(t,e,i){function r(t){if(t=t.replace(/-([a-z])/g,function(t,e){return e.toUpperCase()}),void 0!==o[t])return t;for(var e=t.charAt(0).toUpperCase()+t.slice(1),i=a.length;i--;){var r=a[i]+e;if(void 0!==o[r])return r}return t}function s(t){return t in l?l[t]:l[t]=r(t)}function n(t){return t=r(t),h.test(t)&&(t="-"+t.replace(h,"-$1"),h.lastIndex=0),t.toLowerCase()}var o="undefined"!=typeof document?document.createElement("p").style:{},a=["O","ms","Moz","Webkit"],h=/([A-Z])/g,l={};e.exports=s,e.exports.dash=n},{}],12:[function(t,e,i){function r(t,e){return t.ctrlKey==(e.ctrlKey||!1)&&t.altKey==(e.altKey||!1)&&t.shiftKey==(e.shiftKey||!1)&&t.metaKey==(e.metaKey||!1)&&t.keyCode==(e.keyCode||0)&&t.charCode==(e.charCode||0)||(t=document.createEvent("Event"),t.initEvent(e.type,e.bubbles,e.cancelable),t.ctrlKey=e.ctrlKey||!1,t.altKey=e.altKey||!1,t.shiftKey=e.shiftKey||!1,t.metaKey=e.metaKey||!1,t.keyCode=e.keyCode||0,t.charCode=e.charCode||0),t}var s=window,n=document||{},o=n.documentElement||{},a=!0;try{n.createEvent("KeyEvents")}catch(t){a=!1}var h=function(t,e){e=e||{};var i=d(t),s=i;"KeyboardEvent"===i&&a&&(i="KeyEvents",s="KeyEvent");var o=n.createEvent(i),h="init"+s,l="function"==typeof o[h]?h:"initEvent",c=u[l],p=[],f={};e.type=t;for(var v=0;v<c.length;++v){var _=c[v],g=e[_];void 0===g&&(g=o[_]),f[_]=!0,p.push(g)}o[l].apply(o,p),"KeyboardEvent"===i&&(o=r(o,e));for(var _ in e)f[_]||(o[_]=e[_]);return o},l=function(t,e){e=e||{};var i=n.createEventObject();i.type=t;for(var r in e)void 0!==e[r]&&(i[r]=e[r]);return i};e.exports=n.createEvent?h:l;var u=t("./init.json"),c=t("./types.json"),d=function(){var t={};for(var e in c)for(var i=c[e],r=0;r<i.length;r++)t[i[r]]=e;return function(e){return t[e]||"Event"}}()},{"./init.json":13,"./types.json":14}],13:[function(t,e,i){e.exports={initEvent:["type","bubbles","cancelable"],initUIEvent:["type","bubbles","cancelable","view","detail"],initMouseEvent:["type","bubbles","cancelable","view","detail","screenX","screenY","clientX","clientY","ctrlKey","altKey","shiftKey","metaKey","button","relatedTarget"],initMutationEvent:["type","bubbles","cancelable","relatedNode","prevValue","newValue","attrName","attrChange"],initKeyboardEvent:["type","bubbles","cancelable","view","ctrlKey","altKey","shiftKey","metaKey","keyCode","charCode"],initKeyEvent:["type","bubbles","cancelable","view","ctrlKey","altKey","shiftKey","metaKey","keyCode","charCode"]}},{}],14:[function(t,e,i){e.exports={MouseEvent:["click","mousedown","mouseup","mouseover","mousemove","mouseout"],KeyboardEvent:["keydown","keyup","keypress"],MutationEvent:["DOMSubtreeModified","DOMNodeInserted","DOMNodeRemoved","DOMNodeRemovedFromDocument","DOMNodeInsertedIntoDocument","DOMAttrModified","DOMCharacterDataModified"],HTMLEvents:["load","unload","abort","error","select","change","submit","reset","focus","blur","resize","scroll"],UIEvent:["DOMFocusIn","DOMFocusOut","DOMActivate"]}},{}],15:[function(t,e,i){function r(){}r.prototype={on:function(t,e,i){var r=this.e||(this.e={});return(r[t]||(r[t]=[])).push({fn:e,ctx:i}),this},once:function(t,e,i){function r(){s.off(t,r),e.apply(i,arguments)}var s=this;return r._=e,this.on(t,r,i)},emit:function(t){var e=[].slice.call(arguments,1),i=((this.e||(this.e={}))[t]||[]).slice(),r=0,s=i.length;for(r;r<s;r++)i[r].fn.apply(i[r].ctx,e);return this},off:function(t,e){var i=this.e||(this.e={}),r=i[t],s=[];if(r&&e)for(var n=0,o=r.length;n<o;n++)r[n].fn!==e&&r[n].fn._!==e&&s.push(r[n]);return s.length?i[t]=s:delete i[t],this}},e.exports=r},{}],16:[function(t,e,i){"use strict";e.exports=function(t){return JSON.parse(JSON.stringify(t))}},{}],17:[function(t,e,i){"use strict";function r(t){l(this,"_onWheel","_onMouseWheel","_onTouchStart","_onTouchMove","_onKeyDown"),this.el=window,t&&t.el&&(this.el=t.el,delete t.el),this.options=s({mouseMultiplier:1,touchMultiplier:2,firefoxMultiplier:15,keyStep:120,preventTouch:!1,unpreventTouchClass:"vs-touchmove-allowed",limitInertia:!1},t),this.options.limitInertia&&(this._lethargy=new o),this._emitter=new n,this._event={y:0,x:0,deltaX:0,deltaY:0},this.touchStartX=null,this.touchStartY=null,this.bodyTouchAction=null}var s=t("object-assign"),n=t("tiny-emitter"),o=t("lethargy").Lethargy,a=t("./support"),h=t("./clone"),l=t("bindall-standalone"),u="virtualscroll";e.exports=r;var c={LEFT:37,UP:38,RIGHT:39,DOWN:40};r.prototype._notify=function(t){var e=this._event;e.x+=e.deltaX,e.y+=e.deltaY,this._emitter.emit(u,{x:e.x,y:e.y,deltaX:e.deltaX,deltaY:e.deltaY,originalEvent:t})},r.prototype._onWheel=function(t){var e=this.options;if(!this._lethargy||!1!==this._lethargy.check(t)){var i=this._event;i.deltaX=t.wheelDeltaX||-1*t.deltaX,i.deltaY=t.wheelDeltaY||-1*t.deltaY,a.isFirefox&&1==t.deltaMode&&(i.deltaX*=e.firefoxMultiplier,i.deltaY*=e.firefoxMultiplier),i.deltaX*=e.mouseMultiplier,i.deltaY*=e.mouseMultiplier,this._notify(t)}},r.prototype._onMouseWheel=function(t){if(!this.options.limitInertia||!1!==this._lethargy.check(t)){var e=this._event;e.deltaX=t.wheelDeltaX?t.wheelDeltaX:0,e.deltaY=t.wheelDeltaY?t.wheelDeltaY:t.wheelDelta,this._notify(t)}},r.prototype._onTouchStart=function(t){var e=t.targetTouches?t.targetTouches[0]:t;this.touchStartX=e.pageX,this.touchStartY=e.pageY},r.prototype._onTouchMove=function(t){var e=this.options;e.preventTouch&&!t.target.classList.contains(e.unpreventTouchClass)&&t.preventDefault();var i=this._event,r=t.targetTouches?t.targetTouches[0]:t;i.deltaX=(r.pageX-this.touchStartX)*e.touchMultiplier,i.deltaY=(r.pageY-this.touchStartY)*e.touchMultiplier,this.touchStartX=r.pageX,this.touchStartY=r.pageY,this._notify(t)},r.prototype._onKeyDown=function(t){var e=this._event;switch(e.deltaX=e.deltaY=0,t.keyCode){case c.LEFT:case c.UP:e.deltaY=this.options.keyStep;break;case c.RIGHT:case c.DOWN:e.deltaY=-this.options.keyStep;break;default:return}this._notify(t)},r.prototype._bind=function(){a.hasWheelEvent&&this.el.addEventListener("wheel",this._onWheel),a.hasMouseWheelEvent&&this.el.addEventListener("mousewheel",this._onMouseWheel),a.hasTouch&&(this.el.addEventListener("touchstart",this._onTouchStart),this.el.addEventListener("touchmove",this._onTouchMove)),a.hasPointer&&a.hasTouchWin&&(this.bodyTouchAction=document.body.style.msTouchAction,document.body.style.msTouchAction="none",this.el.addEventListener("MSPointerDown",this._onTouchStart,!0),this.el.addEventListener("MSPointerMove",this._onTouchMove,!0)),a.hasKeyDown&&document.addEventListener("keydown",this._onKeyDown)},r.prototype._unbind=function(){a.hasWheelEvent&&this.el.removeEventListener("wheel",this._onWheel),a.hasMouseWheelEvent&&this.el.removeEventListener("mousewheel",this._onMouseWheel),a.hasTouch&&(this.el.removeEventListener("touchstart",this._onTouchStart),this.el.removeEventListener("touchmove",this._onTouchMove)),a.hasPointer&&a.hasTouchWin&&(document.body.style.msTouchAction=this.bodyTouchAction,this.el.removeEventListener("MSPointerDown",this._onTouchStart,!0),this.el.removeEventListener("MSPointerMove",this._onTouchMove,!0)),a.hasKeyDown&&document.removeEventListener("keydown",this._onKeyDown)},r.prototype.on=function(t,e){this._emitter.on(u,t,e);var i=this._emitter.e;i&&i[u]&&1===i[u].length&&this._bind()},r.prototype.off=function(t,e){this._emitter.off(u,t,e);var i=this._emitter.e;(!i[u]||i[u].length<=0)&&this._unbind()},r.prototype.reset=function(){var t=this._event;t.x=0,t.y=0},r.prototype.destroy=function(){this._emitter.off(),this._unbind()}},{"./clone":16,"./support":18,"bindall-standalone":4,lethargy:9,"object-assign":10,"tiny-emitter":15}],18:[function(t,e,i){"use strict";e.exports=function t(){return{hasWheelEvent:"onwheel"in document,hasMouseWheelEvent:"onmousewheel"in document,hasTouch:"ontouchstart"in document,hasTouchWin:navigator.msMaxTouchPoints&&navigator.msMaxTouchPoints>1,hasPointer:!!window.navigator.msPointerEnabled,hasKeyDown:"onkeydown"in document,isFirefox:navigator.userAgent.indexOf("Firefox")>-1}}()},{}]},{},[2]);
//# sourceMappingURL=./vendor.js.map

const openHome = function() {
    $('#home').show();
};

const closeHome = function() {
    $('#home').hide();
};

const openServices = function() {
    $('#services').show();
    $('body').addClass('body-inverse');
};

const closeServices = function() {
    $('#services').hide();
    $('body').removeClass('body-inverse');
};

var aboutInit = false;
const openAbout = function() {
    $('#about-us').show();

    $('body').addClass('body-inverse');
    if (!aboutInit) {
        aboutInit = true;
        initTab();
    }
};

const closeAbout = function() {
    $('#about-us').hide();
    $('body').removeClass('body-inverse');
};

var momsInit = false;
const openMoms = function() {
    $('#moms').show();

    $('body').addClass('body-inverse');
    if (!momsInit) {
        momsInit = true;

        //Data
    }
};

const closeMoms = function() {
    $('#moms').hide();
    $('body').removeClass('body-inverse');
};

const updateNav = function(classname) {
    $('.nav a').removeClass('actif');
    $('.nav a.all_' + classname).addClass('actif');
};


const onLoad = function() {
    const path = location.pathname;

    if (path === '/') {
        openHome();
    }
};

onLoad();
var $body = $('body');

var homeSlider = $('#images'),
    homeSliderNav = $('.home-slider-navigation'),
    sliderFlag = false;


// Slider functions

const initACtiveSlide = function() {
    const $activeSlide = $('.slide.active', homeSlider),
        $slider = $('.home-slider');

    $('.subtitle', $slider).text($activeSlide.data('cat'));
    $('.h1 a', $slider).html($activeSlide.data('title')).attr('href', $activeSlide.data('perma'));
    $('.read-more', $slider).attr('href', $activeSlide.data('perma'));
};

const changeSlide = function(nav) {
        const $activeSlide = $('.slide.active', homeSlider),
            length = $('.slide', homeSlider).length,
            $slider = $('.home-slider');

        var activeItem = $('.slide.active', homeSlider).index() + 1;

        $activeSlide.removeClass('active');

        if (nav === 0) {
            $slider.addClass('out-left');

            setTimeout(function() {
                $slider.removeClass('out-left');
                $slider.addClass('right-pos');

                setTimeout(function(){
                    $slider.removeClass('right-pos').addClass('default-position');
                    $('.subtitle', $slider).text($nowActiveSlide.data('cat'));
                    $('.h1 a', $slider).html($nowActiveSlide.data('title')).attr('href', $nowActiveSlide.data('perma'));
                    $('.read-more', $slider).attr('href', $nowActiveSlide.data('perma'));

                    setTimeout(function() {
                        $slider.removeClass('default-position');
                    }, 1000);
                }, 50);
            }, 1000);

            if (activeItem >= length) {
                $('.slide', homeSlider).eq(0).addClass('active');
            } else {
                $activeSlide.next().addClass('active');
            }
        } else {
            $slider.addClass('out-right');

            setTimeout(function() {
                $slider.removeClass('out-right');
                $slider.addClass('left-pos');

                setTimeout(function(){
                    $slider.removeClass('left-pos').addClass('default-position');
                    $('.subtitle', $slider).text($nowActiveSlide.data('cat'));
                    $('.h1 a', $slider).html($nowActiveSlide.data('title')).attr('href', $nowActiveSlide.data('perma'));
                    $('.read-more', $slider).attr('href', $nowActiveSlide.data('perma'));

                    setTimeout(function() {
                        $slider.removeClass('default-position');
                    }, 1000);
                }, 50);
            }, 1000);

            if (activeItem <= 1) {
                $('.slide', homeSlider).eq(length - 1).addClass('active');
            } else {
                $activeSlide.prev().addClass('active');
            }
        }

        var counterText =  $('.slide.active', homeSlider).index() + 1;
        if (Math.floor(counterText / 10) === 0) {
            counterText = '0' + counterText;
        }

        var $nowActiveSlide =  $('.slide.active', homeSlider);
        setTimeout(function(){
            $('.counter', homeSliderNav).text(counterText);
        }, 800);
};

const init = function() {
    //Home slider events

    $('.prev, .next', homeSliderNav).on('click', function() {
        const nav = $(this).data('nav');

        if (!sliderFlag) {
            if (nav === 1) {
                prev_slide();
            } else {
                next_slide();
            }

            sliderFlag = true;

            setTimeout(function() {
                sliderFlag = false;
            }, 2100);
        }
    });

    $(window).on('keydown', function(event) {
        if (!sliderFlag) {
            if (event.keyCode === 39) {
                next_slide();
            } else if (event.keyCode === 37) {
                prev_slide();
            }

            sliderFlag = true;

            setTimeout(function() {
                sliderFlag = false;
            }, 2100);
        }
    });

    $('a').on('click', function () {

    });

    initACtiveSlide();
};

init();


var currentMousePos = { x: window.innerWidth/2, y: window.innerHeight/2 };
document.addEventListener("mousemove", function(event){
    currentMousePos.x = event.pageX;
    currentMousePos.y = event.pageY;
});
//Portfolio
const closePortfolio = function() {
    document.querySelector('body').classList.remove('body-portfolio');

    if (le_scroll !== null) {
        le_scroll.on(onscroll);
    }

    if (document.querySelector('body').classList.contains('home')) {
        document.querySelectorAll('.devant.point, .devant .point').forEach(
            x => x.classList.remove('noir')
        );
    }

    TweenMax.to('#menu', 0.2, {
        opacity: 0, ease: Power2.easeIn, onComplete: function () {
            document.getElementById('menu').style.display = 'none';
            if (isMobile()) {
                document.getElementById('main').classList.remove('bloque');
                document.querySelector('body').classList.remove('temp');
                window.scrollTo(0, scroll_menu_open);
            }
        }
    });
    TweenMax.to('#main', 0.2, {opacity: 1, delay: 0.2, ease: Power2.easeOut});

    TweenMax.to('.trait1', 0.2, {scaleY: 1, delay: 0.2, ease: Power2.easeIn});

    stage_menu.removeChildren();
    cancelAnimationFrame(raf_pixi_menu);

    if (document.querySelector('body').classList.contains('home')) {
        pixi_home();
    } else if (document.querySelector('body').classList.contains('single')) {
        pixi_single();
    }
};

const openPortfolio = function() {
    document.querySelector('body').classList.add('body-portfolio');


    if (le_scroll !== null) {
        le_scroll.off(onscroll);
    } else {
        scroll_menu_open = window.pageYOffset;
    }
    document.querySelectorAll('.devant.point, .devant .point').forEach(
        x => x.classList.add('noir')
    );

    document.getElementById('menu').style.display = 'block';
    TweenMax.to('.trait1', 0.2, {scaleY: 0, delay: 0.2, ease: Power2.easeIn});

    TweenMax.to('#main', 0.2, {
        opacity: 0, ease: Power2.easeIn, onComplete: function () {
            if (isMobile()) {
                window.scrollTo(0, 0);
                document.getElementById('main').classList.add('bloque');
                document.querySelector('body').classList.add('temp');
            }
        }
    });
    TweenMax.to('#menu', 0.2, {opacity: 1, delay: 0.2, ease: Power2.easeOut});

    hauteur_menu = document.getElementById('le_menu').clientHeight;
    marges = window.innerHeight / 2 - 70;
    hauteur_marge = Math.round((100 - (hauteur_menu - 2 * marges) * 100 / hauteur_menu) / 2 * 100) / 100;
    entrees_menu = document.getElementById("le_menu").querySelectorAll("li").length;
    hauteur_entree = Math.round((100 - 2 * hauteur_marge) / entrees_menu * 100) / 100;

    stage_menu.addChild(displacementSprite3);
    stage_menu.addChild(image_menu0);
    image_menu0.alpha = 1;

    cancelAnimationFrame(raf_pixi_home);
    cancelAnimationFrame(raf_pixi_single);

    pixi_menu();
};
const changePage = function(href) {
    closeAll();

    if (href === '/works') {
        openPortfolio();
    } else if (href === '/') {
        closePortfolio();
        openHome();
    } else if (href === '/prices') {
        closePortfolio();
        openServices();
    }
    else if (href === '/about-us') {
        closePortfolio();
        openAbout();
    } else if (href === '/moms') {
        closePortfolio();
        openMoms();
    } else {
        data.projects.forEach(function(item) {
            if (item.link === href) {
                openWork(item);
            }
        });
    }

    $('.layout').scrollTop(0);
    updateNav(href.split('/')[1]);
};

const closeAll = function() {
    closeServices();
    closeAbout();
    closeHome();
    closeWork();
    closeMoms();
};
// vars
var directory_uri = "http://www.themustafacelik.com/wp-content/themes/mustafa";
var ajaxurl = "http://www.themustafacelik.com/wp-admin/admin-ajax.php";

var le_scroll = null, siriWave, counter;
var sortie_ok, ajax_ok, contenu_nouvelle_page, lien_en_cours, plus_long, raf, raf_pixi_home, raf_pixi_menu,
    raf_pixi_single, raf_chargement, le_raf_about, raf_about;
var mousePos = {}, ancien_delta = 0;

var displacementSprite,
    displacementSprite2,
    stage,
    texture2,
    displacementFilter,
    displacementFilter2,
    renderer,
    raf1,
    links,
    hovers,
    lien_bas,
    echelle_scale,
    le_delta_menu,
    scroll_menu_open,

    renderer_menu,
    displacementFilter3,
    displacementSprite3,
    stage_menu;

var currentMousePos = {x: window.innerWidth / 2, y: window.innerHeight / 2};

var loader;

var listenCursor = false; // true
var vitesse = 0;
var total_slide;
var current_slide = 0;
var bloque_action = true;
var attributs = {}, attributs2 = {}, attributs3 = {};

var delta_menu = 0;
var delta_scroll = 0;
var intensite, hauteur_menu, marges, expression, hauteur_marge, percent_cursor, entrees_menu, hauteur_entree;


document.addEventListener("mousemove", function (event) {

    currentMousePos.x = event.pageX;
    currentMousePos.y = event.pageY;

});

document.addEventListener("click", function (event) {
    if (event.target.classList.contains('change_projet')) {
        change_projet(event.target);
    }
});


// single hover

// document.getElementById('to_next_proj').addEventListener("mouseenter", function( event ) {

//     random = [];
//     document.querySelectorAll('#to_next_proj span').forEach(x=> random.push(x));
//     random.sort(function(){ return 0.5-Math.random(); });

//     TweenMax.staggerTo(random, 0.2, {opacity: 0, ease: Power2.easeIn, onComplete:function(e){
//         document.getElementById('to_next_proj').innerHTML = document.getElementById('to_next_proj').getAttribute('data-next');
//     }}, 0.05);

//     TweenMax.to('#inner_nom_projet', 0.2, {x: (document.getElementById('nom_projet').clientWidth + 10) / 2 + 'px', delay:0.2, ease:Power2.easeInOut});
//     TweenMax.staggerTo('.stag', 0.4, {opacity: 1, delay:0.2, ease: Power2.easeOut}, -0.02);
// });


// document.getElementById('to_next_proj').addEventListener("mouseleave", function( event ) {
//     TweenMax.staggerTo('#to_next_proj span', 0.2, {opacity: 0, ease: Power2.easeIn, onComplete:function(e){
//         this.target.classList.remove('blanc');
//         TweenMax.to(this.target, 0.2, {opacity: 1, ease: Power2.easeOut});
//     }}, 0.05);
//     TweenMax.to('#inner_nom_projet', 0.2, {x: '0px', delay:0.2, ease:Power2.easeInOut});
//     TweenMax.staggerTo('.stag', 0.4, {opacity: 0, delay:0.2, ease: Power2.easeOut}, 0.02);
// });


var supportsWheel = false;

function scrollEvent(e) {

    if (e.type == "wheel") {
        supportsWheel = true;
    } else if (supportsWheel) {
        return;
    }

    var delta = (e.deltaY || -e.wheelDelta || e.detail) || 1;

    if (bloque_action === false &&
        !document.querySelector('.all_works').classList.contains('actif') &&
        document.querySelector('body').classList.contains('home')
    ) {
        if (!sliderFlag) {
            if (delta > 0) {
                prev_slide();
            } else if (delta < 0) {
                next_slide();
            }
        }
    }
}

/* Add the event listeners for each event. */
document.addEventListener('wheel', scrollEvent);
document.addEventListener('mousewheel', scrollEvent);
document.addEventListener('DOMMouseScroll', scrollEvent);


// resize
window.addEventListener("resize", resize);

function resize() {

    if (le_scroll !== null) {
        le_scroll.resize();
    } else {
        document.getElementById('about').style.top = window.innerHeight / 2 + 'px';
        document.getElementById('contact').style.top = window.innerHeight / 2 + 'px';
    }


}


// document ready vanilla
document.addEventListener("DOMContentLoaded", function () {

    //--------------//
    // PROCESS AJAX //
    //--------------//
    // var $main = $("#main"),

    // appelé à chaque lancement d'une page
    var init = function () {

            sortie_ok = false;
            ajax_ok = false;
            lien_en_cours = false;
            delta_menu = 0;
            delta_scroll = 0;
            vitesse = 0;
            lien_bas = false;
            once_play = false;
            TweenMax.set('#main, #le_menu, #pixi_menu', {opacity: 1});
            TweenMax.set('#main', {clearProps: "y"});
            TweenMax.to('.trait1', 0.2, {scaleY: 1, ease: Power2.easeIn});
            document.getElementById('menu').style.display = 'none';

            if (document.querySelector('body').classList.contains('is-loading')) {
                document.querySelector('.is-loading').classList.remove('is-loading');
            }

            // quand clique on lien
            links = document.querySelectorAll('a');

            links.forEach(function (link) {
                link.removeEventListener('click', onClick);
            });

            function onClick(event) {
                if (!event.target.classList.contains('externe')) {
                    event.preventDefault();

                    // if (lien_en_cours === false) {
                    //     lien_en_cours = true;
                        var href = this.getAttribute('href');

                        if (event.target.classList.contains('lien_bas')) {
                            lien_bas = true;
                        }

                        //if(href.indexOf(document.domain) > -1 || href.indexOf(':') === -1) {
                        history.pushState({}, '', href);
                        changePage(href);
                        //loadPage(href);
                        //le_raf_chargement();

                        //le_scroll.off(onscroll);

                        return false;
                        //}
                    // } else {
                    //     return false;
                    // }
                }
            }

            links.forEach(function (link) {
                link.addEventListener('click', onClick);
            });

            animations();
        },
        // quand get() terminé
        ajaxLoad = function (html) {
            contenu_nouvelle_page = html;
            ajax_ok = true;
        },
        // animations d'entrée
        animations = function () {
            if (window.innerWidth < 768) {
                document.querySelectorAll('#le_menu li').forEach(x => x.classList.remove('actif'));
            }

            if (isMobile()) {
                window.scrollTo(0, 0);
                document.getElementById('main').classList.remove('bloque');
            }

            if (document.querySelector('body').classList.contains('home')) {

                document.querySelectorAll('.point').forEach(x => x.classList.remove('noir'));


                hovers = document.querySelectorAll('.change_projet');
                hovers.forEach(function (hover) {
                    hover.addEventListener("mouseenter", onHover);
                });
                hovers.forEach(function (hover) {
                    hover.addEventListener("mouseleave", offHover);
                });

                current_slide = 0;
                total_slide = 0;

                renderer = PIXI.autoDetectRenderer(
                    window.innerWidth, window.innerHeight, {transparent: !0}
                );

                document.getElementById('inner_canvas').appendChild(renderer.view);

                stage = new PIXI.Container();
                loader = new PIXI.loaders.Loader();

                document.querySelectorAll('#images div').forEach(setDimensions);


                //displacement 1
                displacementSprite = PIXI.Sprite.fromImage("/img/gradient4.png"); //gradient4_bis //gradient4
                displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.CLAMP; //REPEAT // MIRRORED_REPEAT //CLAMP
                displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);


                //displacement 2
                displacementSprite2 = PIXI.Sprite.fromImage("/img/gradient_large.png");
                displacementSprite2.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
                displacementFilter2 = new PIXI.filters.DisplacementFilter(displacementSprite2);


                //settings displacement1
                //intensité
                displacementFilter.scale.x = 50;
                displacementFilter.scale.y = 0;
                //centre pour curseur
                displacementSprite.pivot.x = 256;
                displacementSprite.pivot.y = 256;
                //echelle x/y
                displacementSprite.scale.x = 0.2;


                //settings displacement2
                //intensité
                displacementFilter2.scale.x = 0;
                displacementFilter2.scale.y = 0;
                //echelle x/y
                displacementSprite2.scale.x = 0.8;
                //displacementSprite2.anchor.x = 1;


                stage.addChild(displacementSprite);
                stage.filters = [displacementFilter, displacementFilter2];

                loader.load((loader, resources) => {
                    bloque_action = false;
                    if (!document.querySelector('.all_works').classList.contains('actif')) {
                        pixi_home();
                    }
                    next_slide();
                    document.getElementById('progress').style.display = "none";

                });

            } else if (document.querySelector('body').classList.contains('page-template-about')) {

                document.getElementById('progress').style.display = "none";
                document.querySelectorAll('.point').forEach(x => x.classList.add('noir'));

                //document.getElementById('volet1').classList.add('ouvert');
                //document.querySelector('.intro').classList.add('ouvert');

                TweenMax.to('.fond_intro', 1.2, {scaleX: 1, ease: Power4.easeOut});
                random = [];
                document.querySelectorAll('.random').forEach(x => random.push(x));
                random.sort(function () {
                    return 0.5 - Math.random();
                });
                TweenMax.staggerFromTo(random, 1, {x: '-24px'}, {
                    x: '0px',
                    opacity: 1,
                    delay: 0.6,
                    ease: Power2.easeOut
                }, 0.1);


                if (!isMobile()) {
                    if (le_scroll !== null) {
                        le_scroll.destroy();
                    }
                    le_scroll = null;

                    le_scroll = new global_custom2.default({
                        preload: true,
                        native: false,
                        section: document.querySelector('.vs-section'),
                        divs: document.querySelectorAll('.vs-div'),
                        vs: {mouseMultiplier: 0.4}
                    });

                    le_scroll.init();
                }


                TweenMax.to('#main', 0.4, {backgroundColor: "#EFEFEF", ease: Power2.easeInOut});

                TweenMax.to('#inner_svg', 1, {opacity: 1, ease: Power2.easeIn});
                TweenMax.fromTo('#inner_svg', 2, {rotation: 140}, {rotation: 0, ease: Power2.easeOut});
                TweenMax.fromTo('#inner_svg img', 2, {rotation: -140}, {
                    rotation: 0, ease: Power2.easeOut, onComplete: function () {
                        raf_about();
                    }
                });

            } else if (document.querySelector('body').classList.contains('single')) {

                if (window.innerWidth < 768) {
                    document.querySelectorAll('#le_menu li').forEach(
                        x => {
                            if (document.querySelector('body').classList.contains(x.getAttribute('data-id'))) {
                                x.classList.add('actif');
                            }
                        }
                    );
                }


                document.querySelectorAll('.point').forEach(x => x.classList.add('noir'));


                if (!isMobile()) {

                    document.getElementById('to_next_proj').addEventListener("mouseover", onHoverNext);
                    document.getElementById('to_next_proj').addEventListener("mouseout", offHoverNext);


                    if (le_scroll !== null) {
                        le_scroll.destroy();
                    }
                    le_scroll = null;

                    le_scroll = new global_custom2.default({
                        preload: true,
                        native: false,
                        section: document.querySelector('.vs-section'),
                        divs: document.querySelectorAll('.vs-div'),
                        vs: {mouseMultiplier: 0.4}
                    });

                    le_scroll.init();
                } else {
                    document.getElementById('to_next_proj').innerHTML = document.getElementById('to_next_proj').getAttribute('data-next');
                    TweenMax.set('#inner_nom_projet', {x: (document.getElementById('nom_projet').clientWidth + 10) / 2 + 'px'});
                    TweenMax.set('#nom_projet .stag', {opacity: 1});

                }

                var hauteur;
                if (window.innerWidth > 767) {
                    hauteur = 0.57 * window.innerWidth + 20;
                    renderer = PIXI.autoDetectRenderer(
                        window.innerWidth, (0.57 * window.innerWidth + 20), {transparent: !0}
                    );
                } else {
                    hauteur = window.innerWidth + 20;
                    renderer = PIXI.autoDetectRenderer(
                        window.innerWidth, (window.innerWidth + 20), {transparent: !0}
                    );
                }
                document.getElementById('cover').appendChild(renderer.view);


                stage = new PIXI.Container();

                loader = new PIXI.loaders.Loader();

                //document.querySelectorAll('#images div').forEach(setDimensions);
                var image = new PIXI.Sprite(PIXI.Texture.fromImage(document.getElementById('cover').getAttribute('data-img')));

                loader.add("image", document.getElementById('cover').getAttribute('data-img'));

                var img = new Image();
                img.src = document.getElementById('cover').getAttribute('data-img');

                img.onload = function () {
                    var width = this.width;
                    var height = this.height;

                    var ratio_img = width / height;
                    var ratio_fenetre = window.innerWidth / hauteur;

                    // +10 et - 5 valeurs pour éviter les bords blancs
                    if (ratio_fenetre >= ratio_img) {
                        image.width = window.innerWidth + 10;
                        image.height = height * (window.innerWidth + 10) / width;
                        image.x = -5;
                        image.y = hauteur / 2 - image.height / 2;
                    } else {
                        image.height = hauteur;
                        image.width = (width * hauteur / height) + 10;
                        image.x = (window.innerWidth / 2 - image.width / 2) - 5;
                    }
                };


                //displacement 2
                displacementSprite2 = PIXI.Sprite.fromImage(directory_uri + "/img/gradient_large.png");
                displacementSprite2.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
                displacementFilter2 = new PIXI.filters.DisplacementFilter(displacementSprite2);


                displacementFilter2.scale.x = 0; //150

                displacementSprite2.scale.x = 0.8;


                stage.addChild(displacementSprite2);
                stage.addChild(image);
                stage.filters = [displacementFilter2];

                loader.load((loader, resources) => {
                    bloque_action = false;
                    if (!document.querySelector('.all_works').classList.contains('actif')) {
                        pixi_single();
                    }

                    random = [];
                    document.querySelectorAll('.random').forEach(x => random.push(x));
                    random.sort(function () {
                        return 0.5 - Math.random();
                    });
                    TweenMax.staggerFromTo(random, 1, {x: '-24px'}, {x: '0px', opacity: 1, ease: Power2.easeOut}, 0.1);
                    TweenMax.to('#cover', 1, {opacity: 1, delay: 0.4, ease: Power2.easeOut});

                    vitesse = 4;

                    document.getElementById('progress').style.display = "none";

                    echelle_scale = (document.getElementById('les_imgs').clientHeight + (0.28 * window.innerHeight)) / document.getElementById('les_imgs').clientHeight;
                    echelle_scale = parseFloat(Math.round(echelle_scale * 100) / 100).toFixed(2);

                });

            }
            // TweenMax.to('body', 1, {opacity:1, onComplete:function(){
            //     scroll.init();
            //     scroll.resize();
            // }});
            //if($('event')[0]){}
            //console.log('animations');

        },
        // animations de sortie sorties
        loadPage = function (href) {
            //Загружать нечего

            //document.getElementById('progress').style.display = "block";

            // if (le_scroll !== null) {
            //     le_scroll.off(onscroll);
            // }

            // var xhr = new XMLHttpRequest(),
            //     method = "GET",
            //     url = href;
            //
            // xhr.open(method, url, true);
            // xhr.onreadystatechange = function () {
            //     if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            //         ajaxLoad(xhr.responseText);
            //     }
            // };
            // xhr.send();

            //TweenMax.to('body', 3, {opacity:0, onComplete:function(){
            //sortie_ok = true;
            //}});

            if (document.querySelector('.all_works').classList.contains('actif')) {

                cancelAnimationFrame(raf_pixi_menu);
                TweenMax.to('#le_menu, #pixi_menu', 0.4, {
                    opacity: 0, ease: Power2.easeInOut, onComplete: function () {
                        stage_menu.removeChildren();
                        sortie_ok = true;
                        TweenMax.set('#main', {clearProps: "backgroundColor"});
                    }
                });

            } else if (document.querySelector('body').classList.contains('home')) {

                //vitesse = 4;
                listenCursor = false;
                bloque_action = true;

                //stage.removeChild(displacementSprite);
                //stage.addChild(displacementSprite2);

                random = [];
                document.querySelectorAll('.random').forEach(x => random.push(x));
                random.sort(function () {
                    return 0.5 - Math.random();
                });
                TweenMax.staggerTo(random, 0.4, {x: '24px', opacity: 0, ease: Power2.easeIn}, 0.1);

                // TweenMax.to(attributs2, 0.9, {
                //     intensite: 150,
                //     x: 10,
                //     ease: Power2.easeIn,
                //     onUpdate: function () {
                //         displacementFilter2.scale.x = attributs2.intensite;
                //         vitesse = attributs2.x;
                //     },
                //     onComplete: function() {

                //     }
                // });

                TweenMax.to('#main', 1, {
                    opacity: 0, delay: 0.4, ease: Power2.easeInOut, onComplete: function () {
                        sortie_ok = true;
                    }
                });

                hovers = document.querySelectorAll('.change_projet');
                hovers.forEach(function (hover) {
                    hover.removeEventListener('mouseenter', onHover);
                    hover.removeEventListener('mouseleave', offHover);
                });

            } else if (document.querySelector('body').classList.contains('single')) {

                document.getElementById('to_next_proj').removeEventListener('mouseover', onHoverNext);
                document.getElementById('to_next_proj').removeEventListener('mouseout', offHoverNext);

                if (lien_bas) {
                    var diff;

                    if (le_scroll !== null) {
                        diff = document.getElementById('main').clientHeight - (le_scroll.vars.current + window.innerHeight);
                        TweenMax.to('#main', 1.2, {y: -(diff + window.innerHeight), ease: Power2.easeInOut});
                        TweenMax.to('#next_proj > div', 1.2, {
                            y: diff + window.innerHeight - (document.getElementById('demi_haut').clientHeight / 2),
                            ease: Power2.easeInOut,
                            onComplete: function () {
                                TweenMax.to('#next_proj > div', 0.4, {
                                    opacity: 0, ease: Power2.easeInOut, onComplete: function () {
                                        //TweenMax.set('#main', {clearProps: "y"});
                                        sortie_ok = true;
                                    }
                                });
                            }
                        });
                    } else {
                        diff = document.getElementById('main').clientHeight - (window.pageYOffset + window.innerHeight);
                        TweenMax.to('#next_proj, .inner_img', 1.2, {
                            y: -(diff + window.innerHeight),
                            ease: Power2.easeInOut
                        });
                        TweenMax.to('#next_proj > div', 1.2, {
                            y: diff + window.innerHeight - (document.getElementById('demi_haut').clientHeight / 2),
                            ease: Power2.easeInOut,
                            onComplete: function () {
                                TweenMax.to('#next_proj > div', 0.4, {
                                    opacity: 0, ease: Power2.easeInOut, onComplete: function () {
                                        //TweenMax.set('#main', {clearProps: "y"});
                                        sortie_ok = true;
                                        window.scrollTo(0, 0);
                                    }
                                });
                            }
                        });
                    }

                } else {
                    TweenMax.to('#main', 0.4, {
                        opacity: 0, ease: Power2.easeInOut, onComplete: function () {
                            sortie_ok = true;
                        }
                    });
                }
                //sortie_ok = true;

            } else if (document.querySelector('body').classList.contains('page-template-about')) {

                // document.querySelector('.intro2').classList.remove('ouvert');
                // document.querySelector('.intro').classList.remove('ouvert');
                // setTimeout(function(){
                //     document.querySelector('.intro2').classList.add('ouvert');
                // document.querySelector('.intro').classList.add('ouvert');
                // }, 400);
                TweenMax.to('#main', 0.4, {
                    opacity: 0, clearProps: "backgroundColor", ease: Power2.easeInOut, onComplete: function () {
                        sortie_ok = true;
                    }
                });

            } else {
                sortie_ok = true;
            }


        },
        // mise à jour des données de la page
        updatePage = function (html) {

            var parser = new DOMParser();
            var doc = parser.parseFromString(html, "text/html");
            var liste_class = doc.querySelectorAll('body')[0].getAttribute('class');

            // maj titre de la page
            document.title = doc.querySelector('title').innerHTML;

            // maj class du body
            //document.querySelectorAll('body')[0].setAttribute('class', doc.querySelectorAll('body')[0].getAttribute('class'));
            var res = liste_class.replace("is-loading", "");
            document.querySelectorAll('body')[0].setAttribute('class', res);

            if (!isMobile()) {
                document.querySelectorAll('body')[0].classList.add('desktop');
            } else {
                document.querySelectorAll('body')[0].classList.add('mobile');
            }

            // maj contenu #main
            document.getElementById('main').innerHTML = doc.getElementById('main').innerHTML;

            // on lance la nouvelle page
            init();
        };


    function le_raf_chargement() {

        raf_chargement = requestAnimationFrame(le_raf_chargement);
        if (sortie_ok === true && ajax_ok === true) {

            //
            cancelAnimationFrame(raf_pixi_home);
            cancelAnimationFrame(raf_pixi_single);

            if (document.querySelector('body').classList.contains('single') || document.querySelector('body').classList.contains('home')) {
                stage.destroy();
                renderer.destroy();
            }

            updatePage(contenu_nouvelle_page);
            cancelAnimationFrame(raf_chargement);


        }
    }

    // gestion bouton prev/next navigateur
    window.onpopstate = function (e) {
        console.log('AHTUNG');
        if (e.state !== null) {
            console.log(location.pathname);
            changePage(location.pathname);
            //le_raf_chargement();

            //le_scroll.off(onscroll);
        }
    };


    //------------------------------//
    // APPELS AU PREMIER CHARGEMENT //
    //------------------------------//
    history.pushState({}, '', location);
    // le_raf();
    init();
    if (!isMobile()) {
        document.querySelectorAll('body')[0].classList.add('desktop');
    } else {
        document.querySelectorAll('body')[0].classList.add('mobile');
        document.getElementById('about').style.top = window.innerHeight / 2 + 'px';
        document.getElementById('contact').style.top = window.innerHeight / 2 + 'px';
    }


    // déclaration pixi menu
    renderer_menu = PIXI.autoDetectRenderer(
        560, window.innerHeight, {transparent: !0}
    );
    document.getElementById('pixi_menu').appendChild(renderer_menu.view);

    stage_menu = new PIXI.Container();

    document.querySelectorAll('#le_menu li a').forEach(setDimensions_menu);

    console.log(renderer_menu);

    //displacement 2
    displacementSprite3 = PIXI.Sprite.fromImage("/img/gradient_large.png");
    displacementSprite3.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    displacementFilter3 = new PIXI.filters.DisplacementFilter(displacementSprite3);


    stage_menu.filters = [displacementFilter3];

    //settings displacement2
    //intensité
    displacementFilter3.scale.x = 0;
    displacementFilter3.scale.y = 0;
    //echelle x/y
    displacementSprite3.scale.x = 0.4;


}); // end doc ready vanilla


var initSlider = false;

// autres fonctions
function next_slide() {

    vitesse = 4;
    transition_commune();
    update_titre('next');

    if (initSlider) {
        changeSlide(1);
    }

    initSlider = true;
    sliderFlag = true;
    setTimeout(function() {
        sliderFlag = false;
    }, 2100);

    window["image" + current_slide].alpha = 0;
    stage.addChild(window["image" + current_slide]);

    //image1.alpha = 1;
    var tl = new TimelineMax();
    tl.to(attributs2, 0.9, {
        intensite: 150,
        x: 20,
        //largeur: 0.8,
        ease: Power2.easeIn,
        onUpdate: function () {
            displacementFilter2.scale.x = attributs2.intensite;
            vitesse = attributs2.x;
            //displacementSprite2.scale.x = attributs2.largeur;
        },
        onComplete: function () {
            tl.reverse();
            setTimeout(function () {
                if (!isMobile()) {
                    stage.removeChild(displacementSprite2);
                    stage.addChild(displacementSprite);
                }
                listenCursor = true;

                if (current_slide === 0) {
                    stage.removeChild(window["image" + (total_slide - 1)]);
                } else {
                    stage.removeChild(window["image" + (current_slide - 1)]);
                }

                if (current_slide < (total_slide - 1)) {
                    current_slide++;
                } else {
                    current_slide = 0;
                }

                displacementSprite.x = currentMousePos.x;
                bloque_action = false;
            }, 800);
        }
    });

    TweenMax.to(attributs3, 0.6, {
        opacite: 1,
        delay: 0.6,
        ease: Linear.easeNone,
        onUpdate: function () {
            window["image" + current_slide].alpha = attributs3.opacite;
        }
    });
}

function prev_slide() {
    vitesse = -4;
    transition_commune();
    update_titre('prev');

    sliderFlag = true;
    setTimeout(function() {
        sliderFlag = false;
    }, 2100);

    changeSlide(0);

    if (current_slide === 0) {
        window["image" + (total_slide - 2)].alpha = 0;
        stage.addChild(window["image" + (total_slide - 2)]);
    } else if (current_slide === 1) {
        window["image" + (total_slide - 1)].alpha = 0;
        stage.addChild(window["image" + (total_slide - 1)]);
    } else {
        window["image" + (current_slide - 2)].alpha = 0;
        stage.addChild(window["image" + (current_slide - 2)]);
    }

    //image1.alpha = 1;
    var tl = new TimelineMax();

    //attributs2.anchor = 0;

    tl.to(attributs2, 0.9, {
        intensite: 150,
        x: -20,
        //largeur: 0.8,
        //anchor: 1,
        ease: Power2.easeIn,
        onUpdate: function () {
            displacementFilter2.scale.x = attributs2.intensite;
            vitesse = attributs2.x;
            //displacementSprite2.scale.x = attributs2.largeur;
            //displacementSprite2.anchor.x = attributs2.anchor;
        },
        onComplete: function () {
            tl.reverse();

            // attributs2.intensite = 150;
            // attributs2.x = -20;
            // tl.to(attributs2, 0.9, {
            //     intensite: 0,
            //     x: 0,
            //     ease: Power1.easeOut,
            //     onUpdate: function () {
            //         console.log(attributs2.largeur);
            //         displacementFilter2.scale.x = attributs2.intensite;
            //         vitesse = attributs2.x;
            //     }
            // });

            setTimeout(function () {

                if (!isMobile()) {
                    stage.removeChild(displacementSprite2);
                    stage.addChild(displacementSprite);
                }
                listenCursor = true;


                if (current_slide === 0) {
                    stage.removeChild(window["image" + (total_slide - 1)]);
                } else {
                    stage.removeChild(window["image" + (current_slide - 1)]);
                }

                if (current_slide > 0) {
                    current_slide--;
                } else {
                    current_slide = total_slide - 1;
                }

                displacementSprite.x = currentMousePos.x;
                bloque_action = false;
            }, 800);
        }
    });

    TweenMax.to(attributs3, 0.6, {
        opacite: 1,
        delay: 0.6,
        ease: Linear.easeNone,
        onUpdate: function () {
            if (current_slide === 0) {
                window["image" + (total_slide - 2)].alpha = attributs3.opacite;
            } else if (current_slide === 1) {
                window["image" + (total_slide - 1)].alpha = attributs3.opacite;
            } else {
                window["image" + (current_slide - 2)].alpha = attributs3.opacite;
            }
        }
    });
}


function transition_commune() {
    listenCursor = false;
    bloque_action = true;

    stage.removeChild(displacementSprite);
    stage.addChild(displacementSprite2);

    attributs.intensite = displacementFilter.scale.x;
    TweenMax.to(attributs, 0.3, {
        intensite: 0,
        ease: Power2.easeOut,
        onUpdate: function () {
            displacementFilter.scale.x = attributs.intensite;
        }
    });

    displacementSprite2.x = 0;
    attributs2.intensite = displacementFilter2.scale.x;
    attributs2.x = vitesse;
    attributs2.largeur = displacementSprite2.scale.x;

    attributs3.opacite = 0;

}


function setDimensions(item, index) {
    total_slide++;

    window["image" + index] = new PIXI.Sprite(
        PIXI.Texture.fromImage(item.getAttribute('data-url'))
    );

    window["image" + index].alpha = 0;

    loader.add("image" + index, item.getAttribute('data-url'));

    var img = new Image();
    img.src = item.getAttribute('data-url');
    img.onload = function () {
        var width = this.width;
        var height = this.height;

        var ratio_img = width / height;
        var ratio_fenetre = window.innerWidth / window.innerHeight;

        // +10 et - 5 valeurs pour éviter les bords blancs
        if (ratio_fenetre >= ratio_img) {
            window["image" + index].width = window.innerWidth + 10;
            window["image" + index].height = height * (window.innerWidth + 10) / width;
            window["image" + index].x = -5;
            window["image" + index].y = window.innerHeight / 2 - window["image" + index].height / 2;
        } else {
            window["image" + index].height = window.innerHeight;
            window["image" + index].width = (width * window.innerHeight / height) + 10;
            window["image" + index].x = (window.innerWidth / 2 - window["image" + index].width / 2) - 5;
        }
    };
}

function setDimensions_menu(item, index) {
    //total_slide++;
    var cadre_width = 560;
    var cadre_height = window.innerHeight;

    window["image_menu" + index] = new PIXI.Sprite(
        PIXI.Texture.fromImage(item.getAttribute('data-img'))
    );

    window["image_menu" + index].alpha = 0;

    var img = new Image();
    img.src = item.getAttribute('data-img');
    img.onload = function () {
        var width = this.width;
        var height = this.height;

        var ratio_img = width / height;
        var ratio_fenetre = cadre_width / cadre_height;

        // +10 et - 5 valeurs pour éviter les bords blancs
        if (ratio_fenetre >= ratio_img) {
            window["image_menu" + index].width = cadre_width + 10;
            window["image_menu" + index].height = height * (cadre_width + 10) / width;
            window["image_menu" + index].x = -5;
            window["image_menu" + index].y = cadre_height / 2 - window["image_menu" + index].height / 2;
        } else {
            window["image_menu" + index].height = cadre_height;
            window["image_menu" + index].width = (width * cadre_height / height) + 10;
            window["image_menu" + index].x = (cadre_width / 2 - window["image_menu" + index].width / 2) - 5;
        }
    };
}

var random, multiplieur;

function update_titre(sens) {

    if (sens === 'next') {
        multiplieur = 1;
        TweenMax.to('#cercle_blanc', 0.9, {
            'stroke-dashoffset': 190 * (1 - 1 / total_slide - (current_slide * 1 / total_slide)),
            ease: Power4.easeInOut
        });
    } else {
        multiplieur = -1;

        if (current_slide === 1) {
            TweenMax.to('#cercle_blanc', 0.9, {'stroke-dashoffset': 0, ease: Power4.easeInOut});
        } else if (current_slide === 0) {
            TweenMax.to('#cercle_blanc', 0.9, {'stroke-dashoffset': 190 / total_slide, ease: Power4.easeInOut});
        } else {
            TweenMax.to('#cercle_blanc', 0.9, {
                'stroke-dashoffset': 190 - (current_slide - 1) * 190 / total_slide,
                ease: Power4.easeInOut
            });
        }
    }

    random = [];
    document.querySelectorAll('.random').forEach(x => random.push(x));

    random.sort(function () {
        return 0.5 - Math.random();
    });

    TweenMax.staggerTo(random, 0.4, {x: multiplieur * 24 + 'px', opacity: 0, ease: Power2.easeIn}, 0.1, allDone);
}

function allDone() {

    document.querySelectorAll('.random.first').forEach(x => x.classList.remove('first'));

    document.querySelector('#num_lettre .current').classList.add('after');

    if (multiplieur === 1) {
        if (document.querySelector('#num_lettre .current').nextElementSibling !== null) {
            document.querySelector('#num_lettre .current').nextElementSibling.classList.add('before');
            var next = document.querySelector('#num_lettre .current').nextElementSibling;
            TweenMax.to('.current .lettre', 0.4, {x: '100%', clearProps: "x", ease: Power4.easeInOut});
            TweenMax.to(document.querySelector('#num_lettre .current').nextElementSibling.querySelector('div'), 0.4, {
                x: '0%', clearProps: "x", ease: Power4.easeInOut, onComplete: function () {
                    document.querySelector('#num_lettre .current').classList.remove('current', 'after');
                    next.classList.add('current');
                    next.classList.remove('before');
                }
            });
        } else {
            var first = document.querySelector('#num_lettre div');
            first.classList.add('before');
            TweenMax.to('.current .lettre', 0.4, {x: '100%', clearProps: "x", ease: Power4.easeInOut});
            TweenMax.to(first.querySelector('div'), 0.4, {
                x: '0%', clearProps: "x", ease: Power4.easeInOut, onComplete: function () {

                    if (document.querySelectorAll('.change_projet')[total_slide - 1].classList.contains('first')) {
                        document.querySelectorAll('.change_projet')[total_slide - 1].classList.remove('first');
                    }

                    document.querySelector('#num_lettre .current').classList.remove('current', 'after');
                    first.classList.add('current');
                    first.classList.remove('before');
                }
            });
        }

        document.getElementById('titre_h2').innerHTML = document.querySelectorAll('#images div')[current_slide].getAttribute('data-titre');
        document.getElementById('type').innerHTML = document.querySelectorAll('#images div')[current_slide].getAttribute('data-cat');

        document.querySelectorAll('.update_link').forEach(x => x.setAttribute('href', document.querySelectorAll('#images div')[current_slide].getAttribute('data-perma')));

    } else {
        if (document.querySelector('#num_lettre .current').previousElementSibling !== null) {
            document.querySelector('#num_lettre .current').previousElementSibling.classList.add('before');
            var prev = document.querySelector('#num_lettre .current').previousElementSibling;
            TweenMax.to('.current .lettre', 0.4, {x: '-100%', clearProps: "x", ease: Power4.easeInOut});
            TweenMax.fromTo(document.querySelector('#num_lettre .current').previousElementSibling.querySelector('div'), 0.4, {x: '100%'}, {
                x: '0%', clearProps: "x", ease: Power4.easeInOut, onComplete: function () {
                    document.querySelector('#num_lettre .current').classList.remove('current', 'after');
                    prev.classList.add('current');
                    prev.classList.remove('before');

                }
            });
        } else {
            var last = document.querySelectorAll('#num_lettre > div')[total_slide - 1];
            last.classList.add('before');
            TweenMax.to('.current .lettre', 0.4, {x: '-100%', clearProps: "x", ease: Power4.easeInOut});
            TweenMax.fromTo(last.querySelector('div'), 0.4, {x: '100%'}, {
                x: '0%', clearProps: "x", ease: Power4.easeInOut, onComplete: function () {
                    document.querySelector('#num_lettre .current').classList.remove('current', 'after');
                    last.classList.add('current');
                    last.classList.remove('before');
                }
            });
        }

        if (current_slide === 1) {
            document.getElementById('num_projet').innerHTML = total_slide;
            document.getElementById('titre_h2').innerHTML = document.querySelectorAll('#images div')[total_slide - 1].getAttribute('data-titre');
            document.getElementById('type').innerHTML = document.querySelectorAll('#images div')[total_slide - 1].getAttribute('data-cat');

            document.querySelectorAll('.update_link').forEach(x => x.setAttribute('href', document.querySelectorAll('#images div')[total_slide - 1].getAttribute('data-perma')));

        } else if (current_slide === 0) {
            document.getElementById('num_projet').innerHTML = total_slide - 1;
            document.getElementById('titre_h2').innerHTML = document.querySelectorAll('#images div')[total_slide - 2].getAttribute('data-titre');
            document.getElementById('type').innerHTML = document.querySelectorAll('#images div')[total_slide - 2].getAttribute('data-cat');

            document.querySelectorAll('.update_link').forEach(x => x.setAttribute('href', document.querySelectorAll('#images div')[total_slide - 2].getAttribute('data-perma')));

        } else {
            document.getElementById('num_projet').innerHTML = current_slide - 1;
            document.getElementById('titre_h2').innerHTML = document.querySelectorAll('#images div')[current_slide - 2].getAttribute('data-titre');
            document.getElementById('type').innerHTML = document.querySelectorAll('#images div')[current_slide - 2].getAttribute('data-cat');

            document.querySelectorAll('.update_link').forEach(x => x.setAttribute('href', document.querySelectorAll('#images div')[current_slide - 2].getAttribute('data-perma')));

        }
    }

    document.querySelectorAll('#titre_h2 span').forEach(addRandom);

    random = [];
    document.querySelectorAll('.random').forEach(x => random.push(x));

    random.sort(function () {
        return 0.5 - Math.random();
    });

    TweenMax.staggerFromTo(random, 1, {x: -multiplieur * 24 + 'px', opacity: 0}, {
        x: '0px',
        opacity: 1,
        ease: Power2.easeOut
    }, 0.1);
}

function addRandom(item, index) {
    item.classList.add('random');
}

function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    // return true;
}


//------------------//
// RAFS             //
//------------------//
//cancelAnimationFrame(raf_pixi);
var num_image;
var num_image_temp = -1;
var delayx;

function pixi_home() {

    raf_pixi_home = requestAnimationFrame(pixi_home);
    //console.log('pixi home tourne');

    renderer.render(stage);


    if (listenCursor) {
        //window["image" + (current_slide - 1)].x = 100

        mousePos.x = displacementSprite.x;
        //mousePos.y = displacementSprite.y;
        mousePos.intensite = displacementFilter.scale.x;
        mousePos.largeur = displacementSprite.scale.x;

        if (current_slide !== num_image_temp) {

            num_image_temp = current_slide;

            if (current_slide === 0) {
                num_image = total_slide - 1;
            } else {
                num_image = current_slide - 1;
            }

            //currentMousePos.x = 0;
            delayx = window["image" + num_image].x;

        }

        mousePos.correction = 0;

        TweenMax.to(mousePos, 0.3, {
            x: currentMousePos.x,
            //y: currentMousePos.y,
            intensite: (currentMousePos.x - ancien_delta) * 10,
            largeur: Math.abs(((currentMousePos.x - ancien_delta) / 80) - 0.2),
            correction: (currentMousePos.x - ancien_delta) / 40,
            onUpdate: function () {
                displacementSprite.x = mousePos.x;
                //displacementSprite.y = mousePos.y;
                displacementFilter.scale.x = mousePos.intensite;
                displacementSprite.scale.x = mousePos.largeur;
                window["image" + num_image].x = delayx + mousePos.correction;
            },
            ease: Linear.easeNone
        });

        //console.log((currentMousePos.x - ancien_delta) / 100);

        if (isMobile()) {
            mousePos.penche = displacementFilter2.scale.x;

            TweenMax.to(mousePos, 0.3, {
                penche: (gamma * 20 - delta_gamma),
                onUpdate: function () {
                    displacementFilter2.scale.x = mousePos.penche;
                },
                ease: Linear.easeNone
            });

            //document.getElementById('titre_h2').innerHTML = gamma;

            displacementSprite2.x += 10;
        }

    } else {
        displacementSprite2.x += vitesse;

    }

    ancien_delta = currentMousePos.x;
    delta_gamma = gamma * 20;

}

function pixi_menu() {

    raf_pixi_menu = requestAnimationFrame(pixi_menu);
    //console.log('pixi menu tourne');

    renderer_menu.render(stage_menu);
    displacementSprite3.x += 4;


    if (!isMobile()) {
        percent_cursor = Math.round(currentMousePos.y * 100 / window.innerHeight * 100) / 100;
        le_delta_menu = currentMousePos.y;
    } else {
        percent_cursor = window.pageYOffset * 100 / (hauteur_menu - window.innerHeight);
        le_delta_menu = window.pageYOffset;
    }

    if (Math.abs((le_delta_menu - delta_menu) / 200 + 1) < 1.8) {
        intensite = Math.abs((le_delta_menu - delta_menu) / 200 + 1);
    } else {
        intensite = 1.8;
    }

    // déplacement menu
    if (!isMobile()) {

        expression = -1 * (hauteur_menu - window.innerHeight) / window.innerHeight * (-currentMousePos.y) + hauteur_menu / 2;

        TweenMax.to('#le_menu', 1.1, {
            y: expression + 'px',
            scaleY: intensite,
            ease: Power2.easeOut
        });

    } else {

        TweenMax.to('#le_menu', 1.4, {
            scaleY: intensite,
            ease: Power2.easeOut
        });

    }

    if (window.innerWidth > 767) {

        if (percent_cursor > hauteur_marge) {
            document.querySelectorAll('#le_menu li').forEach(checkerMenu);
        }

        //Волны на изображении при перетаскивании мыши
        displace.intensite = displacementFilter3.scale.x;
        TweenMax.to(displace, 0.3, {
            intensite: (le_delta_menu - delta_menu) * 4,
            onUpdate: function () {
                displacementFilter3.scale.x = displace.intensite;
            },
            ease: Linear.easeNone
        });
    }

    delta_menu = le_delta_menu;
}

var passe_une_fois = false, ancien_height = 0;

function pixi_single() {

    if (document.querySelector('.vs-section').clientHeight != ancien_height && !isMobile()) {
        le_scroll.resize();
        ancien_height = document.querySelector('.vs-section').clientHeight;
    }

    raf_pixi_single = requestAnimationFrame(pixi_single);

    //echelle_scale = parseFloat(Math.round( (document.getElementById('les_imgs').clientHeight + (0.56 * window.innerHeight) ) / document.getElementById('les_imgs').clientHeight * 100) / 100).toFixed(2);
    //echelle_scale = (document.getElementById('les_imgs').clientHeight + (0.56 * window.innerHeight) ) / document.getElementById('les_imgs').clientHeight;
    //echelle_scale = parseFloat( Math.round( echelle_scale * 100) / 100).toFixed(2);
    //console.log(echelle_scale);
    //console.log('pixi single tourne');

    renderer.render(stage);

    displacementSprite2.x += vitesse;

    if (le_scroll !== null) {
        if (le_scroll.vars.target !== 0 && passe_une_fois === false) {
            passe_une_fois = true;
            animSingle();
        } else if (le_scroll.vars.target === 0 && passe_une_fois === true) {
            passe_une_fois = false;
            animSingle2();
        }
    } else {
        if (window.pageYOffset !== 0 && passe_une_fois === false) {
            passe_une_fois = true;
            animSingle();
        } else if (window.pageYOffset === 0 && passe_une_fois === true) {
            passe_une_fois = false;
            animSingle2();
        }
    }

    // TweenMax.to('#les_imgs', 1.4, {
    //     scaleY: intensite,
    //     ease:Power2.easeOut
    // });

    // if(le_scroll !== null){
    //     delta_scroll = le_scroll.vars.current;
    // }else{
    //     //
    // }
}

function raf_about() {
    le_raf_about = requestAnimationFrame(raf_about);

    if (le_scroll !== null) {
        TweenMax.to('#inner_svg', 1, {rotation: -le_scroll.vars.current / 4, ease: Linear.easeNone});
        TweenMax.to('#inner_svg img', 1, {rotation: le_scroll.vars.current / 4, ease: Linear.easeNone});

        if (Math.abs((le_scroll.vars.current - delta_scroll) / 200 + 1) < 2.2) {
            intensite = Math.abs((le_scroll.vars.current - delta_scroll) / 200 + 1);
        } else {
            intensite = 2.2;
        }

    } else {
        TweenMax.to('#inner_svg', 1, {rotation: -window.pageYOffset / 4, ease: Linear.easeNone});
        TweenMax.to('#inner_svg img', 1, {rotation: window.pageYOffset / 4, ease: Linear.easeNone});

        if (Math.abs((window.pageYOffset - delta_scroll) / 200 + 1) < 2.2) {
            intensite = Math.abs((window.pageYOffset - delta_scroll) / 200 + 1);
        } else {
            intensite = 2.2;
        }

    }


    // if(le_scroll !== null){

    // }else{

    // }

    TweenMax.to('#scaleA', 1.4, {
        scaleX: intensite,
        ease: Power2.easeOut
    });

    if (le_scroll !== null) {
        delta_scroll = le_scroll.vars.current;
    } else {
        delta_scroll = window.pageYOffset;
    }

}

// function le_raf() {
//     raf = requestAnimationFrame(le_raf);
// }

var dernier_ajoute = 0, displace = {}, displace2 = {};

function checkerMenu(item, index) {

    console.log(percent_cursor, (hauteur_marge + (index * hauteur_entree)));
    if (
        percent_cursor > (hauteur_marge + (index * hauteur_entree)) &&
        percent_cursor < (hauteur_marge + ((index + 1) * hauteur_entree)) &&
        !item.classList.contains('actif')
    ) {

        console.log('Yep');
        document.querySelector('#le_menu .actif').classList.remove('actif');
        item.classList.add('actif');

        document.getElementById('pixi_menu').setAttribute('href', item.querySelector('a').getAttribute('href'));

        // ajouter la nouvelle image
        stage_menu.addChild(window['image_menu' + index]);

        displace2.alpha = 0;
        //stage_menu.removeChild(displacementSprite3);

        TweenMax.to(displace2, 0.2, {
            alpha: 1,
            onUpdate: function () {
                window['image_menu' + index].alpha = displace2.alpha;
            },
            onComplete: function () {

                // to do : gestion suppression ancien child

                //stage_menu.removeChildren(2);
                //dernier_ajoute = index;

            },
            ease: Linear.easeNone
        });

    }
}

var lindex;

function change_projet(element) {
    if (element.classList.contains('current')) {
        return;
    } else {

        lindex = Array.from(document.getElementById('num_lettre').children).indexOf(element);
        const index_courant = Array.from(document.getElementById('num_lettre').children).indexOf(document.querySelector('#num_lettre .current'));

        vitesse = 4;
        transition_commune();

        window["image" + lindex].alpha = 0;
        stage.addChild(window["image" + lindex]);

        var tl = new TimelineMax();
        tl.to(attributs2, 0.9, {
            intensite: 150,
            x: 20,
            ease: Power2.easeIn,
            onUpdate: function () {
                displacementFilter2.scale.x = attributs2.intensite;
                vitesse = attributs2.x;
            },
            onComplete: function () {
                tl.reverse();
                setTimeout(function () {
                    stage.removeChild(displacementSprite2);
                    stage.addChild(displacementSprite);
                    listenCursor = true;

                    stage.removeChild(window["image" + (index_courant)]);

                    if (lindex >= total_slide - 1) {
                        current_slide = 0;
                    } else {
                        current_slide = lindex + 1;
                    }


                    displacementSprite.x = currentMousePos.x;
                    bloque_action = false;
                }, 800);
            }
        });

        TweenMax.to(attributs3, 0.6, {
            opacite: 1,
            delay: 0.6,
            ease: Linear.easeNone,
            onUpdate: function () {
                window["image" + lindex].alpha = attributs3.opacite;
            }
        });

        TweenMax.to('#cercle_blanc', 0.9, {
            'stroke-dashoffset': 190 * (1 - 1 / total_slide - (lindex * 1 / total_slide)),
            ease: Power4.easeInOut
        });

        random = [];
        document.querySelectorAll('.random').forEach(x => random.push(x));

        random.sort(function () {
            return 0.5 - Math.random();
        });
        TweenMax.staggerTo(random, 0.4, {x: '24px', opacity: 0, ease: Power2.easeIn}, 0.1, allDone2);


    }
}

function allDone2() {
    document.querySelector('#num_lettre .current').classList.add('after');
    TweenMax.to('.current .lettre', 0.4, {x: '100%', clearProps: "x", ease: Power4.easeInOut});
    document.querySelectorAll('#num_lettre > div')[lindex].classList.add('before');
    TweenMax.to(document.querySelectorAll('#num_lettre > div')[lindex].querySelector('div'), 0.4, {
        x: '0%', clearProps: "x", ease: Power4.easeInOut, onComplete: function () {
            document.querySelector('#num_lettre .current').classList.remove('current', 'after');
            document.querySelectorAll('#num_lettre > div')[lindex].classList.add('current');
            document.querySelectorAll('#num_lettre > div')[lindex].classList.remove('before');
        }
    });

    // if(document.querySelector('#num_lettre .current').nextElementSibling !== null){
    //     document.querySelector('#num_lettre .current').nextElementSibling.classList.add('before');
    //     var next = document.querySelector('#num_lettre .current').nextElementSibling;
    //     TweenMax.to('.current .lettre', 0.4, {x:'100%', clearProps:"x", ease:Power4.easeInOut});
    //     TweenMax.to(document.querySelector('#num_lettre .current').nextElementSibling.querySelector('div'), 0.4, {x:'0%', clearProps:"x", ease:Power4.easeInOut, onComplete:function(){
    //         document.querySelector('#num_lettre .current').classList.remove('current','after');
    //         next.classList.add('current');
    //         next.classList.remove('before');
    //     }});
    // }else{
    //     var first = document.querySelector('#num_lettre div');
    //     first.classList.add('before');

    //     TweenMax.to('.current .lettre', 0.4, {x:'100%', clearProps:"x", ease:Power4.easeInOut});
    //     TweenMax.to(first.querySelector('div'), 0.4, {x:'0%', clearProps:"x", ease:Power4.easeInOut, onComplete:function(){
    //         document.querySelector('#num_lettre .current').classList.remove('current','after');
    //         first.classList.add('current');
    //         first.classList.remove('before');
    //     }});
    // }

    document.getElementById('num_projet').innerHTML = lindex + 1;
    document.getElementById('titre_h2').innerHTML = document.querySelectorAll('#images div')[lindex].getAttribute('data-titre');
    document.getElementById('type').innerHTML = document.querySelectorAll('#images div')[lindex].getAttribute('data-cat');

    document.querySelectorAll('.update_link').forEach(x => x.setAttribute('href', document.querySelectorAll('#images div')[lindex].getAttribute('data-perma')));

    document.querySelectorAll('#titre_h2 span').forEach(addRandom);

    random = [];
    document.querySelectorAll('.random').forEach(x => random.push(x));

    random.sort(function () {
        return 0.5 - Math.random();
    });
    TweenMax.staggerFromTo(random, 1, {x: '-24px', opacity: 0}, {x: '0px', opacity: 1, ease: Power2.easeOut}, 0.1);

}


function animSingle() {
    vitesse = 4;
    var attributs2bis = {intensite: 0, x: 4};
    TweenMax.to(attributs2bis, 0.9, {
        intensite: 150,
        x: 6,
        ease: Power2.easeIn,
        onUpdate: function () {
            displacementFilter2.scale.x = attributs2bis.intensite;
            vitesse = attributs2bis.x;
        }
    });
}

function animSingle2() {
    vitesse = 6;
    var attributs2bis = {intensite: 150, x: 6};
    TweenMax.to(attributs2bis, 0.9, {
        intensite: 0,
        x: 4,
        ease: Power2.easeOut,
        onUpdate: function () {
            displacementFilter2.scale.x = attributs2bis.intensite;
            vitesse = attributs2bis.x;
        }
    });
}

function onHover(event) {
    event.target.classList.add('trait');
    document.querySelector('.change_projet.current').classList.add('temp');
}

function offHover(event) {
    event.target.classList.remove('trait');
    document.querySelector('.change_projet.current').classList.remove('temp');
}


var once_play = false;

function onHoverNext(event) {
    if (once_play === false) {
        once_play = true;

        random = [];
        document.querySelectorAll('#to_next_proj span').forEach(x => random.push(x));
        random.sort(function () {
            return 0.5 - Math.random();
        });

        TweenMax.staggerTo(random, 0.4, {opacity: 0, ease: Power2.easeIn}, 0.05, allDoneNext);

        TweenMax.to('#inner_nom_projet', 0.4, {
            x: (document.getElementById('nom_projet').clientWidth + 10) / 2 + 'px',
            delay: 0.4,
            ease: Power2.easeOut
        });
        TweenMax.staggerTo('.stag', 0.4, {opacity: 1, delay: 0.4, ease: Power2.easeOut}, -0.02);
    }

}

function allDoneNext() {
    document.getElementById('to_next_proj').innerHTML = document.getElementById('to_next_proj').getAttribute('data-next');
    TweenMax.set('#to_next_proj span', {opacity: 0});

    random = [];
    document.querySelectorAll('#to_next_proj span').forEach(x => random.push(x));
    random.sort(function () {
        return 0.5 - Math.random();
    });

    TweenMax.staggerTo(random, 0.4, {opacity: 1, ease: Power2.easeOut}, 0.05);
}


function offHoverNext(event) {

    if (once_play === true) {
        once_play = false;

        random = [];
        document.querySelectorAll('#to_next_proj span').forEach(x => random.push(x));
        random.sort(function () {
            return 0.5 - Math.random();
        });

        TweenMax.staggerTo(random, 0.4, {opacity: 0, ease: Power2.easeIn}, 0.05, allDoneNext2);
    }
}

function allDoneNext2() {
    document.getElementById('to_next_proj').innerHTML = "<span>N</span><span>e</span><span>x</span><span>t</span>";
    TweenMax.set('#to_next_proj span', {opacity: 0});

    random = [];
    document.querySelectorAll('#to_next_proj span').forEach(x => random.push(x));
    random.sort(function () {
        return 0.5 - Math.random();
    });

    TweenMax.staggerTo(random, 0.4, {opacity: 1, ease: Power2.easeOut}, 0.05);

    TweenMax.to('#inner_nom_projet', 0.4, {x: '0px', ease: Power2.easeOut});
    TweenMax.staggerTo('.stag', 0.4, {opacity: 0, ease: Power2.easeOut}, 0.02);
}


//swipe event
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
}

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
        if (document.querySelector('body').classList.contains('home') && bloque_action === false) {
            if (xDiff > 0) {
                next_slide();
            } else {
                prev_slide();
            }
        }
    } else {
        if (document.querySelector('body').classList.contains('home') && bloque_action === false) {
            if (yDiff > 0) {
                next_slide();
            } else {
                prev_slide();
            }
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
}


// giroscope event
var gamma, delta_gamma;
if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", process, false);
}

function process(event) {

    if (window.orientation === 0) {
        gamma = event.gamma;
    } else if (window.orientation === 180) {
        gamma = -event.gamma;
    } else if (window.orientation === -90) {
        gamma = -event.beta;
    } else if (window.orientation === 90) {
        gamma = event.beta;
    }

}


// const ticker = new PIXI.ticker.Ticker();
// ticker.stop();
// ticker.add((deltaTime) => {
//   // do something every frame
//   console.log('iii');
// });
// ticker.start();
const initTab = function() {
    var targets = document.querySelectorAll(".tab-nav .link");
    var articles = document.querySelectorAll(".tabs .item");
    var activeTab = 0;
    var old = 0;
    var heights = [];
    var dur = 0.2;
    var animation;

    function defaultState(listeners) {
        for (let i = 0; i < targets.length; i++) {
            targets[i].index = i;
            heights.push(articles[i].offsetHeight);
            TweenMax.set(articles[i], {top: 0, y:-heights[i]});
            targets[i].addEventListener("click", doCoolStuff);
        }
        TweenMax.set(articles[0], {y:0});
        TweenMax.set(".tab-slider", {x:targets[0].offsetLeft, width:targets[0].offsetWidth});
        TweenMax.set(".tabs", {height:heights[0]});
    }

    defaultState();

    function doCoolStuff() {
        if(this.index !== activeTab) {
            if (animation && animation.isActive()) {
                animation.progress(1);
            }
            animation = new TimelineMax();
            old = activeTab;
            activeTab = this.index;
            animation.to(".tab-slider", dur * 2, {x:targets[activeTab].offsetLeft, width:targets[activeTab].offsetWidth});
            animation.to(articles[old], dur, {y:heights[old], ease:SlowMo.easeIn }, 0);
            animation.set(articles[old], {y:-heights[old]});
            animation.to(".tabs", dur, {height:heights[activeTab]});
            animation.to(articles[activeTab], 1, {y:0, ease: Expo.easeOut}, "-=0.25");
        }
    }

    $(window).on('resize', function() {
        for (let i = 0; i < targets.length; i++) {
            heights.push(articles[i].offsetHeight);
        }
    });
};
const openWork = function(item) {
    $('#project').show();
    $('body').addClass('body-inverse body-project');
    $('#project-category').text(item.subtitle);
    $('#project-title').html(item.shortTitle + ' — <br>'+ item.description);
    $('#project-link').text(item.client.domain).attr('href', 'http://' + item.client.domain);
    $('#project-main-image').html('<img src="' + item.mainImage + '" alt="">');


    //Subimages
    var $subimages = $('#project-subimages');
    $subimages.html();
    item.columnImages.forEach(function(element) {
        $subimages.append('<div class="col col-md-' + element.col + '">' +
            '                    <img src="' + element.src + '" alt="">' +
            '                </div>');
    });

    //Team
    var $team = $('#project-team');
    $team.html();
    item.team.forEach(function(element) {
        $team.append(element + '<br>');
    });

    $('#project-client').html(item.client.name + ' <br> <a href="http://' + item.client.domain + '" ' +
        'class="domain externe">'+ item.client.domain +'</a>');

    //Next project
    var projectsLength = data.projects.length,
        nextProject;

    data.projects.forEach(function(element, iter) {
        if (item.link === element.link) {
            if (iter === projectsLength - 1) { //If last
                nextProject = data.projects[0];
            } else {
                nextProject = data.projects[iter + 1];
            }
        }
    });

    $('#next-project-category').text(nextProject.subtitle);
    $('#next-project-title').text(nextProject.shortTitle + ' — ');
    $('#next-project-description').text(nextProject.description);
    $('#next-project-link').attr('href',nextProject.link);
};

const closeWork = function() {
    $('#project').hide();
    $('body').removeClass('body-inverse body-project');
};