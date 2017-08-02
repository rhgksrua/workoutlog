// auth routes

const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const ejwt = require('express-jwt');
const router = express.Router();

const Exercise = require('../models/exercise');


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
    name: '',
    list: [
      'pull up',
      'lat pull down'
    ]
  });
});

router.post('/user/exercises/sets',
  ejwt({secret: process.env.JWT_SECRET}),
  function(req, res) {
    console.log('user', req.user);
    console.log('body', req.body);
    const {
      muscle,
      exercise,
      year,
      month,
      date
    } = req.body;
    const query = {
      muscle,
      exercise,
      year,
      month,
      date,
      username: req.user.username
    };
    Exercise.find(query, function(err, exercises) {
      console.log('---- exercises', exercises);
      if (exercises.length > 0) {
        return res.json({status: true, error: false, exercises});
      } else {
        return res.json({status: false, error: false});
      }
    });
  }
);

router.post('/user/exercises/sets/all',
  ejwt({secret: process.env.JWT_SECRET}),
  function(req, res) {
    console.log('user', req.user);
    console.log('body', req.body);
    const {
      year,
      month,
      date
    } = req.body;
    const query = {
      year,
      month,
      date,
      username: req.user.username
    };
    Exercise.find(query, function(err, exercises) {
      console.log('---- exercises', exercises);
      if (exercises.length > 0) {
        return res.json({status: true, error: false, exercises});
      } else {
        return res.json({status: false, error: false});
      }
    });
  }
);


router.put('/user/exercises', 
  ejwt({secret: process.env.JWT_SECRET}),
  function(req, res) {
    const { 
      user: { 
        username 
      }, 
      body: { 
        set, 
        muscle, 
        exercise, 
        year, 
        month, 
        date
      } 
    } = req;
    console.log(set, muscle, exercise, year, month, date);
    // add set to db.

    const query = {
      muscle,
      exercise,
      year,
      month,
      date,
      username
    };

    Exercise.find(query, function(err, workouts) {
      if (err) {
        return res.json({error: 'find error'});
      }
      if (workouts.length > 0) {
        workouts[0].sets.push(set);
        workouts[0].save(function(err, updatedExercise) {
          if (err) {
            return res.json({error: 'failed to update existing document'});
          } else {
            return res.json({status: 'added to existing db'});
          }
        });
        // found workout
      } else {
        // add new exercise for the day.
        const newExercise = new Exercise();
        newExercise.date = date;
        newExercise.month = month;
        newExercise.year = year;
        newExercise.muscle = muscle;
        newExercise.exercise = exercise;
        newExercise.sets.push(set);
        newExercise.username = req.user.username;
        newExercise.save(function(err, updatedExercise) {
          if (err) {
            return res.json({error: 'db error'});
          } else {
            return res.json({status: 'good'});
          }
        });
      }
    });

    //res.json({ test: 'this is put method' });
  }
);

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
