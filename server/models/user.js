
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  github: {
    id: String,
    username: String,
    email: String,
    token: String,
  }
});

module.exports = mongoose.model('User', userSchema);
