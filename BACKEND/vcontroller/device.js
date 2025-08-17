import express from 'express';
import { addNewDevice } from '../service/deviceservice.js';

const router = express.Router(); // A router for devices

router.get('/', (req, res) => {
  res.send('Hello from the device router!');
});

router.post('/register', async (req, res) => {
  const { email } = req.body;
  if( !email ) {
    return res.status(400).json({ message: 'Parent email required' });
  }

  try {
    const result = await addNewDevice(email);

    res.status(201).json({ message: 'Device added successfully', user: result.value });
  } catch(error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

export default router