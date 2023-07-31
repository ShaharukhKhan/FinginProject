const mongoose = require("mongoose");
const lenderModel= require("../models/lenderModel")

let profileController = {
  createProfile: async (req, res) => {
    try {
      let visitingCard;
      zx;
      if (req.file) {
        visitingCard = req.file.originalname;
      } else {
        visitingCard = req.body.visitingCard;
      }
      let payload = new lenderModel({
        yourProduct: req.body.yourProduct,
        employeeCode: req.body.employeeCode,
        yourDesignation: req.body.yourDesignation,
        reportingManager: req.body.reportingManager,
        repoManDesignation: req.body.repoManDesignation,
        visitingCard: visitingCard,
        dateOfBirth: req.body.dateOfBirth,
        city: req.body.city,
        state: req.body.state,
        personalEmail: req.body.personalEmail,
        residentialAddress: req.body.residentialAddress,
        areMarried: req.body.areMarried,
        spouseName: req.body.spouseName,
        spouseDoB: req.body.spouseDoB,
        marriageAnniversary: req.body.marriageAnniversary,
      });

      let result = await payload.save();
      res.status(200).json({
        status: true,
        message: "successfully created profile",
        result: result,
      });
    } catch (error) {
      res.status(400).json({
        status: false,
        message: "something went wrong",
        error: error.message,
      });
    }
  },

  // Update profile of a lender
  updateProfile: async (req, res) => {
    try {
      let id = req.params.id;
      let check = await lenderModel.findOne({ _id: id });

      if (check) {
        // If lender with given ID exists, update the profile
        let payload = {
          dateOfBirth: req.body.dateOfBirth,
          city: req.body.city,
          state: req.body.state,
          personalEmail: req.body.personalEmail,
          residentialAddress: req.body.residentialAddress,
          areMarried: req.body.areMarried,
          spouseName: req.body.spouseName,
          spouseDoB: req.body.spouseDoB,
          marriageAnniversary: req.body.marriageAnniversary,
        };

        let update = { $set: payload };
        let result = await lenderModel.findByIdAndUpdate(id, update, {
          new: true,
        });

        res.status(200).json({
          status: true,
          message: "Profile updated successfully",
          result: result,
        });
      } else {
        // If lender with given ID doesn't exist
        res.status(400).json({
          status: false,
          message: "Profile does not exist",
        });
      }
    } catch (error) {
      // Error handling
      res.status(500).json({
        status: false,
        message: "Something went wrong",
        error: error.message,
      });
    }
  },
};

module.exports = profileController;
