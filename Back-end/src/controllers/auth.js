import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import UserModel from '../models/user.js';
import ErrorApi from '../utils/errorAPI.js';

const oneDay = 1000 * 60 * 60 * 24;

const registerUser = asyncHandler(async (req, res, next) => {
  const { full_name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 8);

  const user = await UserModel.create({
    full_name,
    email: email.toLowerCase(),
    password: hashedPassword,
  });

  if (user) {
    const token = jwt.sign(
      {
        id: user._id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
      process.env.TOKEN_KEY
    );

    res
      .cookie('authToken', token, {
        httpOnly: true,
        maxAge: oneDay,
      })
      .status(201)
      .json({
        status: 'success',
        data: {
          user: {
            id: user._id,
            full_name: user.full_name,
            email: user.email,
            role: user.role,
          },
          token,
        },
      });
  } else {
    return next(new ErrorApi(`Something is not right`, 400));
  }
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return next(new ErrorApi(` Email or Password is Required`, 400));
  }

  const match = { email: email.toLowerCase() };

  const user = await UserModel.findOne(match);
  if (user.password === password) {
    const token = jwt.sign(
      {
        id: user._id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: '3h',
      }
    );
    res
      .cookie('authToken', token, {
        httpOnly: true,
        maxAge: oneDay,
      })
      .status(201)
      .json({
        status: 'success',
        data: {
          user: {
            id: user._id,
            full_name: user.full_name,
            email: user.email,
            role: user.role,
          },
          token,
        },
      });
  } else if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      {
        id: user._id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
      process.env.TOKEN_KEY
    );

    res
      .cookie('authToken', token, {
        httpOnly: true,
        maxAge: oneDay,
      })
      .status(201)
      .json({
        status: 'success',
        data: {
          user: {
            id: user._id,
            full_name: user.full_name,
            email: user.email,
            role: user.role,
          },
          token,
        },
      });
  } else {
    return next(new ErrorApi(`Email or Password is not correct`, 400));
  }
});

const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie('authToken', '', { maxAge: '1' });
});

export { registerUser, loginUser, logoutUser };
