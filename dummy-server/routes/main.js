const express = require("express");
const router = express.Router();

const { getDocInfo } = require("../controllers/main");

router.get("/get-doc-info-from-barcode/:barcode", getDocInfo);

module.exports = router;
