const express = require('express');
const router = express.Router();
const { db } = require('../../db');

router.get('/fetchrepaircentersList/:repaircenter_id', async (req, res) => {
  try {
    const repaircenterId = req.params.repaircenter_id;
    // Perform a join operation to fetch repair centers associated with the provided repaircenter_id
    const repairCenters = await db.query(`SELECT rc.* FROM repair_centers rc
    LEFT JOIN repaircenter_users ru ON ru.repaircenter_id = rc.repaircenter_id
    WHERE ru.repaircenter_id = ?`, [repaircenterId]);

    res.json(repairCenters[0]);
    console.log('bishwas',repairCenters[0]);
  } catch (error) {
    console.error('Error fetching repair centers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
