var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newSchema = new Schema({
    company: {type: String, required: true},
    description: {type: String, required:true},
    recruiters: {type: Array}
});

var companySchema = mongoose.model('company', newSchema);

module.exports =  companySchema;