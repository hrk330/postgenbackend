const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  preferences: {
    type: Object,
    default: {},
  },
  acceptedAgreement: { type: Boolean, default: false },
  hasCompletedOnboarding: { type: Boolean, default: false },
  onboardingStep: { type: String, enum: ['agreement', 'preferences', 'completed'], default: 'agreement' },
  // Account deletion fields
  deleteAccountToken: { type: String },
  deleteAccountExpires: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema); 