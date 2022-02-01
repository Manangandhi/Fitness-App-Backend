const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/authentication");
/**
 * @method - POST
 * @param - /signup
 * @description - SignUp
 */
router.post(
  "/signup",
  [
    check("email", "Please Enter a valid Email").isEmail(),
    check("password", "Please Enter a valid Password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          message: "User Already Exists",
        });
      }
      user = new User({ email, password });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(payload, "randomString", { expiresIn: 10000 }, (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
        });
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Error in Saving");
    }
  }
);

/**
 * @method - POST
 * @param - /Login
 * @description - Login
 */
router.post(
  "/login",
  [
    check("email", "Please Enter a Valid Email").isEmail(),
    check("password", "Please Enter a Valid Password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          message: "User not Exist",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          message: "Incorrect Password !",
        });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, "randomString", { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
        });
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

module.exports = router;
