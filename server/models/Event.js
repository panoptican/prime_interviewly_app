var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Event = new Schema({
    name:{type: String, required: true},
    organizer:{type: String, required: true},
    location:{type: String, required: true},
    description:{type: String, required: true},
    date:{type: Date, required: true},
    startTime:{type: String, required: true},
    endTime:{type: String, required: true},
    interviewDuration:{type: Number, required: true},
    students:{type: Array},
    Interviewers:{type: Array}

});

var eventSchema = mongoose.model('event', Event);

module.exports =  eventSchema;