const mongoose=require('mongoose')
const{ObjectId}=mongoose.Schema.Types
const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    likes: [{ type: mongoose.Schema.Types.ObjectID, ref: "User" }],
    comments:[{
        text:String,
        postedBy:{type:mongoose.Schema.Types.ObjectID,ref:"User"}
    }],
    postedBy:{
        type:mongoose.Schema.Types.ObjectID,
        ref:"User"
    
    }
})
mongoose.model("Post",postSchema)