"use strict";

var config  = require("./../../config/config");

// mongo
var mongo               = require("mongodb").MongoClient;
var mongoPort           = config.mongoPort;
var mongoDatabase       = config.mongoDatabase;
//var collectionName      = "users";
var mongoUrl            = process.env.MONGODB_URI //|| `mongodb://localhost:${mongoPort}/${mongoDatabase}`;

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
    title: String,
    owner: {type: Schema.Types.ObjectId, ref: "User" },
    thumbnailUrl: String,
    ISBN_13: String,
    ISBN_10: String,
	usersRequestingTrade: Array

});

// Compile model from schema
var BookModel       = mongoose.model('Book', BookSchema );
exports.BookModel   = BookModel;

/*
exports.findAll = function(cb){
    BookModel.find()
	.populate("owner")
    .exec(
        function(err, results){
            if(err) return handleError(err);
            cb(results);
        }
    );
};

exports.updateBook = function(book){
	BookModel.findOne({ _id: book._id }, function (err, doc){
		doc.save();
	});
}
*/