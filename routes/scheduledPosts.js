const express = require('express');
const router = express.Router();
const scheduledPostController = require('../controllers/scheduledPostController');
const auth = require('../middleware/auth');

// Get all scheduled posts
router.get('/', auth, scheduledPostController.getScheduledPosts);

// Create manual scheduled post
router.post('/', auth, scheduledPostController.createScheduledPost);

// Create automatic scheduled posts
router.post('/automatic', auth, scheduledPostController.createAutomaticSchedule);

// Update scheduled post
router.put('/:id', auth, scheduledPostController.updateScheduledPost);

// Delete scheduled post
router.delete('/:id', auth, scheduledPostController.deleteScheduledPost);

// Reorder queue
router.post('/reorder-queue', auth, scheduledPostController.reorderQueue);

// Get scheduling conflicts
router.get('/conflicts', auth, scheduledPostController.getConflicts);

// Get queue statistics
router.get('/stats', auth, scheduledPostController.getQueueStats);

module.exports = router; 