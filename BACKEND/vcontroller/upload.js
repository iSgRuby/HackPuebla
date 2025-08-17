import express from 'express';
import multer from 'multer';
import path from 'path';
import { runPrompt } from "../service/gemini.js"

const router = express.Router();

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the destination folder for uploads
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Create a unique filename for the uploaded image
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

router.post('/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // The uploaded file details are available in req.file
  const imageUrl = `/images/${req.file.filename}`;

  runPrompt();

  res.status(201).json({ message: 'Image uploaded successfully', imageUrl: imageUrl });
});

export default router;