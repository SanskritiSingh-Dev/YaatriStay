// Load environment variables from .env file if not in production
if(process.env.NODE_ENV !== "production"){
  require("dotenv").config(); // Load environment variables from .env file in non-production environments
}

const express = require("express");
const app = express();
const mongoose = require("mongoose"); 
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const userSchema = require("./models/user.js");

// Importing route handlers
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// Setting up EJS as the templating engine with ejs-mate for layouts
app.engine("ejs", ejsMate);

// Middleware to override methods for PUT and DELETE requests
app.use(methodOverride("_method"));

// Database connection url
const dburl = process.env.ATLASDB_URL;

// Connect to database
main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// async function to connect to database
async function main() {
  await mongoose.connect(dburl);
  console.log("Database connected");
}

// Serving static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));


// Set view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware to parse request body
app.use(express.urlencoded({ extended: true }));


// Session configuration
const sessionOptions = {
  secret: process.env.SECRET, // should be stored in environment variable in production
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // save uninitialized sessions
  cookie : {
    httpOnly: true, // helps to prevent cross-site scripting attacks
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, //7 days from now
    maxAge: 7 * 24 * 60 * 60* 1000 //7 days
  }
};

//we have to use session and flash middleware before using them in routes because they depend on it.
app.use(session(sessionOptions)); // using session middleware
app.use(flash()); // using flash middleware

// Passport.js configuration for authentication
app.use(passport.initialize()); // initializing passport middleware 
app.use(passport.session()); // using passport session middleware
passport.use(new LocalStrategy(userSchema.authenticate())); // using local strategy for authentication

passport.serializeUser(userSchema.serializeUser()); // serialize user into the session
passport.deserializeUser(userSchema.deserializeUser()); // deserialize user from the session


// Middleware to make flash messages available in all templates
app.use((req, res, next) => {
  res.locals.success = req.flash("success"); // making success flash messages available in all templates
  res.locals.error = req.flash("error"); // making error flash messages available in all templates
  res.locals.currentUser = req.user; // making the current user available in all templates
  next();
});

// Using the listings routes for all routes starting with /listings
app.use("/listings", listingsRouter);

// Using the reviews routes for all routes starting with /listings/:id/reviews
app.use("/listings/:id/reviews", reviewsRouter);

// Using the user routes for all routes starting with /users
app.use("/", userRouter);

// if the developer went to a route that does not exist, Catch-all route for handling 404 errors
app.use((req, res, next) => {
  next(new ExpressError("Page Not Found!", 404));
});

//middleware to handle errors related to async functions - Error-handling middleware
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;

  if (res.headersSent) {
    return next(err);
  }

  res.status(statusCode).render("error.ejs", { message });
});


// Connect to server
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
