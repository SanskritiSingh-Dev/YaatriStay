const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;

// Define the Listing schema
const listingSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { 
    url: String,
    filename: String,
  },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  country: { type: String, required: true },
  // Array of references to Review documents
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId, // reference to the User who owns the listing
    ref: "User", // referencing the User model
    required: true, // owner field is required
  },
  // category:{
  //    type: String,
  //    enum: ['Trending', 'Rooms', 'Iconic City', 'Castle', 'Mountains', 'Pools', 'Camping', 'Farm', 'Arctic', 'Forest', 'Beachside', 'Riverside', 'Unique Stay'], 
  // },
});

// Middleware to delete associated reviews when a listing is deleted
listingSchema.post("findOneAndDelete", async (listing) => { // middleware function triggered after a listing is deleted
  if (listing) {
    await review.deleteMany({ // deleting all reviews associated with the deleted listing
      _id: {
        $in: listing.reviews, // using the $in operator to match all review IDs in the listing's reviews array
      },
    });
  }
});
// Create and export the Listing model
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
