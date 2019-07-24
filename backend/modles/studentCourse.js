const mongoose = require('mongoose');

const studentCourseShema = mongoose.Schema({
    studentId:{type:mongoose.Schema.Types.ObjectId , ref:"userDetails" , require:true},
    courseId:{type:mongoose.Schema.Types.ObjectId , ref:"Course" , require:true},
    result:{type:String,require:true}
});

module.exports = mongoose.model('StudentCourse',studentCourseShema);