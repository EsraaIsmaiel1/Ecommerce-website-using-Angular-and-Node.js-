import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email is already registered'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required '],
    },
    role: {
      type: String,
      enums: ['User', 'Admin'],
      default: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
