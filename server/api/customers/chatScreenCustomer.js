const express = require('express');
const router = express.Router();
const { db } = require('../../db');

router.get('/repairData/:customer_id', async (req, res) => {
  try {
    const { customer_id } = req.params;
    const customerId = parseInt(customer_id, 10);

    // Retrieve repair data based on customer_id from the database
    const [repairData] = await db.execute(`
    SELECT repair_data.*, vehicle_details.customer_id
    FROM repair_data
    INNER JOIN vehicle_details ON repair_data.vehicleDetails_id = vehicle_details.vehicleDetails_id
    WHERE vehicle_details.customer_id = ?
  `, [customerId]);
    // Assuming the response structure; modify as per your database schema
    res.json({ repairData });
  } catch (error) {
    console.error('Error fetching repair data:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
