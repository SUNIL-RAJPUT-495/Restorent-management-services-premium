import jwt from "jsonwebtoken";
import Restorent from "../models/Super_Admin/Restorent.js";
import Transaction from "../models/Super_Admin/Transaction.js";

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

export const requireActivePlanAndPayment = async (req, res, next) => {
  try {
    const restaurant = req.restaurant;
    if (!restaurant) {
      return res.status(401).json({ success: false, message: "Restaurant context missing" });
    }

    if (!restaurant.subscription || restaurant.subscription.status !== "ACTIVE") {
      return res.status(403).json({ success: false, message: "Active plan is required" });
    }

    if (restaurant.subscription.expiresAt && new Date(restaurant.subscription.expiresAt) < new Date()) {
      return res.status(403).json({ success: false, message: "Plan expired. Please renew subscription" });
    }

    const successfulPayment = await Transaction.findOne({
      restaurantId: restaurant._id,
      status: "SUCCESS",
    });

    if (!successfulPayment) {
      return res.status(403).json({ success: false, message: "Payment not completed for current plan" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
