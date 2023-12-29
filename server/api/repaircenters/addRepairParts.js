const express = require('express');
const router = express.Router();
const { db } = require('../../db');

router.post('/addRepairParts', async (req, res) => {
  try {
    // Extract data from the request body
    const {
      repaircenter_id,
      partsName,
      partsImage,
      partsNumber,
      partsQuantity,
      selectedRepairCenterId,
    } = req.body;

    // Process validations
    // Add any additional validations as needed

    // Store the parts details in the database
    const addPartsQuery = `
      INSERT INTO repair_parts
      (repaircenter_id, repaircenters_id, parts_name, parts_image, parts_number, parts_quantity)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await db.execute(addPartsQuery, [
        repaircenter_id,
        selectedRepairCenterId,
        partsName,
        partsImage,
        partsNumber,
        partsQuantity,
    ]);
    console.log(addPartsQuery);
    
    res.status(200).json({ success: true, message: 'Parts details added successfully' });
  } catch (error) {
    console.error('Error adding parts details:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
