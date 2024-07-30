const express=require('express')
const router=express.Router()
const mongoose =require('mongoose')
const requireLogin=require('../middlerware/requireLogin')
const Post=mongoose.model("Post")
const User = mongoose.model("User")

router.get("/user/:id", requireLogin, async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id }).select("-password");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const posts = await Post.find({ postedBy: req.params.id }).populate(
        "postedBy",
        "_id name"
      );
      res.json({ user, posts });
    } catch (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
router.put('/follow',requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user._id}
        }
        ,{
            new:true
        },(err,result)=>{
            if(err){
return res.status(422).json({error:err})
            }
            User.findByIdAndUpdate(req.user._id,{
                $push:{following:req.body.followId}
            },{new:true}).then(result=>{
                res.json(result)
            }).catch (err=>{
            return res.status(422).json({error:err})
            })

})
    
    })
router.put('/unfollow',requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.unfollowIdfollowId,{
        $pull:{followers:req.user._id}
        }
        ,{
            new:true
        },(err,result)=>{
            if(err){
return res.status(422).json({error:err})
            }
            User.findByIdAndUpdate(req.user._id,{
                $pull:{following:req.body.unfollowId}
            },{new:true}).then(result=>{
                res.json(result)
            }).catch (err=>{
            return res.status(422).json({error:err})
            })

})
    
    })



module.exports = router