const StudentModel = require('../models/studentModel');

const getAllStudents = async (req, res) => {
    try {
        const students = await StudentModel.findAll();
        res.status(200).json({
            status: 'success',
            data: students
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener los estudiantes',
            details: error.message
        });
    }
};

const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await StudentModel.findById(id);

        if (!student) {
            return res.status(404).json({
                status: 'fail',
                message: 'Estudiante no encontrado'
            });
        }

        res.status(200).json({
            status: 'success',
            data: student
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener la información del estudiante',
            details: error.message
        });
    }
};

const createStudent = async (req, res) => {
    try {
        const { nombre, grado, codigo_estudiante, id_institucion, id_acudiente } = req.body;

        if (!nombre || !id_institucion || !id_acudiente) {
            return res.status(400).json({
                status: 'fail',
                message: 'Los campos nombre, id_institucion e id_acudiente son obligatorios'
            });
        }

        const studentId = await StudentModel.create({
            nombre,
            grado,
            codigo_estudiante,
            id_institucion,
            id_acudiente
        });

        res.status(201).json({
            status: 'success',
            message: 'Estudiante registrado correctamente',
            data: { id: studentId, nombre, grado, codigo_estudiante, id_institucion, id_acudiente }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al registrar el estudiante',
            details: error.message
        });
    }
};

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent
};