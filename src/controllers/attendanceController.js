const AttendanceModel = require('../models/attendanceModel');

const getAllAttendance = async (req, res) => {
    try {
        const records = await AttendanceModel.findAll();
        res.status(200).json({
            status: 'success',
            data: records
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener el historial de asistencias',
            details: error.message
        });
    }
};

const getAttendanceByStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        const records = await AttendanceModel.findByStudentId(studentId);

        res.status(200).json({
            status: 'success',
            data: records
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener la asistencia del estudiante',
            details: error.message
        });
    }
};

const registerAttendance = async (req, res) => {
    try {
        const { id_estudiante, id_ruta, id_usuario_registro, tipo_evento, ubicacion_lat_lng } = req.body;

        if (!id_estudiante || !id_ruta || !tipo_evento) {
            return res.status(400).json({
                status: 'fail',
                message: 'Los campos id_estudiante, id_ruta y tipo_evento son obligatorios'
            });
        }

        const attendanceId = await AttendanceModel.create({
            id_estudiante,
            id_ruta,
            id_usuario_registro,
            tipo_evento,
            ubicacion_lat_lng
        });

        res.status(201).json({
            status: 'success',
            message: 'Registro de abordaje almacenado correctamente',
            data: {
                id: attendanceId,
                id_estudiante,
                id_ruta,
                tipo_evento,
                fecha_hora: new Date()
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al registrar el abordaje',
            details: error.message
        });
    }
};

module.exports = {
    getAllAttendance,
    getAttendanceByStudent,
    registerAttendance
};