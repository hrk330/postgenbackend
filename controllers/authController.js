const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const emailTemplates = require('../templates/emailTemplates');
const confirmationPages = require('../templates/confirmationPages');

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
        'Verify Your Email - PostGen AI',
        emailTemplates.emailVerification(name, verifyUrl, email)
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
    res.send(confirmationPages.emailVerifiedSuccess);
  } catch (err) {
    res.status(500).send(confirmationPages.errorPage);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // First, check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ 
        message: 'No account found with this email. Please sign up first.',
        errorType: 'EMAIL_NOT_FOUND'
      });
    }
    
    // Check if email is verified
    if (!user.isVerified) {
      return res.status(400).json({ 
        message: 'Please verify your email first. Check your inbox for the verification link.',
        errorType: 'EMAIL_NOT_VERIFIED'
      });
    }
    
    // Check password
    if (user.password !== password) {
      return res.status(400).json({ 
        message: 'Invalid password. Please check your credentials.',
        errorType: 'INVALID_PASSWORD'
      });
    }
    
    // Login successful
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
    try {
      await sendEmail(
        email,
        'Reset Your Password - PostGen AI',
        emailTemplates.passwordReset(user.name, resetUrl, email)
      );
      res.json({ message: 'Password reset email sent' });
    } catch (emailErr) {
      console.error('Email send error:', emailErr);
      res.status(500).json({ message: 'Failed to send password reset email. Please try again.' });
    }
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
    res.send(confirmationPages.passwordResetSuccess);
  } catch (err) {
    res.status(500).send(confirmationPages.errorPage);
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
        'Verify Your Email - PostGen AI',
        emailTemplates.emailVerification(user.name, verifyUrl, email)
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
        'Confirm Account Deletion - PostGen AI',
        emailTemplates.accountDeletion(user.name, deleteUrl, user.email)
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
      return res.status(400).send(confirmationPages.invalidDeletionLink);
    }

    // Delete the user account
    await User.findByIdAndDelete(user._id);
    
    res.send(confirmationPages.accountDeletedSuccess);
  } catch (err) {
    res.status(500).send(confirmationPages.errorPage);
  }
}; 