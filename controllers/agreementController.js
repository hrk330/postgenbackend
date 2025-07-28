const Agreement = require('../models/Agreement');

exports.getAgreement = async (req, res) => {
  try {
    const agreement = await Agreement.findOne().sort({ createdAt: -1 });
    if (!agreement) return res.status(404).json({ message: 'No agreement found' });
    res.json({ text: agreement.text, version: agreement.version });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 