import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, 'Product Name is required'],
      trim: true,
    },
    desc: {
      type: String,
      require: true,
    },
    category: {
      type: Array,
    },
    price: {
      type: Number,
      require: [true, 'Product Price is required'],
    },
    quantity: {
      type: Number,
      require: [true, 'Product Quantity is required'],
    },
    images: {
      type: [String],
      validate: [(array) => array.length >= 0 && array.length <= 4],
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model('product', productSchema);

export default ProductModel;
