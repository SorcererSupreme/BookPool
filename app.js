const express = require('express');
const app = express();
const fs = require('fs');
const config = require('./config.js')

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const FacebookStrategy = require('passport-facebook');

const path = require('path');
const user = require('./user.js');
const User = user.User;

const passport = require('passport');
const port = 3000;

const booksRoute = require('./routes/booksRoute.js');
const failureRoute = require('./routes/failureRoute.js');

// app.use(bodyParser());
// app.use('/book',booksRoute);

// app.use(express.static(path.join(__dirname, 'public')));

//start from here
app.use(expressSession({
  secret: 'MyVoiceIsMyPassportVerifyMe',
  resave: false,
  saveUninitialized: true
}));

  // app.use(express.static('public'));
  app.use(cookieParser());
  app.use(bodyParser());
  // app.use(expressSession({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  // app.use(app.router);


passport.serializeUser(function(user, done) {
  done(null, 1);
});

passport.deserializeUser(function(id, done) {
  // User.findById(id, function(err, user) {
  //   done(err, user);
  // });
  done(null,1);
});

passport.use(new FacebookStrategy({
	clientID: config.facebookCredentials.clientID,
	clientSecret: config.facebookCredentials.clientSecret ,
	callbackURL: "/auth/facebook/callback",
	profileFields: ['id', 'displayName', 'photos', 'email'],
	passReqToCallback: true
},
function(req, accessToken, refreshToken, profile, cb){
	console.log("profile.........",profile);
	return User.findOrCreate({ facebookId: profile }, function(err, user){
		console.log("i am here");
		return cb(err,user);

	})
}
));

// end here



// app.get("/", [
//   function (req, res, next) {
//     fs.readFile("/maybe-valid-file.txt", "utf8", function (err, data) {
//         // res.locals.data = data;
//         console.log("1",err);
//         next(err);
//     });
//   },
//   function (req, res) {
//     console.log("2");
//     res.locals.data = res.locals.data.split(",")[1];

//     res.send(res.locals.data);
//   }
// ]);

// var errorHandler = function (err, req, res, next) {
//   // if (res.headersSent) {
//   //   return next(err)
//   // }
//   // res.status(500)
//   console.log("3")
//   res.render('error', { error: err })
// }

// app.use(errorHandler);


// app.get('/',(req,res)=> res.send("hello world!"))

app.get('/auth/facebook', passport.authenticate('facebook',{ scope: ['user_friends', 'manage_pages'] }));

app.get('/auth/facebook/callback',passport.authenticate('facebook',{ 
	successRedirect: '/',
	failureRedirect: '/auth/failure' 
}))

app.get('/',(req,res)=> res.send("This route is open for all!"))

var isAuthorized = function(req,res,next){
  if(!req.session.user){
    res.redirect('/');
  }
  else{
    next();
  }
}

app.use('/',failureRoute);
app.use('/book',isAuthorized,booksRoute);

app.listen(port,()=> console.log("app listening on port.. " + port))


// app.get('/users/:id', (req, res, next) => {
//   const userId = req.params.id
//   if (!userId) {
//     const error = new Error('missing id')
//     error.httpStatusCode = 400
//     return next(error)
//   }

//   Users.get(userId, (err, user) => {
//     if (err) {
//       err.httpStatusCode = 500
//       return next(err)
//     }

//     res.send(users)
//   })
// })