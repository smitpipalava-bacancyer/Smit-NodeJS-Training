// 4. . Debugging Execution Order 
// Predict the output order of this program: 

console.log("Start");
setTimeout(() => {
    console.log("Timeout");
}, 0);
Promise.resolve().then(() => {
    console.log("Promise");
});

console.log("End");

// a) What will be the exact output order?
// Ans :- start end promise timeout


// b) Explain why this order occurs in Node.js.
/* Ans :- because the node.js first executes the synchronous code so first console.log() line executes then the next priority is goes to the nextTick() but there is no any nextTick() so it goes to the microTaskqueue

then microtaskqueue runs and promises goes inside it and after the callstack becomes empty then first microtaskqueue executes all things which is inside it.

then macrotaskqueue runs and before it check that callstack and microtaskqueue is empty or not then and only then it executes all the things which is inside it.

*/


// c) Which mechanism executes first: microtasks or callbacks? 
/*
Ans :-because when node.js executes it first executes the synchronous code and then it goes to execute microTasksqueue . and then it goes to execute the macroTaskqueue . so callbacks goes to the macroTaskqueue. so it executes later


*/