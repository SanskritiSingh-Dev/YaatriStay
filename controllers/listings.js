const Listing = require("../models/listing");

// ===============================
// INDEX ROUTE – SHOW ALL LISTINGS
// + HANDLE SEARCH FUNCTIONALITY
// ===============================
module.exports.index = async (req, res) => {
  // Get search query from URL ( /listings?search=goa )
  const { search } = req.query;

  let allListings;

  // If search text exists, filter listings
  if (search) {
    // Create a case-insensitive regex for partial matching
    const regex = new RegExp(search, "i");

    // Search in title, location, or country fields
    allListings = await Listing.find({
      $or: [
        { title: regex },
        { location: regex },
        { country: regex },
      ],
    });
  } else {
    // If no search query, fetch all listings
    allListings = await Listing.find({});
  }

  // Render index page with listings
  res.render("listings/index.ejs", { allListings });
};

// ===============================
// RENDER NEW LISTING FORM
// ===============================
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// ===============================
// SHOW SINGLE LISTING
// ===============================
module.exports.showListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Cannot find that listing!");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

// ===============================
// CREATE NEW LISTING
// ===============================
module.exports.createListing = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };

  await newListing.save();

  req.flash("success", "Successfully made a new listing!");
  res.redirect("/listings");
};

// ===============================
// EDIT LISTING FORM
// ===============================
module.exports.editListingForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Cannot find that listing!");
    return res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace(
    "/upload",
    "/upload/h_300,w_250"
  );

  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

// ===============================
// UPDATE LISTING
// ===============================
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;

  let listing = await Listing.findByIdAndUpdate(id, {
    ...req.body.listing,
  });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Successfully updated the listing!");
  res.redirect("/listings");
};

// ===============================
// DELETE LISTING
// ===============================
module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;

  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);

  req.flash("success", "Successfully deleted the listing!");
  res.redirect("/listings");
};
