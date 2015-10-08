var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    name:{type: String, required: true},
    organizer:{type: String, required: true},
    location:{type: String, required: true},
    description:{type: String, required: true},
    date:{type: Date, required: true},
    startTime:{type: Date, required: true},
    endTime:{type: Date, required: true},
    interviewDuration:{type: String, required: true},
    interviewees:{Type: Array},
    Interviewers:{type: Array}

});