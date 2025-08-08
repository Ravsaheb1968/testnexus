const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Get all registered users
router.get('/users', adminController.getAllUsers);

// Get all suites
router.get('/suites', adminController.getAllSuites);

// Activate a user
router.post('/activate-user', adminController.activateUser);

// routes/adminRoutes.js
router.post('/deactivate-user', adminController.deactivateUser);


module.exports = router;
