const express = require('express');
const router = express.Router();
const agreementController = require('../controllers/agreementController');

router.get('/', agreementController.getAgreement);

module.exports = router; 