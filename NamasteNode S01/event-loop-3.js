const fs = require('fs');
const a = 1000;

setImmediate(() => console.log("setImmediate"));

setTimeout(() => console.log("Timer Expired"), 0);

Promise.resolve("Promise").then(console.log)

fs.readFile("./text.txt", "utf8", ()=> {
    
    setTimeout(() => console.log("2nd timer"), 0);

    process.nextTick(() => console.log("2nd nextTick"));

    setImmediate(() => console.log("2nd setImmediate"));

    console.log("File Reading CB");
});

process.nextTick(()=> console.log("process.nextTick()"));

function printA(){
    console.log("a=",a);
};

printA();
console.log("Last line of the code");

// Output ----------
// a= 1000
// Last line of the code
// process.nextTick()
// Promise
// Timer Expired
// setImmediate
// File reading CB
  // 2nd nextTick
  // 2nd setImmediate
  // 2nd timer