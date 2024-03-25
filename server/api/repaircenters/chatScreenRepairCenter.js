const express = require('express');
const router = express.Router();
const { db } = require('../../db');

router.get('/repairData_Repaircenter/:repaircenter_id', async (req, res) => {
  try {
    const { repaircenter_id } = req.params;
    const repaircenterId = parseInt(repaircenter_id, 10);

    // Retrieve repair data based on customer_id from the database
    const [repairData] = await db.execute(`
    SELECT repair_data.*, repaircenter_workers.repaircenter_workers_id
    FROM repair_data
    INNER JOIN repaircenter_workers ON repair_data.repaircenter_workers_id = repaircenter_workers.repaircenter_workers_id
    WHERE repaircenter_workers.repaircenters_id = ?
  `, [repaircenterId]);
    // Assuming the response structure; modify as per your database schema
    console.log({repairData});
    res.json({ repairData });
  } catch (error) {
    console.error('Error fetching repair data:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
