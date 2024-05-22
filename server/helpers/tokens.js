const jwt = require("jsonwebtoken");

exports.generateToken = (payload, expired) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    // generate token using jwt.sign method
    expiresIn: expired, // set token expiration time in seconds or string format (e.g. 1h, 1d, 1y) or set to null for no expiration time (default)
  });
};
