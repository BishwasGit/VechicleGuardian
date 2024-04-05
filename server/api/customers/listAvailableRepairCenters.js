const express = require('express');
const router = express.Router();
const { db } = require('../../db');

router.get('/listAvailableRepairCenters', async (req, res) => {
  try {
    // Retrieve repair centers' availability details
    const availabilityQuery = 'SELECT * FROM repaircenteravailability';
    const [availabilityRows] = await db.execute(availabilityQuery);

    // Extract repair center IDs from availability rows
    const availableRepairCenterIds = availabilityRows.map(row => row.repaircenters_id);
    // Retrieve details of available repair centers
    const [repairCenterRows] = await db.execute(`SELECT * FROM repair_centers WHERE repaircenters_id = ?`,availableRepairCenterIds);
    console.log('repairCenterAvailability',availableRepairCenterIds)
    console.log('availableRepairCenters',[repairCenterRows])
    // Send the combined result as JSON response
    res.json({ repairCenterAvailability: availabilityRows, availableRepairCenters: repairCenterRows });
  } catch (error) {
    console.error('Error fetching available repair centers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
