const express = require("express");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.status(200).send("HELLO EXPRESS");
})

app.get("/about",(req,res)=>{
    res.status(200).json({ name: 'My API', version: '1.0' });
});

app.listen(process.env.PORT || 3000,()=>{
    console.log(`SERVER STARTED ON : http://localhost:${PORT}`);
})