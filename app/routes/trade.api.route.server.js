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
var bookController      = require("./../controllers/book.controller.server.js");


router.post("/", function(req, res){
    console.log("/API/trade hit")
    var book = req.body;

    //console.log("From User");
    //console.log(userRequestingTrade );
    //console.log("Book");
    //console.log(book);

    //book.usersRequestingTrade.push( usersRequestingTrade );
    bookController.update(book,function(err, updatedBook){
        if(err){ console.error(err)}
        res.write("update finished");
        res.end();
    });
});


module.exports = router;