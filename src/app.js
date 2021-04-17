const { Router } = require("express");
const express= require("express");
const app=express();

const studentrouter=require("./routers/student");
require("./db/conn");

const Student = require("./models/students");
const port = process.env.PORT || 3000;
app.use(express.json());

//Register Router
app.use(studentrouter);

app.listen(port,()=>{
    console.log(`Connection success at port ${port}`);
});