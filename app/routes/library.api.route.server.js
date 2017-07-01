"use strict";

const url           = require("url");
const querystring   = require('querystring');
var passport        = require("passport");
var http            = require("http");

//Express and set up router
var express         = require('express');
var router          = express.Router();

//Configs and Modules
var config      = require("./../../config/config");
var mongoExport = require("./../../config/mongo");

//Controllers
// var userController   = require("./../controllers/user.controller.server.js");
var bookController      = require("./../controllers/book.controller.server.js");


function clean(obj){
    for (var propName in obj){
        if(obj[propName] === null || obj[propName] === undefined || obj[propName] === "" ){
            delete obj[propName];
        }
    }
}


router.get("/", function(req, res){
    console.log("Library Route hit");


    var libraryForUser = req.query.username ;
    
    console.log(libraryForUser);

    bookController.lookupAll(function(foundBooks){
        var filteredBooks = foundBooks;
        if(libraryForUser){
            filteredBooks = foundBooks.filter(foundBook => {
            //console.log(foundBook);
            return foundBook.owner.username == libraryForUser;
        } );
        };

        res.write(JSON.stringify(filteredBooks, null, "\t") );
        res.end();
    });
});

module.exports = router;