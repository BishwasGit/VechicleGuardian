const express = require('express');
const router = express.Router();
const { db } = require('../../db');

router.get('/repairCenterWorker/:repairCenterWorkerId', async (req, res) => {
  try {
    const { repairCenterWorkerId } = req.params;

    // Retrieve repair center information based on repairCenterWorkerId from the database
    const [repairCenterData] = await db.execute(`
    SELECT repair_centers.*
    FROM repaircenter_workers
    INNER JOIN repair_centers ON repaircenter_workers.repaircenters_id = repair_centers.repaircenters_id
    WHERE repaircenter_workers.repaircenter_workers_id = ?
  `, [repairCenterWorkerId]);
    // Assuming the response structure; modify as per your database schema
    res.json({ repairCenterData });
  } catch (error) {
    console.error('Error fetching repair center data:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
