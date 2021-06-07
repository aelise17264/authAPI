const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define our schema modle
const userSchema = new Schema({
    email: {type: String, unique: true}, //to avoid repeats of the same email address
    password: String
});

//create the model class
const ModelClass = mongoose.model('user', userSchema);

//export the model so the app can use it
module.exports = ModelClass;