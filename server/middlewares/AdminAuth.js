const Admin = require("../model/admin");
const jwt = require("jsonwebtoken");
exports.checkAdmin = async (req, res, next) => {
  const bearerToken = req.header("Authorization");
  const token = bearerToken.split(" ")[1];

  console.log("token", token);
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) return res.status(401).json({ msg: "Unauthorized User!" });
    req.admin = admin;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
