const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = new Schema(
  {
    username: {
      type: String,
      required: [true, "Provide a username"],
    },
    email: {
      type: String,
      required: [true, "Provide a email address"],
      unique: [true],
      validate: [isEmail, "Provide correct email"],
    },
    password: {
      type: String,
      required: [true, "Provide a password"],
    },
  },
  { timestamps: true }
);

userModel.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userModel.methods.comparePassword = async function (userPassword) {
  const isCorrect = await bcrypt.compare(userPassword, this.password);
  return isCorrect;
};

userModel.methods.generateToken = async function (params) {
  return jwt.sign(
    { userId: this._id, name: this.username },
    process.env.JWT_SECRET,
    { expiresIn: "3d" }
  );
};

module.exports = mongoose.model("User", userModel);
