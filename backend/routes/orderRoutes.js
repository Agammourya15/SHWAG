import express from 'express';
const router = express.Router();
import { addOrderItems, getMyOrders, getOrderById } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems);
router.route('/mine').get(protect, getMyOrders);   // ← My orders
router.route('/:id').get(protect, getOrderById);

export default router;
