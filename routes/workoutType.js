const express = require("express");
const router = express.Router();

const WorkoutType = require("../models/workoutType");

// List
router.post("/list", async (req, res) => {
  try {
    const typeList = await WorkoutType.find();
    res.send(typeList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Add
router.post("/create", async (req, res) => {
  const { name } = req.body;

  try {
    const createType = new WorkoutType({
      name: name,
    });
    const result = await createType.save();
    res.send(result);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Delete
router.delete("/delete", async (req, res) => {
  const { _id } = req.body;
  try {
    const deleteType = await WorkoutType.findOneAndDelete({ _id });
    res.send(deleteType);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Update
router.patch("/update", async (req, res) => {
  const { _id, name } = req.body;
  try {
    const updatedType = await WorkoutType.findByIdAndUpdate(
      { _id },
      { name },
      { new: true }
    );
    if (name == null) {
      return res.status(404).json({ message: "Name is required" });
    }

    if (_id == null) {
      return res.status(404).json({ message: "Id is required" });
    }

    if (updatedType == null) {
      return res.status(404).json({ message: "Cannot Find Workout Type" });
    }
    res.json(updatedType);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
