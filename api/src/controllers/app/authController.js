import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Restorent from "../../models/Super_Admin/Restorent.js";
import Transaction from "../../models/Super_Admin/Transaction.js";
import SaaSPlan from "../../models/Super_Admin/SaaSPlan.js";

const getExpiryDate = (durationValue, durationUnit) => {
  const expiresAt = new Date();
  const value = Number(durationValue || 0);

  if (durationUnit === "year" || durationUnit === "years") {
    expiresAt.setFullYear(expiresAt.getFullYear() + value);
  } else {
    expiresAt.setMonth(expiresAt.getMonth() + value);
  }

  return expiresAt;
};

const generateToken = (restaurantId) =>
  jwt.sign({ id: restaurantId }, process.env.JWT_SECRET, { expiresIn: "1d" });

export const purchasePlanAndCreateRestaurant = async (req, res) => {
  try {
    const {
      name,
      ownerName,
      email,
      phone,
      address,
      password,
      planId,
      paymentGateway,
      amountPaid,
      transactionId,
      paymentStatus = "SUCCESS",
    } = req.body;

    if (!name || !ownerName || !email || !phone || !address || !password || !planId) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const existingRestaurant = await Restorent.findOne({ email });
    if (existingRestaurant) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const plan = await SaaSPlan.findById(planId);
    if (!plan || !plan.active) {
      return res.status(404).json({ success: false, message: "Selected plan is not available" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const isPaymentSuccess = paymentStatus === "SUCCESS";
    const expiresAt = isPaymentSuccess ? getExpiryDate(plan.durationValue, plan.durationUnit) : null;

    const restaurant = await Restorent.create({
      name,
      ownerName,
      email,
      phone,
      address,
      password: hashedPassword,
      subscription: {
        plan: plan.name,
        status: isPaymentSuccess ? "ACTIVE" : "PENDING",
        expiresAt,
      },
    });

    if (transactionId) {
      await Transaction.create({
        restaurantId: restaurant._id,
        planId: plan._id,
        amountPaid: amountPaid ?? plan.price,
        paymentGateway: paymentGateway || "UPI",
        transactionId,
        status: paymentStatus,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Plan purchased and account created successfully",
      restaurant: {
        _id: restaurant._id,
        name: restaurant.name,
        ownerName: restaurant.ownerName,
        email: restaurant.email,
        subscription: restaurant.subscription,
      },
      token: generateToken(restaurant._id),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const loginRestaurant = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const restaurant = await Restorent.findOne({ email });
    if (!restaurant) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, restaurant.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: generateToken(restaurant._id),
      restaurant: {
        _id: restaurant._id,
        name: restaurant.name,
        email: restaurant.email,
        subscription: restaurant.subscription,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getRestaurantProfile = async (req, res) => {
  return res.status(200).json({ success: true, restaurant: req.restaurant });
};
