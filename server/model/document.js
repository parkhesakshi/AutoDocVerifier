const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const DocumentsSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "User",
  },
  CasteCertificate: {
    type: ObjectId,
    ref: "DocModel",
    default: null,
  },
  NonCreamyLayerCertificate: {
    type: ObjectId,
    ref: "DocModel",
    default: null,
  },
  DomicileCertificate: {
    type: ObjectId,
    ref: "DocModel",
    default: null,
  },
  IncomeCertificate: {
    type: ObjectId,
    ref: "DocModel",
    default: null,
  },
});

module.exports = mongoose.model("UserDocuments", DocumentsSchema); //export UserDocuments model to use in other files
