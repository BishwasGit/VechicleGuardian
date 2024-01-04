const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { db } = require('../db');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const lowercaseUsername = username.toLowerCase()
    let result;

    // Check if the username exists in customer_users table
    result = await db.execute('SELECT customer_id, password FROM customer_users WHERE username = ?', [lowercaseUsername]);

    if (result.length === 0) {
      // Check if the username exists in repaircenter_users table
      result = await db.execute('SELECT repaircenter_id, password FROM repaircenter_users WHERE username = ?', [lowercaseUsername]);

      if (result.length === 0) {
        // Check if the username exists in repair_parts_seller_users table
        result = await db.execute('SELECT seller_id, password FROM repair_parts_seller_users WHERE username = ?', [lowercaseUsername]);

        if (result.length === 0) {
          return res.status(401).json({ error: 'Invalid username or password' });
        }
      }
    }

    console.log('Query Result:', result);
    const [{ password: hashedPassword, customer_id, repaircenter_id, seller_id }] = result[0];

    // Compare the provided password with the hashed password
    bcrypt.compare(password, hashedPassword, (err, passwordMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).send('Internal Server Error');
      }
      if (passwordMatch) {
        // Passwords match, login successful
        if (customer_id) {
          res.json({ success: true, message: 'Customer login successful', customer_id });
        } else if (repaircenter_id) {
          res.json({ success: true, message: 'Repair Center login successful', repaircenter_id });
        } else if (seller_id) {
          res.json({ success: true, message: 'Repair Parts Seller login successful', seller_id });
        }
      } else {
        // Passwords don't match, login failed
        res.status(401).json({ error: 'Invalid username or password' });
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
