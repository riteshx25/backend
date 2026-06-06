const { Router } = require('express');

const {
  createPostController,
  getPostController,
  getPostDetailsController,
  likePostController,
} = require('../controllers/post.controller');

const verifyUser = require('../middlewares/auth.middleware');

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const postRouter = Router();

/**
 * @route POST /api/posts [proctected]
 * @description Create a post with the content and image (optional) provided in the req.file
 */

postRouter.post('/', upload.single('image'), verifyUser, createPostController);

/**
 * @route GET /api/posts [protected]
 */
postRouter.get('/', verifyUser, getPostController);

/**
 * @route Get api/posts/details/:postId
 * @return detail about specific post with the id. also check whether the post belongs to the user that the request came from
 */
postRouter.get('/details/:postId', verifyUser, getPostDetailsController);

/**
 * @route POST /api/posts/like/:postId
 * @description like a post with the id provided in the request params
 */
postRouter.post('/like/:postId', verifyUser, likePostController);

module.exports = postRouter;
