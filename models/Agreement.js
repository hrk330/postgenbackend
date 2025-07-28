const mongoose = require('mongoose');

const AgreementSchema = new mongoose.Schema({
  text: { type: String, required: true },
  version: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Agreement', AgreementSchema); 