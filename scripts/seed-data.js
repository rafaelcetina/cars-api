const models = require('../models.json');
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

const seedData = async () => {
  try {
    console.log('🔌 Conectando a la base de datos...');
    await client.connect();
    console.log('✅ Conexión exitosa');

    // Verificar si ya hay datos
    const existingBrands = await client.query('SELECT COUNT(*) FROM brand');
    const existingModels = await client.query('SELECT COUNT(*) FROM model');

    if (parseInt(existingBrands.rows[0].count) > 0 || parseInt(existingModels.rows[0].count) > 0) {
      console.log('⚠️  Ya existen datos en la base de datos');
      console.log('¿Deseas continuar y sobrescribir los datos? (y/N)');
      
      // En un entorno de producción, podrías usar readline para interacción
      // Por ahora, asumimos que queremos continuar
      console.log('🔄 Limpiando datos existentes...');
      await client.query('TRUNCATE brand RESTART IDENTITY CASCADE');
      await client.query('TRUNCATE model RESTART IDENTITY CASCADE');
      console.log('✅ Datos limpiados');
    }

    console.log('🌱 Insertando datos de prueba...');

    // Obtener marcas únicas
    const brands = models.map(model => model.brand_name);
    const uniqueBrands = [...new Set(brands)];

    console.log(`📝 Insertando ${uniqueBrands.length} marcas...`);
    
    // Insertar marcas
    for (const brand of uniqueBrands) {
      await client.query('INSERT INTO brand (name) VALUES ($1)', [brand]);
      console.log(`  ✅ Marca insertada: ${brand}`);
    }

    // Obtener marcas de la base de datos para obtener los IDs
    const brandsFromDB = await client.query('SELECT * FROM brand');

    console.log(`🚗 Insertando ${models.length} modelos...`);
    
    // Insertar modelos
    for (const model of models) {
      const brand = brandsFromDB.rows.find(brand => brand.name === model.brand_name);
      
      if (!brand) {
        console.warn(`⚠️  Marca no encontrada: ${model.brand_name}`);
        continue;
      }

      await client.query(
        'INSERT INTO model (name, average_price, brand_id) VALUES ($1, $2, $3)',
        [model.name, model.average_price, brand.id]
      );
      console.log(`  ✅ Modelo insertado: ${model.name} (${model.brand_name})`);
    }

    // Verificar datos insertados
    const finalBrands = await client.query('SELECT COUNT(*) FROM brand');
    const finalModels = await client.query('SELECT COUNT(*) FROM model');

    console.log('📊 Resumen de datos insertados:');
    console.log(`  - Marcas: ${finalBrands.rows[0].count}`);
    console.log(`  - Modelos: ${finalModels.rows[0].count}`);

    console.log('🎉 Datos de prueba insertados exitosamente');

  } catch (error) {
    console.error('❌ Error insertando datos:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
};

seedData();
