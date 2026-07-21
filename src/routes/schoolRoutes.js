const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');

// Endpoints para instituciones (/api/schools)
router.get('/', schoolController.getAllSchools);
router.get('/:id', schoolController.getSchoolById);
router.post('/', schoolController.createSchool);

module.exports = router;