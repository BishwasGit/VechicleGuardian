// Import necessary modules
const express = require('express');
const router = express.Router();
const { db } = require('../../db');

// Endpoint to check if the username exists in the repair center table
router.get('/checkRepairCenterSellerUsername/:username', async (req, res) => {
  const username = req.params.username;

  try {
    // Query to check if the username exists in the repair center table
    const result = await db.execute('SELECT repair_parts_seller_users_id FROM repair_parts_seller_users WHERE username = ?', [username]);

    if (result.length > 0) {
      // Username exists in the repair center table
      const repair_parts_seller_users_id = result[0][0].repair_parts_seller_users_id;
      res.json({ exists: true, repair_parts_seller_users_id });
    } else {
      // Username does not exist in the repair center table
      res.json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking repair center username:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Export the router
module.exports = router;
