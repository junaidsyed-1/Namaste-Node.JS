// Node js provides a global object and it is not a part of V8, It is inside Node js like there are more super powers other than V8.

const obj = require('./sum.js');

obj.calculteSum(2,2);

console.log(obj.x)

console.log("This is app")