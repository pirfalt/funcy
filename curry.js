module.exports = curry;

function curry(func, len) {
	len = len || func.length;
	if (len > 5) throw new Error('Dont curry more than 5 args');
	return (len === 0) ? func
	: (len === 1) ? function(a) {
		return func(a);
	}
	: (len === 2) ? function(a) { return function(b) {
		return func(a,b);
	}}
	: (len === 3) ? function(a) { return function(b) { return function(c) {
		return func(a,b,c);
	}}}
	: (len === 4) ? function(a) { return function(b) { return function(c) { return function(d) {
		return func(a,b,c,d);
	}}}}
	: function(a) { return function(b) { return function(c) { return function(d) { return function(e) {
		return func(a,b,c,d,e);
	}}}}}
}