const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// Endpoints para asistencias y abordajes (/api/attendance)
router.get('/', attendanceController.getAllAttendance);
router.get('/student/:studentId', attendanceController.getAttendanceByStudent);
router.post('/', attendanceController.registerAttendance);

module.exports = router;