/** what are we doing exactly?
This file defines the routes for handling listings in an Express.js application.
It includes routes for creating, reading, updating, and deleting listings,
as well as middleware for validating listing and review data using Joi schemas. **/

const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");//importing cloudinary storage configuration
const upload = multer({ storage });//setting up multer with cloudinary storage

//importing the listings controller
const listingController = require("../controllers/listings.js");

//router.route for listings index and create
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
  isLoggedIn,
  upload.single('listing[image]'),
  validateListing,
  wrapAsync(listingController.createListing)
  );
  
//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//Show, Update, and Delete Routes
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(
    isLoggedIn, 
    isOwner, 
    wrapAsync(listingController.deleteListing));

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editListingForm)
);

module.exports = router;
