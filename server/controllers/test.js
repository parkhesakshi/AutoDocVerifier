const mongoose = require("mongoose");
const conn = mongoose.connection.db;
const User = require("../model/user");

const Schema = mongoose.Schema;

const test = async () => {
  const TestSchema = new Schema({}, { strict: false });
  const commonDB = mongoose.model("Common", TestSchema, "User");

  const user = await User.findOne({ email: "abhisonar4121@gmail.com" });

  console.log(user);
};

test();
