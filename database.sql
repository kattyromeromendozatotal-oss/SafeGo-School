-- =====================================================
-- PROYECTO: SafeGo School
-- DESCRIPCIÓN: Estructura de la Base de Datos Relacional
-- =====================================================

-- 1. TABLA: INSTITUCIÓN EDUCATIVA
CREATE TABLE institucion_educativa (
    id_colegio INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) NOT NULL
);

-- 2. TABLA: ESTUDIANTE
CREATE TABLE estudiante (
    id_estudiante INT AUTO_INCREMENT PRIMARY KEY,
    id_colegio INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    grado VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_colegio) REFERENCES institucion_educativa(id_colegio)
);

-- 3. TABLA: PADRE / ACUDIENTE
CREATE TABLE padre (
    id_padre INT AUTO_INCREMENT PRIMARY KEY,
    documento VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    direccion VARCHAR(255) NOT NULL
);

-- 4. TABLA INTERMEDIA: PADRE - ESTUDIANTE (Relación N:M)
CREATE TABLE padre_estudiante (
    id_padre_estudiante INT AUTO_INCREMENT PRIMARY KEY,
    id_padre INT NOT NULL,
    id_estudiante INT NOT NULL,
    parentesco VARCHAR(50) NOT NULL,
    contacto_principal BOOLEAN DEFAULT FALSE,
    autorizado_recoger BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_padre) REFERENCES padre(id_padre),
    FOREIGN KEY (id_estudiante) REFERENCES estudiante(id_estudiante)
);

-- 5. TABLA: CONDUCTOR
CREATE TABLE conductor (
    id_conductor INT AUTO_INCREMENT PRIMARY KEY,
    documento VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    licencia VARCHAR(50) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    estado VARCHAR(20) DEFAULT 'Activo'
);

-- 6. TABLA: VEHÍCULO
CREATE TABLE vehiculo (
    id_vehiculo INT AUTO_INCREMENT PRIMARY KEY,
    placa VARCHAR(10) UNIQUE NOT NULL,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    capacidad INT NOT NULL,
    estado VARCHAR(20) DEFAULT 'Operativo'
);

-- 7. TABLA: RUTA
CREATE TABLE ruta (
    id_ruta INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    origen VARCHAR(255) NOT NULL,
    destino VARCHAR(255) NOT NULL
);

-- 8. TABLA: RECORRIDO (Operación diaria)
CREATE TABLE recorrido (
    id_recorrido INT AUTO_INCREMENT PRIMARY KEY,
    id_ruta INT NOT NULL,
    id_conductor INT NOT NULL,
    id_vehiculo INT NOT NULL,
    fecha DATE NOT NULL,
    hora_inicio TIME,
    hora_fin TIME,
    estado VARCHAR(20) DEFAULT 'Programado',
    FOREIGN KEY (id_ruta) REFERENCES ruta(id_ruta),
    FOREIGN KEY (id_conductor) REFERENCES conductor(id_conductor),
    FOREIGN KEY (id_vehiculo) REFERENCES vehiculo(id_vehiculo)
);

-- 9. TABLA: ABORDAJE (Control de subida/bajada del estudiante)
CREATE TABLE abordaje (
    id_abordaje INT AUTO_INCREMENT PRIMARY KEY,
    id_recorrido INT NOT NULL,
    id_estudiante INT NOT NULL,
    fecha DATE NOT NULL,
    hora_subida TIME,
    hora_bajada TIME,
    estado VARCHAR(20) NOT NULL, -- Ejemplo: 'En Ruta', 'Entregado', 'Ausente'
    FOREIGN KEY (id_recorrido) REFERENCES recorrido(id_recorrido),
    FOREIGN KEY (id_estudiante) REFERENCES estudiante(id_estudiante)
);

-- 10. TABLA: NOTIFICACIÓN
CREATE TABLE notificacion (
    id_notificacion INT AUTO_INCREMENT PRIMARY KEY,
    id_abordaje INT NOT NULL,
    mensaje TEXT NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    tipo VARCHAR(50) NOT NULL, -- Ejemplo: 'Abordaje', 'Desembarque'
    FOREIGN KEY (id_abordaje) REFERENCES abordaje(id_abordaje)
);

-- 11. TABLA: INCIDENTE
CREATE TABLE incidente (
    id_incidente INT AUTO_INCREMENT PRIMARY KEY,
    id_recorrido INT NOT NULL,
    descripcion TEXT NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    estado VARCHAR(20) DEFAULT 'Pendiente',
    FOREIGN KEY (id_recorrido) REFERENCES recorrido(id_recorrido)
);