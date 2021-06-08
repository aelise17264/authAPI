const Authentication = require('./controllers/authentication');

module.exports = function(app){
    // app.get('/', function(req, res, next){
    //     res.send(['drink water', 'workout', 'no crying'])
    // });
    app.post('/signup', Authentication.signup)
}