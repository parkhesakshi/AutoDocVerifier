const User = require("../model/user");
const UserDocuments = require("../model/document");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/tokens");
const {
  sendVerificationEmail,
  sendResetPasswordEmail,
} = require("../helpers/mailer");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { calculateAge } = require("../helpers/general");

exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phoneno,
      dob,
      username,
      password,
      gender,
    } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 12);
    // console.log(encryptedPassword);
    // console.log(newUsername);
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message:
          "This email address is already exist.Try with different email address",
      });
    }

    const age = calculateAge(dob);

    const user = await User({
      first_name,
      last_name,
      email,
      phoneno,
      gender,
      dob,
      age,
      username,
      password: encryptedPassword,
    }).save();

    const Documents = await UserDocuments({
      user: user._id,
    }).save();

    const userDir = `./assets/users/${first_name}${last_name}_${user._id}`;
    try {
      if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir);
      }
    } catch (error) {
      console.log(error);
    }

    const fileUser = await User.findByIdAndUpdate(user._id, {
      userfolder: `${first_name}${last_name}_${user._id}`,
    });

    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);
    const token = generateToken({ id: user._id.toString() }, "7d");

    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      success: true,
      message:
        "Registration completed successfully! Please check your email for verification.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.activateAccount = async (req, res) => {
  try {
    const { token } = req.body;
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    const check = await User.findById(user.id);
    if (check.verified == true) {
      res.status(400).json({
        message: "This is email is already activated.",
        alreadyActivated: true,
      });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      return res.status(200).json({
        message: "Account has been activated successfully.",
        emailActivated: true,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { login_email, login_password } = req.body;
    const user = await User.findOne({ email: login_email });
    if (!user) {
      return res.status(400).json({
        message: "The email is you entered is not connected to an account",
      });
    }
    const check = await bcrypt.compare(login_password, user.password);
    if (!check) {
      return res.status(400).json({
        message: "Invalid credentials. Please try again.",
      });
    }
    const token = generateToken({ id: user._id.toString() }, "7d");
    return res.status(200).json({
      id: user._id,
      useremail: user.email,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Login success!",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.currentUser = async (req, res) => {
  const { usertoken } = req.body;
  try {
    const user = jwt.verify(usertoken, process.env.TOKEN_SECRET);
    const check = await User.findById(user.id);
    if (!check) {
      return res.status(400).json({
        notExist: true,
      });
    }
    return res.status(200).json({
      id: check._id,
      useremail: check.email,
      username: check.username,
      picture: check.picture,
      first_name: check.first_name,
      last_name: check.last_name,
      verified: check.verified,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.resetPasswordMail = async (req, res) => {
  try {
    const { user_email } = req.body;
    const user = await User.findOne({ email: user_email });
    console.log(user);
    if (!user) {
      return res.status(400).json({
        message: "The email is you entered is not connected to an account",
      });
    }
    const token = generateToken({ id: user._id.toString() }, "30m");
    const url = `${process.env.BASE_URL}/reset-password/${token}`;
    sendResetPasswordEmail(user.email, url);
    return res.status(200).json({
      message: "Please check your email for password reset link",
      success: true,
    });
  } catch (error) {}
};

exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    const encryptedPassword = await bcrypt.hash(password, 12);
    const check = await User.findByIdAndUpdate(user.id, {
      password: encryptedPassword,
    });
    return res.status(200).json({
      message: "Password reset successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateUserBasicInfo = async (req, res) => {
  const {
    user_id,
    profile_first_name,
    profile_last_name,
    profile_father_name,
    profile_dob,
    profile_age,
    profile_gender,
  } = req.body;

  const user = await User.findByIdAndUpdate(user_id, {
    first_name: profile_first_name,
    last_name: profile_last_name,
    father_name: profile_father_name,
    dob: profile_dob,
    age: profile_age,
    gender: profile_gender,
  });

  user.save();

  res.status(200).send({
    user: user,
    message: "User basic info updated successfully",
  });
};

exports.updateUserIdentityAndAddressInfo = async (req, res) => {
  const {
    user_id,
    profile_addharcard_number,
    profile_pan_number,
    profile_address1,
    profile_address2,
    profile_address_landmark,
    profile_address_pincode,
    profile_address_city,
    profile_address_district,
    profile_address_state,
  } = req.body;

  const user = await User.findByIdAndUpdate(user_id, {
    addharno: profile_addharcard_number,
    pan: profile_pan_number,
    address1: profile_address1,
    address2: profile_address2,
    address_landmark: profile_address_landmark,
    address_pincode: profile_address_pincode,
    address_city: profile_address_city,
    address_district: profile_address_district,
    address_state: profile_address_state,
  });

  res.status(200).send({
    message: "User basic info updated successfully",
  });
};
