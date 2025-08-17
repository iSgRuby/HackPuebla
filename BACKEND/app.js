import express from 'express';
import { callGeminiApi } from "./gemini.js"
import { run } from './device.js'

const app = express();
const port = 3000;
app.use(express.json());

app.get('/hello', (req, res) => {
  res.send('Hello World!');
  // callGeminiApi();
  run();
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});