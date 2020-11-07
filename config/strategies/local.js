var passport        =   require('passport');
var LocalStrategy   =   require('passport-local').Strategy;

// export default LocalStrategy;
// var mongo           =   require("./../mongo");
// var UserModel       =   mongo.users.UserModel;

// new LocalStrategy(function (username, password, cb) {
//         const provider = 'local';
//         // console.log('username: ', username);
//         UserModel.findOne({
//             username: username,
//             provider: provider,
//         }, function (err, user) {
//             console.error('error: ', err);
//             // console.log('user: ', user);
//             if (err) {
//                 cb(err);
//                 return
//             }
//             if (!user) {
//                 cb(null, false);
//                 return
//             }
//             user.isPasswordValid(password, (err, isValid) => {
//                 if (err) {
//                     cb(err);
//                     return;
//                 }
//                 if (!isValid) {
//                     cb(null, null);
//                     return;
//                 }
//                 cb(null, user);
    
//             });
//         });
//     }));
// };

