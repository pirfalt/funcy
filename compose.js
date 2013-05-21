// Compose functions
// compose(a, b, c) -> x -> a(b(c(x)))

// Every step in the chain can only take 1 arg since only 1 can be returned
// from the previous func call. For consistency (and speed) the first also takes 1 arg.
var slice = require('sliced');

module.exports = compose;

function compose() {
  var funcs = arguments;
  return function() {
    var args = slice(arguments);
    for (var i = funcs.length - 1; i >= 0; i--) {
      args = [funcs[i].apply(this, args)];
    }
    return args[0];
  };
}
