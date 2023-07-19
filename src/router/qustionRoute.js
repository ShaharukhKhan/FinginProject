const createQuestion = require("../controler/qustionCtrl");
const express = require("express");
const router = express.Router();

router.post("/qustion", createQuestion.createQuestion);
router.put("/addDescription/:id", createQuestion.updateQuestion);


//reply
router.post("/addreply", createQuestion.replyAdd);

module.exports = router;
