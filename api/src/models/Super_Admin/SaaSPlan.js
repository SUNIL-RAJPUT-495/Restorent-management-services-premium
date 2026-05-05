import mongoose from 'mongoose';

const saasPlanSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  description:{type: String, required: true },
  price: { type: Number, required: true },
  durationValue: { type: Number, required: true },
  durationUnit: { type: String, enum: ['days', 'months', 'years'], default: 'months' },
  features: [{ type: String }], 
  active: { type: Boolean, default: true },
  isPopular: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('SaaSPlan', saasPlanSchema);