const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { db } = require('../db');
const jwt = require('jsonwebtoken')

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const SECRET_KEY = process.env.SECRET_KEY || 'uE9pgkZlDD4d2I_kbAlODrxz36F3-wWaP9NAAg-vZ3Q';
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
          result = await db.execute('SELECT repair_parts_seller_users_id, password FROM repair_parts_seller_users WHERE username = ?', [lowercaseUsername]);

          if(!result || result[0].length === 0){
            result = await db.execute('SELECT repaircenter_workers_id, password FROM repaircenter_workers WHERE user_name = ?',[lowercaseUsername]);
          }
        }
      }
    }
    if (result && result.length > 0) {
      const { password: hashedPassword, customer_id, repaircenter_id, repair_parts_seller_users_id, admin_id, repaircenter_workers_id } = result[0][0];

      // Compare the provided password with the hashed password
      const passwordMatch = await bcrypt.compare(password, hashedPassword);

      if (passwordMatch) {
        let payload = {};
        let message = '';

        // Passwords match, login successful
        if (customer_id) {
          payload = { userId: customer_id, userType: 'customer' };
          message = 'Customer login successful';
        } else if (repaircenter_id) {
          payload = { userId: repaircenter_id, userType: 'repaircenter' };
          message = 'Repair Center login successful';
        } else if (repair_parts_seller_users_id) {
          payload = { userId: repair_parts_seller_users_id, userType: 'seller' };
          message = 'Repair Parts Seller login successful';
        } else if (admin_id) {
          payload = { userId: admin_id, userType: 'admin' };
          message = 'Admin login successful';
        } else if (repaircenter_workers_id) {
          payload = { userId: repaircenter_workers_id, userType: 'repaircenter_workers' };
          message = 'Repair Center worker login successful';
        }
        // Generate a token
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });

        res.json({ success: true, message, token, userId: payload.userId, userType: payload.userType });
        console.log([payload.userId,payload.userType]);
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
