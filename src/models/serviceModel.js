const mongoose = require('mongoose');


const serviceSchema = new mongoose.Schema({
  yourProduct: { type: String },
  activeCity: { type: String },
  activeState: { type: String },
  minLoanAmount: { type: Number },
  maxLoanAmount: { type: Number },
  minCreditScore: { type: Number },
  minRolOffered: { type: String },
  loanToUnmarried: { type: Boolean },
  maxEligibilityAge: { type: Number },
  proEligibleLoan: { type: String },
  coApplicantRequired: { type: Boolean },
  minBusinessVintage: { type: Number },
  minBusinessTurnover: { type: Number },
  maxBusinessTurnover: { type: Number },
  alteEligiMethod: [{ type: String }],
  negativeProfile: [{ type: String }],
  tenantCategory: { type: String },
  serviceStatus: { type: Boolean, default: false },
//   lenderId: { type: mongoose.Types.ObjectId, ref: "lender" },
  serviceId: { type: mongoose.Types.ObjectId }, 
  serviceDetail: { type: String },
});


module.exports = mongoose.model("servicedetail", serviceSchema);