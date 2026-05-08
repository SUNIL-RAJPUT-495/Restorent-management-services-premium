import mongoose from "mongoose";

const subscriptionReservationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    ownerName: { type: String, required: true, trim: true },
    passwordHash: { type: String, required: true },
    planId: { type: mongoose.Schema.Types.ObjectId, ref: "SaaSPlan", required: true },
    expiresAt: { type: Date, required: true },
    status: {
      type: String,
      enum: ["PENDING_PAYMENT", "PAYMENT_SUCCESS", "CONVERTED", "EXPIRED", "CANCELLED"],
      default: "PENDING_PAYMENT",
    },
    lastPaymentStatus: {
      type: String,
      enum: ["NONE", "PENDING", "SUCCESS", "FAILED", "CANCELLED"],
      default: "NONE",
    },
    convertedRestaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restorent" },
  },
  { timestamps: true }
);

subscriptionReservationSchema.index({ email: 1, createdAt: -1 });
subscriptionReservationSchema.index({ expiresAt: 1 });

export default mongoose.model("SubscriptionReservation", subscriptionReservationSchema);
