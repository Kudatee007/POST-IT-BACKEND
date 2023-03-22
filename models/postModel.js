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
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      autopopulate: { select: "username" } 
    },
    createdAt: {
      type: Date,
      default: Date.now()
    }
  },
  { timestamps: true }
);

postModel.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("POST", postModel);
