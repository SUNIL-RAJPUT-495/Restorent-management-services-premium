import express from 'express';
import { createOrder, getOrders, updateOrderStatus } from '../../controllers/app/orderController.js';
import { protectRestaurant, requireActivePlanAndPayment } from '../../middleware/restaurantAuthMiddleware.js';

const router = express.Router();

router.use(protectRestaurant, requireActivePlanAndPayment);

router.post('/', createOrder);
router.get('/', getOrders);
router.put('/:id', updateOrderStatus);

export default router;
