const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false}); //don't make a cookie b/c we're using tokens

module.exports = function(app){
    app.get('/', requireAuth, function(req, res){
        res.send({hello: 'General Kenobi'})
    });

    app.post('/signup', Authentication.signup);
}