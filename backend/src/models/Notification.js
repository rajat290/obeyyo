const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  message: {
    type: String,
    required: true,
    maxlength: 1000
  },
  type: {
    type: String,
    enum: ['info', 'success', 'warning', 'error', 'order', 'promotion', 'system'],
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipientType: {
    type: String,
    enum: ['user', 'admin', 'all_users', 'all_admins'],
    default: 'user'
  },
  relatedEntity: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'entityType',
    required: false
  },
  entityType: {
    type: String,
    enum: ['Order', 'Product', 'User', 'Review', 'Banner', 'Coupon'],
    required: false
  },
  isRead: {
    type: Boolean,
    default: false
  },
  readAt: {
    type: Date,
    required: false
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  actionUrl: {
    type: String,
    required: false
  },
  actionText: {
    type: String,
    required: false
  },
  expiresAt: {
    type: Date,
    required: false
  },
  sentVia: [{
    type: String,
    enum: ['in_app', 'email', 'sms', 'push']
  }],
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    required: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // null for system notifications
  }
}, {
  timestamps: true
});

// Indexes for performance
notificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 });
notificationSchema.index({ recipientType: 1, createdAt: -1 });
notificationSchema.index({ type: 1, createdAt: -1 });
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Virtual for checking if notification is expired
notificationSchema.virtual('isExpired').get(function() {
  return this.expiresAt && this.expiresAt < new Date();
});

// Method to mark as read
notificationSchema.methods.markAsRead = function() {
  this.isRead = true;
  this.readAt = new Date();
  return this.save();
};

// Method to mark as unread
notificationSchema.methods.markAsUnread = function() {
  this.isRead = false;
  this.readAt = null;
  return this.save();
};

// Static method to create notification for user
notificationSchema.statics.createForUser = async function(userId, notificationData) {
  const notification = new this({
    ...notificationData,
    recipient: userId,
    recipientType: 'user'
  });
  return notification.save();
};

// Static method to create notification for all users
notificationSchema.statics.createForAllUsers = async function(notificationData) {
  const User = mongoose.model('User');
  const users = await User.find({ role: 'user' });

  const notifications = users.map(user => ({
    ...notificationData,
    recipient: user._id,
    recipientType: 'all_users'
  }));

  return this.insertMany(notifications);
};

// Static method to create notification for all admins
notificationSchema.statics.createForAllAdmins = async function(notificationData) {
  const User = mongoose.model('User');
  const admins = await User.find({ role: 'admin' });

  const notifications = admins.map(admin => ({
    ...notificationData,
    recipient: admin._id,
    recipientType: 'all_admins'
  }));

  return this.insertMany(notifications);
};

// Static method to get unread count for user
notificationSchema.statics.getUnreadCount = function(userId) {
  return this.countDocuments({
    recipient: userId,
    isRead: false,
    $or: [
      { expiresAt: null },
      { expiresAt: { $gt: new Date() } }
    ]
  });
};

module.exports = mongoose.model('Notification', notificationSchema);
