const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
    trim: true,
    text: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
  first_name: {
    type: String,
    required: [false, "Please enter a first name"],
    trim: true,
  },
  last_name: {
    type: String,
    required: [false, "Please enter a last name"],
    trim: true,
  },
  father_name: {
    type: String,
    required: [false, "Please enter a father name"],
    default: null,
  },
  dob: {
    type: Date,
    required: [false, "Please enter a date of birth"],
  },
  age: {
    type: Number,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  picture: {
    type: String,
    trim: true,
    default:
      "https://res.cloudinary.com/abhisonar0130/image/upload/v1654775724/avatar_kejfpw.jpg",
  },
  userfolder: {
    type: String,
  },
  phoneno: {
    type: String,
    trim: true,
    // minlength: [10, "Phone Number should be 10 digits long"],
  },
  gender: {
    type: String,
    trim: true,
  },
  addharno: {
    type: String,
    default: null,
    nullable: true,
    unique: false,
  },
  pan: {
    type: String,
    default: null,
    nullable: true,
  },
  address1: {
    type: String,
    default: null,
  },
  address2: {
    type: String,
    default: null,
  },
  address_landmark: {
    type: String,
    default: null,
  },
  address_pincode: {
    type: Number,
    default: null,
  },
  address_district: {
    type: String,
    default: null,
  },
  address_city: {
    type: String,
    default: null,
  },
  address_state: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("User", userSchema);
