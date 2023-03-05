const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postModel = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    tags: {
      type: String,
      required: true,
      enum: ["Technology", "Nature", "Lifestyle"],
    },
    story: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("POST", postModel);
