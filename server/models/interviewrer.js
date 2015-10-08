var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InterviewerSchema = new Schema({
    fName:{type: String, required:true},
    lName:{type: String, required: true},
    email:{type: String, required: true},
    bio: {type: String, required: false}
});