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

const checkDatabase = async () => {
  try {
    console.log('🔌 Conectando a la base de datos...');
    await client.connect();
    console.log('✅ Conexión exitosa');

    console.log('🔍 Verificando estado de la base de datos...\n');

    // Verificar tablas existentes
    const tables = await client.query(`
      SELECT table_name, table_type
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);

    console.log('📊 Tablas encontradas:');
    if (tables.rows.length === 0) {
      console.log('  ❌ No se encontraron tablas');
    } else {
      tables.rows.forEach(table => {
        console.log(`  ✅ ${table.table_name} (${table.table_type})`);
      });
    }

    // Verificar datos en cada tabla
    const expectedTables = ['brand', 'model', 'recommendation'];
    
    for (const tableName of expectedTables) {
      try {
        const count = await client.query(`SELECT COUNT(*) FROM ${tableName}`);
        console.log(`\n📈 Datos en ${tableName}: ${count.rows[0].count} registros`);
        
        if (parseInt(count.rows[0].count) > 0) {
          // Mostrar algunos ejemplos
          const samples = await client.query(`SELECT * FROM ${tableName} LIMIT 3`);
          console.log(`  Ejemplos:`);
          samples.rows.forEach((row, index) => {
            console.log(`    ${index + 1}. ${JSON.stringify(row)}`);
          });
        }
      } catch (error) {
        console.log(`  ❌ Error accediendo a ${tableName}: ${error.message}`);
      }
    }

    // Verificar secuencias
    const sequences = await client.query(`
      SELECT sequence_name
      FROM information_schema.sequences
      WHERE sequence_schema = 'public'
      ORDER BY sequence_name
    `);

    console.log('\n🔄 Secuencias:');
    if (sequences.rows.length === 0) {
      console.log('  ❌ No se encontraron secuencias');
    } else {
      sequences.rows.forEach(seq => {
        console.log(`  ✅ ${seq.sequence_name}`);
      });
    }

    // Verificar permisos
    const permissions = await client.query(`
      SELECT grantee, privilege_type, table_name
      FROM information_schema.role_table_grants
      WHERE table_schema = 'public'
      AND grantee = current_user
      ORDER BY table_name, privilege_type
    `);

    console.log('\n🔐 Permisos del usuario actual:');
    if (permissions.rows.length === 0) {
      console.log('  ❌ No se encontraron permisos');
    } else {
      permissions.rows.forEach(perm => {
        console.log(`  ✅ ${perm.privilege_type} en ${perm.table_name}`);
      });
    }

    console.log('\n🎉 Verificación completada');

  } catch (error) {
    console.error('❌ Error verificando la base de datos:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
};

checkDatabase();
