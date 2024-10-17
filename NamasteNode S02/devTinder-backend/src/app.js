const express = require("express");
const port = 7777;

const app = express();

app.use((req,res) => {
    res.send("Hello world!")
})

app.listen(port, ()=>{
    console.log("app is successfully listening to port:", port);
});