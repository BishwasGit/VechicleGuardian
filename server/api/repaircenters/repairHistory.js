const express = require('express');
const router = express.Router();
const { db } = require('../../db');

router.get('/getRepairHistory/:repaircenterId', async (req, res) => {
  const { repaircenterId } = req.params;
  try {
    const [rows] = await db.execute(`
      SELECT rd.*
      FROM repair_data rd
      INNER JOIN repaircenter_workers rw ON rd.repaircenter_workers_id = rw.repaircenters_id
      WHERE rw.repaircenters_id = ? AND rd.markedCompleted = 'NO'
      ORDER BY STR_TO_DATE(repair_date, '%m/%d/%Y, %h:%i:%s %p') DESC
    `, [repaircenterId]);

    res.json(rows);
  } catch (error) {
    console.error('Error fetching repair history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
