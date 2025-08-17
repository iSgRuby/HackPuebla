import { ObjectId } from 'mongodb';
import { connectToDatabase, client } from '../repository/database.js';

const addNewDevice = async (email) => {
  const db = await connectToDatabase();
  const usersCollection = db.collection('users');
  const devicesCollection = db.collection('devices_logs');

  const existingUser = await usersCollection.findOne({ email });
  if (!existingUser) {
      throw new Error('User doesnt exist');
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

  return await usersCollection.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $push: { devices: newDeviceData } },
      { returnDocument: 'after' }
  );
};

export { addNewDevice }