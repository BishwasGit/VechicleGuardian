const express = require('express');
const router = express.Router();
const { db } = require('../db');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  const { userTypes, username, phone, email, password } = req.body;
  const saltRounds = 10; // Number of salt rounds
  console.log(req.body);
  try {
    const lowercaseUsername = username.toLowerCase();
    for (const userType of userTypes) {
      const existingTable = getTableName(userType);
      if (existingTable) {
        const countQuery = `SELECT COUNT(*) AS count FROM ${existingTable} WHERE username = ? OR email = ?`;
        if (await isEntryPresent(countQuery, [lowercaseUsername, email])) {
          return res.status(400).json({ error: `User already exists as ${userType}` });
        }
      }
    }

    // Declare hashed_password outside the callback function
    let hashed_password;

    // Hash the password
    hashed_password = await bcrypt.hash(password, saltRounds);

    // Proceed with the registration
    for (const userType of userTypes) {
      const insertQuery = `INSERT INTO ${getTableName(userType)} (username, phone, email, password) VALUES (?, ?, ?, ?)`;
      await db.execute(insertQuery, [lowercaseUsername, phone, email, hashed_password]);
    }

    res.json({ success: true, message: `Registered as ${userTypes.join(', ')}` });
  } catch (error) {
    console.error('Error registering:', error);
    res.status(500).send('Internal Server Error');
  }
});

const getTableName = (userType) => {
  switch (userType) {
    case 'Repair Center':
      return 'repaircenter_users';
    case 'Customer':
      return 'customer_users';
    case 'Repair Parts Seller':
      return 'repair_parts_seller_users';
    default:
      return null;
  }
};

const isEntryPresent = async (countQuery, values) => {
  const [result] = await db.execute(countQuery, values);
  return result[0].count > 0;
};

module.exports = router;
