const mongoose = require('mongoose');

const lectureSchema = mongoose.Schema({
    name:{type:String , require:true},
    mobile:{type:String , require:true},
    creater:{type:mongoose.Schema.Types.ObjectId , ref:"User" , require:true}
});

module.exports = mongoose.model('Lecture',lectureSchema);