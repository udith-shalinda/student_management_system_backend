const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    name:{type:String , require:true},
    mobile:{type:String , require:true},
    creater:{type:mongoose.Schema.Types.ObjectId , ref:"User" , require:true}
});

module.exports = mongoose.model('Student',studentSchema);