import express from 'express';
import Order from '../../models/App_Restaurant/Order.js';

const router = express.Router();

// Helper to generate a unique order number
const generateOrderNumber = () => `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

// Mock Swiggy Webhook
router.post('/swiggy', async (req, res) => {
  try {
    const { orderId, customerName, items, totalAmount } = req.body;

    const newOrder = new Order({
      orderNumber: generateOrderNumber(),
      type: 'delivery',
      source: 'swiggy',
      externalId: orderId,
      customer: customerName,
      items: items.map(item => ({
        name: item.name,
        qty: item.qty,
        price: item.price
      })),
      totalAmount,
      status: 'new'
    });

    await newOrder.save();

    // Emit socket event if io is attached to app
    const io = req.app.get('socketio');
    if (io) {
      io.emit('newOrder', newOrder);
    }

    res.status(200).json({ success: true, message: 'Order received from Swiggy' });
  } catch (error) {
    console.error('Swiggy Webhook Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Mock Zomato Webhook
router.post('/zomato', async (req, res) => {
  try {
    const { orderId, customerName, items, totalAmount } = req.body;

    const newOrder = new Order({
      orderNumber: generateOrderNumber(),
      type: 'delivery',
      source: 'zomato',
      externalId: orderId,
      customer: customerName,
      items: items.map(item => ({
        name: item.name,
        qty: item.qty,
        price: item.price
      })),
      totalAmount,
      status: 'new'
    });

    await newOrder.save();

    const io = req.app.get('socketio');
    if (io) {
      io.emit('newOrder', newOrder);
    }

    res.status(200).json({ success: true, message: 'Order received from Zomato' });
  } catch (error) {
    console.error('Zomato Webhook Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
