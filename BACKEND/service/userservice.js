import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { connectToDatabase, client } from '../repository/database.js';

const createUser = async (email, password) => {
  const db = await connectToDatabase();
  const usersCollection = db.collection('users');

  const existingUser = await usersCollection.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
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
  return await usersCollection.insertOne(newUser);
};

export { createUser }