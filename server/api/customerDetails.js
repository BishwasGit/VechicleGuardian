const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { db } = require('../db');

router.get('/customerDetails/:customer_id', async (req, res) => {
  try {
    const { customer_id } = req.params;
    const customerId = parseInt(customer_id, 10);

    // Retrieve customer details based on customer_id from the database
    const [customerDetails] = await db.execute('SELECT * FROM customer_users WHERE customer_id = ?', [customerId]);

    // Assuming the response structure; modify as per your database schema
    res.json({ customerDetails });
  } catch (error) {
    console.error('Error fetching customer details:', error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;