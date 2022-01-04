const mongoose = require("mongoose");

const WorkoutTypeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("workoutType", WorkoutTypeSchema);
