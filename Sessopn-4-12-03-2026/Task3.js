// 3. Module Export Pitfall 
// Analyze the module: 

// math.js 
exports.add = (a, b) => a + b;
exports = (a, b) => a * b; 

// Another file:
const math = require('./math');
console.log(math.add(2, 3));

// a) What will be the output and why?
// Ans :- Output will be 5 because we first use this syntax which is exports.add which is equivalent to the module.exports.add = add . and in the another file we import the whole file and then use the add method so it works correctly



// b) Explain why assigning a value to exports is a problem.
// Ans :- because when we assigning something to exports like this exports = something then it completely changes the reference if we didn't assigning something then exports === module.exports and node file always use module.exports . so this line will not executed exports = (a,b) => a * b; 



// c) Rewrite the module correctly so both add and multiply functions are exported.

// math.js
const add = (a,b)=>{
    return a + b;
}
const multiply = (a,b)=>{
    return a * b;
}
module.exports =  {add , multiply}

// Another File :
const { add , multiply}  = require("./Math");

console.log(add(2,3));
console.log(multiply(2,3));