const PostTemplate = require('../models/PostTemplate');

// Get all templates for user
exports.getTemplates = async (req, res) => {
  try {
    const { category, isPublic } = req.query;
    
    let query = { user: req.user._id };
    if (category) query.category = category;
    if (isPublic !== undefined) query.isPublic = isPublic;
    
    const templates = await PostTemplate.find(query)
      .sort({ usageCount: -1, lastUsedAt: -1 })
      .populate('user', 'name');
    
    res.json(templates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new template
exports.createTemplate = async (req, res) => {
  try {
    const { name, content, hashtags, category, isPublic } = req.body;
    
    const template = new PostTemplate({
      user: req.user._id,
      name,
      content,
      hashtags: hashtags || [],
      category,
      isPublic: isPublic || false
    });
    
    await template.save();
    res.status(201).json(template);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update template
exports.updateTemplate = async (req, res) => {
  try {
    const { name, content, hashtags, category, isPublic } = req.body;
    
    const template = await PostTemplate.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      {
        name,
        content,
        hashtags,
        category,
        isPublic
      },
      { new: true }
    );
    
    if (!template) return res.status(404).json({ message: 'Template not found' });
    res.json(template);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete template
exports.deleteTemplate = async (req, res) => {
  try {
    const template = await PostTemplate.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user._id 
    });
    
    if (!template) return res.status(404).json({ message: 'Template not found' });
    res.json({ message: 'Template deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Use template (increment usage count)
exports.useTemplate = async (req, res) => {
  try {
    const template = await PostTemplate.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      {
        $inc: { usageCount: 1 },
        lastUsedAt: new Date()
      },
      { new: true }
    );
    
    if (!template) return res.status(404).json({ message: 'Template not found' });
    res.json(template);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get popular hashtags
exports.getPopularHashtags = async (req, res) => {
  try {
    const hashtags = await PostTemplate.aggregate([
      { $match: { user: req.user._id } },
      { $unwind: '$hashtags' },
      {
        $group: {
          _id: '$hashtags',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);
    
    res.json(hashtags);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 