const fs = require('fs');
const a = 1000;

setImmediate(() => console.log("setImmediate"));

Promise.resolve("Promise").then(console.log)

fs.readFile("./text.txt", "utf8", ()=> {
    console.log("File reading CB");
});

setTimeout(() => console.log("Timer Expired"), 0);

process.nextTick(()=> console.log("process.nextTick()"));

function printA(){
    console.log("a=",a);
};

printA();
console.log("Last line of the code");

// Output
//  a= 1000
// Last line of the code
// process.nextTick()
// Promise
// Timer Expired
// setImmediate
// File reading CB