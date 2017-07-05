/**
 *
 * API SERVER
 *
 */

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const passportGithub = require('./passport/githubStrategy');

require('dotenv').config();

const app = express();

const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/workoutlog';

mongoose.connect(mongoURL, {
  useMongoClient: true
});

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));
passportGithub(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);


app.listen(3001, () => {
  console.log('server running');
});
