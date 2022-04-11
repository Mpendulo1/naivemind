const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

/*
@desc    register user 
@route   POST /auth/register
@access  public
*/
const registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ Error: "Please fill in all fields" });
    return;
  }

  // Check if username is taken
  const usernameTaken = await User.findOne({ username });

  if (usernameTaken) {
    res.status(409).json({ err: "username already in use" });
    throw new Error("Username already in use");
  }

  // Create user
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    username: username,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      id: user._id,
      username: user.username,
      token: genJWT(user._id),
    });
    return;
  } else {
    res.status(400);
    return;
  }
};

/*
@desc   log user in
@route  POST /auth/login
@access public
*/
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      id: user._id,
      username: user.username,
      token: genJWT(user._id),
    });
    return;
  } else {
    res.status(400);
  }
};

// Generate JWT
const genJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

module.exports = { registerUser, loginUser };
