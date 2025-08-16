import express from 'express';
// const express = require('express');
import { callGeminiApi } from "./gemini.js"

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
  callGeminiApi();
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});