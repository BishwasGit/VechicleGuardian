const express = require('express');
const router = express.Router();
const { db } = require('../db');

router.post('/register', async (req, res) => {
  const { username, phone, email, password } = req.body;

  try {
    const usernameExists = await checkDuplicateEntry('username', username);
    const phoneExists = await checkDuplicateEntry('phone', phone);
    const emailExists = await checkDuplicateEntry('email', email);

    // Declare hashed_password outside the callback function
    let hashed_password;

    // Hash the password
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.error('Error hashing password:', err);
        return res.status(500).send('Internal Server Error');
      }
      // Assign the hash to hashed_password
      hashed_password = hash;

      // Insert into customer_user table
      const insertQuery = 'INSERT INTO reparicenter_users (username, phone, email, password) VALUES (?, ?, ?, ?)';
      db.execute(insertQuery, [username, phone, email, hashed_password])
        .then(() => {
          res.json({ success: true, message: 'Registered as Repair Center User' });
        })
        .catch((error) => {
          console.error('Error registering as  Repair Center User:', error);
          res.status(500).send('Internal Server Error');
        });
    });
  }  catch (error) {
    console.error('Error registering as  Repair Center User:', error);
    res.status(500).send('Internal Server Error');
  }
});

const checkDuplicateEntry = async (fieldName, value) => {
  const countQuery = `SELECT COUNT(*) AS count FROM repaircenter_users WHERE ${fieldName} = ?`;
  const [result] = await db.execute(countQuery, [value]);
  return result[0].count > 0;
};

module.exports = router;
