const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const schoolRoutes = require('./routes/schoolRoutes');
const studentRoutes = require('./routes/studentRoutes');
const routeRoutes = require('./routes/routeRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Definición de Rutas de la API REST
app.use('/api/users', userRoutes);
app.use('/api/schools', schoolRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/attendance', attendanceRoutes);

// Ruta de comprobación de estado de la API
app.get('/api/health', async (req, res) => {
    try {
        await db.query('SELECT 1 + 1 AS result');
        res.status(200).json({
            status: 'OK',
            message: 'SafeGo School API service is operational',
            database: 'Connected successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'ERROR',
            message: 'Database connection failed',
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.use('/api/auth', require('./routes/authRoutes'));