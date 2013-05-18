// Compose functions
// compose(a, b, c) -> x -> a(b(c(x)))

// Every step in the chain can only take 1 arg since only 1 can be returned
// from the previous func call. For consistency (and speed) the first also takes 1 arg.

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
