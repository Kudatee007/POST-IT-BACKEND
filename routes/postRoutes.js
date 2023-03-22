const express = require("express");
const router = express.Router()
const {
    createPost,
    updatePost,
    deletePost,
    allPost,
    singlePost,
    onePost,
    singleStories
} = require("../controller/postController");
const uploadImage = require("../controller/uploadController");


router.route("/").get(allPost).post(createPost)
router.route("/:postId").patch(updatePost).delete(deletePost).get(singlePost)
router.get("/one/:postId", onePost);
router.post("/upload", uploadImage);

module.exports = router;