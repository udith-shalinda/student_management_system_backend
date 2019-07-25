const express = require('express');
const bcript = require('bcrypt');
const UserDetails = require('../modles/userDetails');
// const jwt = require('jsonwebtoken');


const router = express.Router();

router.post("/add",(req,res,next)=>{
    const newLecture = new UserDetails({
        name:req.body.name,
        mobile:req.body.mobile,
        creater:req.body.creater    //may be we can use token id as well  
    });
    newLecture.save().then((result)=>{
        if(result){
           return res.status(201).json({
                message:"userdetails added successfully",
                userDetailsId:result._id
            });
        }else{
            return res.status(401).json({
                message:"lecture added failed"
            })
        }
    }).catch(err=>{
        return res.status(500).json({
            message:"User email is already taken"
        });
    });
});



module.exports = router;  