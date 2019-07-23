const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
    name:{type:String , require:true},
});

module.exports = mongoose.model('Department',departmentSchema);