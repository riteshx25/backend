const { Router } = require('express');
const {
  followUserController,
  unFollowUserController,
  getFollowersController,
  getFollowingController,
  followRequestController,
  followAcceptController,
  followRejectController,
} = require('../controllers/user.controller');

const verifyUser = require('../middlewares/auth.middleware');

const userRouter = Router();

userRouter.post('/follow/:followeeId', verifyUser, followRequestController);

userRouter.patch('/follow/accept/:followerId', verifyUser, followAcceptController);

userRouter.delete('/follow/reject/:followerId', verifyUser, followRejectController);

/**
 * @route POST /api/users/follow/:userId
 * @description Follow a user
 * @access Private
 */
userRouter.post('/follow/:userId', verifyUser, followUserController);

/**
 * @route POST /api/users/unFollow/:userId
 * @description unFollow a user
 * @access Private
 */
userRouter.post('/unFollow/:userId', verifyUser, unFollowUserController);

userRouter.post('/follower/:userId', verifyUser, getFollowersController);
userRouter.post('/following/:userId', verifyUser, getFollowingController);
module.exports = userRouter;
