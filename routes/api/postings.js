const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");

const Profile = require("../../models/Profile");
const JobPosting = require("../../models/JobPosting");

// @route   Get api/postings
// @desc    Get all job postings
// @access  Public
router.get("/", async (req, res) => {
  try {
    const postings = await JobPosting.find().sort({ date: -1 });

    res.json(postings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   Get api/postings/field/value
// @desc    Get all job postings by specified field and value. For example, by state = California
// @access  Public
router.get("/:field/:value", async (req, res) => {
  try {
    var field = "" + req.params.field;
    var value = "^" + req.params.value + "$"; //regex of value to match exact case
    if (
      field == "city" ||
      field == "state" ||
      field == "zipcode" ||
      field == "country"
    ) {
      field = "location." + field;
    }

    var postings = await JobPosting.find({
      [field]: { $regex: value, $options: "i" } // i is set for case insensitivity
    });

    res.json(postings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   Post api/postings
// @desc    Make a job posting
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "The job title is required")
        .not()
        .isEmpty(),
      check("company", "The company name is required")
        .not()
        .isEmpty(),
      check("phone", "A valid Phone Number is required").isNumeric(),
      check("description", "The job description is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      description,
      company,
      skills,
      experience,
      employmenttype,
      industrytype,
      email,
      phone,
      city,
      state,
      country,
      zipcode
    } = req.body;

    const newJob = {};
    newJob.location = {};
    newJob.contact = {};

    newJob.author = req.profile.id;
    if (title) newJob.title = title;
    if (description) newJob.description = description;
    if (company) newJob.company = company;
    if (phone) newJob.contact.phone = phone;
    if (skills) newJob.skills = skills.split(",").map(skills => skills.trim());
    if (experience) newJob.experience = experience;
    if (employmenttype) newJob.employmentType = employmenttype;
    if (industrytype) newJob.industryType = industrytype;
    if (email) newJob.contact.email = email;
    if (city) newJob.location.city = city;
    if (state) newJob.location.state = state;
    if (country) newJob.location.country = country;
    if (zipcode) newJob.location.zipcode = zipcode;

    try {
      let newJobPosting = new JobPosting(newJob);

      await newJobPosting.save();

      res.json(newJobPosting);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   Put api/postings/id
// @desc    Edit a job posting
// @access  Private
router.put(
  "/:id",
  [
    auth,
    [
      check("title", "The job title is required")
        .not()
        .isEmpty(),
      check("company", "The company name is required")
        .not()
        .isEmpty(),
      check("phone", "A valid Phone Number is required")
        .isNumeric()
        .isLength({ min: 10, max: 15 }),
      check("description", "The job description is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let currentPost = await JobPosting.findById(req.params.id);

    if (!currentPost) {
      return res.status(404).json({ msg: "Post not found!" });
    }

    if (currentPost.author != req.profile.id) {
      return res.status(401).json({ msg: "User unauthorized." });
    }

    const {
      title,
      description,
      company,
      skills,
      experience,
      employmenttype,
      industrytype,
      email,
      phone,
      city,
      state,
      country,
      zipcode
    } = req.body;

    const newJob = {};
    newJob.contact = {};
    newJob.location = {};

    newJob.author = req.profile.id;
    if (title) newJob.title = title;
    if (description) newJob.description = description;
    if (company) newJob.company = company;
    if (phone) newJob.contact.phone = phone;
    if (skills) newJob.skills = skills.split(",").map(skills => skills.trim());
    if (experience) newJob.experience = experience;
    if (employmenttype) newJob.employmentType = employmenttype;
    if (industrytype) newJob.industryType = industrytype;
    if (email) newJob.contact.email = email;
    if (city) newJob.location.city = city;
    if (state) newJob.location.state = state;
    if (country) newJob.location.country = country;
    if (zipcode) newJob.location.zipcode = zipcode;

    try {
      let newJobPosting = await JobPosting.findByIdAndUpdate(
        req.params.id,
        { $set: newJob },
        { new: true }
      );

      await newJobPosting.save();
      res.json(newJobPosting);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   Delete api/postings/id
// @desc    Delete a job posting
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const delPost = await JobPosting.findById(req.params.id);

    if (!delPost) {
      return res.status(404).json({ msg: "Post not found!" });
    }

    if (delPost.author != req.profile.id) {
      return res.status(401).json({ msg: "User unauthorized." });
    }

    await delPost.remove();

    return res.json({ msg: "Post deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(400).send("Server Error");
  }
});

module.exports = router;
