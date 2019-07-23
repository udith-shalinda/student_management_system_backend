const mongoose = require('mongoose');

const studentCourseShema = mongoose.Schema({
    studentId:{type:mongoose.Schema.Types.ObjectId , ref:"Student" , require:true},
    courseId:{type:mongoose.Schema.Types.ObjectId , ref:"Course" , require:true},
});

module.exports = mongoose.model('StudentCourse',studentCourseShema);