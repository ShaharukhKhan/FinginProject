const mongoose = require("mongoose");

const addReplySchema = mongoose.Schema({
  reply: {
    type: String,
    required: true,
  },
  QustionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "qustion",
  },
});

const addReply = mongoose.model("replay", addReplySchema);

module.exports = addReply;
