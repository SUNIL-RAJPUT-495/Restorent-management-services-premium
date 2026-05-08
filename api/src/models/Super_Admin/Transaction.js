import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  restaurantId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Restaurant', 
    required: true 
  },

  planId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'SaaSPlan', 
    required: true 
  },

  amountPaid: { type: Number, required: true },
  
  paymentGateway: { 
    type: String, 
    enum: ['RAZORPAY', 'STRIPE', 'OFFLINE_CASH', 'UPI', 'IMB'], 
    required: true 
  },

  transactionId: { type: String, required: true, unique: true }, 
  
  status: { 
    type: String, 
    enum: ['SUCCESS', 'FAILED', 'PENDING', 'REFUNDED'], 
    default: 'SUCCESS' 
  }
}, { timestamps: true });

// Revenue calculation queries ke liye index
transactionSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model('Transaction', transactionSchema);