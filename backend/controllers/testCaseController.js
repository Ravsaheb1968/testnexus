// controllers/testCaseController.js
const TestCase = require('../models/TestCase');
const Suite = require('../models/Suite');

// Add test cases under suite + function area
exports.addTestCases = async (req, res) => {
  try {
    const { automationSuite, functionArea, testCases } = req.body;

    if (!automationSuite || !functionArea || !testCases?.length) {
      return res.status(400).json({ msg: 'Suite, Function Area and TestCases required' });
    }

    // ensure suite & function area exist
    const suite = await Suite.findOne({ name: automationSuite });
    if (!suite) return res.status(404).json({ msg: 'Suite not found' });
    if (!suite.functionAreas.includes(functionArea)) {
      return res.status(404).json({ msg: 'Function area not found in this suite' });
    }

    const newTCs = await Promise.all(
      testCases.map(tcName =>
        new TestCase({ automationSuite, functionArea, name: tcName }).save()
      )
    );

    res.status(201).json({ msg: 'Test cases added successfully', testCases: newTCs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Fetch test cases by suite + functionArea
exports.getTestCasesByFunctionArea = async (req, res) => {
  try {
    const { suiteId, functionAreaName } = req.params;

    const suite = await Suite.findById(suiteId);
    if (!suite) return res.status(404).json({ msg: 'Suite not found' });

    const testCases = await TestCase.find({
      automationSuite: suite.name,
      functionArea: functionAreaName
    });

    res.json(testCases);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to fetch test cases' });
  }
};
// controllers/testCaseController.js
exports.updateStatuses = async (req, res) => {
  try {
    const { testCases } = req.body;

    await Promise.all(
      testCases.map(tc =>
        TestCase.findByIdAndUpdate(tc._id, { execution: tc.execution })
      )
    );

    res.json({ msg: 'Statuses updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to update statuses' });
  }
};
