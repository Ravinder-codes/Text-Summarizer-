import mongoose from "mongoose";
const Userinfo=new mongoose.Schema({
    Username:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true,
        match:/^[A-Za-z0-9]+$/,
    },
    All_queries:Array
})

const Pass=mongoose.model("Info",Userinfo)
export default Pass