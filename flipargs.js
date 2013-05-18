//  flipArgs(f) -> (a,b,c) -> f(c,b,a)
var flipArgs = module.exports = function(f) {
  return function() {
    var args = [].slice.call(arguments);
    return f.apply(this, args.reverse());
  };
};