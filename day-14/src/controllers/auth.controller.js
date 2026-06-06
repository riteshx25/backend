const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const userModel = require('../models/user.model');

async function registerController(req, res) {
  try {
    const { username, email, password, bio, profileImage } = req.body;

    const isUserAlreadyExist = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserAlreadyExist) return res.status(409).json({ message: `user already exist` });

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      username,
      email,
      bio,
      profileImage,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.cookie('token', token);

    return res.status(201).json({
      message: 'User created successfully',
      user: user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}

async function loginController(req, res) {
  const { email, username, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ email: email }, { username: username }],
  });

  if (!user) {
    return res.status(404).json({ message: 'user does not exist' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.status(401).json({ message: 'password invalid' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.cookie('token', token);

  return res.status(200).json({
    token,
    message: 'user loggedIn succesfully',
    user: {
      userId: user._id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

module.exports = {
  registerController,
  loginController,
};
