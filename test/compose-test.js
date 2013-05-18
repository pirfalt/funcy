/*jshint asi:true, laxcomma: true*/
var compose = require('../compose')
	,	should = require('chai').should()
	, expect = require('chai').expect
	, arg


function fn1 (argument) {
	argument.fn1Modifier += 1;
	return argument
}
function fn2 (argument) {
	argument.fn2Modifier += 1;
	return argument
}
function fn3 (argument) {
	argument.fn3Modifier += 1;
	return argument
}


beforeEach(function () {
	arg = {};
});


describe('compose', function () {
	it('compose() should return a function', function(){
		compose().should.be.a('function')
	});
	it('compose() should return identity function, f(x) -> x', function(){
		var f = compose();
		expect(f(arg)).to.equal(arg)
	});
	it('compose(fn) should return a f(x) -> fn(x) function', function(){
		var f = compose(fn1);
		f(arg).should.equal(fn1(arg));
	});
	it('compose(fn1, fn2) should return a f(x) -> fn1(fn2((x)) function', function(){
		var f = compose(fn1, fn2);
		f(arg).should.equal(fn1(fn2(arg)));
	});
	it('compose(fn1, fn2, fn3, fn1, fn2, fn3) should return a f(x) -> fn1(fn2(fn3(fn1(fn2(fn3((x))))))) function', function(){
		var f = compose(fn1, fn2, fn3, fn1, fn2, fn3);
		f(arg).should.equal(fn1(fn2(fn3(fn1(fn2(fn3(arg)))))));
	});
});
