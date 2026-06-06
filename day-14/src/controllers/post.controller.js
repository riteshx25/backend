const { ImageKit, toFile } = require('@imagekit/nodejs');
const jwt = require('jsonwebtoken');

const postModel = require('../models/post.model');
const userModel = require('../models/user.model');
const likeModel = require('../models/like.model');

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.URL_ENDPOINT,
});

async function createPostController(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: 'image required',
      });
    }

    // upload image

    const result = await imagekit.files.upload({
      file: await toFile(req.file.buffer, req.file.originalname),
      fileName: req.file.originalname,
      folder: '/posts',
    });

    // create post

    const post = await postModel.create({
      caption: req.body.caption,
      imgUrl: result.url,
      user: req.user.id,
    });

    return res.status(201).json({
      message: 'post created',
      post,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
}

async function getPostController(req, res) {
  try {
    const userId = req.user.id;

    const posts = await postModel.find({ user: userId });

    res.status(200).json({
      message: 'post fetched successfully',
      posts,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: 'Token invaled',
    });
  }
}

async function getPostDetailsController(req, res) {
  try {
    const userId = req.user.id;
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: 'post not found',
      });
    }

    const isValidUser = post.user.toString() === userId;

    if (!isValidUser) {
      return res.status(403).json({ message: 'forbiden content...' });
    }
    console.log(post);

    res.status(200).json({
      message: 'user fetched successfully',
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: 'Token invaled',
    });
  }
}

async function likePostController(req, res) {
  const userId = req.user.id;
  const { postId } = req.params;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: 'post not found',
    });
  }

  const isLiked = await likeModel.findOne({
    post: postId,
    user: userId,
  });

  if (isLiked) {
    return res.status(200).json({
      message: 'you already liked',
    });
  }

  const like = await likeModel.create({
    post: postId,
    user: userId,
  });
  res.status(201).json({
    message: 'post like successfully',
    like,
  });
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
  likePostController,
};
