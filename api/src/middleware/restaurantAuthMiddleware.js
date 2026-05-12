import jwt from "jsonwebtoken";
import Restorent from "../models/Super_Admin/Restorent.js";
import Transaction from "../models/Super_Admin/Transaction.js";
import SubscriptionOrder from "../models/Super_Admin/SubscriptionOrder.js";

export const protectRestaurant = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const restaurant = await Restorent.findById(decoded.id).select("-password");

    if (!restaurant) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    req.restaurant = restaurant;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Token validation failed" });
  }
};

/**
 * checkSubscriptionStatus — Verifies if the restaurant has an active/trial plan
 * and if it hasn't expired.
 */
export const checkSubscriptionStatus = async (req, res, next) => {
  try {
    const restaurant = req.restaurant;
    if (!restaurant) {
      return res.status(401).json({ success: false, message: "Restaurant context missing" });
    }

    const sub = restaurant.subscription;
    if (!sub) {
      return res.status(403).json({ success: false, message: "No subscription plan found. Please subscribe to continue." });
    }

    const status = String(sub.status || "").toUpperCase();
    const isPremium = status === "ACTIVE" || status === "TRIAL";

    if (!isPremium) {
      return res.status(403).json({ success: false, message: "Subscription is inactive. Please activate your plan." });
    }

    // Check expiration
    if (sub.expiresAt && new Date(sub.expiresAt) < new Date()) {
      return res.status(403).json({ success: false, message: "Your premium subscription has expired. Please renew." });
    }

    // Strict payment check only for non-trial active plans
    if (status === "ACTIVE") {
      const successfulPayment = await Transaction.findOne({
        restaurantId: restaurant._id,
        status: "SUCCESS",
      });

      const successfulSubOrder = await SubscriptionOrder.findOne({
        restaurantId: restaurant._id,
        status: "SUCCESS",
      });

      if (!successfulPayment && !successfulSubOrder) {
        return res.status(403).json({ success: false, message: "Payment verification failed. Please complete your payment." });
      }
    }

    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
