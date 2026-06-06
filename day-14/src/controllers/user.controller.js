const followModel = require('../models/follow.model');

async function followUserController(req, res) {
  try {
    const followerId = req.user.id;
    const followeeId = req.params.userId;

    if (followerId === followeeId) {
      return res.status(400).json({
        message: 'you cannot follow yourself',
      });
    }

    const isAlreadyFollow = await followModel.findOne({
      follower: followerId,
      followee: followeeId,
    });

    if (isAlreadyFollow) {
      return res.status(400).json({
        message: 'you can follow a person only one time',
      });
    }

    const follow = await followModel.create({
      follower: followerId,
      followee: followeeId,
    });

    res.status(201).json({
      message: 'Followed successfully',
      follow,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err.message,
    });
  }
}

async function unFollowUserController(req, res) {
  const followerId = req.user.id;
  const followeeId = req.params.userId;

  const isAlreadyFollow = await followModel.findOne({
    follower: followerId,
    followee: followeeId,
  });

  if (!isAlreadyFollow) {
    return res.status(400).json({
      message: 'you dont follow',
    });
  }

  const unFollowed = await followModel.findByIdAndDelete(isAlreadyFollow._id);
  res.status(200).json({
    message: 'unFollowed successfully',
    unFollowed,
  });
}

async function getFollowersController(req, res) {
  try {
    const { userId } = req.params;

    // Users who follow this user
    const followers = await followModel
      .find({
        followee: userId,
      })
      .populate('follower', 'username');

    res.status(200).json({
      success: true,
      message: 'Followers fetched successfully',
      followers,
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}

async function getFollowingController(req, res) {
  try {
    const { userId } = req.params;

    // Users this user is following
    const following = await followModel
      .find({
        follower: userId,
      })
      .populate('followee', 'username');

    res.status(200).json({
      success: true,
      message: 'Following fetched successfully',
      following,
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}

async function followRequestController(req, res) {
  const followerId = req.user.id;
  const followeeId = req.params.followeeId;

  const follow = await followModel.create({
    follower: followerId,
    followee: followeeId,
    status: 'pending',
  });

  res.status(201).json({
    message: 'follow request sent',
    follow,
  });
}

async function followAcceptController(req, res) {
  const followeeId = req.user.id;
  const { followerId } = req.params;

  const acceptedRequest = await followModel.findOneAndUpdate(
    {
      followee: followeeId,
      follower: followerId,
      status: 'pending',
    },

    {
      status: 'accepted',
    },

    {
      new: true,
    }
  );

  if (!acceptedRequest) {
    return res.status(404).json({
      message: 'request not found',
    });
  }

  res.status(200).json({
    message: 'request accepted',
    acceptedRequest,
  });
}

async function followRejectController(req, res) {
  const followeeId = req.user.id;
  const followerId = req.params.followerId;

  if (!followerId) {
    return res.status(400).json({
      message: 'forbiden request',
    });
  }

  const deletedRequest = await followModel.findOneAndDelete({
    followee: followeeId,
    follower: followerId,
    status: 'pending',
  });

  if (!deletedRequest) {
    return res.status(404).json({
      message: 'request not found',
    });
  }

  res.status(200).json({
    message: 'requested rejected',
    deletedRequest,
  });
}

module.exports = {
  followUserController,
  unFollowUserController,
  getFollowersController,
  getFollowingController,
  followRequestController,
  followAcceptController,
  followRejectController,
};
