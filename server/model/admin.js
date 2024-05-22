const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "Please enter a first name"],
    trim: true,
  },
  last_name: {
    type: String,
    required: [true, "Please enter a first name"],
    trim: true,
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
  picture: {
    type: String,
    default:
      "https://res.cloudinary.com/abhisonar0130/image/upload/v1654775724/avatar_kejfpw.jpg",
  },
});

module.exports = mongoose.model("Admin", adminSchema);
