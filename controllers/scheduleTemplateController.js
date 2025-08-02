const ScheduleTemplate = require('../models/ScheduleTemplate');

// Get all schedule templates for user
exports.getScheduleTemplates = async (req, res) => {
  try {
    const { frequency, isActive } = req.query;
    
    let query = { user: req.user._id };
    if (frequency) query.frequency = frequency;
    if (isActive !== undefined) query.isActive = isActive;
    
    const templates = await ScheduleTemplate.find(query)
      .sort({ usageCount: -1, lastUsedAt: -1 })
      .populate('user', 'name');
    
    res.json(templates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new schedule template
exports.createScheduleTemplate = async (req, res) => {
  try {
    const { 
      name, 
      frequency, 
      timeSlots, 
      daysOfWeek, 
      daysOfMonth, 
      selectedCategories,
      maxPostsPerDay 
    } = req.body;
    
    const template = new ScheduleTemplate({
      user: req.user._id,
      name,
      frequency,
      timeSlots: timeSlots || [],
      daysOfWeek: daysOfWeek || [],
      daysOfMonth: daysOfMonth || [],
      selectedCategories: selectedCategories || [],
      maxPostsPerDay: maxPostsPerDay || 5
    });
    
    await template.save();
    res.status(201).json(template);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update schedule template
exports.updateScheduleTemplate = async (req, res) => {
  try {
    const { 
      name, 
      frequency, 
      timeSlots, 
      daysOfWeek, 
      daysOfMonth, 
      selectedCategories,
      maxPostsPerDay,
      isActive 
    } = req.body;
    
    const template = await ScheduleTemplate.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      {
        name,
        frequency,
        timeSlots,
        daysOfWeek,
        daysOfMonth,
        selectedCategories,
        maxPostsPerDay,
        isActive
      },
      { new: true }
    );
    
    if (!template) return res.status(404).json({ message: 'Schedule template not found' });
    res.json(template);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete schedule template
exports.deleteScheduleTemplate = async (req, res) => {
  try {
    const template = await ScheduleTemplate.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user._id 
    });
    
    if (!template) return res.status(404).json({ message: 'Schedule template not found' });
    res.json({ message: 'Schedule template deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Use schedule template (increment usage count)
exports.useScheduleTemplate = async (req, res) => {
  try {
    const template = await ScheduleTemplate.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      {
        $inc: { usageCount: 1 },
        lastUsedAt: new Date()
      },
      { new: true }
    );
    
    if (!template) return res.status(404).json({ message: 'Schedule template not found' });
    res.json(template);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get smart scheduling suggestions
exports.getSmartSchedulingSuggestions = async (req, res) => {
  try {
    // This would typically integrate with analytics to suggest optimal times
    // For now, we'll provide some common best practices
    const suggestions = {
      food: {
        bestTimes: ['08:00', '12:00', '18:00', '20:00'],
        bestDays: [1, 2, 3, 4, 5], // Monday to Friday
        frequency: 'daily'
      },
      lifestyle: {
        bestTimes: ['09:00', '17:00', '19:00'],
        bestDays: [1, 3, 5], // Monday, Wednesday, Friday
        frequency: 'weekly'
      },
      tech: {
        bestTimes: ['10:00', '14:00', '16:00'],
        bestDays: [2, 4, 6], // Tuesday, Thursday, Saturday
        frequency: 'weekly'
      },
      business: {
        bestTimes: ['08:00', '12:00', '17:00'],
        bestDays: [1, 2, 3, 4, 5], // Monday to Friday
        frequency: 'daily'
      },
      entertainment: {
        bestTimes: ['19:00', '20:00', '21:00'],
        bestDays: [5, 6, 0], // Friday, Saturday, Sunday
        frequency: 'weekly'
      }
    };
    
    res.json(suggestions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 