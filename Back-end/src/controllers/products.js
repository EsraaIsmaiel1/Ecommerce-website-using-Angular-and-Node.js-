import asyncHandler from 'express-async-handler';
import ErrorApi from '../utils/errorAPI.js';
import ProductModel from '../models/products.js';
import { uploadMixOfImages } from '../middleware/uploadImage.js';

const uploadProductImg = uploadMixOfImages('images', 4, 'src/uploads/products', 'products');

const saveImgInDB = (req, res, next) => {
  const uploadedFiles = req.files;
  req.body.images = uploadedFiles.map((file) => file.filename);
  next();
};

const getAllProducts = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;
  const products = await ProductModel.find({}).skip(skip).limit(limit);
  res.status(200).json({
    status: 'success',
    result: products.length,
    data: {
      products,
    },
  });
});

const addProduct = asyncHandler(async (req, res) => {
  const productObject = {
    ...req.body,
  };

  const newProduct = await ProductModel.create(productObject);
  res.status(201).json({
    status: 'success',
    data: {
      product: newProduct,
    },
  });
});

const getProduct = asyncHandler(async (req, res, next) => {
  const product = await ProductModel.findOne({ _id: req.params.id });
  if (product) {
    res.json({
      status: 'success',
      data: {
        product,
      },
    });
  } else {
    return next(new ErrorApi(`No ${req.params.id} registered`, 404));
  }
});

const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await ProductModel.findByIdAndRemove(req.params.id);
  if (!product) {
    return next(new ErrorApi(`No ${req.params.id} registered`, 404));
  } else {
    res.json({
      message: 'Product deleted successfully',
    });
  }
});

const updateProduct = asyncHandler(async (req, res, next) => {
  const product = await ProductModel.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!product) {
    return next(new ErrorApi(`No ${req.params.id} registered`, 404));
  } else {
    res.json(product);
  }
});

export {
  addProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  uploadProductImg,
  saveImgInDB,
};
