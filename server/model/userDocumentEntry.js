const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userDocumentEntrySchema = new mongoose.Schema({
  doc_code: {
    type: Number,
    required: true,
  },
  user_id: {
    type: ObjectId,
    ref: "User",
  },
  uploaded_at: {
    type: String,
  },
  verified_at: {
    type: String,
  },
  barcode: {
    type: String,
  },
  pdf_file_name: {
    type: String,
  },
  png_file_name: {
    type: String,
  },
  ds_verified: {
    type: Boolean,
    default: false,
  },
  ocr_verified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("UserDocumentEntry", userDocumentEntrySchema);
