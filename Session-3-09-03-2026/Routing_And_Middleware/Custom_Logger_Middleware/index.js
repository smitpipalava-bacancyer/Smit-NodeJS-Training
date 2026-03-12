const express = require("express");

require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

const requestLogger = (req, res, next) => {
    const start = Date.now();
    const ts = new Date().toISOString();
    res.on('finish', () => {
        const ms = Date.now() - start;
        
        console.log(ts , req.method , req.originalUrl , res.statusCode , ms)
    });
    next();
};


app.use(requestLogger);

app.get("/",(req,res)=>{
    res.status(200).send("Hello Node-js Training!!");
})
app.listen(PORT, () => {
    console.log(`SERVER STARTED : http://localhost:${PORT}`);
})