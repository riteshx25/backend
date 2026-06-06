const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: [true, 'username already exist'],
      required: [true, 'username is required'],
    },

    email: {
      type: String,
      unique: [true, 'Email already exists'],
      required: [true, 'Email is required'],
    },

    password: {
      type: String,
      required: [true, 'password is required'],
    },

    bio: String,

    profileImage: {
      type: String,
      default:
        'https://ik.imagekit.io/d05hbimvo/user-profile-icon-vector-avatar-600nw-2558760599.webp?updatedAt=1779732401707',
    },
  },

  {
    timestamps: true,

    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
        return ret;
      },
    },
  }
);

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
