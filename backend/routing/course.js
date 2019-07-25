const express = require('express');
const bcript = require('bcrypt');
const Course = require('../modles/course');
// const jwt = require('jsonwebtoken');


const router = express.Router();

router.post("/add",(req,res,next)=>{
    const newCourse = new Course({
        name:req.body.courseName,
        hours:req.body.hours,
        credit:req.body.credit,
        courseCode:req.body.courseCode
    });
    newCourse.save().then((result)=>{
        if(result){
           return res.status(201).json({
                message:"new course added successfully",
                courseId:result._id
            });
        }else{
            return res.status(401).json({
                message:"course added failed"
            })
        }
    }).catch(err=>{
        return res.status(500).json({
            message:"error"
        });
    });
});



module.exports = router;  