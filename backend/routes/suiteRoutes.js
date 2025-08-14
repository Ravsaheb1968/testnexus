const express = require('express');
const router = express.Router();
const suiteController = require('../controllers/suiteController');

// Keep the base GET at "/" so the final URL is /api/suites
router.get('/', suiteController.getAllSuites);

// Create a new suite: POST /api/suites/create
router.post('/create', suiteController.createSuite);

// Add function area: POST /api/suites/add-function-area
router.post('/add-function-area', suiteController.addFunctionArea);

module.exports = router;
