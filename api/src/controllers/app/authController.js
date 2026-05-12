import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Restorent from "../../models/Super_Admin/Restorent.js";
import Transaction from "../../models/Super_Admin/Transaction.js";
import SaaSPlan from "../../models/Super_Admin/SaaSPlan.js";
import SubscriptionOrder from "../../models/Super_Admin/SubscriptionOrder.js";

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
      paymentStatus,
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

    const normalizedPaymentStatus = String(paymentStatus || "").toUpperCase();
    if (!transactionId || normalizedPaymentStatus !== "SUCCESS") {
      return res.status(400).json({
        success: false,
        message: "Payment must be successful before registration",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const expiresAt = getExpiryDate(plan.durationValue, plan.durationUnit);

    const restaurant = await Restorent.create({
      name,
      ownerName,
      email,
      phone,
      address,
      password: hashedPassword,
      subscription: {
        plan: plan.name,
        status: "ACTIVE",
        expiresAt,
      },
    });

    await Transaction.create({
      restaurantId: restaurant._id,
      planId: plan._id,
      amountPaid: amountPaid ?? plan.price,
      paymentGateway: paymentGateway || "UPI",
      transactionId,
      status: normalizedPaymentStatus,
    });

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

    /* 
    Allow login even if subscription is expired or inactive. 
    Frontend will redirect to SubscriptionExpired page if needed.
    */
    const hasActiveSubscription =
      restaurant.subscription &&
      String(restaurant.subscription.status || "").toUpperCase() === "ACTIVE";

    const isExpired =
      restaurant.subscription?.expiresAt &&
      new Date(restaurant.subscription.expiresAt) < new Date();

    /* 
    Remove strict transaction check to allow users to reach the renewal page.
    const successfulPayment = await Transaction.findOne({
      restaurantId: restaurant._id,
      status: "SUCCESS",
    });
    if (!successfulPayment) {
      return res.status(403).json({
        success: false,
        message: "Payment verification failed. Please complete payment to login.",
      });
    }
    */

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
  try {
    const restaurant = req.restaurant;

    // Data Repair: If subscription is missing, try to find the latest successful order
    if (!restaurant.subscription || !restaurant.subscription.plan) {
      const latestOrder = await SubscriptionOrder.findOne({
        restaurantId: restaurant._id,
        status: "SUCCESS",
      })
        .sort({ paidAt: -1 })
        .populate("planId");

      if (latestOrder) {
        const plan = latestOrder.planId;
        const subscription = {
          plan: plan ? plan.name : "Premium Plan",
          status: "ACTIVE",
          expiresAt: latestOrder.expiresAt,
        };
        
        // Update in-memory and database
        restaurant.subscription = subscription;
        await Restorent.findByIdAndUpdate(restaurant._id, { subscription });
      }
    }

    return res.status(200).json({ success: true, restaurant });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
