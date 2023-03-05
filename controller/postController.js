const Post = require("../models/postModel");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const createPost = async (req, res) => {
  const { title, tags, story, image } = req.body;
  console.log(req.body.image);
  if (!title || !tags || !story) {
    res.status(400).json({
      success: false,
      msg: "Provide necessary information",
    });
  }

  try {
    // const result = await cloudinary.uploader.upload(
    //   req.body.image,
    //   {
    //     use_filename: true,
    //     folder: "storyImages",
    //   }
    // );
    // req.body.image = result.secure_url;
    // fs.unlinkSync(req.files.image.tempFilePath);
    const post = await Post.create({ ...req.body });
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.log(error);
  }
};

const updatePost = async (req, res) => {
  const {
    params: { postId },
    user: { userId },
  } = req;
  try {
    const post = await Post.findOneAndUpdate(
      { createdBy: userId, _id: postId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.log(error);
  }
};

const deletePost = async (req, res) => {
  const {
    params: { postId },
    user: { userId },
  } = req;
  try {
    const post = await Post.findByIdAndDelete({
      createdBy: userId,
      _id: postId,
    });
    res.status(200).json({
      success: true,
      data: "deleted",
      post,
    });
  } catch (error) {
    console.log(error);
  }
};

const allPost = async (req, res) => {
  try {
    const post = await Post.find({ createdby: req.user.userId });
    res.status(200).json({
      success: true,
      noOfJobs: post.length,
      post,
    });
  } catch (error) {
    console.log(error);
  }
};

const singlePost = async (req, res) => {
  const {
    user: { userId },
    params: { postId },
  } = req;
  try {
    const post = await Post.findOne({ createdBy: userId, _id: postId });
    if (!post) {
      res.status(400).json({
        success: false,
        msg: `Post with ${postId} not found`,
      });
    }
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  allPost,
  singlePost,
};
