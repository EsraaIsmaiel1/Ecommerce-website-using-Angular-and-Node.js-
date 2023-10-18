import express from 'express';
import { getProduct } from '../controllers/products.js';
import {
  addCartItem,
  allCartItems,
  deleteCartItem,
  getTotal,
  updateCartItem,
} from '../controllers/cart.js';

const router = express.Router();

router.route('/').get(allCartItems).post(addCartItem);

router.route('/:id').get(getProduct).put(updateCartItem).delete(deleteCartItem);

router.route('/total').get(getTotal);

export default router;
