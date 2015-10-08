var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newSchema = new Schema({
    username:{type: String, required: true},
    email:{type: String, required: true},
    password:{type: String, required: true}
});

var userSchema = mongoose.model('user', newSchema);

module.exports =  userSchema;