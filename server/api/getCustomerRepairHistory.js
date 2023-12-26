const express = require('express');
const router = express.Router();
const { db } = require('../db'); // Assuming you have a database connection setup

// In your server-side code (e.g., getCustomerRepairHistory.js)
router.get('/getCustomerRepairHistory/:vehicleId', async (req, res) => {
  const { vehicleId } = req.params;

  try {
    // Assuming you have a repair_history table with a field vehicleDetails_id
    const [rows] = await db.execute('SELECT * FROM repair_data WHERE vehicleDetails_id = ?', [vehicleId]);
    console.log(rows);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching repair history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
