const express = require('express');
const router = express.Router();
const routeController = require('../controllers/routeController');

// Endpoints para rutas (/api/routes)
router.get('/', routeController.getAllRoutes);
router.get('/:id', routeController.getRouteById);
router.post('/', routeController.createRoute);

module.exports = router;