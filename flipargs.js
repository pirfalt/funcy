//  flipArgs(f:(a,b,c)) => f(c,b,a)
var sliced = require('sliced');

module.exports = flipArgs

function flipArgs(f) {
  return function() {
    var args = sliced(arguments);
    return f.apply(this, args.reverse());
  };
}
