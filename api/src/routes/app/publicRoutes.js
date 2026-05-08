import express from 'express';
import {
  getRestaurantInfo,
  getMenu,
  getTables,
  placeOrder,
  createRazorpayOrder,
  verifyRazorpayPayment,
  createImbOrder,
  verifyImbPayment,
  submitFeedback
} from '../../controllers/app/publicController.js';

const router = express.Router({ mergeParams: true });

// Basic Info
router.get('/info', getRestaurantInfo);
router.get('/menu', getMenu);
router.get('/tables', getTables);

// Orders
router.post('/order', placeOrder);

// Payments
router.post('/payment/razorpay/create', createRazorpayOrder);
router.post('/payment/razorpay/verify', verifyRazorpayPayment);

router.post('/payment/imb/create', createImbOrder);
router.post('/payment/imb/verify', verifyImbPayment);

// Feedback
router.post('/feedback', submitFeedback);

export default router;
