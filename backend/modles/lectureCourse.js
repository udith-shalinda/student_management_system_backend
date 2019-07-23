const mongoose = require('mongoose');

const lectureCourseSchema = mongoose.Schema({
    lectureId:{type:mongoose.Schema.Types.ObjectId , ref:"Lecture" , require:true},
    courseId:{type:mongoose.Schema.Types.ObjectId , ref:"Course" , require:true},
});

module.exports = mongoose.model('LectureCourse',lectureCourseSchema);