const express = require('express');
const router = express.Router();
const db = require('../db');

// Endpoint for user registration
router.post('/register', async (req, res) => {
  const { userType, username, phone, email, password } = req.body;
  const usernameExists = await checkDuplicateEntry('username', username);
  const phoneExists = await checkDuplicateEntry('phone', phone);
  const emailExists = await checkDuplicateEntry('email', email);

  if (usernameExists || phoneExists || emailExists) {
    return res.status(400).json({ error: 'Duplicate entry detected' });
  }

  if (userType === 'Customer') {
    // Insert into customer_user table
    const query = 'INSERT INTO customer_users (username, phone, email, password) VALUES (?, ?, ?, ?)';
    db.query(query, [username, phone, email, password], (error, results) => {
      if (error) {
        console.error('Error registering as Customer:', error);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.json({ success: true, message: 'Registered as Customer' });
    });
  } else if (userType === 'Repair Center') {
    // Insert into repaircenter_user table
    const query = 'INSERT INTO repaircenter_users (username, phone, email, password) VALUES (?, ?, ?, ?)';
    db.query(query, [username, phone, email, password], (error, results) => {
      if (error) {
        console.error('Error registering as Repair Center:', error);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.json({ success: true, message: 'Registered as Repair Center' });
    });
  } else {
    res.status(400).json({ success: false, message: 'Invalid user type' });
  }
});

const checkDuplicateEntry = async (fieldName, value) => {
    const query = `SELECT COUNT(*) AS count FROM customer_user WHERE ${fieldName} = ?`;
    const result = await db.query(query, [value]);
    return result[0].count > 0;
  };

module.exports = router;
