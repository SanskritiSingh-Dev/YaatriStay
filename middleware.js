//for authentication middleware
// to check if the user is logged in

const Listing = require("./models/listing"); //importing the Listing model
const { listingSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const { reviewSchema } = require("./schema.js");
const Review = require("./models/review");


// Middleware to check if user is logged in
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // checking if the user is authenticated
    req.session.redirectUrl = req.originalUrl; // storing the original URL in the session
    req.flash("error", "You must be signed in to create a new listing!");
    return res.redirect("/login");
  }
  next();
};

// Middleware to save the intended URL before login
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl; // making redirectUrl available in locals
  }
    next();
};

// Middleware to check if the logged-in user is the owner of the listing
module.exports.isOwner = async (req, res, next) => {
      const { id } = req.params;
    let list =  await Listing.findById(id); //finding the listing by id
    if(!list.owner._id.equals(req.user._id)){
      req.flash("error", "You are not the owner of this!"); // flash message for unauthorized access
      return res.redirect(`/listings/${id}`); //redirecting to the listing page if the user is not the owner
    }
    next();
};

// Middleware to validate listing data
module.exports.validateListing = (req, res, next) => {  
  let { error } = listingSchema.validate(req.body); // validate the request body against the listing schema
  if (error) {
    let errmsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(errmsg, 400); // if validation fails, throw an error
  } else {
    next(); // if validation passes, proceed to the next middleware/route handler
  }
};

////validate review middleware
module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body); // validate the request body against the review schema
  if (error) {
    let errmsg = error.details.map((el) => el.message).join(","); // create an error message from the validation errors   
    throw new ExpressError(errmsg, 400); // if validation fails, throw an error
  } else {
    next(); // if validation passes, proceed to the next middleware/route handler
  }
};


module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    let review =  await Review.findById(reviewId); //finding the listing by id
    if(!review.author.equals(res.locals.currentUser._id)){
      req.flash("error", "You are not the owner of this review!"); // flash message for unauthorized access
      return res.redirect(`/listings/${id}`); //redirecting to the listing page if the user is not the owner
    }
    next();
};
