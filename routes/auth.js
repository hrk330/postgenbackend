const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/register', authController.register);
router.get('/verify/:token', authController.verifyEmail);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);
router.post('/resend-verification', authController.resendVerificationEmail);

// Account deletion routes
router.post('/request-deletion', auth, authController.requestAccountDeletion);
router.get('/confirm-delete/:token', authController.confirmAccountDeletion);

module.exports = router; 