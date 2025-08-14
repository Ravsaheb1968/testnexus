// routes/admin.js
const router = require('express').Router();
const admin = require('../controllers/adminController');

router.get('/users', admin.getAllUsers);
router.get('/suites', admin.getAllSuites);

router.post('/activate-user', admin.activateUser);
router.post('/deactivate-user', admin.deactivateUser);
router.post('/modify-user-role', admin.modifyUserRole);

module.exports = router;
