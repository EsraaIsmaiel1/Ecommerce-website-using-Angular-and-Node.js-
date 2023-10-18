import express from 'express';
import {
  addProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  uploadProductImg,
  saveImgInDB,
} from '../controllers/products.js';
import {
  addNewProductValidator,
  deleteProductValidator,
  getProductValidator,
  updateProductValidator,
} from '../validations/product.js';
const router = express.Router();

router
  .route('/')
  .get(getAllProducts)
  .post(uploadProductImg, saveImgInDB, addNewProductValidator, addProduct);

router
  .route('/:id')
  .get(getProduct)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

export default router;
