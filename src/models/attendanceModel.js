const db = require('../config/db');

// Obtener todas las asistencias
const getAllAttendance = async () => {
    const [rows] = await db.query('SELECT * FROM attendance');
    return rows;
};

// Crear un registro de asistencia individual
const createAttendance = async (studentId, routeId, status) => {
    const [result] = await db.query(
        'INSERT INTO attendance (student_id, route_id, status) VALUES (?, ?, ?)',
        [studentId, routeId, status]
    );
    return result;
};

// Insertar marcaje proveniente de sincronización offline
const insertOfflineRecord = async (studentId, routeId, status, scannedAt, deviceId) => {
    const query = `
        INSERT INTO attendance (student_id, route_id, status, scanned_at, device_id, sync_mode)
        VALUES (?, ?, ?, ?, ?, 'OFFLINE_SYNC')
    `;
    const [result] = await db.query(query, [
        studentId, 
        routeId, 
        status || 'BOARDED', 
        scannedAt, 
        deviceId || 'BUS_GATEWAY_01'
    ]);
    return result;
};

// Verificar estado de suscripción del estudiante en la ruta
const checkSubscriptionStatus = async (studentId, routeId) => {
    const query = `
        SELECT status FROM route_subscriptions 
        WHERE student_id = ? AND route_id = ?
    `;
    const [rows] = await db.query(query, [studentId, routeId]);
    return rows[0] || null;
};

module.exports = {
    getAllAttendance,
    createAttendance,
    insertOfflineRecord,
    checkSubscriptionStatus
};