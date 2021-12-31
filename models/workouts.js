const mongoose = require("mongoose");

const WorkoutSchema = mongoose.Schema({
  workoutName: {
    type: String,
    required: true,
  },
  exercises: [
    {
      name: String,
      reps: Number,
      set: Number,
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
      },
    },
  ],
});

module.exports = mongoose.model("workout", WorkoutSchema);
