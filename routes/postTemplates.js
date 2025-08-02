const express = require('express');
const router = express.Router();
const postTemplateController = require('../controllers/postTemplateController');
const auth = require('../middleware/auth');

// Get all templates
router.get('/', auth, postTemplateController.getTemplates);

// Create new template
router.post('/', auth, postTemplateController.createTemplate);

// Update template
router.put('/:id', auth, postTemplateController.updateTemplate);

// Delete template
router.delete('/:id', auth, postTemplateController.deleteTemplate);

// Use template
router.post('/:id/use', auth, postTemplateController.useTemplate);

// Get popular hashtags
router.get('/hashtags/popular', auth, postTemplateController.getPopularHashtags);

module.exports = router; 