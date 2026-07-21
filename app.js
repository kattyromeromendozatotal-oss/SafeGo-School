const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de comprobación de estado de la API
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'SafeGo School API service is operational'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});