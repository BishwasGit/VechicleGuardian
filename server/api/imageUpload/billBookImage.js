const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
require('dotenv').config(); 

// Set up Cloudinary credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Set up Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Express route for handling image upload
router.post('/billBookImage', upload.single('image'), async (req, res) => {
  
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const uniqueIdentifier = uuidv4();

    // Create a stream from the buffer
    const stream = cloudinary.uploader.upload_stream(
      { public_id: `bill_book_image_${uniqueIdentifier}` },
      (error, result) => {
        if (error) {
          console.error('Error uploading bill book image to Cloudinary:', error);
          res.status(500).json({ error: 'Failed to upload bill book image to Cloudinary' });
        } else {
        //   console.log(result);
          res.status(200).json(result);
        }
      }
    );

    // Pipe the buffer to the stream
    stream.end(req.file.buffer);
  } catch (error) {
    console.error('Error handling bill book image upload:', error);
    res.status(500).json({ error: 'Failed to handle bill book image upload' });
  }
});

module.exports = router;
