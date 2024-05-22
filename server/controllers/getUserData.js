const Admin = require("../model/admin");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

exports.getAllUsers = async (req, res) => {
  try {
    const bearerToken = req.header("Authorization");
    const token = bearerToken.split(" ")[1];

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    const checkAdmin = await Admin.findById(decoded.id).select("-password");

    if (!checkAdmin) return res.status(401).json({ msg: "Not authorized" });

    const users = await User.find({}).select("-password");

    res.json(users);
  } catch (err) {
    res.status(400).send("Invalid token !");
  }
};

exports.getUserByIdWithToken = async (req, res) => {
  // const bearerToken = req.header("Authorization");
  // const token = bearerToken.split(" ")[1];
  try {
    // const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    // console.log("decoded", decoded);

    // const checkAdmin = await Admin.findById(decoded.id).select("-password");

    // if (!checkAdmin) return res.status(401).json({ msg: "Not authorized" });

    const { userid } = req.body;

    const user = await User.findOne({ _id: userid }).select("-password");

    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
};

exports.getUserById = async (req, res) => {
  const userid = req.params.id;

  const user = await User.findById(userid).select("-password");

  if (!user) return res.status(404).json({ msg: "User not found" });

  res.json(user);
};
