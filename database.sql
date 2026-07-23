# SafeGo School

Sistema de gestión y seguimiento para el transporte escolar.

## Descripción del Proyecto

SafeGo School es una solución tecnológica diseñada para la administración, monitoreo y control de rutas de transporte escolar. El sistema permite gestionar la información de instituciones educativas, estudiantes, acudientes, conductores, vehículos y recorridos diarios, garantizando la trazabilidad de los abordajes y la notificación de eventos o incidentes.

## Estructura del Repositorio

```text
SafeGo-School/
├── docs/             # Documentación técnica y diagramas del sistema
├── src/              # Código fuente de la aplicación
│   ├── assets/       # Archivos estáticos (estilos, imágenes)
│   ├── config/       # Configuración global y conexión a datos
│   ├── controllers/  # Lógica de negocio
│   ├── models/       # Modelos de datos y consultas SQL
│   ├── routes/       # Definición de rutas y endpoints
│   └── views/        # Interfaces de usuario
├── database.sql      # Script de creación de la base de datos relacional
├── .gitignore        # Reglas de exclusión para Git
└── README.md         # Documentación principal del proyecto
-- Nueva tabla de suscripciones
CREATE TABLE IF NOT EXISTS route_subscriptions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    route_id INT NOT NULL,
    status ENUM('ACTIVE', 'SUSPENDED', 'EXEMPT_PUBLIC_SUBSIDY') DEFAULT 'ACTIVE',
    valid_until DATE NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE CASCADE,
    UNIQUE KEY unique_student_route (student_id, route_id)
);

-- Modificación a la tabla attendance existente
ALTER TABLE attendance 
ADD COLUMN device_id VARCHAR(50) DEFAULT 'BUS_GATEWAY_01',
ADD COLUMN sync_mode ENUM('REALTIME', 'OFFLINE_SYNC') DEFAULT 'REALTIME',
ADD COLUMN scanned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
-- Tabla para suscripciones de rutas
CREATE TABLE IF NOT EXISTS route_subscriptions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    route_id INT NOT NULL,
    status ENUM('ACTIVE', 'SUSPENDED', 'EXEMPT_PUBLIC_SUBSIDY') DEFAULT 'ACTIVE',
    valid_until DATE NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_student_route (student_id, route_id)
);

-- Tabla para registros de asistencia
CREATE TABLE IF NOT EXISTS attendance (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    route_id INT NOT NULL,
    status VARCHAR(50) DEFAULT 'BOARDED',
    scanned_at DATETIME NOT NULL,
    device_id VARCHAR(100) NULL,
    sync_mode VARCHAR(50) DEFAULT 'OFFLINE_SYNC',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);