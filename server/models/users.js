var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    jsonwebtoken = require('jsonwebtoken'),
    SALT_WORK_FACTOR = 12,
    MAX_LOGIN_ATTEMPTS = 5,
    LOCK_TIME = 1200000;



var User = new Schema({
    username:{type: String, required: true, index: {unique: true}},
    email:{type: String, required: true, unique: true},
    password:{type: String, required: true}
});

User.pre('save', function(next){
    var user = this;
    userSchema.findOne({ $or: [{username: this.username}, {email: this.email}]}, function(err, results){
        if(err){
            next(err)
        } else if (results) {
            console.warn('results', results);
            user.invalidate('username', 'username must be unique');
            user.invalidate('email', 'email must be unique');
            if(results.username === user.username) {
                next(new Error('username must be unique'));
            } else{
                next(new Error('email must be unique'));
            }
        }else {
            if(!user.isModified('password')) return next();
            bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
                if(err) return (err);
                bcrypt.hash(user.password, salt, function(err, hash){
                    if(err) return(err);
                    user.password = hash;
                    next();
                })
            });

        }
    })
});

User.methods.comparePassword = function (candidatePassword, callback) {
    console.log(candidatePassword);
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        console.log(isMatch);
        if (err) return callback(err);
        return callback(null, isMatch);
    });
};

User.statics.getAuthenticated = function (user, callback) {
    console.log('getAuthenticated', user);
    this.findOne({username: user.username}, function (err, doc) {
        if (err) {
            console.log(err);
            return callback(err);
        }

        // make sure the user exists
        else if (!doc) {
            console.log('No user found,');
            return callback(new Error('Invalid username or password.', 401), null);
        }
        else {
            // test for a matching password
            doc.comparePassword(user.password, function (err, isMatch) {
                if (err) {
                    console.log(err);
                    return callback(err);
                }

                // check if the password was a match
                if (isMatch) {

                    // return the jwt
                    var token = jsonwebtoken.sign(doc, 'taylorisawesome', {
                        expiresInMinutes: 1440 // expires in 24 hours
                    });
                    return callback(null, token, doc);
                }
                else {
                    return callback(new Error('Invalid username or password.'), null);

                }
            });
        }
    });
};

var userSchema = mongoose.model('user', User);

module.exports =  userSchema;