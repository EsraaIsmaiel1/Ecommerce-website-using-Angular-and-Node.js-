import { check } from 'express-validator';
import validation from '../middleware/validate.js';
import UserModel from '../models/user.js';

export const addUserValidator = [
  check('full_name')
    .trim()
    .notEmpty()
    .withMessage('Full Name is required')
    .isString()
    .withMessage('Full name must contain letters only'),
  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail()
    .custom(async (value) => {
      const existingUser = await UserModel.findOne({ email: value });
      if (existingUser) {
        throw new Error('Email is already registered');
      }
    }),

  check('password')
    .notEmpty()
    .withMessage('Password is required')
    .isStrongPassword({
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minLength: 8,
      minSymbols: 0,
    })
    .withMessage(
      'Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, and one number'
    ),
  validation,
];

export const getUserValidator = [
  check('id').isMongoId().withMessage('Id is not defined'),
  validation,
];

export const deleteUserValidator = [
  check('id').isMongoId().withMessage('Id is not defined'),
  validation,
];

export const updateUserValidator = [
  check('id').isMongoId().withMessage('Id is not defined'),
  check('full_name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Full Name is required')
    .isString()
    .withMessage('Full Name must be only letters'),
  check('email')
    .optional()
    .notEmpty()
    .withMessage('Email is already registered ')
    .isEmail()
    .withMessage('Invalid Email')
    .normalizeEmail()
    .custom((value) => {
      return UserModel.find({ email: value }).then((mail) => {
        if (mail.length > 0) {
          throw 'Email is already registered';
        }
      });
    }),
  check('password').optional(),
  // // .notEmpty()
  // // .withMessage('Password is required ')
  // .isStrongPassword({
  //   minLength: 6,
  //   minLowercase: 1,
  //   minUppercase: 1,
  //   minNumbers: 1,
  // })
  // .withMessage(
  //   'Password must be at least 8 characters long, with a lowercase letter, an uppercase letter, and at least one number'
  // ),
  validation,
];

// Auth
export const loginUserValidator = [
  check('email')
    .optional()
    .notEmpty()
    .withMessage('Email is already registered ')
    .isEmail()
    .withMessage('Invalid Email')
    .normalizeEmail()
    .custom((value) => {
      return UserModel.find({ email: value }).then((email) => {
        if (email.length === 0) {
          throw 'Email is not registered';
        }
      });
    }),
  check('password').notEmpty().withMessage('Password is required'),

  validation,
];
