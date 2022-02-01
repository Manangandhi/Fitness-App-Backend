const express = require("express");
const router = express.Router();

const Workout = require("../models/workouts");

// List
router.post("/list", async (req, res) => {
  try {
    const list = await Workout.find();
    res.send(list);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Add
router.post("/create", async (req, res) => {
  const { workoutName, exercises } = req.body;

  try {
    const wk = new Workout({
      workoutName: workoutName,
      exercises: exercises || [],
    });
    const result = await wk.save();
    res.send(result);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Update
router.patch("/update", async (req, res) => {
  const { exercises, _id } = req.body;
  try {
    const updatedExercises = await Workout.findByIdAndUpdate(
      { _id },
      { exercises },
      { new: true }
    );
    if (_id === null) {
      return res.status(404).json({ message: "Id is required" });
    }
    if (exercises === []) {
      return res.status(404).json({ message: "Exercise is required" });
    }
    if (updatedExercises === null) {
      return res.status(404).json({ message: "Cannot Find workout" });
    }
    res.json(updatedExercises);
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: e.message });
  }

})

// Delete
router.delete("/delete", async (req, res) => {
  const { _id } = req.body;
  try {
    const deleteItem = await Workout.findOneAndDelete({ _id });
    res.send(deleteItem);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
