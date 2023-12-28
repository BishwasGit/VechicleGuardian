const express = require('express');
const bcrypt = require('bcrypt');
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

    // Process validations
    const duplicateCheckQuery = 'SELECT * FROM repaircenter_workers WHERE phone_number = ? OR email_address = ? OR user_name = ?';
    const [duplicateCheckResults] = await db.execute(duplicateCheckQuery, [phoneNumber, emailAddress, userName]);

    if (duplicateCheckResults.length > 0) {
      return res.status(400).json({ success: false, message: 'Phone number, email address, or username already exists.' });
    }

    // Hash the password before storing
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Store the hashed password in the database
    const addWorkerQuery = `
      INSERT INTO repaircenter_workers
      (repaircenters_id, user_name, worker_name, password, phone_number, email_address)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    await db.execute(addWorkerQuery, [
      repaircenter_id,
      userName,
      workerName,
      hashedPassword, // Use the hashed password
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
