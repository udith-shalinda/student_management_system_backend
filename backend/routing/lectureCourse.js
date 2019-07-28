const express = require('express');
const bcript = require('bcrypt');
const LectureCourse = require('../modles/lectureCourse');
var mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');


const router = express.Router();

router.post("/check",(req,res,next)=>{
    LectureCourse.aggregate([
        {
            "$match":{
                "lectureId": new mongoose.Types.ObjectId(req.body.MyId),
                "courseId" :new mongoose.Types.ObjectId(req.body.courseId),
            }
        }     
    ]).then(result=>{
        if(result){
            return res.status(201).json({
                courses:result,
                message:"result found"
            });
        }else{
            return res.status(401).json({
                message:"not found"
            });
        }
    });
    
});

router.post("/add",(req,res,next)=>{
    const newLectureCourse = new LectureCourse({
        lectureId:req.body.MyId,
        courseId:req.body.courseId,
    });
    newLectureCourse.save().then((result)=>{
        if(result){
           return res.status(201).json({
                message:"new lectureCourse added successfully",
                lectureCourseId:result._id
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

router.get("/get/:id",(req,res,next)=>{
    // const stId = req.params.id;
    // console.log(stId);
    LectureCourse.aggregate([
        {
            "$match":{
                "lectureId": new mongoose.Types.ObjectId(req.params.id),
            }
        },
        {
            "$lookup": {
                "from": "courses",
                "localField": "courseId",
                "foreignField": "_id",
                "as": "courseDetails"
            },
        }
    ]).then(result=>{
        if(result){
            return res.status(201).json({
                courses:result,
                message:"result found"
            });
        }else{
            return res.status(401).json({
                message:"not found"
            });
        }
    });
});


module.exports = router;  