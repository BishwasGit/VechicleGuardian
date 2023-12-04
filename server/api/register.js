const express = require('express');
const router = express.Router();
const { db } = require('../db');

router.post('/register', async (req, res) => {
  const { username, phone, email, password } = req.body;

  try {
    const usernameExists = await checkDuplicateEntry('username', username);
    const phoneExists = await checkDuplicateEntry('phone', phone);
    const emailExists = await checkDuplicateEntry('email', email);

    if (usernameExists || phoneExists || emailExists) {
      return res.status(400).json({ error: 'Duplicate entry detected' });
    }

    // Insert into customer_user table
    const insertQuery = 'INSERT INTO customer_users (username, phone, email, password) VALUES (?, ?, ?, ?)';
    await db.execute(insertQuery, [username, phone, email, password]);

    res.json({ success: true, message: 'Registered as Customer' });
  } catch (error) {
    console.error('Error registering as Customer:', error);
    res.status(500).send('Internal Server Error');
  }
});

const checkDuplicateEntry = async (fieldName, value) => {
  const countQuery = `SELECT COUNT(*) AS count FROM customer_users WHERE ${fieldName} = ?`;
  const [result] = await db.execute(countQuery, [value]);
  return result[0].count > 0;
};

module.exports = router;
