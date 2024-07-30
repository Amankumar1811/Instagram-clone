const express=require('express')
const router=express.Router()
const mongoose =require('mongoose')
const requireLogin=require('../middlerware/requireLogin')
const Post=mongoose.model("Post")


router.get('/allpost',requireLogin,(req,res)=>{
    Post.find()
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})


router.post('/createpost',requireLogin,(req,res)=>{
    const{title,body,pic}=req.body
    
    if(!title|| !body||!pic){
        return res.status(422).json({error:"please add all the fields"})
    }
    req.user.password=undefined
    const post =new Post({
        title,
        body,
       photo: pic,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log
    })
})
router.get('/mypost',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(myposts=>{
        res.json({myposts})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.put("/like", requireLogin, (req, res) => {
    Post.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { likes: req.user._id }, // pushing loggedin user to our likes array
      },
      {
        new: true, // for new updated record
      }
    )
      .populate("postedBy", "_id name pic")
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        return res.status(422).json({ error: err });
      });
  });

  router.put("/unlike", requireLogin, (req, res) => {
    Post.findByIdAndUpdate(
      req.body.postId,
      {
        $pull: { likes: req.user._id }, // pulling loggedin user to our likes array
      },
      {
        new: true, // for new updated record
      }
    )
      .populate("postedBy", "_id name pic")
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        return res.status(422).json({ error: err });
      });
  }); 
  router.put("/comment", requireLogin, (req, res) => {
    const comment = {
      text: req.body.text,
      postedBy: req.user._id,
    };
    Post.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { comments: comment }, // pushing loggedin user to our likes array
      },
      {
        new: true, // for new updated record
      }
    )
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name pic")
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        return res.status(422).json({ error: err });
      });
  });
  
  router.delete("/deletepost/:postId",requireLogin, async (req,res)=>{
    try{
   const post = await Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    
      
    if (!post) {
      return res.status(422).json({ error: "Post not found" });
    }

    if (post.postedBy._id.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: "Unauthorized access" });
      }
  
      const result = await post.deleteOne();
      res.json(result);
      
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    
  })
  


module.exports = router