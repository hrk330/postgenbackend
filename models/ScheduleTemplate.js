const mongoose = require('mongoose');

const ScheduleTemplateSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  frequency: { 
    type: String, 
    enum: ['once', 'daily', 'weekly', 'monthly'], 
    required: true 
  },
  timeSlots: [{ type: String }], // Array of time slots like "09:00", "18:00"
  daysOfWeek: [{ type: Number }], // 0-6 for Sunday-Saturday
  daysOfMonth: [{ type: Number }], // 1-31 for monthly
  selectedCategories: [{ 
    type: String, 
    enum: ['food', 'lifestyle', 'tech', 'business', 'entertainment', 'other']
  }],
  maxPostsPerDay: { type: Number, default: 5 },
  isActive: { type: Boolean, default: true },
  usageCount: { type: Number, default: 0 },
  lastUsedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('ScheduleTemplate', ScheduleTemplateSchema); 