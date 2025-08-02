const mongoose = require('mongoose');

const ScheduledPostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  approvedPost: { type: mongoose.Schema.Types.ObjectId, ref: 'ApprovedPost' },
  content: { type: String, required: true }, // Direct content if not from approved post
  scheduledFor: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['scheduled', 'posted', 'cancelled', 'failed'], 
    default: 'scheduled' 
  },
  frequency: { 
    type: String, 
    enum: ['once', 'daily', 'weekly', 'monthly'], 
    default: 'once' 
  },
  template: { type: String }, // Reference to scheduling template
  isAutomatic: { type: Boolean, default: false },
  automaticConfig: {
    selectedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ApprovedPost' }],
    timeSlots: [{ type: String }], // Array of time slots like "09:00", "18:00"
    daysOfWeek: [{ type: Number }], // 0-6 for Sunday-Saturday
    daysOfMonth: [{ type: Number }], // 1-31 for monthly
    endDate: { type: Date }
  },
  queuePosition: { type: Number, default: 0 },
  postedAt: { type: Date },
  errorMessage: { type: String },
  retryCount: { type: Number, default: 0 },
  maxRetries: { type: Number, default: 3 }
}, { timestamps: true });

module.exports = mongoose.model('ScheduledPost', ScheduledPostSchema); 