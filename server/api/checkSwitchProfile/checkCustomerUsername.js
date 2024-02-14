// Import necessary modules
const express = require('express');
const router = express.Router();
const { db } = require('../../db');

// Endpoint to check if the username exists in the repair center table
router.get('/checkCustomerUsername/:username', async (req, res) => {
  const username = req.params.username;

  try {
    const result = await db.execute('SELECT customer_id FROM customer_users WHERE username = ?', [username]);
  
    if (result.length > 0) {
      const customer_id = result[0][0].customer_id; // Access the repaircenter_id from the inner array
      res.json({ exists: true, customer_id });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking repair center username:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Export the router
module.exports = router;
