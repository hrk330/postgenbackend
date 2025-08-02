const express = require('express');
const router = express.Router();
const scheduleTemplateController = require('../controllers/scheduleTemplateController');
const auth = require('../middleware/auth');

// Get all schedule templates
router.get('/', auth, scheduleTemplateController.getScheduleTemplates);

// Create new schedule template
router.post('/', auth, scheduleTemplateController.createScheduleTemplate);

// Update schedule template
router.put('/:id', auth, scheduleTemplateController.updateScheduleTemplate);

// Delete schedule template
router.delete('/:id', auth, scheduleTemplateController.deleteScheduleTemplate);

// Use schedule template
router.post('/:id/use', auth, scheduleTemplateController.useScheduleTemplate);

// Get smart scheduling suggestions
router.get('/smart-suggestions', auth, scheduleTemplateController.getSmartSchedulingSuggestions);

module.exports = router; 