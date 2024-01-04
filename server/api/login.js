const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { db } = require('../db');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    let result;

    if (username === 'Admin') {
      result = await db.execute('SELECT admin_id, password FROM admin WHERE username = ?', [username]);
    } else {
      result = await db.execute('SELECT customer_id, password FROM customer_users WHERE username = ?', [username]);
    }

    console.log('Query Result:', result);
    if (result.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const [{ password: hashedPassword, admin_id, customer_id }] = result[0];
        // Compare the provided password with the hashed password
    bcrypt.compare(password, hashedPassword, (err, passwordMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).send('Internal Server Error');
      }
      if (passwordMatch) {
        // Passwords match, login successful
        if (admin_id) {
          res.json({ success: true, message: 'Admin login successful', admin_id });
        } else {
          res.json({ success: true, message: 'Customer login successful', customer_id });
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
