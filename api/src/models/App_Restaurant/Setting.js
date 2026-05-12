import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({

  restId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restorent' },
  // Restaurant Info
  restaurantName: {
    type: String,
    default: '',
  },
  location: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  logo: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    default: '',
  },

  // Billing / Tax Info
  gstNo: {
    type: String,
    default: '',
  },
  fssaiNo: {
    type: String,
    default: '',
  },
  cgst: {
    type: Number,
    default: 2.5,
  },
  sgst: {
    type: Number,
    default: 2.5,
  },

  // Footer / Receipt message
  receiptFooter: {
    type: String,
    default: 'Thank you for dining with us!',
  },

  // Payment Gateway Settings (IMB)
  imbToken: {
    type: String,
    default: '',
  },
  imbStatusUrl: {
    type: String,
    default: '',
  },
  isSelfOrderEnabled: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

const Setting = mongoose.model('Setting', settingSchema);

export default Setting;
