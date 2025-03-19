// import models from './models.json'

const models = require('./models.json')

// usa PG para conectar a la base de datos y hacer un dump de los datos
const { Client } = require('pg')
const client = new Client({
  user: 'db_user',
  password: 'password',
  host: 'localhost',
  port: 5432,
  database: 'nexu'
})

const dump = async () => {
  try {
    await client.connect()

    const res = await client.query('SELECT * FROM brand')
    if (res.rows.length) {
      console.log(res.rows)
      // Vacia la tabla
      await client.query('TRUNCATE brand')
      await client.query('TRUNCATE model')
    }

    // obtiene los datos de models.json, crea una lista con los nombres de las marcas
    // los nombres son unicos
    const brands = models.map(model => model.brand_name)
    // elimina los duplicados
    const uniqueBrands = [...new Set(brands)]

    // Inserta los datos de models.json
    for (const brand of uniqueBrands) {
      await client.query('INSERT INTO brand (name) VALUES ($1)', [brand])
    }

    // insertar los modelos usando el indice de la marca como brand_id
    const brandsFromDB = await client.query('SELECT * FROM brand')

    for (const model of models) {
      // get all brands from db
      const brand = brandsFromDB.rows.find(brand => brand.name === model.brand_name)

      await client.query('INSERT INTO model (name, average_price, brand_id) VALUES ($1, $2, $3)',
        [model.name, model.average_price, brand.id])
    }

    await client.end()
  } catch (err) {
    console.error(err)
  }
}

dump()
