const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

dotenv.config();

const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

const setupDatabase = async () => {
  try {
    console.log('🔌 Conectando a la base de datos...');
    await client.connect();
    console.log('✅ Conexión exitosa');

    // Leer el archivo SQL
    const sqlPath = path.join(__dirname, '..', 'database.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');

    console.log('📋 Ejecutando script de creación de tablas...');
    
    // Dividir el SQL en comandos individuales
    const commands = sqlContent
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0 && !cmd.startsWith('--'));

    for (const command of commands) {
      if (command.trim()) {
        try {
          await client.query(command);
          console.log(`✅ Comando ejecutado: ${command.substring(0, 50)}...`);
        } catch (error) {
          if (error.code === '42P07') {
            // Tabla ya existe
            console.log(`⚠️  Tabla ya existe, continuando...`);
          } else if (error.code === '42704') {
            // Usuario no existe (para comandos GRANT)
            console.log(`⚠️  Usuario no existe, saltando permisos...`);
          } else if (error.message.includes('TRUNCATE')) {
            // Ignorar comandos TRUNCATE en setup
            console.log(`⚠️  Saltando TRUNCATE en setup...`);
          } else {
            console.error(`❌ Error ejecutando comando: ${error.message}`);
            // No lanzar error para comandos de permisos
            if (!command.toUpperCase().includes('GRANT') && !command.toUpperCase().includes('TRUNCATE')) {
              throw error;
            }
          }
        }
      }
    }

    console.log('🎉 Base de datos configurada exitosamente');
    
    // Verificar que las tablas se crearon
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('brand', 'model', 'recommendation')
      ORDER BY table_name
    `);
    
    console.log('📊 Tablas creadas:');
    tables.rows.forEach(table => {
      console.log(`  - ${table.table_name}`);
    });

  } catch (error) {
    console.error('❌ Error configurando la base de datos:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
};

setupDatabase();
