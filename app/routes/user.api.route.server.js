const url           = require("url");
const querystring   = require('querystring');

//Express and set up router
var express         = require('express');
var router          = express.Router();

//Configs and Modules
var config      = require("./../../config/config");
var mongoExport = require("./../../config/mongo");

//Controllers
var userController  = require("./../controllers/user.controller.server.js");

var passport    = require("passport");

var http = require("http");


//Send the current user or the IP Address if none logged in
router.get("/", function(req, res){
    if(req.user){
        userController.getUserByUsername(req.user.username, function(err, user){
            //Select the first found user
            //user = Object.assign(userArray[0]);
            user.type = "user";
            res.send(user);
        });
    }else{
        var user = {
            type: "ip"
            //,username: req.ip
        }
        res.send(user);
    }
});


router.get('/all', function(req, res){
    userController.findAll(function(users){

        res.write(JSON.stringify(users, null, "\t" ));
        res.end();
    }) ;
});


router.post("/", function(req, res){
    //var newUser = ({username: "jane",password: "secret", email: "jane@gmail.com"});
    var newUser = req.body;
    userController.create(newUser);
    res.end();
});

module.exports = router;