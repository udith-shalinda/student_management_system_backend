const mongoose = require('mongoose');

const userDetailsSchema = mongoose.Schema({
    name:{type:String , require:true},
    mobile:{type:String , require:true},
    creater:{type:mongoose.Schema.Types.ObjectId , ref:"User" , require:true}
});

module.exports = mongoose.model('UserDetails',userDetailsSchema);