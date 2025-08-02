const mongoose = require('mongoose');

const ApprovedPostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['draft', 'approved', 'scheduled', 'posted', 'unapproved'], 
    default: 'approved' 
  },
  category: { 
    type: String, 
    enum: ['food', 'lifestyle', 'tech', 'business', 'entertainment', 'other'],
    default: 'other'
  },
  hashtags: [{ type: String }],
  template: { type: String }, // Reference to saved template
  approvedAt: { type: Date, default: Date.now },
  scheduledFor: { type: Date },
  postedAt: { type: Date },
  engagement: {
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    retweets: { type: Number, default: 0 },
    replies: { type: Number, default: 0 }
  },
  originalSource: { 
    type: String, 
    enum: ['thought_lab', 'content_crafter', 'custom'],
    required: true 
  },
  isTemplate: { type: Boolean, default: false },
  templateName: { type: String },
  lastEditedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('ApprovedPost', ApprovedPostSchema); 