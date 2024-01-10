const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { db } = require('../db');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    let result;

    // Check if the username is 'admin'
    if (username === 'admin') {
      console.log('Checking admin');
      result = await db.execute('SELECT admin_id, password FROM admin WHERE username = ?', [username]);
    } else {
      const lowercaseUsername = username.toLowerCase();

      // Check if the username exists in customer_users table
      result = await db.execute('SELECT customer_id, password FROM customer_users WHERE username = ?', [lowercaseUsername]);
      if (!result || result[0].length === 0) {
        // Check if the username exists in repaircenter_users table
        result = await db.execute('SELECT repaircenter_id, password FROM repaircenter_users WHERE username = ?', [lowercaseUsername]);

        if (!result || result[0].length === 0) {
          // Check if the username exists in repair_parts_seller_users table
          result = await db.execute('SELECT seller_id, password FROM repair_parts_seller_users WHERE username = ?', [lowercaseUsername]);
        }
      }
    }

    console.log(result);
    if (result && result.length > 0) {
      const { password: hashedPassword, customer_id, repaircenter_id, seller_id, admin_id } = result[0][0];

      // Compare the provided password with the hashed password
      const passwordMatch = await bcrypt.compare(password, hashedPassword);

      if (passwordMatch) {
        // Passwords match, login successful
        if (customer_id) {
          res.json({ success: true, message: 'Customer login successful', customer_id });
        } else if (repaircenter_id) {
          res.json({ success: true, message: 'Repair Center login successful', repaircenter_id });
        } else if (seller_id) {
          res.json({ success: true, message: 'Repair Parts Seller login successful', seller_id });
        } else if (admin_id) {
          res.json({ success: true, message: 'Admin login successful', admin_id });
        }
      } else {
        // Passwords don't match, login failed
        res.status(401).json({ error: 'Invalid username or password' });
      }
    } else {
      // No user found in any table
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
