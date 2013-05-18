var should = require('chai').should()
	, flipArgs = require('../flipargs')

function fn(arg1, arg2, arg3) {
	return [].slice.call(arguments);
}

describe('flipArgs', function () {
	it('returns a function', function () {
		var f = flipArgs(fn).should.be.a('function');
	});
	
	it('(f) -> (a,b,c) -> f(c,b,a)', function () {
		var f = flipArgs(fn);
		fn(1,2,3).should.eql(f(3,2,1));
	});
});