exports.getProfile = async (req, res) => {
  res.json({
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    preferences: req.user.preferences,
    acceptedAgreement: req.user.acceptedAgreement,
  });
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, preferences } = req.body;
    if (name) req.user.name = name;
    if (preferences) req.user.preferences = preferences;
    await req.user.save();
    res.json({ message: 'Profile updated', user: req.user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.acceptAgreement = async (req, res) => {
  try {
    req.user.acceptedAgreement = true;
    await req.user.save();
    res.json({ message: 'Agreement accepted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 