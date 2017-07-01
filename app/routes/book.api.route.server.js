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



//Books
router.get("/all", function(req, res){
    console.log("/api/book/all hit" );
    //console.log( req.query);    
    bookController.lookupAll(function(found){
        res.write( JSON.stringify( found, null, "\t") );
        res.end();
    });

});

router.get("/", function(req, res){
    console.log("/api/book hit" );
    //console.log( req.query);

    if(req.query.title){
        bookController.lookup(req.query.title, function(found){
            //res.send(found);
            res.write( JSON.stringify( JSON.parse(found), null, "\t") );
            res.end();
        });        
    }else{
        res.end();
    }
});

router.post("/", function(req, res){
    var book = req.body ; 
    book.owner = req.user;
    //console.log(book );
    bookController.create(book);
    res.write("Sent");
    res.end();
});



module.exports = router;