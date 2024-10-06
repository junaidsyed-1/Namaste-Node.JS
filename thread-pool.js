const fs = require("fs");
const crypto = require("crypto");

// process.env.UV_THREADPOOL_SIZE = 6;

crypto.pbkdf2("password", "salt", 500000, 50, "sha512", (err,key) => {
    console.log("1 - cyptoPBKDF2 done");
});

crypto.pbkdf2("password", "salt", 500000, 50, "sha512", (err,key) => {
    console.log("2 - cyptoPBKDF2 done");
});

crypto.pbkdf2("password", "salt", 500000, 50, "sha512", (err,key) => {
    console.log("3 - cyptoPBKDF2 done");
});

crypto.pbkdf2("password", "salt", 500000, 50, "sha512", (err,key) => {
    console.log("4 - cyptoPBKDF2 done");
});

crypto.pbkdf2("password", "salt", 500000, 50, "sha512", (err,key) => {
    console.log("5 - cyptoPBKDF2 done"); 
});


// By default thread pool size of libuv is 4, and yes we can change the size of the thread pool