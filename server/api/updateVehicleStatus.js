const express = require('express');
const router = express.Router();
const { db } = require('../db');

router.put('/updateVehicleStatus/:vehicleDetails_id', async (req, res) => {
  try {
    const { vehicleDetails_id } = req.params;
    const updatedStatus = req.body.status;

    // Update the status for the given vehicleDetails_id in the database
    const result = await db.execute('UPDATE vehicle_details SET status = ? WHERE vehicleDetails_id = ?', [updatedStatus, vehicleDetails_id]);

    if (result.affectedRows === 0) {
      // No rows were updated, indicating that the vehicleDetails_id was not found
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    res.json({ message: 'Vehicle status updated successfully' });
  } catch (error) {
    console.error('Error updating vehicle status:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
