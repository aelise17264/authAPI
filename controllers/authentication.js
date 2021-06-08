const User = require('../models/user');
const mongoose = require('mongoose');

const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user){
    const timestamp = new Date().getTime();
    //subject, issued at time
    return jwt.encode({sub: user.id, iat: timestamp}, config.secret)
}

exports.signin = function(req, res, next){
    //user has already had their email & password auth'd they just need a token
    res.send({token: tokenForUser(req.user)})
}

mongoose.set('useCreateIndex', true)

exports.signup = function(req, res, next){
    const email = req.body.email;
    const password= req.body.password;

    if(!email || !password){
        return res.status(422).send({error: "Email and password are required fields"});
    }

    //see if a user w/ a given email exists
    User.findOne({email: email}, function(error, existingUser){
        if(error){
            return next(error)
        }
    //if a user w/ this email does exists, return an error
        if(existingUser){
            return res.status(422).send({error: 'this email already exists'})//unprocessible request
        }
        
    //if a user w/ email is new, create & save user record
        const user = new User({
            email: email,
            password: password
        })
        user.save(function(error){
            if(error){
                return next(error)
            }
            res.json({token: tokenForUser(user)})
        })

    //respond to request indicating the user was created

    })

}