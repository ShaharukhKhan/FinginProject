const createQuestion = require("../controler/qustionCtrl");
const express = require("express");
const router = express.Router();

router.post("/qustion", createQuestion.createQuestion);
router.put("/addDescription/:id", createQuestion.updateQuestion);
router.get("/getreplydetails/:id", createQuestion.getQustionDetails);

//reply
router.post("/addreply", createQuestion.replyAdd);

module.exports = router;
