// Assuming you have a router instance
const express = require('express');
const router = express.Router();
const { db } = require('../db');

// Define a route to get vehicle details by vehicleDetails_id
router.get('/getVehicleDetails/:vehicleDetailsId', async (req, res) => {
  try {
    // Extract vehicleDetailsId from the request parameters
    const { vehicleDetailsId } = req.params;

    // Fetch vehicle details from the database based on vehicleDetailsId
    const vehicleDetailsQuery = 'SELECT * FROM vehicle_details WHERE vehicleDetails_id = ?';
    const [vehicleDetails] = await db.execute(vehicleDetailsQuery, [vehicleDetailsId]);

    if (vehicleDetails.length > 0) {
      res.status(200).json(vehicleDetails[0]);
    } else {
      res.status(404).json({ message: 'Vehicle details not found' });
    }
  } catch (error) {
    console.error('Error fetching vehicle details:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
