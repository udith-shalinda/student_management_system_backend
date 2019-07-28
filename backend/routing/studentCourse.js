const express = require('express');
const StudentCourse = require('../modles/studentCourse');
// const jwt = require('jsonwebtoken');


const router = express.Router();

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


module.exports = router;  