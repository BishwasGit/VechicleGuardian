const express = require('express');
const router = express.Router();
const { db } = require('../../db');

router.get('/getWorkerDetails/:repaircenter_workers_id', async (req, res) => {
  try {
    const { repaircenter_workers_id } = req.params;
    // Query the database to get worker details based on workerId
    const workerQuery = 'SELECT * FROM repaircenter_workers WHERE repaircenter_workers_id = ?';
    const [workerDetails] = await db.execute(workerQuery, [repaircenter_workers_id]);

    if (workerDetails.length === 0) {
      // If worker not found, return a 404 status
      return res.status(404).json({ success: false, message: 'Worker not found' });
    }
    console.log('workerDetails',workerDetails)
    // Return the worker details as JSON
    res.status(200).json({ success: true, data: workerDetails[0] });
  } catch (error) {
    console.error('Error fetching worker details:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
