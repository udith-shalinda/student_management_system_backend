const express = require('express');
const bcript = require('bcrypt');
const User = require('../modles/user');
const jwt = require('jsonwebtoken');
// var mongoose = require('mongoose');



const router = express.Router();

router.post("/signup",(req,res,next)=>{
    bcript.hash(req.body.password,10)
    .then(hash =>{
        const user = new User({
            email:req.body.email,
            password:hash,
            type:req.body.type
        });
        user.save().then(result=>{
            if(result){
                const token = jwt.sign(
                    {email:result.email,
                    userId:result._id },
                    "secret_this_should_be_longer",
                    {expiresIn:"1h"}
                ); 
                res.status(201).json({
                    token:token,
                    userId:result._id
                });
            }
        }).catch(err=>{
            res.status(500).json({
                message:"User email is already taken"
            })
        });
    })
});

router.post("/login",(req,res,next)=>{
    let fetchUser;
    let errorMessage;
    let userDetailsId;

    User.aggregate([
        {
            "$match":{
                "email": req.body.email,
            }
        },
        {
            "$lookup": {
                "from": "userdetails",
                "localField": "_id",
                "foreignField": "creater",
                "as": "userDetails"
            },
        }
    ])
    .then(user=>{
        if(!user[0]){
            errorMessage = "Email";
            return res.status(401).json({
                message : "Email"
            });
        }
        fetchUser = user[0];
        userDetailsId = user[0]['userDetails'][0]['_id'];
        return bcript.compare(req.body.password,user[0].password)
    })
    .then(result=>{
        if(!result){
            errorMessage = "Password";
            return res.status(401).json({
                message : "Password"
            });
        }
        const token = jwt.sign(
            {email:fetchUser.email,
            userId:fetchUser._id },
            "secret_this_should_be_longer",
            {expiresIn:"1h"}
        ); 
        res.status(201).json({
            token :token,
            userId:fetchUser._id,
            type:fetchUser.type,
            userDetailsId:userDetailsId
        });
    }).catch(err=>{
        return res.status(401).json({
            message : errorMessage
        });
    });
});

module.exports = router;    