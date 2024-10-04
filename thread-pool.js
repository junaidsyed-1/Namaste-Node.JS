const fs = require("fs");
const crypto = require("crypto");

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