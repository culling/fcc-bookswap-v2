var passport    = require('passport');

// Mongo
var mongoExport = require("./mongo");

//Models
var UserModel   = mongoExport.users.UserModel;

var LocalStrategy   =   require('passport-local').Strategy;

passport.use(new LocalStrategy(function (username, password, cb) {
  const provider = 'local';
  // console.log('username: ', username);
  UserModel.findOne({
      username: username
  }, function (err, user) {
      console.error('error: ', err);
      // console.log('user: ', user);
      if (err) {
          cb(err);
          return
      }
      if (!user) {
          cb(null, false);
          return
      }
      user.isPasswordValid(password, (err, isValid) => {
          if (err) {
              cb(err);
              return;
          }
          if (!isValid) {
              cb(null, null);
              return;
          }
          cb(null, user);

      });
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


module.exports = passport;