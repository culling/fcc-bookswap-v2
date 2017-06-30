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
// var userController  = require("./../controllers/user.controller.server.js");



function clean(obj){
    for (var propName in obj){
        if(obj[propName] === null || obj[propName] === undefined || obj[propName] === "" ){
            delete obj[propName];
        }
    }
}



//Books
router.get("/book", function(req, res){
    console.log("/api/book hit" );
    //console.log( req.query);

    if(req.query.title){
        books.lookup(req.query.title, function(found){
            //res.send(found);
            res.write( JSON.stringify( JSON.parse(found), null, "\t") );
            res.end();
        });        
    }else{
        res.end();
    }
});

router.post("/book", function(req, res){
    var book = req.body ; 
    book.owner = req.user;
    //console.log(book );
    books.create(book);
    res.write("Sent");
    res.end();
});



module.exports = router;