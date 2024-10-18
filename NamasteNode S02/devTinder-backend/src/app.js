const express = require("express");
const port = 7777;

const app = express();

app.get("/user", (req,res ) => {
    res.send({
        firstName: "Junaid",
        lastName: "Syed"
    })
});

app.post("/user", (req,res) => {
    res.send("Data saved successfully")
});

app.delete("/user", (req,res) => {
    res.send("Data deleted successfully")
});

app.use( "/test" ,(req,res) => {
    res.send("Test page!")
});


app.listen(port, ()=>{
    console.log("app is successfully listening to port:", port);
});