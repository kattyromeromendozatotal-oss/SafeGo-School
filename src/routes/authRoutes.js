const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Registro de usuario
router.post('/register', async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({
      status: 'fail',
      message: 'Nombre, email y contraseña son obligatorios'
    });
  }

  try {
    const [existing] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'El correo electrónico ya está registrado'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userRole = rol || 'acudiente';

    const [result] = await db.query(
      'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)',
      [nombre, email, hashedPassword, userRole]
    );

    res.status(201).json({
      status: 'success',
      message: 'Usuario registrado exitosamente',
      data: { id: result.insertId, nombre, email, rol: userRole }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: 'fail',
      message: 'Email y contraseña son obligatorios'
    });
  }

  try {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({
        status: 'fail',
        message: 'Credenciales inválidas'
      });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        status: 'fail',
        message: 'Credenciales inválidas'
      });
    }

    const token = jwt.sign(
      { id: user.id_usuario || user.id, email: user.email, rol: user.rol },
      process.env.JWT_SECRET || 'SecretKey',
      { expiresIn: '8h' }
    );

    res.status(200).json({
      status: 'success',
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        id: user.id_usuario || user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol
      }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

module.exports = router;