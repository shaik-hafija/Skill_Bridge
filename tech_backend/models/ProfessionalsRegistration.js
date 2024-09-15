const mongoose = require('mongoose');

const ProfDetails = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    skills: { type: String, required: true },
    price: { type: Number, required: true },
    gender: { type: String, required: true },
    about: { type: String },
    demoImages: { type: [String] }, // Store file paths or URLs for the images
    demoVideos: { type: [String] }, // Store file paths or URLs for the videos
    password: { type: String, required: true }
    // notifications: { type: [String] },
    // myworks: { type: [String] }
    // token: { type: String }
});

module.exports = mongoose.model("ProfDetails", ProfDetails);
