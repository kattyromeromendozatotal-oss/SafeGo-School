const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

router.get('/', attendanceController.getAttendance);
router.post('/', attendanceController.recordAttendance);
router.post('/sync', attendanceController.syncOfflineAttendance);

module.exports = router;