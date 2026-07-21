const UserModel = require('../models/userModel');

const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.findAll();
        res.status(200).json({
            status: 'success',
            data: users
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener los usuarios',
            details: error.message
        });
    }
};

const createUser = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Los campos nombre, email y password son obligatorios'
            });
        }

        const userId = await UserModel.create({ nombre, email, password, rol: rol || 'acudiente' });

        res.status(201).json({
            status: 'success',
            message: 'Usuario registrado correctamente',
            data: { id: userId, nombre, email, rol }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al crear el usuario',
            details: error.message
        });
    }
};

module.exports = {
    getAllUsers,
    createUser
};