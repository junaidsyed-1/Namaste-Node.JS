const express = require("express");
const port = 7777;

const app = express();

app.get("/user/:userID/:name", (req,res ) => {
    res.send({
        firstName: "Junaid",
        lastName: "Syed"
    });
    console.log(req.params)
});

app.listen(port, ()=>{
    console.log("app is successfully listening to port:", port);
});