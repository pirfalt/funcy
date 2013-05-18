;(function(e,t,n,r){function i(r){if(!n[r]){if(!t[r]){if(e)return e(r);throw new Error("Cannot find module '"+r+"'")}var s=n[r]={exports:{}};t[r][0](function(e){var n=t[r][1][e];return i(n?n:e)},s,s.exports)}return n[r].exports}for(var s=0;s<r.length;s++)i(r[s]);return i})(typeof require!=="undefined"&&require,{1:[function(require,module,exports){
exports.compose = require('./compose');
exports.partial = require('./partial');
exports.partialRight = require('./partialright');
exports.flipArgs = require('./flipargs');
},{"./compose":2,"./partial":3,"./partialright":4,"./flipargs":5}],3:[function(require,module,exports){// partial(fn, old1, old2)(new)  =>  fn(old1, old2, new)
// optimized up until fn(old1,odl2,old3,new1,new2)
var __slice = Array.prototype.slice;

module.exports = partial;

function partial(func /* ...partialArgs */) {
  var o = arguments;
  var oldLength = arguments.length;

  // No func: identity
  return (oldLength === 0) ? function(v) { return v }

  // No args: func
  : (oldLength === 1) ? func

  // 1 arg: f -> func(arg, ...newArgs)
  : (oldLength === 2) ? function() {
    var n = arguments;
    var newLength = arguments.length;
    return (newLength === 0) ? func(o[1])
    : (newLength === 1) ? func(o[1], n[0])
    : (newLength === 2) ? func(o[1], n[0], n[1])
    : (newLength === 3) ? func(o[1], n[0], n[1], n[2])
    : (newLength === 3) ? func(o[1], n[0], n[1], n[2], n[3])
    : func.apply(this, __slice.call(o, 1).concat(__slice.call(n)))
  }

  // 2 arg: f -> func(arg1, arg2, ...newArgs)
  : (oldLength === 3) ? function() {
    var n = arguments;
    var newLength = arguments.length;
    return (newLength === 0) ? func(o[1], o[2])
    : (newLength === 1) ? func(o[1], o[2], n[0])
    : (newLength === 2) ? func(o[1], o[2], n[0], n[1])
    : (newLength === 3) ? func(o[1], o[2], n[0], n[1], n[2])
    : (newLength === 3) ? func(o[1], o[2], n[0], n[1], n[2], n[3])
    : func.apply(this, __slice.call(o, 1).concat(__slice.call(n)))
  }

  // 3 or more args: f -> func(...oldArgs, ...newArgs)
  : (o = __slice.call(o, 1), function() {
    return func.apply(this, o.concat(__slice.call(arguments)))
  })
}

},{}],2:[function(require,module,exports){// Compose functions
// compose(a, b, c) -> x -> a(b(c(x)))

// Every step in the chain can only take 1 arg since only 1 can be returned
// from the previous func call. For consistency (and speed) the first also takes 1 arg.

var __slice = Array.prototype.slice;

module.exports = compose;

function compose(/* ...funcs */) {
  var funs = arguments
  return function(arg) {
    var i = funs.length - 1
    for (; i > 0; i--) {
      arg = funs[i](arg)
    }
    return arg
  }
}

},{}],4:[function(require,module,exports){// partial(fn, old1, old2)(new)  =>  fn(old1, old2, new)
// optimized up until fn(old1,odl2,old3,new1,new2)
var __slice = Array.prototype.slice;

module.exports = partialRight;

function partialRight(func /* ...partialArgs */) {
  var o = arguments;
  var oldLength = arguments.length;

  // No func: identity
  return (oldLength === 0) ? function(v) { return v }

  // No args: func
  : (oldLength === 1) ? func

  // 1 arg: f -> func(arg, ...newArgs)
  : (oldLength === 2) ? function() {
    var n = arguments;
    var newLength = arguments.length;
    return (newLength === 0) ? func(o[1])
    : (newLength === 1) ? func(n[0], o[1])
    : (newLength === 2) ? func(n[0], n[1], o[1])
    : (newLength === 3) ? func(n[0], n[1], n[2], o[1])
    : (newLength === 3) ? func(n[0], n[1], n[2], n[3], o[1])
    : func.apply(this, __slice.call(n).concat(__slice.call(o, 1)))
  }

  // 2 arg: f -> func(arg1, arg2, ...newArgs)
  : (oldLength === 3) ? function() {
    var n = arguments;
    var newLength = arguments.length;
    return (newLength === 0) ? func(o[1], o[2])
    : (newLength === 1) ? func(n[0], o[1], o[2])
    : (newLength === 2) ? func(n[0], n[1], o[1], o[2])
    : (newLength === 3) ? func(n[0], n[1], n[2], o[1], o[2])
    : (newLength === 3) ? func(n[0], n[1], n[2], n[3], o[1], o[2])
    : func.apply(this, __slice.call(n).concat(__slice.call(o, 1)))
  }

  // 3 or more args: f -> func(...oldArgs, ...newArgs)
  : (o = __slice.call(o, 1), function() {
    return func.apply(this, __slice.call(arguments).concat(o));
  })
}
},{}],5:[function(require,module,exports){//  flipArgs(f) -> (a,b,c) -> f(c,b,a)
var flipArgs = module.exports = function(f) {
  return function() {
    var args = [].slice.call(arguments);
    return f.apply(this, args.reverse());
  };
};
},{}]},{},[1]);