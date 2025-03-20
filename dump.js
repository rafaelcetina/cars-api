// import models from './models.json'

const models = require('./models.json')
const dotenv = require('dotenv')

dotenv.config()

// usa PG para conectar a la base de datos y hacer un dump de los datos
const { Client } = require('pg')
const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
})

const dump = async () => {
  try {
    await client.connect()

    const res = await client.query('SELECT * FROM brand')
    if (res.rows.length) {
      console.log(res.rows)
      // Vacia la tabla
      await client.query('TRUNCATE brand CASCADE RESTART IDENTITY')
      await client.query('TRUNCATE model CASCADE RESTART IDENTITY')
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
