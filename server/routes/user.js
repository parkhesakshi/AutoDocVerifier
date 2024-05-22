const express = require("express");
const router = express.Router();
const {
  register,
  activateAccount,
  login,
  currentUser,
  resetPassword,
  resetPasswordMail,
  updateUserBasicInfo,
  updateUserIdentityAndAddressInfo,
} = require("../controllers/user");

router.post("/register", register);
router.post("/activate", activateAccount);
router.post("/login", login);
router.post("/current-user", currentUser);
router.post("/reset-password-mail", resetPasswordMail);
router.post("/reset-password", resetPassword);
router.put("/update-user-basic-info", updateUserBasicInfo);
router.put(
  "/update-user-identity-and-address-info",
  updateUserIdentityAndAddressInfo
);
module.exports = router;
