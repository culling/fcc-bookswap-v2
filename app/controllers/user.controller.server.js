var http = require("http");
var https = require("https");

//Configs and Modules
var config      = require("./../../config/config");
var mongoExport = require("./../../config/mongo");

var UserModel   = mongoExport.users.UserModel;
//var Users       = mongoExport.users;

function clean(obj){
    for (var propName in obj){
        if(obj[propName] === null || obj[propName] === undefined || obj[propName] === "" ){
            delete obj[propName];
        }
    }
}


exports.findAll = function (done){
    UserModel.find({},function(err, foundUsers){
        if(err){ console.error(err)};
        done(foundUsers);
    });
}

exports.drop = function(done){
    UserModel.collection.drop(done());
}

exports.getUserByUsername = function(username, done){
    UserModel.findOne({"username":username}, {"password": 0, "salt":0}, function(err, user){
        if(err){
            console.error(err);
            done(err, null);
        };
        console.log(user);
        done(null, user);
    });
}



exports.updatePassword  = function(user, done){
    console.log("updatePassword called");
    UserModel.findOne({ username: user.username }, function (err, doc){
        doc.password = user.password;
        doc.save();
        done();
    });
};

exports.update = function(user, done){
    console.log(user);
    console.log("Update on UserController called");
    UserModel.update({"username": user.username},
        user, function(err, response){
            if (err){
                return next (err);
            } else {
                done();
            }
        }
    );
}

exports.create  = function(user){
    console.log("Create Called");
    console.log(user);
    var newUser = new UserModel(user);
    
    newUser.save();
};