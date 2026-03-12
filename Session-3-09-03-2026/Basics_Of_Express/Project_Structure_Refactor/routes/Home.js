const express = require("express");

const router = express.Router();

router.get("/",(req,res)=>{
    res.send("Welcome to Express!");
})

router.get("/about",(req,res)=>{
    res.json({name: 'My API', version: '1.0' })
})



module.exports =  router;