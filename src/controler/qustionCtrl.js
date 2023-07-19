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
      const id = req.params.id;
      const addReplyIds = req.body.addReplyIds; // Array of addReply IDs to be added
      const objectIdAddReplyIds = addReplyIds.map((id) =>
        mongoose.Types.ObjectId(id)
      );

      const qustion = await Qustion.findByIdAndUpdate(
        { _id: id },
        { $push: { addReply: { $each: objectIdAddReplyIds } } },
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
};
