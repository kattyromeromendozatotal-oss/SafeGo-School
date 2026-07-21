const db = require('../config/db');

const UserModel = {
    // Buscar usuario por correo electrónico (para login)
    findByEmail: async (email) => {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        return rows[0];
    },

    // Obtener todos los usuarios (para panel administrativo)
    findAll: async () => {
        const [rows] = await db.query('SELECT id_usuario, nombre, email, rol, estado, fecha_creacion FROM usuarios');
        return rows;
    },

    // Crear un nuevo usuario
    create: async (userData) => {
        const { nombre, email, password, rol } = userData;
        const [result] = await db.query(
            'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)',
            [nombre, email, password, rol]
        );
        return result.insertId;
    }
};

module.exports = UserModel;