const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    companyName: String,
    companyDescription: String,
    roleName: String,
    salary: String,
    location: String,
    JobDescription: String,
    Responsibilites: String,
    SkillsRequired: String,
    experience: Number,
    companyAddress: String,
    education: String,
    IndustryType: String,
    departmentType: String,
    employmentType: String,
    role_Category: String,
    jobStatus: String,
    pincode:String,
    isClosed: {
      type: Boolean,
      default: true,
    },
    appliedUsers: [
      {
        userId: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        isViewed: {
          type:Boolean,
          default: false,
        },
        isWishlisted:{
          type:Boolean,
          default: false,
        }
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Jobs = mongoose.model("Job", JobSchema);

module.exports = Jobs;
