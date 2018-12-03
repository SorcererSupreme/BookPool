const express = require('express');
const app = express();
const fs = require('fs');
const config = require('./Server/config/config.js');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const mongoStore = require('connect-mongo')(expressSession);
const FacebookStrategy = require('passport-facebook');

const path = require('path');
// const user = require('./user.js');
var user = require('./Server/DAO/userDAO.js');
// const User = user.User;


// const db = require('./dbConnection.js');
const mongoose = require('mongoose');

const port = 8080;

const booksRoute = require('./Server/routes/booksRoute.js');
const failureRoute = require('./Server/routes/failureRoute.js');


app.use(express.static(path.join(__dirname, 'dist')));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials","true");
  res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


  app.use(cookieParser());
  app.use(bodyParser());
  app.use(expressSession({
    secret: 'MyVoiceIsMyPassportVerifyMe',
    resave: true,
    saveUninitialized: false,
    store: new mongoStore({
      mongooseConnection: mongoose.connection
    })
  }));
  const passportConfig = require('./Server/config/passportConfig.js');

  app.use(passportConfig.initialize());
  app.use(passportConfig.session());




app.get('/auth/facebook', passportConfig.authenticate('facebook',{ scope: ['user_friends', 'manage_pages'] }));

app.get('/auth/facebook/callback',passportConfig.authenticate('facebook',{ 
	successRedirect: '/',
	failureRedirect: '/auth/failure' 
}))

app.get('/',(req,res)=> res.sendFile(path.join(__dirname+"/dist/index.html")))

var isAuthorized = function(req,res,next){
  if(req.method == 'OPTIONS'){
    console.log("options request!")
    next();
  }
  else if (!req.session.passport.user){
    res.redirect('/');
    next()
  }
  else{
    next();
  }
}


app.get('/state', (req,res,next) => {
                                if(req.session){
                                  console.log("////////")
                                res.send(req.session.passport.user)}
                                else{ 
                                  res.send("Not Found")}
                                }
                                );

// app.use('/',failureRoute);
app.use('/book',isAuthorized,booksRoute);

app.listen(port,()=> console.log("app listening on port.. " + port))
