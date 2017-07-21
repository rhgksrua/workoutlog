const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
  muscle: String,
  name: String,
  sets: [
    {
      id: ObjectId,
      reps: Number,
      weight: Number,

    }
  ]
});

module.exports = mongoose.model('Exercise', exerciseSchema);

