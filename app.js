const express = require('express');
const app = express();
const fs = require('fs');
const config = require('./Server/config.js');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const mongoStore = require('connect-mongo')(expressSession);
const FacebookStrategy = require('passport-facebook');

const path = require('path');
// const user = require('./user.js');
var user = require('./Server/DAO/userDAO.js');
// const User = user.User;

const passport = require('passport');
// const db = require('./dbConnection.js');
const mongoose = require('mongoose');

const port = 8080;

const booksRoute = require('./Server/routes/booksRoute.js');
const failureRoute = require('./Server/routes/failureRoute.js');

// app.use(bodyParser());
// app.use('/book',booksRoute);

app.use(express.static(path.join(__dirname, 'dist')));


//start from here
app.use(expressSession({
  secret: 'MyVoiceIsMyPassportVerifyMe',
  resave: false,
  saveUninitialized: true,
  store: new mongoStore({mongooseConnection: mongoose.connection})
}));

  // app.use(express.static('public'));
  app.use(cookieParser());
  app.use(bodyParser());
  // app.use(expressSession({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  // app.use(app.router);


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
  // User.findById(id, function(err, user) {
  //   done(err, user);
  // });
  console.log("sessionUser: ",sessionUser);
  done(null,sessionUser);
});


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials","true")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
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



app.get('/auth/facebook', passport.authenticate('facebook',{ scope: ['user_friends', 'manage_pages'] }));

app.get('/auth/facebook/callback',passport.authenticate('facebook',{ 
	successRedirect: '/',
	failureRedirect: '/auth/failure' 
}))

app.get('/',(req,res)=> res.sendFile(path.join(__dirname+"/dist/index.html")))

var isAuthorized = function(req,res,next){
  if(!req.session.passport.user){
    res.redirect('/');
  }
  else{
    next();
  }
}

// app.get('/auth/success/', (req,res) => {
//   console.log("this route was called!");
//   console.log(req.session)
//   console.log(req.session.passport);
//   res.redirect('/BookPage')});

app.get('/state', (req,res) => {
                                if(req.session){
                                  console.log("////////")
                                console.log(req.session )
                                res.send(req.session.passport.user)}
                                else{ 
                                  console.log(req.session.passport)
                                  res.send("Not Found")}}
                                );

app.use('/',failureRoute);
// app.get('/BookPage',(req,res)=> res.sendFile(path.join(__dirname+"/dist/index.html")))
app.use('/book',isAuthorized,booksRoute);

app.listen(port,()=> console.log("app listening on port.. " + port))
