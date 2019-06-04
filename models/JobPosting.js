const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobPostingSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "profiles"
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  skills: [
    {
      type: String,
      default: ""
    }
  ],
  experience: {
    type: String,
    default: ""
  },
  employmentType: {
    type: String,
    default: ""
  },
  occupationType: {
    type: String,
    default: ""
  },
  industryType: {
    type: String,
    default: ""
  },
  contact: {
    email: {
      type: String,
      default: ""
    },
    phone: {
      type: String,
      required: true
    }
  },
  location: {
    city: {
      type: String,
      default: ""
    },
    state: {
      type: String,
      default: ""
    },
    country: {
      type: String,
      default: ""
    },
    zipcode: {
      type: String,
      default: ""
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = JobPosting = mongoose.model("jobpostings", JobPostingSchema);
