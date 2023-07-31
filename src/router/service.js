const express = require("express");
const router = express.Router();

const { serviceController } = require("../controler/serviceCtrl");

//service
router.post("/serviceDetails", serviceController.serviceDetails);
router.patch("/updateservice/:id", serviceController.updateService);

module.exports = router;
