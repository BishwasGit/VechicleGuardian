const express = require('express');
const router = express.Router();
const { db } = require('../../db');

router.get('/getRepairCentersList', async (req, res) => {
  try {
    // Retrieve repair centers data from the database
    const [repairCenters] = await db.execute('SELECT * FROM repair_centers WHERE status = 1');

    // Assuming the response structure; modify as per your database schema
    console.log(repairCenters);
    res.json({ repairCenters });
  } catch (error) {
    console.error('Error fetching repair centers:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
