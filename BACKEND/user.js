import express from 'express';
import bcrypt from 'bcrypt';
import { connectToDatabase, client } from './database.js';

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
    const db = await connectToDatabase();
    const usersCollection = db.collection('users');

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user document
    const newUser = {
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    // Use insertOne() to save the new user to the collection
    const result = await usersCollection.insertOne(newUser);

    res.status(201).json({
      message: 'User registered successfully',
      userId: result.insertedId,
    });
  } catch(error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

router.get('/', (req, res) => {
});

export default router