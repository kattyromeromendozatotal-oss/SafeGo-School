#  SafeGo School

> **Smart School Mobility & Traceability Platform**
> Una arquitectura integral orientada a la seguridad, control operativo en tiempo real y comunicación transparente en el transporte escolar.

---

##  Visión del Proyecto

**SafeGo School** nace para resolver los desafíos de seguridad y logística en el transporte de estudiantes. La plataforma transforma la gestión del transporte escolar tradicional en un ecosistema digital inteligente, conectando en tiempo real a instituciones educativas, empresas de transporte, conductores y acudientes.

A través de un modelo de datos relacional altamente optimizado y centrado en la trazabilidad, SafeGo School garantiza el monitoreo preciso de cada recorrido, la verificación de seguridad en los puntos de abordaje/desembarque y la respuesta inmediata ante imprevistos en ruta.

---

##  Arquitectura y Capacidades del Sistema

###  1. Trazabilidad & Control de Abordaje
* **Registro de Eventos Críticos:** Captura detallada de timestamp (`hora_subida`, `hora_bajada`) y verificación del estado del estudiante por trayecto.
* **Alertas y Notificaciones:** Motor de notificaciones dinámicas vinculado a cada evento de abordaje para informar instantáneamente a los acudientes autorizados.
* **Control de Seguridad y Custodia:** Gestión de acudientes principales y terceros autorizados (`autorizado_recoger`) para garantizar la entrega segura de los estudiantes.

###  2. Gestión Operativa de Flota y Recorridos
* **Despacho y Control de Recorridos:** Asignación inteligente de rutas (origen/destino), unidades de transporte (`placa`, `marca`, `capacidad`) y conductores validados con estado de licencia vigente.
* **Telemetría y Estado de Ruta:** Monitoreo activo de recorridos con registro de estado (en curso, finalizado, retrasado) e histórico de tiempos de traslado.

###  3. Gestión de Incidencias e Imprevistos
* **Log de Incidentes en Tiempo Real:** Canal directo para que el conductor o la plataforma registren eventualidades operativas o mecánicas en pleno trayecto (`INCIDENTE`), asegurando tiempo de respuesta inmediato y transparencia informativa.

###  4. Gestión Multiescuela y Perfiles de Usuario
* **Escalabilidad Multi-Institución:** Control centralizado para colegios con vinculación directa de estudiantes, grados y rutas asignadas.
* **Estructura Relacional Multi-Rol:** Módulos independientes diseñados específicamente para Administradores de Flota, Instituciones, Conductores y Padres/Acudientes.

---

##  Stack Tecnológico & Arquitectura
* **Modelado de Datos:** PostgreSQL / MySQL (Relacional optimizado con integridad referencial)
* **Arquitectura:** Orientada a microservicios / API Restful
* **Control de Versiones:** Git & GitHub

---

## 🚀 Estado del Desarrollo
El proyecto se encuentra en fase activa de diseño arquitectónico, modelado de base de datos y desarrollo de endpoints/módulos core.
