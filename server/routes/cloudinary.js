const express = require("express");
const { upload_profile } = require("../controllers/cloudinary");
const router = express.Router();

router.post("/upload-user-profile-pic", upload_profile);

module.exports = router;
