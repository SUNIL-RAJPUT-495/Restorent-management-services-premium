import express from 'express';
import { getTables, updateTableStatus, addTable, deleteTable } from '../../controllers/app/tableController.js';
import { protectRestaurant, checkSubscriptionStatus } from '../../middleware/restaurantAuthMiddleware.js';

const router = express.Router();

router.use(protectRestaurant, checkSubscriptionStatus);

router.get('/', getTables);
router.post('/', addTable);
router.put('/:number', updateTableStatus);
router.delete('/:number', deleteTable);

export default router;
