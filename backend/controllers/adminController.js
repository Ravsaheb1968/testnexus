// controllers/adminController.js
const User = require('../models/User');
const Suite = require('../models/Suite');

/**
 * GET /api/admin/users
 * Optional filters:
 *   ?onlyActive=true  -> return only isActive users
 *   ?onlyInactive=true -> return only !isActive users
 *   ?role=admin|user
 */
// controllers/adminController.js
exports.getAllUsers = async (req, res) => {
  try {
    const { onlyActive, onlyInactive, list } = req.query;

    let filter = {};

    if (onlyActive === 'true') {
      // ✅ Deactivate page → only active users
      filter.isActive = true;
    }

    if (onlyInactive === 'true') {
      // ✅ Activate page simple filter → only inactive users
      filter.isActive = false;
    }

    if (list === 'activate') {
      // ✅ Activate page (more precise) → inactive and no machine assigned
      filter = {
        isActive: false,
        $or: [
          { machineName: { $exists: false } },
          { machineName: '' }
        ]
      };
    }

    if (list === 'modify') {
      // ✅ Modify page → all active users
      filter.isActive = true;
    }

    const projection = 'email username role isActive machineName';
    const users = await User.find(filter, projection).sort({ email: 1 });

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      msg: 'Failed to fetch users',
      error: err.message
    });
  }
};


/**
 * GET /api/admin/suites
 * Returns [{_id, name}]
 */
exports.getAllSuites = async (_req, res) => {
  try {
    const suites = await Suite.find({}, 'name').lean();
    res.status(200).json(suites);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch suites', error: err.message });
  }
};

/**
 * POST /api/admin/activate-user
 * body: { email, username, machineName }
 * - Sets isActive=true, sets machineName, keeps/normalizes role (default 'user').
 */
// Backend: controllers/adminController.js
exports.activateUser = async (req, res) => {
  try {
    const { email, username, machineName, suite } = req.body;

    const user = await User.findOneAndUpdate(
      { email },
      {
        username,
        machineName,
        assignedSuite: suite,
        isActive: true  // ✅ mark user as active
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json({ msg: 'User activated successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to activate user' });
  }
};


/**
 * POST /api/admin/deactivate-user
 * body: { email, hard }  // hard=true => PERMANENT DELETE
 * - If hard=true: delete user entirely
 * - Else: soft deactivate (isActive=false, remove machineName)
 */
exports.deactivateUser = async (req, res) => {
  try {
    const { email, hard } = req.body;
    if (!email) return res.status(400).json({ msg: 'email is required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    if (hard === true) {
      await User.deleteOne({ _id: user._id });
      return res.status(200).json({ msg: 'User permanently deleted' });
    }

    user.isActive = false;
    user.machineName = '';
    await user.save();
    res.status(200).json({ msg: 'User deactivated successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to deactivate user', error: err.message });
  }
};

/**
 * POST /api/admin/modify-user-role
 * body: { email, role, suite } // role: 'user'|'admin'
 * - If role='user': convert admin -> user, optionally set assignedSuite
 * - If role='admin': convert user -> admin, clear assignedSuite (admin has all suites)
 * Leaves isActive unchanged.
 */
exports.modifyUserRole = async (req, res) => {
  try {
    let { email, role, suite } = req.body;
    if (!email || !role) return res.status(400).json({ msg: 'email and role are required' });

    role = role.toLowerCase();
    if (!['admin', 'user'].includes(role)) {
      return res.status(400).json({ msg: 'role must be admin or user' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.role = role;

    if (role === 'user') {
      // Assign suite if provided (optional)
      if (suite) user.assignedSuite = suite;
    } else {
      // Admin has access to all; clear any specific assignment
      user.assignedSuite = undefined;
    }

    await user.save();
    res.status(200).json({
      msg: 'User role updated', user: {
        id: user._id, email: user.email, username: user.username, role: user.role, isActive: user.isActive, assignedSuite: user.assignedSuite
      }
    });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to modify user', error: err.message });
  }
};
