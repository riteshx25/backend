const mongoose = require('mongoose');

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Follower is required'],
    },

    followee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Folloee is required'],
    },

    status: {
      type: String,
      default: 'pending',
      enum: {
        values: ['pending', 'accepted', 'rejected'],
        message: 'status can only be pending, accepted or rejected',
      },
    },
  },

  {
    timestamps: true,
  }
);

followSchema.index(
  {
    follower: 1,
    followee: 1,
  },
  {
    unique: true,
  }
);

const followModel = mongoose.model('follow', followSchema);

module.exports = followModel;
