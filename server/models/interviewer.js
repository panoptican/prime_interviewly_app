var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Interviewer = new Schema({
    title:{type: String, required: true},
    fName:{type: String, required:true},
    lName:{type: String, required: true},
    email:{type: String, required: true, unique: true},
    company: {type: String, required: true}
});

var interviewerSchema = mongoose.model('interviewer', Interviewer);

module.exports =  interviewerSchema;