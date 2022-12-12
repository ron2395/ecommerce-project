import express from 'express';
const router = express.Router();
import { protect, admin } from '../middleware/authMiddleware.js'
import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts
} from "../controllers/productController.js";

// @desc Fetch all products
// @route GET /api/products
// @access Public

router.route('/')
        .get(getProducts)
        .post(protect, admin, createProduct);

// @desc Create product review
// @route POST /api/products/:id/reviews
// @access Public

router.route('/:id/reviews')
        .post(protect, createProductReview);

// @desc Get top products
// @route GET /api/products/top
// @access Public

router.route('/top')
        .get(getTopProducts)

// @desc Fetch single products
// @route GET /api/products/:id
// @access Public

router.route('/:id')
        .get(getProductById)
        .delete(protect, admin, deleteProduct)
        .put(protect, admin, updateProduct);

export default router;