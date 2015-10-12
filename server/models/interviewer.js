var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Interviewer = new Schema({
    fName: {type: String, required:true},
    lName: String,
    title: String,
    email: {type: String, required: true},
    company: {type: String, required: true},
    unavailable: Array
});

var interviewerSchema = mongoose.model('interviewer', Interviewer);

module.exports =  interviewerSchema;