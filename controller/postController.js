const Post = require("../models/postModel");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const createPost = async (req, res) => {
  const { title, tags, story, image, createdBy } = req.body;
  req.body.createdBy = req.user.userId;
  console.log(req.body);

  if (!title || !tags || !story) {
    return res.status(400).json({
      success: false,
      msg: "Provide necessary information",
    });
  }
  try {
    const result = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      {
        use_filename: true,
        folder: "storyImages",
      }
    );

    fs.unlinkSync(req.files.image.tempFilePath);
    req.body.image = result.secure_url;
    const post = await Post.create({ ...req.body });
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.log(error);
    console.log("error creating");
  }
};

const updatePost = async (req, res) => {
  const {
    params: { postId },
    user: { userId },
  } = req;
  try {
    const post = await Post.findOneAndUpdate({ _id: postId }, req.body, {
      new: true,
      runValidators: true,
    });
    console.log(req.body);
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.log(error);
  }
};

// const updatePost = async (req, res) => {
//   const { id } = req.params;
//   const { title, content } = req.body;

//   try {
//     const post = await Post.findOne({ _id: id });
//     if (!post) {
//       return res.status(404).json({ message: "Post not found" });
//     }

//     if (req.file) {
//       const imagePath = req.file.path;
//       post.image = imagePath;
//     }

//     post.title = title || post.title;
//     post.content = content || post.content;
//     const updatedPost = await post.save();
//     res.status(200).json(updatedPost);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

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
    // populate("createdBy", "username")
    const post = await Post.find({ createdby: req.user.userId })

    res.status(200).json({
      success: true,
      noOfJobs: post.length,
      post,
    });
    console.log(post.createdBy);
  } catch (error) {
    console.log(error);
  }
};
const singleStories = async (req, res) => {
  try {
    const story = await Stories.find({ createdBy: req.user.userId });
    res.status(200).json({ noOfStories: story.length, story });
  } catch (error) {
    res.json({ error });
  }
};

const singlePost = async (req, res) => {
  const { userId } = req.user;
  try {
    const post = await Post.find({ createdBy: req.user.userId });
    if (!post) {
      res.status(400).json({
        success: false,
        msg: `Post with ${postId} not found`,
      });
      return;
    }
    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    console.log(error);
  }
};

const onePost = async (req, res) => {
  const { postId } = req.params;
  console.log({ postId });

  try {
    const post = await Post.findById(postId);
    if (!post) {
      res.status(400).json({
        success: false,
        msg: `Post with ${postId} not found`,
      });
      return;
    }
    res.status(200).json({
      succeess: true,
      post,
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
  onePost,
  singleStories,
};
