# 🌍 YAATRISTAY  
### A Full-Stack Travel Stay Platform (Airbnb-Inspired)

YAATRISTAY is a full-stack web application inspired by Airbnb, built to explore, list, and manage travel accommodations across India.  
It demonstrates **real-world backend architecture, authentication, cloud integration, and clean UI design** using modern web technologies.

This project focuses on **scalability, security, and user experience**, making it suitable as a **portfolio-level full-stack application**.

---

## ✨ Why YAATRISTAY?

YAATRISTAY is not just a CRUD project.

It showcases:
- Real authentication & authorization
- Cloud-based image handling
- Secure session storage
- MVC architecture
- Clean RESTful routing
- UI features inspired by real products (Airbnb)

This project reflects **how real web applications are structured and deployed**.

---

## 🚀 Core Features

### 🔐 Authentication & Authorization
- User signup & login using **Passport.js**
- Secure password hashing
- Authorization rules:
  - Only owners can edit/delete listings
  - Only logged-in users can post reviews
- Persistent login using sessions stored in MongoDB

---

### 🏠 Listings Management
- Create, edit, and delete listings
- Each listing contains:
  - Title & description
  - Price per night
  - Location & country
  - Owner details
  - Uploaded image
- Automatic fallback image if none is provided
- Owner information displayed on listing pages

---

### 🖼 Cloud Image Upload
- File upload handled using **Multer**
- Images stored securely on **Cloudinary**
- Cloud URLs saved in MongoDB
- Image preview before upload
- Optimized image resizing for performance

---

### ⭐ Reviews & Ratings
- Users can post reviews with ratings
- Star-based rating UI using **Starability**
- Reviews are linked to users and listings
- Cascade deletion: reviews auto-delete when a listing is removed

---

### 🎯 UI & UX Enhancements
- Airbnb-style filter bar
- Horizontal scrolling filters for smaller screens
- Category-based visual filters
- Responsive card-based layout
- Modern UI using Bootstrap & Font Awesome

---

### 💰 Tax Calculation Toggle
- Interactive toggle to display:
  - Base price
  - Price + 18% GST
- Implemented entirely on the frontend
- Instant UI update without page reload

---

### 🔎 Search (Scaffolded)
- Global search bar available across all pages
- Backend architecture ready for future search logic

---

## 🧱 Tech Stack

### Frontend
- **EJS** (templating)
- **Bootstrap 5**
- **Font Awesome**
- **Starability CSS**
- Vanilla JavaScript

### Backend
- **Node.js**
- **Express.js**
- **MongoDB (Atlas)**
- **Mongoose**
- **Passport.js**
- **Express-Session**
- **Connect-Mongo**

### Cloud & Tools
- **Cloudinary** (image storage)
- **MongoDB Atlas**
- **dotenv** (environment configuration)


---

## 🔒 Security & Best Practices
- Password hashing & authentication
- Session storage in MongoDB
- HTTP-only cookies
- Environment-based secrets
- Authorization checks on protected routes
- Centralized error handling
- Flash messages for user feedback

---

## ⚙️ Environment Setup

Create a `.env` file in the root directory:
- ATLASDB_URL=your_mongodb_atlas_url
- CLOUDINARY_CLOUD_NAME=your_cloud_name
- CLOUDINARY_KEY=your_api_key
- CLOUDINARY_SECRET=your_api_secret
- SECRET=your_session_secret


---

## ▶️ Run Locally

```bash
git clone https://github.com/your-username/yaatristay.git
cd yaatristay
npm install
nodemon app.js
```

---

## 👩‍💻 Author

Sanskriti Singh
- Full-Stack Developer
- Built with a focus on learning real-world backend systems and scalable web applications.


⭐ If this project helped or inspired you, feel free to star the repository!


