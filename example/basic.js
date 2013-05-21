var compose = require('funcy')
var partial = compose.partial
var partialR = compose.partialRight
var curry = compose.curry

var add = function(a, b){
	return a + b;
}
var div = function(a,b){
	return a / b;
}
var plus = curry(add)
var plus2 = partial(add, 2)
var plus3 = partial(add, 3)

console.log( 'partial', partial(div, 10)(2) )
console.log( 'partialRight', partialR(div, 2)(5) )
console.log( 'compose', compose( plus3, plus2 )(1) )
console.log( 'curry', plus(1)(2) )
