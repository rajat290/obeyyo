const Order = require('../models/Order');
const OrderStatusHistory = require('../models/OrderStatusHistory');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const ProductVariant = require('../models/ProductVariant');
const Address = require('../models/Address');
const Coupon = require('../models/Coupon');
const Razorpay = require('razorpay');

class OrderService {
  constructor() {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });
  }

  // Create order from cart
  async createOrder(userId, orderData) {
    try {
      const {
        shippingAddressId,
        billingAddressId,
        paymentMethod,
        couponCode,
        notes
      } = orderData;

      // Validate addresses
      const shippingAddress = await Address.findOne({
        _id: shippingAddressId,
        user: userId
      });
      if (!shippingAddress) {
        throw new Error('Invalid shipping address');
      }

      let billingAddress = shippingAddress;
      if (billingAddressId) {
        billingAddress = await Address.findOne({
          _id: billingAddressId,
          user: userId
        });
        if (!billingAddress) {
          throw new Error('Invalid billing address');
        }
      }

      // Get and validate cart
      const cartValidation = await cartService.validateCart(userId);
      if (!cartValidation.isValid) {
        throw new Error(`Cart validation failed: ${cartValidation.errors.join(', ')}`);
      }

      const cart = cartValidation.cart;

      // Calculate totals
      let subtotal = cart.totalPrice;
      let discountAmount = 0;
      let coupon = null;

      // Apply coupon if provided
      if (couponCode) {
        coupon = await Coupon.findOne({
          code: couponCode.toUpperCase(),
          isActive: true,
          expiryDate: { $gte: new Date() }
        });

        if (!coupon) {
          throw new Error('Invalid or expired coupon');
        }

        // Check usage limits
        if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
          throw new Error('Coupon usage limit exceeded');
        }

        // Calculate discount
        if (coupon.discountType === 'percentage') {
          discountAmount = (subtotal * coupon.discountValue) / 100;
          if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
            discountAmount = coupon.maxDiscount;
          }
        } else {
          discountAmount = coupon.discountValue;
        }

        if (discountAmount > subtotal) {
          discountAmount = subtotal;
        }
      }

      const taxAmount = (subtotal - discountAmount) * 0.18; // 18% GST
      const shippingAmount = subtotal > 500 ? 0 : 50; // Free shipping above ₹500
      const totalAmount = subtotal - discountAmount + taxAmount + shippingAmount;

      // Create order items
      const orderItems = [];
      for (const item of cart.items) {
        const product = await Product.findById(item.product);
        orderItems.push({
          product: item.product,
          variant: item.variant,
          quantity: item.quantity,
          price: item.price,
          name: product.name,
          image: product.images[0]
        });
      }

      // Create order
      const order = new Order({
        user: userId,
        items: orderItems,
        shippingAddress: shippingAddressId,
        billingAddress: billingAddressId,
        paymentMethod,
        subtotal,
        taxAmount,
        shippingAmount,
        discountAmount,
        totalAmount,
        coupon: coupon?._id,
        notes
      });

      // Handle payment
      if (paymentMethod === 'razorpay') {
        const razorpayOrder = await this.createRazorpayOrder(totalAmount, order.orderNumber);
        order.razorpayOrderId = razorpayOrder.id;
      }

      await order.save();

      // Update coupon usage
      if (coupon) {
        coupon.usedCount += 1;
        await coupon.save();
      }

      // Clear cart after successful order creation
      await cartService.clearCart(userId);

      // Create order status history
      await this.createOrderStatusHistory(order._id, null, 'pending', userId, 'Order created');

      return await this.getOrderById(order._id, userId);
    } catch (error) {
      throw new Error(`Error creating order: ${error.message}`);
    }
  }

  // Create Razorpay order
  async createRazorpayOrder(amount, orderNumber) {
    try {
      const options = {
        amount: Math.round(amount * 100), // Amount in paisa
        currency: 'INR',
        receipt: orderNumber,
        payment_capture: 1
      };

      return await this.razorpay.orders.create(options);
    } catch (error) {
      throw new Error(`Error creating Razorpay order: ${error.message}`);
    }
  }

  // Verify Razorpay payment
  async verifyPayment(orderId, paymentData) {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentData;

      // Verify signature
      const sign = razorpay_order_id + '|' + razorpay_payment_id;
      const expectedSign = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(sign.toString())
        .digest('hex');

      if (razorpay_signature !== expectedSign) {
        throw new Error('Payment verification failed');
      }

      // Update order
      const order = await Order.findById(orderId);
      if (!order) {
        throw new Error('Order not found');
      }

      order.paymentStatus = 'paid';
      order.razorpayPaymentId = razorpay_payment_id;
      order.orderStatus = 'confirmed';

      await order.save();

      // Create status history
      await this.createOrderStatusHistory(orderId, 'pending', 'confirmed', order.user, 'Payment verified');

      return order;
    } catch (error) {
      throw new Error(`Error verifying payment: ${error.message}`);
    }
  }

  // Get user's orders
  async getUserOrders(userId, page = 1, limit = 10, status = null) {
    try {
      const query = { user: userId };
      if (status) {
        query.orderStatus = status;
      }

      const orders = await Order.find(query)
        .populate('items.product', 'name images slug')
        .populate('shippingAddress')
        .populate('billingAddress')
        .populate('coupon', 'code discountType discountValue')
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await Order.countDocuments(query);

      return {
        orders,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw new Error(`Error fetching orders: ${error.message}`);
    }
  }

  // Get order by ID
  async getOrderById(orderId, userId) {
    try {
      const order = await Order.findOne({ _id: orderId, user: userId })
        .populate('items.product', 'name images slug')
        .populate('items.variant', 'name sku')
        .populate('shippingAddress')
        .populate('billingAddress')
        .populate('coupon', 'code discountType discountValue')
        .populate('user', 'name email');

      if (!order) {
        throw new Error('Order not found');
      }

      return order;
    } catch (error) {
      throw new Error(`Error fetching order: ${error.message}`);
    }
  }

  // Update order status (admin only)
  async updateOrderStatus(orderId, newStatus, userId, reason = '', notes = '') {
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        throw new Error('Order not found');
      }

      const oldStatus = order.orderStatus;
      order.orderStatus = newStatus;

      if (newStatus === 'delivered') {
        order.deliveredAt = new Date();
      }

      await order.save();

      // Create status history
      await this.createOrderStatusHistory(orderId, oldStatus, newStatus, userId, reason, notes);

      return order;
    } catch (error) {
      throw new Error(`Error updating order status: ${error.message}`);
    }
  }

  // Cancel order
  async cancelOrder(orderId, userId, reason = '') {
    try {
      const order = await Order.findOne({ _id: orderId, user: userId });
      if (!order) {
        throw new Error('Order not found');
      }

      if (!['pending', 'confirmed'].includes(order.orderStatus)) {
        throw new Error('Order cannot be cancelled at this stage');
      }

      // Restore inventory
      for (const item of order.items) {
        if (item.variant) {
          await ProductVariant.findByIdAndUpdate(item.variant, {
            $inc: { stock: item.quantity }
          });
        } else {
          await Product.findByIdAndUpdate(item.product, {
            $inc: { stock: item.quantity }
          });
        }
      }

      // Process refund if payment was made
      if (order.paymentStatus === 'paid' && order.paymentMethod === 'razorpay') {
        // Implement refund logic here
      }

      const oldStatus = order.orderStatus;
      order.orderStatus = 'cancelled';
      await order.save();

      // Create status history
      await this.createOrderStatusHistory(orderId, oldStatus, 'cancelled', userId, reason || 'Order cancelled by user');

      return order;
    } catch (error) {
      throw new Error(`Error cancelling order: ${error.message}`);
    }
  }

  // Create order status history
  async createOrderStatusHistory(orderId, oldStatus, newStatus, changedBy, reason = '', notes = '') {
    try {
      const history = new OrderStatusHistory({
        order: orderId,
        oldStatus,
        newStatus,
        changedBy,
        reason,
        notes
      });

      await history.save();
      return history;
    } catch (error) {
      console.error('Error creating order status history:', error);
      // Don't throw error for history creation failures
    }
  }

  // Get order statistics
  async getOrderStats(userId = null) {
    try {
      const matchStage = {};
      if (userId) {
        matchStage.user = userId;
      }

      const stats = await Order.aggregate([
        { $match: matchStage },
        {
          $group: {
            _id: null,
            totalOrders: { $sum: 1 },
            totalRevenue: { $sum: '$totalAmount' },
            pendingOrders: {
              $sum: { $cond: [{ $eq: ['$orderStatus', 'pending'] }, 1, 0] }
            },
            completedOrders: {
              $sum: { $cond: [{ $eq: ['$orderStatus', 'delivered'] }, 1, 0] }
            },
            cancelledOrders: {
              $sum: { $cond: [{ $eq: ['$orderStatus', 'cancelled'] }, 1, 0] }
            }
          }
        }
      ]);

      return stats[0] || {
        totalOrders: 0,
        totalRevenue: 0,
        pendingOrders: 0,
        completedOrders: 0,
        cancelledOrders: 0
      };
    } catch (error) {
      throw new Error(`Error getting order stats: ${error.message}`);
    }
  }
}

module.exports = new OrderService();
