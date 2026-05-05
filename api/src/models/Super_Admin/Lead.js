import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String },
  
  // Sales pipeline track karne ke liye
  status: { 
    type: String, 
    enum: ['NEW', 'CONTACTED', 'IN_PROGRESS', 'CONVERTED', 'CLOSED'], 
    default: 'NEW' 
  }
}, { timestamps: true });

export default mongoose.model('Lead', leadSchema);