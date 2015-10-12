var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Student = new Schema({
    fName: {type: String, required: true},
    lName: {type: String, required: true},
    cohort: {type: String, required: true},
    email: {type: String},
    preferences: {type: Array}
});

var studentSchema = mongoose.model('student', Student);

module.exports =  studentSchema;