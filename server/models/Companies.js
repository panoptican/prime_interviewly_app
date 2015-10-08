var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompanySchema = new Schema({
    company: {type: String, required: true},
    description: {type: String, required:true},
    recruiters: {type: Array}
});
