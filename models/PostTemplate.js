const mongoose = require('mongoose');

const PostTemplateSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  content: { type: String, required: true },
  hashtags: [{ type: String }],
  category: { 
    type: String, 
    enum: ['food', 'lifestyle', 'tech', 'business', 'entertainment', 'other'],
    default: 'other'
  },
  isPublic: { type: Boolean, default: false }, // For sharing templates
  usageCount: { type: Number, default: 0 },
  lastUsedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('PostTemplate', PostTemplateSchema); 