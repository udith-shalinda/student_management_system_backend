const express = require('express');
const bcript = require('bcrypt');
const Lecture = require('../modles/lecture');
const jwt = require('jsonwebtoken');


const router = express.Router();

router.post("/add",(req,res,next)=>{
    const newLecture = new Lecture({
        name:req.body.name,
        mobile:req.body.mobile,
        creader:req.body.creader    //may be we can use token id as well  
    });
    newLecture.save().then((result)=>{
        if(result){
           return res.status(201).json({
                message:"lecture added successfully"
            });
        }else{
            return res.status(401).json({
                message:"lecture added failed"
            })
        }
    }).catch(err=>{
        res.status(500).json({
            message:"User email is already taken"
        })
    });
});



module.exports = router;  