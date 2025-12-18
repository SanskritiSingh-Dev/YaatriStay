const userSchema = require("../models/user.js");

// ---------------- SIGNUP ----------------
module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.handleSignup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new userSchema({ username, email });
    const registeredUser = await userSchema.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to YaatriStay!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

// ---------------- LOGIN ----------------

// Renders the login page
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

// Runs AFTER passport.authenticate (successful login)
module.exports.LoginForm = (req, res) => {
  req.flash("success", "Welcome back to YaatriStay!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

// ---------------- LOGOUT ----------------
module.exports.logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "Logged you out!");
    res.redirect("/listings");
  });
};
