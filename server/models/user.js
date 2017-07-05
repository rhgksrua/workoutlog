
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  github: {
    id: String,
    email: String,
    token: String,
    name: String
  }
});

module.exports = mongoose.model('User', userSchema);
