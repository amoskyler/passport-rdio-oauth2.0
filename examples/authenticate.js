var http = require('http');
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var rdioStrategy = require('../lib/').Strategy;

var app = express();
var port = 5000;

var clientID = 'dN23ZCFbPa2BSdlY_Whqjw';
var clientSecret = '28j3liBSZc3ZCPYzBsL3hQ';


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


passport.use(new rdioStrategy({
  clientID: clientID,
  clientSecret: clientSecret,
  callbackURL: '/auth/rdio/callback'
},
function(access, token, profile, done){
  /*
  *  User.findOrCreate(..., function (err, user) {
  *    return done(err, profile);
  *  });
  *
  */
  //console.log(profile);
  return done(null, profile);
}));


app.use(cookieParser());
app.use(session({secret: 'keyboard kat'}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', function(req, res){
  if (req.user){
    res.send(req.user);
  }
  else{
    res.send('<a href="/auth/rdio">Login</a>');
  }
});

app.get('/auth/rdio', passport.authenticate('rdio'));

app.get('/auth/rdio/callback',
  passport.authenticate('rdio'), function(req, res){
    if (req.user){
      res.redirect('/');
    }
    else {
      res.redirect('/login');
    }
  }
);


http.createServer(app).listen(port);
console.log('starting on port: '+ port);
