(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.cc.aO === region.ct.aO)
	{
		return 'on line ' + region.cc.aO;
	}
	return 'on lines ' + region.cc.aO + ' through ' + region.ct.aO;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**_UNUSED/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.et,
		impl.fI,
		impl.fl,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_enqueueEffects(managers, result.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		S: func(record.S),
		cd: record.cd,
		b6: record.b6
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.S;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.cd;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.b6) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.et,
		impl.fI,
		impl.fl,
		function(sendToApp, initialModel) {
			var view = impl.fJ;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.et,
		impl.fI,
		impl.fl,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.b9 && impl.b9(sendToApp)
			var view = impl.fJ;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.dJ);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.fD) && (_VirtualDom_doc.title = title = doc.fD);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.eS;
	var onUrlRequest = impl.eT;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		b9: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.da === next.da
							&& curr.cA === next.cA
							&& curr.c7.a === next.c7.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		et: function(flags)
		{
			return A3(impl.et, flags, _Browser_getUrl(), key);
		},
		fJ: impl.fJ,
		fI: impl.fI,
		fl: impl.fl
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { el: 'hidden', dT: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { el: 'mozHidden', dT: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { el: 'msHidden', dT: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { el: 'webkitHidden', dT: 'webkitvisibilitychange' }
		: { el: 'hidden', dT: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		df: _Browser_getScene(),
		fK: {
			bz: _Browser_window.pageXOffset,
			bB: _Browser_window.pageYOffset,
			ch: _Browser_doc.documentElement.clientWidth,
			bh: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		ch: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		bh: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			df: {
				ch: node.scrollWidth,
				bh: node.scrollHeight
			},
			fK: {
				bz: node.scrollLeft,
				bB: node.scrollTop,
				ch: node.clientWidth,
				bh: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			df: _Browser_getScene(),
			fK: {
				bz: x,
				bB: y,
				ch: _Browser_doc.documentElement.clientWidth,
				bh: _Browser_doc.documentElement.clientHeight
			},
			ed: {
				bz: x + rect.left,
				bB: y + rect.top,
				ch: rect.width,
				bh: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}


/*
 * Copyright (c) 2010 Mozilla Corporation
 * Copyright (c) 2010 Vladimir Vukicevic
 * Copyright (c) 2013 John Mayer
 * Copyright (c) 2018 Andrey Kuzmin
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

// Vector2

var _MJS_v2 = F2(function(x, y) {
    return new Float64Array([x, y]);
});

var _MJS_v2getX = function(a) {
    return a[0];
};

var _MJS_v2getY = function(a) {
    return a[1];
};

var _MJS_v2setX = F2(function(x, a) {
    return new Float64Array([x, a[1]]);
});

var _MJS_v2setY = F2(function(y, a) {
    return new Float64Array([a[0], y]);
});

var _MJS_v2toRecord = function(a) {
    return { bz: a[0], bB: a[1] };
};

var _MJS_v2fromRecord = function(r) {
    return new Float64Array([r.bz, r.bB]);
};

var _MJS_v2add = F2(function(a, b) {
    var r = new Float64Array(2);
    r[0] = a[0] + b[0];
    r[1] = a[1] + b[1];
    return r;
});

var _MJS_v2sub = F2(function(a, b) {
    var r = new Float64Array(2);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    return r;
});

var _MJS_v2negate = function(a) {
    var r = new Float64Array(2);
    r[0] = -a[0];
    r[1] = -a[1];
    return r;
};

var _MJS_v2direction = F2(function(a, b) {
    var r = new Float64Array(2);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    var im = 1.0 / _MJS_v2lengthLocal(r);
    r[0] = r[0] * im;
    r[1] = r[1] * im;
    return r;
});

function _MJS_v2lengthLocal(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
}
var _MJS_v2length = _MJS_v2lengthLocal;

var _MJS_v2lengthSquared = function(a) {
    return a[0] * a[0] + a[1] * a[1];
};

var _MJS_v2distance = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    return Math.sqrt(dx * dx + dy * dy);
});

var _MJS_v2distanceSquared = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    return dx * dx + dy * dy;
});

var _MJS_v2normalize = function(a) {
    var r = new Float64Array(2);
    var im = 1.0 / _MJS_v2lengthLocal(a);
    r[0] = a[0] * im;
    r[1] = a[1] * im;
    return r;
};

var _MJS_v2scale = F2(function(k, a) {
    var r = new Float64Array(2);
    r[0] = a[0] * k;
    r[1] = a[1] * k;
    return r;
});

var _MJS_v2dot = F2(function(a, b) {
    return a[0] * b[0] + a[1] * b[1];
});

// Vector3

var _MJS_v3temp1Local = new Float64Array(3);
var _MJS_v3temp2Local = new Float64Array(3);
var _MJS_v3temp3Local = new Float64Array(3);

var _MJS_v3 = F3(function(x, y, z) {
    return new Float64Array([x, y, z]);
});

var _MJS_v3getX = function(a) {
    return a[0];
};

var _MJS_v3getY = function(a) {
    return a[1];
};

var _MJS_v3getZ = function(a) {
    return a[2];
};

var _MJS_v3setX = F2(function(x, a) {
    return new Float64Array([x, a[1], a[2]]);
});

var _MJS_v3setY = F2(function(y, a) {
    return new Float64Array([a[0], y, a[2]]);
});

var _MJS_v3setZ = F2(function(z, a) {
    return new Float64Array([a[0], a[1], z]);
});

var _MJS_v3toRecord = function(a) {
    return { bz: a[0], bB: a[1], bD: a[2] };
};

var _MJS_v3fromRecord = function(r) {
    return new Float64Array([r.bz, r.bB, r.bD]);
};

var _MJS_v3add = F2(function(a, b) {
    var r = new Float64Array(3);
    r[0] = a[0] + b[0];
    r[1] = a[1] + b[1];
    r[2] = a[2] + b[2];
    return r;
});

function _MJS_v3subLocal(a, b, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    r[2] = a[2] - b[2];
    return r;
}
var _MJS_v3sub = F2(_MJS_v3subLocal);

var _MJS_v3negate = function(a) {
    var r = new Float64Array(3);
    r[0] = -a[0];
    r[1] = -a[1];
    r[2] = -a[2];
    return r;
};

function _MJS_v3directionLocal(a, b, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    return _MJS_v3normalizeLocal(_MJS_v3subLocal(a, b, r), r);
}
var _MJS_v3direction = F2(_MJS_v3directionLocal);

function _MJS_v3lengthLocal(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
}
var _MJS_v3length = _MJS_v3lengthLocal;

var _MJS_v3lengthSquared = function(a) {
    return a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
};

var _MJS_v3distance = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
});

var _MJS_v3distanceSquared = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    return dx * dx + dy * dy + dz * dz;
});

function _MJS_v3normalizeLocal(a, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    var im = 1.0 / _MJS_v3lengthLocal(a);
    r[0] = a[0] * im;
    r[1] = a[1] * im;
    r[2] = a[2] * im;
    return r;
}
var _MJS_v3normalize = _MJS_v3normalizeLocal;

var _MJS_v3scale = F2(function(k, a) {
    return new Float64Array([a[0] * k, a[1] * k, a[2] * k]);
});

var _MJS_v3dotLocal = function(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};
var _MJS_v3dot = F2(_MJS_v3dotLocal);

function _MJS_v3crossLocal(a, b, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    r[0] = a[1] * b[2] - a[2] * b[1];
    r[1] = a[2] * b[0] - a[0] * b[2];
    r[2] = a[0] * b[1] - a[1] * b[0];
    return r;
}
var _MJS_v3cross = F2(_MJS_v3crossLocal);

var _MJS_v3mul4x4 = F2(function(m, v) {
    var w;
    var tmp = _MJS_v3temp1Local;
    var r = new Float64Array(3);

    tmp[0] = m[3];
    tmp[1] = m[7];
    tmp[2] = m[11];
    w = _MJS_v3dotLocal(v, tmp) + m[15];
    tmp[0] = m[0];
    tmp[1] = m[4];
    tmp[2] = m[8];
    r[0] = (_MJS_v3dotLocal(v, tmp) + m[12]) / w;
    tmp[0] = m[1];
    tmp[1] = m[5];
    tmp[2] = m[9];
    r[1] = (_MJS_v3dotLocal(v, tmp) + m[13]) / w;
    tmp[0] = m[2];
    tmp[1] = m[6];
    tmp[2] = m[10];
    r[2] = (_MJS_v3dotLocal(v, tmp) + m[14]) / w;
    return r;
});

// Vector4

var _MJS_v4 = F4(function(x, y, z, w) {
    return new Float64Array([x, y, z, w]);
});

var _MJS_v4getX = function(a) {
    return a[0];
};

var _MJS_v4getY = function(a) {
    return a[1];
};

var _MJS_v4getZ = function(a) {
    return a[2];
};

var _MJS_v4getW = function(a) {
    return a[3];
};

var _MJS_v4setX = F2(function(x, a) {
    return new Float64Array([x, a[1], a[2], a[3]]);
});

var _MJS_v4setY = F2(function(y, a) {
    return new Float64Array([a[0], y, a[2], a[3]]);
});

var _MJS_v4setZ = F2(function(z, a) {
    return new Float64Array([a[0], a[1], z, a[3]]);
});

var _MJS_v4setW = F2(function(w, a) {
    return new Float64Array([a[0], a[1], a[2], w]);
});

var _MJS_v4toRecord = function(a) {
    return { bz: a[0], bB: a[1], bD: a[2], dn: a[3] };
};

var _MJS_v4fromRecord = function(r) {
    return new Float64Array([r.bz, r.bB, r.bD, r.dn]);
};

var _MJS_v4add = F2(function(a, b) {
    var r = new Float64Array(4);
    r[0] = a[0] + b[0];
    r[1] = a[1] + b[1];
    r[2] = a[2] + b[2];
    r[3] = a[3] + b[3];
    return r;
});

var _MJS_v4sub = F2(function(a, b) {
    var r = new Float64Array(4);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    r[2] = a[2] - b[2];
    r[3] = a[3] - b[3];
    return r;
});

var _MJS_v4negate = function(a) {
    var r = new Float64Array(4);
    r[0] = -a[0];
    r[1] = -a[1];
    r[2] = -a[2];
    r[3] = -a[3];
    return r;
};

var _MJS_v4direction = F2(function(a, b) {
    var r = new Float64Array(4);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    r[2] = a[2] - b[2];
    r[3] = a[3] - b[3];
    var im = 1.0 / _MJS_v4lengthLocal(r);
    r[0] = r[0] * im;
    r[1] = r[1] * im;
    r[2] = r[2] * im;
    r[3] = r[3] * im;
    return r;
});

function _MJS_v4lengthLocal(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3]);
}
var _MJS_v4length = _MJS_v4lengthLocal;

var _MJS_v4lengthSquared = function(a) {
    return a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3];
};

var _MJS_v4distance = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    var dw = a[3] - b[3];
    return Math.sqrt(dx * dx + dy * dy + dz * dz + dw * dw);
});

var _MJS_v4distanceSquared = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    var dw = a[3] - b[3];
    return dx * dx + dy * dy + dz * dz + dw * dw;
});

var _MJS_v4normalize = function(a) {
    var r = new Float64Array(4);
    var im = 1.0 / _MJS_v4lengthLocal(a);
    r[0] = a[0] * im;
    r[1] = a[1] * im;
    r[2] = a[2] * im;
    r[3] = a[3] * im;
    return r;
};

var _MJS_v4scale = F2(function(k, a) {
    var r = new Float64Array(4);
    r[0] = a[0] * k;
    r[1] = a[1] * k;
    r[2] = a[2] * k;
    r[3] = a[3] * k;
    return r;
});

var _MJS_v4dot = F2(function(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
});

// Matrix4

var _MJS_m4x4temp1Local = new Float64Array(16);
var _MJS_m4x4temp2Local = new Float64Array(16);

var _MJS_m4x4identity = new Float64Array([
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
]);

var _MJS_m4x4fromRecord = function(r) {
    var m = new Float64Array(16);
    m[0] = r.cH;
    m[1] = r.cL;
    m[2] = r.cP;
    m[3] = r.cT;
    m[4] = r.cI;
    m[5] = r.cM;
    m[6] = r.cQ;
    m[7] = r.cU;
    m[8] = r.cJ;
    m[9] = r.cN;
    m[10] = r.cR;
    m[11] = r.cV;
    m[12] = r.cK;
    m[13] = r.cO;
    m[14] = r.cS;
    m[15] = r.cW;
    return m;
};

var _MJS_m4x4toRecord = function(m) {
    return {
        cH: m[0], cL: m[1], cP: m[2], cT: m[3],
        cI: m[4], cM: m[5], cQ: m[6], cU: m[7],
        cJ: m[8], cN: m[9], cR: m[10], cV: m[11],
        cK: m[12], cO: m[13], cS: m[14], cW: m[15]
    };
};

var _MJS_m4x4inverse = function(m) {
    var r = new Float64Array(16);

    r[0] = m[5] * m[10] * m[15] - m[5] * m[11] * m[14] - m[9] * m[6] * m[15] +
        m[9] * m[7] * m[14] + m[13] * m[6] * m[11] - m[13] * m[7] * m[10];
    r[4] = -m[4] * m[10] * m[15] + m[4] * m[11] * m[14] + m[8] * m[6] * m[15] -
        m[8] * m[7] * m[14] - m[12] * m[6] * m[11] + m[12] * m[7] * m[10];
    r[8] = m[4] * m[9] * m[15] - m[4] * m[11] * m[13] - m[8] * m[5] * m[15] +
        m[8] * m[7] * m[13] + m[12] * m[5] * m[11] - m[12] * m[7] * m[9];
    r[12] = -m[4] * m[9] * m[14] + m[4] * m[10] * m[13] + m[8] * m[5] * m[14] -
        m[8] * m[6] * m[13] - m[12] * m[5] * m[10] + m[12] * m[6] * m[9];
    r[1] = -m[1] * m[10] * m[15] + m[1] * m[11] * m[14] + m[9] * m[2] * m[15] -
        m[9] * m[3] * m[14] - m[13] * m[2] * m[11] + m[13] * m[3] * m[10];
    r[5] = m[0] * m[10] * m[15] - m[0] * m[11] * m[14] - m[8] * m[2] * m[15] +
        m[8] * m[3] * m[14] + m[12] * m[2] * m[11] - m[12] * m[3] * m[10];
    r[9] = -m[0] * m[9] * m[15] + m[0] * m[11] * m[13] + m[8] * m[1] * m[15] -
        m[8] * m[3] * m[13] - m[12] * m[1] * m[11] + m[12] * m[3] * m[9];
    r[13] = m[0] * m[9] * m[14] - m[0] * m[10] * m[13] - m[8] * m[1] * m[14] +
        m[8] * m[2] * m[13] + m[12] * m[1] * m[10] - m[12] * m[2] * m[9];
    r[2] = m[1] * m[6] * m[15] - m[1] * m[7] * m[14] - m[5] * m[2] * m[15] +
        m[5] * m[3] * m[14] + m[13] * m[2] * m[7] - m[13] * m[3] * m[6];
    r[6] = -m[0] * m[6] * m[15] + m[0] * m[7] * m[14] + m[4] * m[2] * m[15] -
        m[4] * m[3] * m[14] - m[12] * m[2] * m[7] + m[12] * m[3] * m[6];
    r[10] = m[0] * m[5] * m[15] - m[0] * m[7] * m[13] - m[4] * m[1] * m[15] +
        m[4] * m[3] * m[13] + m[12] * m[1] * m[7] - m[12] * m[3] * m[5];
    r[14] = -m[0] * m[5] * m[14] + m[0] * m[6] * m[13] + m[4] * m[1] * m[14] -
        m[4] * m[2] * m[13] - m[12] * m[1] * m[6] + m[12] * m[2] * m[5];
    r[3] = -m[1] * m[6] * m[11] + m[1] * m[7] * m[10] + m[5] * m[2] * m[11] -
        m[5] * m[3] * m[10] - m[9] * m[2] * m[7] + m[9] * m[3] * m[6];
    r[7] = m[0] * m[6] * m[11] - m[0] * m[7] * m[10] - m[4] * m[2] * m[11] +
        m[4] * m[3] * m[10] + m[8] * m[2] * m[7] - m[8] * m[3] * m[6];
    r[11] = -m[0] * m[5] * m[11] + m[0] * m[7] * m[9] + m[4] * m[1] * m[11] -
        m[4] * m[3] * m[9] - m[8] * m[1] * m[7] + m[8] * m[3] * m[5];
    r[15] = m[0] * m[5] * m[10] - m[0] * m[6] * m[9] - m[4] * m[1] * m[10] +
        m[4] * m[2] * m[9] + m[8] * m[1] * m[6] - m[8] * m[2] * m[5];

    var det = m[0] * r[0] + m[1] * r[4] + m[2] * r[8] + m[3] * r[12];

    if (det === 0) {
        return $elm$core$Maybe$Nothing;
    }

    det = 1.0 / det;

    for (var i = 0; i < 16; i = i + 1) {
        r[i] = r[i] * det;
    }

    return $elm$core$Maybe$Just(r);
};

var _MJS_m4x4inverseOrthonormal = function(m) {
    var r = _MJS_m4x4transposeLocal(m);
    var t = [m[12], m[13], m[14]];
    r[3] = r[7] = r[11] = 0;
    r[12] = -_MJS_v3dotLocal([r[0], r[4], r[8]], t);
    r[13] = -_MJS_v3dotLocal([r[1], r[5], r[9]], t);
    r[14] = -_MJS_v3dotLocal([r[2], r[6], r[10]], t);
    return r;
};

function _MJS_m4x4makeFrustumLocal(left, right, bottom, top, znear, zfar) {
    var r = new Float64Array(16);

    r[0] = 2 * znear / (right - left);
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = 2 * znear / (top - bottom);
    r[6] = 0;
    r[7] = 0;
    r[8] = (right + left) / (right - left);
    r[9] = (top + bottom) / (top - bottom);
    r[10] = -(zfar + znear) / (zfar - znear);
    r[11] = -1;
    r[12] = 0;
    r[13] = 0;
    r[14] = -2 * zfar * znear / (zfar - znear);
    r[15] = 0;

    return r;
}
var _MJS_m4x4makeFrustum = F6(_MJS_m4x4makeFrustumLocal);

var _MJS_m4x4makePerspective = F4(function(fovy, aspect, znear, zfar) {
    var ymax = znear * Math.tan(fovy * Math.PI / 360.0);
    var ymin = -ymax;
    var xmin = ymin * aspect;
    var xmax = ymax * aspect;

    return _MJS_m4x4makeFrustumLocal(xmin, xmax, ymin, ymax, znear, zfar);
});

function _MJS_m4x4makeOrthoLocal(left, right, bottom, top, znear, zfar) {
    var r = new Float64Array(16);

    r[0] = 2 / (right - left);
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = 2 / (top - bottom);
    r[6] = 0;
    r[7] = 0;
    r[8] = 0;
    r[9] = 0;
    r[10] = -2 / (zfar - znear);
    r[11] = 0;
    r[12] = -(right + left) / (right - left);
    r[13] = -(top + bottom) / (top - bottom);
    r[14] = -(zfar + znear) / (zfar - znear);
    r[15] = 1;

    return r;
}
var _MJS_m4x4makeOrtho = F6(_MJS_m4x4makeOrthoLocal);

var _MJS_m4x4makeOrtho2D = F4(function(left, right, bottom, top) {
    return _MJS_m4x4makeOrthoLocal(left, right, bottom, top, -1, 1);
});

function _MJS_m4x4mulLocal(a, b) {
    var r = new Float64Array(16);
    var a11 = a[0];
    var a21 = a[1];
    var a31 = a[2];
    var a41 = a[3];
    var a12 = a[4];
    var a22 = a[5];
    var a32 = a[6];
    var a42 = a[7];
    var a13 = a[8];
    var a23 = a[9];
    var a33 = a[10];
    var a43 = a[11];
    var a14 = a[12];
    var a24 = a[13];
    var a34 = a[14];
    var a44 = a[15];
    var b11 = b[0];
    var b21 = b[1];
    var b31 = b[2];
    var b41 = b[3];
    var b12 = b[4];
    var b22 = b[5];
    var b32 = b[6];
    var b42 = b[7];
    var b13 = b[8];
    var b23 = b[9];
    var b33 = b[10];
    var b43 = b[11];
    var b14 = b[12];
    var b24 = b[13];
    var b34 = b[14];
    var b44 = b[15];

    r[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
    r[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
    r[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
    r[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
    r[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
    r[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
    r[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
    r[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
    r[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
    r[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
    r[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
    r[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
    r[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
    r[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
    r[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
    r[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

    return r;
}
var _MJS_m4x4mul = F2(_MJS_m4x4mulLocal);

var _MJS_m4x4mulAffine = F2(function(a, b) {
    var r = new Float64Array(16);
    var a11 = a[0];
    var a21 = a[1];
    var a31 = a[2];
    var a12 = a[4];
    var a22 = a[5];
    var a32 = a[6];
    var a13 = a[8];
    var a23 = a[9];
    var a33 = a[10];
    var a14 = a[12];
    var a24 = a[13];
    var a34 = a[14];

    var b11 = b[0];
    var b21 = b[1];
    var b31 = b[2];
    var b12 = b[4];
    var b22 = b[5];
    var b32 = b[6];
    var b13 = b[8];
    var b23 = b[9];
    var b33 = b[10];
    var b14 = b[12];
    var b24 = b[13];
    var b34 = b[14];

    r[0] = a11 * b11 + a12 * b21 + a13 * b31;
    r[1] = a21 * b11 + a22 * b21 + a23 * b31;
    r[2] = a31 * b11 + a32 * b21 + a33 * b31;
    r[3] = 0;
    r[4] = a11 * b12 + a12 * b22 + a13 * b32;
    r[5] = a21 * b12 + a22 * b22 + a23 * b32;
    r[6] = a31 * b12 + a32 * b22 + a33 * b32;
    r[7] = 0;
    r[8] = a11 * b13 + a12 * b23 + a13 * b33;
    r[9] = a21 * b13 + a22 * b23 + a23 * b33;
    r[10] = a31 * b13 + a32 * b23 + a33 * b33;
    r[11] = 0;
    r[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14;
    r[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24;
    r[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34;
    r[15] = 1;

    return r;
});

var _MJS_m4x4makeRotate = F2(function(angle, axis) {
    var r = new Float64Array(16);
    axis = _MJS_v3normalizeLocal(axis, _MJS_v3temp1Local);
    var x = axis[0];
    var y = axis[1];
    var z = axis[2];
    var c = Math.cos(angle);
    var c1 = 1 - c;
    var s = Math.sin(angle);

    r[0] = x * x * c1 + c;
    r[1] = y * x * c1 + z * s;
    r[2] = z * x * c1 - y * s;
    r[3] = 0;
    r[4] = x * y * c1 - z * s;
    r[5] = y * y * c1 + c;
    r[6] = y * z * c1 + x * s;
    r[7] = 0;
    r[8] = x * z * c1 + y * s;
    r[9] = y * z * c1 - x * s;
    r[10] = z * z * c1 + c;
    r[11] = 0;
    r[12] = 0;
    r[13] = 0;
    r[14] = 0;
    r[15] = 1;

    return r;
});

var _MJS_m4x4rotate = F3(function(angle, axis, m) {
    var r = new Float64Array(16);
    var im = 1.0 / _MJS_v3lengthLocal(axis);
    var x = axis[0] * im;
    var y = axis[1] * im;
    var z = axis[2] * im;
    var c = Math.cos(angle);
    var c1 = 1 - c;
    var s = Math.sin(angle);
    var xs = x * s;
    var ys = y * s;
    var zs = z * s;
    var xyc1 = x * y * c1;
    var xzc1 = x * z * c1;
    var yzc1 = y * z * c1;
    var t11 = x * x * c1 + c;
    var t21 = xyc1 + zs;
    var t31 = xzc1 - ys;
    var t12 = xyc1 - zs;
    var t22 = y * y * c1 + c;
    var t32 = yzc1 + xs;
    var t13 = xzc1 + ys;
    var t23 = yzc1 - xs;
    var t33 = z * z * c1 + c;
    var m11 = m[0], m21 = m[1], m31 = m[2], m41 = m[3];
    var m12 = m[4], m22 = m[5], m32 = m[6], m42 = m[7];
    var m13 = m[8], m23 = m[9], m33 = m[10], m43 = m[11];
    var m14 = m[12], m24 = m[13], m34 = m[14], m44 = m[15];

    r[0] = m11 * t11 + m12 * t21 + m13 * t31;
    r[1] = m21 * t11 + m22 * t21 + m23 * t31;
    r[2] = m31 * t11 + m32 * t21 + m33 * t31;
    r[3] = m41 * t11 + m42 * t21 + m43 * t31;
    r[4] = m11 * t12 + m12 * t22 + m13 * t32;
    r[5] = m21 * t12 + m22 * t22 + m23 * t32;
    r[6] = m31 * t12 + m32 * t22 + m33 * t32;
    r[7] = m41 * t12 + m42 * t22 + m43 * t32;
    r[8] = m11 * t13 + m12 * t23 + m13 * t33;
    r[9] = m21 * t13 + m22 * t23 + m23 * t33;
    r[10] = m31 * t13 + m32 * t23 + m33 * t33;
    r[11] = m41 * t13 + m42 * t23 + m43 * t33;
    r[12] = m14,
    r[13] = m24;
    r[14] = m34;
    r[15] = m44;

    return r;
});

function _MJS_m4x4makeScale3Local(x, y, z) {
    var r = new Float64Array(16);

    r[0] = x;
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = y;
    r[6] = 0;
    r[7] = 0;
    r[8] = 0;
    r[9] = 0;
    r[10] = z;
    r[11] = 0;
    r[12] = 0;
    r[13] = 0;
    r[14] = 0;
    r[15] = 1;

    return r;
}
var _MJS_m4x4makeScale3 = F3(_MJS_m4x4makeScale3Local);

var _MJS_m4x4makeScale = function(v) {
    return _MJS_m4x4makeScale3Local(v[0], v[1], v[2]);
};

var _MJS_m4x4scale3 = F4(function(x, y, z, m) {
    var r = new Float64Array(16);

    r[0] = m[0] * x;
    r[1] = m[1] * x;
    r[2] = m[2] * x;
    r[3] = m[3] * x;
    r[4] = m[4] * y;
    r[5] = m[5] * y;
    r[6] = m[6] * y;
    r[7] = m[7] * y;
    r[8] = m[8] * z;
    r[9] = m[9] * z;
    r[10] = m[10] * z;
    r[11] = m[11] * z;
    r[12] = m[12];
    r[13] = m[13];
    r[14] = m[14];
    r[15] = m[15];

    return r;
});

var _MJS_m4x4scale = F2(function(v, m) {
    var r = new Float64Array(16);
    var x = v[0];
    var y = v[1];
    var z = v[2];

    r[0] = m[0] * x;
    r[1] = m[1] * x;
    r[2] = m[2] * x;
    r[3] = m[3] * x;
    r[4] = m[4] * y;
    r[5] = m[5] * y;
    r[6] = m[6] * y;
    r[7] = m[7] * y;
    r[8] = m[8] * z;
    r[9] = m[9] * z;
    r[10] = m[10] * z;
    r[11] = m[11] * z;
    r[12] = m[12];
    r[13] = m[13];
    r[14] = m[14];
    r[15] = m[15];

    return r;
});

function _MJS_m4x4makeTranslate3Local(x, y, z) {
    var r = new Float64Array(16);

    r[0] = 1;
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = 1;
    r[6] = 0;
    r[7] = 0;
    r[8] = 0;
    r[9] = 0;
    r[10] = 1;
    r[11] = 0;
    r[12] = x;
    r[13] = y;
    r[14] = z;
    r[15] = 1;

    return r;
}
var _MJS_m4x4makeTranslate3 = F3(_MJS_m4x4makeTranslate3Local);

var _MJS_m4x4makeTranslate = function(v) {
    return _MJS_m4x4makeTranslate3Local(v[0], v[1], v[2]);
};

var _MJS_m4x4translate3 = F4(function(x, y, z, m) {
    var r = new Float64Array(16);
    var m11 = m[0];
    var m21 = m[1];
    var m31 = m[2];
    var m41 = m[3];
    var m12 = m[4];
    var m22 = m[5];
    var m32 = m[6];
    var m42 = m[7];
    var m13 = m[8];
    var m23 = m[9];
    var m33 = m[10];
    var m43 = m[11];

    r[0] = m11;
    r[1] = m21;
    r[2] = m31;
    r[3] = m41;
    r[4] = m12;
    r[5] = m22;
    r[6] = m32;
    r[7] = m42;
    r[8] = m13;
    r[9] = m23;
    r[10] = m33;
    r[11] = m43;
    r[12] = m11 * x + m12 * y + m13 * z + m[12];
    r[13] = m21 * x + m22 * y + m23 * z + m[13];
    r[14] = m31 * x + m32 * y + m33 * z + m[14];
    r[15] = m41 * x + m42 * y + m43 * z + m[15];

    return r;
});

var _MJS_m4x4translate = F2(function(v, m) {
    var r = new Float64Array(16);
    var x = v[0];
    var y = v[1];
    var z = v[2];
    var m11 = m[0];
    var m21 = m[1];
    var m31 = m[2];
    var m41 = m[3];
    var m12 = m[4];
    var m22 = m[5];
    var m32 = m[6];
    var m42 = m[7];
    var m13 = m[8];
    var m23 = m[9];
    var m33 = m[10];
    var m43 = m[11];

    r[0] = m11;
    r[1] = m21;
    r[2] = m31;
    r[3] = m41;
    r[4] = m12;
    r[5] = m22;
    r[6] = m32;
    r[7] = m42;
    r[8] = m13;
    r[9] = m23;
    r[10] = m33;
    r[11] = m43;
    r[12] = m11 * x + m12 * y + m13 * z + m[12];
    r[13] = m21 * x + m22 * y + m23 * z + m[13];
    r[14] = m31 * x + m32 * y + m33 * z + m[14];
    r[15] = m41 * x + m42 * y + m43 * z + m[15];

    return r;
});

var _MJS_m4x4makeLookAt = F3(function(eye, center, up) {
    var z = _MJS_v3directionLocal(eye, center, _MJS_v3temp1Local);
    var x = _MJS_v3normalizeLocal(_MJS_v3crossLocal(up, z, _MJS_v3temp2Local), _MJS_v3temp2Local);
    var y = _MJS_v3normalizeLocal(_MJS_v3crossLocal(z, x, _MJS_v3temp3Local), _MJS_v3temp3Local);
    var tm1 = _MJS_m4x4temp1Local;
    var tm2 = _MJS_m4x4temp2Local;

    tm1[0] = x[0];
    tm1[1] = y[0];
    tm1[2] = z[0];
    tm1[3] = 0;
    tm1[4] = x[1];
    tm1[5] = y[1];
    tm1[6] = z[1];
    tm1[7] = 0;
    tm1[8] = x[2];
    tm1[9] = y[2];
    tm1[10] = z[2];
    tm1[11] = 0;
    tm1[12] = 0;
    tm1[13] = 0;
    tm1[14] = 0;
    tm1[15] = 1;

    tm2[0] = 1; tm2[1] = 0; tm2[2] = 0; tm2[3] = 0;
    tm2[4] = 0; tm2[5] = 1; tm2[6] = 0; tm2[7] = 0;
    tm2[8] = 0; tm2[9] = 0; tm2[10] = 1; tm2[11] = 0;
    tm2[12] = -eye[0]; tm2[13] = -eye[1]; tm2[14] = -eye[2]; tm2[15] = 1;

    return _MJS_m4x4mulLocal(tm1, tm2);
});


function _MJS_m4x4transposeLocal(m) {
    var r = new Float64Array(16);

    r[0] = m[0]; r[1] = m[4]; r[2] = m[8]; r[3] = m[12];
    r[4] = m[1]; r[5] = m[5]; r[6] = m[9]; r[7] = m[13];
    r[8] = m[2]; r[9] = m[6]; r[10] = m[10]; r[11] = m[14];
    r[12] = m[3]; r[13] = m[7]; r[14] = m[11]; r[15] = m[15];

    return r;
}
var _MJS_m4x4transpose = _MJS_m4x4transposeLocal;

var _MJS_m4x4makeBasis = F3(function(vx, vy, vz) {
    var r = new Float64Array(16);

    r[0] = vx[0];
    r[1] = vx[1];
    r[2] = vx[2];
    r[3] = 0;
    r[4] = vy[0];
    r[5] = vy[1];
    r[6] = vy[2];
    r[7] = 0;
    r[8] = vz[0];
    r[9] = vz[1];
    r[10] = vz[2];
    r[11] = 0;
    r[12] = 0;
    r[13] = 0;
    r[14] = 0;
    r[15] = 1;

    return r;
});
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$GT = 2;
var $elm$core$Basics$LT = 0;
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.d) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.g),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.g);
		} else {
			var treeLen = builder.d * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.h) : builder.h;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.d);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.g) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.g);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{h: nodeList, d: (len / $elm$core$Array$branchFactor) | 0, g: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = $elm$core$Basics$identity;
var $elm$url$Url$Http = 0;
var $elm$url$Url$Https = 1;
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {cw: fragment, cA: host, aQ: path, c7: port_, da: protocol, db: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 1) {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		0,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		1,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = $elm$core$Basics$identity;
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return 0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0;
		return A2($elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			A2($elm$core$Task$map, toMessage, task));
	});
var $elm$browser$Browser$element = _Browser_element;
var $author$project$Main$BasicWalkerMsg = function (a) {
	return {$: 2, a: a};
};
var $author$project$Main$GotViewport = function (a) {
	return {$: 1, a: a};
};
var $author$project$Main$RandomWalksBasicAnim = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$browser$Browser$Dom$getViewport = _Browser_withWindow(_Browser_getViewport);
var $author$project$RandomWalks$Basic$defaultPosition = _Utils_Tuple2(300, 300);
var $author$project$RandomWalks$Basic$Down = 1;
var $author$project$RandomWalks$Basic$Left = 2;
var $author$project$RandomWalks$Basic$NewStep = function (a) {
	return {$: 1, a: a};
};
var $author$project$RandomWalks$Basic$Right = 3;
var $author$project$RandomWalks$Basic$Up = 0;
var $elm$random$Random$Generate = $elm$core$Basics$identity;
var $elm$random$Random$Seed = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm$random$Random$next = function (_v0) {
	var state0 = _v0.a;
	var incr = _v0.b;
	return A2($elm$random$Random$Seed, ((state0 * 1664525) + incr) >>> 0, incr);
};
var $elm$random$Random$initialSeed = function (x) {
	var _v0 = $elm$random$Random$next(
		A2($elm$random$Random$Seed, 0, 1013904223));
	var state1 = _v0.a;
	var incr = _v0.b;
	var state2 = (state1 + x) >>> 0;
	return $elm$random$Random$next(
		A2($elm$random$Random$Seed, state2, incr));
};
var $elm$time$Time$Name = function (a) {
	return {$: 0, a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 1, a: a};
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$Posix = $elm$core$Basics$identity;
var $elm$time$Time$millisToPosix = $elm$core$Basics$identity;
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $elm$time$Time$posixToMillis = function (_v0) {
	var millis = _v0;
	return millis;
};
var $elm$random$Random$init = A2(
	$elm$core$Task$andThen,
	function (time) {
		return $elm$core$Task$succeed(
			$elm$random$Random$initialSeed(
				$elm$time$Time$posixToMillis(time)));
	},
	$elm$time$Time$now);
var $elm$random$Random$step = F2(
	function (_v0, seed) {
		var generator = _v0;
		return generator(seed);
	});
var $elm$random$Random$onEffects = F3(
	function (router, commands, seed) {
		if (!commands.b) {
			return $elm$core$Task$succeed(seed);
		} else {
			var generator = commands.a;
			var rest = commands.b;
			var _v1 = A2($elm$random$Random$step, generator, seed);
			var value = _v1.a;
			var newSeed = _v1.b;
			return A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$random$Random$onEffects, router, rest, newSeed);
				},
				A2($elm$core$Platform$sendToApp, router, value));
		}
	});
var $elm$random$Random$onSelfMsg = F3(
	function (_v0, _v1, seed) {
		return $elm$core$Task$succeed(seed);
	});
var $elm$random$Random$Generator = $elm$core$Basics$identity;
var $elm$random$Random$map = F2(
	function (func, _v0) {
		var genA = _v0;
		return function (seed0) {
			var _v1 = genA(seed0);
			var a = _v1.a;
			var seed1 = _v1.b;
			return _Utils_Tuple2(
				func(a),
				seed1);
		};
	});
var $elm$random$Random$cmdMap = F2(
	function (func, _v0) {
		var generator = _v0;
		return A2($elm$random$Random$map, func, generator);
	});
_Platform_effectManagers['Random'] = _Platform_createManager($elm$random$Random$init, $elm$random$Random$onEffects, $elm$random$Random$onSelfMsg, $elm$random$Random$cmdMap);
var $elm$random$Random$command = _Platform_leaf('Random');
var $elm$random$Random$generate = F2(
	function (tagger, generator) {
		return $elm$random$Random$command(
			A2($elm$random$Random$map, tagger, generator));
	});
var $elm$random$Random$addOne = function (value) {
	return _Utils_Tuple2(1, value);
};
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$xor = _Bitwise_xor;
var $elm$random$Random$peel = function (_v0) {
	var state = _v0.a;
	var word = (state ^ (state >>> ((state >>> 28) + 4))) * 277803737;
	return ((word >>> 22) ^ word) >>> 0;
};
var $elm$random$Random$float = F2(
	function (a, b) {
		return function (seed0) {
			var seed1 = $elm$random$Random$next(seed0);
			var range = $elm$core$Basics$abs(b - a);
			var n1 = $elm$random$Random$peel(seed1);
			var n0 = $elm$random$Random$peel(seed0);
			var lo = (134217727 & n1) * 1.0;
			var hi = (67108863 & n0) * 1.0;
			var val = ((hi * 134217728.0) + lo) / 9007199254740992.0;
			var scaled = (val * range) + a;
			return _Utils_Tuple2(
				scaled,
				$elm$random$Random$next(seed1));
		};
	});
var $elm$random$Random$getByWeight = F3(
	function (_v0, others, countdown) {
		getByWeight:
		while (true) {
			var weight = _v0.a;
			var value = _v0.b;
			if (!others.b) {
				return value;
			} else {
				var second = others.a;
				var otherOthers = others.b;
				if (_Utils_cmp(
					countdown,
					$elm$core$Basics$abs(weight)) < 1) {
					return value;
				} else {
					var $temp$_v0 = second,
						$temp$others = otherOthers,
						$temp$countdown = countdown - $elm$core$Basics$abs(weight);
					_v0 = $temp$_v0;
					others = $temp$others;
					countdown = $temp$countdown;
					continue getByWeight;
				}
			}
		}
	});
var $elm$core$List$sum = function (numbers) {
	return A3($elm$core$List$foldl, $elm$core$Basics$add, 0, numbers);
};
var $elm$random$Random$weighted = F2(
	function (first, others) {
		var normalize = function (_v0) {
			var weight = _v0.a;
			return $elm$core$Basics$abs(weight);
		};
		var total = normalize(first) + $elm$core$List$sum(
			A2($elm$core$List$map, normalize, others));
		return A2(
			$elm$random$Random$map,
			A2($elm$random$Random$getByWeight, first, others),
			A2($elm$random$Random$float, 0, total));
	});
var $elm$random$Random$uniform = F2(
	function (value, valueList) {
		return A2(
			$elm$random$Random$weighted,
			$elm$random$Random$addOne(value),
			A2($elm$core$List$map, $elm$random$Random$addOne, valueList));
	});
var $author$project$RandomWalks$Basic$stepCmd = A2(
	$elm$random$Random$generate,
	$author$project$RandomWalks$Basic$NewStep,
	A2(
		$elm$random$Random$uniform,
		0,
		_List_fromArray(
			[1, 2, 3])));
var $author$project$RandomWalks$Basic$init = function (_v0) {
	return _Utils_Tuple2(
		{
			ay: _List_fromArray(
				[$author$project$RandomWalks$Basic$defaultPosition])
		},
		$author$project$RandomWalks$Basic$stepCmd);
};
var $elm$core$Platform$Cmd$map = _Platform_map;
var $author$project$Main$init = function (_v0) {
	var _v1 = $author$project$RandomWalks$Basic$init(0);
	var subModel = _v1.a;
	var subCmd = _v1.b;
	return _Utils_Tuple2(
		{
			a: $author$project$Main$RandomWalksBasicAnim(subModel),
			bd: $elm$core$Maybe$Nothing
		},
		$elm$core$Platform$Cmd$batch(
			_List_fromArray(
				[
					A2($elm$core$Platform$Cmd$map, $author$project$Main$BasicWalkerMsg, subCmd),
					A2($elm$core$Task$perform, $author$project$Main$GotViewport, $elm$browser$Browser$Dom$getViewport)
				])));
};
var $author$project$Main$AngularMovementAccelerateTowardsMouseMsg = function (a) {
	return {$: 3, a: a};
};
var $author$project$Main$AngularMovementAcceleratingBatonMsg = function (a) {
	return {$: 4, a: a};
};
var $author$project$Main$AngularMovementFallingBoulderMsg = function (a) {
	return {$: 7, a: a};
};
var $author$project$Main$AngularMovementManyOrbitsWithDynamicRotationMsg = function (a) {
	return {$: 10, a: a};
};
var $author$project$Main$AngularMovementManyOrbitsWithRotationMsg = function (a) {
	return {$: 14, a: a};
};
var $author$project$Main$AngularMovementPolarSwingMsg = function (a) {
	return {$: 18, a: a};
};
var $author$project$Main$AngularMovementSpinningBatonMsg = function (a) {
	return {$: 23, a: a};
};
var $author$project$Main$AngularMovementSpiralDrawerMsg = function (a) {
	return {$: 29, a: a};
};
var $author$project$Main$ForcesArtworkGeneratorMsg = function (a) {
	return {$: 5, a: a};
};
var $author$project$Main$ForcesBlowingWindMsg = function (a) {
	return {$: 6, a: a};
};
var $author$project$Main$ForcesBlowingWindWithGravityAndFrictionMsg = function (a) {
	return {$: 11, a: a};
};
var $author$project$Main$ForcesBlowingWindWithGravityMsg = function (a) {
	return {$: 8, a: a};
};
var $author$project$Main$ForcesFloatingBalloonMsg = function (a) {
	return {$: 15, a: a};
};
var $author$project$Main$ForcesManyBallsMsg = function (a) {
	return {$: 19, a: a};
};
var $author$project$Main$ForcesManyOrbitsMsg = function (a) {
	return {$: 24, a: a};
};
var $author$project$Main$ForcesMutualAttractionMsg = function (a) {
	return {$: 30, a: a};
};
var $author$project$Main$ForcesMutualRepulsionMsg = function (a) {
	return {$: 35, a: a};
};
var $author$project$Main$ForcesResistanceMsg = function (a) {
	return {$: 40, a: a};
};
var $author$project$Main$ForcesSingleOrbitMsg = function (a) {
	return {$: 44, a: a};
};
var $author$project$Main$ForcesSinkingLogsMsg = function (a) {
	return {$: 48, a: a};
};
var $author$project$Main$ForcesWallBallsMsg = function (a) {
	return {$: 51, a: a};
};
var $author$project$Main$NoiseAnimatedBoxMsg = function (a) {
	return {$: 9, a: a};
};
var $author$project$Main$NoiseMountainRangeMsg = function (a) {
	return {$: 12, a: a};
};
var $author$project$Main$NoisePerlinBoxMsg = function (a) {
	return {$: 20, a: a};
};
var $author$project$Main$NoisePerlinMsg = function (a) {
	return {$: 16, a: a};
};
var $author$project$Main$NoisePerlinStepWalkerMsg = function (a) {
	return {$: 25, a: a};
};
var $author$project$Main$NoisePerlinWalkerMsg = function (a) {
	return {$: 31, a: a};
};
var $author$project$Main$NoiseRandomBoxMsg = function (a) {
	return {$: 36, a: a};
};
var $author$project$Main$OscillationsManyWavesMsg = function (a) {
	return {$: 13, a: a};
};
var $author$project$Main$OscillationsOscillatorsMsg = function (a) {
	return {$: 17, a: a};
};
var $author$project$Main$OscillationsPendulumMsg = function (a) {
	return {$: 21, a: a};
};
var $author$project$Main$OscillationsRainbowSlinkyMsg = function (a) {
	return {$: 26, a: a};
};
var $author$project$Main$OscillationsSimpleHarmonicMotionMsg = function (a) {
	return {$: 32, a: a};
};
var $author$project$Main$OscillationsSimpleHarmonicMotionWithAngleMsg = function (a) {
	return {$: 37, a: a};
};
var $author$project$Main$OscillationsSineWaveMsg = function (a) {
	return {$: 41, a: a};
};
var $author$project$Main$OscillationsStaticSineWaveMsg = function (a) {
	return {$: 45, a: a};
};
var $author$project$Main$RandomWalksDirectedMsg = function (a) {
	return {$: 22, a: a};
};
var $author$project$Main$RandomWalksGaussianMsg = function (a) {
	return {$: 27, a: a};
};
var $author$project$Main$RandomWalksImprovedMsg = function (a) {
	return {$: 33, a: a};
};
var $author$project$Main$RandomWalksLevyMsg = function (a) {
	return {$: 38, a: a};
};
var $author$project$Main$RandomWalksMonteCarloMsg = function (a) {
	return {$: 42, a: a};
};
var $author$project$Main$RandomWalksNormalDistributionMsg = function (a) {
	return {$: 46, a: a};
};
var $author$project$Main$RandomWalksPaintSplatterMsg = function (a) {
	return {$: 49, a: a};
};
var $author$project$Main$VectorAccelerateTowardsMouseMsg = function (a) {
	return {$: 28, a: a};
};
var $author$project$Main$VectorBouncingBallMsg = function (a) {
	return {$: 34, a: a};
};
var $author$project$Main$VectorBouncingBallWithVectorMsg = function (a) {
	return {$: 39, a: a};
};
var $author$project$Main$VectorBrakingCarMsg = function (a) {
	return {$: 43, a: a};
};
var $author$project$Main$VectorConstantAccelerationMsg = function (a) {
	return {$: 47, a: a};
};
var $author$project$Main$VectorConstantVelocityMsg = function (a) {
	return {$: 50, a: a};
};
var $author$project$Main$VectorGroupAccelerateTowardsMouseMsg = function (a) {
	return {$: 52, a: a};
};
var $author$project$Main$VectorMouseStalkerMsg = function (a) {
	return {$: 53, a: a};
};
var $author$project$Main$VectorMouseTracingMsg = function (a) {
	return {$: 54, a: a};
};
var $author$project$Main$VectorMouseTracingNormalizedMsg = function (a) {
	return {$: 55, a: a};
};
var $author$project$Main$VectorMouseTracingScaledMsg = function (a) {
	return {$: 56, a: a};
};
var $author$project$Main$VectorMouseTracingWithMagnitudeMsg = function (a) {
	return {$: 57, a: a};
};
var $author$project$Main$VectorRandomAccelerationMsg = function (a) {
	return {$: 58, a: a};
};
var $author$project$Main$VectorScalingSaberMsg = function (a) {
	return {$: 59, a: a};
};
var $author$project$Main$VectorWalkerWithVectorMsg = function (a) {
	return {$: 60, a: a};
};
var $elm$core$Platform$Sub$map = _Platform_map;
var $author$project$AngularMovement$AccelerateTowardsMouse$GetMouseLocation = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $author$project$AngularMovement$AccelerateTowardsMouse$Move = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$time$Time$Every = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$time$Time$State = F2(
	function (taggers, processes) {
		return {c9: processes, dj: taggers};
	});
var $elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$time$Time$init = $elm$core$Task$succeed(
	A2($elm$time$Time$State, $elm$core$Dict$empty, $elm$core$Dict$empty));
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$Black = 1;
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = 0;
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1) {
				case 0:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$time$Time$addMySub = F2(
	function (_v0, state) {
		var interval = _v0.a;
		var tagger = _v0.b;
		var _v1 = A2($elm$core$Dict$get, interval, state);
		if (_v1.$ === 1) {
			return A3(
				$elm$core$Dict$insert,
				interval,
				_List_fromArray(
					[tagger]),
				state);
		} else {
			var taggers = _v1.a;
			return A3(
				$elm$core$Dict$insert,
				interval,
				A2($elm$core$List$cons, tagger, taggers),
				state);
		}
	});
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === -2) {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$time$Time$setInterval = _Time_setInterval;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$time$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		if (!intervals.b) {
			return $elm$core$Task$succeed(processes);
		} else {
			var interval = intervals.a;
			var rest = intervals.b;
			var spawnTimer = $elm$core$Process$spawn(
				A2(
					$elm$time$Time$setInterval,
					interval,
					A2($elm$core$Platform$sendToSelf, router, interval)));
			var spawnRest = function (id) {
				return A3(
					$elm$time$Time$spawnHelp,
					router,
					rest,
					A3($elm$core$Dict$insert, interval, id, processes));
			};
			return A2($elm$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var $elm$time$Time$onEffects = F3(
	function (router, subs, _v0) {
		var processes = _v0.c9;
		var rightStep = F3(
			function (_v6, id, _v7) {
				var spawns = _v7.a;
				var existing = _v7.b;
				var kills = _v7.c;
				return _Utils_Tuple3(
					spawns,
					existing,
					A2(
						$elm$core$Task$andThen,
						function (_v5) {
							return kills;
						},
						$elm$core$Process$kill(id)));
			});
		var newTaggers = A3($elm$core$List$foldl, $elm$time$Time$addMySub, $elm$core$Dict$empty, subs);
		var leftStep = F3(
			function (interval, taggers, _v4) {
				var spawns = _v4.a;
				var existing = _v4.b;
				var kills = _v4.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, interval, spawns),
					existing,
					kills);
			});
		var bothStep = F4(
			function (interval, taggers, id, _v3) {
				var spawns = _v3.a;
				var existing = _v3.b;
				var kills = _v3.c;
				return _Utils_Tuple3(
					spawns,
					A3($elm$core$Dict$insert, interval, id, existing),
					kills);
			});
		var _v1 = A6(
			$elm$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			processes,
			_Utils_Tuple3(
				_List_Nil,
				$elm$core$Dict$empty,
				$elm$core$Task$succeed(0)));
		var spawnList = _v1.a;
		var existingDict = _v1.b;
		var killTask = _v1.c;
		return A2(
			$elm$core$Task$andThen,
			function (newProcesses) {
				return $elm$core$Task$succeed(
					A2($elm$time$Time$State, newTaggers, newProcesses));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$time$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var $elm$time$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _v0 = A2($elm$core$Dict$get, interval, state.dj);
		if (_v0.$ === 1) {
			return $elm$core$Task$succeed(state);
		} else {
			var taggers = _v0.a;
			var tellTaggers = function (time) {
				return $elm$core$Task$sequence(
					A2(
						$elm$core$List$map,
						function (tagger) {
							return A2(
								$elm$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						taggers));
			};
			return A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$succeed(state);
				},
				A2($elm$core$Task$andThen, tellTaggers, $elm$time$Time$now));
		}
	});
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$time$Time$subMap = F2(
	function (f, _v0) {
		var interval = _v0.a;
		var tagger = _v0.b;
		return A2(
			$elm$time$Time$Every,
			interval,
			A2($elm$core$Basics$composeL, f, tagger));
	});
_Platform_effectManagers['Time'] = _Platform_createManager($elm$time$Time$init, $elm$time$Time$onEffects, $elm$time$Time$onSelfMsg, 0, $elm$time$Time$subMap);
var $elm$time$Time$subscription = _Platform_leaf('Time');
var $elm$time$Time$every = F2(
	function (interval, tagger) {
		return $elm$time$Time$subscription(
			A2($elm$time$Time$Every, interval, tagger));
	});
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $elm$browser$Browser$Events$Document = 0;
var $elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {c6: pids, dh: subs};
	});
var $elm$browser$Browser$Events$init = $elm$core$Task$succeed(
	A2($elm$browser$Browser$Events$State, _List_Nil, $elm$core$Dict$empty));
var $elm$browser$Browser$Events$nodeToKey = function (node) {
	if (!node) {
		return 'd_';
	} else {
		return 'w_';
	}
};
var $elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			$elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {cu: event, cE: key};
	});
var $elm$browser$Browser$Events$spawn = F3(
	function (router, key, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var actualNode = function () {
			if (!node) {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			$elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						$elm$core$Platform$sendToSelf,
						router,
						A2($elm$browser$Browser$Events$Event, key, event));
				}));
	});
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _v6) {
				var deads = _v6.a;
				var lives = _v6.b;
				var news = _v6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						$elm$core$List$cons,
						A3($elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_v4, pid, _v5) {
				var deads = _v5.a;
				var lives = _v5.b;
				var news = _v5.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _v2, _v3) {
				var deads = _v3.a;
				var lives = _v3.b;
				var news = _v3.c;
				return _Utils_Tuple3(
					deads,
					A3($elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2($elm$core$List$map, $elm$browser$Browser$Events$addKey, subs);
		var _v0 = A6(
			$elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.c6,
			$elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, $elm$core$Dict$empty, _List_Nil));
		var deadPids = _v0.a;
		var livePids = _v0.b;
		var makeNewPids = _v0.c;
		return A2(
			$elm$core$Task$andThen,
			function (pids) {
				return $elm$core$Task$succeed(
					A2(
						$elm$browser$Browser$Events$State,
						newSubs,
						A2(
							$elm$core$Dict$union,
							livePids,
							$elm$core$Dict$fromList(pids))));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$sequence(makeNewPids);
				},
				$elm$core$Task$sequence(
					A2($elm$core$List$map, $elm$core$Process$kill, deadPids))));
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (!_v0.$) {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _v0, state) {
		var key = _v0.cE;
		var event = _v0.cu;
		var toMessage = function (_v2) {
			var subKey = _v2.a;
			var _v3 = _v2.b;
			var node = _v3.a;
			var name = _v3.b;
			var decoder = _v3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : $elm$core$Maybe$Nothing;
		};
		var messages = A2($elm$core$List$filterMap, toMessage, state.dh);
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Platform$sendToApp(router),
					messages)));
	});
var $elm$browser$Browser$Events$subMap = F2(
	function (func, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var decoder = _v0.c;
		return A3(
			$elm$browser$Browser$Events$MySub,
			node,
			name,
			A2($elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager($elm$browser$Browser$Events$init, $elm$browser$Browser$Events$onEffects, $elm$browser$Browser$Events$onSelfMsg, 0, $elm$browser$Browser$Events$subMap);
var $elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var $elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return $elm$browser$Browser$Events$subscription(
			A3($elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var $elm$browser$Browser$Events$onMouseMove = A2($elm$browser$Browser$Events$on, 0, 'mousemove');
var $author$project$AngularMovement$AccelerateTowardsMouse$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				A2($elm$time$Time$every, 20, $author$project$AngularMovement$AccelerateTowardsMouse$Move),
				$elm$browser$Browser$Events$onMouseMove(
				A3(
					$elm$json$Json$Decode$map2,
					$author$project$AngularMovement$AccelerateTowardsMouse$GetMouseLocation,
					A2($elm$json$Json$Decode$field, 'pageX', $elm$json$Json$Decode$int),
					A2($elm$json$Json$Decode$field, 'pageY', $elm$json$Json$Decode$int)))
			]));
};
var $author$project$AngularMovement$AcceleratingBaton$Move = $elm$core$Basics$identity;
var $author$project$AngularMovement$AcceleratingBaton$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, 10, $elm$core$Basics$identity);
};
var $author$project$AngularMovement$FallingBoulder$Move = function (a) {
	return {$: 0, a: a};
};
var $author$project$AngularMovement$FallingBoulder$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, 10, $author$project$AngularMovement$FallingBoulder$Move);
};
var $author$project$AngularMovement$ManyOrbitsWithDynamicRotation$DragMsg = function (a) {
	return {$: 2, a: a};
};
var $author$project$AngularMovement$ManyOrbitsWithDynamicRotation$Move = function (a) {
	return {$: 0, a: a};
};
var $zaboco$elm_draggable$Internal$DragAt = function (a) {
	return {$: 1, a: a};
};
var $zaboco$elm_draggable$Draggable$Msg = $elm$core$Basics$identity;
var $zaboco$elm_draggable$Internal$StopDragging = {$: 2};
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $elm$browser$Browser$Events$onMouseUp = A2($elm$browser$Browser$Events$on, 0, 'mouseup');
var $zaboco$elm_draggable$Internal$Position = F2(
	function (x, y) {
		return {bz: x, bB: y};
	});
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $elm$core$Basics$truncate = _Basics_truncate;
var $zaboco$elm_draggable$Draggable$positionDecoder = A3(
	$elm$json$Json$Decode$map2,
	$zaboco$elm_draggable$Internal$Position,
	A2(
		$elm$json$Json$Decode$map,
		$elm$core$Basics$truncate,
		A2($elm$json$Json$Decode$field, 'pageX', $elm$json$Json$Decode$float)),
	A2(
		$elm$json$Json$Decode$map,
		$elm$core$Basics$truncate,
		A2($elm$json$Json$Decode$field, 'pageY', $elm$json$Json$Decode$float)));
var $zaboco$elm_draggable$Draggable$subscriptions = F2(
	function (envelope, _v0) {
		var drag = _v0;
		if (!drag.$) {
			return $elm$core$Platform$Sub$none;
		} else {
			return A2(
				$elm$core$Platform$Sub$map,
				A2($elm$core$Basics$composeL, envelope, $elm$core$Basics$identity),
				$elm$core$Platform$Sub$batch(
					_List_fromArray(
						[
							$elm$browser$Browser$Events$onMouseMove(
							A2($elm$json$Json$Decode$map, $zaboco$elm_draggable$Internal$DragAt, $zaboco$elm_draggable$Draggable$positionDecoder)),
							$elm$browser$Browser$Events$onMouseUp(
							$elm$json$Json$Decode$succeed($zaboco$elm_draggable$Internal$StopDragging))
						])));
		}
	});
var $author$project$AngularMovement$ManyOrbitsWithDynamicRotation$subscriptions = function (_v0) {
	var drag = _v0.bS;
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				A2($elm$time$Time$every, 10, $author$project$AngularMovement$ManyOrbitsWithDynamicRotation$Move),
				A2($zaboco$elm_draggable$Draggable$subscriptions, $author$project$AngularMovement$ManyOrbitsWithDynamicRotation$DragMsg, drag)
			]));
};
var $author$project$AngularMovement$ManyOrbitsWithRotation$DragMsg = function (a) {
	return {$: 2, a: a};
};
var $author$project$AngularMovement$ManyOrbitsWithRotation$Move = function (a) {
	return {$: 0, a: a};
};
var $author$project$AngularMovement$ManyOrbitsWithRotation$subscriptions = function (_v0) {
	var drag = _v0.bS;
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				A2($elm$time$Time$every, 10, $author$project$AngularMovement$ManyOrbitsWithRotation$Move),
				A2($zaboco$elm_draggable$Draggable$subscriptions, $author$project$AngularMovement$ManyOrbitsWithRotation$DragMsg, drag)
			]));
};
var $author$project$AngularMovement$PolarSwing$Move = $elm$core$Basics$identity;
var $author$project$AngularMovement$PolarSwing$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, 10, $elm$core$Basics$identity);
};
var $author$project$AngularMovement$SpinningBaton$Move = $elm$core$Basics$identity;
var $author$project$AngularMovement$SpinningBaton$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, 10, $elm$core$Basics$identity);
};
var $author$project$AngularMovement$SpiralDrawer$Move = $elm$core$Basics$identity;
var $author$project$AngularMovement$SpiralDrawer$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, 10, $elm$core$Basics$identity);
};
var $author$project$Forces$ArtworkGenerator$DragMsg = function (a) {
	return {$: 2, a: a};
};
var $author$project$Forces$ArtworkGenerator$Move = function (a) {
	return {$: 0, a: a};
};
var $author$project$Forces$ArtworkGenerator$subscriptions = function (_v0) {
	var drag = _v0.bS;
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				A2($elm$time$Time$every, 1, $author$project$Forces$ArtworkGenerator$Move),
				A2($zaboco$elm_draggable$Draggable$subscriptions, $author$project$Forces$ArtworkGenerator$DragMsg, drag)
			]));
};
var $author$project$Forces$BlowingWind$Move = $elm$core$Basics$identity;
var $author$project$Forces$BlowingWind$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, 10, $elm$core$Basics$identity);
};
var $author$project$Forces$BlowingWindWithGravity$Move = function (a) {
	return {$: 0, a: a};
};
var $author$project$Forces$BlowingWindWithGravity$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, 20, $author$project$Forces$BlowingWindWithGravity$Move);
};
var $author$project$Forces$BlowingWindWithGravityAndFriction$Move = function (a) {
	return {$: 0, a: a};
};
var $author$project$Forces$BlowingWindWithGravityAndFriction$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, 20, $author$project$Forces$BlowingWindWithGravityAndFriction$Move);
};
var $author$project$Forces$FloatingBalloon$Move = $elm$core$Basics$identity;
var $author$project$Forces$FloatingBalloon$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, 10, $elm$core$Basics$identity);
};
var $author$project$Forces$ManyBalls$Move = function (a) {
	return {$: 0, a: a};
};
var $author$project$Forces$ManyBalls$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, 20, $author$project$Forces$ManyBalls$Move);
};
var $author$project$Forces$ManyOrbits$DragMsg = function (a) {
	return {$: 2, a: a};
};
var $author$project$Forces$ManyOrbits$Move = function (a) {
	return {$: 0, a: a};
};
var $author$project$Forces$ManyOrbits$subscriptions = function (_v0) {
	var drag = _v0.bS;
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				A2($elm$time$Time$every, 10, $author$project$Forces$ManyOrbits$Move),
				A2($zaboco$elm_draggable$Draggable$subscriptions, $author$project$Forces$ManyOrbits$DragMsg, drag)
			]));
};
var $author$project$Forces$MutualAttraction$Move = function (a) {
	return {$: 0, a: a};
};
var $author$project$Forces$MutualAttraction$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				A2($elm$time$Time$every, 10, $author$project$Forces$MutualAttraction$Move)
			]));
};
var $author$project$Forces$MutualRepulsion$Move = function (a) {
	return {$: 0, a: a};
};
var $author$project$Forces$MutualRepulsion$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				A2($elm$time$Time$every, 10, $author$project$Forces$MutualRepulsion$Move)
			]));
};
var $author$project$Forces$Resistance$Move = function (a) {
	return {$: 0, a: a};
};
var $author$project$Forces$Resistance$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, 20, $author$project$Forces$Resistance$Move);
};
var $author$project$Forces$SingleOrbit$DragMsg = function (a) {
	return {$: 2, a: a};
};
var $author$project$Forces$SingleOrbit$Move = function (a) {
	return {$: 0, a: a};
};
var $author$project$Forces$SingleOrbit$subscriptions = function (_v0) {
	var drag = _v0.bS;
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				A2($elm$time$Time$every, 10, $author$project$Forces$SingleOrbit$Move),
				A2($zaboco$elm_draggable$Draggable$subscriptions, $author$project$Forces$SingleOrbit$DragMsg, drag)
			]));
};
var $author$project$Forces$SinkingLogs$Move = function (a) {
	return {$: 0, a: a};
};
var $author$project$Forces$SinkingLogs$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, 20, $author$project$Forces$SinkingLogs$Move);
};
var $author$project$Forces$WallBalls$Move = function (a) {
	return {$: 0, a: a};
};
var $author$project$Forces$WallBalls$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, 20, $author$project$Forces$WallBalls$Move);
};
var $author$project$Noise$AnimatedBox$NextStep = $elm$core$Basics$identity;
var $author$project$Noise$AnimatedBox$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, 10, $elm$core$Basics$identity);
};
var $author$project$Noise$MountainRange$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$none;
};
var $author$project$Noise$Perlin$NewLength = $elm$core$Basics$identity;
var $author$project$Noise$Perlin$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				A2($elm$time$Time$every, 10, $elm$core$Basics$identity)
			]));
};
var $author$project$Noise$PerlinBox$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$none;
};
var $author$project$Noise$PerlinStepWalker$NewLength = $elm$core$Basics$identity;
var $author$project$Noise$PerlinStepWalker$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				A2($elm$time$Time$every, 10, $elm$core$Basics$identity)
			]));
};
var $author$project$Noise$PerlinWalker$NewLength = $elm$core$Basics$identity;
var $author$project$Noise$PerlinWalker$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				A2($elm$time$Time$every, 10, $elm$core$Basics$identity)
			]));
};
var $author$project$Noise$RandomBox$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$none;
};
var $author$project$Oscillations$ManyWaves$Move = $elm$core$Basics$identity;
var $author$project$Oscillations$ManyWaves$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, 20, $elm$core$Basics$identity);
};
var $author$project$Oscillations$Oscillators$Move = function (a) {
	return {$: 0, a: a};
};
var $author$project$Oscillations$Oscillators$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, 10, $author$project$Oscillations$Oscillators$Move);
};
var $author$project$Oscillations$Pendulum$Move = $elm$core$Basics$identity;
var $author$project$Oscillations$Pendulum$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, 10, $elm$core$Basics$identity);
};
var $author$project$Oscillations$RainbowSlinky$Move = $elm$core$Basics$identity;
var $author$project$Oscillations$RainbowSlinky$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, 10, $elm$core$Basics$identity);
};
var $author$project$Oscillations$SimpleHarmonicMotion$Move = $elm$core$Basics$identity;
var $author$project$Oscillations$SimpleHarmonicMotion$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, 10, $elm$core$Basics$identity);
};
var $author$project$Oscillations$SimpleHarmonicMotionWithAngle$Move = $elm$core$Basics$identity;
var $author$project$Oscillations$SimpleHarmonicMotionWithAngle$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, 10, $elm$core$Basics$identity);
};
var $author$project$Oscillations$SineWave$Move = $elm$core$Basics$identity;
var $author$project$Oscillations$SineWave$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, 10, $elm$core$Basics$identity);
};
var $author$project$Oscillations$StaticSineWave$Move = $elm$core$Basics$identity;
var $author$project$Oscillations$StaticSineWave$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, 10, $elm$core$Basics$identity);
};
var $author$project$RandomWalks$Basic$GetStep = function (a) {
	return {$: 0, a: a};
};
var $author$project$RandomWalks$Basic$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, 10, $author$project$RandomWalks$Basic$GetStep);
};
var $author$project$RandomWalks$Directed$GetStep = function (a) {
	return {$: 0, a: a};
};
var $author$project$RandomWalks$Directed$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, 10, $author$project$RandomWalks$Directed$GetStep);
};
var $author$project$RandomWalks$Gaussian$GetStep = function (a) {
	return {$: 0, a: a};
};
var $author$project$RandomWalks$Gaussian$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, 50, $author$project$RandomWalks$Gaussian$GetStep);
};
var $author$project$RandomWalks$Improved$GetStep = function (a) {
	return {$: 0, a: a};
};
var $author$project$RandomWalks$Improved$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, 10, $author$project$RandomWalks$Improved$GetStep);
};
var $author$project$RandomWalks$Levy$GetStep = function (a) {
	return {$: 0, a: a};
};
var $author$project$RandomWalks$Levy$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, 10, $author$project$RandomWalks$Levy$GetStep);
};
var $author$project$RandomWalks$MonteCarlo$GetPosition = function (a) {
	return {$: 0, a: a};
};
var $author$project$RandomWalks$MonteCarlo$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, 50, $author$project$RandomWalks$MonteCarlo$GetPosition);
};
var $author$project$RandomWalks$NormalDistribution$GetPosition = function (a) {
	return {$: 0, a: a};
};
var $author$project$RandomWalks$NormalDistribution$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, 100, $author$project$RandomWalks$NormalDistribution$GetPosition);
};
var $author$project$RandomWalks$PaintSplatter$GetPoint = function (a) {
	return {$: 0, a: a};
};
var $author$project$RandomWalks$PaintSplatter$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, 50, $author$project$RandomWalks$PaintSplatter$GetPoint);
};
var $author$project$Vector$AccelerateTowardsMouse$GetMouseLocation = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $author$project$Vector$AccelerateTowardsMouse$Move = function (a) {
	return {$: 0, a: a};
};
var $author$project$Vector$AccelerateTowardsMouse$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				A2($elm$time$Time$every, 20, $author$project$Vector$AccelerateTowardsMouse$Move),
				$elm$browser$Browser$Events$onMouseMove(
				A3(
					$elm$json$Json$Decode$map2,
					$author$project$Vector$AccelerateTowardsMouse$GetMouseLocation,
					A2($elm$json$Json$Decode$field, 'pageX', $elm$json$Json$Decode$int),
					A2($elm$json$Json$Decode$field, 'pageY', $elm$json$Json$Decode$int)))
			]));
};
var $author$project$Vector$BouncingBall$Move = $elm$core$Basics$identity;
var $author$project$Vector$BouncingBall$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, 10, $elm$core$Basics$identity);
};
var $author$project$Vector$BouncingBallWithVector$Move = $elm$core$Basics$identity;
var $author$project$Vector$BouncingBallWithVector$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, 10, $elm$core$Basics$identity);
};
var $author$project$Vector$BrakingCar$Move = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Vector$BrakingCar$Accelerate = {$: 1};
var $author$project$Vector$BrakingCar$Break = {$: 2};
var $author$project$Vector$BrakingCar$Stay = {$: 3};
var $author$project$Vector$BrakingCar$toMsg = function (string) {
	switch (string) {
		case 'ArrowLeft':
			return $author$project$Vector$BrakingCar$Break;
		case 'ArrowRight':
			return $author$project$Vector$BrakingCar$Accelerate;
		default:
			return $author$project$Vector$BrakingCar$Stay;
	}
};
var $author$project$Vector$BrakingCar$keyDecoder = A2(
	$elm$json$Json$Decode$map,
	$author$project$Vector$BrakingCar$toMsg,
	A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string));
var $elm$browser$Browser$Events$onKeyDown = A2($elm$browser$Browser$Events$on, 0, 'keydown');
var $author$project$Vector$BrakingCar$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				$elm$browser$Browser$Events$onKeyDown($author$project$Vector$BrakingCar$keyDecoder),
				A2($elm$time$Time$every, 20, $author$project$Vector$BrakingCar$Move)
			]));
};
var $author$project$Vector$ConstantAcceleration$Move = $elm$core$Basics$identity;
var $author$project$Vector$ConstantAcceleration$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, 20, $elm$core$Basics$identity);
};
var $author$project$Vector$ConstantVelocity$Move = function (a) {
	return {$: 0, a: a};
};
var $author$project$Vector$ConstantVelocity$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, 10, $author$project$Vector$ConstantVelocity$Move);
};
var $author$project$Vector$GroupAccelerateTowardsMouse$GetMouseLocation = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $author$project$Vector$GroupAccelerateTowardsMouse$Move = function (a) {
	return {$: 0, a: a};
};
var $author$project$Vector$GroupAccelerateTowardsMouse$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				A2($elm$time$Time$every, 20, $author$project$Vector$GroupAccelerateTowardsMouse$Move),
				$elm$browser$Browser$Events$onMouseMove(
				A3(
					$elm$json$Json$Decode$map2,
					$author$project$Vector$GroupAccelerateTowardsMouse$GetMouseLocation,
					A2($elm$json$Json$Decode$field, 'pageX', $elm$json$Json$Decode$int),
					A2($elm$json$Json$Decode$field, 'pageY', $elm$json$Json$Decode$int)))
			]));
};
var $author$project$Vector$MouseStalker$GetMouseLocation = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $author$project$Vector$MouseStalker$Move = function (a) {
	return {$: 0, a: a};
};
var $author$project$Vector$MouseStalker$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				A2($elm$time$Time$every, 20, $author$project$Vector$MouseStalker$Move),
				$elm$browser$Browser$Events$onMouseMove(
				A3(
					$elm$json$Json$Decode$map2,
					$author$project$Vector$MouseStalker$GetMouseLocation,
					A2($elm$json$Json$Decode$field, 'pageX', $elm$json$Json$Decode$int),
					A2($elm$json$Json$Decode$field, 'pageY', $elm$json$Json$Decode$int)))
			]));
};
var $author$project$Vector$MouseTracing$GetMouseLocation = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$Vector$MouseTracing$subscriptions = function (_v0) {
	return $elm$browser$Browser$Events$onMouseMove(
		A3(
			$elm$json$Json$Decode$map2,
			$author$project$Vector$MouseTracing$GetMouseLocation,
			A2($elm$json$Json$Decode$field, 'pageX', $elm$json$Json$Decode$int),
			A2($elm$json$Json$Decode$field, 'pageY', $elm$json$Json$Decode$int)));
};
var $author$project$Vector$MouseTracingNormalized$GetMouseLocation = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$Vector$MouseTracingNormalized$subscriptions = function (_v0) {
	return $elm$browser$Browser$Events$onMouseMove(
		A3(
			$elm$json$Json$Decode$map2,
			$author$project$Vector$MouseTracingNormalized$GetMouseLocation,
			A2($elm$json$Json$Decode$field, 'pageX', $elm$json$Json$Decode$int),
			A2($elm$json$Json$Decode$field, 'pageY', $elm$json$Json$Decode$int)));
};
var $author$project$Vector$MouseTracingScaled$GetMouseLocation = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$Vector$MouseTracingScaled$subscriptions = function (_v0) {
	return $elm$browser$Browser$Events$onMouseMove(
		A3(
			$elm$json$Json$Decode$map2,
			$author$project$Vector$MouseTracingScaled$GetMouseLocation,
			A2($elm$json$Json$Decode$field, 'pageX', $elm$json$Json$Decode$int),
			A2($elm$json$Json$Decode$field, 'pageY', $elm$json$Json$Decode$int)));
};
var $author$project$Vector$MouseTracingWithMagnitude$GetMouseLocation = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$Vector$MouseTracingWithMagnitude$subscriptions = function (_v0) {
	return $elm$browser$Browser$Events$onMouseMove(
		A3(
			$elm$json$Json$Decode$map2,
			$author$project$Vector$MouseTracingWithMagnitude$GetMouseLocation,
			A2($elm$json$Json$Decode$field, 'pageX', $elm$json$Json$Decode$int),
			A2($elm$json$Json$Decode$field, 'pageY', $elm$json$Json$Decode$int)));
};
var $author$project$Vector$RandomAcceleration$Move = function (a) {
	return {$: 0, a: a};
};
var $author$project$Vector$RandomAcceleration$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, 20, $author$project$Vector$RandomAcceleration$Move);
};
var $author$project$Vector$ScalingSaber$Grow = 0;
var $author$project$Vector$ScalingSaber$Shrink = 1;
var $author$project$Vector$ScalingSaber$Stay = 2;
var $author$project$Vector$ScalingSaber$toMsg = function (string) {
	switch (string) {
		case 'ArrowUp':
			return 0;
		case 'ArrowDown':
			return 1;
		default:
			return 2;
	}
};
var $author$project$Vector$ScalingSaber$keyDecoder = A2(
	$elm$json$Json$Decode$map,
	$author$project$Vector$ScalingSaber$toMsg,
	A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string));
var $author$project$Vector$ScalingSaber$subscriptions = function (_v0) {
	return $elm$browser$Browser$Events$onKeyDown($author$project$Vector$ScalingSaber$keyDecoder);
};
var $author$project$Vector$WalkerWithVector$GetStep = function (a) {
	return {$: 0, a: a};
};
var $author$project$Vector$WalkerWithVector$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, 100, $author$project$Vector$WalkerWithVector$GetStep);
};
var $author$project$Main$subscriptions = function (anim) {
	var _v0 = anim.a;
	switch (_v0.$) {
		case 0:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$BasicWalkerMsg,
				$author$project$RandomWalks$Basic$subscriptions(subModel));
		case 1:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$AngularMovementAccelerateTowardsMouseMsg,
				$author$project$AngularMovement$AccelerateTowardsMouse$subscriptions(subModel));
		case 2:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$AngularMovementAcceleratingBatonMsg,
				$author$project$AngularMovement$AcceleratingBaton$subscriptions(subModel));
		case 3:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$ForcesArtworkGeneratorMsg,
				$author$project$Forces$ArtworkGenerator$subscriptions(subModel));
		case 4:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$ForcesBlowingWindMsg,
				$author$project$Forces$BlowingWind$subscriptions(subModel));
		case 5:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$AngularMovementFallingBoulderMsg,
				$author$project$AngularMovement$FallingBoulder$subscriptions(subModel));
		case 6:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$ForcesBlowingWindWithGravityMsg,
				$author$project$Forces$BlowingWindWithGravity$subscriptions(subModel));
		case 7:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$NoiseAnimatedBoxMsg,
				$author$project$Noise$AnimatedBox$subscriptions(subModel));
		case 8:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$AngularMovementManyOrbitsWithDynamicRotationMsg,
				$author$project$AngularMovement$ManyOrbitsWithDynamicRotation$subscriptions(subModel));
		case 9:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$ForcesBlowingWindWithGravityAndFrictionMsg,
				$author$project$Forces$BlowingWindWithGravityAndFriction$subscriptions(subModel));
		case 10:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$NoiseMountainRangeMsg,
				$author$project$Noise$MountainRange$subscriptions(subModel));
		case 11:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$OscillationsManyWavesMsg,
				$author$project$Oscillations$ManyWaves$subscriptions(subModel));
		case 12:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$AngularMovementManyOrbitsWithRotationMsg,
				$author$project$AngularMovement$ManyOrbitsWithRotation$subscriptions(subModel));
		case 13:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$ForcesFloatingBalloonMsg,
				$author$project$Forces$FloatingBalloon$subscriptions(subModel));
		case 14:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$NoisePerlinMsg,
				$author$project$Noise$Perlin$subscriptions(subModel));
		case 15:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$OscillationsOscillatorsMsg,
				$author$project$Oscillations$Oscillators$subscriptions(subModel));
		case 16:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$AngularMovementPolarSwingMsg,
				$author$project$AngularMovement$PolarSwing$subscriptions(subModel));
		case 17:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$ForcesManyBallsMsg,
				$author$project$Forces$ManyBalls$subscriptions(subModel));
		case 18:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$NoisePerlinBoxMsg,
				$author$project$Noise$PerlinBox$subscriptions(subModel));
		case 19:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$OscillationsPendulumMsg,
				$author$project$Oscillations$Pendulum$subscriptions(subModel));
		case 20:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$RandomWalksDirectedMsg,
				$author$project$RandomWalks$Directed$subscriptions(subModel));
		case 21:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$AngularMovementSpinningBatonMsg,
				$author$project$AngularMovement$SpinningBaton$subscriptions(subModel));
		case 22:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$ForcesManyOrbitsMsg,
				$author$project$Forces$ManyOrbits$subscriptions(subModel));
		case 23:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$NoisePerlinStepWalkerMsg,
				$author$project$Noise$PerlinStepWalker$subscriptions(subModel));
		case 24:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$OscillationsRainbowSlinkyMsg,
				$author$project$Oscillations$RainbowSlinky$subscriptions(subModel));
		case 25:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$RandomWalksGaussianMsg,
				$author$project$RandomWalks$Gaussian$subscriptions(subModel));
		case 26:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$VectorAccelerateTowardsMouseMsg,
				$author$project$Vector$AccelerateTowardsMouse$subscriptions(subModel));
		case 27:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$AngularMovementSpiralDrawerMsg,
				$author$project$AngularMovement$SpiralDrawer$subscriptions(subModel));
		case 28:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$ForcesMutualAttractionMsg,
				$author$project$Forces$MutualAttraction$subscriptions(subModel));
		case 29:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$NoisePerlinWalkerMsg,
				$author$project$Noise$PerlinWalker$subscriptions(subModel));
		case 30:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$OscillationsSimpleHarmonicMotionMsg,
				$author$project$Oscillations$SimpleHarmonicMotion$subscriptions(subModel));
		case 31:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$RandomWalksImprovedMsg,
				$author$project$RandomWalks$Improved$subscriptions(subModel));
		case 32:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$VectorBouncingBallMsg,
				$author$project$Vector$BouncingBall$subscriptions(subModel));
		case 33:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$ForcesMutualRepulsionMsg,
				$author$project$Forces$MutualRepulsion$subscriptions(subModel));
		case 34:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$NoiseRandomBoxMsg,
				$author$project$Noise$RandomBox$subscriptions(subModel));
		case 35:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$OscillationsSimpleHarmonicMotionWithAngleMsg,
				$author$project$Oscillations$SimpleHarmonicMotionWithAngle$subscriptions(subModel));
		case 36:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$RandomWalksLevyMsg,
				$author$project$RandomWalks$Levy$subscriptions(subModel));
		case 37:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$VectorBouncingBallWithVectorMsg,
				$author$project$Vector$BouncingBallWithVector$subscriptions(subModel));
		case 38:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$ForcesResistanceMsg,
				$author$project$Forces$Resistance$subscriptions(subModel));
		case 39:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$OscillationsSineWaveMsg,
				$author$project$Oscillations$SineWave$subscriptions(subModel));
		case 40:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$RandomWalksMonteCarloMsg,
				$author$project$RandomWalks$MonteCarlo$subscriptions(subModel));
		case 41:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$VectorBrakingCarMsg,
				$author$project$Vector$BrakingCar$subscriptions(subModel));
		case 42:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$ForcesSingleOrbitMsg,
				$author$project$Forces$SingleOrbit$subscriptions(subModel));
		case 43:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$OscillationsStaticSineWaveMsg,
				$author$project$Oscillations$StaticSineWave$subscriptions(subModel));
		case 44:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$RandomWalksNormalDistributionMsg,
				$author$project$RandomWalks$NormalDistribution$subscriptions(subModel));
		case 45:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$VectorConstantAccelerationMsg,
				$author$project$Vector$ConstantAcceleration$subscriptions(subModel));
		case 46:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$ForcesSinkingLogsMsg,
				$author$project$Forces$SinkingLogs$subscriptions(subModel));
		case 47:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$RandomWalksPaintSplatterMsg,
				$author$project$RandomWalks$PaintSplatter$subscriptions(subModel));
		case 48:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$VectorConstantVelocityMsg,
				$author$project$Vector$ConstantVelocity$subscriptions(subModel));
		case 49:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$ForcesWallBallsMsg,
				$author$project$Forces$WallBalls$subscriptions(subModel));
		case 50:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$VectorGroupAccelerateTowardsMouseMsg,
				$author$project$Vector$GroupAccelerateTowardsMouse$subscriptions(subModel));
		case 51:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$VectorMouseStalkerMsg,
				$author$project$Vector$MouseStalker$subscriptions(subModel));
		case 52:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$VectorMouseTracingMsg,
				$author$project$Vector$MouseTracing$subscriptions(subModel));
		case 53:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$VectorMouseTracingNormalizedMsg,
				$author$project$Vector$MouseTracingNormalized$subscriptions(subModel));
		case 54:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$VectorMouseTracingScaledMsg,
				$author$project$Vector$MouseTracingScaled$subscriptions(subModel));
		case 55:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$VectorMouseTracingWithMagnitudeMsg,
				$author$project$Vector$MouseTracingWithMagnitude$subscriptions(subModel));
		case 56:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$VectorRandomAccelerationMsg,
				$author$project$Vector$RandomAcceleration$subscriptions(subModel));
		case 57:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$VectorScalingSaberMsg,
				$author$project$Vector$ScalingSaber$subscriptions(subModel));
		default:
			var subModel = _v0.a;
			return A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$VectorWalkerWithVectorMsg,
				$author$project$Vector$WalkerWithVector$subscriptions(subModel));
	}
};
var $author$project$Main$AngularMovementAccelerateTowardsMouseAnim = function (a) {
	return {$: 1, a: a};
};
var $author$project$Main$AngularMovementAcceleratingBatonAnim = function (a) {
	return {$: 2, a: a};
};
var $author$project$Main$AngularMovementFallingBoulderAnim = function (a) {
	return {$: 5, a: a};
};
var $author$project$Main$AngularMovementManyOrbitsWithDynamicRotationAnim = function (a) {
	return {$: 8, a: a};
};
var $author$project$Main$AngularMovementManyOrbitsWithRotationAnim = function (a) {
	return {$: 12, a: a};
};
var $author$project$Main$AngularMovementPolarSwingAnim = function (a) {
	return {$: 16, a: a};
};
var $author$project$Main$AngularMovementSpinningBatonAnim = function (a) {
	return {$: 21, a: a};
};
var $author$project$Main$AngularMovementSpiralDrawerAnim = function (a) {
	return {$: 27, a: a};
};
var $author$project$Main$ForcesArtworkGeneratorAnim = function (a) {
	return {$: 3, a: a};
};
var $author$project$Main$ForcesBlowingWindAnim = function (a) {
	return {$: 4, a: a};
};
var $author$project$Main$ForcesBlowingWindWithGravityAndFrictionAnim = function (a) {
	return {$: 9, a: a};
};
var $author$project$Main$ForcesBlowingWindWithGravityAnim = function (a) {
	return {$: 6, a: a};
};
var $author$project$Main$ForcesFloatingBalloonAnim = function (a) {
	return {$: 13, a: a};
};
var $author$project$Main$ForcesManyBallsAnim = function (a) {
	return {$: 17, a: a};
};
var $author$project$Main$ForcesManyOrbitsAnim = function (a) {
	return {$: 22, a: a};
};
var $author$project$Main$ForcesMutualAttractionAnim = function (a) {
	return {$: 28, a: a};
};
var $author$project$Main$ForcesMutualRepulsionAnim = function (a) {
	return {$: 33, a: a};
};
var $author$project$Main$ForcesResistanceAnim = function (a) {
	return {$: 38, a: a};
};
var $author$project$Main$ForcesSingleOrbitAnim = function (a) {
	return {$: 42, a: a};
};
var $author$project$Main$ForcesSinkingLogsAnim = function (a) {
	return {$: 46, a: a};
};
var $author$project$Main$ForcesWallBallsAnim = function (a) {
	return {$: 49, a: a};
};
var $author$project$Main$NoiseAnimatedBoxAnim = function (a) {
	return {$: 7, a: a};
};
var $author$project$Main$NoiseMountainRangeAnim = function (a) {
	return {$: 10, a: a};
};
var $author$project$Main$NoisePerlinAnim = function (a) {
	return {$: 14, a: a};
};
var $author$project$Main$NoisePerlinBoxAnim = function (a) {
	return {$: 18, a: a};
};
var $author$project$Main$NoisePerlinStepWalkerAnim = function (a) {
	return {$: 23, a: a};
};
var $author$project$Main$NoisePerlinWalkerAnim = function (a) {
	return {$: 29, a: a};
};
var $author$project$Main$NoiseRandomBoxAnim = function (a) {
	return {$: 34, a: a};
};
var $author$project$Main$OscillationsManyWavesAnim = function (a) {
	return {$: 11, a: a};
};
var $author$project$Main$OscillationsOscillatorsAnim = function (a) {
	return {$: 15, a: a};
};
var $author$project$Main$OscillationsPendulumAnim = function (a) {
	return {$: 19, a: a};
};
var $author$project$Main$OscillationsRainbowSlinkyAnim = function (a) {
	return {$: 24, a: a};
};
var $author$project$Main$OscillationsSimpleHarmonicMotionAnim = function (a) {
	return {$: 30, a: a};
};
var $author$project$Main$OscillationsSimpleHarmonicMotionWithAngleAnim = function (a) {
	return {$: 35, a: a};
};
var $author$project$Main$OscillationsSineWaveAnim = function (a) {
	return {$: 39, a: a};
};
var $author$project$Main$OscillationsStaticSineWaveAnim = function (a) {
	return {$: 43, a: a};
};
var $author$project$Main$RandomWalksDirectedAnim = function (a) {
	return {$: 20, a: a};
};
var $author$project$Main$RandomWalksGaussianAnim = function (a) {
	return {$: 25, a: a};
};
var $author$project$Main$RandomWalksImprovedAnim = function (a) {
	return {$: 31, a: a};
};
var $author$project$Main$RandomWalksLevyAnim = function (a) {
	return {$: 36, a: a};
};
var $author$project$Main$RandomWalksMonteCarloAnim = function (a) {
	return {$: 40, a: a};
};
var $author$project$Main$RandomWalksNormalDistributionAnim = function (a) {
	return {$: 44, a: a};
};
var $author$project$Main$RandomWalksPaintSplatterAnim = function (a) {
	return {$: 47, a: a};
};
var $author$project$Main$VectorAccelerateTowardsMouseAnim = function (a) {
	return {$: 26, a: a};
};
var $author$project$Main$VectorBouncingBallAnim = function (a) {
	return {$: 32, a: a};
};
var $author$project$Main$VectorBouncingBallWithVectorAnim = function (a) {
	return {$: 37, a: a};
};
var $author$project$Main$VectorBrakingCarAnim = function (a) {
	return {$: 41, a: a};
};
var $author$project$Main$VectorConstantAccelerationAnim = function (a) {
	return {$: 45, a: a};
};
var $author$project$Main$VectorConstantVelocityAnim = function (a) {
	return {$: 48, a: a};
};
var $author$project$Main$VectorGroupAccelerateTowardsMouseAnim = function (a) {
	return {$: 50, a: a};
};
var $author$project$Main$VectorMouseStalkerAnim = function (a) {
	return {$: 51, a: a};
};
var $author$project$Main$VectorMouseTracingAnim = function (a) {
	return {$: 52, a: a};
};
var $author$project$Main$VectorMouseTracingNormalizedAnim = function (a) {
	return {$: 53, a: a};
};
var $author$project$Main$VectorMouseTracingScaledAnim = function (a) {
	return {$: 54, a: a};
};
var $author$project$Main$VectorMouseTracingWithMagnitudeAnim = function (a) {
	return {$: 55, a: a};
};
var $author$project$Main$VectorRandomAccelerationAnim = function (a) {
	return {$: 56, a: a};
};
var $author$project$Main$VectorScalingSaberAnim = function (a) {
	return {$: 57, a: a};
};
var $author$project$Main$VectorWalkerWithVectorAnim = function (a) {
	return {$: 58, a: a};
};
var $mdgriffith$elm_ui$Element$BigDesktop = 3;
var $mdgriffith$elm_ui$Element$Desktop = 2;
var $mdgriffith$elm_ui$Element$Landscape = 1;
var $mdgriffith$elm_ui$Element$Phone = 0;
var $mdgriffith$elm_ui$Element$Portrait = 0;
var $mdgriffith$elm_ui$Element$Tablet = 1;
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $mdgriffith$elm_ui$Element$classifyDevice = function (window) {
	return {
		dW: function () {
			var shortSide = A2($elm$core$Basics$min, window.ch, window.bh);
			var longSide = A2($elm$core$Basics$max, window.ch, window.bh);
			return (shortSide < 600) ? 0 : ((longSide <= 1200) ? 1 : (((longSide > 1200) && (longSide <= 1920)) ? 2 : 3));
		}(),
		eV: (_Utils_cmp(window.ch, window.bh) < 0) ? 0 : 1
	};
};
var $elm_explorations$linear_algebra$Math$Vector2$vec2 = _MJS_v2;
var $author$project$AngularMovement$AccelerateTowardsMouse$defaultPosition = A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 300, 300);
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$AngularMovement$AccelerateTowardsMouse$init = function (_v0) {
	return _Utils_Tuple2(
		{
			a3: 0,
			a4: 10,
			a5: 20,
			bj: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0),
			ax: $author$project$AngularMovement$AccelerateTowardsMouse$defaultPosition,
			by: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0)
		},
		$elm$core$Platform$Cmd$none);
};
var $author$project$AngularMovement$AcceleratingBaton$init = function (_v0) {
	return _Utils_Tuple2(
		{bH: 0.005, a3: 0, aP: 0},
		$elm$core$Platform$Cmd$none);
};
var $author$project$AngularMovement$FallingBoulder$init = function (_v0) {
	return _Utils_Tuple2(
		{
			ak: 35,
			b0: 1,
			aP: 0,
			ax: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0),
			aV: false,
			aE: 0,
			by: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0)
		},
		$elm$core$Platform$Cmd$none);
};
var $author$project$AngularMovement$ManyOrbitsWithDynamicRotation$GetMovers = function (a) {
	return {$: 6, a: a};
};
var $author$project$AngularMovement$ManyOrbitsWithDynamicRotation$height = 600;
var $elm$random$Random$listHelp = F4(
	function (revList, n, gen, seed) {
		listHelp:
		while (true) {
			if (n < 1) {
				return _Utils_Tuple2(revList, seed);
			} else {
				var _v0 = gen(seed);
				var value = _v0.a;
				var newSeed = _v0.b;
				var $temp$revList = A2($elm$core$List$cons, value, revList),
					$temp$n = n - 1,
					$temp$gen = gen,
					$temp$seed = newSeed;
				revList = $temp$revList;
				n = $temp$n;
				gen = $temp$gen;
				seed = $temp$seed;
				continue listHelp;
			}
		}
	});
var $elm$random$Random$list = F2(
	function (n, _v0) {
		var gen = _v0;
		return function (seed) {
			return A4($elm$random$Random$listHelp, _List_Nil, n, gen, seed);
		};
	});
var $elm$random$Random$map2 = F3(
	function (func, _v0, _v1) {
		var genA = _v0;
		var genB = _v1;
		return function (seed0) {
			var _v2 = genA(seed0);
			var a = _v2.a;
			var seed1 = _v2.b;
			var _v3 = genB(seed1);
			var b = _v3.a;
			var seed2 = _v3.b;
			return _Utils_Tuple2(
				A2(func, a, b),
				seed2);
		};
	});
var $author$project$AngularMovement$ManyOrbitsWithDynamicRotation$width = 600;
var $author$project$AngularMovement$ManyOrbitsWithDynamicRotation$generateMovers = A2(
	$elm$random$Random$generate,
	$author$project$AngularMovement$ManyOrbitsWithDynamicRotation$GetMovers,
	A2(
		$elm$random$Random$list,
		10,
		A3(
			$elm$random$Random$map2,
			F2(
				function (mass, position) {
					return {
						bH: 0.01,
						a3: 0,
						b0: mass,
						aP: 0,
						ax: position,
						by: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 1, 0)
					};
				}),
			A2($elm$random$Random$float, 0.2, 1),
			A3(
				$elm$random$Random$map2,
				$elm_explorations$linear_algebra$Math$Vector2$vec2,
				A2($elm$random$Random$float, 0, $author$project$AngularMovement$ManyOrbitsWithDynamicRotation$width),
				A2($elm$random$Random$float, 0, $author$project$AngularMovement$ManyOrbitsWithDynamicRotation$height)))));
var $zaboco$elm_draggable$Internal$NotDragging = {$: 0};
var $zaboco$elm_draggable$Draggable$State = $elm$core$Basics$identity;
var $zaboco$elm_draggable$Draggable$init = $zaboco$elm_draggable$Internal$NotDragging;
var $avh4$elm_color$Color$RgbaSpace = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $avh4$elm_color$Color$lightBlue = A4($avh4$elm_color$Color$RgbaSpace, 114 / 255, 159 / 255, 207 / 255, 1.0);
var $author$project$AngularMovement$ManyOrbitsWithDynamicRotation$init = function (_v0) {
	return _Utils_Tuple2(
		{
			F: {
				bf: $avh4$elm_color$Color$lightBlue,
				b0: 2,
				ax: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, $author$project$AngularMovement$ManyOrbitsWithDynamicRotation$width / 2, $author$project$AngularMovement$ManyOrbitsWithDynamicRotation$height / 2)
			},
			bS: $zaboco$elm_draggable$Draggable$init,
			at: _List_Nil
		},
		$author$project$AngularMovement$ManyOrbitsWithDynamicRotation$generateMovers);
};
var $author$project$AngularMovement$ManyOrbitsWithRotation$GetMovers = function (a) {
	return {$: 6, a: a};
};
var $author$project$AngularMovement$ManyOrbitsWithRotation$height = 600;
var $author$project$AngularMovement$ManyOrbitsWithRotation$width = 600;
var $author$project$AngularMovement$ManyOrbitsWithRotation$generateMovers = A2(
	$elm$random$Random$generate,
	$author$project$AngularMovement$ManyOrbitsWithRotation$GetMovers,
	A2(
		$elm$random$Random$list,
		10,
		A3(
			$elm$random$Random$map2,
			F2(
				function (mass, position) {
					return {
						cl: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0),
						bH: 0.01,
						a3: 0,
						b0: mass,
						aP: 0,
						ax: position,
						by: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 1, 0)
					};
				}),
			A2($elm$random$Random$float, 0.2, 1),
			A3(
				$elm$random$Random$map2,
				$elm_explorations$linear_algebra$Math$Vector2$vec2,
				A2($elm$random$Random$float, 0, $author$project$AngularMovement$ManyOrbitsWithRotation$width),
				A2($elm$random$Random$float, 0, $author$project$AngularMovement$ManyOrbitsWithRotation$height)))));
var $author$project$AngularMovement$ManyOrbitsWithRotation$init = function (_v0) {
	return _Utils_Tuple2(
		{
			F: {
				bf: $avh4$elm_color$Color$lightBlue,
				b0: 2,
				ax: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, $author$project$AngularMovement$ManyOrbitsWithRotation$width / 2, $author$project$AngularMovement$ManyOrbitsWithRotation$height / 2)
			},
			bS: $zaboco$elm_draggable$Draggable$init,
			at: _List_Nil
		},
		$author$project$AngularMovement$ManyOrbitsWithRotation$generateMovers);
};
var $author$project$AngularMovement$PolarSwing$defaultPosition = _Utils_Tuple2(100, 0);
var $author$project$AngularMovement$PolarSwing$init = function (_v0) {
	return _Utils_Tuple2(
		{ak: 20, ax: $author$project$AngularMovement$PolarSwing$defaultPosition, di: 100},
		$elm$core$Platform$Cmd$none);
};
var $author$project$AngularMovement$SpinningBaton$init = function (_v0) {
	return _Utils_Tuple2(
		{a3: 0},
		$elm$core$Platform$Cmd$none);
};
var $author$project$AngularMovement$SpiralDrawer$defaultPosition = _Utils_Tuple2(0, 0);
var $author$project$AngularMovement$SpiralDrawer$init = function (_v0) {
	return _Utils_Tuple2(
		{ak: 20, aQ: _List_Nil, ax: $author$project$AngularMovement$SpiralDrawer$defaultPosition, di: 100},
		$elm$core$Platform$Cmd$none);
};
var $author$project$Forces$ArtworkGenerator$GetMoverPaths = function (a) {
	return {$: 6, a: a};
};
var $author$project$Forces$ArtworkGenerator$height = 600;
var $author$project$Forces$ArtworkGenerator$width = 600;
var $author$project$Forces$ArtworkGenerator$generateMoverPaths = A2(
	$elm$random$Random$generate,
	$author$project$Forces$ArtworkGenerator$GetMoverPaths,
	A2(
		$elm$random$Random$list,
		2,
		A3(
			$elm$random$Random$map2,
			F2(
				function (mass, position) {
					return _List_fromArray(
						[
							{
							cl: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0),
							b0: mass,
							ax: position,
							by: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 1, 0)
						}
						]);
				}),
			A2($elm$random$Random$float, 0.2, 1),
			A3(
				$elm$random$Random$map2,
				$elm_explorations$linear_algebra$Math$Vector2$vec2,
				A2($elm$random$Random$float, 0, $author$project$Forces$ArtworkGenerator$width),
				A2($elm$random$Random$float, 0, $author$project$Forces$ArtworkGenerator$height)))));
var $author$project$Forces$ArtworkGenerator$init = function (_v0) {
	return _Utils_Tuple2(
		{
			F: {
				bf: $avh4$elm_color$Color$lightBlue,
				b0: 2,
				ax: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, $author$project$Forces$ArtworkGenerator$width / 2, $author$project$Forces$ArtworkGenerator$height / 2)
			},
			bS: $zaboco$elm_draggable$Draggable$init,
			as: _List_Nil
		},
		$author$project$Forces$ArtworkGenerator$generateMoverPaths);
};
var $author$project$Forces$BlowingWind$height = 600;
var $author$project$Forces$BlowingWind$init = function (_v0) {
	return _Utils_Tuple2(
		{
			cl: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0),
			ak: 20,
			b0: 1,
			ax: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 40, $author$project$Forces$BlowingWind$height / 2),
			by: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0)
		},
		$elm$core$Platform$Cmd$none);
};
var $author$project$Forces$BlowingWindWithGravity$GetBalls = function (a) {
	return {$: 1, a: a};
};
var $author$project$Forces$BlowingWindWithGravity$height = 600;
var $author$project$Forces$BlowingWindWithGravity$width = 600;
var $author$project$Forces$BlowingWindWithGravity$randomBalls = A2(
	$elm$random$Random$generate,
	$author$project$Forces$BlowingWindWithGravity$GetBalls,
	A2(
		$elm$random$Random$list,
		10,
		A3(
			$elm$random$Random$map2,
			F2(
				function (mass, x) {
					return {
						cl: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0),
						b0: mass,
						ax: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, x, $author$project$Forces$BlowingWindWithGravity$height / 2),
						by: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0)
					};
				}),
			A2($elm$random$Random$float, 0.1, 1),
			A2($elm$random$Random$float, 0, $author$project$Forces$BlowingWindWithGravity$width))));
var $author$project$Forces$BlowingWindWithGravity$init = function (_v0) {
	return _Utils_Tuple2(
		{al: _List_Nil},
		$author$project$Forces$BlowingWindWithGravity$randomBalls);
};
var $author$project$Forces$BlowingWindWithGravityAndFriction$GetBalls = function (a) {
	return {$: 1, a: a};
};
var $author$project$Forces$BlowingWindWithGravityAndFriction$height = 600;
var $author$project$Forces$BlowingWindWithGravityAndFriction$width = 600;
var $author$project$Forces$BlowingWindWithGravityAndFriction$randomBalls = A2(
	$elm$random$Random$generate,
	$author$project$Forces$BlowingWindWithGravityAndFriction$GetBalls,
	A2(
		$elm$random$Random$list,
		10,
		A3(
			$elm$random$Random$map2,
			F2(
				function (mass, x) {
					return {
						cl: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0),
						b0: mass,
						ax: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, x, $author$project$Forces$BlowingWindWithGravityAndFriction$height / 2),
						by: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0)
					};
				}),
			A2($elm$random$Random$float, 0.1, 1),
			A2($elm$random$Random$float, 0, $author$project$Forces$BlowingWindWithGravityAndFriction$width))));
var $author$project$Forces$BlowingWindWithGravityAndFriction$init = function (_v0) {
	return _Utils_Tuple2(
		{al: _List_Nil},
		$author$project$Forces$BlowingWindWithGravityAndFriction$randomBalls);
};
var $author$project$Forces$FloatingBalloon$height = 600;
var $author$project$Forces$FloatingBalloon$width = 600;
var $author$project$Forces$FloatingBalloon$init = function (_v0) {
	return _Utils_Tuple2(
		{
			cl: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0),
			bh: 100,
			b0: 1,
			ax: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, $author$project$Forces$FloatingBalloon$width / 2, $author$project$Forces$FloatingBalloon$height - 100),
			by: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0),
			ch: 70
		},
		$elm$core$Platform$Cmd$none);
};
var $author$project$Forces$ManyBalls$GetBalls = function (a) {
	return {$: 1, a: a};
};
var $author$project$Forces$ManyBalls$height = 600;
var $author$project$Forces$ManyBalls$width = 600;
var $author$project$Forces$ManyBalls$randomBalls = A2(
	$elm$random$Random$generate,
	$author$project$Forces$ManyBalls$GetBalls,
	A2(
		$elm$random$Random$list,
		10,
		A3(
			$elm$random$Random$map2,
			F2(
				function (mass, position) {
					return {
						cl: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0),
						b0: mass,
						ax: position,
						by: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0)
					};
				}),
			A2($elm$random$Random$float, 0.1, 1),
			A3(
				$elm$random$Random$map2,
				$elm_explorations$linear_algebra$Math$Vector2$vec2,
				A2($elm$random$Random$float, 0, $author$project$Forces$ManyBalls$width),
				A2($elm$random$Random$float, 0, $author$project$Forces$ManyBalls$height)))));
var $author$project$Forces$ManyBalls$init = function (_v0) {
	return _Utils_Tuple2(
		{al: _List_Nil},
		$author$project$Forces$ManyBalls$randomBalls);
};
var $author$project$Forces$ManyOrbits$GetMovers = function (a) {
	return {$: 6, a: a};
};
var $author$project$Forces$ManyOrbits$height = 600;
var $author$project$Forces$ManyOrbits$width = 600;
var $author$project$Forces$ManyOrbits$generateMovers = A2(
	$elm$random$Random$generate,
	$author$project$Forces$ManyOrbits$GetMovers,
	A2(
		$elm$random$Random$list,
		10,
		A3(
			$elm$random$Random$map2,
			F2(
				function (mass, position) {
					return {
						cl: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0),
						b0: mass,
						ax: position,
						by: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 1, 0)
					};
				}),
			A2($elm$random$Random$float, 0.2, 1),
			A3(
				$elm$random$Random$map2,
				$elm_explorations$linear_algebra$Math$Vector2$vec2,
				A2($elm$random$Random$float, 0, $author$project$Forces$ManyOrbits$width),
				A2($elm$random$Random$float, 0, $author$project$Forces$ManyOrbits$height)))));
var $author$project$Forces$ManyOrbits$init = function (_v0) {
	return _Utils_Tuple2(
		{
			F: {
				bf: $avh4$elm_color$Color$lightBlue,
				b0: 2,
				ax: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, $author$project$Forces$ManyOrbits$width / 2, $author$project$Forces$ManyOrbits$height / 2)
			},
			bS: $zaboco$elm_draggable$Draggable$init,
			at: _List_Nil
		},
		$author$project$Forces$ManyOrbits$generateMovers);
};
var $author$project$Forces$MutualAttraction$GetMovers = function (a) {
	return {$: 1, a: a};
};
var $author$project$Forces$MutualAttraction$height = 600;
var $elm$core$Basics$cos = _Basics_cos;
var $elm$core$Basics$e = _Basics_e;
var $elm$core$Basics$pi = _Basics_pi;
var $elm$core$Basics$sqrt = _Basics_sqrt;
var $elm_community$random_extra$Random$Float$standardNormal = A3(
	$elm$random$Random$map2,
	F2(
		function (u, theta) {
			return $elm$core$Basics$sqrt(
				(-2) * A2(
					$elm$core$Basics$logBase,
					$elm$core$Basics$e,
					1 - A2($elm$core$Basics$max, 0, u))) * $elm$core$Basics$cos(theta);
		}),
	A2($elm$random$Random$float, 0, 1),
	A2($elm$random$Random$float, 0, 2 * $elm$core$Basics$pi));
var $elm_community$random_extra$Random$Float$normal = F2(
	function (mean, stdDev) {
		return A2(
			$elm$random$Random$map,
			function (u) {
				return (u * stdDev) + mean;
			},
			$elm_community$random_extra$Random$Float$standardNormal);
	});
var $author$project$Forces$MutualAttraction$width = 600;
var $author$project$Forces$MutualAttraction$generateMovers = A2(
	$elm$random$Random$generate,
	$author$project$Forces$MutualAttraction$GetMovers,
	A2(
		$elm$random$Random$list,
		10,
		A3(
			$elm$random$Random$map2,
			F2(
				function (mass, position) {
					return {
						cl: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0),
						b0: mass,
						ax: position,
						by: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0)
					};
				}),
			A2($elm_community$random_extra$Random$Float$normal, 0.7, 0.7),
			A3(
				$elm$random$Random$map2,
				$elm_explorations$linear_algebra$Math$Vector2$vec2,
				A2($elm$random$Random$float, 0, $author$project$Forces$MutualAttraction$width),
				A2($elm$random$Random$float, 0, $author$project$Forces$MutualAttraction$height)))));
var $author$project$Forces$MutualAttraction$init = function (_v0) {
	return _Utils_Tuple2(
		{at: _List_Nil},
		$author$project$Forces$MutualAttraction$generateMovers);
};
var $author$project$Forces$MutualRepulsion$GetMovers = function (a) {
	return {$: 1, a: a};
};
var $author$project$Forces$MutualRepulsion$height = 600;
var $author$project$Forces$MutualRepulsion$width = 600;
var $author$project$Forces$MutualRepulsion$generateMovers = A2(
	$elm$random$Random$generate,
	$author$project$Forces$MutualRepulsion$GetMovers,
	A2(
		$elm$random$Random$list,
		10,
		A3(
			$elm$random$Random$map2,
			F2(
				function (mass, position) {
					return {
						cl: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0),
						b0: mass,
						ax: position,
						by: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0)
					};
				}),
			A2($elm_community$random_extra$Random$Float$normal, 0.7, 0.7),
			A3(
				$elm$random$Random$map2,
				$elm_explorations$linear_algebra$Math$Vector2$vec2,
				A2($elm$random$Random$float, 0, $author$project$Forces$MutualRepulsion$width),
				A2($elm$random$Random$float, 0, $author$project$Forces$MutualRepulsion$height)))));
var $author$project$Forces$MutualRepulsion$init = function (_v0) {
	return _Utils_Tuple2(
		{at: _List_Nil},
		$author$project$Forces$MutualRepulsion$generateMovers);
};
var $author$project$Forces$Resistance$height = 600;
var $author$project$Forces$Resistance$GetBalls = function (a) {
	return {$: 1, a: a};
};
var $author$project$Forces$Resistance$width = 600;
var $author$project$Forces$Resistance$randomBalls = A2(
	$elm$random$Random$generate,
	$author$project$Forces$Resistance$GetBalls,
	A2(
		$elm$random$Random$list,
		10,
		A3(
			$elm$random$Random$map2,
			F2(
				function (mass, x) {
					return {
						cl: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0),
						b0: mass,
						ax: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, x, 20),
						by: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0)
					};
				}),
			A2($elm$random$Random$float, 0.2, 1),
			A2($elm$random$Random$float, 0, $author$project$Forces$Resistance$width))));
var $author$project$Forces$Resistance$init = function (_v0) {
	return _Utils_Tuple2(
		{
			al: _List_Nil,
			bq: {
				bP: $avh4$elm_color$Color$lightBlue,
				bS: 0.02,
				bh: $author$project$Forces$Resistance$height / 2,
				ax: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, $author$project$Forces$Resistance$height / 2),
				ch: $author$project$Forces$Resistance$width
			}
		},
		$author$project$Forces$Resistance$randomBalls);
};
var $author$project$Forces$SingleOrbit$height = 600;
var $author$project$Forces$SingleOrbit$width = 600;
var $author$project$Forces$SingleOrbit$init = function (_v0) {
	return _Utils_Tuple2(
		{
			F: {
				bf: $avh4$elm_color$Color$lightBlue,
				b0: 2,
				ax: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, $author$project$Forces$SingleOrbit$width / 2, $author$project$Forces$SingleOrbit$height / 2)
			},
			bS: $zaboco$elm_draggable$Draggable$init,
			z: {
				cl: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0),
				b0: 0.5,
				ax: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 40, 40),
				by: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 1, 0)
			}
		},
		$elm$core$Platform$Cmd$none);
};
var $author$project$Forces$SinkingLogs$height = 600;
var $author$project$Forces$SinkingLogs$GetLogs = function (a) {
	return {$: 1, a: a};
};
var $author$project$Forces$SinkingLogs$width = 600;
var $author$project$Forces$SinkingLogs$randomLogs = A2(
	$elm$random$Random$generate,
	$author$project$Forces$SinkingLogs$GetLogs,
	A2(
		$elm$random$Random$list,
		10,
		A3(
			$elm$random$Random$map2,
			F2(
				function (w, x) {
					return {
						cl: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0),
						bh: 15,
						b0: 1,
						ax: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, x, 20),
						by: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0),
						ch: w
					};
				}),
			A2($elm$random$Random$float, 20, 40),
			A2($elm$random$Random$float, 0, $author$project$Forces$SinkingLogs$width))));
var $author$project$Forces$SinkingLogs$init = function (_v0) {
	return _Utils_Tuple2(
		{
			ar: _List_Nil,
			bq: {
				bP: $avh4$elm_color$Color$lightBlue,
				bS: 0.02,
				bh: $author$project$Forces$SinkingLogs$height / 2,
				ax: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, $author$project$Forces$SinkingLogs$height / 2),
				ch: $author$project$Forces$SinkingLogs$width
			}
		},
		$author$project$Forces$SinkingLogs$randomLogs);
};
var $author$project$Forces$WallBalls$GetBalls = function (a) {
	return {$: 1, a: a};
};
var $author$project$Forces$WallBalls$height = 600;
var $author$project$Forces$WallBalls$width = 600;
var $author$project$Forces$WallBalls$randomBalls = A2(
	$elm$random$Random$generate,
	$author$project$Forces$WallBalls$GetBalls,
	A2(
		$elm$random$Random$list,
		10,
		A3(
			$elm$random$Random$map2,
			F2(
				function (mass, position) {
					return {
						cl: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0),
						b0: mass,
						ax: position,
						by: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0)
					};
				}),
			A2($elm$random$Random$float, 0.3, 1),
			A3(
				$elm$random$Random$map2,
				$elm_explorations$linear_algebra$Math$Vector2$vec2,
				A2($elm$random$Random$float, 0, $author$project$Forces$WallBalls$width),
				A2($elm$random$Random$float, 0, $author$project$Forces$WallBalls$height)))));
var $author$project$Forces$WallBalls$init = function (_v0) {
	return _Utils_Tuple2(
		{al: _List_Nil},
		$author$project$Forces$WallBalls$randomBalls);
};
var $author$project$Noise$AnimatedBox$height = 100;
var $author$project$Noise$SimplexNoise$f3 = 1 / 3;
var $author$project$Noise$SimplexNoise$g3 = 1 / 6;
var $elm$core$Basics$ge = _Utils_ge;
var $author$project$Noise$SimplexNoise$getCornerOffset3d = F3(
	function (x, y, z) {
		return (_Utils_cmp(x, y) > -1) ? ((_Utils_cmp(y, z) > -1) ? _Utils_Tuple2(
			_Utils_Tuple3(1, 0, 0),
			_Utils_Tuple3(1, 1, 0)) : ((_Utils_cmp(x, z) > -1) ? _Utils_Tuple2(
			_Utils_Tuple3(1, 0, 0),
			_Utils_Tuple3(1, 0, 1)) : _Utils_Tuple2(
			_Utils_Tuple3(0, 0, 1),
			_Utils_Tuple3(1, 0, 1)))) : ((_Utils_cmp(y, z) < 0) ? _Utils_Tuple2(
			_Utils_Tuple3(0, 0, 1),
			_Utils_Tuple3(0, 1, 1)) : ((_Utils_cmp(x, z) < 0) ? _Utils_Tuple2(
			_Utils_Tuple3(0, 1, 0),
			_Utils_Tuple3(0, 1, 1)) : _Utils_Tuple2(
			_Utils_Tuple3(0, 1, 0),
			_Utils_Tuple3(1, 1, 0))));
	});
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!_v0.$) {
				var subTree = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _v0.a;
				return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
			}
		}
	});
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$get = F2(
	function (index, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
			A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
			A3($elm$core$Array$getHelp, startShift, index, tree)));
	});
var $author$project$Noise$SimplexNoise$get = F2(
	function (arr, i) {
		var _v0 = A2($elm$core$Array$get, i, arr);
		if (!_v0.$) {
			var x = _v0.a;
			return x;
		} else {
			return 0;
		}
	});
var $elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
			var jsArray = _v0.a;
			var remainingItems = _v0.b;
			if (_Utils_cmp(
				$elm$core$Elm$JsArray$length(jsArray),
				$elm$core$Array$branchFactor) < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					true,
					{h: nodeList, d: nodeListSize, g: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					$elm$core$List$cons,
					$elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return A3($elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var $author$project$Noise$SimplexNoise$grad3 = $elm$core$Array$fromList(
	_List_fromArray(
		[1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1]));
var $author$project$Noise$SimplexNoise$getN3d = F8(
	function (x, y, z, i, j, k, perm, permMod12) {
		var t = ((0.6 - (x * x)) - (y * y)) - (z * z);
		if (t < 0) {
			return 0;
		} else {
			var t_ = t * t;
			var gi = A2(
				$author$project$Noise$SimplexNoise$get,
				permMod12,
				i + A2(
					$author$project$Noise$SimplexNoise$get,
					perm,
					j + A2($author$project$Noise$SimplexNoise$get, perm, k))) * 3;
			return (t_ * t_) * (((A2($author$project$Noise$SimplexNoise$get, $author$project$Noise$SimplexNoise$grad3, gi) * x) + (A2($author$project$Noise$SimplexNoise$get, $author$project$Noise$SimplexNoise$grad3, gi + 1) * y)) + (A2($author$project$Noise$SimplexNoise$get, $author$project$Noise$SimplexNoise$grad3, gi + 2) * z));
		}
	});
var $author$project$Noise$SimplexNoise$noise3d = F4(
	function (_v0, xin, yin, zin) {
		var perm = _v0.aR;
		var permMod12 = _v0.aS;
		var s = ((xin + yin) + zin) * $author$project$Noise$SimplexNoise$f3;
		var k = $elm$core$Basics$floor(zin + s);
		var kk = k & 255;
		var j = $elm$core$Basics$floor(yin + s);
		var jj = j & 255;
		var i = $elm$core$Basics$floor(xin + s);
		var ii = i & 255;
		var t = ((i + j) + k) * $author$project$Noise$SimplexNoise$g3;
		var y0_ = j - t;
		var y0 = yin - y0_;
		var y3 = (y0 - 1) + (3 * $author$project$Noise$SimplexNoise$g3);
		var z0_ = k - t;
		var z0 = zin - z0_;
		var z3 = (z0 - 1) + (3 * $author$project$Noise$SimplexNoise$g3);
		var x0_ = i - t;
		var x0 = xin - x0_;
		var n0 = A8($author$project$Noise$SimplexNoise$getN3d, x0, y0, z0, ii, jj, kk, perm, permMod12);
		var x3 = (x0 - 1) + (3 * $author$project$Noise$SimplexNoise$g3);
		var n3 = A8($author$project$Noise$SimplexNoise$getN3d, x3, y3, z3, ii + 1, jj + 1, kk + 1, perm, permMod12);
		var _v1 = A3($author$project$Noise$SimplexNoise$getCornerOffset3d, x0, y0, z0);
		var _v2 = _v1.a;
		var i1 = _v2.a;
		var j1 = _v2.b;
		var k1 = _v2.c;
		var _v3 = _v1.b;
		var i2 = _v3.a;
		var j2 = _v3.b;
		var k2 = _v3.c;
		var x1 = (x0 - i1) + $author$project$Noise$SimplexNoise$g3;
		var x2 = (x0 - i2) + (2 * $author$project$Noise$SimplexNoise$g3);
		var y1 = (y0 - j1) + $author$project$Noise$SimplexNoise$g3;
		var y2 = (y0 - j2) + (2 * $author$project$Noise$SimplexNoise$g3);
		var z1 = (z0 - k1) + $author$project$Noise$SimplexNoise$g3;
		var n1 = A8($author$project$Noise$SimplexNoise$getN3d, x1, y1, z1, ii + i1, jj + j1, kk + k1, perm, permMod12);
		var z2 = (z0 - k2) + (2 * $author$project$Noise$SimplexNoise$g3);
		var n2 = A8($author$project$Noise$SimplexNoise$getN3d, x2, y2, z2, ii + i2, jj + j2, kk + k2, perm, permMod12);
		return 32 * (((n0 + n1) + n2) + n3);
	});
var $elm$core$Elm$JsArray$appendN = _JsArray_appendN;
var $elm$core$Elm$JsArray$slice = _JsArray_slice;
var $elm$core$Array$appendHelpBuilder = F2(
	function (tail, builder) {
		var tailLen = $elm$core$Elm$JsArray$length(tail);
		var notAppended = ($elm$core$Array$branchFactor - $elm$core$Elm$JsArray$length(builder.g)) - tailLen;
		var appended = A3($elm$core$Elm$JsArray$appendN, $elm$core$Array$branchFactor, builder.g, tail);
		return (notAppended < 0) ? {
			h: A2(
				$elm$core$List$cons,
				$elm$core$Array$Leaf(appended),
				builder.h),
			d: builder.d + 1,
			g: A3($elm$core$Elm$JsArray$slice, notAppended, tailLen, tail)
		} : ((!notAppended) ? {
			h: A2(
				$elm$core$List$cons,
				$elm$core$Array$Leaf(appended),
				builder.h),
			d: builder.d + 1,
			g: $elm$core$Elm$JsArray$empty
		} : {h: builder.h, d: builder.d, g: appended});
	});
var $elm$core$Elm$JsArray$push = _JsArray_push;
var $elm$core$Elm$JsArray$singleton = _JsArray_singleton;
var $elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var $elm$core$Array$insertTailInTree = F4(
	function (shift, index, tail, tree) {
		var pos = $elm$core$Array$bitMask & (index >>> shift);
		if (_Utils_cmp(
			pos,
			$elm$core$Elm$JsArray$length(tree)) > -1) {
			if (shift === 5) {
				return A2(
					$elm$core$Elm$JsArray$push,
					$elm$core$Array$Leaf(tail),
					tree);
			} else {
				var newSub = $elm$core$Array$SubTree(
					A4($elm$core$Array$insertTailInTree, shift - $elm$core$Array$shiftStep, index, tail, $elm$core$Elm$JsArray$empty));
				return A2($elm$core$Elm$JsArray$push, newSub, tree);
			}
		} else {
			var value = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!value.$) {
				var subTree = value.a;
				var newSub = $elm$core$Array$SubTree(
					A4($elm$core$Array$insertTailInTree, shift - $elm$core$Array$shiftStep, index, tail, subTree));
				return A3($elm$core$Elm$JsArray$unsafeSet, pos, newSub, tree);
			} else {
				var newSub = $elm$core$Array$SubTree(
					A4(
						$elm$core$Array$insertTailInTree,
						shift - $elm$core$Array$shiftStep,
						index,
						tail,
						$elm$core$Elm$JsArray$singleton(value)));
				return A3($elm$core$Elm$JsArray$unsafeSet, pos, newSub, tree);
			}
		}
	});
var $elm$core$Array$unsafeReplaceTail = F2(
	function (newTail, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		var originalTailLen = $elm$core$Elm$JsArray$length(tail);
		var newTailLen = $elm$core$Elm$JsArray$length(newTail);
		var newArrayLen = len + (newTailLen - originalTailLen);
		if (_Utils_eq(newTailLen, $elm$core$Array$branchFactor)) {
			var overflow = _Utils_cmp(newArrayLen >>> $elm$core$Array$shiftStep, 1 << startShift) > 0;
			if (overflow) {
				var newShift = startShift + $elm$core$Array$shiftStep;
				var newTree = A4(
					$elm$core$Array$insertTailInTree,
					newShift,
					len,
					newTail,
					$elm$core$Elm$JsArray$singleton(
						$elm$core$Array$SubTree(tree)));
				return A4($elm$core$Array$Array_elm_builtin, newArrayLen, newShift, newTree, $elm$core$Elm$JsArray$empty);
			} else {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					newArrayLen,
					startShift,
					A4($elm$core$Array$insertTailInTree, startShift, len, newTail, tree),
					$elm$core$Elm$JsArray$empty);
			}
		} else {
			return A4($elm$core$Array$Array_elm_builtin, newArrayLen, startShift, tree, newTail);
		}
	});
var $elm$core$Array$appendHelpTree = F2(
	function (toAppend, array) {
		var len = array.a;
		var tree = array.c;
		var tail = array.d;
		var itemsToAppend = $elm$core$Elm$JsArray$length(toAppend);
		var notAppended = ($elm$core$Array$branchFactor - $elm$core$Elm$JsArray$length(tail)) - itemsToAppend;
		var appended = A3($elm$core$Elm$JsArray$appendN, $elm$core$Array$branchFactor, tail, toAppend);
		var newArray = A2($elm$core$Array$unsafeReplaceTail, appended, array);
		if (notAppended < 0) {
			var nextTail = A3($elm$core$Elm$JsArray$slice, notAppended, itemsToAppend, toAppend);
			return A2($elm$core$Array$unsafeReplaceTail, nextTail, newArray);
		} else {
			return newArray;
		}
	});
var $elm$core$Elm$JsArray$foldl = _JsArray_foldl;
var $elm$core$Array$builderFromArray = function (_v0) {
	var len = _v0.a;
	var tree = _v0.c;
	var tail = _v0.d;
	var helper = F2(
		function (node, acc) {
			if (!node.$) {
				var subTree = node.a;
				return A3($elm$core$Elm$JsArray$foldl, helper, acc, subTree);
			} else {
				return A2($elm$core$List$cons, node, acc);
			}
		});
	return {
		h: A3($elm$core$Elm$JsArray$foldl, helper, _List_Nil, tree),
		d: (len / $elm$core$Array$branchFactor) | 0,
		g: tail
	};
};
var $elm$core$Array$append = F2(
	function (a, _v0) {
		var aTail = a.d;
		var bLen = _v0.a;
		var bTree = _v0.c;
		var bTail = _v0.d;
		if (_Utils_cmp(bLen, $elm$core$Array$branchFactor * 4) < 1) {
			var foldHelper = F2(
				function (node, array) {
					if (!node.$) {
						var tree = node.a;
						return A3($elm$core$Elm$JsArray$foldl, foldHelper, array, tree);
					} else {
						var leaf = node.a;
						return A2($elm$core$Array$appendHelpTree, leaf, array);
					}
				});
			return A2(
				$elm$core$Array$appendHelpTree,
				bTail,
				A3($elm$core$Elm$JsArray$foldl, foldHelper, a, bTree));
		} else {
			var foldHelper = F2(
				function (node, builder) {
					if (!node.$) {
						var tree = node.a;
						return A3($elm$core$Elm$JsArray$foldl, foldHelper, builder, tree);
					} else {
						var leaf = node.a;
						return A2($elm$core$Array$appendHelpBuilder, leaf, builder);
					}
				});
			return A2(
				$elm$core$Array$builderToArray,
				true,
				A2(
					$elm$core$Array$appendHelpBuilder,
					bTail,
					A3(
						$elm$core$Elm$JsArray$foldl,
						foldHelper,
						$elm$core$Array$builderFromArray(a),
						bTree)));
		}
	});
var $elm$core$Elm$JsArray$map = _JsArray_map;
var $elm$core$Array$map = F2(
	function (func, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = function (node) {
			if (!node.$) {
				var subTree = node.a;
				return $elm$core$Array$SubTree(
					A2($elm$core$Elm$JsArray$map, helper, subTree));
			} else {
				var values = node.a;
				return $elm$core$Array$Leaf(
					A2($elm$core$Elm$JsArray$map, func, values));
			}
		};
		return A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A2($elm$core$Elm$JsArray$map, helper, tree),
			A2($elm$core$Elm$JsArray$map, func, tail));
	});
var $author$project$Noise$SimplexNoise$generatePermMod12 = function (perm) {
	return A2(
		$elm$core$Array$map,
		function (i) {
			return i % 12;
		},
		perm);
};
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$random$Random$int = F2(
	function (a, b) {
		return function (seed0) {
			var _v0 = (_Utils_cmp(a, b) < 0) ? _Utils_Tuple2(a, b) : _Utils_Tuple2(b, a);
			var lo = _v0.a;
			var hi = _v0.b;
			var range = (hi - lo) + 1;
			if (!((range - 1) & range)) {
				return _Utils_Tuple2(
					(((range - 1) & $elm$random$Random$peel(seed0)) >>> 0) + lo,
					$elm$random$Random$next(seed0));
			} else {
				var threshhold = (((-range) >>> 0) % range) >>> 0;
				var accountForBias = function (seed) {
					accountForBias:
					while (true) {
						var x = $elm$random$Random$peel(seed);
						var seedN = $elm$random$Random$next(seed);
						if (_Utils_cmp(x, threshhold) < 0) {
							var $temp$seed = seedN;
							seed = $temp$seed;
							continue accountForBias;
						} else {
							return _Utils_Tuple2((x % range) + lo, seedN);
						}
					}
				};
				return accountForBias(seed0);
			}
		};
	});
var $elm$core$Array$length = function (_v0) {
	var len = _v0.a;
	return len;
};
var $owanturist$elm_union_find$UnionFind$findFast = F2(
	function (id, dict) {
		findFast:
		while (true) {
			var _v0 = A2($elm$core$Dict$get, id, dict);
			if (_v0.$ === 1) {
				return id;
			} else {
				var cursor = _v0.a;
				if (_Utils_eq(id, cursor)) {
					return id;
				} else {
					var $temp$id = cursor,
						$temp$dict = dict;
					id = $temp$id;
					dict = $temp$dict;
					continue findFast;
				}
			}
		}
	});
var $owanturist$elm_union_find$UnionFind$find = F2(
	function (id, _v0) {
		var dict = _v0.b;
		return A2($owanturist$elm_union_find$UnionFind$findFast, id, dict);
	});
var $elm$core$Array$isEmpty = function (_v0) {
	var len = _v0.a;
	return !len;
};
var $elm$core$Basics$modBy = _Basics_modBy;
var $owanturist$elm_union_find$UnionFind$QuickUnionPathCompression = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $owanturist$elm_union_find$UnionFind$quickUnionPathCompression = A2($owanturist$elm_union_find$UnionFind$QuickUnionPathCompression, 0, $elm$core$Dict$empty);
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $owanturist$elm_union_find$UnionFind$findCompressed = F2(
	function (id, dict) {
		var _v0 = A2($elm$core$Dict$get, id, dict);
		if (_v0.$ === 1) {
			return _Utils_Tuple2(
				id,
				A3($elm$core$Dict$insert, id, id, dict));
		} else {
			var cursor = _v0.a;
			if (_Utils_eq(id, cursor)) {
				return _Utils_Tuple2(id, dict);
			} else {
				var _v1 = A2($owanturist$elm_union_find$UnionFind$findCompressed, cursor, dict);
				var parent = _v1.a;
				var nextDict = _v1.b;
				return _Utils_Tuple2(
					parent,
					A3($elm$core$Dict$insert, id, parent, nextDict));
			}
		}
	});
var $owanturist$elm_union_find$UnionFind$union = F3(
	function (left, right, _v0) {
		var count_ = _v0.a;
		var dict = _v0.b;
		var _v1 = A2($owanturist$elm_union_find$UnionFind$findCompressed, left, dict);
		var leftRoot = _v1.a;
		var leftDict = _v1.b;
		var _v2 = A2($owanturist$elm_union_find$UnionFind$findCompressed, right, leftDict);
		var rightRoot = _v2.a;
		var rightDict = _v2.b;
		return _Utils_eq(leftRoot, rightRoot) ? A2($owanturist$elm_union_find$UnionFind$QuickUnionPathCompression, count_, rightDict) : A2(
			$owanturist$elm_union_find$UnionFind$QuickUnionPathCompression,
			count_ + 1,
			A3($elm$core$Dict$insert, leftRoot, rightRoot, rightDict));
	});
var $elm_community$random_extra$Utils$selectUniqByIndexes = F2(
	function (values, randomIndexes) {
		var modByLength = $elm$core$Basics$modBy(
			$elm$core$Array$length(values));
		var step = F2(
			function (randomIndex, _v1) {
				var uf = _v1.a;
				var acc = _v1.b;
				var leaderOfElement = A2($owanturist$elm_union_find$UnionFind$find, randomIndex, uf);
				var leaderOfNextElement = A2(
					$owanturist$elm_union_find$UnionFind$find,
					modByLength(leaderOfElement + 1),
					uf);
				var _v0 = A2($elm$core$Array$get, leaderOfElement, values);
				if (_v0.$ === 1) {
					return _Utils_Tuple2(uf, acc);
				} else {
					var value = _v0.a;
					return _Utils_Tuple2(
						A3($owanturist$elm_union_find$UnionFind$union, leaderOfElement, leaderOfNextElement, uf),
						A2($elm$core$List$cons, value, acc));
				}
			});
		return $elm$core$Array$isEmpty(values) ? _List_Nil : A3(
			$elm$core$List$foldr,
			step,
			_Utils_Tuple2($owanturist$elm_union_find$UnionFind$quickUnionPathCompression, _List_Nil),
			randomIndexes).b;
	});
var $elm_community$random_extra$Random$Array$shuffle = function (values) {
	var length = $elm$core$Array$length(values);
	return A2(
		$elm$random$Random$map,
		A2(
			$elm$core$Basics$composeR,
			$elm_community$random_extra$Utils$selectUniqByIndexes(values),
			$elm$core$Array$fromList),
		A2(
			$elm$random$Random$list,
			length,
			A2($elm$random$Random$int, 0, length - 1)));
};
var $author$project$Noise$SimplexNoise$permGenerattor = $elm_community$random_extra$Random$Array$shuffle(
	$elm$core$Array$fromList(
		A2($elm$core$List$range, 0, 255)));
var $author$project$Noise$SimplexNoise$reverseArray = function (array) {
	return $elm$core$Array$fromList(
		$elm$core$List$reverse(
			$elm$core$Array$toList(array)));
};
var $author$project$Noise$SimplexNoise$permutationTable = function (seed) {
	var _v0 = function (_v1) {
		var list = _v1.a;
		var seed_2 = _v1.b;
		return _Utils_Tuple2(
			A2(
				$elm$core$Array$append,
				list,
				$author$project$Noise$SimplexNoise$reverseArray(list)),
			seed_2);
	}(
		A2($elm$random$Random$step, $author$project$Noise$SimplexNoise$permGenerattor, seed));
	var perm = _v0.a;
	var seed_1 = _v0.b;
	return _Utils_Tuple2(
		{
			aR: perm,
			aS: $author$project$Noise$SimplexNoise$generatePermMod12(perm)
		},
		seed_1);
};
var $author$project$Noise$AnimatedBox$permutationTable = $author$project$Noise$SimplexNoise$permutationTable(
	$elm$random$Random$initialSeed(42)).a;
var $author$project$Noise$AnimatedBox$width = 100;
var $author$project$Noise$AnimatedBox$getShades = function (time) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (row, shades) {
				return _Utils_ap(
					shades,
					A3(
						$elm$core$List$foldl,
						F2(
							function (col, shadesRow) {
								return _Utils_ap(
									shadesRow,
									_List_fromArray(
										[
											_Utils_Tuple2(
											_Utils_Tuple2(row, col),
											A4($author$project$Noise$SimplexNoise$noise3d, $author$project$Noise$AnimatedBox$permutationTable, row * 0.01, col * 0.01, time))
										]));
							}),
						_List_Nil,
						A2($elm$core$List$range, 0, $author$project$Noise$AnimatedBox$width)));
			}),
		_List_Nil,
		A2($elm$core$List$range, 0, $author$project$Noise$AnimatedBox$height));
};
var $author$project$Noise$AnimatedBox$init = function (_v0) {
	return _Utils_Tuple2(
		{
			bs: $author$project$Noise$AnimatedBox$getShades(0),
			bu: 0
		},
		$elm$core$Platform$Cmd$none);
};
var $author$project$Utils$lerp = F5(
	function (min1, max1, min2, max2, num) {
		var ratio = $elm$core$Basics$abs((num - min1) / (max1 - min1));
		return min2 + (ratio * (max2 - min2));
	});
var $author$project$Noise$SimplexNoise$f2 = 0.5 * ($elm$core$Basics$sqrt(3) - 1);
var $author$project$Noise$SimplexNoise$g2 = (3 - $elm$core$Basics$sqrt(3)) / 6;
var $author$project$Noise$SimplexNoise$getCornerOffset2d = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? _Utils_Tuple2(1, 0) : _Utils_Tuple2(0, 1);
	});
var $author$project$Noise$SimplexNoise$getN2d = F6(
	function (x, y, i, j, perm, permMod12) {
		var t = (0.5 - (x * x)) - (y * y);
		if (t < 0) {
			return 0;
		} else {
			var t_ = t * t;
			var gi = A2(
				$author$project$Noise$SimplexNoise$get,
				permMod12,
				i + A2($author$project$Noise$SimplexNoise$get, perm, j)) * 3;
			return (t_ * t_) * ((A2($author$project$Noise$SimplexNoise$get, $author$project$Noise$SimplexNoise$grad3, gi) * x) + (A2($author$project$Noise$SimplexNoise$get, $author$project$Noise$SimplexNoise$grad3, gi + 1) * y));
		}
	});
var $author$project$Noise$SimplexNoise$noise2d = F3(
	function (_v0, xin, yin) {
		var perm = _v0.aR;
		var permMod12 = _v0.aS;
		var s = (xin + yin) * $author$project$Noise$SimplexNoise$f2;
		var j = $elm$core$Basics$floor(yin + s);
		var jj = j & 255;
		var i = $elm$core$Basics$floor(xin + s);
		var ii = i & 255;
		var t = (i + j) * $author$project$Noise$SimplexNoise$g2;
		var y0_ = j - t;
		var y0 = yin - y0_;
		var y2 = (y0 - 1) + (2 * $author$project$Noise$SimplexNoise$g2);
		var x0_ = i - t;
		var x0 = xin - x0_;
		var n0 = A6($author$project$Noise$SimplexNoise$getN2d, x0, y0, ii, jj, perm, permMod12);
		var x2 = (x0 - 1) + (2 * $author$project$Noise$SimplexNoise$g2);
		var n2 = A6($author$project$Noise$SimplexNoise$getN2d, x2, y2, ii + 1, jj + 1, perm, permMod12);
		var _v1 = A2($author$project$Noise$SimplexNoise$getCornerOffset2d, x0, y0);
		var i1 = _v1.a;
		var j1 = _v1.b;
		var x1 = (x0 - i1) + $author$project$Noise$SimplexNoise$g2;
		var y1 = (y0 - j1) + $author$project$Noise$SimplexNoise$g2;
		var n1 = A6($author$project$Noise$SimplexNoise$getN2d, x1, y1, ii + i1, jj + j1, perm, permMod12);
		return 70 * ((n0 + n1) + n2);
	});
var $author$project$Noise$SimplexNoise$noise1d = F2(
	function (permTable, xin) {
		return A3($author$project$Noise$SimplexNoise$noise2d, permTable, xin, 0);
	});
var $author$project$Noise$MountainRange$permutationTable = $author$project$Noise$SimplexNoise$permutationTable(
	$elm$random$Random$initialSeed(42)).a;
var $author$project$Noise$MountainRange$newHeight = function (time) {
	return A5(
		$author$project$Utils$lerp,
		-1,
		1,
		300,
		600,
		A2($author$project$Noise$SimplexNoise$noise1d, $author$project$Noise$MountainRange$permutationTable, time));
};
var $author$project$Noise$MountainRange$numberOfMountains = 5;
var $avh4$elm_color$Color$rgb = F3(
	function (r, g, b) {
		return A4($avh4$elm_color$Color$RgbaSpace, r, g, b, 1.0);
	});
var $elm$core$Basics$round = _Basics_round;
var $author$project$Noise$MountainRange$width = 600;
var $author$project$Noise$MountainRange$createMountainsHelper = F3(
	function (numberOfMtns, startTime, endTime) {
		if (!numberOfMtns) {
			return _List_Nil;
		} else {
			var s = A5($author$project$Utils$lerp, 0, $author$project$Noise$MountainRange$numberOfMountains, 0, 1, numberOfMtns);
			return A2(
				$elm$core$List$cons,
				A2(
					$elm$core$List$map,
					function (time) {
						return _Utils_Tuple2(
							$author$project$Noise$MountainRange$newHeight(time / 100),
							A3($avh4$elm_color$Color$rgb, s, s, s));
					},
					A2($elm$core$List$range, startTime, endTime)),
				A3(
					$author$project$Noise$MountainRange$createMountainsHelper,
					numberOfMtns - 1,
					endTime,
					endTime + $elm$core$Basics$round($author$project$Noise$MountainRange$width)));
		}
	});
var $author$project$Noise$MountainRange$createMountains = function (numberOfMtns) {
	return A3(
		$author$project$Noise$MountainRange$createMountainsHelper,
		numberOfMtns,
		0,
		$elm$core$Basics$round($author$project$Noise$MountainRange$width));
};
var $author$project$Noise$MountainRange$init = function (_v0) {
	return _Utils_Tuple2(
		{
			b$: $author$project$Noise$MountainRange$createMountains($author$project$Noise$MountainRange$numberOfMountains)
		},
		$elm$core$Platform$Cmd$none);
};
var $author$project$Noise$Perlin$init = function (_v0) {
	return _Utils_Tuple2(
		{aN: _List_Nil, bu: 0},
		$elm$core$Platform$Cmd$none);
};
var $author$project$Noise$PerlinBox$height = 100;
var $author$project$Noise$PerlinBox$permutationTable = $author$project$Noise$SimplexNoise$permutationTable(
	$elm$random$Random$initialSeed(42)).a;
var $author$project$Noise$PerlinBox$width = 100;
var $author$project$Noise$PerlinBox$initShades = A3(
	$elm$core$List$foldl,
	F2(
		function (row, shades) {
			return _Utils_ap(
				shades,
				A3(
					$elm$core$List$foldl,
					F2(
						function (col, shadesRow) {
							return _Utils_ap(
								shadesRow,
								_List_fromArray(
									[
										_Utils_Tuple2(
										_Utils_Tuple2(row, col),
										A3($author$project$Noise$SimplexNoise$noise2d, $author$project$Noise$PerlinBox$permutationTable, row * 0.01, col * 0.01))
									]));
						}),
					_List_Nil,
					A2($elm$core$List$range, 0, $author$project$Noise$PerlinBox$width)));
		}),
	_List_Nil,
	A2($elm$core$List$range, 0, $author$project$Noise$PerlinBox$height));
var $author$project$Noise$PerlinBox$init = function (_v0) {
	return _Utils_Tuple2(
		{bs: $author$project$Noise$PerlinBox$initShades},
		$elm$core$Platform$Cmd$none);
};
var $author$project$Noise$PerlinStepWalker$init = function (_v0) {
	return _Utils_Tuple2(
		{
			ay: _List_Nil,
			bu: _Utils_Tuple2(0, 10000)
		},
		$elm$core$Platform$Cmd$none);
};
var $author$project$Noise$PerlinWalker$init = function (_v0) {
	return _Utils_Tuple2(
		{
			ay: _List_Nil,
			bu: _Utils_Tuple2(0, 1000)
		},
		$elm$core$Platform$Cmd$none);
};
var $author$project$Noise$RandomBox$GetRowOfShades = $elm$core$Basics$identity;
var $author$project$Noise$RandomBox$width = 100;
var $author$project$Noise$RandomBox$getRowOfShades = A2(
	$elm$random$Random$generate,
	$elm$core$Basics$identity,
	A2(
		$elm$random$Random$list,
		$elm$core$Basics$round($author$project$Noise$RandomBox$width),
		A2($elm$random$Random$float, 0, 1)));
var $author$project$Noise$RandomBox$init = function (_v0) {
	return _Utils_Tuple2(
		{bs: _List_Nil},
		$author$project$Noise$RandomBox$getRowOfShades);
};
var $avh4$elm_color$Color$rgba = F4(
	function (r, g, b, a) {
		return A4($avh4$elm_color$Color$RgbaSpace, r, g, b, a);
	});
var $author$project$Oscillations$ManyWaves$rgb255a = F4(
	function (r, g, b, a) {
		return A4($avh4$elm_color$Color$rgba, r / 255, g / 255, b / 255, a);
	});
var $author$project$Oscillations$ManyWaves$init = function (_v0) {
	return _Utils_Tuple2(
		{
			a2: _List_fromArray(
				[
					{
					aI: 200,
					aJ: 0.070,
					ak: 5,
					bP: A4($author$project$Oscillations$ManyWaves$rgb255a, 49, 222, 153, 0.5),
					ao: 0,
					av: 30,
					aP: 0.08,
					ay: _List_Nil
				},
					{
					aI: 175,
					aJ: 0.055,
					ak: 7,
					bP: A4($author$project$Oscillations$ManyWaves$rgb255a, 222, 190, 49, 0.5),
					ao: 10,
					av: 25,
					aP: 0.075,
					ay: _List_Nil
				},
					{
					aI: 150,
					aJ: 0.045,
					ak: 10,
					bP: A4($author$project$Oscillations$ManyWaves$rgb255a, 222, 190, 49, 0.5),
					ao: 20,
					av: 20,
					aP: 0.07,
					ay: _List_Nil
				}
				])
		},
		$elm$core$Platform$Cmd$none);
};
var $author$project$Oscillations$Oscillators$GetOscillators = function (a) {
	return {$: 1, a: a};
};
var $elm$random$Random$map3 = F4(
	function (func, _v0, _v1, _v2) {
		var genA = _v0;
		var genB = _v1;
		var genC = _v2;
		return function (seed0) {
			var _v3 = genA(seed0);
			var a = _v3.a;
			var seed1 = _v3.b;
			var _v4 = genB(seed1);
			var b = _v4.a;
			var seed2 = _v4.b;
			var _v5 = genC(seed2);
			var c = _v5.a;
			var seed3 = _v5.b;
			return _Utils_Tuple2(
				A3(func, a, b, c),
				seed3);
		};
	});
var $author$project$Oscillations$Oscillators$width = 600;
var $author$project$Oscillations$Oscillators$zeroVector = A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0);
var $author$project$Oscillations$Oscillators$init = function (_v0) {
	return _Utils_Tuple2(
		{aw: _List_Nil},
		A2(
			$elm$random$Random$generate,
			$author$project$Oscillations$Oscillators$GetOscillators,
			A2(
				$elm$random$Random$list,
				10,
				A4(
					$elm$random$Random$map3,
					F3(
						function (angle, omega, amplitude) {
							return {aI: amplitude, a3: angle, ak: 30, aP: omega, ax: $author$project$Oscillations$Oscillators$zeroVector};
						}),
					A3(
						$elm$random$Random$map2,
						$elm_explorations$linear_algebra$Math$Vector2$vec2,
						A2($elm$random$Random$float, 0, 2 * $elm$core$Basics$pi),
						A2($elm$random$Random$float, 0, 2 * $elm$core$Basics$pi)),
					A3(
						$elm$random$Random$map2,
						$elm_explorations$linear_algebra$Math$Vector2$vec2,
						A2($elm$random$Random$float, -0.05, 0.05),
						A2($elm$random$Random$float, -0.05, 0.05)),
					A3(
						$elm$random$Random$map2,
						$elm_explorations$linear_algebra$Math$Vector2$vec2,
						A2($elm$random$Random$float, 20, $author$project$Oscillations$Oscillators$width / 2),
						A2($elm$random$Random$float, 20, $author$project$Oscillations$Oscillators$width / 2))))));
};
var $author$project$Oscillations$Pendulum$init = function (_v0) {
	return _Utils_Tuple2(
		{
			a3: $elm$core$Basics$pi / 3,
			aK: 200,
			bL: 20,
			bV: 0.999,
			aP: 0,
			ax: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0)
		},
		$elm$core$Platform$Cmd$none);
};
var $author$project$Oscillations$RainbowSlinky$init = function (_v0) {
	return _Utils_Tuple2(
		{aI: 400, b3: 80, b5: 150, ax: 0, bu: 0},
		$elm$core$Platform$Cmd$none);
};
var $author$project$Oscillations$SimpleHarmonicMotion$init = function (_v0) {
	return _Utils_Tuple2(
		{aI: 200, ak: 20, b5: 300, ax: 0, bu: 0},
		$elm$core$Platform$Cmd$none);
};
var $author$project$Oscillations$SimpleHarmonicMotionWithAngle$init = function (_v0) {
	return _Utils_Tuple2(
		{aI: 200, a3: 0, ak: 20, aP: (2 * $elm$core$Basics$pi) / 300, ax: 0},
		$elm$core$Platform$Cmd$none);
};
var $author$project$Oscillations$SineWave$init = function (_v0) {
	return _Utils_Tuple2(
		{aI: 200, aJ: 0.015, ak: 30, ao: 0, av: 24, aP: 0.20, ay: _List_Nil},
		$elm$core$Platform$Cmd$none);
};
var $author$project$Oscillations$StaticSineWave$init = function (_v0) {
	return _Utils_Tuple2(
		{aI: 200, bR: 0.5, ao: 0, aP: 0.02, ay: _List_Nil},
		$elm$core$Platform$Cmd$none);
};
var $author$project$RandomWalks$Directed$defaultPosition = _Utils_Tuple2(300, 300);
var $author$project$RandomWalks$Directed$Left = 0;
var $author$project$RandomWalks$Directed$Middle = 1;
var $author$project$RandomWalks$Directed$NewStep = function (a) {
	return {$: 1, a: a};
};
var $author$project$RandomWalks$Directed$Right = 2;
var $elm$random$Random$pair = F2(
	function (genA, genB) {
		return A3(
			$elm$random$Random$map2,
			F2(
				function (a, b) {
					return _Utils_Tuple2(a, b);
				}),
			genA,
			genB);
	});
var $author$project$RandomWalks$Directed$stepCmd = function () {
	var yStepGenerator = A2(
		$elm$random$Random$weighted,
		_Utils_Tuple2(20, 0),
		_List_fromArray(
			[
				_Utils_Tuple2(40, 1),
				_Utils_Tuple2(20, 2)
			]));
	var xStepGenerator = A2(
		$elm$random$Random$weighted,
		_Utils_Tuple2(20, 0),
		_List_fromArray(
			[
				_Utils_Tuple2(20, 1),
				_Utils_Tuple2(40, 2)
			]));
	return A2(
		$elm$random$Random$generate,
		$author$project$RandomWalks$Directed$NewStep,
		A2($elm$random$Random$pair, xStepGenerator, yStepGenerator));
}();
var $author$project$RandomWalks$Directed$init = function (_v0) {
	return _Utils_Tuple2(
		{
			ay: _List_fromArray(
				[$author$project$RandomWalks$Directed$defaultPosition])
		},
		$author$project$RandomWalks$Directed$stepCmd);
};
var $author$project$RandomWalks$Gaussian$defaultPosition = _Utils_Tuple2(300, 300);
var $author$project$RandomWalks$Gaussian$NewStep = function (a) {
	return {$: 1, a: a};
};
var $author$project$RandomWalks$Gaussian$stepCmd = function () {
	var stepGenerator = A2($elm_community$random_extra$Random$Float$normal, 0, 2);
	return A2(
		$elm$random$Random$generate,
		$author$project$RandomWalks$Gaussian$NewStep,
		A2($elm$random$Random$pair, stepGenerator, stepGenerator));
}();
var $author$project$RandomWalks$Gaussian$init = function (_v0) {
	return _Utils_Tuple2(
		{
			ay: _List_fromArray(
				[$author$project$RandomWalks$Gaussian$defaultPosition])
		},
		$author$project$RandomWalks$Gaussian$stepCmd);
};
var $author$project$RandomWalks$Improved$defaultPosition = _Utils_Tuple2(300, 300);
var $author$project$RandomWalks$Improved$Left = 0;
var $author$project$RandomWalks$Improved$Middle = 1;
var $author$project$RandomWalks$Improved$NewStep = function (a) {
	return {$: 1, a: a};
};
var $author$project$RandomWalks$Improved$Right = 2;
var $author$project$RandomWalks$Improved$stepCmd = function () {
	var stepGenerator = A2(
		$elm$random$Random$uniform,
		0,
		_List_fromArray(
			[1, 2]));
	return A2(
		$elm$random$Random$generate,
		$author$project$RandomWalks$Improved$NewStep,
		A2($elm$random$Random$pair, stepGenerator, stepGenerator));
}();
var $author$project$RandomWalks$Improved$init = function (_v0) {
	return _Utils_Tuple2(
		{
			ay: _List_fromArray(
				[$author$project$RandomWalks$Improved$defaultPosition])
		},
		$author$project$RandomWalks$Improved$stepCmd);
};
var $author$project$RandomWalks$Levy$defaultPosition = _Utils_Tuple2(300, 300);
var $author$project$RandomWalks$Levy$NewStepSize = function (a) {
	return {$: 1, a: a};
};
var $author$project$RandomWalks$Levy$stepSizeCmd = function () {
	var stepGenerator = A2($elm$random$Random$float, 0, 1);
	return A2(
		$elm$random$Random$generate,
		$author$project$RandomWalks$Levy$NewStepSize,
		A2($elm$random$Random$pair, stepGenerator, stepGenerator));
}();
var $author$project$RandomWalks$Levy$init = function (_v0) {
	return _Utils_Tuple2(
		{
			ay: _List_fromArray(
				[$author$project$RandomWalks$Levy$defaultPosition])
		},
		$author$project$RandomWalks$Levy$stepSizeCmd);
};
var $author$project$RandomWalks$MonteCarlo$NewPosition = function (a) {
	return {$: 1, a: a};
};
var $author$project$RandomWalks$MonteCarlo$stepCmd = A2(
	$elm$random$Random$generate,
	$author$project$RandomWalks$MonteCarlo$NewPosition,
	A2(
		$elm$random$Random$pair,
		A2($elm$random$Random$float, 0, 1),
		A2($elm$random$Random$float, 0, 1)));
var $author$project$RandomWalks$MonteCarlo$init = function (_v0) {
	return _Utils_Tuple2(
		{ay: _List_Nil},
		$author$project$RandomWalks$MonteCarlo$stepCmd);
};
var $author$project$RandomWalks$NormalDistribution$defaultPosition = 300;
var $author$project$RandomWalks$NormalDistribution$NewPosition = function (a) {
	return {$: 1, a: a};
};
var $author$project$RandomWalks$NormalDistribution$stepCmd = A2(
	$elm$random$Random$generate,
	$author$project$RandomWalks$NormalDistribution$NewPosition,
	A2($elm_community$random_extra$Random$Float$normal, 300, 40));
var $author$project$RandomWalks$NormalDistribution$init = function (_v0) {
	return _Utils_Tuple2(
		{
			ay: _List_fromArray(
				[$author$project$RandomWalks$NormalDistribution$defaultPosition])
		},
		$author$project$RandomWalks$NormalDistribution$stepCmd);
};
var $author$project$RandomWalks$PaintSplatter$NewPoint = function (a) {
	return {$: 1, a: a};
};
var $author$project$RandomWalks$PaintSplatter$newPointCmd = function () {
	var positionGenerator = A2($elm_community$random_extra$Random$Float$normal, 300, 50);
	var colorGenerator = A2(
		$elm$random$Random$list,
		4,
		A2($elm$random$Random$float, 0, 1));
	return A2(
		$elm$random$Random$generate,
		$author$project$RandomWalks$PaintSplatter$NewPoint,
		A2(
			$elm$random$Random$pair,
			A2($elm$random$Random$pair, positionGenerator, positionGenerator),
			colorGenerator));
}();
var $author$project$RandomWalks$PaintSplatter$init = function (_v0) {
	return _Utils_Tuple2(
		{aT: _List_Nil},
		$author$project$RandomWalks$PaintSplatter$newPointCmd);
};
var $author$project$Vector$AccelerateTowardsMouse$defaultPosition = A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 300, 300);
var $author$project$Vector$AccelerateTowardsMouse$init = function (_v0) {
	return _Utils_Tuple2(
		{
			cl: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, -0.001, 0.01),
			ak: 20,
			bj: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0),
			ax: $author$project$Vector$AccelerateTowardsMouse$defaultPosition,
			by: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0)
		},
		$elm$core$Platform$Cmd$none);
};
var $author$project$Vector$BouncingBall$defaultPosition = _Utils_Tuple2(300, 300);
var $author$project$Vector$BouncingBall$init = function (_v0) {
	return _Utils_Tuple2(
		{ak: 20, ax: $author$project$Vector$BouncingBall$defaultPosition, bA: 3, bC: -1},
		$elm$core$Platform$Cmd$none);
};
var $author$project$Vector$BouncingBallWithVector$defaultPosition = A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 300, 300);
var $author$project$Vector$BouncingBallWithVector$init = function (_v0) {
	return _Utils_Tuple2(
		{
			ak: 20,
			ax: $author$project$Vector$BouncingBallWithVector$defaultPosition,
			aW: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 3, -1)
		},
		$elm$core$Platform$Cmd$none);
};
var $author$project$Vector$BrakingCar$defaultPosition = A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 300, 300);
var $author$project$Vector$BrakingCar$init = function (_v0) {
	return _Utils_Tuple2(
		{
			cl: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0),
			ak: 20,
			ax: $author$project$Vector$BrakingCar$defaultPosition,
			by: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0)
		},
		$elm$core$Platform$Cmd$none);
};
var $author$project$Vector$ConstantAcceleration$defaultPosition = A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 300, 300);
var $author$project$Vector$ConstantAcceleration$init = function (_v0) {
	return _Utils_Tuple2(
		{
			cl: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, -0.001, 0.01),
			ak: 20,
			ax: $author$project$Vector$ConstantAcceleration$defaultPosition,
			by: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0)
		},
		$elm$core$Platform$Cmd$none);
};
var $author$project$Vector$ConstantVelocity$defaultPosition = A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 300, 300);
var $author$project$Vector$ConstantVelocity$GetVelocity = function (a) {
	return {$: 1, a: a};
};
var $author$project$Vector$ConstantVelocity$randomVelocity = function () {
	var randomComponent = A2($elm$random$Random$float, -2, 2);
	return A2(
		$elm$random$Random$generate,
		$author$project$Vector$ConstantVelocity$GetVelocity,
		A2($elm$random$Random$pair, randomComponent, randomComponent));
}();
var $author$project$Vector$ConstantVelocity$init = function (_v0) {
	return _Utils_Tuple2(
		{
			ak: 20,
			ax: $author$project$Vector$ConstantVelocity$defaultPosition,
			by: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0)
		},
		$author$project$Vector$ConstantVelocity$randomVelocity);
};
var $author$project$Vector$GroupAccelerateTowardsMouse$GetPointPositions = function (a) {
	return {$: 1, a: a};
};
var $author$project$Vector$GroupAccelerateTowardsMouse$width = 600;
var $author$project$Vector$GroupAccelerateTowardsMouse$randomPoints = function () {
	var randomPosition = A2(
		$elm$random$Random$pair,
		A2($elm$random$Random$float, 0, $author$project$Vector$GroupAccelerateTowardsMouse$width),
		A2($elm$random$Random$float, 0, $author$project$Vector$GroupAccelerateTowardsMouse$width));
	return A2(
		$elm$random$Random$generate,
		$author$project$Vector$GroupAccelerateTowardsMouse$GetPointPositions,
		A2($elm$random$Random$list, 10, randomPosition));
}();
var $author$project$Vector$GroupAccelerateTowardsMouse$init = function (_v0) {
	return _Utils_Tuple2(
		{
			ak: 10,
			bj: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0),
			aT: _List_Nil
		},
		$author$project$Vector$GroupAccelerateTowardsMouse$randomPoints);
};
var $author$project$Vector$MouseStalker$defaultPosition = A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 300, 300);
var $author$project$Vector$MouseStalker$init = function (_v0) {
	return _Utils_Tuple2(
		{
			cl: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, -0.001, 0.01),
			ak: 20,
			bj: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0),
			ax: $author$project$Vector$MouseStalker$defaultPosition,
			by: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0)
		},
		$elm$core$Platform$Cmd$none);
};
var $author$project$Vector$MouseTracing$height = 600;
var $author$project$Vector$MouseTracing$width = 600;
var $author$project$Vector$MouseTracing$center = A2($elm_explorations$linear_algebra$Math$Vector2$vec2, $author$project$Vector$MouseTracing$width / 2, $author$project$Vector$MouseTracing$height / 2);
var $author$project$Vector$MouseTracing$init = function (_v0) {
	return _Utils_Tuple2(
		{bj: $author$project$Vector$MouseTracing$center},
		$elm$core$Platform$Cmd$none);
};
var $author$project$Vector$MouseTracingNormalized$height = 600;
var $author$project$Vector$MouseTracingNormalized$width = 600;
var $author$project$Vector$MouseTracingNormalized$center = A2($elm_explorations$linear_algebra$Math$Vector2$vec2, $author$project$Vector$MouseTracingNormalized$width / 2, $author$project$Vector$MouseTracingNormalized$height / 2);
var $author$project$Vector$MouseTracingNormalized$init = function (_v0) {
	return _Utils_Tuple2(
		{bj: $author$project$Vector$MouseTracingNormalized$center},
		$elm$core$Platform$Cmd$none);
};
var $author$project$Vector$MouseTracingScaled$height = 600;
var $author$project$Vector$MouseTracingScaled$width = 600;
var $author$project$Vector$MouseTracingScaled$center = A2($elm_explorations$linear_algebra$Math$Vector2$vec2, $author$project$Vector$MouseTracingScaled$width / 2, $author$project$Vector$MouseTracingScaled$height / 2);
var $author$project$Vector$MouseTracingScaled$init = function (_v0) {
	return _Utils_Tuple2(
		{bj: $author$project$Vector$MouseTracingScaled$center},
		$elm$core$Platform$Cmd$none);
};
var $author$project$Vector$MouseTracingWithMagnitude$height = 600;
var $author$project$Vector$MouseTracingWithMagnitude$width = 600;
var $author$project$Vector$MouseTracingWithMagnitude$center = A2($elm_explorations$linear_algebra$Math$Vector2$vec2, $author$project$Vector$MouseTracingWithMagnitude$width / 2, $author$project$Vector$MouseTracingWithMagnitude$height / 2);
var $author$project$Vector$MouseTracingWithMagnitude$init = function (_v0) {
	return _Utils_Tuple2(
		{bj: $author$project$Vector$MouseTracingWithMagnitude$center},
		$elm$core$Platform$Cmd$none);
};
var $author$project$Vector$RandomAcceleration$defaultPosition = A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 300, 300);
var $author$project$Vector$RandomAcceleration$init = function (_v0) {
	return _Utils_Tuple2(
		{
			cl: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, -0.001, 0.01),
			ak: 20,
			ax: $author$project$Vector$RandomAcceleration$defaultPosition,
			by: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0)
		},
		$elm$core$Platform$Cmd$none);
};
var $elm_explorations$linear_algebra$Math$Vector2$add = _MJS_v2add;
var $author$project$Vector$ScalingSaber$height = 600;
var $author$project$Vector$ScalingSaber$saberTail = A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, $author$project$Vector$ScalingSaber$height);
var $author$project$Vector$ScalingSaber$init = function (_v0) {
	return _Utils_Tuple2(
		{
			ag: A2(
				$elm_explorations$linear_algebra$Math$Vector2$add,
				$author$project$Vector$ScalingSaber$saberTail,
				A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 100, -100))
		},
		$elm$core$Platform$Cmd$none);
};
var $author$project$Vector$WalkerWithVector$defaultPosition = A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 300, 300);
var $author$project$Vector$WalkerWithVector$NewStep = function (a) {
	return {$: 1, a: a};
};
var $author$project$Vector$WalkerWithVector$stepCmd = function () {
	var step = A2($elm$random$Random$float, -3, 3);
	return A2(
		$elm$random$Random$generate,
		$author$project$Vector$WalkerWithVector$NewStep,
		A2($elm$random$Random$pair, step, step));
}();
var $author$project$Vector$WalkerWithVector$init = function (_v0) {
	return _Utils_Tuple2(
		{
			ay: _List_fromArray(
				[$author$project$Vector$WalkerWithVector$defaultPosition])
		},
		$author$project$Vector$WalkerWithVector$stepCmd);
};
var $elm$core$Basics$atan2 = _Basics_atan2;
var $elm_explorations$linear_algebra$Math$Vector2$getX = _MJS_v2getX;
var $elm_explorations$linear_algebra$Math$Vector2$getY = _MJS_v2getY;
var $author$project$AngularMovement$AccelerateTowardsMouse$height = 600;
var $elm_explorations$linear_algebra$Math$Vector2$length = _MJS_v2length;
var $elm_explorations$linear_algebra$Math$Vector2$scale = _MJS_v2scale;
var $author$project$AngularMovement$AccelerateTowardsMouse$limit = F2(
	function (maxMagnitude, v) {
		var magnitude = $elm_explorations$linear_algebra$Math$Vector2$length(v);
		return (_Utils_cmp(magnitude, maxMagnitude) > 0) ? A2($elm_explorations$linear_algebra$Math$Vector2$scale, maxMagnitude / magnitude, v) : v;
	});
var $elm_explorations$linear_algebra$Math$Vector2$normalize = _MJS_v2normalize;
var $elm_explorations$linear_algebra$Math$Vector2$sub = _MJS_v2sub;
var $elm_explorations$linear_algebra$Math$Vector2$toRecord = _MJS_v2toRecord;
var $author$project$AngularMovement$AccelerateTowardsMouse$width = 600;
var $author$project$AngularMovement$AccelerateTowardsMouse$update = F2(
	function (msg, model) {
		if (!msg.$) {
			var w = model.a5;
			var newDirection = $elm_explorations$linear_algebra$Math$Vector2$normalize(
				A2($elm_explorations$linear_algebra$Math$Vector2$sub, model.bj, model.ax));
			var newAcceleration = A2($elm_explorations$linear_algebra$Math$Vector2$scale, 0.5, newDirection);
			var newVelocity = A2(
				$author$project$AngularMovement$AccelerateTowardsMouse$limit,
				5,
				A2($elm_explorations$linear_algebra$Math$Vector2$add, model.by, newAcceleration));
			var newAngle = function () {
				var vy = $elm_explorations$linear_algebra$Math$Vector2$getY(newVelocity);
				var vx = $elm_explorations$linear_algebra$Math$Vector2$getX(newVelocity);
				return A2($elm$core$Basics$atan2, vy, vx);
			}();
			var newPosition = $elm_explorations$linear_algebra$Math$Vector2$toRecord(
				A2($elm_explorations$linear_algebra$Math$Vector2$add, model.ax, newVelocity));
			var newX = (_Utils_cmp(newPosition.bz, -w) < 1) ? ($author$project$AngularMovement$AccelerateTowardsMouse$width + w) : ((_Utils_cmp(newPosition.bz, $author$project$AngularMovement$AccelerateTowardsMouse$width + w) > -1) ? (-w) : newPosition.bz);
			var h = model.a4;
			var newY = (_Utils_cmp(newPosition.bB, -h) < 1) ? ($author$project$AngularMovement$AccelerateTowardsMouse$height + h) : ((_Utils_cmp(newPosition.bB, $author$project$AngularMovement$AccelerateTowardsMouse$height + h) > -1) ? (-h) : newPosition.bB);
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						a3: newAngle,
						ax: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, newX, newY),
						by: newVelocity
					}),
				$elm$core$Platform$Cmd$none);
		} else {
			var mx = msg.a;
			var my = msg.b;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						bj: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, mx, my)
					}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$AngularMovement$AcceleratingBaton$update = F2(
	function (msg, model) {
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{a3: model.a3 + model.aP, aP: model.aP + model.bH}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$AngularMovement$FallingBoulder$applyForce = F3(
	function (force, mass, acceleration) {
		return A2(
			$elm_explorations$linear_algebra$Math$Vector2$add,
			acceleration,
			A2($elm_explorations$linear_algebra$Math$Vector2$scale, 1 / mass, force));
	});
var $author$project$AngularMovement$FallingBoulder$sign = function (n) {
	return (n < 0) ? (-1) : ((!n) ? 0 : 1);
};
var $author$project$AngularMovement$FallingBoulder$width = 600;
var $author$project$AngularMovement$FallingBoulder$updateMovement = F2(
	function (forces, model) {
		var velocityDirection = $author$project$AngularMovement$FallingBoulder$sign(
			$elm_explorations$linear_algebra$Math$Vector2$getX(model.by));
		var stuckAtBottomOfHill = (_Utils_cmp(
			$elm_explorations$linear_algebra$Math$Vector2$getX(model.ax),
			$author$project$AngularMovement$FallingBoulder$width - model.ak) > -1) && (velocityDirection > 0);
		var newAcceleration = A3(
			$elm$core$List$foldl,
			F2(
				function (force, acceleration) {
					return A3($author$project$AngularMovement$FallingBoulder$applyForce, force, model.b0, acceleration);
				}),
			A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0),
			forces);
		var newAccelerationDirection = $author$project$AngularMovement$FallingBoulder$sign(
			$elm_explorations$linear_algebra$Math$Vector2$getX(newAcceleration));
		var newAlpha = ($elm_explorations$linear_algebra$Math$Vector2$length(newAcceleration) * newAccelerationDirection) * 1.5;
		var newOmega = stuckAtBottomOfHill ? 0 : (model.aP + newAlpha);
		var newTheta = stuckAtBottomOfHill ? model.aE : (model.aE + newOmega);
		var newVelocity = stuckAtBottomOfHill ? A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0) : A2($elm_explorations$linear_algebra$Math$Vector2$add, model.by, newAcceleration);
		var newPosition = stuckAtBottomOfHill ? model.ax : A2($elm_explorations$linear_algebra$Math$Vector2$add, model.ax, newVelocity);
		return _Utils_update(
			model,
			{aP: newOmega, ax: newPosition, aE: newTheta, by: newVelocity});
	});
var $author$project$AngularMovement$FallingBoulder$update = F2(
	function (msg, model) {
		var pushForce = A2($elm_explorations$linear_algebra$Math$Vector2$vec2, -0.015, -0.015);
		var gravityForce = A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0.01, 0.01);
		var netForce = model.aV ? _List_fromArray(
			[gravityForce, pushForce]) : _List_fromArray(
			[gravityForce]);
		switch (msg.$) {
			case 0:
				return _Utils_Tuple2(
					A2($author$project$AngularMovement$FallingBoulder$updateMovement, netForce, model),
					$elm$core$Platform$Cmd$none);
			case 1:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{aV: true}),
					$elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{aV: false}),
					$elm$core$Platform$Cmd$none);
		}
	});
var $avh4$elm_color$Color$blue = A4($avh4$elm_color$Color$RgbaSpace, 52 / 255, 101 / 255, 164 / 255, 1.0);
var $author$project$AngularMovement$ManyOrbitsWithDynamicRotation$changeAttractorFill = F2(
	function (fill, model) {
		var oldAttractor = model.F;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					F: _Utils_update(
						oldAttractor,
						{bf: fill})
				}),
			$elm$core$Platform$Cmd$none);
	});
var $avh4$elm_color$Color$darkBlue = A4($avh4$elm_color$Color$RgbaSpace, 32 / 255, 74 / 255, 135 / 255, 1.0);
var $author$project$AngularMovement$ManyOrbitsWithDynamicRotation$OnDragBy = function (a) {
	return {$: 1, a: a};
};
var $zaboco$elm_draggable$Draggable$Config = $elm$core$Basics$identity;
var $zaboco$elm_draggable$Internal$defaultConfig = {
	eK: function (_v0) {
		return $elm$core$Maybe$Nothing;
	},
	eL: function (_v1) {
		return $elm$core$Maybe$Nothing;
	},
	eM: $elm$core$Maybe$Nothing,
	eN: function (_v2) {
		return $elm$core$Maybe$Nothing;
	},
	eP: function (_v3) {
		return $elm$core$Maybe$Nothing;
	}
};
var $zaboco$elm_draggable$Draggable$basicConfig = function (onDragByListener) {
	var defaultConfig = $zaboco$elm_draggable$Internal$defaultConfig;
	return _Utils_update(
		defaultConfig,
		{
			eL: A2($elm$core$Basics$composeL, $elm$core$Maybe$Just, onDragByListener)
		});
};
var $author$project$AngularMovement$ManyOrbitsWithDynamicRotation$dragConfig = $zaboco$elm_draggable$Draggable$basicConfig($author$project$AngularMovement$ManyOrbitsWithDynamicRotation$OnDragBy);
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $zaboco$elm_draggable$Cmd$Extra$message = function (x) {
	return A2(
		$elm$core$Task$perform,
		$elm$core$Basics$identity,
		$elm$core$Task$succeed(x));
};
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $zaboco$elm_draggable$Cmd$Extra$optionalMessage = function (msgMaybe) {
	return A2(
		$elm$core$Maybe$withDefault,
		$elm$core$Platform$Cmd$none,
		A2($elm$core$Maybe$map, $zaboco$elm_draggable$Cmd$Extra$message, msgMaybe));
};
var $zaboco$elm_draggable$Internal$Dragging = function (a) {
	return {$: 2, a: a};
};
var $zaboco$elm_draggable$Internal$DraggingTentative = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $zaboco$elm_draggable$Internal$distanceTo = F2(
	function (end, start) {
		return _Utils_Tuple2(end.bz - start.bz, end.bB - start.bB);
	});
var $zaboco$elm_draggable$Internal$updateAndEmit = F3(
	function (config, msg, drag) {
		var _v0 = _Utils_Tuple2(drag, msg);
		_v0$5:
		while (true) {
			switch (_v0.a.$) {
				case 0:
					if (!_v0.b.$) {
						var _v1 = _v0.a;
						var _v2 = _v0.b;
						var key = _v2.a;
						var initialPosition = _v2.b;
						return _Utils_Tuple2(
							A2($zaboco$elm_draggable$Internal$DraggingTentative, key, initialPosition),
							config.eP(key));
					} else {
						break _v0$5;
					}
				case 1:
					switch (_v0.b.$) {
						case 1:
							var _v3 = _v0.a;
							var key = _v3.a;
							var oldPosition = _v3.b;
							return _Utils_Tuple2(
								$zaboco$elm_draggable$Internal$Dragging(oldPosition),
								config.eN(key));
						case 2:
							var _v4 = _v0.a;
							var key = _v4.a;
							var _v5 = _v0.b;
							return _Utils_Tuple2(
								$zaboco$elm_draggable$Internal$NotDragging,
								config.eK(key));
						default:
							break _v0$5;
					}
				default:
					switch (_v0.b.$) {
						case 1:
							var oldPosition = _v0.a.a;
							var newPosition = _v0.b.a;
							return _Utils_Tuple2(
								$zaboco$elm_draggable$Internal$Dragging(newPosition),
								config.eL(
									A2($zaboco$elm_draggable$Internal$distanceTo, newPosition, oldPosition)));
						case 2:
							var _v6 = _v0.b;
							return _Utils_Tuple2($zaboco$elm_draggable$Internal$NotDragging, config.eM);
						default:
							break _v0$5;
					}
			}
		}
		return _Utils_Tuple2(drag, $elm$core$Maybe$Nothing);
	});
var $zaboco$elm_draggable$Draggable$updateDraggable = F3(
	function (_v0, _v1, _v2) {
		var config = _v0;
		var msg = _v1;
		var drag = _v2;
		var _v3 = A3($zaboco$elm_draggable$Internal$updateAndEmit, config, msg, drag);
		var newDrag = _v3.a;
		var newMsgMaybe = _v3.b;
		return _Utils_Tuple2(
			newDrag,
			$zaboco$elm_draggable$Cmd$Extra$optionalMessage(newMsgMaybe));
	});
var $zaboco$elm_draggable$Draggable$update = F3(
	function (config, msg, model) {
		var _v0 = A3($zaboco$elm_draggable$Draggable$updateDraggable, config, msg, model.bS);
		var dragState = _v0.a;
		var dragCmd = _v0.b;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{bS: dragState}),
			dragCmd);
	});
var $author$project$AngularMovement$ManyOrbitsWithDynamicRotation$applyForce = F3(
	function (force, mass, acceleration) {
		return A2(
			$elm_explorations$linear_algebra$Math$Vector2$add,
			acceleration,
			A2($elm_explorations$linear_algebra$Math$Vector2$scale, 1 / mass, force));
	});
var $elm_explorations$linear_algebra$Math$Vector2$lengthSquared = _MJS_v2lengthSquared;
var $author$project$AngularMovement$ManyOrbitsWithDynamicRotation$limitFloat = F3(
	function (min, max, num) {
		return (_Utils_cmp(num, min) < 0) ? min : ((_Utils_cmp(num, max) > 0) ? max : num);
	});
var $author$project$AngularMovement$ManyOrbitsWithDynamicRotation$limitVector = F3(
	function (minMagnitude, maxMagnitude, v) {
		var magnitude = $elm_explorations$linear_algebra$Math$Vector2$length(v);
		return (_Utils_cmp(magnitude, maxMagnitude) > 0) ? A2($elm_explorations$linear_algebra$Math$Vector2$scale, maxMagnitude / magnitude, v) : ((_Utils_cmp(magnitude, minMagnitude) < 0) ? A2($elm_explorations$linear_algebra$Math$Vector2$scale, minMagnitude / magnitude, v) : v);
	});
var $author$project$AngularMovement$ManyOrbitsWithDynamicRotation$updateMover = F2(
	function (attractor, mover) {
		var oldMover = mover;
		var attractionDistance = A3(
			$author$project$AngularMovement$ManyOrbitsWithDynamicRotation$limitVector,
			5,
			25,
			A2($elm_explorations$linear_algebra$Math$Vector2$sub, attractor.ax, mover.ax));
		var attractionDistanceSquared = $elm_explorations$linear_algebra$Math$Vector2$lengthSquared(attractionDistance);
		var attractionDir = $elm_explorations$linear_algebra$Math$Vector2$normalize(attractionDistance);
		var attractionForce = A2($elm_explorations$linear_algebra$Math$Vector2$scale, ((5 * attractor.b0) * mover.b0) / attractionDistanceSquared, attractionDir);
		var newAcceleration = A3(
			$author$project$AngularMovement$ManyOrbitsWithDynamicRotation$applyForce,
			attractionForce,
			mover.b0,
			A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0));
		var newVelocity = A2($elm_explorations$linear_algebra$Math$Vector2$add, mover.by, newAcceleration);
		var newPosition = A2($elm_explorations$linear_algebra$Math$Vector2$add, mover.ax, newVelocity);
		return _Utils_update(
			oldMover,
			{
				bH: 10 * $elm_explorations$linear_algebra$Math$Vector2$getX(newAcceleration),
				a3: mover.a3 + mover.aP,
				aP: A3($author$project$AngularMovement$ManyOrbitsWithDynamicRotation$limitFloat, -2, 2, mover.aP + mover.bH),
				ax: newPosition,
				by: newVelocity
			});
	});
var $author$project$AngularMovement$ManyOrbitsWithDynamicRotation$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 0:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							at: A2(
								$elm$core$List$map,
								$author$project$AngularMovement$ManyOrbitsWithDynamicRotation$updateMover(model.F),
								model.at)
						}),
					$elm$core$Platform$Cmd$none);
			case 6:
				var movers = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{at: movers}),
					$elm$core$Platform$Cmd$none);
			case 5:
				return A2($author$project$AngularMovement$ManyOrbitsWithDynamicRotation$changeAttractorFill, $avh4$elm_color$Color$lightBlue, model);
			case 3:
				return A2($author$project$AngularMovement$ManyOrbitsWithDynamicRotation$changeAttractorFill, $avh4$elm_color$Color$blue, model);
			case 4:
				return A2($author$project$AngularMovement$ManyOrbitsWithDynamicRotation$changeAttractorFill, $avh4$elm_color$Color$darkBlue, model);
			case 1:
				var _v1 = msg.a;
				var dx = _v1.a;
				var dy = _v1.b;
				var attractor = model.F;
				var _v2 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(model.F.ax);
				var x = _v2.bz;
				var y = _v2.bB;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							F: _Utils_update(
								attractor,
								{
									ax: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, x + dx, y + dy)
								})
						}),
					$elm$core$Platform$Cmd$none);
			default:
				var dragMsg = msg.a;
				return A3($zaboco$elm_draggable$Draggable$update, $author$project$AngularMovement$ManyOrbitsWithDynamicRotation$dragConfig, dragMsg, model);
		}
	});
var $author$project$AngularMovement$ManyOrbitsWithRotation$changeAttractorFill = F2(
	function (fill, model) {
		var oldAttractor = model.F;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					F: _Utils_update(
						oldAttractor,
						{bf: fill})
				}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$AngularMovement$ManyOrbitsWithRotation$OnDragBy = function (a) {
	return {$: 1, a: a};
};
var $author$project$AngularMovement$ManyOrbitsWithRotation$dragConfig = $zaboco$elm_draggable$Draggable$basicConfig($author$project$AngularMovement$ManyOrbitsWithRotation$OnDragBy);
var $author$project$AngularMovement$ManyOrbitsWithRotation$applyForce = F3(
	function (force, mass, acceleration) {
		return A2(
			$elm_explorations$linear_algebra$Math$Vector2$add,
			acceleration,
			A2($elm_explorations$linear_algebra$Math$Vector2$scale, 1 / mass, force));
	});
var $author$project$AngularMovement$ManyOrbitsWithRotation$limitFloat = F3(
	function (min, max, num) {
		return (_Utils_cmp(num, min) < 0) ? min : ((_Utils_cmp(num, max) > 0) ? max : num);
	});
var $author$project$AngularMovement$ManyOrbitsWithRotation$limitVector = F3(
	function (minMagnitude, maxMagnitude, v) {
		var magnitude = $elm_explorations$linear_algebra$Math$Vector2$length(v);
		return (_Utils_cmp(magnitude, maxMagnitude) > 0) ? A2($elm_explorations$linear_algebra$Math$Vector2$scale, maxMagnitude / magnitude, v) : ((_Utils_cmp(magnitude, minMagnitude) < 0) ? A2($elm_explorations$linear_algebra$Math$Vector2$scale, minMagnitude / magnitude, v) : v);
	});
var $author$project$AngularMovement$ManyOrbitsWithRotation$updateMover = F2(
	function (attractor, mover) {
		var oldMover = mover;
		var attractionDistance = A3(
			$author$project$AngularMovement$ManyOrbitsWithRotation$limitVector,
			5,
			25,
			A2($elm_explorations$linear_algebra$Math$Vector2$sub, attractor.ax, mover.ax));
		var attractionDistanceSquared = $elm_explorations$linear_algebra$Math$Vector2$lengthSquared(attractionDistance);
		var attractionDir = $elm_explorations$linear_algebra$Math$Vector2$normalize(attractionDistance);
		var attractionForce = A2($elm_explorations$linear_algebra$Math$Vector2$scale, ((5 * attractor.b0) * mover.b0) / attractionDistanceSquared, attractionDir);
		var newAcceleration = A3(
			$author$project$AngularMovement$ManyOrbitsWithRotation$applyForce,
			attractionForce,
			mover.b0,
			A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0));
		var newVelocity = A2($elm_explorations$linear_algebra$Math$Vector2$add, mover.by, newAcceleration);
		var newPosition = A2($elm_explorations$linear_algebra$Math$Vector2$add, mover.ax, newVelocity);
		return _Utils_update(
			oldMover,
			{
				a3: mover.a3 + mover.aP,
				aP: A3($author$project$AngularMovement$ManyOrbitsWithRotation$limitFloat, -2, 2, mover.aP + mover.bH),
				ax: newPosition,
				by: newVelocity
			});
	});
var $author$project$AngularMovement$ManyOrbitsWithRotation$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 0:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							at: A2(
								$elm$core$List$map,
								$author$project$AngularMovement$ManyOrbitsWithRotation$updateMover(model.F),
								model.at)
						}),
					$elm$core$Platform$Cmd$none);
			case 6:
				var movers = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{at: movers}),
					$elm$core$Platform$Cmd$none);
			case 5:
				return A2($author$project$AngularMovement$ManyOrbitsWithRotation$changeAttractorFill, $avh4$elm_color$Color$lightBlue, model);
			case 3:
				return A2($author$project$AngularMovement$ManyOrbitsWithRotation$changeAttractorFill, $avh4$elm_color$Color$blue, model);
			case 4:
				return A2($author$project$AngularMovement$ManyOrbitsWithRotation$changeAttractorFill, $avh4$elm_color$Color$darkBlue, model);
			case 1:
				var _v1 = msg.a;
				var dx = _v1.a;
				var dy = _v1.b;
				var attractor = model.F;
				var _v2 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(model.F.ax);
				var x = _v2.bz;
				var y = _v2.bB;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							F: _Utils_update(
								attractor,
								{
									ax: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, x + dx, y + dy)
								})
						}),
					$elm$core$Platform$Cmd$none);
			default:
				var dragMsg = msg.a;
				return A3($zaboco$elm_draggable$Draggable$update, $author$project$AngularMovement$ManyOrbitsWithRotation$dragConfig, dragMsg, model);
		}
	});
var $author$project$AngularMovement$PolarSwing$update = F2(
	function (msg, model) {
		var _v0 = model.ax;
		var r = _v0.a;
		var theta = _v0.b;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					ax: _Utils_Tuple2(r, theta + 0.03)
				}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$AngularMovement$SpinningBaton$update = F2(
	function (msg, model) {
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{a3: model.a3 + 2}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$AngularMovement$SpiralDrawer$update = F2(
	function (msg, model) {
		var _v0 = model.ax;
		var r = _v0.a;
		var theta = _v0.b;
		var newPosition = _Utils_Tuple2(r + 0.3, theta + 0.03);
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					aQ: A2($elm$core$List$cons, newPosition, model.aQ),
					ax: newPosition
				}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Forces$ArtworkGenerator$changeAttractorFill = F2(
	function (fill, model) {
		var oldAttractor = model.F;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					F: _Utils_update(
						oldAttractor,
						{bf: fill})
				}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Forces$ArtworkGenerator$OnDragBy = function (a) {
	return {$: 1, a: a};
};
var $author$project$Forces$ArtworkGenerator$dragConfig = $zaboco$elm_draggable$Draggable$basicConfig($author$project$Forces$ArtworkGenerator$OnDragBy);
var $author$project$Forces$ArtworkGenerator$emptyMover = {
	cl: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0),
	b0: 1,
	ax: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, $author$project$Forces$ArtworkGenerator$width / 2, $author$project$Forces$ArtworkGenerator$height / 2),
	by: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 1, 0)
};
var $elm_community$list_extra$List$Extra$last = function (items) {
	last:
	while (true) {
		if (!items.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			if (!items.b.b) {
				var x = items.a;
				return $elm$core$Maybe$Just(x);
			} else {
				var rest = items.b;
				var $temp$items = rest;
				items = $temp$items;
				continue last;
			}
		}
	}
};
var $author$project$Forces$ArtworkGenerator$applyForce = F3(
	function (force, mass, acceleration) {
		return A2(
			$elm_explorations$linear_algebra$Math$Vector2$add,
			acceleration,
			A2($elm_explorations$linear_algebra$Math$Vector2$scale, 1 / mass, force));
	});
var $author$project$Forces$ArtworkGenerator$limit = F3(
	function (minMagnitude, maxMagnitude, v) {
		var magnitude = $elm_explorations$linear_algebra$Math$Vector2$length(v);
		return (_Utils_cmp(magnitude, maxMagnitude) > 0) ? A2($elm_explorations$linear_algebra$Math$Vector2$scale, maxMagnitude / magnitude, v) : ((_Utils_cmp(magnitude, minMagnitude) < 0) ? A2($elm_explorations$linear_algebra$Math$Vector2$scale, minMagnitude / magnitude, v) : v);
	});
var $author$project$Forces$ArtworkGenerator$updateMover = F2(
	function (attractor, mover) {
		var oldMover = mover;
		var attractionDistance = A3(
			$author$project$Forces$ArtworkGenerator$limit,
			5,
			25,
			A2($elm_explorations$linear_algebra$Math$Vector2$sub, attractor.ax, mover.ax));
		var attractionDistanceSquared = $elm_explorations$linear_algebra$Math$Vector2$lengthSquared(attractionDistance);
		var attractionDir = $elm_explorations$linear_algebra$Math$Vector2$normalize(attractionDistance);
		var attractionForce = A2($elm_explorations$linear_algebra$Math$Vector2$scale, ((5 * attractor.b0) * mover.b0) / attractionDistanceSquared, attractionDir);
		var newAcceleration = A3(
			$author$project$Forces$ArtworkGenerator$applyForce,
			attractionForce,
			mover.b0,
			A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0));
		var newVelocity = A2($elm_explorations$linear_algebra$Math$Vector2$add, mover.by, newAcceleration);
		var newPosition = A2($elm_explorations$linear_algebra$Math$Vector2$add, mover.ax, newVelocity);
		return _Utils_update(
			oldMover,
			{ax: newPosition, by: newVelocity});
	});
var $author$project$Forces$ArtworkGenerator$updateMoverPath = F2(
	function (attractor, moverPaths) {
		var currrentMover = A2(
			$elm$core$Maybe$withDefault,
			$author$project$Forces$ArtworkGenerator$emptyMover,
			$elm_community$list_extra$List$Extra$last(moverPaths));
		return _Utils_ap(
			moverPaths,
			_List_fromArray(
				[
					A2($author$project$Forces$ArtworkGenerator$updateMover, attractor, currrentMover)
				]));
	});
var $author$project$Forces$ArtworkGenerator$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 0:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							as: A2(
								$elm$core$List$map,
								$author$project$Forces$ArtworkGenerator$updateMoverPath(model.F),
								model.as)
						}),
					$elm$core$Platform$Cmd$none);
			case 6:
				var moverPaths = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{as: moverPaths}),
					$elm$core$Platform$Cmd$none);
			case 5:
				return A2($author$project$Forces$ArtworkGenerator$changeAttractorFill, $avh4$elm_color$Color$lightBlue, model);
			case 3:
				return A2($author$project$Forces$ArtworkGenerator$changeAttractorFill, $avh4$elm_color$Color$blue, model);
			case 4:
				return A2($author$project$Forces$ArtworkGenerator$changeAttractorFill, $avh4$elm_color$Color$darkBlue, model);
			case 1:
				var _v1 = msg.a;
				var dx = _v1.a;
				var dy = _v1.b;
				var attractor = model.F;
				var _v2 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(model.F.ax);
				var x = _v2.bz;
				var y = _v2.bB;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							F: _Utils_update(
								attractor,
								{
									ax: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, x + dx, y + dy)
								})
						}),
					$elm$core$Platform$Cmd$none);
			default:
				var dragMsg = msg.a;
				return A3($zaboco$elm_draggable$Draggable$update, $author$project$Forces$ArtworkGenerator$dragConfig, dragMsg, model);
		}
	});
var $author$project$Forces$BlowingWind$applyForce = F3(
	function (force, mass, acceleration) {
		return A2(
			$elm_explorations$linear_algebra$Math$Vector2$add,
			acceleration,
			A2($elm_explorations$linear_algebra$Math$Vector2$scale, 1 / mass, force));
	});
var $elm_explorations$linear_algebra$Math$Vector2$fromRecord = _MJS_v2fromRecord;
var $author$project$Forces$BlowingWind$width = 600;
var $author$project$Forces$BlowingWind$update = F2(
	function (msg, model) {
		var windForce = A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0.01, 0);
		var r = model.ak;
		var gravityForce = A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0.1);
		var newAcceleration = A3(
			$author$project$Forces$BlowingWind$applyForce,
			windForce,
			model.b0,
			A3(
				$author$project$Forces$BlowingWind$applyForce,
				gravityForce,
				model.b0,
				A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0)));
		var newVelocity = $elm_explorations$linear_algebra$Math$Vector2$toRecord(
			A2($elm_explorations$linear_algebra$Math$Vector2$add, model.by, newAcceleration));
		var newPosition = $elm_explorations$linear_algebra$Math$Vector2$toRecord(
			A2(
				$elm_explorations$linear_algebra$Math$Vector2$add,
				model.ax,
				$elm_explorations$linear_algebra$Math$Vector2$fromRecord(newVelocity)));
		var newX = (_Utils_cmp(newPosition.bz, r) < 0) ? r : ((_Utils_cmp(newPosition.bz, $author$project$Forces$BlowingWind$width - r) > 0) ? ($author$project$Forces$BlowingWind$width - r) : newPosition.bz);
		var newY = (_Utils_cmp(newPosition.bB, r) < 0) ? r : ((_Utils_cmp(newPosition.bB, $author$project$Forces$BlowingWind$height - r) > 0) ? ($author$project$Forces$BlowingWind$height - r) : newPosition.bB);
		var newXVelocity = ((_Utils_cmp(newPosition.bz, r) < 0) || (_Utils_cmp(newPosition.bz, $author$project$Forces$BlowingWind$width - r) > 0)) ? ((-1) * newVelocity.bz) : newVelocity.bz;
		var newYVelocity = ((_Utils_cmp(newPosition.bB, r) < 0) || (_Utils_cmp(newPosition.bB, $author$project$Forces$BlowingWind$height - r) > 0)) ? ((-1) * newVelocity.bB) : newVelocity.bB;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					ax: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, newX, newY),
					by: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, newXVelocity, newYVelocity)
				}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Forces$BlowingWindWithGravity$applyForce = F3(
	function (force, mass, acceleration) {
		return A2(
			$elm_explorations$linear_algebra$Math$Vector2$add,
			acceleration,
			A2($elm_explorations$linear_algebra$Math$Vector2$scale, 1 / mass, force));
	});
var $author$project$Forces$BlowingWindWithGravity$ballRadiusFromMass = function (mass) {
	return mass * 30;
};
var $author$project$Forces$BlowingWindWithGravity$moveBall = function (b) {
	var windForce = A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0.01, 0);
	var r = $author$project$Forces$BlowingWindWithGravity$ballRadiusFromMass(b.b0);
	var gravityForce = A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0.1 * b.b0);
	var newAcceleration = A3(
		$author$project$Forces$BlowingWindWithGravity$applyForce,
		windForce,
		b.b0,
		A3(
			$author$project$Forces$BlowingWindWithGravity$applyForce,
			gravityForce,
			b.b0,
			A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0)));
	var newVelocity = $elm_explorations$linear_algebra$Math$Vector2$toRecord(
		A2($elm_explorations$linear_algebra$Math$Vector2$add, b.by, newAcceleration));
	var newPosition = $elm_explorations$linear_algebra$Math$Vector2$toRecord(
		A2(
			$elm_explorations$linear_algebra$Math$Vector2$add,
			b.ax,
			$elm_explorations$linear_algebra$Math$Vector2$fromRecord(newVelocity)));
	var newX = (_Utils_cmp(newPosition.bz, r) < 0) ? r : ((_Utils_cmp(newPosition.bz, $author$project$Forces$BlowingWindWithGravity$width - r) > 0) ? ($author$project$Forces$BlowingWindWithGravity$width - r) : newPosition.bz);
	var newY = (_Utils_cmp(newPosition.bB, r) < 0) ? r : ((_Utils_cmp(newPosition.bB, $author$project$Forces$BlowingWindWithGravity$height - r) > 0) ? ($author$project$Forces$BlowingWindWithGravity$height - r) : newPosition.bB);
	var newXVelocity = ((_Utils_cmp(newPosition.bz, r) < 0) || (_Utils_cmp(newPosition.bz, $author$project$Forces$BlowingWindWithGravity$width - r) > 0)) ? ((-1) * newVelocity.bz) : newVelocity.bz;
	var newYVelocity = ((_Utils_cmp(newPosition.bB, r) < 0) || (_Utils_cmp(newPosition.bB, $author$project$Forces$BlowingWindWithGravity$height - r) > 0)) ? ((-1) * newVelocity.bB) : newVelocity.bB;
	return _Utils_update(
		b,
		{
			ax: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, newX, newY),
			by: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, newXVelocity, newYVelocity)
		});
};
var $author$project$Forces$BlowingWindWithGravity$update = F2(
	function (msg, model) {
		if (!msg.$) {
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						al: A2($elm$core$List$map, $author$project$Forces$BlowingWindWithGravity$moveBall, model.al)
					}),
				$elm$core$Platform$Cmd$none);
		} else {
			var balls = msg.a;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{al: balls}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Forces$BlowingWindWithGravityAndFriction$applyForce = F3(
	function (force, mass, acceleration) {
		return A2(
			$elm_explorations$linear_algebra$Math$Vector2$add,
			acceleration,
			A2($elm_explorations$linear_algebra$Math$Vector2$scale, 1 / mass, force));
	});
var $author$project$Forces$BlowingWindWithGravityAndFriction$ballRadiusFromMass = function (mass) {
	return mass * 30;
};
var $author$project$Forces$BlowingWindWithGravityAndFriction$normalize = function (v) {
	return (!$elm_explorations$linear_algebra$Math$Vector2$length(v)) ? v : $elm_explorations$linear_algebra$Math$Vector2$normalize(v);
};
var $author$project$Forces$BlowingWindWithGravityAndFriction$moveBall = function (b) {
	var windForce = A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0.01, 0);
	var r = $author$project$Forces$BlowingWindWithGravityAndFriction$ballRadiusFromMass(b.b0);
	var gravityForce = A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0.1 * b.b0);
	var frictionForce = A2(
		$elm_explorations$linear_algebra$Math$Vector2$scale,
		-0.01,
		$author$project$Forces$BlowingWindWithGravityAndFriction$normalize(b.by));
	var newAcceleration = A3(
		$author$project$Forces$BlowingWindWithGravityAndFriction$applyForce,
		windForce,
		b.b0,
		A3(
			$author$project$Forces$BlowingWindWithGravityAndFriction$applyForce,
			gravityForce,
			b.b0,
			A3(
				$author$project$Forces$BlowingWindWithGravityAndFriction$applyForce,
				frictionForce,
				b.b0,
				A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0))));
	var newVelocity = $elm_explorations$linear_algebra$Math$Vector2$toRecord(
		A2($elm_explorations$linear_algebra$Math$Vector2$add, b.by, newAcceleration));
	var newPosition = $elm_explorations$linear_algebra$Math$Vector2$toRecord(
		A2(
			$elm_explorations$linear_algebra$Math$Vector2$add,
			b.ax,
			$elm_explorations$linear_algebra$Math$Vector2$fromRecord(newVelocity)));
	var newX = (_Utils_cmp(newPosition.bz, r) < 0) ? r : ((_Utils_cmp(newPosition.bz, $author$project$Forces$BlowingWindWithGravityAndFriction$width - r) > 0) ? ($author$project$Forces$BlowingWindWithGravityAndFriction$width - r) : newPosition.bz);
	var newY = (_Utils_cmp(newPosition.bB, r) < 0) ? r : ((_Utils_cmp(newPosition.bB, $author$project$Forces$BlowingWindWithGravityAndFriction$height - r) > 0) ? ($author$project$Forces$BlowingWindWithGravityAndFriction$height - r) : newPosition.bB);
	var newXVelocity = ((_Utils_cmp(newPosition.bz, r) < 0) || (_Utils_cmp(newPosition.bz, $author$project$Forces$BlowingWindWithGravityAndFriction$width - r) > 0)) ? ((-1) * newVelocity.bz) : newVelocity.bz;
	var newYVelocity = ((_Utils_cmp(newPosition.bB, r) < 0) || (_Utils_cmp(newPosition.bB, $author$project$Forces$BlowingWindWithGravityAndFriction$height - r) > 0)) ? ((-1) * newVelocity.bB) : newVelocity.bB;
	return _Utils_update(
		b,
		{
			ax: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, newX, newY),
			by: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, newXVelocity, newYVelocity)
		});
};
var $author$project$Forces$BlowingWindWithGravityAndFriction$update = F2(
	function (msg, model) {
		if (!msg.$) {
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						al: A2($elm$core$List$map, $author$project$Forces$BlowingWindWithGravityAndFriction$moveBall, model.al)
					}),
				$elm$core$Platform$Cmd$none);
		} else {
			var balls = msg.a;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{al: balls}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Forces$FloatingBalloon$applyForce = F3(
	function (force, mass, acceleration) {
		return A2(
			$elm_explorations$linear_algebra$Math$Vector2$add,
			acceleration,
			A2($elm_explorations$linear_algebra$Math$Vector2$scale, 1 / mass, force));
	});
var $author$project$Forces$FloatingBalloon$update = F2(
	function (msg, model) {
		var windForce = A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, -0.01);
		var r = model.bh / 2;
		var newAcceleration = A3(
			$author$project$Forces$FloatingBalloon$applyForce,
			windForce,
			model.b0,
			A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0));
		var newVelocity = $elm_explorations$linear_algebra$Math$Vector2$toRecord(
			A2($elm_explorations$linear_algebra$Math$Vector2$add, model.by, newAcceleration));
		var newPosition = $elm_explorations$linear_algebra$Math$Vector2$toRecord(
			A2(
				$elm_explorations$linear_algebra$Math$Vector2$add,
				model.ax,
				$elm_explorations$linear_algebra$Math$Vector2$fromRecord(newVelocity)));
		var newX = (_Utils_cmp(newPosition.bz, r) < 0) ? r : ((_Utils_cmp(newPosition.bz, $author$project$Forces$FloatingBalloon$width - r) > 0) ? ($author$project$Forces$FloatingBalloon$width - r) : newPosition.bz);
		var newY = (_Utils_cmp(newPosition.bB, r) < 0) ? r : ((_Utils_cmp(newPosition.bB, $author$project$Forces$FloatingBalloon$height - r) > 0) ? ($author$project$Forces$FloatingBalloon$height - r) : newPosition.bB);
		var newXVelocity = ((_Utils_cmp(newPosition.bz, r) < 0) || (_Utils_cmp(newPosition.bz, $author$project$Forces$FloatingBalloon$width - r) > 0)) ? ((-1) * newVelocity.bz) : newVelocity.bz;
		var newYVelocity = ((_Utils_cmp(newPosition.bB, r) < 0) || (_Utils_cmp(newPosition.bB, $author$project$Forces$FloatingBalloon$height - r) > 0)) ? ((-1) * newVelocity.bB) : newVelocity.bB;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					ax: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, newX, newY),
					by: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, newXVelocity, newYVelocity)
				}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Forces$ManyBalls$applyForce = F3(
	function (force, mass, acceleration) {
		return A2(
			$elm_explorations$linear_algebra$Math$Vector2$add,
			acceleration,
			A2($elm_explorations$linear_algebra$Math$Vector2$scale, 1 / mass, force));
	});
var $author$project$Forces$ManyBalls$ballRadiusFromMass = function (mass) {
	return mass * 30;
};
var $author$project$Forces$ManyBalls$moveBall = function (b) {
	var windForce = A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0.01, 0);
	var r = $author$project$Forces$ManyBalls$ballRadiusFromMass(b.b0);
	var gravityForce = A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0.1);
	var newAcceleration = A3(
		$author$project$Forces$ManyBalls$applyForce,
		windForce,
		b.b0,
		A3(
			$author$project$Forces$ManyBalls$applyForce,
			gravityForce,
			b.b0,
			A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0)));
	var newVelocity = $elm_explorations$linear_algebra$Math$Vector2$toRecord(
		A2($elm_explorations$linear_algebra$Math$Vector2$add, b.by, newAcceleration));
	var newPosition = $elm_explorations$linear_algebra$Math$Vector2$toRecord(
		A2(
			$elm_explorations$linear_algebra$Math$Vector2$add,
			b.ax,
			$elm_explorations$linear_algebra$Math$Vector2$fromRecord(newVelocity)));
	var newX = (_Utils_cmp(newPosition.bz, r) < 0) ? r : ((_Utils_cmp(newPosition.bz, $author$project$Forces$ManyBalls$width - r) > 0) ? ($author$project$Forces$ManyBalls$width - r) : newPosition.bz);
	var newY = (_Utils_cmp(newPosition.bB, r) < 0) ? r : ((_Utils_cmp(newPosition.bB, $author$project$Forces$ManyBalls$height - r) > 0) ? ($author$project$Forces$ManyBalls$height - r) : newPosition.bB);
	var newXVelocity = ((_Utils_cmp(newPosition.bz, r) < 0) || (_Utils_cmp(newPosition.bz, $author$project$Forces$ManyBalls$width - r) > 0)) ? ((-1) * newVelocity.bz) : newVelocity.bz;
	var newYVelocity = ((_Utils_cmp(newPosition.bB, r) < 0) || (_Utils_cmp(newPosition.bB, $author$project$Forces$ManyBalls$height - r) > 0)) ? ((-1) * newVelocity.bB) : newVelocity.bB;
	return _Utils_update(
		b,
		{
			ax: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, newX, newY),
			by: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, newXVelocity, newYVelocity)
		});
};
var $author$project$Forces$ManyBalls$update = F2(
	function (msg, model) {
		if (!msg.$) {
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						al: A2($elm$core$List$map, $author$project$Forces$ManyBalls$moveBall, model.al)
					}),
				$elm$core$Platform$Cmd$none);
		} else {
			var balls = msg.a;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{al: balls}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Forces$ManyOrbits$changeAttractorFill = F2(
	function (fill, model) {
		var oldAttractor = model.F;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					F: _Utils_update(
						oldAttractor,
						{bf: fill})
				}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Forces$ManyOrbits$OnDragBy = function (a) {
	return {$: 1, a: a};
};
var $author$project$Forces$ManyOrbits$dragConfig = $zaboco$elm_draggable$Draggable$basicConfig($author$project$Forces$ManyOrbits$OnDragBy);
var $author$project$Forces$ManyOrbits$applyForce = F3(
	function (force, mass, acceleration) {
		return A2(
			$elm_explorations$linear_algebra$Math$Vector2$add,
			acceleration,
			A2($elm_explorations$linear_algebra$Math$Vector2$scale, 1 / mass, force));
	});
var $author$project$Forces$ManyOrbits$limit = F3(
	function (minMagnitude, maxMagnitude, v) {
		var magnitude = $elm_explorations$linear_algebra$Math$Vector2$length(v);
		return (_Utils_cmp(magnitude, maxMagnitude) > 0) ? A2($elm_explorations$linear_algebra$Math$Vector2$scale, maxMagnitude / magnitude, v) : ((_Utils_cmp(magnitude, minMagnitude) < 0) ? A2($elm_explorations$linear_algebra$Math$Vector2$scale, minMagnitude / magnitude, v) : v);
	});
var $author$project$Forces$ManyOrbits$updateMover = F2(
	function (attractor, mover) {
		var oldMover = mover;
		var attractionDistance = A3(
			$author$project$Forces$ManyOrbits$limit,
			5,
			25,
			A2($elm_explorations$linear_algebra$Math$Vector2$sub, attractor.ax, mover.ax));
		var attractionDistanceSquared = $elm_explorations$linear_algebra$Math$Vector2$lengthSquared(attractionDistance);
		var attractionDir = $elm_explorations$linear_algebra$Math$Vector2$normalize(attractionDistance);
		var attractionForce = A2($elm_explorations$linear_algebra$Math$Vector2$scale, ((5 * attractor.b0) * mover.b0) / attractionDistanceSquared, attractionDir);
		var newAcceleration = A3(
			$author$project$Forces$ManyOrbits$applyForce,
			attractionForce,
			mover.b0,
			A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0));
		var newVelocity = A2($elm_explorations$linear_algebra$Math$Vector2$add, mover.by, newAcceleration);
		var newPosition = A2($elm_explorations$linear_algebra$Math$Vector2$add, mover.ax, newVelocity);
		return _Utils_update(
			oldMover,
			{ax: newPosition, by: newVelocity});
	});
var $author$project$Forces$ManyOrbits$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 0:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							at: A2(
								$elm$core$List$map,
								$author$project$Forces$ManyOrbits$updateMover(model.F),
								model.at)
						}),
					$elm$core$Platform$Cmd$none);
			case 6:
				var movers = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{at: movers}),
					$elm$core$Platform$Cmd$none);
			case 5:
				return A2($author$project$Forces$ManyOrbits$changeAttractorFill, $avh4$elm_color$Color$lightBlue, model);
			case 3:
				return A2($author$project$Forces$ManyOrbits$changeAttractorFill, $avh4$elm_color$Color$blue, model);
			case 4:
				return A2($author$project$Forces$ManyOrbits$changeAttractorFill, $avh4$elm_color$Color$darkBlue, model);
			case 1:
				var _v1 = msg.a;
				var dx = _v1.a;
				var dy = _v1.b;
				var attractor = model.F;
				var _v2 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(model.F.ax);
				var x = _v2.bz;
				var y = _v2.bB;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							F: _Utils_update(
								attractor,
								{
									ax: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, x + dx, y + dy)
								})
						}),
					$elm$core$Platform$Cmd$none);
			default:
				var dragMsg = msg.a;
				return A3($zaboco$elm_draggable$Draggable$update, $author$project$Forces$ManyOrbits$dragConfig, dragMsg, model);
		}
	});
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$core$List$tail = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(xs);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $elm_community$list_extra$List$Extra$removeAt = F2(
	function (index, l) {
		if (index < 0) {
			return l;
		} else {
			var tail = $elm$core$List$tail(
				A2($elm$core$List$drop, index, l));
			var head = A2($elm$core$List$take, index, l);
			if (tail.$ === 1) {
				return l;
			} else {
				var t = tail.a;
				return A2($elm$core$List$append, head, t);
			}
		}
	});
var $author$project$Forces$MutualAttraction$applyForce = F3(
	function (force, mass, acceleration) {
		return A2(
			$elm_explorations$linear_algebra$Math$Vector2$add,
			acceleration,
			A2($elm_explorations$linear_algebra$Math$Vector2$scale, 1 / mass, force));
	});
var $author$project$Forces$MutualAttraction$limit = F3(
	function (minMagnitude, maxMagnitude, v) {
		var magnitude = $elm_explorations$linear_algebra$Math$Vector2$length(v);
		return (_Utils_cmp(magnitude, maxMagnitude) > 0) ? A2($elm_explorations$linear_algebra$Math$Vector2$scale, maxMagnitude / magnitude, v) : ((_Utils_cmp(magnitude, minMagnitude) < 0) ? A2($elm_explorations$linear_algebra$Math$Vector2$scale, minMagnitude / magnitude, v) : v);
	});
var $author$project$Forces$MutualAttraction$calculateAttraction = F2(
	function (mover, attractor) {
		var attractionDistance = A3(
			$author$project$Forces$MutualAttraction$limit,
			5,
			25,
			A2($elm_explorations$linear_algebra$Math$Vector2$sub, attractor.ax, mover.ax));
		var attractionDistanceSquared = $elm_explorations$linear_algebra$Math$Vector2$lengthSquared(attractionDistance);
		var attractionDir = $elm_explorations$linear_algebra$Math$Vector2$normalize(attractionDistance);
		var attractionForce = A2($elm_explorations$linear_algebra$Math$Vector2$scale, ((5 * attractor.b0) * attractor.b0) / attractionDistanceSquared, attractionDir);
		return attractionForce;
	});
var $author$project$Forces$MutualAttraction$updateMover = F2(
	function (mover, others) {
		var oldMover = mover;
		var newAcceleration = A3(
			$elm$core$List$foldl,
			F2(
				function (attractor, acceleration) {
					var attractionForce = A2($author$project$Forces$MutualAttraction$calculateAttraction, mover, attractor);
					return A3($author$project$Forces$MutualAttraction$applyForce, attractionForce, attractor.b0, acceleration);
				}),
			A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0),
			others);
		var newVelocity = A2($elm_explorations$linear_algebra$Math$Vector2$add, mover.by, newAcceleration);
		var newPosition = A2($elm_explorations$linear_algebra$Math$Vector2$add, mover.ax, newVelocity);
		return _Utils_update(
			oldMover,
			{ax: newPosition, by: newVelocity});
	});
var $author$project$Forces$MutualAttraction$update = F2(
	function (msg, model) {
		if (!msg.$) {
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						at: A2(
							$elm$core$List$indexedMap,
							F2(
								function (index, mover) {
									return A2(
										$author$project$Forces$MutualAttraction$updateMover,
										mover,
										A2($elm_community$list_extra$List$Extra$removeAt, index, model.at));
								}),
							model.at)
					}),
				$elm$core$Platform$Cmd$none);
		} else {
			var movers = msg.a;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{at: movers}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Forces$MutualRepulsion$applyForce = F3(
	function (force, mass, acceleration) {
		return A2(
			$elm_explorations$linear_algebra$Math$Vector2$add,
			acceleration,
			A2($elm_explorations$linear_algebra$Math$Vector2$scale, 1 / mass, force));
	});
var $author$project$Forces$MutualRepulsion$limit = F3(
	function (minMagnitude, maxMagnitude, v) {
		var magnitude = $elm_explorations$linear_algebra$Math$Vector2$length(v);
		return (_Utils_cmp(magnitude, maxMagnitude) > 0) ? A2($elm_explorations$linear_algebra$Math$Vector2$scale, maxMagnitude / magnitude, v) : ((_Utils_cmp(magnitude, minMagnitude) < 0) ? A2($elm_explorations$linear_algebra$Math$Vector2$scale, minMagnitude / magnitude, v) : v);
	});
var $author$project$Forces$MutualRepulsion$calculateRepulsion = F2(
	function (mover, repulsor) {
		var repulsionDistance = A3(
			$author$project$Forces$MutualRepulsion$limit,
			5,
			25,
			A2($elm_explorations$linear_algebra$Math$Vector2$sub, repulsor.ax, mover.ax));
		var repulsionDistanceSquared = $elm_explorations$linear_algebra$Math$Vector2$lengthSquared(repulsionDistance);
		var repulsionDir = $elm_explorations$linear_algebra$Math$Vector2$normalize(repulsionDistance);
		var repulsionForce = A2($elm_explorations$linear_algebra$Math$Vector2$scale, ((((-1) * 5) * repulsor.b0) * repulsor.b0) / repulsionDistanceSquared, repulsionDir);
		return repulsionForce;
	});
var $author$project$Forces$MutualRepulsion$updateMover = F2(
	function (mover, others) {
		var oldMover = mover;
		var newAcceleration = A3(
			$elm$core$List$foldl,
			F2(
				function (repulsor, acceleration) {
					var repulsionForce = A2($author$project$Forces$MutualRepulsion$calculateRepulsion, mover, repulsor);
					return A3($author$project$Forces$MutualRepulsion$applyForce, repulsionForce, repulsor.b0, acceleration);
				}),
			A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0),
			others);
		var newVelocity = A2($elm_explorations$linear_algebra$Math$Vector2$add, mover.by, newAcceleration);
		var newPosition = A2($elm_explorations$linear_algebra$Math$Vector2$add, mover.ax, newVelocity);
		return _Utils_update(
			oldMover,
			{ax: newPosition, by: newVelocity});
	});
var $author$project$Forces$MutualRepulsion$update = F2(
	function (msg, model) {
		if (!msg.$) {
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						at: A2(
							$elm$core$List$indexedMap,
							F2(
								function (index, mover) {
									return A2(
										$author$project$Forces$MutualRepulsion$updateMover,
										mover,
										A2($elm_community$list_extra$List$Extra$removeAt, index, model.at));
								}),
							model.at)
					}),
				$elm$core$Platform$Cmd$none);
		} else {
			var movers = msg.a;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{at: movers}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Forces$Resistance$applyForce = F3(
	function (force, mass, acceleration) {
		return A2(
			$elm_explorations$linear_algebra$Math$Vector2$add,
			acceleration,
			A2($elm_explorations$linear_algebra$Math$Vector2$scale, 1 / mass, force));
	});
var $author$project$Forces$Resistance$ballRadiusFromMass = function (mass) {
	return mass * 30;
};
var $author$project$Forces$Resistance$moveBall = F2(
	function (resistor, b) {
		var r = $author$project$Forces$Resistance$ballRadiusFromMass(b.b0);
		var gravityForce = A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0.1);
		var frictionForce = A2(
			$elm_explorations$linear_algebra$Math$Vector2$scale,
			($elm_explorations$linear_algebra$Math$Vector2$lengthSquared(b.by) * resistor.bS) * (-1),
			$elm_explorations$linear_algebra$Math$Vector2$normalize(b.by));
		var newAcceleration = function () {
			var rp = $elm_explorations$linear_algebra$Math$Vector2$toRecord(resistor.ax);
			var bp = $elm_explorations$linear_algebra$Math$Vector2$toRecord(b.ax);
			var a = A3(
				$author$project$Forces$Resistance$applyForce,
				gravityForce,
				b.b0,
				A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0));
			return ((_Utils_cmp(bp.bz + r, rp.bz) > 0) && ((_Utils_cmp(bp.bz - r, rp.bz + resistor.ch) < 0) && ((_Utils_cmp(bp.bB + r, rp.bB) > 0) && (_Utils_cmp(bp.bB - r, rp.bB + resistor.bh) < 0)))) ? A3($author$project$Forces$Resistance$applyForce, frictionForce, b.b0, a) : a;
		}();
		var newVelocity = $elm_explorations$linear_algebra$Math$Vector2$toRecord(
			A2($elm_explorations$linear_algebra$Math$Vector2$add, b.by, newAcceleration));
		var newPosition = $elm_explorations$linear_algebra$Math$Vector2$toRecord(
			A2(
				$elm_explorations$linear_algebra$Math$Vector2$add,
				b.ax,
				$elm_explorations$linear_algebra$Math$Vector2$fromRecord(newVelocity)));
		var newX = (_Utils_cmp(newPosition.bz, r) < 0) ? r : ((_Utils_cmp(newPosition.bz, $author$project$Forces$Resistance$width - r) > 0) ? ($author$project$Forces$Resistance$width - r) : newPosition.bz);
		var newY = (_Utils_cmp(newPosition.bB, r) < 0) ? r : ((_Utils_cmp(newPosition.bB, $author$project$Forces$Resistance$height - r) > 0) ? ($author$project$Forces$Resistance$height - r) : newPosition.bB);
		var newXVelocity = ((_Utils_cmp(newPosition.bz, r) < 0) || (_Utils_cmp(newPosition.bz, $author$project$Forces$Resistance$width - r) > 0)) ? ((-1) * newVelocity.bz) : newVelocity.bz;
		var newYVelocity = ((_Utils_cmp(newPosition.bB, r) < 0) || (_Utils_cmp(newPosition.bB, $author$project$Forces$Resistance$height - r) > 0)) ? ((-1) * newVelocity.bB) : newVelocity.bB;
		return _Utils_update(
			b,
			{
				ax: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, newX, newY),
				by: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, newXVelocity, newYVelocity)
			});
	});
var $author$project$Forces$Resistance$update = F2(
	function (msg, model) {
		if (!msg.$) {
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						al: A2(
							$elm$core$List$map,
							$author$project$Forces$Resistance$moveBall(model.bq),
							model.al)
					}),
				$elm$core$Platform$Cmd$none);
		} else {
			var balls = msg.a;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{al: balls}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Forces$SingleOrbit$applyForce = F3(
	function (force, mass, acceleration) {
		return A2(
			$elm_explorations$linear_algebra$Math$Vector2$add,
			acceleration,
			A2($elm_explorations$linear_algebra$Math$Vector2$scale, 1 / mass, force));
	});
var $author$project$Forces$SingleOrbit$changeAttractorFill = F2(
	function (fill, model) {
		var oldAttractor = model.F;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					F: _Utils_update(
						oldAttractor,
						{bf: fill})
				}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Forces$SingleOrbit$OnDragBy = function (a) {
	return {$: 1, a: a};
};
var $author$project$Forces$SingleOrbit$dragConfig = $zaboco$elm_draggable$Draggable$basicConfig($author$project$Forces$SingleOrbit$OnDragBy);
var $author$project$Forces$SingleOrbit$limit = F3(
	function (minMagnitude, maxMagnitude, v) {
		var magnitude = $elm_explorations$linear_algebra$Math$Vector2$length(v);
		return (_Utils_cmp(magnitude, maxMagnitude) > 0) ? A2($elm_explorations$linear_algebra$Math$Vector2$scale, maxMagnitude / magnitude, v) : ((_Utils_cmp(magnitude, minMagnitude) < 0) ? A2($elm_explorations$linear_algebra$Math$Vector2$scale, minMagnitude / magnitude, v) : v);
	});
var $author$project$Forces$SingleOrbit$update = F2(
	function (msg, model) {
		var attractionDistance = A3(
			$author$project$Forces$SingleOrbit$limit,
			5,
			25,
			A2($elm_explorations$linear_algebra$Math$Vector2$sub, model.F.ax, model.z.ax));
		var attractionDistanceSquared = $elm_explorations$linear_algebra$Math$Vector2$lengthSquared(attractionDistance);
		var attractionDir = $elm_explorations$linear_algebra$Math$Vector2$normalize(attractionDistance);
		var attractionForce = A2($elm_explorations$linear_algebra$Math$Vector2$scale, ((5 * model.F.b0) * model.z.b0) / attractionDistanceSquared, attractionDir);
		var newAcceleration = A3(
			$author$project$Forces$SingleOrbit$applyForce,
			attractionForce,
			model.z.b0,
			A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0));
		var newVelocity = A2($elm_explorations$linear_algebra$Math$Vector2$add, model.z.by, newAcceleration);
		var newPosition = A2($elm_explorations$linear_algebra$Math$Vector2$add, model.z.ax, newVelocity);
		switch (msg.$) {
			case 0:
				var oldMover = model.z;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							z: _Utils_update(
								oldMover,
								{ax: newPosition, by: newVelocity})
						}),
					$elm$core$Platform$Cmd$none);
			case 5:
				return A2($author$project$Forces$SingleOrbit$changeAttractorFill, $avh4$elm_color$Color$lightBlue, model);
			case 3:
				return A2($author$project$Forces$SingleOrbit$changeAttractorFill, $avh4$elm_color$Color$blue, model);
			case 4:
				return A2($author$project$Forces$SingleOrbit$changeAttractorFill, $avh4$elm_color$Color$darkBlue, model);
			case 1:
				var _v1 = msg.a;
				var dx = _v1.a;
				var dy = _v1.b;
				var attractor = model.F;
				var _v2 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(model.F.ax);
				var x = _v2.bz;
				var y = _v2.bB;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							F: _Utils_update(
								attractor,
								{
									ax: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, x + dx, y + dy)
								})
						}),
					$elm$core$Platform$Cmd$none);
			default:
				var dragMsg = msg.a;
				return A3($zaboco$elm_draggable$Draggable$update, $author$project$Forces$SingleOrbit$dragConfig, dragMsg, model);
		}
	});
var $author$project$Forces$SinkingLogs$applyForce = F3(
	function (force, mass, acceleration) {
		return A2(
			$elm_explorations$linear_algebra$Math$Vector2$add,
			acceleration,
			A2($elm_explorations$linear_algebra$Math$Vector2$scale, 1 / mass, force));
	});
var $author$project$Forces$SinkingLogs$moveLog = F2(
	function (resistor, b) {
		var yr = b.bh / 2;
		var xr = b.ch / 2;
		var gravityForce = A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0.1);
		var frictionForce = A2(
			$elm_explorations$linear_algebra$Math$Vector2$scale,
			(($elm_explorations$linear_algebra$Math$Vector2$lengthSquared(b.by) * resistor.bS) * (b.ch * 0.1)) * (-1),
			$elm_explorations$linear_algebra$Math$Vector2$normalize(b.by));
		var newAcceleration = function () {
			var rp = $elm_explorations$linear_algebra$Math$Vector2$toRecord(resistor.ax);
			var bp = $elm_explorations$linear_algebra$Math$Vector2$toRecord(b.ax);
			var a = A3(
				$author$project$Forces$SinkingLogs$applyForce,
				gravityForce,
				b.b0,
				A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0));
			return ((_Utils_cmp(bp.bz + xr, rp.bz) > 0) && ((_Utils_cmp(bp.bz - xr, rp.bz + resistor.ch) < 0) && ((_Utils_cmp(bp.bB + yr, rp.bB) > 0) && (_Utils_cmp(bp.bB - yr, rp.bB + resistor.bh) < 0)))) ? A3($author$project$Forces$SinkingLogs$applyForce, frictionForce, b.b0, a) : a;
		}();
		var newVelocity = $elm_explorations$linear_algebra$Math$Vector2$toRecord(
			A2($elm_explorations$linear_algebra$Math$Vector2$add, b.by, newAcceleration));
		var newPosition = $elm_explorations$linear_algebra$Math$Vector2$toRecord(
			A2(
				$elm_explorations$linear_algebra$Math$Vector2$add,
				b.ax,
				$elm_explorations$linear_algebra$Math$Vector2$fromRecord(newVelocity)));
		var newX = (_Utils_cmp(newPosition.bz, xr) < 0) ? xr : ((_Utils_cmp(newPosition.bz, $author$project$Forces$SinkingLogs$width - xr) > 0) ? ($author$project$Forces$SinkingLogs$width - xr) : newPosition.bz);
		var newY = (_Utils_cmp(newPosition.bB, yr) < 0) ? yr : ((_Utils_cmp(newPosition.bB, $author$project$Forces$SinkingLogs$height - yr) > 0) ? ($author$project$Forces$SinkingLogs$height - yr) : newPosition.bB);
		var newXVelocity = ((_Utils_cmp(newPosition.bz, xr) < 0) || (_Utils_cmp(newPosition.bz, $author$project$Forces$SinkingLogs$width - xr) > 0)) ? ((-1) * newVelocity.bz) : newVelocity.bz;
		var newYVelocity = ((_Utils_cmp(newPosition.bB, yr) < 0) || (_Utils_cmp(newPosition.bB, $author$project$Forces$SinkingLogs$height - yr) > 0)) ? ((-1) * newVelocity.bB) : newVelocity.bB;
		return _Utils_update(
			b,
			{
				ax: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, newX, newY),
				by: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, newXVelocity, newYVelocity)
			});
	});
var $author$project$Forces$SinkingLogs$update = F2(
	function (msg, model) {
		if (!msg.$) {
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						ar: A2(
							$elm$core$List$map,
							$author$project$Forces$SinkingLogs$moveLog(model.bq),
							model.ar)
					}),
				$elm$core$Platform$Cmd$none);
		} else {
			var logs = msg.a;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{ar: logs}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Forces$WallBalls$applyForce = F3(
	function (force, mass, acceleration) {
		return A2(
			$elm_explorations$linear_algebra$Math$Vector2$add,
			acceleration,
			A2($elm_explorations$linear_algebra$Math$Vector2$scale, 1 / mass, force));
	});
var $author$project$Forces$WallBalls$ballRadiusFromMass = function (mass) {
	return mass * 30;
};
var $author$project$Forces$WallBalls$moveBall = function (b) {
	var windForce = A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0.01, 0);
	var r = $author$project$Forces$WallBalls$ballRadiusFromMass(b.b0);
	var oldPosition = $elm_explorations$linear_algebra$Math$Vector2$toRecord(b.ax);
	var wallForceX = (_Utils_cmp(oldPosition.bz, r) < 0) ? 5 : ((_Utils_cmp(oldPosition.bz, $author$project$Forces$WallBalls$width - r) > 0) ? (-5) : 0);
	var wallForceY = (_Utils_cmp(oldPosition.bB, r) < 0) ? 5 : ((_Utils_cmp(oldPosition.bB, $author$project$Forces$WallBalls$height - r) > 0) ? (-5) : 0);
	var wallForce = A2($elm_explorations$linear_algebra$Math$Vector2$vec2, wallForceX, wallForceY);
	var gravityForce = A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0.1);
	var newAcceleration = A3(
		$author$project$Forces$WallBalls$applyForce,
		windForce,
		b.b0,
		A3(
			$author$project$Forces$WallBalls$applyForce,
			gravityForce,
			b.b0,
			A3(
				$author$project$Forces$WallBalls$applyForce,
				wallForce,
				b.b0,
				A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0))));
	var newVelocity = A2($elm_explorations$linear_algebra$Math$Vector2$add, b.by, newAcceleration);
	var newPosition = A2($elm_explorations$linear_algebra$Math$Vector2$add, b.ax, newVelocity);
	return _Utils_update(
		b,
		{ax: newPosition, by: newVelocity});
};
var $author$project$Forces$WallBalls$update = F2(
	function (msg, model) {
		if (!msg.$) {
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						al: A2($elm$core$List$map, $author$project$Forces$WallBalls$moveBall, model.al)
					}),
				$elm$core$Platform$Cmd$none);
		} else {
			var balls = msg.a;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{al: balls}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Noise$AnimatedBox$update = F2(
	function (msg, model) {
		var newTime = model.bu + 0.06;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					bs: $author$project$Noise$AnimatedBox$getShades(newTime),
					bu: newTime
				}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Noise$MountainRange$update = F2(
	function (msg, model) {
		return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
	});
var $author$project$Noise$Perlin$permutationTable = $author$project$Noise$SimplexNoise$permutationTable(
	$elm$random$Random$initialSeed(42)).a;
var $author$project$Noise$Perlin$newLength = function (time) {
	return A5(
		$author$project$Utils$lerp,
		-1,
		1,
		300,
		600,
		A2($author$project$Noise$SimplexNoise$noise1d, $author$project$Noise$Perlin$permutationTable, time));
};
var $author$project$Noise$Perlin$update = F2(
	function (msg, model) {
		var newTime = model.bu + 0.01;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					aN: A2(
						$elm$core$List$cons,
						_Utils_Tuple2(
							newTime,
							$author$project$Noise$Perlin$newLength(newTime)),
						model.aN),
					bu: newTime
				}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Noise$PerlinBox$update = F2(
	function (msg, model) {
		return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Noise$PerlinStepWalker$permutationTable = $author$project$Noise$SimplexNoise$permutationTable(
	$elm$random$Random$initialSeed(42)).a;
var $author$project$Noise$PerlinStepWalker$newPosition = F2(
	function (_v0, oldPosition) {
		var tx = _v0.a;
		var ty = _v0.b;
		var generateStep = function (time) {
			return A5(
				$author$project$Utils$lerp,
				-1,
				1,
				-2,
				2,
				A2($author$project$Noise$SimplexNoise$noise1d, $author$project$Noise$PerlinStepWalker$permutationTable, time));
		};
		var _v1 = oldPosition;
		var oldX = _v1.a;
		var oldY = _v1.b;
		return _Utils_Tuple2(
			oldX + generateStep(tx),
			oldY + generateStep(ty));
	});
var $author$project$Noise$PerlinStepWalker$update = F2(
	function (msg, model) {
		var oldPosition = A2(
			$elm$core$Maybe$withDefault,
			_Utils_Tuple2(300, 300),
			$elm$core$List$head(model.ay));
		var _v1 = model.bu;
		var tx = _v1.a;
		var ty = _v1.b;
		var newTime = _Utils_Tuple2(tx + 0.01, ty + 0.01);
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					ay: A2(
						$elm$core$List$cons,
						A2($author$project$Noise$PerlinStepWalker$newPosition, newTime, oldPosition),
						model.ay),
					bu: newTime
				}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Noise$PerlinWalker$permutationTable = $author$project$Noise$SimplexNoise$permutationTable(
	$elm$random$Random$initialSeed(42)).a;
var $author$project$Noise$PerlinWalker$newPosition = function (_v0) {
	var tx = _v0.a;
	var ty = _v0.b;
	var generatePosition = function (time) {
		return A5(
			$author$project$Utils$lerp,
			-1,
			1,
			150,
			450,
			A2($author$project$Noise$SimplexNoise$noise1d, $author$project$Noise$PerlinWalker$permutationTable, time));
	};
	return _Utils_Tuple2(
		generatePosition(tx),
		generatePosition(ty));
};
var $author$project$Noise$PerlinWalker$update = F2(
	function (msg, model) {
		var _v1 = model.bu;
		var tx = _v1.a;
		var ty = _v1.b;
		var newTime = _Utils_Tuple2(tx + 0.01, ty + 0.01);
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					ay: A2(
						$elm$core$List$cons,
						$author$project$Noise$PerlinWalker$newPosition(newTime),
						model.ay),
					bu: newTime
				}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Noise$RandomBox$height = 100;
var $author$project$Noise$RandomBox$update = F2(
	function (msg, model) {
		var row = msg;
		var newShades = _Utils_ap(model.bs, row);
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{bs: newShades}),
			(_Utils_cmp(
				$elm$core$List$length(newShades),
				$elm$core$Basics$round($author$project$Noise$RandomBox$width * $author$project$Noise$RandomBox$height)) > -1) ? $elm$core$Platform$Cmd$none : $author$project$Noise$RandomBox$getRowOfShades);
	});
var $elm$core$Basics$sin = _Basics_sin;
var $author$project$Oscillations$ManyWaves$width = 600;
var $author$project$Oscillations$ManyWaves$updateWave = function (wave) {
	var newFirstAngle = wave.ao + wave.aJ;
	return _Utils_update(
		wave,
		{
			ao: newFirstAngle,
			ay: A2(
				$elm$core$List$map,
				function (ballIndex) {
					var newBallAngle = newFirstAngle + (ballIndex * wave.aP);
					var newPosition = A2(
						$elm_explorations$linear_algebra$Math$Vector2$vec2,
						(ballIndex / wave.av) * $author$project$Oscillations$ManyWaves$width,
						wave.aI * $elm$core$Basics$sin(newBallAngle));
					return newPosition;
				},
				A2($elm$core$List$range, 0, wave.av - 1))
		});
};
var $author$project$Oscillations$ManyWaves$update = F2(
	function (msg, model) {
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					a2: A2($elm$core$List$map, $author$project$Oscillations$ManyWaves$updateWave, model.a2)
				}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Oscillations$Oscillators$update = F2(
	function (msg, model) {
		if (!msg.$) {
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						aw: A2(
							$elm$core$List$map,
							function (o) {
								var newPosition = A2(
									$elm_explorations$linear_algebra$Math$Vector2$vec2,
									$elm_explorations$linear_algebra$Math$Vector2$getX(o.aI) * $elm$core$Basics$sin(
										$elm_explorations$linear_algebra$Math$Vector2$getX(o.a3)),
									$elm_explorations$linear_algebra$Math$Vector2$getY(o.aI) * $elm$core$Basics$sin(
										$elm_explorations$linear_algebra$Math$Vector2$getY(o.a3)));
								return _Utils_update(
									o,
									{
										a3: A2($elm_explorations$linear_algebra$Math$Vector2$add, o.a3, o.aP),
										ax: newPosition
									});
							},
							model.aw)
					}),
				$elm$core$Platform$Cmd$none);
		} else {
			var oscillators = msg.a;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{aw: oscillators}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Oscillations$Pendulum$update = F2(
	function (msg, model) {
		var gravity = 0.25;
		var newAlpha = ((-gravity) * $elm$core$Basics$sin(model.a3)) / model.aK;
		var newOmega = (model.aP + newAlpha) * model.bV;
		var newAngle = model.a3 + newOmega;
		var newPosition = A2(
			$elm_explorations$linear_algebra$Math$Vector2$vec2,
			model.aK * $elm$core$Basics$sin(newAngle),
			model.aK * $elm$core$Basics$cos(newAngle));
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{a3: newAngle, aP: newOmega, ax: newPosition}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Oscillations$RainbowSlinky$update = F2(
	function (msg, model) {
		var newPosition = A5(
			$author$project$Utils$lerp,
			-1,
			1,
			model.b3,
			model.aI,
			$elm$core$Basics$sin(((2 * $elm$core$Basics$pi) * model.bu) / model.b5));
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{ax: newPosition, bu: model.bu + 1}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Oscillations$SimpleHarmonicMotion$update = F2(
	function (msg, model) {
		var newPosition = model.aI * $elm$core$Basics$sin(((2 * $elm$core$Basics$pi) * model.bu) / model.b5);
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{ax: newPosition, bu: model.bu + 1}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Oscillations$SimpleHarmonicMotionWithAngle$update = F2(
	function (msg, model) {
		var newPosition = model.aI * $elm$core$Basics$sin(model.a3);
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{a3: model.a3 + model.aP, ax: newPosition}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Oscillations$SineWave$width = 600;
var $author$project$Oscillations$SineWave$update = F2(
	function (msg, model) {
		var newFirstAngle = model.ao + model.aJ;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					ao: newFirstAngle,
					ay: A2(
						$elm$core$List$map,
						function (ballIndex) {
							var newBallAngle = newFirstAngle + (ballIndex * model.aP);
							var newPosition = A2(
								$elm_explorations$linear_algebra$Math$Vector2$vec2,
								(ballIndex / model.av) * $author$project$Oscillations$SineWave$width,
								model.aI * $elm$core$Basics$sin(newBallAngle));
							return newPosition;
						},
						A2($elm$core$List$range, 0, model.av - 1))
				}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Oscillations$StaticSineWave$width = 600;
var $author$project$Oscillations$StaticSineWave$update = F2(
	function (msg, model) {
		var numberOfBalls = $author$project$Oscillations$StaticSineWave$width / model.bR;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					ay: A2(
						$elm$core$List$map,
						function (ballIndex) {
							var newBallAngle = model.ao + (ballIndex * model.aP);
							var newPosition = A2(
								$elm_explorations$linear_algebra$Math$Vector2$vec2,
								(ballIndex / numberOfBalls) * $author$project$Oscillations$StaticSineWave$width,
								model.aI * $elm$core$Basics$sin(newBallAngle));
							return newPosition;
						},
						A2(
							$elm$core$List$range,
							0,
							$elm$core$Basics$round(numberOfBalls) - 1))
				}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$RandomWalks$Basic$update = F2(
	function (msg, model) {
		if (!msg.$) {
			return _Utils_Tuple2(model, $author$project$RandomWalks$Basic$stepCmd);
		} else {
			var step = msg.a;
			var delta = 6;
			var _v1 = A2(
				$elm$core$Maybe$withDefault,
				$author$project$RandomWalks$Basic$defaultPosition,
				$elm$core$List$head(model.ay));
			var x = _v1.a;
			var y = _v1.b;
			var newPosition = function () {
				switch (step) {
					case 0:
						return _Utils_Tuple2(x, y + delta);
					case 1:
						return _Utils_Tuple2(x, y - delta);
					case 2:
						return _Utils_Tuple2(x - delta, y);
					default:
						return _Utils_Tuple2(x + delta, y);
				}
			}();
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						ay: A2($elm$core$List$cons, newPosition, model.ay)
					}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$RandomWalks$Directed$update = F2(
	function (msg, model) {
		if (!msg.$) {
			return _Utils_Tuple2(model, $author$project$RandomWalks$Directed$stepCmd);
		} else {
			var _v1 = msg.a;
			var xStep = _v1.a;
			var yStep = _v1.b;
			var delta = 6;
			var newPosition = F2(
				function (step, pos) {
					switch (step) {
						case 0:
							return pos - delta;
						case 1:
							return pos;
						default:
							return pos + delta;
					}
				});
			var _v2 = A2(
				$elm$core$Maybe$withDefault,
				$author$project$RandomWalks$Directed$defaultPosition,
				$elm$core$List$head(model.ay));
			var x = _v2.a;
			var y = _v2.b;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						ay: A2(
							$elm$core$List$cons,
							_Utils_Tuple2(
								A2(newPosition, xStep, x),
								A2(newPosition, yStep, y)),
							model.ay)
					}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$RandomWalks$Gaussian$update = F2(
	function (msg, model) {
		if (!msg.$) {
			return _Utils_Tuple2(model, $author$project$RandomWalks$Gaussian$stepCmd);
		} else {
			var _v1 = msg.a;
			var xStep = _v1.a;
			var yStep = _v1.b;
			var delta = 6;
			var _v2 = A2(
				$elm$core$Maybe$withDefault,
				$author$project$RandomWalks$Gaussian$defaultPosition,
				$elm$core$List$head(model.ay));
			var x = _v2.a;
			var y = _v2.b;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						ay: A2(
							$elm$core$List$cons,
							_Utils_Tuple2(
								x + ($elm$core$Basics$round(xStep) * delta),
								y + ($elm$core$Basics$round(yStep) * delta)),
							model.ay)
					}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$RandomWalks$Improved$update = F2(
	function (msg, model) {
		if (!msg.$) {
			return _Utils_Tuple2(model, $author$project$RandomWalks$Improved$stepCmd);
		} else {
			var _v1 = msg.a;
			var xStep = _v1.a;
			var yStep = _v1.b;
			var delta = 6;
			var newPosition = F2(
				function (step, pos) {
					switch (step) {
						case 0:
							return pos - delta;
						case 1:
							return pos;
						default:
							return pos + delta;
					}
				});
			var _v2 = A2(
				$elm$core$Maybe$withDefault,
				$author$project$RandomWalks$Improved$defaultPosition,
				$elm$core$List$head(model.ay));
			var x = _v2.a;
			var y = _v2.b;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						ay: A2(
							$elm$core$List$cons,
							_Utils_Tuple2(
								A2(newPosition, xStep, x),
								A2(newPosition, yStep, y)),
							model.ay)
					}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$RandomWalks$Levy$NewStep = function (a) {
	return {$: 2, a: a};
};
var $author$project$RandomWalks$Levy$stepCmd = function (stepSize) {
	var stepGenerator = A2($elm$random$Random$float, (-stepSize) * 6, stepSize * 6);
	return A2(
		$elm$random$Random$generate,
		$author$project$RandomWalks$Levy$NewStep,
		A2($elm$random$Random$pair, stepGenerator, stepGenerator));
};
var $author$project$RandomWalks$Levy$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 0:
				return _Utils_Tuple2(model, $author$project$RandomWalks$Levy$stepSizeCmd);
			case 1:
				var _v1 = msg.a;
				var stepSize = _v1.a;
				var probability = _v1.b;
				return (_Utils_cmp(probability, stepSize) > 0) ? _Utils_Tuple2(
					model,
					$author$project$RandomWalks$Levy$stepCmd(stepSize)) : _Utils_Tuple2(model, $author$project$RandomWalks$Levy$stepSizeCmd);
			default:
				var _v2 = msg.a;
				var xStep = _v2.a;
				var yStep = _v2.b;
				var delta = 6;
				var _v3 = A2(
					$elm$core$Maybe$withDefault,
					$author$project$RandomWalks$Levy$defaultPosition,
					$elm$core$List$head(model.ay));
				var x = _v3.a;
				var y = _v3.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							ay: A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									x + ($elm$core$Basics$round(xStep) * delta),
									y + ($elm$core$Basics$round(yStep) * delta)),
								model.ay)
						}),
					$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$RandomWalks$MonteCarlo$update = F2(
	function (msg, model) {
		if (!msg.$) {
			return _Utils_Tuple2(model, $author$project$RandomWalks$MonteCarlo$stepCmd);
		} else {
			var _v1 = msg.a;
			var newPosition = _v1.a;
			var probability = _v1.b;
			return (_Utils_cmp(probability, newPosition) < 0) ? _Utils_Tuple2(
				_Utils_update(
					model,
					{
						ay: A2($elm$core$List$cons, newPosition, model.ay)
					}),
				$elm$core$Platform$Cmd$none) : _Utils_Tuple2(model, $author$project$RandomWalks$MonteCarlo$stepCmd);
		}
	});
var $author$project$RandomWalks$NormalDistribution$update = F2(
	function (msg, model) {
		if (!msg.$) {
			return _Utils_Tuple2(model, $author$project$RandomWalks$NormalDistribution$stepCmd);
		} else {
			var newPosition = msg.a;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						ay: A2($elm$core$List$cons, newPosition, model.ay)
					}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$RandomWalks$PaintSplatter$nth = F3(
	function (n, _default, list) {
		nth:
		while (true) {
			if (n <= 0) {
				return A2(
					$elm$core$Maybe$withDefault,
					_default,
					$elm$core$List$head(list));
			} else {
				var $temp$n = n - 1,
					$temp$default = _default,
					$temp$list = A2(
					$elm$core$Maybe$withDefault,
					_List_Nil,
					$elm$core$List$tail(list));
				n = $temp$n;
				_default = $temp$default;
				list = $temp$list;
				continue nth;
			}
		}
	});
var $author$project$RandomWalks$PaintSplatter$colorFromRgba = function (rgba) {
	var r = A3($author$project$RandomWalks$PaintSplatter$nth, 0, 0, rgba);
	var g = A3($author$project$RandomWalks$PaintSplatter$nth, 1, 0, rgba);
	var b = A3($author$project$RandomWalks$PaintSplatter$nth, 2, 0, rgba);
	var a = A3($author$project$RandomWalks$PaintSplatter$nth, 3, 0, rgba);
	return A4($avh4$elm_color$Color$rgba, r, g, b, a);
};
var $author$project$RandomWalks$PaintSplatter$update = F2(
	function (msg, model) {
		if (!msg.$) {
			return _Utils_Tuple2(model, $author$project$RandomWalks$PaintSplatter$newPointCmd);
		} else {
			var _v1 = msg.a;
			var _v2 = _v1.a;
			var x = _v2.a;
			var y = _v2.b;
			var rgba = _v1.b;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						aT: A2(
							$elm$core$List$cons,
							_Utils_Tuple2(
								_Utils_Tuple2(
									$elm$core$Basics$round(x),
									$elm$core$Basics$round(y)),
								$author$project$RandomWalks$PaintSplatter$colorFromRgba(rgba)),
							model.aT)
					}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Vector$AccelerateTowardsMouse$height = 600;
var $author$project$Vector$AccelerateTowardsMouse$limit = F2(
	function (maxMagnitude, v) {
		var magnitude = $elm_explorations$linear_algebra$Math$Vector2$length(v);
		return (_Utils_cmp(magnitude, maxMagnitude) > 0) ? A2($elm_explorations$linear_algebra$Math$Vector2$scale, maxMagnitude / magnitude, v) : v;
	});
var $author$project$Vector$AccelerateTowardsMouse$width = 600;
var $author$project$Vector$AccelerateTowardsMouse$update = F2(
	function (msg, model) {
		if (!msg.$) {
			var r = model.ak;
			var newDirection = $elm_explorations$linear_algebra$Math$Vector2$normalize(
				A2($elm_explorations$linear_algebra$Math$Vector2$sub, model.bj, model.ax));
			var newAcceleration = A2($elm_explorations$linear_algebra$Math$Vector2$scale, 0.5, newDirection);
			var newVelocity = A2(
				$author$project$Vector$AccelerateTowardsMouse$limit,
				5,
				A2($elm_explorations$linear_algebra$Math$Vector2$add, model.by, newAcceleration));
			var newPosition = $elm_explorations$linear_algebra$Math$Vector2$toRecord(
				A2($elm_explorations$linear_algebra$Math$Vector2$add, model.ax, newVelocity));
			var newX = (_Utils_cmp(newPosition.bz, -r) < 1) ? ($author$project$Vector$AccelerateTowardsMouse$width + r) : ((_Utils_cmp(newPosition.bz, $author$project$Vector$AccelerateTowardsMouse$width + r) > -1) ? (-r) : newPosition.bz);
			var newY = (_Utils_cmp(newPosition.bB, -r) < 1) ? ($author$project$Vector$AccelerateTowardsMouse$height + r) : ((_Utils_cmp(newPosition.bB, $author$project$Vector$AccelerateTowardsMouse$height + r) > -1) ? (-r) : newPosition.bB);
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						ax: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, newX, newY),
						by: newVelocity
					}),
				$elm$core$Platform$Cmd$none);
		} else {
			var mx = msg.a;
			var my = msg.b;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						bj: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, mx, my)
					}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Vector$BouncingBall$height = 600;
var $author$project$Vector$BouncingBall$width = 600;
var $author$project$Vector$BouncingBall$update = F2(
	function (msg, model) {
		var ySpeed = model.bC;
		var xSpeed = model.bA;
		var r = model.ak;
		var _v0 = model.ax;
		var x = _v0.a;
		var y = _v0.b;
		var newX = x + xSpeed;
		var newXSpeed = ((_Utils_cmp(newX, r) < 1) || (_Utils_cmp(newX, $author$project$Vector$BouncingBall$width - r) > -1)) ? ((-1) * xSpeed) : xSpeed;
		var newY = y + ySpeed;
		var newYSpeed = ((_Utils_cmp(newY, r) < 1) || (_Utils_cmp(newY, $author$project$Vector$BouncingBall$height - r) > -1)) ? ((-1) * ySpeed) : ySpeed;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					ax: _Utils_Tuple2(newX, newY),
					bA: newXSpeed,
					bC: newYSpeed
				}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Vector$BouncingBallWithVector$height = 600;
var $author$project$Vector$BouncingBallWithVector$width = 600;
var $author$project$Vector$BouncingBallWithVector$update = F2(
	function (msg, model) {
		var speed = $elm_explorations$linear_algebra$Math$Vector2$toRecord(model.aW);
		var r = model.ak;
		var newPosition = $elm_explorations$linear_algebra$Math$Vector2$toRecord(
			A2($elm_explorations$linear_algebra$Math$Vector2$add, model.ax, model.aW));
		var newXSpeed = ((_Utils_cmp(newPosition.bz, r) < 1) || (_Utils_cmp(newPosition.bz, $author$project$Vector$BouncingBallWithVector$width - r) > -1)) ? ((-1) * speed.bz) : speed.bz;
		var newYSpeed = ((_Utils_cmp(newPosition.bB, r) < 1) || (_Utils_cmp(newPosition.bB, $author$project$Vector$BouncingBallWithVector$height - r) > -1)) ? ((-1) * speed.bB) : speed.bB;
		var _v0 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(model.ax);
		var x = _v0.bz;
		var y = _v0.bB;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					ax: $elm_explorations$linear_algebra$Math$Vector2$fromRecord(newPosition),
					aW: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, newXSpeed, newYSpeed)
				}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Vector$BrakingCar$height = 600;
var $author$project$Vector$BrakingCar$limit = F2(
	function (maxMagnitude, v) {
		var magnitude = $elm_explorations$linear_algebra$Math$Vector2$length(v);
		return (_Utils_cmp(magnitude, maxMagnitude) > 0) ? A2($elm_explorations$linear_algebra$Math$Vector2$scale, maxMagnitude / magnitude, v) : v;
	});
var $author$project$Vector$BrakingCar$width = 600;
var $author$project$Vector$BrakingCar$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 0:
				var r = model.ak;
				var newVelocity = function () {
					var _v1 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(
						A2(
							$author$project$Vector$BrakingCar$limit,
							10,
							A2($elm_explorations$linear_algebra$Math$Vector2$add, model.by, model.cl)));
					var x = _v1.bz;
					var y = _v1.bB;
					return (x < 0) ? A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0) : A2($elm_explorations$linear_algebra$Math$Vector2$vec2, x, y);
				}();
				var newPosition = $elm_explorations$linear_algebra$Math$Vector2$toRecord(
					A2($elm_explorations$linear_algebra$Math$Vector2$add, model.ax, newVelocity));
				var newX = (_Utils_cmp(newPosition.bz, -r) < 1) ? ($author$project$Vector$BrakingCar$width + r) : ((_Utils_cmp(newPosition.bz, $author$project$Vector$BrakingCar$width + r) > -1) ? (-r) : newPosition.bz);
				var newY = (_Utils_cmp(newPosition.bB, -r) < 1) ? ($author$project$Vector$BrakingCar$height + r) : ((_Utils_cmp(newPosition.bB, $author$project$Vector$BrakingCar$height + r) > -1) ? (-r) : newPosition.bB);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							cl: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0),
							ax: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, newX, newY),
							by: newVelocity
						}),
					$elm$core$Platform$Cmd$none);
			case 1:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							cl: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0.5, 0)
						}),
					$elm$core$Platform$Cmd$none);
			case 2:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							cl: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, -0.2, 0)
						}),
					$elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							cl: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0)
						}),
					$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Vector$ConstantAcceleration$height = 600;
var $author$project$Vector$ConstantAcceleration$limit = F2(
	function (maxMagnitude, v) {
		var magnitude = $elm_explorations$linear_algebra$Math$Vector2$length(v);
		return (_Utils_cmp(magnitude, maxMagnitude) > 0) ? A2($elm_explorations$linear_algebra$Math$Vector2$scale, maxMagnitude / magnitude, v) : v;
	});
var $author$project$Vector$ConstantAcceleration$width = 600;
var $author$project$Vector$ConstantAcceleration$update = F2(
	function (msg, model) {
		var r = model.ak;
		var newSpeed = A2(
			$author$project$Vector$ConstantAcceleration$limit,
			10,
			A2($elm_explorations$linear_algebra$Math$Vector2$add, model.by, model.cl));
		var newPosition = $elm_explorations$linear_algebra$Math$Vector2$toRecord(
			A2($elm_explorations$linear_algebra$Math$Vector2$add, model.ax, newSpeed));
		var newX = (_Utils_cmp(newPosition.bz, -r) < 1) ? ($author$project$Vector$ConstantAcceleration$width + r) : ((_Utils_cmp(newPosition.bz, $author$project$Vector$ConstantAcceleration$width + r) > -1) ? (-r) : newPosition.bz);
		var newY = (_Utils_cmp(newPosition.bB, -r) < 1) ? ($author$project$Vector$ConstantAcceleration$height + r) : ((_Utils_cmp(newPosition.bB, $author$project$Vector$ConstantAcceleration$height + r) > -1) ? (-r) : newPosition.bB);
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					ax: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, newX, newY),
					by: newSpeed
				}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Vector$ConstantVelocity$height = 600;
var $author$project$Vector$ConstantVelocity$width = 600;
var $author$project$Vector$ConstantVelocity$update = F2(
	function (msg, model) {
		var r = model.ak;
		var newPosition = $elm_explorations$linear_algebra$Math$Vector2$toRecord(
			A2($elm_explorations$linear_algebra$Math$Vector2$add, model.ax, model.by));
		var newX = (_Utils_cmp(newPosition.bz, -r) < 1) ? ($author$project$Vector$ConstantVelocity$width + r) : ((_Utils_cmp(newPosition.bz, $author$project$Vector$ConstantVelocity$width + r) > -1) ? (-r) : newPosition.bz);
		var newY = (_Utils_cmp(newPosition.bB, -r) < 1) ? ($author$project$Vector$ConstantVelocity$height + r) : ((_Utils_cmp(newPosition.bB, $author$project$Vector$ConstantVelocity$height + r) > -1) ? (-r) : newPosition.bB);
		if (!msg.$) {
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						ax: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, newX, newY)
					}),
				$elm$core$Platform$Cmd$none);
		} else {
			var _v1 = msg.a;
			var vx = _v1.a;
			var vy = _v1.b;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						by: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, vx, vy)
					}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Vector$GroupAccelerateTowardsMouse$height = 600;
var $author$project$Vector$GroupAccelerateTowardsMouse$limit = F2(
	function (maxMagnitude, v) {
		var magnitude = $elm_explorations$linear_algebra$Math$Vector2$length(v);
		return (_Utils_cmp(magnitude, maxMagnitude) > 0) ? A2($elm_explorations$linear_algebra$Math$Vector2$scale, maxMagnitude / magnitude, v) : v;
	});
var $author$project$Vector$GroupAccelerateTowardsMouse$movePoint = F2(
	function (model, p) {
		var r = model.ak;
		var newDirection = $elm_explorations$linear_algebra$Math$Vector2$normalize(
			A2($elm_explorations$linear_algebra$Math$Vector2$sub, model.bj, p.ax));
		var newAcceleration = A2($elm_explorations$linear_algebra$Math$Vector2$scale, 0.5, newDirection);
		var newVelocity = A2(
			$author$project$Vector$GroupAccelerateTowardsMouse$limit,
			5,
			A2($elm_explorations$linear_algebra$Math$Vector2$add, p.by, newAcceleration));
		var newPosition = $elm_explorations$linear_algebra$Math$Vector2$toRecord(
			A2($elm_explorations$linear_algebra$Math$Vector2$add, p.ax, newVelocity));
		var newX = (_Utils_cmp(newPosition.bz, -r) < 1) ? ($author$project$Vector$GroupAccelerateTowardsMouse$width + r) : ((_Utils_cmp(newPosition.bz, $author$project$Vector$GroupAccelerateTowardsMouse$width + r) > -1) ? (-r) : newPosition.bz);
		var newY = (_Utils_cmp(newPosition.bB, -r) < 1) ? ($author$project$Vector$GroupAccelerateTowardsMouse$height + r) : ((_Utils_cmp(newPosition.bB, $author$project$Vector$GroupAccelerateTowardsMouse$height + r) > -1) ? (-r) : newPosition.bB);
		return _Utils_update(
			p,
			{
				ax: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, newX, newY),
				by: newVelocity
			});
	});
var $author$project$Vector$GroupAccelerateTowardsMouse$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 0:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							aT: A2(
								$elm$core$List$map,
								$author$project$Vector$GroupAccelerateTowardsMouse$movePoint(model),
								model.aT)
						}),
					$elm$core$Platform$Cmd$none);
			case 2:
				var mx = msg.a;
				var my = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							bj: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, mx, my)
						}),
					$elm$core$Platform$Cmd$none);
			default:
				var positions = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							aT: A2(
								$elm$core$List$map,
								function (position) {
									return {
										cl: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0),
										ax: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, position.a, position.b),
										by: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, 0, 0)
									};
								},
								positions)
						}),
					$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Vector$MouseStalker$height = 600;
var $author$project$Vector$MouseStalker$limit = F2(
	function (maxMagnitude, v) {
		var magnitude = $elm_explorations$linear_algebra$Math$Vector2$length(v);
		return (_Utils_cmp(magnitude, maxMagnitude) > 0) ? A2($elm_explorations$linear_algebra$Math$Vector2$scale, maxMagnitude / magnitude, v) : v;
	});
var $author$project$Vector$MouseStalker$width = 600;
var $author$project$Vector$MouseStalker$update = F2(
	function (msg, model) {
		if (!msg.$) {
			var r = model.ak;
			var newDirection = A2($elm_explorations$linear_algebra$Math$Vector2$sub, model.bj, model.ax);
			var newMagnitude = $elm_explorations$linear_algebra$Math$Vector2$length(newDirection);
			var maxDirection = A2($elm_explorations$linear_algebra$Math$Vector2$vec2, $author$project$Vector$MouseStalker$width, $author$project$Vector$MouseStalker$height);
			var maxMagnitude = $elm_explorations$linear_algebra$Math$Vector2$length(maxDirection);
			var closeness = (maxMagnitude - newMagnitude) / maxMagnitude;
			var newAcceleration = A2(
				$elm_explorations$linear_algebra$Math$Vector2$scale,
				closeness,
				$elm_explorations$linear_algebra$Math$Vector2$normalize(newDirection));
			var newVelocity = A2(
				$author$project$Vector$MouseStalker$limit,
				10,
				A2($elm_explorations$linear_algebra$Math$Vector2$add, model.by, newAcceleration));
			var newPosition = $elm_explorations$linear_algebra$Math$Vector2$toRecord(
				A2($elm_explorations$linear_algebra$Math$Vector2$add, model.ax, newVelocity));
			var newX = (_Utils_cmp(newPosition.bz, -r) < 1) ? ($author$project$Vector$MouseStalker$width + r) : ((_Utils_cmp(newPosition.bz, $author$project$Vector$MouseStalker$width + r) > -1) ? (-r) : newPosition.bz);
			var newY = (_Utils_cmp(newPosition.bB, -r) < 1) ? ($author$project$Vector$MouseStalker$height + r) : ((_Utils_cmp(newPosition.bB, $author$project$Vector$MouseStalker$height + r) > -1) ? (-r) : newPosition.bB);
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						ax: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, newX, newY),
						by: newVelocity
					}),
				$elm$core$Platform$Cmd$none);
		} else {
			var mx = msg.a;
			var my = msg.b;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						bj: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, mx, my)
					}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Vector$MouseTracing$update = F2(
	function (msg, model) {
		var x = msg.a;
		var y = msg.b;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					bj: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, x, y)
				}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Vector$MouseTracingNormalized$update = F2(
	function (msg, model) {
		var x = msg.a;
		var y = msg.b;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					bj: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, x, y)
				}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Vector$MouseTracingScaled$update = F2(
	function (msg, model) {
		var x = msg.a;
		var y = msg.b;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					bj: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, x, y)
				}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Vector$MouseTracingWithMagnitude$update = F2(
	function (msg, model) {
		var x = msg.a;
		var y = msg.b;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					bj: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, x, y)
				}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Vector$RandomAcceleration$height = 600;
var $author$project$Vector$RandomAcceleration$limit = F2(
	function (maxMagnitude, v) {
		var magnitude = $elm_explorations$linear_algebra$Math$Vector2$length(v);
		return (_Utils_cmp(magnitude, maxMagnitude) > 0) ? A2($elm_explorations$linear_algebra$Math$Vector2$scale, maxMagnitude / magnitude, v) : v;
	});
var $author$project$Vector$RandomAcceleration$GetAcceleration = function (a) {
	return {$: 1, a: a};
};
var $author$project$Vector$RandomAcceleration$randomAcceleration = function () {
	var randomComponent = A2($elm$random$Random$float, -2, 2);
	return A2(
		$elm$random$Random$generate,
		$author$project$Vector$RandomAcceleration$GetAcceleration,
		A2($elm$random$Random$pair, randomComponent, randomComponent));
}();
var $author$project$Vector$RandomAcceleration$width = 600;
var $author$project$Vector$RandomAcceleration$update = F2(
	function (msg, model) {
		var r = model.ak;
		var newSpeed = A2(
			$author$project$Vector$RandomAcceleration$limit,
			10,
			A2($elm_explorations$linear_algebra$Math$Vector2$add, model.by, model.cl));
		var newPosition = $elm_explorations$linear_algebra$Math$Vector2$toRecord(
			A2($elm_explorations$linear_algebra$Math$Vector2$add, model.ax, newSpeed));
		var newX = (_Utils_cmp(newPosition.bz, -r) < 1) ? ($author$project$Vector$RandomAcceleration$width + r) : ((_Utils_cmp(newPosition.bz, $author$project$Vector$RandomAcceleration$width + r) > -1) ? (-r) : newPosition.bz);
		var newY = (_Utils_cmp(newPosition.bB, -r) < 1) ? ($author$project$Vector$RandomAcceleration$height + r) : ((_Utils_cmp(newPosition.bB, $author$project$Vector$RandomAcceleration$height + r) > -1) ? (-r) : newPosition.bB);
		if (!msg.$) {
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						ax: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, newX, newY),
						by: newSpeed
					}),
				$author$project$Vector$RandomAcceleration$randomAcceleration);
		} else {
			var _v1 = msg.a;
			var ax = _v1.a;
			var ay = _v1.b;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						cl: A2($elm_explorations$linear_algebra$Math$Vector2$vec2, ax, ay)
					}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Vector$ScalingSaber$scaleSaber = F2(
	function (scale, saberHead) {
		return A2(
			$elm_explorations$linear_algebra$Math$Vector2$add,
			$author$project$Vector$ScalingSaber$saberTail,
			A2(
				$elm_explorations$linear_algebra$Math$Vector2$scale,
				scale,
				A2($elm_explorations$linear_algebra$Math$Vector2$sub, saberHead, $author$project$Vector$ScalingSaber$saberTail)));
	});
var $author$project$Vector$ScalingSaber$update = F2(
	function (msg, model) {
		switch (msg) {
			case 0:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							ag: A2($author$project$Vector$ScalingSaber$scaleSaber, 2, model.ag)
						}),
					$elm$core$Platform$Cmd$none);
			case 1:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							ag: A2($author$project$Vector$ScalingSaber$scaleSaber, 0.5, model.ag)
						}),
					$elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Vector$WalkerWithVector$update = F2(
	function (msg, model) {
		if (!msg.$) {
			return _Utils_Tuple2(model, $author$project$Vector$WalkerWithVector$stepCmd);
		} else {
			var _v1 = msg.a;
			var x = _v1.a;
			var y = _v1.b;
			var position = A2(
				$elm$core$Maybe$withDefault,
				$author$project$Vector$WalkerWithVector$defaultPosition,
				$elm$core$List$head(model.ay));
			var delta = 6;
			var newPosition = A2(
				$elm_explorations$linear_algebra$Math$Vector2$add,
				position,
				$elm_explorations$linear_algebra$Math$Vector2$fromRecord(
					{
						bz: $elm$core$Basics$round(x) * delta,
						bB: $elm$core$Basics$round(y) * delta
					}));
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						ay: A2($elm$core$List$cons, newPosition, model.ay)
					}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Main$update = F2(
	function (msg, model) {
		var _v0 = _Utils_Tuple2(msg, model.a);
		_v0$61:
		while (true) {
			switch (_v0.a.$) {
				case 0:
					var anim = _v0.a.a;
					switch (anim) {
						case 0:
							var _v2 = $author$project$RandomWalks$Basic$init(0);
							var subModel = _v2.a;
							var subCmd = _v2.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$RandomWalksBasicAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$BasicWalkerMsg, subCmd));
						case 1:
							var _v3 = $author$project$AngularMovement$AccelerateTowardsMouse$init(0);
							var subModel = _v3.a;
							var subCmd = _v3.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$AngularMovementAccelerateTowardsMouseAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$AngularMovementAccelerateTowardsMouseMsg, subCmd));
						case 2:
							var _v4 = $author$project$AngularMovement$AcceleratingBaton$init(0);
							var subModel = _v4.a;
							var subCmd = _v4.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$AngularMovementAcceleratingBatonAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$AngularMovementAcceleratingBatonMsg, subCmd));
						case 3:
							var _v5 = $author$project$Forces$ArtworkGenerator$init(0);
							var subModel = _v5.a;
							var subCmd = _v5.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$ForcesArtworkGeneratorAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$ForcesArtworkGeneratorMsg, subCmd));
						case 4:
							var _v6 = $author$project$Forces$BlowingWind$init(0);
							var subModel = _v6.a;
							var subCmd = _v6.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$ForcesBlowingWindAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$ForcesBlowingWindMsg, subCmd));
						case 5:
							var _v7 = $author$project$AngularMovement$FallingBoulder$init(0);
							var subModel = _v7.a;
							var subCmd = _v7.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$AngularMovementFallingBoulderAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$AngularMovementFallingBoulderMsg, subCmd));
						case 6:
							var _v8 = $author$project$Forces$BlowingWindWithGravity$init(0);
							var subModel = _v8.a;
							var subCmd = _v8.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$ForcesBlowingWindWithGravityAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$ForcesBlowingWindWithGravityMsg, subCmd));
						case 7:
							var _v9 = $author$project$Noise$AnimatedBox$init(0);
							var subModel = _v9.a;
							var subCmd = _v9.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$NoiseAnimatedBoxAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$NoiseAnimatedBoxMsg, subCmd));
						case 8:
							var _v10 = $author$project$AngularMovement$ManyOrbitsWithDynamicRotation$init(0);
							var subModel = _v10.a;
							var subCmd = _v10.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$AngularMovementManyOrbitsWithDynamicRotationAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$AngularMovementManyOrbitsWithDynamicRotationMsg, subCmd));
						case 9:
							var _v11 = $author$project$Forces$BlowingWindWithGravityAndFriction$init(0);
							var subModel = _v11.a;
							var subCmd = _v11.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$ForcesBlowingWindWithGravityAndFrictionAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$ForcesBlowingWindWithGravityAndFrictionMsg, subCmd));
						case 10:
							var _v12 = $author$project$Noise$MountainRange$init(0);
							var subModel = _v12.a;
							var subCmd = _v12.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$NoiseMountainRangeAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$NoiseMountainRangeMsg, subCmd));
						case 11:
							var _v13 = $author$project$Oscillations$ManyWaves$init(0);
							var subModel = _v13.a;
							var subCmd = _v13.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$OscillationsManyWavesAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$OscillationsManyWavesMsg, subCmd));
						case 12:
							var _v14 = $author$project$AngularMovement$ManyOrbitsWithRotation$init(0);
							var subModel = _v14.a;
							var subCmd = _v14.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$AngularMovementManyOrbitsWithRotationAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$AngularMovementManyOrbitsWithRotationMsg, subCmd));
						case 13:
							var _v15 = $author$project$Forces$FloatingBalloon$init(0);
							var subModel = _v15.a;
							var subCmd = _v15.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$ForcesFloatingBalloonAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$ForcesFloatingBalloonMsg, subCmd));
						case 14:
							var _v16 = $author$project$Noise$Perlin$init(0);
							var subModel = _v16.a;
							var subCmd = _v16.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$NoisePerlinAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$NoisePerlinMsg, subCmd));
						case 15:
							var _v17 = $author$project$Oscillations$Oscillators$init(0);
							var subModel = _v17.a;
							var subCmd = _v17.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$OscillationsOscillatorsAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$OscillationsOscillatorsMsg, subCmd));
						case 16:
							var _v18 = $author$project$AngularMovement$PolarSwing$init(0);
							var subModel = _v18.a;
							var subCmd = _v18.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$AngularMovementPolarSwingAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$AngularMovementPolarSwingMsg, subCmd));
						case 17:
							var _v19 = $author$project$Forces$ManyBalls$init(0);
							var subModel = _v19.a;
							var subCmd = _v19.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$ForcesManyBallsAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$ForcesManyBallsMsg, subCmd));
						case 18:
							var _v20 = $author$project$Noise$PerlinBox$init(0);
							var subModel = _v20.a;
							var subCmd = _v20.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$NoisePerlinBoxAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$NoisePerlinBoxMsg, subCmd));
						case 19:
							var _v21 = $author$project$Oscillations$Pendulum$init(0);
							var subModel = _v21.a;
							var subCmd = _v21.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$OscillationsPendulumAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$OscillationsPendulumMsg, subCmd));
						case 20:
							var _v22 = $author$project$RandomWalks$Directed$init(0);
							var subModel = _v22.a;
							var subCmd = _v22.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$RandomWalksDirectedAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$RandomWalksDirectedMsg, subCmd));
						case 21:
							var _v23 = $author$project$AngularMovement$SpinningBaton$init(0);
							var subModel = _v23.a;
							var subCmd = _v23.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$AngularMovementSpinningBatonAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$AngularMovementSpinningBatonMsg, subCmd));
						case 22:
							var _v24 = $author$project$Forces$ManyOrbits$init(0);
							var subModel = _v24.a;
							var subCmd = _v24.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$ForcesManyOrbitsAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$ForcesManyOrbitsMsg, subCmd));
						case 23:
							var _v25 = $author$project$Noise$PerlinStepWalker$init(0);
							var subModel = _v25.a;
							var subCmd = _v25.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$NoisePerlinStepWalkerAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$NoisePerlinStepWalkerMsg, subCmd));
						case 24:
							var _v26 = $author$project$Oscillations$RainbowSlinky$init(0);
							var subModel = _v26.a;
							var subCmd = _v26.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$OscillationsRainbowSlinkyAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$OscillationsRainbowSlinkyMsg, subCmd));
						case 25:
							var _v27 = $author$project$RandomWalks$Gaussian$init(0);
							var subModel = _v27.a;
							var subCmd = _v27.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$RandomWalksGaussianAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$RandomWalksGaussianMsg, subCmd));
						case 26:
							var _v28 = $author$project$Vector$AccelerateTowardsMouse$init(0);
							var subModel = _v28.a;
							var subCmd = _v28.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$VectorAccelerateTowardsMouseAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$VectorAccelerateTowardsMouseMsg, subCmd));
						case 27:
							var _v29 = $author$project$AngularMovement$SpiralDrawer$init(0);
							var subModel = _v29.a;
							var subCmd = _v29.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$AngularMovementSpiralDrawerAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$AngularMovementSpiralDrawerMsg, subCmd));
						case 28:
							var _v30 = $author$project$Forces$MutualAttraction$init(0);
							var subModel = _v30.a;
							var subCmd = _v30.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$ForcesMutualAttractionAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$ForcesMutualAttractionMsg, subCmd));
						case 29:
							var _v31 = $author$project$Noise$PerlinWalker$init(0);
							var subModel = _v31.a;
							var subCmd = _v31.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$NoisePerlinWalkerAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$NoisePerlinWalkerMsg, subCmd));
						case 30:
							var _v32 = $author$project$Oscillations$SimpleHarmonicMotion$init(0);
							var subModel = _v32.a;
							var subCmd = _v32.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$OscillationsSimpleHarmonicMotionAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$OscillationsSimpleHarmonicMotionMsg, subCmd));
						case 31:
							var _v33 = $author$project$RandomWalks$Improved$init(0);
							var subModel = _v33.a;
							var subCmd = _v33.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$RandomWalksImprovedAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$RandomWalksImprovedMsg, subCmd));
						case 32:
							var _v34 = $author$project$Vector$BouncingBall$init(0);
							var subModel = _v34.a;
							var subCmd = _v34.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$VectorBouncingBallAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$VectorBouncingBallMsg, subCmd));
						case 33:
							var _v35 = $author$project$Forces$MutualRepulsion$init(0);
							var subModel = _v35.a;
							var subCmd = _v35.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$ForcesMutualRepulsionAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$ForcesMutualRepulsionMsg, subCmd));
						case 34:
							var _v36 = $author$project$Noise$RandomBox$init(0);
							var subModel = _v36.a;
							var subCmd = _v36.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$NoiseRandomBoxAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$NoiseRandomBoxMsg, subCmd));
						case 35:
							var _v37 = $author$project$Oscillations$SimpleHarmonicMotionWithAngle$init(0);
							var subModel = _v37.a;
							var subCmd = _v37.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$OscillationsSimpleHarmonicMotionWithAngleAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$OscillationsSimpleHarmonicMotionWithAngleMsg, subCmd));
						case 36:
							var _v38 = $author$project$RandomWalks$Levy$init(0);
							var subModel = _v38.a;
							var subCmd = _v38.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$RandomWalksLevyAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$RandomWalksLevyMsg, subCmd));
						case 37:
							var _v39 = $author$project$Vector$BouncingBallWithVector$init(0);
							var subModel = _v39.a;
							var subCmd = _v39.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$VectorBouncingBallWithVectorAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$VectorBouncingBallWithVectorMsg, subCmd));
						case 38:
							var _v40 = $author$project$Forces$Resistance$init(0);
							var subModel = _v40.a;
							var subCmd = _v40.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$ForcesResistanceAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$ForcesResistanceMsg, subCmd));
						case 39:
							var _v41 = $author$project$Oscillations$SineWave$init(0);
							var subModel = _v41.a;
							var subCmd = _v41.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$OscillationsSineWaveAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$OscillationsSineWaveMsg, subCmd));
						case 40:
							var _v42 = $author$project$RandomWalks$MonteCarlo$init(0);
							var subModel = _v42.a;
							var subCmd = _v42.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$RandomWalksMonteCarloAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$RandomWalksMonteCarloMsg, subCmd));
						case 41:
							var _v43 = $author$project$Vector$BrakingCar$init(0);
							var subModel = _v43.a;
							var subCmd = _v43.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$VectorBrakingCarAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$VectorBrakingCarMsg, subCmd));
						case 42:
							var _v44 = $author$project$Forces$SingleOrbit$init(0);
							var subModel = _v44.a;
							var subCmd = _v44.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$ForcesSingleOrbitAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$ForcesSingleOrbitMsg, subCmd));
						case 43:
							var _v45 = $author$project$Oscillations$StaticSineWave$init(0);
							var subModel = _v45.a;
							var subCmd = _v45.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$OscillationsStaticSineWaveAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$OscillationsStaticSineWaveMsg, subCmd));
						case 44:
							var _v46 = $author$project$RandomWalks$NormalDistribution$init(0);
							var subModel = _v46.a;
							var subCmd = _v46.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$RandomWalksNormalDistributionAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$RandomWalksNormalDistributionMsg, subCmd));
						case 45:
							var _v47 = $author$project$Vector$ConstantAcceleration$init(0);
							var subModel = _v47.a;
							var subCmd = _v47.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$VectorConstantAccelerationAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$VectorConstantAccelerationMsg, subCmd));
						case 46:
							var _v48 = $author$project$Forces$SinkingLogs$init(0);
							var subModel = _v48.a;
							var subCmd = _v48.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$ForcesSinkingLogsAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$ForcesSinkingLogsMsg, subCmd));
						case 47:
							var _v49 = $author$project$RandomWalks$PaintSplatter$init(0);
							var subModel = _v49.a;
							var subCmd = _v49.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$RandomWalksPaintSplatterAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$RandomWalksPaintSplatterMsg, subCmd));
						case 48:
							var _v50 = $author$project$Vector$ConstantVelocity$init(0);
							var subModel = _v50.a;
							var subCmd = _v50.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$VectorConstantVelocityAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$VectorConstantVelocityMsg, subCmd));
						case 49:
							var _v51 = $author$project$Forces$WallBalls$init(0);
							var subModel = _v51.a;
							var subCmd = _v51.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$ForcesWallBallsAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$ForcesWallBallsMsg, subCmd));
						case 50:
							var _v52 = $author$project$Vector$GroupAccelerateTowardsMouse$init(0);
							var subModel = _v52.a;
							var subCmd = _v52.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$VectorGroupAccelerateTowardsMouseAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$VectorGroupAccelerateTowardsMouseMsg, subCmd));
						case 51:
							var _v53 = $author$project$Vector$MouseStalker$init(0);
							var subModel = _v53.a;
							var subCmd = _v53.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$VectorMouseStalkerAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$VectorMouseStalkerMsg, subCmd));
						case 52:
							var _v54 = $author$project$Vector$MouseTracing$init(0);
							var subModel = _v54.a;
							var subCmd = _v54.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$VectorMouseTracingAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$VectorMouseTracingMsg, subCmd));
						case 53:
							var _v55 = $author$project$Vector$MouseTracingNormalized$init(0);
							var subModel = _v55.a;
							var subCmd = _v55.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$VectorMouseTracingNormalizedAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$VectorMouseTracingNormalizedMsg, subCmd));
						case 54:
							var _v56 = $author$project$Vector$MouseTracingScaled$init(0);
							var subModel = _v56.a;
							var subCmd = _v56.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$VectorMouseTracingScaledAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$VectorMouseTracingScaledMsg, subCmd));
						case 55:
							var _v57 = $author$project$Vector$MouseTracingWithMagnitude$init(0);
							var subModel = _v57.a;
							var subCmd = _v57.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$VectorMouseTracingWithMagnitudeAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$VectorMouseTracingWithMagnitudeMsg, subCmd));
						case 56:
							var _v58 = $author$project$Vector$RandomAcceleration$init(0);
							var subModel = _v58.a;
							var subCmd = _v58.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$VectorRandomAccelerationAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$VectorRandomAccelerationMsg, subCmd));
						case 57:
							var _v59 = $author$project$Vector$ScalingSaber$init(0);
							var subModel = _v59.a;
							var subCmd = _v59.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$VectorScalingSaberAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$VectorScalingSaberMsg, subCmd));
						default:
							var _v60 = $author$project$Vector$WalkerWithVector$init(0);
							var subModel = _v60.a;
							var subCmd = _v60.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										a: $author$project$Main$VectorWalkerWithVectorAnim(subModel)
									}),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$VectorWalkerWithVectorMsg, subCmd));
					}
				case 2:
					if (!_v0.b.$) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v61 = A2($author$project$RandomWalks$Basic$update, subMsg, subModel);
						var newSubModel = _v61.a;
						var subCmd = _v61.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$RandomWalksBasicAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$BasicWalkerMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 3:
					if (_v0.b.$ === 1) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v62 = A2($author$project$AngularMovement$AccelerateTowardsMouse$update, subMsg, subModel);
						var newSubModel = _v62.a;
						var subCmd = _v62.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$AngularMovementAccelerateTowardsMouseAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$AngularMovementAccelerateTowardsMouseMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 4:
					if (_v0.b.$ === 2) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v63 = A2($author$project$AngularMovement$AcceleratingBaton$update, subMsg, subModel);
						var newSubModel = _v63.a;
						var subCmd = _v63.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$AngularMovementAcceleratingBatonAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$AngularMovementAcceleratingBatonMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 5:
					if (_v0.b.$ === 3) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v64 = A2($author$project$Forces$ArtworkGenerator$update, subMsg, subModel);
						var newSubModel = _v64.a;
						var subCmd = _v64.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$ForcesArtworkGeneratorAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$ForcesArtworkGeneratorMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 6:
					if (_v0.b.$ === 4) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v65 = A2($author$project$Forces$BlowingWind$update, subMsg, subModel);
						var newSubModel = _v65.a;
						var subCmd = _v65.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$ForcesBlowingWindAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$ForcesBlowingWindMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 7:
					if (_v0.b.$ === 5) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v66 = A2($author$project$AngularMovement$FallingBoulder$update, subMsg, subModel);
						var newSubModel = _v66.a;
						var subCmd = _v66.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$AngularMovementFallingBoulderAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$AngularMovementFallingBoulderMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 8:
					if (_v0.b.$ === 6) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v67 = A2($author$project$Forces$BlowingWindWithGravity$update, subMsg, subModel);
						var newSubModel = _v67.a;
						var subCmd = _v67.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$ForcesBlowingWindWithGravityAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$ForcesBlowingWindWithGravityMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 9:
					if (_v0.b.$ === 7) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v68 = A2($author$project$Noise$AnimatedBox$update, subMsg, subModel);
						var newSubModel = _v68.a;
						var subCmd = _v68.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$NoiseAnimatedBoxAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$NoiseAnimatedBoxMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 10:
					if (_v0.b.$ === 8) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v69 = A2($author$project$AngularMovement$ManyOrbitsWithDynamicRotation$update, subMsg, subModel);
						var newSubModel = _v69.a;
						var subCmd = _v69.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$AngularMovementManyOrbitsWithDynamicRotationAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$AngularMovementManyOrbitsWithDynamicRotationMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 11:
					if (_v0.b.$ === 9) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v70 = A2($author$project$Forces$BlowingWindWithGravityAndFriction$update, subMsg, subModel);
						var newSubModel = _v70.a;
						var subCmd = _v70.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$ForcesBlowingWindWithGravityAndFrictionAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$ForcesBlowingWindWithGravityAndFrictionMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 12:
					if (_v0.b.$ === 10) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v71 = A2($author$project$Noise$MountainRange$update, subMsg, subModel);
						var newSubModel = _v71.a;
						var subCmd = _v71.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$NoiseMountainRangeAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$NoiseMountainRangeMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 13:
					if (_v0.b.$ === 11) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v72 = A2($author$project$Oscillations$ManyWaves$update, subMsg, subModel);
						var newSubModel = _v72.a;
						var subCmd = _v72.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$OscillationsManyWavesAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$OscillationsManyWavesMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 14:
					if (_v0.b.$ === 12) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v73 = A2($author$project$AngularMovement$ManyOrbitsWithRotation$update, subMsg, subModel);
						var newSubModel = _v73.a;
						var subCmd = _v73.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$AngularMovementManyOrbitsWithRotationAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$AngularMovementManyOrbitsWithRotationMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 15:
					if (_v0.b.$ === 13) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v74 = A2($author$project$Forces$FloatingBalloon$update, subMsg, subModel);
						var newSubModel = _v74.a;
						var subCmd = _v74.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$ForcesFloatingBalloonAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$ForcesFloatingBalloonMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 16:
					if (_v0.b.$ === 14) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v75 = A2($author$project$Noise$Perlin$update, subMsg, subModel);
						var newSubModel = _v75.a;
						var subCmd = _v75.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$NoisePerlinAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$NoisePerlinMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 17:
					if (_v0.b.$ === 15) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v76 = A2($author$project$Oscillations$Oscillators$update, subMsg, subModel);
						var newSubModel = _v76.a;
						var subCmd = _v76.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$OscillationsOscillatorsAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$OscillationsOscillatorsMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 18:
					if (_v0.b.$ === 16) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v77 = A2($author$project$AngularMovement$PolarSwing$update, subMsg, subModel);
						var newSubModel = _v77.a;
						var subCmd = _v77.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$AngularMovementPolarSwingAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$AngularMovementPolarSwingMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 19:
					if (_v0.b.$ === 17) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v78 = A2($author$project$Forces$ManyBalls$update, subMsg, subModel);
						var newSubModel = _v78.a;
						var subCmd = _v78.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$ForcesManyBallsAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$ForcesManyBallsMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 20:
					if (_v0.b.$ === 18) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v79 = A2($author$project$Noise$PerlinBox$update, subMsg, subModel);
						var newSubModel = _v79.a;
						var subCmd = _v79.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$NoisePerlinBoxAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$NoisePerlinBoxMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 21:
					if (_v0.b.$ === 19) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v80 = A2($author$project$Oscillations$Pendulum$update, subMsg, subModel);
						var newSubModel = _v80.a;
						var subCmd = _v80.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$OscillationsPendulumAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$OscillationsPendulumMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 22:
					if (_v0.b.$ === 20) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v81 = A2($author$project$RandomWalks$Directed$update, subMsg, subModel);
						var newSubModel = _v81.a;
						var subCmd = _v81.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$RandomWalksDirectedAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$RandomWalksDirectedMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 23:
					if (_v0.b.$ === 21) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v82 = A2($author$project$AngularMovement$SpinningBaton$update, subMsg, subModel);
						var newSubModel = _v82.a;
						var subCmd = _v82.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$AngularMovementSpinningBatonAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$AngularMovementSpinningBatonMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 24:
					if (_v0.b.$ === 22) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v83 = A2($author$project$Forces$ManyOrbits$update, subMsg, subModel);
						var newSubModel = _v83.a;
						var subCmd = _v83.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$ForcesManyOrbitsAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$ForcesManyOrbitsMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 25:
					if (_v0.b.$ === 23) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v84 = A2($author$project$Noise$PerlinStepWalker$update, subMsg, subModel);
						var newSubModel = _v84.a;
						var subCmd = _v84.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$NoisePerlinStepWalkerAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$NoisePerlinStepWalkerMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 26:
					if (_v0.b.$ === 24) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v85 = A2($author$project$Oscillations$RainbowSlinky$update, subMsg, subModel);
						var newSubModel = _v85.a;
						var subCmd = _v85.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$OscillationsRainbowSlinkyAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$OscillationsRainbowSlinkyMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 27:
					if (_v0.b.$ === 25) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v86 = A2($author$project$RandomWalks$Gaussian$update, subMsg, subModel);
						var newSubModel = _v86.a;
						var subCmd = _v86.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$RandomWalksGaussianAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$RandomWalksGaussianMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 28:
					if (_v0.b.$ === 26) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v87 = A2($author$project$Vector$AccelerateTowardsMouse$update, subMsg, subModel);
						var newSubModel = _v87.a;
						var subCmd = _v87.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$VectorAccelerateTowardsMouseAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$VectorAccelerateTowardsMouseMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 29:
					if (_v0.b.$ === 27) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v88 = A2($author$project$AngularMovement$SpiralDrawer$update, subMsg, subModel);
						var newSubModel = _v88.a;
						var subCmd = _v88.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$AngularMovementSpiralDrawerAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$AngularMovementSpiralDrawerMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 30:
					if (_v0.b.$ === 28) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v89 = A2($author$project$Forces$MutualAttraction$update, subMsg, subModel);
						var newSubModel = _v89.a;
						var subCmd = _v89.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$ForcesMutualAttractionAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$ForcesMutualAttractionMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 31:
					if (_v0.b.$ === 29) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v90 = A2($author$project$Noise$PerlinWalker$update, subMsg, subModel);
						var newSubModel = _v90.a;
						var subCmd = _v90.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$NoisePerlinWalkerAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$NoisePerlinWalkerMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 32:
					if (_v0.b.$ === 30) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v91 = A2($author$project$Oscillations$SimpleHarmonicMotion$update, subMsg, subModel);
						var newSubModel = _v91.a;
						var subCmd = _v91.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$OscillationsSimpleHarmonicMotionAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$OscillationsSimpleHarmonicMotionMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 33:
					if (_v0.b.$ === 31) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v92 = A2($author$project$RandomWalks$Improved$update, subMsg, subModel);
						var newSubModel = _v92.a;
						var subCmd = _v92.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$RandomWalksImprovedAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$RandomWalksImprovedMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 34:
					if (_v0.b.$ === 32) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v93 = A2($author$project$Vector$BouncingBall$update, subMsg, subModel);
						var newSubModel = _v93.a;
						var subCmd = _v93.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$VectorBouncingBallAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$VectorBouncingBallMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 35:
					if (_v0.b.$ === 33) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v94 = A2($author$project$Forces$MutualRepulsion$update, subMsg, subModel);
						var newSubModel = _v94.a;
						var subCmd = _v94.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$ForcesMutualRepulsionAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$ForcesMutualRepulsionMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 36:
					if (_v0.b.$ === 34) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v95 = A2($author$project$Noise$RandomBox$update, subMsg, subModel);
						var newSubModel = _v95.a;
						var subCmd = _v95.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$NoiseRandomBoxAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$NoiseRandomBoxMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 37:
					if (_v0.b.$ === 35) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v96 = A2($author$project$Oscillations$SimpleHarmonicMotionWithAngle$update, subMsg, subModel);
						var newSubModel = _v96.a;
						var subCmd = _v96.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$OscillationsSimpleHarmonicMotionWithAngleAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$OscillationsSimpleHarmonicMotionWithAngleMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 38:
					if (_v0.b.$ === 36) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v97 = A2($author$project$RandomWalks$Levy$update, subMsg, subModel);
						var newSubModel = _v97.a;
						var subCmd = _v97.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$RandomWalksLevyAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$RandomWalksLevyMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 39:
					if (_v0.b.$ === 37) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v98 = A2($author$project$Vector$BouncingBallWithVector$update, subMsg, subModel);
						var newSubModel = _v98.a;
						var subCmd = _v98.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$VectorBouncingBallWithVectorAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$VectorBouncingBallWithVectorMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 40:
					if (_v0.b.$ === 38) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v99 = A2($author$project$Forces$Resistance$update, subMsg, subModel);
						var newSubModel = _v99.a;
						var subCmd = _v99.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$ForcesResistanceAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$ForcesResistanceMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 41:
					if (_v0.b.$ === 39) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v100 = A2($author$project$Oscillations$SineWave$update, subMsg, subModel);
						var newSubModel = _v100.a;
						var subCmd = _v100.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$OscillationsSineWaveAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$OscillationsSineWaveMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 42:
					if (_v0.b.$ === 40) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v101 = A2($author$project$RandomWalks$MonteCarlo$update, subMsg, subModel);
						var newSubModel = _v101.a;
						var subCmd = _v101.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$RandomWalksMonteCarloAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$RandomWalksMonteCarloMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 43:
					if (_v0.b.$ === 41) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v102 = A2($author$project$Vector$BrakingCar$update, subMsg, subModel);
						var newSubModel = _v102.a;
						var subCmd = _v102.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$VectorBrakingCarAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$VectorBrakingCarMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 44:
					if (_v0.b.$ === 42) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v103 = A2($author$project$Forces$SingleOrbit$update, subMsg, subModel);
						var newSubModel = _v103.a;
						var subCmd = _v103.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$ForcesSingleOrbitAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$ForcesSingleOrbitMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 45:
					if (_v0.b.$ === 43) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v104 = A2($author$project$Oscillations$StaticSineWave$update, subMsg, subModel);
						var newSubModel = _v104.a;
						var subCmd = _v104.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$OscillationsStaticSineWaveAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$OscillationsStaticSineWaveMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 46:
					if (_v0.b.$ === 44) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v105 = A2($author$project$RandomWalks$NormalDistribution$update, subMsg, subModel);
						var newSubModel = _v105.a;
						var subCmd = _v105.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$RandomWalksNormalDistributionAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$RandomWalksNormalDistributionMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 47:
					if (_v0.b.$ === 45) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v106 = A2($author$project$Vector$ConstantAcceleration$update, subMsg, subModel);
						var newSubModel = _v106.a;
						var subCmd = _v106.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$VectorConstantAccelerationAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$VectorConstantAccelerationMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 48:
					if (_v0.b.$ === 46) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v107 = A2($author$project$Forces$SinkingLogs$update, subMsg, subModel);
						var newSubModel = _v107.a;
						var subCmd = _v107.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$ForcesSinkingLogsAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$ForcesSinkingLogsMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 49:
					if (_v0.b.$ === 47) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v108 = A2($author$project$RandomWalks$PaintSplatter$update, subMsg, subModel);
						var newSubModel = _v108.a;
						var subCmd = _v108.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$RandomWalksPaintSplatterAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$RandomWalksPaintSplatterMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 50:
					if (_v0.b.$ === 48) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v109 = A2($author$project$Vector$ConstantVelocity$update, subMsg, subModel);
						var newSubModel = _v109.a;
						var subCmd = _v109.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$VectorConstantVelocityAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$VectorConstantVelocityMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 51:
					if (_v0.b.$ === 49) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v110 = A2($author$project$Forces$WallBalls$update, subMsg, subModel);
						var newSubModel = _v110.a;
						var subCmd = _v110.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$ForcesWallBallsAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$ForcesWallBallsMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 52:
					if (_v0.b.$ === 50) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v111 = A2($author$project$Vector$GroupAccelerateTowardsMouse$update, subMsg, subModel);
						var newSubModel = _v111.a;
						var subCmd = _v111.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$VectorGroupAccelerateTowardsMouseAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$VectorGroupAccelerateTowardsMouseMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 53:
					if (_v0.b.$ === 51) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v112 = A2($author$project$Vector$MouseStalker$update, subMsg, subModel);
						var newSubModel = _v112.a;
						var subCmd = _v112.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$VectorMouseStalkerAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$VectorMouseStalkerMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 54:
					if (_v0.b.$ === 52) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v113 = A2($author$project$Vector$MouseTracing$update, subMsg, subModel);
						var newSubModel = _v113.a;
						var subCmd = _v113.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$VectorMouseTracingAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$VectorMouseTracingMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 55:
					if (_v0.b.$ === 53) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v114 = A2($author$project$Vector$MouseTracingNormalized$update, subMsg, subModel);
						var newSubModel = _v114.a;
						var subCmd = _v114.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$VectorMouseTracingNormalizedAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$VectorMouseTracingNormalizedMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 56:
					if (_v0.b.$ === 54) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v115 = A2($author$project$Vector$MouseTracingScaled$update, subMsg, subModel);
						var newSubModel = _v115.a;
						var subCmd = _v115.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$VectorMouseTracingScaledAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$VectorMouseTracingScaledMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 57:
					if (_v0.b.$ === 55) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v116 = A2($author$project$Vector$MouseTracingWithMagnitude$update, subMsg, subModel);
						var newSubModel = _v116.a;
						var subCmd = _v116.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$VectorMouseTracingWithMagnitudeAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$VectorMouseTracingWithMagnitudeMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 58:
					if (_v0.b.$ === 56) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v117 = A2($author$project$Vector$RandomAcceleration$update, subMsg, subModel);
						var newSubModel = _v117.a;
						var subCmd = _v117.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$VectorRandomAccelerationAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$VectorRandomAccelerationMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 59:
					if (_v0.b.$ === 57) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v118 = A2($author$project$Vector$ScalingSaber$update, subMsg, subModel);
						var newSubModel = _v118.a;
						var subCmd = _v118.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$VectorScalingSaberAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$VectorScalingSaberMsg, subCmd));
					} else {
						break _v0$61;
					}
				case 60:
					if (_v0.b.$ === 58) {
						var subMsg = _v0.a.a;
						var subModel = _v0.b.a;
						var _v119 = A2($author$project$Vector$WalkerWithVector$update, subMsg, subModel);
						var newSubModel = _v119.a;
						var subCmd = _v119.b;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									a: $author$project$Main$VectorWalkerWithVectorAnim(newSubModel)
								}),
							A2($elm$core$Platform$Cmd$map, $author$project$Main$VectorWalkerWithVectorMsg, subCmd));
					} else {
						break _v0$61;
					}
				default:
					var viewport = _v0.a.a.fK;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								bd: $elm$core$Maybe$Just(
									$mdgriffith$elm_ui$Element$classifyDevice(
										{
											bh: $elm$core$Basics$round(viewport.bh),
											ch: $elm$core$Basics$round(viewport.ch)
										}))
							}),
						$elm$core$Platform$Cmd$none);
			}
		}
		return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
	});
var $author$project$Main$AngularMovementAccelerateTowardsMouse = 1;
var $author$project$Main$AngularMovementAcceleratingBaton = 2;
var $author$project$Main$AngularMovementFallingBoulder = 5;
var $author$project$Main$AngularMovementManyOrbitsWithDynamicRotation = 8;
var $author$project$Main$AngularMovementManyOrbitsWithRotation = 12;
var $author$project$Main$AngularMovementPolarSwing = 16;
var $author$project$Main$AngularMovementSpinningBaton = 21;
var $author$project$Main$AngularMovementSpiralDrawer = 27;
var $author$project$Main$ForcesArtworkGenerator = 3;
var $author$project$Main$ForcesBlowingWind = 4;
var $author$project$Main$ForcesBlowingWindWithGravity = 6;
var $author$project$Main$ForcesBlowingWindWithGravityAndFriction = 9;
var $author$project$Main$ForcesFloatingBalloon = 13;
var $author$project$Main$ForcesManyBalls = 17;
var $author$project$Main$ForcesManyOrbits = 22;
var $author$project$Main$ForcesMutualAttraction = 28;
var $author$project$Main$ForcesMutualRepulsion = 33;
var $author$project$Main$ForcesResistance = 38;
var $author$project$Main$ForcesSingleOrbit = 42;
var $author$project$Main$ForcesSinkingLogs = 46;
var $author$project$Main$ForcesWallBalls = 49;
var $author$project$Main$NoiseAnimatedBox = 7;
var $author$project$Main$NoiseMountainRange = 10;
var $author$project$Main$NoisePerlin = 14;
var $author$project$Main$NoisePerlinBox = 18;
var $author$project$Main$NoisePerlinStepWalker = 23;
var $author$project$Main$NoisePerlinWalker = 29;
var $author$project$Main$NoiseRandomBox = 34;
var $author$project$Main$OscillationsManyWaves = 11;
var $author$project$Main$OscillationsOscillators = 15;
var $author$project$Main$OscillationsPendulum = 19;
var $author$project$Main$OscillationsRainbowSlinky = 24;
var $author$project$Main$OscillationsSimpleHarmonicMotion = 30;
var $author$project$Main$OscillationsSimpleHarmonicMotionWithAngle = 35;
var $author$project$Main$OscillationsSineWave = 39;
var $author$project$Main$OscillationsStaticSineWave = 43;
var $author$project$Main$RandomWalksBasic = 0;
var $author$project$Main$RandomWalksDirected = 20;
var $author$project$Main$RandomWalksGaussian = 25;
var $author$project$Main$RandomWalksImproved = 31;
var $author$project$Main$RandomWalksLevy = 36;
var $author$project$Main$RandomWalksMonteCarlo = 40;
var $author$project$Main$RandomWalksNormalDistribution = 44;
var $author$project$Main$RandomWalksPaintSplatter = 47;
var $author$project$Main$Select = function (a) {
	return {$: 0, a: a};
};
var $author$project$Main$VectorAccelerateTowardsMouse = 26;
var $author$project$Main$VectorBouncingBall = 32;
var $author$project$Main$VectorBouncingBallWithVector = 37;
var $author$project$Main$VectorBrakingCar = 41;
var $author$project$Main$VectorConstantAcceleration = 45;
var $author$project$Main$VectorConstantVelocity = 48;
var $author$project$Main$VectorGroupAccelerateTowardsMouse = 50;
var $author$project$Main$VectorMouseStalker = 51;
var $author$project$Main$VectorMouseTracing = 52;
var $author$project$Main$VectorMouseTracingNormalized = 53;
var $author$project$Main$VectorMouseTracingScaled = 54;
var $author$project$Main$VectorMouseTracingWithMagnitude = 55;
var $author$project$Main$VectorRandomAcceleration = 56;
var $author$project$Main$VectorScalingSaber = 57;
var $author$project$Main$VectorWalkerWithVector = 58;
var $mdgriffith$elm_ui$Internal$Model$Unkeyed = function (a) {
	return {$: 0, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$AsColumn = 1;
var $mdgriffith$elm_ui$Internal$Model$asColumn = 1;
var $mdgriffith$elm_ui$Internal$Style$classes = {dr: 'a', bE: 'atv', dt: 'ab', du: 'cx', dv: 'cy', dw: 'acb', dx: 'accx', dy: 'accy', dz: 'acr', cn: 'al', co: 'ar', dA: 'at', bF: 'ah', bG: 'av', dC: 's', dG: 'bh', dH: 'b', dK: 'w7', dM: 'bd', dN: 'bdt', a6: 'bn', dO: 'bs', a7: 'cpe', dY: 'cp', dZ: 'cpx', d_: 'cpy', P: 'c', a9: 'ctr', ba: 'cb', bb: 'ccx', Q: 'ccy', aL: 'cl', bc: 'cr', d1: 'ct', d3: 'cptr', d4: 'ctxt', eh: 'fcs', cv: 'focus-within', ei: 'fs', ej: 'g', bY: 'hbh', bZ: 'hc', cy: 'he', b_: 'hf', cz: 'hfp', em: 'hv', eq: 'ic', es: 'fr', eu: 'iml', ev: 'imlf', ew: 'imlp', ex: 'implw', ey: 'it', eA: 'i', cG: 'lnk', au: 'nb', c_: 'notxt', eO: 'ol', eR: 'or', ac: 'oq', eW: 'oh', c4: 'pg', c5: 'p', eZ: 'ppe', e3: 'ui', C: 'r', e6: 'sb', e7: 'sbx', e8: 'sby', e9: 'sbt', fb: 'e', fc: 'cap', fd: 'sev', fj: 'sk', w: 't', fn: 'tc', fo: 'w8', fp: 'w2', fq: 'w9', fr: 'tj', bt: 'tja', fs: 'tl', ft: 'w3', fu: 'w5', fv: 'w4', fw: 'tr', fx: 'w6', fy: 'w1', fz: 'tun', dk: 'ts', ai: 'clr', fH: 'u', ci: 'wc', $7: 'we', cj: 'wf', dp: 'wfp', ck: 'wrp'};
var $mdgriffith$elm_ui$Internal$Model$Generic = {$: 0};
var $mdgriffith$elm_ui$Internal$Model$div = $mdgriffith$elm_ui$Internal$Model$Generic;
var $mdgriffith$elm_ui$Internal$Model$NoNearbyChildren = {$: 0};
var $mdgriffith$elm_ui$Internal$Model$columnClass = $mdgriffith$elm_ui$Internal$Style$classes.dC + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.P);
var $mdgriffith$elm_ui$Internal$Model$gridClass = $mdgriffith$elm_ui$Internal$Style$classes.dC + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.ej);
var $mdgriffith$elm_ui$Internal$Model$pageClass = $mdgriffith$elm_ui$Internal$Style$classes.dC + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.c4);
var $mdgriffith$elm_ui$Internal$Model$paragraphClass = $mdgriffith$elm_ui$Internal$Style$classes.dC + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.c5);
var $mdgriffith$elm_ui$Internal$Model$rowClass = $mdgriffith$elm_ui$Internal$Style$classes.dC + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.C);
var $mdgriffith$elm_ui$Internal$Model$singleClass = $mdgriffith$elm_ui$Internal$Style$classes.dC + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.fb);
var $mdgriffith$elm_ui$Internal$Model$contextClasses = function (context) {
	switch (context) {
		case 0:
			return $mdgriffith$elm_ui$Internal$Model$rowClass;
		case 1:
			return $mdgriffith$elm_ui$Internal$Model$columnClass;
		case 2:
			return $mdgriffith$elm_ui$Internal$Model$singleClass;
		case 3:
			return $mdgriffith$elm_ui$Internal$Model$gridClass;
		case 4:
			return $mdgriffith$elm_ui$Internal$Model$paragraphClass;
		default:
			return $mdgriffith$elm_ui$Internal$Model$pageClass;
	}
};
var $mdgriffith$elm_ui$Internal$Model$Keyed = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$NoStyleSheet = {$: 0};
var $mdgriffith$elm_ui$Internal$Model$Styled = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$Unstyled = function (a) {
	return {$: 0, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$addChildren = F2(
	function (existing, nearbyChildren) {
		switch (nearbyChildren.$) {
			case 0:
				return existing;
			case 1:
				var behind = nearbyChildren.a;
				return _Utils_ap(behind, existing);
			case 2:
				var inFront = nearbyChildren.a;
				return _Utils_ap(existing, inFront);
			default:
				var behind = nearbyChildren.a;
				var inFront = nearbyChildren.b;
				return _Utils_ap(
					behind,
					_Utils_ap(existing, inFront));
		}
	});
var $mdgriffith$elm_ui$Internal$Model$addKeyedChildren = F3(
	function (key, existing, nearbyChildren) {
		switch (nearbyChildren.$) {
			case 0:
				return existing;
			case 1:
				var behind = nearbyChildren.a;
				return _Utils_ap(
					A2(
						$elm$core$List$map,
						function (x) {
							return _Utils_Tuple2(key, x);
						},
						behind),
					existing);
			case 2:
				var inFront = nearbyChildren.a;
				return _Utils_ap(
					existing,
					A2(
						$elm$core$List$map,
						function (x) {
							return _Utils_Tuple2(key, x);
						},
						inFront));
			default:
				var behind = nearbyChildren.a;
				var inFront = nearbyChildren.b;
				return _Utils_ap(
					A2(
						$elm$core$List$map,
						function (x) {
							return _Utils_Tuple2(key, x);
						},
						behind),
					_Utils_ap(
						existing,
						A2(
							$elm$core$List$map,
							function (x) {
								return _Utils_Tuple2(key, x);
							},
							inFront)));
		}
	});
var $mdgriffith$elm_ui$Internal$Model$AsEl = 2;
var $mdgriffith$elm_ui$Internal$Model$asEl = 2;
var $mdgriffith$elm_ui$Internal$Model$AsParagraph = 4;
var $mdgriffith$elm_ui$Internal$Model$asParagraph = 4;
var $mdgriffith$elm_ui$Internal$Flag$Flag = function (a) {
	return {$: 0, a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$Second = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$flag = function (i) {
	return (i > 31) ? $mdgriffith$elm_ui$Internal$Flag$Second(1 << (i - 32)) : $mdgriffith$elm_ui$Internal$Flag$Flag(1 << i);
};
var $mdgriffith$elm_ui$Internal$Flag$alignBottom = $mdgriffith$elm_ui$Internal$Flag$flag(41);
var $mdgriffith$elm_ui$Internal$Flag$alignRight = $mdgriffith$elm_ui$Internal$Flag$flag(40);
var $mdgriffith$elm_ui$Internal$Flag$centerX = $mdgriffith$elm_ui$Internal$Flag$flag(42);
var $mdgriffith$elm_ui$Internal$Flag$centerY = $mdgriffith$elm_ui$Internal$Flag$flag(43);
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$core$Set$Set_elm_builtin = $elm$core$Basics$identity;
var $elm$core$Set$empty = $elm$core$Dict$empty;
var $mdgriffith$elm_ui$Internal$Model$lengthClassName = function (x) {
	switch (x.$) {
		case 0:
			var px = x.a;
			return $elm$core$String$fromInt(px) + 'px';
		case 1:
			return 'auto';
		case 2:
			var i = x.a;
			return $elm$core$String$fromInt(i) + 'fr';
		case 3:
			var min = x.a;
			var len = x.b;
			return 'min' + ($elm$core$String$fromInt(min) + $mdgriffith$elm_ui$Internal$Model$lengthClassName(len));
		default:
			var max = x.a;
			var len = x.b;
			return 'max' + ($elm$core$String$fromInt(max) + $mdgriffith$elm_ui$Internal$Model$lengthClassName(len));
	}
};
var $mdgriffith$elm_ui$Internal$Model$floatClass = function (x) {
	return $elm$core$String$fromInt(
		$elm$core$Basics$round(x * 255));
};
var $mdgriffith$elm_ui$Internal$Model$transformClass = function (transform) {
	switch (transform.$) {
		case 0:
			return $elm$core$Maybe$Nothing;
		case 1:
			var _v1 = transform.a;
			var x = _v1.a;
			var y = _v1.b;
			var z = _v1.c;
			return $elm$core$Maybe$Just(
				'mv-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(x) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(y) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(z))))));
		default:
			var _v2 = transform.a;
			var tx = _v2.a;
			var ty = _v2.b;
			var tz = _v2.c;
			var _v3 = transform.b;
			var sx = _v3.a;
			var sy = _v3.b;
			var sz = _v3.c;
			var _v4 = transform.c;
			var ox = _v4.a;
			var oy = _v4.b;
			var oz = _v4.c;
			var angle = transform.d;
			return $elm$core$Maybe$Just(
				'tfrm-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(tx) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(ty) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(tz) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(sx) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(sy) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(sz) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(ox) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(oy) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(oz) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(angle))))))))))))))))))));
	}
};
var $mdgriffith$elm_ui$Internal$Model$getStyleName = function (style) {
	switch (style.$) {
		case 13:
			var name = style.a;
			return name;
		case 12:
			var name = style.a;
			var o = style.b;
			return name;
		case 0:
			var _class = style.a;
			return _class;
		case 1:
			var name = style.a;
			return name;
		case 2:
			var i = style.a;
			return 'font-size-' + $elm$core$String$fromInt(i);
		case 3:
			var _class = style.a;
			return _class;
		case 4:
			var _class = style.a;
			return _class;
		case 5:
			var cls = style.a;
			var x = style.b;
			var y = style.c;
			return cls;
		case 7:
			var cls = style.a;
			var top = style.b;
			var right = style.c;
			var bottom = style.d;
			var left = style.e;
			return cls;
		case 6:
			var cls = style.a;
			var top = style.b;
			var right = style.c;
			var bottom = style.d;
			var left = style.e;
			return cls;
		case 8:
			var template = style.a;
			return 'grid-rows-' + (A2(
				$elm$core$String$join,
				'-',
				A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.e4)) + ('-cols-' + (A2(
				$elm$core$String$join,
				'-',
				A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.G)) + ('-space-x-' + ($mdgriffith$elm_ui$Internal$Model$lengthClassName(template.fe.a) + ('-space-y-' + $mdgriffith$elm_ui$Internal$Model$lengthClassName(template.fe.b)))))));
		case 9:
			var pos = style.a;
			return 'gp grid-pos-' + ($elm$core$String$fromInt(pos.C) + ('-' + ($elm$core$String$fromInt(pos.d$) + ('-' + ($elm$core$String$fromInt(pos.ch) + ('-' + $elm$core$String$fromInt(pos.bh)))))));
		case 11:
			var selector = style.a;
			var subStyle = style.b;
			var name = function () {
				switch (selector) {
					case 0:
						return 'fs';
					case 1:
						return 'hv';
					default:
						return 'act';
				}
			}();
			return A2(
				$elm$core$String$join,
				' ',
				A2(
					$elm$core$List$map,
					function (sty) {
						var _v1 = $mdgriffith$elm_ui$Internal$Model$getStyleName(sty);
						if (_v1 === '') {
							return '';
						} else {
							var styleName = _v1;
							return styleName + ('-' + name);
						}
					},
					subStyle));
		default:
			var x = style.a;
			return A2(
				$elm$core$Maybe$withDefault,
				'',
				$mdgriffith$elm_ui$Internal$Model$transformClass(x));
	}
};
var $elm$core$Set$insert = F2(
	function (key, _v0) {
		var dict = _v0;
		return A3($elm$core$Dict$insert, key, 0, dict);
	});
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (!_v0.$) {
			return true;
		} else {
			return false;
		}
	});
var $elm$core$Set$member = F2(
	function (key, _v0) {
		var dict = _v0;
		return A2($elm$core$Dict$member, key, dict);
	});
var $mdgriffith$elm_ui$Internal$Model$reduceStyles = F2(
	function (style, nevermind) {
		var cache = nevermind.a;
		var existing = nevermind.b;
		var styleName = $mdgriffith$elm_ui$Internal$Model$getStyleName(style);
		return A2($elm$core$Set$member, styleName, cache) ? nevermind : _Utils_Tuple2(
			A2($elm$core$Set$insert, styleName, cache),
			A2($elm$core$List$cons, style, existing));
	});
var $mdgriffith$elm_ui$Internal$Model$Property = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$Style = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$dot = function (c) {
	return '.' + c;
};
var $elm$core$String$fromFloat = _String_fromNumber;
var $mdgriffith$elm_ui$Internal$Model$formatColor = function (_v0) {
	var red = _v0.a;
	var green = _v0.b;
	var blue = _v0.c;
	var alpha = _v0.d;
	return 'rgba(' + ($elm$core$String$fromInt(
		$elm$core$Basics$round(red * 255)) + ((',' + $elm$core$String$fromInt(
		$elm$core$Basics$round(green * 255))) + ((',' + $elm$core$String$fromInt(
		$elm$core$Basics$round(blue * 255))) + (',' + ($elm$core$String$fromFloat(alpha) + ')')))));
};
var $mdgriffith$elm_ui$Internal$Model$formatBoxShadow = function (shadow) {
	return A2(
		$elm$core$String$join,
		' ',
		A2(
			$elm$core$List$filterMap,
			$elm$core$Basics$identity,
			_List_fromArray(
				[
					shadow.cD ? $elm$core$Maybe$Just('inset') : $elm$core$Maybe$Nothing,
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.c$.a) + 'px'),
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.c$.b) + 'px'),
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.am) + 'px'),
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.aB) + 'px'),
					$elm$core$Maybe$Just(
					$mdgriffith$elm_ui$Internal$Model$formatColor(shadow.bP))
				])));
};
var $elm$core$Tuple$mapFirst = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var $elm$core$Tuple$mapSecond = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var $mdgriffith$elm_ui$Internal$Model$renderFocusStyle = function (focus) {
	return _List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Internal$Model$Style,
			$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cv) + ':focus-within',
			A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				_List_fromArray(
					[
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'border-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.dL),
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'background-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.dE),
						A2(
						$elm$core$Maybe$map,
						function (shadow) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'box-shadow',
								$mdgriffith$elm_ui$Internal$Model$formatBoxShadow(
									{
										am: shadow.am,
										bP: shadow.bP,
										cD: false,
										c$: A2(
											$elm$core$Tuple$mapSecond,
											$elm$core$Basics$toFloat,
											A2($elm$core$Tuple$mapFirst, $elm$core$Basics$toFloat, shadow.c$)),
										aB: shadow.aB
									}));
						},
						focus.fa),
						$elm$core$Maybe$Just(
						A2($mdgriffith$elm_ui$Internal$Model$Property, 'outline', 'none'))
					]))),
			A2(
			$mdgriffith$elm_ui$Internal$Model$Style,
			$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dC) + (':focus .focusable, ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dC) + '.focusable:focus')),
			A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				_List_fromArray(
					[
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'border-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.dL),
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'background-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.dE),
						A2(
						$elm$core$Maybe$map,
						function (shadow) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'box-shadow',
								$mdgriffith$elm_ui$Internal$Model$formatBoxShadow(
									{
										am: shadow.am,
										bP: shadow.bP,
										cD: false,
										c$: A2(
											$elm$core$Tuple$mapSecond,
											$elm$core$Basics$toFloat,
											A2($elm$core$Tuple$mapFirst, $elm$core$Basics$toFloat, shadow.c$)),
										aB: shadow.aB
									}));
						},
						focus.fa),
						$elm$core$Maybe$Just(
						A2($mdgriffith$elm_ui$Internal$Model$Property, 'outline', 'none'))
					])))
		]);
};
var $elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $elm$virtual_dom$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $mdgriffith$elm_ui$Internal$Style$Batch = function (a) {
	return {$: 5, a: a};
};
var $mdgriffith$elm_ui$Internal$Style$Child = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Class = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Descriptor = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Left = 3;
var $mdgriffith$elm_ui$Internal$Style$Prop = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Right = 2;
var $mdgriffith$elm_ui$Internal$Style$Self = $elm$core$Basics$identity;
var $mdgriffith$elm_ui$Internal$Style$Supports = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Content = $elm$core$Basics$identity;
var $mdgriffith$elm_ui$Internal$Style$Bottom = 1;
var $mdgriffith$elm_ui$Internal$Style$CenterX = 4;
var $mdgriffith$elm_ui$Internal$Style$CenterY = 5;
var $mdgriffith$elm_ui$Internal$Style$Top = 0;
var $mdgriffith$elm_ui$Internal$Style$alignments = _List_fromArray(
	[0, 1, 2, 3, 4, 5]);
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $mdgriffith$elm_ui$Internal$Style$contentName = function (desc) {
	switch (desc) {
		case 0:
			var _v1 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.d1);
		case 1:
			var _v2 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ba);
		case 2:
			var _v3 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bc);
		case 3:
			var _v4 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aL);
		case 4:
			var _v5 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bb);
		default:
			var _v6 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.Q);
	}
};
var $mdgriffith$elm_ui$Internal$Style$selfName = function (desc) {
	switch (desc) {
		case 0:
			var _v1 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dA);
		case 1:
			var _v2 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dt);
		case 2:
			var _v3 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.co);
		case 3:
			var _v4 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cn);
		case 4:
			var _v5 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.du);
		default:
			var _v6 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dv);
	}
};
var $mdgriffith$elm_ui$Internal$Style$describeAlignment = function (values) {
	var createDescription = function (alignment) {
		var _v0 = values(alignment);
		var content = _v0.a;
		var indiv = _v0.b;
		return _List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$contentName(alignment),
				content),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dC),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$selfName(alignment),
						indiv)
					]))
			]);
	};
	return $mdgriffith$elm_ui$Internal$Style$Batch(
		A2($elm$core$List$concatMap, createDescription, $mdgriffith$elm_ui$Internal$Style$alignments));
};
var $mdgriffith$elm_ui$Internal$Style$elDescription = _List_fromArray(
	[
		A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
		A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'column'),
		A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre'),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Descriptor,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bY),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dG),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '-1')
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Descriptor,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.e9),
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.w),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.b_),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cj),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'auto !important')
							]))
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bZ),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.b_),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cj),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dp),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ci),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
			])),
		$mdgriffith$elm_ui$Internal$Style$describeAlignment(
		function (alignment) {
			switch (alignment) {
				case 0:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', '0 !important')
							]));
				case 1:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', '0 !important')
							]));
				case 2:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
							]));
				case 3:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
							]));
				case 4:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'center')
							]));
				default:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dC),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto')
									]))
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important')
							]));
			}
		})
	]);
var $mdgriffith$elm_ui$Internal$Style$gridAlignments = function (values) {
	var createDescription = function (alignment) {
		return _List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dC),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$selfName(alignment),
						values(alignment))
					]))
			]);
	};
	return $mdgriffith$elm_ui$Internal$Style$Batch(
		A2($elm$core$List$concatMap, createDescription, $mdgriffith$elm_ui$Internal$Style$alignments));
};
var $mdgriffith$elm_ui$Internal$Style$Above = 0;
var $mdgriffith$elm_ui$Internal$Style$Behind = 5;
var $mdgriffith$elm_ui$Internal$Style$Below = 1;
var $mdgriffith$elm_ui$Internal$Style$OnLeft = 3;
var $mdgriffith$elm_ui$Internal$Style$OnRight = 2;
var $mdgriffith$elm_ui$Internal$Style$Within = 4;
var $mdgriffith$elm_ui$Internal$Style$locations = function () {
	var loc = 0;
	var _v0 = function () {
		switch (loc) {
			case 0:
				return 0;
			case 1:
				return 0;
			case 2:
				return 0;
			case 3:
				return 0;
			case 4:
				return 0;
			default:
				return 0;
		}
	}();
	return _List_fromArray(
		[0, 1, 2, 3, 4, 5]);
}();
var $mdgriffith$elm_ui$Internal$Style$baseSheet = _List_fromArray(
	[
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		'html,body',
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'padding', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		_Utils_ap(
			$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dC),
			_Utils_ap(
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fb),
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eq))),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dC) + ':focus',
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'outline', 'none')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.e3),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'min-height', '100%'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				_Utils_ap(
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dC),
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.b_)),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.b_),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.es),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.au),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'fixed')
							]))
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.au),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'relative'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'row'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fb),
				$mdgriffith$elm_ui$Internal$Style$elDescription),
				$mdgriffith$elm_ui$Internal$Style$Batch(
				function (fn) {
					return A2($elm$core$List$map, fn, $mdgriffith$elm_ui$Internal$Style$locations);
				}(
					function (loc) {
						switch (loc) {
							case 0:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dr),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'bottom', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.b_),
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
												])),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cj),
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
												])),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							case 1:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dH),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'bottom', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												])),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.b_),
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
												]))
										]));
							case 2:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eR),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							case 3:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eO),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'right', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							case 4:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.es),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							default:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dG),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
						}
					}))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dC),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'relative'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'row'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'resize', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-feature-settings', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'box-sizing', 'border-box'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'padding', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-width', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'solid'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-size', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'color', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-family', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'line-height', '1'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-style', 'inherit'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ck),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-wrap', 'wrap')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c_),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, '-moz-user-select', 'none'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, '-webkit-user-select', 'none'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, '-ms-user-select', 'none'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'user-select', 'none')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.d3),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'pointer')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.d4),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'text')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eZ),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none !important')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.a7),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto !important')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ai),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ac),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.em, $mdgriffith$elm_ui$Internal$Style$classes.ai)) + ':hover',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.em, $mdgriffith$elm_ui$Internal$Style$classes.ac)) + ':hover',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.eh, $mdgriffith$elm_ui$Internal$Style$classes.ai)) + ':focus',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.eh, $mdgriffith$elm_ui$Internal$Style$classes.ac)) + ':focus',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.bE, $mdgriffith$elm_ui$Internal$Style$classes.ai)) + ':active',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.bE, $mdgriffith$elm_ui$Internal$Style$classes.ac)) + ':active',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dk),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Prop,
						'transition',
						A2(
							$elm$core$String$join,
							', ',
							A2(
								$elm$core$List$map,
								function (x) {
									return x + ' 160ms';
								},
								_List_fromArray(
									['transform', 'opacity', 'filter', 'background-color', 'color', 'font-size']))))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.e6),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow', 'auto'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.e7),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-x', 'auto'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.C),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.e8),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-y', 'auto'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.P),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fb),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dY),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow', 'hidden')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dZ),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-x', 'hidden')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.d_),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-y', 'hidden')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ci),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', 'auto')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.a6),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-width', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dM),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'dashed')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dN),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'dotted')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dO),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'solid')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.w),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-block')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ey),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'line-height', '1.05'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'background', 'transparent')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fb),
				$mdgriffith$elm_ui$Internal$Style$elDescription),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.C),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'row'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dC),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', '0%'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.$7),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cG),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.b_),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cz),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cj),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.a9),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.dz,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.dx,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.du),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-left', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.dx,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.du),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-right', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:only-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.dx,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dv),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.dx + ' ~ u'),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.dz + (' ~ s.' + $mdgriffith$elm_ui$Internal$Style$classes.dx)),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
											]));
								case 1:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
											]));
								case 2:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
											]),
										_List_Nil);
								case 3:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
											]),
										_List_Nil);
								case 4:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'center')
											]),
										_List_Nil);
								default:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'center')
											]));
							}
						}),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fd),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'space-between')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.P),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'column'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dC),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', '0%'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cy),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.P),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.b_),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cj),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dp),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ci),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.dw,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.dy,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dv),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', '0 !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.dy,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dv),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', '0 !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:only-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.dy,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dv),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.dy + ' ~ u'),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.dw + (' ~ s.' + $mdgriffith$elm_ui$Internal$Style$classes.dy)),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto')
											]));
								case 1:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto')
											]));
								case 2:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
											]));
								case 3:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
											]));
								case 4:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'center')
											]));
								default:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'center')
											]),
										_List_Nil);
							}
						}),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.a9),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fd),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'space-between')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ej),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', '-ms-grid'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'.gp',
						_List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dC),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Supports,
						_Utils_Tuple2('display', 'grid'),
						_List_fromArray(
							[
								_Utils_Tuple2('display', 'grid')
							])),
						$mdgriffith$elm_ui$Internal$Style$gridAlignments(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
										]);
								case 1:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
										]);
								case 2:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
										]);
								case 3:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
										]);
								case 4:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
										]);
								default:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'center')
										]);
							}
						})
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c4),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dC + ':first-child'),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot(
							$mdgriffith$elm_ui$Internal$Style$classes.dC + ($mdgriffith$elm_ui$Internal$Style$selfName(3) + (':first-child + .' + $mdgriffith$elm_ui$Internal$Style$classes.dC))),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot(
							$mdgriffith$elm_ui$Internal$Style$classes.dC + ($mdgriffith$elm_ui$Internal$Style$selfName(2) + (':first-child + .' + $mdgriffith$elm_ui$Internal$Style$classes.dC))),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 1:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 2:
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'right'),
												A2(
												$mdgriffith$elm_ui$Internal$Style$Descriptor,
												'::after',
												_List_fromArray(
													[
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', '\"\"'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'table'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'clear', 'both')
													]))
											]));
								case 3:
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'left'),
												A2(
												$mdgriffith$elm_ui$Internal$Style$Descriptor,
												'::after',
												_List_fromArray(
													[
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', '\"\"'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'table'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'clear', 'both')
													]))
											]));
								case 4:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								default:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
							}
						})
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eu),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'background-color', 'transparent')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ex),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fb),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ew),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'text'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ev),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'color', 'transparent')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c5),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bY),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dG),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '-1')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.w),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fb),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.es),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dG),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dr),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dH),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eR),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eO),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.w),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fb),
								_List_fromArray(
									[
										A2(
										$mdgriffith$elm_ui$Internal$Style$Child,
										$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.w),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal')
											]))
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.C),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-flex')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.P),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-flex')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ej),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-grid')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 1:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 2:
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'right')
											]));
								case 3:
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'left')
											]));
								case 4:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								default:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
							}
						})
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				'.hidden',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'none')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fy),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '100')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fp),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '200')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ft),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '300')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fv),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '400')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fu),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '500')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fx),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '600')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dK),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '700')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fo),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '800')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fq),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '900')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eA),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-style', 'italic')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fj),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'line-through')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fH),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'underline'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip-ink', 'auto'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip', 'ink')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				_Utils_ap(
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fH),
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fj)),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'line-through underline'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip-ink', 'auto'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip', 'ink')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fz),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-style', 'normal')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fr),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'justify')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bt),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'justify-all')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fn),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'center')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fw),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'right')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fs),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'left')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				'.modal',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'fixed'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none')
					]))
			]))
	]);
var $mdgriffith$elm_ui$Internal$Style$fontVariant = function (_var) {
	return _List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Internal$Style$Class,
			'.v-' + _var,
			_List_fromArray(
				[
					A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-feature-settings', '\"' + (_var + '\"'))
				])),
			A2(
			$mdgriffith$elm_ui$Internal$Style$Class,
			'.v-' + (_var + '-off'),
			_List_fromArray(
				[
					A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-feature-settings', '\"' + (_var + '\" 0'))
				]))
		]);
};
var $mdgriffith$elm_ui$Internal$Style$commonValues = $elm$core$List$concat(
	_List_fromArray(
		[
			A2(
			$elm$core$List$map,
			function (x) {
				return A2(
					$mdgriffith$elm_ui$Internal$Style$Class,
					'.border-' + $elm$core$String$fromInt(x),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Style$Prop,
							'border-width',
							$elm$core$String$fromInt(x) + 'px')
						]));
			},
			A2($elm$core$List$range, 0, 6)),
			A2(
			$elm$core$List$map,
			function (i) {
				return A2(
					$mdgriffith$elm_ui$Internal$Style$Class,
					'.font-size-' + $elm$core$String$fromInt(i),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Style$Prop,
							'font-size',
							$elm$core$String$fromInt(i) + 'px')
						]));
			},
			A2($elm$core$List$range, 8, 32)),
			A2(
			$elm$core$List$map,
			function (i) {
				return A2(
					$mdgriffith$elm_ui$Internal$Style$Class,
					'.p-' + $elm$core$String$fromInt(i),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Style$Prop,
							'padding',
							$elm$core$String$fromInt(i) + 'px')
						]));
			},
			A2($elm$core$List$range, 0, 24)),
			_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Class,
				'.v-smcp',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-variant', 'small-caps')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Class,
				'.v-smcp-off',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-variant', 'normal')
					]))
			]),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('zero'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('onum'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('liga'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('dlig'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('ordn'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('tnum'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('afrc'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('frac')
		]));
var $mdgriffith$elm_ui$Internal$Style$explainer = '\n.explain {\n    border: 6px solid rgb(174, 121, 15) !important;\n}\n.explain > .' + ($mdgriffith$elm_ui$Internal$Style$classes.dC + (' {\n    border: 4px dashed rgb(0, 151, 167) !important;\n}\n\n.ctr {\n    border: none !important;\n}\n.explain > .ctr > .' + ($mdgriffith$elm_ui$Internal$Style$classes.dC + ' {\n    border: 4px dashed rgb(0, 151, 167) !important;\n}\n\n')));
var $mdgriffith$elm_ui$Internal$Style$inputTextReset = '\ninput[type="search"],\ninput[type="search"]::-webkit-search-decoration,\ninput[type="search"]::-webkit-search-cancel-button,\ninput[type="search"]::-webkit-search-results-button,\ninput[type="search"]::-webkit-search-results-decoration {\n  -webkit-appearance:none;\n}\n';
var $mdgriffith$elm_ui$Internal$Style$sliderReset = '\ninput[type=range] {\n  -webkit-appearance: none; \n  background: transparent;\n  position:absolute;\n  left:0;\n  top:0;\n  z-index:10;\n  width: 100%;\n  outline: dashed 1px;\n  height: 100%;\n  opacity: 0;\n}\n';
var $mdgriffith$elm_ui$Internal$Style$thumbReset = '\ninput[type=range]::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range]::-moz-range-thumb {\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range]::-ms-thumb {\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range][orient=vertical]{\n    writing-mode: bt-lr; /* IE */\n    -webkit-appearance: slider-vertical;  /* WebKit */\n}\n';
var $mdgriffith$elm_ui$Internal$Style$trackReset = '\ninput[type=range]::-moz-range-track {\n    background: transparent;\n    cursor: pointer;\n}\ninput[type=range]::-ms-track {\n    background: transparent;\n    cursor: pointer;\n}\ninput[type=range]::-webkit-slider-runnable-track {\n    background: transparent;\n    cursor: pointer;\n}\n';
var $mdgriffith$elm_ui$Internal$Style$overrides = '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dC) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.C) + (' > ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dC) + (' { flex-basis: auto !important; } ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dC) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.C) + (' > ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dC) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.a9) + (' { flex-basis: auto !important; }}' + ($mdgriffith$elm_ui$Internal$Style$inputTextReset + ($mdgriffith$elm_ui$Internal$Style$sliderReset + ($mdgriffith$elm_ui$Internal$Style$trackReset + ($mdgriffith$elm_ui$Internal$Style$thumbReset + $mdgriffith$elm_ui$Internal$Style$explainer)))))))))))))));
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $mdgriffith$elm_ui$Internal$Style$Intermediate = $elm$core$Basics$identity;
var $mdgriffith$elm_ui$Internal$Style$emptyIntermediate = F2(
	function (selector, closing) {
		return {a8: closing, m: _List_Nil, U: _List_Nil, L: selector};
	});
var $mdgriffith$elm_ui$Internal$Style$renderRules = F2(
	function (_v0, rulesToRender) {
		var parent = _v0;
		var generateIntermediates = F2(
			function (rule, rendered) {
				switch (rule.$) {
					case 0:
						var name = rule.a;
						var val = rule.b;
						return _Utils_update(
							rendered,
							{
								U: A2(
									$elm$core$List$cons,
									_Utils_Tuple2(name, val),
									rendered.U)
							});
					case 2:
						var _v2 = rule.a;
						var prop = _v2.a;
						var value = _v2.b;
						var props = rule.b;
						return _Utils_update(
							rendered,
							{
								m: A2(
									$elm$core$List$cons,
									{a8: '\n}', m: _List_Nil, U: props, L: '@supports (' + (prop + (':' + (value + (') {' + parent.L))))},
									rendered.m)
							});
					case 4:
						var selector = rule.a;
						var adjRules = rule.b;
						return _Utils_update(
							rendered,
							{
								m: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.L + (' + ' + selector), ''),
										adjRules),
									rendered.m)
							});
					case 1:
						var child = rule.a;
						var childRules = rule.b;
						return _Utils_update(
							rendered,
							{
								m: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.L + (' > ' + child), ''),
										childRules),
									rendered.m)
							});
					case 3:
						var descriptor = rule.a;
						var descriptorRules = rule.b;
						return _Utils_update(
							rendered,
							{
								m: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2(
											$mdgriffith$elm_ui$Internal$Style$emptyIntermediate,
											_Utils_ap(parent.L, descriptor),
											''),
										descriptorRules),
									rendered.m)
							});
					default:
						var batched = rule.a;
						return _Utils_update(
							rendered,
							{
								m: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.L, ''),
										batched),
									rendered.m)
							});
				}
			});
		return A3($elm$core$List$foldr, generateIntermediates, parent, rulesToRender);
	});
var $mdgriffith$elm_ui$Internal$Style$renderCompact = function (styleClasses) {
	var renderValues = function (values) {
		return $elm$core$String$concat(
			A2(
				$elm$core$List$map,
				function (_v3) {
					var x = _v3.a;
					var y = _v3.b;
					return x + (':' + (y + ';'));
				},
				values));
	};
	var renderClass = function (rule) {
		var _v2 = rule.U;
		if (!_v2.b) {
			return '';
		} else {
			return rule.L + ('{' + (renderValues(rule.U) + (rule.a8 + '}')));
		}
	};
	var renderIntermediate = function (_v0) {
		var rule = _v0;
		return _Utils_ap(
			renderClass(rule),
			$elm$core$String$concat(
				A2($elm$core$List$map, renderIntermediate, rule.m)));
	};
	return $elm$core$String$concat(
		A2(
			$elm$core$List$map,
			renderIntermediate,
			A3(
				$elm$core$List$foldr,
				F2(
					function (_v1, existing) {
						var name = _v1.a;
						var styleRules = _v1.b;
						return A2(
							$elm$core$List$cons,
							A2(
								$mdgriffith$elm_ui$Internal$Style$renderRules,
								A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, name, ''),
								styleRules),
							existing);
					}),
				_List_Nil,
				styleClasses)));
};
var $mdgriffith$elm_ui$Internal$Style$rules = _Utils_ap(
	$mdgriffith$elm_ui$Internal$Style$overrides,
	$mdgriffith$elm_ui$Internal$Style$renderCompact(
		_Utils_ap($mdgriffith$elm_ui$Internal$Style$baseSheet, $mdgriffith$elm_ui$Internal$Style$commonValues)));
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $mdgriffith$elm_ui$Internal$Model$staticRoot = function (opts) {
	var _v0 = opts.eG;
	switch (_v0) {
		case 0:
			return A3(
				$elm$virtual_dom$VirtualDom$node,
				'div',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$virtual_dom$VirtualDom$node,
						'style',
						_List_Nil,
						_List_fromArray(
							[
								$elm$virtual_dom$VirtualDom$text($mdgriffith$elm_ui$Internal$Style$rules)
							]))
					]));
		case 1:
			return $elm$virtual_dom$VirtualDom$text('');
		default:
			return A3(
				$elm$virtual_dom$VirtualDom$node,
				'elm-ui-static-rules',
				_List_fromArray(
					[
						A2(
						$elm$virtual_dom$VirtualDom$property,
						'rules',
						$elm$json$Json$Encode$string($mdgriffith$elm_ui$Internal$Style$rules))
					]),
				_List_Nil);
	}
};
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(0),
				entries));
	});
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(0),
			pairs));
};
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$fontName = function (font) {
	switch (font.$) {
		case 0:
			return 'serif';
		case 1:
			return 'sans-serif';
		case 2:
			return 'monospace';
		case 3:
			var name = font.a;
			return '\"' + (name + '\"');
		case 4:
			var name = font.a;
			var url = font.b;
			return '\"' + (name + '\"');
		default:
			var name = font.a.eI;
			return '\"' + (name + '\"');
	}
};
var $mdgriffith$elm_ui$Internal$Model$isSmallCaps = function (_var) {
	switch (_var.$) {
		case 0:
			var name = _var.a;
			return name === 'smcp';
		case 1:
			var name = _var.a;
			return false;
		default:
			var name = _var.a;
			var index = _var.b;
			return (name === 'smcp') && (index === 1);
	}
};
var $mdgriffith$elm_ui$Internal$Model$hasSmallCaps = function (typeface) {
	if (typeface.$ === 5) {
		var font = typeface.a;
		return A2($elm$core$List$any, $mdgriffith$elm_ui$Internal$Model$isSmallCaps, font.dl);
	} else {
		return false;
	}
};
var $mdgriffith$elm_ui$Internal$Model$renderProps = F3(
	function (force, _v0, existing) {
		var key = _v0.a;
		var val = _v0.b;
		return force ? (existing + ('\n  ' + (key + (': ' + (val + ' !important;'))))) : (existing + ('\n  ' + (key + (': ' + (val + ';')))));
	});
var $mdgriffith$elm_ui$Internal$Model$renderStyle = F4(
	function (options, maybePseudo, selector, props) {
		if (maybePseudo.$ === 1) {
			return _List_fromArray(
				[
					selector + ('{' + (A3(
					$elm$core$List$foldl,
					$mdgriffith$elm_ui$Internal$Model$renderProps(false),
					'',
					props) + '\n}'))
				]);
		} else {
			var pseudo = maybePseudo.a;
			switch (pseudo) {
				case 1:
					var _v2 = options.em;
					switch (_v2) {
						case 0:
							return _List_Nil;
						case 2:
							return _List_fromArray(
								[
									selector + ('-hv {' + (A3(
									$elm$core$List$foldl,
									$mdgriffith$elm_ui$Internal$Model$renderProps(true),
									'',
									props) + '\n}'))
								]);
						default:
							return _List_fromArray(
								[
									selector + ('-hv:hover {' + (A3(
									$elm$core$List$foldl,
									$mdgriffith$elm_ui$Internal$Model$renderProps(false),
									'',
									props) + '\n}'))
								]);
					}
				case 0:
					var renderedProps = A3(
						$elm$core$List$foldl,
						$mdgriffith$elm_ui$Internal$Model$renderProps(false),
						'',
						props);
					return _List_fromArray(
						[selector + ('-fs:focus {' + (renderedProps + '\n}')), '.' + ($mdgriffith$elm_ui$Internal$Style$classes.dC + (':focus ~ ' + (selector + ('-fs:not(.focus)  {' + (renderedProps + '\n}'))))), '.' + ($mdgriffith$elm_ui$Internal$Style$classes.dC + (':focus ' + (selector + ('-fs  {' + (renderedProps + '\n}'))))), selector + ('-fs:focus-within {' + (renderedProps + '\n}')), '.focusable-parent:focus ~ ' + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.dC + (' ' + (selector + ('-fs {' + (renderedProps + '\n}'))))))]);
				default:
					return _List_fromArray(
						[
							selector + ('-act:active {' + (A3(
							$elm$core$List$foldl,
							$mdgriffith$elm_ui$Internal$Model$renderProps(false),
							'',
							props) + '\n}'))
						]);
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$renderVariant = function (_var) {
	switch (_var.$) {
		case 0:
			var name = _var.a;
			return '\"' + (name + '\"');
		case 1:
			var name = _var.a;
			return '\"' + (name + '\" 0');
		default:
			var name = _var.a;
			var index = _var.b;
			return '\"' + (name + ('\" ' + $elm$core$String$fromInt(index)));
	}
};
var $mdgriffith$elm_ui$Internal$Model$renderVariants = function (typeface) {
	if (typeface.$ === 5) {
		var font = typeface.a;
		return $elm$core$Maybe$Just(
			A2(
				$elm$core$String$join,
				', ',
				A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$renderVariant, font.dl)));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $mdgriffith$elm_ui$Internal$Model$transformValue = function (transform) {
	switch (transform.$) {
		case 0:
			return $elm$core$Maybe$Nothing;
		case 1:
			var _v1 = transform.a;
			var x = _v1.a;
			var y = _v1.b;
			var z = _v1.c;
			return $elm$core$Maybe$Just(
				'translate3d(' + ($elm$core$String$fromFloat(x) + ('px, ' + ($elm$core$String$fromFloat(y) + ('px, ' + ($elm$core$String$fromFloat(z) + 'px)'))))));
		default:
			var _v2 = transform.a;
			var tx = _v2.a;
			var ty = _v2.b;
			var tz = _v2.c;
			var _v3 = transform.b;
			var sx = _v3.a;
			var sy = _v3.b;
			var sz = _v3.c;
			var _v4 = transform.c;
			var ox = _v4.a;
			var oy = _v4.b;
			var oz = _v4.c;
			var angle = transform.d;
			var translate = 'translate3d(' + ($elm$core$String$fromFloat(tx) + ('px, ' + ($elm$core$String$fromFloat(ty) + ('px, ' + ($elm$core$String$fromFloat(tz) + 'px)')))));
			var scale = 'scale3d(' + ($elm$core$String$fromFloat(sx) + (', ' + ($elm$core$String$fromFloat(sy) + (', ' + ($elm$core$String$fromFloat(sz) + ')')))));
			var rotate = 'rotate3d(' + ($elm$core$String$fromFloat(ox) + (', ' + ($elm$core$String$fromFloat(oy) + (', ' + ($elm$core$String$fromFloat(oz) + (', ' + ($elm$core$String$fromFloat(angle) + 'rad)')))))));
			return $elm$core$Maybe$Just(translate + (' ' + (scale + (' ' + rotate))));
	}
};
var $mdgriffith$elm_ui$Internal$Model$renderStyleRule = F3(
	function (options, rule, maybePseudo) {
		switch (rule.$) {
			case 0:
				var selector = rule.a;
				var props = rule.b;
				return A4($mdgriffith$elm_ui$Internal$Model$renderStyle, options, maybePseudo, selector, props);
			case 13:
				var name = rule.a;
				var prop = rule.b;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + name,
					_List_fromArray(
						[
							A2($mdgriffith$elm_ui$Internal$Model$Property, 'box-shadow', prop)
						]));
			case 12:
				var name = rule.a;
				var transparency = rule.b;
				var opacity = A2(
					$elm$core$Basics$max,
					0,
					A2($elm$core$Basics$min, 1, 1 - transparency));
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + name,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'opacity',
							$elm$core$String$fromFloat(opacity))
						]));
			case 2:
				var i = rule.a;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.font-size-' + $elm$core$String$fromInt(i),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'font-size',
							$elm$core$String$fromInt(i) + 'px')
						]));
			case 1:
				var name = rule.a;
				var typefaces = rule.b;
				var features = A2(
					$elm$core$String$join,
					', ',
					A2($elm$core$List$filterMap, $mdgriffith$elm_ui$Internal$Model$renderVariants, typefaces));
				var families = _List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Model$Property,
						'font-family',
						A2(
							$elm$core$String$join,
							', ',
							A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$fontName, typefaces))),
						A2($mdgriffith$elm_ui$Internal$Model$Property, 'font-feature-settings', features),
						A2(
						$mdgriffith$elm_ui$Internal$Model$Property,
						'font-variant',
						A2($elm$core$List$any, $mdgriffith$elm_ui$Internal$Model$hasSmallCaps, typefaces) ? 'small-caps' : 'normal')
					]);
				return A4($mdgriffith$elm_ui$Internal$Model$renderStyle, options, maybePseudo, '.' + name, families);
			case 3:
				var _class = rule.a;
				var prop = rule.b;
				var val = rule.c;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + _class,
					_List_fromArray(
						[
							A2($mdgriffith$elm_ui$Internal$Model$Property, prop, val)
						]));
			case 4:
				var _class = rule.a;
				var prop = rule.b;
				var color = rule.c;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + _class,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							prop,
							$mdgriffith$elm_ui$Internal$Model$formatColor(color))
						]));
			case 5:
				var cls = rule.a;
				var x = rule.b;
				var y = rule.c;
				var yPx = $elm$core$String$fromInt(y) + 'px';
				var xPx = $elm$core$String$fromInt(x) + 'px';
				var single = '.' + $mdgriffith$elm_ui$Internal$Style$classes.fb;
				var row = '.' + $mdgriffith$elm_ui$Internal$Style$classes.C;
				var wrappedRow = '.' + ($mdgriffith$elm_ui$Internal$Style$classes.ck + row);
				var right = '.' + $mdgriffith$elm_ui$Internal$Style$classes.co;
				var paragraph = '.' + $mdgriffith$elm_ui$Internal$Style$classes.c5;
				var page = '.' + $mdgriffith$elm_ui$Internal$Style$classes.c4;
				var left = '.' + $mdgriffith$elm_ui$Internal$Style$classes.cn;
				var halfY = $elm$core$String$fromFloat(y / 2) + 'px';
				var halfX = $elm$core$String$fromFloat(x / 2) + 'px';
				var column = '.' + $mdgriffith$elm_ui$Internal$Style$classes.P;
				var _class = '.' + cls;
				var any = '.' + $mdgriffith$elm_ui$Internal$Style$classes.dC;
				return $elm$core$List$concat(
					_List_fromArray(
						[
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (row + (' > ' + (any + (' + ' + any)))),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-left', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (wrappedRow + (' > ' + any)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin', halfY + (' ' + halfX))
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (column + (' > ' + (any + (' + ' + any)))),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-top', yPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (page + (' > ' + (any + (' + ' + any)))),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-top', yPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (page + (' > ' + left)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-right', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (page + (' > ' + right)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-left', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_Utils_ap(_class, paragraph),
							_List_fromArray(
								[
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'line-height',
									'calc(1em + ' + ($elm$core$String$fromInt(y) + 'px)'))
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							'textarea' + (any + _class),
							_List_fromArray(
								[
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'line-height',
									'calc(1em + ' + ($elm$core$String$fromInt(y) + 'px)')),
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'height',
									'calc(100% + ' + ($elm$core$String$fromInt(y) + 'px)'))
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + (' > ' + left)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-right', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + (' > ' + right)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-left', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + '::after'),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'content', '\'\''),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'display', 'block'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'height', '0'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'width', '0'),
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'margin-top',
									$elm$core$String$fromInt((-1) * ((y / 2) | 0)) + 'px')
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + '::before'),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'content', '\'\''),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'display', 'block'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'height', '0'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'width', '0'),
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'margin-bottom',
									$elm$core$String$fromInt((-1) * ((y / 2) | 0)) + 'px')
								]))
						]));
			case 7:
				var cls = rule.a;
				var top = rule.b;
				var right = rule.c;
				var bottom = rule.d;
				var left = rule.e;
				var _class = '.' + cls;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					_class,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'padding',
							$elm$core$String$fromInt(top) + ('px ' + ($elm$core$String$fromInt(right) + ('px ' + ($elm$core$String$fromInt(bottom) + ('px ' + ($elm$core$String$fromInt(left) + 'px')))))))
						]));
			case 6:
				var cls = rule.a;
				var top = rule.b;
				var right = rule.c;
				var bottom = rule.d;
				var left = rule.e;
				var _class = '.' + cls;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					_class,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'border-width',
							$elm$core$String$fromInt(top) + ('px ' + ($elm$core$String$fromInt(right) + ('px ' + ($elm$core$String$fromInt(bottom) + ('px ' + ($elm$core$String$fromInt(left) + 'px')))))))
						]));
			case 8:
				var template = rule.a;
				var toGridLengthHelper = F3(
					function (minimum, maximum, x) {
						toGridLengthHelper:
						while (true) {
							switch (x.$) {
								case 0:
									var px = x.a;
									return $elm$core$String$fromInt(px) + 'px';
								case 1:
									var _v2 = _Utils_Tuple2(minimum, maximum);
									if (_v2.a.$ === 1) {
										if (_v2.b.$ === 1) {
											var _v3 = _v2.a;
											var _v4 = _v2.b;
											return 'max-content';
										} else {
											var _v6 = _v2.a;
											var maxSize = _v2.b.a;
											return 'minmax(max-content, ' + ($elm$core$String$fromInt(maxSize) + 'px)');
										}
									} else {
										if (_v2.b.$ === 1) {
											var minSize = _v2.a.a;
											var _v5 = _v2.b;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + 'max-content)'));
										} else {
											var minSize = _v2.a.a;
											var maxSize = _v2.b.a;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + ($elm$core$String$fromInt(maxSize) + 'px)')));
										}
									}
								case 2:
									var i = x.a;
									var _v7 = _Utils_Tuple2(minimum, maximum);
									if (_v7.a.$ === 1) {
										if (_v7.b.$ === 1) {
											var _v8 = _v7.a;
											var _v9 = _v7.b;
											return $elm$core$String$fromInt(i) + 'fr';
										} else {
											var _v11 = _v7.a;
											var maxSize = _v7.b.a;
											return 'minmax(max-content, ' + ($elm$core$String$fromInt(maxSize) + 'px)');
										}
									} else {
										if (_v7.b.$ === 1) {
											var minSize = _v7.a.a;
											var _v10 = _v7.b;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + ($elm$core$String$fromInt(i) + ('fr' + 'fr)'))));
										} else {
											var minSize = _v7.a.a;
											var maxSize = _v7.b.a;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + ($elm$core$String$fromInt(maxSize) + 'px)')));
										}
									}
								case 3:
									var m = x.a;
									var len = x.b;
									var $temp$minimum = $elm$core$Maybe$Just(m),
										$temp$maximum = maximum,
										$temp$x = len;
									minimum = $temp$minimum;
									maximum = $temp$maximum;
									x = $temp$x;
									continue toGridLengthHelper;
								default:
									var m = x.a;
									var len = x.b;
									var $temp$minimum = minimum,
										$temp$maximum = $elm$core$Maybe$Just(m),
										$temp$x = len;
									minimum = $temp$minimum;
									maximum = $temp$maximum;
									x = $temp$x;
									continue toGridLengthHelper;
							}
						}
					});
				var toGridLength = function (x) {
					return A3(toGridLengthHelper, $elm$core$Maybe$Nothing, $elm$core$Maybe$Nothing, x);
				};
				var xSpacing = toGridLength(template.fe.a);
				var ySpacing = toGridLength(template.fe.b);
				var rows = function (x) {
					return 'grid-template-rows: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						' ',
						A2($elm$core$List$map, toGridLength, template.e4)));
				var msRows = function (x) {
					return '-ms-grid-rows: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						ySpacing,
						A2($elm$core$List$map, toGridLength, template.G)));
				var msColumns = function (x) {
					return '-ms-grid-columns: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						ySpacing,
						A2($elm$core$List$map, toGridLength, template.G)));
				var gapY = 'grid-row-gap:' + (toGridLength(template.fe.b) + ';');
				var gapX = 'grid-column-gap:' + (toGridLength(template.fe.a) + ';');
				var columns = function (x) {
					return 'grid-template-columns: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						' ',
						A2($elm$core$List$map, toGridLength, template.G)));
				var _class = '.grid-rows-' + (A2(
					$elm$core$String$join,
					'-',
					A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.e4)) + ('-cols-' + (A2(
					$elm$core$String$join,
					'-',
					A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.G)) + ('-space-x-' + ($mdgriffith$elm_ui$Internal$Model$lengthClassName(template.fe.a) + ('-space-y-' + $mdgriffith$elm_ui$Internal$Model$lengthClassName(template.fe.b)))))));
				var modernGrid = _class + ('{' + (columns + (rows + (gapX + (gapY + '}')))));
				var supports = '@supports (display:grid) {' + (modernGrid + '}');
				var base = _class + ('{' + (msColumns + (msRows + '}')));
				return _List_fromArray(
					[base, supports]);
			case 9:
				var position = rule.a;
				var msPosition = A2(
					$elm$core$String$join,
					' ',
					_List_fromArray(
						[
							'-ms-grid-row: ' + ($elm$core$String$fromInt(position.C) + ';'),
							'-ms-grid-row-span: ' + ($elm$core$String$fromInt(position.bh) + ';'),
							'-ms-grid-column: ' + ($elm$core$String$fromInt(position.d$) + ';'),
							'-ms-grid-column-span: ' + ($elm$core$String$fromInt(position.ch) + ';')
						]));
				var modernPosition = A2(
					$elm$core$String$join,
					' ',
					_List_fromArray(
						[
							'grid-row: ' + ($elm$core$String$fromInt(position.C) + (' / ' + ($elm$core$String$fromInt(position.C + position.bh) + ';'))),
							'grid-column: ' + ($elm$core$String$fromInt(position.d$) + (' / ' + ($elm$core$String$fromInt(position.d$ + position.ch) + ';')))
						]));
				var _class = '.grid-pos-' + ($elm$core$String$fromInt(position.C) + ('-' + ($elm$core$String$fromInt(position.d$) + ('-' + ($elm$core$String$fromInt(position.ch) + ('-' + $elm$core$String$fromInt(position.bh)))))));
				var modernGrid = _class + ('{' + (modernPosition + '}'));
				var supports = '@supports (display:grid) {' + (modernGrid + '}');
				var base = _class + ('{' + (msPosition + '}'));
				return _List_fromArray(
					[base, supports]);
			case 11:
				var _class = rule.a;
				var styles = rule.b;
				var renderPseudoRule = function (style) {
					return A3(
						$mdgriffith$elm_ui$Internal$Model$renderStyleRule,
						options,
						style,
						$elm$core$Maybe$Just(_class));
				};
				return A2($elm$core$List$concatMap, renderPseudoRule, styles);
			default:
				var transform = rule.a;
				var val = $mdgriffith$elm_ui$Internal$Model$transformValue(transform);
				var _class = $mdgriffith$elm_ui$Internal$Model$transformClass(transform);
				var _v12 = _Utils_Tuple2(_class, val);
				if ((!_v12.a.$) && (!_v12.b.$)) {
					var cls = _v12.a.a;
					var v = _v12.b.a;
					return A4(
						$mdgriffith$elm_ui$Internal$Model$renderStyle,
						options,
						maybePseudo,
						'.' + cls,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Model$Property, 'transform', v)
							]));
				} else {
					return _List_Nil;
				}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$encodeStyles = F2(
	function (options, stylesheet) {
		return $elm$json$Json$Encode$object(
			A2(
				$elm$core$List$map,
				function (style) {
					var styled = A3($mdgriffith$elm_ui$Internal$Model$renderStyleRule, options, style, $elm$core$Maybe$Nothing);
					return _Utils_Tuple2(
						$mdgriffith$elm_ui$Internal$Model$getStyleName(style),
						A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, styled));
				},
				stylesheet));
	});
var $mdgriffith$elm_ui$Internal$Model$bracket = F2(
	function (selector, rules) {
		var renderPair = function (_v0) {
			var name = _v0.a;
			var val = _v0.b;
			return name + (': ' + (val + ';'));
		};
		return selector + (' {' + (A2(
			$elm$core$String$join,
			'',
			A2($elm$core$List$map, renderPair, rules)) + '}'));
	});
var $mdgriffith$elm_ui$Internal$Model$fontRule = F3(
	function (name, modifier, _v0) {
		var parentAdj = _v0.a;
		var textAdjustment = _v0.b;
		return _List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Model$bracket, '.' + (name + ('.' + (modifier + (', ' + ('.' + (name + (' .' + modifier))))))), parentAdj),
				A2($mdgriffith$elm_ui$Internal$Model$bracket, '.' + (name + ('.' + (modifier + ('> .' + ($mdgriffith$elm_ui$Internal$Style$classes.w + (', .' + (name + (' .' + (modifier + (' > .' + $mdgriffith$elm_ui$Internal$Style$classes.w)))))))))), textAdjustment)
			]);
	});
var $mdgriffith$elm_ui$Internal$Model$renderFontAdjustmentRule = F3(
	function (fontToAdjust, _v0, otherFontName) {
		var full = _v0.a;
		var capital = _v0.b;
		var name = _Utils_eq(fontToAdjust, otherFontName) ? fontToAdjust : (otherFontName + (' .' + fontToAdjust));
		return A2(
			$elm$core$String$join,
			' ',
			_Utils_ap(
				A3($mdgriffith$elm_ui$Internal$Model$fontRule, name, $mdgriffith$elm_ui$Internal$Style$classes.fc, capital),
				A3($mdgriffith$elm_ui$Internal$Model$fontRule, name, $mdgriffith$elm_ui$Internal$Style$classes.ei, full)));
	});
var $mdgriffith$elm_ui$Internal$Model$renderNullAdjustmentRule = F2(
	function (fontToAdjust, otherFontName) {
		var name = _Utils_eq(fontToAdjust, otherFontName) ? fontToAdjust : (otherFontName + (' .' + fontToAdjust));
		return A2(
			$elm$core$String$join,
			' ',
			_List_fromArray(
				[
					A2(
					$mdgriffith$elm_ui$Internal$Model$bracket,
					'.' + (name + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.fc + (', ' + ('.' + (name + (' .' + $mdgriffith$elm_ui$Internal$Style$classes.fc))))))),
					_List_fromArray(
						[
							_Utils_Tuple2('line-height', '1')
						])),
					A2(
					$mdgriffith$elm_ui$Internal$Model$bracket,
					'.' + (name + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.fc + ('> .' + ($mdgriffith$elm_ui$Internal$Style$classes.w + (', .' + (name + (' .' + ($mdgriffith$elm_ui$Internal$Style$classes.fc + (' > .' + $mdgriffith$elm_ui$Internal$Style$classes.w)))))))))),
					_List_fromArray(
						[
							_Utils_Tuple2('vertical-align', '0'),
							_Utils_Tuple2('line-height', '1')
						]))
				]));
	});
var $mdgriffith$elm_ui$Internal$Model$adjust = F3(
	function (size, height, vertical) {
		return {bh: height / size, aB: size, dm: vertical};
	});
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$core$List$maximum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$max, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$List$minimum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$min, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$Basics$neq = _Utils_notEqual;
var $mdgriffith$elm_ui$Internal$Model$convertAdjustment = function (adjustment) {
	var lines = _List_fromArray(
		[adjustment.dS, adjustment.dF, adjustment.d9, adjustment.eD]);
	var lineHeight = 1.5;
	var normalDescender = (lineHeight - 1) / 2;
	var oldMiddle = lineHeight / 2;
	var descender = A2(
		$elm$core$Maybe$withDefault,
		adjustment.d9,
		$elm$core$List$minimum(lines));
	var newBaseline = A2(
		$elm$core$Maybe$withDefault,
		adjustment.dF,
		$elm$core$List$minimum(
			A2(
				$elm$core$List$filter,
				function (x) {
					return !_Utils_eq(x, descender);
				},
				lines)));
	var base = lineHeight;
	var ascender = A2(
		$elm$core$Maybe$withDefault,
		adjustment.dS,
		$elm$core$List$maximum(lines));
	var capitalSize = 1 / (ascender - newBaseline);
	var capitalVertical = 1 - ascender;
	var fullSize = 1 / (ascender - descender);
	var fullVertical = 1 - ascender;
	var newCapitalMiddle = ((ascender - newBaseline) / 2) + newBaseline;
	var newFullMiddle = ((ascender - descender) / 2) + descender;
	return {
		dS: A3($mdgriffith$elm_ui$Internal$Model$adjust, capitalSize, ascender - newBaseline, capitalVertical),
		cx: A3($mdgriffith$elm_ui$Internal$Model$adjust, fullSize, ascender - descender, fullVertical)
	};
};
var $mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules = function (converted) {
	return _Utils_Tuple2(
		_List_fromArray(
			[
				_Utils_Tuple2('display', 'block')
			]),
		_List_fromArray(
			[
				_Utils_Tuple2('display', 'inline-block'),
				_Utils_Tuple2(
				'line-height',
				$elm$core$String$fromFloat(converted.bh)),
				_Utils_Tuple2(
				'vertical-align',
				$elm$core$String$fromFloat(converted.dm) + 'em'),
				_Utils_Tuple2(
				'font-size',
				$elm$core$String$fromFloat(converted.aB) + 'em')
			]));
};
var $mdgriffith$elm_ui$Internal$Model$typefaceAdjustment = function (typefaces) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (face, found) {
				if (found.$ === 1) {
					if (face.$ === 5) {
						var _with = face.a;
						var _v2 = _with.ds;
						if (_v2.$ === 1) {
							return found;
						} else {
							var adjustment = _v2.a;
							return $elm$core$Maybe$Just(
								_Utils_Tuple2(
									$mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules(
										function ($) {
											return $.cx;
										}(
											$mdgriffith$elm_ui$Internal$Model$convertAdjustment(adjustment))),
									$mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules(
										function ($) {
											return $.dS;
										}(
											$mdgriffith$elm_ui$Internal$Model$convertAdjustment(adjustment)))));
						}
					} else {
						return found;
					}
				} else {
					return found;
				}
			}),
		$elm$core$Maybe$Nothing,
		typefaces);
};
var $mdgriffith$elm_ui$Internal$Model$renderTopLevelValues = function (rules) {
	var withImport = function (font) {
		if (font.$ === 4) {
			var url = font.b;
			return $elm$core$Maybe$Just('@import url(\'' + (url + '\');'));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	};
	var fontImports = function (_v2) {
		var name = _v2.a;
		var typefaces = _v2.b;
		var imports = A2(
			$elm$core$String$join,
			'\n',
			A2($elm$core$List$filterMap, withImport, typefaces));
		return imports;
	};
	var allNames = A2($elm$core$List$map, $elm$core$Tuple$first, rules);
	var fontAdjustments = function (_v1) {
		var name = _v1.a;
		var typefaces = _v1.b;
		var _v0 = $mdgriffith$elm_ui$Internal$Model$typefaceAdjustment(typefaces);
		if (_v0.$ === 1) {
			return A2(
				$elm$core$String$join,
				'',
				A2(
					$elm$core$List$map,
					$mdgriffith$elm_ui$Internal$Model$renderNullAdjustmentRule(name),
					allNames));
		} else {
			var adjustment = _v0.a;
			return A2(
				$elm$core$String$join,
				'',
				A2(
					$elm$core$List$map,
					A2($mdgriffith$elm_ui$Internal$Model$renderFontAdjustmentRule, name, adjustment),
					allNames));
		}
	};
	return _Utils_ap(
		A2(
			$elm$core$String$join,
			'\n',
			A2($elm$core$List$map, fontImports, rules)),
		A2(
			$elm$core$String$join,
			'\n',
			A2($elm$core$List$map, fontAdjustments, rules)));
};
var $mdgriffith$elm_ui$Internal$Model$topLevelValue = function (rule) {
	if (rule.$ === 1) {
		var name = rule.a;
		var typefaces = rule.b;
		return $elm$core$Maybe$Just(
			_Utils_Tuple2(name, typefaces));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $mdgriffith$elm_ui$Internal$Model$toStyleSheetString = F2(
	function (options, stylesheet) {
		var combine = F2(
			function (style, rendered) {
				return {
					br: _Utils_ap(
						rendered.br,
						A3($mdgriffith$elm_ui$Internal$Model$renderStyleRule, options, style, $elm$core$Maybe$Nothing)),
					a$: function () {
						var _v1 = $mdgriffith$elm_ui$Internal$Model$topLevelValue(style);
						if (_v1.$ === 1) {
							return rendered.a$;
						} else {
							var topLevel = _v1.a;
							return A2($elm$core$List$cons, topLevel, rendered.a$);
						}
					}()
				};
			});
		var _v0 = A3(
			$elm$core$List$foldl,
			combine,
			{br: _List_Nil, a$: _List_Nil},
			stylesheet);
		var topLevel = _v0.a$;
		var rules = _v0.br;
		return _Utils_ap(
			$mdgriffith$elm_ui$Internal$Model$renderTopLevelValues(topLevel),
			$elm$core$String$concat(rules));
	});
var $mdgriffith$elm_ui$Internal$Model$toStyleSheet = F2(
	function (options, styleSheet) {
		var _v0 = options.eG;
		switch (_v0) {
			case 0:
				return A3(
					$elm$virtual_dom$VirtualDom$node,
					'div',
					_List_Nil,
					_List_fromArray(
						[
							A3(
							$elm$virtual_dom$VirtualDom$node,
							'style',
							_List_Nil,
							_List_fromArray(
								[
									$elm$virtual_dom$VirtualDom$text(
									A2($mdgriffith$elm_ui$Internal$Model$toStyleSheetString, options, styleSheet))
								]))
						]));
			case 1:
				return A3(
					$elm$virtual_dom$VirtualDom$node,
					'div',
					_List_Nil,
					_List_fromArray(
						[
							A3(
							$elm$virtual_dom$VirtualDom$node,
							'style',
							_List_Nil,
							_List_fromArray(
								[
									$elm$virtual_dom$VirtualDom$text(
									A2($mdgriffith$elm_ui$Internal$Model$toStyleSheetString, options, styleSheet))
								]))
						]));
			default:
				return A3(
					$elm$virtual_dom$VirtualDom$node,
					'elm-ui-rules',
					_List_fromArray(
						[
							A2(
							$elm$virtual_dom$VirtualDom$property,
							'rules',
							A2($mdgriffith$elm_ui$Internal$Model$encodeStyles, options, styleSheet))
						]),
					_List_Nil);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$embedKeyed = F4(
	function (_static, opts, styles, children) {
		var dynamicStyleSheet = A2(
			$mdgriffith$elm_ui$Internal$Model$toStyleSheet,
			opts,
			A3(
				$elm$core$List$foldl,
				$mdgriffith$elm_ui$Internal$Model$reduceStyles,
				_Utils_Tuple2(
					$elm$core$Set$empty,
					$mdgriffith$elm_ui$Internal$Model$renderFocusStyle(opts.eh)),
				styles).b);
		return _static ? A2(
			$elm$core$List$cons,
			_Utils_Tuple2(
				'static-stylesheet',
				$mdgriffith$elm_ui$Internal$Model$staticRoot(opts)),
			A2(
				$elm$core$List$cons,
				_Utils_Tuple2('dynamic-stylesheet', dynamicStyleSheet),
				children)) : A2(
			$elm$core$List$cons,
			_Utils_Tuple2('dynamic-stylesheet', dynamicStyleSheet),
			children);
	});
var $mdgriffith$elm_ui$Internal$Model$embedWith = F4(
	function (_static, opts, styles, children) {
		var dynamicStyleSheet = A2(
			$mdgriffith$elm_ui$Internal$Model$toStyleSheet,
			opts,
			A3(
				$elm$core$List$foldl,
				$mdgriffith$elm_ui$Internal$Model$reduceStyles,
				_Utils_Tuple2(
					$elm$core$Set$empty,
					$mdgriffith$elm_ui$Internal$Model$renderFocusStyle(opts.eh)),
				styles).b);
		return _static ? A2(
			$elm$core$List$cons,
			$mdgriffith$elm_ui$Internal$Model$staticRoot(opts),
			A2($elm$core$List$cons, dynamicStyleSheet, children)) : A2($elm$core$List$cons, dynamicStyleSheet, children);
	});
var $mdgriffith$elm_ui$Internal$Flag$heightBetween = $mdgriffith$elm_ui$Internal$Flag$flag(45);
var $mdgriffith$elm_ui$Internal$Flag$heightFill = $mdgriffith$elm_ui$Internal$Flag$flag(37);
var $elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var $elm$core$Basics$not = _Basics_not;
var $elm$html$Html$p = _VirtualDom_node('p');
var $mdgriffith$elm_ui$Internal$Flag$present = F2(
	function (myFlag, _v0) {
		var fieldOne = _v0.a;
		var fieldTwo = _v0.b;
		if (!myFlag.$) {
			var first = myFlag.a;
			return _Utils_eq(first & fieldOne, first);
		} else {
			var second = myFlag.a;
			return _Utils_eq(second & fieldTwo, second);
		}
	});
var $elm$html$Html$s = _VirtualDom_node('s');
var $elm$html$Html$u = _VirtualDom_node('u');
var $mdgriffith$elm_ui$Internal$Flag$widthBetween = $mdgriffith$elm_ui$Internal$Flag$flag(44);
var $mdgriffith$elm_ui$Internal$Flag$widthFill = $mdgriffith$elm_ui$Internal$Flag$flag(39);
var $mdgriffith$elm_ui$Internal$Model$finalizeNode = F6(
	function (has, node, attributes, children, embedMode, parentContext) {
		var createNode = F2(
			function (nodeName, attrs) {
				if (children.$ === 1) {
					var keyed = children.a;
					return A3(
						$elm$virtual_dom$VirtualDom$keyedNode,
						nodeName,
						attrs,
						function () {
							switch (embedMode.$) {
								case 0:
									return keyed;
								case 2:
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedKeyed, false, opts, styles, keyed);
								default:
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedKeyed, true, opts, styles, keyed);
							}
						}());
				} else {
					var unkeyed = children.a;
					return A2(
						function () {
							switch (nodeName) {
								case 'div':
									return $elm$html$Html$div;
								case 'p':
									return $elm$html$Html$p;
								default:
									return $elm$virtual_dom$VirtualDom$node(nodeName);
							}
						}(),
						attrs,
						function () {
							switch (embedMode.$) {
								case 0:
									return unkeyed;
								case 2:
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedWith, false, opts, styles, unkeyed);
								default:
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedWith, true, opts, styles, unkeyed);
							}
						}());
				}
			});
		var html = function () {
			switch (node.$) {
				case 0:
					return A2(createNode, 'div', attributes);
				case 1:
					var nodeName = node.a;
					return A2(createNode, nodeName, attributes);
				default:
					var nodeName = node.a;
					var internal = node.b;
					return A3(
						$elm$virtual_dom$VirtualDom$node,
						nodeName,
						attributes,
						_List_fromArray(
							[
								A2(
								createNode,
								internal,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Style$classes.dC + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.fb))
									]))
							]));
			}
		}();
		switch (parentContext) {
			case 0:
				return (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$widthFill, has) && (!A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$widthBetween, has))) ? html : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$alignRight, has) ? A2(
					$elm$html$Html$u,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.dC, $mdgriffith$elm_ui$Internal$Style$classes.fb, $mdgriffith$elm_ui$Internal$Style$classes.a9, $mdgriffith$elm_ui$Internal$Style$classes.Q, $mdgriffith$elm_ui$Internal$Style$classes.dz])))
						]),
					_List_fromArray(
						[html])) : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$centerX, has) ? A2(
					$elm$html$Html$s,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.dC, $mdgriffith$elm_ui$Internal$Style$classes.fb, $mdgriffith$elm_ui$Internal$Style$classes.a9, $mdgriffith$elm_ui$Internal$Style$classes.Q, $mdgriffith$elm_ui$Internal$Style$classes.dx])))
						]),
					_List_fromArray(
						[html])) : html));
			case 1:
				return (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$heightFill, has) && (!A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$heightBetween, has))) ? html : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$centerY, has) ? A2(
					$elm$html$Html$s,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.dC, $mdgriffith$elm_ui$Internal$Style$classes.fb, $mdgriffith$elm_ui$Internal$Style$classes.a9, $mdgriffith$elm_ui$Internal$Style$classes.dy])))
						]),
					_List_fromArray(
						[html])) : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$alignBottom, has) ? A2(
					$elm$html$Html$u,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.dC, $mdgriffith$elm_ui$Internal$Style$classes.fb, $mdgriffith$elm_ui$Internal$Style$classes.a9, $mdgriffith$elm_ui$Internal$Style$classes.dw])))
						]),
					_List_fromArray(
						[html])) : html));
			default:
				return html;
		}
	});
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $mdgriffith$elm_ui$Internal$Model$textElementClasses = $mdgriffith$elm_ui$Internal$Style$classes.dC + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.w + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.ci + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.bZ)))));
var $mdgriffith$elm_ui$Internal$Model$textElement = function (str) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Model$textElementClasses)
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(str)
			]));
};
var $mdgriffith$elm_ui$Internal$Model$textElementFillClasses = $mdgriffith$elm_ui$Internal$Style$classes.dC + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.w + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.cj + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.b_)))));
var $mdgriffith$elm_ui$Internal$Model$textElementFill = function (str) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Model$textElementFillClasses)
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(str)
			]));
};
var $mdgriffith$elm_ui$Internal$Model$createElement = F3(
	function (context, children, rendered) {
		var gatherKeyed = F2(
			function (_v8, _v9) {
				var key = _v8.a;
				var child = _v8.b;
				var htmls = _v9.a;
				var existingStyles = _v9.b;
				switch (child.$) {
					case 0:
						var html = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									html(context)),
								htmls),
							existingStyles) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									html(context)),
								htmls),
							existingStyles);
					case 1:
						var styled = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									A2(styled.en, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context)),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.fk : _Utils_ap(styled.fk, existingStyles)) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									A2(styled.en, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context)),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.fk : _Utils_ap(styled.fk, existingStyles));
					case 2:
						var str = child.a;
						return _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									_Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asEl) ? $mdgriffith$elm_ui$Internal$Model$textElementFill(str) : $mdgriffith$elm_ui$Internal$Model$textElement(str)),
								htmls),
							existingStyles);
					default:
						return _Utils_Tuple2(htmls, existingStyles);
				}
			});
		var gather = F2(
			function (child, _v6) {
				var htmls = _v6.a;
				var existingStyles = _v6.b;
				switch (child.$) {
					case 0:
						var html = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								html(context),
								htmls),
							existingStyles) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								html(context),
								htmls),
							existingStyles);
					case 1:
						var styled = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								A2(styled.en, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.fk : _Utils_ap(styled.fk, existingStyles)) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								A2(styled.en, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.fk : _Utils_ap(styled.fk, existingStyles));
					case 2:
						var str = child.a;
						return _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asEl) ? $mdgriffith$elm_ui$Internal$Model$textElementFill(str) : $mdgriffith$elm_ui$Internal$Model$textElement(str),
								htmls),
							existingStyles);
					default:
						return _Utils_Tuple2(htmls, existingStyles);
				}
			});
		if (children.$ === 1) {
			var keyedChildren = children.a;
			var _v1 = A3(
				$elm$core$List$foldr,
				gatherKeyed,
				_Utils_Tuple2(_List_Nil, _List_Nil),
				keyedChildren);
			var keyed = _v1.a;
			var styles = _v1.b;
			var newStyles = $elm$core$List$isEmpty(styles) ? rendered.fk : _Utils_ap(rendered.fk, styles);
			if (!newStyles.b) {
				return $mdgriffith$elm_ui$Internal$Model$Unstyled(
					A5(
						$mdgriffith$elm_ui$Internal$Model$finalizeNode,
						rendered.aa,
						rendered.ab,
						rendered.W,
						$mdgriffith$elm_ui$Internal$Model$Keyed(
							A3($mdgriffith$elm_ui$Internal$Model$addKeyedChildren, 'nearby-element-pls', keyed, rendered.X)),
						$mdgriffith$elm_ui$Internal$Model$NoStyleSheet));
			} else {
				var allStyles = newStyles;
				return $mdgriffith$elm_ui$Internal$Model$Styled(
					{
						en: A4(
							$mdgriffith$elm_ui$Internal$Model$finalizeNode,
							rendered.aa,
							rendered.ab,
							rendered.W,
							$mdgriffith$elm_ui$Internal$Model$Keyed(
								A3($mdgriffith$elm_ui$Internal$Model$addKeyedChildren, 'nearby-element-pls', keyed, rendered.X))),
						fk: allStyles
					});
			}
		} else {
			var unkeyedChildren = children.a;
			var _v3 = A3(
				$elm$core$List$foldr,
				gather,
				_Utils_Tuple2(_List_Nil, _List_Nil),
				unkeyedChildren);
			var unkeyed = _v3.a;
			var styles = _v3.b;
			var newStyles = $elm$core$List$isEmpty(styles) ? rendered.fk : _Utils_ap(rendered.fk, styles);
			if (!newStyles.b) {
				return $mdgriffith$elm_ui$Internal$Model$Unstyled(
					A5(
						$mdgriffith$elm_ui$Internal$Model$finalizeNode,
						rendered.aa,
						rendered.ab,
						rendered.W,
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							A2($mdgriffith$elm_ui$Internal$Model$addChildren, unkeyed, rendered.X)),
						$mdgriffith$elm_ui$Internal$Model$NoStyleSheet));
			} else {
				var allStyles = newStyles;
				return $mdgriffith$elm_ui$Internal$Model$Styled(
					{
						en: A4(
							$mdgriffith$elm_ui$Internal$Model$finalizeNode,
							rendered.aa,
							rendered.ab,
							rendered.W,
							$mdgriffith$elm_ui$Internal$Model$Unkeyed(
								A2($mdgriffith$elm_ui$Internal$Model$addChildren, unkeyed, rendered.X))),
						fk: allStyles
					});
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$Single = F3(
	function (a, b, c) {
		return {$: 3, a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Model$Transform = function (a) {
	return {$: 10, a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$core$Bitwise$or = _Bitwise_or;
var $mdgriffith$elm_ui$Internal$Flag$add = F2(
	function (myFlag, _v0) {
		var one = _v0.a;
		var two = _v0.b;
		if (!myFlag.$) {
			var first = myFlag.a;
			return A2($mdgriffith$elm_ui$Internal$Flag$Field, first | one, two);
		} else {
			var second = myFlag.a;
			return A2($mdgriffith$elm_ui$Internal$Flag$Field, one, second | two);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$ChildrenBehind = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$ChildrenInFront = function (a) {
	return {$: 2, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$nearbyElement = F2(
	function (location, elem) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class(
					function () {
						switch (location) {
							case 0:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.au, $mdgriffith$elm_ui$Internal$Style$classes.fb, $mdgriffith$elm_ui$Internal$Style$classes.dr]));
							case 1:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.au, $mdgriffith$elm_ui$Internal$Style$classes.fb, $mdgriffith$elm_ui$Internal$Style$classes.dH]));
							case 2:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.au, $mdgriffith$elm_ui$Internal$Style$classes.fb, $mdgriffith$elm_ui$Internal$Style$classes.eR]));
							case 3:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.au, $mdgriffith$elm_ui$Internal$Style$classes.fb, $mdgriffith$elm_ui$Internal$Style$classes.eO]));
							case 4:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.au, $mdgriffith$elm_ui$Internal$Style$classes.fb, $mdgriffith$elm_ui$Internal$Style$classes.es]));
							default:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.au, $mdgriffith$elm_ui$Internal$Style$classes.fb, $mdgriffith$elm_ui$Internal$Style$classes.dG]));
						}
					}())
				]),
			_List_fromArray(
				[
					function () {
					switch (elem.$) {
						case 3:
							return $elm$virtual_dom$VirtualDom$text('');
						case 2:
							var str = elem.a;
							return $mdgriffith$elm_ui$Internal$Model$textElement(str);
						case 0:
							var html = elem.a;
							return html($mdgriffith$elm_ui$Internal$Model$asEl);
						default:
							var styled = elem.a;
							return A2(styled.en, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, $mdgriffith$elm_ui$Internal$Model$asEl);
					}
				}()
				]));
	});
var $mdgriffith$elm_ui$Internal$Model$addNearbyElement = F3(
	function (location, elem, existing) {
		var nearby = A2($mdgriffith$elm_ui$Internal$Model$nearbyElement, location, elem);
		switch (existing.$) {
			case 0:
				if (location === 5) {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenBehind(
						_List_fromArray(
							[nearby]));
				} else {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenInFront(
						_List_fromArray(
							[nearby]));
				}
			case 1:
				var existingBehind = existing.a;
				if (location === 5) {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenBehind(
						A2($elm$core$List$cons, nearby, existingBehind));
				} else {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						existingBehind,
						_List_fromArray(
							[nearby]));
				}
			case 2:
				var existingInFront = existing.a;
				if (location === 5) {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						_List_fromArray(
							[nearby]),
						existingInFront);
				} else {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenInFront(
						A2($elm$core$List$cons, nearby, existingInFront));
				}
			default:
				var existingBehind = existing.a;
				var existingInFront = existing.b;
				if (location === 5) {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						A2($elm$core$List$cons, nearby, existingBehind),
						existingInFront);
				} else {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						existingBehind,
						A2($elm$core$List$cons, nearby, existingInFront));
				}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$Embedded = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$NodeName = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$addNodeName = F2(
	function (newNode, old) {
		switch (old.$) {
			case 0:
				return $mdgriffith$elm_ui$Internal$Model$NodeName(newNode);
			case 1:
				var name = old.a;
				return A2($mdgriffith$elm_ui$Internal$Model$Embedded, name, newNode);
			default:
				var x = old.a;
				var y = old.b;
				return A2($mdgriffith$elm_ui$Internal$Model$Embedded, x, y);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$alignXName = function (align) {
	switch (align) {
		case 0:
			return $mdgriffith$elm_ui$Internal$Style$classes.bF + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.cn);
		case 2:
			return $mdgriffith$elm_ui$Internal$Style$classes.bF + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.co);
		default:
			return $mdgriffith$elm_ui$Internal$Style$classes.bF + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.du);
	}
};
var $mdgriffith$elm_ui$Internal$Model$alignYName = function (align) {
	switch (align) {
		case 0:
			return $mdgriffith$elm_ui$Internal$Style$classes.bG + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.dA);
		case 2:
			return $mdgriffith$elm_ui$Internal$Style$classes.bG + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.dt);
		default:
			return $mdgriffith$elm_ui$Internal$Style$classes.bG + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.dv);
	}
};
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $mdgriffith$elm_ui$Internal$Model$FullTransform = F4(
	function (a, b, c, d) {
		return {$: 2, a: a, b: b, c: c, d: d};
	});
var $mdgriffith$elm_ui$Internal$Model$Moved = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$composeTransformation = F2(
	function (transform, component) {
		switch (transform.$) {
			case 0:
				switch (component.$) {
					case 0:
						var x = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, 0, 0));
					case 1:
						var y = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(0, y, 0));
					case 2:
						var z = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(0, 0, z));
					case 3:
						var xyz = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(xyz);
					case 4:
						var xyz = component.a;
						var angle = component.b;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(0, 0, 0),
							_Utils_Tuple3(1, 1, 1),
							xyz,
							angle);
					default:
						var xyz = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(0, 0, 0),
							xyz,
							_Utils_Tuple3(0, 0, 1),
							0);
				}
			case 1:
				var moved = transform.a;
				var x = moved.a;
				var y = moved.b;
				var z = moved.c;
				switch (component.$) {
					case 0:
						var newX = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(newX, y, z));
					case 1:
						var newY = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, newY, z));
					case 2:
						var newZ = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, y, newZ));
					case 3:
						var xyz = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(xyz);
					case 4:
						var xyz = component.a;
						var angle = component.b;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							moved,
							_Utils_Tuple3(1, 1, 1),
							xyz,
							angle);
					default:
						var scale = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							moved,
							scale,
							_Utils_Tuple3(0, 0, 1),
							0);
				}
			default:
				var moved = transform.a;
				var x = moved.a;
				var y = moved.b;
				var z = moved.c;
				var scaled = transform.b;
				var origin = transform.c;
				var angle = transform.d;
				switch (component.$) {
					case 0:
						var newX = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(newX, y, z),
							scaled,
							origin,
							angle);
					case 1:
						var newY = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(x, newY, z),
							scaled,
							origin,
							angle);
					case 2:
						var newZ = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(x, y, newZ),
							scaled,
							origin,
							angle);
					case 3:
						var newMove = component.a;
						return A4($mdgriffith$elm_ui$Internal$Model$FullTransform, newMove, scaled, origin, angle);
					case 4:
						var newOrigin = component.a;
						var newAngle = component.b;
						return A4($mdgriffith$elm_ui$Internal$Model$FullTransform, moved, scaled, newOrigin, newAngle);
					default:
						var newScale = component.a;
						return A4($mdgriffith$elm_ui$Internal$Model$FullTransform, moved, newScale, origin, angle);
				}
		}
	});
var $mdgriffith$elm_ui$Internal$Flag$height = $mdgriffith$elm_ui$Internal$Flag$flag(7);
var $mdgriffith$elm_ui$Internal$Flag$heightContent = $mdgriffith$elm_ui$Internal$Flag$flag(36);
var $mdgriffith$elm_ui$Internal$Flag$merge = F2(
	function (_v0, _v1) {
		var one = _v0.a;
		var two = _v0.b;
		var three = _v1.a;
		var four = _v1.b;
		return A2($mdgriffith$elm_ui$Internal$Flag$Field, one | three, two | four);
	});
var $mdgriffith$elm_ui$Internal$Flag$none = A2($mdgriffith$elm_ui$Internal$Flag$Field, 0, 0);
var $mdgriffith$elm_ui$Internal$Model$renderHeight = function (h) {
	switch (h.$) {
		case 0:
			var px = h.a;
			var val = $elm$core$String$fromInt(px);
			var name = 'height-px-' + val;
			return _Utils_Tuple3(
				$mdgriffith$elm_ui$Internal$Flag$none,
				$mdgriffith$elm_ui$Internal$Style$classes.cy + (' ' + name),
				_List_fromArray(
					[
						A3($mdgriffith$elm_ui$Internal$Model$Single, name, 'height', val + 'px')
					]));
		case 1:
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightContent, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.bZ,
				_List_Nil);
		case 2:
			var portion = h.a;
			return (portion === 1) ? _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.b_,
				_List_Nil) : _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.cz + (' height-fill-' + $elm$core$String$fromInt(portion)),
				_List_fromArray(
					[
						A3(
						$mdgriffith$elm_ui$Internal$Model$Single,
						$mdgriffith$elm_ui$Internal$Style$classes.dC + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.P + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
							'height-fill-' + $elm$core$String$fromInt(portion))))),
						'flex-grow',
						$elm$core$String$fromInt(portion * 100000))
					]));
		case 3:
			var minSize = h.a;
			var len = h.b;
			var cls = 'min-height-' + $elm$core$String$fromInt(minSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'min-height',
				$elm$core$String$fromInt(minSize) + 'px');
			var _v1 = $mdgriffith$elm_ui$Internal$Model$renderHeight(len);
			var newFlag = _v1.a;
			var newAttrs = _v1.b;
			var newStyle = _v1.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
		default:
			var maxSize = h.a;
			var len = h.b;
			var cls = 'max-height-' + $elm$core$String$fromInt(maxSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'max-height',
				$elm$core$String$fromInt(maxSize) + 'px');
			var _v2 = $mdgriffith$elm_ui$Internal$Model$renderHeight(len);
			var newFlag = _v2.a;
			var newAttrs = _v2.b;
			var newStyle = _v2.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
	}
};
var $mdgriffith$elm_ui$Internal$Flag$widthContent = $mdgriffith$elm_ui$Internal$Flag$flag(38);
var $mdgriffith$elm_ui$Internal$Model$renderWidth = function (w) {
	switch (w.$) {
		case 0:
			var px = w.a;
			return _Utils_Tuple3(
				$mdgriffith$elm_ui$Internal$Flag$none,
				$mdgriffith$elm_ui$Internal$Style$classes.$7 + (' width-px-' + $elm$core$String$fromInt(px)),
				_List_fromArray(
					[
						A3(
						$mdgriffith$elm_ui$Internal$Model$Single,
						'width-px-' + $elm$core$String$fromInt(px),
						'width',
						$elm$core$String$fromInt(px) + 'px')
					]));
		case 1:
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthContent, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.ci,
				_List_Nil);
		case 2:
			var portion = w.a;
			return (portion === 1) ? _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.cj,
				_List_Nil) : _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.dp + (' width-fill-' + $elm$core$String$fromInt(portion)),
				_List_fromArray(
					[
						A3(
						$mdgriffith$elm_ui$Internal$Model$Single,
						$mdgriffith$elm_ui$Internal$Style$classes.dC + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.C + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
							'width-fill-' + $elm$core$String$fromInt(portion))))),
						'flex-grow',
						$elm$core$String$fromInt(portion * 100000))
					]));
		case 3:
			var minSize = w.a;
			var len = w.b;
			var cls = 'min-width-' + $elm$core$String$fromInt(minSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'min-width',
				$elm$core$String$fromInt(minSize) + 'px');
			var _v1 = $mdgriffith$elm_ui$Internal$Model$renderWidth(len);
			var newFlag = _v1.a;
			var newAttrs = _v1.b;
			var newStyle = _v1.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
		default:
			var maxSize = w.a;
			var len = w.b;
			var cls = 'max-width-' + $elm$core$String$fromInt(maxSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'max-width',
				$elm$core$String$fromInt(maxSize) + 'px');
			var _v2 = $mdgriffith$elm_ui$Internal$Model$renderWidth(len);
			var newFlag = _v2.a;
			var newAttrs = _v2.b;
			var newStyle = _v2.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
	}
};
var $mdgriffith$elm_ui$Internal$Flag$borderWidth = $mdgriffith$elm_ui$Internal$Flag$flag(27);
var $mdgriffith$elm_ui$Internal$Model$skippable = F2(
	function (flag, style) {
		if (_Utils_eq(flag, $mdgriffith$elm_ui$Internal$Flag$borderWidth)) {
			if (style.$ === 3) {
				var val = style.c;
				switch (val) {
					case '0px':
						return true;
					case '1px':
						return true;
					case '2px':
						return true;
					case '3px':
						return true;
					case '4px':
						return true;
					case '5px':
						return true;
					case '6px':
						return true;
					default:
						return false;
				}
			} else {
				return false;
			}
		} else {
			switch (style.$) {
				case 2:
					var i = style.a;
					return (i >= 8) && (i <= 32);
				case 7:
					var name = style.a;
					var t = style.b;
					var r = style.c;
					var b = style.d;
					var l = style.e;
					return _Utils_eq(t, b) && (_Utils_eq(t, r) && (_Utils_eq(t, l) && ((t >= 0) && (t <= 24))));
				default:
					return false;
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Flag$width = $mdgriffith$elm_ui$Internal$Flag$flag(6);
var $mdgriffith$elm_ui$Internal$Flag$xAlign = $mdgriffith$elm_ui$Internal$Flag$flag(30);
var $mdgriffith$elm_ui$Internal$Flag$yAlign = $mdgriffith$elm_ui$Internal$Flag$flag(29);
var $mdgriffith$elm_ui$Internal$Model$gatherAttrRecursive = F8(
	function (classes, node, has, transform, styles, attrs, children, elementAttrs) {
		gatherAttrRecursive:
		while (true) {
			if (!elementAttrs.b) {
				var _v1 = $mdgriffith$elm_ui$Internal$Model$transformClass(transform);
				if (_v1.$ === 1) {
					return {
						W: A2(
							$elm$core$List$cons,
							$elm$html$Html$Attributes$class(classes),
							attrs),
						X: children,
						aa: has,
						ab: node,
						fk: styles
					};
				} else {
					var _class = _v1.a;
					return {
						W: A2(
							$elm$core$List$cons,
							$elm$html$Html$Attributes$class(classes + (' ' + _class)),
							attrs),
						X: children,
						aa: has,
						ab: node,
						fk: A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$Transform(transform),
							styles)
					};
				}
			} else {
				var attribute = elementAttrs.a;
				var remaining = elementAttrs.b;
				switch (attribute.$) {
					case 0:
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = has,
							$temp$transform = transform,
							$temp$styles = styles,
							$temp$attrs = attrs,
							$temp$children = children,
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 3:
						var flag = attribute.a;
						var exactClassName = attribute.b;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, flag, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							var $temp$classes = exactClassName + (' ' + classes),
								$temp$node = node,
								$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						}
					case 1:
						var actualAttribute = attribute.a;
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = has,
							$temp$transform = transform,
							$temp$styles = styles,
							$temp$attrs = A2($elm$core$List$cons, actualAttribute, attrs),
							$temp$children = children,
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 4:
						var flag = attribute.a;
						var style = attribute.b;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, flag, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							if (A2($mdgriffith$elm_ui$Internal$Model$skippable, flag, style)) {
								var $temp$classes = $mdgriffith$elm_ui$Internal$Model$getStyleName(style) + (' ' + classes),
									$temp$node = node,
									$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							} else {
								var $temp$classes = $mdgriffith$elm_ui$Internal$Model$getStyleName(style) + (' ' + classes),
									$temp$node = node,
									$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
									$temp$transform = transform,
									$temp$styles = A2($elm$core$List$cons, style, styles),
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							}
						}
					case 10:
						var flag = attribute.a;
						var component = attribute.b;
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
							$temp$transform = A2($mdgriffith$elm_ui$Internal$Model$composeTransformation, transform, component),
							$temp$styles = styles,
							$temp$attrs = attrs,
							$temp$children = children,
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 7:
						var width = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$width, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							switch (width.$) {
								case 0:
									var px = width.a;
									var $temp$classes = ($mdgriffith$elm_ui$Internal$Style$classes.$7 + (' width-px-' + $elm$core$String$fromInt(px))) + (' ' + classes),
										$temp$node = node,
										$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has),
										$temp$transform = transform,
										$temp$styles = A2(
										$elm$core$List$cons,
										A3(
											$mdgriffith$elm_ui$Internal$Model$Single,
											'width-px-' + $elm$core$String$fromInt(px),
											'width',
											$elm$core$String$fromInt(px) + 'px'),
										styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 1:
									var $temp$classes = classes + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.ci),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$add,
										$mdgriffith$elm_ui$Internal$Flag$widthContent,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
										$temp$transform = transform,
										$temp$styles = styles,
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 2:
									var portion = width.a;
									if (portion === 1) {
										var $temp$classes = classes + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.cj),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$widthFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									} else {
										var $temp$classes = classes + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.dp + (' width-fill-' + $elm$core$String$fromInt(portion)))),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$widthFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
											$temp$transform = transform,
											$temp$styles = A2(
											$elm$core$List$cons,
											A3(
												$mdgriffith$elm_ui$Internal$Model$Single,
												$mdgriffith$elm_ui$Internal$Style$classes.dC + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.C + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
													'width-fill-' + $elm$core$String$fromInt(portion))))),
												'flex-grow',
												$elm$core$String$fromInt(portion * 100000)),
											styles),
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									}
								default:
									var _v4 = $mdgriffith$elm_ui$Internal$Model$renderWidth(width);
									var addToFlags = _v4.a;
									var newClass = _v4.b;
									var newStyles = _v4.c;
									var $temp$classes = classes + (' ' + newClass),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$merge,
										addToFlags,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
										$temp$transform = transform,
										$temp$styles = _Utils_ap(newStyles, styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
							}
						}
					case 8:
						var height = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$height, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							switch (height.$) {
								case 0:
									var px = height.a;
									var val = $elm$core$String$fromInt(px) + 'px';
									var name = 'height-px-' + val;
									var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.cy + (' ' + (name + (' ' + classes))),
										$temp$node = node,
										$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has),
										$temp$transform = transform,
										$temp$styles = A2(
										$elm$core$List$cons,
										A3($mdgriffith$elm_ui$Internal$Model$Single, name, 'height ', val),
										styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 1:
									var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.bZ + (' ' + classes),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$add,
										$mdgriffith$elm_ui$Internal$Flag$heightContent,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
										$temp$transform = transform,
										$temp$styles = styles,
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 2:
									var portion = height.a;
									if (portion === 1) {
										var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.b_ + (' ' + classes),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$heightFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									} else {
										var $temp$classes = classes + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.cz + (' height-fill-' + $elm$core$String$fromInt(portion)))),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$heightFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
											$temp$transform = transform,
											$temp$styles = A2(
											$elm$core$List$cons,
											A3(
												$mdgriffith$elm_ui$Internal$Model$Single,
												$mdgriffith$elm_ui$Internal$Style$classes.dC + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.P + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
													'height-fill-' + $elm$core$String$fromInt(portion))))),
												'flex-grow',
												$elm$core$String$fromInt(portion * 100000)),
											styles),
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									}
								default:
									var _v6 = $mdgriffith$elm_ui$Internal$Model$renderHeight(height);
									var addToFlags = _v6.a;
									var newClass = _v6.b;
									var newStyles = _v6.c;
									var $temp$classes = classes + (' ' + newClass),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$merge,
										addToFlags,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
										$temp$transform = transform,
										$temp$styles = _Utils_ap(newStyles, styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
							}
						}
					case 2:
						var description = attribute.a;
						switch (description.$) {
							case 0:
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'main', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 1:
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'nav', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 2:
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'footer', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 3:
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'aside', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 4:
								var i = description.a;
								if (i <= 1) {
									var $temp$classes = classes,
										$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'h1', node),
										$temp$has = has,
										$temp$transform = transform,
										$temp$styles = styles,
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								} else {
									if (i < 7) {
										var $temp$classes = classes,
											$temp$node = A2(
											$mdgriffith$elm_ui$Internal$Model$addNodeName,
											'h' + $elm$core$String$fromInt(i),
											node),
											$temp$has = has,
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									} else {
										var $temp$classes = classes,
											$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'h6', node),
											$temp$has = has,
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									}
								}
							case 9:
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 8:
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'role', 'button'),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 5:
								var label = description.a;
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'aria-label', label),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 6:
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'aria-live', 'polite'),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							default:
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'aria-live', 'assertive'),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
						}
					case 9:
						var location = attribute.a;
						var elem = attribute.b;
						var newStyles = function () {
							switch (elem.$) {
								case 3:
									return styles;
								case 2:
									var str = elem.a;
									return styles;
								case 0:
									var html = elem.a;
									return styles;
								default:
									var styled = elem.a;
									return _Utils_ap(styles, styled.fk);
							}
						}();
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = has,
							$temp$transform = transform,
							$temp$styles = newStyles,
							$temp$attrs = attrs,
							$temp$children = A3($mdgriffith$elm_ui$Internal$Model$addNearbyElement, location, elem, children),
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 6:
						var x = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$xAlign, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							var $temp$classes = $mdgriffith$elm_ui$Internal$Model$alignXName(x) + (' ' + classes),
								$temp$node = node,
								$temp$has = function (flags) {
								switch (x) {
									case 1:
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$centerX, flags);
									case 2:
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$alignRight, flags);
									default:
										return flags;
								}
							}(
								A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$xAlign, has)),
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						}
					default:
						var y = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$yAlign, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							var $temp$classes = $mdgriffith$elm_ui$Internal$Model$alignYName(y) + (' ' + classes),
								$temp$node = node,
								$temp$has = function (flags) {
								switch (y) {
									case 1:
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$centerY, flags);
									case 2:
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$alignBottom, flags);
									default:
										return flags;
								}
							}(
								A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$yAlign, has)),
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						}
				}
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$Untransformed = {$: 0};
var $mdgriffith$elm_ui$Internal$Model$untransformed = $mdgriffith$elm_ui$Internal$Model$Untransformed;
var $mdgriffith$elm_ui$Internal$Model$element = F4(
	function (context, node, attributes, children) {
		return A3(
			$mdgriffith$elm_ui$Internal$Model$createElement,
			context,
			children,
			A8(
				$mdgriffith$elm_ui$Internal$Model$gatherAttrRecursive,
				$mdgriffith$elm_ui$Internal$Model$contextClasses(context),
				node,
				$mdgriffith$elm_ui$Internal$Flag$none,
				$mdgriffith$elm_ui$Internal$Model$untransformed,
				_List_Nil,
				_List_Nil,
				$mdgriffith$elm_ui$Internal$Model$NoNearbyChildren,
				$elm$core$List$reverse(attributes)));
	});
var $mdgriffith$elm_ui$Internal$Model$Height = function (a) {
	return {$: 8, a: a};
};
var $mdgriffith$elm_ui$Element$height = $mdgriffith$elm_ui$Internal$Model$Height;
var $mdgriffith$elm_ui$Internal$Model$Attr = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$htmlClass = function (cls) {
	return $mdgriffith$elm_ui$Internal$Model$Attr(
		$elm$html$Html$Attributes$class(cls));
};
var $mdgriffith$elm_ui$Internal$Model$Content = {$: 1};
var $mdgriffith$elm_ui$Element$shrink = $mdgriffith$elm_ui$Internal$Model$Content;
var $mdgriffith$elm_ui$Internal$Model$Width = function (a) {
	return {$: 7, a: a};
};
var $mdgriffith$elm_ui$Element$width = $mdgriffith$elm_ui$Internal$Model$Width;
var $mdgriffith$elm_ui$Element$column = F2(
	function (attrs, children) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asColumn,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.d1 + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.aL)),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
						attrs))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
	});
var $avh4$elm_color$Color$black = A4($avh4$elm_color$Color$RgbaSpace, 0 / 255, 0 / 255, 0 / 255, 1.0);
var $author$project$Main$defaultHeight = 600;
var $author$project$Main$defaultWidth = 600;
var $elm_community$typed_svg$TypedSvg$Core$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString = function (length) {
	switch (length.$) {
		case 0:
			var x = length.a;
			return $elm$core$String$fromFloat(x) + 'cm';
		case 1:
			var x = length.a;
			return $elm$core$String$fromFloat(x) + 'em';
		case 2:
			var x = length.a;
			return $elm$core$String$fromFloat(x) + 'ex';
		case 3:
			var x = length.a;
			return $elm$core$String$fromFloat(x) + 'in';
		case 4:
			var x = length.a;
			return $elm$core$String$fromFloat(x) + 'mm';
		case 5:
			var x = length.a;
			return $elm$core$String$fromFloat(x);
		case 6:
			var x = length.a;
			return $elm$core$String$fromFloat(x) + 'pc';
		case 7:
			var x = length.a;
			return $elm$core$String$fromFloat(x) + '%';
		case 8:
			var x = length.a;
			return $elm$core$String$fromFloat(x) + 'pt';
		default:
			var x = length.a;
			return $elm$core$String$fromFloat(x) + 'px';
	}
};
var $elm_community$typed_svg$TypedSvg$Attributes$height = function (length) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'height',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
};
var $elm_community$typed_svg$TypedSvg$Types$FillNone = {$: 1};
var $avh4$elm_color$Color$toCssString = function (_v0) {
	var r = _v0.a;
	var g = _v0.b;
	var b = _v0.c;
	var a = _v0.d;
	var roundTo = function (x) {
		return $elm$core$Basics$round(x * 1000) / 1000;
	};
	var pct = function (x) {
		return $elm$core$Basics$round(x * 10000) / 100;
	};
	return $elm$core$String$concat(
		_List_fromArray(
			[
				'rgba(',
				$elm$core$String$fromFloat(
				pct(r)),
				'%,',
				$elm$core$String$fromFloat(
				pct(g)),
				'%,',
				$elm$core$String$fromFloat(
				pct(b)),
				'%,',
				$elm$core$String$fromFloat(
				roundTo(a)),
				')'
			]));
};
var $elm_community$typed_svg$TypedSvg$TypesToStrings$fillToString = function (fill) {
	if (!fill.$) {
		var color = fill.a;
		return $avh4$elm_color$Color$toCssString(color);
	} else {
		return 'none';
	}
};
var $elm_community$typed_svg$TypedSvg$Attributes$fill = A2(
	$elm$core$Basics$composeL,
	$elm_community$typed_svg$TypedSvg$Core$attribute('fill'),
	$elm_community$typed_svg$TypedSvg$TypesToStrings$fillToString);
var $elm_community$typed_svg$TypedSvg$Attributes$noFill = $elm_community$typed_svg$TypedSvg$Attributes$fill($elm_community$typed_svg$TypedSvg$Types$FillNone);
var $elm_community$typed_svg$TypedSvg$Types$Px = function (a) {
	return {$: 9, a: a};
};
var $elm_community$typed_svg$TypedSvg$Types$px = $elm_community$typed_svg$TypedSvg$Types$Px;
var $elm$virtual_dom$VirtualDom$nodeNS = function (tag) {
	return _VirtualDom_nodeNS(
		_VirtualDom_noScript(tag));
};
var $elm_community$typed_svg$TypedSvg$Core$node = $elm$virtual_dom$VirtualDom$nodeNS('http://www.w3.org/2000/svg');
var $elm_community$typed_svg$TypedSvg$rect = $elm_community$typed_svg$TypedSvg$Core$node('rect');
var $elm_community$typed_svg$TypedSvg$Attributes$stroke = function (col) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'stroke',
		$avh4$elm_color$Color$toCssString(col));
};
var $elm_community$typed_svg$TypedSvg$Attributes$strokeWidth = function (length) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'stroke-width',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
};
var $elm_community$typed_svg$TypedSvg$Attributes$width = function (length) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'width',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
};
var $author$project$Main$border = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Main$defaultWidth)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Main$defaultHeight)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var $elm$html$Html$map = $elm$virtual_dom$VirtualDom$map;
var $elm_community$typed_svg$TypedSvg$svg = $elm_community$typed_svg$TypedSvg$Core$node('svg');
var $elm_community$typed_svg$TypedSvg$Types$Fill = function (a) {
	return {$: 0, a: a};
};
var $elm_community$typed_svg$TypedSvg$Types$Rotate = F3(
	function (a, b, c) {
		return {$: 1, a: a, b: b, c: c};
	});
var $elm_community$typed_svg$TypedSvg$Types$Translate = F2(
	function (a, b) {
		return {$: 5, a: a, b: b};
	});
var $elm$core$Basics$degrees = function (angleInDegrees) {
	return (angleInDegrees * $elm$core$Basics$pi) / 180;
};
var $elm_community$basics_extra$Basics$Extra$inDegrees = function (angle) {
	return angle / $elm$core$Basics$degrees(1);
};
var $elm_community$typed_svg$TypedSvg$TypesToStrings$transformToString = function (xform) {
	var tr = F2(
		function (name, args) {
			return $elm$core$String$concat(
				_List_fromArray(
					[
						name,
						'(',
						A2(
						$elm$core$String$join,
						' ',
						A2($elm$core$List$map, $elm$core$String$fromFloat, args)),
						')'
					]));
		});
	switch (xform.$) {
		case 0:
			var a = xform.a;
			var b = xform.b;
			var c = xform.c;
			var d = xform.d;
			var e = xform.e;
			var f = xform.f;
			return A2(
				tr,
				'matrix',
				_List_fromArray(
					[a, b, c, d, e, f]));
		case 1:
			var a = xform.a;
			var x = xform.b;
			var y = xform.c;
			return A2(
				tr,
				'rotate',
				_List_fromArray(
					[a, x, y]));
		case 2:
			var x = xform.a;
			var y = xform.b;
			return A2(
				tr,
				'scale',
				_List_fromArray(
					[x, y]));
		case 3:
			var x = xform.a;
			return A2(
				tr,
				'skewX',
				_List_fromArray(
					[x]));
		case 4:
			var y = xform.a;
			return A2(
				tr,
				'skewY',
				_List_fromArray(
					[y]));
		default:
			var x = xform.a;
			var y = xform.b;
			return A2(
				tr,
				'translate',
				_List_fromArray(
					[x, y]));
	}
};
var $elm_community$typed_svg$TypedSvg$Attributes$transform = function (transforms) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'transform',
		A2(
			$elm$core$String$join,
			' ',
			A2($elm$core$List$map, $elm_community$typed_svg$TypedSvg$TypesToStrings$transformToString, transforms)));
};
var $elm_community$typed_svg$TypedSvg$Attributes$x = function (length) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'x',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
};
var $elm_community$typed_svg$TypedSvg$Attributes$y = function (length) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'y',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
};
var $author$project$AngularMovement$AccelerateTowardsMouse$viewBar = F4(
	function (w, h, position, angle) {
		var _v0 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(position);
		var x = _v0.bz;
		var y = _v0.bB;
		return A2(
			$elm_community$typed_svg$TypedSvg$rect,
			_List_fromArray(
				[
					$elm_community$typed_svg$TypedSvg$Attributes$x(
					$elm_community$typed_svg$TypedSvg$Types$px(0)),
					$elm_community$typed_svg$TypedSvg$Attributes$y(
					$elm_community$typed_svg$TypedSvg$Types$px(0)),
					$elm_community$typed_svg$TypedSvg$Attributes$width(
					$elm_community$typed_svg$TypedSvg$Types$px(w)),
					$elm_community$typed_svg$TypedSvg$Attributes$height(
					$elm_community$typed_svg$TypedSvg$Types$px(h)),
					$elm_community$typed_svg$TypedSvg$Attributes$fill(
					$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$black)),
					$elm_community$typed_svg$TypedSvg$Attributes$transform(
					_List_fromArray(
						[
							A2($elm_community$typed_svg$TypedSvg$Types$Translate, x - (w / 2), y - (h / 2)),
							A3(
							$elm_community$typed_svg$TypedSvg$Types$Rotate,
							$elm_community$basics_extra$Basics$Extra$inDegrees(angle),
							0,
							0)
						]))
				]),
			_List_Nil);
	});
var $author$project$AngularMovement$AccelerateTowardsMouse$viewBorder = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$AngularMovement$AccelerateTowardsMouse$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$AngularMovement$AccelerateTowardsMouse$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $elm_community$typed_svg$TypedSvg$Attributes$viewBox = F4(
	function (minX, minY, vWidth, vHeight) {
		return A2(
			$elm_community$typed_svg$TypedSvg$Core$attribute,
			'viewBox',
			A2(
				$elm$core$String$join,
				' ',
				A2(
					$elm$core$List$map,
					$elm$core$String$fromFloat,
					_List_fromArray(
						[minX, minY, vWidth, vHeight]))));
	});
var $author$project$AngularMovement$AccelerateTowardsMouse$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$AngularMovement$AccelerateTowardsMouse$width)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$AngularMovement$AccelerateTowardsMouse$height)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$AngularMovement$AccelerateTowardsMouse$width, $author$project$AngularMovement$AccelerateTowardsMouse$height)
			]),
		_List_fromArray(
			[
				$author$project$AngularMovement$AccelerateTowardsMouse$viewBorder,
				A4($author$project$AngularMovement$AccelerateTowardsMouse$viewBar, model.a5, model.a4, model.ax, model.a3)
			]));
};
var $author$project$AngularMovement$AcceleratingBaton$height = 600;
var $author$project$AngularMovement$AcceleratingBaton$width = 600;
var $author$project$AngularMovement$AcceleratingBaton$border = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$AngularMovement$AcceleratingBaton$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$AngularMovement$AcceleratingBaton$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $elm_community$typed_svg$TypedSvg$circle = $elm_community$typed_svg$TypedSvg$Core$node('circle');
var $elm_community$typed_svg$TypedSvg$Attributes$cx = function (length) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'cx',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
};
var $elm_community$typed_svg$TypedSvg$Attributes$cy = function (length) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'cy',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
};
var $elm_community$typed_svg$TypedSvg$g = $elm_community$typed_svg$TypedSvg$Core$node('g');
var $elm_community$typed_svg$TypedSvg$Attributes$r = function (length) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'r',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
};
var $author$project$AngularMovement$AcceleratingBaton$viewBaton = function (angle) {
	var centerY = $author$project$AngularMovement$AcceleratingBaton$height / 2;
	var centerX = $author$project$AngularMovement$AcceleratingBaton$width / 2;
	var batonThickness = 5;
	var batonRadius = 50;
	var batonLength = batonRadius * 2;
	var bar = A2(
		$elm_community$typed_svg$TypedSvg$rect,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$x(
				$elm_community$typed_svg$TypedSvg$Types$px(-batonRadius)),
				$elm_community$typed_svg$TypedSvg$Attributes$y(
				$elm_community$typed_svg$TypedSvg$Types$px((-batonThickness) / 2)),
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px(batonLength)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px(batonThickness))
			]),
		_List_Nil);
	var ballRadius = 10;
	var leftBall = A2(
		$elm_community$typed_svg$TypedSvg$circle,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$cx(
				$elm_community$typed_svg$TypedSvg$Types$px(-batonRadius)),
				$elm_community$typed_svg$TypedSvg$Attributes$cy(
				$elm_community$typed_svg$TypedSvg$Types$px(0)),
				$elm_community$typed_svg$TypedSvg$Attributes$r(
				$elm_community$typed_svg$TypedSvg$Types$px(ballRadius)),
				$elm_community$typed_svg$TypedSvg$Attributes$fill(
				$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$black))
			]),
		_List_Nil);
	var rightBall = A2(
		$elm_community$typed_svg$TypedSvg$circle,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$cx(
				$elm_community$typed_svg$TypedSvg$Types$px(batonRadius)),
				$elm_community$typed_svg$TypedSvg$Attributes$cy(
				$elm_community$typed_svg$TypedSvg$Types$px(0)),
				$elm_community$typed_svg$TypedSvg$Attributes$r(
				$elm_community$typed_svg$TypedSvg$Types$px(ballRadius)),
				$elm_community$typed_svg$TypedSvg$Attributes$fill(
				$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$black))
			]),
		_List_Nil);
	return A2(
		$elm_community$typed_svg$TypedSvg$g,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$transform(
				_List_fromArray(
					[
						A2($elm_community$typed_svg$TypedSvg$Types$Translate, centerX, centerY),
						A3($elm_community$typed_svg$TypedSvg$Types$Rotate, angle, 0, 0)
					]))
			]),
		_List_fromArray(
			[bar, leftBall, rightBall]));
};
var $author$project$AngularMovement$AcceleratingBaton$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$AngularMovement$AcceleratingBaton$width)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$AngularMovement$AcceleratingBaton$height)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$AngularMovement$AcceleratingBaton$width, $author$project$AngularMovement$AcceleratingBaton$height)
			]),
		_List_fromArray(
			[
				$author$project$AngularMovement$AcceleratingBaton$border,
				$author$project$AngularMovement$AcceleratingBaton$viewBaton(model.a3)
			]));
};
var $author$project$AngularMovement$FallingBoulder$Push = {$: 1};
var $author$project$AngularMovement$FallingBoulder$Release = {$: 2};
var $author$project$AngularMovement$FallingBoulder$height = 600;
var $author$project$AngularMovement$FallingBoulder$border = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$AngularMovement$FallingBoulder$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$AngularMovement$FallingBoulder$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 0, a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onMouseDown = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mousedown',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$Events$onMouseUp = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mouseup',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm_community$typed_svg$TypedSvg$defs = $elm_community$typed_svg$TypedSvg$Core$node('defs');
var $elm_community$typed_svg$TypedSvg$Attributes$fx = function (length) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'fx',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
};
var $elm_community$typed_svg$TypedSvg$Attributes$fy = function (length) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'fy',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
};
var $elm_community$typed_svg$TypedSvg$Attributes$id = $elm_community$typed_svg$TypedSvg$Core$attribute('id');
var $elm_community$typed_svg$TypedSvg$Attributes$offset = $elm_community$typed_svg$TypedSvg$Core$attribute('offset');
var $elm_community$typed_svg$TypedSvg$Types$Percent = function (a) {
	return {$: 7, a: a};
};
var $elm_community$typed_svg$TypedSvg$Types$percent = $elm_community$typed_svg$TypedSvg$Types$Percent;
var $elm_community$typed_svg$TypedSvg$radialGradient = $elm_community$typed_svg$TypedSvg$Core$node('radialGradient');
var $elm_community$typed_svg$TypedSvg$stop = $elm_community$typed_svg$TypedSvg$Core$node('stop');
var $elm_community$typed_svg$TypedSvg$Attributes$style = function (value) {
	return A2($elm_community$typed_svg$TypedSvg$Core$attribute, 'style', value);
};
var $author$project$AngularMovement$FallingBoulder$viewBall = F3(
	function (radius, position, theta) {
		var gradient = A2(
			$elm_community$typed_svg$TypedSvg$defs,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm_community$typed_svg$TypedSvg$radialGradient,
					_List_fromArray(
						[
							$elm_community$typed_svg$TypedSvg$Attributes$id('ballGradient'),
							$elm_community$typed_svg$TypedSvg$Attributes$cx(
							$elm_community$typed_svg$TypedSvg$Types$percent(20)),
							$elm_community$typed_svg$TypedSvg$Attributes$cy(
							$elm_community$typed_svg$TypedSvg$Types$percent(20)),
							$elm_community$typed_svg$TypedSvg$Attributes$r(
							$elm_community$typed_svg$TypedSvg$Types$percent(50)),
							$elm_community$typed_svg$TypedSvg$Attributes$fx(
							$elm_community$typed_svg$TypedSvg$Types$percent(20)),
							$elm_community$typed_svg$TypedSvg$Attributes$fy(
							$elm_community$typed_svg$TypedSvg$Types$percent(20))
						]),
					_List_fromArray(
						[
							A2(
							$elm_community$typed_svg$TypedSvg$stop,
							_List_fromArray(
								[
									$elm_community$typed_svg$TypedSvg$Attributes$offset('0%'),
									$elm_community$typed_svg$TypedSvg$Attributes$style('stop-color:#FF00FF;')
								]),
							_List_Nil),
							A2(
							$elm_community$typed_svg$TypedSvg$stop,
							_List_fromArray(
								[
									$elm_community$typed_svg$TypedSvg$Attributes$offset('100%'),
									$elm_community$typed_svg$TypedSvg$Attributes$style('stop-color:#FFBD2E;')
								]),
							_List_Nil)
						]))
				]));
		var _v0 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(position);
		var x = _v0.bz;
		var y = _v0.bB;
		var ballBody = A2(
			$elm_community$typed_svg$TypedSvg$circle,
			_List_fromArray(
				[
					$elm_community$typed_svg$TypedSvg$Attributes$cx(
					$elm_community$typed_svg$TypedSvg$Types$px(0)),
					$elm_community$typed_svg$TypedSvg$Attributes$cy(
					$elm_community$typed_svg$TypedSvg$Types$px(0)),
					$elm_community$typed_svg$TypedSvg$Attributes$r(
					$elm_community$typed_svg$TypedSvg$Types$px(radius)),
					A2($elm_community$typed_svg$TypedSvg$Core$attribute, 'fill', 'url(#ballGradient)'),
					$elm_community$typed_svg$TypedSvg$Attributes$transform(
					_List_fromArray(
						[
							A2($elm_community$typed_svg$TypedSvg$Types$Translate, x, y),
							A3($elm_community$typed_svg$TypedSvg$Types$Rotate, theta, 0, 0)
						]))
				]),
			_List_Nil);
		return A2(
			$elm_community$typed_svg$TypedSvg$g,
			_List_Nil,
			_List_fromArray(
				[gradient, ballBody]));
	});
var $avh4$elm_color$Color$darkGreen = A4($avh4$elm_color$Color$RgbaSpace, 78 / 255, 154 / 255, 6 / 255, 1.0);
var $elm_community$typed_svg$TypedSvg$Attributes$points = function (pts) {
	var pointToString = function (_v0) {
		var xx = _v0.a;
		var yy = _v0.b;
		return $elm$core$String$fromFloat(xx) + (', ' + $elm$core$String$fromFloat(yy));
	};
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'points',
		A2(
			$elm$core$String$join,
			' ',
			A2($elm$core$List$map, pointToString, pts)));
};
var $elm_community$typed_svg$TypedSvg$polygon = $elm_community$typed_svg$TypedSvg$Core$node('polygon');
var $author$project$AngularMovement$FallingBoulder$viewHill = function (ballRadius) {
	var dy = ballRadius * $elm$core$Basics$sqrt(2);
	return A2(
		$elm_community$typed_svg$TypedSvg$polygon,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$points(
				_List_fromArray(
					[
						_Utils_Tuple2(0, dy),
						_Utils_Tuple2($author$project$AngularMovement$FallingBoulder$width, $author$project$AngularMovement$FallingBoulder$height + dy),
						_Utils_Tuple2(0, $author$project$AngularMovement$FallingBoulder$height)
					])),
				$elm_community$typed_svg$TypedSvg$Attributes$fill(
				$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$darkGreen))
			]),
		_List_Nil);
};
var $elm_community$typed_svg$TypedSvg$image = $elm_community$typed_svg$TypedSvg$Core$node('image');
var $author$project$AngularMovement$FallingBoulder$viewPusher = F2(
	function (ballRadius, position) {
		var _v0 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(position);
		var x = _v0.bz;
		var y = _v0.bB;
		return A2(
			$elm_community$typed_svg$TypedSvg$image,
			_List_fromArray(
				[
					$elm_community$typed_svg$TypedSvg$Attributes$transform(
					_List_fromArray(
						[
							A2($elm_community$typed_svg$TypedSvg$Types$Translate, x, y)
						])),
					A2($elm_community$typed_svg$TypedSvg$Core$attribute, 'href', '/media/hopper-jumping.png'),
					$elm_community$typed_svg$TypedSvg$Attributes$x(
					$elm_community$typed_svg$TypedSvg$Types$px((ballRadius * 2) * 0.15)),
					$elm_community$typed_svg$TypedSvg$Attributes$y(
					$elm_community$typed_svg$TypedSvg$Types$px((ballRadius * 2) * 0.35)),
					$elm_community$typed_svg$TypedSvg$Attributes$width(
					$elm_community$typed_svg$TypedSvg$Types$px(45)),
					$elm_community$typed_svg$TypedSvg$Attributes$height(
					$elm_community$typed_svg$TypedSvg$Types$px(55))
				]),
			_List_Nil);
	});
var $author$project$AngularMovement$FallingBoulder$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$AngularMovement$FallingBoulder$width)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$AngularMovement$FallingBoulder$height)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$AngularMovement$FallingBoulder$width, $author$project$AngularMovement$FallingBoulder$height),
				$elm$html$Html$Events$onMouseDown($author$project$AngularMovement$FallingBoulder$Push),
				$elm$html$Html$Events$onMouseUp($author$project$AngularMovement$FallingBoulder$Release)
			]),
		_List_fromArray(
			[
				$author$project$AngularMovement$FallingBoulder$border,
				$author$project$AngularMovement$FallingBoulder$viewHill(model.ak),
				A3($author$project$AngularMovement$FallingBoulder$viewBall, model.ak, model.ax, model.aE),
				A2($author$project$AngularMovement$FallingBoulder$viewPusher, model.ak, model.ax)
			]));
};
var $author$project$AngularMovement$ManyOrbitsWithDynamicRotation$border = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$AngularMovement$ManyOrbitsWithDynamicRotation$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$AngularMovement$ManyOrbitsWithDynamicRotation$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $author$project$AngularMovement$ManyOrbitsWithDynamicRotation$AttractorHovered = {$: 3};
var $author$project$AngularMovement$ManyOrbitsWithDynamicRotation$AttractorMouseOut = {$: 5};
var $zaboco$elm_draggable$Draggable$alwaysPreventDefaultAndStopPropagation = function (msg) {
	return {S: msg, b6: true, cd: true};
};
var $zaboco$elm_draggable$Internal$StartDragging = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$fail = _Json_fail;
var $zaboco$elm_draggable$Draggable$whenLeftMouseButtonPressed = function (decoder) {
	return A2(
		$elm$json$Json$Decode$andThen,
		function (button) {
			if (!button) {
				return decoder;
			} else {
				return $elm$json$Json$Decode$fail('Event is only relevant when the main mouse button was pressed.');
			}
		},
		A2($elm$json$Json$Decode$field, 'button', $elm$json$Json$Decode$int));
};
var $zaboco$elm_draggable$Draggable$baseDecoder = function (key) {
	return $zaboco$elm_draggable$Draggable$whenLeftMouseButtonPressed(
		A2(
			$elm$json$Json$Decode$map,
			A2(
				$elm$core$Basics$composeL,
				$elm$core$Basics$identity,
				$zaboco$elm_draggable$Internal$StartDragging(key)),
			$zaboco$elm_draggable$Draggable$positionDecoder));
};
var $elm$virtual_dom$VirtualDom$Custom = function (a) {
	return {$: 3, a: a};
};
var $elm$html$Html$Events$custom = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Custom(decoder));
	});
var $zaboco$elm_draggable$Draggable$mouseTrigger = F2(
	function (key, envelope) {
		return A2(
			$elm$html$Html$Events$custom,
			'mousedown',
			A2(
				$elm$json$Json$Decode$map,
				A2($elm$core$Basics$composeL, $zaboco$elm_draggable$Draggable$alwaysPreventDefaultAndStopPropagation, envelope),
				$zaboco$elm_draggable$Draggable$baseDecoder(key)));
	});
var $elm_community$typed_svg$TypedSvg$Events$on = $elm$virtual_dom$VirtualDom$on;
var $elm_community$typed_svg$TypedSvg$Events$simpleOn = function (name) {
	return function (msg) {
		return A2(
			$elm_community$typed_svg$TypedSvg$Events$on,
			name,
			$elm$virtual_dom$VirtualDom$Normal(
				$elm$json$Json$Decode$succeed(msg)));
	};
};
var $elm_community$typed_svg$TypedSvg$Events$onMouseOut = $elm_community$typed_svg$TypedSvg$Events$simpleOn('mouseout');
var $elm_community$typed_svg$TypedSvg$Events$onMouseOver = $elm_community$typed_svg$TypedSvg$Events$simpleOn('mouseover');
var $author$project$AngularMovement$ManyOrbitsWithDynamicRotation$radiusFromMass = function (mass) {
	return mass * 20;
};
var $mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$defaultOptions = {b6: true, cd: false};
var $mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$Event = F4(
	function (keys, changedTouches, targetTouches, touches) {
		return {dU: changedTouches, o: keys, fm: targetTouches, fG: touches};
	});
var $mpizenberg$elm_pointer_events$Internal$Decode$Keys = F3(
	function (alt, ctrl, shift) {
		return {dB: alt, d2: ctrl, ca: shift};
	});
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $elm$json$Json$Decode$map3 = _Json_map3;
var $mpizenberg$elm_pointer_events$Internal$Decode$keys = A4(
	$elm$json$Json$Decode$map3,
	$mpizenberg$elm_pointer_events$Internal$Decode$Keys,
	A2($elm$json$Json$Decode$field, 'altKey', $elm$json$Json$Decode$bool),
	A2($elm$json$Json$Decode$field, 'ctrlKey', $elm$json$Json$Decode$bool),
	A2($elm$json$Json$Decode$field, 'shiftKey', $elm$json$Json$Decode$bool));
var $elm$json$Json$Decode$map4 = _Json_map4;
var $mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$Touch = F4(
	function (identifier, clientPos, pagePos, screenPos) {
		return {dX: clientPos, ep: identifier, eY: pagePos, e5: screenPos};
	});
var $mpizenberg$elm_pointer_events$Internal$Decode$clientPos = A3(
	$elm$json$Json$Decode$map2,
	F2(
		function (a, b) {
			return _Utils_Tuple2(a, b);
		}),
	A2($elm$json$Json$Decode$field, 'clientX', $elm$json$Json$Decode$float),
	A2($elm$json$Json$Decode$field, 'clientY', $elm$json$Json$Decode$float));
var $mpizenberg$elm_pointer_events$Internal$Decode$pagePos = A3(
	$elm$json$Json$Decode$map2,
	F2(
		function (a, b) {
			return _Utils_Tuple2(a, b);
		}),
	A2($elm$json$Json$Decode$field, 'pageX', $elm$json$Json$Decode$float),
	A2($elm$json$Json$Decode$field, 'pageY', $elm$json$Json$Decode$float));
var $mpizenberg$elm_pointer_events$Internal$Decode$screenPos = A3(
	$elm$json$Json$Decode$map2,
	F2(
		function (a, b) {
			return _Utils_Tuple2(a, b);
		}),
	A2($elm$json$Json$Decode$field, 'screenX', $elm$json$Json$Decode$float),
	A2($elm$json$Json$Decode$field, 'screenY', $elm$json$Json$Decode$float));
var $mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$touchDecoder = A5(
	$elm$json$Json$Decode$map4,
	$mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$Touch,
	A2($elm$json$Json$Decode$field, 'identifier', $elm$json$Json$Decode$int),
	$mpizenberg$elm_pointer_events$Internal$Decode$clientPos,
	$mpizenberg$elm_pointer_events$Internal$Decode$pagePos,
	$mpizenberg$elm_pointer_events$Internal$Decode$screenPos);
var $mpizenberg$elm_pointer_events$Internal$Decode$all = A2(
	$elm$core$List$foldr,
	$elm$json$Json$Decode$map2($elm$core$List$cons),
	$elm$json$Json$Decode$succeed(_List_Nil));
var $mpizenberg$elm_pointer_events$Internal$Decode$dynamicListOf = function (itemDecoder) {
	var decodeOne = function (n) {
		return A2(
			$elm$json$Json$Decode$field,
			$elm$core$String$fromInt(n),
			itemDecoder);
	};
	var decodeN = function (n) {
		return $mpizenberg$elm_pointer_events$Internal$Decode$all(
			A2(
				$elm$core$List$map,
				decodeOne,
				A2($elm$core$List$range, 0, n - 1)));
	};
	return A2(
		$elm$json$Json$Decode$andThen,
		decodeN,
		A2($elm$json$Json$Decode$field, 'length', $elm$json$Json$Decode$int));
};
var $mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$touchListDecoder = $mpizenberg$elm_pointer_events$Internal$Decode$dynamicListOf;
var $mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$eventDecoder = A5(
	$elm$json$Json$Decode$map4,
	$mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$Event,
	$mpizenberg$elm_pointer_events$Internal$Decode$keys,
	A2(
		$elm$json$Json$Decode$field,
		'changedTouches',
		$mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$touchListDecoder($mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$touchDecoder)),
	A2(
		$elm$json$Json$Decode$field,
		'targetTouches',
		$mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$touchListDecoder($mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$touchDecoder)),
	A2(
		$elm$json$Json$Decode$field,
		'touches',
		$mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$touchListDecoder($mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$touchDecoder)));
var $mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$onWithOptions = F3(
	function (event, options, tag) {
		return A2(
			$elm$html$Html$Events$custom,
			event,
			A2(
				$elm$json$Json$Decode$map,
				function (ev) {
					return {
						S: tag(ev),
						b6: options.b6,
						cd: options.cd
					};
				},
				$mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$eventDecoder));
	});
var $mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$onEnd = A2($mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$onWithOptions, 'touchend', $mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$defaultOptions);
var $mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$onMove = A2($mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$onWithOptions, 'touchmove', $mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$defaultOptions);
var $mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$onStart = A2($mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$onWithOptions, 'touchstart', $mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$defaultOptions);
var $zaboco$elm_draggable$Draggable$touchTriggers = F2(
	function (key, envelope) {
		var touchToMouse = function (touchEvent) {
			return function (_v1) {
				var clientX = _v1.a;
				var clientY = _v1.b;
				return A2(
					$zaboco$elm_draggable$Internal$Position,
					$elm$core$Basics$round(clientX),
					$elm$core$Basics$round(clientY));
			}(
				A2(
					$elm$core$Maybe$withDefault,
					_Utils_Tuple2(0, 0),
					A2(
						$elm$core$Maybe$map,
						function ($) {
							return $.dX;
						},
						$elm$core$List$head(touchEvent.dU))));
		};
		var mouseToEnv = function (internal) {
			return A2(
				$elm$core$Basics$composeR,
				touchToMouse,
				A2(
					$elm$core$Basics$composeR,
					internal,
					A2($elm$core$Basics$composeR, $elm$core$Basics$identity, envelope)));
		};
		return _List_fromArray(
			[
				$mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$onStart(
				mouseToEnv(
					$zaboco$elm_draggable$Internal$StartDragging(key))),
				$mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$onMove(
				mouseToEnv($zaboco$elm_draggable$Internal$DragAt)),
				$mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$onEnd(
				mouseToEnv(
					function (_v0) {
						return $zaboco$elm_draggable$Internal$StopDragging;
					}))
			]);
	});
var $author$project$AngularMovement$ManyOrbitsWithDynamicRotation$viewPoint = F4(
	function (attributes, radius, position, angle) {
		var _v0 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(position);
		var x = _v0.bz;
		var y = _v0.bB;
		return A2(
			$elm_community$typed_svg$TypedSvg$circle,
			_Utils_ap(
				_List_fromArray(
					[
						$elm_community$typed_svg$TypedSvg$Attributes$cx(
						$elm_community$typed_svg$TypedSvg$Types$px(x)),
						$elm_community$typed_svg$TypedSvg$Attributes$cy(
						$elm_community$typed_svg$TypedSvg$Types$px(y)),
						$elm_community$typed_svg$TypedSvg$Attributes$r(
						$elm_community$typed_svg$TypedSvg$Types$px(radius))
					]),
				attributes),
			_List_Nil);
	});
var $author$project$AngularMovement$ManyOrbitsWithDynamicRotation$viewAttractor = function (_v0) {
	var mass = _v0.b0;
	var position = _v0.ax;
	var fill = _v0.bf;
	return A4(
		$author$project$AngularMovement$ManyOrbitsWithDynamicRotation$viewPoint,
		_Utils_ap(
			_List_fromArray(
				[
					A2($zaboco$elm_draggable$Draggable$mouseTrigger, 0, $author$project$AngularMovement$ManyOrbitsWithDynamicRotation$DragMsg),
					$elm_community$typed_svg$TypedSvg$Events$onMouseOver($author$project$AngularMovement$ManyOrbitsWithDynamicRotation$AttractorHovered),
					$elm_community$typed_svg$TypedSvg$Events$onMouseOut($author$project$AngularMovement$ManyOrbitsWithDynamicRotation$AttractorMouseOut),
					$elm_community$typed_svg$TypedSvg$Attributes$fill(
					$elm_community$typed_svg$TypedSvg$Types$Fill(fill))
				]),
			A2($zaboco$elm_draggable$Draggable$touchTriggers, 0, $author$project$AngularMovement$ManyOrbitsWithDynamicRotation$DragMsg)),
		$author$project$AngularMovement$ManyOrbitsWithDynamicRotation$radiusFromMass(mass),
		position,
		0);
};
var $avh4$elm_color$Color$grey = A4($avh4$elm_color$Color$RgbaSpace, 211 / 255, 215 / 255, 207 / 255, 1.0);
var $author$project$AngularMovement$ManyOrbitsWithDynamicRotation$viewMover = function (_v0) {
	var mass = _v0.b0;
	var position = _v0.ax;
	var angle = _v0.a3;
	var w = $author$project$AngularMovement$ManyOrbitsWithDynamicRotation$radiusFromMass(mass) * 2;
	var _v1 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(position);
	var x = _v1.bz;
	var y = _v1.bB;
	return A2(
		$elm_community$typed_svg$TypedSvg$rect,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$x(
				$elm_community$typed_svg$TypedSvg$Types$px(x - (w / 2))),
				$elm_community$typed_svg$TypedSvg$Attributes$y(
				$elm_community$typed_svg$TypedSvg$Types$px(y - (w / 2))),
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px(w)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px(w)),
				$elm_community$typed_svg$TypedSvg$Attributes$fill(
				$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$grey)),
				$elm_community$typed_svg$TypedSvg$Attributes$transform(
				_List_fromArray(
					[
						A3($elm_community$typed_svg$TypedSvg$Types$Rotate, angle, x, y)
					]))
			]),
		_List_Nil);
};
var $author$project$AngularMovement$ManyOrbitsWithDynamicRotation$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$AngularMovement$ManyOrbitsWithDynamicRotation$width)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$AngularMovement$ManyOrbitsWithDynamicRotation$height)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$AngularMovement$ManyOrbitsWithDynamicRotation$width, $author$project$AngularMovement$ManyOrbitsWithDynamicRotation$height)
			]),
		_Utils_ap(
			_List_fromArray(
				[
					$author$project$AngularMovement$ManyOrbitsWithDynamicRotation$border,
					$author$project$AngularMovement$ManyOrbitsWithDynamicRotation$viewAttractor(model.F)
				]),
			A2($elm$core$List$map, $author$project$AngularMovement$ManyOrbitsWithDynamicRotation$viewMover, model.at)));
};
var $author$project$AngularMovement$ManyOrbitsWithRotation$border = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$AngularMovement$ManyOrbitsWithRotation$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$AngularMovement$ManyOrbitsWithRotation$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $author$project$AngularMovement$ManyOrbitsWithRotation$AttractorHovered = {$: 3};
var $author$project$AngularMovement$ManyOrbitsWithRotation$AttractorMouseOut = {$: 5};
var $author$project$AngularMovement$ManyOrbitsWithRotation$radiusFromMass = function (mass) {
	return mass * 20;
};
var $author$project$AngularMovement$ManyOrbitsWithRotation$viewPoint = F4(
	function (attributes, radius, position, angle) {
		var _v0 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(position);
		var x = _v0.bz;
		var y = _v0.bB;
		return A2(
			$elm_community$typed_svg$TypedSvg$circle,
			_Utils_ap(
				_List_fromArray(
					[
						$elm_community$typed_svg$TypedSvg$Attributes$cx(
						$elm_community$typed_svg$TypedSvg$Types$px(x)),
						$elm_community$typed_svg$TypedSvg$Attributes$cy(
						$elm_community$typed_svg$TypedSvg$Types$px(y)),
						$elm_community$typed_svg$TypedSvg$Attributes$r(
						$elm_community$typed_svg$TypedSvg$Types$px(radius))
					]),
				attributes),
			_List_Nil);
	});
var $author$project$AngularMovement$ManyOrbitsWithRotation$viewAttractor = function (_v0) {
	var mass = _v0.b0;
	var position = _v0.ax;
	var fill = _v0.bf;
	return A4(
		$author$project$AngularMovement$ManyOrbitsWithRotation$viewPoint,
		_Utils_ap(
			_List_fromArray(
				[
					A2($zaboco$elm_draggable$Draggable$mouseTrigger, 0, $author$project$AngularMovement$ManyOrbitsWithRotation$DragMsg),
					$elm_community$typed_svg$TypedSvg$Events$onMouseOver($author$project$AngularMovement$ManyOrbitsWithRotation$AttractorHovered),
					$elm_community$typed_svg$TypedSvg$Events$onMouseOut($author$project$AngularMovement$ManyOrbitsWithRotation$AttractorMouseOut),
					$elm_community$typed_svg$TypedSvg$Attributes$fill(
					$elm_community$typed_svg$TypedSvg$Types$Fill(fill))
				]),
			A2($zaboco$elm_draggable$Draggable$touchTriggers, 0, $author$project$AngularMovement$ManyOrbitsWithRotation$DragMsg)),
		$author$project$AngularMovement$ManyOrbitsWithRotation$radiusFromMass(mass),
		position,
		0);
};
var $author$project$AngularMovement$ManyOrbitsWithRotation$viewMover = function (_v0) {
	var mass = _v0.b0;
	var position = _v0.ax;
	var angle = _v0.a3;
	var w = $author$project$AngularMovement$ManyOrbitsWithRotation$radiusFromMass(mass) * 2;
	var _v1 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(position);
	var x = _v1.bz;
	var y = _v1.bB;
	return A2(
		$elm_community$typed_svg$TypedSvg$rect,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$x(
				$elm_community$typed_svg$TypedSvg$Types$px(x - (w / 2))),
				$elm_community$typed_svg$TypedSvg$Attributes$y(
				$elm_community$typed_svg$TypedSvg$Types$px(y - (w / 2))),
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px(w)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px(w)),
				$elm_community$typed_svg$TypedSvg$Attributes$fill(
				$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$grey)),
				$elm_community$typed_svg$TypedSvg$Attributes$transform(
				_List_fromArray(
					[
						A3($elm_community$typed_svg$TypedSvg$Types$Rotate, angle, x, y)
					]))
			]),
		_List_Nil);
};
var $author$project$AngularMovement$ManyOrbitsWithRotation$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$AngularMovement$ManyOrbitsWithRotation$width)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$AngularMovement$ManyOrbitsWithRotation$height)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$AngularMovement$ManyOrbitsWithRotation$width, $author$project$AngularMovement$ManyOrbitsWithRotation$height)
			]),
		_Utils_ap(
			_List_fromArray(
				[
					$author$project$AngularMovement$ManyOrbitsWithRotation$border,
					$author$project$AngularMovement$ManyOrbitsWithRotation$viewAttractor(model.F)
				]),
			A2($elm$core$List$map, $author$project$AngularMovement$ManyOrbitsWithRotation$viewMover, model.at)));
};
var $author$project$AngularMovement$PolarSwing$height = 600;
var $author$project$AngularMovement$PolarSwing$width = 600;
var $author$project$AngularMovement$PolarSwing$border = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$AngularMovement$PolarSwing$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$AngularMovement$PolarSwing$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $author$project$AngularMovement$PolarSwing$viewBall = F2(
	function (ballRadius, ballPosition) {
		var _v0 = ballPosition;
		var r = _v0.a;
		var theta = _v0.b;
		var x = r * $elm$core$Basics$cos(theta);
		var y = r * $elm$core$Basics$sin(theta);
		return A2(
			$elm_community$typed_svg$TypedSvg$circle,
			_List_fromArray(
				[
					$elm_community$typed_svg$TypedSvg$Attributes$transform(
					_List_fromArray(
						[
							A2($elm_community$typed_svg$TypedSvg$Types$Translate, $author$project$AngularMovement$PolarSwing$width / 2, $author$project$AngularMovement$PolarSwing$height / 2)
						])),
					$elm_community$typed_svg$TypedSvg$Attributes$cx(
					$elm_community$typed_svg$TypedSvg$Types$px(x)),
					$elm_community$typed_svg$TypedSvg$Attributes$cy(
					$elm_community$typed_svg$TypedSvg$Types$px(y)),
					$elm_community$typed_svg$TypedSvg$Attributes$r(
					$elm_community$typed_svg$TypedSvg$Types$px(ballRadius)),
					$elm_community$typed_svg$TypedSvg$Attributes$fill(
					$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$black))
				]),
			_List_Nil);
	});
var $elm_community$typed_svg$TypedSvg$line = $elm_community$typed_svg$TypedSvg$Core$node('line');
var $elm_community$typed_svg$TypedSvg$Attributes$x1 = function (position) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'x1',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(position));
};
var $elm_community$typed_svg$TypedSvg$Attributes$x2 = function (position) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'x2',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(position));
};
var $elm_community$typed_svg$TypedSvg$Attributes$y1 = function (position) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'y1',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(position));
};
var $elm_community$typed_svg$TypedSvg$Attributes$y2 = function (position) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'y2',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(position));
};
var $author$project$AngularMovement$PolarSwing$viewString = function (ballPosition) {
	var _v0 = ballPosition;
	var r = _v0.a;
	var theta = _v0.b;
	var x = r * $elm$core$Basics$cos(theta);
	var y = r * $elm$core$Basics$sin(theta);
	return A2(
		$elm_community$typed_svg$TypedSvg$line,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$transform(
				_List_fromArray(
					[
						A2($elm_community$typed_svg$TypedSvg$Types$Translate, $author$project$AngularMovement$PolarSwing$width / 2, $author$project$AngularMovement$PolarSwing$height / 2)
					])),
				$elm_community$typed_svg$TypedSvg$Attributes$x1(
				$elm_community$typed_svg$TypedSvg$Types$px(0)),
				$elm_community$typed_svg$TypedSvg$Attributes$y1(
				$elm_community$typed_svg$TypedSvg$Types$px(0)),
				$elm_community$typed_svg$TypedSvg$Attributes$x2(
				$elm_community$typed_svg$TypedSvg$Types$px(x)),
				$elm_community$typed_svg$TypedSvg$Attributes$y2(
				$elm_community$typed_svg$TypedSvg$Types$px(y)),
				$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
				$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
				$elm_community$typed_svg$TypedSvg$Types$px(2))
			]),
		_List_Nil);
};
var $author$project$AngularMovement$PolarSwing$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$AngularMovement$PolarSwing$width)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$AngularMovement$PolarSwing$height)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$AngularMovement$PolarSwing$width, $author$project$AngularMovement$PolarSwing$height)
			]),
		_List_fromArray(
			[
				$author$project$AngularMovement$PolarSwing$border,
				$author$project$AngularMovement$PolarSwing$viewString(model.ax),
				A2($author$project$AngularMovement$PolarSwing$viewBall, model.ak, model.ax)
			]));
};
var $author$project$AngularMovement$SpinningBaton$height = 600;
var $author$project$AngularMovement$SpinningBaton$width = 600;
var $author$project$AngularMovement$SpinningBaton$border = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$AngularMovement$SpinningBaton$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$AngularMovement$SpinningBaton$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $author$project$AngularMovement$SpinningBaton$viewBaton = function (angle) {
	var centerY = $author$project$AngularMovement$SpinningBaton$height / 2;
	var centerX = $author$project$AngularMovement$SpinningBaton$width / 2;
	var batonThickness = 5;
	var batonRadius = 50;
	var batonLength = batonRadius * 2;
	var bar = A2(
		$elm_community$typed_svg$TypedSvg$rect,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$x(
				$elm_community$typed_svg$TypedSvg$Types$px(-batonRadius)),
				$elm_community$typed_svg$TypedSvg$Attributes$y(
				$elm_community$typed_svg$TypedSvg$Types$px((-batonThickness) / 2)),
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px(batonLength)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px(batonThickness))
			]),
		_List_Nil);
	var ballRadius = 10;
	var leftBall = A2(
		$elm_community$typed_svg$TypedSvg$circle,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$cx(
				$elm_community$typed_svg$TypedSvg$Types$px(-batonRadius)),
				$elm_community$typed_svg$TypedSvg$Attributes$cy(
				$elm_community$typed_svg$TypedSvg$Types$px(0)),
				$elm_community$typed_svg$TypedSvg$Attributes$r(
				$elm_community$typed_svg$TypedSvg$Types$px(ballRadius)),
				$elm_community$typed_svg$TypedSvg$Attributes$fill(
				$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$black))
			]),
		_List_Nil);
	var rightBall = A2(
		$elm_community$typed_svg$TypedSvg$circle,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$cx(
				$elm_community$typed_svg$TypedSvg$Types$px(batonRadius)),
				$elm_community$typed_svg$TypedSvg$Attributes$cy(
				$elm_community$typed_svg$TypedSvg$Types$px(0)),
				$elm_community$typed_svg$TypedSvg$Attributes$r(
				$elm_community$typed_svg$TypedSvg$Types$px(ballRadius)),
				$elm_community$typed_svg$TypedSvg$Attributes$fill(
				$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$black))
			]),
		_List_Nil);
	return A2(
		$elm_community$typed_svg$TypedSvg$g,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$transform(
				_List_fromArray(
					[
						A2($elm_community$typed_svg$TypedSvg$Types$Translate, centerX, centerY),
						A3($elm_community$typed_svg$TypedSvg$Types$Rotate, angle, 0, 0)
					]))
			]),
		_List_fromArray(
			[bar, leftBall, rightBall]));
};
var $author$project$AngularMovement$SpinningBaton$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$AngularMovement$SpinningBaton$width)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$AngularMovement$SpinningBaton$height)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$AngularMovement$SpinningBaton$width, $author$project$AngularMovement$SpinningBaton$height)
			]),
		_List_fromArray(
			[
				$author$project$AngularMovement$SpinningBaton$border,
				$author$project$AngularMovement$SpinningBaton$viewBaton(model.a3)
			]));
};
var $author$project$AngularMovement$SpiralDrawer$height = 600;
var $author$project$AngularMovement$SpiralDrawer$width = 600;
var $author$project$AngularMovement$SpiralDrawer$border = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$AngularMovement$SpiralDrawer$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$AngularMovement$SpiralDrawer$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $author$project$AngularMovement$SpiralDrawer$shiftToCenter = $elm_community$typed_svg$TypedSvg$Attributes$transform(
	_List_fromArray(
		[
			A2($elm_community$typed_svg$TypedSvg$Types$Translate, $author$project$AngularMovement$SpiralDrawer$width / 2, $author$project$AngularMovement$SpiralDrawer$height / 2)
		]));
var $author$project$AngularMovement$SpiralDrawer$viewBall = F2(
	function (ballRadius, ballPosition) {
		var _v0 = ballPosition;
		var r = _v0.a;
		var theta = _v0.b;
		var x = r * $elm$core$Basics$cos(theta);
		var y = r * $elm$core$Basics$sin(theta);
		return A2(
			$elm_community$typed_svg$TypedSvg$circle,
			_List_fromArray(
				[
					$author$project$AngularMovement$SpiralDrawer$shiftToCenter,
					$elm_community$typed_svg$TypedSvg$Attributes$cx(
					$elm_community$typed_svg$TypedSvg$Types$px(x)),
					$elm_community$typed_svg$TypedSvg$Attributes$cy(
					$elm_community$typed_svg$TypedSvg$Types$px(y)),
					$elm_community$typed_svg$TypedSvg$Attributes$r(
					$elm_community$typed_svg$TypedSvg$Types$px(ballRadius)),
					$elm_community$typed_svg$TypedSvg$Attributes$fill(
					$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$black))
				]),
			_List_Nil);
	});
var $elm_community$typed_svg$TypedSvg$polyline = $elm_community$typed_svg$TypedSvg$Core$node('polyline');
var $author$project$AngularMovement$SpiralDrawer$viewPath = function (path) {
	var positions = A2(
		$elm$core$List$map,
		function (position) {
			var _v0 = position;
			var r = _v0.a;
			var theta = _v0.b;
			var x = r * $elm$core$Basics$cos(theta);
			var y = r * $elm$core$Basics$sin(theta);
			return _Utils_Tuple2(x, y);
		},
		path);
	return A2(
		$elm_community$typed_svg$TypedSvg$polyline,
		_List_fromArray(
			[
				$author$project$AngularMovement$SpiralDrawer$shiftToCenter,
				$elm_community$typed_svg$TypedSvg$Attributes$fill($elm_community$typed_svg$TypedSvg$Types$FillNone),
				$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
				$elm_community$typed_svg$TypedSvg$Attributes$points(positions)
			]),
		_List_Nil);
};
var $author$project$AngularMovement$SpiralDrawer$viewString = function (ballPosition) {
	var _v0 = ballPosition;
	var r = _v0.a;
	var theta = _v0.b;
	var x = r * $elm$core$Basics$cos(theta);
	var y = r * $elm$core$Basics$sin(theta);
	return A2(
		$elm_community$typed_svg$TypedSvg$line,
		_List_fromArray(
			[
				$author$project$AngularMovement$SpiralDrawer$shiftToCenter,
				$elm_community$typed_svg$TypedSvg$Attributes$x1(
				$elm_community$typed_svg$TypedSvg$Types$px(0)),
				$elm_community$typed_svg$TypedSvg$Attributes$y1(
				$elm_community$typed_svg$TypedSvg$Types$px(0)),
				$elm_community$typed_svg$TypedSvg$Attributes$x2(
				$elm_community$typed_svg$TypedSvg$Types$px(x)),
				$elm_community$typed_svg$TypedSvg$Attributes$y2(
				$elm_community$typed_svg$TypedSvg$Types$px(y)),
				$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
				$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
				$elm_community$typed_svg$TypedSvg$Types$px(2))
			]),
		_List_Nil);
};
var $author$project$AngularMovement$SpiralDrawer$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$AngularMovement$SpiralDrawer$width)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$AngularMovement$SpiralDrawer$height)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$AngularMovement$SpiralDrawer$width, $author$project$AngularMovement$SpiralDrawer$height)
			]),
		_List_fromArray(
			[
				$author$project$AngularMovement$SpiralDrawer$border,
				$author$project$AngularMovement$SpiralDrawer$viewPath(model.aQ),
				$author$project$AngularMovement$SpiralDrawer$viewString(model.ax),
				A2($author$project$AngularMovement$SpiralDrawer$viewBall, model.ak, model.ax)
			]));
};
var $author$project$Forces$ArtworkGenerator$border = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$ArtworkGenerator$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$ArtworkGenerator$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $author$project$Forces$ArtworkGenerator$radiusFromMass = function (mass) {
	return mass * 20;
};
var $author$project$Forces$ArtworkGenerator$viewPoint = F4(
	function (attributes, radius, position, color) {
		var _v0 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(position);
		var x = _v0.bz;
		var y = _v0.bB;
		return A2(
			$elm_community$typed_svg$TypedSvg$circle,
			_Utils_ap(
				_List_fromArray(
					[
						$elm_community$typed_svg$TypedSvg$Attributes$cx(
						$elm_community$typed_svg$TypedSvg$Types$px(x)),
						$elm_community$typed_svg$TypedSvg$Attributes$cy(
						$elm_community$typed_svg$TypedSvg$Types$px(y)),
						$elm_community$typed_svg$TypedSvg$Attributes$r(
						$elm_community$typed_svg$TypedSvg$Types$px(radius)),
						$elm_community$typed_svg$TypedSvg$Attributes$fill(
						$elm_community$typed_svg$TypedSvg$Types$Fill(color))
					]),
				attributes),
			_List_Nil);
	});
var $author$project$Forces$ArtworkGenerator$viewPointInMotion = F4(
	function (attributes, radius, position, velocity) {
		var c = 1.5 * $elm_explorations$linear_algebra$Math$Vector2$length(velocity);
		var color = A3($avh4$elm_color$Color$rgb, c, c, c);
		return A4($author$project$Forces$ArtworkGenerator$viewPoint, attributes, radius, position, color);
	});
var $author$project$Forces$ArtworkGenerator$viewMover = function (_v0) {
	var mass = _v0.b0;
	var position = _v0.ax;
	var velocity = _v0.by;
	return A4(
		$author$project$Forces$ArtworkGenerator$viewPointInMotion,
		_List_Nil,
		$author$project$Forces$ArtworkGenerator$radiusFromMass(mass),
		position,
		velocity);
};
var $author$project$Forces$ArtworkGenerator$viewMoverPath = function (moverPaths) {
	return A2(
		$elm_community$typed_svg$TypedSvg$g,
		_List_Nil,
		A2($elm$core$List$map, $author$project$Forces$ArtworkGenerator$viewMover, moverPaths));
};
var $author$project$Forces$ArtworkGenerator$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$ArtworkGenerator$width)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$ArtworkGenerator$height)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$Forces$ArtworkGenerator$width, $author$project$Forces$ArtworkGenerator$height)
			]),
		A2(
			$elm$core$List$cons,
			$author$project$Forces$ArtworkGenerator$border,
			A2($elm$core$List$map, $author$project$Forces$ArtworkGenerator$viewMoverPath, model.as)));
};
var $author$project$Forces$BlowingWind$border = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$BlowingWind$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$BlowingWind$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $author$project$Forces$BlowingWind$point = F2(
	function (radius, position) {
		var _v0 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(position);
		var x = _v0.bz;
		var y = _v0.bB;
		return A2(
			$elm_community$typed_svg$TypedSvg$circle,
			_List_fromArray(
				[
					$elm_community$typed_svg$TypedSvg$Attributes$cx(
					$elm_community$typed_svg$TypedSvg$Types$px(x)),
					$elm_community$typed_svg$TypedSvg$Attributes$cy(
					$elm_community$typed_svg$TypedSvg$Types$px(y)),
					$elm_community$typed_svg$TypedSvg$Attributes$r(
					$elm_community$typed_svg$TypedSvg$Types$px(radius)),
					$elm_community$typed_svg$TypedSvg$Attributes$fill(
					$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$black))
				]),
			_List_Nil);
	});
var $author$project$Forces$BlowingWind$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$BlowingWind$width)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$BlowingWind$height)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$Forces$BlowingWind$width, $author$project$Forces$BlowingWind$height)
			]),
		_List_fromArray(
			[
				$author$project$Forces$BlowingWind$border,
				A2($author$project$Forces$BlowingWind$point, model.ak, model.ax)
			]));
};
var $author$project$Forces$BlowingWindWithGravity$ball = function (_v0) {
	var mass = _v0.b0;
	var position = _v0.ax;
	var _v1 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(position);
	var x = _v1.bz;
	var y = _v1.bB;
	return A2(
		$elm_community$typed_svg$TypedSvg$circle,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$cx(
				$elm_community$typed_svg$TypedSvg$Types$px(x)),
				$elm_community$typed_svg$TypedSvg$Attributes$cy(
				$elm_community$typed_svg$TypedSvg$Types$px(y)),
				$elm_community$typed_svg$TypedSvg$Attributes$r(
				$elm_community$typed_svg$TypedSvg$Types$px(
					$author$project$Forces$BlowingWindWithGravity$ballRadiusFromMass(mass))),
				$elm_community$typed_svg$TypedSvg$Attributes$fill(
				$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$black))
			]),
		_List_Nil);
};
var $author$project$Forces$BlowingWindWithGravity$border = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$BlowingWindWithGravity$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$BlowingWindWithGravity$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $author$project$Forces$BlowingWindWithGravity$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$BlowingWindWithGravity$width)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$BlowingWindWithGravity$height)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$Forces$BlowingWindWithGravity$width, $author$project$Forces$BlowingWindWithGravity$height)
			]),
		A2(
			$elm$core$List$cons,
			$author$project$Forces$BlowingWindWithGravity$border,
			A2($elm$core$List$map, $author$project$Forces$BlowingWindWithGravity$ball, model.al)));
};
var $author$project$Forces$BlowingWindWithGravityAndFriction$ball = function (_v0) {
	var mass = _v0.b0;
	var position = _v0.ax;
	var _v1 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(position);
	var x = _v1.bz;
	var y = _v1.bB;
	return A2(
		$elm_community$typed_svg$TypedSvg$circle,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$cx(
				$elm_community$typed_svg$TypedSvg$Types$px(x)),
				$elm_community$typed_svg$TypedSvg$Attributes$cy(
				$elm_community$typed_svg$TypedSvg$Types$px(y)),
				$elm_community$typed_svg$TypedSvg$Attributes$r(
				$elm_community$typed_svg$TypedSvg$Types$px(
					$author$project$Forces$BlowingWindWithGravityAndFriction$ballRadiusFromMass(mass))),
				$elm_community$typed_svg$TypedSvg$Attributes$fill(
				$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$black))
			]),
		_List_Nil);
};
var $author$project$Forces$BlowingWindWithGravityAndFriction$border = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$BlowingWindWithGravityAndFriction$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$BlowingWindWithGravityAndFriction$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $author$project$Forces$BlowingWindWithGravityAndFriction$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$BlowingWindWithGravityAndFriction$width)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$BlowingWindWithGravityAndFriction$height)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$Forces$BlowingWindWithGravityAndFriction$width, $author$project$Forces$BlowingWindWithGravityAndFriction$height)
			]),
		A2(
			$elm$core$List$cons,
			$author$project$Forces$BlowingWindWithGravityAndFriction$border,
			A2($elm$core$List$map, $author$project$Forces$BlowingWindWithGravityAndFriction$ball, model.al)));
};
var $elm_community$typed_svg$TypedSvg$ellipse = $elm_community$typed_svg$TypedSvg$Core$node('ellipse');
var $avh4$elm_color$Color$red = A4($avh4$elm_color$Color$RgbaSpace, 204 / 255, 0 / 255, 0 / 255, 1.0);
var $elm_community$typed_svg$TypedSvg$Attributes$rx = function (length) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'rx',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
};
var $elm_community$typed_svg$TypedSvg$Attributes$ry = function (length) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'ry',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
};
var $author$project$Forces$FloatingBalloon$balloon = F3(
	function (w, h, p) {
		var _v0 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(p);
		var x = _v0.bz;
		var y = _v0.bB;
		return A2(
			$elm_community$typed_svg$TypedSvg$g,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm_community$typed_svg$TypedSvg$ellipse,
					_List_fromArray(
						[
							$elm_community$typed_svg$TypedSvg$Attributes$cx(
							$elm_community$typed_svg$TypedSvg$Types$px(x)),
							$elm_community$typed_svg$TypedSvg$Attributes$cy(
							$elm_community$typed_svg$TypedSvg$Types$px(y)),
							$elm_community$typed_svg$TypedSvg$Attributes$rx(
							$elm_community$typed_svg$TypedSvg$Types$px(w / 2)),
							$elm_community$typed_svg$TypedSvg$Attributes$ry(
							$elm_community$typed_svg$TypedSvg$Types$px(h / 2)),
							$elm_community$typed_svg$TypedSvg$Attributes$fill(
							$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$red))
						]),
					_List_Nil),
					A2(
					$elm_community$typed_svg$TypedSvg$line,
					_List_fromArray(
						[
							$elm_community$typed_svg$TypedSvg$Attributes$x1(
							$elm_community$typed_svg$TypedSvg$Types$px(x)),
							$elm_community$typed_svg$TypedSvg$Attributes$y1(
							$elm_community$typed_svg$TypedSvg$Types$px(y + (h / 2))),
							$elm_community$typed_svg$TypedSvg$Attributes$x2(
							$elm_community$typed_svg$TypedSvg$Types$px(x)),
							$elm_community$typed_svg$TypedSvg$Attributes$y2(
							$elm_community$typed_svg$TypedSvg$Types$px((y + (h / 2)) + 100)),
							$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
							$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
							$elm_community$typed_svg$TypedSvg$Types$px(2))
						]),
					_List_Nil)
				]));
	});
var $author$project$Forces$FloatingBalloon$border = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$FloatingBalloon$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$FloatingBalloon$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $author$project$Forces$FloatingBalloon$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$FloatingBalloon$width)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$FloatingBalloon$height)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$Forces$FloatingBalloon$width, $author$project$Forces$FloatingBalloon$height)
			]),
		_List_fromArray(
			[
				$author$project$Forces$FloatingBalloon$border,
				A3($author$project$Forces$FloatingBalloon$balloon, model.ch, model.bh, model.ax)
			]));
};
var $author$project$Forces$ManyBalls$ball = function (_v0) {
	var mass = _v0.b0;
	var position = _v0.ax;
	var _v1 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(position);
	var x = _v1.bz;
	var y = _v1.bB;
	return A2(
		$elm_community$typed_svg$TypedSvg$circle,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$cx(
				$elm_community$typed_svg$TypedSvg$Types$px(x)),
				$elm_community$typed_svg$TypedSvg$Attributes$cy(
				$elm_community$typed_svg$TypedSvg$Types$px(y)),
				$elm_community$typed_svg$TypedSvg$Attributes$r(
				$elm_community$typed_svg$TypedSvg$Types$px(
					$author$project$Forces$ManyBalls$ballRadiusFromMass(mass))),
				$elm_community$typed_svg$TypedSvg$Attributes$fill(
				$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$black))
			]),
		_List_Nil);
};
var $author$project$Forces$ManyBalls$border = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$ManyBalls$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$ManyBalls$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $author$project$Forces$ManyBalls$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$ManyBalls$width)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$ManyBalls$height)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$Forces$ManyBalls$width, $author$project$Forces$ManyBalls$height)
			]),
		A2(
			$elm$core$List$cons,
			$author$project$Forces$ManyBalls$border,
			A2($elm$core$List$map, $author$project$Forces$ManyBalls$ball, model.al)));
};
var $author$project$Forces$ManyOrbits$border = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$ManyOrbits$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$ManyOrbits$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $author$project$Forces$ManyOrbits$AttractorHovered = {$: 3};
var $author$project$Forces$ManyOrbits$AttractorMouseOut = {$: 5};
var $author$project$Forces$ManyOrbits$radiusFromMass = function (mass) {
	return mass * 20;
};
var $author$project$Forces$ManyOrbits$viewPoint = F3(
	function (attributes, radius, position) {
		var _v0 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(position);
		var x = _v0.bz;
		var y = _v0.bB;
		return A2(
			$elm_community$typed_svg$TypedSvg$circle,
			_Utils_ap(
				_List_fromArray(
					[
						$elm_community$typed_svg$TypedSvg$Attributes$cx(
						$elm_community$typed_svg$TypedSvg$Types$px(x)),
						$elm_community$typed_svg$TypedSvg$Attributes$cy(
						$elm_community$typed_svg$TypedSvg$Types$px(y)),
						$elm_community$typed_svg$TypedSvg$Attributes$r(
						$elm_community$typed_svg$TypedSvg$Types$px(radius)),
						$elm_community$typed_svg$TypedSvg$Attributes$fill(
						$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$grey))
					]),
				attributes),
			_List_Nil);
	});
var $author$project$Forces$ManyOrbits$viewAttractor = function (_v0) {
	var mass = _v0.b0;
	var position = _v0.ax;
	var fill = _v0.bf;
	return A3(
		$author$project$Forces$ManyOrbits$viewPoint,
		_Utils_ap(
			_List_fromArray(
				[
					A2($zaboco$elm_draggable$Draggable$mouseTrigger, 0, $author$project$Forces$ManyOrbits$DragMsg),
					$elm_community$typed_svg$TypedSvg$Events$onMouseOver($author$project$Forces$ManyOrbits$AttractorHovered),
					$elm_community$typed_svg$TypedSvg$Events$onMouseOut($author$project$Forces$ManyOrbits$AttractorMouseOut),
					$elm_community$typed_svg$TypedSvg$Attributes$fill(
					$elm_community$typed_svg$TypedSvg$Types$Fill(fill))
				]),
			A2($zaboco$elm_draggable$Draggable$touchTriggers, 0, $author$project$Forces$ManyOrbits$DragMsg)),
		$author$project$Forces$ManyOrbits$radiusFromMass(mass),
		position);
};
var $author$project$Forces$ManyOrbits$viewMover = function (_v0) {
	var mass = _v0.b0;
	var position = _v0.ax;
	return A3(
		$author$project$Forces$ManyOrbits$viewPoint,
		_List_Nil,
		$author$project$Forces$ManyOrbits$radiusFromMass(mass),
		position);
};
var $author$project$Forces$ManyOrbits$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$ManyOrbits$width)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$ManyOrbits$height)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$Forces$ManyOrbits$width, $author$project$Forces$ManyOrbits$height)
			]),
		_Utils_ap(
			_List_fromArray(
				[
					$author$project$Forces$ManyOrbits$border,
					$author$project$Forces$ManyOrbits$viewAttractor(model.F)
				]),
			A2($elm$core$List$map, $author$project$Forces$ManyOrbits$viewMover, model.at)));
};
var $author$project$Forces$MutualAttraction$border = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$MutualAttraction$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$MutualAttraction$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $author$project$Forces$MutualAttraction$radiusFromMass = function (mass) {
	return mass * 20;
};
var $author$project$Forces$MutualAttraction$viewPoint = F3(
	function (attributes, radius, position) {
		var _v0 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(position);
		var x = _v0.bz;
		var y = _v0.bB;
		return A2(
			$elm_community$typed_svg$TypedSvg$circle,
			_Utils_ap(
				_List_fromArray(
					[
						$elm_community$typed_svg$TypedSvg$Attributes$cx(
						$elm_community$typed_svg$TypedSvg$Types$px(x)),
						$elm_community$typed_svg$TypedSvg$Attributes$cy(
						$elm_community$typed_svg$TypedSvg$Types$px(y)),
						$elm_community$typed_svg$TypedSvg$Attributes$r(
						$elm_community$typed_svg$TypedSvg$Types$px(radius)),
						$elm_community$typed_svg$TypedSvg$Attributes$fill(
						$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$grey))
					]),
				attributes),
			_List_Nil);
	});
var $author$project$Forces$MutualAttraction$viewMover = function (_v0) {
	var mass = _v0.b0;
	var position = _v0.ax;
	return A3(
		$author$project$Forces$MutualAttraction$viewPoint,
		_List_Nil,
		$author$project$Forces$MutualAttraction$radiusFromMass(mass),
		position);
};
var $author$project$Forces$MutualAttraction$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$MutualAttraction$width)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$MutualAttraction$height)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$Forces$MutualAttraction$width, $author$project$Forces$MutualAttraction$height)
			]),
		A2(
			$elm$core$List$cons,
			$author$project$Forces$MutualAttraction$border,
			A2($elm$core$List$map, $author$project$Forces$MutualAttraction$viewMover, model.at)));
};
var $author$project$Forces$MutualRepulsion$border = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$MutualRepulsion$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$MutualRepulsion$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $author$project$Forces$MutualRepulsion$radiusFromMass = function (mass) {
	return mass * 20;
};
var $author$project$Forces$MutualRepulsion$viewPoint = F3(
	function (attributes, radius, position) {
		var _v0 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(position);
		var x = _v0.bz;
		var y = _v0.bB;
		return A2(
			$elm_community$typed_svg$TypedSvg$circle,
			_Utils_ap(
				_List_fromArray(
					[
						$elm_community$typed_svg$TypedSvg$Attributes$cx(
						$elm_community$typed_svg$TypedSvg$Types$px(x)),
						$elm_community$typed_svg$TypedSvg$Attributes$cy(
						$elm_community$typed_svg$TypedSvg$Types$px(y)),
						$elm_community$typed_svg$TypedSvg$Attributes$r(
						$elm_community$typed_svg$TypedSvg$Types$px(radius)),
						$elm_community$typed_svg$TypedSvg$Attributes$fill(
						$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$grey))
					]),
				attributes),
			_List_Nil);
	});
var $author$project$Forces$MutualRepulsion$viewMover = function (_v0) {
	var mass = _v0.b0;
	var position = _v0.ax;
	return A3(
		$author$project$Forces$MutualRepulsion$viewPoint,
		_List_Nil,
		$author$project$Forces$MutualRepulsion$radiusFromMass(mass),
		position);
};
var $author$project$Forces$MutualRepulsion$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$MutualRepulsion$width)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$MutualRepulsion$height)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$Forces$MutualRepulsion$width, $author$project$Forces$MutualRepulsion$height)
			]),
		A2(
			$elm$core$List$cons,
			$author$project$Forces$MutualRepulsion$border,
			A2($elm$core$List$map, $author$project$Forces$MutualRepulsion$viewMover, model.at)));
};
var $author$project$Forces$Resistance$border = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$Resistance$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$Resistance$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $author$project$Forces$Resistance$viewBall = function (_v0) {
	var mass = _v0.b0;
	var position = _v0.ax;
	var _v1 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(position);
	var x = _v1.bz;
	var y = _v1.bB;
	return A2(
		$elm_community$typed_svg$TypedSvg$circle,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$cx(
				$elm_community$typed_svg$TypedSvg$Types$px(x)),
				$elm_community$typed_svg$TypedSvg$Attributes$cy(
				$elm_community$typed_svg$TypedSvg$Types$px(y)),
				$elm_community$typed_svg$TypedSvg$Attributes$r(
				$elm_community$typed_svg$TypedSvg$Types$px(
					$author$project$Forces$Resistance$ballRadiusFromMass(mass))),
				$elm_community$typed_svg$TypedSvg$Attributes$fill(
				$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$black))
			]),
		_List_Nil);
};
var $author$project$Forces$Resistance$viewResistor = function (r) {
	var _v0 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(r.ax);
	var x = _v0.bz;
	var y = _v0.bB;
	return A2(
		$elm_community$typed_svg$TypedSvg$rect,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$x(
				$elm_community$typed_svg$TypedSvg$Types$px(x)),
				$elm_community$typed_svg$TypedSvg$Attributes$y(
				$elm_community$typed_svg$TypedSvg$Types$px(y)),
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px(r.ch)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px(r.bh)),
				$elm_community$typed_svg$TypedSvg$Attributes$fill(
				$elm_community$typed_svg$TypedSvg$Types$Fill(r.bP))
			]),
		_List_Nil);
};
var $author$project$Forces$Resistance$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$Resistance$width)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$Resistance$height)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$Forces$Resistance$width, $author$project$Forces$Resistance$height)
			]),
		_Utils_ap(
			_List_fromArray(
				[
					$author$project$Forces$Resistance$border,
					$author$project$Forces$Resistance$viewResistor(model.bq)
				]),
			A2($elm$core$List$map, $author$project$Forces$Resistance$viewBall, model.al)));
};
var $author$project$Forces$SingleOrbit$border = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$SingleOrbit$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$SingleOrbit$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $author$project$Forces$SingleOrbit$AttractorHovered = {$: 3};
var $author$project$Forces$SingleOrbit$AttractorMouseOut = {$: 5};
var $author$project$Forces$SingleOrbit$radiusFromMass = function (mass) {
	return mass * 20;
};
var $author$project$Forces$SingleOrbit$viewPoint = F3(
	function (attributes, radius, position) {
		var _v0 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(position);
		var x = _v0.bz;
		var y = _v0.bB;
		return A2(
			$elm_community$typed_svg$TypedSvg$circle,
			_Utils_ap(
				_List_fromArray(
					[
						$elm_community$typed_svg$TypedSvg$Attributes$cx(
						$elm_community$typed_svg$TypedSvg$Types$px(x)),
						$elm_community$typed_svg$TypedSvg$Attributes$cy(
						$elm_community$typed_svg$TypedSvg$Types$px(y)),
						$elm_community$typed_svg$TypedSvg$Attributes$r(
						$elm_community$typed_svg$TypedSvg$Types$px(radius)),
						$elm_community$typed_svg$TypedSvg$Attributes$fill(
						$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$grey))
					]),
				attributes),
			_List_Nil);
	});
var $author$project$Forces$SingleOrbit$viewAttractor = function (_v0) {
	var mass = _v0.b0;
	var position = _v0.ax;
	var fill = _v0.bf;
	return A3(
		$author$project$Forces$SingleOrbit$viewPoint,
		_Utils_ap(
			_List_fromArray(
				[
					A2($zaboco$elm_draggable$Draggable$mouseTrigger, 0, $author$project$Forces$SingleOrbit$DragMsg),
					$elm_community$typed_svg$TypedSvg$Events$onMouseOver($author$project$Forces$SingleOrbit$AttractorHovered),
					$elm_community$typed_svg$TypedSvg$Events$onMouseOut($author$project$Forces$SingleOrbit$AttractorMouseOut),
					$elm_community$typed_svg$TypedSvg$Attributes$fill(
					$elm_community$typed_svg$TypedSvg$Types$Fill(fill))
				]),
			A2($zaboco$elm_draggable$Draggable$touchTriggers, 0, $author$project$Forces$SingleOrbit$DragMsg)),
		$author$project$Forces$SingleOrbit$radiusFromMass(mass),
		position);
};
var $author$project$Forces$SingleOrbit$viewMover = function (_v0) {
	var mass = _v0.b0;
	var position = _v0.ax;
	return A3(
		$author$project$Forces$SingleOrbit$viewPoint,
		_List_Nil,
		$author$project$Forces$SingleOrbit$radiusFromMass(mass),
		position);
};
var $author$project$Forces$SingleOrbit$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$SingleOrbit$width)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$SingleOrbit$height)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$Forces$SingleOrbit$width, $author$project$Forces$SingleOrbit$height)
			]),
		_List_fromArray(
			[
				$author$project$Forces$SingleOrbit$border,
				$author$project$Forces$SingleOrbit$viewMover(model.z),
				$author$project$Forces$SingleOrbit$viewAttractor(model.F)
			]));
};
var $author$project$Forces$SinkingLogs$border = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$SinkingLogs$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$SinkingLogs$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $avh4$elm_color$Color$brown = A4($avh4$elm_color$Color$RgbaSpace, 193 / 255, 125 / 255, 17 / 255, 1.0);
var $author$project$Forces$SinkingLogs$viewLog = function (l) {
	var _v0 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(l.ax);
	var x = _v0.bz;
	var y = _v0.bB;
	return A2(
		$elm_community$typed_svg$TypedSvg$rect,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$x(
				$elm_community$typed_svg$TypedSvg$Types$px(x - (l.ch / 2))),
				$elm_community$typed_svg$TypedSvg$Attributes$y(
				$elm_community$typed_svg$TypedSvg$Types$px(y - (l.bh / 2))),
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px(l.ch)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px(l.bh)),
				$elm_community$typed_svg$TypedSvg$Attributes$fill(
				$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$brown))
			]),
		_List_Nil);
};
var $author$project$Forces$SinkingLogs$viewResistor = function (r) {
	var _v0 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(r.ax);
	var x = _v0.bz;
	var y = _v0.bB;
	return A2(
		$elm_community$typed_svg$TypedSvg$rect,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$x(
				$elm_community$typed_svg$TypedSvg$Types$px(x)),
				$elm_community$typed_svg$TypedSvg$Attributes$y(
				$elm_community$typed_svg$TypedSvg$Types$px(y)),
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px(r.ch)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px(r.bh)),
				$elm_community$typed_svg$TypedSvg$Attributes$fill(
				$elm_community$typed_svg$TypedSvg$Types$Fill(r.bP))
			]),
		_List_Nil);
};
var $author$project$Forces$SinkingLogs$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$SinkingLogs$width)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$SinkingLogs$height)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$Forces$SinkingLogs$width, $author$project$Forces$SinkingLogs$height)
			]),
		_Utils_ap(
			_List_fromArray(
				[
					$author$project$Forces$SinkingLogs$border,
					$author$project$Forces$SinkingLogs$viewResistor(model.bq)
				]),
			A2($elm$core$List$map, $author$project$Forces$SinkingLogs$viewLog, model.ar)));
};
var $author$project$Forces$WallBalls$ball = function (_v0) {
	var mass = _v0.b0;
	var position = _v0.ax;
	var _v1 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(position);
	var x = _v1.bz;
	var y = _v1.bB;
	return A2(
		$elm_community$typed_svg$TypedSvg$circle,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$cx(
				$elm_community$typed_svg$TypedSvg$Types$px(x)),
				$elm_community$typed_svg$TypedSvg$Attributes$cy(
				$elm_community$typed_svg$TypedSvg$Types$px(y)),
				$elm_community$typed_svg$TypedSvg$Attributes$r(
				$elm_community$typed_svg$TypedSvg$Types$px(
					$author$project$Forces$WallBalls$ballRadiusFromMass(mass))),
				$elm_community$typed_svg$TypedSvg$Attributes$fill(
				$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$black))
			]),
		_List_Nil);
};
var $author$project$Forces$WallBalls$border = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$WallBalls$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$WallBalls$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $author$project$Forces$WallBalls$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$WallBalls$width)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Forces$WallBalls$height)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$Forces$WallBalls$width, $author$project$Forces$WallBalls$height)
			]),
		A2(
			$elm$core$List$cons,
			$author$project$Forces$WallBalls$border,
			A2($elm$core$List$map, $author$project$Forces$WallBalls$ball, model.al)));
};
var $author$project$Noise$AnimatedBox$point = function (shade) {
	var s = shade.b;
	var _v0 = shade.a;
	var x = _v0.a;
	var y = _v0.b;
	return A2(
		$elm_community$typed_svg$TypedSvg$circle,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$cx(
				$elm_community$typed_svg$TypedSvg$Types$px(x)),
				$elm_community$typed_svg$TypedSvg$Attributes$cy(
				$elm_community$typed_svg$TypedSvg$Types$px(y)),
				$elm_community$typed_svg$TypedSvg$Attributes$r(
				$elm_community$typed_svg$TypedSvg$Types$px(1)),
				$elm_community$typed_svg$TypedSvg$Attributes$fill(
				$elm_community$typed_svg$TypedSvg$Types$Fill(
					A3($avh4$elm_color$Color$rgb, s, s, s)))
			]),
		_List_Nil);
};
var $author$project$Noise$AnimatedBox$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, 600, 600)
			]),
		A2($elm$core$List$map, $author$project$Noise$AnimatedBox$point, model.bs));
};
var $author$project$Noise$MountainRange$height = 600;
var $author$project$Noise$MountainRange$background = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Noise$MountainRange$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Noise$MountainRange$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$fill(
			$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$lightBlue))
		]),
	_List_Nil);
var $author$project$Noise$MountainRange$bar = F3(
	function (mtnNumber, x, _v0) {
		var length = _v0.a;
		var color = _v0.b;
		return A2(
			$elm_community$typed_svg$TypedSvg$rect,
			_List_fromArray(
				[
					$elm_community$typed_svg$TypedSvg$Attributes$x(
					$elm_community$typed_svg$TypedSvg$Types$px(x)),
					$elm_community$typed_svg$TypedSvg$Attributes$y(
					$elm_community$typed_svg$TypedSvg$Types$px(length - (mtnNumber * 50))),
					$elm_community$typed_svg$TypedSvg$Attributes$width(
					$elm_community$typed_svg$TypedSvg$Types$px(1)),
					$elm_community$typed_svg$TypedSvg$Attributes$height(
					$elm_community$typed_svg$TypedSvg$Types$px(length)),
					$elm_community$typed_svg$TypedSvg$Attributes$fill(
					$elm_community$typed_svg$TypedSvg$Types$Fill(color))
				]),
			_List_Nil);
	});
var $elm_community$list_extra$List$Extra$indexedFoldl = F3(
	function (func, acc, list) {
		var step = F2(
			function (x, _v0) {
				var i = _v0.a;
				var thisAcc = _v0.b;
				return _Utils_Tuple2(
					i + 1,
					A3(func, i, x, thisAcc));
			});
		return A3(
			$elm$core$List$foldl,
			step,
			_Utils_Tuple2(0, acc),
			list).b;
	});
var $author$project$Noise$MountainRange$mountains = function (model) {
	return A3(
		$elm_community$list_extra$List$Extra$indexedFoldl,
		F3(
			function (number, heights, mtns) {
				return _Utils_ap(
					A2(
						$elm$core$List$indexedMap,
						$author$project$Noise$MountainRange$bar(number),
						heights),
					mtns);
			}),
		_List_Nil,
		model.b$);
};
var $author$project$Noise$MountainRange$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, 600, 600)
			]),
		A2(
			$elm$core$List$cons,
			$author$project$Noise$MountainRange$background,
			$author$project$Noise$MountainRange$mountains(model)));
};
var $author$project$Noise$Perlin$bar = function (_v0) {
	var time = _v0.a;
	var length = _v0.b;
	return A2(
		$elm_community$typed_svg$TypedSvg$rect,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$x(
				$elm_community$typed_svg$TypedSvg$Types$px(0)),
				$elm_community$typed_svg$TypedSvg$Attributes$y(
				$elm_community$typed_svg$TypedSvg$Types$px(time * 100)),
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px(length)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px(1)),
				$elm_community$typed_svg$TypedSvg$Attributes$fill(
				$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$black))
			]),
		_List_Nil);
};
var $author$project$Noise$Perlin$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, 600, 600)
			]),
		A2($elm$core$List$map, $author$project$Noise$Perlin$bar, model.aN));
};
var $author$project$Noise$PerlinBox$point = function (shade) {
	var s = shade.b;
	var _v0 = shade.a;
	var x = _v0.a;
	var y = _v0.b;
	return A2(
		$elm_community$typed_svg$TypedSvg$circle,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$cx(
				$elm_community$typed_svg$TypedSvg$Types$px(x)),
				$elm_community$typed_svg$TypedSvg$Attributes$cy(
				$elm_community$typed_svg$TypedSvg$Types$px(y)),
				$elm_community$typed_svg$TypedSvg$Attributes$r(
				$elm_community$typed_svg$TypedSvg$Types$px(1)),
				$elm_community$typed_svg$TypedSvg$Attributes$fill(
				$elm_community$typed_svg$TypedSvg$Types$Fill(
					A3($avh4$elm_color$Color$rgb, s, s, s)))
			]),
		_List_Nil);
};
var $author$project$Noise$PerlinBox$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, 600, 600)
			]),
		A2($elm$core$List$map, $author$project$Noise$PerlinBox$point, model.bs));
};
var $author$project$Noise$PerlinStepWalker$point = function (position) {
	var _v0 = position;
	var x = _v0.a;
	var y = _v0.b;
	return A2(
		$elm_community$typed_svg$TypedSvg$circle,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$cx(
				$elm_community$typed_svg$TypedSvg$Types$px(x)),
				$elm_community$typed_svg$TypedSvg$Attributes$cy(
				$elm_community$typed_svg$TypedSvg$Types$px(y)),
				$elm_community$typed_svg$TypedSvg$Attributes$r(
				$elm_community$typed_svg$TypedSvg$Types$px(1)),
				$elm_community$typed_svg$TypedSvg$Attributes$fill(
				$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$black))
			]),
		_List_Nil);
};
var $author$project$Noise$PerlinStepWalker$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, 600, 600)
			]),
		A2($elm$core$List$map, $author$project$Noise$PerlinStepWalker$point, model.ay));
};
var $author$project$Noise$PerlinWalker$point = function (position) {
	var _v0 = position;
	var x = _v0.a;
	var y = _v0.b;
	return A2(
		$elm_community$typed_svg$TypedSvg$circle,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$cx(
				$elm_community$typed_svg$TypedSvg$Types$px(x)),
				$elm_community$typed_svg$TypedSvg$Attributes$cy(
				$elm_community$typed_svg$TypedSvg$Types$px(y)),
				$elm_community$typed_svg$TypedSvg$Attributes$r(
				$elm_community$typed_svg$TypedSvg$Types$px(1)),
				$elm_community$typed_svg$TypedSvg$Attributes$fill(
				$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$black))
			]),
		_List_Nil);
};
var $author$project$Noise$PerlinWalker$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, 600, 600)
			]),
		A2($elm$core$List$map, $author$project$Noise$PerlinWalker$point, model.ay));
};
var $author$project$Noise$RandomBox$point = F2(
	function (position, shade) {
		var y = $elm$core$Basics$round(position / $author$project$Noise$RandomBox$width);
		var x = A2(
			$elm$core$Basics$modBy,
			$elm$core$Basics$round($author$project$Noise$RandomBox$width),
			position);
		return A2(
			$elm_community$typed_svg$TypedSvg$circle,
			_List_fromArray(
				[
					$elm_community$typed_svg$TypedSvg$Attributes$cx(
					$elm_community$typed_svg$TypedSvg$Types$px(x)),
					$elm_community$typed_svg$TypedSvg$Attributes$cy(
					$elm_community$typed_svg$TypedSvg$Types$px(y)),
					$elm_community$typed_svg$TypedSvg$Attributes$r(
					$elm_community$typed_svg$TypedSvg$Types$px(1)),
					$elm_community$typed_svg$TypedSvg$Attributes$fill(
					$elm_community$typed_svg$TypedSvg$Types$Fill(
						A3($avh4$elm_color$Color$rgb, shade, shade, shade)))
				]),
			_List_Nil);
	});
var $author$project$Noise$RandomBox$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, 600, 600)
			]),
		A2($elm$core$List$indexedMap, $author$project$Noise$RandomBox$point, model.bs));
};
var $author$project$Oscillations$ManyWaves$height = 600;
var $author$project$Oscillations$ManyWaves$border = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Oscillations$ManyWaves$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Oscillations$ManyWaves$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $author$project$Oscillations$ManyWaves$viewBall = F3(
	function (ballRadius, ballColor, ballPosition) {
		return A2(
			$elm_community$typed_svg$TypedSvg$circle,
			_List_fromArray(
				[
					$elm_community$typed_svg$TypedSvg$Attributes$transform(
					_List_fromArray(
						[
							A2($elm_community$typed_svg$TypedSvg$Types$Translate, 0, $author$project$Oscillations$ManyWaves$height / 2)
						])),
					$elm_community$typed_svg$TypedSvg$Attributes$cx(
					$elm_community$typed_svg$TypedSvg$Types$px(
						$elm_explorations$linear_algebra$Math$Vector2$getX(ballPosition))),
					$elm_community$typed_svg$TypedSvg$Attributes$cy(
					$elm_community$typed_svg$TypedSvg$Types$px(
						$elm_explorations$linear_algebra$Math$Vector2$getY(ballPosition))),
					$elm_community$typed_svg$TypedSvg$Attributes$r(
					$elm_community$typed_svg$TypedSvg$Types$px(ballRadius)),
					$elm_community$typed_svg$TypedSvg$Attributes$fill(
					$elm_community$typed_svg$TypedSvg$Types$Fill(ballColor))
				]),
			_List_Nil);
	});
var $author$project$Oscillations$ManyWaves$viewWave = function (wave) {
	return A2(
		$elm_community$typed_svg$TypedSvg$g,
		_List_Nil,
		A2(
			$elm$core$List$map,
			function (position) {
				return A3($author$project$Oscillations$ManyWaves$viewBall, wave.ak, wave.bP, position);
			},
			wave.ay));
};
var $author$project$Oscillations$ManyWaves$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Oscillations$ManyWaves$width)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Oscillations$ManyWaves$height)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$Oscillations$ManyWaves$width, $author$project$Oscillations$ManyWaves$height)
			]),
		A2(
			$elm$core$List$cons,
			$author$project$Oscillations$ManyWaves$border,
			A2($elm$core$List$map, $author$project$Oscillations$ManyWaves$viewWave, model.a2)));
};
var $author$project$Oscillations$Oscillators$height = 600;
var $author$project$Oscillations$Oscillators$border = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Oscillations$Oscillators$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Oscillations$Oscillators$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $author$project$Oscillations$Oscillators$viewBall = F2(
	function (ballRadius, ballPosition) {
		return A2(
			$elm_community$typed_svg$TypedSvg$circle,
			_List_fromArray(
				[
					$elm_community$typed_svg$TypedSvg$Attributes$transform(
					_List_fromArray(
						[
							A2($elm_community$typed_svg$TypedSvg$Types$Translate, $author$project$Oscillations$Oscillators$width / 2, $author$project$Oscillations$Oscillators$height / 2)
						])),
					$elm_community$typed_svg$TypedSvg$Attributes$cx(
					$elm_community$typed_svg$TypedSvg$Types$px(
						$elm_explorations$linear_algebra$Math$Vector2$getX(ballPosition))),
					$elm_community$typed_svg$TypedSvg$Attributes$cy(
					$elm_community$typed_svg$TypedSvg$Types$px(
						$elm_explorations$linear_algebra$Math$Vector2$getY(ballPosition))),
					$elm_community$typed_svg$TypedSvg$Attributes$r(
					$elm_community$typed_svg$TypedSvg$Types$px(ballRadius)),
					$elm_community$typed_svg$TypedSvg$Attributes$fill(
					$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$black))
				]),
			_List_Nil);
	});
var $author$project$Oscillations$Oscillators$viewString = function (ballPosition) {
	return A2(
		$elm_community$typed_svg$TypedSvg$line,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$transform(
				_List_fromArray(
					[
						A2($elm_community$typed_svg$TypedSvg$Types$Translate, $author$project$Oscillations$Oscillators$width / 2, $author$project$Oscillations$Oscillators$height / 2)
					])),
				$elm_community$typed_svg$TypedSvg$Attributes$x1(
				$elm_community$typed_svg$TypedSvg$Types$px(0)),
				$elm_community$typed_svg$TypedSvg$Attributes$y1(
				$elm_community$typed_svg$TypedSvg$Types$px(0)),
				$elm_community$typed_svg$TypedSvg$Attributes$x2(
				$elm_community$typed_svg$TypedSvg$Types$px(
					$elm_explorations$linear_algebra$Math$Vector2$getX(ballPosition))),
				$elm_community$typed_svg$TypedSvg$Attributes$y2(
				$elm_community$typed_svg$TypedSvg$Types$px(
					$elm_explorations$linear_algebra$Math$Vector2$getY(ballPosition))),
				$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
				$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
				$elm_community$typed_svg$TypedSvg$Types$px(2))
			]),
		_List_Nil);
};
var $author$project$Oscillations$Oscillators$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Oscillations$Oscillators$width)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Oscillations$Oscillators$height)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$Oscillations$Oscillators$width, $author$project$Oscillations$Oscillators$height)
			]),
		A2(
			$elm$core$List$cons,
			$author$project$Oscillations$Oscillators$border,
			A2(
				$elm$core$List$map,
				function (o) {
					return A2(
						$elm_community$typed_svg$TypedSvg$g,
						_List_Nil,
						_List_fromArray(
							[
								$author$project$Oscillations$Oscillators$viewString(o.ax),
								A2($author$project$Oscillations$Oscillators$viewBall, o.ak, o.ax)
							]));
				},
				model.aw)));
};
var $author$project$Oscillations$Pendulum$height = 600;
var $author$project$Oscillations$Pendulum$width = 600;
var $author$project$Oscillations$Pendulum$border = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Oscillations$Pendulum$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Oscillations$Pendulum$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $author$project$Oscillations$Pendulum$viewBall = F2(
	function (bobRadius, bobPosition) {
		return A2(
			$elm_community$typed_svg$TypedSvg$circle,
			_List_fromArray(
				[
					$elm_community$typed_svg$TypedSvg$Attributes$cx(
					$elm_community$typed_svg$TypedSvg$Types$px(
						$elm_explorations$linear_algebra$Math$Vector2$getX(bobPosition))),
					$elm_community$typed_svg$TypedSvg$Attributes$cy(
					$elm_community$typed_svg$TypedSvg$Types$px(
						$elm_explorations$linear_algebra$Math$Vector2$getY(bobPosition))),
					$elm_community$typed_svg$TypedSvg$Attributes$r(
					$elm_community$typed_svg$TypedSvg$Types$px(bobRadius)),
					$elm_community$typed_svg$TypedSvg$Attributes$fill(
					$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$black))
				]),
			_List_Nil);
	});
var $author$project$Oscillations$Pendulum$viewString = function (bobPosition) {
	return A2(
		$elm_community$typed_svg$TypedSvg$line,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$x1(
				$elm_community$typed_svg$TypedSvg$Types$px(0)),
				$elm_community$typed_svg$TypedSvg$Attributes$y1(
				$elm_community$typed_svg$TypedSvg$Types$px(0)),
				$elm_community$typed_svg$TypedSvg$Attributes$x2(
				$elm_community$typed_svg$TypedSvg$Types$px(
					$elm_explorations$linear_algebra$Math$Vector2$getX(bobPosition))),
				$elm_community$typed_svg$TypedSvg$Attributes$y2(
				$elm_community$typed_svg$TypedSvg$Types$px(
					$elm_explorations$linear_algebra$Math$Vector2$getY(bobPosition))),
				$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
				$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
				$elm_community$typed_svg$TypedSvg$Types$px(2))
			]),
		_List_Nil);
};
var $author$project$Oscillations$Pendulum$viewPendulum = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$g,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$transform(
				_List_fromArray(
					[
						A2($elm_community$typed_svg$TypedSvg$Types$Translate, $author$project$Oscillations$Pendulum$width / 2, 0)
					]))
			]),
		_List_fromArray(
			[
				$author$project$Oscillations$Pendulum$viewString(model.ax),
				A2($author$project$Oscillations$Pendulum$viewBall, model.bL, model.ax)
			]));
};
var $author$project$Oscillations$Pendulum$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Oscillations$Pendulum$width)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Oscillations$Pendulum$height)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$Oscillations$Pendulum$width, $author$project$Oscillations$Pendulum$height)
			]),
		_List_fromArray(
			[
				$author$project$Oscillations$Pendulum$border,
				$author$project$Oscillations$Pendulum$viewPendulum(model)
			]));
};
var $author$project$Oscillations$RainbowSlinky$height = 600;
var $author$project$Oscillations$RainbowSlinky$width = 600;
var $author$project$Oscillations$RainbowSlinky$border = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Oscillations$RainbowSlinky$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Oscillations$RainbowSlinky$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var $elm$core$Basics$pow = _Basics_pow;
var $avh4$elm_color$Color$scaleFrom255 = function (c) {
	return c / 255;
};
var $avh4$elm_color$Color$rgb255 = F3(
	function (r, g, b) {
		return A4(
			$avh4$elm_color$Color$RgbaSpace,
			$avh4$elm_color$Color$scaleFrom255(r),
			$avh4$elm_color$Color$scaleFrom255(g),
			$avh4$elm_color$Color$scaleFrom255(b),
			1.0);
	});
var $newmana$chroma_elm$Chroma$Colors$Sinebow$getColor = function (t) {
	var twoThirdPi = (2 * $elm$core$Basics$pi) / 3;
	var oneThirdPi = $elm$core$Basics$pi / 3;
	var boundedT = A3($elm$core$Basics$clamp, 0, 1, t);
	var newT = (0.5 - boundedT) * $elm$core$Basics$pi;
	var g = $elm$core$Basics$round(
		255 * A2(
			$elm$core$Basics$pow,
			$elm$core$Basics$sin(newT + oneThirdPi),
			2));
	var r = $elm$core$Basics$round(
		255 * A2(
			$elm$core$Basics$pow,
			$elm$core$Basics$sin(newT),
			2));
	var b = $elm$core$Basics$round(
		255 * A2(
			$elm$core$Basics$pow,
			$elm$core$Basics$sin(newT + twoThirdPi),
			2));
	return A3($avh4$elm_color$Color$rgb255, r, g, b);
};
var $author$project$Oscillations$RainbowSlinky$viewSlinky = function (endY) {
	var spacing = 1.6;
	var ellipseCount = 30;
	var ellipseHeight = (endY / ellipseCount) / spacing;
	return A2(
		$elm_community$typed_svg$TypedSvg$g,
		_List_Nil,
		A2(
			$elm$core$List$map,
			function (index) {
				return A2(
					$elm_community$typed_svg$TypedSvg$ellipse,
					_List_fromArray(
						[
							$elm_community$typed_svg$TypedSvg$Attributes$transform(
							_List_fromArray(
								[
									A2($elm_community$typed_svg$TypedSvg$Types$Translate, $author$project$Oscillations$RainbowSlinky$width / 2, 0)
								])),
							$elm_community$typed_svg$TypedSvg$Attributes$cx(
							$elm_community$typed_svg$TypedSvg$Types$px(0)),
							$elm_community$typed_svg$TypedSvg$Attributes$cy(
							$elm_community$typed_svg$TypedSvg$Types$px((index * ellipseHeight) * spacing)),
							$elm_community$typed_svg$TypedSvg$Attributes$rx(
							$elm_community$typed_svg$TypedSvg$Types$px(30)),
							$elm_community$typed_svg$TypedSvg$Attributes$ry(
							$elm_community$typed_svg$TypedSvg$Types$px(ellipseHeight)),
							$elm_community$typed_svg$TypedSvg$Attributes$noFill,
							$elm_community$typed_svg$TypedSvg$Attributes$stroke(
							$newmana$chroma_elm$Chroma$Colors$Sinebow$getColor(
								A5($author$project$Utils$lerp, 0, 30, 0, 1, index))),
							$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
							$elm_community$typed_svg$TypedSvg$Types$px(2))
						]),
					_List_Nil);
			},
			A2($elm$core$List$range, 0, ellipseCount)));
};
var $author$project$Oscillations$RainbowSlinky$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Oscillations$RainbowSlinky$width)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Oscillations$RainbowSlinky$height)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$Oscillations$RainbowSlinky$width, $author$project$Oscillations$RainbowSlinky$height)
			]),
		_List_fromArray(
			[
				$author$project$Oscillations$RainbowSlinky$border,
				$author$project$Oscillations$RainbowSlinky$viewSlinky(model.ax)
			]));
};
var $author$project$Oscillations$SimpleHarmonicMotion$height = 600;
var $author$project$Oscillations$SimpleHarmonicMotion$width = 600;
var $author$project$Oscillations$SimpleHarmonicMotion$border = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Oscillations$SimpleHarmonicMotion$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Oscillations$SimpleHarmonicMotion$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $author$project$Oscillations$SimpleHarmonicMotion$viewBall = F2(
	function (ballRadius, ballPosition) {
		return A2(
			$elm_community$typed_svg$TypedSvg$circle,
			_List_fromArray(
				[
					$elm_community$typed_svg$TypedSvg$Attributes$transform(
					_List_fromArray(
						[
							A2($elm_community$typed_svg$TypedSvg$Types$Translate, $author$project$Oscillations$SimpleHarmonicMotion$width / 2, $author$project$Oscillations$SimpleHarmonicMotion$height / 2)
						])),
					$elm_community$typed_svg$TypedSvg$Attributes$cx(
					$elm_community$typed_svg$TypedSvg$Types$px(ballPosition)),
					$elm_community$typed_svg$TypedSvg$Attributes$cy(
					$elm_community$typed_svg$TypedSvg$Types$px(0)),
					$elm_community$typed_svg$TypedSvg$Attributes$r(
					$elm_community$typed_svg$TypedSvg$Types$px(ballRadius)),
					$elm_community$typed_svg$TypedSvg$Attributes$fill(
					$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$black))
				]),
			_List_Nil);
	});
var $author$project$Oscillations$SimpleHarmonicMotion$viewString = function (ballPosition) {
	return A2(
		$elm_community$typed_svg$TypedSvg$line,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$transform(
				_List_fromArray(
					[
						A2($elm_community$typed_svg$TypedSvg$Types$Translate, $author$project$Oscillations$SimpleHarmonicMotion$width / 2, $author$project$Oscillations$SimpleHarmonicMotion$height / 2)
					])),
				$elm_community$typed_svg$TypedSvg$Attributes$x1(
				$elm_community$typed_svg$TypedSvg$Types$px(0)),
				$elm_community$typed_svg$TypedSvg$Attributes$y1(
				$elm_community$typed_svg$TypedSvg$Types$px(0)),
				$elm_community$typed_svg$TypedSvg$Attributes$x2(
				$elm_community$typed_svg$TypedSvg$Types$px(ballPosition)),
				$elm_community$typed_svg$TypedSvg$Attributes$y2(
				$elm_community$typed_svg$TypedSvg$Types$px(0)),
				$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
				$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
				$elm_community$typed_svg$TypedSvg$Types$px(2))
			]),
		_List_Nil);
};
var $author$project$Oscillations$SimpleHarmonicMotion$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Oscillations$SimpleHarmonicMotion$width)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Oscillations$SimpleHarmonicMotion$height)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$Oscillations$SimpleHarmonicMotion$width, $author$project$Oscillations$SimpleHarmonicMotion$height)
			]),
		_List_fromArray(
			[
				$author$project$Oscillations$SimpleHarmonicMotion$border,
				$author$project$Oscillations$SimpleHarmonicMotion$viewString(model.ax),
				A2($author$project$Oscillations$SimpleHarmonicMotion$viewBall, model.ak, model.ax)
			]));
};
var $author$project$Oscillations$SimpleHarmonicMotionWithAngle$height = 600;
var $author$project$Oscillations$SimpleHarmonicMotionWithAngle$width = 600;
var $author$project$Oscillations$SimpleHarmonicMotionWithAngle$border = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Oscillations$SimpleHarmonicMotionWithAngle$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Oscillations$SimpleHarmonicMotionWithAngle$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $author$project$Oscillations$SimpleHarmonicMotionWithAngle$viewBall = F2(
	function (ballRadius, ballPosition) {
		return A2(
			$elm_community$typed_svg$TypedSvg$circle,
			_List_fromArray(
				[
					$elm_community$typed_svg$TypedSvg$Attributes$transform(
					_List_fromArray(
						[
							A2($elm_community$typed_svg$TypedSvg$Types$Translate, $author$project$Oscillations$SimpleHarmonicMotionWithAngle$width / 2, $author$project$Oscillations$SimpleHarmonicMotionWithAngle$height / 2)
						])),
					$elm_community$typed_svg$TypedSvg$Attributes$cx(
					$elm_community$typed_svg$TypedSvg$Types$px(ballPosition)),
					$elm_community$typed_svg$TypedSvg$Attributes$cy(
					$elm_community$typed_svg$TypedSvg$Types$px(0)),
					$elm_community$typed_svg$TypedSvg$Attributes$r(
					$elm_community$typed_svg$TypedSvg$Types$px(ballRadius)),
					$elm_community$typed_svg$TypedSvg$Attributes$fill(
					$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$black))
				]),
			_List_Nil);
	});
var $author$project$Oscillations$SimpleHarmonicMotionWithAngle$viewString = function (ballPosition) {
	return A2(
		$elm_community$typed_svg$TypedSvg$line,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$transform(
				_List_fromArray(
					[
						A2($elm_community$typed_svg$TypedSvg$Types$Translate, $author$project$Oscillations$SimpleHarmonicMotionWithAngle$width / 2, $author$project$Oscillations$SimpleHarmonicMotionWithAngle$height / 2)
					])),
				$elm_community$typed_svg$TypedSvg$Attributes$x1(
				$elm_community$typed_svg$TypedSvg$Types$px(0)),
				$elm_community$typed_svg$TypedSvg$Attributes$y1(
				$elm_community$typed_svg$TypedSvg$Types$px(0)),
				$elm_community$typed_svg$TypedSvg$Attributes$x2(
				$elm_community$typed_svg$TypedSvg$Types$px(ballPosition)),
				$elm_community$typed_svg$TypedSvg$Attributes$y2(
				$elm_community$typed_svg$TypedSvg$Types$px(0)),
				$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
				$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
				$elm_community$typed_svg$TypedSvg$Types$px(2))
			]),
		_List_Nil);
};
var $author$project$Oscillations$SimpleHarmonicMotionWithAngle$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Oscillations$SimpleHarmonicMotionWithAngle$width)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Oscillations$SimpleHarmonicMotionWithAngle$height)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$Oscillations$SimpleHarmonicMotionWithAngle$width, $author$project$Oscillations$SimpleHarmonicMotionWithAngle$height)
			]),
		_List_fromArray(
			[
				$author$project$Oscillations$SimpleHarmonicMotionWithAngle$border,
				$author$project$Oscillations$SimpleHarmonicMotionWithAngle$viewString(model.ax),
				A2($author$project$Oscillations$SimpleHarmonicMotionWithAngle$viewBall, model.ak, model.ax)
			]));
};
var $author$project$Oscillations$SineWave$height = 600;
var $author$project$Oscillations$SineWave$border = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Oscillations$SineWave$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Oscillations$SineWave$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $author$project$Oscillations$SineWave$viewBall = F2(
	function (ballRadius, ballPosition) {
		return A2(
			$elm_community$typed_svg$TypedSvg$circle,
			_List_fromArray(
				[
					$elm_community$typed_svg$TypedSvg$Attributes$transform(
					_List_fromArray(
						[
							A2($elm_community$typed_svg$TypedSvg$Types$Translate, 0, $author$project$Oscillations$SineWave$height / 2)
						])),
					$elm_community$typed_svg$TypedSvg$Attributes$cx(
					$elm_community$typed_svg$TypedSvg$Types$px(
						$elm_explorations$linear_algebra$Math$Vector2$getX(ballPosition))),
					$elm_community$typed_svg$TypedSvg$Attributes$cy(
					$elm_community$typed_svg$TypedSvg$Types$px(
						$elm_explorations$linear_algebra$Math$Vector2$getY(ballPosition))),
					$elm_community$typed_svg$TypedSvg$Attributes$r(
					$elm_community$typed_svg$TypedSvg$Types$px(ballRadius)),
					$elm_community$typed_svg$TypedSvg$Attributes$fill(
					$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$black))
				]),
			_List_Nil);
	});
var $author$project$Oscillations$SineWave$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Oscillations$SineWave$width)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Oscillations$SineWave$height)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$Oscillations$SineWave$width, $author$project$Oscillations$SineWave$height)
			]),
		A2(
			$elm$core$List$cons,
			$author$project$Oscillations$SineWave$border,
			A2(
				$elm$core$List$map,
				function (position) {
					return A2($author$project$Oscillations$SineWave$viewBall, model.ak, position);
				},
				model.ay)));
};
var $author$project$Oscillations$StaticSineWave$height = 600;
var $author$project$Oscillations$StaticSineWave$border = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Oscillations$StaticSineWave$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Oscillations$StaticSineWave$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $elm_community$list_extra$List$Extra$getAt = F2(
	function (idx, xs) {
		return (idx < 0) ? $elm$core$Maybe$Nothing : $elm$core$List$head(
			A2($elm$core$List$drop, idx, xs));
	});
var $author$project$Oscillations$StaticSineWave$viewLine = F2(
	function (currPosition, nextPosition) {
		return A2(
			$elm_community$typed_svg$TypedSvg$line,
			_List_fromArray(
				[
					$elm_community$typed_svg$TypedSvg$Attributes$transform(
					_List_fromArray(
						[
							A2($elm_community$typed_svg$TypedSvg$Types$Translate, 0, $author$project$Oscillations$StaticSineWave$height / 2)
						])),
					$elm_community$typed_svg$TypedSvg$Attributes$x1(
					$elm_community$typed_svg$TypedSvg$Types$px(
						$elm_explorations$linear_algebra$Math$Vector2$getX(currPosition))),
					$elm_community$typed_svg$TypedSvg$Attributes$y1(
					$elm_community$typed_svg$TypedSvg$Types$px(
						$elm_explorations$linear_algebra$Math$Vector2$getY(currPosition))),
					$elm_community$typed_svg$TypedSvg$Attributes$x2(
					$elm_community$typed_svg$TypedSvg$Types$px(
						$elm_explorations$linear_algebra$Math$Vector2$getX(nextPosition))),
					$elm_community$typed_svg$TypedSvg$Attributes$y2(
					$elm_community$typed_svg$TypedSvg$Types$px(
						$elm_explorations$linear_algebra$Math$Vector2$getY(nextPosition))),
					$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
					$elm_community$typed_svg$TypedSvg$Types$px(2)),
					$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black)
				]),
			_List_Nil);
	});
var $author$project$Oscillations$StaticSineWave$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Oscillations$StaticSineWave$width)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Oscillations$StaticSineWave$height)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$Oscillations$StaticSineWave$width, $author$project$Oscillations$StaticSineWave$height)
			]),
		A2(
			$elm$core$List$cons,
			$author$project$Oscillations$StaticSineWave$border,
			A2(
				$elm$core$List$indexedMap,
				F2(
					function (index, currPosition) {
						var nextPosition = A2($elm_community$list_extra$List$Extra$getAt, index + 1, model.ay);
						if (nextPosition.$ === 1) {
							return A2($elm_community$typed_svg$TypedSvg$g, _List_Nil, _List_Nil);
						} else {
							var position = nextPosition.a;
							return A2($author$project$Oscillations$StaticSineWave$viewLine, currPosition, position);
						}
					}),
				model.ay)));
};
var $author$project$RandomWalks$Basic$point = function (position) {
	var _v0 = position;
	var x = _v0.a;
	var y = _v0.b;
	return A2(
		$elm_community$typed_svg$TypedSvg$circle,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$cx(
				$elm_community$typed_svg$TypedSvg$Types$px(x)),
				$elm_community$typed_svg$TypedSvg$Attributes$cy(
				$elm_community$typed_svg$TypedSvg$Types$px(y)),
				$elm_community$typed_svg$TypedSvg$Attributes$r(
				$elm_community$typed_svg$TypedSvg$Types$px(3)),
				$elm_community$typed_svg$TypedSvg$Attributes$fill(
				$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$black))
			]),
		_List_Nil);
};
var $author$project$RandomWalks$Basic$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, 600, 600)
			]),
		A2($elm$core$List$map, $author$project$RandomWalks$Basic$point, model.ay));
};
var $author$project$RandomWalks$Directed$point = function (position) {
	var _v0 = position;
	var x = _v0.a;
	var y = _v0.b;
	return A2(
		$elm_community$typed_svg$TypedSvg$circle,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$cx(
				$elm_community$typed_svg$TypedSvg$Types$px(x)),
				$elm_community$typed_svg$TypedSvg$Attributes$cy(
				$elm_community$typed_svg$TypedSvg$Types$px(y)),
				$elm_community$typed_svg$TypedSvg$Attributes$r(
				$elm_community$typed_svg$TypedSvg$Types$px(3)),
				$elm_community$typed_svg$TypedSvg$Attributes$fill(
				$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$black))
			]),
		_List_Nil);
};
var $author$project$RandomWalks$Directed$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, 600, 600)
			]),
		A2($elm$core$List$map, $author$project$RandomWalks$Directed$point, model.ay));
};
var $author$project$RandomWalks$Gaussian$point = function (position) {
	var _v0 = position;
	var x = _v0.a;
	var y = _v0.b;
	return A2(
		$elm_community$typed_svg$TypedSvg$circle,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$cx(
				$elm_community$typed_svg$TypedSvg$Types$px(x)),
				$elm_community$typed_svg$TypedSvg$Attributes$cy(
				$elm_community$typed_svg$TypedSvg$Types$px(y)),
				$elm_community$typed_svg$TypedSvg$Attributes$r(
				$elm_community$typed_svg$TypedSvg$Types$px(3)),
				$elm_community$typed_svg$TypedSvg$Attributes$fill(
				$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$black))
			]),
		_List_Nil);
};
var $author$project$RandomWalks$Gaussian$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, 600, 600)
			]),
		A2($elm$core$List$map, $author$project$RandomWalks$Gaussian$point, model.ay));
};
var $author$project$RandomWalks$Improved$point = function (position) {
	var _v0 = position;
	var x = _v0.a;
	var y = _v0.b;
	return A2(
		$elm_community$typed_svg$TypedSvg$circle,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$cx(
				$elm_community$typed_svg$TypedSvg$Types$px(x)),
				$elm_community$typed_svg$TypedSvg$Attributes$cy(
				$elm_community$typed_svg$TypedSvg$Types$px(y)),
				$elm_community$typed_svg$TypedSvg$Attributes$r(
				$elm_community$typed_svg$TypedSvg$Types$px(3)),
				$elm_community$typed_svg$TypedSvg$Attributes$fill(
				$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$black))
			]),
		_List_Nil);
};
var $author$project$RandomWalks$Improved$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, 600, 600)
			]),
		A2($elm$core$List$map, $author$project$RandomWalks$Improved$point, model.ay));
};
var $author$project$RandomWalks$Levy$point = function (position) {
	var _v0 = position;
	var x = _v0.a;
	var y = _v0.b;
	return A2(
		$elm_community$typed_svg$TypedSvg$circle,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$cx(
				$elm_community$typed_svg$TypedSvg$Types$px(x)),
				$elm_community$typed_svg$TypedSvg$Attributes$cy(
				$elm_community$typed_svg$TypedSvg$Types$px(y)),
				$elm_community$typed_svg$TypedSvg$Attributes$r(
				$elm_community$typed_svg$TypedSvg$Types$px(3)),
				$elm_community$typed_svg$TypedSvg$Attributes$fill(
				$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$black))
			]),
		_List_Nil);
};
var $author$project$RandomWalks$Levy$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, 600, 600)
			]),
		A2($elm$core$List$map, $author$project$RandomWalks$Levy$point, model.ay));
};
var $author$project$RandomWalks$MonteCarlo$point = function (position) {
	return A2(
		$elm_community$typed_svg$TypedSvg$circle,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$cx(
				$elm_community$typed_svg$TypedSvg$Types$px(position * 600)),
				$elm_community$typed_svg$TypedSvg$Attributes$cy(
				$elm_community$typed_svg$TypedSvg$Types$px(300)),
				$elm_community$typed_svg$TypedSvg$Attributes$r(
				$elm_community$typed_svg$TypedSvg$Types$px(position * 30)),
				$elm_community$typed_svg$TypedSvg$Attributes$fill(
				$elm_community$typed_svg$TypedSvg$Types$Fill(
					A4($avh4$elm_color$Color$rgba, 0, 0, 0, 0))),
				$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black)
			]),
		_List_Nil);
};
var $author$project$RandomWalks$MonteCarlo$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, 600, 600)
			]),
		A2($elm$core$List$map, $author$project$RandomWalks$MonteCarlo$point, model.ay));
};
var $author$project$RandomWalks$NormalDistribution$slab = function (position) {
	return A2(
		$elm_community$typed_svg$TypedSvg$rect,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$x(
				$elm_community$typed_svg$TypedSvg$Types$px(position)),
				$elm_community$typed_svg$TypedSvg$Attributes$y(
				$elm_community$typed_svg$TypedSvg$Types$px(0)),
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px(20)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				$elm_community$typed_svg$TypedSvg$Attributes$fill(
				$elm_community$typed_svg$TypedSvg$Types$Fill(
					A4($avh4$elm_color$Color$rgba, 0, 0, 0, 0.1)))
			]),
		_List_Nil);
};
var $author$project$RandomWalks$NormalDistribution$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, 600, 600)
			]),
		A2($elm$core$List$map, $author$project$RandomWalks$NormalDistribution$slab, model.ay));
};
var $author$project$RandomWalks$PaintSplatter$point = function (p) {
	var color = p.b;
	var _v0 = p.a;
	var x = _v0.a;
	var y = _v0.b;
	return A2(
		$elm_community$typed_svg$TypedSvg$circle,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$cx(
				$elm_community$typed_svg$TypedSvg$Types$px(x)),
				$elm_community$typed_svg$TypedSvg$Attributes$cy(
				$elm_community$typed_svg$TypedSvg$Types$px(y)),
				$elm_community$typed_svg$TypedSvg$Attributes$r(
				$elm_community$typed_svg$TypedSvg$Types$px(10)),
				$elm_community$typed_svg$TypedSvg$Attributes$fill(
				$elm_community$typed_svg$TypedSvg$Types$Fill(color))
			]),
		_List_Nil);
};
var $author$project$RandomWalks$PaintSplatter$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, 600, 600)
			]),
		A2($elm$core$List$map, $author$project$RandomWalks$PaintSplatter$point, model.aT));
};
var $author$project$Vector$AccelerateTowardsMouse$border = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Vector$AccelerateTowardsMouse$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Vector$AccelerateTowardsMouse$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $author$project$Vector$AccelerateTowardsMouse$point = F2(
	function (radius, position) {
		var _v0 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(position);
		var x = _v0.bz;
		var y = _v0.bB;
		return A2(
			$elm_community$typed_svg$TypedSvg$circle,
			_List_fromArray(
				[
					$elm_community$typed_svg$TypedSvg$Attributes$cx(
					$elm_community$typed_svg$TypedSvg$Types$px(x)),
					$elm_community$typed_svg$TypedSvg$Attributes$cy(
					$elm_community$typed_svg$TypedSvg$Types$px(y)),
					$elm_community$typed_svg$TypedSvg$Attributes$r(
					$elm_community$typed_svg$TypedSvg$Types$px(radius)),
					$elm_community$typed_svg$TypedSvg$Attributes$fill(
					$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$black))
				]),
			_List_Nil);
	});
var $author$project$Vector$AccelerateTowardsMouse$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Vector$AccelerateTowardsMouse$width)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Vector$AccelerateTowardsMouse$height)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$Vector$AccelerateTowardsMouse$width, $author$project$Vector$AccelerateTowardsMouse$height)
			]),
		_List_fromArray(
			[
				$author$project$Vector$AccelerateTowardsMouse$border,
				A2($author$project$Vector$AccelerateTowardsMouse$point, model.ak, model.ax)
			]));
};
var $author$project$Vector$BouncingBall$border = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Vector$BouncingBall$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Vector$BouncingBall$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $author$project$Vector$BouncingBall$point = F2(
	function (radius, position) {
		var _v0 = position;
		var x = _v0.a;
		var y = _v0.b;
		return A2(
			$elm_community$typed_svg$TypedSvg$circle,
			_List_fromArray(
				[
					$elm_community$typed_svg$TypedSvg$Attributes$cx(
					$elm_community$typed_svg$TypedSvg$Types$px(x)),
					$elm_community$typed_svg$TypedSvg$Attributes$cy(
					$elm_community$typed_svg$TypedSvg$Types$px(y)),
					$elm_community$typed_svg$TypedSvg$Attributes$r(
					$elm_community$typed_svg$TypedSvg$Types$px(radius)),
					$elm_community$typed_svg$TypedSvg$Attributes$fill(
					$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$black))
				]),
			_List_Nil);
	});
var $author$project$Vector$BouncingBall$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Vector$BouncingBall$width)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Vector$BouncingBall$height)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$Vector$BouncingBall$width, $author$project$Vector$BouncingBall$height)
			]),
		_List_fromArray(
			[
				$author$project$Vector$BouncingBall$border,
				A2($author$project$Vector$BouncingBall$point, model.ak, model.ax)
			]));
};
var $author$project$Vector$BouncingBallWithVector$border = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Vector$BouncingBallWithVector$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Vector$BouncingBallWithVector$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $author$project$Vector$BouncingBallWithVector$point = F2(
	function (radius, position) {
		var _v0 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(position);
		var x = _v0.bz;
		var y = _v0.bB;
		return A2(
			$elm_community$typed_svg$TypedSvg$circle,
			_List_fromArray(
				[
					$elm_community$typed_svg$TypedSvg$Attributes$cx(
					$elm_community$typed_svg$TypedSvg$Types$px(x)),
					$elm_community$typed_svg$TypedSvg$Attributes$cy(
					$elm_community$typed_svg$TypedSvg$Types$px(y)),
					$elm_community$typed_svg$TypedSvg$Attributes$r(
					$elm_community$typed_svg$TypedSvg$Types$px(radius)),
					$elm_community$typed_svg$TypedSvg$Attributes$fill(
					$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$black))
				]),
			_List_Nil);
	});
var $author$project$Vector$BouncingBallWithVector$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Vector$BouncingBallWithVector$width)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Vector$BouncingBallWithVector$height)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$Vector$BouncingBallWithVector$width, $author$project$Vector$BouncingBallWithVector$height)
			]),
		_List_fromArray(
			[
				$author$project$Vector$BouncingBallWithVector$border,
				A2($author$project$Vector$BouncingBallWithVector$point, model.ak, model.ax)
			]));
};
var $author$project$Vector$BrakingCar$border = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Vector$BrakingCar$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Vector$BrakingCar$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $author$project$Vector$BrakingCar$point = F2(
	function (radius, position) {
		var _v0 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(position);
		var x = _v0.bz;
		var y = _v0.bB;
		return A2(
			$elm_community$typed_svg$TypedSvg$circle,
			_List_fromArray(
				[
					$elm_community$typed_svg$TypedSvg$Attributes$cx(
					$elm_community$typed_svg$TypedSvg$Types$px(x)),
					$elm_community$typed_svg$TypedSvg$Attributes$cy(
					$elm_community$typed_svg$TypedSvg$Types$px(y)),
					$elm_community$typed_svg$TypedSvg$Attributes$r(
					$elm_community$typed_svg$TypedSvg$Types$px(radius)),
					$elm_community$typed_svg$TypedSvg$Attributes$fill(
					$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$black))
				]),
			_List_Nil);
	});
var $author$project$Vector$BrakingCar$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Vector$BrakingCar$width)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Vector$BrakingCar$height)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$Vector$BrakingCar$width, $author$project$Vector$BrakingCar$height)
			]),
		_List_fromArray(
			[
				$author$project$Vector$BrakingCar$border,
				A2($author$project$Vector$BrakingCar$point, model.ak, model.ax)
			]));
};
var $author$project$Vector$ConstantAcceleration$border = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Vector$ConstantAcceleration$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Vector$ConstantAcceleration$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $author$project$Vector$ConstantAcceleration$point = F2(
	function (radius, position) {
		var _v0 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(position);
		var x = _v0.bz;
		var y = _v0.bB;
		return A2(
			$elm_community$typed_svg$TypedSvg$circle,
			_List_fromArray(
				[
					$elm_community$typed_svg$TypedSvg$Attributes$cx(
					$elm_community$typed_svg$TypedSvg$Types$px(x)),
					$elm_community$typed_svg$TypedSvg$Attributes$cy(
					$elm_community$typed_svg$TypedSvg$Types$px(y)),
					$elm_community$typed_svg$TypedSvg$Attributes$r(
					$elm_community$typed_svg$TypedSvg$Types$px(radius)),
					$elm_community$typed_svg$TypedSvg$Attributes$fill(
					$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$black))
				]),
			_List_Nil);
	});
var $author$project$Vector$ConstantAcceleration$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Vector$ConstantAcceleration$width)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Vector$ConstantAcceleration$height)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$Vector$ConstantAcceleration$width, $author$project$Vector$ConstantAcceleration$height)
			]),
		_List_fromArray(
			[
				$author$project$Vector$ConstantAcceleration$border,
				A2($author$project$Vector$ConstantAcceleration$point, model.ak, model.ax)
			]));
};
var $author$project$Vector$ConstantVelocity$border = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Vector$ConstantVelocity$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Vector$ConstantVelocity$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $author$project$Vector$ConstantVelocity$point = F2(
	function (radius, position) {
		var _v0 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(position);
		var x = _v0.bz;
		var y = _v0.bB;
		return A2(
			$elm_community$typed_svg$TypedSvg$circle,
			_List_fromArray(
				[
					$elm_community$typed_svg$TypedSvg$Attributes$cx(
					$elm_community$typed_svg$TypedSvg$Types$px(x)),
					$elm_community$typed_svg$TypedSvg$Attributes$cy(
					$elm_community$typed_svg$TypedSvg$Types$px(y)),
					$elm_community$typed_svg$TypedSvg$Attributes$r(
					$elm_community$typed_svg$TypedSvg$Types$px(radius)),
					$elm_community$typed_svg$TypedSvg$Attributes$fill(
					$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$black))
				]),
			_List_Nil);
	});
var $author$project$Vector$ConstantVelocity$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Vector$ConstantVelocity$width)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Vector$ConstantVelocity$height)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$Vector$ConstantVelocity$width, $author$project$Vector$ConstantVelocity$height)
			]),
		_List_fromArray(
			[
				$author$project$Vector$ConstantVelocity$border,
				A2($author$project$Vector$ConstantVelocity$point, model.ak, model.ax)
			]));
};
var $author$project$Vector$GroupAccelerateTowardsMouse$border = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Vector$GroupAccelerateTowardsMouse$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Vector$GroupAccelerateTowardsMouse$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $author$project$Vector$GroupAccelerateTowardsMouse$point = F2(
	function (radius, position) {
		var _v0 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(position);
		var x = _v0.bz;
		var y = _v0.bB;
		return A2(
			$elm_community$typed_svg$TypedSvg$circle,
			_List_fromArray(
				[
					$elm_community$typed_svg$TypedSvg$Attributes$cx(
					$elm_community$typed_svg$TypedSvg$Types$px(x)),
					$elm_community$typed_svg$TypedSvg$Attributes$cy(
					$elm_community$typed_svg$TypedSvg$Types$px(y)),
					$elm_community$typed_svg$TypedSvg$Attributes$r(
					$elm_community$typed_svg$TypedSvg$Types$px(radius)),
					$elm_community$typed_svg$TypedSvg$Attributes$fill(
					$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$black))
				]),
			_List_Nil);
	});
var $author$project$Vector$GroupAccelerateTowardsMouse$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Vector$GroupAccelerateTowardsMouse$width)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Vector$GroupAccelerateTowardsMouse$height)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$Vector$GroupAccelerateTowardsMouse$width, $author$project$Vector$GroupAccelerateTowardsMouse$height)
			]),
		A2(
			$elm$core$List$cons,
			$author$project$Vector$GroupAccelerateTowardsMouse$border,
			A2(
				$elm$core$List$map,
				function (p) {
					return A2($author$project$Vector$GroupAccelerateTowardsMouse$point, model.ak, p.ax);
				},
				model.aT)));
};
var $author$project$Vector$MouseStalker$border = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Vector$MouseStalker$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Vector$MouseStalker$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $author$project$Vector$MouseStalker$point = F2(
	function (radius, position) {
		var _v0 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(position);
		var x = _v0.bz;
		var y = _v0.bB;
		return A2(
			$elm_community$typed_svg$TypedSvg$circle,
			_List_fromArray(
				[
					$elm_community$typed_svg$TypedSvg$Attributes$cx(
					$elm_community$typed_svg$TypedSvg$Types$px(x)),
					$elm_community$typed_svg$TypedSvg$Attributes$cy(
					$elm_community$typed_svg$TypedSvg$Types$px(y)),
					$elm_community$typed_svg$TypedSvg$Attributes$r(
					$elm_community$typed_svg$TypedSvg$Types$px(radius)),
					$elm_community$typed_svg$TypedSvg$Attributes$fill(
					$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$black))
				]),
			_List_Nil);
	});
var $author$project$Vector$MouseStalker$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Vector$MouseStalker$width)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Vector$MouseStalker$height)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$Vector$MouseStalker$width, $author$project$Vector$MouseStalker$height)
			]),
		_List_fromArray(
			[
				$author$project$Vector$MouseStalker$border,
				A2($author$project$Vector$MouseStalker$point, model.ak, model.ax)
			]));
};
var $author$project$Vector$MouseTracing$arrow = function (position) {
	var _v0 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(position);
	var x = _v0.bz;
	var y = _v0.bB;
	return A2(
		$elm_community$typed_svg$TypedSvg$line,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$x1(
				$elm_community$typed_svg$TypedSvg$Types$px(x)),
				$elm_community$typed_svg$TypedSvg$Attributes$y1(
				$elm_community$typed_svg$TypedSvg$Types$px(y)),
				$elm_community$typed_svg$TypedSvg$Attributes$x2(
				$elm_community$typed_svg$TypedSvg$Types$px(
					$elm_explorations$linear_algebra$Math$Vector2$getX($author$project$Vector$MouseTracing$center))),
				$elm_community$typed_svg$TypedSvg$Attributes$y2(
				$elm_community$typed_svg$TypedSvg$Types$px(
					$elm_explorations$linear_algebra$Math$Vector2$getY($author$project$Vector$MouseTracing$center))),
				$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
				$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
				$elm_community$typed_svg$TypedSvg$Types$px(3))
			]),
		_List_Nil);
};
var $author$project$Vector$MouseTracing$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, 600, 600)
			]),
		_List_fromArray(
			[
				$author$project$Vector$MouseTracing$arrow(model.bj)
			]));
};
var $author$project$Vector$MouseTracingNormalized$normalize = F2(
	function (magnitude, position) {
		return A2(
			$elm_explorations$linear_algebra$Math$Vector2$add,
			$author$project$Vector$MouseTracingNormalized$center,
			A2(
				$elm_explorations$linear_algebra$Math$Vector2$scale,
				magnitude,
				$elm_explorations$linear_algebra$Math$Vector2$normalize(
					A2($elm_explorations$linear_algebra$Math$Vector2$sub, position, $author$project$Vector$MouseTracingNormalized$center))));
	});
var $author$project$Vector$MouseTracingNormalized$arrow = function (position) {
	var _v0 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(
		A2($author$project$Vector$MouseTracingNormalized$normalize, 100, position));
	var x = _v0.bz;
	var y = _v0.bB;
	return A2(
		$elm_community$typed_svg$TypedSvg$line,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$x1(
				$elm_community$typed_svg$TypedSvg$Types$px(x)),
				$elm_community$typed_svg$TypedSvg$Attributes$y1(
				$elm_community$typed_svg$TypedSvg$Types$px(y)),
				$elm_community$typed_svg$TypedSvg$Attributes$x2(
				$elm_community$typed_svg$TypedSvg$Types$px(
					$elm_explorations$linear_algebra$Math$Vector2$getX($author$project$Vector$MouseTracingNormalized$center))),
				$elm_community$typed_svg$TypedSvg$Attributes$y2(
				$elm_community$typed_svg$TypedSvg$Types$px(
					$elm_explorations$linear_algebra$Math$Vector2$getY($author$project$Vector$MouseTracingNormalized$center))),
				$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
				$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
				$elm_community$typed_svg$TypedSvg$Types$px(3))
			]),
		_List_Nil);
};
var $author$project$Vector$MouseTracingNormalized$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, 600, 600)
			]),
		_List_fromArray(
			[
				$author$project$Vector$MouseTracingNormalized$arrow(model.bj)
			]));
};
var $author$project$Vector$MouseTracingScaled$arrow = function (position) {
	var _v0 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(
		A2(
			$elm_explorations$linear_algebra$Math$Vector2$add,
			$author$project$Vector$MouseTracingScaled$center,
			A2(
				$elm_explorations$linear_algebra$Math$Vector2$scale,
				0.5,
				A2($elm_explorations$linear_algebra$Math$Vector2$sub, position, $author$project$Vector$MouseTracingScaled$center))));
	var x = _v0.bz;
	var y = _v0.bB;
	return A2(
		$elm_community$typed_svg$TypedSvg$line,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$x1(
				$elm_community$typed_svg$TypedSvg$Types$px(x)),
				$elm_community$typed_svg$TypedSvg$Attributes$y1(
				$elm_community$typed_svg$TypedSvg$Types$px(y)),
				$elm_community$typed_svg$TypedSvg$Attributes$x2(
				$elm_community$typed_svg$TypedSvg$Types$px(
					$elm_explorations$linear_algebra$Math$Vector2$getX($author$project$Vector$MouseTracingScaled$center))),
				$elm_community$typed_svg$TypedSvg$Attributes$y2(
				$elm_community$typed_svg$TypedSvg$Types$px(
					$elm_explorations$linear_algebra$Math$Vector2$getY($author$project$Vector$MouseTracingScaled$center))),
				$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
				$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
				$elm_community$typed_svg$TypedSvg$Types$px(3))
			]),
		_List_Nil);
};
var $author$project$Vector$MouseTracingScaled$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, 600, 600)
			]),
		_List_fromArray(
			[
				$author$project$Vector$MouseTracingScaled$arrow(model.bj)
			]));
};
var $author$project$Vector$MouseTracingWithMagnitude$arrow = function (position) {
	var _v0 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(position);
	var x = _v0.bz;
	var y = _v0.bB;
	return A2(
		$elm_community$typed_svg$TypedSvg$line,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$x1(
				$elm_community$typed_svg$TypedSvg$Types$px(x)),
				$elm_community$typed_svg$TypedSvg$Attributes$y1(
				$elm_community$typed_svg$TypedSvg$Types$px(y)),
				$elm_community$typed_svg$TypedSvg$Attributes$x2(
				$elm_community$typed_svg$TypedSvg$Types$px(
					$elm_explorations$linear_algebra$Math$Vector2$getX($author$project$Vector$MouseTracingWithMagnitude$center))),
				$elm_community$typed_svg$TypedSvg$Attributes$y2(
				$elm_community$typed_svg$TypedSvg$Types$px(
					$elm_explorations$linear_algebra$Math$Vector2$getY($author$project$Vector$MouseTracingWithMagnitude$center))),
				$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
				$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
				$elm_community$typed_svg$TypedSvg$Types$px(3))
			]),
		_List_Nil);
};
var $author$project$Vector$MouseTracingWithMagnitude$bar = function (position) {
	var magnitude = $elm_explorations$linear_algebra$Math$Vector2$length(position);
	return A2(
		$elm_community$typed_svg$TypedSvg$rect,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$x(
				$elm_community$typed_svg$TypedSvg$Types$px(0)),
				$elm_community$typed_svg$TypedSvg$Attributes$y(
				$elm_community$typed_svg$TypedSvg$Types$px(0)),
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px(magnitude)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px(10))
			]),
		_List_Nil);
};
var $author$project$Vector$MouseTracingWithMagnitude$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, 600, 600)
			]),
		_List_fromArray(
			[
				$author$project$Vector$MouseTracingWithMagnitude$arrow(model.bj),
				$author$project$Vector$MouseTracingWithMagnitude$bar(
				A2($elm_explorations$linear_algebra$Math$Vector2$sub, model.bj, $author$project$Vector$MouseTracingWithMagnitude$center))
			]));
};
var $author$project$Vector$RandomAcceleration$border = A2(
	$elm_community$typed_svg$TypedSvg$rect,
	_List_fromArray(
		[
			$elm_community$typed_svg$TypedSvg$Attributes$width(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Vector$RandomAcceleration$width)),
			$elm_community$typed_svg$TypedSvg$Attributes$height(
			$elm_community$typed_svg$TypedSvg$Types$px($author$project$Vector$RandomAcceleration$height)),
			$elm_community$typed_svg$TypedSvg$Attributes$noFill,
			$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
			$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
			$elm_community$typed_svg$TypedSvg$Types$px(3))
		]),
	_List_Nil);
var $author$project$Vector$RandomAcceleration$point = F2(
	function (radius, position) {
		var _v0 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(position);
		var x = _v0.bz;
		var y = _v0.bB;
		return A2(
			$elm_community$typed_svg$TypedSvg$circle,
			_List_fromArray(
				[
					$elm_community$typed_svg$TypedSvg$Attributes$cx(
					$elm_community$typed_svg$TypedSvg$Types$px(x)),
					$elm_community$typed_svg$TypedSvg$Attributes$cy(
					$elm_community$typed_svg$TypedSvg$Types$px(y)),
					$elm_community$typed_svg$TypedSvg$Attributes$r(
					$elm_community$typed_svg$TypedSvg$Types$px(radius)),
					$elm_community$typed_svg$TypedSvg$Attributes$fill(
					$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$black))
				]),
			_List_Nil);
	});
var $author$project$Vector$RandomAcceleration$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Vector$RandomAcceleration$width)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Vector$RandomAcceleration$height)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$Vector$RandomAcceleration$width, $author$project$Vector$RandomAcceleration$height)
			]),
		_List_fromArray(
			[
				$author$project$Vector$RandomAcceleration$border,
				A2($author$project$Vector$RandomAcceleration$point, model.ak, model.ax)
			]));
};
var $author$project$Vector$ScalingSaber$arrow = function (head) {
	return A2(
		$elm_community$typed_svg$TypedSvg$line,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$x1(
				$elm_community$typed_svg$TypedSvg$Types$px(
					$elm_explorations$linear_algebra$Math$Vector2$getX(head))),
				$elm_community$typed_svg$TypedSvg$Attributes$y1(
				$elm_community$typed_svg$TypedSvg$Types$px(
					$elm_explorations$linear_algebra$Math$Vector2$getY(head))),
				$elm_community$typed_svg$TypedSvg$Attributes$x2(
				$elm_community$typed_svg$TypedSvg$Types$px(
					$elm_explorations$linear_algebra$Math$Vector2$getX($author$project$Vector$ScalingSaber$saberTail))),
				$elm_community$typed_svg$TypedSvg$Attributes$y2(
				$elm_community$typed_svg$TypedSvg$Types$px(
					$elm_explorations$linear_algebra$Math$Vector2$getY($author$project$Vector$ScalingSaber$saberTail))),
				$elm_community$typed_svg$TypedSvg$Attributes$stroke($avh4$elm_color$Color$black),
				$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
				$elm_community$typed_svg$TypedSvg$Types$px(3))
			]),
		_List_Nil);
};
var $author$project$Vector$ScalingSaber$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, 600, 600)
			]),
		_List_fromArray(
			[
				$author$project$Vector$ScalingSaber$arrow(model.ag)
			]));
};
var $author$project$Vector$WalkerWithVector$point = function (position) {
	var _v0 = $elm_explorations$linear_algebra$Math$Vector2$toRecord(position);
	var x = _v0.bz;
	var y = _v0.bB;
	return A2(
		$elm_community$typed_svg$TypedSvg$circle,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$cx(
				$elm_community$typed_svg$TypedSvg$Types$px(x)),
				$elm_community$typed_svg$TypedSvg$Attributes$cy(
				$elm_community$typed_svg$TypedSvg$Types$px(y)),
				$elm_community$typed_svg$TypedSvg$Attributes$r(
				$elm_community$typed_svg$TypedSvg$Types$px(3)),
				$elm_community$typed_svg$TypedSvg$Attributes$fill(
				$elm_community$typed_svg$TypedSvg$Types$Fill($avh4$elm_color$Color$black))
			]),
		_List_Nil);
};
var $author$project$Vector$WalkerWithVector$view = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px(600)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, 600, 600)
			]),
		A2($elm$core$List$map, $author$project$Vector$WalkerWithVector$point, model.ay));
};
var $author$project$Main$demoView = function (model) {
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Main$defaultWidth)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$px($author$project$Main$defaultHeight)),
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$Main$defaultWidth, $author$project$Main$defaultHeight)
			]),
		_List_fromArray(
			[
				$author$project$Main$border,
				function () {
				var _v0 = model.a;
				switch (_v0.$) {
					case 0:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$BasicWalkerMsg,
							$author$project$RandomWalks$Basic$view(subModel));
					case 1:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$AngularMovementAccelerateTowardsMouseMsg,
							$author$project$AngularMovement$AccelerateTowardsMouse$view(subModel));
					case 2:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$AngularMovementAcceleratingBatonMsg,
							$author$project$AngularMovement$AcceleratingBaton$view(subModel));
					case 3:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$ForcesArtworkGeneratorMsg,
							$author$project$Forces$ArtworkGenerator$view(subModel));
					case 4:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$ForcesBlowingWindMsg,
							$author$project$Forces$BlowingWind$view(subModel));
					case 5:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$AngularMovementFallingBoulderMsg,
							$author$project$AngularMovement$FallingBoulder$view(subModel));
					case 6:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$ForcesBlowingWindWithGravityMsg,
							$author$project$Forces$BlowingWindWithGravity$view(subModel));
					case 7:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$NoiseAnimatedBoxMsg,
							$author$project$Noise$AnimatedBox$view(subModel));
					case 8:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$AngularMovementManyOrbitsWithDynamicRotationMsg,
							$author$project$AngularMovement$ManyOrbitsWithDynamicRotation$view(subModel));
					case 9:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$ForcesBlowingWindWithGravityAndFrictionMsg,
							$author$project$Forces$BlowingWindWithGravityAndFriction$view(subModel));
					case 10:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$NoiseMountainRangeMsg,
							$author$project$Noise$MountainRange$view(subModel));
					case 11:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$OscillationsManyWavesMsg,
							$author$project$Oscillations$ManyWaves$view(subModel));
					case 12:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$AngularMovementManyOrbitsWithRotationMsg,
							$author$project$AngularMovement$ManyOrbitsWithRotation$view(subModel));
					case 13:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$ForcesFloatingBalloonMsg,
							$author$project$Forces$FloatingBalloon$view(subModel));
					case 14:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$NoisePerlinMsg,
							$author$project$Noise$Perlin$view(subModel));
					case 15:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$OscillationsOscillatorsMsg,
							$author$project$Oscillations$Oscillators$view(subModel));
					case 16:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$AngularMovementPolarSwingMsg,
							$author$project$AngularMovement$PolarSwing$view(subModel));
					case 17:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$ForcesManyBallsMsg,
							$author$project$Forces$ManyBalls$view(subModel));
					case 18:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$NoisePerlinBoxMsg,
							$author$project$Noise$PerlinBox$view(subModel));
					case 19:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$OscillationsPendulumMsg,
							$author$project$Oscillations$Pendulum$view(subModel));
					case 20:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$RandomWalksDirectedMsg,
							$author$project$RandomWalks$Directed$view(subModel));
					case 21:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$AngularMovementSpinningBatonMsg,
							$author$project$AngularMovement$SpinningBaton$view(subModel));
					case 22:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$ForcesManyOrbitsMsg,
							$author$project$Forces$ManyOrbits$view(subModel));
					case 23:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$NoisePerlinStepWalkerMsg,
							$author$project$Noise$PerlinStepWalker$view(subModel));
					case 24:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$OscillationsRainbowSlinkyMsg,
							$author$project$Oscillations$RainbowSlinky$view(subModel));
					case 25:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$RandomWalksGaussianMsg,
							$author$project$RandomWalks$Gaussian$view(subModel));
					case 26:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$VectorAccelerateTowardsMouseMsg,
							$author$project$Vector$AccelerateTowardsMouse$view(subModel));
					case 27:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$AngularMovementSpiralDrawerMsg,
							$author$project$AngularMovement$SpiralDrawer$view(subModel));
					case 28:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$ForcesMutualAttractionMsg,
							$author$project$Forces$MutualAttraction$view(subModel));
					case 29:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$NoisePerlinWalkerMsg,
							$author$project$Noise$PerlinWalker$view(subModel));
					case 30:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$OscillationsSimpleHarmonicMotionMsg,
							$author$project$Oscillations$SimpleHarmonicMotion$view(subModel));
					case 31:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$RandomWalksImprovedMsg,
							$author$project$RandomWalks$Improved$view(subModel));
					case 32:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$VectorBouncingBallMsg,
							$author$project$Vector$BouncingBall$view(subModel));
					case 33:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$ForcesMutualRepulsionMsg,
							$author$project$Forces$MutualRepulsion$view(subModel));
					case 34:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$NoiseRandomBoxMsg,
							$author$project$Noise$RandomBox$view(subModel));
					case 35:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$OscillationsSimpleHarmonicMotionWithAngleMsg,
							$author$project$Oscillations$SimpleHarmonicMotionWithAngle$view(subModel));
					case 36:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$RandomWalksLevyMsg,
							$author$project$RandomWalks$Levy$view(subModel));
					case 37:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$VectorBouncingBallWithVectorMsg,
							$author$project$Vector$BouncingBallWithVector$view(subModel));
					case 38:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$ForcesResistanceMsg,
							$author$project$Forces$Resistance$view(subModel));
					case 39:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$OscillationsSineWaveMsg,
							$author$project$Oscillations$SineWave$view(subModel));
					case 40:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$RandomWalksMonteCarloMsg,
							$author$project$RandomWalks$MonteCarlo$view(subModel));
					case 41:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$VectorBrakingCarMsg,
							$author$project$Vector$BrakingCar$view(subModel));
					case 42:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$ForcesSingleOrbitMsg,
							$author$project$Forces$SingleOrbit$view(subModel));
					case 43:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$OscillationsStaticSineWaveMsg,
							$author$project$Oscillations$StaticSineWave$view(subModel));
					case 44:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$RandomWalksNormalDistributionMsg,
							$author$project$RandomWalks$NormalDistribution$view(subModel));
					case 45:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$VectorConstantAccelerationMsg,
							$author$project$Vector$ConstantAcceleration$view(subModel));
					case 46:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$ForcesSinkingLogsMsg,
							$author$project$Forces$SinkingLogs$view(subModel));
					case 47:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$RandomWalksPaintSplatterMsg,
							$author$project$RandomWalks$PaintSplatter$view(subModel));
					case 48:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$VectorConstantVelocityMsg,
							$author$project$Vector$ConstantVelocity$view(subModel));
					case 49:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$ForcesWallBallsMsg,
							$author$project$Forces$WallBalls$view(subModel));
					case 50:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$VectorGroupAccelerateTowardsMouseMsg,
							$author$project$Vector$GroupAccelerateTowardsMouse$view(subModel));
					case 51:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$VectorMouseStalkerMsg,
							$author$project$Vector$MouseStalker$view(subModel));
					case 52:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$VectorMouseTracingMsg,
							$author$project$Vector$MouseTracing$view(subModel));
					case 53:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$VectorMouseTracingNormalizedMsg,
							$author$project$Vector$MouseTracingNormalized$view(subModel));
					case 54:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$VectorMouseTracingScaledMsg,
							$author$project$Vector$MouseTracingScaled$view(subModel));
					case 55:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$VectorMouseTracingWithMagnitudeMsg,
							$author$project$Vector$MouseTracingWithMagnitude$view(subModel));
					case 56:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$VectorRandomAccelerationMsg,
							$author$project$Vector$RandomAcceleration$view(subModel));
					case 57:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$VectorScalingSaberMsg,
							$author$project$Vector$ScalingSaber$view(subModel));
					default:
						var subModel = _v0.a;
						return A2(
							$elm$html$Html$map,
							$author$project$Main$VectorWalkerWithVectorMsg,
							$author$project$Vector$WalkerWithVector$view(subModel));
				}
			}()
			]));
};
var $mdgriffith$elm_ui$Element$el = F2(
	function (attrs, child) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asEl,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
					attrs)),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(
				_List_fromArray(
					[child])));
	});
var $mdgriffith$elm_ui$Internal$Model$Fill = function (a) {
	return {$: 2, a: a};
};
var $mdgriffith$elm_ui$Element$fill = $mdgriffith$elm_ui$Internal$Model$Fill(1);
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $mdgriffith$elm_ui$Internal$Model$unstyled = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Unstyled, $elm$core$Basics$always);
var $mdgriffith$elm_ui$Element$html = $mdgriffith$elm_ui$Internal$Model$unstyled;
var $mdgriffith$elm_ui$Internal$Model$OnlyDynamic = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$StaticRootAndDynamic = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$AllowHover = 1;
var $mdgriffith$elm_ui$Internal$Model$Layout = 0;
var $mdgriffith$elm_ui$Internal$Model$Rgba = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $mdgriffith$elm_ui$Internal$Model$focusDefaultStyle = {
	dE: $elm$core$Maybe$Nothing,
	dL: $elm$core$Maybe$Nothing,
	fa: $elm$core$Maybe$Just(
		{
			am: 0,
			bP: A4($mdgriffith$elm_ui$Internal$Model$Rgba, 155 / 255, 203 / 255, 1, 1),
			c$: _Utils_Tuple2(0, 0),
			aB: 3
		})
};
var $mdgriffith$elm_ui$Internal$Model$optionsToRecord = function (options) {
	var combine = F2(
		function (opt, record) {
			switch (opt.$) {
				case 0:
					var hoverable = opt.a;
					var _v4 = record.em;
					if (_v4.$ === 1) {
						return _Utils_update(
							record,
							{
								em: $elm$core$Maybe$Just(hoverable)
							});
					} else {
						return record;
					}
				case 1:
					var focusStyle = opt.a;
					var _v5 = record.eh;
					if (_v5.$ === 1) {
						return _Utils_update(
							record,
							{
								eh: $elm$core$Maybe$Just(focusStyle)
							});
					} else {
						return record;
					}
				default:
					var renderMode = opt.a;
					var _v6 = record.eG;
					if (_v6.$ === 1) {
						return _Utils_update(
							record,
							{
								eG: $elm$core$Maybe$Just(renderMode)
							});
					} else {
						return record;
					}
			}
		});
	var andFinally = function (record) {
		return {
			eh: function () {
				var _v0 = record.eh;
				if (_v0.$ === 1) {
					return $mdgriffith$elm_ui$Internal$Model$focusDefaultStyle;
				} else {
					var focusable = _v0.a;
					return focusable;
				}
			}(),
			em: function () {
				var _v1 = record.em;
				if (_v1.$ === 1) {
					return 1;
				} else {
					var hoverable = _v1.a;
					return hoverable;
				}
			}(),
			eG: function () {
				var _v2 = record.eG;
				if (_v2.$ === 1) {
					return 0;
				} else {
					var actualMode = _v2.a;
					return actualMode;
				}
			}()
		};
	};
	return andFinally(
		A3(
			$elm$core$List$foldr,
			combine,
			{eh: $elm$core$Maybe$Nothing, em: $elm$core$Maybe$Nothing, eG: $elm$core$Maybe$Nothing},
			options));
};
var $mdgriffith$elm_ui$Internal$Model$toHtml = F2(
	function (mode, el) {
		switch (el.$) {
			case 0:
				var html = el.a;
				return html($mdgriffith$elm_ui$Internal$Model$asEl);
			case 1:
				var styles = el.a.fk;
				var html = el.a.en;
				return A2(
					html,
					mode(styles),
					$mdgriffith$elm_ui$Internal$Model$asEl);
			case 2:
				var text = el.a;
				return $mdgriffith$elm_ui$Internal$Model$textElement(text);
			default:
				return $mdgriffith$elm_ui$Internal$Model$textElement('');
		}
	});
var $mdgriffith$elm_ui$Internal$Model$renderRoot = F3(
	function (optionList, attributes, child) {
		var options = $mdgriffith$elm_ui$Internal$Model$optionsToRecord(optionList);
		var embedStyle = function () {
			var _v0 = options.eG;
			if (_v0 === 1) {
				return $mdgriffith$elm_ui$Internal$Model$OnlyDynamic(options);
			} else {
				return $mdgriffith$elm_ui$Internal$Model$StaticRootAndDynamic(options);
			}
		}();
		return A2(
			$mdgriffith$elm_ui$Internal$Model$toHtml,
			embedStyle,
			A4(
				$mdgriffith$elm_ui$Internal$Model$element,
				$mdgriffith$elm_ui$Internal$Model$asEl,
				$mdgriffith$elm_ui$Internal$Model$div,
				attributes,
				$mdgriffith$elm_ui$Internal$Model$Unkeyed(
					_List_fromArray(
						[child]))));
	});
var $mdgriffith$elm_ui$Internal$Model$Colored = F3(
	function (a, b, c) {
		return {$: 4, a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Model$FontFamily = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$FontSize = function (a) {
	return {$: 2, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$SansSerif = {$: 1};
var $mdgriffith$elm_ui$Internal$Model$StyleClass = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$Typeface = function (a) {
	return {$: 3, a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$bgColor = $mdgriffith$elm_ui$Internal$Flag$flag(8);
var $mdgriffith$elm_ui$Internal$Flag$fontColor = $mdgriffith$elm_ui$Internal$Flag$flag(14);
var $mdgriffith$elm_ui$Internal$Flag$fontFamily = $mdgriffith$elm_ui$Internal$Flag$flag(5);
var $mdgriffith$elm_ui$Internal$Flag$fontSize = $mdgriffith$elm_ui$Internal$Flag$flag(4);
var $mdgriffith$elm_ui$Internal$Model$formatColorClass = function (_v0) {
	var red = _v0.a;
	var green = _v0.b;
	var blue = _v0.c;
	var alpha = _v0.d;
	return $mdgriffith$elm_ui$Internal$Model$floatClass(red) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(green) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(blue) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(alpha))))));
};
var $elm$core$String$toLower = _String_toLower;
var $elm$core$String$words = _String_words;
var $mdgriffith$elm_ui$Internal$Model$renderFontClassName = F2(
	function (font, current) {
		return _Utils_ap(
			current,
			function () {
				switch (font.$) {
					case 0:
						return 'serif';
					case 1:
						return 'sans-serif';
					case 2:
						return 'monospace';
					case 3:
						var name = font.a;
						return A2(
							$elm$core$String$join,
							'-',
							$elm$core$String$words(
								$elm$core$String$toLower(name)));
					case 4:
						var name = font.a;
						var url = font.b;
						return A2(
							$elm$core$String$join,
							'-',
							$elm$core$String$words(
								$elm$core$String$toLower(name)));
					default:
						var name = font.a.eI;
						return A2(
							$elm$core$String$join,
							'-',
							$elm$core$String$words(
								$elm$core$String$toLower(name)));
				}
			}());
	});
var $mdgriffith$elm_ui$Internal$Model$rootStyle = function () {
	var families = _List_fromArray(
		[
			$mdgriffith$elm_ui$Internal$Model$Typeface('Open Sans'),
			$mdgriffith$elm_ui$Internal$Model$Typeface('Helvetica'),
			$mdgriffith$elm_ui$Internal$Model$Typeface('Verdana'),
			$mdgriffith$elm_ui$Internal$Model$SansSerif
		]);
	return _List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$bgColor,
			A3(
				$mdgriffith$elm_ui$Internal$Model$Colored,
				'bg-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(
					A4($mdgriffith$elm_ui$Internal$Model$Rgba, 1, 1, 1, 0)),
				'background-color',
				A4($mdgriffith$elm_ui$Internal$Model$Rgba, 1, 1, 1, 0))),
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$fontColor,
			A3(
				$mdgriffith$elm_ui$Internal$Model$Colored,
				'fc-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(
					A4($mdgriffith$elm_ui$Internal$Model$Rgba, 0, 0, 0, 1)),
				'color',
				A4($mdgriffith$elm_ui$Internal$Model$Rgba, 0, 0, 0, 1))),
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$fontSize,
			$mdgriffith$elm_ui$Internal$Model$FontSize(20)),
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$fontFamily,
			A2(
				$mdgriffith$elm_ui$Internal$Model$FontFamily,
				A3($elm$core$List$foldl, $mdgriffith$elm_ui$Internal$Model$renderFontClassName, 'font-', families),
				families))
		]);
}();
var $mdgriffith$elm_ui$Element$layoutWith = F3(
	function (_v0, attrs, child) {
		var options = _v0.c3;
		return A3(
			$mdgriffith$elm_ui$Internal$Model$renderRoot,
			options,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$htmlClass(
					A2(
						$elm$core$String$join,
						' ',
						_List_fromArray(
							[$mdgriffith$elm_ui$Internal$Style$classes.e3, $mdgriffith$elm_ui$Internal$Style$classes.dC, $mdgriffith$elm_ui$Internal$Style$classes.fb]))),
				_Utils_ap($mdgriffith$elm_ui$Internal$Model$rootStyle, attrs)),
			child);
	});
var $mdgriffith$elm_ui$Element$layout = $mdgriffith$elm_ui$Element$layoutWith(
	{c3: _List_Nil});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $mdgriffith$elm_ui$Element$Events$onClick = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Attr, $elm$html$Html$Events$onClick);
var $mdgriffith$elm_ui$Internal$Model$Class = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$cursor = $mdgriffith$elm_ui$Internal$Flag$flag(21);
var $mdgriffith$elm_ui$Element$pointer = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$cursor, $mdgriffith$elm_ui$Internal$Style$classes.d3);
var $mdgriffith$elm_ui$Internal$Model$SpacingStyle = F3(
	function (a, b, c) {
		return {$: 5, a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Flag$spacing = $mdgriffith$elm_ui$Internal$Flag$flag(3);
var $mdgriffith$elm_ui$Internal$Model$spacingName = F2(
	function (x, y) {
		return 'spacing-' + ($elm$core$String$fromInt(x) + ('-' + $elm$core$String$fromInt(y)));
	});
var $mdgriffith$elm_ui$Element$spacing = function (x) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$spacing,
		A3(
			$mdgriffith$elm_ui$Internal$Model$SpacingStyle,
			A2($mdgriffith$elm_ui$Internal$Model$spacingName, x, x),
			x,
			x));
};
var $mdgriffith$elm_ui$Internal$Model$Text = function (a) {
	return {$: 2, a: a};
};
var $mdgriffith$elm_ui$Element$text = function (content) {
	return $mdgriffith$elm_ui$Internal$Model$Text(content);
};
var $mdgriffith$elm_ui$Internal$Model$AsRow = 0;
var $mdgriffith$elm_ui$Internal$Model$asRow = 0;
var $mdgriffith$elm_ui$Internal$Model$Padding = F5(
	function (a, b, c, d, e) {
		return {$: 0, a: a, b: b, c: c, d: d, e: e};
	});
var $mdgriffith$elm_ui$Internal$Model$Spaced = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Model$extractSpacingAndPadding = function (attrs) {
	return A3(
		$elm$core$List$foldr,
		F2(
			function (attr, _v0) {
				var pad = _v0.a;
				var spacing = _v0.b;
				return _Utils_Tuple2(
					function () {
						if (!pad.$) {
							var x = pad.a;
							return pad;
						} else {
							if ((attr.$ === 4) && (attr.b.$ === 7)) {
								var _v3 = attr.b;
								var name = _v3.a;
								var t = _v3.b;
								var r = _v3.c;
								var b = _v3.d;
								var l = _v3.e;
								return $elm$core$Maybe$Just(
									A5($mdgriffith$elm_ui$Internal$Model$Padding, name, t, r, b, l));
							} else {
								return $elm$core$Maybe$Nothing;
							}
						}
					}(),
					function () {
						if (!spacing.$) {
							var x = spacing.a;
							return spacing;
						} else {
							if ((attr.$ === 4) && (attr.b.$ === 5)) {
								var _v6 = attr.b;
								var name = _v6.a;
								var x = _v6.b;
								var y = _v6.c;
								return $elm$core$Maybe$Just(
									A3($mdgriffith$elm_ui$Internal$Model$Spaced, name, x, y));
							} else {
								return $elm$core$Maybe$Nothing;
							}
						}
					}());
			}),
		_Utils_Tuple2($elm$core$Maybe$Nothing, $elm$core$Maybe$Nothing),
		attrs);
};
var $mdgriffith$elm_ui$Internal$Model$PaddingStyle = F5(
	function (a, b, c, d, e) {
		return {$: 7, a: a, b: b, c: c, d: d, e: e};
	});
var $mdgriffith$elm_ui$Internal$Flag$padding = $mdgriffith$elm_ui$Internal$Flag$flag(2);
var $mdgriffith$elm_ui$Internal$Model$paddingName = F4(
	function (top, right, bottom, left) {
		return 'pad-' + ($elm$core$String$fromInt(top) + ('-' + ($elm$core$String$fromInt(right) + ('-' + ($elm$core$String$fromInt(bottom) + ('-' + $elm$core$String$fromInt(left)))))));
	});
var $mdgriffith$elm_ui$Element$paddingEach = function (_v0) {
	var top = _v0.cf;
	var right = _v0.az;
	var bottom = _v0.bM;
	var left = _v0.R;
	return (_Utils_eq(top, right) && (_Utils_eq(top, bottom) && _Utils_eq(top, left))) ? A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$padding,
		A5(
			$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
			'p-' + $elm$core$String$fromInt(top),
			top,
			top,
			top,
			top)) : A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$padding,
		A5(
			$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
			A4($mdgriffith$elm_ui$Internal$Model$paddingName, top, right, bottom, left),
			top,
			right,
			bottom,
			left));
};
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $mdgriffith$elm_ui$Element$wrappedRow = F2(
	function (attrs, children) {
		var _v0 = $mdgriffith$elm_ui$Internal$Model$extractSpacingAndPadding(attrs);
		var padded = _v0.a;
		var spaced = _v0.b;
		if (spaced.$ === 1) {
			return A4(
				$mdgriffith$elm_ui$Internal$Model$element,
				$mdgriffith$elm_ui$Internal$Model$asRow,
				$mdgriffith$elm_ui$Internal$Model$div,
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.aL + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.Q + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.ck)))),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
							attrs))),
				$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
		} else {
			var _v2 = spaced.a;
			var spaceName = _v2.a;
			var x = _v2.b;
			var y = _v2.c;
			var newPadding = function () {
				if (!padded.$) {
					var _v5 = padded.a;
					var name = _v5.a;
					var t = _v5.b;
					var r = _v5.c;
					var b = _v5.d;
					var l = _v5.e;
					return ((_Utils_cmp(r, (x / 2) | 0) > -1) && (_Utils_cmp(b, (y / 2) | 0) > -1)) ? $elm$core$Maybe$Just(
						$mdgriffith$elm_ui$Element$paddingEach(
							{bM: b - ((y / 2) | 0), R: l - ((x / 2) | 0), az: r - ((x / 2) | 0), cf: t - ((y / 2) | 0)})) : $elm$core$Maybe$Nothing;
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}();
			if (!newPadding.$) {
				var pad = newPadding.a;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$element,
					$mdgriffith$elm_ui$Internal$Model$asRow,
					$mdgriffith$elm_ui$Internal$Model$div,
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.aL + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.Q + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.ck)))),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
							A2(
								$elm$core$List$cons,
								$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
								_Utils_ap(
									attrs,
									_List_fromArray(
										[pad]))))),
					$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
			} else {
				var halfY = -(y / 2);
				var halfX = -(x / 2);
				return A4(
					$mdgriffith$elm_ui$Internal$Model$element,
					$mdgriffith$elm_ui$Internal$Model$asEl,
					$mdgriffith$elm_ui$Internal$Model$div,
					attrs,
					$mdgriffith$elm_ui$Internal$Model$Unkeyed(
						_List_fromArray(
							[
								A4(
								$mdgriffith$elm_ui$Internal$Model$element,
								$mdgriffith$elm_ui$Internal$Model$asRow,
								$mdgriffith$elm_ui$Internal$Model$div,
								A2(
									$elm$core$List$cons,
									$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.aL + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.Q + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.ck)))),
									A2(
										$elm$core$List$cons,
										$mdgriffith$elm_ui$Internal$Model$Attr(
											A2(
												$elm$html$Html$Attributes$style,
												'margin',
												$elm$core$String$fromFloat(halfY) + ('px' + (' ' + ($elm$core$String$fromFloat(halfX) + 'px'))))),
										A2(
											$elm$core$List$cons,
											$mdgriffith$elm_ui$Internal$Model$Attr(
												A2(
													$elm$html$Html$Attributes$style,
													'width',
													'calc(100% + ' + ($elm$core$String$fromInt(x) + 'px)'))),
											A2(
												$elm$core$List$cons,
												$mdgriffith$elm_ui$Internal$Model$Attr(
													A2(
														$elm$html$Html$Attributes$style,
														'height',
														'calc(100% + ' + ($elm$core$String$fromInt(y) + 'px)'))),
												A2(
													$elm$core$List$cons,
													A2(
														$mdgriffith$elm_ui$Internal$Model$StyleClass,
														$mdgriffith$elm_ui$Internal$Flag$spacing,
														A3($mdgriffith$elm_ui$Internal$Model$SpacingStyle, spaceName, x, y)),
													_List_Nil))))),
								$mdgriffith$elm_ui$Internal$Model$Unkeyed(children))
							])));
			}
		}
	});
var $author$project$Main$view = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$layout,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
			]),
		A2(
			function () {
				var _v0 = model.bd;
				if (!_v0.$) {
					var device = _v0.a;
					var _v1 = _Utils_Tuple2(device.dW, device.eV);
					if ((!_v1.a) && (!_v1.b)) {
						var _v2 = _v1.a;
						var _v3 = _v1.b;
						return $mdgriffith$elm_ui$Element$column;
					} else {
						return $mdgriffith$elm_ui$Element$wrappedRow;
					}
				} else {
					return $mdgriffith$elm_ui$Element$wrappedRow;
				}
			}(),
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$spacing(20)
				]),
			_List_fromArray(
				[
					A2(
					$mdgriffith$elm_ui$Element$column,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
						]),
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$html(
							$author$project$Main$demoView(model))
						])),
					A2(
					$mdgriffith$elm_ui$Element$column,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$spacing(20)
						]),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(0)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('Basic Walker')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(1)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('AccelerateTowardsMouse')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(2)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('AcceleratingBaton')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(3)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('ArtworkGenerator')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(4)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('BlowingWind')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(5)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('FallingBoulder')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(6)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('BlowingWindWithGravity')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(7)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('AnimatedBox')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(8)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('ManyOrbitsWithDynamicRotation')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(9)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('BlowingWindWithGravityAndFriction')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(10)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('MountainRange')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(11)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('ManyWaves')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(12)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('ManyOrbitsWithRotation')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(13)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('FloatingBalloon')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(14)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('Perlin')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(15)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('Oscillators')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(16)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('PolarSwing')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(17)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('ManyBalls')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(18)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('PerlinBox')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(19)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('Pendulum')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(20)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('Directed')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(21)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('SpinningBaton')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(22)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('ManyOrbits')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(23)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('PerlinStepWalker')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(24)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('RainbowSlinky')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(25)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('Gaussian')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(26)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('AccelerateTowardsMouse')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(27)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('SpiralDrawer')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(28)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('MutualAttraction')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(29)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('PerlinWalker')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(30)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('SimpleHarmonicMotion')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(31)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('Improved')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(32)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('BouncingBall')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(33)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('MutualRepulsion')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(34)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('RandomBox')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(35)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('SimpleHarmonicMotionWithAngle')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(36)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('Levy')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(37)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('BouncingBallWithVector')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(38)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('Resistance')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(39)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('SineWave')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(40)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('MonteCarlo')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(41)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('BrakingCar')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(42)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('SingleOrbit')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(43)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('StaticSineWave')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(44)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('NormalDistribution')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(45)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('ConstantAcceleration')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(46)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('SinkingLogs')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(47)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('PaintSplatter')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(48)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('ConstantVelocity')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(49)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('WallBalls')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(50)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('GroupAccelerateTowardsMouse')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(51)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('MouseStalker')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(52)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('MouseTracing')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(53)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('MouseTracingNormalized')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(54)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('MouseTracingScaled')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(55)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('MouseTracingWithMagnitude')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(56)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('RandomAcceleration')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(57)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('ScalingSaber')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$Select(58)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text('WalkerWithVector'))
						]))
				])));
};
var $author$project$Main$main = $elm$browser$Browser$element(
	{et: $author$project$Main$init, fl: $author$project$Main$subscriptions, fI: $author$project$Main$update, fJ: $author$project$Main$view});
_Platform_export({'Main':{'init':$author$project$Main$main(
	$elm$json$Json$Decode$succeed(0))(0)}});}(this));