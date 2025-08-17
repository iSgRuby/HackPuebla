import express from 'express';
import { ObjectId } from 'mongodb';
import { connectToDatabase, client } from './database.js';

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
    const db = await connectToDatabase();
    const usersCollection = db.collection('users');
    const devicesCollection = db.collection('devices_logs');

    const existingUser = await usersCollection.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: 'User doesnt exist' });
    }
    const userId = existingUser._id;

    // Create the device document
    const newDevice = {
      email,
    };

    // Use updateOne() to modify user in the collection
    const deviceResult = await devicesCollection.insertOne(newDevice);
    const deviceId = deviceResult.insertedId;
    const newDeviceData = {
      deviceId: deviceId,
    }

    const updatedUser = await usersCollection.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $push: { devices: newDeviceData } },
      { returnDocument: 'after' }
    );

    res.status(201).json({ message: 'Device added successfully', user: updatedUser.value });
  } catch(error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

router.get('/:deviceId/alerts', async (req, res) => {
  const deviceId = req.params.deviceId;

});

router.get('/:deviceId/activity', async (req, res) => {

});

export default router