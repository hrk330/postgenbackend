const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

const CLIENT_URL = process.env.CLIENT_URL || 'https://postgenbackend.onrender.com';

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    // Store password as plain text (for dev/testing only)
    const verificationToken = crypto.randomBytes(32).toString('hex');

    user = new User({
      email,
      password, // plain text
      name,
      verificationToken,
    });
    await user.save();

    const verifyUrl = `${CLIENT_URL}/api/auth/verify/${verificationToken}`;
    try {
      await sendEmail(
        email,
        'Verify your email',
        `<p>Click <a href="${verifyUrl}">here</a> to verify your email.</p>`
      );
      res.status(201).json({ message: 'Registration successful, please check your email to verify.' });
    } catch (emailErr) {
      // Log but don't fail registration
      console.error('Email send error:', emailErr);
      res.status(201).json({ message: 'User registered, but verification email failed to send. Contact admin.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({ verificationToken: token });
    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    res.json({ message: 'Email verified successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    if (!user.isVerified) return res.status(400).json({ message: 'Please verify your email first' });
    // Compare plain text password
    if (user.password !== password) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        email: user.email, 
        name: user.name,
        hasCompletedOnboarding: user.hasCompletedOnboarding,
        onboardingStep: user.onboardingStep,
        acceptedAgreement: user.acceptedAgreement
      } 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    const resetUrl = `${CLIENT_URL}/api/auth/reset-password/${resetToken}`;
    await sendEmail(
      email,
      'Reset your password',
      `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 1 hour.</p>`
    );
    res.json({ message: 'Password reset email sent' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });
    user.password = password; // plain text
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: 'Email is already verified' });
    }

    // Generate new verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    user.verificationToken = verificationToken;
    await user.save();

    const verifyUrl = `${CLIENT_URL}/api/auth/verify/${verificationToken}`;

    try {
      await sendEmail(
        email,
        'Verify your email',
        `<p>Click <a href="${verifyUrl}">here</a> to verify your email.</p>`
      );
      res.json({ message: 'Verification email sent successfully' });
    } catch (emailErr) {
      console.error('Email send error:', emailErr);
      res.status(500).json({ message: 'Failed to send verification email. Please try again.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Request account deletion
exports.requestAccountDeletion = async (req, res) => {
  try {
    const user = req.user;
    
    // Generate deletion token
    const deleteToken = crypto.randomBytes(32).toString('hex');
    user.deleteAccountToken = deleteToken;
    user.deleteAccountExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const deleteUrl = `${CLIENT_URL}/api/auth/confirm-delete/${deleteToken}`;

    try {
      await sendEmail(
        user.email,
        'Confirm Account Deletion',
        `<p>You have requested to delete your account.</p>
         <p>Click <a href="${deleteUrl}">here</a> to confirm account deletion.</p>
         <p><strong>Warning:</strong> This action cannot be undone. All your data will be permanently deleted.</p>
         <p>This link expires in 1 hour.</p>`
      );
      res.json({ message: 'Account deletion confirmation email sent' });
    } catch (emailErr) {
      console.error('Email send error:', emailErr);
      res.status(500).json({ message: 'Failed to send confirmation email. Please try again.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Confirm account deletion
exports.confirmAccountDeletion = async (req, res) => {
  try {
    const { token } = req.params;
    
    const user = await User.findOne({
      deleteAccountToken: token,
      deleteAccountExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired deletion token' });
    }

    // Delete the user account
    await User.findByIdAndDelete(user._id);
    
    res.json({ message: 'Account deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 