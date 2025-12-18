const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync.js");
const { saveRedirectUrl } = require("../middleware.js");

//Importing user controller functions
const userController = require("../controllers/user.js");

//Signup Routes
router
  .route("/signup")
  .get(userController.renderSignupForm)
  .post(wrapAsync(userController.handleSignup));

//Login Routes
router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      // using local strategy for authentication
      failureFlash: true, // enable flash messages on failure
      failureRedirect: "/login", // redirect to login page on failure
    }),
    userController.LoginForm
  );

//Logout Route
router.get("/logout", userController.logoutUser);

module.exports = router; // User routes would go here