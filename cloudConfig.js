const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

//configuring cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//setting up cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: { 
    folder: "YaatriStay_DEV",
    allowedFormats: ["jpeg", "png", "jpg"]
  },
});

module.exports = { storage, cloudinary };