import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import Pass from "./Models/schema.js"
const app=express()
const port=3000
app.use(cors())
app.use(express.json()); 

let database=await mongoose.connect("mongodb://localhost:27017/Info")

app.get("/",(req,res)=>{
    res.json({data:"hello"})
})

app.post("/saveinfo",async(req,res)=>{
    const data=new Pass({Username:req.body.Username,Password:req.body.Password,All_queries:[]})
    await data.save()
    res.json({data:String(data._id)})
})
app.post("/updatedetails",async(req,res)=>{
    const data=await Pass.findById(req.body.id)
    if (data==null){
        res.json({data:"no user"})
    }
    else{
        data.All_queries=req.body.All_query
        await data.save()
        res.json({data:"successfully"})
    }
})
app.post("/checkinfo",async(req,res)=>{
    const data=await Pass.findOne({Username:req.body.Username,Password:req.body.Password})
    if (data){
        res.json({All_query:data.All_queries,id:data._id,var:true})
        
    }
    else{
        res.json({var:false})
    }
})
app.listen(port,()=>{
    console.log(`listining on the http://localhost:${port}`)
})