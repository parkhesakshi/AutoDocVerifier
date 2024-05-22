const express = require("express");
const { getDocCodes } = require("../controllers/admin");
const router = express.Router();
const {
  getAllUsers,
  getUserByIdWithToken,
  getUserById,
} = require("../controllers/getUserData");
const { checkAdmin } = require("../middlewares/AdminAuth");

const mongoose = require("mongoose");

router.get("/get-all-users", getAllUsers);
router.post("/get-user-by-id-token", checkAdmin, getUserByIdWithToken);
router.get("/get-user-by-id/:id", getUserById);
router.get("/get-doc-codes", getDocCodes);
module.exports = router;
