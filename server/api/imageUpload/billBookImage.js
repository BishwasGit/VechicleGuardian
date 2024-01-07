const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
// Set up Cloudinary credentials
cloudinary.config({
  cloud_name: 'VehicleG',
  api_key: '888578658969881',
  api_secret: 'PwS4c844YOXPCHftfdXrx7xDW8c',
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
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.buffer.toString('base64'), {
      public_id: `vehicle_image_${uniqueIdentifier}`, // Change this to your desired public_id
      format: 'png', // Change this to the desired format
    });

    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    res.status(500).json({ error: 'Failed to upload image to Cloudinary' });
  }
});
module.exports = router;
