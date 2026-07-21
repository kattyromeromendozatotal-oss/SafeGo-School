const RouteModel = require('../models/routeModel');

const getAllRoutes = async (req, res) => {
    try {
        const routes = await RouteModel.findAll();
        res.status(200).json({
            status: 'success',
            data: routes
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener las rutas de transporte',
            details: error.message
        });
    }
};

const getRouteById = async (req, res) => {
    try {
        const { id } = req.params;
        const route = await RouteModel.findById(id);

        if (!route) {
            return res.status(404).json({
                status: 'fail',
                message: 'Ruta no encontrada'
            });
        }

        res.status(200).json({
            status: 'success',
            data: route
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener la información de la ruta',
            details: error.message
        });
    }
};

const createRoute = async (req, res) => {
    try {
        const { nombre_ruta, origen, destino, horario, id_vehiculo, id_conductor } = req.body;

        if (!nombre_ruta) {
            return res.status(400).json({
                status: 'fail',
                message: 'El campo nombre_ruta es obligatorio'
            });
        }

        const routeId = await RouteModel.create({
            nombre_ruta,
            origen,
            destino,
            horario,
            id_vehiculo,
            id_conductor
        });

        res.status(201).json({
            status: 'success',
            message: 'Ruta registrada correctamente',
            data: { id: routeId, nombre_ruta, origen, destino, horario, id_vehiculo, id_conductor }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al registrar la ruta',
            details: error.message
        });
    }
};

module.exports = {
    getAllRoutes,
    getRouteById,
    createRoute
};