"use strict";

var config  = require("./../../config/config");

//Crypto 
// var crypto      = require('crypto');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

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

// UserSchema.pre('save', function (next){
//     if (this.password){
//         this.salt = new Buffer(crypto.randomBytes(16).toString('base64'),'base64' );
//         this.password = this.hashPassword(this.password);
//     }
//     next();
// } );
// never save the password in plaintext, always a hash of it
UserSchema.pre("save", function (next) {
    var user = this;

    if (!user.isModified("password")) {
        return next();
    }

    // use bcrypt to generate a salt
    bcrypt.genSalt(SALT_ROUNDS, function (err, salt) {
        if (err) {
            return next(err);
        }

        // using the generated salt, use bcrypt to generate a hash of the password
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                return next(err);
            }

            // store the password hash as the password
            user.password = hash;
            next();
        });
    });
});


UserSchema.methods.hashPassword = function(password){
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};


UserSchema.methods.authenticate = function(password){
    return this.password === this.hashPassword(password);
};


UserSchema.methods.validatePassword = function(password){
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};


// Compile model from schema
var UserModel       = mongoose.model('User', UserSchema );
exports.UserModel   = UserModel;

