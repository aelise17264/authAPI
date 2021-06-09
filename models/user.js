const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//define our schema modle
const userSchema = new Schema({
    email: {type: String, unique: true}, //to avoid repeats of the same email address
    password: String
});

userSchema.methods.comparePassword = function(candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err){
            return cb(err)
        }
        cb(null, isMatch)
    });
}

//on save hook encrypt password
//before saving a model, run this function
userSchema.pre('save', function(next){
    //access to the user model, user is an instance of the user model
    const user = this;

    //generate a salt then run cb
    bcrypt.genSalt(10, function(err, salt){
        if(err){
            return next(err);
        }
        //hash our password using the salt
        bcrypt.hash(user.password, salt, null, function(err, hash){
            if(err){
                return next(err);
            }
            //overwrite plain text password w/ encrypted password
            user.password = hash;
            next();
        });
    });
});



//create the model class
const ModelClass = mongoose.model('user', userSchema);

//export the model so the app can use it
module.exports = ModelClass;