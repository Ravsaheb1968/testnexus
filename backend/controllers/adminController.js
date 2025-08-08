const User = require('../models/User');
const Suite = require('../models/Suite'); // Create this if not done yet

// Get all registered users (unfiltered)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'email username'); // Only return necessary fields
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch users' });
  }
};

// Get all suites
exports.getAllSuites = async (req, res) => {
  try {
    const suites = await Suite.find({}, 'name'); // Assuming suite schema has a "name" field
    res.status(200).json(suites);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch suites' });
  }
};

// Activate user with machine & suite
exports.activateUser = async (req, res) => {
  try {
    const { email, username, machineName, suite } = req.body;

    const user = await User.findOne({ email, username });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.machineName = machineName;
    user.assignedSuite = suite;
    user.isActive = true;

    await user.save();

    res.status(200).json({ msg: 'User activated successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to activate user' });
  }
};

// Deactivate (or optionally delete) user
exports.deactivateUser = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Deactivate (soft delete)
    user.isActive = false;
    await user.save();

    // OR — Permanently delete user
    // await User.deleteOne({ email });

    res.status(200).json({ msg: 'User deactivated successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to deactivate user' });
  }
};