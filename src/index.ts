import express from 'express'; // ESModules
// import dotenv from 'dotenv'
import { brandRoutes } from './routes/brands';
// import { modelRoutes } from './routes/models'
import fs from 'fs';
import cors from 'cors';

// dotenv.config()

const app = express();

app.use(cors({ origin: '*' }));

app.use(express.json()); // middleware que transforma la req.body a un json

const PORT = 3000;

app.get('/', (_req, res) => {
  console.log('someone pinged here!!');
  res.status(200);
  const output = fs.readFileSync('./src/welcome.html').toString();
  res.type('text/html');
  res.send(output);
});

app.get('/health-check', (_req, res) => {
  res.status(200);
  res.type('text/plain');
  console.log('someone pinged here!!');
  res.send('pong');
});

app.use('/brands', brandRoutes);
// app.use('/models', modelRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
