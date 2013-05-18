var should = require('chai').should
  , partr = require('../partialright')
  , arg

should();



function fn() {
	var args = [].slice.call(arguments)
	return args;
}


beforeEach(function () {
	arg = {};
});


describe('partr', function () {
	it('() -> id', function () {
		var f = partr();
		f(arg).should.equal(arg);
	});

	it('(f) -> f', function () {
		var f = partr(fn);
		f.should.equal(fn);
	});

	it('(f, a) -> b -> f(a, b)', function () {
		var f = partr(fn, 1)
		f().should.eql([1])
		f(2).should.eql([2,1])
	});

	it('(f, a, b) -> c -> f(a, b, c)', function () {
		var f = partr(fn, 1, 2)
		f().should.eql([1, 2])
		f(3).should.eql([3,1,2])
	});

	it('(f, a, b, c) -> d -> f(a, b, c, d)', function () {
		var f = partr(fn, 1, 2, 3)
		f().should.eql([1,2,3])
		f(4).should.eql([4,1,2,3])
	});

	it('(f, a, b, c, ...d) -> e -> f(a, b, c, ...d, e)', function () {
		var f = partr(fn, 1, 2, 3, 4, 5)
		f().should.eql([1,2,3,4,5])
		f(6).should.eql([6,1,2,3,4,5])
	});



	it('(fn) -> (a,b) -> fn(a,b)', function () {
		var f = partr(fn)
		f(1,2).should.eql([1,2])
	});

	it('(fn, a) -> (b,c) -> fn(a,b,c,)', function () {
		var f = partr(fn, 1)
		f(2,3).should.eql([2,3,1])
	});

	it('(fn, a, b, c, ...d) -> (e,f) -> fn(a, b, c, ...d, e)', function () {
		var f = partr(fn, 1, 2, 3, 4, 5)
		f(6,7).should.eql([6,7,1,2,3,4,5])
	});
});