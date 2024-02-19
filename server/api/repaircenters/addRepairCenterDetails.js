const express = require('express');
const router = express.Router();
const { db } = require('../../db');

router.post('/addRepairCenterDetails', async (req, res) => {
  try {
    // Extract data from the request body
    const { repaircenter_id, fname, address, map, contact, documents } = req.body;
    console.log(req.body);
    // Process and store the Repair Center details in your database
    // Note: Adjust the database query as per your schema
    const repairCenterQuery = 'INSERT INTO repair_centers (repaircenter_id, repaircenter_fname, address, map, contact, documents) VALUES (?, ?, ?, ?, ?, ?)';
    await db.execute(repairCenterQuery, [repaircenter_id, fname, address, map, contact, documents ]);

    res.status(200).json({ success: true, message: 'Repair Center details added successfully' });
  } catch (error) {
    console.error('Error adding Repair Center details:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
