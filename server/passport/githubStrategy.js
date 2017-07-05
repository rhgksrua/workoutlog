'use strict';

const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/user');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL
    },
      function(accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
          User.findOne({ 'github.id' : profile.id } , function(err, user) {
            if (err) return done(err);

            if (user) {
              return done(null, user);
            } else {
              const newUser = new User();
              newUser.github.id = profile.id;
              newUser.github.token = accessToken;
              newUser.github.name = '';
              newUser.github.email = '';

              newUser.save(function(err) {
                if (err) throw err;
                console.log('saving user to db');
                return done(null, newUser);
              });
            }
          });
        });
      }
  ));
};
