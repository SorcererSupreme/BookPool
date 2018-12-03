// const express = require('express');
// const app = express();
const fs = require('fs');
const config = require('./config.js');
// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
const expressSession = require('express-session');
// const mongoStore = require('connect-mongo')(expressSession);
const FacebookStrategy = require('passport-facebook');

const path = require('path');
var user = require('../DAO/userDAO.js');


const passport = require('passport');
// const db = require('./dbConnection.js');
const mongoose = require('mongoose');

const port = 8080;


// app.use(express.static(path.join(__dirname, 'dist')));



// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Credentials","true");
//   res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

  // app.use(cookieParser());
  // app.use(bodyParser());
  // app.use(expressSession({
  //   secret: 'MyVoiceIsMyPassportVerifyMe',
  //   store: new mongoStore({mongooseConnection: mongoose.connection})
  // }));
  
  // app.use(passport.initialize());
  // app.use(passport.session());


passport.serializeUser(function(user, done) {
  // console.log("user object logging........", user)
  var sessionUser = {
    user_name: user.user_name,
    user_id: user.user_id,
    role: user.role
  }
  done(null, sessionUser);
});

passport.deserializeUser(function(sessionUser, done) {
  console.log("in deserialize!")
  done(null,sessionUser);
});

passport.use(new FacebookStrategy({
	clientID: config.facebookCredentials.clientID,
	clientSecret: config.facebookCredentials.clientSecret ,
	callbackURL: "/auth/facebook/callback",
	profileFields: ['id', 'displayName', 'photos', 'email'],
	passReqToCallback: true
},
function(req, accessToken, refreshToken, profile, cb){
  
  // console.log("..........",req.session.passport)
	return user.findOrCreateUser(profile, function(err, user){
		console.log("i am here");
		return cb(err,user);

	})
}
));


// app.get('/auth/facebook', passport.authenticate('facebook',{ scope: ['user_friends', 'manage_pages'] }));

// app.get('/auth/facebook/callback',passport.authenticate('facebook',{ 
// 	successRedirect: '/',
// 	failureRedirect: '/auth/failure' 
// }))


module.exports = passport;