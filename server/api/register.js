const express = require('express');
const router = express.Router();
const { db } = require('../db');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  const { userTypes, username, phone, email, password } = req.body;
  const saltRounds = 10; // Number of salt rounds

  try {
    // Check for duplicates based on userTypes
    const existingTable = checkExistingTable(userTypes, username, phone, email);
    if (existingTable) {
      // Entry already exists in some table, you can handle it accordingly
      console.log(`Entry already exists in ${existingTable} table`);
      // Store data in the corresponding table
      const insertQuery = `INSERT INTO ${existingTable} (username, phone, email, password) VALUES (?, ?, ?, ?)`;
      const hashed_password = await bcrypt.hash(password, saltRounds);

      await db.execute(insertQuery, [username, phone, email, hashed_password]);
      res.json({ success: true, message: `Registered in ${existingTable}` });
    } else {
      // Entry not found in any table, proceed with the registration
      // Declare hashed_password outside the callback function
      let hashed_password;

      // Hash the password
      hashed_password = await bcrypt.hash(password, saltRounds);

      // Register in customer_users table
      if(userTypes.includes('Cusomter')){
      const insertCustomerQuery = 'INSERT INTO customer_users (username, phone, email, password) VALUES (?, ?, ?, ?)';
      await db.execute(insertCustomerQuery, [username, phone, email, hashed_password]);
      }
      // Check if Repair Center is selected
      if (userTypes.includes('Repair Center')) {
        const insertRepairCenterQuery = 'INSERT INTO repaircenter_users (username, phone, email, password) VALUES (?, ?, ?, ?)';
        await db.execute(insertRepairCenterQuery, [username, phone, email, hashed_password]);
      }

      // Check if Repair Parts Seller is selected
      if (userTypes.includes('Repair Parts Seller')) {
        const insertRepairPartsSellerQuery = 'INSERT INTO repair_parts_seller_users (username, phone, email, password) VALUES (?, ?, ?, ?)';
        await db.execute(insertRepairPartsSellerQuery, [username, phone, email, hashed_password]);
      }

      res.json({ success: true, message: `Registered as ${userTypes.join(', ')}` });
    }
  } catch (error) {
    console.error('Error registering:', error);
    res.status(500).send('Internal Server Error');
  }
});

const checkExistingTable = (userTypes, username, phone, email) => {
  if (userTypes.includes('Repair Center')) {
    const countQuery = 'SELECT COUNT(*) AS count FROM repaircenter_users WHERE username = ? OR phone = ? OR email = ?';
    if (isEntryPresent(countQuery, [username, phone, email])) {
      return 'repaircenter_users';
    }
  }

  if (userTypes.includes('Customer')) {
    const countQuery = 'SELECT COUNT(*) AS count FROM customer_users WHERE username = ? OR phone = ? OR email = ?';
    if (isEntryPresent(countQuery, [username, phone, email])) {
      return 'customer_users';
    }
  }

  if (userTypes.includes('Repair Parts Seller')) {
    const countQuery = 'SELECT COUNT(*) AS count FROM repair_parts_seller_users WHERE username = ? OR phone = ? OR email = ?';
    if (isEntryPresent(countQuery, [username, phone, email])) {
      return 'repair_parts_seller_users';
    }
  }

  return null;
};

const isEntryPresent = async (countQuery, values) => {
  const [result] = await db.execute(countQuery, values);
  return result[0].count > 0;
};

module.exports = router;
