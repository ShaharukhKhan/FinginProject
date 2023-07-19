const express = require('express');
const router = express.Router();

const lenderController = require("../controler/lenderControler")

router.post('/lendersignup', lenderController.lenderSignup);
router.post('/lenderlogin', lenderController.lenderLogin);
router.post('/verifyotp/:id', lenderController.verifyOtp)
// router.post('/verifyotp', lenderController.verifyOtp)


module.exports = router;