exports.getPreferences = async (req, res) => {
  res.json(req.user.preferences || {});
};

exports.updatePreferences = async (req, res) => {
  try {
    req.user.preferences = req.body;
    req.user.onboardingStep = 'completed';
    req.user.hasCompletedOnboarding = true;
    await req.user.save();
    res.json({ message: 'Preferences updated', preferences: req.user.preferences });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 