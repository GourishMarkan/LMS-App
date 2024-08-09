// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const {
  login,
  signup,
  sendotp,
  changePassword,
  getUserById,
  updateUserById,
  updateAdditionalDetails,
  userLogin,
  adminLogin,
} = require("../controllers/Auth")
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword")

const { auth } = require("../middlewares/auth")
const { buyQuiz, buyMaterials } = require("../controllers/BuyItem")

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", userLogin)
router.post("/adminlogin", adminLogin)

// Route for user signup
router.post("/signup", signup)

// Route for sending OTP to the user's email
router.post("/sendotp", sendotp)
router.get("/getUserById", getUserById)
router.get("/updateUserById", updateUserById)

// Route for Changing the password
router.post("/changepassword", auth, changePassword)

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

router.post("/additionalDetails/:id",updateAdditionalDetails)


router.post("/buyQuiz/:id", buyQuiz)
router.post("/buyMaterials/:id", buyMaterials)

// Export the router for use in the main application
module.exports = router