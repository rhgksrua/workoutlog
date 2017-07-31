const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
  year: Number,
  month: Number,
  date: Number,
  muscle: String,
  exercise: String,
  username: String,
  name: String,
  sets: [
    {
      id: mongoose.Schema.Types.ObjectId,
      reps: Number,
      weight: Number,

    }
  ]
});

module.exports = mongoose.model('Exercise', exerciseSchema);

