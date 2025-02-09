// Import necessary modules
const express = require('express');
const router = express.Router();
const { db } = require('../../db');

// Endpoint to check if the username exists in the repair center table
router.get('/checkRepairCenterUsername/:username', async (req, res) => {
  const username = req.params.username;

  try {
    const result = await db.execute('SELECT repaircenter_id FROM repaircenter_users WHERE username = ?', [username]);

    if (result.length > 0) {
      const repaircenter_id = result[0][0].repaircenter_id; // Access the repaircenter_id from the inner array
      res.json({ exists: true, repaircenter_id });
    } else {
      res.json({ exists: false });
    }
    console.log(result);
  } catch (error) {
    console.error('Error checking repair center username:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Export the router
module.exports = router;
