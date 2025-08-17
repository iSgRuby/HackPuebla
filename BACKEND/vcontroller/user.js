import express from 'express';

import { createUser, getUserActivity, getUserAlerts } from '../service/userservice.js';

const router = express.Router(); // A router for users

router.get('/', (req, res) => {
  res.send('Hello from the user router!');
});

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if(!email | !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const result = await createUser(email, password);

    res.status(201).json({ message: 'User registered successfully', userId: result.insertedId, });
  } catch(error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

router.get('/activity', async (req, res) => {
  const { email } = req.body;
  if(!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    const result = await getUserActivity(email);

    res.status(201).json({ message: 'Activity retrieved successfully', userId: result.insertedId, });
  } catch(error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

router.get('/alerts', async (req, res) => {
  const { email } = req.body;
  if(!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    const result = await getUserAlerts(email);
    
    res.status(201).json({ message: 'Alerts retrieved successfully', userId: result.insertedId, });
  } catch(error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

export default router