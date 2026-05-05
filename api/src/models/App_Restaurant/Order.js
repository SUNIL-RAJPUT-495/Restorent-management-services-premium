import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({

  restId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restorent' },
  orderNumber: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ['qsr', 'fine-dine', 'delivery', 'pickup'],
    required: true,
  },
  source: {
    type: String,
    enum: ['internal', 'swiggy', 'zomato'],
    default: 'internal',
  },
  externalId: {
    type: String,
  },
  tableNumber: {
    type: String,
  },
  customer: {
    type: String,
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    name: String,
    price: Number,
    qty: Number,
  }],
  status: {
    type: String,
    enum: ['new', 'preparing', 'ready', 'delivered', 'completed', 'cancelled'],
    default: 'new',
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'online'],
  },
}, {
  timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
