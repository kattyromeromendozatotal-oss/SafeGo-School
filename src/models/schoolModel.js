const db = require('../config/db');

const SchoolModel = {
    // Obtener todas las instituciones educativas
    findAll: async () => {
        const [rows] = await db.query('SELECT * FROM instituciones');
        return rows;
    },

    // Buscar una institución por su ID
    findById: async (id) => {
        const [rows] = await db.query('SELECT * FROM instituciones WHERE id_institucion = ?', [id]);
        return rows[0];
    },

    // Registrar una nueva institución
    create: async (schoolData) => {
        const { nombre, direccion, telefono, email } = schoolData;
        const [result] = await db.query(
            'INSERT INTO instituciones (nombre, direccion, telefono, email) VALUES (?, ?, ?, ?)',
            [nombre, direccion, telefono, email]
        );
        return result.insertId;
    }
};

module.exports = SchoolModel;