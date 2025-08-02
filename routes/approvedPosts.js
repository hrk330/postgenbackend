const express = require('express');
const router = express.Router();
const approvedPostController = require('../controllers/approvedPostController');
const auth = require('../middleware/auth');

// Get all approved posts
router.get('/', auth, approvedPostController.getApprovedPosts);

// Create new approved post
router.post('/', auth, approvedPostController.createApprovedPost);

// Update approved post
router.put('/:id', auth, approvedPostController.updateApprovedPost);

// Delete approved post
router.delete('/:id', auth, approvedPostController.deleteApprovedPost);

// Bulk actions
router.post('/bulk-action', auth, approvedPostController.bulkAction);

// Get post statistics
router.get('/stats', auth, approvedPostController.getPostStats);

// Update engagement metrics
router.put('/:postId/engagement', auth, approvedPostController.updateEngagement);

module.exports = router; 