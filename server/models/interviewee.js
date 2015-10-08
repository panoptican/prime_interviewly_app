var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IntervieweeSchema = new Schema({
    fName: {type: String, required: true},
    lName: {type: String, required: true},
    cohort: {type: String, required: true},
    email: {type: String, required: true},
    preferences: {type: Array}
});