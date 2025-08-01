const express = require('express');
const router = express.Router();
const twitterController = require('../controllers/twitterController');
const auth = require('../middleware/auth');

// Twitter credentials routes
router.post('/credentials', auth, twitterController.saveTwitterCredentials);
router.get('/credentials/status', auth, twitterController.getTwitterStatus);
router.delete('/credentials', auth, twitterController.deleteTwitterCredentials);

// Content generation routes
router.post('/generate', auth, twitterController.generateContent);
router.get('/generated-content', auth, twitterController.getGeneratedContent);
router.get('/generated-content/:id', auth, twitterController.getGeneratedContentById);

module.exports = router; 