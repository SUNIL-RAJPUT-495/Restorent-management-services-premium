import express from "express";
const restorentRouter = express.Router();

import { get_all_restaurants, get_all_leads } from "../../controllers/Super_Admin/RestorentController.js";
import {
  createSubscriptionReservation,
  createSubscriptionPayment,
  verifySubscriptionPayment,
  imbSubscriptionWebhook,
} from "../../controllers/Super_Admin/imbSubscriptionController.js";
import { Super_Admin_authMiddleware } from "../../middlewares/Super_Admin_authMiddleware.js";

restorentRouter.get("/all", Super_Admin_authMiddleware, get_all_restaurants);
restorentRouter.get("/leads", Super_Admin_authMiddleware, get_all_leads);

// IMB Payment for Subscriptions
restorentRouter.post("/subscription/reserve", createSubscriptionReservation);
restorentRouter.post("/payment/imb/create", createSubscriptionPayment);
restorentRouter.post("/payment/imb/verify", verifySubscriptionPayment);
restorentRouter.post("/payment/imb/webhook", imbSubscriptionWebhook);

export default restorentRouter;