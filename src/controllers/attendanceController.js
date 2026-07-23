const attendanceModel = require('../models/attendanceModel');

const getAttendance = async (req, res) => {
    try {
        const records = await attendanceModel.getAllAttendance();
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ status: 'ERROR', message: error.message });
    }
};

const recordAttendance = async (req, res) => {
    const { student_id, route_id, status } = req.body;
    try {
        await attendanceModel.createAttendance(student_id, route_id, status);
        res.status(201).json({ status: 'SUCCESS', message: 'Asistencia registrada' });
    } catch (error) {
        res.status(500).json({ status: 'ERROR', message: error.message });
    }
};

const syncOfflineAttendance = async (req, res) => {
    const { device_id, route_id, records } = req.body;

    if (!route_id || !Array.isArray(records) || records.length === 0) {
        return res.status(400).json({ 
            status: 'ERROR', 
            message: 'Datos de sincronización inválidos o lista vacía.' 
        });
    }

    try {
        const processedRecords = [];
        const errors = [];

        for (const record of records) {
            const { student_id, scanned_at, status } = record;

            const subscription = await attendanceModel.checkSubscriptionStatus(student_id, route_id);

            if (subscription && subscription.status === 'SUSPENDED') {
                errors.push({ student_id, reason: 'Suscripción suspendida o en mora.' });
                continue;
            }

            await attendanceModel.insertOfflineRecord(
                student_id, 
                route_id, 
                status, 
                scanned_at, 
                device_id
            );

            processedRecords.push({ student_id, scanned_at });
        }

        return res.status(200).json({
            status: 'SUCCESS',
            message: `Sincronización completada. ${processedRecords.length} registros procesados.`,
            synced_count: processedRecords.length,
            errors
        });

    } catch (error) {
        console.error('Error en sincronización offline:', error);
        return res.status(500).json({ status: 'ERROR', message: 'Error interno del servidor.' });
    }
};

module.exports = {
    getAttendance,
    recordAttendance,
    syncOfflineAttendance
};