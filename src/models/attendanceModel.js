const db = require('../config/db');

const AttendanceModel = {
    // Obtener todo el historial de abordajes y asistencias
    findAll: async () => {
        const query = `
            SELECT a.id_asistencia, a.tipo_evento, a.fecha_hora, a.ubicacion_lat_lng,
                   e.nombre AS estudiante, r.nombre_ruta, u.nombre AS registrado_por
            FROM asistencias a
            LEFT JOIN estudiantes e ON a.id_estudiante = e.id_estudiante
            LEFT JOIN rutas r ON a.id_ruta = r.id_ruta
            LEFT JOIN usuarios u ON a.id_usuario_registro = u.id_usuario
            ORDER BY a.fecha_hora DESC
        `;
        const [rows] = await db.query(query);
        return rows;
    },

    // Obtener el historial de abordajes de un estudiante específico
    findByStudentId: async (studentId) => {
        const query = `
            SELECT a.id_asistencia, a.tipo_evento, a.fecha_hora, a.ubicacion_lat_lng,
                   r.nombre_ruta
            FROM asistencias a
            LEFT JOIN rutas r ON a.id_ruta = r.id_ruta
            WHERE a.id_estudiante = ?
            ORDER BY a.fecha_hora DESC
        `;
        const [rows] = await db.query(query, [studentId]);
        return rows;
    },

    // Registrar un nuevo evento de abordaje/descenso
    create: async (attendanceData) => {
        const { id_estudiante, id_ruta, id_usuario_registro, tipo_evento, ubicacion_lat_lng } = attendanceData;
        const [result] = await db.query(
            'INSERT INTO asistencias (id_estudiante, id_ruta, id_usuario_registro, tipo_evento, ubicacion_lat_lng) VALUES (?, ?, ?, ?, ?)',
            [id_estudiante, id_ruta, id_usuario_registro, tipo_evento, ubicacion_lat_lng]
        );
        return result.insertId;
    }
};

module.exports = AttendanceModel;