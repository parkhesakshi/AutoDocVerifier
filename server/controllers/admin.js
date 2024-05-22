const bcrypt = require("bcrypt");
const Admin = require("../model/admin");
const DocCodes = require("../model/docCodes");
const { generateToken } = require("../helpers/tokens");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { first_name, last_name, email, password, picture } = req.body;

    // console.log(encryptedPassword);
    // console.log(newadminname);
    const check = await Admin.findOne({ email });
    if (check) {
      return res.status(400).json({
        message:
          "This email address is already exist.Try with different email address",
      });
    }
    const encryptedPassword = await bcrypt.hash(password, 12);
    const admin = await Admin({
      first_name,
      last_name,
      email,
      password: encryptedPassword,
      picture: picture,
    }).save();

    const token = generateToken({ id: admin._id.toString() }, "7d");

    res.send({
      id: admin._id,
      first_name: admin.first_name,
      last_name: admin.last_name,
      picture: admin.picture,
      token: token,
      success: true,
      message: "Admin added successfully!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { login_email, login_password } = req.body;
    const admin = await Admin.findOne({ email: login_email });
    if (!admin) {
      return res.status(400).json({
        message: "The email is you entered is not connected to an account",
      });
    }
    const check = await bcrypt.compare(login_password, admin.password);
    if (!check) {
      return res.status(400).json({
        message: "Invalid credentials. Please try again.",
      });
    }
    const token = generateToken({ id: admin._id.toString() }, "7d");
    return res.status(200).json({
      id: admin._id,
      email: admin.email,
      first_name: admin.first_name,
      last_name: admin.last_name,
      picture: admin.picture,
      token: token,
      message: "Login success!",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.addDocCode = async (req, res) => {
  try {
    const { doc_code, doc_name, doc_slug } = req.body;
    const docCode = await DocCodes({
      doc_code,
      doc_name,
      doc_slug,
    }).save();
    res.send({
      doc_code: docCode.doc_code,
      doc_name: docCode.doc_name,
      doc_slug: docCode.doc_slug,
      success: true,
      message: "Document code added successfully!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDocCodes = async (req, res) => {
  try {
    const docCodes = await DocCodes.find();
    res.send({
      docCodes,
      success: true,
      message: "Document codes fetched successfully!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
