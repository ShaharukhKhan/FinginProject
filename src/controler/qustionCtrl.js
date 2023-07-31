const Qustion = require("../models/askQustion");
const addReply = require("../models/addReplay");

module.exports = {
  createQuestion: async (req, res) => {
    try {
      const newQustion = new Qustion({
        giveAQustion: req.body.giveAQustion,
        DescribeYourQustion: req.body.DescribeYourQustion,
        catagoriesForQustions: req.body.catagoriesForQustions,
        name: req.body.name,
        addReply: req.body.addReply,
      });
      const qustion = newQustion.save();
      if (!qustion) {
        return res.status(400).json({
          success: false,
          message: "error occue during save deta ",
        });
      } else {
        return res.status(201).json({
          success: true,
          message: " deta save sucessfully",
          result: qustion,
        });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  updateQuestion: async (req, res) => {
    try {
      let arrayValue = [];
      const id = req.params.id;
      const addReplyIds = req.body.addReplyIds; // Array of addReply IDs to be added
      let eligible = addReplyIds.split(",");
      arrayValue.push(eligible);

      const qustion = await Qustion.findByIdAndUpdate(
        { _id: id },
        { $push: { addReply: { $each: eligible } } },
        { new: true }
      );

      res.send(qustion);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "An error occurred",
        error: error.message,
      });
    }
  },

  replyAdd: async (req, res) => {
    try {
      const newReply = new addReply({
        reply: req.body.reply,
        QustionId: req.body.QustionId,
      });
      const Reply = await newReply.save();
      if (!Reply) {
        return res.status(400).json({
          success: false,
          message: "Erroee  occur while save Reply",
        });
      } else {
        return res.status(201).json({
          success: true,
          message: "add deta successfully",
          result: Reply,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "An error occurred",
        error: error.message,
      });
    }
  },

  getQustionDetails: async (req, res) => {
    try {
      let id = req.params.id;
      console.log(id, "idd");
      let value = await Qustion.findOne({ _id: id }).populate("addReply");
      //.populate("addReply.name")

      if (value) {
        res.status(200).json({
          status: true,
          message: "gettig single chat detail",
          result: value,
        });
      } else {
        let value = await communityChatModel.find().populate("addReply.name");
        res.status(200).json({
          status: true,
          message: "gettig all chat detail",
          result: value,
        });
      }
    } catch (error) {
      res.status(401).json({
        status: false,
        message: "something went wrong",
        error: error.message,
      });
    }
  },
};

