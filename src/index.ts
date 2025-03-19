import express from 'express' // ESModules
import dotenv from 'dotenv'
import { brandRoutes } from './routes/brands'
import { modelRoutes } from './routes/models'

dotenv.config()

const app = express()
app.use(express.json()) // middleware que transforma la req.body a un json

const PORT = process.env.PORT ?? 3000

app.get('/ping', (_req, res) => {
  console.log('someone pinged here!!')
  res.send('pong')
})

app.use('/brands', brandRoutes)
app.use('/models', modelRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
