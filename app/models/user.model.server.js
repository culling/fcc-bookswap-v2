"use strict";

var config  = require("./../../config/config");

//Crypto 
var crypto      = require('crypto');

// mongo
var mongo               = require("mongodb").MongoClient;
var mongoUrl            = config.mongoUrl;

// Mongoose
//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
//Import the mongoose module
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// mongoose.connect(mongoUrl);
mongoose.connect("mongodb+srv://admin_1:W4cHLBX8CGOHiQmQ@cluster0.t7ruf.mongodb.net/fcc_bookswap?retryWrites=true&w=majority");
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//Define a schema
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    username            : {
        type: String,
        unique: true,
        required: true
    },
    password            : {
        type: String,
        unique: true,
        required: true
    },
    email               : String,
    salt                : String,
    firstName           : String,
    lastName            : String,    
    type                : String,
    city                : String,
    state               : String,
    country             : String,
    messages            : Array
});

UserSchema.pre('save', function (next){
    if (this.password){
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'),'base64' );
        this.password = this.hashPassword(this.password);
    }
    next();
} );


UserSchema.methods.isPasswordValid = function (rawPassword, callback) {
    bcrypt.compare(rawPassword, this.password, function (err, same) {
        if (err) {
            callback(err);
        }
        callback(null, same);
    });
};



// UserSchema.methods.hashPassword = function(password){
//     return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
// };


UserSchema.methods.authenticate = function(password){
    UserSchema.methods.isPasswordValid(password, (err, isValid)=>{
        if(err != null){
            return false;
        }
        return isValid;
    });
};


UserSchema.methods.validatePassword = function(password){
    UserSchema.methods.isPasswordValid(password, (err, isValid)=>{
        if(err != null){
            return false;
        }
        return isValid;
    });
};


// Compile model from schema
var UserModel       = mongoose.model('User', UserSchema );
exports.UserModel   = UserModel;

