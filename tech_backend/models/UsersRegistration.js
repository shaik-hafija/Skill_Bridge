const mongoose = require('mongoose')

const UserRegDetails = new mongoose.Schema({
    name: String,
    email: String,
    phone_number: String,
    InterestedAreas: String,
    password: String,
    token:String
});

module.exports = mongoose.model("userregdetails", UserRegDetails);