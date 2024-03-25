const express = require('express');
const router = express.Router();
const { db } = require('../db');

router.get('/customerdetails_by_vehicledetailsId/:vehicleDetails_id', async (req, res) => {
  try {
    const { vehicleDetails_id } = req.params;
    // Query the database to get worker details based on workerId
    const [rows] = await db.execute(`SELECT rd.vehicleDetails_id, vd.customer_id FROM repair_data rd INNER JOIN vehicle_details vd ON rd.vehicleDetails_id = vd.vehicleDetails_id WHERE rd.vehicleDetails_id = ? `, [vehicleDetails_id]);
    res.json(rows);
    console.log('customer_id from vehicleDetails join', rows);
  } catch (error) {
    console.error('Error fetching repaircenter id:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
