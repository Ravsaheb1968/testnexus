const Suite = require('../models/Suite');

exports.getAllSuites = async (req, res) => {
  try {
    const suites = await Suite.find({});
    res.status(200).json(suites);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch suites' });
  }
};


exports.createSuite = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) return res.status(400).json({ msg: 'Suite name is required' });

    const existing = await Suite.findOne({ name });
    if (existing) return res.status(400).json({ msg: 'Suite already exists' });

    const newSuite = new Suite({ name, functionAreas: [] });
    await newSuite.save();

    res.status(201).json({ msg: 'Suite created successfully', suite: newSuite });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.addFunctionArea = async (req, res) => {
  try {
    const { suiteName, functionArea } = req.body;

    if (!suiteName || !functionArea) {
      return res.status(400).json({ msg: 'Suite name and function area are required' });
    }

    const suite = await Suite.findOne({ name: suiteName });
    if (!suite) return res.status(404).json({ msg: 'Suite not found' });

    if (suite.functionAreas.includes(functionArea)) {
      return res.status(400).json({ msg: 'Function area already exists in this suite' });
    }

    suite.functionAreas.push(functionArea);
    await suite.save();

    res.status(200).json({ msg: 'Function area added successfully', suite });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
exports.removeFunctionArea = async (req, res) => {
  try {
    const { suiteName, functionArea } = req.body;

    if (!suiteName || !functionArea) {
      return res.status(400).json({ msg: 'Suite name and function area are required' });
    }

    const suite = await Suite.findOne({ name: suiteName });
    if (!suite) return res.status(404).json({ msg: 'Suite not found' });

    suite.functionAreas = suite.functionAreas.filter(fa => fa !== functionArea);
    await suite.save();

    res.status(200).json({ msg: 'Function area removed successfully', suite });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
