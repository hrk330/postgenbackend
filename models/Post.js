const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  scheduledTime: { type: Date },
  status: { type: String, enum: ['draft', 'scheduled', 'posted'], default: 'draft' },
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema); 