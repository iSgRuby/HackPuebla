import express from 'express';
const router = express.Router(); // A router for users

router.get('/', (req, res) => {
  res.send('Hello from the user router!');
});

export default router