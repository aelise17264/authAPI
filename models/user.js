const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

//define our schema modle
const userSchema = new Schema({
    email: {type: String, unique: true}, //to avoid repeats of the same email address
    password: String
});

//on save hook encrypt password
userSchema.pre('save', function(next){
    const user = this;
    bcrypt.genSalt(10, function(err, salt){
        if(err){
            return next(err);
        }
        bcrypt.hash(user.password, salt, null, function(err, hash){
            if(err){
                return next(err);
            }
            user.password = hash;
            next();
        })
    })
})

//create the model class
const ModelClass = mongoose.model('user', userSchema);

//export the model so the app can use it
module.exports = ModelClass;