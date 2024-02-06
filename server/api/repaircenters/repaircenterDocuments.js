const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

// Set up Cloudinary credentials
cloudinary.config({
  cloud_name: "dpftkbsu6",
  api_key: "888578658969881",
  api_secret: "PwS4c844YOXPCHftfdXrx7xDW8c",
});

// Set up Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Express route for handling image upload
router.post(
  "/repaircenterDocuments",
  upload.single("documents"),
  async (req, res) => {
    console.log(req.headers);
    console.log(req.body);
    console.log(req.file);
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const uniqueIdentifier = uuidv4();

      // Create a stream from the buffer
      const stream = cloudinary.uploader.upload_stream(
        { public_id: `repaircenter_documents${uniqueIdentifier}` },
        (error, result) => {
          if (error) {
            console.error(
              "Error uploading repair center document to Cloudinary:",
              error
            );
            res
              .status(500)
              .json({
                error: "Failed to upload repair center document to Cloudinary",
              });
          } else {
            //   console.log(result);
            res.status(200).json(result);
          }
        }
      );

      // Pipe the buffer to the stream
      stream.end(req.file.buffer);
    } catch (error) {
      console.error("Error handling repair center document upload:", error);
      res
        .status(500)
        .json({ error: "Failed to handle repair center document upload" });
    }
  }
);

module.exports = router;
