const express = require('express')
const router = express.Router()

const {usersignUp,userlogin} = require("../controllers/userController")

// signUp
router.post("/signUp",usersignUp)

// login
router.post("/login",userlogin)

// router.get("/verify-email", verifyEmail);



module.exports = router

