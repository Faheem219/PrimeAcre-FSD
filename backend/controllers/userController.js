// controllers/userController.js
const User = require('../models/user');

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('properties')
      .populate('interestedProperties');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete user account
exports.deleteUserAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    req.logout(() => {
      res.status(200).json({ message: 'User account deleted' });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};