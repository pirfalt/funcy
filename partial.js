// partial(fn, old1, old2)(new)  =>  fn(old1, old2, new)
// optimized up until fn(old1,odl2,old3,new1,new2)
var sliced = require('sliced');

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
    : (newLength === 4) ? func(o[1], n[0], n[1], n[2], n[3])
    : func.apply(this, sliced(o, 1).concat(sliced(n)))
  }

  // 2 arg: f -> func(arg1, arg2, ...newArgs)
  : (oldLength === 3) ? function() {
    var n = arguments;
    var newLength = arguments.length;
    return (newLength === 0) ? func(o[1], o[2])
    : (newLength === 1) ? func(o[1], o[2], n[0])
    : (newLength === 2) ? func(o[1], o[2], n[0], n[1])
    : (newLength === 3) ? func(o[1], o[2], n[0], n[1], n[2])
    : (newLength === 4) ? func(o[1], o[2], n[0], n[1], n[2], n[3])
    : func.apply(this, sliced(o, 1).concat(sliced(n)))
  }

  // 3 arg: f -> func(arg1, arg2, ...newArgs)
  : (oldLength === 4) ? function() {
    var n = arguments;
    var newLength = arguments.length;
    return (newLength === 0) ? func(o[1], o[2], o[3])
    : (newLength === 1) ? func(o[1], o[2], o[3], n[0])
    : (newLength === 2) ? func(o[1], o[2], o[3], n[0], n[1])
    : (newLength === 3) ? func(o[1], o[2], o[3], n[0], n[1], n[2])
    : (newLength === 4) ? func(o[1], o[2], o[3], n[0], n[1], n[2], n[3])
    : func.apply(this, sliced(o, 1).concat(sliced(n)))
  }

  // 4 or more args: f -> func(...oldArgs, ...newArgs)
  : (o = sliced(o, 1), function() {
    return func.apply(this, o.concat(sliced(arguments)))
  })
}
