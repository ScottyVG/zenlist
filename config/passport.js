'use strict'
// Requiring all the strategies for passport that will be used to log the user in
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//   async = require('async');
// // const FacebookStrategy = require('passport-facebook').Strategy;
// const TwiterStrategy = require('passport-twitter').Strategy;
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const knex = require('../db/knex');



// Requiring up a user model(dont know what this is used for yet)
const User = require('../middleware/auth');

// Requiring the Auth variables





passport.serializeUser((user, done) => {
    console.log('serializeUser fired', user);
    knex('users')
        .where('email', user.email)
        .first()
        .then((users) => {
          delete users.hashedPassword;
            done(null, users);
        })
        .catch((err) => {
            done(null, false);
        });
});
passport.deserializeUser((user, done) => {
    console.log('deserializeUser fired');
    knex('users')
        .where('email', user.email)
        .first()
        .then((users) => {
          delete users.hashedPassword;
            done(null, users);
        })
        .catch((err) => {
            done(null, false)
        });
});


/*
        LocalStrategy
*/
    // code for signup (use('local', new LocalStrategy))
passport.use('local',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req,username,password, done) => {
        console.log('signup local-strat', req.body);
        console.log('signup local-strat email', req.body.email);
        console.log('signup local-strat password', req.body.password);

        if (!req.body.email) {
            return done(null, false, req.flash('message', 'Enter in an Email.'));
        }
        if (!req.body.password) {
            return done(null, false, req.flash('message', 'Enter in a password'));
        }
        console.log(req.body);
        knex('users')
          .where('email',req.body.email)
          .first()
          .then((users)=>{
            if(!users){
              return done(null,false)
            }
            console.log(users);
            if(User.validPassword(req.body.password, users.hashedPassword)){
              delete users.hashedPassword;
              var user = users
              return done(null,user)
            }
          })
    }))
    // code for facebook (use('facebook',new FacebookStrategy))
    // code for twitter (use('twitter',new TwitterStrategy))

/*
        GoogleStrategy
*/

// passport.use(new GoogleStrategy({
//         clientID: configAuth.googleAuth.clientID,
//         clientSecret: configAuth.googleAuth.clientSecret,
//         callbackURL: configAuth.googleAuth.callbackURL,
//     },
//     (token, refreshToken, profile, done) => {
//         User.findOne({
//             'google.id': profile.id
//         }, (err, user) => {
//             if (err) {
//                 return done(err);
//             }
//             if (user) {
//                 return done(null, user);
//             } else {
//                 const newUser = new User();
//                 newUser.google.id = profile.id;
//                 newUser.google.token = token;
//                 newUser.google.name = profile.displayName;
//                 newUser.google.email = profile.emails[0].value;
//                 newUser.save((err) => {
//                     if (err) {
//                         throw err;
//                     }
//                     return done(null, newUser);
//                 })
//             }
//         })
//     }
// ))
module.exports = passport;
