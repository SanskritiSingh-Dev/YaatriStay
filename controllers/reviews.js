const Listing = require("../models/listing");
const Review = require("../models/review");


module.exports.createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id); //finding the listing by id
  let newReview = new Review(req.body.review); //creating a new review using the data from the request body
  newReview.author = req.user._id; //setting the author of the review to the current logged-in user
  listing.reviews.push(newReview); //adding the new review to the listing's reviews array

  await newReview.save(); //saving the new review to the database
  await listing.save(); //saving the updated listing to the database
  req.flash("success", "Successfully added a new review!"); // flash message for successful review creation
  res.redirect(`/listings/${listing._id}`); //redirecting to the listing's show page
};

module.exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params; //destructuring id and reviewId from req.params
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); //removing the reviewId from the listing's reviews array
  await Review.findByIdAndDelete(reviewId); //deleting the review by reviewId
  req.flash("success", "Successfully deleted the review!"); // flash message for successful review deletion
  res.redirect(`/listings/${id}`); //redirecting to the listing's show page
};
