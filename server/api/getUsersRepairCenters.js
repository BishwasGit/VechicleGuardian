const express = require('express');
const router = express.Router();
const { db } = require('../db');

router.get('/getUsersRepairCenters/:repaircenter_id', async (req, res) => {
  try {
    const { repaircenter_id } = req.params;

    // Assuming you have a table named 'repair_centers' in your database
    const repairCentersQuery = 'SELECT * FROM repair_centers WHERE repaircenter_id = ?';
    const [repairCenters] = await db.execute(repairCentersQuery, [repaircenter_id]);

    res.status(200).json(repairCenters);
  } catch (error) {
    console.error('Error fetching repair centers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
