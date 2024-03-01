const express = require('express');
const router = express.Router();
const { db } = require('../../db');

router.get('/repaircentersid/:repaircenters_id', async (req, res) => {
  try {
    const { repaircenters_id } = req.params;
    console.log('repaircenters_id  from client :  ', req.params)
    // Assuming you have a table named 'repair_centers' in your database
    const repairCentersQuery = 'SELECT * FROM repair_centers WHERE repaircenters_id = ?';
    const [repairCenters] = await db.execute(repairCentersQuery, [repaircenters_id]);
    console.log('user repair center data',repairCenters)
    res.status(200).json(repairCenters);
  } catch (error) {
    console.error('Error fetching repair centers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
