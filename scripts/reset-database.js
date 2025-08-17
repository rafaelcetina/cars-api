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

const resetDatabase = async () => {
  try {
    console.log('🔌 Conectando a la base de datos...');
    await client.connect();
    console.log('✅ Conexión exitosa');

    console.log('🗑️  Reseteando base de datos...');

    // Eliminar todas las tablas en orden correcto (por las foreign keys)
    const tables = ['recommendation', 'model', 'brand'];
    
    for (const table of tables) {
      try {
        await client.query(`DROP TABLE IF EXISTS ${table} CASCADE`);
        console.log(`✅ Tabla ${table} eliminada`);
      } catch (error) {
        console.log(`⚠️  Error eliminando tabla ${table}: ${error.message}`);
      }
    }

    // Eliminar secuencias si existen
    const sequences = ['brand_id_seq', 'model_id_seq', 'recommendation_id_seq'];
    
    for (const sequence of sequences) {
      try {
        await client.query(`DROP SEQUENCE IF EXISTS ${sequence} CASCADE`);
        console.log(`✅ Secuencia ${sequence} eliminada`);
      } catch (error) {
        console.log(`⚠️  Error eliminando secuencia ${sequence}: ${error.message}`);
      }
    }

    console.log('🎉 Base de datos reseteada exitosamente');
    console.log('💡 Ejecuta "npm run setup-db" para recrear las tablas');

  } catch (error) {
    console.error('❌ Error reseteando la base de datos:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
};

resetDatabase();
