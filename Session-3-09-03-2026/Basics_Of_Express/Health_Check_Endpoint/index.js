const express = require("express");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/health" , (req,res)=>{
    res.json( { status: 'OK', uptime: process.uptime(), timestamp: new Date().toISOString() })
})

app.get("/info" , (req,res)=>{
    res.json(  { node: process.version, platform: process.platform })
})

app.get("/env",(req,res)=>{
    res.json( { environment: process.env.NODE_ENV || 'development' })
})

app.listen(PORT,()=>{
    console.log(`SERVER STARTED ON : http://localhost:${PORT}`);
})