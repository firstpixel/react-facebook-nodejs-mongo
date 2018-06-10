var passport = require('passport'),
  FacebookTokenStrategy = require('passport-facebook-token'),
  User = require('mongoose').model('User'),
  config = require('./config');

  if (!config.facebook.clientID || !config.facebook.clientSecret) {
      throw new Error('ClientID and ClientSecret must be defined to the facebook client ID and secret respectively.');  
  }

passport.use(new FacebookTokenStrategy({
  clientID: config.facebook.clientID ,
  clientSecret: config.facebook.clientSecret,
    }, function (accessToken, refreshToken, profile, done) {
      User.findOrCreate(accessToken, refreshToken, profile, function(err, user) {
        return done(err, user);
      });
}));


  