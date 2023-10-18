import { check } from 'express-validator';
import validation from '../middleware/validate.js';

export const addNewProductValidator = [
  check('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isString()
    .withMessage('Product title has to be only letters'),
  check('desc')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isString()
    .withMessage('Product title has to be only letters '),
  check('price')
    .exists()
    .withMessage('Price is required')
    .isNumeric()
    .withMessage('Invalid price '),
  check('quantity')
    .exists()
    .withMessage('quantity is required')
    .isNumeric()
    .withMessage('Invalid quantity'),
  check('category').trim().optional(),
  check('images')
    .optional()
    .isArray()
    .custom((value) => {
      if (!value.every((item) => typeof item === 'string')) {
        throw new Error('Image name must be only letters');
      }
      return true;
    }),
  validation,
];

export const getProductValidator = [
  check('id').isMongoId().withMessage('Id in not defined'),
  validation,
];

export const deleteProductValidator = [
  check('id').isMongoId().withMessage('Id in not defined'),
  validation,
];

export const updateProductValidator = [
  check('id').isMongoId().withMessage('Id in not defined'),
  check('title')
    .optional()
    .trim()
    .isString()
    .withMessage('Product title has to be only letters')
    .trim(),
  check('description')
    .optional()
    .trim()
    .isString()
    .withMessage('Description has to be only letters'),
  check('price').optional().isNumeric().withMessage('Invalid price'),
  check('quantity').optional().isNumeric().withMessage('Invalid quantity'),
  check('category').trim().optional(),
  check('images')
    .optional()
    .isArray()
    .custom((value) => {
      if (!value.every((item) => typeof item === 'string')) {
        throw new Error('Image name must be only letters');
      }
      return true;
    }),
  validation,
];
