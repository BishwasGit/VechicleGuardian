const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { db } = require('../../db');

router.post('/workerLogin', async (req, res) => {
  try {
    // Extract data from the request body
    const { workerUserName, password } = req.body;

    // Retrieve the stored hash from the database
    const hashQuery = 'SELECT repaircenter_workers_id, password FROM repaircenter_workers WHERE user_name = ?';
    const [user] = await db.execute(hashQuery, [workerUserName]);

    if (user.length === 0) {
      // Worker not found
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const storedHash = user[0].password;
    const workerId = user[0].repaircenter_workers_id;

    // Compare the provided password with the stored hash
    const passwordMatch = await bcrypt.compare(password, storedHash);

    if (passwordMatch) {
      // Passwords match, return success with workerId
      res.status(200).json({ success: true, message: 'Login successful', workerId: workerId });
    } else {
      // Passwords don't match, return failure
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during worker login:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
