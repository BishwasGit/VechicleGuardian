const express = require('express');
const router = express.Router();
const { db } = require('../db');
const bcrypt = require('bcrypt')

router.post('/register', async (req, res) => {
  const { username, phone, email, password } = req.body;
  const saltRounds = 10; // Number of salt rounds
  try {
    const usernameExists = await checkDuplicateEntry('username', username);
    const phoneExists = await checkDuplicateEntry('phone', phone);
    const emailExists = await checkDuplicateEntry('email', email);

    if (usernameExists || phoneExists || emailExists) {
      return res.status(400).json({ error: 'Duplicate entry detected' });
    }
    
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
       const insertQuery = 'INSERT INTO customer_users (username, phone, email, password) VALUES (?, ?, ?, ?)';
       db.execute(insertQuery, [username, phone, email, hashed_password])
         .then(() => {
           res.json({ success: true, message: 'Registered as Customer' });
         })
         .catch((error) => {
           console.error('Error registering as Customer:', error);
           res.status(500).send('Internal Server Error');
         });
     });
   }  catch (error) {
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
