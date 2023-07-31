const mongoose = require("mongoose");
const serviceDetailModel = require("../models/serviceModel");

const serviceController = {
  serviceDetails: async (req, res) => {
    try {
      const arrayValue = [];
      const alteEligiMethod = req.body.alteEligiMethod;
      let eligible = alteEligiMethod.split(",");
      arrayValue.push(eligible);

      let negativeProfile = req.body.negativeProfile;
      let profile = negativeProfile.split(",");
      arrayValue.push(profile);

      let payload = new serviceDetailModel({
        yourProduct: req.body.yourProduct,
        maxLoanAmount: req.body.maxLoanAmount,
        minLoanAmount: req.body.minLoanAmount,
        activeCity: req.body.activeCity,
        activeState: req.body.activeState,
        minCreditScore: req.body.minCreditScore,
        minRolOffered: req.body.minRolOffered,
        loanToUnmarried: req.body.loanToUnmarried,
        maxEligibilityAge: req.body.maxEligibilityAge,
        proEligibleLoan: req.body.proEligibleLoan,
        coApplicantRequired: req.body.coApplicantRequired,
        minBusinessVintage: req.body.minBusinessVintage,
        minBusinessTurnover: req.body.minBusinessTurnover,
        maxBusinessTurnover: req.body.maxBusinessTurnover,
        alteEligiMethod: eligible,
        negativeProfile: profile,
        tenantCategory: req.body.tenantCategory,
        // lenderId: req.body.lenderId,
      });
      const result = await payload.save();
      if (result) {
        res.status(200).json({
          status: true,
          message: "successfully created service details",
          result: result,
        });
      } else {
        res.status(401).json({
          status: false,
          message: "service detail not created",
        });
      }
    } catch (error) {
      res.status(400).json({
        status: false,
        message: "something went wrong",
        error: error.message,
      });
    }
  },

  updateService: async (req, res) => {
    try {
      let arrayValue = [];
      let alteEligiMethod = req.body.alteEligiMethod;
      let eligible = alteEligiMethod.split(",");
      arrayValue.push(eligible);

      let negativeProfile = req.body.negativeProfile;
      let profile = negativeProfile.split(",");
      arrayValue.push(profile);

      let payload = new serviceDetailModel({
        yourProduct: req.body.yourProduct,
        maxLoanAmount: req.body.maxLoanAmount,
        minLoanAmount: req.body.minLoanAmount,
        activeCity: req.body.activeCity,
        activeState: req.body.activeState,
        minCreditScore: req.body.minCreditScore,
        minRolOffered: req.body.minRolOffered,
        loanToUnmarried: req.body.loanToUnmarried,
        maxEligibilityAge: req.body.maxEligibilityAge,
        proEligibleLoan: req.body.proEligibleLoan,
        coApplicantRequired: req.body.coApplicantRequired,
        minBusinessVintage: req.body.minBusinessVintage,
        minBusinessTurnover: req.body.minBusinessTurnover,
        maxBusinessTurnover: req.body.maxBusinessTurnover,
        alteEligiMethod: eligible,
        negativeProfile: profile,
        tenantCategory: req.body.tenantCategory,
        serviceId: req.body.serviceId,
      });
      let serviceid = new mongoose.Types.ObjectId(req.body.serviceId);
      console.log(serviceid, "serviceidd");
      let result = await payload.save();
      let value = await serviceDetailModel.findByIdAndUpdate(
        { _id: serviceid },
        { serviceDetail: "update request send to admin" },
        { new: true }
      );
      if (value) {
        res.status(200).json({
          status: true,
          result: result,
          message: "update request send to admin",
        });
      } else {
        res.status(400).json({
          status: false,
          message: "not create update service",
          result: result,
        });
      }
    } catch (error) {
      res.status(400).json({
        status: false,
        message: "something went wrong",
        error: error.message,
      });
    }
  },
};

module.exports = { serviceController };
