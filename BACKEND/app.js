import express from 'express';
import { callGeminiApi } from "./gemini.js"
import { run } from './database.js'

import userRoutes  from './user.js';
import deviceRoutes from './device.js';

const app = express();
const port = 3000;
app.use(express.json());

app.get('/hello', (req, res) => {
  res.send('Hello World!');
  // callGeminiApi();
  run();
});

app.use('/api/users', userRoutes);
app.use('/api/devices', deviceRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});