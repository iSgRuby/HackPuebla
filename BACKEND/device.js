import express from 'express';
const router = express.Router(); // A router for devices

router.get('/', (req, res) => {
  res.send('Hello from the device router!');
});

export default router