var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Student = new Schema({
    fName: String,
    lName: String,
    cohort: String,
    email: String,
    preferences: Array
});

var studentSchema = mongoose.model('student', Student);

module.exports =  studentSchema;