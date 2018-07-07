"use strict"

const passport = require('koa-passport'),
      FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: process.env.FBCLIENTID,
    clientSecret: process.env.FBCLIENTSECRET,
    callbackURL: "http://localhost:3631/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    //Based on profile return from Github, find existing user
    let user = profile;
    console.log (user)
    //Return user model
    return done(null, user);
  })
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;