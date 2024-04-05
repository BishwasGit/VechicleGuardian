const express = require('express');
const router = express.Router();
const { db } = require('../../db');
router.post('/updateAvailability_repaircenter', async (req, res) => {
  try {
    const { repaircenters_id, availability } = req.body;
    const availability_json = JSON.stringify(availability);
    // console.log(repaircenters_id);
    // console.log(availability_json);
    const checkQuery = 'SELECT * FROM repaircenteravailability WHERE repaircenters_id = ?';
    const existingCenter = await db.query(checkQuery, [repaircenters_id]);
    console.log(existingCenter[0]);
    if (existingCenter[0] == null) {
      const updateQuery = 'UPDATE repaircenteravailability SET schedule = ? WHERE repaircenters_id = ?';
      await db.execute(updateQuery, [availability_json, repaircenters_id]);
    } else {
      const insertQuery = 'INSERT INTO repaircenteravailability (repaircenters_id, schedule) VALUES (?, ?)';
      await db.execute(insertQuery, [repaircenters_id, availability_json]);
    }
    res.status(200).json({ message: 'Availability updated successfully' });
  } catch (error) {
    console.error('Error updating availability:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
