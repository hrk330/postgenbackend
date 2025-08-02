const ApprovedPost = require('../models/ApprovedPost');
const ScheduledPost = require('../models/ScheduledPost');

// Get all approved posts for user
exports.getApprovedPosts = async (req, res) => {
  try {
    const { status, category, page = 1, limit = 20 } = req.query;
    
    let query = { user: req.user._id };
    
    if (status) query.status = status;
    if (category) query.category = category;
    
    const posts = await ApprovedPost.find(query)
      .sort({ approvedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('user', 'name email');
    
    const total = await ApprovedPost.countDocuments(query);
    
    res.json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new approved post
exports.createApprovedPost = async (req, res) => {
  try {
    const { content, category, hashtags, originalSource, isTemplate, templateName } = req.body;
    
    const post = new ApprovedPost({
      user: req.user._id,
      content,
      category,
      hashtags: hashtags || [],
      originalSource,
      isTemplate,
      templateName
    });
    
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update approved post
exports.updateApprovedPost = async (req, res) => {
  try {
    const { content, category, hashtags, status } = req.body;
    
    const post = await ApprovedPost.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      {
        content,
        category,
        hashtags,
        status,
        lastEditedAt: new Date()
      },
      { new: true }
    );
    
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete approved post
exports.deleteApprovedPost = async (req, res) => {
  try {
    const post = await ApprovedPost.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user._id 
    });
    
    if (!post) return res.status(404).json({ message: 'Post not found' });
    
    // Also delete any scheduled posts that reference this post
    await ScheduledPost.deleteMany({ approvedPost: req.params.id });
    
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Bulk actions
exports.bulkAction = async (req, res) => {
  try {
    const { action, postIds } = req.body;
    
    if (!postIds || postIds.length === 0) {
      return res.status(400).json({ message: 'No posts selected' });
    }
    
    let result;
    
    switch (action) {
      case 'delete':
        result = await ApprovedPost.deleteMany({
          _id: { $in: postIds },
          user: req.user._id
        });
        // Also delete scheduled posts
        await ScheduledPost.deleteMany({
          approvedPost: { $in: postIds }
        });
        break;
        
      case 'unapprove':
        result = await ApprovedPost.updateMany(
          { _id: { $in: postIds }, user: req.user._id },
          { status: 'unapproved' }
        );
        break;
        
      case 'approve':
        result = await ApprovedPost.updateMany(
          { _id: { $in: postIds }, user: req.user._id },
          { status: 'approved' }
        );
        break;
        
      case 'categorize':
        const { category } = req.body;
        result = await ApprovedPost.updateMany(
          { _id: { $in: postIds }, user: req.user._id },
          { category }
        );
        break;
        
      default:
        return res.status(400).json({ message: 'Invalid action' });
    }
    
    res.json({ 
      message: `Bulk action '${action}' completed successfully`,
      modifiedCount: result.modifiedCount || result.deletedCount
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get post statistics
exports.getPostStats = async (req, res) => {
  try {
    const stats = await ApprovedPost.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: null,
          totalPosts: { $sum: 1 },
          approvedPosts: { 
            $sum: { $cond: [{ $eq: ['$status', 'approved'] }, 1, 0] }
          },
          scheduledPosts: { 
            $sum: { $cond: [{ $eq: ['$status', 'scheduled'] }, 1, 0] }
          },
          postedCount: { 
            $sum: { $cond: [{ $eq: ['$status', 'posted'] }, 1, 0] }
          },
          totalViews: { $sum: '$engagement.views' },
          totalLikes: { $sum: '$engagement.likes' },
          totalRetweets: { $sum: '$engagement.retweets' }
        }
      }
    ]);
    
    const categoryStats = await ApprovedPost.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);
    
    res.json({
      stats: stats[0] || {
        totalPosts: 0,
        approvedPosts: 0,
        scheduledPosts: 0,
        postedCount: 0,
        totalViews: 0,
        totalLikes: 0,
        totalRetweets: 0
      },
      categoryStats
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update engagement metrics
exports.updateEngagement = async (req, res) => {
  try {
    const { postId } = req.params;
    const { views, likes, retweets, replies } = req.body;
    
    const post = await ApprovedPost.findOneAndUpdate(
      { _id: postId, user: req.user._id },
      {
        'engagement.views': views,
        'engagement.likes': likes,
        'engagement.retweets': retweets,
        'engagement.replies': replies
      },
      { new: true }
    );
    
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 