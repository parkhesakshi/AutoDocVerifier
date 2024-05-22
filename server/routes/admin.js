const express = require("express");
const router = express.Router();
const { register, login, addDocCode } = require("../controllers/admin");
const { checkAdmin } = require("../middlewares/AdminAuth");

router.post("/admin-register", register);
router.post("/admin-login", login);
router.post("/add-doc-code", checkAdmin, addDocCode);
module.exports = router;
