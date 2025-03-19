import express from 'express' // ESModules

import { brandRoutes } from './routes/brands'

const app = express()
app.use(express.json()) // middleware que transforma la req.body a un json

const PORT = 3000

app.get('/ping', (_req, res) => {
  console.log('someone pinged here!!')
  res.send('pong')
})

app.use('/brands', brandRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
