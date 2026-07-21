const db = require('../config/db');

const RouteModel = {
    // Obtener todas las rutas registradas con la información de su vehículo y conductor
    findAll: async () => {
        const query = `
            SELECT r.id_ruta, r.nombre_ruta, r.origen, r.destino, r.horario,
                   v.placa, v.modelo, u.nombre AS conductor
            FROM rutas r
            LEFT JOIN vehiculos v ON r.id_vehiculo = v.id_vehiculo
            LEFT JOIN usuarios u ON r.id_conductor = u.id_usuario
        `;
        const [rows] = await db.query(query);
        return rows;
    },

    // Buscar una ruta por ID
    findById: async (id) => {
        const query = `
            SELECT r.id_ruta, r.nombre_ruta, r.origen, r.destino, r.horario,
                   r.id_vehiculo, r.id_conductor,
                   v.placa, v.modelo, u.nombre AS conductor
            FROM rutas r
            LEFT JOIN vehiculos v ON r.id_vehiculo = v.id_vehiculo
            LEFT JOIN usuarios u ON r.id_conductor = u.id_usuario
            WHERE r.id_ruta = ?
        `;
        const [rows] = await db.query(query, [id]);
        return rows[0];
    },

    // Crear una nueva ruta de transporte
    create: async (routeData) => {
        const { nombre_ruta, origen, destino, horario, id_vehiculo, id_conductor } = routeData;
        const [result] = await db.query(
            'INSERT INTO rutas (nombre_ruta, origen, destino, horario, id_vehiculo, id_conductor) VALUES (?, ?, ?, ?, ?, ?)',
            [nombre_ruta, origen, destino, horario, id_vehiculo, id_conductor]
        );
        return result.insertId;
    }
};

module.exports = RouteModel;