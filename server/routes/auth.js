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
    console.log('req.body', req.body);
    const { user: { username }, body: { user } } = req;
    console.log('destruct', username, user);
    if (username === user) {
      return res.json({isOwner: true});
    }
    res.json({isOwner: false});
  }
);

/**
 *
 * checks if user is logged in
 *
 * also, checks if current page is authorized for user
 *
 * If fetch request is missing jwt, it will 404.
 *
 * should also return workout data
 *
 */
router.post('/user', 
  ejwt({secret: process.env.JWT_SECRET}),
  function(req, res) {
    const auth = req.get('Authorization');
    const username = req.user.username;
    const currentPath = req.body.currentPath;
    if (username === currentPath) {
      return res.json({ username, isOwner: true });
    }
    res.json({ username, isOwner: false });
  }
);

router.post('/user/exercises', function(req, res) {
  console.log(req.body);
  res.json({ 
    name: 'name of muscle',
    list: [
      'pull up',
      'lat pull down'
    ]
  });
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
