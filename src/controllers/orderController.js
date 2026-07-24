import mongoose from 'mongoose';
import Order, { ORDER_STATUSES, PAYMENT_METHODS } from '../models/Order.js';
import Product from '../models/Product.js';

// POST /api/orders  (any logged-in user) — place an order
export const createOrder = async (req, res) => {
  try {
    const { items, deliveryAddress, paymentMethod } = req.body;

    if (paymentMethod && !PAYMENT_METHODS.includes(paymentMethod)) {
      return res.status(400).json({ message: 'Invalid payment method' });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Your order must contain at least one item' });
    }
    if (
      !deliveryAddress ||
      !deliveryAddress.fullName ||
      !deliveryAddress.phone ||
      !deliveryAddress.street ||
      !deliveryAddress.city
    ) {
      return res.status(400).json({ message: 'Please provide a complete delivery address' });
    }

    // Build line items from the DB so price/stock can't be tampered with client-side.
    const orderItems = [];
    let totalPrice = 0;

    for (const item of items) {
      // A malformed id (e.g. a stale cart item from before the catalogue moved
      // to the DB) would otherwise throw a CastError and 500. Treat it the same
      // as a missing product, with a message the shopper can act on.
      if (!mongoose.Types.ObjectId.isValid(item.product)) {
        return res.status(400).json({
          message: 'Some items in your cart are no longer available. Please remove them and add fresh ones.',
        });
      }
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(400).json({
          message: 'Some items in your cart are no longer available. Please remove them and add fresh ones.',
        });
      }

      const quantity = Number(item.quantity) || 0;
      if (quantity < 1) {
        return res.status(400).json({ message: `Invalid quantity for ${product.name}` });
      }
      if (product.stock < quantity) {
        return res.status(400).json({ message: `Not enough stock for ${product.name}` });
      }

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity,
      });
      totalPrice += product.price * quantity;

      product.stock -= quantity;
      await product.save();
    }

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalPrice,
      deliveryAddress,
      ...(paymentMethod ? { paymentMethod } : {}),
    });

    res.status(201).json({ order });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// GET /api/orders/my  (logged-in user) — their own order history
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// GET /api/orders  (admin only) — all orders, filter by ?status= and ?search=
export const getOrders = async (req, res) => {
  try {
    const { status, search } = req.query;
    const filter = {};

    if (status && status !== 'All' && ORDER_STATUSES.includes(status)) {
      filter.status = status;
    }

    let query = Order.find(filter)
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    let orders = await query;

    // Search across the (populated) customer name/email or the order id.
    if (search) {
      const term = search.toLowerCase();
      orders = orders.filter((o) => {
        return (
          o._id.toString().includes(term) ||
          o.user?.name?.toLowerCase().includes(term) ||
          o.user?.email?.toLowerCase().includes(term)
        );
      });
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// GET /api/orders/:id  (admin, or the user who owns it)
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const isOwner = order.user._id.toString() === req.user._id.toString();
    if (req.user.role !== 'admin' && !isOwner) {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// PATCH /api/orders/:id/status  (admin only)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!ORDER_STATUSES.includes(status)) {
      return res.status(400).json({
        message: `Status must be one of: ${ORDER_STATUSES.join(', ')}`,
      });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};
