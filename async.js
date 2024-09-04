const https = require('https');
const fs = require('fs');

console.log('hello world');

var a = 31394;

var b = 234;

https.get("https://dummyjson.com/products", (res) => {
    console.log("Data fetched successfully");
});

setTimeout(()=>{
    console.log("Timer");
},4000);

fs.readFile("./text.txt", 'utf-8' ,(err, data) => {
    console.log("File data: ", data)
})


function multiply (a,b) {
    const result = a * b;
    return result;
}

var c = multiply(a,b);

console.log("Multipliction of a and b is: ", c);