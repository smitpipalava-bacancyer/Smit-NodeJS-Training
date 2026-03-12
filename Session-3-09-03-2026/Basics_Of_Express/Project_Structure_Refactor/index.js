const express = require("express");
const app = express();


require("dotenv").config();

const PORT = process.env.PORT || 3000;

const HomeRoutes = require("./routes/Home");
const ApiRoutes = require("./routes/api");

app.use('/',HomeRoutes);
app.use('/api',ApiRoutes);

app.listen(PORT,()=>{
    console.log(`SERVER STARTED ON : http://localhost:${PORT}`);
})