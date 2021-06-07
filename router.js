module.exports = function(app){
    app.get('/', function(req, res, next){
        res.send(['drink water', 'workout', 'no crying'])
    });
}