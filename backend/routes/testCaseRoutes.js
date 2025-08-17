// routes/testCaseRoutes.js
const express = require('express');
const router = express.Router();
const testCaseController = require('../controllers/testCaseController');

// POST → add test cases
router.post('/add', testCaseController.addTestCases);

// GET → fetch test cases by suite + FA
router.get('/suites/:suiteId/function-areas/:functionAreaName/testcases', testCaseController.getTestCasesByFunctionArea);
// routes/testCaseRoutes.js
router.post('/update-status', testCaseController.updateStatuses);

module.exports = router;
