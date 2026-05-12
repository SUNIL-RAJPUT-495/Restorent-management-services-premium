import express from 'express';
import { createOrder, getOrders, updateOrderStatus } from '../../controllers/app/orderController.js';
import { protectRestaurant, checkSubscriptionStatus } from '../../middleware/restaurantAuthMiddleware.js';

const router = express.Router();

router.use(protectRestaurant, checkSubscriptionStatus);

router.post('/', createOrder);
router.get('/', getOrders);
router.put('/:id', updateOrderStatus);

export default router;
