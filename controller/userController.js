const User = require("../models/userModel");
const handleError = require("../utils/errorHandler");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      msg: "Provide the neccessary details",
    });
  }

  try {
    const user = await User.create({ ...req.body });
    const token = await user.generateToken();

    res.status(400).json({ data: user, token });
  } catch (error) {
    const errors = handleError(error);
    res.status(404).json({ errors });
    console.log(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if ((!email, !password)) {
    return res.status(400).json({
      success: false,
      msg: "Provide the neccessary details",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw Error("Incorrect Email");
    }
    const auth = await user.comparePassword(password);
    if (!auth) {
      throw Error("Incorrect Password");
    }

    const token = await user.generateToken();

    res.status(200).json({
      success: true,
      user: {
        name: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    const errors = handleError(error);
    res.status(404).json({ errors });
    console.log(error);
  }
};

const username = () => {
  Post.find({}, '-__v')
    .populate('author', 'username')
    .exec((err, posts) => {
      if (err) {
        console.error(err);
      } else {
        console.log(posts);
        res.json({ posts });
      }
    });
};


module.exports = { register, login, username };
