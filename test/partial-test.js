var should = require('chai').should
  , expect = require('chai').expect
  , partial = require('../partial')
  , arg

should();



function fn() {
  var args = [].slice.call(arguments)
  return args;
}


beforeEach(function () {
  arg = {};
});


describe('partial', function () {
  it('() -> identity', function () {
    var f = partial();
    f(arg).should.equal(arg);
  });

  it('(f) -> f', function () {
    var f = partial(fn);
    f.should.equal(fn);
  });

  it('(f, a) -> b -> f(a, b)', function () {
    var f = partial(fn, 1)
    f().should.eql([1])
    f(2).should.eql([1,2])
  });

  it('(f, a, b) -> c -> f(a, b, c)', function () {
    var f = partial(fn, 1, 2)
    f().should.eql([1, 2])
    f(3).should.eql([1,2,3])
  });

  it('(f, a, b, c) -> d -> f(a, b, c, d)', function () {
    var f = partial(fn, 1, 2, 3)
    f().should.eql([1,2,3])
    f(4).should.eql([1,2,3,4])
  });

  it('(f, a, b, c, ...d) -> e -> f(a, b, c, ...d, e)', function () {
    var f = partial(fn, 1, 2, 3, 4, 5)
    f().should.eql([1,2,3,4,5])
    f(6).should.eql([1,2,3,4,5,6])
  });



  it('(fn) -> (a,b) -> fn(a,b)', function () {
    var f = partial(fn)
    f(1,2).should.eql([1,2])
  });

  it('(fn, a) -> (b,c) -> fn(a,b,c,)', function () {
    var f = partial(fn, 1)
    f(2,3).should.eql([1,2,3])
  });

  it('(fn, a, b, c, ...d) -> (e,f) -> fn(a, b, c, ...d, e)', function () {
    var f = partial(fn, 1, 2, 3, 4, 5)
    f(6,7).should.eql([1,2,3,4,5,6,7])
  });
});