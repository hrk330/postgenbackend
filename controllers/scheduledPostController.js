const ScheduledPost = require('../models/ScheduledPost');
const ApprovedPost = require('../models/ApprovedPost');
const ScheduleTemplate = require('../models/ScheduleTemplate');

// Get all scheduled posts for user
exports.getScheduledPosts = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    
    let query = { user: req.user._id };
    if (status) query.status = status;
    
    const scheduledPosts = await ScheduledPost.find(query)
      .sort({ scheduledFor: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('approvedPost', 'content category hashtags')
      .populate('user', 'name email');
    
    const total = await ScheduledPost.countDocuments(query);
    
    res.json({
      scheduledPosts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create manual scheduled post
exports.createScheduledPost = async (req, res) => {
  try {
    const { 
      approvedPostId, 
      content, 
      scheduledFor, 
      frequency = 'once',
      template 
    } = req.body;
    
    // Check for scheduling conflicts
    const conflict = await ScheduledPost.findOne({
      user: req.user._id,
      scheduledFor: {
        $gte: new Date(scheduledFor),
        $lte: new Date(new Date(scheduledFor).getTime() + 30 * 60000) // 30 min window
      },
      status: 'scheduled'
    });
    
    if (conflict) {
      return res.status(400).json({ 
        message: 'Scheduling conflict detected. Please choose a different time.',
        conflict: conflict
      });
    }
    
    const scheduledPost = new ScheduledPost({
      user: req.user._id,
      approvedPost: approvedPostId,
      content: content || (approvedPostId ? null : content),
      scheduledFor: new Date(scheduledFor),
      frequency,
      template
    });
    
    await scheduledPost.save();
    
    // Update approved post status if it exists
    if (approvedPostId) {
      await ApprovedPost.findByIdAndUpdate(approvedPostId, {
        status: 'scheduled',
        scheduledFor: new Date(scheduledFor)
      });
    }
    
    res.status(201).json(scheduledPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create automatic scheduled posts
exports.createAutomaticSchedule = async (req, res) => {
  try {
    const { 
      selectedPosts, 
      timeSlots, 
      daysOfWeek, 
      daysOfMonth, 
      frequency, 
      endDate,
      template 
    } = req.body;
    
    const scheduledPosts = [];
    const now = new Date();
    const end = endDate ? new Date(endDate) : new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days default
    
    // Generate schedule based on frequency
    let currentDate = new Date(now);
    
    while (currentDate <= end) {
      let shouldSchedule = false;
      
      switch (frequency) {
        case 'daily':
          shouldSchedule = true;
          break;
        case 'weekly':
          shouldSchedule = daysOfWeek.includes(currentDate.getDay());
          break;
        case 'monthly':
          shouldSchedule = daysOfMonth.includes(currentDate.getDate());
          break;
      }
      
      if (shouldSchedule) {
        for (const timeSlot of timeSlots) {
          const [hours, minutes] = timeSlot.split(':');
          const scheduledTime = new Date(currentDate);
          scheduledTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
          
          if (scheduledTime > now) {
            // Create scheduled post for each selected post
            for (const postId of selectedPosts) {
              const scheduledPost = new ScheduledPost({
                user: req.user._id,
                approvedPost: postId,
                scheduledFor: scheduledTime,
                frequency: 'once',
                isAutomatic: true,
                automaticConfig: {
                  selectedPosts,
                  timeSlots,
                  daysOfWeek,
                  daysOfMonth,
                  endDate: end
                },
                template
              });
              
              scheduledPosts.push(scheduledPost);
            }
          }
        }
      }
      
      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    if (scheduledPosts.length === 0) {
      return res.status(400).json({ message: 'No valid schedule times found' });
    }
    
    await ScheduledPost.insertMany(scheduledPosts);
    
    // Update approved posts status
    await ApprovedPost.updateMany(
      { _id: { $in: selectedPosts } },
      { status: 'scheduled' }
    );
    
    res.status(201).json({
      message: `Created ${scheduledPosts.length} scheduled posts`,
      count: scheduledPosts.length
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update scheduled post
exports.updateScheduledPost = async (req, res) => {
  try {
    const { content, scheduledFor, status } = req.body;
    
    const scheduledPost = await ScheduledPost.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      {
        content,
        scheduledFor: scheduledFor ? new Date(scheduledFor) : undefined,
        status
      },
      { new: true }
    );
    
    if (!scheduledPost) return res.status(404).json({ message: 'Scheduled post not found' });
    res.json(scheduledPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete scheduled post
exports.deleteScheduledPost = async (req, res) => {
  try {
    const scheduledPost = await ScheduledPost.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user._id 
    });
    
    if (!scheduledPost) return res.status(404).json({ message: 'Scheduled post not found' });
    
    // Update approved post status if it exists
    if (scheduledPost.approvedPost) {
      await ApprovedPost.findByIdAndUpdate(scheduledPost.approvedPost, {
        status: 'approved',
        scheduledFor: null
      });
    }
    
    res.json({ message: 'Scheduled post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reorder scheduled posts queue
exports.reorderQueue = async (req, res) => {
  try {
    const { postIds } = req.body; // Array of post IDs in new order
    
    for (let i = 0; i < postIds.length; i++) {
      await ScheduledPost.findByIdAndUpdate(postIds[i], {
        queuePosition: i
      });
    }
    
    res.json({ message: 'Queue reordered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get scheduling conflicts
exports.getConflicts = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const conflicts = await ScheduledPost.find({
      user: req.user._id,
      scheduledFor: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      },
      status: 'scheduled'
    }).sort({ scheduledFor: 1 });
    
    res.json(conflicts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get queue statistics
exports.getQueueStats = async (req, res) => {
  try {
    const stats = await ScheduledPost.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const todayScheduled = await ScheduledPost.countDocuments({
      user: req.user._id,
      scheduledFor: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
        $lt: new Date(new Date().setHours(23, 59, 59, 999))
      },
      status: 'scheduled'
    });
    
    res.json({
      stats,
      todayScheduled
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 