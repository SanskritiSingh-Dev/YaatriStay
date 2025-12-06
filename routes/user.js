const express = require("express");
const router = express.Router();
let userSchema = require("../models/user.js");
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync.js");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/user.js");


// Route to render signup form
router.get("/signup", userController.renderSignupForm);

// Route to handle signup logic
router.post("/signup", wrapAsync(userController.handleSignup));

// Route to render login form
router.get("/login", userController.renderLoginForm);

// Route to handle login logic
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    // using local strategy for authentication
    failureFlash: true, // enable flash messages on failure
    failureRedirect: "/login", // redirect to login page on failure
  }),
  userController.LoginForm
);

router.get("/logout", userController.logoutUser);

module.exports = router; // User routes would go here
