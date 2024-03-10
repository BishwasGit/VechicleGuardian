const express = require('express');
const router = express.Router();
const { db } = require('../db');

router.get('/getRepairCenterDetailsUsingWorkerId/:repaircenter_workers_id', async (req, res) => {
  try {
    const { repaircenter_workers_id } = req.params;
    // Query the database to get worker details based on workerId
    const [rows] = await db.execute(`SELECT rw.repaircenters_id, rc.repaircenters_id FROM repaircenter_workers rw INNER JOIN repair_centers rc ON rc.repaircenters_id = rw.repaircenters_id WHERE rw.repaircenter_workers_id = ? `, [repaircenter_workers_id]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching repaircenter id:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
