import axios from "axios";
import bcrypt from "bcryptjs";
import Restorent from "../../models/Super_Admin/Restorent.js";
import SaaSPlan from "../../models/Super_Admin/SaaSPlan.js";
import SubscriptionOrder from "../../models/Super_Admin/SubscriptionOrder.js";
import SubscriptionReservation from "../../models/Super_Admin/SubscriptionReservation.js";

const TEMP_RESERVATION_MS = 30 * 60 * 1000;

const computeSubscriptionExpiryDate = (plan) => {
  const expiryDate = new Date();
  if (plan.durationUnit === "days") {
    expiryDate.setDate(expiryDate.getDate() + plan.durationValue);
  } else if (plan.durationUnit === "months") {
    expiryDate.setMonth(expiryDate.getMonth() + plan.durationValue);
  } else if (plan.durationUnit === "years") {
    expiryDate.setFullYear(expiryDate.getFullYear() + plan.durationValue);
  }
  return expiryDate;
};

const buildRedirectUrl = (orderId, reservationId) => {
  const clientBaseUrl =
    process.env.CLIENT_APP_URL || "https://restorent-management-services-premi.vercel.app";
  const query = new URLSearchParams({
    orderId,
    reservationId: String(reservationId),
  });
  return `${clientBaseUrl}/imb-payment?${query.toString()}`;
};

const buildImbPayload = ({ cleanPhone, amount, orderId, ownerName, email, redirectUrl }) =>
  new URLSearchParams({
    customer_mobile: cleanPhone || "9999999999",
    user_token: process.env.IMB_CLIENT_SECRET || "",
    amount: String(amount),
    order_id: orderId,
    customer_name: ownerName || "Admin",
    remark1: email || "Subscription",
    remark2: "Restaurant Plan",
    redirect_url: redirectUrl,
  });

const createRestaurantFromReservation = async (reservation) => {
  const plan = await SaaSPlan.findById(reservation.planId);
  if (!plan) {
    throw new Error("Subscribed plan not found for reservation.");
  }

  // Check if restaurant already exists
  let restaurant = null;
  if (reservation.convertedRestaurantId) {
    restaurant = await Restorent.findById(reservation.convertedRestaurantId);
  }

  if (!restaurant) {
    restaurant = await Restorent.findOne({ email: reservation.email });
  }

  if (restaurant) {
    // RENEWAL LOGIC
    const currentExpiry = restaurant.subscription?.expiresAt
      ? new Date(restaurant.subscription.expiresAt)
      : new Date();

    // If expired, start from now. If active, add to current expiry.
    const baseDate = currentExpiry > new Date() ? currentExpiry : new Date();

    const newExpiresAt = new Date(baseDate);
    if (plan.durationUnit === "days") {
      newExpiresAt.setDate(newExpiresAt.getDate() + plan.durationValue);
    } else if (plan.durationUnit === "months") {
      newExpiresAt.setMonth(newExpiresAt.getMonth() + plan.durationValue);
    } else if (plan.durationUnit === "years") {
      newExpiresAt.setFullYear(newExpiresAt.getFullYear() + plan.durationValue);
    }

    restaurant.subscription = {
      plan: plan.name,
      status: "ACTIVE",
      expiresAt: newExpiresAt,
    };

    await restaurant.save();

    reservation.status = "CONVERTED";
    reservation.lastPaymentStatus = "SUCCESS";
    reservation.convertedRestaurantId = restaurant._id;
    await reservation.save();

    return restaurant;
  }

  // NEW REGISTRATION LOGIC
  const subscription = {
    plan: plan.name,
    status: plan.price === 0 ? "trial" : "active",
    expiresAt: computeSubscriptionExpiryDate(plan),
  };

  restaurant = await Restorent.create({
    name: reservation.name,
    email: reservation.email,
    phone: reservation.phone,
    address: reservation.address,
    password: reservation.passwordHash,
    ownerName: reservation.ownerName,
    subscription,
  });

  reservation.status = "CONVERTED";
  reservation.lastPaymentStatus = "SUCCESS";
  reservation.convertedRestaurantId = restaurant._id;
  await reservation.save();

  return restaurant;
};

const cleanupFailedReservation = async (reservation) => {
  if (!reservation) return;
  if (reservation.status === "CONVERTED") return;
  await SubscriptionOrder.updateMany(
    { reservationId: reservation._id, status: "PENDING" },
    { $set: { status: "EXPIRED" } }
  );
  await SubscriptionReservation.findByIdAndDelete(reservation._id);
};

export const createSubscriptionReservation = async (req, res) => {
  try {
    const { name, email, phone, address, password, ownerName, planId } = req.body;
    if (!name || !email || !phone || !address || !password || !ownerName || !planId) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const plan = await SaaSPlan.findById(planId);
    if (!plan || !plan.active) {
      return res.status(404).json({ success: false, message: "Selected plan not found or inactive" });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const existingRestaurant = await Restorent.findOne({ email: normalizedEmail });
    if (existingRestaurant) {
      return res.status(400).json({ success: false, message: "Restaurant already exists for this email" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const reservation = await SubscriptionReservation.create({
      name,
      email: normalizedEmail,
      phone,
      address,
      ownerName,
      passwordHash,
      planId,
      expiresAt: new Date(Date.now() + TEMP_RESERVATION_MS),
      status: "PENDING_PAYMENT",
      lastPaymentStatus: "NONE",
    });

    return res.status(201).json({
      success: true,
      message: "Registration created. Complete payment now to activate account.",
      reservation,
    });
  } catch (error) {
    console.error("Create reservation error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Create an IMB Payment for SaaS Subscription
 */
export const createSubscriptionPayment = async (req, res) => {
  try {
    const { reservationId, restaurantId, planId } = req.body;

    let effectiveReservationId = reservationId;

    // Backward compatibility: old client sends restaurantId/planId. Convert it to reservation-first flow.
    if (!effectiveReservationId && restaurantId && planId) {
      const existingRestaurant = await Restorent.findById(restaurantId);
      if (!existingRestaurant) {
        return res.status(404).json({ success: false, message: "Restaurant not found for legacy payment payload" });
      }

      const legacyReservation = await SubscriptionReservation.create({
        name: existingRestaurant.name,
        email: existingRestaurant.email,
        phone: existingRestaurant.phone,
        address: existingRestaurant.address,
        ownerName: existingRestaurant.ownerName || "Owner",
        passwordHash: existingRestaurant.password,
        planId,
        expiresAt: new Date(Date.now() + TEMP_RESERVATION_MS),
        status: "PENDING_PAYMENT",
        lastPaymentStatus: "NONE",
        convertedRestaurantId: existingRestaurant._id,
      });
      effectiveReservationId = legacyReservation._id;
    }

    if (!effectiveReservationId) {
      return res.status(400).json({ success: false, message: "Reservation ID is required to create subscription order" });
    }

    const reservation = await SubscriptionReservation.findById(effectiveReservationId);
    if (!reservation) {
      return res.status(404).json({ success: false, message: "Reservation not found" });
    }

    if (reservation.status === "CONVERTED" && reservation.convertedRestaurantId) {
      return res.status(200).json({
        success: true,
        message: "Reservation already converted",
        reservation,
      });
    }

    const plan = await SaaSPlan.findById(reservation.planId);
    if (!plan) {
      return res.status(404).json({ success: false, message: "Plan not found for reservation" });
    }

    const orderId = `SUB-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const order = await SubscriptionOrder.create({
      reservationId: reservation._id,
      planId: reservation.planId,
      amount: plan.price,
      paymentGateway: "IMB",
      orderId,
      status: "PENDING",
      expiresAt: reservation.expiresAt,
    });

    const cleanPhone = String(reservation.phone || "").replace(/\D/g, "");
    const redirectUrl = buildRedirectUrl(orderId, reservation._id);
    const payload = buildImbPayload({
      cleanPhone,
      amount: plan.price,
      orderId,
      ownerName: reservation.ownerName,
      email: reservation.email,
      redirectUrl,
    });

    const response = await axios.post(`${process.env.IMB_BASE_URL}api/create-order`, payload.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const data = response.data;

    if (data && data.status === true && data.result) {
      const paymentUrl =
        data.result.payment_url || data.result.paytm_link || data.result.bhim_link || data.result.check_link;
      order.paymentUrl = paymentUrl;
      await order.save();

      reservation.lastPaymentStatus = "PENDING";
      await reservation.save();

      return res.status(200).json({
        success: true,
        payment_url: paymentUrl,
        orderId,
        subscriptionOrderId: order._id,
        reservationId: reservation._id,
      });
    }
    throw new Error(data.message || "Failed to generate payment link.");
  } catch (error) {
    console.error("IMB Subscription Payment Error Details:", error.response?.data || error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Verify IMB Subscription Payment (Optional manual verification route)
 */
export const verifySubscriptionPayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ success: false, message: "Order ID is required" });
    }

    if (!process.env.IMB_STATUS_URL || !process.env.IMB_CLIENT_SECRET) {
      return res.status(503).json({ success: false, message: "Payment verification service not configured." });
    }

    const order = await SubscriptionOrder.findOne({ orderId }).populate("reservationId");
    if (!order) {
      return res.status(404).json({ success: false, message: "Subscription order not found" });
    }

    const reservation = order.reservationId;
    if (!reservation) {
      return res.status(404).json({ success: false, message: "Reservation not found for order" });
    }

    const statusPayload = new URLSearchParams({
      user_token: process.env.IMB_CLIENT_SECRET,
      order_id: orderId,
    });

    const response = await axios.post(process.env.IMB_STATUS_URL, statusPayload.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      timeout: 10000,
    });
    const data = response.data;
    console.log("🔥 IMB Subscription Payment Status:", data);

    if (data.status === "SUCCESS" || data.status === "COMPLETED") {
      if (order.status !== "SUCCESS") {
        order.status = "SUCCESS";
        order.paidAt = new Date();
        await order.save();
      }

      reservation.status = "PAYMENT_SUCCESS";
      reservation.lastPaymentStatus = "SUCCESS";
      await reservation.save();

      const restaurant = await createRestaurantFromReservation(reservation);
      if (!order.restaurantId) {
        order.restaurantId = restaurant._id;
        await order.save();
      }

      return res.status(200).json({ success: true, status: "success", restaurant });
    } else if (data.status === "PENDING" || data.status === "PROCESSING") {
      reservation.lastPaymentStatus = "PENDING";
      await reservation.save();
      return res.status(200).json({ success: true, status: "pending" });
    }

    order.status = data.status === "CANCELLED" ? "CANCELLED" : "FAILED";
    await order.save();

    reservation.lastPaymentStatus = data.status === "CANCELLED" ? "CANCELLED" : "FAILED";
    await reservation.save();
    await cleanupFailedReservation(reservation);

    return res.status(400).json({
      success: false,
      status: "failed",
      message: "Payment failed or cancelled. Please register again with details.",
    });
  } catch (error) {
    console.error("IMB Verify Subscription Payment Error Details:", error.response?.data || error.message);
    return res.status(500).json({ success: false, message: error.response?.data?.message || error.message });
  }
};

/**
 * IMB Subscription Webhook (Background Update)
 */
export const imbSubscriptionWebhook = async (req, res) => {
  try {
    const data = req.body;
    console.log("🔥 Subscription Webhook Received from IMB:", data);

    const orderId = data.client_txn_id || data.order_id;
    if (!orderId) return res.status(400).send("Order ID missing");

    const order = await SubscriptionOrder.findOne({ orderId }).populate("reservationId");
    if (!order) return res.status(404).send("Subscription order not found");
    const reservation = order.reservationId;
    if (!reservation) return res.status(404).send("Reservation not found");

    if ((data.status === "SUCCESS" || data.status === "COMPLETED") && order.status !== "SUCCESS") {
      order.status = "SUCCESS";
      order.paidAt = new Date();
      await order.save();

      reservation.status = "PAYMENT_SUCCESS";
      reservation.lastPaymentStatus = "SUCCESS";
      await reservation.save();

      const restaurant = await createRestaurantFromReservation(reservation);
      if (!order.restaurantId) {
        order.restaurantId = restaurant._id;
        await order.save();
      }
      console.log(`✅ Subscription order ${orderId} marked as PAID via Webhook!`);

      return res.status(200).send("Webhook Processed Successfully");
    }

    if ((data.status === "FAILED" || data.status === "CANCELLED") && order.status !== "SUCCESS") {
      order.status = data.status === "CANCELLED" ? "CANCELLED" : "FAILED";
      await order.save();
      reservation.lastPaymentStatus = data.status === "CANCELLED" ? "CANCELLED" : "FAILED";
      await reservation.save();
      await cleanupFailedReservation(reservation);
      console.log(`❌ Subscription order ${orderId} marked as ${order.status} via Webhook!`);
    }

    return res.status(200).send("Webhook Processed Successfully");
  } catch (error) {
    console.error("Subscription Webhook Error:", error);
    return res.status(500).send("Internal Server Error");
  }
};
