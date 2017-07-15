// auth routes

const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const ejwt = require('express-jwt');
const router = express.Router();

// Access to env var
require('dotenv').config();

router.get('/', function(req, res) {
  res.render('authCallback');
  //res.send('nothing here');
});

router.post('/owner', 
  ejwt({secret: process.env.JWT_SECRET}),
  function(req, res) {
    console.log('req.user', req.user);
    res.json({test: 'yup it works'});
  }
);

router.post('/user', function(req, res) {
  const auth = req.get('Authorization');
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const username = decoded.username;
  res.json({ username });
});

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback', 
  passport.authenticate('github', 
  {failureRedirect: '/'}), 
  function(req, res) {
    const token = jwt.sign({
      username: req.user.github.username
    }, process.env.JWT_SECRET);
    res.render('authCallback', { token });
  }
);

module.exports = router;
