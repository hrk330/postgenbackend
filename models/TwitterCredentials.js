const mongoose = require('mongoose');

const TwitterCredentialsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  twitterUsername: { type: String, required: true },
  twitterHandle: { type: String, required: true },
  twitterPassword: { type: String, required: true },
  // Add any additional Twitter API keys if needed
  apiKey: { type: String },
  apiSecret: { type: String },
  accessToken: { type: String },
  accessTokenSecret: { type: String },
  isLinked: { type: Boolean, default: false },
  linkedAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('TwitterCredentials', TwitterCredentialsSchema); 