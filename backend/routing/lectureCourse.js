const express = require('express');
const bcript = require('bcrypt');
const LectureCourse = require('../modles/lectureCourse');
// const jwt = require('jsonwebtoken');


const router = express.Router();

router.post("/add",(req,res,next)=>{
    const newLectureCourse = new LectureCourse({
        lectureId:req.body.id,
        courseId:req.body.courseId,
    });
    newLectureCourse.save().then((result)=>{
        if(result){
           return res.status(201).json({
                message:"new lectureCourse added successfully",
                courseId:result._id
            });
        }else{
            return res.status(401).json({
                message:"lectureCourse added failed"
            })
        }
    }).catch(err=>{
        return res.status(500).json({
            message:"error"
        });
    });
});


module.exports = router;  