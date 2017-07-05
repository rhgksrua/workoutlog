// auth routes

const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', function(req, res) {
  console.log('nothing here');
  res.send('nothing here');
});

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback', 
  passport.authenticate('github', 
  {failureRedirect: '/'}), 
  function(req, res) {
    res.send('this is callback url for github oauth');
  }
);

module.exports = router;
