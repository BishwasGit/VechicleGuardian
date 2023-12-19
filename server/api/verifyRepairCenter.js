const express = require('express');
const router = express.Router();
const { db } = require('../db');

router.post('/verifyRepairCenter/:repaircenters_id', async (req, res) => {
  try {
    const { repaircenters_id } = req.params;

    // Assuming you have a 'verified' column in your repair_centers table
    const result = await db.execute('UPDATE repair_centers SET verification = ? WHERE repaircenters_id = ?', ['Verified', repaircenters_id]);

    if (result.affectedRows === 0) {
      // No rows were updated, indicating that the repair center ID was not found
      return res.status(404).json({ error: 'Repair center not found' });
    }

    res.json({ message: 'Repair center verified successfully' });
  } catch (error) {
    console.error('Error verifying repair center:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
