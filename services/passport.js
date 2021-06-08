const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//local strategy
const localOptions = {usernameField: 'email'}
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
    //verify username & password, call done w/ the user if it is the corrected user info
    //otherwise call done w/ false

});

//set up options for JWT strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

//Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
//see if the new user ID in the payload exists in our db
//if it does call 'done' w/ that other
//otherwise call 'done' w/o a user object
    User.findById(payload.sub, function(err, user){
        if(err){
            return done(err, false); //this user is not authenticated
        }

        if(user){
            done(null, user);
        }else{
            done(null, false);//search failed
        }
    })
})

// Tell passport to use this strategy
passport.use(jwtLogin)