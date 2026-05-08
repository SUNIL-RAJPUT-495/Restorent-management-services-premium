import Transaction from '../../models/Super_Admin/Transaction.js';
import Restorent from '../../models/Super_Admin/Restorent.js';
import axios from 'axios';

/**
 * Create an IMB Payment for SaaS Subscription
 */
export const createSubscriptionPayment = async (req, res) => {
  try {
    const { restaurantId, planId, totalAmount, ownerName, phone, email } = req.body;

    if (!restaurantId || !planId) {
        return res.status(400).json({ message: "Restaurant ID and Plan ID are required" });
    }

    // Generate unique transaction ID
    const txnId = `SUB-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;

    const transaction = new Transaction({
        restaurantId,
        planId,
        amountPaid: totalAmount,
        paymentGateway: 'IMB',
        transactionId: txnId,
        status: 'PENDING'
    });

    await transaction.save();

    const cleanPhone = String(phone || "").replace(/\D/g, "");
    
    const payload = new URLSearchParams({
      customer_mobile: cleanPhone || '9999999999',
      user_token: process.env.IMB_CLIENT_SECRET || '',
      amount: String(totalAmount),
      order_id: txnId,
      customer_name: ownerName || 'Admin',
      remark1: email || 'Subscription',
      remark2: `Restaurant Plan`,
      redirect_url: `https://restorent-management-eight.vercel.app/admin/login`, // redirect to admin login on success
    });

    const response = await axios.post(`${process.env.IMB_BASE_URL}api/create-order`, payload.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    const data = response.data;

    if (data && data.status === true && data.result) {
      res.status(200).json({
        success: true,
        payment_url: data.result.payment_url || data.result.paytm_link || data.result.bhim_link || data.result.check_link,
        transactionId: txnId
      });
    } else {
      throw new Error(data.message || "Failed to generate payment link.");
    }
  } catch (error) {
    console.error("IMB Subscription Payment Error Details:", error.response?.data || error.message);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Verify IMB Subscription Payment (Optional manual verification route)
 */
export const verifySubscriptionPayment = async (req, res) => {
  try {
    const { transactionId } = req.body;

    if (!transactionId) {
      return res.status(400).json({ message: "Transaction ID is required" });
    }

    if (!process.env.IMB_STATUS_URL || !process.env.IMB_CLIENT_SECRET) {
      return res.status(503).json({ message: "Payment verification service not configured." });
    }

    const transaction = await Transaction.findOne({ transactionId });
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (transaction.status === 'SUCCESS') {
      return res.status(200).json({ success: true, transaction });
    }

    const statusPayload = new URLSearchParams({
      user_token: process.env.IMB_CLIENT_SECRET,
      order_id: transactionId
    });

    const response = await axios.post(process.env.IMB_STATUS_URL, statusPayload.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      timeout: 10000 
    });
    const data = response.data;

    if (data.status === "SUCCESS" || data.status === "COMPLETED") {
      if (transaction.status !== 'SUCCESS') {
        transaction.status = 'SUCCESS';
        await transaction.save();

        // Optional: Mark restaurant subscription as active if needed
        await Restorent.findByIdAndUpdate(transaction.restaurantId, { 'subscription.status': 'active' });
      }
      return res.status(200).json({ success: true, transaction });
    } else if (data.status === "PENDING" || data.status === "PROCESSING") {
      return res.status(200).json({ success: true, status: "pending" });
    } else {
      transaction.status = 'FAILED';
      await transaction.save();
      return res.status(400).json({ message: "Payment failed or cancelled" });
    }
  } catch (error) {
    console.error("IMB Verify Subscription Payment Error Details:", error.response?.data || error.message);
    res.status(500).json({ message: error.response?.data?.message || error.message });
  }
};

/**
 * IMB Subscription Webhook (Background Update)
 */
export const imbSubscriptionWebhook = async (req, res) => {
  try {
    const data = req.body;
    console.log("🔥 Subscription Webhook Received from IMB:", data);

    const transactionId = data.client_txn_id || data.order_id;
    if (!transactionId) return res.status(400).send("Transaction ID missing");

    const transaction = await Transaction.findOne({ transactionId });
    if (!transaction) return res.status(404).send("Transaction not found");

    if ((data.status === "SUCCESS" || data.status === "COMPLETED") && transaction.status !== 'SUCCESS') {
      transaction.status = 'SUCCESS';
      await transaction.save();

      // Activate restaurant subscription
      await Restorent.findByIdAndUpdate(transaction.restaurantId, { 'subscription.status': 'active' });
      console.log(`✅ Subscription ${transactionId} marked as PAID via Webhook!`);

    } else if (data.status === "FAILED" && transaction.status !== 'SUCCESS') {
      transaction.status = 'FAILED';
      await transaction.save();
      console.log(`❌ Subscription ${transactionId} marked as FAILED via Webhook!`);
    }

    return res.status(200).send("Webhook Processed Successfully");
  } catch (error) {
    console.error("Subscription Webhook Error:", error);
    return res.status(500).send("Internal Server Error");
  }
};
