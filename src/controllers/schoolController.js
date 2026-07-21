const SchoolModel = require('../models/schoolModel');

const getAllSchools = async (req, res) => {
    try {
        const schools = await SchoolModel.findAll();
        res.status(200).json({
            status: 'success',
            data: schools
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener las instituciones educativas',
            details: error.message
        });
    }
};

const getSchoolById = async (req, res) => {
    try {
        const { id } = req.params;
        const school = await SchoolModel.findById(id);

        if (!school) {
            return res.status(404).json({
                status: 'fail',
                message: 'Institución educativa no encontrada'
            });
        }

        res.status(200).json({
            status: 'success',
            data: school
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener la institución',
            details: error.message
        });
    }
};

const createSchool = async (req, res) => {
    try {
        const { nombre, direccion, telefono, email } = req.body;

        if (!nombre) {
            return res.status(400).json({
                status: 'fail',
                message: 'El campo nombre es obligatorio'
            });
        }

        const schoolId = await SchoolModel.create({ nombre, direccion, telefono, email });

        res.status(201).json({
            status: 'success',
            message: 'Institución educativa registrada correctamente',
            data: { id: schoolId, nombre, direccion, telefono, email }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al registrar la institución',
            details: error.message
        });
    }
};

module.exports = {
    getAllSchools,
    getSchoolById,
    createSchool
};