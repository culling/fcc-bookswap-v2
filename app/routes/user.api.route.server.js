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
var userController  = require("./../controllers/user.controller.server.js");



function clean(obj){
    for (var propName in obj){
        if(obj[propName] === null || obj[propName] === undefined || obj[propName] === "" ){
            delete obj[propName];
        }
    }
}



//Send the current user or the IP Address if none logged in
router.get("/", function(req, res){
    if(req.user){
        userController.getUserByUsername(req.user.username, function(err, user){
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
    var newUser = req.body;
    userController.create(newUser);
    res.end();
});

router.put("/", function(req, res){
    let user    = req.body;
    clean(user);
    user._id      = req.user._id;
    user.username = req.user.username;
    //Let the password be set    
    if(user.password){
        userController.updatePassword(user, function(){
            delete user.password;
            userController.update(user, function(err, response){
                if(err)console.error(err);
                    res.write("finished");
                    res.end();
                }
            );

        });
    }else{
        userController.update(user, function(err, response){
            if(err)console.error(err);
                res.write("finished");
                res.end();
            }
        );
    };
    

});


module.exports = router;