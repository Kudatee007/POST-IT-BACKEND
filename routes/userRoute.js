const express = require("express");
const router = express.Router();
const { register, login, username } = require("../controller/userController")

router.post("/register", register);
router.post("/login", login);
router.get("/username", username);


module.exports = router;