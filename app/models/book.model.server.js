"use strict";

var config  = require("./../../config/config");


// mongo
var mongo               = require("mongodb").MongoClient;
var mongoUrl            = config.mongoUrl //|| `mongodb://localhost:${mongoPort}/${mongoDatabase}`;

// Mongoose
//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
//Import the mongoose module
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(mongoUrl);
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//Define a schema
var Schema = mongoose.Schema;

var BookSchema = new Schema({
    authors: Array,
    title: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    thumbnailUrl: {
        type: String,
        required: true
    },
	usersRequestingTrade: Array

});

// Compile model from schema
var BookModel       = mongoose.model('Book', BookSchema );
exports.BookModel   = BookModel;
