const express = require('express');
const router = express.Router();
const { db } = require('../../db');

router.post('/workerLogin', async (req, res) => {
  try {
    // Extract data from the request body
    const { workerUserName, password } = req.body;

    // Check if the worker exists and the password matches
    const workerQuery = 'SELECT * FROM repaircenter_workers WHERE user_name = ? AND password = ?';
    const [worker] = await db.execute(workerQuery, [workerUserName, password]);

    if (worker.length > 0) {
      // Worker found, return success
      res.status(200).json({ success: true, message: 'Login successful' });
    } else {
      // Worker not found or password doesn't match, return failure
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during worker login:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
