const express = require('express');
const router = express.Router();
const suiteController = require('../controllers/suiteController');

router.get('/', suiteController.getAllSuites);
router.post('/create', suiteController.createSuite);
router.post('/add-function-area', suiteController.addFunctionArea);

module.exports = router;
