import asyncHandler from 'express-async-handler';
import ErrorApi from '../utils/errorAPI.js';
import CartModel from '../models/cart.js';

const allCartItems = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;
  const items = await CartModel.find({}).skip(skip).limit(limit);
  res.status(200).json({
    status: 'success',
    result: items.length,
    data: {
      items,
    },
  });
});
const addCartItem = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  try {
    const cart = await CartModel.findOne({ userId });

    if (cart) {
      const product = cart.products.find((product) => product.productId.toString() === productId);

      if (product) {
        product.quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
    } else {
      const newCart = new CartModel({
        userId,
        products: [{ productId, quantity }],
      });

      await newCart.save();
    }

    res.status(201).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    return next(new ErrorApi(`Server Error`, 404));
  }
});

const updateCartItem = asyncHandler(async (req, res, next) => {
  try {
    const cart = await CartModel.findOne({ userId: req.params.userId });

    if (cart) {
      const product = cart.products.find(
        (product) => product.productId.toString() === req.params.productId
      );

      if (product) {
        product.quantity = req.body.quantity;
        await cart.save();
        res.status(200).json({ message: 'Cart item quantity updated successfully' });
      } else {
        res.status(404).json({ message: 'Product not found in cart' });
      }
    } else {
      return next(new ErrorApi(`Cart not found`, 404));
    }
  } catch (error) {
    return next(new ErrorApi(`Server error`, 404));
  }
});

const deleteCartItem = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;

  try {
    const cart = await CartModel.findOne({ userId: req.params.userId });

    if (cart) {
      const product = cart.products.find((product) => product.productId.toString() == productId);
      if (product) {
        cart.products.pull({ productId });
        await cart.save();
        res.status(200).json({ message: 'Product removed from cart successfully' });
      } else {
        res.status(404).json({ message: 'Product not found in cart' });
      }
    } else {
      return next(new ErrorApi(`Cart not found`, 404));
    }
  } catch (error) {
    return next(new ErrorApi(`Server error`, 404));
  }
});

const getTotal = asyncHandler(async (req, res, next) => {
  try {
    const cart = await CartModel.findOne({ userId: req.params.userId });

    if (cart) {
      const totalPrice = cart.products.reduce((total, product) => {
        return total + product.quantity * product.price;
      }, 0);

      res.status(200).json({ totalPrice });
    } else {
      return next(new ErrorApi(`Cart not found`, 404));
    }
  } catch (error) {
    return next(new ErrorApi(`Server error`, 404));
  }
});

export { addCartItem, updateCartItem, deleteCartItem, getTotal, allCartItems };
