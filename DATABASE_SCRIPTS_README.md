# Scripts de Base de Datos

Este directorio contiene scripts mejorados para manejar la base de datos de manera más organizada y eficiente.

## 📁 Estructura de Scripts

```
scripts/
├── setup-database.js    # Crear tablas y estructura
├── seed-data.js         # Insertar datos de prueba
├── reset-database.js    # Eliminar todo y empezar de nuevo
├── check-database.js    # Verificar estado de la BD
└── clear-data.js        # Limpiar solo datos (mantener estructura)
```

## 🚀 Scripts Disponibles

### 1. `npm run setup-db`

**Propósito**: Crear las tablas y estructura de la base de datos

- Lee el archivo `database.sql`
- Ejecuta los comandos CREATE TABLE
- Maneja errores si las tablas ya existen
- Verifica que las tablas se crearon correctamente

```bash
npm run setup-db
```

### 2. `npm run seed-data`

**Propósito**: Insertar datos de prueba desde `models.json`

- Verifica si ya existen datos
- Limpia datos existentes si es necesario
- Inserta marcas únicas
- Inserta modelos con sus precios
- Muestra resumen de datos insertados

```bash
npm run seed-data
```

### 3. `npm run init-db`

**Propósito**: Configuración completa de la base de datos

- Ejecuta `setup-db` y `seed-data` en secuencia
- Ideal para primera configuración

```bash
npm run init-db
```

### 4. `npm run reset-db`

**Propósito**: Eliminar completamente la base de datos

- Elimina todas las tablas
- Elimina secuencias
- Útil para empezar desde cero

```bash
npm run reset-db
```

### 5. `npm run clear-data`

**Propósito**: Limpiar solo los datos, mantener estructura

- Mantiene las tablas intactas
- Limpia todos los registros
- Reinicia las secuencias

```bash
npm run clear-data
```

### 6. `npm run check-db`

**Propósito**: Verificar el estado de la base de datos

- Muestra tablas existentes
- Cuenta registros en cada tabla
- Verifica secuencias
- Muestra permisos del usuario

```bash
npm run check-db
```

### 7. `npm run migrate` (Legacy)

**Propósito**: Script original (mantenido por compatibilidad)

- Combina creación de tablas e inserción de datos
- Usa el archivo `dump.js` original

```bash
npm run migrate
```

## 🔄 Flujos de Trabajo Comunes

### Primera Configuración

```bash
# Opción 1: Todo en uno
npm run init-db

# Opción 2: Paso a paso
npm run setup-db
npm run seed-data
```

### Reiniciar desde Cero

```bash
npm run reset-db
npm run init-db
```

### Limpiar y Reinsertar Datos

```bash
npm run clear-data
npm run seed-data
```

### Verificar Estado

```bash
npm run check-db
```

## ⚙️ Configuración Requerida

Asegúrate de tener un archivo `.env` con las siguientes variables:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cars_db
DB_USER=db_user
DB_PASS=your_password
```

## 📊 Ventajas de los Nuevos Scripts

### ✅ **Separación de Responsabilidades**

- Cada script tiene una función específica
- Más fácil de mantener y debuggear

### ✅ **Mejor Manejo de Errores**

- Mensajes informativos con emojis
- Manejo de errores específicos
- Verificaciones de estado

### ✅ **Flexibilidad**

- Puedes ejecutar solo lo que necesitas
- No necesitas recrear todo si solo quieres limpiar datos

### ✅ **Información Detallada**

- Logs claros de lo que está pasando
- Resúmenes de operaciones
- Verificaciones post-operación

### ✅ **Seguridad**

- Confirmaciones antes de eliminar datos
- Manejo correcto de foreign keys
- Limpieza en orden correcto

## 🛠️ Scripts Adicionales

### Crear Script Personalizado

Si necesitas un script específico, puedes crear uno nuevo:

```javascript
// scripts/my-custom-script.js
const dotenv = require('dotenv');
const { Client } = require('pg');

dotenv.config();

const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

const myCustomScript = async () => {
  try {
    await client.connect();
    // Tu lógica aquí
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await client.end();
  }
};

myCustomScript();
```

Y agregarlo al `package.json`:

```json
{
  "scripts": {
    "my-script": "node scripts/my-custom-script.js"
  }
}
```

## 🔍 Troubleshooting

### Error de Conexión

- Verifica que PostgreSQL esté ejecutándose
- Confirma las credenciales en `.env`
- Asegúrate de que la base de datos existe

### Error de Permisos

- Verifica que el usuario tenga permisos suficientes
- Ejecuta `npm run check-db` para ver permisos actuales

### Tablas No Creadas

- Ejecuta `npm run setup-db` para crear las tablas
- Verifica que `database.sql` esté actualizado

### Datos No Insertados

- Ejecuta `npm run seed-data` para insertar datos
- Verifica que `models.json` exista y tenga el formato correcto

¡Los nuevos scripts te darán mucho más control sobre tu base de datos! 🎉
