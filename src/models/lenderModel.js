const mongoose = require("mongoose");

const lenderSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  lendingOrganiztion: { type: String },
  date: { type: String },
  password: { type: String },
  mobileNo: { type: Number },
  lendingExperience: { type: String },
  product: { type: String },
  loanCap: { type: String },
  referralCode: { type: String },
  status: { type: Boolean },
  otp: { type: String },

  yourProduct: { type: String },
  employeeCode: { type: Number },
  yourDesignation: { type: String },
  reportingManager: { type: String },
  repoManDesignation: { type: String },
  visitingCard: { type: String },
  dateOfBirth: { type: Date },
  city: { type: String },
  state: { type: String },
  personalEmail: { type: String },
  residentialAddress: { type: String },
  areMarried: { type: Boolean },
  spouseName: { type: String },
  spouseDoB: { type: Date },
  marriageAnniversary: { type: Date },
});

const lenderModel = mongoose.model("lender", lenderSchema);
module.exports = lenderModel;
