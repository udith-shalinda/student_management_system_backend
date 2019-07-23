const mongoose = require('mongoose');

const teachSchema = mongoose.Schema({
    lectureId:{type:mongoose.Schema.Types.ObjectId , ref:"Lecture" , require:true},
    courseId:{type:mongoose.Schema.Types.ObjectId , ref:"Course" , require:true}
});

module.exports = mongoose.model('Teach',teachSchema);