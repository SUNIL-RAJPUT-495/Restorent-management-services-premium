import express from 'express';
import { getSettings, updateSettings } from '../../controllers/app/settingController.js';
import { protectRestaurant, requireActivePlanAndPayment } from '../../middleware/restaurantAuthMiddleware.js';

const router = express.Router();

router.use(protectRestaurant, requireActivePlanAndPayment);

router.get('/', getSettings);
router.put('/', updateSettings);

export default router;
