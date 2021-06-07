const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define our schema modle
const userSchema = new Schema({
    email: String,
    password: String
});

//create the model class


//export the model so the app can use it