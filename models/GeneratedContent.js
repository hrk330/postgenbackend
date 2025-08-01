const mongoose = require('mongoose');

const GeneratedContentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  extractedKeywords: { type: [String], default: [] },
  generatedPrompt: { type: String, required: true },
  generatedContent: { type: String, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  // Store the data that was sent to external API for reference
  inputData: { type: Object },
  // Store external API response for debugging
  externalApiResponse: { type: Object },
  errorMessage: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('GeneratedContent', GeneratedContentSchema); 