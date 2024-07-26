// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment, verifyPayment, sendPaymentSuccessEmail } = require("../controllers/Payments")
const { uploadStudyMaterials } = require("../controllers/CourseMaterials")
const multer = require("multer");



const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post("/uploadStudyMaterials",upload.single('file'),  uploadStudyMaterials)
// router.post("/verifyPayment", verifyPayment)
// router.post("/sendPaymentSuccessEmail",  sendPaymentSuccessEmail);

module.exports = router