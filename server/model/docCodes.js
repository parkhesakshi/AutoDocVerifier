const mongoose = require("mongoose");

const docCodesSchema = new mongoose.Schema({
  doc_code: {
    type: Number,
    unique: true,
    trim: true,
  },
  doc_name: {
    type: String,
  },
  doc_slug: {
    type: String,
    unique: true,
    trim: true,
  },
  expirable: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("DocCodes", docCodesSchema);
