const express=require('express');
const Student = require("../models/students");
//Create Router
const router = new express.Router();


router.get("/ron",(req,res)=>{
    res.send("Router Running");
});

router.get("/students/:name",async(req,res)=>{
    try{
        const names = req.params.name;
        const data= await Student.find({name:names});
        if(!data)
        {
            return res.status(404).send();
        }
        else{
        res.send(data);
        console.log(data);
        }
    }
    catch(e)
    {
        res.status(500).send(e);
    }
})
router.get("/students",async (req,res)=>{
    try{
        const data=await Student.find();
        res.send(data);
    }
    catch(e){
        res.send(e);
    }
});
router.post("/students",(req,res)=>{
    console.log(req.body);
    const user = new Student(req.body);
    user.save().then(()=>{
        res.status(201);
        res.send(user);
    }).catch((e)=>{
        res.send(e);
    })
});

router.delete("/students/:id",async (req,res)=>{
    try{
        const ids=req.params.id;
        const result=await Student.findByIdAndDelete(ids);
        if(!result)
        {
            return res.status(404).send();
        }
        res.send(result);
    }
    catch(e)
    {
        res.status(500).send(e);
    }
})

router.patch("/students/:names",async (req,res)=>{
    try{
        const name=req.params.names;
        const result=await Student.updateOne({name},req.body,{
            new:true
        });
        res.send(result);
    }
    catch(e)
    {
        res.status(404).send(result);
    }
})


module.exports=router;