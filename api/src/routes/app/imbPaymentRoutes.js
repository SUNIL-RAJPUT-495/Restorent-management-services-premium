import express from 'express';
import { createImbOrder, verifyImbPayment, imbWebhook } from '../../controllers/app/imbPaymentController.js';

const router = express.Router();

router.post('/create', createImbOrder);
router.post('/verify', verifyImbPayment);
router.post('/webhook', imbWebhook);

export default router;
