const express = require('express');
const router = express.Router();
const { db } = require('../db');

router.get('/getRepairHistory/:customer_id', async (req, res) => {
  try {
    // Extract customer_id from the query parameters
    const { customer_id } = req.params;
    
    // Query the repair_data table to get repair history for the given customer_id
    const repairHistoryQuery = 'SELECT * FROM repair_data WHERE vehicleDetails_id IN (SELECT vehicleDetails_id FROM vehicle_details WHERE customer_id = ?)';
    const [repairHistoryRows] = await db.execute(repairHistoryQuery, [customer_id]);
    
    // Send the repair history data as the response
    console.log(repairHistoryRows);
    res.status(200).json(repairHistoryRows);
  } catch (error) {
    console.error('Error fetching repair history:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
