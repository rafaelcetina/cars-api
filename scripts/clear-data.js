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

const clearData = async () => {
  try {
    console.log('🔌 Conectando a la base de datos...');
    await client.connect();
    console.log('✅ Conexión exitosa');

    console.log('🧹 Limpiando datos de las tablas...');

    // Limpiar datos en orden correcto (por las foreign keys)
    const tables = ['recommendation', 'model', 'brand'];
    
    for (const table of tables) {
      try {
        const result = await client.query(`TRUNCATE ${table} RESTART IDENTITY CASCADE`);
        console.log(`✅ Datos de ${table} limpiados`);
      } catch (error) {
        console.log(`⚠️  Error limpiando ${table}: ${error.message}`);
      }
    }

    // Verificar que las tablas están vacías
    console.log('\n📊 Verificando estado después de la limpieza:');
    
    for (const table of tables) {
      try {
        const count = await client.query(`SELECT COUNT(*) FROM ${table}`);
        console.log(`  - ${table}: ${count.rows[0].count} registros`);
      } catch (error) {
        console.log(`  - ${table}: Error al verificar`);
      }
    }

    console.log('\n🎉 Datos limpiados exitosamente');
    console.log('💡 Ejecuta "npm run seed-data" para insertar datos de prueba');

  } catch (error) {
    console.error('❌ Error limpiando datos:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
};

clearData();
