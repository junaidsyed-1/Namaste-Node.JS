const express = require("express");
const port = 7777;

const app = express();

app.use( "/dash" ,(req,res) => {
    res.send("Weclome to the Dashboard!")
});

app.use( "/test" ,(req,res) => {
    res.send("Test page!")
});


app.listen(port, ()=>{
    console.log("app is successfully listening to port:", port);
});