const mongoose = require("mongoose");

const QustionSchema = new mongoose.Schema({
  giveAQustion: { type: String },
  DescribeYourQustion: { type: String },
  catagoriesForQustions: {
    type: [
      {
        type: String,
      },
    ],
  },
  name: { type: String },
  addReply: [{ type: mongoose.Schema.Types.ObjectId, ref: "replay" }],
});

const Qustion = new mongoose.model("qustion", QustionSchema);

module.exports = Qustion;
