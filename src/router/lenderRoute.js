const express = require('express');
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "image");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });


const lenderController = require("../controler/lenderControler")
const profileController = require("../controler/profile")

router.post('/lendersignup', lenderController.lenderSignup);
router.post('/lenderlogin', lenderController.lenderLogin);
router.post('/verifyotp/:id', lenderController.verifyOtp)
// router.post('/verifyotp', lenderController.verifyOtp)




//profile
router.post('/createprofile',upload.single('visitingCard'),profileController.createProfile)
router.patch('/updateprofile/:id',profileController.updateProfile)

module.exports = router;