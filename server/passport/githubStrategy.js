'use strict';

const GitHubStrategy = require('passport-github2').Strategy;

module.exports = function(passport) {
  passport.use(new GitHubStrategy({
      clientID: 'client id',
      clientSecret: 'client secret',
      callbackURL: 'http'
    },
      function(accessToken, refreshToken, profile, done) {
        // do stuff with db.
      };
  ));
};
