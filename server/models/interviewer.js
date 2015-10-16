var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Interviewer = new Schema({
    title: String,
    fName: String,
    lName: String,
    email: String,
    company: String,
    unavailable: Array
});

var interviewerSchema = mongoose.model('interviewer', Interviewer);

module.exports =  interviewerSchema;