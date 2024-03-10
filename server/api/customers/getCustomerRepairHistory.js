const express = require('express');
const router = express.Router();
const { db } = require('../../db'); // Assuming you have a database connection setup

// In your server-side code (e.g., getCustomerRepairHistory.js)
router.get('/getCustomerRepairHistory/:vehicleId', async (req, res) => {
  const { vehicleId } = req.params;

  try {
    // Assuming you have a repair_data table with a field repaircenter_workers_id
    // Joining with repaircenter_workers table based on repaircenter_workers_id
    const [rows] = await db.execute(`
      SELECT rd.*, rw.worker_name
      FROM repair_data rd
      INNER JOIN repaircenter_workers rw ON rd.repaircenter_workers_id = rw.repaircenter_workers_id
      WHERE rd.vehicleDetails_id = ?
    `, [vehicleId]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching repair history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
