import express from 'express';
import cors from 'cors'

import userRoutes  from './vcontroller/user.js';
import deviceRoutes from './vcontroller/device.js';
import uploadRoutes from './vcontroller/upload.js';

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors())

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/users', userRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api', uploadRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});