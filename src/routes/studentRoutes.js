const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Endpoints para estudiantes (/api/students)
router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudentById);
router.post('/', studentController.createStudent);

module.exports = router;