const express = require('express');
const router = express.Router();
const { db } = require('../../db');

router.post('/addWorkers', async (req, res) => {
  try {
    // Extract data from the request body
    const {
      repaircenter_id,
      userName,
      workerName,
      password,
      phoneNumber,
      emailAddress,
    } = req.body;

    // Process and store the Worker details in your database


    // here repaircenters_id keeps track for which repaircenter the worker works for
    const addWorkerQuery = `
      INSERT INTO repaircenter_workers
      (repaircenters_id, user_name, worker_name, password, phone_number, email_address)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    await db.execute(addWorkerQuery, [
      repaircenter_id,
      userName,
      workerName,
      password,
      phoneNumber,
      emailAddress,
    ]);

    res.status(200).json({ success: true, message: 'Worker added successfully' });
  } catch (error) {
    console.error('Error adding worker:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
