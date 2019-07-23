const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    name:{type:String , require:true},
});

module.exports = mongoose.model('Course',courseSchema);