import express from 'express';
import {
  purchasePlanAndCreateRestaurant,
  loginRestaurant,
  getRestaurantProfile
} from '../../controllers/app/authController.js';
import {
  protectRestaurant,
  checkSubscriptionStatus
} from '../../middleware/restaurantAuthMiddleware.js';

const router = express.Router();

router.post('/purchase-plan', purchasePlanAndCreateRestaurant);
router.post('/login', loginRestaurant);
router.get('/me', protectRestaurant, getRestaurantProfile);
router.get('/plan-access-check', protectRestaurant, checkSubscriptionStatus, (req, res) => {
  res.status(200).json({ success: true, message: 'Plan and payment verified' });
});

export default router;
