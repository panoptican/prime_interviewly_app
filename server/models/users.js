var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    username:{type: String, required: true, unique: true},
    email:{type: String, required: true, unique: true},
    password:{type: String, required: true}
});

User.pre('save', function(next){
    var check = this;
    userSchema.findOne({ $or: [{username: this.username}, {email: this.email}]}, function(err, results){
        if(err){
            next(err)
        }else if (results) {
            console.warn('results', results);
            check.invalidate('username', 'username must be unique');
            check.invalidate('email', 'email must be unique');
            if(results.username === check.username) {
                next(new Error('username must be unique'));
            } else{
                next(new Error('email must be unique'));
            }
        }else {
            next();
        }
    })
});

var userSchema = mongoose.model('user', User);

module.exports =  userSchema;