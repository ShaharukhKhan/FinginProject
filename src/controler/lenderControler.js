const lenderModel = require("../models/lenderModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../service/sendMail");


// Function to generate a numeric OTP
function generateNumericOTP(length) {
    const digits = '0123456789';
    console.log(digits.length)
    let otp = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        otp += digits[randomIndex];
    }
    return otp;
}

let lenderController = {
    lenderSignup: async (req, res) => {
        try {
            const hashPassword = await bcrypt.hash(req.body.password, 10)
            const lenderSignup = new lenderModel({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                lendingOrganiztion: req.body.lendingOrganiztion,
                date: req.body.date,
                password: hashPassword,
                mobileNo: req.body.mobileNo,
                lendingExperience: req.body.lendingExperience,
                product: req.body.product,
                loanCap: req.body.loanCap,
                referralCode: req.body.referralCode,
                status: req.body.status
            })
            let email = req.body.email
            let result = await lenderModel.findOne({ email: email })
            if (result) {
                return res.status(208).json({
                    status: false,
                    message: 'email already exist',
                    result: result
                })
            }
            else {
                await lenderSignup.save()
                return res.status(200).json({
                    status: true,
                    message: "Successfully Signed Up",
                    result: lenderSignup,
                })
            }
        } catch (error) {
            res.status(400).json({
                status: false,
                message: 'something went wrong',
                error: error.message
            })
        }
    },

    lenderLogin: async (req, res) => {
        try {
            const email = req.body.email;

            // Find the lender record based on the provided email
            let record = await lenderModel.findOne({ email: email });

            if (record === null) {
                // If no record is found, return an error response
                res.status(401).json({
                    status: false,
                    message: "Wrong email"
                });
            } else {
                // Generate a numeric OTP
                const otp = generateNumericOTP(6);

                // Update the existing lender record with the new OTP
                record.otp = otp;
                await record.save();

                // Send an email with the OTP for verification
                await sendEmail({
                    email: email,
                    subject: 'OTP to verify email',
                    message: `Your OTP is: ${otp}`
                });

                res.status(200).json({
                    status: true,
                    message: "OTP sent to your email",
                    result: record
                });
            }
        } catch (error) {
            res.status(400).json({
                status: false,
                message: "Something went wrong",
                error: error.message
            });
        }
    },


    // Route: Verify the OTP
    // verifyOtp: async (req, res) => {
    //     try {
    //         const { otp, email } = req.body;

    //         // Find the user with the provided email
    //         const verifyLander = await lenderModel.findOne({ email });

    //         if (!verifyLander) {
    //             return res.status(404).json({ message: 'User not found' });
    //         }

    //         // Compare the provided OTP with the one stored in the database
    //         if (verifyLander.otp === otp) {

    //             verifyLander.save();
    //             // OTP is valid
    //             // Perform the desired actions here after successful OTP verification
    //             // For example, update the user's status, mark the email as verified, etc.

    //             return res.status(200).json({ message: 'User verified successfully' });
    //         } else {
    //             // Invalid OTP
    //             return res.status(400).json({ message: 'Invalid OTP' });
    //         }
    //     } catch (err) {
    //         console.log(err);
    //         res.status(500).json({ message: 'Failed to verify OTP' });
    //     }
    // },


    verifyOtp: async (req, res) => {
        try {
            let id = req.params.id;
            let otp = req.body.otp
            let check = await lenderModel.findOne({ _id: id, otp: otp })
            if (check) {
                res.status(200).json({
                    status: true,
                    message: "otp verified successfully",
                    result: check
                })
            } else {
                res.status(401).json({
                    status: false,
                    message: "incorrect otp",

                })
            }
        } catch (error) {
            res.status(400).json({
                status: false,
                message: "something went wrong",
                error: error.message
            })
        }
    }







};


module.exports = lenderController




