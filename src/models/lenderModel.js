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
    otp: { type: String }
})


const lenderModel = mongoose.model("lender", lenderSchema);
module.exports = lenderModel