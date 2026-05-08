import Order from '../../models/App_Restaurant/Order.js';
import Table from '../../models/App_Restaurant/Table.js';

export const createOrder = async (req, res) => {
  try {
    const { items, type, tableNumber, totalAmount, paymentMethod } = req.body;
    

    const orderCount = await Order.countDocuments({ restId: req.restaurant._id });
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}-${orderCount + 1}`;

    const order = new Order({
      restId: req.restaurant._id,
      orderNumber,
      items,
      type,
      tableNumber,
      totalAmount,
      paymentMethod,
    });

    const createdOrder = await order.save();
    



    if (tableNumber) {
      await Table.findOneAndUpdate(
        { number: tableNumber, restId: req.restaurant._id },
        { 
          status: 'occupied',
          $set: { guests: req.body.guests || 1 },
          $setOnInsert: { occupiedSince: new Date() }
        }
      );
    }

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ restId: req.restaurant._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, restId: req.restaurant._id });
    if (order) {
      order.status = req.body.status || order.status;
      if (req.body.items) order.items = req.body.items;
      if (req.body.totalAmount) order.totalAmount = req.body.totalAmount;
      const updatedOrder = await order.save();

      if (order.tableNumber && ['new', 'preparing', 'ready', 'delivered'].includes(updatedOrder.status)) {
        await Table.findOneAndUpdate(
          { number: order.tableNumber, restId: req.restaurant._id },
          { status: 'occupied' }
        );
      } else if (order.tableNumber && ['completed', 'cancelled'].includes(updatedOrder.status)) {
        await Table.findOneAndUpdate(
          { number: order.tableNumber, restId: req.restaurant._id },
          { status: 'vacant', guests: 0, occupiedSince: null }
        );
      }

      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
