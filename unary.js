module.exports = unary

function unary(fn) {
	return function(val) {
		return fn(val);
	};
}