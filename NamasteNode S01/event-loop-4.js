const fs = require('fs');

setImmediate(() => console.log("setImmediate"));

setTimeout(() => console.log("Timer Expired"), 0);

Promise.resolve("Promise").then(console.log)

fs.readFile("./text.txt", "utf8", ()=> {
    console.log("File Reading CB");
});

process.nextTick(()=> {
    process.nextTick(() => console.log("innerTick"))
    console.log("process.nextTick()")
});

console.log("Last line of the code");