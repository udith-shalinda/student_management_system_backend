const express = require('express');
const StudentCourse = require('../modles/studentCourse');
var mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');


const router = express.Router();

router.post("/check",(req,res,next)=>{
    StudentCourse.aggregate([
        {
            "$match":{
                "studentId": new mongoose.Types.ObjectId(req.body.MyId),
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
    const newStudentCourse = new StudentCourse({
        studentId:req.body.MyId,
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

router.get("/get/:id",(req,res,next)=>{
    // const stId = req.params.id;
    // console.log(stId);
    StudentCourse.aggregate([
        {
            "$match":{
                "studentId": new mongoose.Types.ObjectId(req.params.id),
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
    // StudentCourse.find()
    // .then(result=>{
    //     return res.status(201).json({
    //         message:result,
    //     });
    // });
});

router.post("/studentsInCourse",(req,res,next)=>{
    StudentCourse.aggregate([
        {
            "$match":{
                "courseId": new mongoose.Types.ObjectId(req.body.courseId),
            }
        },
        {
            "$lookup": {
                "from": "userdetails",
                "localField": "studentId",
                "foreignField": "_id",
                "as": "studentDetails"
            },
        }
    ]).then(result=>{
        if(result){
            return res.status(201).json({
                students:result,
                message:"result found"
            });
        }else{
            return res.status(401).json({
                message:"not found"
            });
        }
    });
});

router.post("/addResult",(req,res,next)=>{
    StudentCourse.updateOne(
        {"_id" : req.body.studentCourseId},
        {$set : { "result" : req.body.Result} }
    ).then(result=>{
        if(result.nModified > 0){
            res.status(201).json({massage:'Updated successfully'});
        }else{
            res.status(401).json({
                message:"Auth Failed"
            });
        }
    });
});


module.exports = router;  