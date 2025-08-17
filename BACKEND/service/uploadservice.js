import { connectToDatabase, client } from '../repository/database.js';
import { ObjectId } from 'mongodb';

const createAlert = async (email, response) => {
  const db = await connectToDatabase();
  const devicesCollection = db.collection('devices_logs');

  const existingDevice = await devicesCollection.findOne({ email });
  if (!existingDevice) {
    throw new Error('Device doesnt exists');
  }
  const deviceId = existingDevice._id;

  // Create the user document
  const newAlert = {
  ...response[0],
  createdAt: new Date(),
  };

  // console.log('RESPONSE ', response);
  // console.log('NEW ALERT ',typeof newAlert, newAlert);
  // Use insertOne() to save the new user to the collection
  // return await devicesCollection.insertOne(newAlert);
  return await devicesCollection.findOneAndUpdate(
      { _id: new ObjectId(deviceId) },
      { $push: { alerts: newAlert } },
      { returnDocument: 'after' }
  );
}

export { createAlert };