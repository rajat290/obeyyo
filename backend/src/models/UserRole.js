const mongoose = require('mongoose');

const userRoleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'moderator', 'user'],
    default: 'user',
  },
}, {
  timestamps: true,
});

// Ensure one role per user
userRoleSchema.index({ userId: 1, role: 1 }, { unique: true });

module.exports = mongoose.model('UserRole', userRoleSchema);
