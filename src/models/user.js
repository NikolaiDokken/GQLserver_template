const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
});

module.exports = model("User", userSchema);
