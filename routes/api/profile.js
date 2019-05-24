const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Profile = require("../../models/Profile");
const auth = require("../../middleware/auth");
const config = require("config");

// Used asnyc method await on items that return a promise instead of doing .then() etc...

// @route   GET api/profile/getprofile
// @desc    Get current profile
// @access  Private
router.get("/getprofile", auth, async (req, res) => {
  try {
    const profile = await Profile.findById(req.profile.id).select("-password");
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/profile/create
// @desc    Register user
// @access  Public
router.post(
  "/create",
  [
    check("firstname", "First Name must contain aA-zZ.").isAlpha(), //Make sure that firstname containts only alphabet
    check("lastname", "Last Name must contain aA-zZ.").isAlpha(),
    check("username", "Username must contain aA-zZ or 0-9.").isAlphanumeric(),
    check("password", "Password must be atleast 8 digits").isLength({ min: 8 })
  ],
  async (req, res) => {
    const errors = validationResult(req); //Pull all the errors from the form validation method

    //Check if there were any errors in the form validation
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, username, password } = req.body;

    try {
      // See if profile already exists
      let profile = await Profile.findOne({ username });

      if (profile) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Username is already taken." }] });
      }

      // If profile is not taken, create a new object to store into the database
      profile = new Profile({
        firstName: firstname,
        lastName: lastname,
        username: username,
        password: password
      });

      //Hash salt used for encrypting the password
      const salt = await bcrypt.genSalt(10);
      //Hash the password
      profile.password = await bcrypt.hash(password, salt);

      await profile.save();

      const payload = {
        profile: {
          id: profile.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "6hr" },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   POST api/profile/login
// @desc    Register user
// @access  Public
router.post(
  "/login",
  [
    check("username", "Username is required")
      .not()
      .isEmpty(),
    check("password", "Password is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      let profile = await Profile.findOne({ username });

      if (!profile) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Incorrect username or password." }] });
      }

      const isMatch = await bcrypt.compare(password, profile.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Incorrect username or password." }] });
      }

      //Pack the profile id in a payload to pass to jwt for a token
      const payload = {
        profile: {
          id: profile.id
        }
      };

      //pass the id into a jwt token
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "6hr" },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
module.exports = router;
