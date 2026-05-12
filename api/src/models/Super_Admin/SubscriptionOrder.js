import mongoose from "mongoose";

const subscriptionOrderSchema = new mongoose.Schema(
  {
    reservationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubscriptionReservation",
      required: true,
    },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restorent" },
    planId: { type: mongoose.Schema.Types.ObjectId, ref: "SaaSPlan", required: true },
    amount: { type: Number, required: true },
    paymentGateway: {
      type: String,
      enum: ["IMB"],
      default: "IMB",
    },
    orderId: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED", "CANCELLED", "EXPIRED"],
      default: "PENDING",
    },
    paymentUrl: { type: String },
    paidAt: { type: Date },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

subscriptionOrderSchema.index({ reservationId: 1, createdAt: -1 });

export default mongoose.models.SubscriptionOrder || mongoose.model("SubscriptionOrder", subscriptionOrderSchema);
