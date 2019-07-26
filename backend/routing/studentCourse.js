const express = require('express');
const StudentCourse = require('../modles/studentCourse');
// const jwt = require('jsonwebtoken');


const router = express.Router();

router.post("/add",(req,res,next)=>{
    const newStudentCourse = new StudentCourse({
        studentId:req.body.id,
        courseId:req.body.courseId,
        result:'-',
    });
    newStudentCourse.save().then((result)=>{
        if(result){
           return res.status(201).json({
                message:"new StudentCourse added successfully",
                studentCourseId:result._id
            });
        }else{
            return res.status(401).json({
                message:"StudentCourse added failed"
            })
        }
    }).catch(err=>{
        return res.status(500).json({
            message:"error"
        });
    });
});


module.exports = router;  