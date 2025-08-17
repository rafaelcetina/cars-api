import dotenv from 'dotenv'
import pg from 'pg'

dotenv.config()

const Pool = pg.Pool

const dbPort = Number(process.env.DB_PORT ?? 5432)

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: dbPort,
  idleTimeoutMillis: 30000, // 30 seconds
  min: 2,
  max: 20,
  connectionTimeoutMillis: 15000,
})

pool.on('error', (err, connection) => {
  console.error('Unexpected error on idle client', err)
  connection.release()
  // process.exit(-1)
})

pool.connect((err: any, connection: any) => {
  if (err != null) throw err
  connection.release()
})

export default pool
