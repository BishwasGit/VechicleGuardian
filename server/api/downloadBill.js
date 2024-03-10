const express = require('express');
const { db } = require('../db');
const router = express.Router();

router.get('/downloadBill/:vehicleDetails_id', async (req, res) => {
  try {
    const { vehicleDetails_id } = req.params;
    const { completionTime } = req.query;
    const [rows] = await db.execute(
      `SELECT pdf_url FROM repair_data WHERE vehicleDetails_id = ? AND completion_time = ? `,
      [vehicleDetails_id, completionTime]
    );
    console.log("pdf data : ",rows);
    if (rows.length > 0) {
      const { pdf_url } = rows[0];
      res.json({ pdf_url });
    } else {
      res.status(404).json({ success: false, message: 'PDF URL not found' });
    }
  } catch (error) {
    console.error('Error while downloading bill:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
