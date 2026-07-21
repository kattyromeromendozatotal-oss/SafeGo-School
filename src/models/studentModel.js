const db = require('../config/db');

const StudentModel = {
    // Obtener todos los estudiantes con la información de su institución y acudiente
    findAll: async () => {
        const query = `
            SELECT e.id_estudiante, e.nombre, e.grado, e.codigo_estudiante,
                   i.nombre AS institucion, u.nombre AS acudiente
            FROM estudiantes e
            LEFT JOIN instituciones i ON e.id_institucion = i.id_institucion
            LEFT JOIN usuarios u ON e.id_acudiente = u.id_usuario
        `;
        const [rows] = await db.query(query);
        return rows;
    },

    // Buscar estudiante por ID
    findById: async (id) => {
        const query = `
            SELECT e.id_estudiante, e.nombre, e.grado, e.codigo_estudiante,
                   e.id_institucion, e.id_acudiente,
                   i.nombre AS institucion, u.nombre AS acudiente
            FROM estudiantes e
            LEFT JOIN instituciones i ON e.id_institucion = i.id_institucion
            LEFT JOIN usuarios u ON e.id_acudiente = u.id_usuario
            WHERE e.id_estudiante = ?
        `;
        const [rows] = await db.query(query, [id]);
        return rows[0];
    },

    // Registrar un nuevo estudiante
    create: async (studentData) => {
        const { nombre, grado, codigo_estudiante, id_institucion, id_acudiente } = studentData;
        const [result] = await db.query(
            'INSERT INTO estudiantes (nombre, grado, codigo_estudiante, id_institucion, id_acudiente) VALUES (?, ?, ?, ?, ?)',
            [nombre, grado, codigo_estudiante, id_institucion, id_acudiente]
        );
        return result.insertId;
    }
};

module.exports = StudentModel;