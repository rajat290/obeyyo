const mongoose = require('mongoose');

const orderStatusHistorySchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  oldStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
    required: true
  },
  newStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
    required: true
  },
  changedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reason: {
    type: String,
    maxlength: 500,
    required: false
  },
  notes: {
    type: String,
    maxlength: 1000,
    required: false
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    required: false
  }
}, {
  timestamps: true
});

// Index for performance
orderStatusHistorySchema.index({ order: 1, createdAt: -1 });
orderStatusHistorySchema.index({ changedBy: 1 });

module.exports = mongoose.model('OrderStatusHistory', orderStatusHistorySchema);
