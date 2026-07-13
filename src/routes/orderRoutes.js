import express from 'express';
import {
  createOrder,
  getMyOrders,
  getOrders,
  getOrder,
  updateOrderStatus,
} from '../controllers/orderController.js';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Every order route requires a logged-in user.
router.use(protect);

// Regular users: place an order and view their own history.
router.post('/', createOrder);
router.get('/my', getMyOrders);

// Admin: view all orders (with ?status= / ?search=) and update status.
router.get('/', adminOnly, getOrders);
router.patch('/:id/status', adminOnly, updateOrderStatus);

// Admin or the owner of the order.
router.get('/:id', getOrder);

export default router;
